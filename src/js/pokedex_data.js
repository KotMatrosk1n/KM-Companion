/*global module */
/* Profile facts stay separate from the National Dex index and calculator tables. */
(function (root, factory) {
	if (typeof module === "object" && module.exports) module.exports = factory();
	else root.KMPokedexData = factory();
})(typeof self !== "undefined" ? self : this, function () {
	"use strict";
	var statNames = ["HP", "Attack", "Defense", "Sp. Atk", "Sp. Def", "Speed"];
	function normalize(value) {
		return String(value || "").replace(/♀/g, " female ").replace(/♂/g, " male ").normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9\u3040-\u30ff\u3400-\u9fff\uac00-\ud7af]+/g, "");
	}
	function identity(value) {
		return normalize(value).replace(/^nidoranf$/, "nidoranfemale").replace(/^nidoranm$/, "nidoranmale").replace(/galarian/, "galar").replace(/alolan/, "alola");
	}
	function hasData(entry) { return !!entry && entry.stats.length === 6 && entry.stats.every(function (value) { return value > 0; }); }
	function searchNames(name) {
		var alternate = name.replace(/^(.*)-Mega(?:-([XY]))?$/, function (match, base, suffix) { return "Mega " + base + (suffix ? " " + suffix : ""); });
		return normalize(name) + " " + normalize(alternate.replace(/(.+)-(Alola|Galar|Hisui)$/, function (match, base, region) {
			return ({Alola: "Alolan", Galar: "Galarian", Hisui: "Hisuian"})[region] + " " + base;
		}));
	}
	function createIndex(catalog, pack, reference, generation) {
		var entries = Object.create(null), names = Object.create(null), forms = Object.create(null), locations = Object.create(null);
		(pack && pack.entries || []).forEach(function (entry) {
			entries[entry.key] = entry;
			names[identity(entry.name)] = entry.key;
			if (!forms[entry.number]) forms[entry.number] = [];
			forms[entry.number].push(entry);
		});
		(pack && pack.battleForms || []).forEach(function (form) {
			if (form.formKind !== "mega" || !generation || !generation.species) return;
			var base = entries[form.number + ":0"], resolved = generation.species.get(identity(form.calcName));
			if (!base || !resolved || identity(resolved.baseSpecies) !== identity(base.name)) return;
			if ((forms[form.number] || []).some(function (entry) { return hasData(entry) && identity(entry.name) === identity(resolved.name); })) return;
			var inherited = hasData(base) ? base : {number: base.number, present: false, catchRate: null, friendship: null, gender: null, hatchCycles: null, growth: null, eggGroups: [], baseExperience: null, evYield: [], heldItems: null, dexNumbers: {}, color: null};
			var entry = Object.assign({}, inherited, form, {name: resolved.name, baseKey: base.key, source: "profile-calculator", stats: ["hp", "atk", "def", "spa", "spd", "spe"].map(function (stat) { return resolved.baseStats[stat]; }), types: resolved.types.slice(), abilities: [resolved.abilities && resolved.abilities[0] || null, resolved.abilities && resolved.abilities[1] || null, resolved.abilities && resolved.abilities.H || null], weight: resolved.weightkg, moves: base.moves || [], evolutions: []});
			entries[entry.key] = entry; names[identity(entry.name)] = entry.key;
			forms[entry.number].push(entry);
		});
		(catalog.species || []).forEach(function (species) { names[identity(species.name)] = species.number + ":0"; });
		(reference && reference.areas || []).forEach(function (area) {
			area.groups.forEach(function (group) {
				group.entries.forEach(function (row) {
					var key = names[identity(row.pokemon)];
					if (!key) return;
					if (!locations[key]) locations[key] = [];
					locations[key].push({area: area.name, method: group.method, weather: group.weather || "", level: row.level, rate: row.rate, note: row.note || row.trade || ""});
				});
			});
		});
		return {catalog: catalog, pack: pack, entries: entries, forms: forms, names: names, locations: locations};
	}
	function search(index, query, filters) {
		filters = filters || {};
		var q = normalize(query), number = /^#?\d+$/.test(String(query).trim()) ? Number(String(query).replace("#", "")) : null;
		return index.catalog.species.filter(function (species) {
			var forms = index.forms[species.number] || [];
			if (number !== null ? number !== species.number : q && !forms.some(function (entry) { return searchNames(entry.name).indexOf(q) !== -1; }) && normalize(species.name).indexOf(q) === -1 && !species.names.some(function (name) { return normalize(name.name).indexOf(q) !== -1; })) return false;
			if (filters.generation && Number(filters.generation) !== species.generation) return false;
			if (filters.type && !forms.some(function (entry) { return hasData(entry) && entry.types.indexOf(filters.type) !== -1; })) return false;
			if (filters.availability === "present" && !forms.some(function (entry) { return entry.present && hasData(entry); })) return false;
			if (filters.availability === "locations" && !forms.some(function (entry) { return (index.locations[entry.key] || []).length; })) return false;
			if (filters.availability === "missing" && forms.some(hasData)) return false;
			return true;
		}).sort(function (a, b) { return a.number - b.number; });
	}
	function targetKey(index, source, evolution) {
		var form = evolution.form < 0 ? source.form : evolution.form;
		var key = evolution.number + ":" + form;
		return index.entries[key] ? key : evolution.number + ":0";
	}
	function evolutionFamily(index, key) {
		if (index.entries[key] && index.entries[key].baseKey) key = index.entries[key].baseKey;
		var keys = [key], edges = [], seen = Object.create(null), changed = true;
		while (changed) {
			changed = false;
			Object.keys(index.entries).forEach(function (id) {
				var entry = index.entries[id];
				(entry.evolutions || []).forEach(function (evolution, i) {
					var target = targetKey(index, entry, evolution);
					if (keys.indexOf(id) === -1 && keys.indexOf(target) === -1) return;
					if (!seen[id + "/" + i]) { edges.push({from: entry, to: index.entries[target], rule: evolution}); seen[id + "/" + i] = true; }
					[id, target].forEach(function (next) { if (keys.indexOf(next) === -1) { keys.push(next); changed = true; } });
				});
			});
		}
		return edges;
	}
	function evolutionText(rule, lookup) {
		lookup = lookup || {};
		var level = rule.level ? "Level " + rule.level : "Level up";
		var item = (lookup.items || [])[rule.argument] || "item " + rule.argument;
		var move = (lookup.moves || [])[rule.argument] || "move " + rule.argument;
		var pokemon = (lookup.species || [])[rule.argument] || "Pokémon " + rule.argument;
		var moveType = ["Normal", "Fighting", "Flying", "Poison", "Ground", "Rock", "Bug", "Ghost", "Steel", "Fire", "Water", "Grass", "Electric", "Psychic", "Ice", "Dragon", "Dark", "Fairy"][rule.argument] || "specified";
		var descriptions = {
			1: "High friendship", 2: "High friendship during the day", 3: "High friendship at night", 4: level,
			5: "Trade", 6: "Trade holding " + item, 7: "Trade for the matching Shelmet or Karrablast", 8: "Use " + item,
			9: level + ", Attack greater than Defense", 10: level + ", Attack equals Defense", 11: level + ", Defense greater than Attack",
			12: level + ", personality branch 1", 13: level + ", personality branch 2", 14: level,
			15: level + ", empty party slot and a Poké Ball", 16: "Level up with high Beauty", 17: "Male: use " + item, 18: "Female: use " + item,
			19: "Level up holding " + item + " during the day", 20: "Level up holding " + item + " at night",
			21: "Level up knowing " + move, 22: "Level up with " + pokemon + " in the party", 23: "Male: " + level, 24: "Female: " + level,
			25: "Level up in a magnetic field", 26: "Level up near a Moss Rock", 27: "Level up near an Ice Rock", 28: level + ", console held upside down",
			29: "High affection or friendship and a " + moveType + " type move", 30: "Level up knowing a " + moveType + " type move",
			31: level + " in rain", 32: level + " during the day", 33: level + " at night", 34: "Female: " + level,
			36: level + ", game version condition", 37: level + ", day and game version condition", 38: level + ", night and game version condition",
			39: "Level up at Mount Lanakila", 40: level + " at dusk", 41: "Level up in an Ultra Wormhole", 42: "Use " + item + " in an Ultra Wormhole",
			43: "Land three critical hits in one battle", 44: "Lose at least 49 HP, then pass under the stone arch in Dusty Bowl",
			45: "Spin while holding a Sweet; direction, duration, and time determine the form", 46: level + ", Amped nature", 47: level + ", Low Key nature",
			48: "Complete the Tower of Darkness trial", 49: "Complete the Tower of Waters trial"
		};
		return descriptions[rule.method] || "Evolution condition " + rule.method + " (" + rule.argument + ")";
	}
	function defenses(entry, generation) {
		if (!hasData(entry) || !generation || !generation.types) return [];
		var result = [];
		for (var type of generation.types) {
			if (type.name === "???" || type.name === "Stellar") continue;
			result.push({type: type.name, multiplier: entry.types.reduce(function (value, defending) {
				var factor = type.effectiveness[defending];
				return value * (factor === undefined ? 1 : factor);
			}, 1)});
		}
		return result;
	}
	function gender(value) {
		if (value === null || value === undefined) return "Not recorded";
		if (value === 255) return "Genderless";
		if (value === 254) return "100% female";
		if (value === 0) return "100% male";
		// Game thresholds represent eighths, with 127 as the equal ratio.
		var ratios = {31: 12.5, 63: 25, 127: 50, 191: 75, 225: 87.5};
		var female = ratios[value] === undefined ? Math.round((value + 1) / 256 * 1000) / 10 : ratios[value];
		return (100 - female) + "% male / " + female + "% female";
	}
	function statRange(entry, stat, level, evs) {
		if (stat === 0 && identity(entry.name) === "shedinja") return [1, 1];
		var base = entry.stats[stat];
		var min = Math.floor(2 * base * level / 100), max = Math.floor((2 * base + 31 + (evs ? 63 : 0)) * level / 100);
		return stat === 0 ? [min + level + 10, max + level + 10] : [Math.floor((min + 5) * 0.9), Math.floor((max + 5) * 1.1)];
	}
	return {normalize: normalize, searchNames: searchNames, identity: identity, createIndex: createIndex, search: search, hasData: hasData, evolutionFamily: evolutionFamily, evolutionText: evolutionText, defenses: defenses, gender: gender, statNames: statNames, statRange: statRange};
});
