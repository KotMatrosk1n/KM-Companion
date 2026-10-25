// SPDX-License-Identifier: MIT

using System.ComponentModel;
using System.Diagnostics;
using System.Runtime.InteropServices;
using System.Security.Cryptography;

namespace KMCalculator.Setup.Launcher;

internal static class Program
{
    private const int ErrorInvalidParameter = 87;
    private const int ErrorBadExeFormat = 193;
    private const int ErrorCrc = 23;
    private const int ErrorInstallFailure = 1603;
    private const uint MbIconError = 0x00000010;
    private const uint MbOk = 0x00000000;

    [STAThread]
    private static int Main(string[] args)
    {
        var relocatedInvocation = args.Any(argument =>
            argument.Equals(LegacyUpdaterRelocation.RelocatedArgument, StringComparison.Ordinal));
        if (relocatedInvocation)
        {
            args = args.Where(argument =>
                    !argument.Equals(LegacyUpdaterRelocation.RelocatedArgument, StringComparison.Ordinal))
                .ToArray();
        }
        else
        {
            try
            {
                if (LegacyUpdaterRelocation.TryLaunchRelocatedCopy(args))
                {
                    return 0;
                }
            }
            catch (Exception exception)
            {
                ShowError($"KM Companion Setup could not relocate out of the old updater cache: {exception.Message}",
                    suppress: args.Any(IsQuietLike));
                return ErrorInstallFailure;
            }
        }

        if (!LauncherArguments.TryParse(args, out var parsed, out var argumentError) || parsed is null)
        {
            ShowError(argumentError ?? "The setup command line is invalid.", suppress: args.Any(IsQuietLike));
            return ErrorInvalidParameter;
        }

        try
        {
            var effectiveArguments = parsed;
            var operationCanPlanInstall = OperationMayInstall(effectiveArguments.BurnArguments);
            var installWasRegisteredBeforeSetup = false;
            string? currentUserSid = null;
            LegacyCleanupReceipt? pendingReceipt = null;
            string? pendingCleanupReceipt = null;

            if (operationCanPlanInstall)
            {
                installWasRegisteredBeforeSetup = InstalledApplication.IsAnyVersionRegistered();
                pendingReceipt = InstalledApplication.ReadCleanupReceipt();
                if (effectiveArguments.InvokedByUpdater && !installWasRegisteredBeforeSetup)
                {
                    // A Royal Sword NSIS release may hand its first KM/WiX update to this launcher.
                    // Convert that one transition to the fully disclosed interactive Install page;
                    // updater arguments alone never authorize destructive cleanup.
                    effectiveArguments = LauncherArguments.ForInteractiveLegacyUpdaterTransition(effectiveArguments);
                }
            }

            var cleanupMayBeAuthorized = operationCanPlanInstall && !effectiveArguments.InvokedByUpdater;

            if (cleanupMayBeAuthorized)
            {
                currentUserSid = InstalledApplication.GetCurrentUserSid();
                if (!installWasRegisteredBeforeSetup)
                {
                    LegacyRoyalSwordCleanup.RejectUnsafeMachineInstallRoot();
                }

                pendingCleanupReceipt = pendingReceipt is not null &&
                    string.Equals(pendingReceipt.OwnerSid, currentUserSid, StringComparison.Ordinal)
                        ? pendingReceipt.Value
                        : null;
                var pendingCleanupNeedsRetry = pendingCleanupReceipt is not null &&
                    !LegacyRoyalSwordCleanup.IsCurrentUserCleanupComplete(pendingCleanupReceipt);
                if (pendingCleanupNeedsRetry && InstalledApplication.IsInstalled())
                {
                    LegacyRoyalSwordCleanup.RequireMachineCleanupComplete();
                    LegacyRoyalSwordCleanup.RejectUnsafeCurrentUserInstall(pendingCleanupReceipt);
                    try
                    {
                        LegacyRoyalSwordCleanup.RemoveCurrentUserArtifacts(pendingCleanupReceipt!);
                    }
                    catch (Exception exception)
                    {
                        ShowError(
                            "Royal Sword Calculator cleanup from the previous KM Companion installation " +
                            "could not complete: " + exception.Message,
                            effectiveArguments.SuppressErrors);
                        return ErrorInstallFailure;
                    }
                }
            }
            if (cleanupMayBeAuthorized && !installWasRegisteredBeforeSetup)
            {
                LegacyRoyalSwordCleanup.RejectUnsafeCurrentUserInstall();
            }

            var cleanupReceipt = cleanupMayBeAuthorized && !installWasRegisteredBeforeSetup
                ? Guid.NewGuid().ToString("N")
                : null;
            var cleanupOwnerSid = cleanupReceipt is not null ? currentUserSid : null;
            var preservePendingReceipt = operationCanPlanInstall && installWasRegisteredBeforeSetup &&
                pendingReceipt is not null;
            var receiptToWrite = cleanupReceipt ?? (preservePendingReceipt ? pendingReceipt!.Value : null);
            var ownerSidToWrite = cleanupOwnerSid ?? (preservePendingReceipt ? pendingReceipt!.OwnerSid : null);

            using var bundle = EmbeddedBundle.ExtractAndVerify();
            var startInfo = new ProcessStartInfo
            {
                FileName = bundle.ExecutablePath,
                UseShellExecute = false,
                WorkingDirectory = Path.GetDirectoryName(bundle.ExecutablePath)!
            };
            foreach (var argument in effectiveArguments.BurnArguments)
            {
                startInfo.ArgumentList.Add(argument);
            }
            if (operationCanPlanInstall && (cleanupReceipt is not null || preservePendingReceipt))
            {
                if (cleanupReceipt is not null)
                {
                    startInfo.ArgumentList.Add("KMRemoveLegacy=1");
                }
                startInfo.ArgumentList.Add($"KMLegacyCleanupReceipt={receiptToWrite}");
                startInfo.ArgumentList.Add($"KMLegacyCleanupOwnerSid={ownerSidToWrite}");
            }

            using var process = Process.Start(startInfo)
                ?? throw new Win32Exception("The embedded setup bundle could not be started.");
            process.WaitForExit();
            var exitCode = process.ExitCode;

            if (exitCode == 0 && cleanupMayBeAuthorized && cleanupReceipt is not null)
            {
                var applicationIsInstalled = InstalledApplication.IsInstalled();
                if (!InstalledApplication.HasCleanupReceipt(cleanupReceipt, currentUserSid!))
                {
                    ShowError(
                        "KM Companion installed, but setup could not verify the Royal Sword Calculator " +
                            "cleanup receipt. Royal Sword data was not removed.",
                        effectiveArguments.SuppressErrors);
                    return ErrorInstallFailure;
                }
                else
                {
                    if (!applicationIsInstalled)
                    {
                        ShowError(
                            "KM Companion installed, but its location could not be validated, so Royal Sword " +
                            "Calculator data was not removed. Repair KM Companion, then run Setup again.",
                            effectiveArguments.SuppressErrors);
                        return ErrorInstallFailure;
                    }

                    try
                    {
                        LegacyRoyalSwordCleanup.RequireMachineCleanupComplete();
                        LegacyRoyalSwordCleanup.RejectUnsafeCurrentUserInstall(cleanupReceipt);
                        LegacyRoyalSwordCleanup.RemoveCurrentUserArtifacts(cleanupReceipt);
                    }
                    catch (Exception exception)
                    {
                        ShowError(
                            "KM Companion installed, but Royal Sword Calculator cleanup could not complete: " +
                            exception.Message,
                            effectiveArguments.SuppressErrors);
                        return ErrorInstallFailure;
                    }
                }
            }

            if (exitCode == 0 && cleanupMayBeAuthorized &&
                cleanupReceipt is null && pendingCleanupReceipt is not null)
            {
                var applicationIsInstalled = InstalledApplication.IsInstalled();
                if (applicationIsInstalled &&
                    InstalledApplication.HasCleanupReceipt(pendingCleanupReceipt, currentUserSid!))
                {
                    try
                    {
                        LegacyRoyalSwordCleanup.RequireMachineCleanupComplete();
                        LegacyRoyalSwordCleanup.RejectUnsafeCurrentUserInstall(pendingCleanupReceipt);
                        if (!LegacyRoyalSwordCleanup.IsCurrentUserCleanupComplete(pendingCleanupReceipt))
                        {
                            LegacyRoyalSwordCleanup.RemoveCurrentUserArtifacts(pendingCleanupReceipt);
                        }
                    }
                    catch (Exception exception)
                    {
                        ShowError(
                            "KM Companion installed, but pending Royal Sword Calculator cleanup could not " +
                            "complete: " + exception.Message,
                            effectiveArguments.SuppressErrors);
                        return ErrorInstallFailure;
                    }
                }
            }

            if (exitCode == 0 && effectiveArguments.RelaunchAfterSuccess && !InstalledApplication.TryLaunch(out var launchError))
            {
                ShowError(launchError ?? "KM Companion could not be started.", effectiveArguments.SuppressErrors);
            }

            return exitCode;
        }
        catch (BadImageFormatException exception)
        {
            ShowError(exception.Message, parsed.SuppressErrors);
            return ErrorBadExeFormat;
        }
        catch (CryptographicException exception)
        {
            ShowError(exception.Message, parsed.SuppressErrors);
            return ErrorCrc;
        }
        catch (Exception exception)
        {
            ShowError($"KM Companion Setup could not complete: {exception.Message}", parsed.SuppressErrors);
            return ErrorInstallFailure;
        }
    }

