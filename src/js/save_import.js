/*global SAVE_IMPORT_TEXT, Uint8Array, addToDex, allPokemon, calc, checkExceptionsImport,
clearTeamBoxState, getZeroEVs, removeAllCustomSetsFromDex */

/*
 * Main-series Pokemon save and entity import.
 *
 * Format behavior was checked against PKHeX at the exact revision below. PKHeX is
 * GPL-3.0; that revision remains an external validation reference. The parser
 * implementation is independently written. The Switch XOR constant below is
 * included under PKHeX's GPLv3 terms; generated names/public game-index facts
 * retain the permissive notices in data/save_import_text.js.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 * Copyright (c) 2026 Matroskin
 * Licensing notice updated 2026-10-20; parsing behavior and constants unchanged.
 * See LICENSE and import/THIRD_PARTY_NOTICES.md.
 *
 * PKHeX revision: 6169d60cfdd2bfe30e17805f8677523e8d498d67
 * https://github.com/kwsch/PKHeX/commit/6169d60cfdd2bfe30e17805f8677523e8d498d67
 */

var SAVE_IMPORT_VALIDATION_SOURCE = {
	repository: "https://github.com/kwsch/PKHeX",
	revision: "6169d60cfdd2bfe30e17805f8677523e8d498d67",
	license: "GPL-3.0",
	usage: "validation-only"
};

var SWISH_HASH_SIZE = 0x20;
var SWITCH_BOX_BLOCK_KEY = 0x0d66012c;
var SWSH_ITEM_BLOCK_KEY = 0x1177c2c4;
var SWSH_PARTY_BLOCK_KEY = 0x2985fe5d;
var PLA_BOX_BLOCK_KEY = 0x47e1ceab;
var SV_PARTY_BLOCK_KEY = 0x3aa1a9ad;
var SAVE_IMPORT_BAG_ITEMS_KEY = "kmCalculatorImportedBagItems";
/* Compatibility-only read key for inventory imported before the KM Companion rebrand. */
var SAVE_IMPORT_LEGACY_BAG_ITEMS_KEY = "royalSwordImportedBagItems";
var SAVE_IMPORT_HELD_ITEM_POUCHES = [
	{offset: 0x01B8, count: 80},
	{offset: 0x02F8, count: 550}
];

/*
 * Switch save-container XOR constant from PKHeX, by kwsch and contributors,
 * distributed here under GPL-3.0-only. The 127 values match StaticXorpad at:
 * https://github.com/kwsch/PKHeX/blob/cefb56a749a1e2b434516d4cd27c4d3886a63ec1/PKHeX.Core/Saves/MemeCrypto/SwishCrypto.cs
 * Adaptation: JavaScript array/name in place of the C# declaration; values unchanged.
 * The upstream license at that revision is LICENSE.md (GNU GPL version 3).
 */
var SWISH_STATIC_XORPAD = [
	0xA0, 0x92, 0xD1, 0x06, 0x07, 0xDB, 0x32, 0xA1, 0xAE, 0x01, 0xF5, 0xC5, 0x1E, 0x84, 0x4F, 0xE3,
	0x53, 0xCA, 0x37, 0xF4, 0xA7, 0xB0, 0x4D, 0xA0, 0x18, 0xB7, 0xC2, 0x97, 0xDA, 0x5F, 0x53, 0x2B,
	0x75, 0xFA, 0x48, 0x16, 0xF8, 0xD4, 0x8A, 0x6F, 0x61, 0x05, 0xF4, 0xE2, 0xFD, 0x04, 0xB5, 0xA3,
	0x0F, 0xFC, 0x44, 0x92, 0xCB, 0x32, 0xE6, 0x1B, 0xB9, 0xB1, 0x2E, 0x01, 0xB0, 0x56, 0x53, 0x36,
	0xD2, 0xD1, 0x50, 0x3D, 0xDE, 0x5B, 0x2E, 0x0E, 0x52, 0xFD, 0xDF, 0x2F, 0x7B, 0xCA, 0x63, 0x50,
	0xA4, 0x67, 0x5D, 0x23, 0x17, 0xC0, 0x52, 0xE1, 0xA6, 0x30, 0x7C, 0x2B, 0xB6, 0x70, 0x36, 0x5B,
	0x2A, 0x27, 0x69, 0x33, 0xF5, 0x63, 0x7B, 0x36, 0x3F, 0x26, 0x9B, 0xA3, 0xED, 0x7A, 0x53, 0x00,
	0xA4, 0x48, 0xB3, 0x50, 0x9E, 0x14, 0xA0, 0x52, 0xDE, 0x7E, 0x10, 0x2B, 0x1B, 0x77, 0x6E
];


var SAVE_IMPORT_NATURES = [
	"Hardy", "Lonely", "Brave", "Adamant", "Naughty",
	"Bold", "Docile", "Relaxed", "Impish", "Lax",
	"Timid", "Hasty", "Serious", "Jolly", "Naive",
	"Modest", "Mild", "Quiet", "Bashful", "Rash",
	"Calm", "Gentle", "Sassy", "Careful", "Quirky"
];

var SAVE_IMPORT_TERA_TYPES = [
	"Normal", "Fighting", "Flying", "Poison", "Ground", "Rock", "Bug", "Ghost", "Steel",
	"Fire", "Water", "Grass", "Electric", "Psychic", "Ice", "Dragon", "Dark", "Fairy"
];

var SAVE_IMPORT_HIDDEN_POWER_TYPES = [
	"Fighting", "Flying", "Poison", "Ground", "Rock", "Bug", "Ghost", "Steel",
	"Fire", "Water", "Grass", "Electric", "Psychic", "Ice", "Dragon", "Dark"
];

var SAVE_IMPORT_BASE_FORM_ALIASES = {
	"Aegislash": "Aegislash-Shield"
};

var ENTITY_FORMATS = {
	pk1: {id: "pk1", generation: 1, storedSize: 33, partySize: 44, parser: parsePK1},
	pk2: {id: "pk2", generation: 2, storedSize: 32, partySize: 48, parser: parsePK2},
	pk3: {id: "pk3", generation: 3, storedSize: 80, partySize: 100, blockSize: 12, crypto: "3", parser: parsePK3},
	pk4: {id: "pk4", generation: 4, storedSize: 136, partySize: 236, blockSize: 32, crypto: "45", parser: parsePK4},
	pk5: {id: "pk5", generation: 5, storedSize: 136, partySize: 220, blockSize: 32, crypto: "45", parser: parsePK5},
	pk6: {id: "pk6", generation: 6, storedSize: 232, partySize: 260, blockSize: 56, crypto: "67", parser: parsePK67},
	pk7: {id: "pk7", generation: 7, storedSize: 232, partySize: 260, blockSize: 56, crypto: "67", parser: parsePK67},
	pb7: {id: "pb7", generation: 7, storedSize: 232, partySize: 260, blockSize: 56, crypto: "67", parser: parsePK67},
	pk8: {id: "pk8", generation: 8, storedSize: 328, partySize: 344, blockSize: 80, crypto: "8", parser: parseG8},
	pb8: {id: "pb8", generation: 8, storedSize: 328, partySize: 344, blockSize: 80, crypto: "8", parser: parseG8},
	pa8: {id: "pa8", generation: 8, storedSize: 360, partySize: 376, blockSize: 88, crypto: "8a", parser: parsePA8},
	pk9: {id: "pk9", generation: 9, storedSize: 328, partySize: 344, blockSize: 80, crypto: "8", parser: parseG8},
	pa9: {id: "pa9", generation: 9, storedSize: 328, partySize: 344, blockSize: 80, crypto: "8", parser: parseG8}
};

var ENTITY_EXTENSION_FORMATS = {
	pk1: "pk1", pk2: "pk2", pk3: "pk3", ek3: "pk3", pk4: "pk4", ek4: "pk4",
	pk5: "pk5", ek5: "pk5", pk6: "pk6", ek6: "pk6", pk7: "pk7", ek7: "pk7",
	pb7: "pb7", eb7: "pb7", pk8: "pk8", ek8: "pk8", pb8: "pb8", eb8: "pb8",
	pa8: "pa8", ea8: "pa8", pk9: "pk9", ek9: "pk9", pa9: "pa9", ea9: "pa9"
};

var saveImportNameMaps = {};

function getSaveImportStorage() {
	return window.getRoyalSwordStorage ? window.getRoyalSwordStorage() : localStorage;
}

var saveImportBagItemsByWorkspace = {};

function getSaveImportWorkspaceStorageKey(kind) {
	if (typeof window.getKMCalculatorProfileWorkspaceStorageKey === "function") {
		return window.getKMCalculatorProfileWorkspaceStorageKey(kind);
	}
	return kind === "customsets" ? "customsets" : SAVE_IMPORT_BAG_ITEMS_KEY;
}

function getSaveImportCustomSetsStorageKey() {
	return typeof window.getKMCalculatorCustomSetsStorageKey === "function" ?
		window.getKMCalculatorCustomSetsStorageKey() : "customsets";
}

function copyBytes(data, start, end) {
	var copy = new Uint8Array(end - start);
	copy.set(data.subarray(start, end));
	return copy;
}

function readU16(data, offset) {
	return data[offset] | (data[offset + 1] << 8);
}

function readU16BE(data, offset) {
	return (data[offset] << 8) | data[offset + 1];
}

function readU24BE(data, offset) {
	return ((data[offset] << 16) | (data[offset + 1] << 8) | data[offset + 2]) >>> 0;
}

function readU32(data, offset) {
	return (data[offset] | (data[offset + 1] << 8) | (data[offset + 2] << 16) | (data[offset + 3] << 24)) >>> 0;
}

function writeU16(data, offset, value) {
	data[offset] = value & 0xff;
	data[offset + 1] = (value >>> 8) & 0xff;
}

function writeU32(data, offset, value) {
	data[offset] = value & 0xff;
	data[offset + 1] = (value >>> 8) & 0xff;
	data[offset + 2] = (value >>> 16) & 0xff;
	data[offset + 3] = (value >>> 24) & 0xff;
}

function containsNonZero(data, start, end) {
	for (var i = start; i < end; i++) if (data[i]) return true;
	return false;
}

function add16(data, start, end) {
	var checksum = 0;
	for (var i = start; i < end; i += 2) checksum = (checksum + readU16(data, i)) & 0xffff;
	return checksum;
}

function crc16CCITT(data, start, length) {
	var top = 0xff;
	var bottom = 0xff;
	var end = start + length;
	for (var i = start; i < end; i++) {
		var value = data[i] ^ top;
		value ^= value >>> 4;
		top = (bottom ^ (value >>> 3) ^ (value << 4)) & 0xff;
		bottom = (value ^ (value << 5)) & 0xff;
	}
	return (top << 8) | bottom;
}

function switchXorShiftWord(value) {
	value ^= value << 2;
	value ^= value >>> 15;
	value ^= value << 13;
	return value >>> 0;
}

