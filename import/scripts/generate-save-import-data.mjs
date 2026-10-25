#!/usr/bin/env node

import {execFileSync} from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
import ts from "typescript";

const POKEAPI_REVISION = "17dd3092872cabcb7c008051771d2a2fd8c8c260";
const SHOWDOWN_REVISION = "54069be35a89f103e06aabcfbe624382179308af";
const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDirectory, "..", "..");
const outputPath = path.join(repositoryRoot, "src", "js", "data", "save_import_text.js");
const pokeapiRoot = process.env.POKEAPI_SOURCE_ROOT;
const showdownRoot = process.env.POKEMON_SHOWDOWN_SOURCE_ROOT;

if (!pokeapiRoot || !showdownRoot) {
	throw new Error("Set POKEAPI_SOURCE_ROOT and POKEMON_SHOWDOWN_SOURCE_ROOT to pinned source checkouts.");
}

function assertRevision(root, expected, label) {
	const actual = execFileSync("git", ["-C", root, "rev-parse", "HEAD"], {encoding: "utf8"}).trim();
	if (actual !== expected) throw new Error(`${label} must be checked out at ${expected}; found ${actual}`);
}

function parseCsvLine(line) {
	const values = [];
	let value = "";
	let quoted = false;
	for (let index = 0; index <= line.length; index++) {
		const character = line[index];
		if (character === "\"") {
			if (quoted && line[index + 1] === "\"") {
				value += "\"";
				index++;
			} else {
				quoted = !quoted;
			}
		} else if ((!quoted && character === ",") || index === line.length) {
			values.push(value);
			value = "";
		} else {
			value += character;
		}
	}
	return values;
}

function readCsv(name) {
	const csvPath = path.join(pokeapiRoot, "data", "v2", "csv", name);
	const lines = fs.readFileSync(csvPath, "utf8").trimEnd().split(/\r?\n/);
	const headers = parseCsvLine(lines.shift());
	return lines.map(line => {
		const values = parseCsvLine(line);
		return Object.fromEntries(headers.map((header, index) => [header, values[index]]));
	});
}

function propertyName(node) {
	if (ts.isIdentifier(node) || ts.isStringLiteral(node) || ts.isNumericLiteral(node)) return node.text;
	return "";
}

function literalValue(node) {
	if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
	if (ts.isNumericLiteral(node)) return Number(node.text);
	if (ts.isPrefixUnaryExpression(node) && node.operator === ts.SyntaxKind.MinusToken && ts.isNumericLiteral(node.operand)) {
		return -Number(node.operand.text);
	}
}

function readShowdownNumberedTable(fileName, variableName, maximum) {
	const sourcePath = path.join(showdownRoot, "data", fileName);
	const source = ts.createSourceFile(sourcePath, fs.readFileSync(sourcePath, "utf8"), ts.ScriptTarget.Latest, true);
	let table;
	for (const statement of source.statements) {
		if (!ts.isVariableStatement(statement)) continue;
		for (const declaration of statement.declarationList.declarations) {
			if (ts.isIdentifier(declaration.name) && declaration.name.text === variableName &&
					declaration.initializer && ts.isObjectLiteralExpression(declaration.initializer)) {
				table = declaration.initializer;
			}
		}
	}
	if (!table) throw new Error(`Unable to find ${variableName} in ${sourcePath}`);

	const result = [];
	for (const entry of table.properties) {
		if (!ts.isPropertyAssignment(entry) || !ts.isObjectLiteralExpression(entry.initializer)) continue;
		let number;
		let name;
		let generation;
		for (const field of entry.initializer.properties) {
			if (!ts.isPropertyAssignment(field)) continue;
			const key = propertyName(field.name);
			if (key === "num") number = literalValue(field.initializer);
			else if (key === "name") name = literalValue(field.initializer);
			else if (key === "gen") generation = literalValue(field.initializer);
		}
		if (!Number.isInteger(number) || number <= 0 || number > maximum || typeof name !== "string") continue;
		if (!result[number]) result[number] = {name, generation: generation || 1};
	}
	return result;
}

