// SPDX-License-Identifier: MIT

using System.Diagnostics;
using System.Globalization;
using System.Runtime.InteropServices;
using System.Security.Cryptography;
using System.Security.Principal;
using System.Text;
using Microsoft.Win32;

namespace KMCalculator.Setup.Launcher;

internal static class LegacyRoyalSwordCleanup
{
    private static readonly Guid UserProgramFilesFolderId =
        new("5cd7aee2-2219-4a67-b85d-6c9ce15660cb");
    private const uint KnownFolderFlagDoNotVerify = 0x00004000;
    private const string CleanupRevision = "1";
    private const string CleanupMarkerFileName = "legacy-royal-sword-cleanup-v1.complete";
    private const string CleanupPlanFileNamePrefix = "legacy-royal-sword-cleanup-v1.";
    private const string CleanupPlanFileNameSuffix = ".plan";
    private const string AbsentRegistrationState = "absent";
    private const string RegistryFingerprintPrefix = "sha256:";
    private const string LegacyProductRegistryPath = @"Software\cef17072-1d18-5c82-9672-1f987b4e4970";
    private const string LegacyUninstallRegistryPath =
        @"Software\Microsoft\Windows\CurrentVersion\Uninstall\cef17072-1d18-5c82-9672-1f987b4e4970";

    private sealed record LegacyReleaseIdentity(
        string Version,
        string ProductName,
        string DisplayName,
        string Publisher,
        string MainExecutableVersion,
        bool RequiresSpriteManifest);

    private sealed record PlannedProgramRoot(
        string OriginalPath,
        string QuarantinePath,
        string Identity,
        string OriginalChangeStamp);
    private sealed record LegacyRegistryTarget(string Label, RegistryView View, string Path);
    private sealed record CleanupPlan(
        IReadOnlyDictionary<string, string> RegistrationState,
        IReadOnlyCollection<PlannedProgramRoot> ProgramRoots);

    private sealed class CleanupMutexScope : IDisposable
    {
        private readonly Mutex mutex;
        private bool owned;

        internal CleanupMutexScope()
        {
            using var identity = WindowsIdentity.GetCurrent();
            var sid = identity.User?.Value
                ?? throw new InvalidOperationException("The current Windows user SID could not be determined.");
            mutex = new Mutex(
                initiallyOwned: false,
                @"Local\KMCalculator.LegacyRoyalSwordCleanup." + sid);
            try
            {
                owned = mutex.WaitOne(TimeSpan.FromSeconds(30));
            }
            catch (AbandonedMutexException)
            {
                owned = true;
            }
            if (!owned)
            {
                mutex.Dispose();
                throw new IOException(
                    "Another KM Companion Setup process is already cleaning Royal Sword Calculator data.");
            }
        }

        public void Dispose()
        {
            if (owned)
            {
                mutex.ReleaseMutex();
                owned = false;
            }
            mutex.Dispose();
        }
    }

    private static readonly LegacyRegistryTarget[] LegacyRegistryTargets =
    [
        new("registry64-product", RegistryView.Registry64, LegacyProductRegistryPath),
        new("registry64-uninstall", RegistryView.Registry64, LegacyUninstallRegistryPath),
        new("registry32-product", RegistryView.Registry32, LegacyProductRegistryPath),
        new("registry32-uninstall", RegistryView.Registry32, LegacyUninstallRegistryPath)
    ];

    private static readonly LegacyReleaseIdentity[] LegacyReleaseIdentities =
    [
        new("0.1.0", "Pokemon Royal Sword", "Pokemon Royal Sword 0.1.0", "KotMatrosk1n", "42.3.3", false),
        new("0.1.1", "Pokemon Royal Sword", "Pokemon Royal Sword 0.1.1", "KotMatrosk1n", "42.3.3", false),
        new("0.1.2", "Pokemon Royal Sword", "Pokemon Royal Sword 0.1.2", "KotMatrosk1n", "42.3.3", false),
        new("0.1.3", "Royal Sword Calculator", "Royal Sword Calculator", "KotMatrosk1n", "42.3.3", false),
        new("0.1.4", "Royal Sword Calculator", "Royal Sword Calculator", "KotMatrosk1n", "42.3.3", false),
        new("0.1.5", "Royal Sword Calculator", "Royal Sword Calculator", "KotMatrosk1n", "42.3.3", false),
        new("0.1.6", "Royal Sword Calculator", "Royal Sword Calculator", "KotMatrosk1n", "42.3.3", false),
        new("0.1.7", "Royal Sword Calculator", "Royal Sword Calculator", "KotMatrosk1n", "0.1.7", false),
        new("0.1.8", "Royal Sword Calculator", "Royal Sword Calculator", "KotMatrosk1n", "0.1.8", true),
        new("0.1.9", "Royal Sword Calculator", "Royal Sword Calculator", "KotMatrosk1n", "0.1.9", true),
        new("0.2.0", "Royal Sword Calculator", "Royal Sword Calculator", "KotMatrosk1n", "0.2.0", true),
        new("0.2.1", "Royal Sword Calculator", "Royal Sword Calculator", "Matroskin", "0.2.1", true),
        new("0.2.2", "Royal Sword Calculator", "Royal Sword Calculator", "Matroskin", "0.2.2", true),
        new("0.3.21", "Royal Sword Calculator", "Royal Sword Calculator", "Matroskin", "0.3.21", true),
        new("0.4.26", "Royal Sword Calculator", "Royal Sword Calculator", "Matroskin", "0.4.26", true)
    ];

    private static readonly string[] LegacyProfileDirectoryNames =
    [
        "Royal Sword Calculator",
        "Pokemon Royal Sword"
    ];

    private static readonly string[] LegacyUpdaterDirectoryNames =
    [
        "royal-sword-calculator-updater",
        "pokemon-royal-sword-updater"
    ];

    private static readonly string[] LegacyProductDirectoryNames =
    [
        "Royal Sword Calculator",
        "Pokemon Royal Sword"
    ];

    private static readonly string[] LegacyShortcutNames =
    [
        "Royal Sword Calculator.lnk",
        "Pokemon Royal Sword.lnk"
    ];

    internal static void RejectUnsafeCurrentUserInstall(string? cleanupReceipt = null)
    {
        using var cleanupMutex = new CleanupMutexScope();
        var roamingRoot = Environment.GetFolderPath(
            Environment.SpecialFolder.ApplicationData,
            Environment.SpecialFolderOption.DoNotVerify);
        RequireKnownFolder(roamingRoot, "roaming application data");
        RetirePriorCleanupPlans(roamingRoot, cleanupReceipt);
        if (!string.IsNullOrWhiteSpace(cleanupReceipt))
        {
            ValidateCleanupReceipt(cleanupReceipt);
            var planPath = GetCleanupPlanPath(roamingRoot, cleanupReceipt);
            if (ReadCleanupPlan(planPath, cleanupReceipt) is not null)
            {
                return;
            }
        }
        _ = GetValidatedCurrentUserProgramRoots();
    }

    internal static void RejectUnsafeMachineInstallRoot()
    {
        using (var baseKey = RegistryKey.OpenBaseKey(RegistryHive.LocalMachine, RegistryView.Registry32))
        using (var productKey = baseKey.OpenSubKey(LegacyProductRegistryPath, writable: false))
        using (var uninstallKey = baseKey.OpenSubKey(LegacyUninstallRegistryPath, writable: false))
        {
            if (productKey is not null || uninstallKey is not null)
            {
                throw new InvalidOperationException(
                    "An unsupported 32-bit Royal Sword Calculator machine registration was detected. " +
                    "Uninstall it from Windows Settings, then run KM Companion Setup again.");
            }
        }

        var programFilesRoot = Environment.GetFolderPath(
            Environment.SpecialFolder.ProgramFiles,
            Environment.SpecialFolderOption.DoNotVerify);
        RequireKnownFolder(programFilesRoot, "64-bit Program Files");
        foreach (var directoryName in LegacyProductDirectoryNames)
        {
            var legacyRoot = GetKnownChild(programFilesRoot, directoryName);
            if (!PathExists(legacyRoot))
            {
                continue;
            }

            try
            {
                EnsureExistingPathHasNoReparsePoints(legacyRoot);
                EnsureTreeHasNoReparsePoints(legacyRoot);
            }
            catch (Exception exception)
            {
                throw new InvalidOperationException(
                    "The old Royal Sword Calculator installation is reached through a file-system reparse point. " +
                    "Uninstall it from Windows Settings, then run KM Companion Setup again.",
                    exception);
            }
        }
    }

