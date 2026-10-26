# Submit A ROM Hack

Use this format to send the information needed for a KM Companion profile: Pokémon, moves, abilities, items, trainers, encounters, item locations, and custom rules. Describe the exact version of your mod and the base game it extends. You can submit a draft when some information is still unavailable.

Start with the [starter folder](templates/mod-submission/README.md). The [filled example](examples/mod-submission/README.md) shows a fictional mod with linked records in every category. You do not need to write code or install development tools to fill the files.

This is a submission for review. KM Companion does not import this folder or its ZIP through Import Trainer Data. A complete profile still needs integration and verification. The existing [trainer pack JSON](trainer-data-packs.md) remains the direct import format for trainer teams that use an installed profile or canonical generation.

The app's [Dex](pokedex.md) uses the integrated profile data. Include every ability slot, form, evolution condition, move compatibility method, and changed effect description, even when several slots share a value. Supply encounter locations and custom rules as well. List permitted custom illustration links under `extra.artwork`, with creator, permission, and exact species and form. These are references for review, not automatic downloads. The [Dex integration guide](pokedex-data.md) explains how reviewed submissions become profile data.

## Quick Start

1. Copy every file from `docs/templates/mod-submission` into a folder named after your mod.
2. Fill `mod.yaml` with your project, exact mod version, base game and update, base generation, authors, public sources, permission, and maintenance contact. Replace every example address and instruction.
3. Give each relevant location a stable ID in `mod.yaml`. Trainers, encounters, and item records use these same IDs.
4. Work through all eight category files. Copy useful records from the filled examples, then replace them with your actual data. Choose the correct coverage for every file.
5. Describe every custom mechanic in `rules.yaml`, including at least one worked example. Record uncertainties instead of guessing.
6. Optionally run the author checker. Resolve format errors and completeness gaps, then set `status: ready` when the package is ready for review. Drafts may keep `status: draft` and explain what is missing.
7. Send the folder as a ZIP attachment or a public repository link in a [discussion](https://github.com/KotMatrosk1n/KM-Companion/discussions) or [ROM Hack or Trainer Data proposal](https://github.com/KotMatrosk1n/KM-Companion/issues/new?template=rom_hack_or_trainer_data.md). Include the mod version and a short summary of the requested support.

Only send your authored data and public references that may be redistributed. Keep ROMs, game dumps, saves, console keys, executable game files, credentials, personal data, and proprietary assets outside the submission. Link permitted custom artwork separately and identify its creator and permission.

## Folder Layout

```text
your-mod/
  README.md
  mod.yaml
  pokemon.yaml
  moves.yaml
  abilities.yaml
  items.yaml
  trainers.yaml
  encounters.yaml
  item-locations.yaml
  rules.yaml
```

| File | Include |
| --- | --- |
| `mod.yaml` | Project identity, exact versions, base game and generation, authors, permission, sources, shared locations, maintenance, and requested features. |
| `pokemon.yaml` | Species and forms, types, base stats, abilities, sizes, breeding, evolutions, learnsets, availability, and raw save IDs. |
| `moves.yaml` | Type, category, power, accuracy, PP, priority, targets, flags, effects, chances, damage behavior, and special move variants. |
| `abilities.yaml` | Descriptions, activation conditions, precise effects, suppression, copying, and interactions. |
| `items.yaml` | Held and usable effects, consumption, triggers, prices, limits, and interactions. |
| `trainers.yaml` | Teams, actual stat spreads, levels, moves, format, location, variants, level caps, AI, field conditions, and rewards. |
| `encounters.yaml` | Separate tables for locations, methods, weather, time, season, and versions, including gifts, starters, statics, and trades. |
| `item-locations.yaml` | Pickups, shops, gifts, rewards, directions, quantities, access requirements, event flags, and repeatability. |
| `rules.yaml` | Custom damage mechanics, input policies, encounter restrictions, progression, AI, save formats, and interface requests, with worked examples. |

Use one UTF-8 file for each name. YAML is recommended because it supports comments and readable paragraphs. `.yml` and `.json` are also accepted, and formats can be mixed between categories. Keep exactly one extension per name. A JSON file uses the same fields and nesting as its YAML counterpart.

Keep all nine data files, even when a category is unchanged. This prevents an omitted file from looking like a deliberate declaration that nothing changed. `README.md` is optional supporting text and is not parsed. The checker reads extracted folders, not ZIP archives, and never downloads public references.

## Mark What You Know

Every category starts with this wrapper:

```yaml
formatVersion: 1
coverage: changes
notes: Only differences from the base game are listed.
records:
  - id: pikachu
    name: Pikachu
    action: change
    base: Pikachu
    baseStats:
      spa: 65
```

| Coverage | Meaning |
| --- | --- |
| `changes` | These are all known changes in this category relative to the declared base game. Include at least one record. |
| `complete` | These records describe the full category for this mod version. Explain the scope in `notes`. |
| `unchanged` | You have confirmed this category uses the declared base game without changes. Keep `records: []`. |
| `unavailable` | Information has not been supplied or verified. Explain the gap and keep `records: []`. This remains a draft. |

Coverage describes the completeness of your evidence. It does not authorize replacing or deleting a dataset. Even `complete` never removes an omitted base record automatically. List removals explicitly.

Every record has a stable `id`, readable `name`, and `action`:

| Action | Meaning |
| --- | --- |
| `add` | A new record. Provide its required data. |
| `change` | A change to an existing base record. `base` identifies the original record. Omitted properties inherit the declared base game; supplied arrays describe the entire replacement value unless a specific field says otherwise. |
| `remove` | An explicit removal. Supply `id`, `name`, `action`, and `base`, plus any useful notes and sources. |

For base trainer or encounter records that have no unique name, identify the original in `base` using its game ID and location or variant. Describe that identification in `notes`. Keep IDs stable between submissions so progress and later corrections can be mapped reliably. Do not reuse an old ID for a different record.

Omit an optional field when it does not apply. For a change, omission means inheritance. For an addition, omission makes no claim about that property. Use `null` for a genuinely unknown value and explain it in `unknowns` or `notes`; null never means zero, false, or removal. A readiness check rejects unknown values. Use `0`, `false`, `[]`, or the exact name `None` where those are the known facts. Do not invent values to make the checker pass.

## Names, IDs, And Sources

Use readable names such as `Pikachu`, `Thunderbolt`, and `Oran Berry` for base game content. Use `@id` for a record declared in this submission:

```yaml
species: "@stormcub"
ability: "@storm-charge"
item: "@storm-charm"
moves: ["@frost-spark", Thunder Wave, Tackle, Protect]
```

Quote references beginning with `@`, because an unquoted `@` is not valid YAML. Local references use the matching category: species in `pokemon.yaml`, moves in `moves.yaml`, abilities in `abilities.yaml`, and items in `items.yaml`. Forms need their own stable IDs and exact names. Do not collapse a custom form into its base species.

Location references use `locationId: storm-route`, pointing to `mod.yaml` locations. Rule references use `ruleIds: [storm-bonus]`. Sources use `sourceIds: [release-guide]`, pointing to the source list in `mod.yaml`. Location parents use `parentId`, and item rewards can link `trainerId` to a trainer record. IDs use lowercase letters, digits, and words separated by hyphens. Display names keep their normal spelling.

The project source list applies to the submission as a whole. Use record `sourceIds` when a particular guide, revision, or author statement is relevant. Include source revisions and uncertainties where available. Links identify evidence; the checker does not fetch them or verify their contents. Exact base names and unsupported content are checked during integration.

Every record also supports `description`, `notes`, `unknowns`, and `extra`. Use `extra` for additional structured information that has no named field, and explain its meaning in notes. Unknown keys outside `extra` are rejected to catch spelling errors. `extra` is preserved review material, not executable behavior or an automatic feature request implementation.

## Pokémon And Forms

Additions need `types`, `baseStats`, and `abilities`. Include every base stat. Generations 2 through 9 use `hp`, `atk`, `def`, `spa`, `spd`, and `spe`; Generation 1 uses `spc` for Special. State absent secondary or hidden abilities as `None` when known.

Include `baseSpecies` and `form` for alternate forms. Supply `rawSpeciesId` and `rawFormId` if IDs differ from the base game, and document the corresponding save behavior in a rule. `nationalDex` is a display identity, not a substitute for those raw IDs.

Other supported information includes `weightKg`, `heightM`, `genderRatio`, `catchRate`, `growthRate`, `baseExperience`, `evYield`, `eggGroups`, `eggCycles`, `baseFriendship`, `heldItems`, `evolutions`, `sprite`, `availability`, and `formRules`.

Use `learnset` records with `move`, `method`, and any applicable `level`, `machine`, `conditions`, and `notes`. Methods include `level`, `machine`, `tutor`, `egg`, `evolution`, `reminder`, `event`, and `other`. Declare `learnsetCoverage` separately. A complete learnset lists every source; a changed learnset lists additions or changed acquisition conditions and uses `removedMoves` for explicit removals. Do not assume a renamed machine or form shares another record's compatibility.

## Moves, Abilities, And Items

New moves need `type`, `category`, `power`, `accuracy`, `pp`, `priority`, and `target`. Categories are `Physical`, `Special`, and `Status`. Use `power: 0` for a move without ordinary damage. Use `accuracy: true` for a move that skips the accuracy check, or a percentage such as `accuracy: 90`.

Record flags, secondary effects and their chances, stat changes, hit counts, critical hit stage, recoil, drain, healing, fixed damage, and conditional power. Ratios use `{numerator: 1, denominator: 3}`. `zMove` and `maxMove` can describe the name, power, and effect of special variants. Explain target rules and interactions precisely; a move description alone may omit details that affect damage or AI.

New abilities need their description, activation, and behavior. New items need description, kind, consumption, and behavior. Include suppression, copying, immunity, timing, duration, stacking, replacement, and exceptions where relevant. Items also support prices, stack limits, battle and field use, Fling power, Natural Gift, and public sprite references. Use `effects` for explicit chance and target information, and `ruleIds` for behavior requiring a custom rule.

## Trainers

Include stable identity, `locationId`, story split, class, variant, battle format, and the actual ordered party. New trainers need `battleType` and `pokemon`; each party entry supplies species, level, ability, held item, nature, and moves. Use `None` for known absent abilities, items, or natures. Gender, nickname, friendship, shiny state, Dynamax, Gigantamax, Tera type, starting HP, status, boosts, and recorded stats are optional.

Use one number when every stat has the same IV or effort value:

```yaml
ivs: 31
evs: 0
```

For a mixed spread, supply every stat, including zeros:

```yaml
ivs: {hp: 31, atk: 0, def: 31, spa: 31, spd: 31, spe: 31}
evs: {hp: 0, atk: 0, def: 0, spa: 252, spd: 4, spe: 252}
```

Generations 1 and 2 use `dvs` from 0 through 15 and `statExperience` from 0 through 65535 instead. A mixed DV map supplies `atk`, `def`, `spc`, and `spe`; HP DV is derived unless recorded explicitly. A mixed stat experience map also supplies `hp`. `recordedStats` can preserve actual observed values separately from the spreads used to derive them.

Slot numbers are optional. If one party member has `slot`, every member must have one, uniquely and consecutively from 1 through the party size. Rewards can include money, currency, and item quantities. Record known zero money or no items explicitly. Do not infer rewards from held items. Include repeat battles, access conditions, field conditions, and AI choice rules when they differ.

The submission can describe `Single`, `Double`, `Multi`, `Triple`, `Rotation`, and `Custom` battles, parties up to 24 members, levels up to 1000, and more than four moves. Values beyond the current app's limits are retained for review and reported; they do not become supported automatically. The existing trainer pack importer still accepts only its documented battle formats and normal team and level limits.

## Encounters

Create one record per actual condition table, with `locationId`, `method`, `kind`, `rateMode`, and its `slots`. Keep weather, time, season, edition, and access conditions explicit. Each slot has its own ID, species or form, and level range.

```yaml
rateMode: percent
slots:
  - id: stormcub-slot
    species: "@stormcub"
    level: {min: 12, max: 15}
    rate: 40
  - id: pikachu-slot
    species: Pikachu
    level: {min: 12, max: 15}
    rate: 60
```

Percentage tables must include all slots and total 100, even when only one slot changed. Use `rateMode: weight` and a positive total of numeric `weight` values for relative weights. Do not mix percentages with weights. Zero weight slots are allowed when the total remains positive.

Use `rateMode: none` for encounters without a random table. Set `kind` to `static`, `gift`, `starter`, `trade`, or `other` as appropriate. A trade records the received species and `requiredPokemon` for the offered species. Include fixed abilities, held items, moves, IVs or DVs, shiny restrictions, respawn behavior, and other guaranteed properties when applicable. Put catch quotas, shared locations, duplicate families, missed catches, and mode differences in rules.

## Item Locations

Use one stable ID per pickup, stock entry, gift, or reward event, including duplicate item names at different places. Include location, acquisition method, items and quantities, directions, access conditions, edition, postgame status, and whether it repeats. Optional map coordinates need a `mapId` and explicit units.

Use `shop` records for price, currency, and stock. Link a battle reward through `trainerId` when applicable. Record NPCs, event flags, respawn timing, and original locations. An item in the item catalog does not establish where it is available, and a trainer's held item does not establish a reward.

## Custom Rules

Use `kind` values `battle`, `input`, `encounter`, `progress`, `save`, `ai`, `interface`, or `other`. A rule states its trigger, exact behavior, affected scope, order, rounding, exceptions, and interactions. Structured `parameters` can preserve additional constants, mappings, lists, and tables. Standard reference keys such as `locationIds` still refer to the shared catalogs.

Every new rule includes at least one example with `name`, `given`, `when`, and `then`. Include ordinary cases, boundaries, and interactions when possible. For damage, give exact inputs and outputs or rolls, identify the step where a modifier applies, and specify rounding. For AI, describe priorities and tie resolution. For progression, describe what consumes an allowance, how undo behaves, and which modes or locations share it.

Save rules can include `saveFormat` with base game, extensions, layout changes, entity ID mappings, checksum changes, and version detection. Describe these without attaching private saves or game files. Interface requests describe the desired player workflow; they cannot select or execute a layout from submitted data.

Rules, formulas, and effect descriptions are data for review. They never execute code. A complete example is evidence of the intended behavior, not proof that the implementation already supports it.

## Check Your Folder

The optional checker uses Node.js 24 or a later compatible version from a KM Companion source checkout. Install the locked author dependencies without running application setup scripts:

```powershell
npm ci --ignore-scripts
npm run validate:mod -- "C:\Submissions\Your Mod"
npm run validate:mod -- "C:\Submissions\Your Mod" --ready
```

Maintainers can check the included example with:

```powershell
npm run validate:mod -- docs/examples/mod-submission --ready
```

Use `--json` for a complete machine readable report. The command reads files only. It does not build or open the app, install a profile, upload data, fetch references, or execute submitted code. Each file may be up to 64 MiB, with a 256 MiB package limit. Discuss larger exports with the maintainers before submitting them. Custom YAML tags, merge keys, and shared object aliases are unsupported.

| Output | Meaning |
| --- | --- |
| `ERROR` | A file shape, duplicate ID, reference, rate, range, or other constraint needs correction. Syntax errors include line and column; other errors identify the file and field. Exit code 1. |
| `INCOMPLETE` | A category is unavailable, a required accuracy detail is missing, a value is unknown, the package is marked draft, or permission needs review. A normal check can still exit 0; `--ready` exits 2. |
| `REVIEW` | Captured behavior or a value beyond current app support needs an integration decision. It is retained and does not fail the format check. |

The checker does not verify source truth, legal permission, exact canonical names, game behavior, or implementation compatibility. Passing `--ready` means the format and completeness checks passed. Maintainers still verify the data before promising support.

## Before Sending

- Replace starter instructions, example names, and example URLs with actual public project information.
- Match the exact mod release, base game update, and source revision.
- Keep all eight categories and declare coverage honestly.
- Include complete encounter tables, actual trainer spreads, and explicit removals.
- Resolve local references, duplicate IDs, uncertain values, and unexplained omissions.
- Explain custom behavior with ordering, rounding, conditions, and worked examples.
- Confirm redistribution permission and identify a public maintenance contact.
- Explain any remaining draft gaps in the accompanying discussion.

The [complete field reference](mod-submission-fields.md) lists every supported property. The [version 1 schemas](schemas/mod-submission-v1/mod.schema.json) define the machine readable contract. Unknown information should remain visible rather than being silently replaced with defaults.
