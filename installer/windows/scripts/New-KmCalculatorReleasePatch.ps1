# SPDX-License-Identifier: MIT
[CmdletBinding()]
param(
    [Parameter(Mandatory)] [string] $Version,
    [Parameter(Mandatory)] [string] $ReleaseDirectory,
    [Parameter(Mandatory)] [string] $WorkDirectory,
    [switch] $VerifyInstall
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest
if ($Version -notmatch '^\d+\.\d+\.\d+$') { throw 'Expected a three part release version.' }
$releaseRoot = (Resolve-Path -LiteralPath $ReleaseDirectory).Path
$work = (New-Item -ItemType Directory -Path $WorkDirectory -Force).FullName
$repository = 'KotMatrosk1n/KM-Companion'
$latest = Join-Path $releaseRoot 'latest.yml'
$targetSetup = Get-Item -LiteralPath (Join-Path $releaseRoot "KM-Companion-Setup-$Version.exe")
$installer = New-Object -ComObject WindowsInstaller.Installer
$msiexec = Join-Path ([Environment]::SystemDirectory) 'msiexec.exe'

function Get-SetupMsi([IO.FileInfo] $Setup, [string] $SetupVersion, [string] $Destination) {
    # A separate process releases the launcher assembly and its embedded bundle after extraction.
    pwsh -NoProfile -File (Join-Path $PSScriptRoot 'Export-KmCalculatorSetupMsi.ps1') `
        -SetupPath $Setup.FullName -Version $SetupVersion -WorkDirectory $Destination | Out-Host
    if ($LASTEXITCODE -ne 0) { throw "Could not read the MSI from setup $SetupVersion." }
    return Join-Path $Destination 'KM.Companion.msi'
}

function Read-MsiPackage([string] $Msi) {
    $database = $installer.OpenDatabase($Msi, 0)
    try {
        $properties = @{}
        $view = $database.OpenView('SELECT `Property`, `Value` FROM `Property`')
        try {
            $null = $view.Execute()
            while ($record = $view.Fetch()) { $properties[$record.StringData(1)] = $record.StringData(2) }
        } finally { $null = $view.Close() }

        # Patchwiz requires stable file keys, paths and cabinet sequence. The full
        # setup also has to remain valid as a Windows Installer minor upgrade.
        $layout = foreach ($query in @(
            'SELECT `Directory`, `Directory_Parent`, `DefaultDir` FROM `Directory`',
            'SELECT `Component`, `ComponentId`, `Directory_`, `Attributes`, `Condition`, `KeyPath` FROM `Component`',
            'SELECT `Feature`, `Feature_Parent`, `Directory_`, `Attributes` FROM `Feature`',
            'SELECT `Feature_`, `Component_` FROM `FeatureComponents`',
            'SELECT `File`, `Component_`, `FileName`, `Sequence` FROM `File`',
            'SELECT `DiskId`, `LastSequence`, `Cabinet` FROM `Media`'
        )) {
            $view = $database.OpenView($query)
            try {
                $null = $view.Execute()
                $rows = while ($record = $view.Fetch()) {
                    $fieldCount = $record.FieldCount()
                    $row = for ($index = 1; $index -le $fieldCount; $index++) { $record.StringData($index) }
                    ConvertTo-Json -InputObject @($row) -Compress
                }
                $rows | Sort-Object -CaseSensitive
            } finally { $null = $view.Close() }
        }
        return @{ properties = $properties; layout = $layout -join "`n" }
    } finally { $null = [Runtime.InteropServices.Marshal]::ReleaseComObject($database) }
}

function New-AdminImage([string] $Msi, [string] $Destination) {
    $null = New-Item -ItemType Directory -Path $Destination
    $log = Join-Path $Destination 'admin.log'
    $result = Start-Process -FilePath $msiexec -WindowStyle Hidden -Wait -PassThru -ArgumentList (
        '/a "{0}" TARGETDIR="{1}" /qn /norestart /l*v "{2}"' -f $Msi, $Destination, $log
    )
    $adminMsi = Join-Path $Destination (Split-Path -Leaf $Msi)
    if ($result.ExitCode -ne 0 -or !(Test-Path -LiteralPath $adminMsi -PathType Leaf)) {
        Get-Content -LiteralPath $log -Tail 40 -ErrorAction SilentlyContinue | Out-Host
        throw "Could not make an administrative image from $Msi."
    }
    return $adminMsi
}

