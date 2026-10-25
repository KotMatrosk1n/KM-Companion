# SPDX-License-Identifier: MIT

[CmdletBinding()]
param(
    [string] $Version,
    [string] $AppDirectory,
    [string] $OutputDirectory,
    [string] $SigningCertificatePath,
    [string] $SigningCertificatePassword,
    [string] $TimestampUrl = "http://timestamp.digicert.com",
    [switch] $RequireSigning,
    [switch] $AcceptWixEula,
    [switch] $KeepIntermediate
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

function Invoke-CheckedProcess {
    param(
        [Parameter(Mandatory = $true)] [string] $FilePath,
        [Parameter(Mandatory = $true)] [string[]] $Arguments
    )

    & $FilePath @Arguments
    if ($LASTEXITCODE -ne 0) {
        throw "$FilePath exited with code $LASTEXITCODE."
    }
}

function Find-SignTool {
    $configuredPath = [string]$env:KM_SIGNTOOL_PATH
    if (-not [string]::IsNullOrWhiteSpace($configuredPath)) {
        $configuredFullPath = [IO.Path]::GetFullPath($configuredPath)
        if (-not (Test-Path -LiteralPath $configuredFullPath -PathType Leaf)) {
            throw "KM_SIGNTOOL_PATH does not identify a file: $configuredFullPath"
        }
        return $configuredFullPath
    }

    $command = Get-Command "signtool.exe" -CommandType Application -ErrorAction SilentlyContinue |
        Select-Object -First 1
    if ($command) {
        return $command.Source
    }

    $kitsRoot = Join-Path ${env:ProgramFiles(x86)} "Windows Kits\10\bin"
    if (Test-Path -LiteralPath $kitsRoot -PathType Container) {
        $candidate = Get-ChildItem -LiteralPath $kitsRoot -Directory |
            Sort-Object Name -Descending |
            ForEach-Object { Join-Path $_.FullName "x64\signtool.exe" } |
            Where-Object { Test-Path -LiteralPath $_ -PathType Leaf } |
            Select-Object -First 1
        if ($candidate) {
            return $candidate
        }
    }

    throw "Signing was requested, but signtool.exe was not found. Install the Windows 10 or 11 SDK, or set KM_SIGNTOOL_PATH."
}

function Get-SigningCertificate {
    param(
        [Parameter(Mandatory = $true)] [string] $CertificatePath,
        [Parameter(Mandatory = $true)] [string] $Password
    )

    $certificateFullPath = (Resolve-Path -LiteralPath $CertificatePath).Path
    try {
        $flags = [Security.Cryptography.X509Certificates.X509KeyStorageFlags]::EphemeralKeySet
        $certificate = [Security.Cryptography.X509Certificates.X509Certificate2]::new(
            $certificateFullPath,
            $Password,
            $flags)
    } catch {
        throw "The signing certificate could not be opened as a password-protected PFX: $($_.Exception.Message)"
    }

    if (-not $certificate.HasPrivateKey) {
        $certificate.Dispose()
        throw "The signing PFX does not contain a private key."
    }
    $now = [DateTime]::UtcNow
    if ($certificate.NotBefore.ToUniversalTime() -gt $now -or $certificate.NotAfter.ToUniversalTime() -le $now) {
        $validity = "$($certificate.NotBefore.ToUniversalTime().ToString('u')) through $($certificate.NotAfter.ToUniversalTime().ToString('u'))"
        $certificate.Dispose()
        throw "The signing certificate is not currently valid ($validity)."
    }

    $enhancedKeyUsage = $certificate.Extensions |
        Where-Object { $_.Oid.Value -eq "2.5.29.37" } |
        Select-Object -First 1
    if ($enhancedKeyUsage) {
        $supportsCodeSigning = $enhancedKeyUsage.EnhancedKeyUsages |
            Where-Object { $_.Value -eq "1.3.6.1.5.5.7.3.3" } |
            Select-Object -First 1
        if (-not $supportsCodeSigning) {
            $certificate.Dispose()
            throw "The signing certificate's enhanced key usage does not permit code signing."
        }
    }
    if ([string]::IsNullOrWhiteSpace($certificate.Subject) -or $certificate.Subject -match '[\r\n\x00]') {
        $certificate.Dispose()
        throw "The signing certificate has an invalid subject distinguished name."
    }

    return $certificate
}

function Set-UpdaterPublisherPin {
    param(
        [Parameter(Mandatory = $true)] [string] $ConfigPath,
        [Parameter(Mandatory = $true)] [string] $PublisherSubject
    )

    $configText = [IO.File]::ReadAllText($ConfigPath)
    if ($configText -match '(?m)^publisherName\s*:') {
        throw "The staged app-update.yml already contains publisherName; refusing to overwrite a possibly stale or conflicting trust pin."
    }
    $yamlSubject = $PublisherSubject.Replace("'", "''")
    $updatedText = $configText.TrimEnd() + "`npublisherName:`n  - '$yamlSubject'`n"
    [IO.File]::WriteAllText($ConfigPath, $updatedText, [Text.UTF8Encoding]::new($false))
}

function New-StagedUpdaterConfiguration {
    param(
        [Parameter(Mandatory = $true)] [string] $ConfigPath
    )

    $configText = @(
        "provider: github",
        "owner: KotMatrosk1n",
        "repo: KM-Companion",
        "updaterCacheDirName: km-calculator-updater"
    ) -join "`n"
    $configText += "`n"

    $configDirectory = Split-Path -Parent $ConfigPath
    if (-not (Test-Path -LiteralPath $configDirectory -PathType Container)) {
        throw "The staged resources directory is missing: $configDirectory"
    }
    [IO.File]::WriteAllText($ConfigPath, $configText, [Text.UTF8Encoding]::new($false))
    if (-not (Test-Path -LiteralPath $ConfigPath -PathType Leaf) -or
        [IO.File]::ReadAllText($ConfigPath) -cne $configText) {
        throw "The staged app-update.yml could not be created and validated."
    }
}

function Invoke-AuthenticodeSign {
    param(
        [Parameter(Mandatory = $true)] [string] $SignToolPath,
        [Parameter(Mandatory = $true)] [string] $CertificatePath,
        [Parameter(Mandatory = $true)] [string] $Password,
        [Parameter(Mandatory = $true)] [string] $Rfc3161TimestampUrl,
        [Parameter(Mandatory = $true)] [string] $TargetPath,
        [Parameter(Mandatory = $true)] [Security.Cryptography.X509Certificates.X509Certificate2] $ExpectedCertificate
    )

    if ($Rfc3161TimestampUrl -notmatch '^https?://[^\s]+$') {
        throw "TimestampUrl must be an HTTP or HTTPS URL."
    }
    Invoke-CheckedProcess -FilePath $SignToolPath -Arguments @(
        "sign",
        "/fd", "SHA256",
        "/td", "SHA256",
        "/tr", $Rfc3161TimestampUrl,
        "/f", $CertificatePath,
        "/p", $Password,
        "/d", "KM Companion",
        $TargetPath
    )
    Invoke-CheckedProcess -FilePath $SignToolPath -Arguments @("verify", "/pa", "/all", "/v", $TargetPath)

    $signature = Get-AuthenticodeSignature -LiteralPath $TargetPath
    if ($signature.Status -ne [Management.Automation.SignatureStatus]::Valid) {
        throw "Authenticode verification failed for $TargetPath with status $($signature.Status)."
    }
    if (-not $signature.SignerCertificate -or
        $signature.SignerCertificate.Thumbprint -ne $ExpectedCertificate.Thumbprint -or
        $signature.SignerCertificate.Subject -ne $ExpectedCertificate.Subject) {
        throw "The Authenticode signer for $TargetPath does not match the supplied signing certificate."
    }
    if (-not $signature.TimeStamperCertificate) {
        throw "The Authenticode signature for $TargetPath does not contain a trusted RFC 3161 timestamp."
    }
}

function Assert-SafeBuildPath {
    param(
        [Parameter(Mandatory = $true)] [string] $Candidate,
        [Parameter(Mandatory = $true)] [string] $BuildRoot
    )

    $candidateFull = [IO.Path]::GetFullPath($Candidate).TrimEnd('\')
    $rootFull = [IO.Path]::GetFullPath($BuildRoot).TrimEnd('\') + '\'
    if (-not $candidateFull.StartsWith($rootFull, [StringComparison]::OrdinalIgnoreCase)) {
        throw "Refusing to use an intermediate path outside the installer build root: $candidateFull"
    }
}

function New-PayloadHashManifest {
    param(
        [Parameter(Mandatory = $true)] [string] $Root,
        [Parameter(Mandatory = $true)] [string] $OutputPath
    )

    $rootFull = [IO.Path]::GetFullPath($Root).TrimEnd('\')
    $lines = foreach ($file in Get-ChildItem -LiteralPath $rootFull -Recurse -Force -File | Sort-Object FullName) {
        $relative = [IO.Path]::GetRelativePath($rootFull, $file.FullName).Replace('\', '/')
        $hash = (Get-FileHash -LiteralPath $file.FullName -Algorithm SHA256).Hash.ToLowerInvariant()
        "$hash  $relative"
    }
    [IO.File]::WriteAllLines($OutputPath, $lines, [Text.UTF8Encoding]::new($false))
    return @($lines).Count
}

$windowsDirectory = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot ".."))
$repositoryRoot = [IO.Path]::GetFullPath((Join-Path $windowsDirectory "..\.."))
$packageJsonPath = Join-Path $repositoryRoot "package.json"
$packageJson = Get-Content -LiteralPath $packageJsonPath -Raw | ConvertFrom-Json

if ([string]::IsNullOrWhiteSpace($Version)) {
    $Version = [string]$packageJson.version
}
if ($Version -notmatch '^\d+\.\d+\.\d+$') {
    throw "Version must be a numeric three-part version such as 0.4.26."
}
if ($Version -ne [string]$packageJson.version) {
    throw "Requested version $Version does not match package.json version $($packageJson.version)."
}
$versionParts = $Version.Split('.') | ForEach-Object { [int]$_ }
if ($versionParts[0] -gt 255 -or $versionParts[1] -gt 255 -or $versionParts[2] -gt 65535) {
    throw "Version $Version exceeds Windows Installer version component limits."
}

$eulaAcceptedByEnvironment = [string]::Equals(
    $env:WIX_V7_EULA_ACCEPTED,
    "true",
    [StringComparison]::OrdinalIgnoreCase)
if (-not $AcceptWixEula -and -not $eulaAcceptedByEnvironment) {
    throw @"
WiX Toolset v7 requires explicit acceptance of its OSMF EULA.
Review https://wixtoolset.org/osmf/ and rerun with -AcceptWixEula, or set
WIX_V7_EULA_ACCEPTED=true in an authorized build environment.
"@
}

$requireSigningEnvironment = [string]$env:KM_REQUIRE_SIGNING
if (-not [string]::IsNullOrWhiteSpace($requireSigningEnvironment) -and
    -not [string]::Equals($requireSigningEnvironment, "true", [StringComparison]::OrdinalIgnoreCase) -and
    -not [string]::Equals($requireSigningEnvironment, "false", [StringComparison]::OrdinalIgnoreCase)) {
    throw "KM_REQUIRE_SIGNING must be true or false when it is set."
}
$signingRequired = $RequireSigning -or [string]::Equals(
    $requireSigningEnvironment,
    "true",
    [StringComparison]::OrdinalIgnoreCase)
if ([string]::IsNullOrWhiteSpace($SigningCertificatePath)) {
    $SigningCertificatePath = [string]$env:KM_SIGNING_CERTIFICATE_PATH
}
if ([string]::IsNullOrWhiteSpace($SigningCertificatePassword)) {
    $SigningCertificatePassword = [string]$env:KM_SIGNING_CERTIFICATE_PASSWORD
}
$hasSigningCertificate = -not [string]::IsNullOrWhiteSpace($SigningCertificatePath)
$hasSigningPassword = -not [string]::IsNullOrWhiteSpace($SigningCertificatePassword)
if ($hasSigningCertificate -ne $hasSigningPassword) {
    throw "Signing requires both KM_SIGNING_CERTIFICATE_PATH and KM_SIGNING_CERTIFICATE_PASSWORD (or their matching script parameters)."
}
if ($signingRequired -and -not $hasSigningCertificate) {
    throw "KM_REQUIRE_SIGNING=true, but the signing PFX path and password were not supplied. Refusing to create unsigned release artifacts."
}
$signingEnabled = $hasSigningCertificate -and $hasSigningPassword
if ($signingEnabled) {
    $SigningCertificatePath = (Resolve-Path -LiteralPath $SigningCertificatePath).Path
    if (-not (Test-Path -LiteralPath $SigningCertificatePath -PathType Leaf) -or
        [IO.Path]::GetExtension($SigningCertificatePath) -notin @(".pfx", ".p12")) {
        throw "The signing certificate path must identify a .pfx or .p12 file."
    }
}

if ([string]::IsNullOrWhiteSpace($AppDirectory)) {
    $AppDirectory = Join-Path $repositoryRoot "release\win-unpacked"
}
if ([string]::IsNullOrWhiteSpace($OutputDirectory)) {
    $OutputDirectory = Join-Path $repositoryRoot "release"
}
$appRoot = (Resolve-Path -LiteralPath $AppDirectory).Path.TrimEnd('\')
$outputRoot = [IO.Path]::GetFullPath($OutputDirectory)
[IO.Directory]::CreateDirectory($outputRoot) | Out-Null

$requiredFiles = @(
    "KM Companion.exe",
    "resources\app.asar",
    "resources\sprites\manifest.json"
)
foreach ($requiredFile in $requiredFiles) {
    if (-not (Test-Path -LiteralPath (Join-Path $appRoot $requiredFile) -PathType Leaf)) {
        throw "Packaged Electron payload is missing $requiredFile. Run npm run electron:pack first."
    }
}
$reparsePoint = Get-ChildItem -LiteralPath $appRoot -Recurse -Force |
    Where-Object { -not [string]::IsNullOrEmpty($_.LinkType) -or $_.Target } |
    Select-Object -First 1
if ($reparsePoint) {
    throw "Packaged Electron payload contains a file-system link: $($reparsePoint.FullName)"
}

$mainExecutable = Get-Item -LiteralPath (Join-Path $appRoot "KM Companion.exe")
$versionInfo = $mainExecutable.VersionInfo
if ($versionInfo.ProductName -ne "KM Companion" -or $versionInfo.FileVersion -notlike "$Version*") {
    throw "Packaged executable metadata does not match KM Companion $Version."
}

$buildRoot = Join-Path $windowsDirectory "obj\setup-build"
[IO.Directory]::CreateDirectory($buildRoot) | Out-Null
$buildDirectory = Join-Path $buildRoot ([Guid]::NewGuid().ToString("N"))
Assert-SafeBuildPath -Candidate $buildDirectory -BuildRoot $buildRoot
[IO.Directory]::CreateDirectory($buildDirectory) | Out-Null
$signingCertificate = $null

try {
    $payloadStage = Join-Path $buildDirectory "payload"
    [IO.Directory]::CreateDirectory($payloadStage) | Out-Null
    foreach ($item in Get-ChildItem -LiteralPath $appRoot -Force) {
        Copy-Item -LiteralPath $item.FullName -Destination $payloadStage -Recurse -Force
    }
    $stagedUpdaterConfig = Join-Path $payloadStage "resources\app-update.yml"
    New-StagedUpdaterConfiguration -ConfigPath $stagedUpdaterConfig

    $signToolPath = $null
    if ($signingEnabled) {
        $signToolPath = Find-SignTool
        $signingCertificate = Get-SigningCertificate `
            -CertificatePath $SigningCertificatePath `
            -Password $SigningCertificatePassword
        $stagedMainExecutable = Join-Path $payloadStage "KM Companion.exe"
        Invoke-AuthenticodeSign `
            -SignToolPath $signToolPath `
            -CertificatePath $SigningCertificatePath `
            -Password $SigningCertificatePassword `
            -Rfc3161TimestampUrl $TimestampUrl `
            -TargetPath $stagedMainExecutable `
            -ExpectedCertificate $signingCertificate
        Set-UpdaterPublisherPin `
            -ConfigPath $stagedUpdaterConfig `
            -PublisherSubject $signingCertificate.Subject
    }

    $payloadManifest = Join-Path $buildDirectory "Payload.sha256"
    $payloadFileCount = New-PayloadHashManifest -Root $payloadStage -OutputPath $payloadManifest
    $generatedPayloadWxs = Join-Path $buildDirectory "GeneratedPayload.wxs"
    & (Join-Path $PSScriptRoot "New-KmCalculatorPayloadFragment.ps1") `
        -PayloadDirectory $payloadStage `
        -OutputPath $generatedPayloadWxs

    $iconPath = Join-Path $repositoryRoot "electron\assets\km-companion-icon.ico"
    $logoPath = Join-Path $repositoryRoot "electron\assets\km-companion-icon.png"
    $packageOutput = Join-Path $buildDirectory "package"
    $bundleOutput = Join-Path $buildDirectory "bundle"
    $launcherOutput = Join-Path $buildDirectory "launcher"
    $setupUiOutput = Join-Path $buildDirectory "setup-ui"

    $packageProject = Join-Path $windowsDirectory "KMCalculator.Setup.Package\KMCalculator.Setup.Package.wixproj"
    Invoke-CheckedProcess -FilePath "dotnet" -Arguments @(
        "build", $packageProject,
        "--configuration", "Release",
        "--output", $packageOutput,
        "-p:AcceptEula=wix7",
        "-p:KmVersion=$Version",
        "-p:KmPayloadDir=$payloadStage",
        "-p:KmGeneratedPayloadWxs=$generatedPayloadWxs",
        "-p:KmIconPath=$iconPath"
    )
    $msiPath = Join-Path $packageOutput "KM.Companion.msi"
    if (-not (Test-Path -LiteralPath $msiPath -PathType Leaf)) {
        throw "The WiX package build did not produce KM.Companion.msi."
    }
    if ($signingEnabled) {
        Invoke-AuthenticodeSign `
            -SignToolPath $signToolPath `
            -CertificatePath $SigningCertificatePath `
            -Password $SigningCertificatePassword `
            -Rfc3161TimestampUrl $TimestampUrl `
            -TargetPath $msiPath `
            -ExpectedCertificate $signingCertificate
    }

    # Publish the same custom UI for installation, passive updates, maintenance,
    # and the cached bundle's uninstaller. Include its runtime for clean machines.
    $setupUiProject = Join-Path $windowsDirectory "KMCalculator.Setup.UI\KMCalculator.Setup.UI.csproj"
    Invoke-CheckedProcess -FilePath "dotnet" -Arguments @(
        "publish", $setupUiProject,
        "--configuration", "Release",
        "--runtime", "win-x64",
        "--self-contained", "true",
        "--output", $setupUiOutput,
        "-p:AcceptEula=wix7",
        "-p:KmVersion=$Version",
        "-p:KmIconPath=$iconPath",
        "-p:KmLogoPath=$logoPath"
    )
    $setupUiPath = Join-Path $setupUiOutput "KMCompanion.Setup.UI.exe"
    if (-not (Test-Path -LiteralPath $setupUiPath -PathType Leaf)) {
        throw "The setup UI publish did not produce KMCompanion.Setup.UI.exe."
    }
    if ($signingEnabled) {
        Invoke-AuthenticodeSign `
            -SignToolPath $signToolPath `
            -CertificatePath $SigningCertificatePath `
            -Password $SigningCertificatePassword `
            -Rfc3161TimestampUrl $TimestampUrl `
            -TargetPath $setupUiPath `
            -ExpectedCertificate $signingCertificate
    }

    $bundleProject = Join-Path $windowsDirectory "KMCalculator.Setup.Bundle\KMCalculator.Setup.Bundle.wixproj"
    Invoke-CheckedProcess -FilePath "dotnet" -Arguments @(
        "build", $bundleProject,
        "--configuration", "Release",
        "--output", $bundleOutput,
        "-p:AcceptEula=wix7",
        "-p:KmVersion=$Version",
        "-p:KmMsiPath=$msiPath",
        "-p:KmIconPath=$iconPath",
        "-p:KmSetupUiDir=$setupUiOutput"
    )
    $innerBundlePath = Join-Path $bundleOutput "KM.Companion.Bundle.exe"
    if (-not (Test-Path -LiteralPath $innerBundlePath -PathType Leaf)) {
        throw "The WiX bundle build did not produce KM.Companion.Bundle.exe."
    }
    if ($signingEnabled) {
        Invoke-AuthenticodeSign `
            -SignToolPath $signToolPath `
            -CertificatePath $SigningCertificatePath `
            -Password $SigningCertificatePassword `
            -Rfc3161TimestampUrl $TimestampUrl `
            -TargetPath $innerBundlePath `
            -ExpectedCertificate $signingCertificate
    }

    $innerBundleHashFile = Join-Path $buildDirectory "KM.Companion.Bundle.sha256"
    $innerBundleHash = (Get-FileHash -LiteralPath $innerBundlePath -Algorithm SHA256).Hash.ToLowerInvariant()
    [IO.File]::WriteAllText($innerBundleHashFile, $innerBundleHash + "`n", [Text.UTF8Encoding]::new($false))
    $versionFile = Join-Path $buildDirectory "version.txt"
    [IO.File]::WriteAllText($versionFile, $Version + "`n", [Text.UTF8Encoding]::new($false))

    $launcherProject = Join-Path $windowsDirectory "KMCalculator.Setup.Launcher\KMCalculator.Setup.Launcher.csproj"
    Invoke-CheckedProcess -FilePath "dotnet" -Arguments @(
        "publish", $launcherProject,
        "--configuration", "Release",
        "--runtime", "win-x64",
        "--self-contained", "true",
        "--output", $launcherOutput,
        "-p:KmVersion=$Version",
        "-p:KmIconPath=$iconPath",
        "-p:KmInnerBundlePath=$innerBundlePath",
        "-p:KmInnerBundleSha256File=$innerBundleHashFile",
        "-p:KmVersionFile=$versionFile"
    )
    $launcherPath = Join-Path $launcherOutput "KM-Companion-Setup.exe"
    if (-not (Test-Path -LiteralPath $launcherPath -PathType Leaf)) {
        throw "The setup launcher build did not produce KM-Companion-Setup.exe."
    }
    if ($signingEnabled) {
        Invoke-AuthenticodeSign `
            -SignToolPath $signToolPath `
            -CertificatePath $SigningCertificatePath `
            -Password $SigningCertificatePassword `
            -Rfc3161TimestampUrl $TimestampUrl `
            -TargetPath $launcherPath `
            -ExpectedCertificate $signingCertificate
    }

    $artifactName = "KM-Companion-Setup-$Version.exe"
    $artifactPath = Join-Path $outputRoot $artifactName
    Copy-Item -LiteralPath $launcherPath -Destination $artifactPath -Force

    $latestYmlPath = Join-Path $outputRoot "latest.yml"
    & (Join-Path $PSScriptRoot "New-ElectronUpdaterMetadata.ps1") `
        -Version $Version `
        -InstallerPath $artifactPath `
        -OutputPath $latestYmlPath

    $sha256Path = Join-Path $outputRoot "SHA256SUMS.txt"
    $checksums = foreach ($asset in @($artifactPath, $latestYmlPath)) {
        $item = Get-Item -LiteralPath $asset
        $hash = (Get-FileHash -LiteralPath $item.FullName -Algorithm SHA256).Hash.ToLowerInvariant()
        "$hash  $($item.Name)"
    }
    [IO.File]::WriteAllLines($sha256Path, $checksums, [Text.UTF8Encoding]::new($false))

    $receipt = [ordered]@{
        schemaVersion = 1
        product = "KM Companion"
        version = $Version
        architecture = "x64"
        payloadFileCount = $payloadFileCount
        installer = $artifactName
        installerSha256 = (Get-FileHash -LiteralPath $artifactPath -Algorithm SHA256).Hash.ToLowerInvariant()
        updaterMetadata = "latest.yml"
        checksums = "SHA256SUMS.txt"
        signed = $signingEnabled
        signerSubject = $(if ($signingEnabled) { $signingCertificate.Subject } else { $null })
        signerThumbprint = $(if ($signingEnabled) { $signingCertificate.Thumbprint } else { $null })
    }
    $receipt | ConvertTo-Json | Set-Content -LiteralPath (Join-Path $outputRoot "KM-Companion-Setup-$Version.receipt.json") -Encoding utf8NoBOM

    Write-Host "Built KM Companion setup: $artifactPath"
} finally {
    if ($signingCertificate) {
        $signingCertificate.Dispose()
    }
    if (-not $KeepIntermediate -and (Test-Path -LiteralPath $buildDirectory)) {
        Assert-SafeBuildPath -Candidate $buildDirectory -BuildRoot $buildRoot
        Remove-Item -LiteralPath $buildDirectory -Recurse -Force
    }
}
