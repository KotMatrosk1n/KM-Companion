// SPDX-License-Identifier: GPL-3.0-only
// Semantic facts only. Original game archives and text sources are never copied.
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import crypto from "node:crypto";
import {createRequire} from "node:module";

const revision = "17dd3092872cabcb7c008051771d2a2fd8c8c260";
const root = path.resolve(import.meta.dirname, "..");
const cache = path.resolve(process.env.POKEDEX_SOURCE_CACHE || path.join(root, ".cache/pokedex-sources"));
const mod = process.env.POKEDEX_MOD_ROOT;
const base = process.env.POKEDEX_BASE_ROOT;
if (!mod || !base) throw new Error("Set POKEDEX_MOD_ROOT and POKEDEX_BASE_ROOT to the mod and base folders containing romfs.");
const hashes = {};
function readGame(relative, optional = false) {
  const file = [mod, base].map(dir => path.join(dir, "romfs/bin/pml", relative)).find(file => fs.existsSync(file));
  if (!file) { if (optional) return null; throw new Error("Missing game data: " + relative); }
  const bytes = fs.readFileSync(file);
  hashes[relative] = crypto.createHash("sha256").update(bytes).digest("hex");
  return bytes;
}
function csv(text) {
  const rows = []; let row = [], value = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '"') { if (quoted && text[i + 1] === '"') { value += ch; i++; } else quoted = !quoted; }
    else if (!quoted && (ch === "," || ch === "\n")) {
      row.push(value.replace(/\r$/, "")); value = "";
      if (ch === "\n") { rows.push(row); row = []; }
    } else value += ch;
  }
  if (quoted) throw new Error("Unclosed CSV field");
  if (row.length || value) { row.push(value); rows.push(row); }
  const header = rows.shift();
  return rows.filter(row => row.length === header.length).map(row => Object.fromEntries(header.map((name, i) => [name, row[i]])));
}
async function table(name) {
  fs.mkdirSync(cache, {recursive: true});
  const target = path.join(cache, revision + "-" + name);
  if (!fs.existsSync(target)) {
    const response = await fetch("https://raw.githubusercontent.com/PokeAPI/pokeapi/" + revision + "/data/v2/csv/" + name);
    if (!response.ok) throw new Error("Could not read " + name + ": " + response.status);
    fs.writeFileSync(target, Buffer.from(await response.arrayBuffer()));
  }
  return csv(fs.readFileSync(target, "utf8"));
}
const [species, names, pokemon] = await Promise.all([
  table("pokemon_species.csv"), table("pokemon_species_names.csv"), table("pokemon.csv")
]);
const context = {window: {}};
vm.runInNewContext(fs.readFileSync(path.join(root, "src/js/data/save_import_text.js"), "utf8"), context);
const text = context.window.SAVE_IMPORT_TEXT;
const english = new Map(names.filter(row => row.local_language_id === "9").map(row => [+row.pokemon_species_id, row]));
const catalog = species.filter(row => +row.id <= 1025).map(row => {
  const number = +row.id;
  return {number, name: text.species[number], slug: row.identifier, generation: +row.generation_id,
    genus: english.get(number)?.genus || "", legendary: row.is_legendary === "1", mythical: row.is_mythical === "1",
    baby: row.is_baby === "1",
    names: names.filter(entry => +entry.pokemon_species_id === number).map(entry => ({language: +entry.local_language_id, name: entry.name}))};
});
if (catalog.length !== 1025 || catalog.some((entry, i) => entry.number !== i + 1 || !entry.name)) throw new Error("National Dex coverage is incomplete");
const types = ["Normal", "Fighting", "Flying", "Poison", "Ground", "Rock", "Bug", "Ghost", "Steel", "Fire", "Water", "Grass", "Electric", "Psychic", "Ice", "Dragon", "Dark", "Fairy"];
const eggs = ["Unknown", "Monster", "Water 1", "Bug", "Flying", "Field", "Fairy", "Grass", "Human Like", "Water 3", "Mineral", "Amorphous", "Water 2", "Ditto", "Dragon", "Undiscovered"];
const growth = ["Medium Fast", "Erratic", "Fluctuating", "Medium Slow", "Fast", "Slow"];
const tm = [5,25,6,7,8,9,19,42,63,416,345,76,669,83,86,91,103,113,115,219,120,156,157,168,173,182,184,196,202,204,211,213,201,240,241,258,250,251,261,263,129,270,279,280,286,291,311,313,317,328,331,333,340,341,350,362,369,371,372,374,384,385,683,409,419,421,422,423,424,427,433,472,478,440,474,490,496,506,512,514,521,523,527,534,541,555,566,577,580,581,604,678,595,598,206,403,684,693,707,784];
const tr = [14,34,53,56,57,58,59,67,85,87,89,94,97,116,118,126,127,133,141,161,164,179,188,191,200,473,203,214,224,226,227,231,242,247,248,253,257,269,271,276,285,299,304,315,322,330,334,337,339,347,348,349,360,370,390,394,396,398,399,402,404,405,406,408,411,412,413,414,417,428,430,437,438,441,442,444,446,447,482,484,486,492,500,502,503,526,528,529,535,542,583,599,605,663,667,675,676,706,710,776];
const personal = readGame("personal/personal_total.bin");
const learn = readGame("waza_oboe/wazaoboe_total.bin");
if (personal.length % 176 || learn.length !== personal.length / 176 * 260) throw new Error("Inconsistent personal and learnset tables");
const records = personal.length / 176;
const formLabels = {25: ["Pikachu", "Pikachu-Original", "Pikachu-Hoenn", "Pikachu-Sinnoh", "Pikachu-Unova", "Pikachu-Kalos", "Pikachu-Alola", "Pikachu-Partner", "Pikachu-Starter", "Pikachu-World"], 718: ["Zygarde", "Zygarde-10", "Zygarde-10-Power-Construct", "Zygarde-Power-Construct", "Zygarde-Complete"]};
function formName(number, form) {
  return formLabels[number]?.[form] || (form ? text.forms[number]?.[form] : text.species[number]) || text.species[number] + " form " + form;
}
function eggMoves(number, form) {
  let bytes = readGame("tamagowaza/tamagowaza_" + String(number).padStart(4, "0") + ".bin", true);
  if (!bytes) return [];
  if (form && bytes.readUInt16LE(0)) bytes = readGame("tamagowaza/tamagowaza_" + String(bytes.readUInt16LE(0) + form - 1).padStart(4, "0") + ".bin", true);
  if (!bytes) return [];
  const count = bytes.readUInt16LE(2);
  if (bytes.length !== 4 + count * 2) throw new Error("Invalid egg move table");
  return Array.from({length: count}, (_, i) => ({id: bytes.readUInt16LE(4 + i * 2), method: "Egg"}));
}
const entries = [];
for (let number = 1; number <= 898; number++) {
  const main = personal.subarray(number * 176, (number + 1) * 176);
  for (let form = 0; form < Math.max(1, main[32]); form++) {
    const index = form && main.readUInt16LE(30) ? main.readUInt16LE(30) + form - 1 : number;
    if (index >= records) throw new Error("Form outside personal table");
    const p = personal.subarray(index * 176, (index + 1) * 176);
    const moves = [];
    for (let slot = 0; slot < 65; slot++) {
      const off = index * 260 + slot * 4, id = learn.readUInt16LE(off), level = learn.readUInt16LE(off + 2);
      if (id === 65535 && level === 65535) break;
      if (!id || !text.moves[id] || level > 100) throw new Error("Invalid level move for " + number + ":" + form);
      moves.push({id, method: "Level", level});
    }
    [[40, tm, "TM"], [60, tr, "TR"], [56, [520,519,518,338,307,308,434,796], "Tutor"], [168, [805,807,812,804,803,813,811,810,815,814,797,806,800,809,799,808,798,802], "Tutor"]].forEach(([offset, ids, method]) => ids.forEach((id, i) => {
      if (p[offset + (i >> 3)] & (1 << (i % 8))) moves.push({id, method, ...(method === "Tutor" ? {} : {machine: method + String(i).padStart(2, "0")})});
    }));
    moves.push(...eggMoves(number, form));
    const evo = readGame("evolution/evo_" + String(index).padStart(3, "0") + ".bin", true), evolutions = [];
    if (evo) {
      if (evo.length !== 72) throw new Error("Invalid evolution table");
      for (let off = 0; off < 72; off += 8) if (evo.readUInt16LE(off)) evolutions.push({method: evo.readUInt16LE(off), argument: evo.readUInt16LE(off + 2), number: evo.readUInt16LE(off + 4), form: evo.readInt8(off + 6), level: evo[off + 7]});
    }
    const ev = p.readUInt16LE(10);
    entries.push({key: number + ":" + form, number, form, name: formName(number, form), present: !!(p[33] & 64),
      stats: [p[0], p[1], p[2], p[4], p[5], p[3]], types: [...new Set([types[p[6]], types[p[7]]])],
      abilities: [24,26,28].map(off => text.abilities[p.readUInt16LE(off)] || null),
      height: p.readUInt16LE(36) / 100, weight: p.readUInt16LE(38) / 10,
      color: ["Red", "Blue", "Yellow", "Green", "Black", "Brown", "Purple", "Gray", "White", "Pink"][p[33] & 63] || null,
      catchRate: p[8], friendship: p[20], gender: p[18], hatchCycles: p[19], growth: growth[p[21]],
      eggGroups: [...new Set([eggs[p[22]], eggs[p[23]]])], baseExperience: p.readUInt16LE(34),
      evYield: [0,2,4,8,10,6].map(shift => (ev >> shift) & 3),
      heldItems: [12,14,16].map(off => text.items[p.readUInt16LE(off)] || null),
      dexNumbers: {Galar: p.readUInt16LE(92), "Isle of Armor": p.readUInt16LE(172), "Crown Tundra": p.readUInt16LE(174)}, moves, evolutions});
  }
}
const moveData = {};
for (const id of new Set(entries.flatMap(entry => entry.moves.map(move => move.id)))) {
  const bytes = readGame("waza/waza" + String(id).padStart(4, "0") + ".wazabin", true);
  if (!bytes) throw new Error("Missing move " + id);
  const table = bytes.readUInt32LE(0), vtable = table - bytes.readInt32LE(table), len = bytes.readUInt16LE(vtable);
  function field(index, signed = false) {
    const position = 4 + index * 2;
    const off = position < len ? bytes.readUInt16LE(vtable + position) : 0;
    return off ? (signed ? bytes.readInt8(table + off) : bytes[table + off]) : 0;
  }
  moveData[id] = {name: text.moves[id], type: types[field(3)], category: ["Status", "Physical", "Special"][field(5)], power: field(6), accuracy: field(7), pp: field(8), priority: field(9, true)};
}
const sources = {pokeapi: {repository: "https://github.com/PokeAPI/pokeapi", revision, license: "BSD-3-Clause"}};
// The profile's calculator supplies combat values at runtime. This metadata only
// identifies supported National species and the dimensions of their Mega forms.
const calc = createRequire(import.meta.url)("../calc/dist");
const battleForms = [];
for (const form of calc.RoyalSwordGenerations.get(8).species) {
  if (!/-Mega(?:-[XY])?$/.test(form.name)) continue;
  const baseSpecies = catalog.find(entry => entry.name.replace(/[^a-z0-9]/gi, "").toLowerCase() === (form.baseSpecies || "").replace(/[^a-z0-9]/gi, "").toLowerCase());
  if (!baseSpecies) continue;
  const suffix = form.name.match(/-Mega(?:-([XY]))?$/)[1];
  const identifier = baseSpecies.slug + "-mega" + (suffix ? "-" + suffix.toLowerCase() : "");
  const metadata = pokemon.find(row => row.identifier === identifier && Number(row.species_id) === baseSpecies.number);
  if (!metadata) throw new Error("Missing Mega metadata: " + form.name);
  const variant = "mega" + (suffix ? "-" + suffix.toLowerCase() : "");
  battleForms.push({key: baseSpecies.number + ":" + variant, number: baseSpecies.number, form: variant, formKind: "mega", calcName: form.name, buttonLabel: "Mega" + (suffix ? " " + suffix : ""), height: Number(metadata.height) / 10, artworkId: Number(metadata.id)});
}
function write(filename, assignment, data) {
  fs.writeFileSync(path.join(root, "src/js/data", filename), "/*global window */\n/* Generated by scripts/generate-pokedex.mjs. See docs/pokedex-data.md for sources. */\n" + assignment + " = " + JSON.stringify(data) + ";\n");
}
write("pokedex_catalog.js", "window.KMPokedexCatalog", {version: 1, sources, species: catalog});
write("pokedex_royal_sword.js", "window.KMPokedexProfiles", {"pokemon-royal-sword": {version: 1, profileId: "pokemon-royal-sword", source: "Royal Sword game data", sourceHashes: hashes, entries, battleForms, moves: moveData}});
console.log(JSON.stringify({species: catalog.length, forms: entries.length, present: entries.filter(entry => entry.present).length, learnsetRows: entries.reduce((n, entry) => n + entry.moves.length, 0), moves: Object.keys(moveData).length, inputs: Object.keys(hashes).length}));