function createSwitchByteStream(seed) {
	var state = seed >>> 0;
	var seedBits = state;
	var byteOffset = 0;
	while (seedBits) {
		if ((seedBits & 1) !== 0) state = switchXorShiftWord(state);
		seedBits >>>= 1;
	}
	return {
		takeByte: function () {
			var value = (state >>> (byteOffset * 8)) & 0xff;
			byteOffset = (byteOffset + 1) & 3;
			if (byteOffset === 0) state = switchXorShiftWord(state);
			return value;
		},
		takeWord: function () {
			var value = 0;
			for (var shift = 0; shift < 32; shift += 8) value |= this.takeByte() << shift;
			return value >>> 0;
		}
	};
}

var SWITCH_VALUE_TYPE_SIZES = {
	3: 1, 8: 1, 12: 1,
	9: 2, 13: 2,
	10: 4, 14: 4, 16: 4,
	11: 8, 15: 8, 17: 8
};

function getSwitchValueTypeSize(type) {
	var size = SWITCH_VALUE_TYPE_SIZES[type];
	if (!size) throw new Error("Unsupported save block type " + type);
	return size;
}

function cryptStaticXorpadBytes(data) {
	for (var i = 0; i < data.length; i++) data[i] ^= SWISH_STATIC_XORPAD[i % SWISH_STATIC_XORPAD.length];
}

function decryptSwitchBlockPayload(data, offset, length, stream) {
	if (offset + length > data.length) throw new Error("Invalid Switch save block length");
	var result = copyBytes(data, offset, offset + length);
	for (var i = 0; i < result.length; i++) result[i] ^= stream.takeByte();
	return result;
}

function readSwitchBlock(data, start) {
	if (start + 5 > data.length) throw new Error("Unexpected end of Switch save block data");
	var cursor = start;
	var key = readU32(data, cursor);
	cursor += 4;
	var stream = createSwitchByteStream(key);
	var type = data[cursor++] ^ stream.takeByte();
	var payloadLength = 0;

	if (type === 4) {
		payloadLength = (readU32(data, cursor) ^ stream.takeWord()) >>> 0;
		cursor += 4;
	} else if (type === 5) {
		var elementCount = (readU32(data, cursor) ^ stream.takeWord()) >>> 0;
		cursor += 4;
		if (cursor >= data.length) throw new Error("Unexpected end of Switch save array block");
		var elementType = data[cursor++] ^ stream.takeByte();
		payloadLength = elementCount * getSwitchValueTypeSize(elementType);
	} else if (type !== 1 && type !== 2 && type !== 3) {
		payloadLength = getSwitchValueTypeSize(type);
	}

	var raw = decryptSwitchBlockPayload(data, cursor, payloadLength, stream);
	return {block: {key: key, type: type, raw: raw}, nextOffset: cursor + payloadLength};
}

function readSwishBlocks(data) {
	if (data.length <= SWISH_HASH_SIZE) throw new Error("File is too small to be a Switch save");
	var payload = copyBytes(data, 0, data.length - SWISH_HASH_SIZE);
	var blocks = [];
	var offset = 0;
	cryptStaticXorpadBytes(payload);
	while (offset < payload.length) {
		var parsed = readSwitchBlock(payload, offset);
		blocks.push(parsed.block);
		offset = parsed.nextOffset;
	}
	return blocks;
}

function findSaveBlock(blocks, key) {
	for (var i = 0; i < blocks.length; i++) if (blocks[i].key === key) return blocks[i].raw;
}

function cryptLCRNG(data, start, end, seed) {
	for (var i = start; i < end; i += 2) {
		seed = (Math.imul(0x41C64E6D, seed) + 0x6073) >>> 0;
		writeU16(data, i, readU16(data, i) ^ (seed >>> 16));
	}
}

function cryptGen3(data, seed) {
	for (var i = 0x20; i < 0x50; i += 4) writeU32(data, i, readU32(data, i) ^ seed);
}

function getPokemonBlockOrder(value) {
	var remaining = [0, 1, 2, 3];
	var permutation = [];
	var divisors = [6, 2, 1, 1];
	var inverse = [0, 1, 2, 3];
	var index = ((value % 24) + 24) % 24;
	for (var i = 0; i < 4; i++) {
		var selected = Math.floor(index / divisors[i]);
		index %= divisors[i];
		permutation.push(remaining.splice(selected, 1)[0]);
	}
	for (i = 0; i < permutation.length; i++) inverse[permutation[i]] = i;
	return inverse;
}

function shufflePokemonBlocks(data, start, blockSize, sv) {
	if (!sv) return;
	var permutation = [0, 1, 2, 3];
	var slotOf = [0, 1, 2, 3];
	var blockOrder = getPokemonBlockOrder(sv);
	for (var i = 0; i < 3; i++) {
		var desired = blockOrder[i];
		var swapIndex = slotOf[desired];
		if (swapIndex === i) continue;
		for (var n = 0; n < blockSize; n++) {
			var a = start + (i * blockSize) + n;
			var b = start + (swapIndex * blockSize) + n;
			var tmp = data[a];
			data[a] = data[b];
			data[b] = tmp;
		}
		var blockAtI = permutation[i];
		permutation[swapIndex] = blockAtI;
		slotOf[blockAtI] = swapIndex;
	}
}

function isEntityEncrypted(data, config) {
	if (config.crypto === "3") return add16(data, 0x20, 0x50) !== readU16(data, 0x1C);
	if (config.crypto === "45") return readU32(data, 0x64) !== 0;
	if (config.crypto === "67") return readU16(data, 0xC8) !== 0 || readU16(data, 0x58) !== 0;
	if (config.crypto === "8") return readU16(data, 0x70) !== 0 || readU16(data, 0x110) !== 0;
	if (config.crypto === "8a") return readU16(data, 0x78) !== 0 || readU16(data, 0x128) !== 0;
	return false;
}

function decryptEntityData(input, format, force) {
	var config = typeof format === "string" ? ENTITY_FORMATS[format] : format;
	if (!config) throw new Error("Unsupported Pokemon entity format");
	var data = copyBytes(input, 0, input.length);
	if (!config.crypto || (!force && !isEntityEncrypted(data, config))) return data;
	var pv = readU32(data, 0);
	var sv;
	if (config.crypto === "3") {
		var seed3 = pv ^ readU32(data, 4);
		cryptGen3(data, seed3);
		shufflePokemonBlocks(data, 0x20, config.blockSize, pv % 24);
		return data;
	}
	sv = (pv >>> 13) & 31;
	var seed = config.crypto === "45" ? readU16(data, 6) : pv;
	cryptLCRNG(data, 8, config.storedSize, seed);
	if (data.length > config.storedSize) cryptLCRNG(data, config.storedSize, data.length, pv);
	shufflePokemonBlocks(data, 8, config.blockSize, sv);
	return data;
}

function isEntityChecksumValid(data, config) {
	if (config.generation < 3) return true;
	if (config.crypto === "3") return add16(data, 0x20, config.storedSize) === readU16(data, 0x1C);
	return readU16(data, 4) === 0 && add16(data, 8, config.storedSize) === readU16(data, 6);
}

function getNationalSpecies(raw, generation) {
	var maps = SAVE_IMPORT_TEXT.speciesGameIndices || {};
	var table = maps[generation];
	if (!table) return raw;
	if (raw >= 0 && raw < table.length) return table[raw] || 0;
	return generation === 9 ? raw : 0;
}

function getItemSourceName(raw, generation) {
	var legacy = SAVE_IMPORT_TEXT.legacyItems || {};
	var table = legacy[generation] || SAVE_IMPORT_TEXT.items;
	return raw >= 0 && raw < table.length ? (table[raw] || "") : "";
}

function readMoveIds(data, offset) {
	return [readU16(data, offset), readU16(data, offset + 2), readU16(data, offset + 4), readU16(data, offset + 6)];
}

function readByteMoveIds(data, offset) {
	return [data[offset], data[offset + 1], data[offset + 2], data[offset + 3]];
}

function getIVs(iv32) {
	return {
		hp: iv32 & 0x1f,
		at: (iv32 >>> 5) & 0x1f,
		df: (iv32 >>> 10) & 0x1f,
		sp: (iv32 >>> 15) & 0x1f,
		sa: (iv32 >>> 20) & 0x1f,
		sd: (iv32 >>> 25) & 0x1f
	};
}

function applyHyperTraining(ivs, flags) {
	if ((flags & 1) !== 0) ivs.hp = 31;
	if ((flags & 2) !== 0) ivs.at = 31;
	if ((flags & 4) !== 0) ivs.df = 31;
	if ((flags & 8) !== 0) ivs.sa = 31;
	if ((flags & 16) !== 0) ivs.sd = 31;
	if ((flags & 32) !== 0) ivs.sp = 31;
	return ivs;
}

function getAbilitySlotIndex(abilityNumber) {
	if ((abilityNumber & 4) !== 0) return 2;
	if ((abilityNumber & 2) !== 0) return 1;
	return 0;
}

function getEffectiveTeraType(data, config) {
	if (config.id !== "pk9") return;
	var original = data[0x94];
	var override = data[0x95];
	var type;
	if (override <= 17 || override === 99) type = override;
	else if (override === 19) type = original;
	else return "Normal";
	if (type === 99) return "Stellar";
	return SAVE_IMPORT_TERA_TYPES[type] || "Normal";
}

function getByteEVs(data, offset) {
	return {hp: data[offset], at: data[offset + 1], df: data[offset + 2], sp: data[offset + 3], sa: data[offset + 4], sd: data[offset + 5]};
}

function statExperienceToEV(value) {
	if (!value) return 0;
	return Math.min(252, Math.floor((Math.sqrt(value - 1) + 1) / 4) * 4);
}

function getGBDVs(dv16) {
	var attack = (dv16 >>> 12) & 15;
	var defense = (dv16 >>> 8) & 15;
	var speed = (dv16 >>> 4) & 15;
	var special = dv16 & 15;
	var hp = ((attack & 1) << 3) | ((defense & 1) << 2) | ((speed & 1) << 1) | (special & 1);
	return {hp: hp, at: attack, df: defense, sp: speed, sa: special, sd: special};
}

function getGBIVs(dvs) {
	return {hp: dvs.hp * 2, at: dvs.at * 2, df: dvs.df * 2, sp: dvs.sp * 2, sa: dvs.sa * 2, sd: dvs.sd * 2};
}

function getGBEVs(data, offset) {
	var special = statExperienceToEV(readU16BE(data, offset + 8));
	return {
		hp: statExperienceToEV(readU16BE(data, offset)),
		at: statExperienceToEV(readU16BE(data, offset + 2)),
		df: statExperienceToEV(readU16BE(data, offset + 4)),
		sp: statExperienceToEV(readU16BE(data, offset + 6)),
		sa: special,
		sd: special
	};
}

function getGen2UnownForm(dv16) {
	var attack = (dv16 >>> 12) & 15;
	var defense = (dv16 >>> 8) & 15;
	var speed = (dv16 >>> 4) & 15;
	var special = dv16 & 15;
	var value = ((attack & 6) << 5) | ((defense & 6) << 3) |
		((speed & 6) << 1) | ((special & 6) >>> 1);
	return Math.floor(value / 10);
}

