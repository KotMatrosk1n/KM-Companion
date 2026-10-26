function startsWith(string, target) {
	return (string || '').slice(0, target.length) === target;
}

function endsWith(string, target) {
	return (string || '').slice(-target.length) === target;
}

function getRoyalSwordAppStorage() {
	return window.getRoyalSwordStorage ? window.getRoyalSwordStorage() : localStorage;
}

var LEGACY_STATS_RBY = ["hp", "at", "df", "sl", "sp"];
var LEGACY_STATS_GSC = ["hp", "at", "df", "sa", "sd", "sp"];
var LEGACY_STATS = [[], LEGACY_STATS_RBY, LEGACY_STATS_GSC, LEGACY_STATS_GSC, LEGACY_STATS_GSC, LEGACY_STATS_GSC, LEGACY_STATS_GSC, LEGACY_STATS_GSC, LEGACY_STATS_GSC, LEGACY_STATS_GSC];
var HIDDEN_POWER_REGEX = /Hidden Power (\w*)/;

var CALC_STATUS = {
	'Healthy': '',
	'Paralyzed': 'par',
	'Poisoned': 'psn',
	'Badly Poisoned': 'tox',
	'Burned': 'brn',
	'Asleep': 'slp',
	'Frozen': 'frz'
};

function legacyStatToStat(st) {
	switch (st) {
	case 'hp':
		return "hp";
	case 'at':
		return "atk";
	case 'df':
		return "def";
	case 'sa':
		return "spa";
	case 'sd':
		return "spd";
	case 'sp':
		return "spe";
	case 'sl':
		return "spc";
	}
}

// input field validation
var bounds = {
	"level": [0, 100],
	"base": [1, 255],
	"evs": [0, 252],
	"ivs": [0, 31],
	"dvs": [0, 15],
	"move-bp": [0, 65535]
};
for (var bounded in bounds) {
	attachValidation(bounded, bounds[bounded][0], bounds[bounded][1]);
}
function attachValidation(clazz, min, max) {
	$("." + clazz).keyup(function () {
		validate($(this), min, max);
	});
}
function validate(obj, min, max) {
	obj.val(Math.max(min, Math.min(max, ~~obj.val())));
}

$("input:radio[name='format']").change(function () {
	var gameType = $("input:radio[name='format']:checked").val();
	$("body").toggleClass("doubles-format-selected", gameType === "Doubles");
	hideDoublesSlotMenu();
	if (gameType === 'Singles') {
		$("input:checkbox[name='ruin']:checked").prop("checked", false);
	}
	$(".format-specific." + gameType.toLowerCase()).each(function () {
		if ($(this).hasClass("gen-specific") && !$(this).hasClass("g" + gen)) {
			return;
		}
		$(this).show();
	});
	$(".format-specific").not("." + gameType.toLowerCase()).hide();
	updateDoublesSlotHighlights();
});

var defaultLevel = 100;

$("input:radio[name='defaultLevel']").change(function () {
	defaultLevel = ~~$("input:radio[name='defaultLevel']:checked").val() || 100;
	$("#levelL1").val(defaultLevel).trigger("change");
	$("#levelR1").val(defaultLevel).trigger("change");
});

// auto-calc stats and current HP on change
$(".level").bind("keyup change", function () {
	var poke = $(this).closest(".poke-info");
	calcHP(poke);
	calcStats(poke);
});
$(".nature").bind("keyup change", function () {
	calcStats($(this).closest(".poke-info"));
});
$(".hp .base, .hp .evs, .hp .ivs").bind("keyup change", function () {
	calcHP($(this).closest(".poke-info"));
});
$(".at .base, .at .evs, .at .ivs").bind("keyup change", function () {
	calcStat($(this).closest(".poke-info"), 'at');
});
$(".df .base, .df .evs, .df .ivs").bind("keyup change", function () {
	calcStat($(this).closest(".poke-info"), 'df');
});
$(".sa .base, .sa .evs, .sa .ivs").bind("keyup change", function () {
	calcStat($(this).closest(".poke-info"), 'sa');
});
$(".sd .base, .sd .evs, .sd .ivs").bind("keyup change", function () {
	calcStat($(this).closest(".poke-info"), 'sd');
});
$(".sp .base, .sp .evs, .sp .ivs").bind("keyup change", function () {
	calcStat($(this).closest(".poke-info"), 'sp');
});
$(".evs").bind('keyup change', function () {
	var poke = $(this).closest(".poke-info");
	if (areEVInputsDisabled()) forceZeroEVInputs(poke);
	totalEVs(poke);
});
$(".sl .base, .sl .evs").keyup(function () {
	calcStat($(this).closest(".poke-info"), 'sl');
});
$(".at .dvs").keyup(function () {
	var poke = $(this).closest(".poke-info");
	calcStat(poke, 'at');
	poke.find(".hp .dvs").val(getHPDVs(poke));
	calcHP(poke);
});
$(".df .dvs").keyup(function () {
	var poke = $(this).closest(".poke-info");
	calcStat(poke, 'df');
	poke.find(".hp .dvs").val(getHPDVs(poke));
	calcHP(poke);
});
$(".sa .dvs").keyup(function () {
	var poke = $(this).closest(".poke-info");
	calcStat(poke, 'sa');
	poke.find(".sd .dvs").val($(this).val());
	calcStat(poke, 'sd');
	poke.find(".hp .dvs").val(getHPDVs(poke));
	calcHP(poke);
});
$(".sp .dvs").keyup(function () {
	var poke = $(this).closest(".poke-info");
	calcStat(poke, 'sp');
	poke.find(".hp .dvs").val(getHPDVs(poke));
	calcHP(poke);
});
$(".sl .dvs").keyup(function () {
	var poke = $(this).closest(".poke-info");
	calcStat(poke, 'sl');
	poke.find(".hp .dvs").val(getHPDVs(poke));
	calcHP(poke);
});

function getForcedTeraType(pokemonName) {
	if (startsWith(pokemonName, "Ogerpon-Cornerstone")) {
		return "Rock";
	} else if (startsWith(pokemonName, "Ogerpon-Hearthflame")) {
		return "Fire";
	} else if (pokemonName === "Ogerpon" || startsWith(pokemonName, "Ogerpon-Teal")) {
		return "Grass";
	} else if (startsWith(pokemonName, "Ogerpon-Wellspring")) {
		return "Water";
	} else if (startsWith(pokemonName, "Terapagos")) {
		return "Stellar";
	}
	return null;
}

function getHPDVs(poke) {
	return (~~poke.find(".at .dvs").val() % 2) * 8 +
(~~poke.find(".df .dvs").val() % 2) * 4 +
(~~poke.find(".sp .dvs").val() % 2) * 2 +
(~~poke.find(gen === 1 ? ".sl .dvs" : ".sa .dvs").val() % 2);
}

function calcStats(poke) {
	for (var i = 0; i < LEGACY_STATS[gen].length; i++) {
		calcStat(poke, LEGACY_STATS[gen][i]);
	}
}

function calcCurrentHP(poke, max, percent, skipDraw) {
	var current = Math.round(Number(percent) * Number(max) / 100);
	poke.find(".current-hp").val(current);
	if (!skipDraw) drawHealthBar(poke, max, current);
	return current;
}
function calcPercentHP(poke, max, current, skipDraw) {
	var percent = Math.round(100 * Number(current) / Number(max));
	if (percent === 0 && current > 0) {
		percent = 1;
	} else if (percent === 100 & current < max) {
		percent = 99;
	}

	poke.find(".percent-hp").val(percent);
	if (!skipDraw) drawHealthBar(poke, max, current);
	return percent;
}
function drawHealthBar(poke, max, current) {
	var fillPercent = 100 * current / max;
	var fillColor = fillPercent > 50 ? "green" : fillPercent > 20 ? "yellow" : "red";

	var healthbar = poke.find(".hpbar");
	healthbar.addClass("hp-" + fillColor);
	var unwantedColors = ["green", "yellow", "red"];
	unwantedColors.splice(unwantedColors.indexOf(fillColor), 1);
	for (var i = 0; i < unwantedColors.length; i++) {
		healthbar.removeClass("hp-" + unwantedColors[i]);
	}
	healthbar.css("background", "linear-gradient(to right, " + fillColor + " " + fillPercent + "%, white 0%");
}
// TODO: these HP inputs should really be input type=number with min=0, step=1, constrained by max=maxHP or 100
$(".current-hp").on("input change keyup", function (event) {
	// Real edits are handled by input/change; retain synthetic keyup callers.
	// A Tab keyup on the percent box must not round an exact HP value.
	if (event.type === "keyup" && event.originalEvent) return;
	var poke = $(this).closest(".poke-info");
	var max = poke.find(".max-hp").text();
	validate($(this), 0, max);
	var current = $(this).val();
	calcPercentHP(poke, max, current);
});
$(".percent-hp").on("input change keyup", function (event) {
	if (event.type === "keyup" && event.originalEvent) return;
	var poke = $(this).closest(".poke-info");
	var max = poke.find(".max-hp").text();
	validate($(this), 0, 100);
	var percent = $(this).val();
	calcCurrentHP(poke, max, percent);
});

$(".ability").bind("keyup change", function () {
	var ability = $(this).closest(".poke-info").find(".ability").val();

	for (var i = 1; i <= 4; i++) {
		var moveSelector = ".move" + i;
		var moveHits = 3;

		var moveName = $(this).closest(".poke-info").find(moveSelector).find(".select2-chosen").text();
		var move = moves[moveName] || moves['(No Move)'];
		if (move.multiaccuracy) {
			moveHits = move.multihit;
		} else if (ability === 'Skill Link') {
			moveHits = 5;
		} else if ($(this).closest(".poke-info").find(".item").val() === 'Loaded Dice') {
			moveHits = 4;
		}
		$(this).closest(".poke-info").find(moveSelector).find(".move-hits").val(moveHits);
	}

	var TOGGLE_ABILITIES = {
		on: ['Intimidate', 'Slow Start', 'Teraform Zero'],
		off: ['Flash Fire', 'Minus', 'Plus', 'Unburden', 'Analytic', 'Stakeout']
	};
	if (gen !== 8) TOGGLE_ABILITIES.on.push('Intrepid Sword', 'Dauntless Shield');

	if (TOGGLE_ABILITIES.on.indexOf(ability) >= 0) {
		showAbilityToggle($(this).closest(".poke-info"));
		$(this).closest(".poke-info").find(".abilityToggle").prop("checked", true);
	} else if (TOGGLE_ABILITIES.off.indexOf(ability) >= 0) {
		showAbilityToggle($(this).closest(".poke-info"));
		$(this).closest(".poke-info").find(".abilityToggle").prop("checked", false);
	} else {
		hideAbilityToggle($(this).closest(".poke-info"));
	}

	checkRivalry(ability);

	var boostedStat = $(this).closest(".poke-info").find(".boostedStat");
	if (ability === "Protosynthesis" || ability === "Quark Drive") {
		boostedStat.prop("hidden", false).show();
		autosetQP($(this).closest(".poke-info"));
	} else {
		boostedStat.val("");
		boostedStat.prop("hidden", true).hide();
	}

	if (ability === "Supreme Overlord") {
		$(this).closest(".poke-info").find(".alliesFainted").prop("hidden", false).show();
	} else {
		$(this).closest(".poke-info").find(".alliesFainted").val('0');
		$(this).closest(".poke-info").find(".alliesFainted").prop("hidden", true).hide();
	}

});

function autosetQP(pokemon) {
	var currentWeather = $("input:radio[name='weather']:checked").val();
	var currentTerrain = $("input:checkbox[name='terrain']:checked").val() || "No terrain";

	var item = pokemon.find(".item").val();
	var ability = pokemon.find(".ability").val();
	var boostedStat = pokemon.find(".boostedStat").val();

	if (!boostedStat || boostedStat === "auto") {
		if (
			(item === "Booster Energy") ||
			(ability === "Protosynthesis" && currentWeather === "Sun") ||
			(ability === "Quark Drive" && currentTerrain === "Electric")
		) {
			pokemon.find(".boostedStat").val("auto");
		} else {
			pokemon.find(".boostedStat").val("");
		}
	}
}

$("#p1 .ability").bind("keyup change", function () {
	autosetWeather($(this).val(), 0);
	autosetTerrain($(this).val(), 0);
	autosetQP($(this).closest(".poke-info"));
});

$("input[name='weather']").change(function () {
	var allPokemon = $('.poke-info');
	allPokemon.each(function () {
		autosetQP($(this));
	});
});

var lastManualWeather = "";
var lastAutoWeather = ["", ""];
function autosetWeather(ability, i) {

	if ($('.locked-weather').length) {
		return;
	}

	var currentWeather = $("input:radio[name='weather']:checked").val();
	if (lastAutoWeather.indexOf(currentWeather) === -1) {
		lastManualWeather = currentWeather;
		lastAutoWeather[1 - i] = "";
	}
	switch (ability) {
	case "Drought":
	case "Orichalcum Pulse":
		lastAutoWeather[i] = "Sun";
		$("#sun").prop("checked", true);
		break;
	case "Drizzle":
		lastAutoWeather[i] = "Rain";
		$("#rain").prop("checked", true);
		break;
	case "Sand Stream":
		lastAutoWeather[i] = "Sand";
		$("#sand").prop("checked", true);
		break;
	case "Snow Warning":
		if (gen >= 9) {
			lastAutoWeather[i] = "Snow";
			$("#snow").prop("checked", true);
		} else {
			lastAutoWeather[i] = "Hail";
			$("#hail").prop("checked", true);
		}
		break;
	case "Desolate Land":
		lastAutoWeather[i] = "Harsh Sunshine";
		$("#harsh-sunshine").prop("checked", true);
		break;
	case "Primordial Sea":
		lastAutoWeather[i] = "Heavy Rain";
		$("#heavy-rain").prop("checked", true);
		break;
	case "Delta Stream":
		lastAutoWeather[i] = "Strong Winds";
		$("#strong-winds").prop("checked", true);
		break;
	default:
		lastAutoWeather[i] = "";
		var newWeather = lastAutoWeather[1 - i] !== "" ? lastAutoWeather[1 - i] : "";
		$("input:radio[name='weather'][value='" + newWeather + "']").prop("checked", true);
		break;
	}
}

$("input[name='terrain']").change(function () {
	var allPokemon = $('.poke-info');
	allPokemon.each(function () {
		autosetQP($(this));
	});
});

var lastManualTerrain = "";
var lastAutoTerrain = ["", ""];
function autosetTerrain(ability, i) {
	var currentTerrain = $("input:checkbox[name='terrain']:checked").val() || "No terrain";
	if (lastAutoTerrain.indexOf(currentTerrain) === -1) {
		lastManualTerrain = currentTerrain;
		lastAutoTerrain[1 - i] = "";
	}
	// terrain input uses checkbox instead of radio, need to uncheck all first
	$("input:checkbox[name='terrain']:checked").prop("checked", false);
	switch (ability) {
	case "Electric Surge":
	case "Hadron Engine":
		lastAutoTerrain[i] = "Electric";
		$("#electric").prop("checked", true);
		break;
	case "Grassy Surge":
		lastAutoTerrain[i] = "Grassy";
		$("#grassy").prop("checked", true);
		break;
	case "Misty Surge":
		lastAutoTerrain[i] = "Misty";
		$("#misty").prop("checked", true);
		break;
	case "Psychic Surge":
		lastAutoTerrain[i] = "Psychic";
		$("#psychic").prop("checked", true);
		break;
	default:
		lastAutoTerrain[i] = "";
		var newTerrain = lastAutoTerrain[1 - i] !== "" ? lastAutoTerrain[1 - i] : lastManualTerrain;
		if ("No terrain" !== newTerrain) {
			$("input:checkbox[name='terrain'][value='" + newTerrain + "']").prop("checked", true);
		}
		break;
	}
}


$(".status").bind("keyup change", function () {
	if ($(this).val() === 'Badly Poisoned') {
		$(this).parent().children(".toxic-counter").show();
	} else {
		$(this).parent().children(".toxic-counter").hide();
	}
});

$(".teraType").change(function () {
	var pokeObj = $(this).closest(".poke-info");
	var checked = pokeObj.find(".teraToggle").prop("checked");
	stellarButtonsVisibility(pokeObj, $(this).val() === "Stellar" && checked);
});

var lockerMove = "";
// auto-update move details on select
$(".move-selector").change(function () {
	var moveName = $(this).val();
	var move = moves[moveName] || moves['(No Move)'];
	var moveGroupObj = $(this).parent();
	moveGroupObj.children(".move-bp").val(moveName === 'Present' ? 40 : move.bp);
	var m = moveName.match(HIDDEN_POWER_REGEX);
	if (m) {
		var pokeObj = $(this).closest(".poke-info");
		var pokemon = createPokemon(pokeObj);
		var actual = calc.Stats.getHiddenPower(GENERATION, pokemon.ivs);
		if (actual.type !== m[1]) {
			var hpIVs = calc.Stats.getHiddenPowerIVs(GENERATION, m[1]);
			if (hpIVs && gen < 7) {
				for (var i = 0; i < LEGACY_STATS[gen].length; i++) {
					var legacyStat = LEGACY_STATS[gen][i];
					var stat = legacyStatToStat(legacyStat);
					pokeObj.find("." + legacyStat + " .ivs").val(hpIVs[stat] !== undefined ? hpIVs[stat] : 31);
					pokeObj.find("." + legacyStat + " .dvs").val(hpIVs[stat] !== undefined ? calc.Stats.IVToDV(hpIVs[stat]) : 15);
				}
				if (gen < 3) {
					var hpDV = calc.Stats.getHPDV({
						atk: pokeObj.find(".at .ivs").val(),
						def: pokeObj.find(".df .ivs").val(),
						spe: pokeObj.find(".sp .ivs").val(),
						spc: pokeObj.find(".sa .ivs").val()
					});
					pokeObj.find(".hp .ivs").val(calc.Stats.DVToIV(hpDV));
					pokeObj.find(".hp .dvs").val(hpDV);
				}
				pokeObj.change();
				moveGroupObj.children(".move-bp").val(gen >= 6 ? 60 : 70);
			}
		} else {
			moveGroupObj.children(".move-bp").val(actual.power);
		}
	} else if (gen >= 2 && gen <= 6 && HIDDEN_POWER_REGEX.test($(this).attr('data-prev'))) {
		// If this selector was previously Hidden Power but now isn't, reset all IVs/DVs to max.
		var pokeObj = $(this).closest(".poke-info");
		for (var i = 0; i < LEGACY_STATS[gen].length; i++) {
			var legacyStat = LEGACY_STATS[gen][i];
			pokeObj.find("." + legacyStat + " .ivs").val(31);
			pokeObj.find("." + legacyStat + " .dvs").val(15);
		}
	}
	$(this).attr('data-prev', moveName);
	moveGroupObj.children(".move-type").val(move.type);
	moveGroupObj.children(".move-cat").val(move.category);
	moveGroupObj.children(".move-crit").prop("checked", move.willCrit === true);
	moveGroupObj.children(".move-times").val(1);
	moveGroupObj.children(".move-times").hide();

	var stat = move.category === 'Special' ? 'spa' : 'atk';
	if (Array.isArray(move.multihit) || (!isNaN(move.multihit) && move.multiaccuracy)) {
		moveGroupObj.children(".move-hits").empty();
		if (!isNaN(move.multihit)) {
			for (var i = 1; i <= move.multihit; i++) {
				moveGroupObj.children(".move-hits").append("<option value=" + i + ">" + i + " hits</option>");
			}
		} else {
			for (var i = 1; i <= move.multihit[1]; i++) {
				moveGroupObj.children(".move-hits").append("<option value=" + i + ">" + i + " hits</option>");
			}
		}
		moveGroupObj.children(".move-hits").show();
		var pokemon = $(this).closest(".poke-info");

		var moveHits = 3;
		if (move.multiaccuracy) {
			moveHits = move.multihit;
		} else if (pokemon.find('.ability').val() === 'Skill Link') {
			moveHits = 5;
		} else if (pokemon.find(".item").val() === 'Loaded Dice') {
			moveHits = 4;
		}

		moveGroupObj.children(".move-hits").val(moveHits);
	} else if (!isNaN(move.multihit)) {
		moveGroupObj.children(".move-hits").val(1);
		moveGroupObj.children(".move-hits").hide();
	} else {
		moveGroupObj.children(".move-hits").val(1);
		moveGroupObj.children(".move-hits").hide();
		moveGroupObj.children(".move-times").show();
	}
	moveGroupObj.children(".move-z").prop("checked", false);
});

$(".item").change(function () {
	var itemName = $(this).val();
	var pokeObj = $(this).closest('.poke-info');

	var $metronomeControl = pokeObj.find('.metronome');
	if (itemName === "Metronome") {
		$metronomeControl.show();
	} else {
		$metronomeControl.hide();
	}

	if (itemName === "Flame Orb") {
		pokeObj.find(".status").val("Burned");
		pokeObj.find(".status").change();
	} else if (itemName === "Toxic Orb") {
		pokeObj.find(".status").val("Badly Poisoned");
		pokeObj.find(".status").change();
	} else if (($(this).attr('data-prev') === "Flame Orb" && pokeObj.find(".status").val() === "Burned") ||
			($(this).attr('data-prev') === "Toxic Orb" && pokeObj.find(".status").val() === "Badly Poisoned")) {
		pokeObj.find(".status").val("Healthy");
		pokeObj.find(".status").change();
	}

	for (var i = 1; i <= 4; i++) {
		var moveSelector = ".move" + i;
		var moveHits = 3;

		var moveName = pokeObj.find(moveSelector).find(".select2-chosen").text();
		var move = moves[moveName] || moves['(No Move)'];
		if (move.multiaccuracy) {
			moveHits = move.multihit;
		} else if (pokeObj.find(".ability").val() === 'Skill Link') {
			moveHits = 5;
		} else if (pokeObj.find(".item").val() === 'Loaded Dice') {
			moveHits = 4;
		}
		pokeObj.find(moveSelector).find(".move-hits").val(moveHits);
	}

	autosetQP(pokeObj);
	pokeObj.find('.item').attr('data-prev', itemName);
});

function showAbilityToggle(pokeObj) {
	pokeObj.find(".ability-toggle-slot").removeClass("hide");
	pokeObj.find(".abilityToggle").prop("disabled", false);
}

function hideAbilityToggle(pokeObj) {
	pokeObj.find(".ability-toggle-slot").addClass("hide");
	pokeObj.find(".abilityToggle").prop("checked", false).prop("disabled", true);
}

function getPokemonSpriteId(pokemonName) {
	var provider = getActiveProfileProvider();
	var context = getActiveProfileContext();
	var suppliedId;
	if (!pokemonName) return "";
	if (provider && typeof provider.getPokemonSpriteId === "function") {
		suppliedId = provider.getPokemonSpriteId(pokemonName, calc, context);
		if (typeof suppliedId === "string" && suppliedId.trim()) return suppliedId.trim();
	}
	var pokemon = pokedex && pokedex[pokemonName];
	return window.KMPokemonSprites.getId(pokemonName, pokemon, calc && calc.SPECIES);
}

