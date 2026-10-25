# Mod Submission Field Reference

Use the [author guide](mod-submissions.md) first. This reference lists all version 1 properties, including optional detail. The [starter](templates/mod-submission/README.md) keeps the initial workload small, and the [filled example](examples/mod-submission/README.md) shows linked records.

Every category file contains `formatVersion: 1`, `coverage`, optional `notes`, and `records`. Coverage is `changes`, `complete`, `unchanged`, or `unavailable`. The tables below describe each record, except the manifest table which describes the whole file.

Required means required in that object when supplied. Add means required for an addition. Changes and removals also require `base`. Partial changes inherit omitted fields from the declared base; additions never silently invent missing values. Null means unknown and blocks readiness. Arrays replace that property unless the author guide explicitly defines another meaning.

A reference is a base name or a quoted `@id`; source, location, rule, and trainer ID fields use their matching catalogs. `extra` and rule `parameters` may contain documented additional JSON values. See the guide for stat shortcuts, legacy stat keys, encounter totals, and integration limits.

## mod.yaml

| Field | Value | Required |
| --- | --- | --- |
| `format` | `km-companion.mod-submission` | Yes |
| `formatVersion` | `1` | Yes |
| `status` | `draft`, `ready` | Yes |
| `project` | object | Yes |
| `project.id` | string | Yes |
| `project.name` | string | Yes |
| `project.version` | string | Yes |
| `project.summary` | string | Yes |
| `project.homepage` | string | Yes |
| `project.baseGame` | string | Yes |
| `project.gameVersion` | string | Yes |
| `project.baseGeneration` | integer 1 through 9 | Yes |
| `project.languages` | list of string | Optional |
| `project.gameModes` | list of string | Optional |
| `project.compatibilityNotes` | string or null | Optional |
| `authors` | list of object | Yes |
| `authors[].name` | string | Yes |
| `authors[].role` | string or null | Optional |
| `authors[].url` | string or null | Optional |
| `maintenance` | object | Yes |
| `maintenance.maintainers` | list of object | Yes |
| `maintenance.maintainers[].name` | string | Yes |
| `maintenance.maintainers[].url` | string | Yes |
| `maintenance.updatePolicy` | string | Yes |
| `maintenance.versionNotes` | string or null | Optional |
| `permission` | object | Yes |
| `permission.redistribution` | `allowed`, `needs_review` | Yes |
| `permission.statement` | string | Yes |
| `permission.evidenceUrl` | string or null | Optional |
| `permission.assetNotes` | string | Yes |
| `sources` | list of object | Yes |
| `sources[].id` | string | Yes |
| `sources[].name` | string | Yes |
| `sources[].url` | string | Yes |
| `sources[].revision` | string or null | Optional |
| `sources[].notes` | string or null | Optional |
| `locations` | list of object | Yes |
| `locations[].id` | string | Yes |
| `locations[].name` | string | Yes |
| `locations[].region` | string or null | Optional |
| `locations[].parentId` | string or null | Optional |
| `locations[].mapIds` | list of string | Optional |
| `locations[].notes` | string or null | Optional |
| `requestedFeatures` | list of string | Optional |
| `notes` | string or null | Optional |
| `unknowns` | list of string | Optional |
| `extra` | object | Optional |

## pokemon.yaml

