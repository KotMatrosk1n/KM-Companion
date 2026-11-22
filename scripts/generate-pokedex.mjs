// SPDX-License-Identifier: GPL-3.0-only
// Semantic facts only. Original game archives and text sources are never copied.
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import crypto from "node:crypto";

const revision = "17dd3092872cabcb7c008051771d2a2fd8c8c260";
const root = path.resolve(import.meta.dirname, "..");
const cache = path.resolve(process.env.POKEDEX_SOURCE_CACHE || path.join(root, ".cache/pokedex-sources"));
const mod = process.env.POKEDEX_MOD_ROOT;
const base = process.env.POKEDEX_BASE_ROOT;
if (!mod || !base) throw new Error("Set POKEDEX_MOD_ROOT and POKEDEX_BASE_ROOT to the mod and base folders containing romfs.");
const identities = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, "royal-sword-identities.json"), "utf8"));
const hashes = {};
function readGame(relative, {optional = false, modOnly = false, directory = "pml"} = {}) {
  const file = (modOnly ? [mod] : [mod, base]).map(dir => path.join(dir, "romfs/bin", directory, relative)).find(file => fs.existsSync(file));
  if (!file) { if (optional) return null; throw new Error("Missing game data: " + relative); }
  const bytes = fs.readFileSync(file);
  hashes[directory + "/" + relative] = crypto.createHash("sha256").update(bytes).digest("hex");
  return bytes;
}