    private static bool IsQuietLike(string argument) =>
        argument.Equals("/S", StringComparison.OrdinalIgnoreCase) ||
        argument.Equals("/quiet", StringComparison.OrdinalIgnoreCase);

    private static bool OperationMayInstall(IReadOnlyList<string> arguments) =>
        !arguments.Any(argument =>
            argument.Equals("/?", StringComparison.OrdinalIgnoreCase) ||
            argument.Equals("-?", StringComparison.OrdinalIgnoreCase) ||
            argument.Equals("/help", StringComparison.OrdinalIgnoreCase) ||
            argument.Equals("-help", StringComparison.OrdinalIgnoreCase) ||
            argument.Equals("/uninstall", StringComparison.OrdinalIgnoreCase) ||
            argument.Equals("/modify", StringComparison.OrdinalIgnoreCase) ||
            argument.Equals("/repair", StringComparison.OrdinalIgnoreCase) ||
            argument.Equals("/cache", StringComparison.OrdinalIgnoreCase) ||
            argument.Equals("/layout", StringComparison.OrdinalIgnoreCase));

    private static void ShowError(string message, bool suppress)
    {
        if (!suppress)
        {
            MessageBoxW(IntPtr.Zero, message, "KM Companion Setup", MbOk | MbIconError);
        }
    }

    [DllImport("user32.dll", CharSet = CharSet.Unicode, SetLastError = true)]
    private static extern int MessageBoxW(IntPtr hWnd, string text, string caption, uint type);
}