| Field | Value | Required |
| --- | --- | --- |
| `id` | string | Yes |
| `name` | string | Yes |
| `action` | `add`, `change`, `remove` | Yes |
| `base` | string or null | Add |
| `description` | string or null | Optional |
| `sourceIds` | list of string | Optional |
| `ruleIds` | list of string | Optional |
| `notes` | string or null | Optional |
| `unknowns` | list of string | Optional |
| `extra` | object | Optional |
| `nationalDex` | integer 1 through 100000 or null | Optional |
| `form` | string or null | Optional |
| `baseSpecies` | string or null | Optional |
| `rawSpeciesId` | integer 0 through 1000000 or null | Optional |
| `rawFormId` | integer 0 through 1000000 or null | Optional |
| `types` | list of string | Add |
| `baseStats` | object | Add |
| `baseStats.hp` | integer 0 through 65535 or null | Optional |
| `baseStats.atk` | integer 0 through 65535 or null | Optional |
| `baseStats.def` | integer 0 through 65535 or null | Optional |
| `baseStats.spa` | integer 0 through 65535 or null | Optional |
| `baseStats.spd` | integer 0 through 65535 or null | Optional |
| `baseStats.spe` | integer 0 through 65535 or null | Optional |
| `baseStats.spc` | integer 0 through 65535 or null | Optional |
| `abilities` | object | Add |
| `abilities.primary` | string or null | Yes |
| `abilities.secondary` | string or null | Optional |
| `abilities.hidden` | string or null | Optional |
| `weightKg` | number 0 through 1000000 or null | Optional |
| `heightM` | number 0 through 1000000 or null | Optional |
| `genderRatio` | string or null | Optional |
| `catchRate` | integer 0 through 65535 or null | Optional |
| `growthRate` | string or null | Optional |
| `baseExperience` | integer 0 through 65535 or null | Optional |
| `evYield` | object or null | Optional |
| `evYield.hp` | integer 0 through 65535 or null | Optional |
| `evYield.atk` | integer 0 through 65535 or null | Optional |
| `evYield.def` | integer 0 through 65535 or null | Optional |
| `evYield.spa` | integer 0 through 65535 or null | Optional |
| `evYield.spd` | integer 0 through 65535 or null | Optional |
| `evYield.spe` | integer 0 through 65535 or null | Optional |
| `evYield.spc` | integer 0 through 65535 or null | Optional |
| `eggGroups` | list of string | Optional |
| `eggCycles` | integer 0 through 65535 or null | Optional |
| `baseFriendship` | integer 0 through 255 or null | Optional |
| `heldItems` | list of object | Optional |
| `heldItems[].item` | string | Yes |
| `heldItems[].quantity` | integer 1 through 1000000 or null | Yes |
| `heldItems[].chance` | number 0 through 100 or null | Optional |
| `heldItems[].notes` | string or null | Optional |
| `evolutions` | list of object | Optional |
| `evolutions[].species` | string | Yes |
| `evolutions[].method` | string | Yes |
| `evolutions[].level` | integer 0 through 1000 or null | Optional |
| `evolutions[].item` | string or null | Optional |
| `evolutions[].conditions` | string or null | Optional |
| `evolutions[].notes` | string or null | Optional |
| `learnset` | list of object | Optional |
| `learnset[].move` | string | Yes |
| `learnset[].method` | `level`, `machine`, `tutor`, `egg`, `evolution`, `reminder`, `event`, `other` | Yes |
| `learnset[].level` | integer 0 through 1000 or null | Optional |
| `learnset[].machine` | string or null | Optional |
| `learnset[].conditions` | string or null | Optional |
| `learnset[].notes` | string or null | Optional |
| `learnsetCoverage` | `changes`, `complete`, `unchanged`, `unavailable` | Optional |
| `removedMoves` | list of string | Optional |
| `sprite` | string or null | Optional |
| `availability` | object or null | Optional |
| `availability.description` | string | Yes |
| `availability.storyFlags` | list of string | Optional |
| `availability.versions` | list of string | Optional |
| `availability.time` | list of string | Optional |
| `availability.weather` | list of string | Optional |
| `availability.season` | list of string | Optional |
| `availability.requiredPokemon` | string or null | Optional |
| `availability.requiredItems` | list of string | Optional |
| `availability.extra` | object | Optional |
| `formRules` | string or null | Optional |

## moves.yaml

