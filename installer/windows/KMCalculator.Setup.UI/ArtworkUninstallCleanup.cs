// SPDX-License-Identifier: MIT
using System.ComponentModel;
using System.IO;
using KMCalculator.Setup.Launcher;
using WixToolset.BootstrapperApplicationApi;

namespace KMCalculator.Setup.UI;

internal static class ArtworkUninstallCleanup
{
    // An upgrade can uninstall a related bundle. Require a direct uninstall
    // and actual removal of this app's MSI before discarding downloaded images.
    internal static bool ShouldRemove(
        LaunchAction action,
        RelationType relation,
        bool updaterInvocation,
        bool installed,
        bool newerInstalled,
        bool packageRemoved,
        bool success) =>
        (action is LaunchAction.Uninstall or LaunchAction.UnsafeUninstall) &&
        relation == RelationType.None && !updaterInvocation &&
        installed && !newerInstalled && packageRemoved && success;

    internal static IReadOnlyList<string> GetTargets(string applicationData)
    {
        if (string.IsNullOrWhiteSpace(applicationData) || !Path.IsPathFullyQualified(applicationData))
            throw new InvalidDataException("The current Windows user's app data folder is unavailable.");

        var root = Path.GetFullPath(Path.Combine(applicationData, "KM Calculator"));
        // Only these two downloaded image directories are disposable. The parent,
        // artwork preference file, saved runs, recovery files and updater caches stay.
        return new[] { Path.Combine(root, "pokedex-artwork"), Path.Combine(root, "pokemon-artwork") };
    }

    internal static void RemoveCurrentUserArtifacts()
    {
        var targets = GetTargets(Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData));
        var errors = new List<Exception>();
        foreach (var target in targets)
        {
            try
            {
                for (var attempt = 0; ; attempt++)
                {
                    try { WindowsNoFollowDeletion.DeleteTree(target); break; }
                    catch (Win32Exception exception) when (attempt < 2 && exception.NativeErrorCode is 32 or 33)
                    {
                        Thread.Sleep(100 * (attempt + 1));
                    }
                }
            }
            catch (Exception exception) { errors.Add(exception); }
        }
        if (errors.Count != 0)
            throw new AggregateException("Some downloaded artwork could not be removed.", errors);
    }
}