function Get-Sha512([string] $File) {
    return [Convert]::ToBase64String([Convert]::FromHexString((Get-FileHash -LiteralPath $File -Algorithm SHA512).Hash))
}

function Invoke-SetupTest([string] $Executable, [string] $Arguments) {
    $result = Start-Process -FilePath $Executable -ArgumentList $Arguments -WindowStyle Hidden -Wait -PassThru
    if ($result.ExitCode -ne 0) {
        throw "Installer verification failed with code $($result.ExitCode). Command: $Executable $Arguments"
    }
}

function Test-ReleaseInstall([string] $PreviousSetup, [string] $PatchFile, [string] $TargetImage, [string] $EarlierPatch = '') {
    $marker = 'HKLM:\Software\KM Calculator'
    $location = Join-Path ([Environment]::GetFolderPath('ProgramFiles')) 'KM Companion'
    if ((Test-Path -LiteralPath $marker) -or (Test-Path -LiteralPath $location)) {
        throw 'Installer verification needs a clean Windows runner.'
    }
    $command = '/quiet /norestart'
    if ($PreviousSetup) { Invoke-SetupTest $PreviousSetup $command }
    $shortcutPreference = 1
    if ($PatchFile) {
        # Exercise preservation of disabled shortcut preferences on the clean runner.
        $shortcutPreference = 0
        Set-ItemProperty -LiteralPath $marker -Name CreateDesktopShortcut -Value $shortcutPreference
        Set-ItemProperty -LiteralPath $marker -Name CreateStartMenuShortcut -Value $shortcutPreference
        foreach ($file in @($EarlierPatch, $PatchFile) | Where-Object { $_ }) {
            $log = Join-Path $work ('install-{0}.log' -f [Guid]::NewGuid().ToString('N'))
            try {
                Invoke-SetupTest $msiexec ('/update "{0}" /qn /norestart REINSTALL=ALL REINSTALLMODE=omus /l*v "{1}"' -f $file, $log)
            } catch {
                Get-Content -LiteralPath $log -Tail 60 -ErrorAction SilentlyContinue | Out-Host
                throw
            }
        }
    } else {
        Invoke-SetupTest $targetSetup.FullName $command
    }

    $installed = Get-ItemProperty -LiteralPath $marker
    if ($installed.Version -ne $Version -or $installed.ProductCode -ne $product -or
        $installed.CreateDesktopShortcut -ne $shortcutPreference -or $installed.CreateStartMenuShortcut -ne $shortcutPreference) {
        throw 'The update did not register the expected MSI version and shortcut preferences.'
    }
    $arp = "HKLM:\Software\Microsoft\Windows\CurrentVersion\Uninstall\$product"
    if ((Test-Path -LiteralPath $arp) -and (Get-ItemPropertyValue -LiteralPath $arp -Name SystemComponent -ErrorAction SilentlyContinue) -ne 1) {
        throw 'The application MSI should remain hidden behind the setup entry.'
    }
    $imageExecutables = @(Get-ChildItem -LiteralPath (Split-Path -Parent $TargetImage) -Recurse -File -Filter 'KM Companion.exe')
    if ($imageExecutables.Count -ne 1) { throw 'The target MSI image does not contain one main executable.' }
    $imageRoot = $imageExecutables[0].Directory.FullName
    foreach ($file in Get-ChildItem -LiteralPath $imageRoot -File -Recurse -Force) {
        $relative = [IO.Path]::GetRelativePath($imageRoot, $file.FullName)
        if ((Get-Sha512 $file.FullName) -cne (Get-Sha512 (Join-Path $location $relative))) {
            throw "Installed file does not match the release: $relative"
        }
    }

    $uninstaller = $PatchFile ? $PreviousSetup : $targetSetup.FullName
    Invoke-SetupTest $uninstaller '/uninstall /quiet /norestart'
    if ((Test-Path -LiteralPath $marker) -or (Test-Path -LiteralPath (Join-Path $location 'KM Companion.exe'))) {
        throw 'The registered setup did not uninstall the updated MSI.'
    }
}

