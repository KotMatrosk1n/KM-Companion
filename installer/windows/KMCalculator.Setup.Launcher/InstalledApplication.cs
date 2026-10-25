// SPDX-License-Identifier: MIT

using System.ComponentModel;
using System.Diagnostics;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Security.Principal;
using System.Text;
using Microsoft.Win32;

namespace KMCalculator.Setup.Launcher;

internal sealed record LegacyCleanupReceipt(string Value, string OwnerSid);

internal static class InstalledApplication
{
    private const uint ErrorNoMoreItems = 259;
    private const string PackageUpgradeCode = "{9971DF03-D3BD-4FB5-A51B-D975985EEA2C}";
    // Keep registration and upgrade identity shared with the previous product name.
    private const string RegistryPath = @"Software\KM Calculator";
    private const string MainBinaryName = "KM Companion.exe";

    internal static bool TryLaunch(out string? error)
    {
        error = null;
        var expectedVersion = ReadExpectedVersion();
        var candidates = new List<string>();

        AddValidatedCandidate(expectedVersion, candidates);

        if (candidates.Count != 1)
        {
            error = candidates.Count == 0
                ? "Setup completed, but the installed KM Companion location could not be validated."
                : "Setup completed, but more than one KM Companion installation marker was found.";
            return false;
        }

        var executablePath = Path.Combine(candidates[0], MainBinaryName);
        try
        {
            Process.Start(new ProcessStartInfo
            {
                FileName = executablePath,
                WorkingDirectory = candidates[0],
                UseShellExecute = true
            });
            return true;
        }
        catch (Exception exception)
        {
            error = $"KM Companion was installed, but it could not be started: {exception.Message}";
            return false;
        }
    }

    internal static bool IsInstalled()
    {
        var candidates = new List<string>();
        AddValidatedCandidate(ReadExpectedVersion(), candidates);
        return candidates.Count == 1;
    }

    internal static bool IsAnyVersionRegistered()
    {
        var productCode = new StringBuilder(39);
        var enumResult = MsiEnumRelatedProductsW(PackageUpgradeCode, 0, 0, productCode);
        if (enumResult == ErrorNoMoreItems)
        {
            return false;
        }
        if (enumResult != 0)
        {
            throw new Win32Exception((int)enumResult, "KM Companion registration could not be inspected.");
        }

        // Any related Windows Installer registration, including an advertised or
        // damaged one, is maintenance state rather than proof of a first install.
        // Treat it as registered so ambiguous MSI state can never authorize the
        // destructive one-time Royal Sword cleanup path.
        return true;
    }

    internal static string GetCurrentUserSid()
    {
        using var identity = WindowsIdentity.GetCurrent();
        return identity.User?.Value
            ?? throw new InvalidOperationException("The current Windows user SID could not be determined.");
    }

    internal static bool HasCleanupReceipt(string expectedReceipt, string expectedOwnerSid)
    {
        var receipt = ReadCleanupReceipt();
        return receipt is not null &&
               EqualsExact(receipt.Value, expectedReceipt) &&
               EqualsExact(receipt.OwnerSid, expectedOwnerSid);
    }

    internal static LegacyCleanupReceipt? ReadCleanupReceipt()
    {
        try
        {
            using var baseKey = RegistryKey.OpenBaseKey(RegistryHive.LocalMachine, RegistryView.Registry64);
            using var key = baseKey.OpenSubKey(RegistryPath, writable: false);
            var value = key?.GetValue("LegacyCleanupReceipt") as string;
            var ownerSid = key?.GetValue("LegacyCleanupOwnerSid") as string;
            if (!Guid.TryParseExact(value, "N", out _) || string.IsNullOrWhiteSpace(ownerSid))
            {
                return null;
            }

            var normalizedOwnerSid = new SecurityIdentifier(ownerSid).Value;
            return EqualsExact(normalizedOwnerSid, ownerSid)
                ? new LegacyCleanupReceipt(value, ownerSid)
                : null;
        }
        catch
        {
            return null;
        }
    }