    internal static void RequireMachineCleanupComplete()
    {
        var programFilesRoot = Environment.GetFolderPath(
            Environment.SpecialFolder.ProgramFiles,
            Environment.SpecialFolderOption.DoNotVerify);
        RequireKnownFolder(programFilesRoot, "64-bit Program Files");
        foreach (var directoryName in LegacyProductDirectoryNames)
        {
            var legacyRoot = GetKnownChild(programFilesRoot, directoryName);
            if (PathExists(legacyRoot))
            {
                throw new IOException(
                    $"The old calculator program folder still exists: {legacyRoot}. " +
                    "Restart Windows if setup requested it, then run KM Companion Setup again.");
            }
        }

        foreach (var view in new[] { RegistryView.Registry64, RegistryView.Registry32 })
        {
            using var baseKey = RegistryKey.OpenBaseKey(RegistryHive.LocalMachine, view);
            using var productKey = baseKey.OpenSubKey(LegacyProductRegistryPath, writable: false);
            using var uninstallKey = baseKey.OpenSubKey(LegacyUninstallRegistryPath, writable: false);
            if (productKey is not null || uninstallKey is not null)
            {
                throw new IOException(
                    "The old calculator machine registration is still present. " +
                    "Restart Windows if setup requested it, then run KM Companion Setup again.");
            }
        }
    }

    internal static bool IsCurrentUserCleanupComplete(string cleanupReceipt)
    {
        ValidateCleanupReceipt(cleanupReceipt);
        var roamingRoot = Environment.GetFolderPath(
            Environment.SpecialFolder.ApplicationData,
            Environment.SpecialFolderOption.DoNotVerify);
        RequireKnownFolder(roamingRoot, "roaming application data");
        EnsureExistingPathHasNoReparsePoints(roamingRoot);
        var kmUserDataRoot = GetKnownChild(roamingRoot, "KM Calculator");
        var markerPath = GetKnownChild(kmUserDataRoot, CleanupMarkerFileName);

        FileAttributes attributes;
        try
        {
            attributes = File.GetAttributes(markerPath);
        }
        catch (FileNotFoundException)
        {
            return false;
        }
        catch (DirectoryNotFoundException)
        {
            return false;
        }

        EnsureExistingPathHasNoReparsePoints(markerPath);
        if ((attributes & (FileAttributes.Directory | FileAttributes.ReparsePoint)) != 0)
        {
            throw new IOException("The Royal Sword Calculator cleanup marker is unsafe.");
        }

        var expectedMarker = GetCleanupMarkerValue(cleanupReceipt);
        return string.Equals(File.ReadAllText(markerPath).Trim(), expectedMarker, StringComparison.Ordinal);
    }

    internal static void RemoveCurrentUserArtifacts(string cleanupReceipt)
    {
        using var cleanupMutex = new CleanupMutexScope();
        ValidateCleanupReceipt(cleanupReceipt);
        var failures = new List<string>();
        var roamingRoot = Environment.GetFolderPath(
            Environment.SpecialFolder.ApplicationData,
            Environment.SpecialFolderOption.DoNotVerify);
        var localRoot = Environment.GetFolderPath(
            Environment.SpecialFolder.LocalApplicationData,
            Environment.SpecialFolderOption.DoNotVerify);
        var desktopRoot = Environment.GetFolderPath(
            Environment.SpecialFolder.DesktopDirectory,
            Environment.SpecialFolderOption.DoNotVerify);
        var programsRoot = Environment.GetFolderPath(
            Environment.SpecialFolder.Programs,
            Environment.SpecialFolderOption.DoNotVerify);
        RequireKnownFolder(desktopRoot, "Desktop");
        RequireKnownFolder(programsRoot, "Start Menu Programs");
        RequireKnownFolder(roamingRoot, "roaming application data");
        RequireKnownFolder(localRoot, "local application data");
        RetirePriorCleanupPlans(roamingRoot, cleanupReceipt);
        var cleanupPlanPath = GetCleanupPlanPath(roamingRoot, cleanupReceipt);
        var cleanupPlan = ReadCleanupPlan(cleanupPlanPath, cleanupReceipt);
        IReadOnlyCollection<WindowsNoFollowDeletion.DeletionLease> validatedProgramLeases;
        if (cleanupPlan is null)
        {
            validatedProgramLeases = GetValidatedCurrentUserProgramRootsForRemoval();
            cleanupPlan = new CleanupPlan(
                CaptureCurrentUserRegistrationState(),
                validatedProgramLeases.Select(lease =>
                        new PlannedProgramRoot(
                            lease.DisplayPath,
                            GetQuarantinePath(lease.DisplayPath, cleanupReceipt),
                            lease.Identity,
                            lease.ChangeStamp))
                    .ToArray());
            WriteCleanupPlan(cleanupPlanPath, cleanupReceipt, cleanupPlan);
            QuarantineInitialProgramRoots(
                validatedProgramLeases,
                cleanupPlan.ProgramRoots,
                cleanupPlanPath);
        }
        else
        {
            ValidateCurrentUserRegistrationState(cleanupPlan.RegistrationState);
            validatedProgramLeases = OpenPlannedProgramRoots(cleanupPlan.ProgramRoots, cleanupReceipt);
        }

        RemoveEmptyLineageParents(cleanupPlan.ProgramRoots);
        EnsureAllKnownLegacyProgramRootsAreAbsent();
        RemoveCurrentUserRegistryKeys(cleanupPlan.RegistrationState);
        EnsureCleanupBoundaryIsStillAbsent();
        using (var validatedProgramLeaseScope = new CleanupLeaseScope(validatedProgramLeases))
        {
            RemoveExactPaths(validatedProgramLeases, failures);
            EnsureCleanupBoundaryIsStillAbsent();
            RemoveKnownChildren(roamingRoot, LegacyProfileDirectoryNames, failures);
            EnsureCleanupBoundaryIsStillAbsent();
            RemoveKnownChildren(localRoot, LegacyUpdaterDirectoryNames, failures);
            EnsureCleanupBoundaryIsStillAbsent();
            var shellCleanupSucceeded = false;
            try
            {
                LegacyShellCleanup.RemoveDestinations(GetKnownLegacyShortcutPaths(desktopRoot, programsRoot));
                shellCleanupSucceeded = true;
            }
            catch (Exception exception)
            {
                failures.Add($"Windows shell destinations: {exception.Message}");
            }
            if (shellCleanupSucceeded)
            {
                RemoveKnownChildren(desktopRoot, LegacyShortcutNames, failures);
                RemoveKnownChildren(programsRoot, LegacyShortcutNames, failures);
                RemoveKnownShortcutsFromKnownDirectories(
                    programsRoot,
                    ["Royal Sword Calculator", "Pokemon Royal Sword"],
                    failures);
            }
        }

        if (failures.Count > 0)
        {
            throw new IOException(
                "Close Royal Sword Calculator, then run KM Companion Setup again to retry cleanup. " +
                "Cleanup could not remove: " +
                string.Join("; ", failures));
        }

        ValidateCurrentUserRegistrationState(cleanupPlan.RegistrationState);
        EnsureCleanupBoundaryIsStillAbsent();
        MarkCurrentUserCleanupComplete(roamingRoot, cleanupReceipt);
        try
        {
            WindowsNoFollowDeletion.DeleteTree(cleanupPlanPath);
        }
        catch
        {
            // The receipt-bound completion marker is the commit point. A stale
            // plan is harmless and remains fail-closed for any later install epoch.
        }
    }

    private static void RequireKnownFolder(string path, string displayName)
    {
        if (string.IsNullOrWhiteSpace(path))
        {
            throw new IOException($"Windows did not provide the current user's {displayName} folder.");
        }

        EnsureExistingPathHasNoReparsePoints(path);
        FileAttributes attributes;
        try
        {
            attributes = File.GetAttributes(path);
        }
        catch (Exception exception) when (exception is FileNotFoundException or DirectoryNotFoundException)
        {
            throw new IOException($"The current user's {displayName} folder is unavailable.", exception);
        }
        if ((attributes & (FileAttributes.Directory | FileAttributes.ReparsePoint)) != FileAttributes.Directory)
        {
            throw new IOException($"The current user's {displayName} folder is not a safe directory.");
        }
    }