function getGen3UnownForm(pid) {
	var value = ((pid & 0x03000000) >>> 18) | ((pid & 0x00030000) >>> 12) |
		((pid & 0x00000300) >>> 6) | (pid & 3);
	return value % 28;
}

function decodePokemonString(data, offset, byteLength, generation) {
	var chars = [];
	for (var i = 0; i < byteLength; i += 2) {
		var code = readU16(data, offset + i);
		if (code === 0 || code === 0xffff) break;
		if (generation === 5 && code === 0x246d) code = 0x2642;
		else if (generation === 5 && code === 0x246e) code = 0x2640;
		else if (generation >= 6 && code === 0xe08e) code = 0x2642;
		else if (generation >= 6 && code === 0xe08f) code = 0x2640;
		if (generation >= 6 && code >= 0xe000 && code <= 0xf8ff) return "";
		chars.push(String.fromCharCode(code));
	}
	return chars.join("");
}

function getExperienceAtLevel(level, growth) {
	if (level <= 1) return 0;
	var cube = level * level * level;
	if (growth === 2) return cube;
	if (growth === 5) {
		if (level <= 50) return Math.floor(cube * (100 - level) / 50);
		if (level <= 68) return Math.floor(cube * (150 - level) / 100);
		if (level <= 98) return Math.floor(cube * Math.floor((1911 - (10 * level)) / 3) / 500);
		return Math.floor(cube * (160 - level) / 100);
	}
	if (growth === 6) {
		if (level <= 15) return Math.floor(cube * (Math.floor((level + 1) / 3) + 24) / 50);
		if (level <= 36) return Math.floor(cube * (level + 14) / 50);
		return Math.floor(cube * (Math.floor(level / 2) + 32) / 50);
	}
	if (growth === 4) return Math.max(0, Math.floor((6 * cube / 5) - (15 * level * level) + (100 * level) - 140));
	if (growth === 3) return Math.floor(4 * cube / 5);
	return Math.floor(5 * cube / 4);
}

function getLevelFromExperience(experience, species) {
	var growth = SAVE_IMPORT_TEXT.growthRates[species] || 2;
	for (var level = 2; level <= 100; level++) if (experience < getExperienceAtLevel(level, growth)) return level - 1;
	return 100;
}

function getEntityLevel(data, config, offset, experience, species) {
	if (data.length > config.storedSize && offset < data.length && data[offset] >= 1 && data[offset] <= 100) return data[offset];
	return getLevelFromExperience(experience, species);
}

function parsePK1(data, config) {
	var rawSpecies = data[0];
	var species = getNationalSpecies(rawSpecies, 1);
	var experience = readU24BE(data, 0x0E);
	var dvs = getGBDVs(readU16BE(data, 0x1B));
	return {
		generation: 1, species: species, rawSpecies: rawSpecies, form: 0, item: 0, abilityIndex: null,
		moves: readByteMoveIds(data, 8), experience: experience,
		level: data.length > config.storedSize ? data[0x21] : (data[3] || getLevelFromExperience(experience, species)),
		dvs: dvs, ivs: getGBIVs(dvs), evs: getGBEVs(data, 0x11), nature: 12
	};
}

function parsePK2(data, config) {
	var species = data[0];
	var experience = readU24BE(data, 8);
	var dv16 = readU16BE(data, 0x15);
	var dvs = getGBDVs(dv16);
	return {
		generation: 2, species: species, rawSpecies: species, form: species === 201 ? getGen2UnownForm(dv16) : 0,
		item: data[1], abilityIndex: null,
		moves: readByteMoveIds(data, 2), experience: experience,
		level: data[0x1F] || getLevelFromExperience(experience, species),
		dvs: dvs, ivs: getGBIVs(dvs), evs: getGBEVs(data, 0x0B), nature: 12
	};
}

function parsePK3(data, config) {
	var iv32 = readU32(data, 0x48);
	var rawSpecies = readU16(data, 0x20);
	var species = getNationalSpecies(rawSpecies, 3);
	var experience = readU32(data, 0x24);
	var pid = readU32(data, 0);
	return {
		generation: 3, species: species, rawSpecies: rawSpecies, form: species === 201 ? getGen3UnownForm(pid) : 0,
		item: readU16(data, 0x22),
		abilityIndex: (iv32 >>> 31) & 1, moves: readMoveIds(data, 0x2C), experience: experience,
		level: getEntityLevel(data, config, 0x54, experience, species), ivs: getIVs(iv32),
		evs: getByteEVs(data, 0x38), nature: pid % 25, isEgg: ((iv32 >>> 30) & 1) === 1
	};
}

function parsePK4(data, config) {
	var iv32 = readU32(data, 0x38);
	var species = readU16(data, 8);
	var experience = readU32(data, 0x10);
	return {
		generation: 4, species: species, rawSpecies: species, form: data[0x40] >>> 3, item: readU16(data, 0x0A),
		ability: data[0x15], abilityIndex: readU32(data, 0) & 1,
		moves: readMoveIds(data, 0x28), experience: experience,
		level: getEntityLevel(data, config, 0x8C, experience, species), ivs: getIVs(iv32),
		evs: getByteEVs(data, 0x18), nature: readU32(data, 0) % 25,
		gender: (data[0x40] >>> 1) & 3,
		isEgg: ((iv32 >>> 30) & 1) === 1, isNicknamed: ((iv32 >>> 31) & 1) === 1
	};
}

function parsePK5(data, config) {
	var result = parsePK4(data, config);
	result.generation = 5;
	result.nature = data[0x41];
	result.abilityIndex = (data[0x42] & 1) !== 0 ? 2 : (readU32(data, 0) & 1);
	result.nickname = decodePokemonString(data, 0x48, 22, 5);
	return result;
}

function parsePK67(data, config) {
	var iv32 = readU32(data, 0x74);
	var ivs = getIVs(iv32);
	var hiddenPowerIVs = {
		hp: ivs.hp, at: ivs.at, df: ivs.df, sp: ivs.sp, sa: ivs.sa, sd: ivs.sd
	};
	if (config.generation === 7) applyHyperTraining(ivs, data[0xDE]);
	var species = readU16(data, 8);
	var experience = readU32(data, 0x10);
	return {
		generation: config.generation, species: species, rawSpecies: species, form: data[0x1D] >>> 3, item: readU16(data, 0x0A),
		ability: data[0x14], abilityIndex: getAbilitySlotIndex(data[0x15]),
		moves: readMoveIds(data, 0x5A), experience: experience,
		level: getEntityLevel(data, config, 0xEC, experience, species), ivs: ivs,
		hiddenPowerIVs: hiddenPowerIVs,
		evs: getByteEVs(data, 0x1E), nature: data[0x1C], gender: (data[0x1D] >>> 1) & 3,
		nickname: decodePokemonString(data, 0x40, 26, config.generation),
		isEgg: ((iv32 >>> 30) & 1) === 1, isNicknamed: ((iv32 >>> 31) & 1) === 1
	};
}

function parseG8(data, config) {
	var iv32 = readU32(data, 0x8C);
	var ivs = applyHyperTraining(getIVs(iv32), data[0x126]);
	var rawSpecies = readU16(data, 8);
	var species = config.generation === 9 ? getNationalSpecies(rawSpecies, 9) : rawSpecies;
	var experience = readU32(data, 0x10);
	var genderShift = config.generation === 9 ? 1 : 2;
	return {
		generation: config.generation, species: species, rawSpecies: rawSpecies, form: data[0x24], item: readU16(data, 0x0A),
		ability: readU16(data, 0x14), abilityIndex: getAbilitySlotIndex(data[0x16]),
		moves: readMoveIds(data, 0x72), experience: experience,
		level: getEntityLevel(data, config, 0x148, experience, species), ivs: ivs,
		evs: getByteEVs(data, 0x26), nature: data[0x21] <= 24 ? data[0x21] : data[0x20],
		gender: (data[0x22] >>> genderShift) & 3, nickname: decodePokemonString(data, 0x58, 26, config.generation),
		isEgg: ((iv32 >>> 30) & 1) === 1, isNicknamed: ((iv32 >>> 31) & 1) === 1,
		teraType: getEffectiveTeraType(data, config),
		isGmax: config.id === "pk8" && (data[0x16] & 0x10) !== 0,
		dynamaxLevel: config.id === "pk8" ? data[0x90] : undefined
	};
}

function parsePA8(data, config) {
	var iv32 = readU32(data, 0x94);
	var ivs = applyHyperTraining(getIVs(iv32), data[0x13E]);
	var species = readU16(data, 8);
	var experience = readU32(data, 0x10);
	return {
		generation: 8, species: species, rawSpecies: species, form: data[0x24], item: readU16(data, 0x0A),
		ability: readU16(data, 0x14), abilityIndex: getAbilitySlotIndex(data[0x16]),
		moves: readMoveIds(data, 0x54), experience: experience,
		level: getEntityLevel(data, config, 0x168, experience, species), ivs: ivs,
		evs: getByteEVs(data, 0x26), nature: data[0x21] <= 24 ? data[0x21] : data[0x20],
		gender: (data[0x22] >>> 2) & 3, nickname: decodePokemonString(data, 0x60, 26, 8),
		isEgg: ((iv32 >>> 30) & 1) === 1, isNicknamed: ((iv32 >>> 31) & 1) === 1
	};
}

function parsePokemonEntity(slot) {
	var config = ENTITY_FORMATS[slot.format];
	if (!config || slot.data.length < config.storedSize) return;
	var data = decryptEntityData(slot.data, config, slot.encrypted);
	if (!isEntityChecksumValid(data, config)) return;
	var parsed = config.parser(data, config);
	if (parsed.species === 386 && slot.deoxysForm !== undefined) parsed.form = slot.deoxysForm;
	if (slot.isEgg) parsed.isEgg = true;
	parsed.format = config.id;
	return parsed;
}

function createSlot(data, offset, length, format, location, isParty, extra) {
	if (offset < 0 || length <= 0 || offset + length > data.length) return;
	var slot = {
		data: copyBytes(data, offset, offset + length),
		format: format,
		location: location,
		isParty: !!isParty,
		encrypted: ENTITY_FORMATS[format].generation >= 3
	};
	if (extra) for (var key in extra) if (Object.prototype.hasOwnProperty.call(extra, key)) slot[key] = extra[key];
	return slot;
}

function isPokemonListValid(data, offset, capacity) {
	if (offset < 0 || offset + capacity + 2 > data.length) return false;
	var count = data[offset];
	return count <= capacity && data[offset + 1 + count] === 0xff;
}

function getPokemonListLength(capacity, bodySize, stringLength) {
	return 1 + (capacity + 1) + (bodySize * capacity) + (stringLength * capacity * 2);
}

