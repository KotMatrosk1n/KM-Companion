// SPDX-License-Identifier: MIT

using System.ComponentModel;
using System.IO;
using System.Runtime.InteropServices;
using System.Text;
using Microsoft.Win32.SafeHandles;

namespace KMCalculator.Setup.Launcher;

/// <summary>
/// Deletes Windows file system entries without following reparse points or
/// resolving recursive children through mutable path strings.
/// </summary>
internal static class WindowsNoFollowDeletion
{
    internal sealed class DeletionLease : IDisposable
    {
        private SafeFileHandle? handle;

        internal DeletionLease(SafeFileHandle handle, string displayPath, string identity)
        {
            this.handle = handle;
            DisplayPath = displayPath;
            Identity = identity;
            ChangeStamp = GetChangeStamp(handle, displayPath);
        }

        internal string DisplayPath { get; private set; }
        internal string Identity { get; }
        internal string ChangeStamp { get; }

        internal void RenameTo(string destinationPath)
        {
            var currentHandle = handle
                ?? throw new ObjectDisposedException(nameof(DeletionLease));
            var normalizedDestination = NormalizeDeletionTarget(destinationPath);
            if (!string.Equals(
                    Path.GetPathRoot(DisplayPath),
                    Path.GetPathRoot(normalizedDestination),
                    StringComparison.OrdinalIgnoreCase))
            {
                throw new IOException("The cleanup quarantine must remain on the source volume.");
            }
            RenameOpenedEntry(currentHandle, DisplayPath, normalizedDestination);
            DisplayPath = normalizedDestination;
        }

        internal void DeleteTree()
        {
            var currentHandle = handle
                ?? throw new ObjectDisposedException(nameof(DeletionLease));
            DeleteOpenedEntry(currentHandle, DisplayPath, depth: 0, recursive: true);
        }

        public void Dispose()
        {
            handle?.Dispose();
            handle = null;
        }
    }

    private const int MaxTraversalDepth = 256;
    private const int MaxDirectoryPasses = 4;
    private const int DirectoryQueryBufferSize = 64 * 1024;
    private const int FileNamesInformationHeaderSize = 12;

    private const uint DeleteAccess = 0x00010000;
    private const uint SynchronizeAccess = 0x00100000;
    private const uint FileListDirectory = 0x00000001;
    private const uint FileAddSubdirectory = 0x00000004;
    private const uint FileTraverse = 0x00000020;
    private const uint FileReadAttributes = 0x00000080;
    private const uint FileWriteAttributes = 0x00000100;
    private const uint FileShareRead = 0x00000001;
    private const uint FileShareWrite = 0x00000002;
    private const uint FileOpen = 0x00000001;
    private const uint FileSynchronousIoNonAlert = 0x00000020;
    private const uint FileOpenReparsePoint = 0x00200000;
    private const uint ObjectCaseInsensitive = 0x00000040;
    private const uint ObjectDoNotReparse = 0x00001000;

    private const uint FileAttributeReadOnly = 0x00000001;
    private const uint FileAttributeDirectory = 0x00000010;
    private const uint FileAttributeReparsePoint = 0x00000400;
    private const uint FileAttributeNormal = 0x00000080;

    private const int FileBasicInfoClass = 0;
    private const int FileDispositionInfoClass = 4;
    private const int FileRenameInformationClass = 10;
    private const int FileNamesInformationClass = 12;
    private const int FileIdInfoClass = 18;

    private const int ErrorDirectoryNotEmpty = 145;
    private const int StatusSuccess = 0;
    private const int StatusBufferOverflow = unchecked((int)0x80000005);
    private const int StatusNoMoreFiles = unchecked((int)0x80000006);
    private const int StatusNoSuchFile = unchecked((int)0xC000000F);
    private const int StatusObjectNameNotFound = unchecked((int)0xC0000034);
    private const int StatusObjectPathNotFound = unchecked((int)0xC000003A);
    private const int StatusReparsePointEncountered = unchecked((int)0xC000050B);