    private static IReadOnlyDictionary<string, IReadOnlyList<string>> GetKnownLegacyProgramRoots()
    {
        var localProgramsRoot = GetKnownFolderPath(UserProgramFilesFolderId, "Programs for the current user");
        var royalRoot = NormalizePath(GetKnownChild(localProgramsRoot, "Royal Sword Calculator"));
        var pokemonRoot = NormalizePath(GetKnownChild(localProgramsRoot, "Pokemon Royal Sword"));
        var nestedRoyalRoot = NormalizePath(GetKnownChild(pokemonRoot, "Royal Sword Calculator"));
        return new Dictionary<string, IReadOnlyList<string>>(StringComparer.Ordinal)
        {
            ["Pokemon Royal Sword"] = [pokemonRoot],
            ["Royal Sword Calculator"] = [royalRoot, pokemonRoot, nestedRoyalRoot]
        };
    }

    private static IReadOnlyCollection<string> GetValidatedCurrentUserProgramRoots()
    {
        var knownRoots = GetKnownLegacyProgramRoots();
        var validatedRoots = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
        var registrationFound = false;

        foreach (var view in new[] { RegistryView.Registry64, RegistryView.Registry32 })
        {
            using var baseKey = RegistryKey.OpenBaseKey(RegistryHive.CurrentUser, view);
            using var productKey = baseKey.OpenSubKey(LegacyProductRegistryPath, writable: false);
            using var uninstallKey = baseKey.OpenSubKey(LegacyUninstallRegistryPath, writable: false);
            if (productKey is null && uninstallKey is null)
            {
                continue;
            }
            if (productKey is null || uninstallKey is null)
            {
                throw IncompleteCurrentUserRegistration();
            }

            registrationFound = true;
            var installLocation = ReadRequiredRegistryString(productKey, "InstallLocation");
            var normalizedRoot = ValidateRegisteredProgramRoot(
                installLocation,
                knownRoots.Values.SelectMany(paths => paths));
            var version = ReadRequiredRegistryString(uninstallKey, "DisplayVersion");
            var displayName = ReadRequiredRegistryString(uninstallKey, "DisplayName");
            var publisher = ReadRequiredRegistryString(uninstallKey, "Publisher");
            var identity = LegacyReleaseIdentities.SingleOrDefault(candidate =>
                string.Equals(candidate.Version, version, StringComparison.Ordinal) &&
                string.Equals(candidate.DisplayName, displayName, StringComparison.Ordinal) &&
                string.Equals(candidate.Publisher, publisher, StringComparison.Ordinal) &&
                knownRoots[candidate.ProductName].Any(root =>
                    string.Equals(root, normalizedRoot, StringComparison.OrdinalIgnoreCase)));
            if (identity is null)
            {
                throw new InvalidOperationException(
                    "The old Royal Sword Calculator registration does not match a published release that setup can remove safely. " +
                    "Uninstall it from Windows Settings, then run KM Companion Setup again.");
            }

            var uninstallerPath = GetKnownChild(normalizedRoot, $"Uninstall {identity.ProductName}.exe");
            var expectedUninstallCommand = $"\"{uninstallerPath}\" /currentuser";
            if (!string.Equals(
                    ReadRequiredRegistryString(uninstallKey, "UninstallString"),
                    expectedUninstallCommand,
                    StringComparison.OrdinalIgnoreCase))
            {
                throw IncompleteCurrentUserRegistration();
            }

            if (!PathExists(normalizedRoot))
            {
                throw new InvalidOperationException(
                    "The registered Royal Sword Calculator program folder is unavailable. " +
                    "Reconnect its drive or uninstall it from Windows Settings, then run KM Companion Setup again.");
            }

            ValidateLegacyProgramPayload(normalizedRoot, identity);
            validatedRoots.Add(normalizedRoot);
        }

        foreach (var knownRoot in knownRoots.Values.SelectMany(paths => paths).Distinct(StringComparer.OrdinalIgnoreCase))
        {
            if (!PathExists(knownRoot) || validatedRoots.Contains(knownRoot))
            {
                continue;
            }

            if (validatedRoots.Any(root => IsDescendantPath(knownRoot, root)))
            {
                var unexpectedEntries = Directory.EnumerateFileSystemEntries(knownRoot)
                    .Where(entry => !validatedRoots.Any(root =>
                        string.Equals(root, NormalizePath(entry), StringComparison.OrdinalIgnoreCase)))
                    .ToArray();
                if (unexpectedEntries.Length == 0)
                {
                    continue;
                }
            }

            var registrationDescription = registrationFound ? "does not match its registration" : "is not registered";
            throw new InvalidOperationException(
                $"The old calculator folder {knownRoot} {registrationDescription}, so setup will not delete it. " +
                "Uninstall the old app from Windows Settings or remove the leftover folder, then run KM Companion Setup again.");
        }

        return validatedRoots.ToArray();
    }

    private static IReadOnlyCollection<WindowsNoFollowDeletion.DeletionLease>
        GetValidatedCurrentUserProgramRootsForRemoval()
    {
        // Complete registry, payload, and orphan checks first, then immediately anchor
        // each approved root with a no-follow handle that denies rename/delete sharing.
        // Revalidate while those handles stay open so a normal-directory swap cannot
        // change the object between identity proof and recursive deletion.
        var approvedRoots = CollapseOverlappingRoots(GetValidatedCurrentUserProgramRoots());
        var leases = new List<WindowsNoFollowDeletion.DeletionLease>();
        try
        {
            foreach (var root in approvedRoots.OrderBy(candidate => candidate, StringComparer.OrdinalIgnoreCase))
            {
                leases.Add(WindowsNoFollowDeletion.OpenDeletionLease(root));
            }

            var revalidatedRoots = CollapseOverlappingRoots(GetValidatedCurrentUserProgramRoots());
            if (!approvedRoots.OrderBy(candidate => candidate, StringComparer.OrdinalIgnoreCase)
                .SequenceEqual(
                    revalidatedRoots.OrderBy(candidate => candidate, StringComparer.OrdinalIgnoreCase),
                    StringComparer.OrdinalIgnoreCase))
            {
                throw new IOException("The old calculator installation changed while setup was validating it.");
            }

            return leases;
        }
        catch
        {
            foreach (var lease in leases)
            {
                lease.Dispose();
            }
            throw;
        }
    }

    private static IReadOnlyCollection<string> CollapseOverlappingRoots(
        IEnumerable<string> roots)
    {
        var collapsed = new List<string>();
        foreach (var root in roots
                     .Select(NormalizePath)
                     .Distinct(StringComparer.OrdinalIgnoreCase)
                     .OrderBy(path => path.Length))
        {
            if (collapsed.Any(ancestor => IsDescendantPath(ancestor, root)))
            {
                continue;
            }
            collapsed.Add(root);
        }
        return collapsed;
    }

    private static void QuarantineInitialProgramRoots(
        IReadOnlyCollection<WindowsNoFollowDeletion.DeletionLease> leases,
        IReadOnlyCollection<PlannedProgramRoot> plannedRoots,
        string cleanupPlanPath)
    {
        var plansByOriginalPath = plannedRoots.ToDictionary(
            root => root.OriginalPath,
            StringComparer.OrdinalIgnoreCase);
        var quarantinedCount = 0;
        try
        {
            foreach (var lease in leases)
            {
                if (!plansByOriginalPath.TryGetValue(lease.DisplayPath, out var plannedRoot) ||
                    !string.Equals(lease.Identity, plannedRoot.Identity, StringComparison.Ordinal) ||
                    !string.Equals(lease.ChangeStamp, plannedRoot.OriginalChangeStamp, StringComparison.Ordinal))
                {
                    throw new IOException("The old calculator changed before it could be quarantined.");
                }
                if (PathExists(plannedRoot.QuarantinePath))
                {
                    throw new IOException("A conflicting Royal Sword cleanup quarantine already exists.");
                }
                lease.RenameTo(plannedRoot.QuarantinePath);
                quarantinedCount++;
            }
        }
        catch
        {
            foreach (var lease in leases)
            {
                lease.Dispose();
            }
            if (quarantinedCount == 0)
            {
                try
                {
                    WindowsNoFollowDeletion.DeleteTree(cleanupPlanPath);
                }
                catch
                {
                    // Retaining the prepared plan is fail-closed; a future run will
                    // refuse an unquarantined source whose generation is ambiguous.
                }
            }
            throw;
        }
    }

