# Dex data

The National directory and the active ROM hack's facts are separate datasets. `src/js/data/pokedex_catalog.js` contains the complete #0001 through #1025 index, searchable names, genus, generation, and species classification. `src/js/data/pokedex_royal_sword.js` contains Royal Sword's personal records, form records, move compatibility, evolution conditions, move core attributes, and supported Mega descriptors. The catalog never backfills absent profile stats, abilities, or learnsets.

The Royal Sword pack has 1,025 personal records including forms. Of those, 836 form records, representing 712 National numbers, are marked as present by the supplied game data. The pack contains 47,487 learnset records and 646 referenced moves. Presence is a game data flag. It does not establish that a species is catchable or that the encounter guide is exhaustive. Records with zero placeholder stats are unavailable in the browser.

## Sources

National names and descriptive metadata come from [PokéAPI](https://github.com/PokeAPI/pokeapi) revision `17dd3092872cabcb7c008051771d2a2fd8c8c260`. This is the revision already used for the save import name bundle. PokéAPI's BSD 3 Clause notice is retained in [the import notices](../import/THIRD_PARTY_NOTICES.md). Pokémon Showdown's credited name mappings are reused from that generated name bundle. Pokémon game descriptions retain the rights of their respective owners.

Royal Sword records are extracted from the selected mod's files, with missing files resolved from the selected base game's files. Every consumed file has a SHA 256 digest in the generated pack. Original ROM archives and binary game files are not included. The inputs are:

| File | Extracted facts |
| --- | --- |
| `personal/personal_total.bin` | Stats, typing, three ability slots, form indices, presence, gender, breeding, catch rate, growth, friendship, experience, held items, dex numbers, and machine/tutor permission bits |
| `waza_oboe/wazaoboe_total.bin` | Level moves and evolution moves |
| `tamagowaza/tamagowaza_*.bin` | Egg moves, including separate form tables |
| `evolution/evo_*.bin` | Evolution method, argument, target species, target form, and level |
| `waza/waza*.wazabin` | Move type, category, power, accuracy, PP, and priority |

The binary field layout was cross checked against [KM Editor's Sword and Shield readers](https://github.com/KotMatrosk1n/KM-Editor/tree/master/src/KM.Formats/SwSh), [PKHeX's personal record](https://github.com/kwsch/PKHeX/blob/master/PKHeX.Core/PersonalInfo/Info/PersonalInfo8SWSH.cs), and [pkNX's evolution and learnset readers](https://github.com/kwsch/pkNX/tree/master/pkNX.Structures). These projects retain their GPLv3 licenses. The generated pack consists of semantic facts and does not contain their reader implementations.

Royal Sword's modified records can differ from the calculator's existing overlay. The generator does not rewrite calculator generations. Artwork identity follows National species and explicit form mappings; it does not infer a new form name from a matching stat spread.

## Regeneration

The app ships generated data. Running it does not download PokéAPI data or read a user's game files. Maintainers can regenerate from source folders using PowerShell:

```powershell
$env:POKEDEX_MOD_ROOT = 'C:\GameData\Royal Sword'
$env:POKEDEX_BASE_ROOT = 'C:\GameData\Sword'
node scripts/generate-pokedex.mjs
```

Both folders must contain `romfs/bin/pml`. The existing compiled calculator package must also be available in `calc/dist` for supported Mega form identification. The generator reads the mod first and uses the base only when the mod does not supply that file. It checks table sizes, form bounds, level moves, move references, and full National number coverage. Personal height is stored in centimeters and weight in tenths of a kilogram. Egg compatibility follows the form table pointer rather than copying the base form's egg list.

Pinned PokéAPI CSV inputs are downloaded once into a local cache. Set `POKEDEX_SOURCE_CACHE` to choose that cache's location. The checked in generated files let ordinary builds work without the private game inputs. Reproduction requires the same files identified by the recorded digests. A different mod dump produces different facts and must be reviewed as a data update.

## Profile integration

Bundled packs are selected by exact `profile.id` from `window.KMPokedexProfiles`. A reviewed generation provider can instead implement `getPokedexData(profile, context)` and return the same data shape. The pack's `profileId` must match the active profile. A missing pack displays an empty profile dataset, preserving the full National index and preventing another hack's facts from appearing.

A pack contains `profileId`, `version`, `entries`, and `moves`. Each entry has a stable `key`, `number`, `form`, `name`, `present`, six `stats` in HP/Attack/Defense/Sp. Atk/Sp. Def/Speed order, `types`, and three `abilities` in 1/2/Hidden order. The remaining personal fields, `moves`, and `evolutions` follow the generated Royal Sword example. `moves` on the pack maps move IDs to core move details. Optional `abilities` maps normalized ability names to descriptions; optional `moveDescriptions` maps move IDs to effect text. Providers must supply their own changed effect descriptions. The bundled Royal Sword pack uses the existing credited Sword/Shield ability text and Showdown move descriptions where custom text is absent.

The active generation provider supplies the type effectiveness table. The active profile supplies the EV policy for stat ranges. Neither lookup mutates the calculator's canonical tables. Encounter locations are indexed from the exact active profile's reference areas, preserving individual methods and weather conditions. A location entry does not change encounter progress or completion rules.

This pack is a reviewed integration format. The direct trainer JSON importer does not install Dex packs. Author submissions remain data proposals under the [mod submission format](mod-submissions.md). Include all ability slots, forms, evolution conditions, move compatibility, locations, changed descriptions, and custom rules so the integrated Dex can represent the hack accurately.

## Mega forms

An optional `battleForms` array declares supported Mega descriptors. Each descriptor identifies a base National `number`, unique `key`, `form`, `formKind: "mega"`, calculator `calcName`, short `buttonLabel`, reference `height`, and official `artworkId`. Royal Sword declares 48 official Mega forms already supported by its calculator. Charizard and Mewtwo declare distinct X and Y variants. Non National calculator species are excluded.

The Dex resolves each descriptor through the active generation provider. Stats, typing, weight, and ability slots come from that resolved form. Shared breeding, training, moves, and encounter facts inherit from the profile's base record. Mega forms use the base evolution family. Missing or zero placeholder base facts remain unknown. Existing usable native Mega records take precedence. Calculator tables and raw game records retain their original values.

Mega records attach beneath their base National species. The directory and result counts enumerate species. Selection updates the whole detail page and persists separately for each profile during the session. An undeclared or unresolved Mega does not appear merely because a canonical generation contains it. Returning to Base restores the existing game record, including Royal Sword's documented replacements.

## Artwork storage and delivery

The public [PokéAPI image repository](https://github.com/PokeAPI/sprites/tree/97a7832d307311c0e1c6ea9035308bf80cc94f81/sprites/pokemon/other/official-artwork) supplies official illustration PNGs. Its repository name includes sprites, but this feature uses its `official-artwork` directory, not pixel sprite files. The source is pinned at revision `97a7832d307311c0e1c6ea9035308bf80cc94f81`.

`src/data/pokedex-artwork.json` records 1,164 species/form mappings, including all 1,025 base National entries and the supported Mega keys, with pinned paths, byte lengths, and Git blob hashes. Alternate form IDs are resolved using PokéAPI metadata revision `17dd3092872cabcb7c008051771d2a2fd8c8c260`, explicit name aliases, and matching National numbers. A missing exact form is never replaced with a different form. Regenerate the inventory with `node scripts/generate-pokedex-artwork.mjs`.

`src/data/pokemon-sprites.json` records the 2,687 existing static PNG and animated GIF files from Pokémon Showdown, with byte lengths and SHA256 digests. Generate a reviewed inventory with `npm run sprites:download` followed by `node scripts/generate-pokemon-sprites.mjs`. These are explicit asset maintenance commands; ordinary development launch and desktop packaging do not download or bundle the sprite collection. Pokémon Showdown serves the public `gen5` and `ani` directories. If an upstream sprite changes, its previous inventory hash is rejected until a reviewed app update supplies the new inventory.

`electron/pokemon-artwork.js` owns the optional complete collection, stored beneath the existing `%APPDATA%\KM Calculator` directory. Illustrations keep the compatible `pokedex-artwork/<Git blob hash>.png` location, so previously cached pictures remain reusable. Sprites use `pokemon-artwork/<SHA256>.png` or `.gif`. `artwork-settings.json` records the first launch choice and display preference. Filenames identify content rather than app versions; changed inventories reuse matching files. Existing bundled sprites can also be copied into this cache after verification when available. Artwork download, check, and display actions do not delete completed content files.

The current inventory resolves 1,164 illustration mappings to 1,154 distinct files, totaling 150,403,999 bytes, plus 2,687 sprite files totaling 112,500,613 bytes. The combined optional collection uses about 251 MiB. The sprite inventory adds about 361 KiB of JSON while removing about 107 MiB of image resources from the installed application payload. Installer compression determines the final download size.

At first launch a prompt offers Download artwork or No thanks. Declining persists across app starts and versions and disables pictures. Settings → Artwork can download, check, pause, or change visibility later. Check verifies the local files against the shipped app inventory without fetching images. Download verifies existing files, fetches only missing or damaged content with six workers, and records progress from checked files and bytes. Repeated failures stop the batch. Interrupted downloads retain complete files; another explicit download resumes the missing work. App starts and image viewing do not fetch artwork automatically.

Downloads are limited to their recorded length and 4 MiB. Illustrations require valid PNG headers, bounded dimensions and their Git blob digest. Sprites require PNG/GIF headers and their SHA256 digest. Files are written through temporary files and renamed after verification, with bounded retries for transient Windows file locks. Failed or mismatched content never replaces a cached image. Image routes only serve checked inventory entries, return no picture when disabled, and never fetch a missing file. Origin checked main frame IPC exposes bounded artwork actions without accepting a path or URL. The network policy admits only exact inventory URLs while an authorized download is active.

Updates, repairs, and installation over an existing copy preserve the collection. A successful uninstall removes only the current Windows account's `pokedex-artwork` and `pokemon-artwork` directories. Teams, run progress, notes, settings, artwork preferences, backups, and updater caches remain in place. The cached setup interface performs cleanup after the app package and overall uninstall succeed; related bundle removals during upgrades, failed or cancelled transactions, and maintenance operations preserve artwork. Removal uses the existing handle based filesystem helper and rejects reparse points rather than following them. A cleanup failure is reported without claiming that the artwork was removed. Artwork does not live beneath Program Files, the installed resources folder, a temporary directory, or updater download caches. Installer payload validation no longer requires bundled sprites; historical Royal Sword installer identification still requires its original sprite evidence where applicable. Uninstalling, manually removing app data, or changing Windows accounts requires another download. Run backup and restore do not include or remove the artwork collection.

When artwork is enabled, a visible Dex reads the selected illustration from the local collection. Selection changes discard stale image events, errors link to Artwork settings, and pictures preserve their proportions within a maximum 220 pixel area, reduced at smaller usable sizes. When pictures are disabled, the portrait area collapses and data cards use the available space. Small directory and evolution icons use the optional static sprite collection. The interface has no model viewer, rendering library, decoder, animation controls, or 3D model downloads. The dependency graph remains unchanged from the base revision.

The public repository's CC0 notice and its explicit Pokémon copyright statement are retained in [PokeAPI Artwork](../LICENSES/PokeAPI-Artwork.txt), which ships with the app's notices. Public availability is not a grant of additional rights to Pokémon characters or artwork. See [Credits](../CREDITS.md) and [Licensing](../LICENSING.md).
