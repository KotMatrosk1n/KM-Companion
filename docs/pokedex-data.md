# Dex data

The National directory and the active ROM hack's facts are separate datasets. `src/js/data/pokedex_catalog.js` contains the complete #0001 through #1025 index, searchable names, genus, generation, and species classification. `src/js/data/pokedex_royal_sword.js` contains Royal Sword's personal records, form records, move compatibility, evolution conditions, move core attributes, and supported Mega descriptors. The catalog never backfills absent profile stats, abilities, or learnsets.

The Royal Sword pack has 1,266 Pokémon and form records. The game marks 1,079 of those records present, representing 841 National numbers. The pack has 62,442 learnset rows, including 21,501 level and evolution move records, and 826 move records. It also includes 17 added ability names and 43 item names that differ from base Sword. Presence is a game data flag. Catchable locations come from the encounter guide. Records with zero placeholder stats show as unavailable.

## Sources

National names and descriptive metadata come from [PokéAPI](https://github.com/PokeAPI/pokeapi) revision `17dd3092872cabcb7c008051771d2a2fd8c8c260`. This is the revision already used for the save import name bundle. PokéAPI's BSD 3 Clause notice is retained in [the import notices](../import/THIRD_PARTY_NOTICES.md). Pokémon Showdown's credited name mappings are reused from that generated name bundle. Pokémon game descriptions retain the rights of their respective owners.

Royal Sword records use the effective mod data with fallbacks from the selected base game. The current level up and evolution tables use KM Editor's Pokémon export. They are identified by a SHA 256 digest of the mapped export records. The pack retains its original input digests for the other data. Original ROM archives and binary game files are not included. The inputs are:

| File | Extracted facts |
| --- | --- |
| `personal/personal_total.bin` | Stats, typing, three ability slots, form indices, presence, gender, breeding, catch rate, growth, friendship, experience, held items, dex numbers, and machine/tutor permission bits |
| `waza_oboe/wazaoboe_total.bin` | Level moves and evolution moves |
| `tamagowaza/tamagowaza_*.bin` | Egg moves, including separate form tables |
| `evolution/evo_*.bin` | Evolution method, argument, target species, target form, and level |
| `waza/waza*.wazabin` | Move type, category, power, accuracy, PP, priority, and changed secondary effect chances |
| `item/item.dat` | Move assignments for TM and TR slots |
| English name tables | Species, ability, move, and item IDs and names |

The binary field layout was cross checked against [KM Editor's Sword and Shield readers](https://github.com/KotMatrosk1n/KM-Editor/tree/master/src/KM.Formats/SwSh), [PKHeX's personal record](https://github.com/kwsch/PKHeX/blob/master/PKHeX.Core/PersonalInfo/Info/PersonalInfo8SWSH.cs), and [pkNX's evolution and learnset readers](https://github.com/kwsch/pkNX/tree/master/pkNX.Structures). These projects retain their GPLv3 licenses. The generated pack consists of semantic facts and does not contain their reader implementations.

The generator writes both the Dex records and the Generation 8 Royal Sword calculator overlay. Both use the same personal data and move values. The calculator retains the standard damage model where the mod follows it. Royal Sword also calculates Dragonize, Aura Guard, contact damage through protection for Piercing Drill, the Ground immunity from Eelevate, and Mega Sol's effect on move damage. Fire Mane's exact power multiplier and the automatic knockout boost from Eelevate need battle validation. The battle simulator uses the refreshed move data alongside its existing Sword and Shield behavior model.

## Regeneration

The app ships generated data. Running it does not download PokéAPI data or read a user's game files. Maintainers can regenerate from source folders using PowerShell:

```powershell
$env:POKEDEX_MOD_ROOT = 'C:\GameData\Royal Sword'
$env:POKEDEX_BASE_ROOT = 'C:\GameData\Sword'
node scripts/generate-pokedex.mjs
```

Both folders must contain `romfs/bin/pml` and the English name tables. The generator reads the mod first and uses the base for missing files that retain their original identity. It checks table sizes, form bounds, level moves, move references, present personal rows, and full National number coverage. Personal height is stored in centimeters and weight in tenths of a kilogram. Egg compatibility follows the form's game tables. Review `scripts/royal-sword-identities.json` against the selected mod when its personal row layout or Mega assignments change.

For a progression refresh, export Pokémon, Items, Shops, Placement, and Trainers as JSON from KM Editor with Royal Sword as the active project. Read installed story limits in Royal Candy and encounter caps in Catch Cap. Match learnsets to the personal record through the reviewed species and form indices. Keep every move slot in order and every evolution method, argument, level, and exact target. Verify all shop inventory tiers and match pickup directions by placement ID before changing Route Items. Keep the battle planning caps separate from the encounter caps.

Pinned PokéAPI CSV inputs are downloaded once into a local cache. Set `POKEDEX_SOURCE_CACHE` to choose that cache's location. The checked in generated files let ordinary builds work without the private game inputs. Reproduction requires the same files identified by the recorded digests. A different mod dump produces different facts and must be reviewed as a data update.

## Profile integration

Bundled packs are selected by exact `profile.id` from `window.KMPokedexProfiles`. A reviewed generation provider can instead implement `getPokedexData(profile, context)` and return the same data shape. The pack's `profileId` must match the active profile. A missing pack displays an empty profile dataset, preserving the full National index and preventing another hack's facts from appearing.

A pack contains `profileId`, `version`, `entries`, and `moves`. Each entry has a stable `key`, `number`, `form`, `name`, `present`, six `stats` in HP/Attack/Defense/Sp. Atk/Sp. Def/Speed order, `types`, and three `abilities` in 1/2/Hidden order. The remaining personal fields, `moves`, and `evolutions` follow the generated Royal Sword example. `moves` on the pack maps move IDs to core move details. Optional `abilities` maps normalized ability names to descriptions, and optional `moveDescriptions` maps move IDs to effect text. Providers can supply changed effect descriptions. The Royal Sword Dex and Trainer tooltips use these overrides first. Their shared reference adapts the credited Generation 8 Pokémon Showdown data and covers all 826 Royal Sword move records.

An item evolution can declare `minimumLevel` when using the item also requires reaching a level. The Dex shows both requirements on that branch.

The active generation provider supplies the type effectiveness table. The active profile supplies the EV policy for stat ranges. Neither lookup mutates the calculator's canonical tables. Encounter locations are indexed from the exact active profile's reference areas, preserving individual methods and weather conditions. A location entry does not change encounter progress or completion rules.

Royal Sword's wild encounter tables come from KM Editor's export of the effective Sword encounter archive. Each table retains its source identity, slot order, National species and form IDs, levels, and weights. Wild Area weather includes a separate Normal table. Hidden and visible pools keep their own levels. Visible pool locations follow the corresponding map placements. Outside the Wild Area, the guide lists the regular tables by encounter method and subarea. When game weights total a value other than 100, displayed odds are each slot's share of the listed weights. The Dex also lists catch badge requirements for static spawns. Trainer entries follow matched game parties, and Route Items keeps the guide directions and pickup identifiers for matched objects. Scripted parties and encounters require a verified link from the story event to its game record.

This pack is a reviewed integration format. The direct trainer JSON importer does not install Dex packs. Author submissions remain data proposals under the [mod submission format](mod-submissions.md). Include all ability slots, forms, evolution conditions, move compatibility, locations, changed descriptions, and custom rules so the integrated Dex can represent the hack accurately.

## Mega forms

Royal Sword includes 91 Mega records from the game's native form tables. A Mega record carries its numeric form, `formKind: "mega"`, `baseKey`, and `buttonLabel`. These records include the X, Y, and Z variants supplied by the mod, both Meowstic Mega forms, both Magearna Mega forms, and Mega Baxcalibur. The game form supplies stats, typing, dimensions, and abilities. The reviewed identity mapping connects Mega forms to their stones, including Baxcalibrite.

Other profiles can supply an optional `battleForms` array. Each descriptor identifies a base National `number`, unique `key`, `form`, `formKind: "mega"`, calculator `calcName`, `buttonLabel`, `height`, and `artworkId`. The Dex resolves that descriptor through the active generation provider and uses the profile's base record for shared facts. A native record takes precedence when supplied. Mega forms use the base evolution family.

Mega records attach beneath their base National species. The directory and result counts enumerate species. Selection updates the whole detail page and persists separately for each profile during the session. An undeclared or unresolved Mega does not appear merely because a canonical generation contains it. Returning to Base restores the existing game record, including Royal Sword's documented replacements.

## Artwork storage and delivery

The public [PokéAPI image repository](https://github.com/PokeAPI/sprites/tree/97a7832d307311c0e1c6ea9035308bf80cc94f81/sprites/pokemon/other/official-artwork) supplies official illustration PNGs from its `official-artwork` directory. The source is pinned at revision `97a7832d307311c0e1c6ea9035308bf80cc94f81`.

`src/data/pokedex-artwork.json` records 1,230 species and form mappings, including all 1,025 base National entries and all 91 native Mega forms, with pinned paths, byte lengths, and Git blob hashes. Alternate form IDs are resolved using PokéAPI metadata revision `17dd3092872cabcb7c008051771d2a2fd8c8c260`, explicit name aliases, and matching National numbers. Regenerate the inventory with `node scripts/generate-pokedex-artwork.mjs`.

`src/data/pokemon-sprites.json` records 2,809 sprites with byte lengths and SHA256 digests. Pokémon Showdown supplies static PNGs and animated GIFs from `gen5`, `ani`, and `gen5ani`. At the pinned PokéAPI revision, [Legends: Z-A](https://github.com/PokeAPI/sprites/tree/97a7832d307311c0e1c6ea9035308bf80cc94f81/sprites/pokemon/versions/generation-ix/legends-za) supplies menu icons and animated WebP sprites, and [Scarlet and Violet](https://github.com/PokeAPI/sprites/tree/97a7832d307311c0e1c6ea9035308bf80cc94f81/sprites/pokemon/versions/generation-ix/scarlet-violet) supplies animated WebP sprites. Generate a reviewed inventory with `npm run sprites:download` followed by `node scripts/generate-pokemon-sprites.mjs`. The inventory generator preserves reviewed alternate sources when the main Showdown directories lack a matching sprite. These are explicit asset maintenance commands. Ordinary development launch and desktop packaging do not download or bundle the sprite collection. If an upstream sprite changes, its previous inventory hash is rejected until a reviewed app update supplies the new inventory.

`src/js/pokemon_sprites.js` resolves display names and calculator identities to the same sprite filenames for the app and collection generator. It preserves gender symbols, accents, and form boundaries, including names whose Dex spelling differs from the calculator. Reviewed aliases cover forms with a shared appearance or a different asset name. Collection maintenance includes every National species, profile form, Mega form, calculator species, and trainer override. `npm run check:sprites` checks their mappings against the inventory, and ordinary builds run the same check before copying runtime files. Missing mappings stop the build.

Totem forms can retain a dedicated animation while using their matching ordinary appearance for static pictures. All 91 native Royal Sword Mega forms and all 129 species added to the Royal Sword roster have static and animated sprites. Storage uses the static sprites, and team displays prefer animated sprites where available. The build also checks that each PokéAPI sprite matches the form ID used by its Dex illustration.

`electron/pokemon-artwork.js` owns the optional complete collection, stored beneath the existing `%APPDATA%\KM Calculator` directory. Illustrations keep the compatible `pokedex-artwork/<Git blob hash>.png` location, so previously cached pictures remain reusable. Sprites use `pokemon-artwork/<SHA256>` with a `.png`, `.gif`, or `.webp` extension. `artwork-settings.json` records the first launch choice and display preference. Filenames identify content rather than app versions. Changed inventories reuse matching files. Existing bundled sprites can also be copied into this cache after verification when available. Artwork download, check, and display actions do not delete completed content files.

The artwork and sprites download separately from the app. The JSON inventories ship with the app, and downloaded images remain in the user's app data folder.

At first launch a prompt offers Download artwork or No thanks. Declining persists across app starts and versions and disables pictures. Settings → Artwork can download, check, pause, or change visibility later. Check verifies the local files against the shipped app inventory without fetching images. Download verifies existing files, fetches only missing or damaged content with six workers, and records progress from checked files and bytes. Repeated failures stop the batch. Interrupted downloads retain complete files; another explicit download resumes the missing work. App starts and image viewing do not fetch artwork automatically.

Downloads are limited to their recorded length, with a maximum of 16 MiB for animated WebP sprites and 4 MiB for other images. Illustrations require valid PNG headers, bounded dimensions and their Git blob digest. Sprites require the correct image header and their SHA256 digest. Files are written through temporary files and renamed after verification, with bounded retries for transient Windows file locks. Failed or mismatched content never replaces a cached image. Image routes only serve checked inventory entries, return no picture when disabled, and never fetch a missing file. Origin checked main frame IPC exposes bounded artwork actions without accepting a path or URL. The network policy admits only exact inventory URLs while an authorized download is active.

Updates, repairs, and installation over an existing copy preserve the collection. A successful uninstall removes only the current Windows account's `pokedex-artwork` and `pokemon-artwork` directories. Teams, run progress, notes, settings, artwork preferences, backups, and updater caches remain in place. The cached setup interface performs cleanup after the app package and overall uninstall succeed; related bundle removals during upgrades, failed or cancelled transactions, and maintenance operations preserve artwork. Removal uses the existing handle based filesystem helper and rejects reparse points rather than following them. A cleanup failure is reported without claiming that the artwork was removed. Artwork does not live beneath Program Files, the installed resources folder, a temporary directory, or updater download caches. Installer payload validation no longer requires bundled sprites; historical Royal Sword installer identification still requires its original sprite evidence where applicable. Uninstalling, manually removing app data, or changing Windows accounts requires another download. Run backup and restore do not include or remove the artwork collection.

When artwork is enabled, a visible Dex reads the selected illustration from the local collection. Selection changes discard stale image events, errors link to Artwork settings, and pictures preserve their proportions within a maximum 220 pixel area, reduced at smaller usable sizes. When pictures are disabled, the portrait area collapses and data cards use the available space. Small directory and evolution icons use the optional static sprite collection. The interface has no model viewer, rendering library, decoder, animation controls, or 3D model downloads. The dependency graph remains unchanged from the base revision.

The public repository's CC0 notice and its explicit Pokémon copyright statement are retained in [PokeAPI Artwork](../LICENSES/PokeAPI-Artwork.txt), which ships with the app's notices. Public availability is not a grant of additional rights to Pokémon characters or artwork. See [Credits](../CREDITS.md) and [Licensing](../LICENSING.md).