    private static IReadOnlyCollection<WindowsNoFollowDeletion.DeletionLease> OpenPlannedProgramRoots(
        IEnumerable<PlannedProgramRoot> plannedRoots,
        string cleanupReceipt)
    {
        var allowedRoots = GetKnownLegacyProgramRoots().Values
            .SelectMany(paths => paths)
            .ToHashSet(StringComparer.OrdinalIgnoreCase);
        var leases = new List<WindowsNoFollowDeletion.DeletionLease>();
        try
        {
            foreach (var plannedRoot in plannedRoots
                         .GroupBy(root => root.OriginalPath, StringComparer.OrdinalIgnoreCase)
                         .Select(group => group.Single()))
            {
                var normalizedOriginalRoot = NormalizePath(plannedRoot.OriginalPath);
                var normalizedQuarantineRoot = NormalizePath(plannedRoot.QuarantinePath);
                if (!allowedRoots.Contains(normalizedOriginalRoot) ||
                    !string.Equals(
                        normalizedQuarantineRoot,
                        GetQuarantinePath(normalizedOriginalRoot, cleanupReceipt),
                        StringComparison.OrdinalIgnoreCase))
                {
                    throw new InvalidDataException("The Royal Sword cleanup plan contains an unsafe program root.");
                }

                if (PathExists(normalizedQuarantineRoot))
                {
                    var quarantinedLease = WindowsNoFollowDeletion.OpenDeletionLease(normalizedQuarantineRoot);
                    if (!string.Equals(quarantinedLease.Identity, plannedRoot.Identity, StringComparison.Ordinal))
                    {
                        quarantinedLease.Dispose();
                        throw new IOException(
                            "The old calculator cleanup quarantine was replaced after cleanup began.");
                    }
                    leases.Add(quarantinedLease);
                    continue;
                }
                if (!PathExists(normalizedOriginalRoot))
                {
                    continue;
                }
                throw new IOException(
                    "Cleanup stopped before the old calculator program folder could be quarantined. " +
                    "Setup cannot distinguish that folder from a reinstall in the same location and will not delete it. " +
                    "Remove the old app manually, then run KM Companion Setup again.");
            }
            return leases;
        }
        catch
        {
            foreach (var lease in leases)
            {
                lease.Dispose();
            }
            throw;
        }
    }

    private static string GetQuarantinePath(string originalPath, string cleanupReceipt)
    {
        ValidateCleanupReceipt(cleanupReceipt);
        var localProgramsRoot = GetKnownFolderPath(UserProgramFilesFolderId, "Programs for the current user");
        var royalRoot = NormalizePath(GetKnownChild(localProgramsRoot, "Royal Sword Calculator"));
        var pokemonRoot = NormalizePath(GetKnownChild(localProgramsRoot, "Pokemon Royal Sword"));
        var nestedRoyalRoot = NormalizePath(GetKnownChild(pokemonRoot, "Royal Sword Calculator"));
        var normalizedOriginal = NormalizePath(originalPath);
        var kind = string.Equals(normalizedOriginal, royalRoot, StringComparison.OrdinalIgnoreCase)
            ? "royal"
            : string.Equals(normalizedOriginal, pokemonRoot, StringComparison.OrdinalIgnoreCase)
                ? "pokemon"
                : string.Equals(normalizedOriginal, nestedRoyalRoot, StringComparison.OrdinalIgnoreCase)
                    ? "nested"
                    : throw new InvalidDataException("The Royal Sword cleanup plan has an unknown source root.");
        return GetKnownChild(
            localProgramsRoot,
            $".km-calculator-legacy-cleanup-{cleanupReceipt}-{kind}");
    }

    private static void RemoveEmptyLineageParents(IEnumerable<PlannedProgramRoot> plannedRoots)
    {
        var failures = new List<string>();
        foreach (var plannedRoot in plannedRoots)
        {
            TryRemoveEmptyKnownParent(plannedRoot.OriginalPath, "Pokemon Royal Sword", failures);
        }
        if (failures.Count > 0)
        {
            throw new IOException(
                "The historical Royal Sword Calculator parent folder could not be removed: " +
                string.Join("; ", failures));
        }
    }

    private static IReadOnlyDictionary<string, string> CaptureCurrentUserRegistrationState()
    {
        var state = new Dictionary<string, string>(StringComparer.Ordinal);
        foreach (var target in LegacyRegistryTargets)
        {
            state.Add(target.Label, ReadCurrentUserRegistrationState(target));
        }
        return state;
    }

    private static void ValidateCurrentUserRegistrationState(
        IReadOnlyDictionary<string, string> expectedState)
    {
        ValidateRegistrationStateShape(expectedState);
        foreach (var target in LegacyRegistryTargets)
        {
            var expected = expectedState[target.Label];
            var current = ReadCurrentUserRegistrationState(target);
            if (string.Equals(expected, AbsentRegistrationState, StringComparison.Ordinal))
            {
                if (!string.Equals(current, AbsentRegistrationState, StringComparison.Ordinal))
                {
                    throw RegistrationChangedAfterCleanupBegan();
                }
                continue;
            }

            // A key from the original registration may already be absent after a
            // partially completed prior attempt. Any present key must still be the
            // exact original object; a modified or recreated registration is never
            // consumed by the pending cleanup authorization.
            if (!string.Equals(current, AbsentRegistrationState, StringComparison.Ordinal) &&
                !string.Equals(current, expected, StringComparison.Ordinal))
            {
                throw RegistrationChangedAfterCleanupBegan();
            }
        }
    }