function readEnglishNames(fileName, idField, maximum) {
	const result = [];
	for (const row of readCsv(fileName)) {
		const id = Number(row[idField]);
		if (Number(row.local_language_id) === 9 && id > 0 && id <= maximum) result[id] = row.name;
	}
	return result;
}

function compactArray(array) {
	let end = array.length;
	while (end && array[end - 1] === undefined) end--;
	const compact = array.slice(0, end);
	for (let index = 0; index < compact.length; index++) if (compact[index] === undefined) compact[index] = null;
	return compact;
}

function fillMissingNames(target, entries) {
	for (let id = 1; id < entries.length; id++) {
		if (!target[id] && entries[id]) target[id] = entries[id].name;
	}
}

function titleFormSuffix(value) {
	return value.split("-").map(part => part === "pau" ? "Pa'u" :
		(part ? part[0].toUpperCase() + part.slice(1) : "")).join("-");
}

function getCalcFormName(baseName, baseIdentifier, formIdentifier) {
	let suffix = formIdentifier.startsWith(`${baseIdentifier}-`) ?
		formIdentifier.slice(baseIdentifier.length + 1) : formIdentifier;
	if (baseIdentifier === "necrozma" && suffix === "dusk") suffix = "dusk-mane";
	if (baseIdentifier === "necrozma" && suffix === "dawn") suffix = "dawn-wings";
	if (baseIdentifier === "ogerpon" && suffix.endsWith("-mask")) suffix = suffix.slice(0, -5);
	if (baseIdentifier === "darmanitan" && suffix === "galar-standard") suffix = "galar";
	if (baseIdentifier === "greninja" && suffix === "battle-bond") suffix = "bond";
	if (baseIdentifier === "rockruff" && suffix === "own-tempo") suffix = "dusk";
	if (baseIdentifier === "raticate" && suffix === "totem-alola") suffix = "alola";
	if (baseIdentifier === "marowak" && suffix === "totem") suffix = "alola";
	if (baseIdentifier === "mimikyu" && suffix === "totem-disguised") suffix = "";
	if (baseIdentifier === "mimikyu" && suffix === "totem-busted") suffix = "busted";
	if (baseIdentifier === "maushold" && suffix === "family-of-four") suffix = "four";
	if (baseIdentifier === "minior" && /-meteor$/.test(suffix)) suffix = "meteor";
	if (baseIdentifier === "minior" && !/-meteor$/.test(formIdentifier) && suffix !== "meteor") suffix = "";
	if (baseIdentifier === "zygarde" && suffix === "10-power-construct") suffix = "10";
	if (baseIdentifier === "zygarde" && suffix === "50-power-construct") suffix = "";
	suffix = suffix.replace(/-breed$/, "").replace(/-plumage$/, "").replace(/-cap$/, "");
	suffix = suffix.replace(/(^|-)female(?=-|$)/g, "$1f").replace(/(^|-)male(?=-|$)/g, "$1m");
	if (!suffix) return baseName;
	return `${baseName}-${titleFormSuffix(suffix)}`;
}

assertRevision(pokeapiRoot, POKEAPI_REVISION, "PokeAPI");
assertRevision(showdownRoot, SHOWDOWN_REVISION, "Pokemon Showdown");

const showdownSpecies = readShowdownNumberedTable("pokedex.ts", "Pokedex", 1025);
const showdownMoves = readShowdownNumberedTable("moves.ts", "Moves", 999);
const showdownItems = readShowdownNumberedTable("items.ts", "Items", 9999);
const showdownAbilities = readShowdownNumberedTable("abilities.ts", "Abilities", 999);

const species = readEnglishNames("pokemon_species_names.csv", "pokemon_species_id", 1025);
const moves = readEnglishNames("move_names.csv", "move_id", 999);
const abilities = readEnglishNames("ability_names.csv", "ability_id", 999);
fillMissingNames(species, showdownSpecies);
fillMissingNames(moves, showdownMoves);
fillMissingNames(abilities, showdownAbilities);
species[0] = "Egg";
moves[0] = "(No Move)";
abilities[0] = "";