function readGBPokemonList(data, offset, capacity, bodySize, format, locationFactory, isParty, slots) {
	var count = Math.min(data[offset], capacity);
	var bodyStart = offset + capacity + 2;
	for (var i = 0; i < count; i++) {
		var marker = data[offset + 1 + i];
		if (!marker || marker === 0xff) continue;
		var location = locationFactory(i);
		var extra = {partySlot: isParty ? i + 1 : undefined, isEgg: marker === 0xfd, encrypted: false};
		var slot = createSlot(data, bodyStart + (i * bodySize), bodySize, format, location, isParty, extra);
		if (slot) slots.push(slot);
	}
}

var GEN1_SAVE_CONFIGS = [
	{name: "R/B/Y (International)", party: 0x2F2C, currentBox: 0x30C0, currentIndex: 0x284C, capacity: 20, stringLength: 11, boxes: 12, split: 6},
	{name: "R/B/Y (Japanese)", party: 0x2ED5, currentBox: 0x302D, currentIndex: 0x2842, capacity: 30, stringLength: 6, boxes: 8, split: 4}
];

var GEN2_SAVE_CONFIGS = [
	{name: "Gold/Silver (International)", party: 0x288A, currentBox: 0x2D6C, currentIndex: 0x2724, capacity: 20, stringLength: 11, boxes: 14, split: 7},
	{name: "Crystal (International)", party: 0x2865, currentBox: 0x2D10, currentIndex: 0x2700, capacity: 20, stringLength: 11, boxes: 14, split: 7},
	{name: "Gold/Silver (Japanese)", party: 0x283E, currentBox: 0x2D10, currentIndex: 0x2705, capacity: 30, stringLength: 6, boxes: 9, split: 6},
	{name: "Crystal (Japanese)", party: 0x281A, currentBox: 0x2D10, currentIndex: 0x26E2, capacity: 30, stringLength: 6, boxes: 9, split: 6},
	{name: "Gold/Silver (Korean)", party: 0x28CC, currentBox: 0x2DAE, currentIndex: 0x26FC, capacity: 20, stringLength: 11, boxes: 14, split: 7}
];

function detectGBConfig(data, configs) {
	for (var i = 0; i < configs.length; i++) {
		var config = configs[i];
		if (isPokemonListValid(data, config.party, 6) && isPokemonListValid(data, config.currentBox, config.capacity)) return config;
	}
}

function readGen1Save(data, config) {
	var slots = [];
	readGBPokemonList(data, config.party, 6, 44, "pk1", function (index) { return "Party " + (index + 1); }, true, slots);
	var boxBody = 33;
	var listLength = getPokemonListLength(config.capacity, boxBody, config.stringLength);
	var currentValue = data[config.currentIndex];
	var current = currentValue & 0x7f;
	var boxesInitialized = (currentValue & 0x80) !== 0;
	if (boxesInitialized) {
		for (var box = 0; box < config.boxes; box++) {
			if (box === current) continue;
			var offset = box < config.split ? 0x4000 + (box * listLength) : 0x6000 + ((box - config.split) * listLength);
			readGBPokemonList(data, offset, config.capacity, boxBody, "pk1", (function (boxNumber) {
				return function (index) { return "Box " + boxNumber + " Slot " + (index + 1); };
			})(box + 1), false, slots);
		}
	}
	if (current < config.boxes) {
		readGBPokemonList(data, config.currentBox, config.capacity, boxBody, "pk1", (function (boxNumber) {
			return function (index) { return "Box " + boxNumber + " Slot " + (index + 1); };
		})(current + 1), false, slots);
	}
	return {slots: slots, bagItems: null};
}

function readGen2Save(data, config) {
	var slots = [];
	readGBPokemonList(data, config.party, 6, 48, "pk2", function (index) { return "Party " + (index + 1); }, true, slots);
	var boxBody = 32;
	var listLength = getPokemonListLength(config.capacity, boxBody, config.stringLength);
	for (var box = 0; box < config.boxes; box++) {
		var offset = box < config.split ? 0x4000 + (box * (listLength + 2)) : 0x6000 + ((box - config.split) * (listLength + 2));
		readGBPokemonList(data, offset, config.capacity, boxBody, "pk2", (function (boxNumber) {
			return function (index) { return "Box " + boxNumber + " Slot " + (index + 1); };
		})(box + 1), false, slots);
	}
	return {slots: slots, bagItems: null};
}

function getGen3SectorGroup(data, slotIndex) {
	var start = slotIndex * 0xE000;
	if (start + 0xE000 > data.length) return;
	var sectors = [];
	var smallOffset = -1;
	for (var i = 0; i < 14; i++) {
		var offset = start + (i * 0x1000);
		var id = readU16(data, offset + 0xFF4);
		if (id >= 14 || sectors[id] !== undefined) return;
		sectors[id] = offset;
		if (id === 0) smallOffset = offset;
	}
	if (smallOffset < 0) return;
	for (i = 0; i < 14; i++) if (sectors[i] === undefined) return;
	return {sectors: sectors, smallOffset: smallOffset, counter: readU32(data, smallOffset + 0xFFC)};
}

function compareSaveCounters(first, second) {
	if (first === 0xffffffff && second !== 0xfffffffe) return 1;
	if (second === 0xffffffff && first !== 0xfffffffe) return -1;
	if (first > second) return -1;
	if (second > first) return 1;
	return 0;
}

function getActiveGen3Group(data) {
	var first = getGen3SectorGroup(data, 0);
	var second = data.length >= 0x1C000 ? getGen3SectorGroup(data, 1) : undefined;
	if (!first) return second;
	if (!second) return first;
	return compareSaveCounters(first.counter, second.counter) === 1 ? second : first;
}

function reconstructGen3Save(data, group) {
	var small = copyBytes(data, group.sectors[0], group.sectors[0] + 0xF80);
	var large = new Uint8Array(4 * 0xF80);
	var storage = new Uint8Array(9 * 0xF80);
	for (var id = 1; id < 5; id++) large.set(data.subarray(group.sectors[id], group.sectors[id] + 0xF80), (id - 1) * 0xF80);
	for (id = 5; id < 14; id++) storage.set(data.subarray(group.sectors[id], group.sectors[id] + 0xF80), (id - 5) * 0xF80);
	return {small: small, large: large, storage: storage};
}

function hasNonZeroByte(data, start, end) {
	for (var i = start; i < end; i++) if (data[i]) return true;
	return false;
}

function getGen3SaveVersion(small, fileName) {
	var versionValue = readU32(small, 0xAC);
	if (versionValue !== 1) {
		if (versionValue && hasNonZeroByte(small, 0x890, 0xF2C)) return {name: "Emerald", deoxysForm: 3};
		return {name: "Ruby/Sapphire", deoxysForm: 0};
	}
	var normalizedName = (fileName || "").toLowerCase();
	var leafGreenHint = normalizedName.indexOf("bpg") !== -1 || normalizedName.indexOf("leaf") !== -1 ||
		/(^|[^a-z0-9])lg([^a-z0-9]|$)/.test(normalizedName);
	if (leafGreenHint) return {name: "LeafGreen", deoxysForm: 2};
	var fireRedHint = normalizedName.indexOf("bpr") !== -1 || normalizedName.indexOf("fire") !== -1 ||
		/(^|[^a-z0-9])fr([^a-z0-9]|$)/.test(normalizedName);
	if (fireRedHint) return {name: "FireRed", deoxysForm: 1};
	/* FR/LG share a save layout and identifier; without a filename hint, use FireRed. */
	return {name: "FireRed/LeafGreen (FireRed form fallback)", deoxysForm: 1};
}

function readGen3Save(data, detected, fileName) {
	var group = detected && detected.sectors ? detected : getActiveGen3Group(data);
	if (!group) throw new Error("Generation III save sectors are incomplete");
	var blocks = reconstructGen3Save(data, group);
	var versionValue = readU32(blocks.small, 0xAC);
	var isFRLG = versionValue === 1;
	var version = getGen3SaveVersion(blocks.small, fileName);
	var partyCountOffset = isFRLG ? 0x34 : 0x234;
	var partyOffset = isFRLG ? 0x38 : 0x238;
	var slots = [];
	var partyCount = Math.min(blocks.large[partyCountOffset], 6);
	for (var i = 0; i < partyCount; i++) {
		var partySlot = createSlot(blocks.large, partyOffset + (i * 100), 100, "pk3", "Party " + (i + 1), true,
			{partySlot: i + 1, deoxysForm: version.deoxysForm});
		if (partySlot) slots.push(partySlot);
	}
	for (var box = 0; box < 14; box++) {
		for (var slotIndex = 0; slotIndex < 30; slotIndex++) {
			var offset = 4 + (((box * 30) + slotIndex) * 80);
			var boxSlot = createSlot(blocks.storage, offset, 80, "pk3", "Box " + (box + 1) + " Slot " + (slotIndex + 1), false,
				{boxNumber: box + 1, slotNumber: slotIndex + 1, deoxysForm: version.deoxysForm});
			if (boxSlot) slots.push(boxSlot);
		}
	}
	return {slots: slots, bagItems: null, game: version.name};
}

var GEN4_SAVE_CONFIGS = [
	{id: "dp", name: "Diamond/Pearl", generalSize: 0xC100, storageSize: 0x121E0, storageStart: 0xC100, party: 0x98, boxStart: 4, boxStride: 30 * 136},
	{id: "pt", name: "Platinum", generalSize: 0xCF2C, storageSize: 0x121E4, storageStart: 0xCF2C, party: 0xA0, boxStart: 4, boxStride: 30 * 136},
	{id: "hgss", name: "HeartGold/SoulSilver", generalSize: 0xF628, storageSize: 0x12310, storageStart: 0xF700, party: 0x98, boxStart: 0, boxStride: 0x1000}
];

function hasGen4Footer(data, config) {
	if (data.length !== 0x80000) return false;
	var end = 0x40000 + config.generalSize;
	var size = readU32(data, end - 0x0C);
	var magic = readU32(data, end - 8);
	return size === config.generalSize && (magic === 0x20060623 || magic === 0x20070903);
}

function detectGen4Config(data) {
	for (var i = 0; i < GEN4_SAVE_CONFIGS.length; i++) if (hasGen4Footer(data, GEN4_SAVE_CONFIGS[i])) return GEN4_SAVE_CONFIGS[i];
}

function getActiveGen4BlockOffset(data, begin, length) {
	var firstFooter = begin + length - 0x14;
	var secondFooter = firstFooter + 0x40000;
	var majorResult = compareSaveCounters(readU32(data, firstFooter), readU32(data, secondFooter));
	if (majorResult === 1) return begin + 0x40000;
	if (majorResult === -1) return begin;
	return compareSaveCounters(readU32(data, firstFooter + 4), readU32(data, secondFooter + 4)) === 1 ? begin + 0x40000 : begin;
}

