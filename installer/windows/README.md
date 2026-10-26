# KM Companion Windows setup

KM Companion uses an independently authored WiX Toolset v7 Burn bundle and MSI. The public setup executable is a small launcher that embeds and SHA-256 verifies the Burn bundle, translates the legacy `electron-updater` installer arguments, waits for setup, and returns Burn's exact exit code.

The installer remains a separate MIT licensed program and does not copy KM Editor's GPL-3.0-only installer source. KM Editor is a behavioral and visual reference only. The calculator payload is GPLv3; WiX retains MS-RL and .NET retains its own notices. See [LICENSING.md](../../LICENSING.md) for these boundaries and matching source distribution.

## Custom setup interface

`KMCalculator.Setup.UI` is a dedicated WPF bootstrapper application. It owns the
installer, updater, repair, and uninstaller screens, replacing the former
WixStdBA XML theme. All modes use the same dark window chrome, Companion icon,
inset cards, indigo actions, gold accents, styled checkboxes, and progress bar.
The baseline window is 760 by 440 device independent pixels; longer disclosures
expand vertically, with a work area limit and per monitor DPI support.

Progress comes from Burn and Windows Installer. Interactive setup waits for an
explicit action, including an uninstall confirmation. Passive
mode shows progress and exits on success. Quiet mode creates no visible window.
Cancellation waits for the engine's terminal result and does not interrupt
rollback. Results that require a restart are preserved, including with `/norestart`.
The UI evaluates the bundle's authored installation conditions before planning;
the MSI retains its independent path and legacy identity checks.

The setup UI is published with its .NET desktop runtime and embedded in Burn,
so installation and the cached uninstaller do not require a preinstalled .NET
runtime. The public launcher still owns legacy cleanup after installation and updater
relaunch. Finish returns control to that launcher; setup does not launch the
application ahead of cleanup. Uninstall preserves saved teams, progress, notes, and settings.

