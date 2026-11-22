# SPDX-License-Identifier: MIT
[CmdletBinding()]
param(
    [Parameter(Mandatory)] [string] $UpdatedImage,
    [Parameter(Mandatory)] [string[]] $BaselineImages,
    [Parameter(Mandatory)] [string] $OutputPath
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

# Patchwiz takes uncompressed administrative images. The finished packages
# remain embedded in the normal offline setup bundles.
$updated = (Resolve-Path -LiteralPath $UpdatedImage).Path
$baselines = @($BaselineImages | ForEach-Object { (Resolve-Path -LiteralPath $_).Path })
$output = [IO.Path]::GetFullPath($OutputPath)
$folder = Split-Path -Parent $output
$null = New-Item -ItemType Directory -Path $folder -Force
$sdkRoot = Join-Path ${env:ProgramFiles(x86)} 'Windows Kits\10\bin'
$tool = Get-ChildItem -LiteralPath $sdkRoot -Directory | Where-Object Name -Match '^\d+\.\d+\.\d+\.\d+$' |
    Sort-Object { [version]$_.Name } -Descending |
    ForEach-Object { Join-Path $_.FullName 'x86\MsiMsp.exe' } |
    Where-Object { Test-Path -LiteralPath $_ -PathType Leaf } | Select-Object -First 1
if (!$tool) { throw 'MsiMsp.exe is required from the Windows SDK.' }

$installer = New-Object -ComObject WindowsInstaller.Installer
function Invoke-MsiSql($Database, [string] $Sql) {
    $view = $Database.OpenView($Sql)
    try { $null = $view.Execute() } finally { $null = $view.Close() }
}
function Get-MsiProperty([string] $Image, [string] $Name) {
    $database = $installer.OpenDatabase($Image, 0)
    try {
        $view = $database.OpenView('SELECT `Value` FROM `Property` WHERE `Property` = ' + "'$Name'")
        try {
            $null = $view.Execute()
            $record = $view.Fetch()
            if (!$record) { throw "Missing MSI property $Name in $Image" }
            return $record.StringData(1)
        } finally { $null = $view.Close() }
    } finally { $null = [Runtime.InteropServices.Marshal]::ReleaseComObject($database) }
}
function ConvertTo-MsiSqlString([string] $Value) { return "'" + $Value.Replace("'", "''") + "'" }

$productCode = Get-MsiProperty $updated 'ProductCode'
$version = [version](Get-MsiProperty $updated 'ProductVersion')
$seen = [Collections.Generic.HashSet[version]]::new()
foreach ($baseline in $baselines) {
    $baseVersion = [version](Get-MsiProperty $baseline 'ProductVersion')
    if ((Get-MsiProperty $baseline 'ProductCode') -ne $productCode -or $baseVersion -ge $version -or !$seen.Add($baseVersion)) {
        throw "MSI patch baseline $baseline does not match the product or has an invalid version."
    }
}

$pcp = "$output.pcp"
if ((Test-Path -LiteralPath $pcp) -or (Test-Path -LiteralPath $output)) { throw "Patch output already exists: $output" }
$database = $installer.OpenDatabase($pcp, 3)
try {
    Invoke-MsiSql $database 'CREATE TABLE `Properties` (`Name` CHAR(72) NOT NULL, `Value` CHAR(0) PRIMARY KEY `Name`)'
    Invoke-MsiSql $database 'CREATE TABLE `ImageFamilies` (`Family` CHAR(8) NOT NULL, `MediaSrcPropName` CHAR(72), `MediaDiskId` SHORT, `FileSequenceStart` LONG, `DiskPrompt` CHAR(64), `VolumeLabel` CHAR(32) PRIMARY KEY `Family`)'
    Invoke-MsiSql $database 'CREATE TABLE `UpgradedImages` (`Upgraded` CHAR(13) NOT NULL, `MsiPath` CHAR(255) NOT NULL, `PatchMsiPath` CHAR(255), `SymbolPaths` CHAR(255), `Family` CHAR(8) NOT NULL PRIMARY KEY `Upgraded`)'
    Invoke-MsiSql $database 'CREATE TABLE `TargetImages` (`Target` CHAR(13) NOT NULL, `MsiPath` CHAR(255) NOT NULL, `SymbolPaths` CHAR(255), `Upgraded` CHAR(13) NOT NULL, `Order` INT NOT NULL, `ProductValidateFlags` CHAR(10), `IgnoreMissingSrcFiles` INT NOT NULL PRIMARY KEY `Target`)'
    Invoke-MsiSql $database 'CREATE TABLE `PatchMetadata` (`Company` CHAR(72), `Property` CHAR(72) NOT NULL, `Value` CHAR(0) PRIMARY KEY `Company`, `Property`)'
    Invoke-MsiSql $database 'CREATE TABLE `PatchSequence` (`PatchFamily` CHAR(72) NOT NULL, `Target` CHAR(38), `Sequence` CHAR(32), `Supersede` INT PRIMARY KEY `PatchFamily`, `Target`)'
    $properties = @{
        PatchGUID = [Guid]::NewGuid().ToString('B').ToUpperInvariant()
        PatchOutputPath = $output
        ListOfTargetProductCodes = $productCode
        IncludeWholeFilesOnly = '0'
        OptimizePatchSizeForLargeFiles = '1'
        MinimumRequiredMsiVersion = '310'
    }
    foreach ($entry in $properties.GetEnumerator()) {
        Invoke-MsiSql $database ('INSERT INTO `Properties` (`Name`, `Value`) VALUES ({0}, {1})' -f
            (ConvertTo-MsiSqlString $entry.Key), (ConvertTo-MsiSqlString $entry.Value))
    }
    $metadata = @{
        AllowRemoval = '0'
        MinorUpdateTargetRTM = '1'
        ManufacturerName = (Get-MsiProperty $updated 'Manufacturer')
        TargetProductName = (Get-MsiProperty $updated 'ProductName')
        MoreInfoURL = "https://github.com/KotMatrosk1n/KM-Companion/releases/tag/v$version"
        DisplayName = "KM Companion $version"
        Description = "Update KM Companion to $version"
        Classification = 'Update'
    }
    foreach ($entry in $metadata.GetEnumerator()) {
        Invoke-MsiSql $database ('INSERT INTO `PatchMetadata` (`Property`, `Value`) VALUES ({0}, {1})' -f
            (ConvertTo-MsiSqlString $entry.Key), (ConvertTo-MsiSqlString $entry.Value))
    }
    Invoke-MsiSql $database 'INSERT INTO `ImageFamilies` (`Family`) VALUES (''KMC'')'
    Invoke-MsiSql $database ('INSERT INTO `UpgradedImages` (`Upgraded`, `MsiPath`, `Family`) VALUES (''Latest'', {0}, ''KMC'')' -f (ConvertTo-MsiSqlString $updated))
    Invoke-MsiSql $database ('INSERT INTO `PatchSequence` (`PatchFamily`, `Sequence`, `Supersede`) VALUES (''KMCompanion'', ''{0}'', 1)' -f $version)
    for ($index = 0; $index -lt $baselines.Count; $index++) {
        Invoke-MsiSql $database ('INSERT INTO `TargetImages` (`Target`, `MsiPath`, `Upgraded`, `Order`, `ProductValidateFlags`, `IgnoreMissingSrcFiles`) VALUES (''Base{0}'', {1}, ''Latest'', {2}, ''0x00000922'', 0)' -f
            $index, (ConvertTo-MsiSqlString $baselines[$index]), ($index + 1))
    }
    $null = $database.Commit()
    $summary = $database.SummaryInformation(3)
    try {
        $summary.Property(2) = 'Installation Database'
        $summary.Property(7) = ';1033'
        $summary.Property(15) = 0
        $null = $summary.Persist()
    } finally { $null = [Runtime.InteropServices.Marshal]::ReleaseComObject($summary) }
} finally { $null = [Runtime.InteropServices.Marshal]::ReleaseComObject($database) }

$scratch = Join-Path $folder ([Guid]::NewGuid().ToString('N'))
$process = Start-Process -FilePath $tool -ArgumentList "-s `"$pcp`" -p `"$output`" -l `"$output.log`" -f `"$scratch`" -k" -WindowStyle Hidden -PassThru
if (!$process.WaitForExit([int][TimeSpan]::FromHours(1).TotalMilliseconds)) {
    $process.Kill()
    throw "MSI patch creation timed out. See $output.log."
}
if ($process.ExitCode -ne 0 -or !(Test-Path -LiteralPath $output -PathType Leaf)) {
    throw "MSI patch creation failed ($($process.ExitCode)). See $output.log."
}
