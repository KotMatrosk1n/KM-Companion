// SPDX-License-Identifier: MIT
using System.IO;
using System.Text.RegularExpressions;
using System.Windows;
using System.Windows.Interop;
using System.Windows.Threading;
using System.Xml.Linq;
using WixToolset.BootstrapperApplicationApi;
using ErrorEventArgs = WixToolset.BootstrapperApplicationApi.ErrorEventArgs;

namespace KMCalculator.Setup.UI;

internal sealed class CalculatorBootstrapper : BootstrapperApplication
{
    private IBootstrapperCommand command = null!;
    private BootstrapperApplicationData data = null!;
    private Restart restart;
    private readonly SetupState state = new();
    private Dispatcher dispatcher = null!;
    private SetupWindow? window;
    private IntPtr parent;
    private LaunchAction action;
    private bool installed, olderInstalled, newerInstalled, restartApproved;
    private bool removingApplicationPackage, applicationPackageRemoved;
    private volatile bool rollback;
    private int cancellation; // 0 available, 1 requested, 2 delivered, 3 completed
    private int exitCode = 1602;
    private string? lastError;
    private int? lastErrorCode;
    private bool Visible => command.Display is Display.Full or Display.Passive;
    private bool Interactive => command.Display == Display.Full;

    protected override void OnCreate(CreateEventArgs args)
    {
        base.OnCreate(args);
        command = args.Command;
        data = new BootstrapperApplicationData(new FileInfo(command.BootstrapperApplicationDataPath));
        var parsed = command.ParseCommandLine();
        parsed.SetOverridableVariables(data.Bundle.OverridableVariables, engine);
        restart = parsed.Restart;
        if (parsed.UnknownCommandLineArgs.Any(arg => arg.Equals("/promptrestart", StringComparison.OrdinalIgnoreCase) || arg.Equals("-promptrestart", StringComparison.OrdinalIgnoreCase)))
        {
            var defaultRestart = command.Display < Display.Full ? Restart.Automatic : Restart.Prompt;
            if (restart != defaultRestart) throw new ArgumentException("Conflicting restart options were supplied.");
            restart = Restart.Prompt;
        }
        if (command.Action == LaunchAction.Layout && !string.IsNullOrWhiteSpace(command.LayoutDirectory))
            engine.SetVariableString("WixBundleLayoutDirectory", command.LayoutDirectory, false);
    }

    protected override void Run()
    {
        dispatcher = Dispatcher.CurrentDispatcher;
        try
        {
            state.VersionText = "Version " + engine.GetVariableVersion("WixBundleVersion");
            state.Operation = Numeric("KMUpdaterInvocation") == 1 ? SetupOperation.Update : OperationFor(command.Action);
            if (Visible)
            {
                var app = new Application { ShutdownMode = ShutdownMode.OnExplicitShutdown };
                window = new SetupWindow(state);
                window.PrimaryRequested += () => Start(StateAction());
                window.UninstallRequested += () => Start(LaunchAction.Uninstall);
                window.CancelRequested += Cancel;
                window.ExitRequested += Exit;
                window.RestartRequested += () => { restartApproved = true; exitCode = 1641; Exit(); };
                parent = new WindowInteropHelper(window).EnsureHandle();
                window.Show();
                BeginDetection();
                app.Run();
            }
            else
            {
                using var host = new HwndSource(new HwndSourceParameters("KM Companion Setup") { Width = 0, Height = 0, WindowStyle = 0 });
                parent = host.Handle;
                BeginDetection();
                Dispatcher.Run();
            }
        }
        catch (Exception exception) { engine.Log(LogLevel.Error, exception.ToString()); exitCode = 1603; }
        finally { engine.Quit(exitCode); }
    }

    private void BeginDetection()
    {
        engine.CloseSplashScreen();
        if (command.Action == LaunchAction.Help)
        {
            exitCode = 0;
            state.Navigate(SetupPage.Help);
            if (!Visible) dispatcher.BeginInvoke(Exit);
        }
        else engine.Detect(parent);
    }