function getPokemonSpriteUrl(pokemonName) {
	var desktopSpriteBaseUrl = getDesktopSpriteBaseUrl();
	if (!desktopSpriteBaseUrl) return "./img/km-companion-icon.png";
	return desktopSpriteBaseUrl + "/gen5/" + window.KMPokemonSprites.getStaticId(getPokemonSpriteId(pokemonName)) + ".png";
}

function getDesktopSpriteBaseUrl() {
	var desktopConfig = window.kmCalculatorDesktop || window.royalSwordDesktop;
	if (!desktopConfig || !desktopConfig.localSpriteBaseUrl) return "";
	return desktopConfig.localSpriteBaseUrl.replace(/\/$/, "");
}

function getPokemonSpriteUrls(pokemonName, options) {
	var desktopArtwork = window.kmCalculatorDesktop || window.royalSwordDesktop;
	if (desktopArtwork && desktopArtwork.artwork && (!window.KMPokemonArtwork || !window.KMPokemonArtwork.isEnabled())) return [];
	var provider = getActiveProfileProvider();
	var context = getActiveProfileContext();
	var suppliedUrls;
	var spriteId = getPokemonSpriteId(pokemonName);
	if (options && typeof options.spriteId === "string" && /^[a-z0-9-]+$/.test(options.spriteId)) spriteId = options.spriteId;
	var staticSpriteId = window.KMPokemonSprites.getStaticId(spriteId);
	var desktopSpriteBaseUrl = getDesktopSpriteBaseUrl();
	if (provider && typeof provider.getPokemonSpriteUrls === "function") {
		suppliedUrls = provider.getPokemonSpriteUrls(pokemonName, options || {}, calc, context);
		if (typeof suppliedUrls === "string") suppliedUrls = [suppliedUrls];
		if (Array.isArray(suppliedUrls)) {
			suppliedUrls = suppliedUrls.filter(function (url) {
				return typeof url === "string" && url.trim();
			}).map(function (url) {
				return url.trim();
			});
			if (suppliedUrls.length) return suppliedUrls;
		}
	}
	if (!desktopSpriteBaseUrl) return [getPokemonSpriteUrl(pokemonName)];
	if (options && options.preferStatic) return [desktopSpriteBaseUrl + "/gen5/" + staticSpriteId + ".png"];
	return [
		desktopSpriteBaseUrl + "/ani/" + spriteId + ".gif",
		desktopSpriteBaseUrl + "/gen5/" + staticSpriteId + ".png"
	];
}

function setPokemonSpriteSource(sprite, spriteUrl) {
	sprite.toggleClass("pokemon-sprite-animated", spriteUrl.indexOf("/ani/") !== -1);
	sprite.attr("src", spriteUrl);
}

function createPokemonSprite(pokemonName, className, options) {
	var sprite = $("<img alt='' />");
	var spriteUrls, spriteUrlIndex;
	sprite.addClass(className || "pokemon-sprite");
	sprite.attr("data-km-pokemon-sprite", "");
	sprite[0].kmRefreshSprite = function () {
		spriteUrls = getPokemonSpriteUrls(pokemonName, options); spriteUrlIndex = 0;
		if (!spriteUrls.length) { sprite.attr("data-km-sprite-state", "disabled").removeClass("pokemon-sprite-animated").removeAttr("src").hide(); return; }
		sprite.attr("data-km-sprite-state", "loading").show(); setPokemonSpriteSource(sprite, spriteUrls[0]);
	};
	sprite.on("load", function () {
		if (spriteUrls.length && spriteUrlIndex < spriteUrls.length) sprite.attr("data-km-sprite-state", "ready").show();
	});
	sprite.on("error", function () {
		if (!spriteUrls.length) return;
		spriteUrlIndex += 1;
		if (spriteUrls[spriteUrlIndex]) {
			sprite.attr("data-km-sprite-state", "loading");
			setPokemonSpriteSource($(this), spriteUrls[spriteUrlIndex]);
			return;
		}
		$(this).attr("data-km-sprite-state", "missing").hide();
	});
	sprite[0].kmRefreshSprite();
	return sprite;
}

function getPokemonLegendTitle(pokeObj) {
	return pokeObj.prop("id") === "p1" ? "Player" : "Trainer";
}

function updatePokemonLegendSprite(pokeObj, title, pokemonName) {
	var legend = pokeObj.children("legend").first();
	legend.empty();
	legend.removeClass("has-legend-sprite");
	legend.append(document.createTextNode(title));
}

function forceZeroEVInputs(poke) {
	poke.find(".evs").val(0);
}

function getActiveRomHackProfile() {
	if (!window.kmRomHackRegistry || typeof window.kmRomHackRegistry.getActiveProfile !== "function") return null;
	return window.kmRomHackRegistry.getActiveProfile();
}

function isRoyalSwordProfileActive() {
	var profile = getActiveRomHackProfile();
	return !!profile && profile.calcProfile === "royal-sword" &&
		Number(profile.baseGeneration) === Number(gen || profile.baseGeneration);
}

function areZMovesEnabled() {
	return gen > 6 && !isRoyalSwordProfileActive();
}

function updateProfileZMoveControls() {
	var enabled = areZMovesEnabled();
	var controls = $("input.move-z");
	controls.prop("disabled", !enabled);
	if (!enabled) controls.prop("checked", false);
	$(".z-btn").toggle(enabled);
}

function getActiveProfileContext() {
	var registry = window.kmRomHackRegistry;
	return registry && typeof registry.getActiveContext === "function" ? registry.getActiveContext() : null;
}

function getActiveProfileProvider() {
	var context = getActiveProfileContext();
	return context && context.resolvedProvider ? context.resolvedProvider : null;
}

function getActiveLayoutId() {
	var registry = window.kmRomHackRegistry;
	var context = registry && typeof registry.getActiveContext === "function" ? registry.getActiveContext() : null;
	return context && context.layoutId ? context.layoutId :
		(document.body.getAttribute("data-calc-layout") || "base");
}

function isRoyalSwordLayoutActive() {
	return getActiveLayoutId() === "royal-sword";
}

function areEVInputsDisabled() {
	var registry = window.kmRomHackRegistry;
	var context = registry && typeof registry.getActiveContext === "function" ? registry.getActiveContext() : null;
	return !!(context && context.inputPolicies && context.inputPolicies.evs === "disabled");
}

function getActiveCalcGeneration() {
	var profile = getActiveRomHackProfile();
	if (profile && Number(profile.baseGeneration) === Number(gen) &&
		window.kmRomHackRegistry && typeof window.kmRomHackRegistry.getActiveGeneration === "function") {
		return window.kmRomHackRegistry.getActiveGeneration(calc);
	}
	return calc.Generations.get(gen);
}

function getActiveLegacyData(kind, base) {
	var registry = window.kmRomHackRegistry;
	var context = registry && typeof registry.getActiveContext === "function" ? registry.getActiveContext() : null;
	var provider = context && context.resolvedProvider;
	if (provider && typeof provider.getLegacyData === "function") {
		var supplied = provider.getLegacyData(kind, base, calc, context.profile, context);
		if (supplied) return supplied;
	}
	return null;
}

function getActivePokedex() {
	var base = calc.SPECIES[gen];
	var supplied = getActiveLegacyData("species", base);
	if (supplied) return supplied;
	var generation = getActiveCalcGeneration();
	if (!getActiveRomHackProfile() || !generation || generation === calc.Generations.get(gen)) return base;
	var result = $.extend({}, base);
	Array.from(generation.species).forEach(function (species) {
		result[species.name] = $.extend({}, base[species.name] || {}, species, {
			types: species.types.slice(),
			bs: {
				hp: species.baseStats.hp,
				at: species.baseStats.atk,
				df: species.baseStats.def,
				sa: species.baseStats.spa,
				sd: species.baseStats.spd,
				sp: species.baseStats.spe
			}
		});
	});
	return result;
}

function getActiveItems() {
	var base = calc.ITEMS[gen];
	var supplied = getActiveLegacyData("items", base);
	if (supplied) return supplied;
	var generation = getActiveCalcGeneration();
	if (!getActiveRomHackProfile() || !generation || generation === calc.Generations.get(gen)) return base;
	var result = base.slice();
	Array.from(generation.items).forEach(function (item) {
		if (result.indexOf(item.name) === -1) result.push(item.name);
	});
	return result;
}

function getActiveMoves() {
	var base = calc.MOVES[gen];
	var supplied = getActiveLegacyData("moves", base);
	if (supplied) return supplied;
	var generation = getActiveCalcGeneration();
	if (!getActiveRomHackProfile() || !generation || generation === calc.Generations.get(gen)) return base;
	var result = $.extend({}, base);
	Array.from(generation.moves).forEach(function (move) {
		result[move.name] = $.extend({}, base[move.name] || {}, move, {bp: move.basePower});
	});
	return result;
}

function getActiveAbilities() {
	var base = calc.ABILITIES[gen];
	var supplied = getActiveLegacyData("abilities", base);
	if (supplied) return supplied;
	var generation = getActiveCalcGeneration();
	if (!getActiveRomHackProfile() || !generation || generation === calc.Generations.get(gen)) return base;
	var result = [];
	Array.from(generation.abilities).forEach(function (ability) {
		result.push(ability.name);
	});
	return result;
}

function getActiveTypeChart() {
	var base = calc.TYPE_CHART[gen];
	var supplied = getActiveLegacyData("types", base);
	if (supplied) return supplied;
	var generation = getActiveCalcGeneration();
	if (!getActiveRomHackProfile() || !generation || generation === calc.Generations.get(gen)) return base;
	var result = {};
	Array.from(generation.types).forEach(function (type) {
		result[type.name] = $.extend({}, type.effectiveness);
	});
	return result;
}

function updateProfileEVControls() {
	var controls = $(".evs");
	var inputControls = controls.filter("input");
	var headings = $("th").filter(function () {
		var text = $.trim($(this).text());
		return text === "EVs";
	});
	inputControls.prop("disabled", areEVInputsDisabled());
	if (areEVInputsDisabled()) controls.val(0);
	if (areEVInputsDisabled()) {
		controls.closest("td").hide();
		$(".totalevs").hide();
		headings.hide();
	} else {
		controls.closest("td").each(function () {
			var cell = $(this);
			cell.toggle(!cell.hasClass("gen-specific") || cell.hasClass("g" + gen));
		});
		$(".totalevs").each(function () {
			var row = $(this);
			row.toggle(!row.hasClass("gen-specific") || row.hasClass("g" + gen));
		});
		headings.each(function () {
			var heading = $(this);
			heading.toggle(!heading.hasClass("gen-specific") || heading.hasClass("g" + gen));
		});
	}
}

function getZeroEVs() {
	return {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0};
}

function createProfilePokemon(name, options) {
	if (areEVInputsDisabled()) options.evs = getZeroEVs();
	return new calc.Pokemon(getActiveCalcGeneration(), name, options);
}

window.getActiveCalcGeneration = getActiveCalcGeneration;
window.getActivePokedex = getActivePokedex;
window.getActiveMoves = getActiveMoves;
window.getActiveItems = getActiveItems;
window.getActiveAbilities = getActiveAbilities;
window.getActiveTypeChart = getActiveTypeChart;
window.isRoyalSwordProfileActive = isRoyalSwordProfileActive;
window.isRoyalSwordLayoutActive = isRoyalSwordLayoutActive;
window.areEVInputsDisabled = areEVInputsDisabled;

function applyActiveRomHackProfile(context) {
	var profile = context ? context.profile : null;
	clearDoublesSlotSide("player");
	clearDoublesSlotSide("opponent");
	if (!profile) {
		$(".gen").prop("disabled", false);
		updateProfileEVControls();
		updateProfileZMoveControls();
		return;
	}
	var generationInput = $("#gen" + profile.baseGeneration);
	if (!generationInput.length) throw new Error("This build does not include Generation " + profile.baseGeneration + ".");
	$(".gen").each(function () {
		$(this).prop("disabled", Number($(this).val()) !== Number(profile.baseGeneration));
	});
	generationInput.prop("checked", true).trigger("change");
}

window.applyActiveRomHackProfile = applyActiveRomHackProfile;

var PROFILE_WORKSPACE_STORAGE_PREFIX = "kmCalculatorProfileWorkspace:v1:";
var LEGACY_CUSTOM_SETS_KEY = "customsets";
var LEGACY_TEAM_BOX_LAYOUT_KEY = "royalSwordTeamBoxLayout";
var LEGACY_TEAM_BOX_COLOR_OPTIONS_KEY = "royalSwordTeamBoxColorOptions";
var customSetDexBackups = {};
var TEAM_BOX_ZONE_IDS = ["team-poke-list", "box-poke-list", "box-poke-list2", "compost-poke-list", "trash-box"];
var TEAM_BOX_SORT_ZONE_IDS = ["box-poke-list", "box-poke-list2"];
var TEAM_BOX_TEAM_LIMIT = 6;
var TEAM_BOX_COLOR_CLASSES = [
	"mon-speed-F", "mon-speed-T", "mon-speed-S", "mon-speed-none",
	"mon-dmg-W", "mon-dmg-WMO", "mon-dmg-1", "mon-dmg-2", "mon-dmg-3", "mon-dmg-4",
	"mon-dmg-13", "mon-dmg-14", "mon-dmg-23", "mon-dmg-24", "mon-dmg-none"
];

function getActiveWorkspaceProfileId() {
	var profile = getActiveRomHackProfile();
	return profile && profile.id ? profile.id : "canonical-gen-" + (gen || 9);
}

function getProfileWorkspaceStorageKey(kind) {
	return PROFILE_WORKSPACE_STORAGE_PREFIX + getActiveWorkspaceProfileId() + ":" + kind;
}

function getCustomSetsStorageKey() {
	return getProfileWorkspaceStorageKey("customsets");
}

function getTeamBoxLayoutStorageKey() {
	return getProfileWorkspaceStorageKey("team-box-layout");
}

function getTeamBoxColorOptionsStorageKey() {
	return getProfileWorkspaceStorageKey("team-box-color-options");
}

function readProfileWorkspaceValue(kind, legacyKey) {
	var storage = getRoyalSwordAppStorage();
	var key = getProfileWorkspaceStorageKey(kind);
	var value = storage.getItem(key);
	if (value === null && getActiveWorkspaceProfileId() === "pokemon-royal-sword" && legacyKey) {
		value = storage.getItem(legacyKey);
		if (value !== null) {
			storage.setItem(key, value);
			storage.removeItem(legacyKey);
		}
	}
	return value;
}

window.getKMCalculatorCustomSetsStorageKey = getCustomSetsStorageKey;
window.getKMCalculatorTeamBoxLayoutStorageKey = getTeamBoxLayoutStorageKey;
window.getKMCalculatorProfileWorkspaceStorageKey = getProfileWorkspaceStorageKey;
var TEAM_BOX_DAMAGE_SORT_RANKS = {
	"1": 0,
	WMO: 1,
	W: 2,
	"2": 3,
	"13": 4,
	"14": 5,
	"23": 6,
	"24": 7,
	"3": 8,
	"4": 9,
	none: 10
};
var boxPokemonDragged = null;
var boxPokemonDragOrigin = null;
var boxPokemonDragNextSibling = null;
var doublesSlotDrag = null;
var doublesSlotMenuContext = null;
var finderExplanationWindow = null;
var playerTeamMirrorObserver = null;
var doublesSlotState = {
	player: {1: null, 2: null},
	opponent: {1: null, 2: null}
};
var doublesActiveSlot = {
	player: 1,
	opponent: 1
};
var colorCodeExplanationWindow = null;
window.AUTO_REFRESH = false;

var MOVE_RESULT_STATE_CLASSES = [
	"move-result-invalid",
	"move-result-no-effect",
	"move-result-status",
	"move-result-pending"
];

function getMoveResultTargets(location) {
	return $(location.move).next("label").add($(location.damage));
}

function formatDamageResultText(text) {
	return String(text).replace(/(\d+(?:\.\d+)?%?)\s*-\s*(?=\d)/g, "$1 to ").replace(/ -- /g, "; ");
}

function setMoveResultDisplay(location, text, state) {
	var targets = getMoveResultTargets(location);
	targets.removeClass(MOVE_RESULT_STATE_CLASSES.join(" "));
	if (state) targets.addClass("move-result-" + state);
	$(location.damage).text(text);
}

function isDisplayStatusMove(move) {
	return !!(move && move.category === "Status" && move.name !== "(No Move)" && !move.named("Nature Power"));
}

function getMoveResultMaxDamage(result) {
	if (!result || typeof result.range !== "function") return 0;
	try {
		return result.range()[1];
	} catch (e) {
		return 0;
	}
}

function getMoveResultState(result, move) {
	if (!result) return "pending";
	if (!move || move.name === "(No Move)") return "invalid";
	if (isDisplayStatusMove(move)) return "status";
	return getMoveResultMaxDamage(result) <= 0 ? "no-effect" : "";
}

function getMoveResultText(result, move, notation) {
	var state = getMoveResultState(result, move);
	if (state === "invalid") return "No move";
	if (state === "status") return "Status move";
	if (state === "no-effect") return "No effect";
	return result ? formatDamageResultText(result.moveDesc(notation)) : "Pending";
}

function renderMoveResultDisplay(location, result, move, notation) {
	setMoveResultDisplay(location, getMoveResultText(result, move, notation), getMoveResultState(result, move));
}

function isDoublesFormatSelected() {
	return $("input:radio[name='format']:checked").val() === "Doubles";
}

function clearDoublesSlotSide(side) {
	if (!doublesSlotState[side]) return;
	doublesSlotState[side][1] = null;
	doublesSlotState[side][2] = null;
	doublesActiveSlot[side] = 1;
	updateDoublesSlotHighlights();
}

function getSetSlotSelection(fullSetName) {
	var pokemonName = getPokemonNameFromFullSetName(fullSetName);
	return {
		fullSetName: fullSetName,
		pokemonName: pokemonName,
		displayName: pokemonName,
		label: fullSetName
	};
}

function getDoublesSelectionKey(selection) {
	if (!selection) return "";
	if (selection.trainerId !== undefined && selection.trainerIndex !== undefined) {
		return "trainer:" + selection.trainerId + ":" + selection.trainerIndex;
	}
	return selection.fullSetName || selection.label || "";
}

function setDoublesSlotSelection(side, slot, selection) {
	if (!doublesSlotState[side] || (slot !== 1 && slot !== 2)) return;
	var key = getDoublesSelectionKey(selection);
	if (key) {
		for (var otherSlot = 1; otherSlot <= 2; otherSlot++) {
			if (otherSlot !== slot && getDoublesSelectionKey(doublesSlotState[side][otherSlot]) === key) {
				doublesSlotState[side][otherSlot] = null;
			}
		}
	}
	doublesSlotState[side][slot] = selection || null;
	updateDoublesSlotHighlights();
}

function getDoublesSlotSelection(side, slot) {
	return doublesSlotState[side] && doublesSlotState[side][slot] ? doublesSlotState[side][slot] : null;
}

function setDoublesActiveSlot(side, slot) {
	if (!doublesActiveSlot[side] || (slot !== 1 && slot !== 2)) return;
	doublesActiveSlot[side] = slot;
	updateDoublesSlotSummaries();
}

function getDoublesActiveSlot(side) {
	return doublesActiveSlot[side] || 1;
}

function clearDoublesSlotHighlights() {
	$(".box-pokemon, #trainer-team .trainer-pokemon")
		.removeClass("doubles-slot-assigned doubles-slot-1 doubles-slot-2");
}

function updateDoublesSlotHighlights() {
	clearDoublesSlotHighlights();
	updateDoublesSlotSummaries();
}

function createDoublesSlotSummary(side) {
	var summary = $("<div class='doubles-slot-summary' data-side='" + side + "' aria-label='Doubles slots'></div>");
	for (var slot = 1; slot <= 2; slot++) {
		var card = $("<button type='button' class='doubles-slot-card'></button>");
		card.attr("data-side", side);
		card.attr("data-slot", slot);
		card.append("<span class='doubles-slot-card-label'>Slot " + slot + "</span>");
		card.append("<span class='doubles-slot-card-body'><span class='doubles-slot-card-empty'>Empty</span></span>");
		summary.append(card);
	}
	return summary;
}

function installDoublesSlotSummaries() {
	if ($("#p1").length && !$("#p1 .doubles-slot-summary[data-side='player']").length) {
		var playerAnchor = $("#p1 .player-controls-spacer");
		(playerAnchor.length ? playerAnchor : $("#p1 legend")).after(createDoublesSlotSummary("player"));
	}
	if ($("#p2").length && !$("#p2 .doubles-slot-summary[data-side='opponent']").length) {
		var opponentAnchor = $("#p2 .trainer-controls");
		(opponentAnchor.length ? opponentAnchor : $("#p2 legend")).after(createDoublesSlotSummary("opponent"));
	}
	updateDoublesSlotSummaries();
}

function getDoublesSlotSummaryLabel(selection) {
	return selection && (selection.displayName || selection.pokemonName || selection.label) ? (selection.displayName || selection.pokemonName || selection.label) : "";
}

function updateDoublesSlotSummaryCard(side, slot) {
	var selection = doublesSlotState[side] && doublesSlotState[side][slot];
	var card = $(".doubles-slot-card[data-side='" + side + "'][data-slot='" + slot + "']");
	var body = card.find(".doubles-slot-card-body");
	var label = getDoublesSlotSummaryLabel(selection);
	card.toggleClass("active-doubles-slot", doublesActiveSlot[side] === slot);
	card.toggleClass("filled-doubles-slot", !!selection);
	card.prop("draggable", !!selection);
	card.attr("aria-pressed", doublesActiveSlot[side] === slot ? "true" : "false");
	card.attr("title", selection && selection.label ? selection.label : "Slot " + slot);
	body.empty();
	if (!selection) {
		body.append("<span class='doubles-slot-card-empty'>Empty</span>");
		return;
	}
	body
		.append(createPokemonSprite(selection.pokemonName, "doubles-slot-card-sprite"))
		.append($("<span class='doubles-slot-card-name'></span>").text(label));
	body.find("img").prop("draggable", false);
}

function updateDoublesSlotSummaries() {
	for (var side in doublesSlotState) {
		if (!Object.prototype.hasOwnProperty.call(doublesSlotState, side)) continue;
		for (var slot = 1; slot <= 2; slot++) {
			updateDoublesSlotSummaryCard(side, slot);
		}
	}
	updateSelectedPokemonHighlights();
}

