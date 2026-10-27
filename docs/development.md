# Development

Use this guide to run KM Companion from source or create a local Windows desktop package. Installed releases do not need a development environment.

## Requirements

- Windows 10 or Windows 11 on x64
- Git
- Node.js 24 or a later compatible release, with npm

Installer builds additionally require PowerShell 7 (`pwsh`) and .NET SDK 8 or later. The [Windows setup guide](../installer/windows/README.md) documents WiX requirements, installer identity, and optional local signing. Published releases are unsigned and do not require certificate secrets.

## Run from source

Clone the repository and install its locked dependencies:

```powershell
git clone https://github.com/KotMatrosk1n/KM-Companion.git
Set-Location .\KM-Companion
npm ci
```

Start the desktop development build:

```powershell
npm run electron:dev
```

This builds the source and launches Electron. The root [package.json](../package.json) contains the current development, build, and packaging commands. The generated `dist/` directory supplies the packaged interface; it is not a separately supported hosted site.

## Create a desktop package

```powershell
npm run electron:pack
```

The unpacked Windows app is written to `release/win-unpacked/`. This command builds the app without creating or running an installer.

To create the Windows setup executable, first review the [WiX OSMF terms](https://wixtoolset.org/osmf/), then explicitly accept them for the build:

```powershell
pwsh -NoProfile -File installer/windows/scripts/Build-KmCalculatorWindowsSetup.ps1 -AcceptWixEula
```

The script requires the completed desktop package. WiX v7 EULA acceptance must come from `-AcceptWixEula` or an authorized build environment with `WIX_V7_EULA_ACCEPTED=true`. The repository does not record acceptance.

Setup outputs include `release/KM-Companion-Setup-<version>.exe`, `release/latest.yml`, and `release/SHA256SUMS.txt`. Generated installers, build receipts, caches, and local logs belong in ignored output paths. See the [Windows setup guide](../installer/windows/README.md) for the complete build contract and safeguards.

## Check a change

Before submitting a change, build the source and run the public checks:

```powershell
npm run build
npm run lint
npm run check:workspace
npm run check:third-party-notices
```

Keep canonical generation behavior separate from ROM hack overlays. Update the relevant user guide when a workflow or supported format changes, and preserve data credits and redistribution permissions. The [contribution guide](../CONTRIBUTING.md) covers review scope, validation, and the public repository's exclusions for local test and smoke assets. See [ROM hack profiles](rom-hack-profiles.md) for integration boundaries.

## Release and update behavior

Source builds do not publish a release. The [release guide](releases.md) covers version tags, matching source archives, dependency sources, and publication.

Official Windows releases are unsigned. Update downloads use HTTPS and the SHA-512 digest in `latest.yml`; release assets also include `SHA256SUMS.txt`. These checks compare files with the published metadata and do not verify an Authenticode publisher. Optional local signing remains available through the setup script with Windows SDK `signtool.exe` and a trusted code signing PFX.

Preserve the existing app data and installer upgrade identities when changing packaging. Updates, repairs, and installation over an existing copy retain downloaded Pokémon artwork. Only successful uninstall removes the current account's downloaded illustrations and sprites, while keeping saved runs and settings. See [upgrade and uninstall behavior](../installer/windows/README.md#upgrade-and-uninstall-behavior) and [artwork storage and delivery](pokedex-data.md#artwork-storage-and-delivery).
