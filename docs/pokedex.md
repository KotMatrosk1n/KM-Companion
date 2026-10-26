# Dex

Open **Dex** between **Calculator** and **Encounters** to browse the selected ROM hack. The directory follows the full National Dex, from Bulbasaur at #0001 to Pecharunt at #1025. It includes entries beyond the base game's regional or generation roster.

Search by name, form name, or National Dex number. Accents, punctuation, several regional form spellings, and localized names are supported. Type, generation, and availability filters narrow the list while preserving National order. **In the game data** means the game marks a species or form as present. **Encounter listed** means an encounter exists in the bundled location guide. Neither label promises that every method of obtaining a Pokémon has been documented.

Select a Pokémon to view its forms, base stat numbers and total, and ability slots **1**, **2**, and **Hidden**. Repeated abilities remain visible in each slot because some ROM hacks deliberately assign the same ability to multiple slots. The stat ranges can switch between level 50 and level 100 and follow the profile's EV policy.

Pokémon with Mega Evolutions have **Base** and **Mega** buttons on their page. Charizard and Mewtwo have separate **Mega X** and **Mega Y** buttons. Selecting a Mega updates the picture, stats, types, and ability slots together. **Base** restores the profile's existing base record. Other forms retain their form selector. Each species keeps one directory entry and one National number.

The detail sections contain:

| Section | Information |
| --- | --- |
| Overview | Species classification, height, weight, gender ratio, color, generation, catch rate, friendship, experience, growth, EV yield, egg groups, egg cycles, dex numbers, wild held items, and type defenses |
| Evolution | The evolution family and the conditions stored in this ROM hack, with links to each Pokémon |
| Moves | Separate Level up, TM, TR, Tutor, and Egg subtabs, with search within the selected learnset; type, category, power, accuracy, PP, priority, and expandable effect descriptions |
| Where to find | Recorded encounter locations, methods, weather, levels, and rates |

Type defenses describe typing alone. Abilities, held items, weather, and other battle effects can change the damage received. Egg cycles are shown as stored in the game data; the guide does not assume a universal conversion to steps.

Moves opens on **Level up**, including moves learned on evolution. Choose **TM**, **TR**, **Tutor**, or **Egg** to browse that method separately. Search and pagination apply only to the selected subtab. Changing subtabs returns to its first page, and the selected method stays with the profile while navigating Pokémon and forms. Arrow keys, Home, and End navigate the move subtabs. A method without records displays an empty state.

The overview places official artwork, base stats, and abilities beside compact information cards. Labels and values share a row, stat ranges sit beside their bars, and each card takes only the height of its contents. Dex numbers share Pokémon data, wild held items share Training and breeding, and type defenses occupy their own compact card. Window width and usable height determine the arrangement and spacing, including app scaling and display DPI. The directory measures the actual remaining viewport for its page size. Search, selected form, and detail section survive navigation and are kept separately for each profile during the session.

## Official artwork

The main Pokémon picture uses official illustration artwork from the public [PokéAPI image repository](https://github.com/PokeAPI/sprites/tree/97a7832d307311c0e1c6ea9035308bf80cc94f81/sprites/pokemon/other/official-artwork). Attribution is retained in the app's [Credits](../CREDITS.md) and bundled notices. These illustrations are distinct from the small pixel sprites used in the directory. The artwork keeps its proportions inside a bounded area and does not reserve a large viewer panel.

Pokémon pictures are an optional download. At first launch, choose **Download artwork** to save the complete collection, or **No thanks** to use the app without Pokémon pictures. This includes the Dex illustrations and the static and animated sprites used elsewhere in the app. The current collection uses about 251 MiB. The app remains usable while the download runs, and declining does not trigger artwork requests or repeated prompts.

Open **Settings → Artwork** to download later, **Check artwork** against the collection for your app version, repair missing or damaged files, or pause a download. **Show Pokémon artwork** hides or restores pictures without removing saved files. Downloads reuse verified files and continue from the missing files after an interruption. Updates, repairs, and installing over an existing copy keep the collection for the same Windows account. Uninstall removes its downloaded illustrations and sprites while preserving saved teams, progress, notes, and settings. Installing again after uninstall requires another artwork download. A newer app version may add or change images; downloading then retrieves only the files needed for its inventory. Artwork is separate from run backups.

The installer contains the image inventories rather than the Pokémon picture files. Downloaded files stay in the app data folder and work offline. Opening a Pokémon only reads the saved image; it does not start a download. Artwork requests use HTTPS and do not send saves, teams, notes, or run progress. See [Artwork storage and delivery](pokedex-data.md#artwork-storage-and-delivery) for technical details.

Artwork is available for all 1,025 base National entries and many alternate forms. An exact form without an illustration displays an unavailable state. A missing saved image links to **Artwork settings**. Official illustrations may differ from a ROM hack's custom appearance. Artwork remains subject to its respective owners' rights.

## ROM hack coverage

Royal Sword includes extracted personal data and learnsets, plus its existing encounter guide. The National index supplies searchable names and species classification. It does not supply modern stats or learnsets as substitutes for missing ROM hack data. A National entry without a usable profile record displays **No profile data**.

Royal Sword's 48 supported Mega forms use the active calculator profile for combat values and the base record for shared breeding, training, learnset, and encounter information. Missing shared facts remain **Not recorded**. A calculator form does not establish that the Pokémon is catchable.

Royal Sword's extracted game data includes changes beyond the calculator's existing bounded stat overlay, including several Mega and Primal replacements. The Dex displays the extracted facts. Calculator behavior is unchanged by this feature. Official descriptions may also omit changed move effects or custom mechanics, so the descriptions should be read alongside the profile's rules.

For sources, regeneration, and profile integration, see [Dex data](pokedex-data.md). Mod authors should include the full Pokémon, move, encounter, and rule details described in the [submission guide](mod-submissions.md).
