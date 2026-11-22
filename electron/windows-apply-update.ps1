# SPDX-License-Identifier: MIT
# Invoked by the installed application with a verified patch and a fixed program path.
$ErrorActionPreference = 'Stop'
$marker = 'HKLM:\Software\KM Calculator'
$stream = $null
$closed = $false
try {
    $installation = Get-ItemProperty -LiteralPath $marker
    $installFolder = Join-Path ([Environment]::GetFolderPath('ProgramFiles')) 'KM Companion'
    if ($patch.executable -ne (Join-Path $installFolder 'KM Companion.exe') -or
        ([IO.Path]::GetFullPath($installation.InstallLocation).TrimEnd('\') -ne $installFolder) -or
        $installation.InstallerFamily -ne 'BurnMsi' -or $installation.InstallScope -ne 'perMachine' -or
        $installation.Version -ne $patch.from -or $installation.ProductCode -ne $patch.productCode) {
        throw 'The installed KM Companion version or MSI identity has changed.'
    }

    # Keep a read handle open so the verified file cannot be rewritten before Windows Installer reads it.
    $stream = [IO.File]::Open($patch.file, 'Open', 'Read', 'Read')
    $hash = [Security.Cryptography.SHA512]::Create()
    try {
        if ($stream.Length -ne $patch.size -or [Convert]::ToBase64String($hash.ComputeHash($stream)) -cne $patch.sha512) {
            throw 'The staged patch failed verification.'
        }
    } finally { $hash.Dispose() }

    $parent = Get-Process -Id $patch.pid -ErrorAction SilentlyContinue
    Set-Content -LiteralPath ($patch.file + '.ready') -Value 'ready'
    if ($parent -and !$parent.WaitForExit(30000)) {
        throw 'KM Companion did not close in time for the update.'
    }
    $closed = $true
    $msiexec = Join-Path ([Environment]::SystemDirectory) 'msiexec.exe'
    $operation = Start-Process -FilePath $msiexec -Verb RunAs -Wait -PassThru -ArgumentList (
        '/update "{0}" /passive /norestart REINSTALL=ALL REINSTALLMODE=omus' -f $patch.file
    )
    if ($operation.ExitCode -notin 0, 3010) {
        throw "Windows Installer returned code $($operation.ExitCode)."
    }
    if ((Get-ItemProperty -LiteralPath $marker).Version -ne $patch.version) {
        throw "Windows Installer did not register KM Companion $($patch.version)."
    }
    Set-Content -LiteralPath $patch.log -Value "Installed KM Companion $($patch.version). Windows Installer code $($operation.ExitCode)."
} catch {
    Set-Content -LiteralPath $patch.log -Value $_.Exception.Message -ErrorAction SilentlyContinue
} finally {
    if ($stream) { $stream.Dispose() }
    Remove-Item -LiteralPath $patch.file, ($patch.file + '.ready') -Force -ErrorAction SilentlyContinue
    try { [IO.Directory]::Delete((Split-Path -LiteralPath $patch.file)) } catch { }
    if ($closed -and (Test-Path -LiteralPath $patch.executable -PathType Leaf)) {
        Start-Process -FilePath $patch.executable -WorkingDirectory (Split-Path -LiteralPath $patch.executable)
    }
}
