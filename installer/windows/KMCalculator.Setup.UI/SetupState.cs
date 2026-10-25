// SPDX-License-Identifier: MIT
using System.ComponentModel;

namespace KMCalculator.Setup.UI;

internal enum SetupPage { Preparing, Ready, Progress, Complete, Failed, Cancelled, Help }
internal enum SetupOperation { Install, Update, Repair, Uninstall, Cache, Layout }

internal sealed class SetupState : INotifyPropertyChanged
{
    public event PropertyChangedEventHandler? PropertyChanged;
    public SetupPage Page { get; private set; } = SetupPage.Preparing;
    public SetupOperation Operation { get; set; }
    public bool Installed { get; set; }
    public bool RemoveLegacy { get; set; }
    public bool RestartRequired { get; set; }
    public bool CanRestart { get; set; }
    public bool Cancelling { get; set; }
    public bool CreateDesktopShortcut { get; set; } = true;
    public bool CreateStartMenuShortcut { get; set; } = true;
    public string VersionText { get; set; } = "";
    public string Detail { get; set; } = "Checking the installation…";
    public string ErrorMessage { get; set; } = "";
    public string LogPath { get; set; } = "";
    public int Progress { get; set; }
    public bool Indeterminate { get; set; } = true;
    public string WindowTitle => Operation switch
    {
        SetupOperation.Update => "KM Companion Update",
        SetupOperation.Uninstall => "KM Companion Uninstall",
        _ => "KM Companion Setup"
    };
    public string Heading => Page switch
    {
        SetupPage.Preparing => "Preparing setup",
        SetupPage.Progress when Cancelling => "Cancelling setup",
        SetupPage.Progress => Operation switch
        {
            SetupOperation.Update => "Updating KM Companion",
            SetupOperation.Uninstall => "Removing KM Companion",
            SetupOperation.Repair => "Repairing KM Companion",
            SetupOperation.Layout => "Saving setup files",
            SetupOperation.Cache => "Caching setup files",
            _ => "Installing KM Companion"
        },
        SetupPage.Complete when Operation == SetupOperation.Uninstall => "KM Companion was removed",
        SetupPage.Complete when Operation == SetupOperation.Layout || Operation == SetupOperation.Cache => "Setup files are ready",
        SetupPage.Complete => "KM Companion is ready",
        SetupPage.Failed => "Setup could not complete",
        SetupPage.Cancelled => "Setup was cancelled",
        SetupPage.Help => "KM Companion setup help",
        _ => Operation switch
        {
            SetupOperation.Uninstall => "Uninstall KM Companion",
            SetupOperation.Update => "Update KM Companion",
            SetupOperation.Repair => "Maintain KM Companion",
            SetupOperation.Layout => "Save setup files",
            SetupOperation.Cache => "Cache setup files",
            _ => "Install KM Companion"
        }
    };
    public string Description => Page switch
    {
        SetupPage.Preparing => "Setup is checking your computer and the available installation options.",
        SetupPage.Progress when Cancelling => "Please wait while Windows Installer safely finishes or rolls back the current operation.",
        SetupPage.Progress => "Please wait while setup applies the requested changes. Your KM Companion data is preserved.",
        SetupPage.Complete when RestartRequired => "Restart Windows to finish applying the changes. Your KM Companion data is preserved.",
        SetupPage.Complete when Operation == SetupOperation.Uninstall => "The application has been removed. Your saved teams, notes, encounter progress, and settings are preserved.",
        SetupPage.Complete when RemoveLegacy && Operation == SetupOperation.Install => "Installation is complete. Choose Finish so setup can complete the disclosed Royal Sword Calculator cleanup.",
        SetupPage.Complete => "The requested changes completed successfully.",
        SetupPage.Failed => "Review the details below. The setup log contains the full diagnostic information.",
        SetupPage.Cancelled => "No further changes will be made. You can run setup again when you are ready.",
        SetupPage.Help => "Install, update, repair, or remove KM Companion. The application uses the 64-bit Program Files folder.",
        _ => Operation switch
        {
            SetupOperation.Uninstall => "Remove the application from this computer. Your personal KM Companion data will be kept.",
            SetupOperation.Update => "Install the latest bundled calculator and game data while keeping your teams, notes, and settings.",
            SetupOperation.Repair => "Restore missing or damaged application files, or uninstall KM Companion.",
            SetupOperation.Layout => "Save the complete setup payload to the requested folder for installation later.",
            SetupOperation.Cache => "Prepare the setup cache without installing or removing KM Companion.",
            _ => "Damage calculation across generations with ROM hack profiles, encounter tracking, and trainer references."
        }
    };
    public string ActionText => Operation switch
    {
        SetupOperation.Update => "Update", SetupOperation.Repair => "Repair",
        SetupOperation.Uninstall => "Uninstall", SetupOperation.Layout => "Save files",
        SetupOperation.Cache => "Cache files", _ => "Install"
    };
    public string ProgressText => Indeterminate ? "" : $"{Progress}%";
    public bool Busy => Page is SetupPage.Preparing or SetupPage.Progress;
    public bool ShowProgress => Busy;
    public bool ShowOptions => Page == SetupPage.Ready && Operation is SetupOperation.Install or SetupOperation.Update;
    public bool ShowLegacyNotice => ShowOptions && RemoveLegacy;
    public bool ShowRetention => Page == SetupPage.Ready && Operation is SetupOperation.Repair or SetupOperation.Uninstall;
    public bool ShowError => Page == SetupPage.Failed;
    public bool ShowHelp => Page == SetupPage.Help;
    public bool ShowPrimary => Page == SetupPage.Ready && Operation != SetupOperation.Uninstall;
    public bool ShowUninstall => Page == SetupPage.Ready && (Installed || Operation == SetupOperation.Uninstall);
    public bool ShowRestart => Page == SetupPage.Complete && RestartRequired && CanRestart;
    public bool ShowLog => ShowError && !string.IsNullOrWhiteSpace(LogPath);
    public string CloseText => Busy || Page == SetupPage.Ready ? "Cancel" : Page == SetupPage.Complete ? "Finish" : "Close";
    public bool CanClose => !Cancelling;

    public void Navigate(SetupPage page) { Page = page; Refresh(); }
    public void Refresh() => PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(null));
}