| Field | Value | Required |
| --- | --- | --- |
| `id` | string | Yes |
| `name` | string | Yes |
| `action` | `add`, `change`, `remove` | Yes |
| `base` | string or null | Add |
| `description` | string or null | Optional |
| `sourceIds` | list of string | Optional |
| `ruleIds` | list of string | Optional |
| `notes` | string or null | Optional |
| `unknowns` | list of string | Optional |
| `extra` | object | Optional |
| `rawMoveId` | integer 0 through 1000000 or null | Optional |
| `type` | string or null | Add |
| `category` | `Physical`, `Special`, `Status` or null | Add |
| `power` | integer 0 through 1000000 or null | Add |
| `accuracy` | number 0 through 100 or `true` or null | Add |
| `pp` | integer 0 through 65535 or null | Add |
| `priority` | integer -128 through 127 or null | Add |
| `target` | string or null | Add |
| `flags` | list of string | Optional |
| `removedFlags` | list of string | Optional |
| `effects` | list of object | Optional |
| `effects[].description` | string | Yes |
| `effects[].chance` | number 0 through 100 or null | Optional |
| `effects[].target` | string or null | Optional |
| `effects[].status` | string or null | Optional |
| `effects[].statChanges` | list of object | Optional |
| `effects[].statChanges[].stat` | `atk`, `def`, `spa`, `spd`, `spe`, `accuracy`, `evasion`, `all` | Yes |
| `effects[].statChanges[].stages` | integer -6 through 6 | Yes |
| `effects[].statChanges[].target` | `user`, `target`, `allies`, `opponents` | Yes |
| `effects[].statChanges[].chance` | number 0 through 100 or null | Optional |
| `effects[].duration` | string or null | Optional |
| `effects[].ruleIds` | list of string | Optional |
| `effects[].extra` | object | Optional |
| `statChanges` | list of object | Optional |
| `statChanges[].stat` | `atk`, `def`, `spa`, `spd`, `spe`, `accuracy`, `evasion`, `all` | Yes |
| `statChanges[].stages` | integer -6 through 6 | Yes |
| `statChanges[].target` | `user`, `target`, `allies`, `opponents` | Yes |
| `statChanges[].chance` | number 0 through 100 or null | Optional |
| `criticalHitStage` | integer 0 through 6 or null | Optional |
| `multiHit` | object or null | Optional |
| `multiHit.min` | integer 1 through 100 | Yes |
| `multiHit.max` | integer 1 through 100 | Yes |
| `multiHit.distribution` | string or null | Optional |
| `recoil` | object or null | Optional |
| `recoil.numerator` | integer 0 through 1000000 | Yes |
| `recoil.denominator` | integer 1 through 1000000 | Yes |
| `drain` | object or null | Optional |
| `drain.numerator` | integer 0 through 1000000 | Yes |
| `drain.denominator` | integer 1 through 1000000 | Yes |
| `healing` | object or null | Optional |
| `healing.numerator` | integer 0 through 1000000 | Yes |
| `healing.denominator` | integer 1 through 1000000 | Yes |
| `fixedDamage` | string or null | Optional |
| `damageFormula` | string or null | Optional |
| `zMove` | object or null | Optional |
| `zMove.name` | string | Yes |
| `zMove.power` | integer 0 through 1000000 or null | Optional |
| `zMove.effect` | string or null | Optional |
| `maxMove` | object or null | Optional |
| `maxMove.name` | string | Yes |
| `maxMove.power` | integer 0 through 1000000 or null | Optional |
| `maxMove.effect` | string or null | Optional |
| `behavior` | string or null | Optional |
| `interactions` | list of string | Optional |

## abilities.yaml

| Field | Value | Required |
| --- | --- | --- |
| `id` | string | Yes |
| `name` | string | Yes |
| `action` | `add`, `change`, `remove` | Yes |
| `base` | string or null | Add |
| `description` | string or null | Add |
| `sourceIds` | list of string | Optional |
| `ruleIds` | list of string | Optional |
| `notes` | string or null | Optional |
| `unknowns` | list of string | Optional |
| `extra` | object | Optional |
| `rawAbilityId` | integer 0 through 1000000 or null | Optional |
| `activation` | string or null | Add |
| `effects` | list of object | Optional |
| `effects[].description` | string | Yes |
| `effects[].chance` | number 0 through 100 or null | Optional |
| `effects[].target` | string or null | Optional |
| `effects[].status` | string or null | Optional |
| `effects[].statChanges` | list of object | Optional |
| `effects[].statChanges[].stat` | `atk`, `def`, `spa`, `spd`, `spe`, `accuracy`, `evasion`, `all` | Yes |
| `effects[].statChanges[].stages` | integer -6 through 6 | Yes |
| `effects[].statChanges[].target` | `user`, `target`, `allies`, `opponents` | Yes |
| `effects[].statChanges[].chance` | number 0 through 100 or null | Optional |
| `effects[].duration` | string or null | Optional |
| `effects[].ruleIds` | list of string | Optional |
| `effects[].extra` | object | Optional |
| `suppressedBy` | list of string | Optional |
| `ignoredBy` | list of string | Optional |
| `copiedBy` | list of string | Optional |
| `interactions` | list of string | Optional |
| `behavior` | string or null | Add |

## items.yaml