function readGen4Save(data, config) {
	var generalOffset = getActiveGen4BlockOffset(data, 0, config.generalSize);
	var storageOffset = getActiveGen4BlockOffset(data, config.storageStart, config.storageSize);
	var slots = [];
	var partyCount = Math.min(data[generalOffset + config.party - 4], 6);
	for (var i = 0; i < partyCount; i++) {
		var party = createSlot(data, generalOffset + config.party + (i * 236), 236, "pk4", "Party " + (i + 1), true, {partySlot: i + 1});
		if (party) slots.push(party);
	}
	for (var box = 0; box < 18; box++) {
		for (var slotIndex = 0; slotIndex < 30; slotIndex++) {
			var offset = storageOffset + config.boxStart + (box * config.boxStride) + (slotIndex * 136);
			var boxSlot = createSlot(data, offset, 136, "pk4", "Box " + (box + 1) + " Slot " + (slotIndex + 1), false, {boxNumber: box + 1, slotNumber: slotIndex + 1});
			if (boxSlot) slots.push(boxSlot);
		}
	}
	return {slots: slots, bagItems: null};
}

var GEN5_SAVE_CONFIGS = [
	{id: "bw", name: "Black/White", mainSize: 0x24000, footerLength: 0x8C},
	{id: "b2w2", name: "Black 2/White 2", mainSize: 0x26000, footerLength: 0x94}
];

function hasGen5Footer(data, config) {
	if (data.length !== 0x80000) return false;
	var footer = config.mainSize - 0x100;
	var stored = readU16(data, footer + config.footerLength + 0x0E);
	return stored === crc16CCITT(data, footer, config.footerLength);
}

function detectGen5Config(data) {
	for (var i = 0; i < GEN5_SAVE_CONFIGS.length; i++) if (hasGen5Footer(data, GEN5_SAVE_CONFIGS[i])) return GEN5_SAVE_CONFIGS[i];
}

function readGen5Save(data) {
	var slots = [];
	var partyCount = Math.min(data[0x18E04], 6);
	for (var i = 0; i < partyCount; i++) {
		var party = createSlot(data, 0x18E08 + (i * 220), 220, "pk5", "Party " + (i + 1), true, {partySlot: i + 1});
		if (party) slots.push(party);
	}
	for (var box = 0; box < 24; box++) {
		for (var slotIndex = 0; slotIndex < 30; slotIndex++) {
			var offset = 0x400 + (box * 0x1000) + (slotIndex * 136);
			var boxSlot = createSlot(data, offset, 136, "pk5", "Box " + (box + 1) + " Slot " + (slotIndex + 1), false, {boxNumber: box + 1, slotNumber: slotIndex + 1});
			if (boxSlot) slots.push(boxSlot);
		}
	}
	return {slots: slots, bagItems: null};
}

function hasBEEFFooter(data, usedLength) {
	return usedLength >= 0x1F0 && usedLength <= data.length && readU32(data, usedLength - 0x1F0) === 0x42454546;
}

function readLinearSave(data, config) {
	var slots = [];
	var partyCount = Math.min(data[config.party + (6 * config.partySize)], 6);
	for (var i = 0; i < partyCount; i++) {
		var party = createSlot(data, config.party + (i * config.partySize), config.partySize, config.format, "Party " + (i + 1), true, {partySlot: i + 1});
		if (party) slots.push(party);
	}
	for (var box = 0; box < config.boxes; box++) {
		for (var slotIndex = 0; slotIndex < config.boxSlots; slotIndex++) {
			var offset = config.box + (((box * config.boxSlots) + slotIndex) * config.boxStride);
			var boxSlot = createSlot(data, offset, config.entitySize, config.format, "Box " + (box + 1) + " Slot " + (slotIndex + 1), false, {boxNumber: box + 1, slotNumber: slotIndex + 1});
			if (boxSlot) slots.push(boxSlot);
		}
	}
	return {slots: slots, bagItems: null};
}

var LINEAR_SAVE_FORMATS = [
	{id: "xy", name: "X/Y", generation: 6, size: 0x65600, party: 0x14200, box: 0x22600, partySize: 260, entitySize: 232, boxStride: 232, boxes: 31, boxSlots: 30, format: "pk6"},
	{id: "oras", name: "Omega Ruby/Alpha Sapphire", generation: 6, size: 0x76000, party: 0x14200, box: 0x33000, partySize: 260, entitySize: 232, boxStride: 232, boxes: 31, boxSlots: 30, format: "pk6"},
	{id: "sm", name: "Sun/Moon", generation: 7, size: 0x6BE00, party: 0x1400, box: 0x4E00, partySize: 260, entitySize: 232, boxStride: 232, boxes: 32, boxSlots: 30, format: "pk7"},
	{id: "usum", name: "Ultra Sun/Ultra Moon", generation: 7, size: 0x6CC00, party: 0x1600, box: 0x5200, partySize: 260, entitySize: 232, boxStride: 232, boxes: 32, boxSlots: 30, format: "pk7"}
];

function detectLinearSave(data) {
	for (var i = 0; i < LINEAR_SAVE_FORMATS.length; i++) {
		var config = LINEAR_SAVE_FORMATS[i];
		if (data.length === config.size && hasBEEFFooter(data, data.length)) return config;
	}
}

function detectLGPE(data) {
	if (data.length !== 0x100000 || !hasBEEFFooter(data, 0xB8800)) return false;
	return readU16(data, 0xB8800 - 0x200 + 0xB0) === 0x13;
}

function readLGPESave(data) {
	var slots = [];
	var header = 0x05A00;
	var storage = 0x05C00;
	var count = Math.min(readU16(data, header + 14), 1000);
	var partyPointers = [];
	for (var p = 0; p < 6; p++) partyPointers.push(readU16(data, header + (p * 2)));
	for (var i = 0; i < count; i++) {
		var partyIndex = partyPointers.indexOf(i);
		var isParty = partyIndex >= 0;
		var box = Math.floor(i / 25) + 1;
		var slotIndex = (i % 25) + 1;
		var location = isParty ? "Party " + (partyIndex + 1) : "Box " + box + " Slot " + slotIndex;
		var slot = createSlot(data, storage + (i * 260), 260, "pb7", location, isParty, {
			partySlot: isParty ? partyIndex + 1 : undefined, boxNumber: box, slotNumber: slotIndex
		});
		if (slot) slots.push(slot);
	}
	return {slots: slots, bagItems: null};
}

var BDSP_SAVE_SIZES = {956456: 0x25, 973856: 0x2C, 978316: 0x32, 979108: 0x34};

function detectBDSP(data) {
	return BDSP_SAVE_SIZES[data.length] === readU32(data, 0);
}

function readBDSPSave(data) {
	return readLinearSave(data, {
		party: 0x14098, box: 0x14EF4, partySize: 344, entitySize: 344, boxStride: 344,
		boxes: 40, boxSlots: 30, format: "pb8"
	});
}

function getSwitchSaveDescriptor(blocks) {
	var standardBox = findSaveBlock(blocks, SWITCH_BOX_BLOCK_KEY);
	var plaBox = findSaveBlock(blocks, PLA_BOX_BLOCK_KEY);
	var swshParty = findSaveBlock(blocks, SWSH_PARTY_BLOCK_KEY);
	var svParty = findSaveBlock(blocks, SV_PARTY_BLOCK_KEY);
	if (plaBox && swshParty) return {id: "pla", name: "Pokemon Legends: Arceus", generation: 8, format: "pa8", box: plaBox, party: swshParty, entitySize: 360, partySize: 376, boxStride: 360, partyStride: 376};
	if (standardBox && swshParty) return {id: "swsh", name: "Sword/Shield", generation: 8, format: "pk8", box: standardBox, party: swshParty, entitySize: 344, partySize: 344, boxStride: 344, partyStride: 344};
	if (standardBox && svParty) {
		if (standardBox.length >= 32 * 30 * 408) return {id: "za", name: "Pokemon Legends: Z-A", generation: 9, format: "pa9", box: standardBox, party: svParty, entitySize: 344, partySize: 344, boxStride: 408, partyStride: 480};
		return {id: "sv", name: "Scarlet/Violet", generation: 9, format: "pk9", box: standardBox, party: svParty, entitySize: 344, partySize: 344, boxStride: 344, partyStride: 344};
	}
}

function getSwitchSlotsFromBlocks(blocks, descriptor) {
	var slots = [];
	var partyCount = descriptor.id === "za" ? 6 : Math.min(descriptor.party[6 * descriptor.partyStride] || 6, 6);
	for (var i = 0; i < partyCount; i++) {
		var party = createSlot(descriptor.party, i * descriptor.partyStride, descriptor.partySize, descriptor.format, "Party " + (i + 1), true, {partySlot: i + 1});
		if (party) slots.push(party);
	}
	var maximum = 32 * 30;
	var count = Math.min(Math.floor(descriptor.box.length / descriptor.boxStride), maximum);
	for (i = 0; i < count; i++) {
		var box = Math.floor(i / 30) + 1;
		var slotIndex = (i % 30) + 1;
		var boxSlot = createSlot(descriptor.box, i * descriptor.boxStride, descriptor.entitySize, descriptor.format, "Box " + box + " Slot " + slotIndex, false, {boxNumber: box, slotNumber: slotIndex});
		if (boxSlot) slots.push(boxSlot);
	}
	return slots;
}

function readInventoryItem8(data, offset) {
	var value = readU32(data, offset);
	return {id: value & 0x7ff, count: (value >>> 15) & 0x3ff};
}

function getBattleRelevantBagItemName(itemId) {
	if (!itemId || itemId >= SAVE_IMPORT_TEXT.items.length) return "";
	var sourceName = SAVE_IMPORT_TEXT.items[itemId];
	var calcName = resolveCalcName("items", sourceName, 8);
	var items = getCalcData("items", 8);
	return calcName && items.indexOf(calcName) !== -1 ? calcName : "";
}

function getImportedHeldBagItemsFromBlocks(blocks) {
	var itemBlock = findSaveBlock(blocks, SWSH_ITEM_BLOCK_KEY);
	var counts = {};
	var imported = [];
	if (!itemBlock) return null;
	for (var pouchIndex = 0; pouchIndex < SAVE_IMPORT_HELD_ITEM_POUCHES.length; pouchIndex++) {
		var pouch = SAVE_IMPORT_HELD_ITEM_POUCHES[pouchIndex];
		for (var i = 0; i < pouch.count; i++) {
			var offset = pouch.offset + (i * 4);
			if (offset + 4 > itemBlock.length) break;
			var item = readInventoryItem8(itemBlock, offset);
			var name = item.count > 0 ? getBattleRelevantBagItemName(item.id) : "";
			if (name) counts[name] = (counts[name] || 0) + item.count;
		}
	}
	for (var itemName in counts) if (Object.prototype.hasOwnProperty.call(counts, itemName)) imported.push({name: itemName, count: counts[itemName]});
	imported.sort(function (a, b) { return a.name.localeCompare(b.name); });
	return imported;
}

function readSwitchSave(data, detected) {
	var blocks = detected.blocks || readSwishBlocks(data);
	var descriptor = detected.switchDescriptor || getSwitchSaveDescriptor(blocks);
	if (!descriptor) throw new Error("Could not find supported party and box blocks in this Switch save");
	return {
		slots: getSwitchSlotsFromBlocks(blocks, descriptor),
		bagItems: descriptor.id === "swsh" ? getImportedHeldBagItemsFromBlocks(blocks) : null
	};
}

