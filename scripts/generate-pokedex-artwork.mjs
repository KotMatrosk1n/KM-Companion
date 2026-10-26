// SPDX-License-Identifier: GPL-3.0-only
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(import.meta.dirname, "..");
const revision = "97a7832d307311c0e1c6ea9035308bf80cc94f81";
const metadataRevision = "17dd3092872cabcb7c008051771d2a2fd8c8c260";
const directory = "sprites/pokemon/other/official-artwork/";
// Read a Git tree because Contents endpoints truncate large directories.
const parent = await fetch("https://api.github.com/repos/PokeAPI/sprites/git/trees/" + revision + ":" + directory.replace(/\/$/, ""), {headers: {"User-Agent": "KM-Companion"}});
if (!parent.ok) throw new Error("Could not read complete artwork tree: " + parent.status);
const tree = await parent.json();
if (tree.truncated) throw new Error("Incomplete artwork inventory");
const files = new Map(tree.tree.filter(entry => /^\d+\.png$/.test(entry.path) && entry.type === "blob").map(entry => [Number(entry.path.replace(".png", "")), entry]));
const pokemonResponse = await fetch("https://raw.githubusercontent.com/PokeAPI/pokeapi/" + metadataRevision + "/data/v2/csv/pokemon.csv");
if (!pokemonResponse.ok) throw new Error("Could not read pinned form names");
const pokemon = (await pokemonResponse.text()).trim().split(/\r?\n/).slice(1).map(line => { const values = line.split(","); return {id: Number(values[0]), identifier: values[1], number: Number(values[2])}; });
function id(name) { return name.toLowerCase().replace(/♀/g, "f").replace(/♂/g, "m").replace(/[^a-z0-9]/g, ""); }
const identifiers = new Map();
for (const entry of pokemon) {
  identifiers.set(id(entry.identifier), entry);
  identifiers.set(id(entry.identifier.replace(/-cap$/, "")), entry);
}
const context = {window: {}};
vm.runInNewContext(fs.readFileSync(path.join(root, "src/js/data/pokedex_royal_sword.js"), "utf8"), context);
const artwork = {};
function add(key, pokemonId) {
  const entry = files.get(pokemonId);
  if (entry) artwork[key] = {path: directory + entry.path, size: entry.size, sha: entry.sha, pokemonId};
}
for (let number = 1; number <= 1025; number++) add(number + ":0", number);
const aliases = {"Meowstic-F": "meowstic-female", "Indeedee-F": "indeedee-female", "Basculegion-F": "basculegion-female", "Necrozma-Dusk-Mane": "necrozma-dusk", "Necrozma-Dawn-Wings": "necrozma-dawn", "Darmanitan-Galar": "darmanitan-galar-standard", "Rockruff-Dusk": "rockruff-own-tempo", "Greninja-Bond": "greninja-battle-bond"};
for (const entry of context.window.KMPokedexProfiles["pokemon-royal-sword"].entries) {
  if (!entry.form) continue;
  const match = identifiers.get(id(aliases[entry.name] || entry.name));
  // A form may share the canonical name but must never silently use base artwork.
  if (match && match.number === entry.number && match.id !== entry.number) add(entry.key, match.id);
}
for (const form of context.window.KMPokedexProfiles["pokemon-royal-sword"].battleForms || []) add(form.key, form.artworkId);
if (Array.from({length: 1025}, (_, i) => i + 1).some(number => !artwork[number + ":0"])) throw new Error("National artwork is incomplete");
const manifest = {version: 1, repository: "https://github.com/PokeAPI/sprites", revision, metadataRevision, baseUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/" + revision + "/", artwork};
fs.writeFileSync(path.join(root, "src/data/pokedex-artwork.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log("Official artwork inventory: " + Object.keys(artwork).length + " species/form mappings");