    private void Post(Action work) => dispatcher.BeginInvoke(() =>
    {
        try { work(); }
        catch (Exception exception) { Fail(1603, exception.Message); }
    });
    private long Numeric(string name) => engine.ContainsVariable(name) ? engine.GetVariableNumeric(name) : 0;
    private static bool Cancelled(int code) => code is 1602 or unchecked((int)0x80070642);
    private static int ExitCode(int status) => (status & unchecked((int)0xffff0000)) == unchecked((int)0x80070000) ? status & 0xffff : status;
    private static SetupOperation OperationFor(LaunchAction requested) => requested switch
    {
        LaunchAction.Uninstall or LaunchAction.UnsafeUninstall => SetupOperation.Uninstall,
        LaunchAction.Repair or LaunchAction.Modify => SetupOperation.Repair,
        LaunchAction.Cache => SetupOperation.Cache,
        LaunchAction.Layout => SetupOperation.Layout,
        _ => SetupOperation.Install
    };
    private LaunchAction StateAction() => state.Operation switch
    {
        SetupOperation.Repair => LaunchAction.Repair, SetupOperation.Uninstall => LaunchAction.Uninstall,
        SetupOperation.Cache => LaunchAction.Cache, SetupOperation.Layout => LaunchAction.Layout,
        _ => LaunchAction.Install
    };

    protected override void OnDetectBegin(DetectBeginEventArgs args)
    {
        installed = Numeric("WixBundleInstalled") != 0;
        base.OnDetectBegin(args);
    }
    protected override void OnDetectPackageComplete(DetectPackageCompleteEventArgs args)
    {
        if (args.PackageId == "KmCalculatorMsi" && args.State == PackageState.Present) installed = true;
        base.OnDetectPackageComplete(args);
    }
    private void ObserveVersion(string version)
    {
        var comparison = engine.CompareVersions(version, engine.GetVariableVersion("WixBundleVersion"));
        olderInstalled |= comparison < 0;
        newerInstalled |= comparison > 0;
    }
    protected override void OnDetectRelatedBundle(DetectRelatedBundleEventArgs args)
    {
        if (args.RelationType == RelationType.Upgrade) ObserveVersion(args.Version);
        base.OnDetectRelatedBundle(args);
    }
    protected override void OnDetectRelatedMsiPackage(DetectRelatedMsiPackageEventArgs args)
    {
        if (args.PackageId == "KmCalculatorMsi") ObserveVersion(args.Version);
        base.OnDetectRelatedMsiPackage(args);
    }
    protected override void OnDetectComplete(DetectCompleteEventArgs args)
    {
        base.OnDetectComplete(args);
        Post(() =>
        {
            if (args.Status < 0 || Cancelled(args.Status)) { Fail(args.Status); return; }
            if (Volatile.Read(ref cancellation) == 1) { Fail(1602); return; }
            state.Installed = installed;
            state.RemoveLegacy = Numeric("KMRemoveLegacy") == 1;
            state.CreateDesktopShortcut = Numeric("KMCreateDesktopShortcut") != 0;
            state.CreateStartMenuShortcut = Numeric("KMCreateStartMenuShortcut") != 0;
            if (command.Action is LaunchAction.Unknown or LaunchAction.Install)
                state.Operation = Numeric("KMUpdaterInvocation") == 1 || olderInstalled ? SetupOperation.Update : installed ? SetupOperation.Repair : SetupOperation.Install;
            state.Navigate(SetupPage.Ready);
            if (!Interactive) Start(command.Action == LaunchAction.UnsafeUninstall ? LaunchAction.UnsafeUninstall : StateAction());
        });
    }

    // bal:Condition is BA data, not an engine-enforced guard. Keep the authored
    // path/legacy identity checks active when replacing WixStdBA.
    private void ValidateConditions()
    {
        var conditions = XDocument.Load(data.BADataFile.FullName).Descendants()
            .Where(node => node.Name.LocalName == "WixBalCondition").ToArray();
        if (conditions.Length != 2) throw new InvalidDataException("Setup's installation safety conditions are missing or incomplete.");
        foreach (var condition in conditions)
        {
            var expression = (string?)condition.Attribute("Condition");
            if (string.IsNullOrWhiteSpace(expression)) throw new InvalidDataException("An installation safety condition is empty.");
            if (!engine.EvaluateCondition(expression))
                throw new InvalidOperationException(engine.FormatString((string?)condition.Attribute("Message") ?? "The installation could not be validated."));
        }
    }