    internal static void DeleteTree(string path)
    {
        var normalizedPath = NormalizeDeletionTarget(path);
        using var root = OpenAbsolute(normalizedPath);
        if (root is null)
        {
            return;
        }

        DeleteOpenedEntry(root, normalizedPath, depth: 0, recursive: true);
    }

    internal static DeletionLease OpenDeletionLease(string path)
    {
        var normalizedPath = NormalizeDeletionTarget(path);
        var root = OpenAbsolute(normalizedPath)
            ?? throw new FileNotFoundException(
                "The cleanup target disappeared before it could be opened.",
                normalizedPath);
        try
        {
            var information = GetBasicInformation(root, normalizedPath);
            RejectReparsePoint(information, normalizedPath);
            if ((information.FileAttributes & FileAttributeDirectory) == 0)
            {
                throw new IOException($"The cleanup target is not a directory: {normalizedPath}");
            }

            return new DeletionLease(root, normalizedPath, GetFileIdentity(root, normalizedPath));
        }
        catch
        {
            root.Dispose();
            throw;
        }
    }

    internal static void DeleteEmptyDirectory(string path)
    {
        var normalizedPath = NormalizeDeletionTarget(path);
        using var root = OpenAbsolute(normalizedPath);
        if (root is null)
        {
            return;
        }

        var information = GetBasicInformation(root, normalizedPath);
        RejectReparsePoint(information, normalizedPath);
        if ((information.FileAttributes & FileAttributeDirectory) == 0)
        {
            throw new IOException($"The cleanup target is not a directory: {normalizedPath}");
        }

        if (EnumerateNames(root, restartScan: true, normalizedPath).Count > 0)
        {
            throw new IOException($"The cleanup directory is not empty: {normalizedPath}");
        }

        ClearReadOnly(root, information, normalizedPath);
        MarkForDeletion(root, normalizedPath);
    }

    private static void DeleteOpenedEntry(
        SafeFileHandle handle,
        string displayPath,
        int depth,
        bool recursive)
    {
        var information = GetBasicInformation(handle, displayPath);
        RejectReparsePoint(information, displayPath);
        if ((information.FileAttributes & FileAttributeDirectory) == 0)
        {
            ClearReadOnly(handle, information, displayPath);
            MarkForDeletion(handle, displayPath);
            return;
        }

        if (!recursive)
        {
            throw new IOException($"Recursive cleanup was not authorized for: {displayPath}");
        }
        if (depth >= MaxTraversalDepth)
        {
            throw new IOException($"The cleanup directory is nested too deeply: {displayPath}");
        }

        for (var pass = 0; pass < MaxDirectoryPasses; pass++)
        {
            DeleteDirectoryChildren(handle, displayPath, depth);
            information = GetBasicInformation(handle, displayPath);
            ClearReadOnly(handle, information, displayPath);

            try
            {
                MarkForDeletion(handle, displayPath);
                return;
            }
            catch (Win32Exception exception) when (
                exception.NativeErrorCode == ErrorDirectoryNotEmpty && pass < MaxDirectoryPasses - 1)
            {
                Thread.Sleep(100 * (pass + 1));
            }
        }
    }

    private static void DeleteDirectoryChildren(SafeFileHandle parent, string displayPath, int depth)
    {
        var restartScan = true;
        while (true)
        {
            var names = EnumerateNames(parent, restartScan, displayPath);
            restartScan = false;
            if (names.Count == 0)
            {
                return;
            }

            foreach (var name in names)
            {
                ValidateChildName(name);
                var childDisplayPath = Path.Combine(displayPath, name);
                using var child = OpenRelative(parent, name, childDisplayPath);
                if (child is null)
                {
                    continue;
                }

                DeleteOpenedEntry(child, childDisplayPath, depth + 1, recursive: true);
            }
        }
    }