Pokémon illustrations and sprites are an optional app download rather than part
of the installer payload. The app stores them in its existing per user data
directory, outside Program Files and installer or updater caches. Updates,
repairs, and installing over an existing copy keep the collection. Uninstall removes
its downloaded illustrations and sprites for the current Windows account while
keeping saved teams, progress, notes, and settings.
Current payload checks require the executable and Electron archive; historical
Royal Sword identity checks retain their original sprite manifest requirements.
See [artwork storage and delivery](../../docs/pokedex-data.md#artwork-storage-and-delivery).

## Build prerequisites

- Windows x64
- Node.js 24 and `npm`
- PowerShell 7 (`pwsh`), not Windows PowerShell 5.1
- .NET SDK 8 or later
- WiX Toolset v7 packages restored by the projects
- Windows 10 or 11 SDK `signtool.exe` and a trusted code signing PFX for signed builds

WiX v7 requires explicit acceptance of its OSMF EULA. Review <https://wixtoolset.org/osmf/> first. The build fails closed unless either `-AcceptWixEula` is supplied directly or the authorized build environment contains `WIX_V7_EULA_ACCEPTED=true`. The repository does not record acceptance.

## Local build

From the repository root:

```powershell
npm ci
npm run electron:pack
pwsh -NoProfile -File installer/windows/scripts/Build-KmCalculatorWindowsSetup.ps1 -AcceptWixEula
```

The driver validates the package version and Electron executable metadata, stages the complete `release/win-unpacked` payload, rejects reparse points, deterministically creates and validates the GitHub `resources/app-update.yml` that `electron-builder --dir` omits, generates stable component IDs and GUIDs, builds the MSI, publishes the custom setup UI, builds Burn with that UI and its runtime, embeds and pins the bundle in the launcher, and writes:

- `release/KM-Companion-Setup-<version>.exe`
- `release/latest.yml`
- `release/SHA256SUMS.txt`
- a local ignored build receipt

Intermediate payloads and local validation artifacts stay under ignored `installer/windows/obj` and `release` paths. Do not commit generated installers, smoke test output, or local logs.

Before distributing a version, run `npm run release:source` from its clean version
tag. Publish the application source ZIP, dependency source archive, source
manifest, and checksums beside the installer. The dependency archive includes the
exact unmodified WiX source. The official release workflow prepares these before
building and verifies their hashes before upload. Do not pair a modified local
installer with source from a different commit. Electron and installer runtime
notices must accompany the payload; refresh `LICENSES/` when changing runtimes.

## Release signing

Published Windows releases are unsigned. The release workflow sets `KM_REQUIRE_SIGNING=false`, supplies no certificate, and verifies that the build receipt and public setup executable are unsigned before uploading them. Windows may identify the publisher as unknown. Download setup from this repository's GitHub Releases.

The updater downloads through HTTPS and checks the asset against the SHA-512 digest in `latest.yml`. Unsigned builds do not include a certificate publisher pin, so these checks verify the download against the release metadata rather than an Authenticode publisher. `SHA256SUMS.txt` provides separate hashes for the published assets.

Optional local signing remains available through the PFX path and password in `KM_SIGNING_CERTIFICATE_PATH` and `KM_SIGNING_CERTIFICATE_PASSWORD`, or the matching script parameters. Set `KM_REQUIRE_SIGNING=true` (or pass `-RequireSigning`) whenever a local unsigned result must be forbidden. `KM_SIGNTOOL_PATH` can identify an SDK `signtool.exe` when it is not on `PATH`.

Signed builds use SHA-256 Authenticode signatures and an RFC 3161 SHA-256 timestamp for the already stamped `KM Companion.exe`, the MSI, the custom setup UI executable, the inner Burn bundle, and the final public launcher. Each signature is verified against the supplied certificate and must contain a trusted timestamp before the next layer is built. The inner bundle is signed before its SHA-256 digest is embedded in the launcher. The certificate's complete subject distinguished name is added to the staged `resources/app-update.yml` before payload harvesting; this makes `electron-updater` verify the downloaded installer against that exact publisher instead of relying on the asset hash alone.

See [Releases](../../docs/releases.md) for the version tag workflow and published changelog procedure.

## Stable installer identity

- MSI UpgradeCode: `9971df03-d3bd-4fb5-a51b-d975985eea2c`
- Burn UpgradeCode: `6fec009c-ac8f-45c2-b84b-a648204cd665`
- Burn provider key: `com.kotmatrosk1n.kmcalculator.bundle`
- MSI scope: per machine
- Canonical destination: `%ProgramFiles%\KM Companion`

Burn is the only visible Programs and Features entry. Its chained MSI is hidden, supports major upgrades, repair, and uninstall, and owns the complete Electron payload.

## Upgrade and uninstall behavior

KM Companion 0.0.1 begins the public version sequence. Earlier development builds
used 0.4.26 and 0.4.27, which compare as newer versions. They will not offer 0.0.1
through automatic updates. Back up the run before moving from a development
build. If it was installed through setup, uninstall that registered development
copy through Windows Settings before installing 0.0.1. Uninstall preserves the
existing app data. A standalone unpacked preview only needs to be closed.

The MSI and Burn upgrade codes and provider key remain unchanged. For supported
upgrades to a higher version, setup accepts
an existing KM Calculator installation at `%ProgramFiles%\KM Calculator` as an
upgrade source, removes its registered payload through Windows Installer, and
installs `KM Companion.exe` under `%ProgramFiles%\KM Companion`. Both executable
names are checked for running applications before setup continues. Custom
installation locations remain unsupported.

The desktop app retains `%APPDATA%\KM Calculator`, the existing protocol origin,
storage keys, run backup format, and trainer pack schema. The installer retains
`HKLM\Software\KM Calculator`, shortcut preferences, cleanup receipts, and the
existing updater cache identity. These compatibility names preserve user data
and upgrade history; they are not separate installations. Repository links and
the update feed now use `KotMatrosk1n/KM-Companion`.

Setup saves its validated marker in 64 bit `HKLM\Software\KM Calculator`. Shortcut preferences are written there by the MSI and reloaded by Burn. Installation and maintenance are restricted to the single canonical `%ProgramFiles%\KM Companion` path; the Burn variable cannot be overridden through the command line, no folder browser is exposed, and the MSI independently rejects any other destination. Uninstall preserves KM Companion saved teams, notes, progress, settings, and updater caches. Only downloaded Pokémon illustrations and sprites are removed. The cached setup interface requires successful removal of the app MSI and a successful overall uninstall before deleting the current Windows account's two fixed artwork directories. Related bundle removals during upgrades, repair, modify, install, cache, layout, failure, and cancellation do not authorize this cleanup. The existing handle based deletion helper rejects reparse points and keeps all traversal inside the selected directories. Cleanup failures are reported separately from application removal. The elevated MSI does not accept or perform recursive cleanup of user profile paths.

The published legacy validation set is `0.1.0` through `0.2.2`, plus `0.3.21` and `0.4.26`. Every release uses NSIS identity `cef17072-1d18-5c82-9672-1f987b4e4970`; `0.1.0` through `0.1.2` are named `Pokemon Royal Sword`, while later releases are `Royal Sword Calculator`. Setup validates the exact version, display name, publisher, executable and uninstaller versions, `/allusers` uninstall command, Electron archive, updater configuration, and the sprite manifest for releases that shipped one. It recognizes the published upgrade lineage at the fixed 64 bit Program Files `Royal Sword Calculator`, `Pokemon Royal Sword`, and nested `Pokemon Royal Sword\Royal Sword Calculator` locations. A nested installation removes only the registered inner tree and removes its parent nonrecursively when empty.

Burn and the MSI perform independent identity checks; Burn's result is only an additional gate. The MSI builds every recursive target from `ProgramFiles64Folder`, never from the process environment or a custom path supplied through the command line or registry. Before elevation, the public launcher rejects reparse points in either known machine tree. Unknown releases, custom locations, malformed or partial registration, conflicting roots, and unregistered executable trees fail closed with manual removal instructions. After MSI success, invoking user cleanup is deferred until both machine registry keys and every legacy Program Files root are confirmed absent; results that require a reboot leave the cleanup receipt pending for a later verified retry.

After Burn reports a successful first KM Companion installation on a machine with no registered KM MSI, the unelevated public launcher requires a per run receipt and initiating user SID written by the elevated MSI before it removes the invoking user's fixed Royal Sword profile, updater cache, default per user program, shortcut, and HKCU registration paths. Before mutating a verified program tree, it durably persists a receipt named cleanup plan under `%APPDATA%\KM Calculator`, binds the original registry fingerprints and NTFS/ReFS volume/file identity, and uses its handle to rename the old program tree to a receipt specific quarantine path. A retry can finish only that quarantined object; a recreated canonical folder, changed registration, or later Royal Sword reinstall fails closed before profile or cache deletion. A later fresh KM installation safely retires any prior receipt's proven quarantine without applying that prior authority to a canonical app, settings, or registration. It binds cleanup revision `1` to the receipt only after every target and registration is gone, then removes the plan after committing those changes. The elevated receipt remains pending after a reboot or failed cleanup following installation, is carried through later upgrades without authorizing new deletion, and lets the same Windows SID safely retry after the installed KM payload validates; another account cannot consume it, and a fresh install after a true uninstall receives a different receipt. Existing KM upgrades, cancellation, same version maintenance, repair, modify, cache, layout, and uninstall do not independently authorize launcher cleanup.

The complete files and settings guarantee belongs to the public setup launcher and the invoking Windows user; launching the inner Burn bundle directly is not a supported cleanup path, and additional dormant Windows profiles are not enumerated or modified. Cleanup covers the released `%APPDATA%\Royal Sword Calculator` and `%APPDATA%\Pokemon Royal Sword` profiles; the lowercase `%LOCALAPPDATA%\royal-sword-calculator-updater` and `%LOCALAPPDATA%\pokemon-royal-sword-updater` caches; exact legacy shortcuts, jump list destinations, custom destination lists, and HKCU registration; and only a registered, fully validated default per user program tree resolved from Windows `FOLDERID_UserProgramFiles`, including its published flat and nested upgrade locations. It never deletes `%APPDATA%\KM Calculator`, the `km-calculator-updater` cache, speculative aliases, or a recursive path supplied through the command line or registry.

Burn detects the canonical legacy program folder plus both the product key and Programs and Features key even when registry values are missing or malformed. Any machine wide legacy installation at a custom location, an unknown version, an orphaned canonical folder, or an otherwise incomplete identity blocks setup with instructions to uninstall Royal Sword Calculator or remove an unregistered leftover folder first and rerun. The MSI repeats the canonical folder gate independently, and the launcher applies the same strict rejection rule to an existing custom per user location. This prevents side by side installations without recursively deleting an unproven path or a custom path provided through the registry. The legacy uninstaller may preserve its profile by default, but the next successful first KM Companion installation removes that remaining invoking user data.

## electron-updater compatibility

The public launcher recognizes the existing Electron contract:

- `--updated` maps existing KM upgrades to Burn `/passive` and `KMUpdaterInvocation=1`; upgrades driven by the updater never authorize new Royal Sword removal. The initial migration from legacy NSIS to KM is relocated out of the legacy updater cache and converted to the fully disclosed interactive Install page, so only the user's Install action authorizes cleanup.
- `--force-run` with `--updated` requests a relaunch after updating.
- `/S` provided by the updater does not hide explicitly requested update progress; standalone `/S` maps to `/quiet`.
- `/D=...` and `--package-file=...` provided by the updater are consumed but never opened or forwarded. Outside an updater invocation they are rejected.
- relaunch occurs only after success and only from the validated 64 bit `HKLM\Software\KM Calculator` marker at the canonical `%ProgramFiles%\KM Companion` path, with the expected version, executable metadata, a directory chain without reparse points, and `resources\app.asar`.

The custom installer does not produce an NSIS blockmap. `latest.yml` remains the authoritative `electron-updater` metadata and contains the exact asset name, byte size, and base64 SHA-512 digest.