    private void Start(LaunchAction requested)
    {
        if (state.Page != SetupPage.Ready) return;
        try
        {
            if (newerInstalled && requested is not LaunchAction.Uninstall and not LaunchAction.UnsafeUninstall and not LaunchAction.Layout and not LaunchAction.Cache)
                throw new InvalidOperationException("A newer version of KM Companion is installed. Use its setup or Windows Settings to maintain it.");
            ValidateConditions();
            action = requested;
            engine.SetVariableNumeric("KMCreateDesktopShortcut", state.CreateDesktopShortcut ? 1 : 0);
            engine.SetVariableNumeric("KMCreateStartMenuShortcut", state.CreateStartMenuShortcut ? 1 : 0);
            state.Detail = "Preparing the requested changes…";
            state.Navigate(SetupPage.Progress);
            engine.Plan(action, BundleScope.PerMachine);
        }
        catch (Exception exception) { Fail(1603, exception.Message); }
    }
    protected override void OnPlanMsiPackage(PlanMsiPackageEventArgs args)
    {
        base.OnPlanMsiPackage(args);
        args.UiLevel = INSTALLUILEVEL.None;
        args.DisableExternalUiHandler = false;
    }
    protected override void OnPlanComplete(PlanCompleteEventArgs args)
    {
        base.OnPlanComplete(args);
        Post(() =>
        {
            if (args.Status < 0 || Cancelled(args.Status)) { Fail(args.Status); return; }
            if (Volatile.Read(ref cancellation) == 1) { Fail(1602); return; }
            state.Detail = "Waiting for Windows Installer…";
            state.Refresh();
            engine.Apply(parent);
        });
    }
    private void Cancel()
    {
        if (Interlocked.CompareExchange(ref cancellation, 1, 0) != 0) return;
        state.Cancelling = true;
        state.Refresh();
    }
    // Deliver cancellation once, and never interrupt rollback.
    private bool TakeCancellation() => !rollback && Interlocked.CompareExchange(ref cancellation, 2, 1) == 1;
    protected override void OnApplyBegin(ApplyBeginEventArgs args) { base.OnApplyBegin(args); args.Cancel |= TakeCancellation(); }
    protected override void OnElevateBegin(ElevateBeginEventArgs args)
    {
        base.OnElevateBegin(args);
        args.Cancel |= TakeCancellation();
        Post(() => { state.Detail = "Waiting for Windows permission…"; state.Refresh(); });
    }
    protected override void OnSystemRestorePointBegin(SystemRestorePointBeginEventArgs args)
    {
        base.OnSystemRestorePointBegin(args);
        Post(() => { state.Detail = "Creating a system restore point…"; state.Refresh(); });
    }
    protected override void OnCacheBegin(CacheBeginEventArgs args)
    {
        base.OnCacheBegin(args);
        args.Cancel |= TakeCancellation();
        Post(() => { state.Detail = "Preparing and verifying the application files…"; state.Refresh(); });
    }
    protected override void OnCacheAcquireProgress(CacheAcquireProgressEventArgs args) { base.OnCacheAcquireProgress(args); args.Cancel |= TakeCancellation(); }
    protected override void OnCacheVerifyProgress(CacheVerifyProgressEventArgs args) { base.OnCacheVerifyProgress(args); args.Cancel |= TakeCancellation(); }
    protected override void OnCachePayloadExtractProgress(CachePayloadExtractProgressEventArgs args) { base.OnCachePayloadExtractProgress(args); args.Cancel |= TakeCancellation(); }
    protected override void OnProgress(ProgressEventArgs args)
    {
        base.OnProgress(args);
        args.Cancel |= TakeCancellation();
        Post(() => { state.Progress = Math.Clamp(args.OverallPercentage, 0, 100); state.Indeterminate = false; state.Refresh(); });
    }
    protected override void OnExecutePackageBegin(ExecutePackageBeginEventArgs args)
    {
        base.OnExecutePackageBegin(args);
        rollback = !args.ShouldExecute;
        if (args.PackageId == "KmCalculatorMsi")
        {
            removingApplicationPackage = args.ShouldExecute && args.Action == ActionState.Uninstall;
            applicationPackageRemoved = false;
        }
        args.Cancel |= TakeCancellation();
        var isRollback = rollback;
        Post(() => { state.Detail = ExecutionDetail(null, isRollback); state.Refresh(); });
    }
    protected override void OnExecutePackageComplete(ExecutePackageCompleteEventArgs args)
    {
        base.OnExecutePackageComplete(args);
        if (args.PackageId == "KmCalculatorMsi")
            applicationPackageRemoved = removingApplicationPackage && args.Status >= 0 && !Cancelled(args.Status);
    }
    protected override void OnExecuteMsiMessage(ExecuteMsiMessageEventArgs args)
    {
        base.OnExecuteMsiMessage(args);
        if (args.MessageType != InstallMessage.ActionStart) return;
        // MSI record field 1 is the action identifier. Descriptions/templates
        // can contain unresolved [n] fields and belong in the log, not the UI.
        var actionName = args.Data.FirstOrDefault();
        var isRollback = rollback;
        Post(() =>
        {
            if (state.Page != SetupPage.Progress) return;
            state.Detail = ExecutionDetail(actionName, isRollback);
            state.Refresh();
        });
    }
    private string ExecutionDetail(string? actionName, bool isRollback) => isRollback
        ? "Undoing setup changes…"
        : actionName switch
        {
            "AppSearch" or "FindRelatedProducts" or "LaunchConditions" => "Checking the installation…",
            "CostInitialize" or "FileCost" or "CostFinalize" => "Checking available disk space…",
            "InstallValidate" or "InstallInitialize" => "Preparing application changes…",
            "CreateFolders" => "Preparing application folders…",
            "InstallFiles" or "DuplicateFiles" or "MoveFiles" => "Copying application files…",
            "RemoveFiles" or "RemoveDuplicateFiles" => "Removing application files…",
            "RemoveFolders" => "Removing empty application folders…",
            "CreateShortcuts" => "Creating shortcuts…",
            "RemoveShortcuts" => "Removing shortcuts…",
            "WriteRegistryValues" or "RegisterProduct" or "RegisterUser" or "PublishProduct" or "PublishFeatures" or "ProcessComponents" => "Updating application registration…",
            "RemoveRegistryValues" or "UnpublishFeatures" => "Removing application registration…",
            "RemoveExistingProducts" => "Removing the previous application version…",
            "InstallFinalize" => "Finishing setup…",
            _ => state.Operation switch
            {
                SetupOperation.Update => "Updating KM Companion…",
                SetupOperation.Repair => "Repairing KM Companion…",
                SetupOperation.Uninstall => "Removing KM Companion…",
                SetupOperation.Cache => "Preparing setup files…",
                SetupOperation.Layout => "Saving setup files…",
                _ => "Installing KM Companion…"
            }
        };
    protected override void OnExecuteFilesInUse(ExecuteFilesInUseEventArgs args)
    {
        base.OnExecuteFilesInUse(args);
        args.Result = Interactive && window != null && dispatcher.Invoke(() => window.Ask(
            "Close applications to continue", "KM Companion or another application is using files that setup needs. Save your work and close it, then choose Retry.", "Retry", "Cancel setup"))
            ? Result.Retry : Result.Cancel;
    }
    protected override void OnError(ErrorEventArgs args)
    {
        base.OnError(args);
        lastError = args.ErrorMessage;
        lastErrorCode = args.ErrorCode;
        engine.Log(LogLevel.Error, $"Setup error {args.ErrorCode}: {args.ErrorMessage}");
        // Do not ignore failures or repeatedly interrupt the engine's rollback.
        if (!rollback && TakeCancellation()) args.Result = Result.Cancel;
    }
    protected override void OnApplyComplete(ApplyCompleteEventArgs args)
    {
        base.OnApplyComplete(args);
        Interlocked.Exchange(ref cancellation, 3);
        var needsRestart = args.Restart == ApplyRestart.RestartRequired || restart == Restart.Always;
        var success = args.Status >= 0 && !Cancelled(args.Status);
        if (ArtworkUninstallCleanup.ShouldRemove(action, command.Relation,
                Numeric("KMUpdaterInvocation") != 0, installed, newerInstalled, applicationPackageRemoved, success))
        {
            Post(() => { state.Detail = "Removing downloaded Pokémon artwork…"; state.Refresh(); });
            try
            {
                ArtworkUninstallCleanup.RemoveCurrentUserArtifacts();
                state.ArtworkRemoved = true;
            }
            catch (Exception exception)
            {
                engine.Log(LogLevel.Error, "Downloaded artwork cleanup failed: " + exception);
                Post(() => Fail(1603, "KM Companion was removed, but some downloaded artwork could not be removed. Close applications using those files and check folder permissions. Your saved teams, progress, notes, and settings are preserved."));
                return;
            }
        }
        var autoRestart = success && needsRestart && restart is Restart.Automatic or Restart.Always;
        if (autoRestart) args.Action = BOOTSTRAPPER_APPLYCOMPLETE_ACTION.Restart;
        Post(() =>
        {
            state.Cancelling = false;
            if (!success) { Fail(args.Status); return; }
            exitCode = autoRestart || args.Restart == ApplyRestart.RestartInitiated ? 1641 : needsRestart ? 3010 : 0;
            state.RestartRequired = needsRestart;
            state.CanRestart = needsRestart && restart != Restart.Never;
            state.Progress = 100;
            state.Indeterminate = false;
            state.Navigate(SetupPage.Complete);
            if (!Interactive || autoRestart || args.Restart == ApplyRestart.RestartInitiated) Exit();
        });
    }
    private void Fail(int status, string? message = null)
    {
        exitCode = ExitCode(status);
        Interlocked.Exchange(ref cancellation, 3);
        state.Cancelling = false;
        // Preserve readable errors and safety guidance, but never display an
        // unresolved MSI record/property template. Full diagnostics stay logged.
        engine.Log(LogLevel.Error, $"Setup failed with status 0x{status:X8}. {message}");
        var detail = message ?? lastError;
        state.ErrorMessage = !string.IsNullOrWhiteSpace(detail) &&
            !Regex.IsMatch(detail, @"\[(?:\d+|[A-Za-z_][A-Za-z0-9_.]*)\]")
                ? detail
                : FailureDetail(lastErrorCode ?? status);
        if (data.Bundle.LogVariable is { Length: > 0 } logVariable && engine.ContainsVariable(logVariable))
            state.LogPath = engine.GetVariableString(logVariable);
        engine.Log(LogLevel.Error, state.ErrorMessage);
        state.Navigate(Cancelled(status) ? SetupPage.Cancelled : SetupPage.Failed);
        if (!Visible) Exit();
    }
    private static string FailureDetail(int code) => ExitCode(code) switch
    {
        5 => "Windows denied access to a required file or folder. Check its permissions, then try again.",
        32 or 33 => "A required file is in use. Close KM Companion and other applications using its files, then try again.",
        112 => "There is not enough free disk space to finish setup. Free some space, then try again.",
        1618 => "Another installation is running. Wait for it to finish, then run setup again.",
        1612 or 1619 or 1620 => "Setup could not read the required installation files. Download the complete installer and try again.",
        1638 => "Another version of KM Companion is already installed. Use its setup or Windows Settings to maintain it.",
        _ => "Setup could not complete the requested changes. Open the setup log for details."
    };
    private void Exit()
    {
        window?.Finish();
        if (Application.Current != null) Application.Current.Shutdown();
        else dispatcher.BeginInvokeShutdown(DispatcherPriority.Normal);
    }
    protected override void OnShutdown(ShutdownEventArgs args)
    {
        base.OnShutdown(args);
        if (restartApproved) args.Action = BOOTSTRAPPER_SHUTDOWN_ACTION.Restart;
    }
}
