# Trainer Data Packs

KM Companion trainer packs let mod authors and community maintainers distribute trainer teams without editing the calculator's bundled data file.

For a complete mod proposal, use [Mod Submissions](mod-submissions.md). That format also captures Pokémon changes, moves, abilities, items, encounters, item locations, and rules. Its `trainers.yaml` file is review material and cannot be selected in Import Trainer Data. The JSON format described here remains the app's direct trainer import contract. Resolve custom references, profile support, and any submission values beyond this contract before preparing an importable pack.

## Format

A pack is a UTF-8 JSON file that follows `docs/schemas/trainer-pack-v1.schema.json`. Start with `docs/examples/trainer-pack.example.json`.

Every pack declares:

- the schema and schema version
- a stable pack ID and version
- one generation or a list of supported generations
- the mod, game, or project represented by the data
- credited authors
- a public source URL
- the license or permission governing redistribution
- one or more trainer records and their Pokemon

`profileId` is optional and defaults to the pack ID. IDs are normalized to lowercase values with words separated by hyphens. The profile's declared `trainerData.packId` selects its primary pack, while another imported pack with the same `profileId` can supplement that profile without replacing its bundled data.

KM Companion requires attribution fields so a trainer pack cannot silently separate community data from its creators and source project.

Trainer and Pokemon records may target legacy or modern games. A trainer's generations must be a nonempty subset of its pack's generations. Double teams require Generation 3 or later. Teams contain at most six Pokemon. Optional `slot` values must be present for the complete team, unique, and form the sequence from 1 through the team size; KM Companion sorts that sequence before displaying it. Stat maps accept either calculator keys (`at`, `df`, `sl`, `sa`, `sd`, `sp`) or common keys (`atk`, `def`, `spc`, `spa`, `spd`, `spe`). Use DVs for Generations 1 and 2 and IVs for Generations 3 through 9.

A standalone imported mod pack should declare one base generation. KM Companion then creates a selectable ROM hack tile for it, locks the active profile to that generation, and layers the pack's trainers over the canonical data. The generated profile uses the standard `base` layout, the generation's normal EV rules, and the shared Team/Box, Player Notes and Clear Notes, trainer dropdown and team sprites, save import and border controls, and enhanced Singles and Doubles workflows. A pack whose `profileId` matches an already installed profile can supplement that profile instead of creating another tile.

Trainer packs are declarative data. The JSON format cannot choose, register, or execute a custom layout, and adding a layout property does not grant that authority. A mod that needs a custom interface requires a reviewed bundled profile and registered layout provider in KM Companion source code.

## Importing A Pack

1. Open **Import / Export**.
2. Choose **Import Trainer Data**.
3. Select the pack JSON file.
4. Review the pack name, version, author, source, and imported trainer count shown by the calculator.

KM Companion validates the pack structure, generation boundaries, battle type, slots, and referenced species, forms, moves, abilities, items, and types before storing it. Imported packs are saved in the desktop app's local storage and filtered to their declared generation. Importing the same pack ID again replaces that imported version and refreshes an owned generated tile. Bundled packs and profiles cannot be overwritten by an imported file.

Use **Remove Imported Trainer Data** to clear community packs without changing the bundled data.

## Preparing Data For Bundling

Import the pack locally first and verify every trainer in each declared generation. Species, forms, moves, abilities, items, levels, IVs, DVs, EVs, battle types, and generation boundaries should match the source mod.

Before bundling another project's data in KM Companion, confirm that its author and redistribution terms allow inclusion. Keep the author names, source URL, license or permission statement, and pack version intact. Add the project to the public credits when the pack becomes part of a release.

Do not include ROM data, save files, private research, local paths, credentials, or copied proprietary assets in a trainer pack.