$targetMsi = Get-SetupMsi $targetSetup $Version (Join-Path $work 'target')
$target = Read-MsiPackage $targetMsi
$product = $target.properties.ProductCode
if ($target.properties.ProductVersion -ne $Version -or $product -notmatch '^\{[0-9A-F-]{36}\}$') {
    throw 'The MSI version or product identity does not match the release.'
}

$json = gh release list --repo $repository --exclude-drafts --exclude-pre-releases --limit 12 --json tagName
if ($LASTEXITCODE -ne 0) { throw 'Could not list the published releases for patch baselines.' }
$candidates = @($json | ConvertFrom-Json | Where-Object {
    $_.tagName -match '^v\d+\.\d+\.\d+$' -and [version]$_.tagName.Substring(1) -lt [version]$Version
} | Sort-Object { [version]$_.tagName.Substring(1) } -Descending)
$baselines = @()
$previousSetup = ''
foreach ($candidate in $candidates) {
    $baseVersion = $candidate.tagName.Substring(1)
    $directory = (New-Item -ItemType Directory -Path (Join-Path $work "v$baseVersion")).FullName
    gh release download $candidate.tagName --repo $repository --pattern latest.yml --dir $directory
    if ($LASTEXITCODE -ne 0) { throw "Could not read the release metadata for $baseVersion." }
    $baseMetadata = Get-Content -LiteralPath (Join-Path $directory 'latest.yml') -Raw
    $baseProduct = [regex]::Match($baseMetadata, '(?m)^windowsProductCode: ''(\{[0-9A-Fa-f-]{36}\})''\r?$').Groups[1].Value
    if ($baseProduct -ne $product -and (!$VerifyInstall -or $previousSetup)) { break }
    $asset = "KM-Companion-Setup-$baseVersion.exe"
    gh release download $candidate.tagName --repo $repository --pattern $asset --dir $directory
    if ($LASTEXITCODE -ne 0) { throw "Could not retrieve the released setup for $baseVersion." }
    $setup = Get-Item -LiteralPath (Join-Path $directory $asset)
    $expectedHash = [regex]::Match($baseMetadata, '(?m)^sha512: ([A-Za-z0-9+/]{86}==)\r?$').Groups[1].Value
    if ((Get-Sha512 $setup.FullName) -cne $expectedHash) { throw "Setup $baseVersion failed verification." }
    if (!$previousSetup) { $previousSetup = $setup.FullName }
    if ($baseProduct -ne $product) { break }
    $baselineMsi = Get-SetupMsi $setup $baseVersion (Join-Path $directory 'setup')
    $baseline = Read-MsiPackage $baselineMsi
    if ($baseline.properties.ProductCode -ne $product -or $baseline.properties.ProductVersion -ne $baseVersion) {
        throw "Setup $baseVersion contains an unexpected MSI."
    }
    if ($baseline.layout -cne $target.layout) {
        throw "MSI layout changed since $baseVersion. Assign a new ProductCode in Package.wxs to start a new patch family."
    }
    $baselines += @{ version = $baseVersion; path = $baselineMsi; work = $directory; setup = $setup.FullName; metadata = $baseMetadata }
    if ($baselines.Count -ge 4) { break }
}