    private static IReadOnlyList<string> EnumerateNames(
        SafeFileHandle directory,
        bool restartScan,
        string displayPath)
    {
        var buffer = Marshal.AllocHGlobal(DirectoryQueryBufferSize);
        try
        {
            var status = NtQueryDirectoryFile(
                directory,
                nint.Zero,
                nint.Zero,
                nint.Zero,
                out var ioStatus,
                buffer,
                DirectoryQueryBufferSize,
                FileNamesInformationClass,
                returnSingleEntry: 0,
                nint.Zero,
                restartScan: restartScan ? (byte)1 : (byte)0);
            if (status == StatusNoMoreFiles)
            {
                return Array.Empty<string>();
            }
            if (status != StatusSuccess && status != StatusBufferOverflow)
            {
                throw CreateNtException(status, $"The cleanup directory could not be enumerated: {displayPath}");
            }

            var bytesReturned = checked((ulong)ioStatus.Information);
            if (bytesReturned == 0)
            {
                return Array.Empty<string>();
            }
            if (bytesReturned > DirectoryQueryBufferSize)
            {
                throw new IOException($"Windows returned invalid directory information for: {displayPath}");
            }

            var names = new List<string>();
            ulong offset = 0;
            while (true)
            {
                if (offset + FileNamesInformationHeaderSize > bytesReturned)
                {
                    throw new IOException($"Windows returned truncated directory information for: {displayPath}");
                }

                var entryPointer = IntPtr.Add(buffer, checked((int)offset));
                var nextOffset = unchecked((uint)Marshal.ReadInt32(entryPointer, 0));
                var nameByteLength = unchecked((uint)Marshal.ReadInt32(entryPointer, 8));
                if ((nameByteLength & 1) != 0 ||
                    offset + FileNamesInformationHeaderSize + nameByteLength > bytesReturned)
                {
                    throw new IOException($"Windows returned an invalid directory entry for: {displayPath}");
                }

                var name = Marshal.PtrToStringUni(
                    IntPtr.Add(entryPointer, FileNamesInformationHeaderSize),
                    checked((int)(nameByteLength / sizeof(char))));
                if (!string.IsNullOrEmpty(name) && name is not "." and not "..")
                {
                    names.Add(name);
                }

                if (nextOffset == 0)
                {
                    break;
                }
                if (nextOffset < FileNamesInformationHeaderSize || offset + nextOffset >= bytesReturned)
                {
                    throw new IOException($"Windows returned an invalid directory offset for: {displayPath}");
                }
                offset += nextOffset;
            }

            return names;
        }
        finally
        {
            Marshal.FreeHGlobal(buffer);
        }
    }

    private static SafeFileHandle? OpenAbsolute(string path)
    {
        var ntPath = ToNtPath(path);
        return OpenObject(
            parent: null,
            ntPath,
            ObjectCaseInsensitive | ObjectDoNotReparse,
            path);
    }

    private static SafeFileHandle? OpenAbsoluteRenameDestination(string path)
    {
        var ntPath = ToNtPath(path);
        return OpenObject(
            parent: null,
            ntPath,
            ObjectCaseInsensitive | ObjectDoNotReparse,
            path,
            FileAddSubdirectory | FileTraverse | FileListDirectory |
            FileReadAttributes | SynchronizeAccess);
    }

    private static SafeFileHandle? OpenRelative(
        SafeFileHandle parent,
        string name,
        string displayPath) =>
        OpenObject(parent, name, ObjectDoNotReparse, displayPath);

