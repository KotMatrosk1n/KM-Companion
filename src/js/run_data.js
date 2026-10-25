/*global module, require, TextEncoder */
(function (root, factory) {
	if (typeof module === "object" && module.exports) module.exports = factory(require("./trainer_data_registry"));
	else root.KMRunData = factory(root.KMTrainerDataRegistry);
})(typeof self !== "undefined" ? self : this, function (trainerData) {
	"use strict";
	var MAX_BYTES = 16 * 1024 * 1024;
	var WORKSPACE = "kmCalculatorProfileWorkspace:v1:";
	var NOTES = "kmCalculatorNotes:v2:";
	var kinds = ["customsets", "team-box-layout", "team-box-color-options", "bag-items"];
	var modes = ["normal", "royalocke", "nuzlocke"];
	function object(value) { return value !== null && typeof value === "object" && !Array.isArray(value); }
	function ensure(condition, message) { if (!condition) throw new Error(message || "This run backup contains invalid data."); }
	function safeTree(value, depth) {
		ensure(depth < 40);
		if (!value || typeof value !== "object") return;
		Object.keys(value).forEach(function (key) {
			ensure(key !== "__proto__" && key !== "constructor" && key !== "prototype");
			safeTree(value[key], depth + 1);
		});
	}
	function profileInfo(profile) {
		ensure(object(profile) && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(profile.id) && profile.id.length < 150);
		ensure(typeof profile.name === "string" && profile.name.length > 0 && profile.name.length <= 200);
		ensure(Number.isInteger(profile.generation) && profile.generation >= 1 && profile.generation <= 9);
		ensure(typeof profile.packId === "string" && (!profile.packId || /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(profile.packId)));
		return {id: profile.id, name: profile.name, generation: profile.generation, packId: profile.packId};
	}
	function fixedKeys(profile) {
		var id = profile.id;
		return kinds.map(function (kind) { return WORKSPACE + id + ":" + kind; }).concat([
			"km-calculator.trainers.v1." + id, "km-calculator.encounter-mode." + id,
			"km-calculator.encounters.v1." + id, "km-calculator.route-items.v1." + id
		], modes.map(function (mode) { return "km-calculator.encounters.v2." + id + "." + mode; }));
	}
	function owns(key, profile) {
		var prefix = NOTES + profile.id + ":";
		return fixedKeys(profile).indexOf(key) !== -1 || (key.indexOf(prefix) === 0 &&
			(key.slice(prefix.length) === "global" || /^trainer:.{1,200}$/.test(key.slice(prefix.length))));
	}
	function matchesPack(pack, profile) { return pack.id === profile.packId || pack.profileId === profile.id; }
	function validateEntry(key, value, profile) {
		ensure(owns(key, profile) && typeof value === "string" && value.length <= MAX_BYTES);
		if (key.indexOf(NOTES) === 0) return;
		if (key.indexOf("km-calculator.encounter-mode.") === 0) { ensure(modes.indexOf(value) !== -1); return; }
		var data;
		try { data = JSON.parse(value); } catch (error) { throw new Error("This run backup contains unreadable saved data."); }
		safeTree(data, 0);
		if (key.endsWith(":bag-items")) { ensure(Array.isArray(data) && data.every(function (item) { return object(item) && typeof item.name === "string" && Number.isFinite(item.count) && item.count >= 0; })); return; }
		ensure(object(data));
		if (key.endsWith(":customsets")) Object.keys(data).forEach(function (species) {
			ensure(object(data[species]));
			Object.keys(data[species]).forEach(function (name) {
				var set = data[species][name];
				ensure(object(set) && Array.isArray(set.moves) && set.moves.length <= 4 && set.moves.every(function (move) { return typeof move === "string"; }));
			});
		});
		if (key.endsWith(":team-box-layout")) Object.keys(data).forEach(function (zone) {
			ensure(["team-poke-list", "box-poke-list", "box-poke-list2", "compost-poke-list", "trash-box"].indexOf(zone) !== -1);
			ensure(Array.isArray(data[zone]) && data[zone].every(function (id) { return typeof id === "string"; }));
		});
		if (key.endsWith(":team-box-color-options")) ensure(typeof data.speedBorder === "boolean" && typeof data.ohkoColor === "boolean");
		if (key.indexOf("km-calculator.trainers.") === 0) ensure(data.version === 1 && Array.isArray(data.beaten) && data.beaten.every(function (id) { return typeof id === "string"; }));
		if (key.indexOf("km-calculator.route-items.") === 0) ensure(data.version === 1 && Array.isArray(data.pickedUp) && data.pickedUp.every(function (id) { return typeof id === "string" && id.length > 0 && id.length <= 200; }));
		if (key.indexOf("km-calculator.encounters.") === 0) ensure((data.version === 1 || data.version === 2) && Array.isArray(data.catches) && Array.isArray(data.usedAreas) &&
			data.usedAreas.every(function (area) { return typeof area === "string"; }) && data.catches.every(function (record) {
			return object(record) && typeof record.pokemon === "string" && typeof record.source === "string" && typeof record.area === "string";
		}));
	}
	function validate(value) {
		ensure(object(value) && value.schema === "km-calculator.run" && value.version === 1, "Choose a supported KM Companion run backup.");
		ensure(new TextEncoder().encode(JSON.stringify(value)).length <= MAX_BYTES, "This backup is too large to restore.");
		safeTree(value, 0);
		var profile = profileInfo(value.profile);
		ensure(typeof value.createdAt === "string" && Number.isFinite(Date.parse(value.createdAt)));
		ensure(typeof value.appVersion === "string" && value.appVersion.length <= 80 && object(value.entries) && Object.keys(value.entries).length <= 10000);
		Object.keys(value.entries).forEach(function (key) { validateEntry(key, value.entries[key], profile); });
		ensure(Array.isArray(value.trainerPacks) && value.trainerPacks.length <= 100);
		var ids = [];
		var packs = value.trainerPacks.map(function (pack) {
			var normalized = trainerData.normalizePack(pack);
			ensure(matchesPack(normalized, profile) && normalized.id !== "pokemon-royal-sword" && ids.indexOf(normalized.id) === -1);
			ids.push(normalized.id); return normalized;
		});
		return {schema: value.schema, version: 1, profile: profile, createdAt: value.createdAt,
			appVersion: value.appVersion, entries: JSON.parse(JSON.stringify(value.entries)), trainerPacks: packs};
	}
	function packsFrom(records) {
		var packs = JSON.parse(records[trainerData.DEFAULT_STORAGE_KEY] || "[]");
		ensure(Array.isArray(packs), "Saved trainer data could not be read."); return packs;
	}
	function capture(records, profile, appVersion) {
		profile = profileInfo(profile);
		var entries = {};
		Object.keys(records).forEach(function (key) { if (owns(key, profile) && records[key] !== null) entries[key] = records[key]; });
		// Include notes that have not yet been opened since their original migration.
		if (profile.id === "pokemon-royal-sword") Object.keys(records).forEach(function (key) {
			var match = /^royalSwordNotes:v1:(global|trainer:(\d+))$/.exec(key);
			if (!match) return;
			var target = NOTES + profile.id + ":" + (match[1] === "global" ? "global" : "trainer:pokemon-royal-sword:trainer-" + (Number(match[2]) + 1));
			if (!Object.prototype.hasOwnProperty.call(entries, target)) entries[target] = records[key];
		});
		return validate({schema: "km-calculator.run", version: 1, profile: profile, createdAt: new Date().toISOString(),
			appVersion: appVersion || "", entries: entries, trainerPacks: packsFrom(records).filter(function (pack) { return matchesPack(pack, profile); })});
	}
	function apply(records, input) {
		var backup = validate(input), next = Object.assign({}, records);
		Object.keys(next).forEach(function (key) {
			if (owns(key, backup.profile) || (backup.profile.id === "pokemon-royal-sword" && /^royalSwordNotes:v1:/.test(key))) delete next[key];
		});
		Object.keys(backup.entries).forEach(function (key) { next[key] = backup.entries[key]; });
		var existing = packsFrom(records);
		backup.trainerPacks.forEach(function (pack) {
			ensure(!existing.some(function (other) { return other.id === pack.id && !matchesPack(other, backup.profile); }), "A trainer pack in this backup belongs to another profile.");
		});
		var packs = existing.filter(function (pack) { return !matchesPack(pack, backup.profile); }).concat(backup.trainerPacks);
		if (packs.length || Object.prototype.hasOwnProperty.call(records, trainerData.DEFAULT_STORAGE_KEY)) next[trainerData.DEFAULT_STORAGE_KEY] = JSON.stringify(packs);
		return next;
	}
	function resetProgress(records, profileId) {
		ensure(typeof profileId === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(profileId) && profileId.length < 150, "Choose a profile before resetting a run.");
		var next = Object.assign({}, records);
		// Empty legacy progress also prevents an older catch log from being imported again.
		next["km-calculator.encounters.v1." + profileId] = JSON.stringify({version: 1, catches: [], usedAreas: []});
		modes.forEach(function (mode) {
			next["km-calculator.encounters.v2." + profileId + "." + mode] = JSON.stringify({version: 2, catches: [], usedAreas: []});
		});
		next["km-calculator.trainers.v1." + profileId] = JSON.stringify({version: 1, beaten: []});
		next["km-calculator.route-items.v1." + profileId] = JSON.stringify({version: 1, pickedUp: []});
		return next;
	}
	return {MAX_BYTES: MAX_BYTES, capture: capture, validate: validate, apply: apply, fixedKeys: fixedKeys, owns: owns, resetProgress: resetProgress};
});