function updateSelectedPokemonHighlights() {
	var doubles = isDoublesFormatSelected();
	var playerSet = $("#p1 input.set-selector").val();
	if (doubles && !getDoublesSlotSelection("player", getDoublesActiveSlot("player"))) playerSet = "";
	$(".box-pokemon, #player-team .player-team-pokemon").each(function () {
		var node = $(this);
		var selected = !!playerSet && node.attr("data-id") === playerSet;
		node.toggleClass("selected-box-pokemon", selected && node.hasClass("box-pokemon"));
		if (node.hasClass("player-team-pokemon")) node.toggleClass("selected-player-pokemon", selected).attr("aria-pressed", String(selected));
	});
	var opponentSet = $("#p2 input.set-selector").val();
	var opponent = getDoublesSlotSelection("opponent", getDoublesActiveSlot("opponent"));
	if (!doubles && (!opponent || opponent.fullSetName !== opponentSet)) {
		opponent = [getDoublesSlotSelection("opponent", 1), getDoublesSlotSelection("opponent", 2)].filter(function (selection) {
			return selection && selection.fullSetName === opponentSet;
		})[0];
	}
	$("#trainer-team .trainer-pokemon").each(function () {
		var node = $(this);
		var selected = !!opponent && opponent.fullSetName === opponentSet &&
			node.attr("data-trainer-id") === String(opponent.trainerId) && node.attr("data-trainer-index") === String(opponent.trainerIndex);
		node.toggleClass("selected-trainer-pokemon", selected).attr("aria-pressed", String(selected));
	});
}

function activateDoublesSlot(side, slot) {
	if (!doublesSlotState[side] || (slot !== 1 && slot !== 2)) return;
	setDoublesActiveSlot(side, slot);
	var selection = doublesSlotState[side][slot];
	if (selection && side === "player") {
		loadPlayerPokemonIntoEditor(selection.fullSetName, slot);
	}
	if (selection && side === "opponent") {
		if (selection.trainerId !== undefined && selection.trainerIndex !== undefined &&
			typeof window.loadTrainerSlotIntoEditor === "function") {
			window.loadTrainerSlotIntoEditor(selection.trainerId, selection.trainerIndex, slot);
		} else {
			loadOpponentPokemonIntoEditor(selection.fullSetName, slot);
		}
	}
}

function swapDoublesSlots(side) {
	if (!doublesSlotState[side]) return;
	var first = doublesSlotState[side][1];
	doublesSlotState[side][1] = doublesSlotState[side][2];
	doublesSlotState[side][2] = first;
	updateDoublesSlotHighlights();
	var activeSlot = doublesActiveSlot[side] || 1;
	if (!doublesSlotState[side][activeSlot]) {
		activeSlot = doublesSlotState[side][1] ? 1 : (doublesSlotState[side][2] ? 2 : activeSlot);
	}
	activateDoublesSlot(side, activeSlot);
	if (typeof window.performCalculations === "function") window.performCalculations();
}

function getDoublesSlotDragSource(source) {
	var node = $(source);
	if (node.hasClass("doubles-slot-card")) {
		var side = node.attr("data-side");
		var slot = Number(node.attr("data-slot"));
		return {side: side, selection: getDoublesSlotSelection(side, slot), sourceSlot: slot};
	}
	if (node.is("#player-team .player-team-pokemon, #team-poke-list .box-pokemon")) {
		return {side: "player", selection: getSetSlotSelection(node.attr("data-id") || "")};
	}
	if (node.is("#trainer-team .trainer-pokemon")) {
		return {side: "opponent", selection: {
			trainerId: node.attr("data-trainer-id"), trainerIndex: node.attr("data-trainer-index")
		}};
	}
	return null;
}

function isDoublesSlotDragAvailable(drag) {
	if (!isDoublesFormatSelected() || !drag || !drag.selection) return false;
	var selection = drag.selection;
	var key = getDoublesSelectionKey(selection);
	if (!key || (drag.sourceSlot && getDoublesSelectionKey(getDoublesSlotSelection(drag.side, drag.sourceSlot)) !== key)) return false;
	if (drag.side === "player") {
		return fullSetExists(selection.fullSetName || "") && $("#team-poke-list .box-pokemon").filter(function () {
			return $(this).attr("data-id") === selection.fullSetName;
		}).length > 0;
	}
	if (drag.side === "opponent") {
		return $("#trainer-team .trainer-pokemon").filter(function () {
			return $(this).attr("data-trainer-id") === String(selection.trainerId) &&
				$(this).attr("data-trainer-index") === String(selection.trainerIndex);
		}).length > 0;
	}
	return false;
}

function clearDoublesSlotDragState() {
	doublesSlotDrag = null;
	$(".doubles-slot-drop-target").removeClass("doubles-slot-drop-target");
}

function startDoublesSlotDrag(event) {
	clearDoublesSlotDragState();
	var drag = getDoublesSlotDragSource(event.currentTarget || event.target);
	if (!isDoublesSlotDragAvailable(drag)) return false;
	doublesSlotDrag = drag;
	hideDoublesSlotMenu();
	var transfer = (event.originalEvent || event).dataTransfer;
	if (transfer) {
		transfer.effectAllowed = "move";
		transfer.setData("application/x-km-calculator-slot", getDoublesSelectionKey(drag.selection));
	}
	return true;
}

function canDropDoublesSlot(card) {
	var slot = Number($(card).attr("data-slot"));
	return (slot === 1 || slot === 2) && isDoublesSlotDragAvailable(doublesSlotDrag) &&
		doublesSlotDrag.side === $(card).attr("data-side");
}

function dropDoublesSlotPokemon(event) {
	event.preventDefault();
	event.stopPropagation();
	var card = event.currentTarget;
	var drag = doublesSlotDrag;
	var allowed = canDropDoublesSlot(card);
	clearDoublesSlotDragState();
	clearBoxPokemonDragState();
	if (!allowed) return;
	var side = drag.side;
	var slot = Number($(card).attr("data-slot"));
	var otherSlot = slot === 1 ? 2 : 1;
	var key = getDoublesSelectionKey(drag.selection);
	if (getDoublesSelectionKey(getDoublesSlotSelection(side, slot)) === key) return;
	if (getDoublesSelectionKey(getDoublesSlotSelection(side, otherSlot)) === key) {
		var activeSlot = getDoublesActiveSlot(side);
		var activeSelection = getDoublesSlotSelection(side, activeSlot);
		var replaced = doublesSlotState[side][slot];
		doublesSlotState[side][slot] = doublesSlotState[side][otherSlot];
		doublesSlotState[side][otherSlot] = replaced;
		// Keep the live editor attached to its Pokémon, including unsaved HP and stat edits.
		if (activeSelection) setDoublesActiveSlot(side, activeSlot === 1 ? 2 : 1);
		else activateDoublesSlot(side, slot);
		updateDoublesSlotHighlights();
	} else if (side === "player") {
		loadPlayerPokemonIntoEditor(drag.selection.fullSetName, slot);
	} else if (typeof window.loadTrainerSlotIntoEditor === "function") {
		window.loadTrainerSlotIntoEditor(drag.selection.trainerId, drag.selection.trainerIndex, slot);
	}
	if (typeof window.performCalculations === "function") window.performCalculations();
}

function installDoublesSlotDragControls() {
	$(document).on("dragstart", "#player-team .player-team-pokemon, #trainer-team .trainer-pokemon, .doubles-slot-card", function (event) {
		clearBoxPokemonDragState();
		if (!startDoublesSlotDrag(event)) event.preventDefault();
	});
	$(document).on("dragenter dragover", ".doubles-slot-card", function (event) {
		var allowed = canDropDoublesSlot(this);
		$(".doubles-slot-drop-target").removeClass("doubles-slot-drop-target");
		$(this).toggleClass("doubles-slot-drop-target", allowed);
		var transfer = (event.originalEvent || event).dataTransfer;
		if (transfer) transfer.dropEffect = allowed ? "move" : "none";
		if (allowed) event.preventDefault();
	});
	$(document).on("dragleave", ".doubles-slot-card", function (event) {
		if (!$.contains(this, event.relatedTarget)) $(this).removeClass("doubles-slot-drop-target");
	});
	$(document).on("drop", ".doubles-slot-card", dropDoublesSlotPokemon);
	$(document).on("dragend drop", function () {
		clearDoublesSlotDragState();
		clearBoxPokemonDragState();
	});
}

function ensureDoublesSlotMenu() {
	var menu = $("#doubles-slot-menu");
	if (menu.length) return menu;
	menu = $("<div id='doubles-slot-menu' class='doubles-slot-menu' role='menu' hidden></div>");
	menu.append("<button type='button' role='menuitem' class='team-box-menu-action' data-action='move-team'>Send to Team</button>");
	menu.append("<button type='button' role='menuitem' data-action='assign' data-slot='1'>Assign Slot 1</button>");
	menu.append("<button type='button' role='menuitem' data-action='assign' data-slot='2'>Assign Slot 2</button>");
	menu.append("<button type='button' role='menuitem' data-action='swap'>Swap Slots</button>");
	menu.append("<button type='button' role='menuitem' class='team-box-menu-action' data-action='move-box'>Send to Box</button>");
	menu.append("<button type='button' role='menuitem' class='team-box-menu-action' data-action='move-box2'>Send to Box 2</button>");
	menu.append("<button type='button' role='menuitem' class='team-box-menu-action' data-action='move-compost'>Move to Compost</button>");
	menu.append("<button type='button' role='menuitem' class='team-box-menu-action' data-action='move-trash'>Move to Trash</button>");
	menu.append("<button type='button' role='menuitem' class='team-box-menu-action' data-action='duplicate'>Duplicate</button>");
	menu.append("<button type='button' role='menuitem' class='team-box-menu-action team-box-menu-action-danger' data-action='remove'>Remove</button>");
	$("body").append(menu);
	menu.on("click", "button", function (event) {
		event.preventDefault();
		var action = $(this).attr("data-action");
		if (action === "swap" && doublesSlotMenuContext && typeof doublesSlotMenuContext.swap === "function") {
			doublesSlotMenuContext.swap();
		} else if (action === "assign" && doublesSlotMenuContext && typeof doublesSlotMenuContext.assign === "function") {
			doublesSlotMenuContext.assign(~~$(this).attr("data-slot"));
		} else if (doublesSlotMenuContext && doublesSlotMenuContext.actions && typeof doublesSlotMenuContext.actions[action] === "function") {
			doublesSlotMenuContext.actions[action]();
		}
		hideDoublesSlotMenu();
	});
	return menu;
}

function hideDoublesSlotMenu() {
	$("#doubles-slot-menu").attr("hidden", true);
	doublesSlotMenuContext = null;
}

function positionDoublesSlotMenu(menu, event) {
	var scale = Number(window.getComputedStyle(document.body).zoom) || 1;
	var viewport = window.visualViewport;
	var viewportWidth = document.documentElement.clientWidth || window.innerWidth;
	var viewportHeight = document.documentElement.clientHeight || window.innerHeight;
	var margin = 8 * scale;
	var gap = 4 * scale;
	var leftEdge = (viewport ? viewport.offsetLeft : 0) + margin;
	var topEdge = (viewport ? viewport.offsetTop : 0) + margin;
	var rightEdge = leftEdge + Math.min(viewportWidth, viewport ? viewport.width : viewportWidth) - 2 * margin;
	var bottomEdge = topEdge + Math.min(viewportHeight, viewport ? viewport.height : viewportHeight) - 2 * margin;
	var x = typeof event.clientX === "number" ? event.clientX : event.pageX - window.scrollX;
	var y = typeof event.clientY === "number" ? event.clientY : event.pageY - window.scrollY;
	// Measure at the viewport origin before showing it, without extending the page.
	menu.css({left: 0, top: 0, visibility: "hidden", gridTemplateRows: "", gridAutoFlow: ""}).removeAttr("hidden");
	var rect = menu[0].getBoundingClientRect();
	if (rect.height > bottomEdge - topEdge) {
		// A short window gets additional columns instead of a scrolling menu.
		var rowHeight = 0;
		menu.children("button:not([hidden])").each(function () {
			rowHeight = Math.max(rowHeight, this.getBoundingClientRect().height);
		});
		var style = window.getComputedStyle(menu[0]);
		var rowGap = (parseFloat(style.rowGap) || parseFloat(style.gap) || 0) * scale;
		var frameHeight = (parseFloat(style.paddingTop) + parseFloat(style.paddingBottom) +
			parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth)) * scale;
		var rows = Math.max(1, Math.floor((bottomEdge - topEdge - frameHeight + rowGap) / (rowHeight + rowGap)));
		menu.css({gridTemplateRows: "repeat(" + rows + ", max-content)", gridAutoFlow: "column"});
		rect = menu[0].getBoundingClientRect();
	}
	var left = x + gap;
	var top = y + gap;
	if (left + rect.width > rightEdge) left = x - rect.width - gap;
	if (top + rect.height > bottomEdge) top = y - rect.height - gap;
	// Client coordinates and measured bounds include CSS zoom; fixed offsets do not.
	menu.css({
		left: Math.max(leftEdge, Math.min(left, rightEdge - rect.width)) / scale + "px",
		top: Math.max(topEdge, Math.min(top, bottomEdge - rect.height)) / scale + "px",
		visibility: "visible"
	});
}

function showDoublesSlotMenu(event, assign, options) {
	options = options || {};
	if (!isDoublesFormatSelected() && !options.allowSingles) return false;
	var nativeEvent = event.originalEvent || event;
	var menu = ensureDoublesSlotMenu();
	doublesSlotMenuContext = {
		assign: assign,
		swap: options.swap,
		actions: options.actions || {}
	};
	menu.find("[data-action='assign']").prop("hidden", typeof assign !== "function");
	menu.find("[data-action='swap']").prop("hidden", typeof options.swap !== "function");
	menu.find(".team-box-menu-action").each(function () {
		var action = $(this).attr("data-action");
		$(this).prop("hidden", typeof doublesSlotMenuContext.actions[action] !== "function");
	});
	positionDoublesSlotMenu(menu, nativeEvent);
	return false;
}

$(document).on("click", function (event) {
	if (!$(event.target).closest("#doubles-slot-menu").length) hideDoublesSlotMenu();
});

$(document).on("keydown", function (event) {
	if (event.key === "Escape") hideDoublesSlotMenu();
});

$(window).on("scroll resize", hideDoublesSlotMenu);

window.clearDoublesSlotSide = clearDoublesSlotSide;
window.applyTeamBoxFilters = applyTeamBoxFilters;
window.getDoublesActiveSlot = getDoublesActiveSlot;
window.getDoublesSlotSelection = getDoublesSlotSelection;
window.hideDoublesSlotMenu = hideDoublesSlotMenu;
window.isDoublesFormatSelected = isDoublesFormatSelected;
window.setDoublesActiveSlot = setDoublesActiveSlot;
window.setDoublesSlotSelection = setDoublesSlotSelection;
window.showDoublesSlotMenu = showDoublesSlotMenu;
window.swapDoublesSlots = swapDoublesSlots;
window.updateDoublesSlotHighlights = updateDoublesSlotHighlights;
window.updateDoublesSlotSummaries = updateDoublesSlotSummaries;

function getPokemonNameFromFullSetName(fullSetName) {
	var splitIndex = fullSetName.indexOf(" (");
	return splitIndex === -1 ? fullSetName : fullSetName.substring(0, splitIndex);
}

function getSetNameFromFullSetName(fullSetName) {
	var start = fullSetName.indexOf("(");
	var end = fullSetName.lastIndexOf(")");
	return start === -1 || end === -1 ? "" : fullSetName.substring(start + 1, end);
}

function getTeamBoxPokemonId(fullSetName) {
	var toID = typeof calc !== "undefined" && calc.toID ? calc.toID : function (name) {
		return name.toLowerCase().replace(/[^a-z0-9]+/g, "");
	};
	return "box-pokemon-" + toID(fullSetName);
}

function getStoredTeamBoxLayout() {
	var raw = readProfileWorkspaceValue("team-box-layout", LEGACY_TEAM_BOX_LAYOUT_KEY);
	if (!raw) return {};
	try {
		return JSON.parse(raw) || {};
	} catch (e) {
		return {};
	}
}

function getEmptyTeamBoxLayout() {
	var layout = {};
	for (var i = 0; i < TEAM_BOX_ZONE_IDS.length; i++) layout[TEAM_BOX_ZONE_IDS[i]] = [];
	return layout;
}

function normalizeTeamBoxLayout(layout) {
	var normalized = getEmptyTeamBoxLayout();
	var seen = {};
	var overflow = [];
	var teamIds = layout["team-poke-list"] || [];
	var i;

	for (i = 0; i < teamIds.length; i++) {
		var teamId = teamIds[i];
		if (!teamId || seen[teamId]) continue;
		seen[teamId] = true;
		if (normalized["team-poke-list"].length < TEAM_BOX_TEAM_LIMIT) {
			normalized["team-poke-list"].push(teamId);
		} else {
			overflow.push(teamId);
		}
	}
	for (i = 0; i < TEAM_BOX_ZONE_IDS.length; i++) {
		var zoneId = TEAM_BOX_ZONE_IDS[i];
		if (zoneId === "team-poke-list") continue;
		var zoneIds = layout[zoneId] || [];
		for (var j = 0; j < zoneIds.length; j++) {
			var id = zoneIds[j];
			if (!id || seen[id]) continue;
			seen[id] = true;
			normalized[zoneId].push(id);
		}
	}
	normalized["box-poke-list"] = overflow.concat(normalized["box-poke-list"]);
	return normalized;
}

function getCurrentTeamBoxLayout() {
	var layout = getEmptyTeamBoxLayout();
	for (var i = 0; i < TEAM_BOX_ZONE_IDS.length; i++) {
		var zoneId = TEAM_BOX_ZONE_IDS[i];
		$("#" + zoneId + " .box-pokemon").each(function () {
			layout[zoneId].push($(this).attr("data-id"));
		});
	}
	return normalizeTeamBoxLayout(layout);
}

function applyTeamBoxLayout(layout) {
	for (var i = 0; i < TEAM_BOX_ZONE_IDS.length; i++) {
		var zoneId = TEAM_BOX_ZONE_IDS[i];
		var zone = document.getElementById(zoneId);
		var setNames = layout[zoneId] || [];
		if (!zone) continue;
		for (var j = 0; j < setNames.length; j++) {
			var pokemon = document.getElementById(getTeamBoxPokemonId(setNames[j]));
			if (pokemon) {
				zone.appendChild(pokemon);
				updateTeamBoxPokemonPresentation(pokemon);
			}
		}
	}
}

function saveTeamBoxLayout() {
	if (!$("#team-box").length) return;
	var layout = getCurrentTeamBoxLayout();
	applyTeamBoxLayout(layout);
	getRoyalSwordAppStorage().setItem(getTeamBoxLayoutStorageKey(), JSON.stringify(layout));
	refreshPlayerTeamMirror();
	applyTeamBoxFilters();
}

function restoreTeamBoxLayout() {
	var layout = normalizeTeamBoxLayout(getStoredTeamBoxLayout());
	applyTeamBoxLayout(layout);
	getRoyalSwordAppStorage().setItem(getTeamBoxLayoutStorageKey(), JSON.stringify(layout));
}

function clearBoxPokemonColorClasses(pokemon) {
	$(pokemon).removeClass(TEAM_BOX_COLOR_CLASSES.join(" "));
}

function getTeamBoxSetLocation(data) {
	if (!data || !data.setName) return "";
	var speciesSuffix = " - " + data.pokemonName;
	if (endsWith(data.setName, speciesSuffix)) {
		return data.setName.substring(0, data.setName.length - speciesSuffix.length);
	}
	return data.setName;
}

function getTeamBoxPokemonTooltip(fullSetName) {
	var data = getTeamBoxPokemonSetData(fullSetName);
	var nickname = data.set && data.set.nickname ? data.set.nickname : "";
	var item = getTeamBoxSetItem(data) || "(none)";
	var types = getTeamBoxSetTypeList(data);
	var typeText = types.length ? types.join("/") : "Unknown";
	var location = getTeamBoxSetLocation(data);
	var details = [];
	var label = nickname || data.pokemonName;
	if (nickname) details.push(data.pokemonName);
	if (location) details.push(location);
	if (details.length) label += " (" + details.join(", ") + ")";
	return label + "\nType: " + typeText + "\nItem: " + item;
}

function setTeamBoxPokemonLabels(button, fullSetName) {
	var tooltip = getTeamBoxPokemonTooltip(fullSetName);
	$(button)
		.attr("aria-label", tooltip.replace(/\n/g, " "))
		.attr("title", tooltip);
}

function updateTeamBoxPokemonPresentation(pokemonButton) {
	var button = $(pokemonButton);
	var isTeam = button.parent().attr("id") === "team-poke-list";
	var style = isTeam ? "animated" : "static";
	var pokemonName = button.attr("data-pokemon");
	if (button.attr("data-sprite-style") !== style) {
		button.children(".box-pokemon-sprite").remove();
		button.prepend(createPokemonSprite(pokemonName, "box-pokemon-sprite", {preferStatic: !isTeam}));
		button.attr("data-sprite-style", style);
	}
	var name = button.children(".km-box-name");
	if (!name.length) name = $("<span class='km-box-name'></span>").appendTo(button);
	if (name.text() !== pokemonName) name.text(pokemonName);
}

function addBoxedPokemon(pokemonName, movesetName) {
	if (!$("#team-box").length || !pokedex || !pokedex[pokemonName]) return;
	var fullSetName = pokemonName + " (" + movesetName + ")";
	var pokemonId = getTeamBoxPokemonId(fullSetName);
	var existingButton = document.getElementById(pokemonId);
	if (existingButton) {
		setTeamBoxPokemonLabels(existingButton, fullSetName);
		updateTeamBoxPokemonPresentation(existingButton);
		return;
	}

	var button = $("<button type='button' class='box-pokemon'></button>");
	button.attr("id", pokemonId);
	button.attr("draggable", "true");
	button.attr("data-id", fullSetName);
	button.attr("data-pokemon", pokemonName);
	button.attr("data-set", movesetName);
	setTeamBoxPokemonLabels(button, fullSetName);
	$("#box-poke-list").append(button);
	updateTeamBoxPokemonPresentation(button);
}

function syncTeamBoxWithCustomSets(customsets) {
	if (!$("#team-box").length) return;
	var expectedIds = {};
	for (var pokemon in customsets) {
		if (!Object.prototype.hasOwnProperty.call(customsets, pokemon) || !pokedex || !pokedex[pokemon]) continue;
		for (var moveset in customsets[pokemon]) {
			if (!Object.prototype.hasOwnProperty.call(customsets[pokemon], moveset)) continue;
			var fullSetName = pokemon + " (" + moveset + ")";
			expectedIds[getTeamBoxPokemonId(fullSetName)] = true;
			addBoxedPokemon(pokemon, moveset);
		}
	}
	$(".box-pokemon").each(function () {
		if (!expectedIds[this.id]) $(this).remove();
	});
	restoreTeamBoxLayout();
	refreshPlayerTeamMirror();
	if (!$("#show-cc").prop("hidden")) {
		refreshColorCode();
	} else {
		applyTeamBoxFilters();
	}
}

function assignBoxPokemonToSlot(fullSetName, slot) {
	loadPlayerPokemonIntoEditor(fullSetName, slot);
}

function setSetSelectorValue(selector, fullSetName) {
	selector.val(fullSetName || "");
	if (!selector.data("select2")) return;
	if (fullSetName) {
		selector.select2("data", {id: fullSetName, text: fullSetName});
	} else {
		selector.select2("data", null);
	}
}