const itemNames = new Map();
for (const row of readCsv("item_names.csv")) {
	if (Number(row.local_language_id) === 9) itemNames.set(Number(row.item_id), row.name);
}
const legacyItems = {2: [], 3: []};
const items = [];
for (const row of readCsv("item_game_indices.csv")) {
	const generation = Number(row.generation_id);
	const gameIndex = Number(row.game_index);
	const name = itemNames.get(Number(row.item_id));
	if (!name || !gameIndex) continue;
	if (generation === 2 || generation === 3) legacyItems[generation][gameIndex] = name;
	if (generation === 9) items[gameIndex] = name;
}
fillMissingNames(items, showdownItems);
items[0] = "None";
legacyItems[2][0] = "None";
legacyItems[3][0] = "None";

const pokemonSpecies = new Map(readCsv("pokemon.csv").map(row => [Number(row.id), Number(row.species_id)]));
const speciesIdentifiers = new Map(readCsv("pokemon_species.csv").map(row => [Number(row.id), row.identifier]));
const formNames = {};
for (const row of readCsv("pokemon_forms.csv")) {
	const formOrder = Number(row.form_order);
	const speciesId = pokemonSpecies.get(Number(row.pokemon_id));
	if (!speciesId || !Number.isInteger(formOrder) || formOrder <= 1 || !species[speciesId]) continue;
	if (!formNames[speciesId]) formNames[speciesId] = [];
	formNames[speciesId][formOrder - 1] = getCalcFormName(
		species[speciesId], speciesIdentifiers.get(speciesId) || "", row.identifier
	);
}
const speciesGameIndices = {1: [], 3: [], 9: []};
const versionToGeneration = new Map([[1, 1], [7, 3], [40, 9], [47, 9]]);
for (const row of readCsv("pokemon_game_indices.csv")) {
	const generation = versionToGeneration.get(Number(row.version_id));
	if (!generation) continue;
	const gameIndex = Number(row.game_index);
	const speciesId = pokemonSpecies.get(Number(row.pokemon_id));
	if (gameIndex && speciesId && !speciesGameIndices[generation][gameIndex]) speciesGameIndices[generation][gameIndex] = speciesId;
}
for (const map of Object.values(speciesGameIndices)) map[0] = 0;

const growthRates = [];
for (const row of readCsv("pokemon_species.csv")) growthRates[Number(row.id)] = Number(row.growth_rate_id);
growthRates[0] = 2;

const data = {
	sources: {
		pokeapi: {repository: "https://github.com/PokeAPI/pokeapi", revision: POKEAPI_REVISION, license: "BSD-3-Clause"},
		showdown: {repository: "https://github.com/smogon/pokemon-showdown", revision: SHOWDOWN_REVISION, license: "MIT"}
	},
	species: compactArray(species),
	moves: compactArray(moves),
	items: compactArray(items),
	abilities: compactArray(abilities),
	forms: Object.fromEntries(Object.entries(formNames).map(([id, names]) => [id, compactArray(names)])),
	legacyItems: {2: compactArray(legacyItems[2]), 3: compactArray(legacyItems[3])},
	speciesGameIndices: {
		1: compactArray(speciesGameIndices[1]),
		3: compactArray(speciesGameIndices[3]),
		9: compactArray(speciesGameIndices[9])
	},
	growthRates: compactArray(growthRates)
};

const header = `/*
 * Generated KM Companion save-import name/index data. Do not edit by hand.
 * Pokemon Showdown (MIT): ${SHOWDOWN_REVISION}
 * PokeAPI (BSD-3-Clause): ${POKEAPI_REVISION}
 * Full notices: import/THIRD_PARTY_NOTICES.md
 */
`;
const output = `${header}window.SAVE_IMPORT_TEXT = ${JSON.stringify(data)};\n`;
fs.writeFileSync(outputPath, output);
console.log(`Wrote ${path.relative(repositoryRoot, outputPath)}`);
