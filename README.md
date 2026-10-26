# KM Companion

<img src="src/img/km-companion-icon.png" alt="KM Companion field guide icon" width="96" height="96" />

[![Latest release](https://img.shields.io/github/v/release/KotMatrosk1n/KM-Companion?label=release)](https://github.com/KotMatrosk1n/KM-Companion/releases/latest)
![Platform](https://img.shields.io/badge/platform-Windows%20x64-0078D6)
![Built with](https://img.shields.io/badge/built%20with-Electron%2042-47848F)
![Calculation engine](https://img.shields.io/badge/calculation%20engine-Generations%201--9-red)
![Bundled profile](https://img.shields.io/badge/bundled%20profile-Royal%20Sword-blue)
[![License](https://img.shields.io/badge/license-GPLv3-lightgrey)](LICENSE)

Plan battles, manage your team, and keep track of your run. KM Companion brings damage calculations, a ROM hack Dex, encounter tracking, trainer references, item progress, and player notes together in a Windows desktop app for Pokémon ROM hacks.

Previously named KM Calculator, it keeps existing saved teams, notes, settings, run progress, and compatible backups available under the new name.

Pokémon Royal Sword is the first bundled profile. Support for each hack belongs to its own profile, so its Pokémon, moves, abilities, mechanics, and run tools can reflect the game you are playing.

[Download the latest release](https://github.com/KotMatrosk1n/KM-Companion/releases/latest) | [Explore the workspace](docs/app-workspace.md) | [Add support for a ROM hack](docs/rom-hack-profiles.md) | [Report an issue](https://github.com/KotMatrosk1n/KM-Companion/issues/new/choose)

## Plan Your Battles

Compare damage rolls, check what your Pokémon can survive, and explore different moves, items, abilities, and spreads. Singles and Doubles share the same team controls, with battlefield settings and Pokémon details available beside the calculation.

The calculation engine covers Generations 1 through 9. Each profile selects its base generation and applies that hack's changes. Royal Sword uses Generation 8, its own calculator layout and trainer data, and a Sword/Shield battle simulator. EV input is disabled for Royal Sword; another profile can use the controls appropriate to its own game.

Keep your current team beside the calculation. Team keeps all six Pokémon in one row with animated sprites and names. Box, Box 2, Compost, and Trash use compact static sprites with color coding and names available on hover. When pictures are disabled or unavailable, storage and Pokémon selection buttons show names instead. Storage capacity adapts to the available space, with at least 30 entries per Royal Sword page and more when the window allows.

## Explore Your Dex

The **Dex** tab sits between Calculator and Encounters. Search by Pokémon name, form, or National Dex number and browse all 1,025 National entries in order. Detailed pages show the selected ROM hack's base stats, ability slots 1/2/Hidden, move compatibility, evolution rules, breeding and training facts, type defenses, and recorded encounter locations.

Mega forms open through **Mega**, **Mega X**, or **Mega Y** buttons on their base species page. **Base** restores the profile's base form, while the directory keeps one entry per National number.

View official Pokémon illustrations from the public PokéAPI image repository beside compact stat and ability cards. Pictures and sprites are an optional download managed in Settings → Artwork and stay available offline across app updates. The layout adapts to the available width, height, and scaling; missing artwork or ROM hack data is identified explicitly. See the [Dex guide](docs/pokedex.md) for coverage and controls.

## Keep Track Of Your Run

Royal Sword includes separate Encounters, Trainers, and Route Items sections. Browse encounters by location, method, and weather; use Normal, Royalocke, or Nuzlocke tracking; inspect trainer teams; and mark defeated trainers and collected items. Each encounter mode keeps its own progress, and the rules remain available beside the tracking controls.

Player Notes and trainer notes keep your plans with the run. **Settings** includes **Back Up Run**, **Restore Run**, and **Undo Last Restore**, with backups covering the selected profile's teams, boxes, notes, imported inventory, and recorded progress. **Reset Run** clears encounter, trainer, and item progress after confirmation while retaining teams, boxes, inventory, notes, settings, and other profiles.

Route Items currently uses the Sword/Shield 1.3.2 base game guide, including expansions. It is not a verified Royal Sword placement list. Entries retain their source links, edition limits, and known uncertainties. See the [workspace guide](docs/app-workspace.md) for tracking rules, backup scope, and reference coverage.

## Getting Started

Windows packages are distributed through [Releases](https://github.com/KotMatrosk1n/KM-Companion/releases/latest). If no package is listed yet, or you want to work on the app, follow [Building From Source](#building-from-source).

1. Download and run the Windows x64 setup, then open KM Companion.
2. At **Which ROM Hack are you playing?**, choose **Pokémon Royal Sword** or another installed profile.
3. Use **Import / Export** to load a compatible save, import community trainer data, or move sets into Team/Box.
4. Select the trainer or Pokémon sets you want to compare and configure the battlefield.
5. Open the available reference sections to record encounters, trainer progress, and item pickups.
6. Use **Change ROM Hack** to return to the chooser without restarting the app.

The app asks you to select a profile on every launch. Switching profiles reloads its data and controls while keeping saved runs separate.

Windows releases are unsigned, so Windows may identify the publisher as unknown. Use the setup attached to this repository's release. Version 0.0.1 starts the public version sequence; users of the earlier 0.4.x development builds should follow the [development build transition](installer/windows/README.md#upgrade-and-uninstall-behavior).

KM Companion does not include ROM files, console keys, save files, or private mod data. You are responsible for obtaining and using game data in compliance with applicable law.

Packaged builds do not require Node.js, Git, a web server, or a separate backend. The generated `dist/` directory is the packaged interface, not a separately supported hosted site.

## Supported Coverage

| Area | Current coverage |
| --- | --- |
| Calculation engine | Canonical Pokémon Generations 1 through 9 |
| Bundled ROM hack profile | Pokémon Royal Sword over Generation 8 |
| Profile layouts | Standard calculator layout by default; bundled Royal Sword custom layout |
| Shared profile workflows | Team/Box; Player Notes and Clear Notes; trainer dropdown and team sprites; save import and border controls; enhanced Singles and Doubles |
| Trainer data | Bundled profile packs and attributed `trainer-pack-v1` JSON imports |
| Dex | Full National index; Royal Sword personal data, ability slots, moves, evolution rules, and recorded locations; official illustration artwork |
| Main series save families | R/B/Y; G/S/C; R/S/E and FR/LG; D/P/Pt and HG/SS; B/W and B2/W2; X/Y and OR/AS; S/M and US/UM; LGPE; Sw/Sh; BD/SP; Legends: Arceus; S/V; Legends: Z-A |
| Standalone Pokémon files | `.pk1` through `.pk9`, `.pb7`, `.pb8`, `.pa8`, `.pa9`, and their supported encrypted variants |
| Exclusive profile tools | Royal Sword Sword/Shield battle simulator |

Format family recognition does not make every species or form available in every calculator profile. An import stops before replacing Team/Box data when a supported entry cannot be resolved through the active profile.

Save compatibility depends on the exact regional dump, storage layout, game update, and third party tool involved. Keep a backup of the original save before importing it anywhere.

## Support For ROM Hack Authors

If you are making a ROM hack and need a calculator or companion for your players, [start a discussion](https://github.com/KotMatrosk1n/KM-Companion/discussions). Explain what your game changes and what your players need. Useful support depends on matching the actual Pokémon data and battle mechanics, and on keeping that support accurate as the hack develops.

For a complete profile proposal, use the [mod submission guide](docs/mod-submissions.md), [starter folder](docs/templates/mod-submission/README.md), and [filled example](docs/examples/mod-submission/README.md). The readable YAML or JSON files cover Pokémon, moves, abilities, items, trainers, encounters, item locations, and custom rules, with shared project information, source references, and explicit coverage. Authors can send a draft without a development setup; the optional author checker reports format errors and missing information. Submission files are reviewed for integration and are separate from the app's trainer pack import.

A trainer pack can add selectable trainer teams without editing bundled files. A complete profile can also provide changes to species, forms, stats, types, moves, abilities, items, save rules, and battle behavior. Hacks that share a generation still keep their data and saved runs separate. Imported JSON cannot select or execute a custom layout; that requires reviewed, bundled code.

A trainer pack is a UTF-8 JSON file that identifies its game or mod, base generation, authors, public source, license or redistribution permission, and trainer teams. KM Companion validates the pack before storing it and prevents an imported file from replacing a bundled pack.

| What do you need? | Start here |
| --- | --- |
| Use teams, tracking, notes, and run backups | [App Workspace](docs/app-workspace.md) |
| Submit a complete mod profile | [Mod Submissions](docs/mod-submissions.md) |
| Fill author files or inspect a complete example | [Starter Folder](docs/templates/mod-submission/README.md) and [Filled Example](docs/examples/mod-submission/README.md) |
| Import or author trainer data | [Trainer Data Packs](docs/trainer-data-packs.md) |
| Validate a trainer pack | [Trainer Pack v1 Schema](docs/schemas/trainer-pack-v1.schema.json) |
| Start from a working file | [Example Trainer Pack](docs/examples/trainer-pack.example.json) |
| Add a full calculation overlay | [ROM Hack Profiles](docs/rom-hack-profiles.md) |
| Review the upstream calculation baseline | [Calculation Upstream Notes](calc/UPSTREAM.md) |
| Review project and data acknowledgements | [Credits](CREDITS.md) |

Before bundling another person's data, confirm that redistribution is allowed and preserve the creator names, source, license or permission, and pack version. Trainer packs must not contain ROM data, save files, credentials, private research, or local filesystem paths.

## Updates And Network Use

Save files and trainer pack JSON are read locally. They are not uploaded to a server. Teams, boxes, notes, inventory, and run progress stay in the app's local data. If a save format or modded layout cannot be recognized safely, import stops instead of guessing. Hacks that change the base game's storage layout may need a profile adapter.

The desktop app checks this repository on GitHub for newer releases after launch. A yellow badge appears on Settings in every theme when an update is available. **Settings → Updates** also provides a manual check, release notes, and **Install Update**. Downloads and installation begin after confirmation.

At first launch, **Download artwork** offers the complete collection of Pokémon illustrations and static and animated sprites, about 251 MiB. Choose **No thanks** to use the app without Pokémon pictures. **Settings → Artwork** can download later, check saved files against your app version, repair missing files, pause a download, or hide pictures while keeping them saved. Updates, repairs, and installing over an existing copy retain the collection; later downloads reuse unchanged files. Uninstall removes downloaded illustrations and sprites for the current Windows account while preserving teams, progress, notes, and settings. Installing again after uninstall requires another artwork download.

Update checks contact GitHub. Explicit artwork downloads contact Pokémon Showdown and PokéAPI's public image repository on GitHub. App starts, artwork checks, and image viewing do not download Pokémon images. Save files, trainer packs, calculations, notes, and Team/Box data remain local and are not uploaded by these requests.

## Building From Source

Use these steps to work on the source or create a local desktop build.

Development currently requires:

- Windows 10 or Windows 11 on x64
- Git
- Node.js 24 or a later compatible release
- npm

Windows installer builds also require PowerShell 7 (`pwsh`) and .NET SDK 8 or later. Optional local signing requires Windows SDK `signtool.exe` and a trusted code signing PFX.

Clone the repository and install the locked dependencies:

```powershell
git clone https://github.com/KotMatrosk1n/KM-Companion.git
Set-Location .\KM-Companion

npm ci
```

Start the desktop development build:

```powershell
npm run electron:dev
```

Build the Windows installer:

```powershell
npm run electron:pack
pwsh -NoProfile -File installer/windows/scripts/Build-KmCalculatorWindowsSetup.ps1 -AcceptWixEula
```

The Windows installer uses WiX Toolset v7. WiX requires explicit acceptance of its OSMF EULA; review [the WiX OSMF terms](https://wixtoolset.org/osmf/) before supplying `-AcceptWixEula`. Automated release builds fail closed unless an authorized repository environment sets `WIX_V7_EULA_ACCEPTED=true`.

Published releases are unsigned and do not require certificate secrets. Update downloads use HTTPS and the SHA-512 digest in `latest.yml`; release assets also include `SHA256SUMS.txt`. These checks compare files with the published metadata and do not verify an Authenticode publisher. Optional local signing and its certificate checks remain available through the setup script.

See [Releases](docs/releases.md) for the tag workflow, source archives, and changelog procedure.

The generated Burn setup, `latest.yml`, checksums, smoke test output, and local build logs remain in ignored local paths and are not source files. See [Windows setup documentation](installer/windows/README.md) for the installer identity, signing controls, legacy removal safeguards, and updater argument contract.

Before submitting a change, build the app and check the public source:

```powershell
npm run build
npm run lint
npm run check:workspace
npm run check:third-party-notices
```

The root `package.json` contains the current development, build, and packaging commands.

## Contributing

KM Companion is open source, and focused fixes, compatibility reports, trainer pack contributions, and carefully sourced ROM hack profiles are welcome.

New profile work should keep canonical generation data untouched, be validated locally, and document every bundled data source and author. Found a bug or have a feature request? [Open an issue](https://github.com/KotMatrosk1n/KM-Companion/issues/new/choose).

Read the [Contributing Guide](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) before submitting a change. Direct project contributions are recorded in [Contributors](CONTRIBUTORS.md), while inherited and third party work remains documented in [Credits](CREDITS.md).

Suspected vulnerabilities should be reported privately through the [Security Policy](SECURITY.md), not through a public issue or pull request.

## Third Party Assets And Project Status

KM Companion is built on the Smogon damage calculator and uses data or compatibility references from Pokémon Showdown, PokéAPI, PKHeX, and the projects listed in [Credits](CREDITS.md). The [Dependency Notices](THIRD_PARTY_NOTICES.md) inventory the JavaScript dependency trees and bundled browser libraries; source revision notices for generated save import data are kept separately in [Save Import Third Party Notices](import/THIRD_PARTY_NOTICES.md).

Pokémon sprites are available as an optional app download from Pokémon Showdown's public `gen5` and `ani` directories. The [Pokémon Showdown credits](https://pokemonshowdown.com/credits) document contributing artists and upstream sources. These assets are excluded from KM Companion's software license, and this repository does not grant additional rights to them.

KM Companion is an unofficial fan made project and is not affiliated with or endorsed by Nintendo, Creatures Inc., GAME FREAK inc., The Pokémon Company, or the creators of third party supported ROM hacks. Pokémon names, trademarks, and artwork belong to their respective owners.

KM Companion as a combined application is free software under the [GNU General Public License version 3](LICENSE) (`GPL-3.0-only`), without warranty. Save importing remains built in. The original MIT notices are preserved in [LICENSES/MIT-legacy.txt](LICENSES/MIT-legacy.txt); the engine, import data tools, and separate installer retain their explicitly documented MIT terms.

See [LICENSING.md](LICENSING.md) for license boundaries, dependency compatibility, and binary/source distribution instructions. Third party code, data, references, and assets retain their applicable licenses and rights.