// Sword and Shield message tables store UTF-16 words with a rotating per-line key.
// These three name tables need only plain display names, not script markup.
const messageDirectory = "message/English/common";
function decodeGameNames(bytes, filename) {
  const section = bytes.readUInt32LE(12), count = bytes.readUInt16LE(2);
  if (bytes.readUInt16LE(0) !== 1 || section + bytes.readUInt32LE(4) !== bytes.length ||
      section + 4 + count * 8 > bytes.length) throw new Error("Invalid name table " + filename);
  return Array.from({length: count}, (_, i) => {
    const row = section + 4 + i * 8;
    const offset = section + bytes.readUInt32LE(row), length = bytes.readUInt16LE(row + 4);
    if (offset < section + 4 + count * 8 || offset + length * 2 > bytes.length) throw new Error("Invalid name row " + i);
    let key = (0x7c89 + i * 0x2983) & 0xffff;
    let name = "";
    for (let j = 0; j < length; j++) {
      const word = bytes.readUInt16LE(offset + j * 2) ^ key;
      if (!word) break;
      if (word < 32) return "";
      name += String.fromCharCode(word);
      key = ((key << 3) | (key >>> 13)) & 0xffff;
    }
    return name.trim();
  });
}
function gameNames(filename) {
  return decodeGameNames(readGame(filename, {directory: messageDirectory}), filename);
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
const [species, names] = await Promise.all([
  table("pokemon_species.csv"), table("pokemon_species_names.csv")
]);
const context = {window: {}};
vm.runInNewContext(fs.readFileSync(path.join(root, "src/js/data/save_import_text.js"), "utf8"), context);
const text = context.window.SAVE_IMPORT_TEXT;
const gameSpecies = gameNames("monsname.dat");
const gameAbilities = gameNames("tokusei.dat");
const gameItems = gameNames("itemname.dat");
const gameMoves = gameNames("wazaname.dat");
const keyFor = name => name.replace(/♀/g, "-F").replace(/♂/g, "-M").normalize("NFKD").toLowerCase().replace(/[^a-z0-9]/g, "");
const calcName = name => name.replace(/♀/g, "-F").replace(/♂/g, "-M");
const baseItemPath = path.join(base, "romfs/bin", messageDirectory, "itemname.dat");
const baseItems = decodeGameNames(fs.readFileSync(baseItemPath), "base itemname.dat");
const itemNames = Object.fromEntries(gameItems.flatMap((name, id) => {
  return id && name && name !== "???" && name !== baseItems[id] ? [[id, name]] : [];
}));
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
const items = readGame("item/item.dat");
const machineOffset = 0x44 + items.readUInt16LE(2) * 2;
const machines = Array.from({length: 200}, (_, i) => items.readUInt16LE(machineOffset + i * 4 + 2));
if (machines.some(id => !gameMoves[id])) throw new Error("Invalid TM or TR table");
const tm = machines.slice(0, 100), tr = machines.slice(100);
const personal = readGame("personal/personal_total.bin");
const learn = readGame("waza_oboe/wazaoboe_total.bin");
if (personal.length % 176 || learn.length !== personal.length / 176 * 260) throw new Error("Inconsistent personal and learnset tables");
const records = personal.length / 176;
const basePersonal = fs.readFileSync(path.join(base, "romfs/bin/pml/personal/personal_total.bin"));
const formRecord = (table, i) => table.subarray(i * 176, (i + 1) * 176);
const formIndex = (row, index, form) => form && row.readUInt16LE(30) ? row.readUInt16LE(30) + form - 1 : index;
const formLabels = {25: ["Pikachu", "Pikachu-Original", "Pikachu-Hoenn", "Pikachu-Sinnoh", "Pikachu-Unova", "Pikachu-Kalos", "Pikachu-Alola", "Pikachu-Partner", "Pikachu-Starter", "Pikachu-World"], 718: ["Zygarde", "Zygarde-10", "Zygarde-10-Power-Construct", "Zygarde-Power-Construct", "Zygarde-Complete"]};
const megaForms = new Map(identities.megaForms.map(row => [row[0] + ":" + row[1], row]));
const itemName = id => itemNames[id] || text.items[id] || null;
const moveName = id => text.moves[id] || gameMoves[id];
const abilityAliases = {263: "Dragon's Maw", 266: "As One (Glastrier)", 267: "As One (Spectrier)"};
const abilityName = id => abilityAliases[id] || (id && (id >= 268 ? gameAbilities[id] : text.abilities[id] || gameAbilities[id])) || null;
function formName(number, form, mega) {
  const baseName = text.species[number];
  const label = mega?.[2] || identities.forms[number + ":" + form];
  if (label) return label.startsWith("-") ? baseName + label : label;
  return formLabels[number]?.[form] || (form ? text.forms[number]?.[form] : baseName) || baseName + " form " + form;
}
function eggMoves(index, form, sameIndex, formeIndex) {
  const readEgg = (id, modOnly) => readGame("tamagowaza/tamagowaza_" + String(id).padStart(4, "0") + ".bin", {optional: true, modOnly});
  let bytes = readEgg(index, index > 898);
  if (!bytes) return [];
  if (form) {
    const separate = bytes.readUInt16LE(0);
    const dedicated = index > 898 || !sameIndex ? readEgg(formeIndex, true) : null;
    if (dedicated) bytes = dedicated;
    else if (separate) bytes = readEgg(separate + form - 1, !sameIndex);
  }
  if (!bytes) return [];
  const count = bytes.readUInt16LE(2);
  if (bytes.length !== 4 + count * 2) throw new Error("Invalid egg move table");
  return Array.from({length: count}, (_, i) => ({id: bytes.readUInt16LE(4 + i * 2), method: "Egg"}));
}
const entries = [];
const consumedPresentRows = new Set();
const displacedFormRows = new Set();
for (let number = 1; number <= 1025; number++) {
  const baseIndex = identities.personalIndexOverrides[number] || (number <= 898 ? number : number + identities.extendedPersonalOffset);
  const main = formRecord(personal, baseIndex);
  const original = number <= 898 ? formRecord(basePersonal, number) : null;
  if (main.length !== 176) throw new Error("Missing personal row for " + number);
  if (number > 898 && gameSpecies[number] && keyFor(gameSpecies[number]) !== keyFor(text.species[number])) throw new Error("Unexpected species name at " + number);
  if (original && original.readUInt16LE(30) !== main.readUInt16LE(30)) {
    for (let form = 1; form < original[32]; form++) displacedFormRows.add(formIndex(original, number, form));
  }
  for (let form = 0; form < Math.max(1, main[32]); form++) {
    const index = formIndex(main, baseIndex, form);
    if (index >= records) throw new Error("Form outside personal table");
    const p = formRecord(personal, index);
    const key = number + ":" + form;
    const mega = megaForms.get(key);
    const sameIndex = !!original && (!form || (form < original[32] && index === formIndex(original, number, form)));
    const present = !!(p[33] & 64);
    if (present) consumedPresentRows.add(index);
    const moves = [];
    for (let slot = 0; slot < 65; slot++) {
      const off = index * 260 + slot * 4, id = learn.readUInt16LE(off), level = learn.readUInt16LE(off + 2);
      if (id === 65535 && level === 65535) break;
      if (!id || !moveName(id) || level > 100) throw new Error("Invalid level move for " + key);
      moves.push({id, method: "Level", level});
    }
    [[40, tm, "TM"], [60, tr, "TR"], [56, [520,519,518,338,307,308,434,796], "Tutor"], [168, [805,807,812,804,803,813,811,810,815,814,797,806,800,809,799,808,798,802], "Tutor"]].forEach(([offset, ids, method]) => ids.forEach((id, i) => {
      if (p[offset + (i >> 3)] & (1 << (i % 8))) moves.push({id, method, ...(method === "Tutor" ? {} : {machine: method + String(i).padStart(2, "0")})});
    }));
    if (p[0]) moves.push(...eggMoves(baseIndex, form, sameIndex, index));
    const evo = p[0] && readGame("evolution/evo_" + String(index).padStart(3, "0") + ".bin", {optional: true, modOnly: !sameIndex}), evolutions = [];
    if (evo) {
      if (evo.length !== 72) throw new Error("Invalid evolution table");
      for (let off = 0; off < 72; off += 8) if (evo.readUInt16LE(off)) evolutions.push({method: evo.readUInt16LE(off), argument: evo.readUInt16LE(off + 2), number: evo.readUInt16LE(off + 4), form: evo.readInt8(off + 6), level: evo[off + 7]});
    }
    const ev = p.readUInt16LE(10);
    const abilityIds = [24,26,28].map(off => p.readUInt16LE(off));
    if (present && abilityIds.some(id => id && !abilityName(id))) throw new Error("Unknown ability at " + key + ": " + abilityIds);
    entries.push({key, number, form, name: formName(number, form, mega), present,
      ...(mega ? {formKind: "mega", baseKey: number + ":" + mega[4], buttonLabel: mega[2].match(/-Mega-([XYZ])$/) ? "Mega " + mega[2].slice(-1) : mega[2] === "Meowstic-Mega-F" ? "Mega Female" : mega[2] === "Magearna-Original-Mega" ? "Mega Original" : "Mega"} : {}),
      stats: [p[0], p[1], p[2], p[4], p[5], p[3]], types: [...new Set([types[p[6]], types[p[7]]])],
      abilities: abilityIds.map(abilityName),
      height: p.readUInt16LE(36) / 100, weight: p.readUInt16LE(38) / 10,
      color: ["Red", "Blue", "Yellow", "Green", "Black", "Brown", "Purple", "Gray", "White", "Pink"][p[33] & 63] || null,
      catchRate: p[8], friendship: p[20], gender: p[18], hatchCycles: p[19], growth: growth[p[21]],
      eggGroups: [...new Set([eggs[p[22]], eggs[p[23]]])], baseExperience: p.readUInt16LE(34),
      evYield: [0,2,4,8,10,6].map(shift => (ev >> shift) & 3),
      heldItems: [12,14,16].map(off => itemName(p.readUInt16LE(off))),
      dexNumbers: {Galar: p.readUInt16LE(92), "Isle of Armor": p.readUInt16LE(172), "Crown Tundra": p.readUInt16LE(174)}, moves, evolutions});
  }
}
if (entries.filter(entry => entry.formKind === "mega" && entry.present).length !== megaForms.size) throw new Error("Mega mapping does not match personal data");
for (let i = 1; i < records; i++) {
  if ((formRecord(personal, i)[33] & 64) && !consumedPresentRows.has(i) && !displacedFormRows.has(i)) {
    throw new Error("Unmapped present personal row: " + i);
  }
}
const moveData = {};
const referencedMoves = new Set(entries.flatMap(entry => entry.moves.map(move => move.id)));
function moveField(bytes, index) {
  const table = bytes.readUInt32LE(0), vtable = table - bytes.readInt32LE(table);
  const position = 4 + index * 2;
  const off = position < bytes.readUInt16LE(vtable) ? bytes.readUInt16LE(vtable + position) : 0;
  return off ? (index === 9 ? bytes.readInt8(table + off) : bytes[table + off]) : 0;
}
for (let id = 1; id < gameMoves.length; id++) {
  if (!gameMoves[id]) continue;
  const filename = "waza/waza" + String(id).padStart(4, "0") + ".wazabin";
  const bytes = readGame(filename);
  const original = fs.readFileSync(path.join(base, "romfs/bin/pml", filename));
  const field = index => moveField(bytes, index);
  const type = types[field(3)], category = ["Status", "Physical", "Special"][field(5)];
  if (!type || !category) throw new Error("Unknown battle attributes for move " + id);
  const inflictChance = field(13), statChance = field(29);
  moveData[id] = {name: moveName(id), type, category, power: field(6), accuracy: field(7), pp: field(8), priority: field(9),
    usable: !!field(2),
    statusChance: inflictChance !== moveField(original, 13) ? inflictChance : null,
    statChance: statChance !== moveField(original, 29) ? statChance : null};
}
for (const id of referencedMoves) if (!moveData[id]) throw new Error("Missing referenced move " + id);
const sources = {pokeapi: {repository: "https://github.com/PokeAPI/pokeapi", revision, license: "BSD-3-Clause"}};
const abilities = Object.fromEntries(Object.entries(identities.abilityDescriptions).map(([id, description]) => [keyFor(abilityName(+id)), description]));
const abilityNames = {...abilityAliases, ...Object.fromEntries(gameAbilities.flatMap((name, id) => id >= 268 && name ? [[id, name]] : []))};
const changedEffects = {
  123: ["statusChance", "Poison the target"], 190: ["statChance", "Lower the target’s accuracy by one stage"],
  249: ["statChance", "Lower the target’s Defense by one stage"], 426: ["statChance", "Lower the target’s accuracy by one stage"],
  429: ["statChance", "Lower the target’s accuracy by one stage"], 451: ["statChance", "Raise the user’s Special Attack by one stage"],
  536: ["statChance", "Lower the target’s accuracy by one stage"], 539: ["statChance", "Lower the target’s accuracy by one stage"]
};
const moveDescriptions = Object.fromEntries(Object.entries(changedEffects).map(([id, [field, description]]) => {
  const chance = moveData[id][field];
  if (chance === null) throw new Error("Changed effect is missing from move " + id);
  return [id, description + " on " + chance + "% of hits."];
}));
const battleSpecies = entries.filter(entry => entry.present && entry.stats.every(stat => stat > 0));
const namesByForm = new Map(battleSpecies.map(entry => [entry.key, entry.name]));
const stones = new Map();
for (const [number, form, , id, baseForm] of identities.megaForms) {
  if (!id) continue;
  const item = itemName(id), from = namesByForm.get(number + ":" + baseForm), to = namesByForm.get(number + ":" + form);
  if (!item || !from || !to) throw new Error("Unresolved Mega Stone " + id + " for " + number + ":" + form);
  if (!stones.has(item)) stones.set(item, {});
  stones.get(item)[from] = to;
}
function writeCalculatorData() {
  const source = ["// Generated by scripts/generate-pokedex.mjs. See docs/pokedex-data.md for sources."];
  function literal(value) {
    if (typeof value === "string") return "'" + value.replace(/\\/g, "\\\\").replace(/'/g, "\\'") + "'";
    if (Array.isArray(value)) return "[" + value.map(literal).join(", ") + "]";
    if (value && typeof value === "object") {
      return "{" + Object.entries(value).map(([key, name]) => (/^[a-z_$][\w$]*$/i.test(key) ? key : literal(key)) + ": " + literal(name)).join(", ") + "}";
    }
    return String(value);
  }
  const writeRows = (name, rows) => {
    source.push("export const " + name + " = [");
    for (const row of rows) {
      const line = "  " + literal(row) + ",";
      if (line.length <= 100) source.push(line);
      else source.push("  [", ...row.map(value => "    " + literal(value) + ","), "  ],");
    }
    source.push("] as const;", "");
  };
  writeRows("SPECIES_DATA", battleSpecies.map(entry => {
    const base = entry.form ? namesByForm.get(entry.baseKey || entry.number + ":0") || text.species[entry.number] : null;
    const gender = {0: "M", 254: "F", 255: "N"}[entry.gender] || null;
    return [calcName(entry.name), base && calcName(base), entry.stats, entry.types, entry.weight, entry.abilities, gender, entry.evolutions.length > 0];
  }));
  writeRows("MOVE_DATA", Object.values(moveData).map(move => [move.name, move.type, move.category, move.power, move.accuracy, move.pp, move.priority, move.usable, move.statusChance, move.statChance]));
  writeRows("ABILITY_DATA", Object.values(abilityNames));
  writeRows("ITEM_DATA", [...new Set(["Smoke Ball", ...Object.values(itemNames), ...stones.keys()])].map(name => [name, stones.get(name) || null]));
  fs.writeFileSync(path.join(root, "calc/src/data/royal-sword-data.ts"), source.join("\n"));
}
function write(filename, assignment, data) {
  const target = path.join(root, "src/js/data", filename);
  const content = "/*global window */\n/* Generated by scripts/generate-pokedex.mjs. See docs/pokedex-data.md for sources. */\n" + assignment + " = " + JSON.stringify(data) + ";\n";
  if (!fs.existsSync(target) || fs.readFileSync(target, "utf8").replace(/\r\n/g, "\n") !== content) fs.writeFileSync(target, content);
}
writeCalculatorData();
write("pokedex_catalog.js", "window.KMPokedexCatalog", {version: 1, sources, species: catalog});
write("pokedex_royal_sword.js", "window.KMPokedexProfiles", {"pokemon-royal-sword": {
  version: 2, profileId: "pokemon-royal-sword", source: "Royal Sword game data", sourceHashes: hashes, entries, moves: moveData, moveDescriptions, abilities, abilityNames, itemNames
}});
console.log(JSON.stringify({species: catalog.length, forms: entries.length, present: entries.filter(entry => entry.present).length, learnsetRows: entries.reduce((n, entry) => n + entry.moves.length, 0), moves: Object.keys(moveData).length, inputs: Object.keys(hashes).length}));
