# Contributing to KM Companion

KM Companion supports canonical Pokemon Generations 1 through 9 and explicit ROM hack profiles layered over them. Contributions are welcome across calculation mechanics, generation data, profile overlays, trainer packs, save compatibility, desktop workflows, documentation, accessibility, packaging, and issue reports.

The best contribution is not necessarily the largest one. A focused correction that preserves generation and profile boundaries is worth far more than a broad rewrite that quietly mixes one game's rules into another.

## Choose the right starting point

Before opening a new issue, search the existing issues and check the repository documentation. Then choose the route that best matches the problem:

* **Bug Report** for crashes, broken controls, profile selection failures, storage problems, installer behavior, updater behavior, or another app workflow that does not work.
* **Calculation or Data Error** for incorrect damage, stats, mechanics, species, forms, moves, abilities, items, trainer data, or import results.
* **ROM Hack or Trainer Data** for a new selectable profile, bounded data overlay, attributed trainer pack, save adapter, profile layout, or exclusive profile tool.
* **Feature Request** for a new workflow, compatibility improvement, or user experience change.
* **Docs or Guides** for unclear, missing, or outdated public documentation.
* **Security Policy** for private reports involving trust boundaries, unsafe file access, private data, dependencies, installer behavior, updater integrity, or release integrity.