    private static string ReadCurrentUserRegistrationState(LegacyRegistryTarget target)
    {
        using var baseKey = RegistryKey.OpenBaseKey(RegistryHive.CurrentUser, target.View);
        using var key = baseKey.OpenSubKey(target.Path, writable: false);
        if (key is null)
        {
            return AbsentRegistrationState;
        }

        var fingerprint = new StringBuilder();
        AppendRegistryKeyFingerprint(fingerprint, key, relativePath: string.Empty);
        return RegistryFingerprintPrefix +
               Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(fingerprint.ToString())));
    }

    private static void AppendRegistryKeyFingerprint(
        StringBuilder fingerprint,
        RegistryKey key,
        string relativePath)
    {
        AppendFingerprintField(fingerprint, "key");
        AppendFingerprintField(fingerprint, relativePath);

        foreach (var valueName in key.GetValueNames().OrderBy(name => name, StringComparer.Ordinal))
        {
            AppendFingerprintField(fingerprint, "value");
            AppendFingerprintField(fingerprint, valueName);
            var kind = key.GetValueKind(valueName);
            AppendFingerprintField(fingerprint, ((int)kind).ToString(CultureInfo.InvariantCulture));
            var value = key.GetValue(valueName, null, RegistryValueOptions.DoNotExpandEnvironmentNames)
                ?? throw new IOException("A Royal Sword Calculator registry value could not be read.");
            AppendRegistryValueFingerprint(fingerprint, value);
        }

        foreach (var subKeyName in key.GetSubKeyNames().OrderBy(name => name, StringComparer.Ordinal))
        {
            using var subKey = key.OpenSubKey(subKeyName, writable: false)
                ?? throw new IOException("A Royal Sword Calculator registry subkey changed while it was read.");
            var childPath = string.IsNullOrEmpty(relativePath)
                ? subKeyName
                : relativePath + "\\" + subKeyName;
            AppendRegistryKeyFingerprint(fingerprint, subKey, childPath);
        }
    }

    private static void AppendRegistryValueFingerprint(StringBuilder fingerprint, object value)
    {
        switch (value)
        {
            case string text:
                AppendFingerprintField(fingerprint, "string");
                AppendFingerprintField(fingerprint, text);
                break;
            case string[] strings:
                AppendFingerprintField(fingerprint, "strings");
                AppendFingerprintField(fingerprint, strings.Length.ToString(CultureInfo.InvariantCulture));
                foreach (var item in strings)
                {
                    AppendFingerprintField(fingerprint, item);
                }
                break;
            case byte[] bytes:
                AppendFingerprintField(fingerprint, "bytes");
                AppendFingerprintField(fingerprint, Convert.ToBase64String(bytes));
                break;
            case int number:
                AppendFingerprintField(fingerprint, "int32");
                AppendFingerprintField(fingerprint, number.ToString(CultureInfo.InvariantCulture));
                break;
            case long number:
                AppendFingerprintField(fingerprint, "int64");
                AppendFingerprintField(fingerprint, number.ToString(CultureInfo.InvariantCulture));
                break;
            default:
                throw new IOException(
                    $"A Royal Sword Calculator registry value has an unsupported type: {value.GetType().FullName}.");
        }
    }

    private static void AppendFingerprintField(StringBuilder fingerprint, string value)
    {
        fingerprint.Append(value.Length.ToString(CultureInfo.InvariantCulture));
        fingerprint.Append(':');
        fingerprint.Append(value);
    }

    private static void ValidateRegistrationStateShape(
        IReadOnlyDictionary<string, string> registrationState)
    {
        if (registrationState.Count != LegacyRegistryTargets.Length)
        {
            throw new InvalidDataException("The Royal Sword cleanup plan has incomplete registry state.");
        }

        var expectedLabels = LegacyRegistryTargets
            .Select(target => target.Label)
            .ToHashSet(StringComparer.Ordinal);
        foreach (var pair in registrationState)
        {
            if (!expectedLabels.Contains(pair.Key) || !IsValidRegistrationState(pair.Value))
            {
                throw new InvalidDataException("The Royal Sword cleanup plan has invalid registry state.");
            }
        }
    }

    private static bool IsValidRegistrationState(string state)
    {
        if (string.Equals(state, AbsentRegistrationState, StringComparison.Ordinal))
        {
            return true;
        }
        if (!state.StartsWith(RegistryFingerprintPrefix, StringComparison.Ordinal) ||
            state.Length != RegistryFingerprintPrefix.Length + 64)
        {
            return false;
        }
        return state.AsSpan(RegistryFingerprintPrefix.Length).IndexOfAnyExcept(
            "0123456789ABCDEF".AsSpan()) < 0;
    }

    private static InvalidOperationException RegistrationChangedAfterCleanupBegan() =>
        new(
            "Royal Sword Calculator was installed again or its registration changed after cleanup began. " +
            "Setup will not remove the new or changed installation.");

    private static void EnsureAllKnownLegacyProgramRootsAreAbsent()
    {
        var existingRoot = GetKnownLegacyProgramRoots().Values
            .SelectMany(paths => paths)
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .FirstOrDefault(PathExists);
        if (existingRoot is not null)
        {
            throw new IOException(
                $"The old calculator program folder still exists or was recreated: {existingRoot}. " +
                "Setup will not remove a replacement installation.");
        }
    }

    private static bool AllKnownLegacyProgramRootsAreAbsent() =>
        !GetKnownLegacyProgramRoots().Values
            .SelectMany(paths => paths)
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .Any(PathExists);

    private static void EnsureCleanupBoundaryIsStillAbsent()
    {
        EnsureAllKnownLegacyProgramRootsAreAbsent();
        foreach (var target in LegacyRegistryTargets)
        {
            if (!string.Equals(
                    ReadCurrentUserRegistrationState(target),
                    AbsentRegistrationState,
                    StringComparison.Ordinal))
            {
                throw RegistrationChangedAfterCleanupBegan();
            }
        }
    }

    private static string ReadRequiredRegistryString(RegistryKey key, string valueName)
    {
        var value = key.GetValue(valueName, null, RegistryValueOptions.DoNotExpandEnvironmentNames);
        if (value is string text && !string.IsNullOrWhiteSpace(text))
        {
            return text;
        }

        throw IncompleteCurrentUserRegistration();
    }

    private static string ValidateRegisteredProgramRoot(string value, IEnumerable<string> allowedRoots)
    {
        try
        {
            if (!Path.IsPathFullyQualified(value) || value.StartsWith(@"\\", StringComparison.Ordinal))
            {
                throw new InvalidDataException("The install location is not a fully qualified local path.");
            }
            var normalized = NormalizePath(value);
            if (allowedRoots.Any(root => string.Equals(root, normalized, StringComparison.OrdinalIgnoreCase)))
            {
                return normalized;
            }
        }
        catch (Exception exception)
        {
            throw new InvalidOperationException(
                "The old Royal Sword Calculator registration contains an invalid install location. " +
                "Uninstall it from Windows Settings, then run KM Companion Setup again.",
                exception);
        }

        throw new InvalidOperationException(
            "Royal Sword Calculator is registered in a custom folder for the current user that KM Companion Setup " +
            "will not delete or assume is gone. Uninstall Royal Sword Calculator from Windows Settings, " +
            "then run KM Companion Setup again.");
    }

    private static void ValidateLegacyProgramPayload(string rootPath, LegacyReleaseIdentity identity)
    {
        EnsureExistingPathHasNoReparsePoints(rootPath);
        EnsureTreeHasNoReparsePoints(rootPath);

        var mainExecutable = GetKnownChild(rootPath, $"{identity.ProductName}.exe");
        var uninstaller = GetKnownChild(rootPath, $"Uninstall {identity.ProductName}.exe");
        var resources = GetKnownChild(rootPath, "resources");
        var appArchive = GetKnownChild(resources, "app.asar");
        var updaterConfig = GetKnownChild(resources, "app-update.yml");
        if (!File.Exists(mainExecutable) ||
            !File.Exists(uninstaller) ||
            !File.Exists(appArchive) ||
            !File.Exists(updaterConfig) ||
            !FileVersionsMatch(mainExecutable, identity.MainExecutableVersion) ||
            !FileVersionsMatch(uninstaller, identity.Version))
        {
            throw new InvalidOperationException(
                "The old Royal Sword Calculator program files do not match the registered published release. " +
                "Uninstall it from Windows Settings, then run KM Companion Setup again.");
        }

        if (identity.RequiresSpriteManifest)
        {
            var sprites = GetKnownChild(resources, "sprites");
            var manifest = GetKnownChild(sprites, "manifest.json");
            if (!File.Exists(manifest))
            {
                throw new InvalidOperationException(
                    "The old Royal Sword Calculator sprite payload is incomplete. " +
                    "Uninstall it from Windows Settings, then run KM Companion Setup again.");
            }
        }
    }

    private static bool FileVersionsMatch(string path, string expected)
    {
        try
        {
            var actualVersion = FileVersionInfo.GetVersionInfo(path).FileVersion;
            return Version.TryParse(actualVersion, out var actual) &&
                   Version.TryParse(expected, out var expectedVersion) &&
                   actual.Major == expectedVersion.Major &&
                   actual.Minor == expectedVersion.Minor &&
                   NormalizeVersionComponent(actual.Build) == NormalizeVersionComponent(expectedVersion.Build) &&
                   NormalizeVersionComponent(actual.Revision) == NormalizeVersionComponent(expectedVersion.Revision);
        }
        catch
        {
            return false;
        }
    }

    private static int NormalizeVersionComponent(int value) => value < 0 ? 0 : value;

    private static bool IsDescendantPath(string parentPath, string candidatePath)
    {
        var relativePath = Path.GetRelativePath(parentPath, candidatePath);
        return !string.IsNullOrWhiteSpace(relativePath) &&
               !string.Equals(relativePath, ".", StringComparison.Ordinal) &&
               !IsParentReference(relativePath) &&
               !Path.IsPathFullyQualified(relativePath);
    }

    private static InvalidOperationException IncompleteCurrentUserRegistration() =>
        new(
            "The old Royal Sword Calculator registration is incomplete. " +
            "Uninstall it from Windows Settings, then run KM Companion Setup again.");

    private static void RemoveExactPaths(
        IEnumerable<WindowsNoFollowDeletion.DeletionLease> leases,
        ICollection<string> failures)
    {
        foreach (var lease in leases.OrderByDescending(candidate => candidate.DisplayPath.Length))
        {
            var path = lease.DisplayPath;
            try
            {
                lease.DeleteTree();
                TryRemoveEmptyKnownParent(path, "Pokemon Royal Sword", failures);
            }
            catch (Exception exception)
            {
                failures.Add($"{path}: {exception.Message}");
            }
        }
    }

    private sealed class CleanupLeaseScope(
        IEnumerable<WindowsNoFollowDeletion.DeletionLease> leases) : IDisposable
    {
        public void Dispose()
        {
            foreach (var lease in leases)
            {
                lease.Dispose();
            }
        }
    }

    private static string GetKnownFolderPath(Guid folderId, string displayName)
    {
        var result = SHGetKnownFolderPath(folderId, KnownFolderFlagDoNotVerify, nint.Zero, out var pathPointer);
        if (result < 0)
        {
            Marshal.ThrowExceptionForHR(result);
        }

        try
        {
            var path = Marshal.PtrToStringUni(pathPointer);
            if (string.IsNullOrWhiteSpace(path))
            {
                throw new IOException($"Windows did not provide the current user's {displayName} folder.");
            }
            return NormalizePath(path);
        }
        finally
        {
            Marshal.FreeCoTaskMem(pathPointer);
        }
    }

    [DllImport("shell32.dll", CharSet = CharSet.Unicode, ExactSpelling = true)]
    private static extern int SHGetKnownFolderPath(
        in Guid folderId,
        uint flags,
        nint token,
        out nint path);

    private static void TryRemoveEmptyKnownParent(
        string removedPath,
        string expectedParentName,
        ICollection<string> failures)
    {
        var parent = Directory.GetParent(removedPath)?.FullName;
        if (string.IsNullOrWhiteSpace(parent) ||
            !string.Equals(Path.GetFileName(parent), expectedParentName, StringComparison.Ordinal) ||
            !PathExists(parent))
        {
            return;
        }

        try
        {
            EnsureExistingPathHasNoReparsePoints(parent);
            if (!Directory.EnumerateFileSystemEntries(parent).Any())
            {
                WindowsNoFollowDeletion.DeleteEmptyDirectory(parent);
            }
        }
        catch (Exception exception)
        {
            failures.Add($"{parent}: {exception.Message}");
        }
    }

    private static void RemoveKnownChildren(string rootPath, IEnumerable<string> childNames, ICollection<string> failures)
    {
        if (string.IsNullOrWhiteSpace(rootPath))
        {
            return;
        }

        try
        {
            EnsureExistingPathHasNoReparsePoints(rootPath);
        }
        catch (Exception exception)
        {
            failures.Add($"{rootPath}: {exception.Message}");
            return;
        }

        foreach (var childName in childNames)
        {
            string targetPath;
            try
            {
                targetPath = GetKnownChild(rootPath, childName);
                if (PathExists(targetPath))
                {
                    EnsureExistingPathHasNoReparsePoints(targetPath);
                    EnsureTreeHasNoReparsePoints(targetPath);
                }
                RemoveWithRetries(targetPath);
            }
            catch (Exception exception)
            {
                failures.Add($"{childName}: {exception.Message}");
            }
        }
    }

    private static void RemoveKnownShortcutsFromKnownDirectories(
        string rootPath,
        IEnumerable<string> directoryNames,
        ICollection<string> failures)
    {
        if (string.IsNullOrWhiteSpace(rootPath))
        {
            return;
        }

        try
        {
            EnsureExistingPathHasNoReparsePoints(rootPath);
        }
        catch (Exception exception)
        {
            failures.Add($"{rootPath}: {exception.Message}");
            return;
        }

        foreach (var directoryName in directoryNames)
        {
            try
            {
                var directoryPath = GetKnownChild(rootPath, directoryName);
                if (!PathExists(directoryPath))
                {
                    continue;
                }

                EnsureExistingPathHasNoReparsePoints(directoryPath);
                var attributes = File.GetAttributes(directoryPath);
                if ((attributes & FileAttributes.ReparsePoint) != 0)
                {
                    throw new IOException($"The old shortcut folder is a reparse point: {directoryPath}");
                }
                if ((attributes & FileAttributes.Directory) == 0)
                {
                    continue;
                }

                foreach (var shortcutName in LegacyShortcutNames)
                {
                    var shortcutPath = GetKnownChild(directoryPath, shortcutName);
                    if (PathExists(shortcutPath))
                    {
                        EnsureExistingPathHasNoReparsePoints(shortcutPath);
                        var shortcutAttributes = File.GetAttributes(shortcutPath);
                        if ((shortcutAttributes & FileAttributes.Directory) != 0)
                        {
                            throw new IOException($"The old shortcut target is not a file: {shortcutPath}");
                        }
                    }
                    RemoveWithRetries(shortcutPath);
                }

                if (!Directory.EnumerateFileSystemEntries(directoryPath).Any())
                {
                    WindowsNoFollowDeletion.DeleteEmptyDirectory(directoryPath);
                }
            }
            catch (Exception exception)
            {
                failures.Add($"{directoryName}: {exception.Message}");
            }
        }
    }

    private static IReadOnlyCollection<string> GetKnownLegacyShortcutPaths(
        string desktopRoot,
        string programsRoot)
    {
        var paths = new List<string>();
        foreach (var shortcutName in LegacyShortcutNames)
        {
            paths.Add(GetKnownChild(desktopRoot, shortcutName));
            paths.Add(GetKnownChild(programsRoot, shortcutName));
        }
        foreach (var directoryName in new[] { "Royal Sword Calculator", "Pokemon Royal Sword" })
        {
            var directoryPath = GetKnownChild(programsRoot, directoryName);
            foreach (var shortcutName in LegacyShortcutNames)
            {
                paths.Add(GetKnownChild(directoryPath, shortcutName));
            }
        }
        return paths;
    }

    private static string GetKnownChild(string rootPath, string childName)
    {
        if (string.IsNullOrWhiteSpace(rootPath) ||
            string.IsNullOrWhiteSpace(childName) ||
            !string.Equals(Path.GetFileName(childName), childName, StringComparison.Ordinal) ||
            childName is "." or "..")
        {
            throw new InvalidDataException("A legacy cleanup target is invalid.");
        }

        var normalizedRoot = NormalizePath(rootPath);
        var normalizedChild = NormalizePath(Path.Combine(normalizedRoot, childName));
        var relativePath = Path.GetRelativePath(normalizedRoot, normalizedChild);
        if (string.IsNullOrWhiteSpace(relativePath) ||
            IsParentReference(relativePath) ||
            Path.IsPathFullyQualified(relativePath))
        {
            throw new InvalidDataException("A legacy cleanup target escaped its known Windows folder.");
        }

        return normalizedChild;
    }

    private static string NormalizePath(string path) =>
        Path.TrimEndingDirectorySeparator(Path.GetFullPath(path));

    private static bool IsParentReference(string relativePath) =>
        string.Equals(relativePath, "..", StringComparison.Ordinal) ||
        relativePath.StartsWith(".." + Path.DirectorySeparatorChar, StringComparison.Ordinal) ||
        relativePath.StartsWith(".." + Path.AltDirectorySeparatorChar, StringComparison.Ordinal);

    private static void EnsureExistingPathHasNoReparsePoints(string path)
    {
        var normalizedPath = NormalizePath(path);
        var rootPath = Path.GetPathRoot(normalizedPath);
        if (string.IsNullOrWhiteSpace(rootPath))
        {
            throw new InvalidDataException("A legacy cleanup root is not fully qualified.");
        }

        var currentPath = rootPath;
        var relativePath = Path.GetRelativePath(rootPath, normalizedPath);
        foreach (var segment in relativePath.Split(
            [Path.DirectorySeparatorChar, Path.AltDirectorySeparatorChar],
            StringSplitOptions.RemoveEmptyEntries))
        {
            currentPath = Path.Combine(currentPath, segment);
            FileAttributes attributes;
            try
            {
                attributes = File.GetAttributes(currentPath);
            }
            catch (FileNotFoundException)
            {
                return;
            }
            catch (DirectoryNotFoundException)
            {
                return;
            }

            if ((attributes & FileAttributes.ReparsePoint) != 0)
            {
                throw new IOException($"A legacy cleanup root traverses a reparse point: {currentPath}");
            }
        }
    }

    private static void EnsureTreeHasNoReparsePoints(string path)
    {
        var attributes = File.GetAttributes(path);
        if ((attributes & FileAttributes.ReparsePoint) != 0)
        {
            throw new IOException($"The old installation contains a reparse point: {path}");
        }
        if ((attributes & FileAttributes.Directory) == 0)
        {
            return;
        }

        foreach (var entry in Directory.EnumerateFileSystemEntries(path))
        {
            EnsureTreeHasNoReparsePoints(entry);
        }
    }

    private static bool PathExists(string path)
    {
        try
        {
            _ = File.GetAttributes(path);
            return true;
        }
        catch (FileNotFoundException)
        {
            return false;
        }
        catch (DirectoryNotFoundException)
        {
            return false;
        }
    }

    private static void RemoveWithRetries(string path)
    {
        Exception? lastError = null;
        for (var attempt = 0; attempt < 4; attempt++)
        {
            try
            {
                WindowsNoFollowDeletion.DeleteTree(path);
                return;
            }
            catch (Exception exception) when (attempt < 3)
            {
                lastError = exception;
                Thread.Sleep(100 * (attempt + 1));
            }
        }

        throw lastError ?? new IOException($"{path} could not be removed.");
    }

    private static void RemoveCurrentUserRegistryKeys(
        IReadOnlyDictionary<string, string> expectedState)
    {
        ValidateRegistrationStateShape(expectedState);
        foreach (var target in LegacyRegistryTargets)
        {
            EnsureAllKnownLegacyProgramRootsAreAbsent();
            var current = ReadCurrentUserRegistrationState(target);
            if (string.Equals(current, AbsentRegistrationState, StringComparison.Ordinal))
            {
                continue;
            }
            if (string.Equals(expectedState[target.Label], AbsentRegistrationState, StringComparison.Ordinal) ||
                !string.Equals(current, expectedState[target.Label], StringComparison.Ordinal))
            {
                throw RegistrationChangedAfterCleanupBegan();
            }

            using var baseKey = RegistryKey.OpenBaseKey(RegistryHive.CurrentUser, target.View);
            baseKey.DeleteSubKeyTree(target.Path, throwOnMissingSubKey: false);
        }

        foreach (var target in LegacyRegistryTargets)
        {
            if (!string.Equals(
                    ReadCurrentUserRegistrationState(target),
                    AbsentRegistrationState,
                    StringComparison.Ordinal))
            {
                throw new IOException("Royal Sword Calculator registry settings could not be removed.");
            }
        }
    }

    private static void MarkCurrentUserCleanupComplete(string roamingRoot, string cleanupReceipt)
    {
        EnsureExistingPathHasNoReparsePoints(roamingRoot);
        var kmUserDataRoot = GetKnownChild(roamingRoot, "KM Calculator");
        Directory.CreateDirectory(kmUserDataRoot);
        EnsureExistingPathHasNoReparsePoints(kmUserDataRoot);

        var markerPath = GetKnownChild(kmUserDataRoot, CleanupMarkerFileName);
        if (PathExists(markerPath))
        {
            EnsureExistingPathHasNoReparsePoints(markerPath);
            var markerAttributes = File.GetAttributes(markerPath);
            if ((markerAttributes & (FileAttributes.Directory | FileAttributes.ReparsePoint)) != 0)
            {
                throw new IOException("The Royal Sword Calculator cleanup marker is unsafe.");
            }
        }
        var temporaryPath = GetKnownChild(
            kmUserDataRoot,
            $"{CleanupMarkerFileName}.tmp-{Environment.ProcessId}-{Guid.NewGuid():N}");
        try
        {
            WriteDurableLines(temporaryPath, [GetCleanupMarkerValue(cleanupReceipt)]);
            File.Move(temporaryPath, markerPath, overwrite: true);
        }
        finally
        {
            WindowsNoFollowDeletion.DeleteTree(temporaryPath);
        }
    }

    private static string GetCleanupPlanPath(string roamingRoot, string cleanupReceipt)
    {
        ValidateCleanupReceipt(cleanupReceipt);
        var kmUserDataRoot = GetKnownChild(roamingRoot, "KM Calculator");
        Directory.CreateDirectory(kmUserDataRoot);
        EnsureExistingPathHasNoReparsePoints(kmUserDataRoot);
        return GetKnownChild(
            kmUserDataRoot,
            CleanupPlanFileNamePrefix + cleanupReceipt + CleanupPlanFileNameSuffix);
    }

    private static void RetirePriorCleanupPlans(string roamingRoot, string? currentCleanupReceipt)
    {
        if (!string.IsNullOrWhiteSpace(currentCleanupReceipt))
        {
            ValidateCleanupReceipt(currentCleanupReceipt);
        }
        var kmUserDataRoot = GetKnownChild(roamingRoot, "KM Calculator");
        if (!PathExists(kmUserDataRoot))
        {
            return;
        }
        EnsureExistingPathHasNoReparsePoints(kmUserDataRoot);
        var kmUserDataAttributes = File.GetAttributes(kmUserDataRoot);
        if ((kmUserDataAttributes & (FileAttributes.Directory | FileAttributes.ReparsePoint)) !=
            FileAttributes.Directory)
        {
            throw new IOException("The KM Companion user data root is not a safe directory.");
        }

        foreach (var candidatePath in Directory.EnumerateFiles(
                     kmUserDataRoot,
                     CleanupPlanFileNamePrefix + "*" + CleanupPlanFileNameSuffix,
                     SearchOption.TopDirectoryOnly))
        {
            var fileName = Path.GetFileName(candidatePath);
            if (!TryGetCleanupReceiptFromPlanFileName(fileName, out var priorReceipt) ||
                (!string.IsNullOrWhiteSpace(currentCleanupReceipt) &&
                 string.Equals(priorReceipt, currentCleanupReceipt, StringComparison.Ordinal)))
            {
                continue;
            }
            var planPath = GetKnownChild(kmUserDataRoot, fileName);
            if (!string.Equals(
                    NormalizePath(candidatePath),
                    NormalizePath(planPath),
                    StringComparison.OrdinalIgnoreCase))
            {
                throw new InvalidDataException("A prior Royal Sword cleanup plan path is unsafe.");
            }
            var priorPlan = ReadCleanupPlan(planPath, priorReceipt)
                ?? throw new IOException("A prior Royal Sword cleanup plan disappeared while it was read.");
            var leases = OpenPriorQuarantinedProgramRoots(priorPlan.ProgramRoots, priorReceipt);
            try
            {
                foreach (var lease in leases)
                {
                    lease.DeleteTree();
                }
            }
            finally
            {
                foreach (var lease in leases)
                {
                    lease.Dispose();
                }
            }
            foreach (var plannedRoot in priorPlan.ProgramRoots)
            {
                if (PathExists(plannedRoot.QuarantinePath))
                {
                    throw new IOException(
                        "A prior Royal Sword cleanup quarantine could not be retired safely.");
                }
            }
            RemoveEmptyLineageParents(priorPlan.ProgramRoots);
            if (AllKnownLegacyProgramRootsAreAbsent())
            {
                ValidateCurrentUserRegistrationState(priorPlan.RegistrationState);
                RemoveCurrentUserRegistryKeys(priorPlan.RegistrationState);
            }
            WindowsNoFollowDeletion.DeleteTree(planPath);
        }
    }

    private static IReadOnlyCollection<WindowsNoFollowDeletion.DeletionLease>
        OpenPriorQuarantinedProgramRoots(
            IEnumerable<PlannedProgramRoot> plannedRoots,
            string priorReceipt)
    {
        var allowedRoots = GetKnownLegacyProgramRoots().Values
            .SelectMany(paths => paths)
            .ToHashSet(StringComparer.OrdinalIgnoreCase);
        var leases = new List<WindowsNoFollowDeletion.DeletionLease>();
        try
        {
            foreach (var plannedRoot in plannedRoots)
            {
                var originalPath = NormalizePath(plannedRoot.OriginalPath);
                var quarantinePath = NormalizePath(plannedRoot.QuarantinePath);
                if (!allowedRoots.Contains(originalPath) ||
                    !string.Equals(
                        quarantinePath,
                        GetQuarantinePath(originalPath, priorReceipt),
                        StringComparison.OrdinalIgnoreCase))
                {
                    throw new InvalidDataException("A prior Royal Sword cleanup plan has an unsafe root.");
                }
                if (!PathExists(quarantinePath))
                {
                    continue;
                }
                var lease = WindowsNoFollowDeletion.OpenDeletionLease(quarantinePath);
                if (!string.Equals(lease.Identity, plannedRoot.Identity, StringComparison.Ordinal))
                {
                    lease.Dispose();
                    throw new IOException("A prior Royal Sword cleanup quarantine was replaced.");
                }
                leases.Add(lease);
            }
            return leases;
        }
        catch
        {
            foreach (var lease in leases)
            {
                lease.Dispose();
            }
            throw;
        }
    }

    private static bool TryGetCleanupReceiptFromPlanFileName(
        string fileName,
        out string cleanupReceipt)
    {
        cleanupReceipt = string.Empty;
        if (!fileName.StartsWith(CleanupPlanFileNamePrefix, StringComparison.Ordinal) ||
            !fileName.EndsWith(CleanupPlanFileNameSuffix, StringComparison.Ordinal) ||
            fileName.Length != CleanupPlanFileNamePrefix.Length + 32 + CleanupPlanFileNameSuffix.Length)
        {
            return false;
        }
        var candidate = fileName.Substring(CleanupPlanFileNamePrefix.Length, 32);
        if (!Guid.TryParseExact(candidate, "N", out _))
        {
            return false;
        }
        cleanupReceipt = candidate;
        return true;
    }

    private static CleanupPlan? ReadCleanupPlan(string planPath, string cleanupReceipt)
    {
        if (!PathExists(planPath))
        {
            return null;
        }
        EnsureExistingPathHasNoReparsePoints(planPath);
        var attributes = File.GetAttributes(planPath);
        if ((attributes & (FileAttributes.Directory | FileAttributes.ReparsePoint)) != 0)
        {
            throw new IOException("The Royal Sword Calculator cleanup plan is unsafe.");
        }

        var lines = File.ReadAllLines(planPath);
        if (lines.Length == 0 ||
            !string.Equals(lines[0], GetCleanupMarkerValue(cleanupReceipt), StringComparison.Ordinal))
        {
            throw new IOException("The Royal Sword Calculator cleanup plan does not match this installation.");
        }
        var registrationState = new Dictionary<string, string>(StringComparer.Ordinal);
        var programRoots = new List<PlannedProgramRoot>();
        foreach (var line in lines.Skip(1))
        {
            if (string.IsNullOrWhiteSpace(line))
            {
                throw new InvalidDataException("The Royal Sword cleanup plan contains an empty record.");
            }
            var fields = line.Split('|');
            if (fields.Length == 3 && string.Equals(fields[0], "registry", StringComparison.Ordinal))
            {
                if (!registrationState.TryAdd(fields[1], fields[2]))
                {
                    throw new InvalidDataException("The Royal Sword cleanup plan repeats registry state.");
                }
                continue;
            }
            if (fields.Length == 5 && string.Equals(fields[0], "root", StringComparison.Ordinal))
            {
                string originalPath;
                string quarantinePath;
                try
                {
                    originalPath = Encoding.UTF8.GetString(Convert.FromBase64String(fields[1]));
                    quarantinePath = Encoding.UTF8.GetString(Convert.FromBase64String(fields[2]));
                }
                catch (Exception exception) when (exception is FormatException or DecoderFallbackException)
                {
                    throw new InvalidDataException(
                        "The Royal Sword cleanup plan contains an invalid program root.",
                        exception);
                }
                if (!IsValidFileIdentity(fields[3]) || !IsValidChangeStamp(fields[4]))
                {
                    throw new InvalidDataException(
                        "The Royal Sword cleanup plan contains an invalid program identity.");
                }
                programRoots.Add(new PlannedProgramRoot(
                    originalPath,
                    quarantinePath,
                    fields[3],
                    fields[4]));
                continue;
            }
            throw new InvalidDataException("The Royal Sword cleanup plan contains an invalid record.");
        }

        ValidateRegistrationStateShape(registrationState);
        if (programRoots.GroupBy(root => root.OriginalPath, StringComparer.OrdinalIgnoreCase)
                .Any(group => group.Count() != 1) ||
            programRoots.GroupBy(root => root.QuarantinePath, StringComparer.OrdinalIgnoreCase)
                .Any(group => group.Count() != 1))
        {
            throw new InvalidDataException("The Royal Sword cleanup plan repeats a program root.");
        }
        return new CleanupPlan(registrationState, programRoots);
    }

    private static void WriteCleanupPlan(
        string planPath,
        string cleanupReceipt,
        CleanupPlan cleanupPlan)
    {
        ValidateRegistrationStateShape(cleanupPlan.RegistrationState);
        if (cleanupPlan.ProgramRoots.Any(root =>
                !IsValidFileIdentity(root.Identity) || !IsValidChangeStamp(root.OriginalChangeStamp)) ||
            cleanupPlan.ProgramRoots.GroupBy(root => root.OriginalPath, StringComparer.OrdinalIgnoreCase)
                .Any(group => group.Count() != 1) ||
            cleanupPlan.ProgramRoots.GroupBy(root => root.QuarantinePath, StringComparer.OrdinalIgnoreCase)
                .Any(group => group.Count() != 1))
        {
            throw new InvalidDataException("The Royal Sword cleanup plan contains invalid program roots.");
        }
        if (PathExists(planPath))
        {
            throw new IOException("A conflicting Royal Sword Calculator cleanup plan already exists.");
        }
        var planDirectory = Directory.GetParent(planPath)?.FullName
            ?? throw new InvalidDataException("The Royal Sword Calculator cleanup plan path is invalid.");
        var temporaryPath = GetKnownChild(
            planDirectory,
            $"{Path.GetFileName(planPath)}.tmp-{Environment.ProcessId}-{Guid.NewGuid():N}");
        try
        {
            var lines = new List<string> { GetCleanupMarkerValue(cleanupReceipt) };
            lines.AddRange(cleanupPlan.RegistrationState
                .OrderBy(pair => pair.Key, StringComparer.Ordinal)
                .Select(pair => $"registry|{pair.Key}|{pair.Value}"));
            lines.AddRange(cleanupPlan.ProgramRoots
                .OrderBy(root => root.OriginalPath, StringComparer.OrdinalIgnoreCase)
                .Select(root =>
                    "root|" +
                    Convert.ToBase64String(Encoding.UTF8.GetBytes(root.OriginalPath)) + "|" +
                    Convert.ToBase64String(Encoding.UTF8.GetBytes(root.QuarantinePath)) + "|" +
                    root.Identity + "|" + root.OriginalChangeStamp));
            WriteDurableLines(temporaryPath, lines);
            File.Move(temporaryPath, planPath, overwrite: false);
        }
        finally
        {
            WindowsNoFollowDeletion.DeleteTree(temporaryPath);
        }
    }

    private static void WriteDurableLines(string path, IEnumerable<string> lines)
    {
        using var stream = new FileStream(
            path,
            FileMode.CreateNew,
            FileAccess.Write,
            FileShare.None,
            bufferSize: 4096,
            FileOptions.WriteThrough);
        using (var writer = new StreamWriter(
                   stream,
                   new UTF8Encoding(encoderShouldEmitUTF8Identifier: false),
                   bufferSize: 4096,
                   leaveOpen: true))
        {
            foreach (var line in lines)
            {
                writer.WriteLine(line);
            }
            writer.Flush();
        }
        stream.Flush(flushToDisk: true);
    }

    private static bool IsValidFileIdentity(string identity)
    {
        if (identity.Length != 16 + 1 + 32 || identity[16] != ':')
        {
            return false;
        }
        var fileId = identity.AsSpan(17, 32);
        return identity.AsSpan(0, 16).IndexOfAnyExcept("0123456789ABCDEF".AsSpan()) < 0 &&
               fileId.IndexOfAnyExcept("0123456789ABCDEF".AsSpan()) < 0 &&
               !fileId.SequenceEqual("00000000000000000000000000000000".AsSpan()) &&
               !fileId.SequenceEqual("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF".AsSpan());
    }

    private static bool IsValidChangeStamp(string changeStamp) =>
        changeStamp.Length == 16 &&
        changeStamp.AsSpan().IndexOfAnyExcept("0123456789ABCDEF".AsSpan()) < 0;

    private static string GetCleanupMarkerValue(string cleanupReceipt) =>
        $"{CleanupRevision}:{cleanupReceipt}";

    private static void ValidateCleanupReceipt(string cleanupReceipt)
    {
        if (!Guid.TryParseExact(cleanupReceipt, "N", out _))
        {
            throw new InvalidDataException("The Royal Sword Calculator cleanup receipt is invalid.");
        }
    }
}
