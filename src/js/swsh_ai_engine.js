/*global SWSH_AI_DATA */
(function (global) {
	"use strict";

	var data = global.SWSH_AI_DATA || (typeof SWSH_AI_DATA !== "undefined" ? SWSH_AI_DATA : null);
	var TYPE_IDS = {
		normal: 0,
		fighting: 1,
		flying: 2,
		poison: 3,
		ground: 4,
		rock: 5,
		bug: 6,
		ghost: 7,
		steel: 8,
		fire: 9,
		water: 10,
		grass: 11,
		electric: 12,
		psychic: 13,
		ice: 14,
		dragon: 15,
		dark: 16,
		fairy: 17
	};
	var CATEGORY_IDS = {
		status: 0,
		physical: 1,
		special: 2
	};
	var WEATHER_IDS = {
		sun: 1,
		"harsh sunshine": 6,
		rain: 2,
		"heavy rain": 5,
		hail: 3,
		snow: 3,
		sand: 4,
		sandstorm: 4,
		"strong winds": 7
	};
	var TERRAIN_CODES = {
		Grassy: 1,
		Misty: 2,
		Electric: 3,
		Psychic: 4
	};
	var GLOBAL_FIELD_SLOTS = {
		gravity: 2,
		wonderroom: 4,
		magicroom: 5
	};
	var SCRIPT_ENTRY_PC = {
		honoo_gym_rival: 23,
		item: 34,
		honoo_gym_item: 34,
		pokechange: 42
	};
	var DEFAULT_MOVE_SCRIPTS = ["basic", "strong", "expert", "allowance"];
	var SCORE_EVENT_DESCRIPTIONS = {
		"basic:10352": "status blocked by side condition",
		"basic:10378": "target already has major status",
		"basic:10407": "status blocked by type matchup",
		"basic:10512": "status blocked by target ability",
		"basic:10846": "status blocked by terrain",
		"strong:934": "damaging move can KO",
		"strong:1056": "better damaging option exists",
		"expert:14003": "AI is slower and status pressure is valuable",
		"allowance:109": "move allowed by damage/effectiveness gate"
	};
	var RNG_PROFILES = [
		{name: "low", stream: [0, 0, 0, 0, 0, 0, 0, 0], cachedRoll: 0},
		{name: "mid", stream: [64, 128, 192, 64, 128, 192, 64, 128], cachedRoll: 128},
		{name: "high", stream: [255, 255, 255, 255, 255, 255, 255, 255], cachedRoll: 255}
	];
	var ABSORB_ABILITIES = {
		10: {12: true},
		11: {10: true},
		18: {9: true},
		26: {4: true},
		31: {12: true},
		78: {12: true},
		87: {10: true},
		114: {10: true},
		157: {11: true}
	};
	var MOLD_BREAKER_ABILITIES = {
		104: true,
		163: true,
		164: true
	};
	var EFFECTIVENESS_CHART = [
		[4, 4, 4, 4, 4, 2, 4, 0, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4],
		[8, 4, 2, 2, 4, 8, 2, 0, 8, 4, 4, 4, 4, 2, 8, 4, 8, 2],
		[4, 8, 4, 4, 4, 2, 8, 4, 2, 4, 4, 8, 2, 4, 4, 4, 4, 4],
		[4, 4, 4, 2, 2, 2, 4, 2, 0, 4, 4, 8, 4, 4, 4, 4, 4, 8],
		[4, 4, 0, 8, 4, 8, 2, 4, 8, 8, 4, 2, 8, 4, 4, 4, 4, 4],
		[4, 2, 8, 4, 2, 4, 8, 4, 2, 8, 4, 4, 4, 4, 8, 4, 4, 4],
		[4, 2, 2, 2, 4, 4, 4, 2, 2, 2, 4, 8, 4, 8, 4, 4, 8, 2],
		[0, 4, 4, 4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 8, 4, 4, 2, 4],
		[4, 4, 4, 4, 4, 8, 4, 4, 2, 2, 2, 4, 2, 4, 8, 4, 4, 8],
		[4, 4, 4, 4, 4, 2, 8, 4, 8, 2, 2, 8, 4, 4, 8, 2, 4, 4],
		[4, 4, 4, 4, 8, 8, 4, 4, 4, 8, 2, 2, 4, 4, 4, 2, 4, 4],
		[4, 4, 2, 2, 8, 8, 2, 4, 2, 2, 8, 2, 4, 4, 4, 2, 4, 4],
		[4, 4, 8, 4, 0, 4, 4, 4, 4, 4, 8, 2, 2, 4, 4, 2, 4, 4],
		[4, 8, 4, 8, 4, 4, 4, 4, 2, 4, 4, 4, 4, 2, 4, 4, 0, 4],
		[4, 4, 8, 4, 8, 4, 4, 4, 2, 2, 2, 8, 4, 4, 2, 8, 4, 4],
		[4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4, 4, 4, 4, 4, 8, 4, 0],
		[4, 2, 4, 4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 8, 4, 4, 2, 2],
		[4, 8, 4, 2, 4, 4, 4, 4, 2, 2, 4, 4, 4, 4, 4, 8, 8, 4]
	];

	function normalizeName(value) {
		return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, "");
	}

	function firstNumber(values, fallback) {
		for (var i = 0; i < values.length; i++) {
			if (typeof values[i] === "number" && !isNaN(values[i])) return values[i];
		}
		return fallback;
	}

	function boolValue(value) {
		if (typeof value === "boolean") return value;
		if (typeof value === "number") return value !== 0;
		if (typeof value === "string") return value !== "" && value !== "0" && value.toLowerCase() !== "false";
		return !!value;
	}

	function cell(value) {
		value = Number(value) || 0;
		if (value > 9007199254740991) return 9007199254740991;
		if (value < -9007199254740991) return -9007199254740991;
		return value < 0 ? Math.ceil(value) : Math.floor(value);
	}

	function scoreObject(moveName, minScore, maxScore, expectedScore, notes) {
		return {
			move: moveName,
			minScore: minScore,
			maxScore: maxScore,
			expectedScore: expectedScore,
			displayBase: 100,
			notes: notes || []
		};
	}

	function addScoreNote(score, note) {
		if (!note) return;
		if (score.notes.indexOf(note) === -1) score.notes.push(note);
	}

	function statKey(key) {
		return {
			atk: "attack",
			def: "defense",
			spa: "spatk",
			spc: "spatk",
			spd: "spdef",
			spe: "speed",
			sa: "spatk",
			sd: "spdef",
			hp: "hp"
		}[key] || key;
	}

	function typeId(typeName) {
		return TYPE_IDS[normalizeName(typeName)];
	}

	function categoryId(category) {
		return CATEGORY_IDS[normalizeName(category)];
	}

	function lookupMove(move) {
		var key = normalizeName(move && move.name);
		return data && data.moveIndex ? data.moveIndex[key] || null : null;
	}

	function lookupItem(itemName) {
		var key = normalizeName(itemName);
		return data && data.itemIndex ? data.itemIndex[key] || null : null;
	}

	function abilityId(abilityName) {
		var key = normalizeName(abilityName);
		return data && data.abilityIndex && data.abilityIndex[key] ? data.abilityIndex[key] : 0;
	}

	function speciesId(speciesName) {
		var key = normalizeName(speciesName);
		return data && data.speciesIndex && data.speciesIndex[key] ? data.speciesIndex[key] : 0;
	}

	function pokemonTypes(pokemon) {
		var types = pokemon ? (pokemon.types || pokemon.rawTypes || []) : [];
		var result = [];
		for (var i = 0; i < types.length; i++) {
			var id = typeId(types[i]);
			if (typeof id === "number") result.push(id);
		}
		if (!result.length) result.push(0);
		if (result.length === 1) result.push(result[0]);
		return result;
	}

	function rawStatValue(pokemon, key) {
		var rawKey = {attack: "atk", defense: "def", spatk: "spa", spdef: "spd", speed: "spe"}[key] || key;
		if (pokemon && pokemon.rawStats && typeof pokemon.rawStats[rawKey] === "number") return pokemon.rawStats[rawKey];
		if (pokemon && pokemon.stats && typeof pokemon.stats[rawKey] === "number") return pokemon.stats[rawKey];
		if (pokemon && pokemon.stats && typeof pokemon.stats[key] === "number") return pokemon.stats[key];
		return 0;
	}

	function statusCode(status) {
		status = normalizeName(status);
		if (!status) return 0;
		if (status === "slp" || status === "sleep") return 1;
		if (status === "psn" || status === "poison") return 2;
		if (status === "brn" || status === "burn") return 3;
		if (status === "par" || status === "paralysis") return 4;
		if (status === "frz" || status === "freeze") return 5;
		if (status === "tox" || status === "badlypoisoned") return 6;
		return 7;
	}

	function packedSlotsFor(entry) {
		var pokemon = entry && entry.pokemon;
		var slots = {};
		var status = statusCode(pokemon && pokemon.status);
		if (status) slots[status] = 1;
		if (pokemon && pokemon.item === "Assault Vest") slots[0x0B] = 1;
		if (entry && entry.choiceLockMoveId) slots[0x1C] = entry.choiceLockMoveId;
		return slots;
	}

	function isChoiceLockItem(itemName) {
		var key = normalizeName(itemName);
		return key === "choiceband" || key === "choicescarf" || key === "choicespecs";
	}

	function moveIdFor(move) {
		var vanilla = lookupMove(move);
		return vanilla ? vanilla.id : 0;
	}

	function isMoveUsableForEntry(entry, move) {
		var pokemon = entry && entry.pokemon;
		var moveId;
		var category;
		if (!move || !move.name || move.name === "(No Move)") return false;
		if (!pokemon) return true;
		if (isChoiceLockItem(pokemon.item) && entry.choiceLockMoveId) {
			moveId = moveIdFor(move);
			if (!moveId || moveId !== entry.choiceLockMoveId) return false;
		}
		if (pokemon.item === "Assault Vest") {
			category = move.category || (lookupMove(move) || {}).category || "";
			if (normalizeName(category) === "status") return false;
		}
		return true;
	}

	function moveRecord(move, index, entry) {
		var vanilla = lookupMove(move);
		var generation = entry && entry.pokemon && entry.pokemon.gen;
		var profileMove = generation && generation.game === "royal-sword" && generation.moves.get(normalizeName(move && move.name));
		var type = profileMove ? typeId(profileMove.type) : vanilla ? vanilla.type : typeId(move && move.type);
		var category = profileMove ? categoryId(profileMove.category) : vanilla ? vanilla.category : categoryId(move && move.category);
		var power = profileMove ? profileMove.basePower : vanilla ? vanilla.power : (move && (move.bp || move.basePower) ? (move.bp || move.basePower) : 0);
		var effect = vanilla ? vanilla.effect : 0;
		return {
			slot: index,
			move_id: vanilla ? vanilla.id : 0,
			id: vanilla ? vanilla.id : 0,
			name: move && move.name ? move.name : "",
			type: typeof type === "number" ? type : 0,
			move_type: typeof type === "number" ? type : 0,
			category: typeof category === "number" ? category : 0,
			move_category: typeof category === "number" ? category : 0,
			base_power: power || 0,
			power: power || 0,
			effect_id: effect || 0,
			effect: effect || 0,
			priority: profileMove ? profileMove.priority : vanilla ? vanilla.priority : (move && move.priority ? move.priority : 0),
			target_behavior: vanilla ? vanilla.target : 0,
			pp: 1,
			can_use_move: isMoveUsableForEntry(entry, move)
		};
	}

	function battlerRecord(selector, side, entry, state, helpers) {
		var pokemon = entry && entry.pokemon;
		var item = lookupItem(pokemon && pokemon.item);
		var moves = [];
		var stats = {};
		var boosts = {};
		var moveList = pokemon && pokemon.moves ? pokemon.moves : [];
		for (var i = 0; i < moveList.length; i++) {
			if (moveList[i] && moveList[i].name && moveList[i].name !== "(No Move)") moves.push(moveRecord(moveList[i], i, entry));
		}
		["attack", "defense", "spatk", "spdef", "speed", "hp"].forEach(function (key) {
			var shortKey = {attack: "atk", defense: "def", spatk: "spa", spdef: "spd", speed: "spe"}[key] || key;
			stats[key] = rawStatValue(pokemon, key);
			boosts[key] = pokemon && pokemon.boosts && typeof pokemon.boosts[shortKey] === "number" ? pokemon.boosts[shortKey] : 0;
		});
		return {
			selector: selector,
			side: side,
			hp: {
				current_hp: entry && entry.hp ? entry.hp.max : (entry && entry.maxHP ? entry.maxHP : 1),
				current: entry && entry.hp ? entry.hp.max : (entry && entry.maxHP ? entry.maxHP : 1),
				max_hp: entry && entry.maxHP ? entry.maxHP : 1,
				max: entry && entry.maxHP ? entry.maxHP : 1
			},
			current_hp: entry && entry.hp ? entry.hp.max : (entry && entry.maxHP ? entry.maxHP : 1),
			max_hp: entry && entry.maxHP ? entry.maxHP : 1,
			level: pokemon && pokemon.level ? pokemon.level : 50,
			ability: abilityId(pokemon && pokemon.ability),
			effective_ability: abilityId(pokemon && pokemon.ability),
			ability_name: pokemon && pokemon.ability ? pokemon.ability : "",
			held_item: item ? item.id : 0,
			item: item ? item.id : 0,
			held_item_record: item || null,
			move_order_last_item: !!(pokemon && /^(?:Lagging Tail|Full Incense)$/.test(pokemon.item || "")),
			consumed_item: lookupItem(entry && entry.consumedItem) ? lookupItem(entry && entry.consumedItem).id : 0,
			custap_ready: !!(entry && entry.custapReady),
			types: pokemonTypes(pokemon),
			moves: moves,
			major_status: statusCode(pokemon && pokemon.status),
			choice_lock_move_id: entry && entry.choiceLockMoveId ? entry.choiceLockMoveId : 0,
			packed_slots: packedSlotsFor(entry),
			stat_stages: boosts,
			stats: stats,
			speed: helpers && helpers.getSpeed ? helpers.getSpeed(entry, state) : stats.speed,
			species: speciesId(pokemon && (pokemon.species || pokemon.name)),
			form: 0,
			gender_code: pokemon && pokemon.gender === "F" ? 2 : pokemon && pokemon.gender === "M" ? 1 : 0,
			belch_berry_consumed: !!(entry && entry.belchBerryConsumed),
			stockpile_count: 0,
			protect_counter: 0,
			nearly_all_move_slots_populated: moves.length >= 4,
			has_four_moves: moves.length >= 4,
			active_state_age_counter: entry && entry.hasActed ? 1 : 0,
			substitute_hp: entry && entry.substitute ? entry.substitute : 0,
			dynamax_active: !!(pokemon && pokemon.isDynamaxed),
			weight: pokemon && pokemon.weightkg ? Math.round(pokemon.weightkg * 10) : 100,
			previous_move_failed: false,
			future_attack_pending: false
		};
	}

	function sideConditionRecord(raw) {
		var record = {};
		for (var key in raw || {}) {
			if (Object.prototype.hasOwnProperty.call(raw, key)) record[key] = raw[key];
		}
		return record;
	}

	function currentTerrain(state, helpers) {
		if (state && state.terrain) return state.terrain;
		return helpers && typeof helpers.getTerrain === "function" ? helpers.getTerrain(state) : "";
	}

	function weatherCode(weather) {
		return WEATHER_IDS[normalizeName(weather)] || 0;
	}

	function terrainCode(terrain) {
		return TERRAIN_CODES[terrain] || 0;
	}

	function globalFieldSlots(state) {
		var slots = {};
		var effects = state && state.fieldEffects ? state.fieldEffects : {};
		var key;
		var slot;
		for (key in GLOBAL_FIELD_SLOTS) {
			if (!Object.prototype.hasOwnProperty.call(GLOBAL_FIELD_SLOTS, key)) continue;
			slot = GLOBAL_FIELD_SLOTS[key];
			if (effects[key] && effects[key].value) slots[slot] = 1;
		}
		return slots;
	}

	function isDoublesBattle(state, helpers) {
		if (helpers && typeof helpers.isDoublesBattle === "function" && helpers.isDoublesBattle(state)) return true;
		if (state && state.doubles) return true;
		if (state && state.battleMode === "Doubles") return true;
		if (state && state.active) {
			if (state.active.player2 || state.active.opponent2) return true;
			if (Array.isArray(state.active.player) || Array.isArray(state.active.opponent)) return true;
		}
		return false;
	}

	function buildNativeState(state, attackerSide, attackerState, defenderState, move, helpers, options) {
		var moveInfo = moveRecord(move, 0, attackerState);
		var sideConditions = helpers && typeof helpers.getSideConditions === "function" ? helpers.getSideConditions(state) : {};
		var terrain = currentTerrain(state, helpers);
		var targetSide = attackerSide === "player" ? "opponent" : "player";
		var nativeState = {
			mode: "native_semantic",
			battle: {
				turn_index: state && state.turn ? Math.max(0, state.turn - 1) : 0,
				turn: state && state.turn ? Math.max(0, state.turn - 1) : 0,
				battle_mode: options && options.doubles ? 1 : 0,
				field_mode: options && options.doubles ? 1 : 0,
				rule_word0: 0
			},
			field: {
				weather: weatherCode(state && state.weather),
				weather_code: weatherCode(state && state.weather),
				weather_turns: state && state.weatherTurns ? state.weatherTurns : 0,
				weather_remaining: state && state.weatherTurns ? state.weatherTurns : 0,
				terrain: terrain,
				terrain_code: terrainCode(terrain),
				terrain_turns: state && state.terrainTurns ? state.terrainTurns : 0,
				terrain_remaining: state && state.terrainTurns ? state.terrainTurns : 0,
				global_slots: globalFieldSlots(state),
				trick_room: !!(state && state.fieldEffects && state.fieldEffects.trickroom && state.fieldEffects.trickroom.value)
			},
			sides: {
				player: sideConditionRecord(sideConditions.player || {}),
				opponent: sideConditionRecord(sideConditions.opponent || {})
			},
			groups: {
				player: {members: [attackerSide === "player" ? 1 : 0], has_not_full_hp: groupHasNotFullHP(state, "player")},
				opponent: {members: [attackerSide === "opponent" ? 1 : 0], has_not_full_hp: groupHasNotFullHP(state, "opponent")}
			},
			battlers: {
				0: battlerRecord(0, targetSide, defenderState, state, helpers),
				1: battlerRecord(1, attackerSide, attackerState, state, helpers)
			},
			ai_context: {
				source: 1,
				target: 0,
				current_move_id: moveInfo.move_id,
				current_move_slot: 0,
				current_move_effect_id: moveInfo.effect_id,
				current_move: moveInfo,
				same_side_members: [1],
				same_side_group_cursor: 0,
				simple_effectiveness_mode: false
			},
			rng: {
				stream: options && options.rngProfile ? options.rngProfile.stream.slice(0) : [128, 128, 128, 128],
				cached_roll: options && options.rngProfile ? options.rngProfile.cachedRoll : 128
			},
			damage_cache: buildDamageCache(state, attackerSide, attackerState, defenderState, move, helpers, moveInfo)
		};
		nativeState.native_helper_cache = {
			damage: nativeState.damage_cache.native_damage,
			best_damage: nativeState.damage_cache.best_damage,
			effectiveness: nativeState.damage_cache.effectiveness
		};
		nativeState.battlers[1].remembered_move_id = moveInfo.move_id;
		nativeState.battlers[1].remembered_recent_move_id = moveInfo.move_id;
		return nativeState;
	}

	function groupHasNotFullHP(state, side) {
		var roster = state && state.rosters ? state.rosters[side] || [] : [];
		for (var i = 0; i < roster.length; i++) {
			if (roster[i] && roster[i].hp && roster[i].maxHP && roster[i].hp.max > 0 && roster[i].hp.max < roster[i].maxHP) return true;
		}
		return false;
	}

	function buildDamageCache(state, attackerSide, attackerState, defenderState, move, helpers, moveInfo) {
		var cache = {
			current_max: 0,
			current_min: 0,
			best_other_max: 0,
			best_source_max: 0,
			defender_best_max: 0,
			max_opponent_adjusted_base_power: {},
			effectiveness: {},
			native_damage: {},
			best_damage: {}
		};
		var moveList = attackerState && attackerState.pokemon && attackerState.pokemon.moves ? attackerState.pokemon.moves : [];
		var defenderMoveList = defenderState && defenderState.pokemon && defenderState.pokemon.moves ? defenderState.pokemon.moves : [];
		var opposingSide = attackerSide === "player" ? "opponent" : "player";
		function setDamage(source, target, candidateMove, value) {
			var record = moveRecord(candidateMove, 0, source === 1 ? attackerState : defenderState);
			var moveId = record.move_id;
			if (!moveId) return;
			cache.native_damage[source + "," + target + "," + moveId + ",0"] = value || 0;
			cache.native_damage[source + "," + target + "," + moveId + ",1"] = value || 0;
		}
		function getEffectiveness(source, target, candidateMove) {
			var sourceState = source === 1 ? attackerState : defenderState;
			var targetState = target === 0 ? defenderState : attackerState;
			var record = moveRecord(candidateMove, 0, sourceState);
			if (helpers && typeof helpers.getMoveEffectiveness === "function") {
				return helpers.getMoveEffectiveness(candidateMove, targetState, state, sourceState);
			}
			return effectivenessForMove(record.type, targetState);
		}
		function setEffectiveness(source, target, candidateMove) {
			var record = moveRecord(candidateMove, 0, source === 1 ? attackerState : defenderState);
			var moveId = record.move_id;
			if (!moveId) return;
			cache.effectiveness[target + "," + source + "," + moveId] = getEffectiveness(source, target, candidateMove);
		}
		cache.current_max = damageMax(state, attackerSide, attackerState, defenderState, move, helpers);
		cache.current_min = damageMin(state, attackerSide, attackerState, defenderState, move, helpers);
		setDamage(1, 0, move, cache.current_max);
		setEffectiveness(1, 0, move);
		cache.best_source_max = cache.current_max;
		for (var i = 0; i < moveList.length; i++) {
			var candidate = moveList[i];
			var maxDamage;
			if (!isMoveUsableForEntry(attackerState, candidate)) continue;
			maxDamage = damageMax(state, attackerSide, attackerState, defenderState, candidate, helpers);
			setDamage(1, 0, candidate, maxDamage);
			setEffectiveness(1, 0, candidate);
			if (candidate !== move) cache.best_other_max = Math.max(cache.best_other_max, maxDamage);
			cache.best_source_max = Math.max(cache.best_source_max, maxDamage);
		}
		for (var defenderIndex = 0; defenderIndex < defenderMoveList.length; defenderIndex++) {
			if (!isMoveUsableForEntry(defenderState, defenderMoveList[defenderIndex])) continue;
			setEffectiveness(0, 1, defenderMoveList[defenderIndex]);
		}
		cache.defender_best_max = bestDamageMax(state, opposingSide, defenderState, attackerState, helpers);
		cache.best_damage["1,0,0"] = cache.best_source_max;
		cache.best_damage["1,0,1"] = cache.best_source_max;
		cache.best_damage["0,1,0"] = cache.defender_best_max;
		cache.best_damage["0,1,1"] = cache.defender_best_max;
		cache.max_opponent_adjusted_base_power[0] = maxMovePower(defenderState);
		cache.max_opponent_adjusted_base_power[1] = maxMovePower(attackerState);
		cache.current_effectiveness = getEffectiveness(1, 0, move);
		return cache;
	}

	function damageRange(state, attackerSide, attackerState, defenderState, move, helpers) {
		if (helpers && helpers.getMoveDamageRange) {
			return helpers.getMoveDamageRange(state, attackerSide, attackerState, defenderState, move);
		}
		if (!helpers || !helpers.calculateDamage || !helpers.getDamageRange) return null;
		try {
			return helpers.getDamageRange(helpers.calculateDamage(attackerSide, attackerState.pokemon, defenderState.pokemon, move, state), move);
		} catch (e) {
			return null;
		}
	}

	function damageMax(state, attackerSide, attackerState, defenderState, move, helpers) {
		var damage = damageRange(state, attackerSide, attackerState, defenderState, move, helpers);
		return damage ? damage.max : 0;
	}

	function damageMin(state, attackerSide, attackerState, defenderState, move, helpers) {
		var damage = damageRange(state, attackerSide, attackerState, defenderState, move, helpers);
		return damage ? damage.min : 0;
	}

	function bestDamageMax(state, attackerSide, attackerState, defenderState, helpers) {
		var best = helpers && helpers.getBestDamage ? helpers.getBestDamage(attackerState, defenderState, state) : null;
		return best && best.damage ? best.damage.max : 0;
	}

	function maxMovePower(entry) {
		var moves = entry && entry.pokemon && entry.pokemon.moves ? entry.pokemon.moves : [];
		var maxPower = 0;
		for (var i = 0; i < moves.length; i++) {
			var record = moveRecord(moves[i], i, entry);
			maxPower = Math.max(maxPower, record.base_power || 0);
		}
		return maxPower;
	}

	function prepareProgram(key) {
		var program = data && data.scripts ? data.scripts[key] : null;
		if (!program) throw new Error("missing Sw/Sh AI script " + key);
		if (program.byPc) return program;
		program.byPc = {};
		for (var i = 0; i < program.instructions.length; i++) {
			var row = program.instructions[i];
			program.byPc[row[0]] = {
				pc: row[0],
				opcode: row[1],
				name: data.opcodes[row[1]] || "OP_" + row[1],
				ops: row[2] || [],
				size: row[3],
				target: row.length > 4 ? row[4] : null
			};
		}
		return program;
	}

	function AmxFrame(args) {
		this.args = args || [];
		this.locals = {};
		this.stack = [];
		this.pri = 0;
		this.alt = 0;
	}

	function AmxRunner(scriptKey, nativeState, oracle) {
		this.scriptKey = scriptKey;
		this.state = nativeState;
		this.oracle = oracle;
		this.program = prepareProgram(scriptKey);
		this.globals = {8: 0};
		this.steps = 0;
		this.maxSteps = 2000000;
		this.maxDepth = 256;
		this.scoreEvents = [];
		this.unsupported = {};
	}

	AmxRunner.prototype.runEntry = function (entryPc) {
		this.executeProc(entryPc || 51, [], 0);
		return cell(this.globals[8] || 0);
	};

	AmxRunner.prototype.executeProc = function (procPc, args, depth) {
		var bounds = this.program.bounds[String(procPc)];
		var frame;
		var pc;
		var end;
		if (depth > this.maxDepth) throw new Error("Sw/Sh AMX recursion depth exceeded in " + this.scriptKey);
		if (!bounds) throw new Error("Sw/Sh AMX call target pc" + procPc + " is not a procedure");
		frame = new AmxFrame(args);
		pc = bounds[0];
		end = bounds[1];
		while (pc < end) {
			var ins;
			var name;
			var ops;
			var nextPc;
			this.steps++;
			if (this.steps > this.maxSteps) throw new Error("Sw/Sh AMX step limit exceeded in " + this.scriptKey);
			ins = this.program.byPc[pc];
			if (!ins) throw new Error("Sw/Sh AMX missing instruction pc" + pc + " in " + this.scriptKey);
			name = ins.name;
			ops = ins.ops;
			nextPc = ins.pc + ins.size;
			if (name === "PROC" || name === "BREAK" || name === "NOP" || name === "LINE" || name === "BOUNDS" || name === "HEAP") {
				pc = nextPc;
				continue;
			}
			if (name === "RET" || name === "RETN" || name === "HALT") return frame.pri;
			if (name === "STACK") {
				this.applyStack(frame, ops[0]);
				pc = nextPc;
				continue;
			}
			if (this.applyStackInstruction(frame, name, ops)) {
				pc = nextPc;
				continue;
			}
			if (this.applyLoadStoreInstruction(frame, name, ops)) {
				pc = nextPc;
				continue;
			}
			if (this.applyMathInstruction(frame, name, ops)) {
				pc = nextPc;
				continue;
			}
			if (name === "CALL") {
				this.applyCall(frame, ins);
				pc = nextPc;
				continue;
			}
			if (name === "SYSREQ_C") {
				frame.pri = this.nativeCall(cell(ops[0]), this.popCallArgs(frame), ins.pc);
				pc = nextPc;
				continue;
			}
			if (name === "JUMP" || name === "JREL") {
				pc = ins.target;
				continue;
			}
			if (name === "JZER") {
				pc = truthy(frame.pri) ? nextPc : ins.target;
				continue;
			}
			if (name === "JNZ") {
				pc = truthy(frame.pri) ? ins.target : nextPc;
				continue;
			}
			if (isBranchOp(name)) {
				pc = this.branchOp(name, frame.pri, frame.alt) ? ins.target : nextPc;
				continue;
			}
			if (name === "SWITCH") {
				pc = this.switchTarget(ins.pc, frame.pri);
				continue;
			}
			if (name === "CASETBL") throw new Error("Sw/Sh AMX executed CASETBL in " + this.scriptKey);
			throw new Error("Sw/Sh AMX unsupported opcode " + name + " in " + this.scriptKey + " pc" + pc);
		}
		return frame.pri;
	};

	AmxRunner.prototype.applyStack = function (frame, amount) {
		var offset;
		amount = cell(amount);
		if (amount < 0) {
			for (offset = -8; offset >= amount; offset -= 8) {
				if (typeof frame.locals[offset] === "undefined") frame.locals[offset] = 0;
			}
		}
	};

	AmxRunner.prototype.applyStackInstruction = function (frame, name, ops) {
		if (name === "PUSH_C") frame.stack.push(cell(ops[0]));
		else if (name === "PUSH_PRI") frame.stack.push(frame.pri);
		else if (name === "PUSH_ALT") frame.stack.push(frame.alt);
		else if (name === "PUSH_S") frame.stack.push(this.stackValue(frame, cell(ops[0])));
		else if (name === "PUSH") frame.stack.push(this.globalValue(cell(ops[0])));
		else if (name === "PUSHADDR") frame.stack.push({local: cell(ops[0])});
		else if (name === "ADDR_PRI") frame.pri = {local: cell(ops[0])};
		else if (name === "ADDR_ALT") frame.alt = {local: cell(ops[0])};
		else if (name === "POP_PRI") frame.pri = frame.stack.length ? frame.stack.pop() : 0;
		else if (name === "POP_ALT") frame.alt = frame.stack.length ? frame.stack.pop() : 0;
		else return false;
		return true;
	};

	AmxRunner.prototype.applyLoadStoreInstruction = function (frame, name, ops) {
		if (name === "CONST_PRI") frame.pri = cell(ops[0]);
		else if (name === "CONST_ALT") frame.alt = cell(ops[0]);
		else if (name === "ZERO_PRI") frame.pri = 0;
		else if (name === "ZERO_ALT") frame.alt = 0;
		else if (name === "ZERO_S") frame.locals[cell(ops[0])] = 0;
		else if (name === "ZERO") this.globals[cell(ops[0])] = 0;
		else if (name === "LOAD_S_PRI") frame.pri = this.stackValue(frame, cell(ops[0]));
		else if (name === "LOAD_S_ALT") frame.alt = this.stackValue(frame, cell(ops[0]));
		else if (name === "STOR_S_PRI") frame.locals[cell(ops[0])] = frame.pri;
		else if (name === "STOR_S_ALT") frame.locals[cell(ops[0])] = frame.alt;
		else if (name === "LOAD_PRI") frame.pri = this.globalValue(cell(ops[0]));
		else if (name === "LOAD_ALT") frame.alt = this.globalValue(cell(ops[0]));
		else if (name === "LOAD_I") frame.pri = this.memoryRead(frame, frame.pri);
		else if (name === "STOR_PRI") this.globals[cell(ops[0])] = frame.pri;
		else if (name === "STOR_ALT") this.globals[cell(ops[0])] = frame.alt;
		else if (name === "STOR_I") this.memoryWrite(frame, frame.alt, frame.pri);
		else if (name === "MOVE_PRI") frame.pri = frame.alt;
		else if (name === "MOVE_ALT") frame.alt = frame.pri;
		else if (name === "XCHG") {
			var temp = frame.pri;
			frame.pri = frame.alt;
			frame.alt = temp;
		} else if (name === "LIDX") frame.pri = this.memoryRead(frame, this.offsetAddress(frame.alt, cell(frame.pri) * this.program.cellSize));
		else if (name === "LIDX_B") frame.pri = this.memoryRead(frame, this.offsetAddress(frame.alt, cell(frame.pri) * Math.pow(2, cell(ops[0]))));
		else if (name === "IDXADDR") frame.pri = this.offsetAddress(frame.alt, cell(frame.pri) * this.program.cellSize);
		else if (name === "IDXADDR_B") frame.pri = this.offsetAddress(frame.alt, cell(frame.pri) * Math.pow(2, cell(ops[0])));
		else if (name === "MOVS") this.moveMemory(frame, cell(ops[0]));
		else return false;
		return true;
	};

	AmxRunner.prototype.applyMathInstruction = function (frame, name, ops) {
		if (name === "ADD") frame.pri = cell(frame.pri) + cell(frame.alt);
		else if (name === "ADD_C") frame.pri = cell(frame.pri) + cell(ops[0]);
		else if (name === "SUB") frame.pri = cell(frame.pri) - cell(frame.alt);
		else if (name === "SUB_ALT") frame.pri = cell(frame.alt) - cell(frame.pri);
		else if (name === "SMUL") frame.pri = cell(frame.pri) * cell(frame.alt);
		else if (name === "SMUL_C") frame.pri = cell(frame.pri) * cell(ops[0]);
		else if (name === "SDIV") this.divide(frame, frame.pri, frame.alt);
		else if (name === "SDIV_ALT") this.divide(frame, frame.alt, frame.pri);
		else if (name === "NEG") frame.pri = -cell(frame.pri);
		else if (name === "NOT") frame.pri = truthy(frame.pri) ? 0 : 1;
		else if (name === "AND") frame.pri = cell(frame.pri) & cell(frame.alt);
		else if (name === "OR") frame.pri = cell(frame.pri) | cell(frame.alt);
		else if (name === "XOR") frame.pri = cell(frame.pri) ^ cell(frame.alt);
		else if (name === "INVERT") frame.pri = ~cell(frame.pri);
		else if (name === "EQ_C_PRI") frame.pri = cell(frame.pri) === cell(ops[0]) ? 1 : 0;
		else if (name === "EQ_C_ALT") frame.pri = cell(frame.alt) === cell(ops[0]) ? 1 : 0;
		else if (isCompareOp(name)) frame.pri = this.compareOp(name, frame.pri, frame.alt) ? 1 : 0;
		else if (name === "INC_PRI") frame.pri = cell(frame.pri) + 1;
		else if (name === "INC_ALT") frame.alt = cell(frame.alt) + 1;
		else if (name === "INC_S") frame.locals[cell(ops[0])] = cell(this.stackValue(frame, cell(ops[0]))) + 1;
		else if (name === "DEC_PRI") frame.pri = cell(frame.pri) - 1;
		else if (name === "DEC_ALT") frame.alt = cell(frame.alt) - 1;
		else if (name === "DEC_S") frame.locals[cell(ops[0])] = cell(this.stackValue(frame, cell(ops[0]))) - 1;
		else return false;
		frame.pri = cell(frame.pri);
		frame.alt = cell(frame.alt);
		return true;
	};

	AmxRunner.prototype.applyCall = function (frame, ins) {
		var target = ins.target;
		var callArgs = this.popCallArgs(frame);
		var before;
		var delta;
		if (target === 23) {
			delta = callArgs.length ? cell(callArgs[0]) : 0;
			before = cell(this.globals[8] || 0);
			this.globals[8] = before + delta;
			this.scoreEvents.push({pc: ins.pc, delta: delta, before: before, after: this.globals[8]});
			frame.pri = 0;
		} else if (this.program.wrappers[String(target)] !== undefined) {
			frame.pri = this.nativeCall(cell(this.program.wrappers[String(target)]), callArgs, ins.pc);
		} else {
			frame.pri = this.executeProc(target, callArgs, 1);
		}
	};

	AmxRunner.prototype.stackValue = function (frame, offset) {
		var index;
		if (offset >= 24) {
			index = (offset - 24) / this.program.cellSize;
			return index >= 0 && index < frame.args.length ? frame.args[index] : 0;
		}
		return typeof frame.locals[offset] !== "undefined" ? frame.locals[offset] : 0;
	};

	AmxRunner.prototype.globalValue = function (address) {
		var index;
		if (typeof this.globals[address] !== "undefined") return this.globals[address];
		index = address / this.program.cellSize;
		if (index >= 0 && index < this.program.dataCells.length) return this.program.dataCells[index];
		return 0;
	};

	AmxRunner.prototype.memoryRead = function (frame, address) {
		if (address && typeof address === "object" && typeof address.local === "number") {
			return typeof frame.locals[address.local] !== "undefined" ? frame.locals[address.local] : 0;
		}
		return this.globalValue(cell(address));
	};

	AmxRunner.prototype.memoryWrite = function (frame, address, value) {
		if (address && typeof address === "object" && typeof address.local === "number") {
			frame.locals[address.local] = value;
			return;
		}
		this.globals[cell(address)] = value;
	};

	AmxRunner.prototype.offsetAddress = function (address, byteOffset) {
		if (address && typeof address === "object" && typeof address.local === "number") return {local: address.local + byteOffset};
		return cell(address) + byteOffset;
	};

	AmxRunner.prototype.moveMemory = function (frame, byteCount) {
		var byteOffset;
		for (byteOffset = 0; byteOffset < byteCount; byteOffset += this.program.cellSize) {
			this.memoryWrite(frame, this.offsetAddress(frame.alt, byteOffset), this.memoryRead(frame, this.offsetAddress(frame.pri, byteOffset)));
		}
	};

	AmxRunner.prototype.divide = function (frame, left, right) {
		var divisor = cell(right);
		var dividend = cell(left);
		var quotient;
		if (divisor === 0) throw new Error("Sw/Sh AMX signed divide by zero");
		quotient = dividend / divisor;
		quotient = quotient < 0 ? Math.ceil(quotient) : Math.floor(quotient);
		frame.pri = quotient;
		frame.alt = dividend - quotient * divisor;
	};

	AmxRunner.prototype.compareOp = function (name, pri, alt) {
		var left = cell(pri);
		var right = cell(alt);
		if (name === "EQ") return left === right;
		if (name === "NEQ") return left !== right;
		if (name === "LESS" || name === "SLESS") return left < right;
		if (name === "LEQ" || name === "SLEQ") return left <= right;
		if (name === "GRTR" || name === "SGRTR") return left > right;
		if (name === "GEQ" || name === "SGEQ") return left >= right;
		return false;
	};

	AmxRunner.prototype.branchOp = function (name, pri, alt) {
		return this.compareOp({
			JEQ: "EQ",
			JNEQ: "NEQ",
			JLESS: "LESS",
			JLEQ: "LEQ",
			JGRTR: "GRTR",
			JGEQ: "GEQ",
			JSLESS: "SLESS",
			JSLEQ: "SLEQ",
			JSGRTR: "SGRTR",
			JSGEQ: "SGEQ"
		}[name], pri, alt);
	};

	AmxRunner.prototype.popCallArgs = function (frame) {
		var byteCount;
		var argc;
		var args = [];
		if (!frame.stack.length) return args;
		byteCount = cell(frame.stack.pop());
		argc = byteCount / this.program.cellSize;
		while (argc > 0) {
			args.push(frame.stack.length ? frame.stack.pop() : 0);
			argc--;
		}
		return args;
	};

	AmxRunner.prototype.nativeCall = function (nativeIndex, args) {
		var selector;
		var queryArgs = [];
		var i;
		if (nativeIndex === 0) {
			selector = cell(args[0]);
			for (i = 1; i < args.length; i++) queryArgs.push(cell(args[i]));
			return this.oracle.query(selector, queryArgs);
		}
		if (nativeIndex === 1) return 0;
		throw new Error("Sw/Sh AMX unsupported native " + nativeIndex);
	};

	AmxRunner.prototype.switchTarget = function (pc, pri) {
		var table = this.program.switchTables[String(pc)];
		var cases = table ? table.cases || [] : [];
		var value = cell(pri);
		for (var i = 0; i < cases.length; i++) {
			if (value === cases[i][0]) return cases[i][1];
		}
		return table ? table["default"] : pc + 1;
	};

	function truthy(value) {
		return cell(value) !== 0;
	}

	function isCompareOp(name) {
		return name === "EQ" || name === "NEQ" || name === "LESS" || name === "LEQ" || name === "GRTR" || name === "GEQ" ||
			name === "SLESS" || name === "SLEQ" || name === "SGRTR" || name === "SGEQ";
	}

	function isBranchOp(name) {
		return name === "JEQ" || name === "JNEQ" || name === "JLESS" || name === "JLEQ" || name === "JGRTR" || name === "JGEQ" ||
			name === "JSLESS" || name === "JSLEQ" || name === "JSGRTR" || name === "JSGEQ";
	}

	function NativeSelectorOracle(nativeState) {
		this.state = nativeState;
		this.trace = [];
		this.rngIndex = 0;
		this.neutralized = {};
	}

	NativeSelectorOracle.prototype.query = function (selector, args) {
		var value = this.compute(selector, args || []);
		this.trace.push({selector: selector, args: args || [], value: value});
		return value;
	};

	NativeSelectorOracle.prototype.compute = function (selector, args) {
		var threshold;
		var roll;
		var pct;
		var floorPct;
		var ceilPct;
		var value;
		var rhs;
		if (selector >= 0 && selector <= 3) {
			roll = this.nextRoll();
			threshold = args.length ? cell(args[0]) : 0;
			if (selector === 0) return roll < threshold ? 1 : 0;
			if (selector === 1) return threshold < roll ? 1 : 0;
			if (selector === 2) return roll === threshold ? 1 : 0;
			return roll !== threshold ? 1 : 0;
		}
		if (selector >= 96 && selector <= 99) {
			roll = this.cachedRoll();
			threshold = args.length ? cell(args[0]) : 0;
			if (selector === 96) return roll < threshold ? 1 : 0;
			if (selector === 97) return threshold < roll ? 1 : 0;
			if (selector === 98) return roll === threshold ? 1 : 0;
			return roll !== threshold ? 1 : 0;
		}
		if (selector >= 4 && selector <= 7) {
			pct = this.hpPercent(args[0]);
			threshold = cell(args[1]);
			floorPct = Math.floor(pct);
			ceilPct = Math.ceil(pct);
			if (selector === 4) return floorPct < threshold ? 1 : 0;
			if (selector === 5) return floorPct > threshold ? 1 : 0;
			if (selector === 6) return ceilPct === threshold ? 1 : 0;
			return ceilPct !== threshold ? 1 : 0;
		}
		if (selector === 8) return this.anyPackedSlot(args[0]) ? 1 : 0;
		if (selector === 9) return this.anyPackedSlot(args[0]) ? 0 : 1;
		if (selector === 10) return this.packedSlotActive(args[0], args[1]) ? 1 : 0;
		if (selector === 11) return this.packedSlotActive(args[0], args[1]) ? 0 : 1;
		if (selector === 12) return this.battlerBool(args[0], "packed_b8_special_active") ? 1 : 0;
		if (selector === 13) return this.battlerBool(args[0], "packed_b8_special_active") ? 0 : 1;
		if (selector === 14) return this.runtimeFlag(args[0], args[1]) ? 1 : 0;
		if (selector === 15) return this.runtimeFlag(args[0], args[1]) ? 0 : 1;
		if (selector === 16) return this.sideConditionActive(args[0], args.length > 1 ? args[1] : 0) ? 1 : 0;
		if (selector === 17) return this.sideConditionActive(args[0], args.length > 1 ? args[1] : 0) ? 0 : 1;
		if (selector === 18) return this.battlerInt(args[0], "perish_song_countdown", 0);
		if (selector === 19) return this.battlerInt(args[0], "perish_song_elapsed", 0);
		if (selector === 20) return this.battlerInt(args[0], "choice_lock_move_id", 0);
		if (selector === 21) return this.activeTargetHasDamagingMove() ? 1 : 0;
		if (selector === 22) return this.activeTargetHasDamagingMove() ? 0 : 1;
		if (selector === 23) return this.state.battle.turn_index || 0;
		if (selector === 24) return this.typeQuery(args);
		if (selector === 25) return this.moveAvailableAndUnblocked(args[0], args.length > 2 ? args[2] : args[args.length - 1]) ? 1 : 0;
		if (selector === 26) return this.moveById(args[0]).base_power > 0 ? 1 : 0;
		if (selector === 27 || selector === 61) return this.currentMoveValue("base_power", 0);
		if (selector === 28) return this.currentSourceStrongerAlternate();
		if (selector === 29) return this.battlerInt(args[0], "remembered_move_id", 0);
		if (selector === 30) return this.actionKeyCompare(args[0] || 0) ? 1 : 0;
		if (selector === 31) return this.groupCount(args[0]);
		if (selector === 32 || selector === 62) return this.currentMoveValue("effect_id", 0);
		if (selector === 33) return this.ability(args[0]);
		if (selector === 34) return this.effectivenessMatches(this.effectiveness(args[0], args[1], args[2]), args[3]) ? 1 : 0;
		if (selector === 35) return this.effectiveness(args[0], args[1], args[2]);
		if (selector === 36) return this.hasUsableDamagingEffectiveness(args[0], args[1], args[2], true) ? 1 : 0;
		if (selector === 37) return this.hasUsableDamagingEffectiveness(args[0], args[1], args[2], false) ? 1 : 0;
		if (selector === 38) return this.groupBool(args[0], "has_restorable_condition") ? 1 : 0;
		if (selector === 39) return this.groupBool(args[0], "has_restorable_condition") ? 0 : 1;
		if (selector === 40) return this.state.field.weather || 0;
		if (selector >= 41 && selector <= 44) {
			value = this.battlerValue(args[0], args[1]);
			rhs = cell(args[2]);
			if (selector === 41) return value < rhs ? 1 : 0;
			if (selector === 42) return value > rhs ? 1 : 0;
			if (selector === 43) return value === rhs ? 1 : 0;
			return value !== rhs ? 1 : 0;
		}
		if (selector === 45) return this.currentMoveWouldKO() ? 1 : 0;
		if (selector === 46) return this.currentMoveWouldKO() ? 0 : 1;
		if (selector === 47) return this.battlerHasMove(args[0], args[1]) ? 1 : 0;
		if (selector === 48) return this.battlerHasMove(args[0], args[1]) ? 0 : 1;
		if (selector === 49) return this.battlerHasMoveEffect(args[0], args[1]) ? 1 : 0;
		if (selector === 50) return this.battlerHasMoveEffect(args[0], args[1]) ? 0 : 1;
		if (selector === 51) return 0;
		if (selector === 52) return this.heldItem(args[0]);
		if (selector === 53) return this.heldItemRecordValue(args[0], "holdEffect", 0);
		if (selector === 54) return this.battlerValue(args[0], 0x14);
		if (selector === 55) return this.runtimeFlag(args[0], 0) ? 1 : 0;
		if (selector === 56) return this.battlerInt(args[0], "stockpile_count", 0);
		if (selector === 57) return this.state.battle.battle_mode || 0;
		if (selector === 58) return this.state.battle.rule_word0 || 0;
		if (selector === 59) return this.battlerInt(args[0], "consumed_item", 0);
		if (selector === 60) return this.currentMoveValue("type", 0);
		if (selector === 63) return this.battlerInt(args[0], "protect_counter", 0);
		if (selector === 64) return this.levelCompare(args[0]);
		if (selector === 65 || selector === 66) return this.packedSlotActive(0, 11) ? 1 : 0;
		if (selector === 67) return this.sameSideContext() ? 1 : 0;
		if (selector === 68) return this.battlerHasType(args[0], args[1]) ? 1 : 0;
		if (selector === 69) return this.ability(args[0]) === cell(args[1]) ? 1 : 0;
		if (selector === 70) return this.runtimeFlag(args[0], 13) ? 1 : 0;
		if (selector === 71) return this.heldItem(args[0]) === cell(args[1]) ? 1 : 0;
		if (selector === 72) return this.globalSlotActive(args[0]) ? 1 : 0;
		if (selector === 73) return this.sideConditionPayload(args[0], args[1]);
		if (selector === 74) return this.groupBool(args[0], "has_not_full_hp") ? 1 : 0;
		if (selector === 75) return this.groupBool(args[0], "has_depleted_pp") ? 1 : 0;
		if (selector === 76) return this.packedSlotActive(args[0], 0x13) ? 0 : this.heldItemRecordValue(args[0], "flingPower", 0);
		if (selector === 77) return this.currentMoveValue("pp", 1);
		if (selector === 78) return this.battlerBool(args[0], "has_four_moves") ? 1 : 0;
		if (selector === 79 || selector === 80) return this.currentMoveValue("category", 0);
		if (selector === 81) return this.actionOrderRank(args[0]);
		if (selector === 82) return this.battlerInt(args[0], "active_state_age_counter", 0);
		if (selector === 83) return this.groupMemberBestDamageGtCurrentSource(args[0]) ? 1 : 0;
		if (selector === 84 || selector === 122) return this.battlerHasSuperEffectiveMove(args[0], args[1]) ? 1 : 0;
		if (selector === 85) return this.rememberedMoveOutdamagesCurrentSourceBest(args[0], args[1]) ? 1 : 0;
		if (selector === 86) return this.positiveStatStageSum(args[0]);
		if (selector === 87) return this.battlerValue(args[0], args[1]) - this.battlerValue(1, args[1]);
		if (selector === 88) return this.battlerValue(args[0], args[1]);
		if (selector === 89) return this.sameSidePreviousActionStrongerTriState(args[0]);
		if (selector === 90) return this.hpCurrent(args[0]) === 0 ? 1 : 0;
		if (selector === 91) return this.hpCurrent(args[0]) !== 0 ? 1 : 0;
		if (selector === 92) return this.battlerValue(args[0], 0x13);
		if (selector === 93) return this.battlerInt(args[0], "substitute_hp", 0) !== 0 ? 1 : 0;
		if (selector === 94) return this.battlerInt(args[0], "species", 0);
		if (selector === 95) return this.battlerInt(args[0], "form", 0);
		if (selector === 100) return this.battlerBool(args[0], "future_attack_pending") ? 1 : 0;
		if (selector === 101) return this.modifiedStat(args[0], "attack") < this.modifiedStat(args[0], "spatk") ? 1 : 0;
		if (selector === 102) return this.modifiedStat(args[0], "spatk") < this.modifiedStat(args[0], "attack") ? 1 : 0;
		if (selector === 103) return this.modifiedStat(args[0], "attack") !== this.modifiedStat(args[0], "spatk") ? 1 : 0;
		if (selector === 104) return this.battlerBool(args[0], "belch_berry_consumed") ? 1 : 0;
		if (selector === 105) return this.battlerHasType(args[0], args[1], true) ? 1 : 0;
		if (selector === 106) return this.globalPayloadEq(args[0]) ? 1 : 0;
		if (selector === 107) return this.battlerValue(args[0], "weight");
		if (selector === 108) return this.state.battle.participant_layout_enabled ? 1 : 0;
		if (selector === 109 || selector === 110) return 0;
		if (selector === 111) return this.battlerInt(args[0], "major_status", 0) !== 0 ? 1 : 0;
		if (selector === 112) return this.battlerInt(args[0], "hidden_power_type", 0);
		if (selector === 113) return (this.state.battle.rule_word0 || 0) === 1 ? 1 : 0;
		if (selector === 114) return this.maxOpponentPower(args[0]);
		if (selector === 115) return this.targetAbilityAbsorbsMove(args[0], args.length > 2 && args[2] !== 0 ? args[2] : args[1]) ? 1 : 0;
		if (selector === 116) return this.battlerInt(args[0], "remembered_recent_move_id", 0);
		if (selector === 117) return this.currentMoveId();
		if (selector === 118) return this.state.ai_context.current_item_id || 0;
		if (selector === 119) return this.battlerBool(args[0], "previous_move_failed") ? 1 : 0;
		if (selector === 120) return this.groupInt(args[0], "faint_counter_sum", 0);
		if (selector === 121) return this.currentMoveValue("target_behavior", 0);
		if (selector === 123) return this.battlerBool(args[0], "dynamax_active") ? 1 : 0;
		if (selector === 124) return this.heldItemRecordValue(args[0], "category", 0) === 3 ? 1 : 0;
		if (selector === 125) return this.state.field.layout_slot4_move_extra_present ? 1 : 0;
		if (selector === 126) return this.state.battle.special_rule_source_bucket_2_or_3 ? 1 : 0;
		if (selector === 127) return this.battlerBool(args[0], "participant_layout_flag_bit0") ? 1 : 0;
		if (selector === 128) return this.state.ai_context.simple_effectiveness_mode ? 1 : 0;
		this.neutralized[selector] = true;
		return 0;
	};

	NativeSelectorOracle.prototype.nextRoll = function () {
		var rng = this.state.rng || {};
		var stream = rng.stream || [];
		var value = this.rngIndex < stream.length ? stream[this.rngIndex] : 128;
		this.rngIndex++;
		return cell(value) & 255;
	};

	NativeSelectorOracle.prototype.cachedRoll = function () {
		return typeof this.state.rng.cached_roll === "number" ? cell(this.state.rng.cached_roll) & 255 : 128;
	};

	NativeSelectorOracle.prototype.battler = function (selector) {
		return this.state.battlers[String(selector)] || this.state.battlers[selector] || {};
	};

	NativeSelectorOracle.prototype.battlerInt = function (selector, key, fallback) {
		var battler = this.battler(selector);
		return typeof battler[key] === "number" ? cell(battler[key]) : fallback;
	};

	NativeSelectorOracle.prototype.battlerBool = function (selector, key) {
		return boolValue(this.battler(selector)[key]);
	};

	NativeSelectorOracle.prototype.hpCurrent = function (selector) {
		var battler = this.battler(selector);
		return battler.hp && typeof battler.hp.current_hp === "number" ? battler.hp.current_hp : (battler.current_hp || 0);
	};

	NativeSelectorOracle.prototype.hpMax = function (selector) {
		var battler = this.battler(selector);
		return battler.hp && typeof battler.hp.max_hp === "number" ? battler.hp.max_hp : (battler.max_hp || 1);
	};

	NativeSelectorOracle.prototype.hpPercent = function (selector) {
		return this.hpCurrent(selector) * 100 / Math.max(1, this.hpMax(selector));
	};

	NativeSelectorOracle.prototype.anyPackedSlot = function (selector) {
		var slots = this.battler(selector).packed_slots || {};
		for (var key in slots) {
			if (Object.prototype.hasOwnProperty.call(slots, key) && boolValue(slots[key])) return true;
		}
		return false;
	};

	NativeSelectorOracle.prototype.packedSlotActive = function (selector, slot) {
		return boolValue((this.battler(selector).packed_slots || {})[slot]);
	};

	NativeSelectorOracle.prototype.packedSlotPayload = function (selector, slot) {
		return cell((this.battler(selector).packed_slots || {})[slot] || 0);
	};

	NativeSelectorOracle.prototype.runtimeFlag = function (selector, bit) {
		var flags = this.battler(selector).runtime_flags || {};
		return boolValue(flags[bit]);
	};

	NativeSelectorOracle.prototype.sideForBattler = function (selector) {
		var side = this.battler(selector).side;
		return side !== undefined && side !== null ? String(side) : String(selector);
	};

	NativeSelectorOracle.prototype.sideConditionRecord = function (selector) {
		return this.state.sides[this.sideForBattler(selector)] || {};
	};

	NativeSelectorOracle.prototype.sideConditionActive = function (selector, slot) {
		var record = this.sideConditionRecord(selector);
		var key;
		if (slot === 24) {
			for (key in record) {
				if (Object.prototype.hasOwnProperty.call(record, key) && key !== "payload" && boolValue(record[key])) return false;
			}
			return true;
		}
		return boolValue(record[slot]);
	};

	NativeSelectorOracle.prototype.sideConditionPayload = function (selector, slot) {
		var record = this.sideConditionRecord(selector);
		return record.payload && typeof record.payload[slot] === "number" ? record.payload[slot] : (record[slot] ? 1 : 0);
	};

	NativeSelectorOracle.prototype.typeQuery = function (args) {
		var mode = cell(args[0]);
		var source = this.battler(1);
		var target = this.battler(0);
		var move = this.currentMove();
		if (mode === 0) return target.types[0] || 0;
		if (mode === 2) return target.types[1] || target.types[0] || 0;
		if (mode === 1) return source.types[0] || 0;
		if (mode === 3) return source.types[1] || source.types[0] || 0;
		if (mode === 4 || mode === 7) return move.type || 0;
		return 0;
	};

	NativeSelectorOracle.prototype.currentMove = function () {
		return this.state.ai_context.current_move || {};
	};

	NativeSelectorOracle.prototype.currentMoveId = function () {
		return this.state.ai_context.current_move_id || 0;
	};

	NativeSelectorOracle.prototype.currentMoveValue = function (key, fallback) {
		var move = this.currentMove();
		return typeof move[key] === "number" ? move[key] : fallback;
	};

	NativeSelectorOracle.prototype.moveById = function (moveId) {
		var battlers = this.state.battlers;
		var selector;
		var moves;
		var i;
		for (selector in battlers) {
			if (!Object.prototype.hasOwnProperty.call(battlers, selector)) continue;
			moves = battlers[selector].moves || [];
			for (i = 0; i < moves.length; i++) {
				if (moves[i].move_id === moveId) return moves[i];
			}
		}
		return {base_power: 0, power: 0, effect_id: 0, type: 0, category: 0};
	};

	NativeSelectorOracle.prototype.moveAvailableAndUnblocked = function (selector, moveId) {
		var battler = this.battler(selector);
		var moves = battler.moves || [];
		for (var i = 0; i < moves.length; i++) {
			if (moves[i].move_id === moveId && moves[i].can_use_move && moves[i].pp !== 0) return true;
		}
		return false;
	};

	NativeSelectorOracle.prototype.activeTargetHasDamagingMove = function () {
		var moves = this.battler(0).moves || [];
		for (var i = 0; i < moves.length; i++) {
			if (moves[i].can_use_move === false) continue;
			if (moves[i].base_power > 0) return true;
		}
		return false;
	};

	NativeSelectorOracle.prototype.currentSourceStrongerAlternate = function () {
		var cache = this.state.damage_cache || {};
		if ((cache.current_max || 0) <= 0) return 0;
		if ((cache.best_other_max || 0) > (cache.current_max || 0)) return 1;
		return 2;
	};

	NativeSelectorOracle.prototype.actionPriority = function (selector) {
		var priority = this.battlerInt(selector, "current_move_priority", 0);
		if (selector === this.contextSource()) priority = this.currentMoveValue("priority", priority);
		if (this.battlerBool(selector, "custap_ready")) priority += 0.5;
		return priority;
	};

	NativeSelectorOracle.prototype.actionKeyCompare = function (mode) {
		var sourceSpeed = this.battlerValue(1, "speed");
		var targetSpeed = this.battlerValue(0, "speed");
		var sourcePriority = this.actionPriority(1);
		var targetPriority = this.actionPriority(0);
		var sourceLast = this.battlerBool(1, "move_order_last_item");
		var targetLast = this.battlerBool(0, "move_order_last_item");
		if (sourcePriority !== targetPriority) {
			if (mode === 0) return sourcePriority > targetPriority;
			if (mode === 1) return targetPriority > sourcePriority;
			return false;
		}
		if (sourceLast !== targetLast) {
			if (mode === 0) return !sourceLast;
			if (mode === 1) return !targetLast;
			return false;
		}
		if (this.state.field.trick_room) {
			if (mode === 0) return sourceSpeed <= targetSpeed;
			if (mode === 1) return targetSpeed < sourceSpeed;
			return sourceSpeed <= targetSpeed;
		}
		if (mode === 0) return sourceSpeed >= targetSpeed;
		if (mode === 1) return targetSpeed > sourceSpeed;
		return sourceSpeed >= targetSpeed;
	};

	NativeSelectorOracle.prototype.actionOrderRank = function (selector) {
		var speed = this.battlerValue(selector, "speed");
		var other = selector === 0 ? this.battlerValue(1, "speed") : this.battlerValue(0, "speed");
		var priority = this.actionPriority(selector);
		var otherPriority = this.actionPriority(selector === 0 ? 1 : 0);
		var last = this.battlerBool(selector, "move_order_last_item");
		var otherLast = this.battlerBool(selector === 0 ? 1 : 0, "move_order_last_item");
		if (priority !== otherPriority) return priority > otherPriority ? 0 : 1;
		if (last !== otherLast) return last ? 1 : 0;
		if (this.state.field.trick_room) return speed <= other ? 0 : 1;
		return speed >= other ? 0 : 1;
	};

	NativeSelectorOracle.prototype.groupKey = function (group) {
		if (group === 0) return this.sideForBattler(0);
		if (group === 1) return this.sideForBattler(1);
		if (group === 2) return "player";
		if (group === 3) return "opponent";
		return this.sideForBattler(group);
	};

	NativeSelectorOracle.prototype.groupRecord = function (group) {
		return this.state.groups[this.groupKey(group)] || {};
	};

	NativeSelectorOracle.prototype.groupCount = function (group) {
		var members = this.groupRecord(group).members || [];
		return members.length;
	};

	NativeSelectorOracle.prototype.groupBool = function (group, key) {
		return boolValue(this.groupRecord(group)[key]);
	};

	NativeSelectorOracle.prototype.groupInt = function (group, key, fallback) {
		var record = this.groupRecord(group);
		return typeof record[key] === "number" ? record[key] : fallback;
	};

	NativeSelectorOracle.prototype.ability = function (selector) {
		return this.battlerInt(selector, "effective_ability", 0) || this.battlerInt(selector, "ability", 0);
	};

	NativeSelectorOracle.prototype.battlerHasMove = function (selector, moveId) {
		var moves = this.battler(selector).moves || [];
		for (var i = 0; i < moves.length; i++) {
			if (moves[i].move_id === moveId) return true;
		}
		return false;
	};

	NativeSelectorOracle.prototype.battlerHasMoveEffect = function (selector, effectId) {
		var moves = this.battler(selector).moves || [];
		for (var i = 0; i < moves.length; i++) {
			if (moves[i].effect_id === effectId) return true;
		}
		return false;
	};

	NativeSelectorOracle.prototype.heldItem = function (selector) {
		return this.battlerInt(selector, "held_item", 0);
	};

	NativeSelectorOracle.prototype.heldItemRecordValue = function (selector, key, fallback) {
		var record = this.battler(selector).held_item_record || {};
		var snake = key.replace(/[A-Z]/g, function (letter) { return "_" + letter.toLowerCase(); });
		if (typeof record[key] === "number") return record[key];
		if (typeof record[snake] === "number") return record[snake];
		return fallback;
	};

	NativeSelectorOracle.prototype.battlerHasType = function (selector, type, thirdOnly) {
		var types = this.battler(selector).types || [];
		if (thirdOnly) return types.length > 2 && types[2] === type;
		return types.indexOf(type) !== -1;
	};

	NativeSelectorOracle.prototype.globalSlotActive = function (slot) {
		var slots = this.state.field.global_slots || {};
		return !!slots[slot];
	};

	NativeSelectorOracle.prototype.globalPayloadEq = function (expected) {
		return this.state.field.terrain_code === expected;
	};

	NativeSelectorOracle.prototype.levelCompare = function (mode) {
		var source = this.battlerInt(1, "level", 50);
		var target = this.battlerInt(0, "level", 50);
		if (mode === 0) return source > target ? 1 : 0;
		if (mode === 1) return source < target ? 1 : 0;
		if (mode === 2) return source === target ? 1 : 0;
		return source - target;
	};

	NativeSelectorOracle.prototype.battlerValue = function (selector, valueId) {
		var battler = this.battler(selector);
		var stats = battler.stats || {};
		var stages = battler.stat_stages || {};
		if (valueId === "weight") return battler.weight || 0;
		if (valueId === "speed" || valueId === 0x0B) return battler.speed || stats.speed || 0;
		if (valueId === 0x13) return this.ability(selector);
		if (valueId === 0x14) return battler.gender_code || 0;
		if (typeof valueId === "string") return stats[valueId] || battler[valueId] || 0;
		if (valueId === 0) return this.hpCurrent(selector);
		if (valueId === 1) return this.hpMax(selector);
		if (valueId === 2) return stats.attack || 0;
		if (valueId === 3) return stats.defense || 0;
		if (valueId === 4) return stats.spatk || 0;
		if (valueId === 5) return stats.spdef || 0;
		if (valueId === 6) return stats.speed || battler.speed || 0;
		if (valueId >= 100 && valueId <= 105) return stages[["attack", "defense", "spatk", "spdef", "speed", "accuracy"][valueId - 100]] || 0;
		return 0;
	};

	NativeSelectorOracle.prototype.modifiedStat = function (selector, key) {
		var battler = this.battler(selector);
		var stats = battler.stats || {};
		var stages = battler.stat_stages || {};
		var base = stats[key] || 0;
		var boost = stages[key] || 0;
		if (boost > 0) return Math.floor(base * (2 + boost) / 2);
		if (boost < 0) return Math.floor(base * 2 / (2 - boost));
		return base;
	};

	NativeSelectorOracle.prototype.positiveStatStageSum = function (selector) {
		var stages = this.battler(selector).stat_stages || {};
		var sum = 0;
		for (var key in stages) {
			if (Object.prototype.hasOwnProperty.call(stages, key) && stages[key] > 0) sum += stages[key];
		}
		return sum;
	};

	NativeSelectorOracle.prototype.currentMoveWouldKO = function () {
		return (this.state.damage_cache.current_max || 0) >= this.hpCurrent(0);
	};

	NativeSelectorOracle.prototype.contextSource = function () {
		var source = this.state.ai_context && this.state.ai_context.source;
		return source !== undefined && source !== null ? cell(source) : 1;
	};

	NativeSelectorOracle.prototype.contextTarget = function () {
		var target = this.state.ai_context && this.state.ai_context.target;
		return target !== undefined && target !== null ? cell(target) : 0;
	};

	NativeSelectorOracle.prototype.sameSideContext = function () {
		var source = this.contextSource();
		var target = this.contextTarget();
		if (source === target) return false;
		return this.sideForBattler(source) === this.sideForBattler(target);
	};

	NativeSelectorOracle.prototype.moveIdFromRecord = function (record) {
		if (typeof record === "number") return record;
		return record ? cell(record.move_id || record.id || 0) : 0;
	};

	NativeSelectorOracle.prototype.moveRecords = function (selector) {
		return this.battler(selector).moves || [];
	};

	NativeSelectorOracle.prototype.cacheValue = function (section, keys) {
		var nativeCache = this.state.native_helper_cache || {};
		var data = nativeCache[section];
		var key = keys.join(",");
		if (data && Object.prototype.hasOwnProperty.call(data, key)) return data[key];
		return null;
	};

	NativeSelectorOracle.prototype.damageValue = function (source, target, moveId, flagArg) {
		var flag = cell(flagArg || 0) !== 0 ? 1 : 0;
		var variants = [
			[source, target, moveId, flag],
			[source, target, moveId],
			[source, moveId, target, flag],
			[source, moveId, target]
		];
		var damage;
		for (var i = 0; i < variants.length; i++) {
			damage = this.cacheValue("damage", variants[i]);
			if (damage !== null && damage !== undefined) return cell(damage);
		}
		if (source === this.contextSource() && target === this.contextTarget() && moveId === this.currentMoveId()) {
			return this.state.damage_cache && typeof this.state.damage_cache.current_max === "number" ? this.state.damage_cache.current_max : null;
		}
		return null;
	};

	NativeSelectorOracle.prototype.bestDamageForBattler = function (source, target, flagArg, excludeSlot) {
		var flag = cell(flagArg || 0) !== 0 ? 1 : 0;
		var cached;
		var moves;
		var best = null;
		var damage;
		var moveId;
		var record;
		if (excludeSlot === undefined || excludeSlot === null) {
			cached = this.cacheValue("best_damage", [source, target, flag]);
			if (cached !== null && cached !== undefined) return cell(cached);
		}
		moves = this.moveRecords(source);
		for (var i = 0; i < moves.length; i++) {
			if (excludeSlot !== undefined && excludeSlot !== null && i === excludeSlot) continue;
			record = moves[i];
			if (record && typeof record !== "number" && record.can_use_move === false) continue;
			moveId = this.moveIdFromRecord(record);
			if (!moveId) continue;
			damage = this.damageValue(source, target, moveId, flag);
			if (damage === null || damage === undefined) continue;
			best = best === null ? damage : Math.max(best, damage);
		}
		if (best !== null) return best;
		if (source === this.contextSource() && target === this.contextTarget()) return this.state.damage_cache.best_source_max || null;
		return null;
	};

	NativeSelectorOracle.prototype.effectiveness = function (targetSelector, sourceSelector, moveOrType) {
		var move = moveOrType ? this.moveById(moveOrType) : this.currentMove();
		var type = move.type || moveOrType || this.currentMove().type || 0;
		var target = this.battler(targetSelector);
		var types = target.types || [0];
		var value = 4;
		var moveId = move.move_id || move.id || 0;
		var cached = moveId ? this.cacheValue("effectiveness", [targetSelector, sourceSelector, moveId]) : null;
		if (cached !== null && cached !== undefined) return cell(cached);
		if (!moveId && targetSelector === this.contextTarget() && sourceSelector === this.contextSource() &&
				this.state.damage_cache && typeof this.state.damage_cache.current_effectiveness === "number") {
			return cell(this.state.damage_cache.current_effectiveness);
		}
		for (var i = 0; i < types.length; i++) {
			if (i > 0 && types[i] === types[i - 1]) continue;
			value = value * (EFFECTIVENESS_CHART[type] ? EFFECTIVENESS_CHART[type][types[i]] : 4) / 4;
		}
		if (type === 4 && this.ability(targetSelector) === 26 && !MOLD_BREAKER_ABILITIES[this.ability(sourceSelector)]) value = 0;
		return Math.round(value);
	};

	NativeSelectorOracle.prototype.effectivenessMatches = function (effectiveness, condition) {
		condition = cell(condition);
		if (condition === 0) return effectiveness === 0;
		if (condition === 1) return effectiveness < 4 && effectiveness > 0;
		if (condition === 2) return effectiveness === 4;
		if (condition === 3) return effectiveness > 4;
		return effectiveness === condition;
	};

	NativeSelectorOracle.prototype.hasUsableDamagingEffectiveness = function (selector, sourceSelector, compareValue, greater) {
		var moves = this.battler(selector).moves || [];
		var eff;
		for (var i = 0; i < moves.length; i++) {
			if (!moves[i].can_use_move || moves[i].base_power <= 0) continue;
			eff = this.effectiveness(sourceSelector, selector, moves[i].move_id);
			if (greater && eff > compareValue) return true;
			if (!greater && eff === compareValue) return true;
		}
		return false;
	};

	NativeSelectorOracle.prototype.battlerHasSuperEffectiveMove = function (selector, targetSelector) {
		var moves = this.battler(selector).moves || [];
		for (var i = 0; i < moves.length; i++) {
			if (moves[i].can_use_move === false) continue;
			if (moves[i].base_power > 0 && this.effectiveness(targetSelector, selector, moves[i].move_id) > 4) return true;
		}
		return false;
	};

	NativeSelectorOracle.prototype.currentSourceGroupMembers = function () {
		var context = this.state.ai_context || {};
		var members = context.source_group_members || context.same_side_members || context.group_members;
		var sourceSide;
		var battlers;
		var result = [];
		var selector;
		var key;
		if (Array.isArray(members) && members.length) {
			for (var i = 0; i < members.length; i++) {
				selector = cell(typeof members[i] === "object" ? members[i].selector : members[i]);
				if (!isNaN(selector)) result.push(selector);
			}
			return result;
		}
		sourceSide = this.sideForBattler(this.contextSource());
		battlers = this.state.battlers || {};
		for (key in battlers) {
			if (!Object.prototype.hasOwnProperty.call(battlers, key)) continue;
			selector = cell(key);
			if (this.sideForBattler(selector) === sourceSide) result.push(selector);
		}
		result.sort(function (a, b) { return a - b; });
		return result;
	};

	NativeSelectorOracle.prototype.currentSourceGroupCursor = function (members) {
		var context = this.state.ai_context || {};
		var cursor = context.source_group_cursor;
		if (cursor === undefined || cursor === null) cursor = context.same_side_group_cursor;
		if (cursor === undefined || cursor === null) cursor = context.group_cursor;
		if (cursor === undefined || cursor === null) cursor = context.group_index;
		if (cursor !== undefined && cursor !== null) return Math.max(0, Math.min(members.length, cell(cursor)));
		cursor = members.indexOf(this.contextSource());
		return cursor >= 0 ? cursor : 0;
	};

	NativeSelectorOracle.prototype.groupMemberEligible = function (selector) {
		var battler = this.battler(selector);
		if (battler.eligible === false || battler.active === false || battler.fainted === true) return false;
		return this.hpCurrent(selector) !== 0;
	};

	NativeSelectorOracle.prototype.groupMemberBestDamageGtCurrentSource = function (flagArg) {
		var source = this.contextSource();
		var target = this.contextTarget();
		var currentBest = this.bestDamageForBattler(source, target, flagArg);
		var members = this.currentSourceGroupMembers();
		var cursor = this.currentSourceGroupCursor(members);
		var memberBest;
		if (currentBest === null || currentBest === undefined) return false;
		for (var i = cursor; i < members.length; i++) {
			if (members[i] === source || !this.groupMemberEligible(members[i])) continue;
			memberBest = this.bestDamageForBattler(members[i], target, flagArg);
			if (memberBest !== null && memberBest !== undefined && memberBest > currentBest) return true;
		}
		return false;
	};

	NativeSelectorOracle.prototype.rememberedMoveId = function (selector) {
		var battler = this.battler(selector);
		return cell(battler.remembered_recent_move_id || battler.recent_move_id || battler.remembered_move_id || battler.remembered_move || 0);
	};

	NativeSelectorOracle.prototype.rememberedMoveOutdamagesCurrentSourceBest = function (selector, flagArg) {
		var cached = this.cacheValue("remembered_move_outdamages_current_source_best", [selector, flagArg || 0]);
		var target = this.contextTarget();
		var currentBest;
		var rememberedMove;
		var rememberedDamage;
		if (cached !== null && cached !== undefined) return boolValue(cached);
		currentBest = this.bestDamageForBattler(this.contextSource(), target, flagArg);
		if (currentBest === null || currentBest === undefined) return false;
		rememberedMove = this.rememberedMoveId(selector);
		if (!rememberedMove) return false;
		rememberedDamage = this.damageValue(selector, target, rememberedMove, flagArg);
		return rememberedDamage !== null && rememberedDamage !== undefined && rememberedDamage > currentBest;
	};

	NativeSelectorOracle.prototype.sameSidePreviousActionStrongerTriState = function (flagArg) {
		var cached = this.cacheValue("same_side_previous_action_stronger_tri_state", [flagArg || 0]);
		var source = this.contextSource();
		var target = this.contextTarget();
		var currentDamage;
		var members;
		var cursor;
		var memberBest;
		if (cached !== null && cached !== undefined) return cell(cached);
		currentDamage = this.damageValue(source, target, this.currentMoveId(), flagArg);
		if (currentDamage === null || currentDamage === undefined) return 0;
		members = this.currentSourceGroupMembers();
		cursor = this.currentSourceGroupCursor(members);
		if (cursor <= 0) return 2;
		for (var i = 0; i < cursor; i++) {
			if (members[i] === source || !this.groupMemberEligible(members[i])) continue;
			memberBest = this.bestDamageForBattler(members[i], target, flagArg);
			if (memberBest !== null && memberBest !== undefined && memberBest > currentDamage) return 1;
		}
		return 2;
	};

	NativeSelectorOracle.prototype.maxOpponentPower = function (selector) {
		var map = this.state.damage_cache.max_opponent_adjusted_base_power || {};
		return map[selector] || map[String(selector)] || 0;
	};

	NativeSelectorOracle.prototype.targetAbilityAbsorbsMove = function (targetSelector, moveId) {
		var move = moveId ? this.moveById(moveId) : this.currentMove();
		var ability = this.ability(targetSelector);
		var sourceAbility = this.ability(1);
		var type = move.type || 0;
		if (MOLD_BREAKER_ABILITIES[sourceAbility]) return false;
		return !!(ABSORB_ABILITIES[ability] && ABSORB_ABILITIES[ability][type]);
	};

	function effectivenessForMove(type, defenderState) {
		var types = pokemonTypes(defenderState && defenderState.pokemon);
		var value = 4;
		for (var i = 0; i < types.length; i++) {
			if (i > 0 && types[i] === types[i - 1]) continue;
			value = value * (EFFECTIVENESS_CHART[type] ? EFFECTIVENESS_CHART[type][types[i]] : 4) / 4;
		}
		return Math.round(value);
	}

	function describeScoreEvent(script, event) {
		return SCORE_EVENT_DESCRIPTIONS[script + ":" + event.pc] || "";
	}

	function formatEvents(script, events) {
		var pieces = [];
		var description;
		for (var i = 0; i < events.length && i < 8; i++) {
			description = describeScoreEvent(script, events[i]);
			pieces.push("pc" + events[i].pc + " " + (events[i].delta >= 0 ? "+" : "") + events[i].delta + (description ? " " + description : ""));
		}
		if (events.length > 8) pieces.push(events.length + " score events");
		return pieces.length ? pieces.join(", ") : "no score changes";
	}

	function formatScoreDelta(delta) {
		delta = Math.round((Number(delta) || 0) * 10) / 10;
		if (Object.is(delta, -0)) delta = 0;
		return (delta > 0 ? "+" : "") + delta;
	}

	function scriptEntryPc(script) {
		return SCRIPT_ENTRY_PC[script] || 51;
	}

	function scoreScript(script, nativeState) {
		var oracle = new NativeSelectorOracle(nativeState);
		var runner = new AmxRunner(script, nativeState, oracle);
		var delta = runner.runEntry(scriptEntryPc(script));
		return {
			script: script,
			delta: delta,
			events: runner.scoreEvents,
			trace: oracle.trace,
			neutralized: oracle.neutralized,
			steps: runner.steps,
			pokeChangeEnable: runner.globals[16] || 0
		};
	}

	function selectedMoveScripts(state, helpers) {
		var scripts = DEFAULT_MOVE_SCRIPTS.slice(0);
		if (isDoublesBattle(state, helpers)) scripts.push("double");
		return scripts;
	}

	function getMoveScoreForProfile(state, attackerSide, attackerState, defenderState, move, helpers, profile, scripts, doubles) {
		var nativeState = buildNativeState(state, attackerSide, attackerState, defenderState, move, helpers, {rngProfile: profile, doubles: doubles});
		var total = 100;
		var notes = [];
		var neutralized = {};
		for (var i = 0; i < scripts.length; i++) {
			var result = scoreScript(scripts[i], nativeState);
			total += result.delta;
			notes.push(scripts[i] + " " + (result.delta >= 0 ? "+" : "") + result.delta + " (" + formatEvents(scripts[i], result.events) + ")");
			for (var key in result.neutralized) {
				if (Object.prototype.hasOwnProperty.call(result.neutralized, key)) neutralized[key] = true;
			}
		}
		return {score: total, notes: notes, neutralized: neutralized};
	}

	function getMoveScores(state, attackerSide, attackerState, defenderState, helpers) {
		var scores = [];
		var doubles = isDoublesBattle(state, helpers);
		var scripts = selectedMoveScripts(state, helpers);
		var moves;
		var i;
		if (!data || !attackerState || !attackerState.pokemon || !defenderState) return scores;
		moves = attackerState.pokemon.moves || [];
		for (i = 0; i < moves.length; i++) {
			var move = moves[i];
			var profileScores = [];
			var notes = [];
			var neutralized = {};
			var damage = null;
			var minScore;
			var maxScore;
			var expectedScore = 0;
			var score;
			if (!isMoveUsableForEntry(attackerState, move)) continue;
			for (var r = 0; r < RNG_PROFILES.length; r++) {
				var result = getMoveScoreForProfile(state, attackerSide, attackerState, defenderState, move, helpers, RNG_PROFILES[r], scripts, doubles);
				profileScores.push(result.score);
				if (r === 1) notes = result.notes;
				for (var key in result.neutralized) {
					if (Object.prototype.hasOwnProperty.call(result.neutralized, key)) neutralized[key] = true;
				}
			}
			minScore = Math.min.apply(Math, profileScores);
			maxScore = Math.max.apply(Math, profileScores);
			for (var p = 0; p < profileScores.length; p++) expectedScore += profileScores[p];
			expectedScore = Math.round(expectedScore * 10 / profileScores.length) / 10;
			damage = damageRange(state, attackerSide, attackerState, defenderState, move, helpers);
			score = scoreObject(move.name, minScore, maxScore, expectedScore, notes);
			if (minScore !== maxScore) addScoreNote(score, "random selector range sampled across low/mid/high native rolls");
			addNeutralizedNotes(score, neutralized);
			score.damage = damage;
			score.moveIndex = i;
			scores.push(score);
		}
		scores.sort(function (a, b) {
			if (b.maxScore !== a.maxScore) return b.maxScore - a.maxScore;
			if (b.expectedScore !== a.expectedScore) return b.expectedScore - a.expectedScore;
			return a.moveIndex - b.moveIndex;
		});
		return scores;
	}

	function addNeutralizedNotes(score, neutralized) {
		var selectors = [];
		for (var key in neutralized) {
			if (Object.prototype.hasOwnProperty.call(neutralized, key)) selectors.push(key);
		}
		selectors.sort(function (a, b) {
			return cell(a) - cell(b);
		});
		if (selectors.length) addScoreNote(score, "neutral defaults for unmapped selectors exclusive to live battles: " + selectors.join(", "));
	}

	function getSwitchDecisions(state, side, playerState, helpers) {
		var choices = [];
		var roster = state && state.rosters ? state.rosters.opponent || [] : [];
		var doubles = isDoublesBattle(state, helpers);
		if (!data || side !== "opponent" || !playerState) return choices;
		for (var i = 0; i < roster.length; i++) {
			var candidate = roster[i];
			var nativeState;
			var result;
			if (!candidate || candidate === state.active.opponent || !candidate.hp || candidate.hp.max <= 0) continue;
			nativeState = buildNativeState(state, "opponent", candidate, playerState, candidate.pokemon.moves && candidate.pokemon.moves[0], helpers, {rngProfile: RNG_PROFILES[1], doubles: doubles});
			try {
				result = scoreScript("pokechange", nativeState);
			} catch (e) {
				result = {delta: 0, pokeChangeEnable: 0, events: [], neutralized: {}};
			}
			choices.push({
				label: candidate.label,
				value: "PokeChange score " + formatScoreDelta(result.delta) + (result.pokeChangeEnable ? " switch enabled" : " switch not enabled") + "; " + formatEvents("pokechange", result.events),
				score: result.pokeChangeEnable ? 100 + result.delta : -1000 + result.delta,
				partyIndex: i,
				enabled: !!result.pokeChangeEnable
			});
		}
		choices.sort(function (a, b) {
			if (b.enabled !== a.enabled) return b.enabled ? 1 : -1;
			if (b.score !== a.score) return b.score - a.score;
			return a.partyIndex - b.partyIndex;
		});
		return choices;
	}

	global.SwShAIPredictor = {
		getMoveScores: getMoveScores,
		getSwitchDecisions: getSwitchDecisions,
		getDefaultMoveScripts: function () {
			return DEFAULT_MOVE_SCRIPTS.slice(0);
		},
		hasData: function () {
			return !!data;
		}
	};
})(typeof window !== "undefined" ? window : this);