| Field | Value | Required |
| --- | --- | --- |
| `id` | string | Yes |
| `name` | string | Yes |
| `action` | `add`, `change`, `remove` | Yes |
| `base` | string or null | Add |
| `description` | string or null | Add |
| `sourceIds` | list of string | Optional |
| `ruleIds` | list of string | Optional |
| `notes` | string or null | Optional |
| `unknowns` | list of string | Optional |
| `extra` | object | Optional |
| `rawItemId` | integer 0 through 1000000 or null | Optional |
| `kind` | `held`, `consumable`, `medicine`, `key`, `machine`, `other` or null | Add |
| `price` | integer 0 through 1000000000 or null | Optional |
| `sellPrice` | integer 0 through 1000000000 or null | Optional |
| `stackLimit` | integer 1 through 1000000 or null | Optional |
| `consumed` | boolean or null | Add |
| `trigger` | string or null | Optional |
| `effects` | list of object | Optional |
| `effects[].description` | string | Yes |
| `effects[].chance` | number 0 through 100 or null | Optional |
| `effects[].target` | string or null | Optional |
| `effects[].status` | string or null | Optional |
| `effects[].statChanges` | list of object | Optional |
| `effects[].statChanges[].stat` | `atk`, `def`, `spa`, `spd`, `spe`, `accuracy`, `evasion`, `all` | Yes |
| `effects[].statChanges[].stages` | integer -6 through 6 | Yes |
| `effects[].statChanges[].target` | `user`, `target`, `allies`, `opponents` | Yes |
| `effects[].statChanges[].chance` | number 0 through 100 or null | Optional |
| `effects[].duration` | string or null | Optional |
| `effects[].ruleIds` | list of string | Optional |
| `effects[].extra` | object | Optional |
| `flingPower` | integer 0 through 1000000 or null | Optional |
| `naturalGift` | object or null | Optional |
| `naturalGift.type` | string | Yes |
| `naturalGift.power` | integer 0 through 1000000 | Yes |
| `usableInBattle` | boolean or null | Optional |
| `usableInField` | boolean or null | Optional |
| `sprite` | string or null | Optional |
| `interactions` | list of string | Optional |
| `behavior` | string or null | Add |

## trainers.yaml

