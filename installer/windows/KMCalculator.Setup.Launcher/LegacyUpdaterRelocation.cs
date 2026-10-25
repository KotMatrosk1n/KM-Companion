// SPDX-License-Identifier: MIT

using System.ComponentModel;
using System.Diagnostics;
using System.Text;
using System.Security.Cryptography;

namespace KMCalculator.Setup.Launcher;

internal static class LegacyUpdaterRelocation
{
    internal const string RelocatedArgument = "--km-relocated-legacy-updater";
    private static readonly string[] LegacyUpdaterDirectoryNames =
    [
        "royal-sword-calculator-updater",
        "pokemon-royal-sword-updater"
    ];

    internal static bool TryLaunchRelocatedCopy(IReadOnlyList<string> arguments)
    {
        if (!arguments.Any(argument => argument.Equals("--updated", StringComparison.OrdinalIgnoreCase)))
        {
            return false;
        }

        var executablePath = Environment.ProcessPath
            ?? throw new InvalidOperationException("The setup launcher path could not be determined.");
        var localRoot = Environment.GetFolderPath(
            Environment.SpecialFolder.LocalApplicationData,
            Environment.SpecialFolderOption.DoNotVerify);
        if (string.IsNullOrWhiteSpace(localRoot))
        {
            throw new IOException("Windows did not provide the current user's local application data folder.");
        }

        var normalizedExecutable = NormalizePath(executablePath);
        var legacyCacheRoot = LegacyUpdaterDirectoryNames
            .Select(directoryName => NormalizePath(Path.Combine(localRoot, directoryName)))
            .SingleOrDefault(candidate => IsDescendantPath(candidate, normalizedExecutable));
        if (legacyCacheRoot is null)
        {
            return false;
        }

        RejectReparsePoints(normalizedExecutable);
        var temporaryRoot = NormalizePath(Path.Combine(
            Path.GetTempPath(),
            "KMCalculatorSetupLauncher",
            Guid.NewGuid().ToString("N")));
        if (LegacyUpdaterDirectoryNames
            .Select(directoryName => NormalizePath(Path.Combine(localRoot, directoryName)))
            .Any(candidate => IsDescendantPath(candidate, temporaryRoot)))
        {
            throw new IOException("The Windows temporary directory is inside an old updater cache.");
        }
        Directory.CreateDirectory(temporaryRoot);
        RejectReparsePoints(temporaryRoot);
        var relocatedPath = Path.Combine(temporaryRoot, "KM-Companion-Setup.exe");

        try
        {
            using (var source = new FileStream(
                       normalizedExecutable,
                       FileMode.Open,
                       FileAccess.Read,
                       FileShare.Read,
                       bufferSize: 1024 * 1024,
                       FileOptions.SequentialScan))
            using (var destination = new FileStream(
                       relocatedPath,
                       FileMode.CreateNew,
                       FileAccess.ReadWrite,
                       FileShare.Read,
                       bufferSize: 1024 * 1024,
                       FileOptions.SequentialScan | FileOptions.WriteThrough))
            using (var sourceHash = IncrementalHash.CreateHash(HashAlgorithmName.SHA256))
            using (var destinationHash = IncrementalHash.CreateHash(HashAlgorithmName.SHA256))
            {
                var buffer = new byte[1024 * 1024];
                int read;
                while ((read = source.Read(buffer, 0, buffer.Length)) > 0)
                {
                    sourceHash.AppendData(buffer, 0, read);
                    destination.Write(buffer, 0, read);
                    destinationHash.AppendData(buffer, 0, read);
                }
                destination.Flush(flushToDisk: true);
                if (!CryptographicOperations.FixedTimeEquals(
                        sourceHash.GetHashAndReset(),
                        destinationHash.GetHashAndReset()))
                {
                    throw new CryptographicException("The relocated setup launcher failed SHA-256 verification.");
                }
            }

            var startInfo = new ProcessStartInfo
            {
                FileName = relocatedPath,
                UseShellExecute = false,
                WorkingDirectory = temporaryRoot
            };
            startInfo.ArgumentList.Add(RelocatedArgument);
            foreach (var argument in arguments)
            {
                startInfo.ArgumentList.Add(argument);
            }

            Process relocatedProcess;
            using (var launchGuard = new FileStream(
                       relocatedPath,
                       FileMode.Open,
                       FileAccess.Read,
                       FileShare.Read,
                       bufferSize: 1,
                       FileOptions.RandomAccess))
            {
                relocatedProcess = Process.Start(startInfo)
                    ?? throw new Win32Exception("The relocated setup launcher could not be started.");
            }

            ScheduleUnelevatedCleanup(relocatedProcess, relocatedPath, temporaryRoot);
            relocatedProcess.Dispose();
            return true;
        }
        catch
        {
            TryDeleteTemporaryDirectory(temporaryRoot);
            throw;
        }
    }

