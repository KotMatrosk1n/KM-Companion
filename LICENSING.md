# Licensing and distribution

KM Companion as a combined application is licensed under the GNU General Public
License, version 3 only (`GPL-3.0-only`). Copyright (c) 2026 Matroskin.
You may use, study, modify, and redistribute it under [LICENSE](LICENSE).
It is provided without warranty, including any implied warranty of merchantability
or fitness for a particular purpose.

This licensing change was made on 2026-10-20. It preserves save importing and does
not add a separate importer, network service, or additional installation step.

## Scope and retained licenses

The root license covers the combined calculator and original project source and
documentation unless a file or component specifies different terms. Existing
copyright and license notices must be retained:

| Component | Terms and boundary |
| --- | --- |
| Original MIT calculator lineage | [Original MIT notice](LICENSES/MIT-legacy.txt), including Honko, contributors, and Matroskin. Earlier MIT grants are not revoked. |
| Standalone calculation engine in `calc/` | [MIT](calc/LICENSE), including its local extensions. It can be included in the GPLv3 application. |
| Import data generation tools in `import/` | [MIT](import/LICENSE). Generated third party data retains the notices in [import/THIRD_PARTY_NOTICES.md](import/THIRD_PARTY_NOTICES.md). |
| Save importer in `src/js/save_import.js` | GPLv3, including the 127 byte Switch XOR constant from the pinned PKHeX source. The PKHeX executable and libraries are not bundled. |
| Separate Windows installer in `installer/windows/` | [MIT](installer/windows/LICENSE) for original installer code. WiX components retain [MS-RL](LICENSES/WiX-MS-RL.txt); .NET and its dependencies retain their notices. |
| Other third party code | Its original license, preserved file headers, [CREDITS.md](CREDITS.md), and [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). |
| Game text, portraits, sprites, trademarks, and other artwork | Excluded from the software license. Their rights remain with their respective holders; GPLv3 supplies no additional asset permissions. |
| Official Dex illustrations | Public PokéAPI artwork retains its source notice in `LICENSES/PokeAPI-Artwork.txt`. Pokémon artwork remains excluded from the software license, with rights retained by its respective owners. |

The app and installer are separate programs: the installer copies and launches
the app payload; the calculator does not link to WiX or its bootstrapper API.
MS-RL is [not compatible with GPL](https://www.gnu.org/licenses/license-list.html#ms-rl).
It must remain on the installer side of this boundary, as an
[aggregate](https://www.gnu.org/licenses/gpl-faq.html#MereAggregation), and must
not be copied into GPL covered application code. The WiX v7 build package
[OSMF terms](https://wixtoolset.org/osmf/) remain a separate build tool obligation.

## Compatibility review

The committed npm lockfiles and installed license texts were reviewed on
2026-10-20. The inventory includes development tools as well as runtime packages;
it is not a claim that every listed package ships in the application.

- Runtime npm dependencies use MIT, ISC, or BlueOak-1.0.0. The
  [Blue Oak Council's compatibility guidance](https://blueoakcouncil.org/license-faq)
  covers combination with GPLv3. `lazy-val` 1.0.5 declares MIT in its package
  metadata but supplies no separate license file; that declaration and the MIT
  text are retained in [LICENSES/lazy-val-MIT.txt](LICENSES/lazy-val-MIT.txt).
- The other declared npm licenses are BSD-2-Clause, BSD-3-Clause, Apache-2.0,
  0BSD, CC0-1.0, Python-2.0, and WTFPL (some offered as alternatives).
  The [GNU license list](https://www.gnu.org/licenses/license-list.html)
  documents compatibility for these license families. The MIT/ISC alternatives
  may be used where offered.
- Bundled jQuery, normalize.css, and CSS derived from Bootstrap retain MIT terms.
  Select2 3.4.5 offers Apache-2.0 or GPL-2.0-only. This distribution explicitly
  uses its **Apache-2.0 option**, which is compatible with GPLv3.
- PokéAPI's BSD-3-Clause data and Pokémon Showdown's MIT data retain their
  notices. No AGPL implementation or GPLv2 only dependency is introduced.
- Electron is an unmodified, general purpose runtime. Its MIT license and
  `LICENSES.chromium.html` must ship with it; the npm MIT declaration does not
  replace Chromium's component notices.

Changing a dependency, copying code across the installer boundary, or adding
third party data requires checking those terms again.

## Binary releases and matching source

For each distributed version, provide its matching source alongside the binary,
at no additional charge and without an account requirement. The release workflow
creates and uploads `KM-Companion-Source-<version>.zip` from the same clean,
tagged commit as the installer. It includes tracked source, license notices,
lockfiles, and build scripts. `KM-Companion-Dependencies-<version>.tar.gz`
contains integrity checked production npm packages, pinned preferred TypeScript
sources for compiled packages, and the unminified jQuery, Sizzle, and Select2
sources. It also contains the unmodified WiX
source archive for the version embedded in the separate installer, satisfying
its source availability requirement. Revisions, hashes, and download locations
are recorded in `KM-Companion-Source-<version>.json`.

The source packaging command is `npm run release:source`. It rejects a dirty
checkout, mismatched version tag, missing required source files, and mismatched
WiX package versions. Run it before building the release. Do not distribute a
modified local build with an archive from an older commit: commit the actual
sources and create matching source artifacts first.

To rebuild the calculator, use Node.js 24 and `npm ci`, then `npm run build`.
Generated lookup data is checked in.
`npm run electron:pack` adds the Electron runtime. Pokémon illustrations and
sprites are an optional download; their inventories and notices ship with the
app. The package copies the GPL text, retained licenses, credits, import
notices, and production npm license texts into `dist/licenses/` inside the app
and the installed `resources/licenses/` directory for direct offline access.
Electron's own license files remain alongside the executable.

The Windows setup additionally requires Windows, .NET SDK 8, and the pinned WiX
toolchain. See [installer/windows/README.md](installer/windows/README.md).
Signing credentials are not needed to modify or run the app or build a local
unsigned installer. They are required only by this project's official signed
release pipeline. No private signing key is part of Corresponding Source.

The source manifest records exact npm versions, registry tarball locations and
integrities, repository locations, and Electron's matching source release.
`scripts/release-sources.json` pins the additional source archives and hashes;
update and review it when changing the corresponding dependencies. The .NET
notices in `LICENSES/` come from the 8.0.28 runtime and desktop runtime packages;
refresh them when updating the installer's runtime.
Unmodified general purpose build tools and runtimes are obtained separately.
When distributing changes to dependencies, include their preferred source and
build instructions too; the upstream links alone do not cover local changes.
Keep the source artifacts available for as long as their binaries are offered,
and retain complete notices when mirroring either.