    private static SafeFileHandle? OpenObject(
        SafeFileHandle? parent,
        string objectName,
        uint objectAttributes,
        string displayPath,
        uint desiredAccess =
            DeleteAccess | FileReadAttributes | FileWriteAttributes | FileListDirectory | SynchronizeAccess)
    {
        var nameBuffer = nint.Zero;
        var unicodeStringPointer = nint.Zero;
        var parentAddedReference = false;
        try
        {
            if (objectName.Length > (ushort.MaxValue / sizeof(char)) - 1)
            {
                throw new PathTooLongException($"The cleanup path is too long: {displayPath}");
            }

            nameBuffer = Marshal.StringToHGlobalUni(objectName);
            var unicodeString = new UnicodeString
            {
                Length = checked((ushort)(objectName.Length * sizeof(char))),
                MaximumLength = checked((ushort)((objectName.Length + 1) * sizeof(char))),
                Buffer = nameBuffer
            };
            unicodeStringPointer = Marshal.AllocHGlobal(Marshal.SizeOf<UnicodeString>());
            Marshal.StructureToPtr(unicodeString, unicodeStringPointer, fDeleteOld: false);

            var parentHandle = nint.Zero;
            if (parent is not null)
            {
                parent.DangerousAddRef(ref parentAddedReference);
                parentHandle = parent.DangerousGetHandle();
            }

            var attributes = new ObjectAttributes
            {
                Length = (uint)Marshal.SizeOf<ObjectAttributes>(),
                RootDirectory = parentHandle,
                ObjectName = unicodeStringPointer,
                Attributes = objectAttributes
            };
            var status = NtCreateFile(
                out var rawHandle,
                desiredAccess,
                ref attributes,
                out _,
                nint.Zero,
                fileAttributes: 0,
                FileShareRead | FileShareWrite,
                FileOpen,
                FileSynchronousIoNonAlert | FileOpenReparsePoint,
                nint.Zero,
                eaLength: 0);
            if (IsNotFound(status))
            {
                CloseUnexpectedHandle(rawHandle);
                return null;
            }
            if (status < 0)
            {
                CloseUnexpectedHandle(rawHandle);
                throw CreateNtException(status, $"The cleanup target could not be opened safely: {displayPath}");
            }
            if (rawHandle == nint.Zero || rawHandle == new nint(-1))
            {
                throw new IOException($"Windows returned an invalid cleanup handle for: {displayPath}");
            }

            return new SafeFileHandle(rawHandle, ownsHandle: true);
        }
        finally
        {
            if (parentAddedReference)
            {
                parent!.DangerousRelease();
            }
            if (unicodeStringPointer != nint.Zero)
            {
                Marshal.FreeHGlobal(unicodeStringPointer);
            }
            if (nameBuffer != nint.Zero)
            {
                Marshal.FreeHGlobal(nameBuffer);
            }
        }
    }

    private static FileBasicInformation GetBasicInformation(SafeFileHandle handle, string displayPath)
    {
        if (!GetFileInformationByHandleEx(
                handle,
                FileBasicInfoClass,
                out var information,
                (uint)Marshal.SizeOf<FileBasicInformation>()))
        {
            throw CreateWin32Exception($"The cleanup target attributes could not be read: {displayPath}");
        }

        return information;
    }

    private static string GetFileIdentity(SafeFileHandle handle, string displayPath)
    {
        var fileSystemName = GetFileSystemName(handle, displayPath);
        if (!string.Equals(fileSystemName, "NTFS", StringComparison.OrdinalIgnoreCase) &&
            !string.Equals(fileSystemName, "ReFS", StringComparison.OrdinalIgnoreCase))
        {
            throw new IOException(
                $"The cleanup target is on a file system without a supported durable object identity: {displayPath}");
        }
        if (!GetFileIdentityInformationByHandle(
                handle,
                FileIdInfoClass,
                out var information,
                (uint)Marshal.SizeOf<FileIdInformation>()))
        {
            throw CreateWin32Exception($"The cleanup target identity could not be read: {displayPath}");
        }
        if (information.FileId is null || information.FileId.Length != 16)
        {
            throw new IOException($"Windows returned an invalid cleanup target identity: {displayPath}");
        }
        if (information.FileId.All(value => value == 0) ||
            information.FileId.All(value => value == byte.MaxValue))
        {
            throw new IOException(
                $"The cleanup target file system did not provide a stable object identity: {displayPath}");
        }
        return $"{information.VolumeSerialNumber:X16}:{Convert.ToHexString(information.FileId)}";
    }

    private static string GetChangeStamp(SafeFileHandle handle, string displayPath)
    {
        var information = GetBasicInformation(handle, displayPath);
        return unchecked((ulong)information.ChangeTime).ToString("X16");
    }