function detectSwitchSave(data) {
	try {
		var blocks = readSwishBlocks(data);
		var descriptor = getSwitchSaveDescriptor(blocks);
		if (descriptor) return {blocks: blocks, switchDescriptor: descriptor};
	} catch (error) {
		return false;
	}
	return false;
}

var SAVE_IMPORT_FORMATS = [
	{id: "gen1", name: "Red/Blue/Yellow", generation: 1, detect: function (data) { return data.length === 0x8000 && detectGBConfig(data, GEN1_SAVE_CONFIGS); }, read: readGen1Save},
	{id: "gen2", name: "Gold/Silver/Crystal", generation: 2, detect: function (data) { return (data.length === 0x8000 || data.length === 0x10000) && detectGBConfig(data, GEN2_SAVE_CONFIGS); }, read: readGen2Save},
	{id: "gen3", name: "Ruby/Sapphire/Emerald/FireRed/LeafGreen", generation: 3, detect: function (data) { return (data.length === 0x10000 || data.length === 0x20000) && getActiveGen3Group(data); }, read: readGen3Save},
	{id: "gen4", name: "Diamond/Pearl/Platinum/HeartGold/SoulSilver", generation: 4, detect: detectGen4Config, read: readGen4Save},
	{id: "gen5", name: "Black/White/Black 2/White 2", generation: 5, detect: detectGen5Config, read: readGen5Save},
	{id: "gen6", name: "X/Y/Omega Ruby/Alpha Sapphire", generation: 6, detect: function (data) { var config = detectLinearSave(data); return config && config.generation === 6 ? config : false; }, read: readLinearSave},
	{id: "gen7", name: "Sun/Moon/Ultra Sun/Ultra Moon", generation: 7, detect: function (data) { var config = detectLinearSave(data); return config && config.generation === 7 ? config : false; }, read: readLinearSave},
	{id: "lgpe", name: "Let's Go, Pikachu!/Let's Go, Eevee!", generation: 7, detect: detectLGPE, read: readLGPESave},
	{id: "bdsp", name: "Brilliant Diamond/Shining Pearl", generation: 8, detect: detectBDSP, read: readBDSPSave},
	{id: "switch", name: "Sword/Shield/Legends: Arceus/Scarlet/Violet/Legends: Z-A", generation: null, detect: detectSwitchSave, read: readSwitchSave}
];

function getSaveImportAdapter(id) {
	for (var i = 0; i < SAVE_IMPORT_FORMATS.length; i++) if (SAVE_IMPORT_FORMATS[i].id === id) return SAVE_IMPORT_FORMATS[i];
}

function registerPokemonSaveAdapter(adapter, options) {
	if (!adapter || typeof adapter.id !== "string" || !adapter.id ||
			typeof adapter.detect !== "function" || typeof adapter.read !== "function") {
		throw new TypeError("A save adapter needs a unique id plus detect and read functions");
	}
	var existing = getSaveImportAdapter(adapter.id);
	if (existing && !(options && options.replace)) throw new Error("Save adapter is already registered: " + adapter.id);
	if (existing) SAVE_IMPORT_FORMATS.splice(SAVE_IMPORT_FORMATS.indexOf(existing), 1);
	if (options && options.prepend) SAVE_IMPORT_FORMATS.unshift(adapter);
	else SAVE_IMPORT_FORMATS.push(adapter);
	return adapter;
}

function detectPokemonSaveFormat(data, adapterId) {
	var adapters = SAVE_IMPORT_FORMATS;
	if (adapterId) {
		var selected = getSaveImportAdapter(adapterId);
		if (!selected) return;
		adapters = [selected];
	}
	for (var i = 0; i < adapters.length; i++) {
		var adapter = adapters[i];
		var detected = adapter.detect(data);
		if (detected) {
			var game = detected.name || (detected.switchDescriptor && detected.switchDescriptor.name) || adapter.name;
			var generation = detected.generation || (detected.switchDescriptor && detected.switchDescriptor.generation) || adapter.generation;
			return {adapter: adapter, detected: detected, id: adapter.id, game: game, generation: generation};
		}
	}
}

function unwrapGBEntity(data, format) {
	var isGen1 = format === "pk1";
	var wrapperSizes = isGen1 ? [59, 69] : [63, 73];
	if (wrapperSizes.indexOf(data.length) === -1) return {data: data, isEgg: false};
	return {
		data: copyBytes(data, 3, 3 + (isGen1 ? 44 : 48)),
		isEgg: !isGen1 && data[1] === 0xfd
	};
}

function getStandaloneEntitySlot(data, fileName) {
	var match = /\.([a-z0-9]+)$/i.exec(fileName || "");
	var extension = match ? match[1].toLowerCase() : "";
	var format = ENTITY_EXTENSION_FORMATS[extension];
	if (!format && !fileName && (data.length === 328 || data.length === 344)) format = "pk8";
	if (!format) return;
	var config = ENTITY_FORMATS[format];
	var unwrapped = unwrapGBEntity(data, format);
	var entity = unwrapped.data;
	if (entity.length !== config.storedSize && entity.length !== config.partySize) throw new Error("Invalid ." + extension + " entity size");
	return {
		data: entity, format: format, location: (extension || format).toUpperCase() + " File",
		isParty: entity.length === config.partySize, encrypted: extension.charAt(0) === "e", isEgg: unwrapped.isEgg
	};
}

function getPokemonSaveImportData(data, fileName, adapterId) {
	var entitySlot = getStandaloneEntitySlot(data, fileName);
	if (entitySlot) return {slots: [entitySlot], bagItems: null, formatId: "entity", game: entitySlot.format.toUpperCase(), generation: ENTITY_FORMATS[entitySlot.format].generation};
	if (adapterId && !getSaveImportAdapter(adapterId)) throw new Error("The active profile requires an unregistered save adapter: " + adapterId);
	var detected = detectPokemonSaveFormat(data, adapterId);
	if (!detected) throw new Error(adapterId ?
		"This file is not supported by the active profile's " + adapterId + " save adapter" :
		"Unsupported or unrecognized save format");
	var result = detected.adapter.read(data, detected.detected, fileName);
	result.formatId = detected.id;
	result.game = result.game || detected.game;
	result.generation = detected.generation;
	return result;
}

function getActiveSaveImportContext() {
	var context = window.KMCalculatorActiveRomHackContext;
	if (!context && window.kmRomHackRegistry && typeof window.kmRomHackRegistry.getActiveContext === "function") {
		context = window.kmRomHackRegistry.getActiveContext();
	}
	return context || null;
}

function getActiveSaveImportPolicy() {
	var context = getActiveSaveImportContext();
	var profile = (context && context.profile) || window.KMCalculatorActiveRomHackProfile;
	if (!profile) return null;
	var saveImport = profile.saveImport || {};
	var generation = context && context.saveGeneration !== undefined ? context.saveGeneration : saveImport.generation;
	var adapter = (context && (context.saveAdapter || context.saveAdapterId)) || saveImport.adapter || saveImport.adapterId || "";
	return {
		profileId: profile.id || "",
		profileName: profile.name || profile.id || "active profile",
		profileVersion: profile.version || "",
		providerId: context && context.resolvedProvider && context.resolvedProvider.id ? context.resolvedProvider.id : "",
		generation: Number(generation),
		adapter: adapter
	};
}

function validateSaveImportPolicy(importData, policy) {
	if (!policy) return importData;
	if (Number.isInteger(policy.generation) && importData.generation !== policy.generation) {
		throw new Error(policy.profileName + " accepts Generation " + policy.generation +
			" save data; this file is Generation " + importData.generation);
	}
	if (policy.adapter && importData.formatId !== "entity" && importData.formatId !== policy.adapter) {
		throw new Error(policy.profileName + " requires the " + policy.adapter +
			" save adapter; this file used " + importData.formatId);
	}
	return importData;
}

function normalizeLookupKey(name) {
	return (name || "").toLowerCase().replace(/\u00e9/g, "e").replace(/\u2019/g, "'").replace(/[^a-z0-9]+/g, "");
}

function addLookupEntry(map, name, value) {
	var key = normalizeLookupKey(name);
	if (key && !map[key]) map[key] = value;
}

function getCalcData(kind, generation) {
	var collection;
	var policy = getActiveSaveImportPolicy();
	if (policy && policy.generation === generation) {
		if (kind === "species" && typeof window.getActivePokedex === "function") return window.getActivePokedex();
		if (kind === "moves" && typeof window.getActiveMoves === "function") return window.getActiveMoves();
		if (kind === "items" && typeof window.getActiveItems === "function") return window.getActiveItems();
		if (kind === "abilities" && typeof window.getActiveAbilities === "function") return window.getActiveAbilities();
	}
	if (kind === "species") collection = calc.SPECIES;
	else if (kind === "moves") collection = calc.MOVES;
	else if (kind === "items") collection = calc.ITEMS;
	else collection = calc.ABILITIES;
	return collection[generation] || collection[9] || collection[8] || {};
}

function getCalcNameMaps(generation) {
	var policy = getActiveSaveImportPolicy();
	var cacheKey = [
		policy ? policy.profileId : "canonical",
		policy ? policy.profileVersion : "",
		policy ? policy.providerId : "",
		generation
	].join(":");
	if (saveImportNameMaps[cacheKey]) return saveImportNameMaps[cacheKey];
	var maps = {species: {}, moves: {}, items: {}, abilities: {}};
	var speciesData = getCalcData("species", generation);
	var movesData = getCalcData("moves", generation);
	var itemsData = getCalcData("items", generation);
	var abilitiesData = getCalcData("abilities", generation);
	for (var species in speciesData) if (Object.prototype.hasOwnProperty.call(speciesData, species)) addLookupEntry(maps.species, species, species);
	for (var move in movesData) if (Object.prototype.hasOwnProperty.call(movesData, move)) addLookupEntry(maps.moves, move, move);
	for (var i = 0; i < itemsData.length; i++) addLookupEntry(maps.items, itemsData[i], itemsData[i]);
	for (i = 0; i < abilitiesData.length; i++) addLookupEntry(maps.abilities, abilitiesData[i], abilitiesData[i]);
	addLookupEntry(maps.species, "Nidoran♀", "Nidoran-F");
	addLookupEntry(maps.species, "Nidoran♂", "Nidoran-M");
	for (var alias in SAVE_IMPORT_BASE_FORM_ALIASES) {
		if (Object.prototype.hasOwnProperty.call(SAVE_IMPORT_BASE_FORM_ALIASES, alias) &&
				speciesData[SAVE_IMPORT_BASE_FORM_ALIASES[alias]]) {
			addLookupEntry(maps.species, alias, SAVE_IMPORT_BASE_FORM_ALIASES[alias]);
		}
	}
	addLookupEntry(maps.items, "Pok\u00e9 Ball", "Poke Ball");
	saveImportNameMaps[cacheKey] = maps;
	return maps;
}

function sourceNameIsBlank(name) {
	return !name || name === "None" || name === "???" || name.charAt(0) === "\u2014";
}