function loadPlayerPokemonIntoEditor(fullSetName, slot) {
	var selector = $("#p1 input.set-selector");
	if (!selector.length) return;
	var playerSlot = slot || 1;
	setDoublesActiveSlot("player", playerSlot);
	setSetSelectorValue(selector, fullSetName);
	selector.change();
	setDoublesSlotSelection("player", playerSlot, fullSetName ? getSetSlotSelection(fullSetName) : null);
}

function loadOpponentPokemonIntoEditor(fullSetName, slot) {
	var selector = $("#p2 input.set-selector");
	if (!selector.length) return;
	var opponentSlot = slot || 1;
	setDoublesActiveSlot("opponent", opponentSlot);
	setSetSelectorValue(selector, fullSetName);
	selector.change();
	setDoublesSlotSelection("opponent", opponentSlot, fullSetName ? getSetSlotSelection(fullSetName) : null);
}

function selectBoxPokemon(fullSetName) {
	loadPlayerPokemonIntoEditor(fullSetName, 1);
}

function getPlayerTeamDefaultSetName() {
	var fullSetName = $("#team-poke-list .box-pokemon").first().attr("data-id") || "";
	return fullSetName && fullSetExists(fullSetName) ? fullSetName : "";
}

function applyDefaultPlayerPokemonFromTeam() {
	loadPlayerPokemonIntoEditor(getPlayerTeamDefaultSetName(), 1);
}

function applyDefaultSetSelections() {
	var firstValidSet = getFirstValidSetOption();
	$("input.set-selector").not("#p1 input.set-selector").each(function () {
		setSetSelectorValue($(this), firstValidSet ? firstValidSet.id : "");
		$(this).change();
	});
	if (getPlayerTeamDefaultSetName()) applyDefaultPlayerPokemonFromTeam();
	else {
		setSetSelectorValue($("#p1 input.set-selector"), firstValidSet ? firstValidSet.id : "");
		$("#p1 input.set-selector").change();
	}
}

function getDefaultSetOptionForSelector(element) {
	var selected = $(element).val();
	if (selected && (fullSetExists(selected) || (pokedex && pokedex[selected]))) return {id: selected, text: selected};
	if ($(element).closest("#p1").length) {
		var playerSetName = getPlayerTeamDefaultSetName();
		if (playerSetName) return {id: playerSetName, text: playerSetName};
	}
	return getFirstValidSetOption() || "";
}

function renderPlayerTeamPokemon(fullSetName, pokemonName) {
	var button = $("<button type='button' class='player-team-pokemon' draggable='true'></button>");
	button.append(createPokemonSprite(pokemonName, "trainer-pokemon-sprite"));
	button.append($("<span class='km-pokemon-fallback-name'></span>").text(pokemonName));
	button.find("img").prop("draggable", false);
	button.attr("data-id", fullSetName);
	setTeamBoxPokemonLabels(button, fullSetName);
	button.click(function () {
		if (isDoublesFormatSelected()) return;
		selectBoxPokemon($(this).attr("data-id"));
	});
	button.on("contextmenu", function (event) {
		event.preventDefault();
		var selectedFullSetName = $(this).attr("data-id");
		var teamPokemon = document.getElementById(getTeamBoxPokemonId(selectedFullSetName));
		if (teamPokemon) {
			showTeamBoxPokemonMenu(event, teamPokemon);
		} else if (isDoublesFormatSelected()) {
			showDoublesSlotMenu(event, function (slot) {
				assignBoxPokemonToSlot(selectedFullSetName, slot);
			});
		}
	});
	return button;
}

function refreshPlayerTeamMirror() {
	var team = $("#player-team");
	if (!team.length) return;
	team.empty();
	$("#team-poke-list .box-pokemon").each(function () {
		team.append(renderPlayerTeamPokemon($(this).attr("data-id"), $(this).attr("data-pokemon")));
	});
	updateSelectedPokemonHighlights();
}

function observePlayerTeamMirror() {
	var teamList = document.getElementById("team-poke-list");
	if (!teamList || playerTeamMirrorObserver) return;
	playerTeamMirrorObserver = new MutationObserver(refreshPlayerTeamMirror);
	playerTeamMirrorObserver.observe(teamList, {childList: true});
}

function fullSetExists(fullSetName) {
	var pokemonName = getPokemonNameFromFullSetName(fullSetName);
	var setName = getSetNameFromFullSetName(fullSetName);
	return !!(pokedex && pokedex[pokemonName] && setdex && setdex[pokemonName] && setdex[pokemonName][setName]);
}

function hasAnyCustomSets(customsets) {
	for (var pokemon in customsets) {
		if (Object.prototype.hasOwnProperty.call(customsets, pokemon) && Object.keys(customsets[pokemon]).length > 0) return true;
	}
	return false;
}

function readCustomSets() {
	var storage = getRoyalSwordAppStorage();
	var key = getCustomSetsStorageKey();
	var raw = readProfileWorkspaceValue("customsets", LEGACY_CUSTOM_SETS_KEY);
	if (!raw) return {};
	try {
		return JSON.parse(raw) || {};
	} catch (e) {
		storage.removeItem(key);
		return {};
	}
}

function getCustomSetBackup(generation, pokemonName, setName) {
	return customSetDexBackups[generation] && customSetDexBackups[generation][pokemonName] ?
		customSetDexBackups[generation][pokemonName][setName] : undefined;
}

function saveCustomSetBackup(generation, pokemonName, setName, set) {
	if (!customSetDexBackups[generation]) customSetDexBackups[generation] = {};
	if (!customSetDexBackups[generation][pokemonName]) customSetDexBackups[generation][pokemonName] = {};
	if (!Object.prototype.hasOwnProperty.call(customSetDexBackups[generation][pokemonName], setName)) {
		customSetDexBackups[generation][pokemonName][setName] = set;
	}
}

function clearCustomSetBackup(generation, pokemonName, setName) {
	if (!customSetDexBackups[generation] || !customSetDexBackups[generation][pokemonName]) return;
	delete customSetDexBackups[generation][pokemonName][setName];
	if (!Object.keys(customSetDexBackups[generation][pokemonName]).length) {
		delete customSetDexBackups[generation][pokemonName];
	}
	if (!Object.keys(customSetDexBackups[generation]).length) delete customSetDexBackups[generation];
}

function installCustomSetInDex(generation, pokemonName, setName, customSet) {
	var generationSets = SETDEX[generation];
	var existing;
	if (!generationSets) return;
	if (!generationSets[pokemonName]) generationSets[pokemonName] = {};
	existing = generationSets[pokemonName][setName];
	if (existing && !existing.isCustomSet) saveCustomSetBackup(generation, pokemonName, setName, existing);
	customSet.isCustomSet = true;
	generationSets[pokemonName][setName] = customSet;
}

function removeCustomSetFromDex(pokemonName, setName, generation) {
	var targetGeneration = Number(generation || gen);
	var generationSets = SETDEX[targetGeneration];
	var backup;
	if (!generationSets || !generationSets[pokemonName]) return;
	if (generationSets[pokemonName][setName] && generationSets[pokemonName][setName].isCustomSet) {
		delete generationSets[pokemonName][setName];
	}
	backup = getCustomSetBackup(targetGeneration, pokemonName, setName);
	if (backup !== undefined) {
		generationSets[pokemonName][setName] = backup;
		clearCustomSetBackup(targetGeneration, pokemonName, setName);
	}
}

function removeAllCustomSetsFromDex(generation) {
	var targetGeneration = Number(generation || gen);
	var generationSets = SETDEX[targetGeneration];
	var removals = [];
	var i;
	if (!generationSets) return;
	for (var pokemon in generationSets) {
		if (!Object.prototype.hasOwnProperty.call(generationSets, pokemon)) continue;
		for (var setName in generationSets[pokemon]) {
			if (Object.prototype.hasOwnProperty.call(generationSets[pokemon], setName) &&
				generationSets[pokemon][setName].isCustomSet) {
				removals.push({pokemon: pokemon, setName: setName});
			}
		}
	}
	for (i = 0; i < removals.length; i++) {
		removeCustomSetFromDex(removals[i].pokemon, removals[i].setName, targetGeneration);
	}
}

function refreshSetSelectorsAfterTeamBoxChange(customsets) {
	if (hasAnyCustomSets(customsets)) {
		getRoyalSwordAppStorage().setItem(getCustomSetsStorageKey(), JSON.stringify(customsets));
	} else {
		getRoyalSwordAppStorage().removeItem(getCustomSetsStorageKey());
	}
	loadDefaultLists();
	if (!fullSetExists($("#p1 input.set-selector").val())) {
		applyDefaultPlayerPokemonFromTeam();
	}
	if ($("#trainer-selector").length && typeof window.hideTrainerSetSelector === "function" && typeof window.renderTrainerTeam === "function") {
		window.hideTrainerSetSelector();
		window.renderTrainerTeam($("#trainer-selector").val());
	}
}

function clearTeamBoxState() {
	clearDoublesSlotSide("player");
	getRoyalSwordAppStorage().removeItem(getTeamBoxLayoutStorageKey());
	$(".box-pokemon").remove();
	$(".save-box-section").remove();
	refreshPlayerTeamMirror();
}

function removeTrashedBoxPokemon() {
	var trashed = $("#trash-box .box-pokemon");
	if (!trashed.length) return;
	var label = trashed.length === 1 ? "this Pokemon" : trashed.length + " Pokemon";
	if (!confirm("Remove " + label + " from custom sets?")) return;

	var customsets = readCustomSets();
	trashed.each(function () {
		var pokemonName = $(this).attr("data-pokemon");
		var setName = $(this).attr("data-set");
		if (customsets[pokemonName] && customsets[pokemonName][setName]) {
			delete customsets[pokemonName][setName];
			if (Object.keys(customsets[pokemonName]).length === 0) delete customsets[pokemonName];
		}
		removeCustomSetFromDex(pokemonName, setName);
		$(this).remove();
	});
	saveTeamBoxLayout();
	refreshSetSelectorsAfterTeamBoxChange(customsets);
	clearDoublesSlotSide("player");
	refreshColorCode();
}

function removeAllTeamBoxPokemon() {
	if (!$(".box-pokemon").length) return;
	if (!confirm("Remove all Pokemon from the Team/Box custom sets?")) return;
	removeAllCustomSetsFromDex();
	getRoyalSwordAppStorage().removeItem(getCustomSetsStorageKey());
	clearTeamBoxState();
	loadDefaultLists();
	applyDefaultPlayerPokemonFromTeam();
	if ($("#trainer-selector").length && typeof window.hideTrainerSetSelector === "function" && typeof window.renderTrainerTeam === "function") {
		window.hideTrainerSetSelector();
		window.renderTrainerTeam($("#trainer-selector").val());
	}
}

function addCustomSetsToDex(customsets) {
	for (var pokemon in customsets) {
		if (!Object.prototype.hasOwnProperty.call(customsets, pokemon)) continue;
		for (var setName in customsets[pokemon]) {
			if (!Object.prototype.hasOwnProperty.call(customsets[pokemon], setName)) continue;
			installCustomSetInDex(gen, pokemon, setName, customsets[pokemon][setName]);
		}
	}
}

function customSetNameExists(customsets, pokemonName, setName) {
	return !!(
		(customsets[pokemonName] && customsets[pokemonName][setName]) ||
		(setdex && setdex[pokemonName] && setdex[pokemonName][setName])
	);
}

function getUniqueCustomSetName(customsets, pokemonName, setName) {
	var baseName = (setName || "Set") + " Copy";
	var candidate = baseName;
	var copyNumber = 2;
	while (customSetNameExists(customsets, pokemonName, candidate)) {
		candidate = baseName + " " + copyNumber;
		copyNumber++;
	}
	return candidate;
}

function moveBoxPokemonToZone(pokemonButton, zoneId) {
	var zone = document.getElementById(zoneId);
	if (!pokemonButton || !zone) return;
	zone.appendChild(pokemonButton);
	saveTeamBoxLayout();
	refreshColorCode();
}

function moveBoxPokemonToTeam(pokemonButton) {
	var team = document.getElementById("team-poke-list");
	if (!pokemonButton || !team || pokemonButton.parentNode === team) return;
	if ($("#team-poke-list .box-pokemon").length >= TEAM_BOX_TEAM_LIMIT) {
		alert("Team is full. Drag onto a Team Pokemon to replace it.");
		return;
	}
	team.appendChild(pokemonButton);
	saveTeamBoxLayout();
	refreshColorCode();
}

function duplicateTeamBoxPokemon(pokemonButton) {
	if (!pokemonButton) return;
	var fullSetName = $(pokemonButton).attr("data-id");
	var pokemonName = getPokemonNameFromFullSetName(fullSetName);
	var setName = getSetNameFromFullSetName(fullSetName);
	var customsets = readCustomSets();
	var sourceSet = customsets[pokemonName] && customsets[pokemonName][setName];
	if (!sourceSet) {
		alert("Could not find " + fullSetName + " in custom sets.");
		return;
	}
	var duplicateSetName = getUniqueCustomSetName(customsets, pokemonName, setName);
	var duplicateFullSetName = pokemonName + " (" + duplicateSetName + ")";
	if (!customsets[pokemonName]) customsets[pokemonName] = {};
	customsets[pokemonName][duplicateSetName] = JSON.parse(JSON.stringify(sourceSet));
	customsets[pokemonName][duplicateSetName].isCustomSet = true;
	addCustomSetsToDex(customsets);
	refreshSetSelectorsAfterTeamBoxChange(customsets);
	syncTeamBoxWithCustomSets(customsets);
	var duplicateButton = document.getElementById(getTeamBoxPokemonId(duplicateFullSetName));
	if (duplicateButton && pokemonButton.parentNode && pokemonButton.parentNode.id !== "trash-box") {
		pokemonButton.parentNode.insertBefore(duplicateButton, pokemonButton.nextSibling);
	}
	saveTeamBoxLayout();
	refreshColorCode();
}

function removeTeamBoxPokemon(pokemonButton) {
	if (!pokemonButton) return;
	var fullSetName = $(pokemonButton).attr("data-id");
	if (!confirm("Remove " + fullSetName + " from custom sets?")) return;
	var pokemonName = $(pokemonButton).attr("data-pokemon");
	var setName = $(pokemonButton).attr("data-set");
	var customsets = readCustomSets();
	if (customsets[pokemonName] && customsets[pokemonName][setName]) {
		delete customsets[pokemonName][setName];
		if (Object.keys(customsets[pokemonName]).length === 0) delete customsets[pokemonName];
	}
	removeCustomSetFromDex(pokemonName, setName);
	$(pokemonButton).remove();
	clearDoublesSlotSide("player");
	saveTeamBoxLayout();
	refreshSetSelectorsAfterTeamBoxChange(customsets);
	refreshColorCode();
}

function getTeamBoxContextActions(pokemonButton) {
	var currentZone = pokemonButton && pokemonButton.parentNode ? pokemonButton.parentNode.id : "";
	var actions = {
		duplicate: function () {
			duplicateTeamBoxPokemon(pokemonButton);
		},
		remove: function () {
			removeTeamBoxPokemon(pokemonButton);
		}
	};
	if (currentZone !== "team-poke-list") {
		actions["move-team"] = function () {
			moveBoxPokemonToTeam(pokemonButton);
		};
	}
	if (currentZone !== "box-poke-list") {
		actions["move-box"] = function () {
			moveBoxPokemonToZone(pokemonButton, "box-poke-list");
		};
	}
	if (currentZone !== "box-poke-list2") {
		actions["move-box2"] = function () {
			moveBoxPokemonToZone(pokemonButton, "box-poke-list2");
		};
	}
	if (currentZone !== "compost-poke-list") {
		actions["move-compost"] = function () {
			moveBoxPokemonToZone(pokemonButton, "compost-poke-list");
		};
	}
	if (currentZone !== "trash-box") {
		actions["move-trash"] = function () {
			moveBoxPokemonToZone(pokemonButton, "trash-box");
		};
	}
	return actions;
}

function showTeamBoxPokemonMenu(event, pokemonButton) {
	if (!pokemonButton) return false;
	event.preventDefault();
	var fullSetName = $(pokemonButton).attr("data-id");
	var assign = isDoublesFormatSelected() ? function (slot) {
		assignBoxPokemonToSlot(fullSetName, slot);
	} : null;
	return showDoublesSlotMenu(event, assign, {
		allowSingles: true,
		actions: getTeamBoxContextActions(pokemonButton)
	});
}

function normalizeTeamBoxSearchText(value) {
	return (value || "").toString().toLowerCase();
}

function getTeamBoxPokemonSetData(fullSetName) {
	var pokemonName = getPokemonNameFromFullSetName(fullSetName);
	var setName = getSetNameFromFullSetName(fullSetName);
	return {
		pokemonName: pokemonName,
		setName: setName,
		species: pokedex && pokedex[pokemonName],
		set: setdex && setdex[pokemonName] && setdex[pokemonName][setName]
	};
}

function getTeamBoxSetAbility(data) {
	if (data.set && data.set.ability) return data.set.ability;
	return data.species && data.species.abilities && data.species.abilities[0] ? data.species.abilities[0] : "";
}

function getTeamBoxSetItem(data) {
	return data.set && data.set.item ? data.set.item : "";
}

function getTeamBoxSetTypes(data) {
	return data.species && data.species.types ? data.species.types.join(" ") : "";
}

function getTeamBoxSetTypeList(data) {
	return data.species && data.species.types ? data.species.types : [];
}

function getTeamBoxSetSpeed(data) {
	if (!data.species || !data.species.bs || !data.set) return "";
	var ivs = data.set.ivs || {};
	var dvs = data.set.dvs || {};
	var evs = data.set.evs || {};
	var speedIV = 31;
	var speedEV = gen < 3 ? 252 : 0;
	if (typeof ivs.sp !== "undefined") {
		speedIV = ivs.sp;
	} else if (typeof ivs.spe !== "undefined") {
		speedIV = ivs.spe;
	}
	if (gen < 3) {
		var speedDV = typeof dvs.sp !== "undefined" ? dvs.sp :
			(typeof dvs.spe !== "undefined" ? dvs.spe : 15);
		speedIV = calc.Stats && typeof calc.Stats.DVToIV === "function" ?
			calc.Stats.DVToIV(~~speedDV) : ~~speedDV * 2 + 1;
	}
	if (typeof evs.sp !== "undefined") speedEV = evs.sp;
	else if (typeof evs.spe !== "undefined") speedEV = evs.spe;
	if (areEVInputsDisabled()) speedEV = 0;
	try {
		return calc.calcStat(
			getActiveCalcGeneration(),
			"spe",
			~~data.species.bs.sp,
			~~speedIV,
			~~speedEV,
			~~data.set.level || defaultLevel,
			gen < 3 ? undefined : data.set.nature
		);
	} catch (e) {
		return "";
	}
}

function getTeamBoxSpeedRelation(fullSetName) {
	if (typeof window.calculationsColors !== "function") return "none";
	try {
		var color = window.calculationsColors(fullSetName);
		return color && color.speed ? color.speed : "none";
	} catch (e) {
		return "none";
	}
}

function getTeamBoxSpeedRelationText(speedRelation) {
	switch (speedRelation) {
	case "F":
		return "faster fast outspeeds";
	case "T":
		return "tie tied equal same";
	case "S":
		return "slower slow underspeeds";
	default:
		return "unknown none";
	}
}

function getTeamBoxFilterText(button, field) {
	var fullSetName = $(button).attr("data-id");
	var data = getTeamBoxPokemonSetData(fullSetName);
	var speed = getTeamBoxSetSpeed(data);
	var speedRelation = getTeamBoxSpeedRelation(fullSetName);
	var nameText = [data.pokemonName, data.setName, fullSetName].join(" ");
	var typeText = getTeamBoxSetTypes(data);
	var abilityText = getTeamBoxSetAbility(data);
	var itemText = getTeamBoxSetItem(data);
	var speedText = [
		speed ? "speed spe speed-tier " + speed : "",
		getTeamBoxSpeedRelationText(speedRelation)
	].join(" ");
	switch (field) {
	case "name":
		return nameText;
	case "type":
		return typeText;
	case "ability":
		return abilityText;
	case "item":
		return itemText;
	case "speed":
		return speedText;
	default:
		return [nameText, typeText, abilityText, itemText, speedText].join(" ");
	}
}

function getTeamBoxFilterState() {
	var field = $("#team-box-filter-field").val() || "all";
	return {
		query: normalizeTeamBoxSearchText($("#team-box-filter-text").val()).trim(),
		field: field,
		speed: field === "speed" ? $("#team-box-filter-speed").val() || "" : "",
		type: field === "type" ? $("#team-box-filter-type").val() || "" : ""
	};
}

function isTeamBoxFilterActive(state) {
	return !!(state.query || state.speed || state.type);
}

function teamBoxPokemonMatchesTextFilter(button, state) {
	if (!state.query) return true;
	var haystack = normalizeTeamBoxSearchText(getTeamBoxFilterText(button, state.field));
	var terms = state.query.split(/\s+/);
	for (var i = 0; i < terms.length; i++) {
		if (terms[i] && haystack.indexOf(terms[i]) === -1) return false;
	}
	return true;
}

function teamBoxPokemonMatchesSpeedFilter(button, speedFilter) {
	if (!speedFilter) return true;
	return getTeamBoxSpeedRelation($(button).attr("data-id")) === speedFilter;
}

function getTeamBoxTypeMatchGroup(button, selectedType) {
	if (!selectedType) return 0;
	var data = getTeamBoxPokemonSetData($(button).attr("data-id"));
	var types = getTeamBoxSetTypeList(data);
	if (types[0] === selectedType && !types[1]) return 0;
	if (types[0] === selectedType) return 1;
	if (types[1] === selectedType) return 2;
	return -1;
}

function teamBoxPokemonMatchesTypeFilter(button, typeFilter) {
	if (!typeFilter) return true;
	return getTeamBoxTypeMatchGroup(button, typeFilter) !== -1;
}

function teamBoxPokemonMatchesFilter(button, state) {
	return teamBoxPokemonMatchesTextFilter(button, state) &&
		teamBoxPokemonMatchesSpeedFilter(button, state.speed) &&
		teamBoxPokemonMatchesTypeFilter(button, state.type);
}

function clearTeamBoxFilterOrder() {
	$(".box-pokemon").css("order", "");
}

function applyTeamBoxTypeFilterOrder(state) {
	clearTeamBoxFilterOrder();
	if (state.field !== "type" || !state.type) return;
	for (var i = 0; i < TEAM_BOX_ZONE_IDS.length; i++) {
		var zone = $("#" + TEAM_BOX_ZONE_IDS[i]);
		var entries = [];
		zone.find(".box-pokemon").each(function (index) {
			var group = getTeamBoxTypeMatchGroup(this, state.type);
			if (group === -1) return;
			entries.push({
				button: this,
				group: group,
				index: index
			});
		});
		entries.sort(function (left, right) {
			if (left.group !== right.group) return left.group - right.group;
			return compareTeamBoxSortNames(left, right);
		});
		for (var j = 0; j < entries.length; j++) {
			$(entries[j].button).css("order", j + 1);
		}
	}
}