    private static void RenameOpenedEntry(
        SafeFileHandle handle,
        string displayPath,
        string destinationPath)
    {
        var destinationParentPath = Directory.GetParent(destinationPath)?.FullName
            ?? throw new InvalidDataException("The cleanup quarantine path has no parent.");
        var destinationName = Path.GetFileName(destinationPath);
        ValidateChildName(destinationName);
        using var destinationParent = OpenAbsoluteRenameDestination(destinationParentPath)
            ?? throw new DirectoryNotFoundException(
                $"The cleanup quarantine parent is unavailable: {destinationParentPath}");

        var parentInformation = GetBasicInformation(destinationParent, destinationParentPath);
        RejectReparsePoint(parentInformation, destinationParentPath);
        if ((parentInformation.FileAttributes & FileAttributeDirectory) == 0)
        {
            throw new IOException($"The cleanup quarantine parent is not a directory: {destinationParentPath}");
        }

        var nameBytes = Encoding.Unicode.GetBytes(destinationName);
        var rootDirectoryOffset = (int)Marshal.OffsetOf<FileRenameInformationHeader>(
            nameof(FileRenameInformationHeader.RootDirectory));
        var fileNameLengthOffset = (int)Marshal.OffsetOf<FileRenameInformationHeader>(
            nameof(FileRenameInformationHeader.FileNameLength));
        var fileNameOffset = fileNameLengthOffset + sizeof(uint);
        var bufferLength = checked(fileNameOffset + nameBytes.Length);
        var buffer = Marshal.AllocHGlobal(bufferLength);
        var parentHandlePinned = false;
        try
        {
            Marshal.Copy(new byte[bufferLength], 0, buffer, bufferLength);
            destinationParent.DangerousAddRef(ref parentHandlePinned);
            Marshal.WriteIntPtr(
                buffer,
                rootDirectoryOffset,
                destinationParent.DangerousGetHandle());
            Marshal.WriteInt32(buffer, fileNameLengthOffset, nameBytes.Length);
            Marshal.Copy(nameBytes, 0, buffer + fileNameOffset, nameBytes.Length);
            var status = NtSetInformationFile(
                handle,
                out _,
                buffer,
                (uint)bufferLength,
                FileRenameInformationClass);
            if (status != StatusSuccess)
            {
                throw CreateNtException(
                    status,
                    $"The cleanup target could not be quarantined from {displayPath} to {destinationPath}.");
            }
        }
        finally
        {
            if (parentHandlePinned)
            {
                destinationParent.DangerousRelease();
            }
            Marshal.FreeHGlobal(buffer);
        }
    }

    private static string GetFileSystemName(SafeFileHandle handle, string displayPath)
    {
        var fileSystemName = new StringBuilder(32);
        if (!GetVolumeInformationByHandleW(
                handle,
                null,
                0,
                out _,
                out _,
                out _,
                fileSystemName,
                (uint)fileSystemName.Capacity))
        {
            throw CreateWin32Exception(
                $"The cleanup target file system could not be identified: {displayPath}");
        }
        if (fileSystemName.Length == 0)
        {
            throw new IOException($"Windows returned no cleanup target file system identity: {displayPath}");
        }
        return fileSystemName.ToString();
    }

    private static void RejectReparsePoint(FileBasicInformation information, string displayPath)
    {
        if ((information.FileAttributes & FileAttributeReparsePoint) != 0)
        {
            throw new IOException($"The cleanup target is a file system reparse point: {displayPath}");
        }
    }

    private static void ClearReadOnly(
        SafeFileHandle handle,
        FileBasicInformation information,
        string displayPath)
    {
        if ((information.FileAttributes & FileAttributeReadOnly) == 0)
        {
            return;
        }

        var writableInformation = new FileBasicInformation
        {
            FileAttributes = information.FileAttributes & ~FileAttributeReadOnly
        };
        if (writableInformation.FileAttributes == 0)
        {
            writableInformation.FileAttributes = FileAttributeNormal;
        }
        if (!SetFileBasicInformationByHandle(
                handle,
                FileBasicInfoClass,
                ref writableInformation,
                (uint)Marshal.SizeOf<FileBasicInformation>()))
        {
            throw CreateWin32Exception($"The cleanup target is read only and could not be made writable: {displayPath}");
        }
    }