| Field | Value | Required |
| --- | --- | --- |
| `id` | string | Yes |
| `name` | string | Yes |
| `action` | `add`, `change`, `remove` | Yes |
| `base` | string or null | Add |
| `description` | string or null | Optional |
| `sourceIds` | list of string | Optional |
| `ruleIds` | list of string | Optional |
| `notes` | string or null | Optional |
| `unknowns` | list of string | Optional |
| `extra` | object | Optional |
| `locationId` | string or null | Add |
| `trainerClass` | string or null | Optional |
| `rawTrainerId` | string or null | Optional |
| `storySplit` | string or null | Optional |
| `variant` | string or null | Optional |
| `battleType` | `Single`, `Double`, `Multi`, `Triple`, `Rotation`, `Custom` | Add |
| `battleTypeNotes` | string or null | Optional |
| `levelCap` | integer 1 through 1000 or null | Optional |
| `repeatable` | boolean or null | Optional |
| `conditions` | object or null | Optional |
| `conditions.description` | string | Yes |
| `conditions.storyFlags` | list of string | Optional |
| `conditions.versions` | list of string | Optional |
| `conditions.time` | list of string | Optional |
| `conditions.weather` | list of string | Optional |
| `conditions.season` | list of string | Optional |
| `conditions.requiredPokemon` | string or null | Optional |
| `conditions.requiredItems` | list of string | Optional |
| `conditions.extra` | object | Optional |
| `ai` | object or null | Optional |
| `ai.description` | string | Yes |
| `ai.flags` | list of string | Optional |
| `ai.ruleIds` | list of string | Optional |
| `ai.notes` | string or null | Optional |
| `field` | object or null | Optional |
| `field.weather` | string or null | Optional |
| `field.terrain` | string or null | Optional |
| `field.playerEffects` | list of string | Optional |
| `field.trainerEffects` | list of string | Optional |
| `field.otherEffects` | list of string | Optional |
| `rewards` | object or null | Optional |
| `rewards.money` | integer 0 through 1000000000 or null | Optional |
| `rewards.currency` | string or null | Optional |
| `rewards.items` | list of object | Optional |
| `rewards.items[].item` | string | Yes |
| `rewards.items[].quantity` | integer 1 through 1000000 or null | Yes |
| `rewards.items[].chance` | number 0 through 100 or null | Optional |
| `rewards.items[].notes` | string or null | Optional |
| `rewards.notes` | string or null | Optional |
| `pokemon` | list of object | Add |
| `pokemon[].slot` | integer 1 through 24 | Optional |
| `pokemon[].species` | string | Yes |
| `pokemon[].nickname` | string or null | Optional |
| `pokemon[].level` | integer 1 through 1000 or null | Yes |
| `pokemon[].gender` | `M`, `F`, `N`, `random` or null | Optional |
| `pokemon[].ability` | string or null | Yes |
| `pokemon[].abilitySlot` | string or null | Optional |
| `pokemon[].item` | string or null | Yes |
| `pokemon[].nature` | string or null | Yes |
| `pokemon[].moves` | list of string | Yes |
| `pokemon[].ivs` | integer 0 through 31 or object or null | Optional |
| `pokemon[].ivs.hp` | integer 0 through 31 or null | Optional |
| `pokemon[].ivs.atk` | integer 0 through 31 or null | Optional |
| `pokemon[].ivs.def` | integer 0 through 31 or null | Optional |
| `pokemon[].ivs.spa` | integer 0 through 31 or null | Optional |
| `pokemon[].ivs.spd` | integer 0 through 31 or null | Optional |
| `pokemon[].ivs.spe` | integer 0 through 31 or null | Optional |
| `pokemon[].ivs.spc` | integer 0 through 31 or null | Optional |
| `pokemon[].dvs` | integer 0 through 15 or object or null | Optional |
| `pokemon[].dvs.hp` | integer 0 through 15 or null | Optional |
| `pokemon[].dvs.atk` | integer 0 through 15 or null | Optional |
| `pokemon[].dvs.def` | integer 0 through 15 or null | Optional |
| `pokemon[].dvs.spa` | integer 0 through 15 or null | Optional |
| `pokemon[].dvs.spd` | integer 0 through 15 or null | Optional |
| `pokemon[].dvs.spe` | integer 0 through 15 or null | Optional |
| `pokemon[].dvs.spc` | integer 0 through 15 or null | Optional |
| `pokemon[].evs` | integer 0 through 252 or object or null | Optional |
| `pokemon[].evs.hp` | integer 0 through 252 or null | Optional |
| `pokemon[].evs.atk` | integer 0 through 252 or null | Optional |
| `pokemon[].evs.def` | integer 0 through 252 or null | Optional |
| `pokemon[].evs.spa` | integer 0 through 252 or null | Optional |
| `pokemon[].evs.spd` | integer 0 through 252 or null | Optional |
| `pokemon[].evs.spe` | integer 0 through 252 or null | Optional |
| `pokemon[].evs.spc` | integer 0 through 252 or null | Optional |
| `pokemon[].statExperience` | integer 0 through 65535 or object or null | Optional |
| `pokemon[].statExperience.hp` | integer 0 through 65535 or null | Optional |
| `pokemon[].statExperience.atk` | integer 0 through 65535 or null | Optional |
| `pokemon[].statExperience.def` | integer 0 through 65535 or null | Optional |
| `pokemon[].statExperience.spa` | integer 0 through 65535 or null | Optional |
| `pokemon[].statExperience.spd` | integer 0 through 65535 or null | Optional |
| `pokemon[].statExperience.spe` | integer 0 through 65535 or null | Optional |
| `pokemon[].statExperience.spc` | integer 0 through 65535 or null | Optional |
| `pokemon[].recordedStats` | object or null | Optional |
| `pokemon[].recordedStats.hp` | integer 0 through 65535 or null | Optional |
| `pokemon[].recordedStats.atk` | integer 0 through 65535 or null | Optional |
| `pokemon[].recordedStats.def` | integer 0 through 65535 or null | Optional |
| `pokemon[].recordedStats.spa` | integer 0 through 65535 or null | Optional |
| `pokemon[].recordedStats.spd` | integer 0 through 65535 or null | Optional |
| `pokemon[].recordedStats.spe` | integer 0 through 65535 or null | Optional |
| `pokemon[].recordedStats.spc` | integer 0 through 65535 or null | Optional |
| `pokemon[].shiny` | boolean or null | Optional |
| `pokemon[].friendship` | integer 0 through 255 or null | Optional |
| `pokemon[].dynamaxLevel` | integer 0 through 10 or null | Optional |
| `pokemon[].gigantamax` | boolean or null | Optional |
| `pokemon[].teraType` | string or null | Optional |
| `pokemon[].startingHp` | integer 0 through 65535 or null | Optional |
| `pokemon[].startingStatus` | string or null | Optional |
| `pokemon[].boosts` | object or null | Optional |
| `pokemon[].boosts.hp` | integer -6 through 6 or null | Optional |
| `pokemon[].boosts.atk` | integer -6 through 6 or null | Optional |
| `pokemon[].boosts.def` | integer -6 through 6 or null | Optional |
| `pokemon[].boosts.spa` | integer -6 through 6 or null | Optional |
| `pokemon[].boosts.spd` | integer -6 through 6 or null | Optional |
| `pokemon[].boosts.spe` | integer -6 through 6 or null | Optional |
| `pokemon[].boosts.spc` | integer -6 through 6 or null | Optional |
| `pokemon[].ruleIds` | list of string | Optional |
| `pokemon[].notes` | string or null | Optional |
| `pokemon[].extra` | object | Optional |

