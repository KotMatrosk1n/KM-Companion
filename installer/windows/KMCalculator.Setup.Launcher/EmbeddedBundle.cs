// SPDX-License-Identifier: MIT

using System.Reflection;
using System.Security.Cryptography;
using System.Text.RegularExpressions;

namespace KMCalculator.Setup.Launcher;

internal sealed class EmbeddedBundle : IDisposable
{
    private const string BundleResource = "KMCalculator.Setup.InnerBundle";
    private const string HashResource = "KMCalculator.Setup.InnerBundleSha256";
    private const int MinimumBundleSize = 1024 * 1024;

    private readonly string temporaryDirectory;

    private EmbeddedBundle(string temporaryDirectory, string executablePath)
    {
        this.temporaryDirectory = temporaryDirectory;
        ExecutablePath = executablePath;
    }

    internal string ExecutablePath { get; }

    internal static EmbeddedBundle ExtractAndVerify()
    {
        var assembly = Assembly.GetExecutingAssembly();
        var expectedHash = ReadTextResource(assembly, HashResource).Trim();
        if (!Regex.IsMatch(expectedHash, "\\A[0-9a-fA-F]{64}\\z", RegexOptions.CultureInvariant))
        {
            throw new InvalidDataException("The embedded bundle hash is invalid.");
        }

        using var source = assembly.GetManifestResourceStream(BundleResource)
            ?? throw new InvalidDataException("The embedded setup bundle is missing.");
        if (source.Length < MinimumBundleSize)
        {
            throw new InvalidDataException("The embedded setup bundle is unexpectedly small.");
        }

        var temporaryDirectory = Path.Combine(
            Path.GetTempPath(),
            "KMCalculatorSetup",
            Guid.NewGuid().ToString("N"));
        Directory.CreateDirectory(temporaryDirectory);

        try
        {
            RejectReparsePoints(temporaryDirectory);
            var executablePath = Path.Combine(temporaryDirectory, "KM.Companion.Bundle.exe");
            using var destination = new FileStream(
                executablePath,
                FileMode.CreateNew,
                FileAccess.ReadWrite,
                FileShare.None,
                bufferSize: 1024 * 1024,
                FileOptions.SequentialScan | FileOptions.WriteThrough);
            using var hash = IncrementalHash.CreateHash(HashAlgorithmName.SHA256);

            var buffer = new byte[1024 * 1024];
            int read;
            long total = 0;
            while ((read = source.Read(buffer, 0, buffer.Length)) > 0)
            {
                destination.Write(buffer, 0, read);
                hash.AppendData(buffer, 0, read);
                total += read;
            }

            destination.Flush(flushToDisk: true);
            if (total != source.Length)
            {
                throw new EndOfStreamException("The embedded setup bundle could not be extracted completely.");
            }

            var actualHash = Convert.ToHexString(hash.GetHashAndReset());
            if (!CryptographicOperations.FixedTimeEquals(
                    Convert.FromHexString(expectedHash),
                    Convert.FromHexString(actualHash)))
            {
                throw new CryptographicException("The embedded setup bundle failed SHA-256 verification.");
            }

            // Verify through the same exclusive handle; reopening would conflict with FileShare.None.
            destination.Position = 0;
            if (destination.ReadByte() != 'M' || destination.ReadByte() != 'Z')
            {
                throw new BadImageFormatException("The embedded setup bundle is not a Windows executable.");
            }

            return new EmbeddedBundle(temporaryDirectory, executablePath);
        }
        catch
        {
            TryDeleteDirectory(temporaryDirectory);
            throw;
        }
    }

    public void Dispose() => TryDeleteDirectory(temporaryDirectory);

    private static string ReadTextResource(Assembly assembly, string resourceName)
    {
        using var stream = assembly.GetManifestResourceStream(resourceName)
            ?? throw new InvalidDataException($"Embedded resource {resourceName} is missing.");
        using var reader = new StreamReader(stream);
        return reader.ReadToEnd();
    }

    private static void RejectReparsePoints(string path)
    {
        var current = new DirectoryInfo(path);
        while (current is not null)
        {
            if ((current.Attributes & FileAttributes.ReparsePoint) != 0)
            {
                throw new IOException("The temporary setup path contains a reparse point.");
            }

            current = current.Parent;
        }
    }

    private static void TryDeleteDirectory(string path)
    {
        for (var attempt = 0; attempt < 4; attempt++)
        {
            try
            {
                if (Directory.Exists(path))
                {
                    Directory.Delete(path, recursive: true);
                }
                return;
            }
            catch when (attempt < 3)
            {
                Thread.Sleep(150 * (attempt + 1));
            }
            catch
            {
                return;
            }
        }
    }
}