    private static void MarkForDeletion(SafeFileHandle handle, string displayPath)
    {
        var disposition = new FileDispositionInformation { DeleteFile = 1 };
        if (!SetFileDispositionInformationByHandle(
                handle,
                FileDispositionInfoClass,
                ref disposition,
                (uint)Marshal.SizeOf<FileDispositionInformation>()))
        {
            throw CreateWin32Exception($"The cleanup target could not be deleted: {displayPath}");
        }
    }

    private static string NormalizeDeletionTarget(string path)
    {
        if (string.IsNullOrWhiteSpace(path) || !Path.IsPathFullyQualified(path))
        {
            throw new InvalidDataException("A cleanup target must be a fully qualified path.");
        }
        if (path.StartsWith(@"\\?\", StringComparison.Ordinal) ||
            path.StartsWith(@"\\.\", StringComparison.Ordinal) ||
            path.StartsWith(@"\??\", StringComparison.Ordinal))
        {
            throw new InvalidDataException("A cleanup target cannot use a Windows device namespace.");
        }

        var normalizedPath = Path.TrimEndingDirectorySeparator(Path.GetFullPath(path));
        var root = Path.GetPathRoot(normalizedPath);
        if (string.IsNullOrWhiteSpace(root) ||
            string.Equals(
                Path.TrimEndingDirectorySeparator(root),
                normalizedPath,
                StringComparison.OrdinalIgnoreCase))
        {
            throw new InvalidDataException("A file system root cannot be a cleanup target.");
        }

        return normalizedPath;
    }

    private static string ToNtPath(string path)
    {
        if (path.StartsWith(@"\\", StringComparison.Ordinal))
        {
            return @"\??\UNC\" + path[2..];
        }
        if (path.Length >= 3 &&
            char.IsAsciiLetter(path[0]) &&
            path[1] == Path.VolumeSeparatorChar &&
            Path.DirectorySeparatorChar == path[2])
        {
            return @"\??\" + path;
        }

        throw new InvalidDataException("A cleanup target must use a local drive or UNC path.");
    }

    private static void ValidateChildName(string name)
    {
        if (string.IsNullOrEmpty(name) ||
            name is "." or ".." ||
            name.IndexOfAny([Path.DirectorySeparatorChar, Path.AltDirectorySeparatorChar, '\0']) >= 0)
        {
            throw new IOException("A cleanup directory contained an unsafe entry name.");
        }
    }

    private static bool IsNotFound(int status) =>
        status is StatusNoSuchFile or StatusObjectNameNotFound or StatusObjectPathNotFound;

    private static Exception CreateNtException(int status, string message)
    {
        if (status == StatusReparsePointEncountered)
        {
            return new IOException(message + " A file system reparse point was encountered.");
        }

        var error = unchecked((int)RtlNtStatusToDosError(status));
        return new IOException(message, new Win32Exception(error));
    }

    private static Win32Exception CreateWin32Exception(string message) =>
        new(Marshal.GetLastWin32Error(), message);

    private static void CloseUnexpectedHandle(nint handle)
    {
        if (handle == nint.Zero || handle == new nint(-1))
        {
            return;
        }

        using var unexpectedHandle = new SafeFileHandle(handle, ownsHandle: true);
    }

    [StructLayout(LayoutKind.Sequential)]
    private struct UnicodeString
    {
        internal ushort Length;
        internal ushort MaximumLength;
        internal nint Buffer;
    }

    [StructLayout(LayoutKind.Sequential)]
    private struct ObjectAttributes
    {
        internal uint Length;
        internal nint RootDirectory;
        internal nint ObjectName;
        internal uint Attributes;
        internal nint SecurityDescriptor;
        internal nint SecurityQualityOfService;
    }

    [StructLayout(LayoutKind.Sequential)]
    private struct IoStatusBlock
    {
        internal nint Status;
        internal nuint Information;
    }

    [StructLayout(LayoutKind.Sequential)]
    private struct FileBasicInformation
    {
        internal long CreationTime;
        internal long LastAccessTime;
        internal long LastWriteTime;
        internal long ChangeTime;
        internal uint FileAttributes;
    }

    [StructLayout(LayoutKind.Sequential, Pack = 1)]
    private struct FileDispositionInformation
    {
        internal byte DeleteFile;
    }

    [StructLayout(LayoutKind.Sequential)]
    private struct FileIdInformation
    {
        internal ulong VolumeSerialNumber;
        [MarshalAs(UnmanagedType.ByValArray, SizeConst = 16)]
        internal byte[] FileId;
    }

    [StructLayout(LayoutKind.Sequential)]
    private struct FileRenameInformationHeader
    {
        internal byte ReplaceIfExists;
        internal nint RootDirectory;
        internal uint FileNameLength;
    }

    [DllImport("ntdll.dll")]
    private static extern int NtCreateFile(
        out nint fileHandle,
        uint desiredAccess,
        ref ObjectAttributes objectAttributes,
        out IoStatusBlock ioStatusBlock,
        nint allocationSize,
        uint fileAttributes,
        uint shareAccess,
        uint createDisposition,
        uint createOptions,
        nint eaBuffer,
        uint eaLength);

    [DllImport("ntdll.dll")]
    private static extern int NtQueryDirectoryFile(
        SafeFileHandle fileHandle,
        nint eventHandle,
        nint apcRoutine,
        nint apcContext,
        out IoStatusBlock ioStatusBlock,
        nint fileInformation,
        uint length,
        int fileInformationClass,
        byte returnSingleEntry,
        nint fileName,
        byte restartScan);

    [DllImport("ntdll.dll")]
    private static extern int NtSetInformationFile(
        SafeFileHandle fileHandle,
        out IoStatusBlock ioStatusBlock,
        nint fileInformation,
        uint length,
        int fileInformationClass);

    [DllImport("ntdll.dll")]
    private static extern uint RtlNtStatusToDosError(int status);

    [DllImport("kernel32.dll", SetLastError = true)]
    [return: MarshalAs(UnmanagedType.Bool)]
    private static extern bool GetFileInformationByHandleEx(
        SafeFileHandle fileHandle,
        int fileInformationClass,
        out FileBasicInformation fileInformation,
        uint bufferSize);

    [DllImport("kernel32.dll", EntryPoint = "GetFileInformationByHandleEx", SetLastError = true)]
    [return: MarshalAs(UnmanagedType.Bool)]
    private static extern bool GetFileIdentityInformationByHandle(
        SafeFileHandle fileHandle,
        int fileInformationClass,
        out FileIdInformation fileInformation,
        uint bufferSize);

    [DllImport("kernel32.dll", CharSet = CharSet.Unicode, ExactSpelling = true, SetLastError = true)]
    [return: MarshalAs(UnmanagedType.Bool)]
    private static extern bool GetVolumeInformationByHandleW(
        SafeFileHandle fileHandle,
        StringBuilder? volumeNameBuffer,
        uint volumeNameSize,
        out uint volumeSerialNumber,
        out uint maximumComponentLength,
        out uint fileSystemFlags,
        StringBuilder fileSystemNameBuffer,
        uint fileSystemNameSize);

    [DllImport("kernel32.dll", EntryPoint = "SetFileInformationByHandle", SetLastError = true)]
    [return: MarshalAs(UnmanagedType.Bool)]
    private static extern bool SetFileBasicInformationByHandle(
        SafeFileHandle fileHandle,
        int fileInformationClass,
        ref FileBasicInformation fileInformation,
        uint bufferSize);

    [DllImport("kernel32.dll", EntryPoint = "SetFileInformationByHandle", SetLastError = true)]
    [return: MarshalAs(UnmanagedType.Bool)]
    private static extern bool SetFileDispositionInformationByHandle(
        SafeFileHandle fileHandle,
        int fileInformationClass,
        ref FileDispositionInformation fileInformation,
        uint bufferSize);

}