function resolveCalcName(kind, sourceName, generation) {
	if (sourceNameIsBlank(sourceName)) return "";
	var map = getCalcNameMaps(generation)[kind];
	var direct = map[normalizeLookupKey(sourceName)];
	if (direct) return direct;
	if (kind === "species" && typeof checkExceptionsImport === "function") {
		var exception = checkExceptionsImport(sourceName);
		return map[normalizeLookupKey(exception)] || "";
	}
	return "";
}

function resolveSpeciesName(sourceName, form, generation) {
	if (sourceName === "Nidoran♀") sourceName = "Nidoran-F";
	if (sourceName === "Nidoran♂") sourceName = "Nidoran-M";
	var sourceSpeciesId = SAVE_IMPORT_TEXT.species.indexOf(sourceName);
	var generatedForms = SAVE_IMPORT_TEXT.forms && SAVE_IMPORT_TEXT.forms[sourceSpeciesId];
	if (form && generatedForms && generatedForms[form]) {
		/* A known form must exist in the active generation/profile; never silently use its base. */
		return resolveCalcName("species", generatedForms[form], generation);
	}
	var baseName = resolveCalcName("species", sourceName, generation);
	if (!baseName || !form) return baseName;
	/* Never infer raw form IDs from calc otherFormes ordering; the orders differ. */
	return baseName;
}

/*
 * A profile generation provider or save adapter may implement
 * resolveRawEntityId(kind, rawId, request). Return the exact active calc-data
 * name to override canonical tables; null/undefined delegates to the next
 * resolver and then to canonical data. The profile provider has precedence.
 */
function getRawEntityIdResolver(source) {
	if (!source) return null;
	if (typeof source.resolveRawEntityId === "function") return source.resolveRawEntityId;
	if (typeof source.resolveSaveEntityId === "function") return source.resolveSaveEntityId;
	return null;
}

function createSaveImportResolutionContext(importData, policy) {
	var activeContext = getActiveSaveImportContext();
	var provider = activeContext && activeContext.resolvedProvider ? activeContext.resolvedProvider : null;
	var adapterId = importData && importData.formatId && importData.formatId !== "entity" ?
		importData.formatId : (policy && policy.adapter ? policy.adapter : "");
	var adapter = adapterId ? getSaveImportAdapter(adapterId) : null;
	var profileId = policy && policy.profileId ? policy.profileId : "canonical";
	var profileVersion = policy && policy.profileVersion ? policy.profileVersion : "";
	var activeGeneration = policy && policy.generation ? policy.generation : (importData && importData.generation);
	var providerId = policy && policy.providerId ? policy.providerId :
		(provider && provider.id ? String(provider.id) : "canonical-gen-" + (activeGeneration || "unknown"));
	var identityKey = [profileId, profileVersion, providerId, adapterId || "default"].join(":");
	return {
		profileId: profileId,
		profileVersion: profileVersion,
		providerId: providerId,
		adapterId: adapterId,
		identityKey: identityKey,
		provider: provider,
		adapter: adapter
	};
}

function normalizeRawEntityResolverResult(value, sourceName) {
	if (value === undefined || value === null) return {handled: false, name: ""};
	if (value && typeof value === "object") value = value.name;
	if (typeof value !== "string") {
		throw new TypeError(sourceName + " resolveRawEntityId must return a name string, null, or undefined");
	}
	return {handled: true, name: value.replace(/^\s+|\s+$/g, "")};
}

function callRawEntityIdResolver(source, sourceName, request) {
	var resolver = getRawEntityIdResolver(source);
	if (!resolver) return {handled: false, name: ""};
	return normalizeRawEntityResolverResult(
		resolver.call(source, request.kind, request.rawId, request),
		sourceName
	);
}

function resolveRawEntitySourceName(kind, rawId, parsed, slot, resolution, canonicalName) {
	var request = {
		kind: kind,
		rawId: rawId,
		generation: parsed.generation,
		format: parsed.format || slot.format,
		form: parsed.form || 0,
		location: slot.location || "Pokemon",
		isParty: !!slot.isParty,
		profileId: resolution.profileId,
		profileVersion: resolution.profileVersion,
		providerId: resolution.providerId,
		adapterId: resolution.adapterId,
		identityKey: resolution.identityKey,
		parsed: parsed
	};
	var resolved = callRawEntityIdResolver(resolution.provider, "The active generation provider", request);
	if (resolved.handled) return resolved;
	resolved = callRawEntityIdResolver(resolution.adapter, "The active save adapter", request);
	if (resolved.handled) return resolved;
	return {handled: false, name: canonicalName || ""};
}

function getSaveEntityResolutionLabel(resolution) {
	if (resolution.profileId && resolution.profileId !== "canonical") return "profile " + resolution.profileId;
	if (resolution.providerId) return "provider " + resolution.providerId;
	return "the canonical calculator data";
}

function throwUnresolvedSaveEntityId(kind, rawId, slot, resolution) {
	throw new Error(
		"Could not resolve " + kind + " ID " + rawId + " for " +
		(slot.location || "an imported Pokemon") + " using " +
		getSaveEntityResolutionLabel(resolution)
	);
}

function resolveImportedSpeciesName(parsed, slot, resolution) {
	var rawSpecies = parsed.rawSpecies === undefined ? parsed.species : parsed.rawSpecies;
	var canonicalSource = parsed.species >= 0 && parsed.species < SAVE_IMPORT_TEXT.species.length ?
		SAVE_IMPORT_TEXT.species[parsed.species] : "";
	var source = resolveRawEntitySourceName("species", rawSpecies, parsed, slot, resolution, canonicalSource);
	var speciesName = source.handled ?
		getCalcNameMaps(parsed.generation).species[normalizeLookupKey(source.name)] :
		resolveSpeciesName(source.name, parsed.form, parsed.generation);
	if (!speciesName) throwUnresolvedSaveEntityId("species", rawSpecies, slot, resolution);
	return speciesName;
}

function resolveImportedMoveName(rawMove, parsed, slot, resolution) {
	if (!rawMove) return "";
	var canonicalSource = rawMove < SAVE_IMPORT_TEXT.moves.length ? SAVE_IMPORT_TEXT.moves[rawMove] : "";
	var source = resolveRawEntitySourceName("move", rawMove, parsed, slot, resolution, canonicalSource);
	var sourceName = source.name;
	if (sourceName === "Hidden Power") {
		var hiddenPowerType = getImportedHiddenPowerType(parsed);
		if (hiddenPowerType) sourceName += " " + hiddenPowerType;
	}
	var moveName = resolveCalcName("moves", sourceName, parsed.generation);
	if (!moveName) throwUnresolvedSaveEntityId("move", rawMove, slot, resolution);
	return moveName;
}

function resolveImportedAbilityName(rawAbility, parsed, slot, resolution) {
	if (!rawAbility) return "";
	var canonicalSource = rawAbility < SAVE_IMPORT_TEXT.abilities.length ? SAVE_IMPORT_TEXT.abilities[rawAbility] : "";
	var source = resolveRawEntitySourceName("ability", rawAbility, parsed, slot, resolution, canonicalSource);
	var abilityName = resolveCalcName("abilities", source.name, parsed.generation);
	if (!abilityName) throwUnresolvedSaveEntityId("ability", rawAbility, slot, resolution);
	return abilityName;
}

function resolveImportedItemName(rawItem, parsed, slot, resolution) {
	if (!rawItem) return "";
	var canonicalSource = getItemSourceName(rawItem, parsed.generation);
	var source = resolveRawEntitySourceName("item", rawItem, parsed, slot, resolution, canonicalSource);
	var itemName = resolveCalcName("items", source.name, parsed.generation);
	if (!itemName) throwUnresolvedSaveEntityId("item", rawItem, slot, resolution);
	return itemName;
}

function getImportedHiddenPowerType(parsed) {
	var typeIndex;
	if (parsed.generation === 2 && parsed.dvs) {
		typeIndex = (4 * (parsed.dvs.at & 3)) + (parsed.dvs.df & 3);
	} else if (parsed.generation >= 3 && parsed.generation <= 7) {
		var ivs = parsed.hiddenPowerIVs || parsed.ivs;
		if (!ivs) return "";
		var typeBits = (ivs.hp & 1) + (2 * (ivs.at & 1)) + (4 * (ivs.df & 1)) +
			(8 * (ivs.sp & 1)) + (16 * (ivs.sa & 1)) + (32 * (ivs.sd & 1));
		typeIndex = Math.floor(typeBits * 15 / 63);
	} else {
		return "";
	}
	return SAVE_IMPORT_HIDDEN_POWER_TYPES[typeIndex] || "";
}

function buildImportedPokemon(slot, importName, resolution, parsedPokemon) {
	var parsed = parsedPokemon || parsePokemonEntity(slot);
	var rawSpecies = parsed && parsed.rawSpecies === undefined ? parsed.species : (parsed && parsed.rawSpecies);
	if (!parsed || parsed.isEgg || (!parsed.species && !rawSpecies)) return;
	resolution = resolution || createSaveImportResolutionContext(null, getActiveSaveImportPolicy());
	var speciesName = resolveImportedSpeciesName(parsed, slot, resolution);
	var speciesData = getCalcData("species", parsed.generation);
	if (!speciesData[speciesName]) throwUnresolvedSaveEntityId("species", rawSpecies, slot, resolution);
	var poke = JSON.parse(JSON.stringify(speciesData[speciesName]));
	var moves = [];
	for (var i = 0; i < parsed.moves.length; i++) {
		var moveName = resolveImportedMoveName(parsed.moves[i], parsed, slot, resolution);
		if (moveName) moves.push(moveName);
	}
	while (moves.length < 4) moves.push("(No Move)");
	var ability = resolveImportedAbilityName(parsed.ability, parsed, slot, resolution);
	// Species data can contain only the default ability, not every legal ability.
	// Keep the resolved save ID; use species slots only when the save has no ID.
	if (!ability && parsed.abilityIndex !== null && parsed.abilityIndex !== undefined && poke.abilities) {
		ability = (parsed.abilityIndex === 2 && poke.abilities.H) ||
			poke.abilities[parsed.abilityIndex] || poke.abilities[0];
	}
	var item = resolveImportedItemName(parsed.item, parsed, slot, resolution);
	poke.name = speciesName;
	poke.nameProp = importName + " - " + slot.location + " - " + speciesName;
	poke.level = Math.max(1, Math.min(parsed.level || 100, 100));
	poke.ivs = parsed.ivs;
	poke.evs = parsed.evs;
	if (parsed.dvs) poke.dvs = parsed.dvs;
	if (parsed.generation === 1) {
		poke.evs.sl = parsed.evs.sa;
		poke.dvs.sl = parsed.dvs.sa;
	}
	poke.moves = moves;
	poke.nature = SAVE_IMPORT_NATURES[parsed.nature] || "Serious";
	poke.isCustomSet = true;
	if (parsed.gender === 0) poke.gender = "M";
	else if (parsed.gender === 1) poke.gender = "F";
	else if (parsed.gender === 2) poke.gender = "N";
	if (ability) poke.ability = ability;
	if (item) poke.item = item;
	if (parsed.teraType) poke.teraType = parsed.teraType;
	if (parsed.isGmax) poke.isGmax = true;
	if (parsed.dynamaxLevel !== undefined) poke.dynamaxLevel = parsed.dynamaxLevel;
	if (parsed.isNicknamed && parsed.nickname) poke.nickname = parsed.nickname;
	return poke;
}

