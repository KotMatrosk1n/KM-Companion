# ROM Hack Profiles

KM Companion keeps each supported ROM hack in a profile so custom data never leaks into another game or into the canonical generation data.

At startup, the app asks **Which ROM Hack are you playing?** Selecting a tile activates one profile, switches to and locks its base generation, resolves its calculator data and layout providers, filters the trainer list, applies its input and save import rules, and enables only the features declared by that profile. The active choice is intentionally not remembered between launches.

## Profile Layers

Each profile declares:

- a stable profile ID, display name, version, and base generation from 1 through 9
- the calculator generation provider or override provider it uses
- a UI layout ID, which defaults to `base` when omitted
- input policies, which default to the normal rules for the selected generation
- the trainer data pack associated with the profile
- the save import generation and adapter
- optional exclusive profile features, such as Royal Sword's Sword/Shield AI simulator
- tile text and icon
- authors, source, license or permission, and attribution notes

Royal Sword is the first bundled profile. It uses canonical Generation 8 as its base and resolves `calc.RoyalSwordGenerations.get(8)` for its custom species, items, and mechanics. It explicitly declares `ui.layout` as `royal-sword` and `inputs.evs` as `disabled`. A normal numeric Generation 8 lookup remains canonical.

## Layouts And Input Policies

The shared [app workspace](app-workspace.md) provides the full window calculator and profile reference sections. Layout providers operate within that shell and must preserve the live calculator controls and shared workflow anchors.

The `base` layout is the default for every profile that does not explicitly name another layout. It starts with the original damage calculator's core controls, including the IV, DV, EV, level, set, field, and format controls for each generation. It also provides KM Companion's shared workflow layer: Team/Box, Player Notes and Clear Notes, the trainer dropdown and trainer team sprites, save import and border controls, and the enhanced Singles and Doubles experience. The active profile still locks the generation selector to its declared base generation.

Layout and input behavior are independent profile layers:

```js
ui: {
    layout: "royal-sword"
},
inputs: {
    evs: "disabled"
}
```

`ui.layout` chooses a registered layout provider. `inputs.evs` accepts `generation-default` or `disabled`. Omitting either field selects `base` and `generation-default`. Royal Sword declares both custom values because its interface and EV exclusion rule are separate requirements.

Custom layouts are bundled source code, not imported data. Register the provider with `registerLayoutProvider(id, provider)` before a profile can activate it. The manager always mounts `base` first and layers the selected custom provider over it. A provider declares its stable ID and required calculator anchors, then uses `mount(runtime)` to apply only its scoped differences. `mount` must return a disposer that reverses those changes before another layout mounts. Register each cleanup with `runtime.deferCleanup(...)` before mutating the DOM so a failed mount can also unwind partial work.

The required calculator anchors include `.wrapper`, `#p1`, `#p2`, `.field-info`, `.calculator-import-column`, `.player-notes-controls`, `#team-box`, and the battle format controls. The manager checks them before and after mounting and preserves installed trainer and Doubles service nodes. A custom layout may move these tools for its game, but it must not remove them or make them exclusive to that layout. A provider that owns trainer control placement declares `ownsTrainerPlacement` and implements `refresh(runtime)` so rebuilding Select2 does not move those controls back to the base anchor.

The layout manager restores `base` while switching and restores the previous working layout if a new provider cannot mount. Scope custom CSS through `body[data-calc-layout="<layout-id>"]` instead of changing the standard layout globally.

## Adding Trainer Support Without Calculation Changes

For a mod whose battle data matches a canonical generation, create a trainer pack that follows [`trainer-pack-v1.schema.json`](schemas/trainer-pack-v1.schema.json) and test it through **Import Trainer Data**. An imported pack for one generation becomes a selectable tile automatically and uses the canonical calculator data, standard layout, shared workflow tools, and default generation input policies for that generation.

Trainer pack JSON cannot choose or execute a custom layout. If the mod creator wants a different interface, add it as a reviewed bundled layout provider and bind it from a bundled profile.

See [Trainer Data Packs](trainer-data-packs.md) and the [example pack](examples/trainer-pack.example.json) for the complete format and attribution requirements.

## Adding A Full Data Overlay

Mods that change species, forms, base stats, types, moves, abilities, items, or damage mechanics need a bundled profile and a generation override provider in addition to a trainer pack.

1. Register the profile in `src/js/data/rom_hacks.js`. Omit `ui.layout` to use `base`, or name a bundled registered layout provider.
2. Add a calculator `Generation` provider that composes the canonical base generation with the mod's overrides.
3. If the legacy UI needs data not represented by the `Generation` iterables, implement `getLegacyData(kind, base, calc, profile, context)` for `species`, `moves`, `abilities`, `items`, or `types`.
4. If the hack adds species or forms whose sprite filenames differ from the packaged canonical sprite set, implement `getPokemonSpriteId(name, calc, context)` or `getPokemonSpriteUrls(name, options, calc, context)` on the resolved provider. Sprite URLs must point to reviewed bundled assets or the packaged sprite protocol. Add every bundled asset to the root build allowlist. Imported trainer JSON cannot provide executable asset resolvers or remote URLs.
5. Set the profile's trainer pack and save import generation. If the hack changes its base game's save container or repurposes raw entity IDs, register a stable adapter through `window.KM_SAVE_IMPORT.registerSaveAdapter(...)`, set `saveImport.adapter` to that adapter ID, and provide its reviewed resolver. KM Companion rejects incompatible or partially unresolved saves before changing Team/Box data.
6. Set `inputs.evs` only when the hack changes EV behavior. Do not use layout code as a substitute for an input policy.
7. Declare exclusive profile features explicitly. Do not make another mod inherit Royal Sword behavior by default.
8. If a custom layout is required, register its provider, preserve the required anchors and shared workflow tools, return a complete disposer, and keep its CSS scoped to its layout ID.
9. Check the provider, chooser, standard to custom transitions, calculator, Team/Box, notes, trainer selection and sprites, save import, borders, battle formats, and trainer data locally before publication.

The browser registry is exposed as `window.kmRomHackRegistry`. Its stable integration points include `registerProfile`, `registerGenerationProvider`, `registerProfileOverrideProvider`, `registerLayoutProvider`, `getLayoutProvider`, `activateProfile`, `getActiveProfile`, `getActiveContext`, `getActiveGeneration`, `requestChooser`, and the `kmcalculator:romhackchange` event.

## Data And Credit Requirements

Every bundled or imported profile must identify the people or team who created its data, its public source, and the license or explicit permission that allows redistribution. Keep profile data versioned and isolated. Do not include ROM files, private research, saves, credentials, personal paths, or proprietary assets.