function updateTeamBoxFilterEmptyStates(active) {
	for (var i = 0; i < TEAM_BOX_ZONE_IDS.length; i++) {
		var zone = $("#" + TEAM_BOX_ZONE_IDS[i]);
		var hasHiddenMatches = zone.find(".box-pokemon.team-box-filter-hidden").length > 0;
		var hasVisiblePokemon = zone.find(".box-pokemon").not(".team-box-filter-hidden").length > 0;
		zone.toggleClass("team-box-filter-empty", active && hasHiddenMatches && !hasVisiblePokemon);
	}
}

function applyTeamBoxFilters() {
	if (!$("#team-box").length || !$("#team-box-filter-text").length) return;
	updateTeamBoxFinderFieldControls();
	var state = getTeamBoxFilterState();
	var active = isTeamBoxFilterActive(state);
	$(".box-pokemon").each(function () {
		$(this).toggleClass("team-box-filter-hidden", active && !teamBoxPokemonMatchesFilter(this, state));
	});
	applyTeamBoxTypeFilterOrder(state);
	updateTeamBoxFilterEmptyStates(active);
	$("#team-box-filter-clear").prop("disabled", !active);
}

function clearTeamBoxFilters() {
	$("#team-box-filter-text").val("");
	$("#team-box-filter-field").val("all");
	$("#team-box-filter-type").val("");
	$("#team-box-filter-speed").val("");
	updateTeamBoxFinderFieldControls();
	applyTeamBoxFilters();
}

function populateTeamBoxTypeFilter() {
	var typeFilter = $("#team-box-filter-type");
	if (!typeFilter.length || !typeChart) return;
	var selectedType = typeFilter.val();
	var typeOptions = Object.keys(typeChart).filter(function (typeName) {
		return typeName;
	});
	typeFilter.find("option").remove().end().append("<option value=\"\">Any Type</option>" + getSelectOptions(typeOptions));
	if (selectedType && typeFilter.find("option[value='" + selectedType + "']").length) typeFilter.val(selectedType);
}

function updateTeamBoxFinderFieldControls() {
	populateTeamBoxTypeFilter();
	var field = $("#team-box-filter-field").val();
	var typeFilter = $("#team-box-filter-type");
	var speedFilter = $("#team-box-filter-speed");
	var showTypeFilter = field === "type";
	var showSpeedFilter = field === "speed";
	typeFilter.prop("hidden", !showTypeFilter).prop("disabled", !showTypeFilter);
	speedFilter.prop("hidden", !showSpeedFilter).prop("disabled", !showSpeedFilter);
	if (!showTypeFilter) typeFilter.val("");
	if (!showSpeedFilter) speedFilter.val("");
}

function handleTeamBoxFilterFieldChange() {
	$("#team-box-filter-text").val("");
	$("#team-box-filter-type").val("");
	$("#team-box-filter-speed").val("");
	updateTeamBoxFinderFieldControls();
	applyTeamBoxFilters();
}

function getTeamBoxSortName(button) {
	var pokemonName = $(button).attr("data-pokemon") || "";
	var setName = $(button).attr("data-set") || "";
	return normalizeTeamBoxSearchText(pokemonName + " " + setName);
}

function compareTeamBoxSortNames(left, right) {
	var leftName = getTeamBoxSortName(left.button);
	var rightName = getTeamBoxSortName(right.button);
	if (leftName < rightName) return -1;
	if (leftName > rightName) return 1;
	return left.index - right.index;
}

function getTeamBoxSortSpeed(button) {
	var data = getTeamBoxPokemonSetData($(button).attr("data-id"));
	var speed = getTeamBoxSetSpeed(data);
	return typeof speed === "number" ? speed : -1;
}

function getTeamBoxDamageCode(button) {
	if (typeof window.calculationsColors !== "function") return "none";
	try {
		var color = window.calculationsColors($(button).attr("data-id"));
		return color && color.code ? color.code : "none";
	} catch (e) {
		return "none";
	}
}

function getTeamBoxDamageSortRank(button) {
	var code = getTeamBoxDamageCode(button);
	return Object.prototype.hasOwnProperty.call(TEAM_BOX_DAMAGE_SORT_RANKS, code) ? TEAM_BOX_DAMAGE_SORT_RANKS[code] : TEAM_BOX_DAMAGE_SORT_RANKS.none;
}

function getTeamBoxTeamOrderRanks() {
	var ranks = {};
	$("#team-poke-list .box-pokemon").each(function (index) {
		var pokemonName = $(this).attr("data-pokemon");
		if (pokemonName && typeof ranks[pokemonName] === "undefined") ranks[pokemonName] = index;
	});
	return ranks;
}

function getTeamBoxTeamOrderRank(button, teamRanks) {
	var pokemonName = $(button).attr("data-pokemon");
	return pokemonName && typeof teamRanks[pokemonName] !== "undefined" ? teamRanks[pokemonName] : TEAM_BOX_TEAM_LIMIT + 1;
}

function compareTeamBoxStoragePokemon(left, right, mode, teamRanks) {
	var leftValue;
	var rightValue;
	if (mode === "speed") {
		leftValue = getTeamBoxSortSpeed(left.button);
		rightValue = getTeamBoxSortSpeed(right.button);
		if (leftValue !== rightValue) return rightValue - leftValue;
	} else if (mode === "damage") {
		leftValue = getTeamBoxDamageSortRank(left.button);
		rightValue = getTeamBoxDamageSortRank(right.button);
		if (leftValue !== rightValue) return leftValue - rightValue;
	} else if (mode === "team") {
		leftValue = getTeamBoxTeamOrderRank(left.button, teamRanks);
		rightValue = getTeamBoxTeamOrderRank(right.button, teamRanks);
		if (leftValue !== rightValue) return leftValue - rightValue;
	}
	return compareTeamBoxSortNames(left, right);
}

function sortTeamBoxZone(zoneId, mode, teamRanks) {
	var zone = $("#" + zoneId);
	var entries = [];
	zone.find(".box-pokemon").each(function (index) {
		entries.push({button: this, index: index});
	});
	entries.sort(function (left, right) {
		return compareTeamBoxStoragePokemon(left, right, mode, teamRanks);
	});
	for (var i = 0; i < entries.length; i++) {
		zone[0].appendChild(entries[i].button);
	}
}

function sortTeamBoxStorage() {
	var mode = $("#team-box-sort-mode").val() || "speed";
	var teamRanks = getTeamBoxTeamOrderRanks();
	for (var i = 0; i < TEAM_BOX_SORT_ZONE_IDS.length; i++) {
		sortTeamBoxZone(TEAM_BOX_SORT_ZONE_IDS[i], mode, teamRanks);
	}
	saveTeamBoxLayout();
	if (!$("#show-cc").prop("hidden")) {
		refreshColorCode();
	} else {
		applyTeamBoxFilters();
	}
}

function getTeamBoxDropZone(target) {
	var heading = $(target).closest(".team-box-heading");
	if (heading.length) return $("#" + heading.attr("data-box-target"));
	return $(target).closest(".box-poke");
}

function allowDrop(ev) {
	var event = ev.originalEvent || ev;
	if (!boxPokemonDragged) {
		if (event.dataTransfer) event.dataTransfer.dropEffect = "none";
		return;
	}
	ev.preventDefault();
	if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
	updateDropTargetCue(ev.target);
}

function dragstart_handler(ev) {
	var event = ev.originalEvent || ev;
	boxPokemonDragged = ev.currentTarget || ev.target;
	boxPokemonDragOrigin = boxPokemonDragged.parentNode;
	boxPokemonDragNextSibling = boxPokemonDragged.nextSibling;
	if (event.dataTransfer) {
		event.dataTransfer.effectAllowed = "move";
		event.dataTransfer.setData("text/plain", $(boxPokemonDragged).attr("data-id"));
	}
	startDoublesSlotDrag(ev);
}

function clearDropTargetCue() {
	$(".box-pokemon.drop-replace-target").removeClass("drop-replace-target");
}

function clearBoxPokemonDragState() {
	clearDropTargetCue();
	$(".dropzone.over").removeClass("over");
	boxPokemonDragged = null;
	boxPokemonDragOrigin = null;
	boxPokemonDragNextSibling = null;
}

function canCueBoxPokemonDropTarget(targetPokemon) {
	return !!(targetPokemon && targetPokemon !== boxPokemonDragged);
}

function shouldReplaceBoxPokemon(targetPokemon) {
	return canCueBoxPokemonDropTarget(targetPokemon);
}

function updateDropTargetCue(target) {
	clearDropTargetCue();
	if (!boxPokemonDragged) return;
	var targetPokemon = $(target).closest(".box-pokemon")[0];
	if (canCueBoxPokemonDropTarget(targetPokemon)) {
		$(targetPokemon).addClass("drop-replace-target");
	}
}

function replaceBoxPokemon(targetPokemon) {
	var origin = boxPokemonDragOrigin;
	var nextSibling = boxPokemonDragNextSibling;
	var targetParent = targetPokemon.parentNode;
	var targetNextSibling = targetPokemon.nextSibling;
	if (targetParent === origin && nextSibling === targetPokemon) {
		targetParent.insertBefore(targetPokemon, boxPokemonDragged);
		return;
	}
	if (targetParent === origin && targetNextSibling === boxPokemonDragged) {
		targetParent.insertBefore(boxPokemonDragged, targetPokemon);
		return;
	}
	targetParent.insertBefore(boxPokemonDragged, targetPokemon);
	if (origin) {
		if (nextSibling && nextSibling.parentNode === origin) {
			origin.insertBefore(targetPokemon, nextSibling);
		} else {
			origin.appendChild(targetPokemon);
		}
	}
}

function drop(ev) {
	ev.preventDefault();
	if (!boxPokemonDragged) return;
	var targetPokemon = $(ev.target).closest(".box-pokemon")[0];
	var dropZone = getTeamBoxDropZone(ev.target);
	if (shouldReplaceBoxPokemon(targetPokemon)) {
		replaceBoxPokemon(targetPokemon);
	} else if (targetPokemon && targetPokemon !== boxPokemonDragged) {
		targetPokemon.parentNode.insertBefore(boxPokemonDragged, targetPokemon);
	} else if (dropZone.length) {
		dropZone[0].appendChild(boxPokemonDragged);
	}
	$(".over").removeClass("over");
	clearDropTargetCue();
	saveTeamBoxLayout();
	refreshColorCode();
	clearBoxPokemonDragState();
}

function handleDragEnter(ev) {
	if (!boxPokemonDragged) return;
	var dropZone = $(ev.target).closest(".dropzone");
	dropZone.addClass("over");
	dropZone.removeAttr("data-placeholder");
}

function handleDragLeave(ev) {
	$(ev.target).closest(".dropzone").removeClass("over");
	if ($(ev.target).closest(".box-pokemon.drop-replace-target").length) clearDropTargetCue();
}

function setColorCodeControlsVisible(visible) {
	$("#show-cc").prop("hidden", visible);
	$("#hide-cc, #refr-cc, #info-cc, #cc-sets").prop("hidden", !visible);
	if (!visible) closeColorCodeExplanation();
}

function getStoredColorCodeOptions() {
	var options = {
		speedBorder: false,
		ohkoColor: false
	};
	var raw;
	try {
		raw = readProfileWorkspaceValue("team-box-color-options", LEGACY_TEAM_BOX_COLOR_OPTIONS_KEY);
	} catch (e) {
		return options;
	}
	if (!raw) return options;
	try {
		raw = JSON.parse(raw);
	} catch (e) {
		return options;
	}
	if (!raw || typeof raw !== "object") return options;
	return {
		speedBorder: raw.speedBorder === true,
		ohkoColor: raw.ohkoColor === true
	};
}

function saveColorCodeOptions() {
	try {
		getRoyalSwordAppStorage().setItem(getTeamBoxColorOptionsStorageKey(), JSON.stringify({
			speedBorder: $("#cc-spe-border").prop("checked"),
			ohkoColor: $("#cc-ohko-color").prop("checked")
		}));
	} catch (e) {}
}

function initializeColorCodeOptions() {
	var options = getStoredColorCodeOptions();
	$("#cc-spe-border").prop("checked", options.speedBorder);
	$("#cc-ohko-color").prop("checked", options.ohkoColor);
	$("#cc-auto-refr").prop("checked", true);
	window.AUTO_REFRESH = true;
}

function refreshColorCodeAfterInitialLoad() {
	if (!$("#cc-spe-border").prop("checked") && !$("#cc-ohko-color").prop("checked")) return;
	refreshColorCode();
	window.setTimeout(refreshColorCode, 0);
}

function colorCodeUpdate() {
	if (!$("#team-box").length || typeof window.calculationsColors !== "function") return;
	var speCheck = $("#cc-spe-border").prop("checked");
	var ohkoCheck = $("#cc-ohko-color").prop("checked");
	$(".box-pokemon").each(function () {
		clearBoxPokemonColorClasses(this);
		if (!speCheck && !ohkoCheck) return;
		var color;
		try {
			color = window.calculationsColors($(this).attr("data-id"));
		} catch (e) {
			if (speCheck) $(this).addClass("mon-speed-none");
			if (ohkoCheck) $(this).addClass("mon-dmg-none");
			return;
		}
		if (!color) {
			if (speCheck) $(this).addClass("mon-speed-none");
			if (ohkoCheck) $(this).addClass("mon-dmg-none");
			return;
		}
		if (speCheck && color.speed) $(this).addClass("mon-speed-" + color.speed);
		if (ohkoCheck && color.code) $(this).addClass("mon-dmg-" + color.code);
		if (!speCheck) $(this).addClass("mon-speed-none");
		if (!ohkoCheck) $(this).addClass("mon-dmg-none");
	});
}

function showColorCodes() {
	window.AUTO_REFRESH = $("#cc-auto-refr").prop("checked");
	setColorCodeControlsVisible(true);
	colorCodeUpdate();
}

function refreshColorCode() {
	window.AUTO_REFRESH = $("#cc-auto-refr").prop("checked");
	colorCodeUpdate();
	applyTeamBoxFilters();
}

function hideColorCodes() {
	$(".box-pokemon").each(function () {
		clearBoxPokemonColorClasses(this);
	});
	window.AUTO_REFRESH = false;
	setColorCodeControlsVisible(false);
	applyTeamBoxFilters();
}

function getColorCodeExampleMarkup(example) {
	var sampleClass = "color-code-sample";
	if (example.className) sampleClass += " " + example.className;
	return [
		"<article class='color-code-example-card'>",
		"<div class='" + sampleClass + "' aria-hidden='true'><span class='color-code-sample-sprite'>KM</span></div>",
		"<div class='color-code-example-copy'>",
		"<h4>" + example.title + "</h4>",
		"<p>" + example.text + "</p>",
		"</div>",
		"</article>"
	].join("");
}

function getColorCodeExamplesMarkup(examples) {
	var markup = [];
	for (var i = 0; i < examples.length; i++) {
		markup.push(getColorCodeExampleMarkup(examples[i]));
	}
	return markup.join("");
}

function getFinderExplanationCardMarkup(example) {
	return [
		"<article class='color-code-example-card finder-explanation-card'>",
		"<div class='finder-explanation-token' aria-hidden='true'>" + example.token + "</div>",
		"<div class='color-code-example-copy'>",
		"<h4>" + example.title + "</h4>",
		"<p>" + example.text + "</p>",
		"</div>",
		"</article>"
	].join("");
}

function getFinderExplanationCardsMarkup(examples) {
	var markup = [];
	for (var i = 0; i < examples.length; i++) {
		markup.push(getFinderExplanationCardMarkup(examples[i]));
	}
	return markup.join("");
}

function getFinderExplanationTextCardMarkup(example) {
	return [
		"<article class='color-code-example-card finder-explanation-text-card'>",
		"<div class='color-code-example-copy'>",
		"<h4>" + example.title + "</h4>",
		"<p>" + example.text + "</p>",
		"</div>",
		"</article>"
	].join("");
}

function getFinderExplanationTextCardsMarkup(examples) {
	var markup = [];
	for (var i = 0; i < examples.length; i++) {
		markup.push(getFinderExplanationTextCardMarkup(examples[i]));
	}
	return markup.join("");
}

function prepareExplanationDialog(dialog, close) {
	var body = dialog.querySelector(".color-code-explanation-body");
	var sections = Array.prototype.slice.call(body.querySelectorAll(".color-code-section"));
	var navigation = document.createElement("nav");
	navigation.className = "km-help-navigation";
	navigation.setAttribute("aria-label", "Help topics");
	sections.forEach(function (section, index) {
		var button = document.createElement("button");
		button.type = "button";
		button.textContent = section.querySelector("h3").textContent;
		section.id = dialog.id + "-topic-" + index;
		button.setAttribute("aria-controls", section.id);
		button.setAttribute("aria-pressed", String(index === 0));
		section.hidden = index !== 0;
		button.addEventListener("click", function () {
			sections.forEach(function (item, i) {
				item.hidden = i !== index;
				navigation.children[i].setAttribute("aria-pressed", String(i === index));
			});
		});
		navigation.appendChild(button);
	});
	body.insertBefore(navigation, sections[0]);
	dialog.addEventListener("cancel", function (event) { event.preventDefault(); close(); });
}

function createColorCodeExplanationWindow() {
	var speedExamples;
	var damageExamples;
	var markup;
	if (colorCodeExplanationWindow) return;
	speedExamples = [
		{className: "mon-speed-F", title: "Light blue border", text: "The Pokemon is faster than the selected Trainer target."},
		{className: "mon-speed-T", title: "Purple border", text: "The Pokemon and the selected Trainer target speed tie."},
		{className: "mon-speed-S", title: "Red border", text: "The Pokemon is slower than the selected Trainer target."},
		{className: "mon-speed-none", title: "No border", text: "No speed comparison is available for this Pokemon."}
	];
	damageExamples = [
		{className: "color-code-sample-empty", title: "No background", text: "No highlighted damage state was found for either side."},
		{className: "mon-dmg-W", title: "Dark blue left half", text: "Favorable matchup: your max roll is higher, and the Trainer target cannot 3HKO back."},
		{className: "mon-dmg-WMO", title: "Light blue left half", text: "Favorable matchup, and your best high roll reaches OHKO damage."},
		{className: "mon-dmg-1", title: "Green left half", text: "Your Pokemon has a guaranteed OHKO into the Trainer target."},
		{className: "mon-dmg-2", title: "Yellow left half", text: "Your Pokemon has a possible OHKO into the Trainer target."},
		{className: "mon-dmg-3", title: "Orange right half", text: "The Trainer target has a possible OHKO back into your Pokemon."},
		{className: "mon-dmg-4", title: "Red right half", text: "The Trainer target has a guaranteed OHKO back into your Pokemon."},
		{className: "mon-dmg-13", title: "Green left + orange right", text: "You guarantee an OHKO, but the Trainer target can possibly OHKO back."},
		{className: "mon-dmg-14", title: "Green left + red right", text: "Both sides have guaranteed OHKOs. Speed and priority usually decide this."},
		{className: "mon-dmg-23", title: "Yellow left + orange right", text: "Both sides have possible OHKOs."},
		{className: "mon-dmg-24", title: "Yellow left + red right", text: "You have a possible OHKO, but the Trainer target has a guaranteed OHKO back."}
	];
	markup = [
		"<dialog id='color-code-explanation-window' class='notes-window color-code-explanation-window' aria-labelledby='color-code-explanation-title' hidden>",
		"<header class='notes-window-header color-code-explanation-header'>",
		"<h2 id='color-code-explanation-title' class='notes-window-title'>Color Code Explanation</h2>",
		"<div class='notes-window-actions'>",
		"<button type='button' class='btn color-code-explanation-close' aria-label='Close color code explanation'>X</button>",
		"</div>",
		"</header>",
		"<div class='notes-window-body color-code-explanation-body'>",
		"<p class='color-code-explanation-lede'>Color coding compares each Pokemon against the currently selected Trainer target. The border is Speed. The background is damage pressure.</p>",
		"<section class='color-code-section'>",
		"<h3>How To Read One Tile</h3>",
		"<div class='color-code-read-example'>",
		"<div class='color-code-sample mon-speed-F mon-dmg-14' aria-hidden='true'><span class='color-code-sample-sprite'>KM</span></div>",
		"<div><strong>Border:</strong> Speed result.<br><strong>Left half:</strong> your Pokemon attacking the Trainer target.<br><strong>Right half:</strong> the Trainer target attacking back.</div>",
		"</div>",
		"</section>",
		"<section class='color-code-section'>",
		"<h3>Speed Border</h3>",
		"<div class='color-code-example-grid color-code-speed-grid'>",
		getColorCodeExamplesMarkup(speedExamples),
		"</div>",
		"</section>",
		"<section class='color-code-section'>",
		"<h3>OHKO Color</h3>",
		"<p>Read the left and right halves separately. Colors on the left show your damage to the Trainer target. Colors on the right show the Trainer target's damage to your Pokemon.</p>",
		"<div class='color-code-example-grid'>",
		getColorCodeExamplesMarkup(damageExamples),
		"</div>",
		"</section>",
		"</div>",
		"</dialog>"
	].join("");
	$("body").append(markup);
	colorCodeExplanationWindow = $("#color-code-explanation-window");
	prepareExplanationDialog(colorCodeExplanationWindow[0], closeColorCodeExplanation);
	colorCodeExplanationWindow.find(".color-code-explanation-close").on("click", closeColorCodeExplanation);
}

function closeColorCodeExplanation() {
	if (!colorCodeExplanationWindow) return;
	if (colorCodeExplanationWindow[0].open) colorCodeExplanationWindow[0].close();
	colorCodeExplanationWindow.prop("hidden", true);
	$(document).off(".colorCodeExplanation");
}

window.closeKMCalculatorColorCodeExplanation = closeColorCodeExplanation;

function openColorCodeExplanation(event) {
	if (event) {
		event.preventDefault();
		event.stopPropagation();
	}
	createColorCodeExplanationWindow();
	colorCodeExplanationWindow.prop("hidden", false);
	if (!colorCodeExplanationWindow[0].open) colorCodeExplanationWindow[0].showModal();
	$(document)
		.off(".colorCodeExplanation")
		.on("mousedown.colorCodeExplanation", function (dismissEvent) {
			if ($(dismissEvent.target).closest("#color-code-explanation-window, #info-cc").length) return;
			closeColorCodeExplanation();
		});
	colorCodeExplanationWindow.find(".color-code-explanation-close").focus();
}