    private static bool IsDescendantPath(string parentPath, string candidatePath)
    {
        var relativePath = Path.GetRelativePath(parentPath, candidatePath);
        return !string.IsNullOrWhiteSpace(relativePath) &&
               !string.Equals(relativePath, ".", StringComparison.Ordinal) &&
               !string.Equals(relativePath, "..", StringComparison.Ordinal) &&
               !relativePath.StartsWith(".." + Path.DirectorySeparatorChar, StringComparison.Ordinal) &&
               !relativePath.StartsWith(".." + Path.AltDirectorySeparatorChar, StringComparison.Ordinal) &&
               !Path.IsPathFullyQualified(relativePath);
    }

    private static string NormalizePath(string path) =>
        Path.TrimEndingDirectorySeparator(Path.GetFullPath(path));

    private static void RejectReparsePoints(string path)
    {
        var normalizedPath = NormalizePath(path);
        var root = Path.GetPathRoot(normalizedPath)
            ?? throw new InvalidDataException("The setup launcher path is not fully qualified.");
        var current = root;
        foreach (var segment in Path.GetRelativePath(root, normalizedPath).Split(
                     [Path.DirectorySeparatorChar, Path.AltDirectorySeparatorChar],
                     StringSplitOptions.RemoveEmptyEntries))
        {
            current = Path.Combine(current, segment);
            var attributes = File.GetAttributes(current);
            if ((attributes & FileAttributes.ReparsePoint) != 0)
            {
                throw new IOException($"The setup launcher path traverses a reparse point: {current}");
            }
        }
    }

    private static void TryDeleteTemporaryDirectory(string path)
    {
        try
        {
            WindowsNoFollowDeletion.DeleteTree(path);
        }
        catch
        {
            // The original failure is more useful than best-effort temporary cleanup.
        }
    }

    private static void ScheduleUnelevatedCleanup(
        Process relocatedProcess,
        string relocatedPath,
        string temporaryRoot)
    {
        var powershellPath = Path.Combine(
            Environment.SystemDirectory,
            "WindowsPowerShell",
            "v1.0",
            "powershell.exe");
        if (!File.Exists(powershellPath))
        {
            throw new FileNotFoundException("Windows PowerShell is required to clean the relocated setup copy.", powershellPath);
        }

        var quotedExecutable = QuotePowerShellLiteral(relocatedPath);
        var quotedDirectory = QuotePowerShellLiteral(temporaryRoot);
        var script =
            "$ErrorActionPreference='SilentlyContinue';" +
            $"Wait-Process -Id {relocatedProcess.Id} -Timeout 14400;" +
            "for($i=0;$i -lt 20;$i++){" +
            $"if(-not (Test-Path -LiteralPath {quotedExecutable} -PathType Leaf)){{break}};" +
            $"Remove-Item -LiteralPath {quotedExecutable} -Force;" +
            "Start-Sleep -Milliseconds 250};" +
            $"Remove-Item -LiteralPath {quotedDirectory} -Force";
        var encodedScript = Convert.ToBase64String(Encoding.Unicode.GetBytes(script));
        var systemRoot = Environment.GetFolderPath(
            Environment.SpecialFolder.Windows,
            Environment.SpecialFolderOption.DoNotVerify);
        if (string.IsNullOrWhiteSpace(systemRoot))
        {
            throw new IOException("Windows did not provide the system root for relocated setup cleanup.");
        }
        var startInfo = new ProcessStartInfo
        {
            FileName = powershellPath,
            UseShellExecute = false,
            CreateNoWindow = true,
            WindowStyle = ProcessWindowStyle.Hidden,
            WorkingDirectory = systemRoot
        };
        startInfo.ArgumentList.Add("-NoLogo");
        startInfo.ArgumentList.Add("-NoProfile");
        startInfo.ArgumentList.Add("-NonInteractive");
        startInfo.ArgumentList.Add("-EncodedCommand");
        startInfo.ArgumentList.Add(encodedScript);
        using var cleanupProcess = Process.Start(startInfo)
            ?? throw new IOException("The relocated setup cleanup process could not be started.");
    }

    private static string QuotePowerShellLiteral(string value) =>
        "'" + value.Replace("'", "''", StringComparison.Ordinal) + "'";
}