$extraMetadata = @("windowsProductCode: '$product'")
$patchAsset = $null
$targetImage = $null
if ($baselines.Count -or $VerifyInstall) {
    $targetImage = New-AdminImage $targetMsi (Join-Path $work 'target-image')
}
if ($baselines.Count) {
    $baseImages = @($baselines | Sort-Object { [version]$_.version } | ForEach-Object {
        New-AdminImage $_.path (Join-Path $_.work 'image')
    })
    $name = "KM-Companion-Update-$Version.msp"
    $output = Join-Path $work $name
    $patch = $null
    try {
        & (Join-Path $PSScriptRoot 'New-KmCalculatorMsiPatch.ps1') -UpdatedImage $targetImage `
            -BaselineImages $baseImages -OutputPath $output
        $patch = Get-Item -LiteralPath $output
    } catch {
        Get-Content -LiteralPath "$output.log" -Tail 40 -ErrorAction SilentlyContinue | Out-Host
        Write-Warning "The Windows SDK could not build a patch. This release will use the full installer. $($_.Exception.Message)"
    }
    if ($patch -and $patch.Length -lt $targetSetup.Length) {
        $patchAsset = Copy-Item -LiteralPath $patch.FullName -Destination $releaseRoot -PassThru
        $extraMetadata += @('windowsPatch:', "  productCode: '$product'", "  size: $($patch.Length)",
            "  sha512: $(Get-Sha512 $patch.FullName)", '  from:')
        $extraMetadata += @($baselines | ForEach-Object { "    - '$($_.version)'" })
    } elseif ($patch) {
        Write-Host 'The patch is larger than the full installer. This release will use the full installer.'
    }
}

if ($VerifyInstall) {
    if ($patchAsset) {
        foreach ($baseline in $baselines) {
            Write-Host "Testing the cumulative patch from $($baseline.version) to $Version."
            Test-ReleaseInstall $baseline.setup $patchAsset.FullName $targetImage
        }
        $preceding = $baselines[0]
        $earlierPatchData = [regex]::Match($preceding.metadata, '(?m)^windowsPatch:\r?\n((?: +[^\r\n]+\r?\n)+)').Groups[1].Value
        $earlierHash = [regex]::Match($earlierPatchData, '(?m)^  sha512: ([A-Za-z0-9+/]{86}==)\r?$').Groups[1].Value
        $earlierVersions = @([regex]::Matches($earlierPatchData, '(?m)^    - ''(\d+\.\d+\.\d+)''\r?$') | ForEach-Object { $_.Groups[1].Value })
        $chainBase = $baselines | Where-Object { $earlierVersions -contains $_.version } | Select-Object -Last 1
        if ($chainBase -and $earlierHash) {
            $earlierAsset = "KM-Companion-Update-$($preceding.version).msp"
            gh release download "v$($preceding.version)" --repo $repository --pattern $earlierAsset --dir $preceding.work
            if ($LASTEXITCODE -ne 0) { throw 'Could not retrieve the previous patch for its upgrade test.' }
            $earlierPatch = Join-Path $preceding.work $earlierAsset
            if ((Get-Sha512 $earlierPatch) -cne $earlierHash) { throw 'The previous patch failed verification.' }
            Write-Host "Testing $Version after applying the $($preceding.version) patch to $($chainBase.version)."
            Test-ReleaseInstall $chainBase.setup $patchAsset.FullName $targetImage $earlierPatch
        }
    }
    Write-Host "Testing the full setup for $Version."
    Test-ReleaseInstall $previousSetup '' $targetImage
}

$lines = (Get-Content -LiteralPath $latest -Raw).TrimEnd() + "`n" + ($extraMetadata -join "`n") + "`n"
[IO.File]::WriteAllText($latest, $lines, [Text.UTF8Encoding]::new($false))
$checksums = foreach ($asset in @($targetSetup, (Get-Item -LiteralPath $latest), $patchAsset)) {
    if ($asset) { "$( (Get-FileHash -LiteralPath $asset.FullName -Algorithm SHA256).Hash.ToLowerInvariant() )  $($asset.Name)" }
}
[IO.File]::WriteAllLines((Join-Path $releaseRoot 'SHA256SUMS.txt'), [string[]]$checksums, [Text.UTF8Encoding]::new($false))
