# SPDX-License-Identifier: MIT

[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [string] $PayloadDirectory,

    [Parameter(Mandatory = $true)]
    [string] $OutputPath
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$componentNamespace = [Guid]"86b802a6-49e8-4a33-b027-f6acb1e77b52"
$wixNamespace = [System.Xml.Linq.XNamespace]"http://wixtoolset.org/schemas/v4/wxs"

function Get-NormalizedRelativePath {
    param(
        [Parameter(Mandatory = $true)] [string] $Root,
        [Parameter(Mandatory = $true)] [string] $Path
    )

    $relative = [IO.Path]::GetRelativePath($Root, $Path).Replace('\', '/')
    if ($relative -eq ".." -or $relative.StartsWith("../", [StringComparison]::Ordinal)) {
        throw "Payload path escaped its root: $Path"
    }
    return $relative
}

function Get-StableIdentifier {
    param(
        [Parameter(Mandatory = $true)] [string] $Prefix,
        [Parameter(Mandatory = $true)] [string] $Value
    )

    $bytes = [Text.Encoding]::UTF8.GetBytes($Value.ToLowerInvariant())
    $hash = [Security.Cryptography.SHA256]::HashData($bytes)
    return $Prefix + ([Convert]::ToHexString($hash).Substring(0, 30))
}

function ConvertTo-NetworkGuidBytes {
    param([Parameter(Mandatory = $true)] [Guid] $Guid)

    $bytes = $Guid.ToByteArray()
    [Array]::Reverse($bytes, 0, 4)
    [Array]::Reverse($bytes, 4, 2)
    [Array]::Reverse($bytes, 6, 2)
    return $bytes
}

function ConvertFrom-NetworkGuidBytes {
    param([Parameter(Mandatory = $true)] [byte[]] $Bytes)

    $copy = [byte[]]$Bytes.Clone()
    [Array]::Reverse($copy, 0, 4)
    [Array]::Reverse($copy, 4, 2)
    [Array]::Reverse($copy, 6, 2)
    return [Guid]::new($copy)
}

function Get-VersionFiveGuid {
    param(
        [Parameter(Mandatory = $true)] [Guid] $Namespace,
        [Parameter(Mandatory = $true)] [string] $Name
    )

    $namespaceBytes = ConvertTo-NetworkGuidBytes -Guid $Namespace
    $nameBytes = [Text.Encoding]::UTF8.GetBytes($Name.ToLowerInvariant())
    $input = [byte[]]::new($namespaceBytes.Length + $nameBytes.Length)
    [Array]::Copy($namespaceBytes, 0, $input, 0, $namespaceBytes.Length)
    [Array]::Copy($nameBytes, 0, $input, $namespaceBytes.Length, $nameBytes.Length)
    $hash = [Security.Cryptography.SHA1]::HashData($input)
    $guidBytes = [byte[]]$hash[0..15]
    $guidBytes[6] = ($guidBytes[6] -band 0x0f) -bor 0x50
    $guidBytes[8] = ($guidBytes[8] -band 0x3f) -bor 0x80
    return ConvertFrom-NetworkGuidBytes -Bytes $guidBytes
}

function New-DirectoryElement {
    param(
        [Parameter(Mandatory = $true)] [IO.DirectoryInfo] $Directory,
        [Parameter(Mandatory = $true)] [string] $Root,
        [Parameter(Mandatory = $true)] [AllowEmptyCollection()] [Collections.Generic.List[string]] $ComponentIds
    )

    $relativeDirectory = Get-NormalizedRelativePath -Root $Root -Path $Directory.FullName
    $element = [System.Xml.Linq.XElement]::new(
        $wixNamespace + "Directory",
        [System.Xml.Linq.XAttribute]::new("Id", (Get-StableIdentifier -Prefix "PayloadDir_" -Value $relativeDirectory)),
        [System.Xml.Linq.XAttribute]::new("Name", $Directory.Name)
    )

    foreach ($childDirectory in @($Directory.EnumerateDirectories() | Sort-Object Name)) {
        if (-not [string]::IsNullOrEmpty($childDirectory.LinkTarget)) {
            throw "File-system links are not allowed in the packaged payload: $($childDirectory.FullName)"
        }
        $element.Add((New-DirectoryElement -Directory $childDirectory -Root $Root -ComponentIds $ComponentIds))
    }

    foreach ($file in @($Directory.EnumerateFiles() | Sort-Object Name)) {
        if (-not [string]::IsNullOrEmpty($file.LinkTarget)) {
            throw "File-system links are not allowed in the packaged payload: $($file.FullName)"
        }
        Add-FileComponent -Parent $element -File $file -Root $Root -ComponentIds $ComponentIds
    }

    return $element
}

function Add-FileComponent {
    param(
        [Parameter(Mandatory = $true)] [System.Xml.Linq.XElement] $Parent,
        [Parameter(Mandatory = $true)] [IO.FileInfo] $File,
        [Parameter(Mandatory = $true)] [string] $Root,
        [Parameter(Mandatory = $true)] [AllowEmptyCollection()] [Collections.Generic.List[string]] $ComponentIds
    )

    $relative = Get-NormalizedRelativePath -Root $Root -Path $File.FullName
    $isMainExecutable = $relative.Equals("KM Companion.exe", [StringComparison]::OrdinalIgnoreCase)
    $componentId = if ($isMainExecutable) {
        "KmCalculatorMainExecutableComponent"
    } else {
        Get-StableIdentifier -Prefix "PayloadCmp_" -Value $relative
    }
    $fileId = if ($isMainExecutable) {
        "KmCalculatorMainExecutableFile"
    } else {
        Get-StableIdentifier -Prefix "PayloadFile_" -Value $relative
    }
    $componentGuid = Get-VersionFiveGuid -Namespace $componentNamespace -Name ("component/" + $relative)
    $source = "!(bindpath.KmPayload)\" + $relative.Replace('/', '\')

    $fileElement = [System.Xml.Linq.XElement]::new(
        $wixNamespace + "File",
        [System.Xml.Linq.XAttribute]::new("Id", $fileId),
        [System.Xml.Linq.XAttribute]::new("Source", $source),
        [System.Xml.Linq.XAttribute]::new("KeyPath", "yes")
    )
    $componentElement = [System.Xml.Linq.XElement]::new(
        $wixNamespace + "Component",
        [System.Xml.Linq.XAttribute]::new("Id", $componentId),
        [System.Xml.Linq.XAttribute]::new("Guid", $componentGuid.ToString("D")),
        [System.Xml.Linq.XAttribute]::new("Bitness", "always64"),
        $fileElement
    )
    $Parent.Add($componentElement)
    $ComponentIds.Add($componentId)
}

$payloadRoot = (Resolve-Path -LiteralPath $PayloadDirectory).Path.TrimEnd('\')
$requiredFiles = @(
    "KM Companion.exe",
    "resources\app.asar",
    "resources\app-update.yml"
)
foreach ($requiredFile in $requiredFiles) {
    if (-not (Test-Path -LiteralPath (Join-Path $payloadRoot $requiredFile) -PathType Leaf)) {
        throw "Required packaged application file is missing: $requiredFile"
    }
}

$componentIds = [Collections.Generic.List[string]]::new()
$directoryReference = [System.Xml.Linq.XElement]::new(
    $wixNamespace + "DirectoryRef",
    [System.Xml.Linq.XAttribute]::new("Id", "INSTALLFOLDER")
)

$rootDirectory = [IO.DirectoryInfo]::new($payloadRoot)
foreach ($directory in @($rootDirectory.EnumerateDirectories() | Sort-Object Name)) {
    if (-not [string]::IsNullOrEmpty($directory.LinkTarget)) {
        throw "File-system links are not allowed in the packaged payload: $($directory.FullName)"
    }
    $directoryReference.Add((New-DirectoryElement -Directory $directory -Root $payloadRoot -ComponentIds $componentIds))
}
foreach ($file in @($rootDirectory.EnumerateFiles() | Sort-Object Name)) {
    if (-not [string]::IsNullOrEmpty($file.LinkTarget)) {
        throw "File-system links are not allowed in the packaged payload: $($file.FullName)"
    }
    Add-FileComponent -Parent $directoryReference -File $file -Root $payloadRoot -ComponentIds $componentIds
}

$componentGroup = [System.Xml.Linq.XElement]::new(
    $wixNamespace + "ComponentGroup",
    [System.Xml.Linq.XAttribute]::new("Id", "KmCalculatorPayloadComponents")
)
foreach ($componentId in $componentIds | Sort-Object) {
    $componentGroup.Add([System.Xml.Linq.XElement]::new(
        $wixNamespace + "ComponentRef",
        [System.Xml.Linq.XAttribute]::new("Id", $componentId)
    ))
}

$document = [System.Xml.Linq.XDocument]::new(
    [System.Xml.Linq.XDeclaration]::new("1.0", "utf-8", $null),
    [System.Xml.Linq.XElement]::new(
        $wixNamespace + "Wix",
        [System.Xml.Linq.XElement]::new($wixNamespace + "Fragment", $directoryReference),
        [System.Xml.Linq.XElement]::new($wixNamespace + "Fragment", $componentGroup)
    )
)

$outputFullPath = [IO.Path]::GetFullPath($OutputPath)
[IO.Directory]::CreateDirectory([IO.Path]::GetDirectoryName($outputFullPath)) | Out-Null
$settings = [Xml.XmlWriterSettings]::new()
$settings.Encoding = [Text.UTF8Encoding]::new($false)
$settings.Indent = $true
$settings.NewLineChars = "`r`n"
$writer = [Xml.XmlWriter]::Create($outputFullPath, $settings)
try {
    $document.Save($writer)
} finally {
    $writer.Dispose()
}

Write-Host "Generated WiX payload fragment for $($componentIds.Count) files: $outputFullPath"
