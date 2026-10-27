# Save imports

Import Pokémon from a compatible save or standalone Pokémon file into the active profile's Team/Box workflow. Files are read locally and are not uploaded. Keep an untouched backup of the original save before importing it anywhere.

A successful import replaces the active profile's custom Pokémon sets and Team/Box layout. To preserve your current app run, use **Settings → Backup → Back Up Run** before choosing a save file.

## Import a file

1. Choose the profile for the ROM hack you are playing.
2. Open **Team & Boxes → Import / Export** from Calculator.
3. Select **Import From Save**, then choose your file. Import runs after file selection and reports the result.

File recognition and profile support are separate. Recognizing a save format does not add a ROM hack profile or make every species and form usable in your current game. If a supported entry cannot resolve through the active profile, import stops before replacing Team/Box data.

## Recognized save families

| Generation | Game families |
| --- | --- |
| 1 | Red, Blue, Yellow |
| 2 | Gold, Silver, Crystal |
| 3 | Ruby, Sapphire, Emerald; FireRed, LeafGreen |
| 4 | Diamond, Pearl, Platinum; HeartGold, SoulSilver |
| 5 | Black, White; Black 2, White 2 |
| 6 | X, Y; Omega Ruby, Alpha Sapphire |
| 7 | Sun, Moon; Ultra Sun, Ultra Moon; Let's Go, Pikachu! and Let's Go, Eevee! |
| 8 | Sword, Shield; Brilliant Diamond, Shining Pearl; Legends: Arceus |
| 9 | Scarlet, Violet; Legends: Z-A |

These are format families, not a guarantee for every dump. Compatibility depends on the exact regional save, storage layout, game update, and third party tool used to create or export the file. ROM hacks that change storage layouts may need a profile adapter. Unsupported or ambiguous structures stop import instead of being guessed.

## Standalone Pokémon files

The importer recognizes `.pk1` through `.pk9`, `.pb7`, `.pb8`, `.pa8`, and `.pa9`. Supported encrypted variants are `.ek3` through `.ek9`, `.eb7`, `.eb8`, `.ea8`, and `.ea9`.

An extension alone does not establish compatibility. The file must also match a supported structure, and its Pokémon must resolve through the selected profile. A newer file format does not extend that profile's generation or battle mechanics.

## Scope and recovery

The bundled profile is Pokémon Royal Sword. Other hacks need explicit integration for their changed species, forms, moves, mechanics, and save rules. See [ROM hack profiles](rom-hack-profiles.md) for those boundaries.

Save import is separate from **Settings → Backup → Restore Run**. A run backup preserves the app's selected profile data, including notes and tracking progress; a game save is not a replacement for that backup. See the [workspace guide](app-workspace.md#settings-and-run-backups) for backup scope and recovery.

When reporting a compatibility problem, provide the app version, profile, game and update, file format, and error message. Follow [Contributing](../CONTRIBUTING.md) and avoid posting private saves, ROMs, console keys, or personal data.