function createFinderExplanationWindow() {
	var textExamples;
	var speedExamples;
	var markup;
	if (finderExplanationWindow) return;
	textExamples = [
		{title: "All", text: "Searches name, type, ability, item, current Speed number, and speed relation words."},
		{title: "Name", text: "Limits text matching to Pokemon names, nicknames, set names, and full set labels."},
		{title: "Ability", text: "Limits text matching to the active ability or the species default when a set has none."},
		{title: "Item", text: "Limits text matching to held items."}
	];
	speedExamples = [
		{token: "Fast", title: "Faster", text: "Shows Pokemon that outspeed the selected Trainer target."},
		{token: "Tie", title: "Speed Tie", text: "Shows Pokemon with the same current Speed as the selected Trainer target."},
		{token: "Slow", title: "Slower", text: "Shows Pokemon that are slower than the selected Trainer target."},
		{token: "?", title: "Unknown", text: "Shows Pokemon without a current speed comparison."}
	];
	markup = [
		"<dialog id='finder-explanation-window' class='notes-window color-code-explanation-window finder-explanation-window' aria-labelledby='finder-explanation-title' hidden>",
		"<header class='notes-window-header color-code-explanation-header'>",
		"<h2 id='finder-explanation-title' class='notes-window-title'>Finder Explanation</h2>",
		"<div class='notes-window-actions'>",
		"<button type='button' class='btn finder-explanation-close' aria-label='Close finder explanation'>X</button>",
		"</div>",
		"</header>",
		"<div class='notes-window-body color-code-explanation-body'>",
		"<p class='color-code-explanation-lede'>Finder only changes what is visible while you are using the app. It does not save the search, and it clears when you exit.</p>",
		"<section class='color-code-section'>",
		"<h3>How To Read It</h3>",
		"<div class='color-code-read-example finder-explanation-read-example'>",
		"<div class='finder-explanation-token finder-explanation-token-wide' aria-hidden='true'>Search</div>",
		"<div><strong>Search box:</strong> type one or more words.<br><strong>Field dropdown:</strong> choose what the words should match.<br><strong>Extra dropdown:</strong> appears only for Type or Speed.</div>",
		"</div>",
		"<p class='finder-explanation-note'>Changing fields clears the previous search and its extra dropdown so old filters do not carry into the new mode.</p>",
		"</section>",
		"<section class='color-code-section'>",
		"<h3>Text Fields</h3>",
		"<div class='color-code-example-grid finder-explanation-grid'>",
		getFinderExplanationTextCardsMarkup(textExamples),
		"</div>",
		"</section>",
		"<section class='color-code-section'>",
		"<h3>Type Dropdown</h3>",
		"<p>Type filters to one selected type, then orders visible matches inside each Team/Box area like this:</p>",
		"<ol class='finder-explanation-order'>",
		"<li><span>1</span><strong>Single type first</strong><em>Steel</em></li>",
		"<li><span>2</span><strong>Primary type second</strong><em>Steel/Flying</em></li>",
		"<li><span>3</span><strong>Secondary type third</strong><em>Fire/Steel</em></li>",
		"</ol>",
		"<p class='finder-explanation-note'>Each group is alphabetical, and this display order is temporary.</p>",
		"</section>",
		"<section class='color-code-section'>",
		"<h3>Speed Dropdown</h3>",
		"<div class='color-code-example-grid finder-explanation-grid'>",
		getFinderExplanationCardsMarkup(speedExamples),
		"</div>",
		"<p class='finder-explanation-note'>Speed categories use the current calculator result against the selected Trainer target, so they update when the calc updates.</p>",
		"</section>",
		"</div>",
		"</dialog>"
	].join("");
	$("body").append(markup);
	finderExplanationWindow = $("#finder-explanation-window");
	prepareExplanationDialog(finderExplanationWindow[0], closeFinderExplanation);
	finderExplanationWindow.find(".finder-explanation-close").on("click", closeFinderExplanation);
}

function closeFinderExplanation() {
	if (!finderExplanationWindow) return;
	if (finderExplanationWindow[0].open) finderExplanationWindow[0].close();
	finderExplanationWindow.prop("hidden", true);
	$(document).off(".finderExplanation");
}

window.closeKMCalculatorFinderExplanation = closeFinderExplanation;

function openFinderExplanation(event) {
	if (event) {
		event.preventDefault();
		event.stopPropagation();
	}
	createFinderExplanationWindow();
	finderExplanationWindow.prop("hidden", false);
	if (!finderExplanationWindow[0].open) finderExplanationWindow[0].showModal();
	$(document)
		.off(".finderExplanation")
		.on("mousedown.finderExplanation", function (dismissEvent) {
			if ($(dismissEvent.target).closest("#finder-explanation-window, #info-finder").length) return;
			closeFinderExplanation();
		});
	finderExplanationWindow.find(".finder-explanation-close").focus();
}

function widthSpeedBorder(ev) {
	document.documentElement.style.setProperty("--spe-bor-width", $(ev.target).val() + "px");
}

function installTeamBoxControls() {
	var teamBox = $("#team-box");
	if (!teamBox.length || teamBox.data("installed")) return;
	teamBox.data("installed", true);
	installDoublesSlotSummaries();
	installDoublesSlotDragControls();
	$(document).on("click", ".box-pokemon", function () {
		if (isDoublesFormatSelected()) return;
		selectBoxPokemon($(this).attr("data-id"));
	});
	$(document).on("click", ".doubles-slot-card", function () {
		activateDoublesSlot($(this).attr("data-side"), ~~$(this).attr("data-slot"));
	});
	$(document).on("contextmenu", ".doubles-slot-card", function (event) {
		if (!isDoublesFormatSelected()) return;
		event.preventDefault();
		var side = $(this).attr("data-side");
		showDoublesSlotMenu(event, null, {
			swap: function () {
				swapDoublesSlots(side);
			}
		});
	});
	$(document).on("contextmenu", ".box-pokemon", function (event) {
		showTeamBoxPokemonMenu(event, this);
	});
	$(document).on("dragstart", ".box-pokemon", dragstart_handler);
	$(document).on("dragover", ".dropzone, .box-pokemon", allowDrop);
	$(document).on("drop", ".dropzone, .box-pokemon", drop);
	$(document).on("dragend", ".box-pokemon", clearBoxPokemonDragState);
	$(document).on("dragenter", ".dropzone", handleDragEnter);
	$(document).on("dragleave", ".dropzone, .box-pokemon", handleDragLeave);
	$("#remove-trash-pokemon").click(removeTrashedBoxPokemon);
	$("#clear-team-boxes").click(removeAllTeamBoxPokemon);
	$("#show-cc").click(showColorCodes);
	$("#hide-cc").click(hideColorCodes);
	$("#refr-cc").click(refreshColorCode);
	$("#info-cc").click(openColorCodeExplanation);
	$("#info-finder").click(openFinderExplanation);
	$("#team-box-filter-text").on("input keyup search", applyTeamBoxFilters);
	$("#team-box-filter-field").change(handleTeamBoxFilterFieldChange);
	$("#team-box-filter-type").change(applyTeamBoxFilters);
	$("#team-box-filter-speed").change(applyTeamBoxFilters);
	$("#team-box-filter-clear").click(clearTeamBoxFilters);
	$(window).on("beforeunload.teamBoxFinder", clearTeamBoxFilters);
	$("#team-box-sort-apply").click(sortTeamBoxStorage);
	$("#cc-spe-border, #cc-ohko-color").change(function () {
		saveColorCodeOptions();
		refreshColorCode();
	});
	$("#cc-auto-refr").change(refreshColorCode);
	$("#cc-spe-width").bind("input change", widthSpeedBorder);
	$("#p1 input.set-selector, #p2 input.set-selector").change(function () {
		var fullSetName = $(this).val();
		var side = $(this).closest(".poke-info").prop("id") === "p1" ? "player" : "opponent";
		var activeSlot = isDoublesFormatSelected() ? doublesActiveSlot[side] : 1;
		setDoublesSlotSelection(
			side,
			activeSlot,
			fullSetName ? getSetSlotSelection(fullSetName) : null
		);
	});
	initializeColorCodeOptions();
	updateTeamBoxFinderFieldControls();
	setColorCodeControlsVisible(true);
	if (hasAnyCustomSets(readCustomSets())) syncTeamBoxWithCustomSets(readCustomSets());
	observePlayerTeamMirror();
	refreshPlayerTeamMirror();
	applyDefaultPlayerPokemonFromTeam();
	if ($("#p1 input.set-selector").val()) setDoublesSlotSelection("player", 1, getSetSlotSelection($("#p1 input.set-selector").val()));
	if ($("#p2 input.set-selector").val()) setDoublesSlotSelection("opponent", 1, getSetSlotSelection($("#p2 input.set-selector").val()));
	refreshColorCodeAfterInitialLoad();
}

window.saveTeamBoxLayout = saveTeamBoxLayout;
window.addCustomSetsToDex = addCustomSetsToDex;
window.removeAllCustomSetsFromDex = removeAllCustomSetsFromDex;

// auto-update set details on select
$("input.set-selector").change(function () {
	var fullSetName = $(this).val();
	var pokemonName = fullSetName.substring(0, fullSetName.indexOf(" ("));
	var setName = fullSetName.substring(fullSetName.indexOf("(") + 1, fullSetName.lastIndexOf(")"));
	var pokemon = pokedex[pokemonName];
	if (pokemon) {
		var pokeObj = $(this).closest(".poke-info");
		updatePokemonLegendSprite(pokeObj, getPokemonLegendTitle(pokeObj), pokemonName);
		var isAutoTera =
		(startsWith(pokemonName, "Ogerpon") && endsWith(pokemonName, "Tera")) ||
		pokemonName === 'Terapagos-Stellar';
		if (stickyMoves.getSelectedSide() === pokeObj.prop("id")) {
			stickyMoves.clearStickyMove();
		}
		pokeObj.find(".teraToggle").prop("checked", isAutoTera);
		pokeObj.find(".gmaxToggle").prop("checked", false);
		pokeObj.find(".max").prop("checked", false);
		stellarButtonsVisibility(pokeObj, 0);
		pokeObj.find(".boostedStat").val("");
		pokeObj.find(".type1").val(pokemon.types[0]);
		pokeObj.find(".type2").val(pokemon.types[1]);
		pokeObj.find(".hp .base").val(pokemon.bs.hp);
		var i;
		for (i = 0; i < LEGACY_STATS[gen].length; i++) {
			pokeObj.find("." + LEGACY_STATS[gen][i] + " .base").val(pokemon.bs[LEGACY_STATS[gen][i]]);
		}
		pokeObj.find(".boost").val(0);
		pokeObj.find(".percent-hp").val(100);
		pokeObj.find(".status").val("Healthy");
		$(".status").change();
		var moveObj;
		var abilityObj = pokeObj.find(".ability");
		var itemObj = pokeObj.find(".item");
		var randset;
		if ($("#randoms").prop("checked")) {
			if (gen >= 8) {
				// The Gens 8 and 9 randdex contains information for multiple Random Battles formats for each Pokemon.
				// Duraludon, for example, has data for Randoms, Doubles Randoms, and Baby Randoms.
				// Therefore, the information for only the format chosen should be used.
				randset = randdex[pokemonName][setName];
			} else {
				randset = randdex[pokemonName];
			}
		}
		var regSets = pokemonName in setdex && setName in setdex[pokemonName];

		if (randset) {
			var listItems = randset.items ? randset.items : [];
			var listAbilities = randset.abilities ? randset.abilities : [];
			if (gen >= 3) $(this).closest('.poke-info').find(".ability-pool").show();
			$(this).closest('.poke-info').find(".extraSetAbilities").text(listAbilities.join(', '));
			if (gen >= 2) $(this).closest('.poke-info').find(".item-pool").show();
			$(this).closest('.poke-info').find(".extraSetItems").text(listItems.join(', '));
			if (gen !== 8 && gen !== 1) {
				$(this).closest('.poke-info').find(".role-pool").show();
				if (gen >= 9) $(this).closest('.poke-info').find(".tera-type-pool").show();
			}
			var listRoles = randset.roles ? Object.keys(randset.roles) : [];
			$(this).closest('.poke-info').find(".extraSetRoles").text(listRoles.join(', '));
			var listTeraTypes = [];
			if (randset.roles && gen >= 9) {
				for (var roleName in randset.roles) {
					var role = randset.roles[roleName];
					for (var q = 0; q < role.teraTypes.length; q++) {
						if (listTeraTypes.indexOf(role.teraTypes[q]) === -1) {
							listTeraTypes.push(role.teraTypes[q]);
						}
					}
				}
			}
			pokeObj.find(".teraType").val(listTeraTypes[0] || getForcedTeraType(pokemonName) || pokemon.types[0]);
			$(this).closest('.poke-info').find(".extraSetTeraTypes").text(listTeraTypes.join(', '));
		} else {
			$(this).closest('.poke-info').find(".ability-pool").hide();
			$(this).closest('.poke-info').find(".item-pool").hide();
			$(this).closest('.poke-info').find(".role-pool").hide();
			$(this).closest('.poke-info').find(".tera-type-pool").hide();
		}
		if (regSets || randset) {
			var set = regSets ? correctHiddenPower(setdex[pokemonName][setName]) : randset;
			if (regSets) {
				pokeObj.find(".teraType").val(set.teraType || getForcedTeraType(pokemonName) || pokemon.types[0]);
			}
			pokeObj.find(".gmaxToggle").prop("checked", !!(pokemon.canGigantamax && set.isGmax));
			pokeObj.find(".level").val(set.level === undefined ? 100 : set.level);
			var evsDefault = areEVInputsDisabled() ? 0 :
				(gen < 3 ? 252 : ($("#randoms").prop("checked") ? 84 : 0));
			for (i = 0; i < LEGACY_STATS[gen].length; i++) {
				var stat = $("#randoms").prop("checked") ? legacyStatToStat(LEGACY_STATS[gen][i]) : LEGACY_STATS[gen][i];
				pokeObj.find("." + LEGACY_STATS[gen][i] + " .evs").val(
					areEVInputsDisabled() ? 0 :
						((set.evs && set.evs[stat] !== undefined) ? set.evs[stat] : evsDefault));
				pokeObj.find("." + LEGACY_STATS[gen][i] + " .ivs").val(
					(set.ivs && set.ivs[stat] !== undefined) ? set.ivs[stat] : 31);
				pokeObj.find("." + LEGACY_STATS[gen][i] + " .dvs").val(
					(set.dvs && set.dvs[stat] !== undefined) ? set.dvs[stat] : 15);
			}
			setSelectValueIfValid(pokeObj.find(".nature"), set.nature, "Hardy");
			var abilityFallback = (typeof pokemon.abilities !== "undefined") ? pokemon.abilities[0] : "";
			if ($("#randoms").prop("checked")) {
				setSelectValueIfValid(abilityObj, randset.abilities && randset.abilities[0], abilityFallback);
				setSelectValueIfValid(itemObj, randset.items && randset.items[0], "");
			} else {
				setSelectValueIfValid(abilityObj, set.ability, abilityFallback);
				setSelectValueIfValid(itemObj, set.item, "");
			}
			var setMoves = set.moves;
			if (randset) {
				if (gen === 8 || gen === 1) {
					setMoves = randset.moves;
				} else {
					setMoves = [];
					for (var role in randset.roles) {
						for (var q = 0; q < randset.roles[role].moves.length; q++) {
							var moveName = randset.roles[role].moves[q];
							if (setMoves.indexOf(moveName) === -1) setMoves.push(moveName);
						}
					}
				}
			}
			var moves = selectMovesFromRandomOptions(setMoves);
			for (i = 0; i < 4; i++) {
				moveObj = pokeObj.find(".move" + (i + 1) + " select.move-selector");
				moveObj.attr('data-prev', moveObj.val());
				setSelectValueIfValid(moveObj, moves[i], "(No Move)");
				moveObj.change();
			}
			if (randset) {
				$(this).closest('.poke-info').find(".move-pool").show();
				$(this).closest('.poke-info').find(".extraSetMoves").html(formatMovePool(setMoves));
			}
		} else {
			pokeObj.find(".teraType").val(getForcedTeraType(pokemonName) || pokemon.types[0]);
			pokeObj.find(".gmaxToggle").prop("checked", false);
			pokeObj.find(".level").val(defaultLevel);
			pokeObj.find(".hp .evs").val(areEVInputsDisabled() || gen > 2 ? 0 : 252);
			pokeObj.find(".hp .ivs").val(31);
			pokeObj.find(".hp .dvs").val(15);
			for (i = 0; i < LEGACY_STATS[gen].length; i++) {
				pokeObj.find("." + LEGACY_STATS[gen][i] + " .evs").val(
					areEVInputsDisabled() || gen > 2 ? 0 : 252);
				pokeObj.find("." + LEGACY_STATS[gen][i] + " .ivs").val(31);
				pokeObj.find("." + LEGACY_STATS[gen][i] + " .dvs").val(15);
			}
			pokeObj.find(".nature").val("Hardy");
			setSelectValueIfValid(abilityObj, pokemon.abilities && pokemon.abilities[0], "");
			if (startsWith(pokemonName, "Ogerpon-") && !startsWith(pokemonName, "Ogerpon-Teal")) {
				itemObj.val(pokemonName.split("-")[1] + " Mask");
			} else {
				itemObj.val("");
			}
			for (i = 0; i < 4; i++) {
				moveObj = pokeObj.find(".move" + (i + 1) + " select.move-selector");
				moveObj.attr('data-prev', moveObj.val());
				moveObj.val("(No Move)");
				moveObj.change();
			}
			if ($("#randoms").prop("checked")) {
				$(this).closest('.poke-info').find(".move-pool").hide();
			}
		}
		if (areEVInputsDisabled()) forceZeroEVInputs(pokeObj);
		totalEVs(pokeObj);
		if (typeof getSelectedTiers === "function") { // doesn't exist when in 1vs1 mode
			var format = getSelectedTiers()[0];
			var is50lvl = startsWith(format, "VGC") || startsWith(format, "Battle Spot");
			//var isDoubles = format === 'Doubles' || has50lvl; *TODO*
			if (format === "LC") pokeObj.find(".level").val(5);
			if (is50lvl) pokeObj.find(".level").val(50);
			//if (isDoubles) field.gameType = 'Doubles'; *TODO*
		}
		var formeObj = pokeObj.find(".forme").parent();
		itemObj.prop("disabled", false);
		var baseForme;
		if (pokemon.baseSpecies && pokemon.baseSpecies !== pokemon.name) {
			baseForme = pokedex[pokemon.baseSpecies];
		}
		if (pokemon.otherFormes) {
			showFormes(formeObj, pokemonName, pokemon, pokemonName);
		} else if (baseForme && baseForme.otherFormes) {
			showFormes(formeObj, pokemonName, baseForme, pokemon.baseSpecies);
		} else {
			hideFormes(formeObj);
		}
		if (gen === 8 && pokemon.canGigantamax) {
			pokeObj.find(".gmaxToggle").parent().show();
		} else {
			pokeObj.find(".gmaxToggle").parent().hide();
		}
		calcStats(pokeObj);
		var total = pokeObj.find(".hp").find(".total").text();
		pokeObj.find(".max-hp").text(total);
		pokeObj.find(".max-hp").attr("data-prev", total);
		pokeObj.find(".current-hp").val(total);
		pokeObj.find(".current-hp").attr("data-set", true);
		calcHP(pokeObj);
		genderSelector(
			gen,
			pokemon.gender,
			pokeObj,
			(regSets || randset) && set.gender ? set.gender : undefined
		);
		$(".ability").each(function () {
			if (checkRivalry($(this).val())) return; // stop after any Rivalry is found, no need to look further
		});
		abilityObj.change();
		itemObj.change();
	}
});

function formatMovePool(moves) {
	var formatted = [];
	for (var i = 0; i < moves.length; i++) {
		var moveName = escapeHtml(moves[i]);
		formatted.push(isKnownDamagingMove(moves[i]) ? moveName : '<i>' + moveName + '</i>');
	}
	return formatted.join(', ');
}

function escapeHtml(value) {
	return String(value).replace(/[&<>"']/g, function (character) {
		return {
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;",
			"\"": "&quot;",
			"'": "&#39;"
		}[character];
	});
}

function isKnownDamagingMove(move) {
	var m = GENERATION.moves.get(calc.toID(move));
	return m && m.basePower;
}

function selectMovesFromRandomOptions(moves) {
	var selected = [];

	var nonDamaging = [];
	for (var i = 0; i < moves.length; i++) {
		if (isKnownDamagingMove(moves[i])) {
			selected.push(moves[i]);
			if (selected.length >= 4) break;
		} else {
			nonDamaging.push(moves[i]);
		}
	}

	while (selected.length < 4 && nonDamaging.length) {
		selected.push(nonDamaging.pop());
	}

	return selected;
}

function showFormes(formeObj, pokemonName, pokemon, baseFormeName) {
	var formes = pokemon.otherFormes.slice();
	formes.unshift(baseFormeName);

	var defaultForme = formes.indexOf(pokemonName);
	if (defaultForme < 0) defaultForme = 0;

	var formeOptions = getSelectOptions(formes, false, defaultForme);
	formeObj.children("select").find("option").remove().end().append(formeOptions).change();
	formeObj.removeClass("hide").css("display", "");
}

function hideFormes(formeObj) {
	formeObj.addClass("hide").css("display", "");
}

function isFormeControlHidden(forme) {
	var control = forme.closest(".pokemon-forme-control");
	return control.hasClass("hide") || control.css("display") === "none" || forme.prop("hidden");
}

function stellarButtonsVisibility(pokeObj, vis) {
	var fullSetName = pokeObj.find("input.set-selector").val();
	var pokemonName = fullSetName.substring(0, fullSetName.indexOf(" ("));
	var moveObjs = [
		pokeObj.find(".move1"),
		pokeObj.find(".move2"),
		pokeObj.find(".move3"),
		pokeObj.find(".move4")
	];
	if (vis && !startsWith(pokemonName, 'Terapagos')) {
		for (var i = 0; i < moveObjs.length; i++) {
			var moveObj = moveObjs[i];
			moveObj.find(".move-stellar").prop("checked", true);
			moveObj.find(".stellar-btn").show();
		}
		return;
	}
	for (var i = 0; i < moveObjs.length; i++) {
		var moveObj = moveObjs[i];
		moveObj.find(".move-stellar").prop("checked", false);
		moveObj.find(".stellar-btn").hide();
	}
}

function setSelectValueIfValid(select, value, fallback) {
	select.val(!value ? fallback : select.children("option[value='" + value + "']").length ? value : fallback);
}

$(".teraToggle").change(function () {
	var pokeObj = $(this).closest(".poke-info");
	stellarButtonsVisibility(pokeObj, pokeObj.find(".teraType").val() === "Stellar" && this.checked);
	var forme = pokeObj.find(".forme");
	var curForme = forme.val();
	if (isFormeControlHidden(forme)) return;
	var container = pokeObj;
	// Ogerpon and Terapagos mechs
	if (startsWith(curForme, "Ogerpon")) {
		if (
			curForme !== "Ogerpon" && !endsWith(curForme, "Tera") &&
			container.find(".item").val() !== curForme.split("-")[1] + " Mask"
		) return;
		if (this.checked) {
			var newForme = curForme === "Ogerpon" ? "Ogerpon-Teal-Tera" : curForme + "-Tera";
			forme.val(newForme);
			container.find(".ability").val("Embody Aspect (" + newForme.split("-")[1] + ")");
			return;
		}
		if (!endsWith(curForme, "Tera")) return;
		var newForme = curForme === "Ogerpon-Teal-Tera" ? "Ogerpon" : curForme.slice(0, -5);
		forme.val(newForme);
		container.find(".ability").val(pokedex[newForme].abilities[0]);
	} else if (startsWith(curForme, "Terapagos")) {
		if (this.checked) {
			var newForme = "Terapagos-Stellar";

			forme.val(newForme);
			container.find(".ability").val(pokedex[newForme].abilities[0]);

			for (var property in pokedex[newForme].bs) {
				var baseStat = container.find("." + property).find(".base");
				baseStat.val(pokedex[newForme].bs[property]);
				baseStat.keyup();
			}
			return;
		}

		if (!endsWith(curForme, "Stellar")) return;
		var newForme = "Terapagos-Terastal";

		forme.val(newForme);
		container.find(".ability").val(pokedex[newForme].abilities[0]);
		for (var property in pokedex[newForme].bs) {
			var baseStat = container.find("." + property).find(".base");
			baseStat.val(pokedex[newForme].bs[property]);
			baseStat.keyup();
		}
	}
});

