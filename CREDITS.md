# Credits

KM Companion was created and is maintained by Matroskin as a damage calculator for multiple generations and ROM hack platform.

Repository: <https://github.com/KotMatrosk1n/KM-Companion>

The KM Companion name, desktop integration, ROM hack profile framework, trainer pack framework, and bundled Royal Sword integration are maintained by Matroskin. The field guide icon was created for KM Companion.

## Bundled ROM Hack Profiles

### Pokémon Royal Sword

- Profile, calculation overlay, mechanics integration, and bundled trainer data: Matroskin
- Base calculation generation: Generation 8
- Original bundled profile code and data retain their [MIT notice](LICENSES/MIT-legacy.txt); the combined application is distributed under [GPLv3](LICENSE).

Royal Sword is the first bundled profile. Its data is kept separate from canonical Generation 8 so it does not change standard generation lookups or future ROM hack profiles.

## Damage Calculator Lineage

KM Companion is built on the [Smogon Pokémon damage calculator](https://github.com/smogon/damage-calc), distributed under the MIT License.

- Original calculator: Honko
- Primary upstream maintainers: Austin and jetou
- Generations 1 through 6 implementation: Honko
- Omega Ruby and Alpha Sapphire update: gamut-was-taken and Austin
- Generation 7 update: Austin
- Generation 8 update: Austin and Kris
- Generation 9 update: Austin and Kris
- Pokémon Showdown style CSS: Zarel
- Additional work: the broader [Smogon damage-calc contributor community](https://github.com/smogon/damage-calc/graphs/contributors)

The canonical calculation engine currently tracks the upstream revision documented in [`calc/UPSTREAM.md`](calc/UPSTREAM.md). KM Companion's Royal Sword data overlay and compatibility shims are intentional local extensions.

## Data, Save Format, And Workflow Sources

### Pokémon Showdown

[Pokémon Showdown](https://github.com/smogon/pokemon-showdown), created by Guangcong Luo and maintained by its contributors, is used for permissively licensed name data and as the source of the Pokémon sprite directories downloaded for desktop packaging. Its source code and applicable data are distributed under the MIT License. Sprite artwork and other media remain subject to their own rights; see the [Pokémon Showdown credits](https://pokemonshowdown.com/credits).

Trainer move effect descriptions and accuracy values are adapted from Pokémon Showdown's move data at revision `f0e61e58ad297885578231746036438e1b42f40a`, including Generation 8 overrides. The original MIT notice is included with the bundled reference text. Move type, category, and base power use the active calculator generation, as does accuracy when supplied by its data provider.

### PokéSprite

The item artwork in `src/img/items/` and move category icons in `src/img/move-categories/` come from [PokéSprite](https://github.com/msikma/pokesprite), maintained by Mike Sikma and its [contributors](https://github.com/msikma/pokesprite/blob/master/contributors.md), at revision `c5aaa610ff2acdf7fd8e2dccd181bca8be9fcb3e`. The app uses the Sword/Shield style item outlines and Generation 8 move category icons. PokéSprite's code and metadata use the MIT License; the sprite images are © Nintendo / Creatures Inc. / GAME FREAK inc. and are excluded from KM Companion's software license.

### PokéAPI

[PokéAPI](https://github.com/PokeAPI/pokeapi), by Paul Hallett and PokéAPI contributors, supplies permissively licensed factual game index and growth rate data used by the generated save import lookup bundle. That data is used under the BSD 3-Clause License.

The pinned Pokémon Showdown and PokéAPI revisions and their complete license notices are recorded in [`import/THIRD_PARTY_NOTICES.md`](import/THIRD_PARTY_NOTICES.md).

### PKHeX

[PKHeX](https://github.com/kwsch/PKHeX), by kwsch and contributors, supplies the 127 byte Switch save container XOR constant under GPLv3. The combined calculator adopts GPLv3 while preserving save importing. The precise source revision, adaptation, and license are recorded in [import/THIRD_PARTY_NOTICES.md](import/THIRD_PARTY_NOTICES.md).

PKHeX is also an external compatibility reference for save families and entity layouts. Its application and libraries are not bundled. The surrounding parser remains independently written.

### ForwardFeed Run & Bun Calculator

[ForwardFeed/runbuncalc](https://github.com/ForwardFeed/runbuncalc), distributed under the MIT License, was consulted for Team/Box and related calculator workflow ideas. KM Companion does not ship the Run & Bun AI model or its rules data.

## Bundled Libraries And Build Tools

- [jQuery 1.9.1](https://jquery.com/): jQuery Foundation and contributors, MIT License
- [Select2 3.4.5](https://github.com/select2/select2): Igor Vaynberg and contributors, Apache License 2.0 or GPL-2.0 dual license terms as distributed in the bundled file
- [normalize.css 3.0.2](https://github.com/necolas/normalize.css): Nicolas Gallagher and Jonathan Neal, MIT License; bundled in the legacy stylesheet named `bootstrap.css`
- [Bootstrap](https://github.com/twbs/bootstrap): Twitter and Bootstrap contributors, MIT License; the bundled legacy stylesheet includes component CSS derived from Bootstrap, but its exact upstream release is not recorded
- [Electron](https://github.com/electron/electron): OpenJS Foundation and Electron contributors, MIT License
- [electron-builder](https://github.com/electron-userland/electron-builder) and [electron-updater](https://github.com/electron-userland/electron-builder): Electron Userland contributors, MIT License
- [electron-winstaller](https://github.com/electron/windows-installer): Electron contributors, MIT License
- [.NET](https://github.com/dotnet/runtime) and [Windows Desktop](https://github.com/dotnet/windowsdesktop): Microsoft and contributors, MIT and retained third party notices. The separate installer uses the self contained .NET 8 runtime; the notices in `LICENSES/` are from version 8.0.28.
- [WiX Toolset v7](https://wixtoolset.org/): FireGiant, .NET Foundation, and WiX contributors; the separate installer embeds the Burn engine and uses the bootstrapper API with the project's custom WPF interface. WiX retains the [Microsoft Reciprocal License](LICENSES/WiX-MS-RL.txt), independently of the GPL calculator payload. Obtaining and using v7 build packages is separately subject to the [Open Source Maintenance Fee EULA](https://wixtoolset.org/osmf/). EULA acceptance is an external build environment decision and is not recorded by this repository.
- [TypeScript](https://github.com/microsoft/TypeScript): Microsoft and contributors, Apache License 2.0
- [ESLint](https://github.com/eslint/eslint): JS Foundation and contributors, MIT License
- [`@pkmn/eslint-config`](https://github.com/pkmn/ps): pkmn contributors, MIT License
- [subpkg](https://github.com/scheibo/subpkg): Kirk Scheibelhut, MIT License

The package manifests and lockfiles record the installed dependency versions and transitive package graph. See [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md) for the generated dependency license inventory; each distributed dependency remains subject to its own license and notice requirements.

## Pokémon And Third Party Assets

Trainer ability and held item descriptions use the official English Pokémon Sword and Shield game text. Game text and artwork remain the property of their respective rights holders.

The trainer portraits in `src/img/trainers/` are rendered from Pokémon Sword and Shield character models and poses. Model and texture reading uses [KM Editor](https://github.com/KotMatrosk1n/KM-Editor), and the portraits are rendered with [Blender](https://www.blender.org/). These rendered game assets are excluded from KM Companion's software license; their character designs, models, and textures remain the property of their respective rights holders.

Pokémon names, character names, game titles, trademarks, and artwork are owned by their respective rights holders. KM Companion is an unofficial fan made tool and is not affiliated with or endorsed by Nintendo, Creatures Inc., GAME FREAK inc., The Pokémon Company, or the creators of third party supported ROM hacks.

The combined application uses [GPLv3](LICENSE), with the original [MIT attribution](LICENSES/MIT-legacy.txt) preserved. Separately licensed components, generated data, external references, and artwork retain their licenses and applicable rights. See [LICENSING.md](LICENSING.md).