## encounters.yaml

| Field | Value | Required |
| --- | --- | --- |
| `id` | string | Yes |
| `name` | string | Yes |
| `action` | `add`, `change`, `remove` | Yes |
| `base` | string or null | Add |
| `description` | string or null | Optional |
| `sourceIds` | list of string | Optional |
| `ruleIds` | list of string | Optional |
| `notes` | string or null | Optional |
| `unknowns` | list of string | Optional |
| `extra` | object | Optional |
| `locationId` | string | Add |
| `method` | string | Add |
| `kind` | `random`, `static`, `gift`, `starter`, `trade`, `other` | Add |
| `rateMode` | `percent`, `weight`, `none` | Add |
| `weather` | list of string | Optional |
| `time` | list of string | Optional |
| `season` | list of string | Optional |
| `versions` | list of string | Optional |
| `conditions` | object or null | Optional |
| `conditions.description` | string | Yes |
| `conditions.storyFlags` | list of string | Optional |
| `conditions.versions` | list of string | Optional |
| `conditions.time` | list of string | Optional |
| `conditions.weather` | list of string | Optional |
| `conditions.season` | list of string | Optional |
| `conditions.requiredPokemon` | string or null | Optional |
| `conditions.requiredItems` | list of string | Optional |
| `conditions.extra` | object | Optional |
| `shinyLocked` | boolean or null | Optional |
| `respawn` | string or null | Optional |
| `slots` | list of object | Add |
| `slots[].id` | string | Yes |
| `slots[].species` | string | Yes |
| `slots[].level` | object or null | Yes |
| `slots[].level.min` | integer 1 through 1000 | Yes |
| `slots[].level.max` | integer 1 through 1000 | Yes |
| `slots[].rate` | number 0 through 100 or null | Optional |
| `slots[].weight` | number 0 through 1000000 or null | Optional |
| `slots[].quantity` | integer 1 through 100 or null | Optional |
| `slots[].requiredPokemon` | string or null | Optional |
| `slots[].ability` | string or null | Optional |
| `slots[].item` | string or null | Optional |
| `slots[].moves` | list of string | Optional |
| `slots[].ivs` | object or null | Optional |
| `slots[].ivs.hp` | integer 0 through 31 or null | Optional |
| `slots[].ivs.atk` | integer 0 through 31 or null | Optional |
| `slots[].ivs.def` | integer 0 through 31 or null | Optional |
| `slots[].ivs.spa` | integer 0 through 31 or null | Optional |
| `slots[].ivs.spd` | integer 0 through 31 or null | Optional |
| `slots[].ivs.spe` | integer 0 through 31 or null | Optional |
| `slots[].ivs.spc` | integer 0 through 31 or null | Optional |
| `slots[].dvs` | object or null | Optional |
| `slots[].dvs.hp` | integer 0 through 15 or null | Optional |
| `slots[].dvs.atk` | integer 0 through 15 or null | Optional |
| `slots[].dvs.def` | integer 0 through 15 or null | Optional |
| `slots[].dvs.spa` | integer 0 through 15 or null | Optional |
| `slots[].dvs.spd` | integer 0 through 15 or null | Optional |
| `slots[].dvs.spe` | integer 0 through 15 or null | Optional |
| `slots[].dvs.spc` | integer 0 through 15 or null | Optional |
| `slots[].guaranteed` | boolean or null | Optional |
| `slots[].conditions` | object or null | Optional |
| `slots[].conditions.description` | string | Yes |
| `slots[].conditions.storyFlags` | list of string | Optional |
| `slots[].conditions.versions` | list of string | Optional |
| `slots[].conditions.time` | list of string | Optional |
| `slots[].conditions.weather` | list of string | Optional |
| `slots[].conditions.season` | list of string | Optional |
| `slots[].conditions.requiredPokemon` | string or null | Optional |
| `slots[].conditions.requiredItems` | list of string | Optional |
| `slots[].conditions.extra` | object | Optional |
| `slots[].notes` | string or null | Optional |
| `slots[].sourceIds` | list of string | Optional |
| `slots[].ruleIds` | list of string | Optional |
| `slots[].extra` | object | Optional |

