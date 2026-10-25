// SPDX-License-Identifier: MIT

namespace KMCalculator.Setup.Launcher;

internal sealed record LauncherArguments(
    IReadOnlyList<string> BurnArguments,
    bool RelaunchAfterSuccess,
    bool SuppressErrors,
    bool InvokedByUpdater)
{
    private static readonly HashSet<string> FlagArguments = new(StringComparer.OrdinalIgnoreCase)
    {
        "/?",
        "-?",
        "/help",
        "-help",
        "/quiet",
        "/passive",
        "/norestart",
        "/forcerestart",
        "/promptrestart",
        "/repair",
        "/uninstall",
        "/modify",
        "/install",
        "/cache"
    };

    private static readonly HashSet<string> RequiredValueArguments = new(StringComparer.OrdinalIgnoreCase)
    {
        "/log",
        "/lang"
    };

    internal static bool TryParse(string[] args, out LauncherArguments? parsed, out string? error)
    {
        parsed = null;
        error = null;

        var invokedByUpdater = args.Any(argument =>
            argument.Equals("--updated", StringComparison.OrdinalIgnoreCase));
        var forceRun = false;
        var nsisSilent = false;
        var forwarded = new List<string>();

        for (var index = 0; index < args.Length; index++)
        {
            var argument = args[index];
            if (argument.Equals("--updated", StringComparison.OrdinalIgnoreCase))
            {
                continue;
            }

            if (argument.Equals("--force-run", StringComparison.OrdinalIgnoreCase))
            {
                forceRun = true;
                continue;
            }

            if (argument.Equals("/S", StringComparison.OrdinalIgnoreCase))
            {
                nsisSilent = true;
                continue;
            }

            if (argument.StartsWith("/D=", StringComparison.OrdinalIgnoreCase))
            {
                if (invokedByUpdater)
                {
                    // A full embedded Burn bundle does not use NSIS's destination override.
                    // Consume the legacy updater argument without trusting or forwarding it.
                    continue;
                }
                error = "The obsolete NSIS /D= installation directory argument is not supported by KM Companion Setup.";
                return false;
            }

            if (argument.StartsWith("--package-file=", StringComparison.OrdinalIgnoreCase))
            {
                if (invokedByUpdater)
                {
                    // Web installers are disabled. Never open or forward this untrusted path.
                    continue;
                }
                error = "Web package installer arguments are not supported by KM Companion Setup.";
                return false;
            }

            if (FlagArguments.Contains(argument))
            {
                forwarded.Add(argument);
                continue;
            }

            if (RequiredValueArguments.Contains(argument))
            {
                forwarded.Add(argument);
                if (index + 1 >= args.Length || LooksLikeOption(args[index + 1]))
                {
                    error = $"The {argument} setup argument requires a value.";
                    return false;
                }
                forwarded.Add(args[++index]);
                continue;
            }

            if (argument.Equals("/layout", StringComparison.OrdinalIgnoreCase))
            {
                forwarded.Add(argument);
                if (index + 1 < args.Length && !LooksLikeOption(args[index + 1]))
                {
                    forwarded.Add(args[++index]);
                }
                continue;
            }

            error = $"Unsupported setup argument: {argument}";
            return false;
        }

        if (forceRun && !invokedByUpdater)
        {
            error = "--force-run is accepted only with electron-updater's --updated argument.";
            return false;
        }

        if (invokedByUpdater)
        {
            if (forwarded.Count > 0)
            {
                error = "Maintenance and layout arguments cannot be combined with --updated.";
                return false;
            }

            // electron-updater supplies /S for the old NSIS contract. Deliberately use
            // Burn passive mode here so an explicitly requested update retains real progress.
            forwarded.Add("/passive");
            forwarded.Add("KMUpdaterInvocation=1");
            if (forceRun)
            {
                forwarded.Add("KMRelaunchAfterInstall=1");
            }
        }
        else if (nsisSilent && !forwarded.Any(IsDisplayModeArgument))
        {
            forwarded.Insert(0, "/quiet");
        }

        parsed = new LauncherArguments(
            forwarded,
            RelaunchAfterSuccess: invokedByUpdater && forceRun,
            SuppressErrors: !invokedByUpdater && (nsisSilent || forwarded.Any(IsQuietArgument)),
            InvokedByUpdater: invokedByUpdater);
        return true;
    }

    internal static LauncherArguments ForInteractiveLegacyUpdaterTransition(LauncherArguments source) =>
        source with
        {
            BurnArguments = [],
            RelaunchAfterSuccess = false,
            SuppressErrors = false,
            InvokedByUpdater = false
        };

    private static bool IsDisplayModeArgument(string argument) =>
        argument.Equals("/quiet", StringComparison.OrdinalIgnoreCase) ||
        argument.Equals("/passive", StringComparison.OrdinalIgnoreCase);

    private static bool IsQuietArgument(string argument) =>
        argument.Equals("/quiet", StringComparison.OrdinalIgnoreCase);

    private static bool LooksLikeOption(string argument) =>
        argument.StartsWith('/') || argument.StartsWith('-');
}