$(".forme").change(function () {
	var pokeObj = $(this).closest(".poke-info"),
		altForme = pokedex[$(this).val()],
		container = pokeObj,
		fullSetName = pokeObj.find("input.set-selector").val(),
		pokemonName = fullSetName.substring(0, fullSetName.indexOf(" (")),
		setName = fullSetName.substring(fullSetName.indexOf("(") + 1, fullSetName.lastIndexOf(")"));

	pokeObj.find(".type1").val(altForme.types[0]);
	pokeObj.find(".type2").val(altForme.types[1] ? altForme.types[1] : "");
	updatePokemonLegendSprite(pokeObj, getPokemonLegendTitle(pokeObj), $(this).val());
	genderSelector(gen, altForme.gender, pokeObj, pokeObj.find(".gender").val());
	for (var i = 0; i < LEGACY_STATS[9].length; i++) {
		var baseStat = container.find("." + LEGACY_STATS[9][i]).find(".base");
		baseStat.val(altForme.bs[LEGACY_STATS[9][i]]);
		baseStat.keyup();
	}
	if (
		(startsWith($(this).val(), "Ogerpon") && endsWith($(this).val(), "Tera")) || $(this).val() === "Terapagos-Stellar"
	) {
		pokeObj.find(".teraToggle").prop("checked", true);
	}
	var isRandoms = $("#randoms").prop("checked");
	var pokemonSets = isRandoms ? randdex[pokemonName] : setdex[pokemonName];
	var chosenSet = isRandoms && gen < 8 ? pokemonSets : pokemonSets && pokemonSets[setName];
	var greninjaSet = $(this).val().indexOf("Greninja") !== -1;
	var isAltForme = $(this).val() !== pokemonName;
	if (isAltForme && abilities.indexOf(altForme.abilities[0]) !== -1 && !greninjaSet) {
		container.find(".ability").val(altForme.abilities[0]);
	} else if (!isAltForme && abilities.indexOf(altForme.abilities[0]) !== -1 && !greninjaSet) {
		if (chosenSet && (chosenSet.ability || (chosenSet.abilities && chosenSet.abilities[0]))) {
			container.find(".ability").val(isRandoms ? chosenSet.abilities[0] : chosenSet.ability);
		} else {
			container.find(".ability").val(altForme.abilities[0]);
		}
	} else if (greninjaSet) {
		$(this).parent().find(".ability");
	} else if (chosenSet) {
		if (!isRandoms) {
			container.find(".abilities").val(chosenSet.ability);
		} else {
			container.find(".ability").val(chosenSet.abilities[0]);
		}
	}
	var forcedTeraType = getForcedTeraType($(this).val());
	if (forcedTeraType) {
		pokeObj.find(".teraType").val(forcedTeraType);
	}
	container.find(".ability").keyup();
	if (startsWith($(this).val(), "Ogerpon-") && !startsWith($(this).val(), "Ogerpon-Teal")) {
		container.find(".item").val($(this).val().split("-")[1] + " Mask").keyup();
	} else {
		container.find(".item").prop("disabled", false);
	}
});

function correctHiddenPower(pokemon) {
	// After Gen 7 bottlecaps means you can have a HP without perfect IVs
	// Level 100 is elided from sets so if its undefined its level 100
	if (gen >= 7 && (!pokemon.level || pokemon.level >= 100)) return pokemon;

	// Convert the legacy stats table to a useful one, and also figure out if all are maxed
	var ivs = {};
	var maxed = true;
	for (var i = 0; i <= LEGACY_STATS[9].length; i++) {
		var s = LEGACY_STATS[9][i];
		var iv = ivs[legacyStatToStat(s)] = (pokemon.ivs && typeof pokemon.ivs[s] !== "undefined") ? pokemon.ivs[s] : 31;
		if (iv !== 31) maxed = false;
	}

	var expected = calc.Stats.getHiddenPower(GENERATION, ivs);
	for (var i = 0; i < pokemon.moves.length; i++) {
		var m = pokemon.moves[i].match(HIDDEN_POWER_REGEX);
		if (!m) continue;
		// The Hidden Power type matches the IVs provided so we don't need to do anything else
		if (expected.type === m[1]) {
			continue;
		}
		// The Pokemon has Hidden Power and is not maxed but the types don't match we don't
		// want to attempt to reconcile the user's IVs so instead just correct the HP type
		if (!maxed) {
			pokemon.moves[i] = "Hidden Power " + expected.type;
			continue;
		}
		// Otherwise, use the default preset hidden power IVs that PS would use
		var hpIVs = calc.Stats.getHiddenPowerIVs(GENERATION, m[1]);
		if (!hpIVs) continue; // some impossible type was specified, ignore
		pokemon.ivs = pokemon.ivs || {hp: 31, at: 31, df: 31, sa: 31, sd: 31, sp: 31};
		pokemon.dvs = pokemon.dvs || {hp: 15, at: 15, df: 15, sa: 15, sd: 15, sp: 15};
		for (var stat in hpIVs) {
			pokemon.ivs[calc.Stats.shortForm(stat)] = hpIVs[stat];
			pokemon.dvs[calc.Stats.shortForm(stat)] = calc.Stats.IVToDV(hpIVs[stat]);
		}
		if (gen < 3) {
			pokemon.dvs.hp = calc.Stats.getHPDV({
				atk: pokemon.ivs.at || 31,
				def: pokemon.ivs.df || 31,
				spe: pokemon.ivs.sp || 31,
				spc: pokemon.ivs.sa || 31
			});
			pokemon.ivs.hp = calc.Stats.DVToIV(pokemon.dvs.hp);
		}
	}
	return pokemon;
}

function createPokemon(pokeInfo) {
	if (typeof pokeInfo === "string") { // in this case, pokeInfo is the id of an individual setOptions value whose moveset's tier matches the selected tier(s)
		if (!pokeInfo) return null;
		var name = pokeInfo.substring(0, pokeInfo.indexOf(" ("));
		var setName = pokeInfo.substring(pokeInfo.indexOf("(") + 1, pokeInfo.lastIndexOf(")"));
		var isRandoms = $("#randoms").prop("checked");
		var set = isRandoms ? randdex[name] : setdex[name][setName];

		var ivs = {};
		var evs = {};
		for (var i = 0; i < LEGACY_STATS[gen].length; i++) {
			var legacyStat = LEGACY_STATS[gen][i];
			var stat = legacyStatToStat(legacyStat);

			ivs[stat] = 31;
			if (gen < 3 && set.dvs) {
				var dv = typeof set.dvs[legacyStat] !== "undefined" ? set.dvs[legacyStat] : set.dvs[stat];
				if (typeof dv !== "undefined") ivs[stat] = calc.Stats.DVToIV(dv);
			} else if (gen >= 3 && set.ivs) {
				if (typeof set.ivs[legacyStat] !== "undefined") {
					ivs[stat] = set.ivs[legacyStat];
				} else if (typeof set.ivs[stat] !== "undefined") {
					ivs[stat] = set.ivs[stat];
				}
			}
			evs[stat] = areEVInputsDisabled() ? 0 :
				(set.evs && typeof set.evs[legacyStat] !== "undefined" ? set.evs[legacyStat] :
					(set.evs && typeof set.evs[stat] !== "undefined" ? set.evs[stat] : (gen < 3 ? 252 : 0)));
		}
		var moveNames = set.moves;
		if (isRandoms && (gen !== 8 && gen !== 1)) {
			moveNames = [];
			for (var role in set.roles) {
				for (var q = 0; q < set.roles[role].moves.length; q++) {
					var moveName = set.roles[role].moves[q];
					if (moveNames.indexOf(moveName) === -1) moveNames.push(moveName);
				}
			}
		}

		var ability = set.ability || "";
		var item = set.item || "";
		var pokemonMoves = [];
		for (var i = 0; i < 4; i++) {
			var moveName = moveNames[i];
			pokemonMoves.push(new calc.Move(getActiveCalcGeneration(), moves[moveName] ? moveName : "(No Move)", {ability: ability, item: item}));
		}

		if (isRandoms) {
			pokemonMoves = pokemonMoves.filter(function (move) {
				return move.category !== "Status";
			});
		}

		return createProfilePokemon(name, {
			level: set.level,
			ability: set.ability,
			abilityOn: true,
			item: set.item && typeof set.item !== "undefined" && (set.item === "Eviolite" || set.item === "White Herb" || set.item.indexOf("ite") < 0) ? set.item : "",
			gender: set.gender,
			nature: set.nature,
			ivs: ivs,
			evs: evs,
			moves: pokemonMoves
		});
	} else {
		var setName = pokeInfo.find("input.set-selector").val();
		if (!setName) return null;
		var name;
		if (setName.indexOf("(") === -1) {
			name = setName;
		} else {
			var pokemonName = setName.substring(0, setName.indexOf(" ("));
			var species = pokedex[pokemonName];
			name = (species.otherFormes || (species.baseSpecies && species.baseSpecies !== pokemonName)) ? pokeInfo.find(".forme").val() : pokemonName;
		}

		var baseStats = {};
		var ivs = {};
		var evs = {};
		var boosts = {};
		for (var i = 0; i < LEGACY_STATS[gen].length; i++) {
			var stat = legacyStatToStat(LEGACY_STATS[gen][i]);
			baseStats[stat === 'spc' ? 'spa' : stat] = ~~pokeInfo.find("." + LEGACY_STATS[gen][i] + " .base").val();
			ivs[stat] = gen > 2 ?
				~~pokeInfo.find("." + LEGACY_STATS[gen][i] + " .ivs").val() :
				~~pokeInfo.find("." + LEGACY_STATS[gen][i] + " .dvs").val() * 2 + 1;
			evs[stat] = areEVInputsDisabled() ? 0 :
				~~pokeInfo.find("." + LEGACY_STATS[gen][i] + " .evs").val();
			boosts[stat] = ~~pokeInfo.find("." + LEGACY_STATS[gen][i] + " .boost").val();
		}
		if (gen === 1) baseStats.spd = baseStats.spa;

		var ability = pokeInfo.find(".ability").val();
		var item = pokeInfo.find(".item").val();
		var gender = pokeInfo.find(".gender").val();
		var isDynamaxed = pokeInfo.find(".max").prop("checked");
		var overrideMove;
		if (isDynamaxed && pokeInfo.find(".gmaxToggle").prop("checked")) {
			isDynamaxed = "gmax";
			overrideMove = (pokedex[name] || species).canGigantamax;
		}
		var teraType = pokeInfo.find(".teraToggle").is(":checked") ? pokeInfo.find(".teraType").val() : undefined;
		var opts = {
			ability: ability,
			item: item,
			gender: gender,
			isDynamaxed: isDynamaxed,
			teraType: teraType,
			overrideMove: overrideMove,
			species: name,
		};
		pokeInfo.isDynamaxed = isDynamaxed;
		calcHP(pokeInfo);
		var curHP = ~~pokeInfo.find(".current-hp").val();
		// FIXME the Pokemon constructor expects non-dynamaxed HP
		if (isDynamaxed) curHP = Math.floor(curHP / 2);
		var types = [pokeInfo.find(".type1").val(), pokeInfo.find(".type2").val()];
		return createProfilePokemon(name, {
			level: ~~pokeInfo.find(".level").val(),
			ability: ability,
			abilityOn: pokeInfo.find(".abilityToggle").is(":checked"),
			item: item,
			gender: gender,
			nature: pokeInfo.find(".nature").val(),
			ivs: ivs,
			evs: evs,
			isDynamaxed: isDynamaxed,
			overrideMove: overrideMove,
			alliesFainted: parseInt(pokeInfo.find(".alliesFainted").val()),
			boostedStat: pokeInfo.find(".boostedStat").val() || undefined,
			teraType: teraType,
			boosts: boosts,
			curHP: curHP,
			status: CALC_STATUS[pokeInfo.find(".status").val()],
			toxicCounter: pokeInfo.find(".status").val() === 'Badly Poisoned' ? ~~pokeInfo.find(".toxic-counter").val() : 0,
			moves: [
				getMoveDetails(pokeInfo.find(".move1"), opts),
				getMoveDetails(pokeInfo.find(".move2"), opts),
				getMoveDetails(pokeInfo.find(".move3"), opts),
				getMoveDetails(pokeInfo.find(".move4"), opts),
			],
			overrides: {
				baseStats: baseStats,
				types: types
			}
		});
	}
}

function getGender(gender) {
	if (!gender || gender === 'genderless' || gender === 'N') return 'N';
	if (gender.toLowerCase() === 'male' || gender === 'M') return 'M';
	return 'F';
}

function genderSelector(gen, speciesGender, pokeObj, setGender) {
	if (gen === 1) {
		pokeObj.find(".gender").val("");
		pokeObj.find(".gender").parent().hide();
		return;
	}
	pokeObj.find(".gender").parent().show();
	pokeObj.find(".gender").val(setGender || speciesGender || "");
}

function checkRivalry(ability) {
	if (ability === "Rivalry") {
		$(".gender").each(function () {
			if ($(this).val() === "") $(this).val("M");
		});
		return true;
	}
}

function getMoveDetails(moveInfo, opts) {
	var moveName = moveInfo.find("select.move-selector").val();
	var isZMove = areZMovesEnabled() && moveInfo.find("input.move-z").prop("checked");
	var isCrit = moveInfo.find(".move-crit").prop("checked");
	var isStellarFirstUse = moveInfo.find(".move-stellar").prop("checked");
	var hits = +moveInfo.find(".move-hits").val();
	var timesUsed = +moveInfo.find(".move-times").val();
	var timesUsedWithMetronome = moveInfo.find(".metronome").is(':visible') ? +moveInfo.find(".metronome").val() : 1;
	var overrides = {
		basePower: +moveInfo.find(".move-bp").val(),
		type: moveInfo.find(".move-type").val()
	};
	if (moveName === 'Tera Blast') {
		// custom logic for stellar type tera blast
		var isStellar = opts.teraType === 'Stellar';
		if (isStellar) overrides.self = {boosts: {atk: -1, spa: -1}};
	}
	if (gen >= 4) overrides.category = moveInfo.find(".move-cat").val();
	return new calc.Move(getActiveCalcGeneration(), moveName, {
		ability: opts.ability, item: opts.item, useZ: isZMove, species: opts.species, isCrit: isCrit, hits: hits,
		isStellarFirstUse: isStellarFirstUse, timesUsed: timesUsed, timesUsedWithMetronome: timesUsedWithMetronome,
		overrides: overrides, useMax: opts.isDynamaxed, overrideMove: opts.overrideMove
	});
}

function createField() {
	var gameType = $("input:radio[name='format']:checked").val();
	var isBeadsOfRuin = $("#beads").prop("checked");
	var isTabletsOfRuin = $("#tablets").prop("checked");
	var isSwordOfRuin = $("#sword").prop("checked");
	var isVesselOfRuin = $("#vessel").prop("checked");
	var isMagicRoom = $("#magicroom").prop("checked");
	var isWonderRoom = $("#wonderroom").prop("checked");
	var isGravity = $("#gravity").prop("checked");
	var isSR = [$("#srL").prop("checked"), $("#srR").prop("checked")];
	var weather;
	var spikes;
	if (gen === 2) {
		spikes = [$("#gscSpikesL").prop("checked") ? 1 : 0, $("#gscSpikesR").prop("checked") ? 1 : 0];
		weather = $("input:radio[name='gscWeather']:checked").val();
	} else {
		weather = $("input:radio[name='weather']:checked").val();
		spikes = [~~$("input:radio[name='spikesL']:checked").val(), ~~$("input:radio[name='spikesR']:checked").val()];
	}
	var steelsurge = [$("#steelsurgeL").prop("checked"), $("#steelsurgeR").prop("checked")];
	var vinelash = [$("#vinelashL").prop("checked"), $("#vinelashR").prop("checked")];
	var wildfire = [$("#wildfireL").prop("checked"), $("#wildfireR").prop("checked")];
	var cannonade = [$("#cannonadeL").prop("checked"), $("#cannonadeR").prop("checked")];
	var volcalith = [$("#volcalithL").prop("checked"), $("#volcalithR").prop("checked")];
	var terrain = ($("input:checkbox[name='terrain']:checked").val()) ? $("input:checkbox[name='terrain']:checked").val() : "";
	var isReflect = [$("#reflectL").prop("checked"), $("#reflectR").prop("checked")];
	var isLightScreen = [$("#lightScreenL").prop("checked"), $("#lightScreenR").prop("checked")];
	var isProtected = [$("#protectL").prop("checked"), $("#protectR").prop("checked")];
	var isSeeded = [$("#leechSeedL").prop("checked"), $("#leechSeedR").prop("checked")];
	var isSaltCured = [$("#saltCureL").prop("checked"), $("#saltCureR").prop("checked")];
	var isForesight = [$("#foresightL").prop("checked"), $("#foresightR").prop("checked")];
	var isHelpingHand = [$("#helpingHandL").prop("checked"), $("#helpingHandR").prop("checked")];
	var isTailwind = [$("#tailwindL").prop("checked"), $("#tailwindR").prop("checked")];
	var isFlowerGift = [$("#flowerGiftL").prop("checked"), $("#flowerGiftR").prop("checked")];
	var isPowerTrick = [$("#powerTrickL").prop("checked"), $("#powerTrickR").prop("checked")];
	var isSteelySpirit = [$("#steelySpiritL").prop("checked"), $("#steelySpiritR").prop("checked")];
	var isFriendGuard = [$("#friendGuardL").prop("checked"), $("#friendGuardR").prop("checked")];
	var isAuroraVeil = [$("#auroraVeilL").prop("checked"), $("#auroraVeilR").prop("checked")];
	var isBattery = [$("#batteryL").prop("checked"), $("#batteryR").prop("checked")];
	var isPowerSpot = [$("#powerSpotL").prop("checked"), $("#powerSpotR").prop("checked")];
	// TODO: support switching in as well!
	var isSwitchingOut = [$("#switchingL").prop("checked"), $("#switchingR").prop("checked")];

	var createSide = function (i) {
		return new calc.Side({
			spikes: spikes[i],
			isSR: isSR[i],
			steelsurge: steelsurge[i],
			vinelash: vinelash[i],
			wildfire: wildfire[i],
			cannonade: cannonade[i],
			volcalith: volcalith[i],
			isReflect: isReflect[i],
			isLightScreen: isLightScreen[i],
			isProtected: isProtected[i],
			isSeeded: isSeeded[i],
			isSaltCured: isSaltCured[i],
			isForesight: isForesight[i],
			isTailwind: isTailwind[i],
			isHelpingHand: isHelpingHand[i],
			isFlowerGift: isFlowerGift[i],
			isPowerTrick: isPowerTrick[i],
			isSteelySpirit: isSteelySpirit[i],
			isFriendGuard: isFriendGuard[i],
			isAuroraVeil: isAuroraVeil[i],
			isBattery: isBattery[i],
			isPowerSpot: isPowerSpot[i],
			isSwitching: isSwitchingOut[i] ? 'out' : undefined
		});
	};
	return new calc.Field({
		gameType: gameType,
		terrain: terrain,
		isBeadsOfRuin: isBeadsOfRuin,
		isTabletsOfRuin: isTabletsOfRuin,
		isSwordOfRuin: isSwordOfRuin,
		isVesselOfRuin: isVesselOfRuin,
		weather: weather,
		isMagicRoom: isMagicRoom,
		isWonderRoom: isWonderRoom,
		isGravity: isGravity,
		attackerSide: createSide(0),
		defenderSide: createSide(1)
	});
}

var MODIFIED_STAT_ROWS = ["at", "df", "sa", "sd", "sl", "sp"];

function getDisplayGeneration() {
	if (calc && calc.Generations && typeof calc.Generations.get === "function") {
		return getActiveCalcGeneration();
	}
	return {num: gen};
}

function clampBoostStage(boost) {
	boost = Number(boost) || 0;
	return Math.max(-6, Math.min(6, boost));
}

function getFallbackModifiedStat(stat, boost, generation) {
	boost = clampBoostStage(boost);
	if (generation && generation.num < 3) {
		if (boost >= 0) {
			return Math.min(999, Math.max(1, Math.floor(stat * [1, 1.5, 2, 2.5, 3, 3.5, 4][boost])));
		}
		return Math.min(999, Math.max(1, Math.floor((stat * [100, 66, 50, 40, 33, 28, 25][-boost]) / 100)));
	}
	var modernGenBoostTable = [
		[2, 8], [2, 7], [2, 6], [2, 5], [2, 4], [2, 3], [2, 2],
		[3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2]
	];
	var modifier = modernGenBoostTable[6 + boost];
	return Math.floor((stat * modifier[0]) / modifier[1]);
}

function getModifiedDisplayStat(stat, boost, generation) {
	if (calc && typeof calc.getModifiedStat === "function") {
		return calc.getModifiedStat(stat, clampBoostStage(boost), generation);
	}
	return getFallbackModifiedStat(stat, boost, generation);
}

function getDisplayStatId(legacyStat) {
	var stat = legacyStatToStat(legacyStat);
	return stat === "spc" ? "spa" : stat;
}

function getModifiedDisplayValue(pokemon, legacyStat, generation, field, side) {
	var stat = getDisplayStatId(legacyStat);
	if (stat === "spe" && calc && typeof calc.getFinalSpeed === "function" && field && side) {
		return calc.getFinalSpeed(generation, pokemon, field, side);
	}
	return getModifiedDisplayStat(pokemon.rawStats[stat], pokemon.boosts[stat], generation);
}

function updateModifiedStatsDisplay(poke, pokemon, field, side) {
	if (!poke || !poke.length || !pokemon || !pokemon.rawStats || !pokemon.boosts) return;
	var generation = getDisplayGeneration();
	for (var i = 0; i < MODIFIED_STAT_ROWS.length; i++) {
		var statRow = poke.find("." + MODIFIED_STAT_ROWS[i]);
		var display = statRow.find(".totalMod");
		if (!statRow.length || !display.length || !statRow.find(".boost").length) continue;
		var value = getModifiedDisplayValue(pokemon, MODIFIED_STAT_ROWS[i], generation, field, side);
		display.text(isFinite(value) ? value : "---");
	}
}