    private static void AddValidatedCandidate(string expectedVersion, ICollection<string> candidates)
    {
        try
        {
            using var baseKey = RegistryKey.OpenBaseKey(RegistryHive.LocalMachine, RegistryView.Registry64);
            using var key = baseKey.OpenSubKey(RegistryPath, writable: false);
            if (key is null ||
                !EqualsExact(key.GetValue("InstallerFamily") as string, "BurnMsi") ||
                !EqualsExact(key.GetValue("MainBinaryName") as string, MainBinaryName) ||
                !EqualsExact(key.GetValue("InstallScope") as string, "perMachine") ||
                !EqualsExact(key.GetValue("LegacyCleanupRevision") as string, "1") ||
                !VersionsMatch(key.GetValue("Version") as string, expectedVersion))
            {
                return;
            }

            var installLocation = key.GetValue("InstallLocation") as string;
            if (TryValidateInstallPath(installLocation, expectedVersion, out var normalizedPath))
            {
                candidates.Add(normalizedPath!);
            }
        }
        catch
        {
            // A malformed or unreadable marker is never trusted for relaunch.
        }
    }

    private static bool TryValidateInstallPath(string? candidate, string expectedVersion, out string? normalizedPath)
    {
        normalizedPath = null;
        if (string.IsNullOrWhiteSpace(candidate) ||
            !Path.IsPathFullyQualified(candidate) ||
            candidate.StartsWith(@"\\", StringComparison.Ordinal))
        {
            return false;
        }

        string fullPath;
        try
        {
            fullPath = Path.TrimEndingDirectorySeparator(Path.GetFullPath(candidate));
            var canonicalPath = Path.TrimEndingDirectorySeparator(Path.GetFullPath(
                Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles), "KM Companion")));
            if (!string.Equals(fullPath, canonicalPath, StringComparison.OrdinalIgnoreCase))
            {
                return false;
            }

            var root = Path.GetPathRoot(fullPath);
            if (string.IsNullOrEmpty(root) ||
                string.Equals(fullPath, Path.TrimEndingDirectorySeparator(root), StringComparison.OrdinalIgnoreCase) ||
                new DriveInfo(root).DriveType != DriveType.Fixed)
            {
                return false;
            }

            for (var directory = new DirectoryInfo(fullPath); directory is not null; directory = directory.Parent)
            {
                if (!directory.Exists || (directory.Attributes & FileAttributes.ReparsePoint) != 0)
                {
                    return false;
                }
            }
        }
        catch
        {
            return false;
        }

        var executablePath = Path.Combine(fullPath, MainBinaryName);
        var appArchivePath = Path.Combine(fullPath, "resources", "app.asar");
        if (!File.Exists(executablePath) || !File.Exists(appArchivePath))
        {
            return false;
        }

        try
        {
            var versionInfo = FileVersionInfo.GetVersionInfo(executablePath);
            if (!EqualsExact(versionInfo.ProductName, "KM Companion") ||
                !EqualsExact(versionInfo.OriginalFilename, MainBinaryName) ||
                !VersionsMatch(versionInfo.FileVersion, expectedVersion))
            {
                return false;
            }
        }
        catch
        {
            return false;
        }

        normalizedPath = fullPath;
        return true;
    }

    private static string ReadExpectedVersion()
    {
        using var stream = Assembly.GetExecutingAssembly().GetManifestResourceStream("KMCalculator.Setup.Version")
            ?? throw new InvalidDataException("The embedded setup version is missing.");
        using var reader = new StreamReader(stream);
        var value = reader.ReadToEnd().Trim();
        return Version.TryParse(value, out _) ? value : throw new InvalidDataException("The embedded setup version is invalid.");
    }

    private static bool VersionsMatch(string? candidate, string expected)
    {
        if (!Version.TryParse(candidate, out var candidateVersion) || !Version.TryParse(expected, out var expectedVersion))
        {
            return false;
        }

        return candidateVersion.Major == expectedVersion.Major &&
               candidateVersion.Minor == expectedVersion.Minor &&
               NormalizeComponent(candidateVersion.Build) == NormalizeComponent(expectedVersion.Build);
    }

    private static int NormalizeComponent(int value) => value < 0 ? 0 : value;

    private static bool EqualsExact(string? left, string right) =>
        string.Equals(left, right, StringComparison.Ordinal);

    [DllImport("msi.dll", EntryPoint = "MsiEnumRelatedProductsW", CharSet = CharSet.Unicode, ExactSpelling = true)]
    private static extern uint MsiEnumRelatedProductsW(
        string upgradeCode,
        uint reserved,
        uint productIndex,
        StringBuilder productCode);
}
