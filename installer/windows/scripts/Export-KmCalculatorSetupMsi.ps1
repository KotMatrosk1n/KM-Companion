# SPDX-License-Identifier: MIT
[CmdletBinding()]
param(
    [Parameter(Mandatory)] [string] $SetupPath,
    [Parameter(Mandatory)] [string] $Version,
    [Parameter(Mandatory)] [string] $WorkDirectory
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

# Extract the embedded MSI from the released setup without running the setup.
$setup = (Resolve-Path -LiteralPath $SetupPath).Path
$work = (New-Item -ItemType Directory -Path $WorkDirectory -Force).FullName
$sdkLines = dotnet --list-sdks
if ($LASTEXITCODE -ne 0) { throw 'The .NET SDK could not be located.' }
$hostModel = $sdkLines | ForEach-Object {
    if ($_ -match '^(\d+)\S* \[(.+)\]$' -and [int]$Matches[1] -le [Environment]::Version.Major) {
        $sdkVersion = ($_ -split ' ', 2)[0]
        Join-Path (Join-Path $Matches[2] $sdkVersion) 'Microsoft.NET.HostModel.dll'
    }
} | Where-Object { Test-Path -LiteralPath $_ -PathType Leaf } | Select-Object -Last 1
if (!$hostModel) { throw 'A .NET SDK compatible with PowerShell is required to extract setup bundles.' }
$hostAssembly = [Reflection.Assembly]::LoadFile($hostModel)
$bundleReader = $hostAssembly.GetType('Microsoft.NET.HostModel.Bundle.Bundler').GetMethod('IsBundle')
if (!$bundleReader) { $bundleReader = $hostAssembly.GetType('Microsoft.NET.HostModel.AppHost.HostWriter').GetMethod('IsBundle') }
if (!$bundleReader) { throw 'The .NET SDK does not expose a setup bundle reader.' }
$arguments = [object[]]@($setup, [long]0)
if (!$bundleReader.Invoke($null, $arguments)) { throw 'Setup is not a .NET bundle.' }
$header = [long]$arguments[1]

$reader = [IO.BinaryReader]::new([IO.File]::OpenRead($setup))
try {
    $stream = $reader.BaseStream
    if ($header -le 0 -or $header -ge $stream.Length) { throw 'Invalid setup bundle header offset.' }
    $stream.Position = $header
    $major = $reader.ReadUInt32()
    $null = $reader.ReadUInt32()
    $count = $reader.ReadInt32()
    $null = $reader.ReadString()
    if ($major -ne 6 -or $count -lt 1 -or $count -gt 10000) { throw 'Unsupported .NET setup bundle format.' }
    $stream.Position += 40
    $entry = $null
    for ($index = 0; $index -lt $count; $index++) {
        $offset = $reader.ReadInt64()
        $size = $reader.ReadInt64()
        $compressed = $reader.ReadInt64()
        $null = $reader.ReadByte()
        if ($reader.ReadString() -cne 'KM-Companion-Setup.dll') { continue }
        if ($entry) { throw 'Setup contains more than one launcher assembly.' }
        $entry = @{ offset = $offset; size = $size; compressed = $compressed }
    }
    if (!$entry) { throw 'Setup does not contain the launcher assembly.' }
    $length = $entry.compressed -gt 0 ? $entry.compressed : $entry.size
    if ($entry.offset -lt 0 -or $length -le 0 -or $entry.offset -gt $header - $length -or
        $entry.size -le 0 -or $entry.size -gt 1GB) { throw 'Invalid launcher resource bounds.' }
    $stream.Position = $entry.offset
    $bytes = $reader.ReadBytes([int]$length)
    if ($entry.compressed -gt 0) {
        $buffer = [IO.MemoryStream]::new($bytes, $false)
        $inflate = [IO.Compression.DeflateStream]::new($buffer, [IO.Compression.CompressionMode]::Decompress)
        try {
            $bytes = [byte[]]::new($entry.size)
            $inflate.ReadExactly($bytes)
            if ($inflate.ReadByte() -ne -1) { throw 'Launcher assembly exceeded its declared size.' }
        } finally { $inflate.Dispose(); $buffer.Dispose() }
    }
    if ($bytes.Length -ne $entry.size) { throw 'Launcher assembly length mismatch.' }
    $launcherPath = Join-Path $work 'KM-Companion-Setup.dll'
    [IO.File]::WriteAllBytes($launcherPath, $bytes)
} finally { $reader.Dispose() }

$assembly = [Reflection.Assembly]::LoadFile($launcherPath)
function Read-LauncherResource([string] $Name) {
    $resource = $assembly.GetManifestResourceStream("KMCalculator.Setup.$Name")
    if (!$resource) { throw "Setup launcher resource $Name is missing." }
    $reader = [IO.StreamReader]::new($resource)
    try { return $reader.ReadToEnd().Trim() } finally { $reader.Dispose() }
}

if ((Read-LauncherResource 'Version') -cne $Version) { throw 'Setup version does not match the release.' }
$bundle = $assembly.GetManifestResourceStream('KMCalculator.Setup.InnerBundle')
if (!$bundle) { throw 'Setup launcher does not contain the Burn bundle.' }
$bundlePath = Join-Path $work 'KM.Companion.Bundle.exe'
$destination = [IO.File]::Create($bundlePath)
try { $bundle.CopyTo($destination) } finally { $destination.Dispose(); $bundle.Dispose() }
if ((Get-FileHash -LiteralPath $bundlePath -Algorithm SHA256).Hash -ne (Read-LauncherResource 'InnerBundleSha256')) {
    throw 'Embedded Burn bundle failed verification.'
}

$packages = $env:NUGET_PACKAGES ? $env:NUGET_PACKAGES : (Join-Path $env:USERPROFILE '.nuget\packages')
$wix = Join-Path $packages 'wixtoolset.sdk\7.0.0\tools\net8.0\wix.dll'
$output = Join-Path $work 'packages'
dotnet $wix -acceptEula wix7 burn extract $bundlePath -out $output -outba (Join-Path $work 'bootstrapper') | Out-Host
if ($LASTEXITCODE -ne 0) { throw "Could not extract the Burn packages for $Version." }
$msi = @(Get-ChildItem -LiteralPath $output -Filter 'KM.Companion.msi' -File -Recurse)
if ($msi.Count -ne 1) { throw 'Setup does not contain exactly one KM Companion MSI package.' }
Copy-Item -LiteralPath $msi[0].FullName -Destination (Join-Path $work 'KM.Companion.msi')