Use [Discussions](https://github.com/KotMatrosk1n/KM-Companion/discussions) for general questions and early ideas that are not ready for a focused issue.

Please reproduce bugs on the latest public release when possible. If no current KM Companion build has been published, give the source commit you tested.

## Write a report someone can reproduce

A useful report includes:

* The KM Companion version or source commit.
* The active ROM hack profile and canonical base generation.
* The battle format or app workflow involved.
* The shortest repeatable steps.
* What you expected and what happened instead.
* The exact error text or calculation inputs needed to reproduce the result.
* Whether a save, trainer pack, or profile adapter was involved, along with its public name and version.

Screenshots are useful when they show the relevant control, value, or result. Crop out account names, local paths, notifications, save details, and unrelated applications first.

Do not upload ROMs, game dumps, console keys, executable game files, copyrighted assets, private saves, credentials, signing keys, access tokens, personal data, complete generated mods, or private trainer research. Usually a public source link, format name, synthetic example, and short description are enough to begin an investigation.

## Calculation and data reports

Include the complete inputs that materially affect the result: species or form, level, move, ability, item, nature, IVs or DVs, EVs, boosts, status, field, weather, battle format, generation, and active profile.

Link a public authoritative source or a reproducible comparison when one exists. Clearly distinguish canonical game behavior from ROM hack behavior. A rule specific to a profile should not be presented as a change to the canonical generation beneath it.

## ROM hack profiles and trainer data

Start with the project goal and the smallest integration boundary that supports it. A new contribution should identify:

* The ROM hack or mod and its canonical base generation.
* Whether it needs a profile, calculation overlay, trainer pack, save adapter, exclusive profile feature, or a combination of them.
* Stable profile and pack identifiers.
* The data authors, maintainers, public source, version, and license or explicit redistribution permission.
* The exact species, forms, stats, types, moves, abilities, items, trainers, mechanics, or save layout that differ from the base generation.
* Whether the standard calculator layout is sufficient or a bundled custom layout is required.
* Whether any input policy differs from the generation default, such as disabling EV input.
* A maintenance path for future project updates.

Keep overlays bounded. Do not copy an entire canonical generation when a small provider can express the differences. Trainer packs must keep attribution and permission metadata attached, and imported data must not replace bundled data silently.

Profiles default to the standard calculator layout, which combines the original calculator controls with KM Companion's shared Team/Box, Player Notes and Clear Notes, trainer dropdown and team sprites, save import and border controls, and enhanced Singles and Doubles workflows. A custom layout may rearrange this shared workflow layer, but it must keep those tools available and functional. It must be a registered bundled provider, preserve the required calculator anchors, scope its styling and behavior to its layout ID, and return a disposer that reverses its changes before another profile mounts. Layout selection and input policy are separate decisions. Hiding EV controls does not disable EVs by itself, and disabling EVs does not authorize unrelated layout changes.

Custom species and forms need a reviewed sprite resolution path. Prefer a packaged canonical sprite ID when one exists. Otherwise add the smallest permitted profile asset, include it in the build allowlist, and return it through the profile provider. Trainer pack JSON cannot inject asset URLs or executable resolver behavior.

Trainer pack JSON cannot select or execute a custom layout. If a mod creator requests a custom interface, submit the provider as reviewed source code and keep the imported data format declarative.

Do not submit another person's data without permission. External repositories may be useful references, but their source, generated tables, comments, and names do not automatically belong in KM Companion. Follow their licenses and document permitted provenance.

## Development setup

Development requires Node.js 24 or a later compatible release and npm. The [development guide](docs/development.md) covers cloning, running, and packaging the desktop app. Installer prerequisites and optional local signing are documented in the [Windows installer guide](installer/windows/README.md).

After cloning the repository, install the locked dependencies:

```powershell
npm ci
```

Start the desktop development build with `npm run electron:dev`. The root [`package.json`](package.json) remains the source of truth for development, build, and packaging commands.

Run the public repository checks before submitting a change:

```powershell
npm run build
npm run lint
npm run check:workspace
npm run check:third-party-notices
```

The public repository intentionally does not ship calculator tests, save import fixtures, or the simulator smoke package. Temporary local validation is welcome when it helps verify a change, but submitted diffs must not add tracked test runners, fixtures, result files, smoke logs, or dependencies used only for testing unless the maintainer explicitly changes that policy.

## Make changes that are safe to review

Keep pull requests focused. Explain user impact and root cause for a fix, or the complete user workflow for a feature.

Canonical generation data and mechanics must remain isolated from ROM hack overlays. Similar controls or names do not prove that two generations or profiles share the same behavior. Verify every generation and profile that a change claims to support.

An active profile owns its declared base generation. Keep the generation selector locked to that generation until the profile is cleared or changed. Every control that a layout exposes must remain functional; do not restore or display an unsupported calculator mode as decoration.

Treat saves, trainer packs, profile metadata, updater responses, and installer state as untrusted input. Reject unsupported or ambiguous structures instead of guessing. Preserve local app data and remove only files the application can prove it owns.

Avoid unrelated formatting or generated file churn. Do not commit local output, caches, build artifacts, release artifacts, scratch research, private fixtures, internal notes, local filesystem paths, credentials, signing material, or copyrighted assets.

## Verification and documentation

Verify the affected workflow locally with synthetic or legally distributable inputs. For profile changes, confirm the standard layout, the custom layout, and the transition back to the standard layout. Check that the shared workflow tools remain usable in both layouts and that layout state, input policies, data providers, trainer lists, save context, and optional features do not leak between profiles. For installer or updater changes, preserve the documented ownership, signature, migration, and user consent boundaries.

Update public documentation when behavior, supported formats, schemas, profile requirements, project setup, credits, or troubleshooting steps change. Public text should describe shipped behavior and public limitations, not private research history or local development context.

The pull request template uses **Summary** and **What Changed**. Keep the public description focused on shipped behavior. Do not include local validation commands, results, private paths, private fixtures, or internal process notes.

## Pull request checklist

Before opening a pull request, make sure:

* The change is scoped and unrelated local work is excluded.
* The affected generations, profiles, imports, or desktop workflows were verified locally.
* Temporary files, diagnostics, generated output, and private data are absent from the public diff.
* Canonical behavior remains isolated from each profile's behavior.
* Profile layouts mount and dispose cleanly, preserve required calculator controls and shared workflow tools, and leave the standard layout functional.
* Data authors, sources, versions, licenses, and redistribution permission are recorded where required.
* User documentation and credits are updated when the shipped workflow changed.
* Original project code and documentation are compatible with [GPLv3](LICENSE), while separately licensed components, data, and assets retain their notices and permission for the proposed use. See [LICENSING.md](LICENSING.md).

By submitting original project code or documentation, you agree that it may be distributed under GNU GPL version 3 only. Contributions to the separately MIT licensed engine, import data tools, or installer remain under those components' MIT licenses. Separately licensed third party code, data, and assets retain their documented terms and must be submitted with permission that covers the proposed use.