## item-locations.yaml

| Field | Value | Required |
| --- | --- | --- |
| `id` | string | Yes |
| `name` | string | Yes |
| `action` | `add`, `change`, `remove` | Yes |
| `base` | string or null | Add |
| `description` | string or null | Optional |
| `sourceIds` | list of string | Optional |
| `ruleIds` | list of string | Optional |
| `notes` | string or null | Optional |
| `unknowns` | list of string | Optional |
| `extra` | object | Optional |
| `locationId` | string | Add |
| `method` | `pickup`, `hidden`, `gift`, `shop`, `battle_reward`, `trade`, `other` | Add |
| `items` | list of object | Add |
| `items[].item` | string | Yes |
| `items[].quantity` | integer 1 through 1000000 or null | Yes |
| `items[].chance` | number 0 through 100 or null | Optional |
| `items[].notes` | string or null | Optional |
| `directions` | string or null | Add |
| `coordinates` | object or null | Optional |
| `coordinates.mapId` | string | Yes |
| `coordinates.x` | number -1000000 through 1000000 | Yes |
| `coordinates.y` | number -1000000 through 1000000 | Yes |
| `coordinates.z` | number -1000000 through 1000000 or null | Optional |
| `coordinates.units` | string | Yes |
| `conditions` | object or null | Optional |
| `conditions.description` | string | Yes |
| `conditions.storyFlags` | list of string | Optional |
| `conditions.versions` | list of string | Optional |
| `conditions.time` | list of string | Optional |
| `conditions.weather` | list of string | Optional |
| `conditions.season` | list of string | Optional |
| `conditions.requiredPokemon` | string or null | Optional |
| `conditions.requiredItems` | list of string | Optional |
| `conditions.extra` | object | Optional |
| `postGame` | boolean or null | Optional |
| `repeatable` | boolean or null | Optional |
| `respawn` | string or null | Optional |
| `trainerId` | string or null | Optional |
| `npc` | string or null | Optional |
| `eventFlag` | string or null | Optional |
| `price` | integer 0 through 1000000000 or null | Optional |
| `currency` | string or null | Optional |
| `stock` | integer 0 through 1000000 or null | Optional |
| `versions` | list of string | Optional |

## rules.yaml

| Field | Value | Required |
| --- | --- | --- |
| `id` | string | Yes |
| `name` | string | Yes |
| `action` | `add`, `change`, `remove` | Yes |
| `base` | string or null | Add |
| `description` | string or null | Optional |
| `sourceIds` | list of string | Optional |
| `ruleIds` | list of string | Optional |
| `notes` | string or null | Optional |
| `unknowns` | list of string | Optional |
| `extra` | object | Optional |
| `kind` | `battle`, `input`, `encounter`, `progress`, `save`, `ai`, `interface`, `other` | Add |
| `appliesTo` | list of string | Optional |
| `trigger` | string | Add |
| `behavior` | string | Add |
| `order` | string or null | Optional |
| `rounding` | string or null | Optional |
| `exceptions` | list of string | Optional |
| `interactions` | list of string | Optional |
| `parameters` | object | Optional |
| `examples` | list of object | Add |
| `examples[].name` | string | Yes |
| `examples[].given` | string | Yes |
| `examples[].when` | string | Yes |
| `examples[].then` | string | Yes |
| `examples[].notes` | string or null | Optional |
| `saveFormat` | object or null | Optional |
| `saveFormat.baseGame` | string | Yes |
| `saveFormat.extensions` | list of string | Optional |
| `saveFormat.layoutChanges` | string or null | Optional |
| `saveFormat.entityIdMappings` | string or null | Optional |
| `saveFormat.checksumChanges` | string or null | Optional |
| `saveFormat.versionDetection` | string or null | Optional |