function calcHP(poke) {
	var total = calcStat(poke, "hp");
	var $maxHP = poke.find(".max-hp");

	var prevMaxHP = Number($maxHP.attr('data-prev')) || total;
	var $currentHP = poke.find(".current-hp");
	var prevCurrentHP = $currentHP.attr('data-set') ? Math.min(Number($currentHP.val()), prevMaxHP) : prevMaxHP;
	// NOTE: poke.find(".percent-hp").val() is a rounded value!
	var prevPercentHP = 100 * prevCurrentHP / prevMaxHP;

	$maxHP.text(total);
	$maxHP.attr('data-prev', total);

	var newCurrentHP = calcCurrentHP(poke, total, prevPercentHP);
	calcPercentHP(poke, total, newCurrentHP);

	$currentHP.attr('data-set', true);
}

function totalEVs(poke) {
	var totalEVs = 0;
	for (var i = 0; i < LEGACY_STATS[gen].length; i++) {
		var statName = LEGACY_STATS[gen][i];
		var stat = poke.find("." + statName);
		var evs = areEVInputsDisabled() ? 0 : ~~stat.find(".evs").val();
		if (areEVInputsDisabled()) stat.find(".evs").val(0);
		totalEVs += evs;
	}
	poke.find(".totalevs").find(".evs").text(totalEVs);
	return totalEVs;
}

function calcStat(poke, StatID) {
	var stat = poke.find("." + StatID);
	var base = ~~stat.find(".base").val();
	var level = ~~poke.find(".level").val();
	var evs = areEVInputsDisabled() ? 0 : ~~stat.find(".evs").val();
	var nature, ivs;
	if (gen < 3) {
		ivs = ~~stat.find(".dvs").val() * 2;
	} else {
		ivs = ~~stat.find(".ivs").val();
		if (StatID !== "hp") nature = poke.find(".nature").val();
	}
	// Shedinja still has 1 max HP during the effect even if its Dynamax Level is maxed (DaWoblefet)
	var total = calc.calcStat(getActiveCalcGeneration(), legacyStatToStat(StatID), base, ivs, evs, level, nature);
	if (gen > 7 && StatID === "hp" && poke.isDynamaxed && total !== 1) {
		total *= 2;
	}
	stat.find(".total").text(total);
	return total;
}

var GENERATION = {
	'1': 1, 'rb': 1, 'rby': 1,
	'2': 2, 'gs': 2, 'gsc': 2,
	'3': 3, 'rs': 3, 'rse': 3, 'frlg': 3, 'adv': 3,
	'4': 4, 'dp': 4, 'dpp': 4, 'hgss': 4,
	'5': 5, 'bw': 5, 'bw2': 5, 'b2w2': 5,
	'6': 6, 'xy': 6, 'oras': 6,
	'7': 7, 'sm': 7, 'usm': 7, 'usum': 7,
	'8': 8, 'ss': 8,
	'9': 9, 'sv': 9
};

var SETDEX = [
	{},
	typeof SETDEX_RBY === 'undefined' ? {} : SETDEX_RBY,
	typeof SETDEX_GSC === 'undefined' ? {} : SETDEX_GSC,
	typeof SETDEX_ADV === 'undefined' ? {} : SETDEX_ADV,
	typeof SETDEX_DPP === 'undefined' ? {} : SETDEX_DPP,
	typeof SETDEX_BW === 'undefined' ? {} : SETDEX_BW,
	typeof SETDEX_XY === 'undefined' ? {} : SETDEX_XY,
	typeof SETDEX_SM === 'undefined' ? {} : SETDEX_SM,
	typeof SETDEX_SS === 'undefined' ? {} : SETDEX_SS,
	typeof SETDEX_SV === 'undefined' ? {} : SETDEX_SV,
];

/*
 * Converts an object that has the hierarchy Format -> Pokemon -> Sets
 * into one that has the hierarchy Pokemon -> Format -> Sets
 * An example for Gen 9 Duraludon would be:
 * {
 *		Randoms: {
 *			...
 *			Duraludon: {...},
 *			...
 *		},
 *		Doubles Randoms: {
 *			...
 *			Duraludon: {...},
 *			...
 *		},
 *		Baby Randoms: {
 *			...
 *			Duraludon: {...},
 *			...
 *		}
 * }
 * getting converted into:
 * {
 *		...
 *		Duraludon: {
 *			Randoms: {...},
 *			Doubles Randoms: {...},
 *			Baby Randoms: {...}
 *		}
 *		...
 * }
 */
function formatRandSets(gen) {
	var combined = {};

	for (var format in gen) {
		var formatSets = gen[format];
		for (var pokemon in formatSets) {
			var sets = formatSets[pokemon];
			if (!(pokemon in combined)) {
				combined[pokemon] = {};
			}
			combined[pokemon][format] = sets;
		}
	}

	return combined;
}

// Creates a single dictionary for Gen 8 & Gen 9 Random Battles formats
var GEN8RANDSETS = formatRandSets({
	"Randoms": typeof GEN8RANDOMBATTLE === 'undefined' ? {} : GEN8RANDOMBATTLE,
	"Doubles Randoms": typeof GEN8RANDOMDOUBLESBATTLE === 'undefined' ? {} : GEN8RANDOMDOUBLESBATTLE,
	"BDSP Randoms": typeof GEN8BDSPRANDOMBATTLE === 'undefined' ? {} : GEN8BDSPRANDOMBATTLE,
});

var GEN9RANDSETS = formatRandSets({
	"Randoms": typeof GEN9RANDOMBATTLE === 'undefined' ? {} : GEN9RANDOMBATTLE,
	"Doubles Randoms": typeof GEN9RANDOMDOUBLESBATTLE === 'undefined' ? {} : GEN9RANDOMDOUBLESBATTLE,
	"Baby Randoms": typeof GEN9BABYRANDOMBATTLE === 'undefined' ? {} : GEN9BABYRANDOMBATTLE,
});

var RANDDEX = [
	{},
	typeof GEN1RANDOMBATTLE === 'undefined' ? {} : GEN1RANDOMBATTLE,
	typeof GEN2RANDOMBATTLE === 'undefined' ? {} : GEN2RANDOMBATTLE,
	typeof GEN3RANDOMBATTLE === 'undefined' ? {} : GEN3RANDOMBATTLE,
	typeof GEN4RANDOMBATTLE === 'undefined' ? {} : GEN4RANDOMBATTLE,
	typeof GEN5RANDOMBATTLE === 'undefined' ? {} : GEN5RANDOMBATTLE,
	typeof GEN6RANDOMBATTLE === 'undefined' ? {} : GEN6RANDOMBATTLE,
	typeof GEN7RANDOMBATTLE === 'undefined' ? {} : GEN7RANDOMBATTLE,
	GEN8RANDSETS,
	GEN9RANDSETS,
];
var gen, genWasChanged, notation, pokedex, setdex, randdex, typeChart, moves, abilities, items, calcHP, calcStat, GENERATION;

$(".gen").change(function () {
	/*eslint-disable */
	var previousGeneration = gen;
	gen = ~~$(this).val() || 9;
	if (gen < 3 && $("#doubles-format").prop("checked")) {
		$("#singles-format").prop("checked", true).change();
	}
	GENERATION = getActiveCalcGeneration();
	if (typeof window.removeTrainerSetsFromDex === "function") window.removeTrainerSetsFromDex();
	removeAllCustomSetsFromDex(previousGeneration || gen);
	var activeCustomSets = readCustomSets();
	addCustomSetsToDex(activeCustomSets);
	var params = new URLSearchParams(window.location.search);
	if (getActiveRomHackProfile() || gen === 9) {
		params.delete('gen');
		params = '' + params;
		if (window.history && window.history.replaceState) {
			window.history.replaceState({}, document.title, window.location.pathname + (params.length ? '?' + params : ''));
		}
	} else {
		params.set('gen', gen);
		if (window.history && window.history.pushState) {
			params.sort();
			var path = window.location.pathname + '?' + params;
			window.history.pushState({}, document.title, path);
		}
	}
	genWasChanged = true;
	/* eslint-enable */
	// declaring these variables with var here makes z moves not work; TODO
	pokedex = getActivePokedex();
	setdex = SETDEX[gen];
	randdex = RANDDEX[gen];
	if ('Aegislash' in randdex) randdex['Aegislash-Shield'] = randdex['Aegislash'];
	typeChart = getActiveTypeChart();
	moves = getActiveMoves();
	items = getActiveItems();
	abilities = getActiveAbilities();
	clearField();
	if (typeof window.resetImportedSetFilters === "function") window.resetImportedSetFilters();
	else {
		$(".imported-sets-only").prop("checked", false);
		loadDefaultLists();
	}
	$(".gen-specific.g" + gen).show();
	$(".gen-specific").not(".g" + gen).hide();
	updateProfileEVControls();
	updateProfileZMoveControls();
	$("input:radio[name='format']").change();
	var typeOptions = getSelectOptions(Object.keys(typeChart));
	$("select.type1, select.move-type").find("option").remove().end().append(typeOptions);
	$("select.teraType").find("option").remove().end().append(getSelectOptions(Object.keys(typeChart).slice(1)));
	$("select.type2").find("option").remove().end().append("<option value=\"\">(none)</option>" + typeOptions);
	populateTeamBoxTypeFilter();
	var moveOptions = getSelectOptions(Object.keys(moves), true);
	$("select.move-selector").find("option").remove().end().append(moveOptions);
	var abilityOptions = getSelectOptions(abilities, true);
	$("select.ability").find("option").remove().end().append("<option value=\"\">(other)</option>" + abilityOptions);
	var itemOptions = getSelectOptions(items, true);
	$("select.item").find("option").remove().end().append("<option value=\"\">(none)</option>" + itemOptions);

	syncTeamBoxWithCustomSets(activeCustomSets);
	initializeColorCodeOptions();
	if (typeof window.updateImportedSetOptionsVisibility === "function") {
		window.updateImportedSetOptionsVisibility(hasAnyCustomSets(activeCustomSets));
	}
	applyDefaultSetSelections();
});

function getFirstValidSetOption() {
	var sets = getSetOptions();
	// NB: The first set is never valid, so we start searching after it.
	for (var i = 1; i < sets.length; i++) {
		if (sets[i].id && sets[i].id.indexOf('(Blank Set)') === -1) return sets[i];
	}
	return undefined;
}

$(".notation").change(function () {
	notation = $(this).val();
});

function clearField(preserveFormat) {
	if (!preserveFormat) $("#singles-format").prop("checked", true);
	$(".field-info input.calc-trigger").each(function () {
		if (this.name === "format" || this.name === "defaultLevel") return;
		this.checked = this.type === "radio" && (this.value === "" || this.value === "0");
	});
	lastManualWeather = "";
	lastAutoWeather = ["", ""];
	lastManualTerrain = "";
	lastAutoTerrain = ["", ""];
	if (stickyWeather) stickyWeather.clearStickyWeather();
	window.dispatchEvent(new CustomEvent("kmcalculator:fieldchange"));
}

function resetTrainerBattlefield() {
	clearField(true);
	// Reapply the player's current ability before loading the new trainer's lead.
	autosetWeather($("#p1 .ability").val(), 0);
	autosetTerrain($("#p1 .ability").val(), 0);
	getTerrainEffects.call($("#p1 .ability")[0]);
	if (typeof window.PC_HANDLER === "function") window.PC_HANDLER();
	window.dispatchEvent(new CustomEvent("kmcalculator:fieldchange"));
}

function resetCurrentBattlefield() {
	clearField(true);
	["#p1", "#p2"].forEach(function (side, index) {
		autosetWeather($(side + " .ability").val(), index);
		autosetTerrain($(side + " .ability").val(), index);
	});
	$(".poke-info").each(function () { getTerrainEffects.call($(this).find(".ability")[0]); autosetQP($(this)); });
	if (typeof window.PC_HANDLER === "function") window.PC_HANDLER();
	window.dispatchEvent(new CustomEvent("kmcalculator:fieldchange"));
}

function getSetOptions(sets) {
	var setsHolder = sets;
	if (setsHolder === undefined) {
		setsHolder = pokedex;
	}
	var pokeNames = Object.keys(setsHolder);
	pokeNames.sort();
	var setOptions = [];
	for (var i = 0; i < pokeNames.length; i++) {
		var pokeName = pokeNames[i];
		setOptions.push({
			pokemon: pokeName,
			text: pokeName
		});
		if ($("#randoms").prop("checked")) {
			if (pokeName in randdex) {
				if (gen >= 8) {
					// The Gen 8 and 9 randdex contains information for multiple Random Battles formats for each Pokemon.
					// Duraludon, for example, has data for Randoms, Doubles Randoms, and Baby Randoms.
					// Therefore, all of this information has to be populated within the set options.
					var randTypes = Object.keys(randdex[pokeName]);
					for (var j = 0; j < randTypes.length; j++) {
						var rand = randTypes[j];
						setOptions.push({
							pokemon: pokeName + (rand === "Randoms" ? "" : " (" + rand.split(' ')[0] + ")"),
							set: rand + ' Set',
							text: pokeName + " (" + rand + ")",
							id: pokeName + " (" + rand + ")"
						});
					}
				} else {
					setOptions.push({
						pokemon: pokeName,
						set: 'Randoms Set',
						text: pokeName + " (Randoms)",
						id: pokeName + " (Randoms)"
					});
				}
			}
		} else {
			if (pokeName in setdex) {
				var setNames = Object.keys(setdex[pokeName]);
				for (var j = 0; j < setNames.length; j++) {
					var setName = setNames[j];
					setOptions.push({
						pokemon: pokeName,
						set: setName,
						text: pokeName + " (" + setName + ")",
						id: pokeName + " (" + setName + ")",
						isCustom: setdex[pokeName][setName].isCustomSet,
						nickname: setdex[pokeName][setName].nickname || ""
					});
				}
			}
			setOptions.push({
				pokemon: pokeName,
				set: "Blank Set",
				text: pokeName + " (Blank Set)",
				id: pokeName + " (Blank Set)"
			});
		}
	}
	return setOptions;
}

function getUninitializedSelect2(selector) {
	return selector.filter(function () {
		return !$(this).data("select2");
	});
}

function destroySelect2IfInitialized(selector) {
	selector.each(function () {
		var control = $(this);
		if (control.data("select2")) control.select2("destroy");
	});
}

function getSelectOptions(arr, sort, defaultOption) {
	if (sort) {
		arr.sort();
	}
	var r = '';
	for (var i = 0; i < arr.length; i++) {
		var optionText = escapeHtml(arr[i]);
		r += '<option value="' + optionText + '" ' + (defaultOption === i ? 'selected' : '') + '>' + optionText + '</option>';
	}
	return r;
}

var stickyWeather = (function () {
	var lastClicked = '';
	$(".weather").click(function () {
		if (this.id === lastClicked) {
			$(this).toggleClass("locked-weather");
		} else {
			$('.locked-weather').removeClass('locked-weather');
		}
		lastClicked = this.id;
	});

	return {
		clearStickyWeather: function () {
			lastClicked = null;
			$('.locked-weather').removeClass('locked-weather');
		}
	};
})();

var stickyMoves = (function () {
	var lastClicked = 'resultMoveL1';
	$(".result-move").click(function () {
		if (this.id === lastClicked) {
			$(this).toggleClass("locked-move");
		} else {
			$('.locked-move').removeClass('locked-move');
		}
		lastClicked = this.id;
	});

	return {
		clearStickyMove: function () {
			lastClicked = null;
			$('.locked-move').removeClass('locked-move');
		},
		setSelectedMove: function (slot) {
			lastClicked = slot;
		},
		getSelectedSide: function () {
			if (lastClicked) {
				if (lastClicked.indexOf('resultMoveL') !== -1) {
					return 'p1';
				} else if (lastClicked.indexOf('resultMoveR') !== -1) {
					return 'p2';
				}
			}
			return null;
		}
	};
})();

function isPokeInfoGrounded(pokeInfo) {
	var teraType = pokeInfo.find(".teraToggle").is(":checked") ? pokeInfo.find(".teraType").val() : undefined;
	return $("#gravity").prop("checked") || (
		  teraType ? teraType !== "Flying" : pokeInfo.find(".type1").val() !== "Flying" &&
        teraType ? teraType !== "Flying" : pokeInfo.find(".type2").val() !== "Flying" &&
        pokeInfo.find(".ability").val() !== "Levitate" &&
        pokeInfo.find(".item").val() !== "Air Balloon"
	);
}

function getTerrainEffects() {
	var className = $(this).prop("className");
	className = className.substring(0, className.indexOf(" "));
	switch (className) {
	case "type1":
	case "type2":
	case "teraType":
	case "teraToggle":
	case "item":
		var id = $(this).closest(".poke-info").prop("id");
		var terrainValue = $("input:checkbox[name='terrain']:checked").val();
		if (terrainValue === "Electric") {
			$("#" + id).find("[value='Asleep']").prop("disabled", isPokeInfoGrounded($("#" + id)));
		} else if (terrainValue === "Misty") {
			$("#" + id).find(".status").prop("disabled", isPokeInfoGrounded($("#" + id)));
		}
		break;
	case "ability":
		// with autoset, ability change may cause terrain change, need to consider both sides
		var terrainValue = $("input:checkbox[name='terrain']:checked").val();
		if (terrainValue === "Electric") {
			$("#p1").find(".status").prop("disabled", false);
			$("#p2").find(".status").prop("disabled", false);
			$("#p1").find("[value='Asleep']").prop("disabled", isPokeInfoGrounded($("#p1")));
			$("#p2").find("[value='Asleep']").prop("disabled", isPokeInfoGrounded($("#p2")));
		} else if (terrainValue === "Misty") {
			$("#p1").find(".status").prop("disabled", isPokeInfoGrounded($("#p1")));
			$("#p2").find(".status").prop("disabled", isPokeInfoGrounded($("#p2")));
		} else {
			$("#p1").find("[value='Asleep']").prop("disabled", false);
			$("#p1").find(".status").prop("disabled", false);
			$("#p2").find("[value='Asleep']").prop("disabled", false);
			$("#p2").find(".status").prop("disabled", false);
		}
		break;
	default:
		$("input:checkbox[name='terrain']").not(this).prop("checked", false);
		if ($(this).prop("checked") && $(this).val() === "Electric") {
			// need to enable status because it may be disabled by Misty Terrain before.
			$("#p1").find(".status").prop("disabled", false);
			$("#p2").find(".status").prop("disabled", false);
			$("#p1").find("[value='Asleep']").prop("disabled", isPokeInfoGrounded($("#p1")));
			$("#p2").find("[value='Asleep']").prop("disabled", isPokeInfoGrounded($("#p2")));
		} else if ($(this).prop("checked") && $(this).val() === "Misty") {
			$("#p1").find(".status").prop("disabled", isPokeInfoGrounded($("#p1")));
			$("#p2").find(".status").prop("disabled", isPokeInfoGrounded($("#p2")));
		} else {
			$("#p1").find("[value='Asleep']").prop("disabled", false);
			$("#p1").find(".status").prop("disabled", false);
			$("#p2").find("[value='Asleep']").prop("disabled", false);
			$("#p2").find(".status").prop("disabled", false);
		}
		break;
	}
}

function loadDefaultLists() {
	var selectors = getUninitializedSelect2($("input.set-selector"));
	if (!selectors.length) return;
	selectors.select2({
		formatResult: function (object) {
			if ($("#randoms").prop("checked")) {
				return escapeHtml(object.pokemon);
			} else {
				return object.set ? ("&nbsp;&nbsp;&nbsp;" + escapeHtml(object.set)) : ("<b>" + escapeHtml(object.text) + "</b>");
			}
		},
		query: function (query) {
			var pageSize = 30;
			var results = [];
			var options = getSetOptions();
			for (var i = 0; i < options.length; i++) {
				var option = options[i];
				var pokeName = option.pokemon.toUpperCase();
				if (!query.term || query.term.toUpperCase().split(" ").every(function (term) {
					return pokeName.indexOf(term) === 0 || pokeName.indexOf("-" + term) >= 0 || pokeName.indexOf(" " + term) >= 0;
				})) {
					if ($("#randoms").prop("checked")) {
						if (option.id) results.push(option);
					} else {
						results.push(option);
					}
				}
			}
			query.callback({
				results: results.slice((query.page - 1) * pageSize, query.page * pageSize),
				more: results.length >= query.page * pageSize
			});
		},
		initSelection: function (element, callback) {
			callback(getDefaultSetOptionForSelector(element));
		}
	});
	$(".poke-info.trainer-mode input.set-selector").each(function () {
		var selector = $(this);
		selector.addClass("trainer-set-selector-input");
		if (selector.data("select2")) selector.select2("container").addClass("trainer-set-selector-container");
	});
}

function allPokemon(selector) {
	var allSelector = "";
	for (var i = 0; i < $(".poke-info").length; i++) {
		if (i > 0) {
			allSelector += ", ";
		}
		allSelector += "#p" + (i + 1) + " " + selector;
	}
	return allSelector;
}

function loadCustomList(id) {
	var selector = $("#" + id + " input.set-selector");
	destroySelect2IfInitialized(selector);
	selector.select2({
		formatResult: function (set) {
			return escapeHtml(set.nickname ? set.pokemon + " (" + set.nickname + ")" : set.id);
		},
		query: function (query) {
			var pageSize = 30;
			var results = [];
			var options = getSetOptions();
			for (var i = 0; i < options.length; i++) {
				var option = options[i];
				var pokeName = option.pokemon.toUpperCase();
				var setName = option.set ? option.set.toUpperCase() : option.set;
				if (option.isCustom && option.set && (!query.term || query.term.toUpperCase().split(" ").every(function (term) {
					return pokeName.indexOf(term) === 0 || pokeName.indexOf("-" + term) >= 0 || pokeName.indexOf(" " + term) >= 0 || setName.indexOf(term) === 0 || setName.indexOf("-" + term) >= 0 || setName.indexOf(" " + term) >= 0;
				}))) {
					results.push(option);
				}
			}
			query.callback({
				results: results.slice((query.page - 1) * pageSize, query.page * pageSize),
				more: results.length >= query.page * pageSize
			});
		},
		initSelection: function (element, callback) {
			var value = element.val();
			var data = value ? {id: value, text: value} : "";
			callback(data);
		}
	});
}

$(document).ready(function () {
	var params = new URLSearchParams(window.location.search);
	var g = GENERATION[params.get('gen')] || 9;
	$("#gen" + g).prop("checked", true);
	$("#gen" + g).change();
	$("#percentage").prop("checked", true);
	$("#percentage").change();
	$("#singles-format").prop("checked", true);
	$("#singles-format").change();
	loadDefaultLists();
	$(".move-selector").select2({
		dropdownAutoWidth: true,
		matcher: function (term, text) {
			// 2nd condition is for Hidden Power
			return text.toUpperCase().indexOf(term.toUpperCase()) === 0 || text.toUpperCase().indexOf(" " + term.toUpperCase()) >= 0;
		}
	});
	applyDefaultSetSelections();
	updateProfileEVControls();
	installTeamBoxControls();
	$(".terrain-trigger").bind("change keyup", getTerrainEffects);
});

/* Click-to-copy function */
$("#mainResult").click(function () {
	navigator.clipboard.writeText($("#mainResult").text()).then(function () {
		document.getElementById('tooltipText').style.visibility = 'visible';
		setTimeout(function () {
			document.getElementById('tooltipText').style.visibility = 'hidden';
		}, 1500);
	});
});