function getImportedPokemonFullSetName(imported) {
	return imported.pokemon.name + " (" + imported.pokemon.nameProp + ")";
}

function moveImportedPokemonToTeamBox(importedPokemon) {
	if (!$("#team-box").length) return;
	for (var i = 0; i < importedPokemon.length; i++) {
		var zoneId = importedPokemon[i].isParty ? "team-poke-list" : "box-poke-list";
		var zone = $("#" + zoneId);
		if (!zone.length) continue;
		var fullSetName = getImportedPokemonFullSetName(importedPokemon[i]);
		$(".box-pokemon").filter(function () { return $(this).attr("data-id") === fullSetName; }).appendTo(zone);
	}
	if (typeof window.saveTeamBoxLayout === "function") window.saveTeamBoxLayout();
}

function clearTeamBoxForSaveImport() {
	if (typeof removeAllCustomSetsFromDex === "function") removeAllCustomSetsFromDex();
	getSaveImportStorage().removeItem(getSaveImportCustomSetsStorageKey());
	if (typeof clearTeamBoxState === "function") {
		clearTeamBoxState();
	} else {
		getSaveImportStorage().removeItem(
			typeof window.getKMCalculatorTeamBoxLayoutStorageKey === "function" ?
				window.getKMCalculatorTeamBoxLayoutStorageKey() : "royalSwordTeamBoxLayout"
		);
		$(".box-pokemon").remove();
		$(".save-box-section").remove();
	}
}

function addImportedPokemon(importedPokemon) {
	clearTeamBoxForSaveImport();
	for (var i = 0; i < importedPokemon.length; i++) addToDex(importedPokemon[i].pokemon);
	moveImportedPokemonToTeamBox(importedPokemon);
	if (typeof window.applyDefaultPlayerPokemonFromTeam === "function") window.applyDefaultPlayerPokemonFromTeam();
	if (typeof window.refreshColorCode === "function") window.refreshColorCode();
	if (typeof window.refreshBattleScriptTeamStrip === "function") window.refreshBattleScriptTeamStrip();
}

function setImportedPlayerBagItems(items) {
	if (!$.isArray(items)) return false;
	var storage = getSaveImportStorage();
	var key = getSaveImportWorkspaceStorageKey("bag-items");
	saveImportBagItemsByWorkspace[key] = items.slice(0);
	window.kmCalculatorImportedBagItems = items.slice(0);
	if (items.length) storage.setItem(key, JSON.stringify(items));
	else storage.removeItem(key);
	return true;
}

function parseImportedBagItems(raw) {
	if (!raw) return;
	try {
		var items = JSON.parse(raw);
		return $.isArray(items) ? items : undefined;
	} catch (error) {
		return;
	}
}

function getImportedPlayerBagItems() {
	var storage = getSaveImportStorage();
	var key = getSaveImportWorkspaceStorageKey("bag-items");
	var policy = getActiveSaveImportPolicy();
	if ($.isArray(saveImportBagItemsByWorkspace[key])) return saveImportBagItemsByWorkspace[key].slice(0);
	var items = parseImportedBagItems(storage.getItem(key));
	if ($.isArray(items)) {
		saveImportBagItemsByWorkspace[key] = items.slice(0);
		window.kmCalculatorImportedBagItems = items.slice(0);
		return items.slice(0);
	}
	storage.removeItem(key);

	/* One-way compatibility read for Royal Sword inventory stored before profile workspaces. */
	if (policy && policy.profileId === "pokemon-royal-sword") {
		items = parseImportedBagItems(storage.getItem(SAVE_IMPORT_BAG_ITEMS_KEY));
		if (!$.isArray(items) && $.isArray(window.royalSwordImportedBagItems)) {
			items = window.royalSwordImportedBagItems.slice(0);
		}
		if (!$.isArray(items)) items = parseImportedBagItems(storage.getItem(SAVE_IMPORT_LEGACY_BAG_ITEMS_KEY));
	}
	if (!$.isArray(items)) {
		saveImportBagItemsByWorkspace[key] = [];
		window.kmCalculatorImportedBagItems = [];
		return [];
	}
	saveImportBagItemsByWorkspace[key] = items.slice(0);
	window.kmCalculatorImportedBagItems = items.slice(0);
	if (items.length) storage.setItem(key, JSON.stringify(items));
	storage.removeItem(SAVE_IMPORT_BAG_ITEMS_KEY);
	storage.removeItem(SAVE_IMPORT_LEGACY_BAG_ITEMS_KEY);
	return items.slice(0);
}

function getImportedBagItemTotal(items) {
	var total = 0;
	for (var i = 0; i < (items || []).length; i++) total += Math.max(0, ~~items[i].count);
	return total;
}

window.reloadImportedPlayerBagItems = function () {
	var key = getSaveImportWorkspaceStorageKey("bag-items");
	delete saveImportBagItemsByWorkspace[key];
	window.royalSwordImportedBagItems = [];
	return getImportedPlayerBagItems();
};

function prepareImportedBagItems(items, generation) {
	if (items === null || items === undefined) return null;
	if (!$.isArray(items)) throw new Error("The save adapter returned invalid bag item data");
	var prepared = [];
	for (var i = 0; i < items.length; i++) {
		if (!items[i] || typeof items[i].name !== "string" || !items[i].name.trim() ||
			typeof items[i].count !== "number" || !isFinite(items[i].count) || items[i].count < 0) {
			throw new Error("The save adapter returned an invalid bag item at index " + i);
		}
		var itemName = resolveCalcName("items", items[i].name, generation);
		if (!itemName) throw new Error("The save adapter returned an unsupported bag item at index " + i);
		prepared.push({name: itemName, count: items[i].count});
	}
	return prepared;
}

function prepareSaveImport(importData, importName, policy) {
	if (!importData || !$.isArray(importData.slots)) {
		throw new Error("The save adapter did not return a Pokemon slot list");
	}
	var resolution = createSaveImportResolutionContext(importData, policy);
	var importedPokemon = [];
	for (var i = 0; i < importData.slots.length; i++) {
		var slot = importData.slots[i];
		var parsed = parsePokemonEntity(slot);
		var pokemon = buildImportedPokemon(slot, importName, resolution, parsed);
		if (pokemon) importedPokemon.push({pokemon: pokemon, isParty: slot.isParty});
	}
	if (!importedPokemon.length) throw new Error("No usable Pokemon were found in this save");
	return {
		importedPokemon: importedPokemon,
		bagItems: prepareImportedBagItems(importData.bagItems, importData.generation)
	};
}

function importPokemonSaveBuffer(buffer, fileName) {
	var data = new Uint8Array(buffer);
	var policy = getActiveSaveImportPolicy();
	var importData = getPokemonSaveImportData(data, fileName, policy && policy.adapter);
	validateSaveImportPolicy(importData, policy);
	var importName = (fileName || "Imported Save").replace(/\.[^.]+$/, "") || "Imported Save";
	var prepared = prepareSaveImport(importData, importName, policy);
	/* Commit only after every supported entity and bag record has passed preflight. */
	addImportedPokemon(prepared.importedPokemon);
	var bagItemsUpdated = setImportedPlayerBagItems(prepared.bagItems);
	return {
		pokemonCount: prepared.importedPokemon.length,
		game: importData.game,
		generation: importData.generation,
		bagItemsUpdated: bagItemsUpdated,
		bagItemCount: bagItemsUpdated ? getImportedBagItemTotal(prepared.bagItems) : getImportedBagItemTotal(getImportedPlayerBagItems())
	};
}

function importPokemonSaveFile(file) {
	if (!file) return;
	if (!window.SAVE_IMPORT_TEXT) {
		alert("Save import data is missing. Please refresh the page and try again.");
		return;
	}
	var reader = new FileReader();
	reader.onload = function (event) {
		try {
			var result = importPokemonSaveBuffer(event.target.result, file.name);
			var message = "Successfully imported " + result.pokemonCount + " Pokemon from " + result.game;
			if (result.bagItemCount) message += " and " + result.bagItemCount + (result.bagItemCount === 1 ? " held bag item" : " held bag items");
			if (!result.bagItemsUpdated) message += ". Existing held bag inventory was kept.";
			alert(message);
		} catch (error) {
			alert("Save import failed: " + error.message);
		}
	};
	reader.onerror = function () { alert("Save import failed: could not read the selected file."); };
	reader.readAsArrayBuffer(file);
}

function importSwordShieldSaveBuffer(buffer, fileName) {
	return importPokemonSaveBuffer(buffer, fileName);
}

function importSwordShieldSaveFile(file) {
	return importPokemonSaveFile(file);
}

window.KM_SAVE_IMPORT = {
	source: SAVE_IMPORT_VALIDATION_SOURCE,
	dataSources: SAVE_IMPORT_TEXT.sources,
	supportedSaveFormats: SAVE_IMPORT_FORMATS.map(function (format) { return {id: format.id, name: format.name, generation: format.generation}; }),
	entityFormats: ENTITY_FORMATS,
	detectSaveFormat: function (data) {
		var detected = detectPokemonSaveFormat(data);
		return detected ? {id: detected.id, game: detected.game, generation: detected.generation} : null;
	},
	getImportData: getPokemonSaveImportData,
	getActiveProfilePolicy: getActiveSaveImportPolicy,
	validateProfilePolicy: validateSaveImportPolicy,
	registerSaveAdapter: registerPokemonSaveAdapter,
	getSaveAdapter: getSaveImportAdapter,
	getSupportedSaveFormats: function () { return SAVE_IMPORT_FORMATS.map(function (format) { return {id: format.id, name: format.name, generation: format.generation}; }); },
	parseEntity: parsePokemonEntity,
	decryptEntity: decryptEntityData,
	checksumEntity: function (data, format) { var config = ENTITY_FORMATS[format]; return config.crypto === "3" ? add16(data, 0x20, config.storedSize) : add16(data, 8, config.storedSize); },
	crc16: function (data, start, length) { return crc16CCITT(data, start || 0, length === undefined ? data.length : length); },
	getSwitchDescriptor: getSwitchSaveDescriptor,
	getSwitchSlots: getSwitchSlotsFromBlocks,
	resolveSpeciesName: resolveSpeciesName,
	getItemSourceName: getItemSourceName,
	buildPokemon: buildImportedPokemon
};
window.PKHEX_SAVE_IMPORT = window.KM_SAVE_IMPORT; // Legacy API alias.

window.getImportedPlayerBagItems = getImportedPlayerBagItems;
window.importPokemonSaveBuffer = importPokemonSaveBuffer;
window.importPokemonSaveFile = importPokemonSaveFile;
window.importSwordShieldSaveBuffer = importSwordShieldSaveBuffer;
window.importSwordShieldSaveFile = importSwordShieldSaveFile;
