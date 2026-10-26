/*global KMTrainerDataRegistry, SETDEX, TRAINERDEX, clearDoublesSlotSide, createPokemonSprite, gen, getPokemonLegendTitle, getZeroEVs, importPokemonSaveFile, importSwordShieldSaveFile, isDoublesFormatSelected, readCustomSets, rebuildKMCalculatorTrainerIndex, rebuildRoyalSwordTrainerIndex, setDoublesActiveSlot, setDoublesSlotSelection, setdex, showDoublesSlotMenu, syncTeamBoxWithCustomSets, updateDoublesSlotHighlights, updateDoublesSlotSummaries, updatePokemonLegendSprite */

var trainerDataRegistry = null;
var importedTrainerProfileIds = {};
var builtInTrainerDataInstalled = false;
var trainerBattlefieldKey = null;

function getMovesetImportStorage() {
	if (typeof window.getKMCalculatorStorage === "function") return window.getKMCalculatorStorage();
	if (typeof window.getRoyalSwordStorage === "function") return window.getRoyalSwordStorage();
	return window.localStorage;
}

function getMovesetCustomSetsStorageKey() {
	return typeof window.getKMCalculatorCustomSetsStorageKey === "function" ?
		window.getKMCalculatorCustomSetsStorageKey() : "customsets";
}

function getTrainerGeneration() {
	if (typeof gen === "number" && gen >= 1 && gen <= 9) return gen;
	var selected = $(".gen:checked").val();
	return ~~selected || 8;
}

function getActiveTrainerBinding() {
	var registry = window.kmRomHackRegistry;
	var context = registry && typeof registry.getActiveContext === "function" ? registry.getActiveContext() : null;
	var profile = context && context.profile ? context.profile :
		(registry && typeof registry.getActiveProfile === "function" ? registry.getActiveProfile() : null);
	if (!profile) return {profileId: "__no-active-rom-hack__", packId: ""};
	return {
		profileId: profile.id || "__no-active-rom-hack__",
		packId: context && context.trainerPackId ? context.trainerPackId :
			(profile.trainerData && profile.trainerData.packId ? profile.trainerData.packId : "")
	};
}

function getRawTrainerEntries() {
	if (typeof TRAINERDEX === "undefined") return [];
	if (Array.isArray(TRAINERDEX)) return TRAINERDEX;
	var trainers = [];
	var trainerNames = Object.keys(TRAINERDEX);
	trainerNames.sort();
	for (var i = 0; i < trainerNames.length; i++) {
		var trainerName = trainerNames[i];
		trainers.push({
			area: "Trainers",
			trainer: trainerName,
			pokemon: TRAINERDEX[trainerName]
		});
	}
	return trainers;
}

function createRoyalSwordTrainerPack() {
	var trainers = getRawTrainerEntries();
	var normalized = [];
	for (var i = 0; i < trainers.length; i++) {
		var entry = $.extend(true, {}, trainers[i]);
		entry.id = entry.id || "trainer-" + (i + 1);
		normalized.push(entry);
	}
	return {
		schema: "km-calculator.trainer-pack",
		schemaVersion: 1,
		id: "pokemon-royal-sword",
		name: "Pokemon Royal Sword",
		version: "1",
		generation: 8,
		game: "Pokemon Sword and Shield",
		mod: "Pokemon Royal Sword",
		authors: [{name: "Matroskin", url: "https://github.com/KotMatrosk1n"}],
		source: {
			name: "KM Companion bundled trainer data",
			url: "https://github.com/KotMatrosk1n/KM-Companion"
		},
		license: "MIT",
		trainers: normalized
	};
}

function createImportedTrainerProfile(pack) {
	var authors = [];
	for (var i = 0; i < pack.authors.length; i++) {
		authors.push({name: pack.authors[i].name, role: "Trainer data"});
	}
	return {
		id: pack.profileId || pack.id,
		name: pack.mod || pack.name,
		shortName: pack.mod || pack.name,
		version: pack.version,
		baseGeneration: pack.generations[0],
		calcProfile: "canonical",
		trainerData: {packId: pack.id},
		saveImport: {generation: pack.generations[0]},
		tile: {
			description: pack.description || pack.name + " trainer data over Generation " + pack.generations[0] + ".",
			icon: "./img/km-companion-icon.png",
			badge: "Generation " + pack.generations[0]
		},
		attribution: {
			authors: authors,
			source: pack.source,
			license: {name: pack.license}
		}
	};
}

function getImportedTrainerProfileOwner(profileId) {
	var marker = importedTrainerProfileIds[profileId];
	if (typeof marker === "string") return marker;
	if (marker && marker.packId) return marker.packId;
	if (marker === true && window.kmRomHackRegistry) {
		var profile = window.kmRomHackRegistry.getProfile(profileId);
		return profile && profile.trainerData ? profile.trainerData.packId : "";
	}
	return "";
}

function isOwnedImportedTrainerProfile(profileId, packId) {
	var registry = window.kmRomHackRegistry;
	var marker = importedTrainerProfileIds[profileId];
	var profile = registry && registry.getProfile(profileId);
	if (!profile || getImportedTrainerProfileOwner(profileId) !== packId) return false;
	if (marker && marker.profile) return trainerProfilesMatch(marker.profile, profile);
	return !!(profile.trainerData && profile.trainerData.packId === packId);
}

function findImportedTrainerProfileForPack(packId) {
	var profileIds = Object.keys(importedTrainerProfileIds);
	for (var i = 0; i < profileIds.length; i++) {
		if (isOwnedImportedTrainerProfile(profileIds[i], packId)) return profileIds[i];
	}
	return "";
}

function synchronizeImportedTrainerProfile(pack) {
	var registry = window.kmRomHackRegistry;
	if (!registry || !pack) return false;
	var profileId = pack.profileId || pack.id;
	var previousProfileId = findImportedTrainerProfileForPack(pack.id);
	if (previousProfileId && (previousProfileId !== profileId || pack.generations.length !== 1)) {
		registry.unregisterProfile(previousProfileId);
		delete importedTrainerProfileIds[previousProfileId];
	}
	if (pack.generations.length !== 1) return false;

	var existing = registry.getProfile(profileId);
	var owner = getImportedTrainerProfileOwner(profileId);
	var profile = createImportedTrainerProfile(pack);
	if (!existing) {
		var registered = registry.registerProfile(profile);
		importedTrainerProfileIds[profileId] = {packId: pack.id, profile: registered};
		return true;
	}
	if (owner === pack.id && isOwnedImportedTrainerProfile(profileId, pack.id)) {
		registered = registry.registerProfile(profile, {replace: true});
		importedTrainerProfileIds[profileId] = {packId: pack.id, profile: registered};
		return true;
	}
	return false;
}

function getImportedTrainerProfileSnapshot(pack) {
	var registry = window.kmRomHackRegistry;
	if (!registry || !pack) return null;
	var activeContext = typeof registry.getActiveContext === "function" ? registry.getActiveContext() : null;
	var profileIds = [];
	var previousProfileId = findImportedTrainerProfileForPack(pack.id);
	var targetProfileId = pack.profileId || pack.id;
	if (previousProfileId) profileIds.push(previousProfileId);
	if (profileIds.indexOf(targetProfileId) === -1) profileIds.push(targetProfileId);
	var snapshot = {
		registry: registry,
		profileIds: profileIds,
		profiles: {},
		markers: {},
		activeProfileId: activeContext && activeContext.profile ? activeContext.profile.id : "",
		activeExtraContext: activeContext && activeContext.extra ? activeContext.extra : {}
	};
	for (var i = 0; i < profileIds.length; i++) {
		var profileId = profileIds[i];
		snapshot.profiles[profileId] = registry.getProfile(profileId);
		snapshot.markers[profileId] = Object.prototype.hasOwnProperty.call(importedTrainerProfileIds, profileId) ?
			{present: true, value: importedTrainerProfileIds[profileId]} : {present: false};
	}
	return snapshot;
}

function trainerProfilesMatch(left, right) {
	return JSON.stringify(left) === JSON.stringify(right);
}

function restoreImportedTrainerProfileSnapshot(snapshot) {
	if (!snapshot) return;
	var firstError = null;
	var changedProfileIds = {};
	for (var i = 0; i < snapshot.profileIds.length; i++) {
		var profileId = snapshot.profileIds[i];
		var expected = snapshot.profiles[profileId];
		var current = snapshot.registry.getProfile(profileId);
		try {
			if (expected && !current) {
				snapshot.registry.registerProfile(expected);
				changedProfileIds[profileId] = true;
			} else if (expected && !trainerProfilesMatch(expected, current)) {
				snapshot.registry.registerProfile(expected, {replace: true});
				changedProfileIds[profileId] = true;
			} else if (!expected && current) {
				snapshot.registry.unregisterProfile(profileId);
				changedProfileIds[profileId] = true;
			}
		} catch (error) {
			if (!firstError) firstError = error;
		}
		if (snapshot.markers[profileId].present) {
			importedTrainerProfileIds[profileId] = snapshot.markers[profileId].value;
		} else {
			delete importedTrainerProfileIds[profileId];
		}
	}
	try {
		var activeProfile = typeof snapshot.registry.getActiveProfile === "function" ?
			snapshot.registry.getActiveProfile() : null;
		if (snapshot.activeProfileId && typeof snapshot.registry.activateProfile === "function" &&
			(!activeProfile || activeProfile.id !== snapshot.activeProfileId ||
				changedProfileIds[snapshot.activeProfileId])) {
			snapshot.registry.activateProfile(snapshot.activeProfileId, snapshot.activeExtraContext);
		} else if (!snapshot.activeProfileId && activeProfile &&
			typeof snapshot.registry.clearActiveProfile === "function") {
			snapshot.registry.clearActiveProfile();
		}
	} catch (error) {
		if (!firstError) firstError = error;
	}
	if (firstError) throw firstError;
}

function getTrainerValidationGeneration(profile, context, generation) {
	var provider = context && context.resolvedProvider;
	if (profile && Number(profile.baseGeneration) === Number(generation) && provider) {
		if (typeof provider.getGeneration === "function") return provider.getGeneration(calc, profile, context);
		if (typeof provider === "function") return provider(calc, profile, context);
	}
	return calc.Generations.get(generation);
}

function getTrainerValidationLegacyData(provider, kind, base, profile, context) {
	if (provider && typeof provider.getLegacyData === "function") {
		return provider.getLegacyData(kind, base, calc, profile, context) || base;
	}
	return base;
}

function addNamedEntries(target, entries) {
	if (!entries) return;
	Array.from(entries).forEach(function (entry) {
		var name = typeof entry === "string" ? entry : entry && entry.name;
		if (name) target[name] = true;
	});
}

function getTrainerValidationData(pack, generation) {
	var registry = window.kmRomHackRegistry;
	var profile = registry && typeof registry.getProfile === "function" ? registry.getProfile(pack.profileId) : null;
	var context = profile && typeof registry.getActivationContext === "function" ?
		registry.getActivationContext(profile) : null;
	var provider = context && Number(profile.baseGeneration) === Number(generation) ? context.resolvedProvider : null;
	var generationData = getTrainerValidationGeneration(profile, context, generation);
	var species = getTrainerValidationLegacyData(provider, "species", calc.SPECIES[generation] || {}, profile, context);
	var moves = getTrainerValidationLegacyData(provider, "moves", calc.MOVES[generation] || {}, profile, context);
	var items = getTrainerValidationLegacyData(provider, "items", calc.ITEMS[generation] || [], profile, context);
	var abilities = getTrainerValidationLegacyData(provider, "abilities", calc.ABILITIES[generation] || [], profile, context);
	var types = getTrainerValidationLegacyData(provider, "types", calc.TYPE_CHART[generation] || {}, profile, context);
	var result = {
		species: {},
		moves: {},
		items: {},
		abilities: {},
		types: {}
	};
	addNamedEntries(result.species, Object.keys(species));
	addNamedEntries(result.moves, Object.keys(moves));
	addNamedEntries(result.items, items);
	addNamedEntries(result.abilities, abilities);
	addNamedEntries(result.types, Object.keys(types));
	if (generationData) {
		addNamedEntries(result.species, generationData.species);
		addNamedEntries(result.moves, generationData.moves);
		addNamedEntries(result.items, generationData.items);
		addNamedEntries(result.abilities, generationData.abilities);
		addNamedEntries(result.types, generationData.types);
	}
	return result;
}

function validateTrainerPackData(pack) {
	var issues = [];
	var validationByGeneration = {};
	for (var trainerIndex = 0; trainerIndex < pack.trainers.length; trainerIndex++) {
		var trainer = pack.trainers[trainerIndex];
		for (var generationIndex = 0; generationIndex < trainer.generations.length; generationIndex++) {
			var generation = trainer.generations[generationIndex];
			var data = validationByGeneration[generation] ||
				(validationByGeneration[generation] = getTrainerValidationData(pack, generation));
			for (var pokemonIndex = 0; pokemonIndex < trainer.pokemon.length; pokemonIndex++) {
				var pokemon = trainer.pokemon[pokemonIndex];
				var path = "trainers[" + trainerIndex + "].pokemon[" + pokemonIndex + "]";
				if (!data.species[pokemon.species]) issues.push(path + ".species: " + pokemon.species + " is unavailable in Generation " + generation);
				if (pokemon.item && !data.items[pokemon.item]) issues.push(path + ".item: " + pokemon.item + " is unavailable in Generation " + generation);
				if (pokemon.ability && !data.abilities[pokemon.ability]) issues.push(path + ".ability: " + pokemon.ability + " is unavailable in Generation " + generation);
				if (pokemon.teraType && !data.types[pokemon.teraType]) issues.push(path + ".teraType: " + pokemon.teraType + " is unavailable in Generation " + generation);
				for (var moveIndex = 0; moveIndex < (pokemon.moves || []).length; moveIndex++) {
					if (!data.moves[pokemon.moves[moveIndex]]) {
						issues.push(path + ".moves[" + moveIndex + "]: " + pokemon.moves[moveIndex] +
							" is unavailable in Generation " + generation);
					}
				}
			}
		}
	}
	if (issues.length) throw new KMTrainerDataRegistry.TrainerDataError("Trainer pack data is not available in its declared profile", issues);
	return pack;
}

function importTrainerPack(value) {
	var pack = KMTrainerDataRegistry.normalizePack(value);
	validateTrainerPackData(pack);
	var snapshot = getImportedTrainerProfileSnapshot(pack);
	try {
		synchronizeImportedTrainerProfile(pack);
		if (snapshot && snapshot.activeProfileId &&
			snapshot.profileIds.indexOf(snapshot.activeProfileId) !== -1) {
			var replacementProfileId = pack.profileId || pack.id;
			if (pack.generations.length === 1 && snapshot.registry.getProfile(replacementProfileId)) {
				snapshot.registry.activateProfile(replacementProfileId, snapshot.activeExtraContext);
			}
		}
		var imported = trainerDataRegistry.importPack(pack);
		if (snapshot && snapshot.activeProfileId && pack.generations.length !== 1 &&
			snapshot.profileIds.indexOf(snapshot.activeProfileId) !== -1 &&
			typeof snapshot.registry.requestChooser === "function") {
			snapshot.registry.requestChooser("trainer-data-replaced");
		}
		return imported;
	} catch (error) {
		try {
			restoreImportedTrainerProfileSnapshot(snapshot);
		} catch (restoreError) {
			error.restoreError = restoreError;
		}
		throw error;
	}
}

function registerImportedTrainerProfile(pack) {
	return synchronizeImportedTrainerProfile(pack);
}

function unregisterImportedTrainerProfiles() {
	var registry = window.kmRomHackRegistry;
	if (!registry) return;
	var profileIds = Object.keys(importedTrainerProfileIds);
	for (var i = 0; i < profileIds.length; i++) {
		var profileId = profileIds[i];
		var packId = getImportedTrainerProfileOwner(profileId);
		if (packId && isOwnedImportedTrainerProfile(profileId, packId)) registry.unregisterProfile(profileId);
	}
	importedTrainerProfileIds = {};
}

function initializeTrainerDataRegistry() {
	if (typeof KMTrainerDataRegistry === "undefined") return;
	if (trainerDataRegistry) {
		if (!builtInTrainerDataInstalled) {
			var availableBuiltIn = createRoyalSwordTrainerPack();
			if (availableBuiltIn.trainers.length) {
				trainerDataRegistry.setBuiltInPack(availableBuiltIn);
				builtInTrainerDataInstalled = true;
			}
		}
		return;
	}
	var storage = null;
	try {
		storage = getMovesetImportStorage();
	} catch (error) {}
	trainerDataRegistry = KMTrainerDataRegistry.createRegistry({storage: storage});
	var builtIn = createRoyalSwordTrainerPack();
	if (builtIn.trainers.length) {
		trainerDataRegistry.setBuiltInPack(builtIn);
		builtInTrainerDataInstalled = true;
	}
	var report = trainerDataRegistry.load();
	var importedPacks = trainerDataRegistry.getImportedPacks();
	for (var i = 0; i < importedPacks.length; i++) registerImportedTrainerProfile(importedPacks[i]);
	if (report.errors.length && window.console && console.warn) {
		console.warn("Some imported trainer packs could not be restored:", report.errors);
	}
}

function rebuildTrainerRuntimeIndex() {
	if (typeof rebuildKMCalculatorTrainerIndex === "function") rebuildKMCalculatorTrainerIndex();
	else if (typeof rebuildRoyalSwordTrainerIndex === "function") rebuildRoyalSwordTrainerIndex();
}

function placeBsBtn() {
	var importButtons =
		"<div class='import-actions'>" +
			"<button id='import' type='button' class='bs-btn bs-btn-default'>Import From Text</button>" +
			"<button id='import-save' type='button' class='bs-btn bs-btn-default'>Import From Save</button>" +
			"<button id='import-trainer-data' type='button' class='bs-btn bs-btn-default'>Import Trainer Data</button>" +
			"<button id='remove-trainer-data' type='button' class='bs-btn bs-btn-default'>Remove Imported Trainer Data</button>" +
			"<input id='save-import-file' class='save-import-file' type='file' />" +
			"<input id='trainer-data-import-file' class='save-import-file' type='file' accept='.json,application/json' />" +
		"</div>";
	$("#import-1_wrapper").append(importButtons);

	$("#import.bs-btn").click(function () {
		var pokes = document.getElementsByClassName("import-team-text")[0].value;
		var name = document.getElementsByClassName("import-name-text")[0].value.trim() === "" ? "Custom Set" : document.getElementsByClassName("import-name-text")[0].value;
		addSets(pokes, name);
	});

	$("#import-save.bs-btn").click(function () {
		$("#save-import-file").click();
	});

	$("#save-import-file").change(function () {
		if (this.files && this.files[0]) {
			if (typeof importPokemonSaveFile === "function") importPokemonSaveFile(this.files[0]);
			else importSwordShieldSaveFile(this.files[0]);
		}
		$(this).val("");
	});

	$("#import-trainer-data.bs-btn").click(function () {
		$("#trainer-data-import-file").click();
	});

	$("#trainer-data-import-file").change(function () {
		if (this.files && this.files[0]) importTrainerDataFile(this.files[0]);
		$(this).val("");
	});

	$("#remove-trainer-data.bs-btn").click(removeImportedTrainerData);
}

function loadTrainerData(callback) {
	function finish() {
		initializeTrainerDataRegistry();
		rebuildTrainerRuntimeIndex();
		callback();
	}
	if (typeof TRAINERDEX !== "undefined") {
		finish();
		return;
	}
	var script = document.createElement("script");
	script.src = "./js/data/trainers.js";
	script.onload = finish;
	script.onerror = function () {
		finish();
	};
	document.body.appendChild(script);
}

function getTrainerEntries() {
	initializeTrainerDataRegistry();
	if (trainerDataRegistry) {
		var binding = getActiveTrainerBinding();
		return trainerDataRegistry.getTrainerEntries(getTrainerGeneration(), binding.profileId, binding.packId);
	}
	return getRawTrainerEntries();
}

function getTrainerEntry(trainerId) {
	if (trainerId === undefined || trainerId === null || trainerId === "") return null;
	var trainers = getTrainerEntries();
	var id = String(trainerId);
	for (var i = 0; i < trainers.length; i++) {
		if (trainers[i]._kmId === id) return trainers[i];
	}
	return trainers[~~trainerId] || null;
}

function getTrainerBattleType(entry) {
	var battleType = entry && entry.battleType ? String(entry.battleType).toLowerCase() : "single";
	return battleType.indexOf("double") === 0 ? "double" : "single";
}

function getSelectedTrainerBattleType() {
	return isDoublesFormatSelected() ? "double" : "single";
}

function getFilteredTrainerEntryIds() {
	var trainers = getTrainerEntries();
	var battleType = getSelectedTrainerBattleType();
	var ids = [];
	for (var i = 0; i < trainers.length; i++) {
		if (getTrainerBattleType(trainers[i]) === battleType) ids.push(trainers[i]._kmId || String(i));
	}
	return ids;
}

window.getTrainerEntries = getTrainerEntries;
window.getTrainerEntry = getTrainerEntry;

function selectCalculatorTrainer(profileId, trainerId) {
	var binding = getActiveTrainerBinding();
	if (binding.profileId !== profileId || !binding.packId || typeof trainerId !== "string" || !trainerId) return false;
	var id = binding.packId + ":" + trainerId;
	var entries = getTrainerEntries();
	var entry = entries.filter(function (candidate) { return candidate._kmId === id; })[0];
	var selector = $("#trainer-selector");
	if (!entry || !selector.length) return false;
	var format = $("#" + getTrainerBattleType(entry) + "s-format");
	if (!format.length || format.prop("disabled")) return false;
	if (!format.prop("checked")) format.prop("checked", true).trigger("change", [id]);
	else selector.val(id).change();
	return selector.val() === id;
}

window.selectCalculatorTrainer = selectCalculatorTrainer;

window.refreshRestoredRun = function (profileId) {
	removeTrainerSetsFromDex();
	trainerDataRegistry = null; builtInTrainerDataInstalled = false;
	initializeTrainerDataRegistry();
	var active = window.kmRomHackRegistry.getActiveProfile();
	if (profileId && (!active || active.id !== profileId)) window.kmRomHackRegistry.activateProfile(profileId);
	$(".gen:checked").trigger("change");
	refreshTrainerDataViews();
	if (typeof window.reloadImportedPlayerBagItems === "function") window.reloadImportedPlayerBagItems();
	window.dispatchEvent(new CustomEvent("kmcalculator:runrestored"));
};

window.addEventListener("kmcalculator:romhackchange", function () {
	setTimeout(function () {
		refreshTrainerDataViews();
	}, 0);
});

function getTrainerPokemon(entry) {
	return entry && (entry.pokemon || entry.team) ? (entry.pokemon || entry.team) : [];
}

function getTrainerPokemonSpecies(pokemon) {
	return checkExceptionsImport(pokemon.species);
}

function getTrainerArea(entry) {
	return entry && entry.area ? entry.area : "Trainers";
}

function getTrainerName(entry) {
	return entry && (entry.trainer || entry.name) ? (entry.trainer || entry.name) : "Trainer";
}

function getTrainerPackGroup(entry) {
	return getTrainerArea(entry);
}

function getTrainerPackCredit(entry) {
	if (!entry || !entry._kmPack) return "Bundled trainer data";
	var authors = [];
	for (var i = 0; i < entry._kmPack.authors.length; i++) authors.push(entry._kmPack.authors[i].name);
	return entry._kmPack.name + " v" + entry._kmPack.version + " · " + authors.join(", ") +
		" · " + entry._kmPack.source.name + " · " + entry._kmPack.license;
}

function updateTrainerDataAttribution(entry) {
	var attribution = $("#trainer-data-attribution");
	if (!attribution.length) return;
	attribution.text(entry ? getTrainerPackCredit(entry) : "No trainer data is available for this generation.");
}

function formatTrainerDataError(error) {
	var message = error && error.message ? error.message : "Trainer data could not be imported.";
	if (error && error.issues && error.issues.length) message += "\n\n" + error.issues.join("\n");
	return message;
}

function refreshTrainerDataViews(preferredTrainerId) {
	trainerBattlefieldKey = null;
	removeTrainerSetsFromDex();
	rebuildTrainerRuntimeIndex();
	if (!$("#trainer-selector").length) installTrainerControls();
	else refreshTrainerSelectorForBattleFormat(preferredTrainerId);
	$(document).trigger("kmtrainerdatachange");
}

function importTrainerDataFile(file) {
	initializeTrainerDataRegistry();
	if (!trainerDataRegistry) {
		alert("Trainer data support is unavailable in this build.");
		return;
	}
	var reader = new FileReader();
	reader.onload = function () {
		try {
			var pack = importTrainerPack(JSON.parse(String(reader.result || "")));
			refreshTrainerDataViews();
			var authors = [];
			for (var i = 0; i < pack.authors.length; i++) authors.push(pack.authors[i].name);
			alert(
				"Imported " + pack.name + " with " + pack.trainers.length + " trainer" +
				(pack.trainers.length === 1 ? "" : "s") + ".\n\n" +
				"Credit: " + authors.join(", ") + "\n" +
				"Source: " + pack.source.name + "\n" +
				"License: " + pack.license
			);
		} catch (error) {
			alert(formatTrainerDataError(error));
		}
	};
	reader.onerror = function () {
		alert("Trainer data could not be read from " + file.name + ".");
	};
	reader.readAsText(file);
}

function removeImportedTrainerData() {
	initializeTrainerDataRegistry();
	var packs = trainerDataRegistry ? trainerDataRegistry.getImportedPacks() : [];
	if (!packs.length) {
		alert("There are no imported trainer data packs to remove.");
		return;
	}
	var names = [];
	for (var i = 0; i < packs.length; i++) names.push(packs[i].name);
	if (!window.confirm("Remove all imported trainer data packs?\n\n" + names.join("\n"))) return;
	trainerDataRegistry.clearImportedPacks();
	unregisterImportedTrainerProfiles();
	refreshTrainerDataViews();
	if (window.kmRomHackRegistry && !window.kmRomHackRegistry.getActiveProfile()) {
		window.kmRomHackRegistry.requestChooser("trainer-data-removed");
	}
}

function getTrainerPokemonLabel(pokemon) {
	var species = getTrainerPokemonSpecies(pokemon);
	var label = pokemon.nickname ? pokemon.nickname + " (" + species + ")" : species;
	if (pokemon.level !== undefined) label += " Lv" + pokemon.level;
	return label;
}

function getTrainerPokemonButtonLabel(pokemon) {
	return pokemon.nickname || getTrainerPokemonSpecies(pokemon);
}

function getTrainerTeamSummary(entry) {
	var pokemon = getTrainerPokemon(entry);
	var names = [];
	for (var i = 0; i < pokemon.length; i++) {
		names.push(getTrainerPokemonButtonLabel(pokemon[i]));
	}
	return names.join(", ");
}

function getTrainerSetName(entry, pokemon) {
	return "[Trainer] " + getTrainerArea(entry) + " - " + getTrainerName(entry) + " - " + getTrainerPokemonLabel(pokemon);
}

function getTrainerSet(pokemon) {
	var set = {};
	var fields = ["ability", "item", "nature", "moves", "ivs", "dvs", "evs", "level", "gender", "teraType"];
	for (var i = 0; i < fields.length; i++) {
		var field = fields[i];
		if (pokemon[field] !== undefined) set[field] = pokemon[field];
	}
	if (typeof window.areEVInputsDisabled === "function" && window.areEVInputsDisabled()) {
		set.evs = getZeroEVs();
	}
	set.moves = (set.moves || []).slice(0, 4);
	while (set.moves.length < 4) set.moves.push("(No Move)");
	set.isTrainerSet = true;
	if (pokemon.nickname) set.nickname = pokemon.nickname;
	return set;
}

function addTrainerPokemonToDex(entry, pokemon) {
	var species = getTrainerPokemonSpecies(pokemon);
	if (!pokedex || !pokedex[species]) return "";
	var setName = getTrainerSetName(entry, pokemon);
	if (!setdex[species]) setdex[species] = {};
	setdex[species][setName] = getTrainerSet(pokemon);
	return species + " (" + setName + ")";
}

function getTrainerSlotSelection(trainerId, index, fullSetName) {
	var entry = getTrainerEntry(trainerId);
	var trainer = getTrainerPokemon(entry);
	var pokemon = trainer && trainer[index];
	if (!entry || !pokemon) return null;
	return {
		fullSetName: fullSetName,
		pokemonName: getTrainerPokemonSpecies(pokemon),
		displayName: getTrainerPokemonButtonLabel(pokemon),
		label: getTrainerPokemonLabel(pokemon),
		trainerId: String(trainerId),
		trainerIndex: String(index)
	};
}

function assignTrainerPokemonToSlot(trainerId, index, slot) {
	loadTrainerSlotIntoEditor(trainerId, index, slot);
}

function loadTrainerSlotIntoEditor(trainerId, index, slot) {
	var entry = getTrainerEntry(trainerId);
	var trainer = getTrainerPokemon(entry);
	if (!trainer || !trainer[index]) return;
	var fullSetName = addTrainerPokemonToDex(entry, trainer[index]);
	if (!fullSetName) {
		alert("This trainer Pokemon is not available in the selected generation.");
		return;
	}
	setDoublesActiveSlot("opponent", slot || 1);
	var selector = $("#p2 input.set-selector");
	if (selector.data("select2")) {
		selector.select2("data", {id: fullSetName, text: fullSetName});
	}
	selector.val(fullSetName);
	selector.change();
	updatePokemonLegendSprite($("#p2"), getPokemonLegendTitle($("#p2")), getTrainerPokemonSpecies(trainer[index]));
	setDoublesSlotSelection("opponent", slot || 1, getTrainerSlotSelection(trainerId, index, fullSetName));
	updateDoublesSlotHighlights();
	updateDoublesSlotSummaries();
}

function selectTrainerPokemon(trainerId, index) {
	loadTrainerSlotIntoEditor(trainerId, index, 1);
}

function hideTrainerSetSelector() {
	var selector = $("#p2 input.set-selector");
	$("#p2").addClass("trainer-mode");
	selector.addClass("trainer-set-selector-input");
	if (selector.data("select2")) {
		selector.select2("container").addClass("trainer-set-selector-container");
	}
}

function syncTrainerBattlefield(trainerId) {
	var binding = getActiveTrainerBinding();
	var key = [binding.profileId, binding.packId, getTrainerGeneration(), trainerId || ""].join(":");
	if (key === trainerBattlefieldKey) return;
	trainerBattlefieldKey = key;
	if (typeof window.resetTrainerBattlefield === "function") window.resetTrainerBattlefield();
}

function renderTrainerTeam(trainerId) {
	var team = $("#trainer-team");
	team.empty();
	var entry = getTrainerEntry(trainerId);
	var trainer = getTrainerPokemon(entry);
	updateTrainerDataAttribution(entry);
	if (!entry || !trainer.length) { syncTrainerBattlefield(null); return; }
	if (getTrainerBattleType(entry) !== getSelectedTrainerBattleType()) {
		refreshTrainerSelectorForBattleFormat();
		return;
	}
	syncTrainerBattlefield(trainerId);
	clearDoublesSlotSide("opponent");
	for (var i = 0; i < trainer.length; i++) {
		var pokemon = trainer[i];
		var button = $("<button type='button' class='trainer-pokemon' draggable='true'></button>");
		button.append(createPokemonSprite(getTrainerPokemonSpecies(pokemon), "trainer-pokemon-sprite"));
		button.append($("<span class='km-pokemon-fallback-name'></span>").text(getTrainerPokemonSpecies(pokemon)));
		button.find("img").prop("draggable", false);
		button.attr("aria-label", getTrainerPokemonButtonLabel(pokemon));
		button.attr("title", getTrainerPokemonLabel(pokemon));
		button.attr("data-trainer-id", trainerId);
		button.attr("data-trainer-index", i);
		button.click(function () {
			if (isDoublesFormatSelected()) return;
			selectTrainerPokemon(trainerId, ~~$(this).attr("data-trainer-index"));
		});
		button.on("contextmenu", function (event) {
			if (!isDoublesFormatSelected()) return;
			event.preventDefault();
			var trainerIndex = ~~$(this).attr("data-trainer-index");
			showDoublesSlotMenu(event, function (slot) {
				assignTrainerPokemonToSlot(trainerId, trainerIndex, slot);
			});
		});
		team.append(button);
	}
	selectTrainerPokemon(trainerId, 0);
	window.dispatchEvent(new CustomEvent("kmcalculator:fieldchange"));
}

window.loadTrainerSlotIntoEditor = loadTrainerSlotIntoEditor;

function selectAdjacentTrainer(direction) {
	var selector = $("#trainer-selector");
	var trainerIds = getFilteredTrainerEntryIds();
	if (!trainerIds.length) return;
	var selected = String(selector.val());
	var index = trainerIds.indexOf(selected);
	if (index < 0) index = 0;
	index = (index + direction + trainerIds.length) % trainerIds.length;
	selector.val(trainerIds[index]).change();
}

function initializeTrainerSelector(selector) {
	selector.off(".kmTrainerSearch").select2({
		width: "resolve",
		minimumResultsForSearch: 0,
		matcher: function (term, text, option) {
			var area = option.parent("optgroup").attr("label") || "";
			return (text + " " + area).toLowerCase().indexOf(term.toLowerCase()) !== -1;
		}
	});
	var widget = selector.data("select2");
	widget.container.addClass("trainer-selector-container");
	widget.dropdown.addClass("km-trainer-dropdown");
	// Keep Select2's real search input and keyboard handlers in the name field.
	widget.container.append(widget.search.parent());
	widget.search.attr("aria-label", "Search trainers").on("mousedown click touchstart", function (event) { event.stopPropagation(); });
	var pager = $("<div class='km-trainer-pages'></div>").appendTo(widget.dropdown);
	var previous = $("<button type='button' aria-label='Previous trainer results'>‹</button>").appendTo(pager);
	var status = $("<span aria-live='polite'></span>").appendTo(pager);
	var next = $("<button type='button' aria-label='Next trainer results'>›</button>").appendTo(pager);
	var page = 0, pageSize = 8, total = 0, lastTerm = "";
	var queryAll = widget.opts.query;
	widget.opts.query = function (query) {
		if (query.term !== lastTerm) { page = 0; lastTerm = query.term; }
		queryAll($.extend({}, query, {callback: function (data) {
			total = data.results.reduce(function (count, group) { return count + (group.children ? group.children.length : 1); }, 0);
			page = Math.min(page, Math.max(0, Math.ceil(total / pageSize) - 1));
			var start = page * pageSize, offset = 0, results = [];
			data.results.forEach(function (group) {
				var children = group.children || [group];
				var visible = children.slice(Math.max(0, start - offset), Math.max(0, start + pageSize - offset));
				offset += children.length;
				if (visible.length) results.push(group.children ? $.extend({}, group, {children: visible}) : group);
			});
			pager.prop("hidden", total <= pageSize);
			previous.prop("disabled", !page); next.prop("disabled", start + pageSize >= total);
			status.text(total ? (start + 1) + " to " + Math.min(start + pageSize, total) + " of " + total : "No trainers");
			query.callback({results: results, more: false});
		}}));
	};
	function changePage(direction) {
		var newPage = Math.max(0, Math.min(page + direction, Math.ceil(total / pageSize) - 1));
		if (newPage === page) return;
		page = newPage; widget.updateResults(true); widget.search.focus();
	}
	previous.on("click", function () { changePage(-1); });
	next.on("click", function () { changePage(1); });
	pager.on("mousedown", function (event) { event.preventDefault(); });
	widget.search.on("keydown", function (event) {
		if (event.which === 33 || event.which === 34) { event.preventDefault(); changePage(event.which === 33 ? -1 : 1); }
	});
	selector.on("select2-opening.kmTrainerSearch", function () {
		pageSize = 8; lastTerm = "";
		page = Math.max(0, Math.floor(selector.find("option").index(selector.find(":selected")) / pageSize));
		widget.search.attr("placeholder", selector.find(":selected").text() || "Search trainers");
	});
	widget.positionDropdown = function () {
		var scale = Number(window.getComputedStyle(document.body).zoom) || 1;
		var viewport = window.visualViewport;
		var margin = 8 * scale, gap = 4 * scale;
		var leftEdge = (viewport ? viewport.offsetLeft : 0) + margin;
		var topEdge = (viewport ? viewport.offsetTop : 0) + margin;
		var width = Math.min(document.documentElement.clientWidth || window.innerWidth, viewport ? viewport.width : window.innerWidth);
		var height = Math.min(document.documentElement.clientHeight || window.innerHeight, viewport ? viewport.height : window.innerHeight);
		var rightEdge = leftEdge + width - 2 * margin, bottomEdge = topEdge + height - 2 * margin;
		var anchor = widget.container[0].getBoundingClientRect();
		var above = Math.max(0, anchor.top - topEdge - gap), below = Math.max(0, bottomEdge - anchor.bottom - gap);
		var menuWidth = Math.min(anchor.width, rightEdge - leftEdge);
		widget.dropdown.css({position: "fixed", width: menuWidth / scale + "px", bottom: "auto"});
		var menuHeight = widget.dropdown[0].getBoundingClientRect().height;
		if (menuHeight > Math.max(above, below) && pageSize > 1 && widget.results.find(".select2-result-selectable").length) {
			var start = page * pageSize;
			pageSize--; page = Math.floor(start / pageSize);
			widget.updateResults(true);
			return;
		}
		var openAbove = menuHeight > below && above > below;
		var top = openAbove ? anchor.top - gap - menuHeight : anchor.bottom + gap;
		widget.container.toggleClass("select2-drop-above", openAbove);
		widget.dropdown.toggleClass("select2-drop-above", openAbove).css({
			left: Math.max(leftEdge, Math.min(anchor.left, rightEdge - menuWidth)) / scale + "px",
			top: Math.max(topEdge, Math.min(top, bottomEdge - menuHeight)) / scale + "px"
		});
	};
}

function rebuildTrainerSelectorOptions(selector, preferredTrainerId) {
	var trainerIds = getFilteredTrainerEntryIds();
	var selectedId = trainerIds.indexOf(String(preferredTrainerId)) !== -1 ? String(preferredTrainerId) : trainerIds[0];
	var hadSelect2 = !!selector.data("select2");
	if (hadSelect2) selector.select2("destroy");
	selector.empty();
	if (!trainerIds.length) {
		selector.append($("<option></option>").val("").text("No trainers available").attr("disabled", "disabled"));
		selectedId = "";
	}
	var optgroup;
	var currentArea = "";
	for (var i = 0; i < trainerIds.length; i++) {
		var trainerId = trainerIds[i];
		var entry = getTrainerEntry(trainerId);
		var area = getTrainerPackGroup(entry);
		if (area !== currentArea) {
			currentArea = area;
			optgroup = $("<optgroup></optgroup>").attr("label", area);
			selector.append(optgroup);
		}
		optgroup.append(
			$("<option></option>")
				.val(trainerId)
				.text(getTrainerName(entry))
				.attr("title", area + " > " + getTrainerName(entry) + " > " + getTrainerTeamSummary(entry))
		);
	}
	selector.val(selectedId);
	if (hadSelect2) {
		initializeTrainerSelector(selector);
	}
	return selectedId;
}

function refreshTrainerSelectorForBattleFormat(preferredTrainerId, notifySelection) {
	var selector = $("#trainer-selector");
	if (!selector.length) return;
	var selectedId = rebuildTrainerSelectorOptions(selector, preferredTrainerId || selector.val());
	if (selectedId) {
		if (notifySelection) selector.change();
		else renderTrainerTeam(selectedId);
	} else {
		$("#trainer-team").empty();
		updateTrainerDataAttribution(null);
		syncTrainerBattlefield(null);
	}
}

function removeTrainerSetsFromDex() {
	for (var generation = 0; generation < SETDEX.length; generation++) {
		var generationSets = SETDEX[generation];
		if (!generationSets) continue;
		for (var pokemon in generationSets) {
			if (!Object.prototype.hasOwnProperty.call(generationSets, pokemon)) continue;
			for (var setName in generationSets[pokemon]) {
				if (Object.prototype.hasOwnProperty.call(generationSets[pokemon], setName) &&
					generationSets[pokemon][setName].isTrainerSet) {
					delete generationSets[pokemon][setName];
				}
			}
		}
	}
}

window.removeTrainerSetsFromDex = removeTrainerSetsFromDex;

function updateTrainerControlsForLayout() {
	if (window.KMCalculatorRomHackLayoutManager &&
		typeof window.KMCalculatorRomHackLayoutManager.refresh === "function") {
		window.KMCalculatorRomHackLayoutManager.refresh();
		return;
	}
	var controls = $("#p2 > .trainer-controls");
	var selector = $("#p2 > input.set-selector");
	var selectorContainer = selector.data("select2") ? selector.select2("container") : $();
	var selectorAnchor = selectorContainer.length ? selectorContainer : selector;
	if (!controls.length) return;
	if (selectorAnchor.length) selectorAnchor.after(controls);
}

window.updateTrainerControlsForLayout = updateTrainerControlsForLayout;

function installTrainerControls() {
	if (!$("#p2").length) return;
	if ($("#trainer-selector").length) {
		refreshTrainerSelectorForBattleFormat();
		return;
	}
	var controls = $("<div class='trainer-controls'></div>");
	var trainerRow = $("<div class='trainer-selector-row'></div>");
	var prevTrainer = $("<button type='button' class='btn trainer-nav trainer-prev' title='Previous Trainer' aria-label='Previous Trainer'>Prev</button>");
	var selector = $("<select id='trainer-selector' aria-label='Trainer'></select>");
	var nextTrainer = $("<button type='button' class='btn trainer-nav trainer-next' title='Next Trainer' aria-label='Next Trainer'>Next</button>");
	var team = $("<div id='trainer-team'></div>");
	var attribution = $("<div id='trainer-data-attribution' class='trainer-data-attribution' aria-live='polite'></div>");
	var selectedTrainerId = rebuildTrainerSelectorOptions(selector);
	trainerRow.append(prevTrainer).append(selector).append(nextTrainer);
	controls.append(trainerRow).append(team).append(attribution);
	$("#p2 legend").text("Trainer");
	$("#p2 legend").after(controls);
	initializeTrainerSelector(selector);
	var trainerNavigation = document.getElementById("km-trainer-navigation");
	if (trainerNavigation) trainerNavigation.appendChild(trainerRow[0]);
	hideTrainerSetSelector();
	updateTrainerControlsForLayout();
	prevTrainer.click(function () {
		selectAdjacentTrainer(-1);
	});
	nextTrainer.click(function () {
		selectAdjacentTrainer(1);
	});
	selector.change(function () {
		renderTrainerTeam($(this).val());
	});
	$("input:radio[name='format']").change(function (event, preferredTrainerId) {
		refreshTrainerSelectorForBattleFormat(preferredTrainerId, !!preferredTrainerId);
	});
	$(".gen").change(function () {
		refreshTrainerSelectorForBattleFormat();
		rebuildTrainerRuntimeIndex();
		$(document).trigger("kmtrainerdatachange");
	});
	if (selectedTrainerId) renderTrainerTeam(selectedTrainerId);
	else updateTrainerDataAttribution(null);
}

function ExportPokemon(pokeInfo) {
	var pokemon = createPokemon(pokeInfo);
	var gender = pokeInfo.find(".gender").val() || 'N';
	var EV_counter = 0;
	var finalText = checkExceptionsExport(pokemon.name);
	if (gender !== 'N') finalText += " (" + gender + ")";
	if (pokemon.item) finalText += " @ " + pokemon.item;
	finalText += "\n";
	if (pokemon.ability) finalText += "Ability: " + pokemon.ability + "\n";
	if (pokemon.level !== 100) finalText += "Level: " + pokemon.level + "\n";
	if (gen === 9) {
		var teraType = pokeInfo.find(".teraType").val();
		if (teraType !== undefined && teraType !== pokemon.types[0]) {
			finalText += "Tera Type: " + teraType + "\n";
		}
	}
	if (gen > 2) {
		var EVs_Array = [];
		for (var stat in pokemon.evs) {
			var ev = pokemon.evs[stat] ? pokemon.evs[stat] : 0;
			if (ev > 0) {
				EVs_Array.push(ev + " " + calc.Stats.displayStat(stat));
			}
			EV_counter += ev;
			if (EV_counter > 510) break;
		}
		if (EVs_Array.length > 0) {
			finalText += "EVs: ";
			finalText += serialize(EVs_Array, " / ");
			finalText += "\n";
		}
		if (pokemon.nature) {
			finalText += pokemon.nature + " Nature" + "\n";
		}
	}
	var IVs_Array = [];
	for (var stat in pokemon.ivs) {
		var iv = pokemon.ivs[stat] ? pokemon.ivs[stat] : 0;
		if (iv < 31) {
			IVs_Array.push(iv + " " + calc.Stats.displayStat(stat));
		}
	}
	if (IVs_Array.length > 0) {
		finalText += "IVs: ";
		finalText += serialize(IVs_Array, " / ");
		finalText += "\n";
	}

	for (var i = 0; i < 4; i++) {
		var moveName = pokemon.moves[i].name;
		if (moveName !== "(No Move)") {
			finalText += "- " + moveName + "\n";
		}
	}
	finalText = finalText.trim();
	$("textarea.import-team-text").val(finalText);
}

function serialize(array, separator) {
	var text = "";
	for (var i = 0; i < array.length; i++) {
		if (i < array.length - 1) {
			text += array[i] + separator;
		} else {
			text += array[i];
		}
	}
	return text;
}

function statToLegacyStat(stat) {
	switch (stat) {
	case 'hp':
		return "hp";
	case 'atk':
		return "at";
	case 'def':
		return "df";
	case 'spa':
		return "sa";
	case 'spd':
		return "sd";
	case 'spe':
		return "sp";
	case 'spc':
		return "sl";
	}
}

function findSpecies(row) {
	row = row.split(/[()@]/);
	// Skip if the row contains the ability As One (Spectrier / Glastrier),
	// so that it is not treated as a separate Pokemon.
	if (row.length > 0 && row[0].includes('As One')) return {offset: undefined};
	var name;
	var offset;
	for (var j = 0; j < row.length && offset === undefined; j++) {
		name = checkExceptionsImport(row[j].trim());
		if (pokedex && pokedex[name] !== undefined) offset = j;
	}
	return {name: name, offset: offset};
}

function getGender(currentRow, j) {
	var gender;
	for (; j < currentRow.length; j++) {
		gender = currentRow[j].trim();
		if (gender === 'M' || gender === 'F' || gender === 'N') return gender;
	}
}

function getItem(currentRow, j) {
	var item;
	for (; j < currentRow.length; j++) {
		item = currentRow[j].trim();
		if (window.items && window.items.indexOf(item) !== -1) return item;
	}
}

function getStats(currentPoke, rows, x) {
	currentPoke.nature = "Serious";
	var currentEV;
	var currentIV;
	var currentNature;
	currentPoke.level = 100;
	for (; x < rows.length && findSpecies(rows[x]).offset === undefined; x++) {
		var currentRow = rows[x] ? rows[x].split(/[/:]/) : '';
		var evs = {};
		var ivs = {};
		var ability;
		var teraType;
		var j;

		switch (currentRow[0]) {
		case 'Level':
			currentPoke.level = parseInt(currentRow[1].trim());
			break;
		case 'EVs':
			for (j = 1; j < currentRow.length; j++) {
				currentEV = currentRow[j].trim().split(/\s+/);
				currentEV[1] = statToLegacyStat((currentEV[1] || "").toLowerCase());
				if (currentEV[1]) evs[currentEV[1]] = parseInt(currentEV[0]);
			}
			currentPoke.evs = window.areEVInputsDisabled && window.areEVInputsDisabled() ?
				getZeroEVs() : evs;
			break;
		case 'IVs':
			for (j = 1; j < currentRow.length; j++) {
				currentIV = currentRow[j].trim().split(" ");
				currentIV[1] = statToLegacyStat(currentIV[1].toLowerCase());
				ivs[currentIV[1]] = parseInt(currentIV[0]);
			}
			if (gen < 3) {
				currentPoke.dvs = {};
				for (var legacyStat in ivs) {
					if (Object.prototype.hasOwnProperty.call(ivs, legacyStat)) {
						currentPoke.dvs[legacyStat] = Math.max(0, Math.min(15, Math.floor(ivs[legacyStat] / 2)));
					}
				}
			} else {
				currentPoke.ivs = ivs;
			}
			break;
		case 'Ability':
			ability = currentRow[1] ? currentRow[1].trim() : '';
			if (window.abilities && window.abilities.indexOf(ability) !== -1) currentPoke.ability = ability;
			break;
		case 'Tera Type':
			teraType = currentRow[1] ? currentRow[1].trim() : '';
			if (window.typeChart && Object.keys(window.typeChart).slice(1).indexOf(teraType) !== -1) {
				currentPoke.teraType = teraType;
			}
			break;
		}

		currentNature = rows[x] ? rows[x].trim().split(" ") : '';
		if (currentNature[1] === "Nature" && currentNature[0] != "-") currentPoke.nature = currentNature[0];
	}
	return currentPoke;
}

function getMoves(currentPoke, rows, x) {
	var movesFound = false;
	var move;
	var moves = [];
	for (; x < rows.length && findSpecies(rows[x]).offset === undefined; x++) {
		if (rows[x]) {
			if (rows[x][0] === "-") {
				movesFound = true;
				move = rows[x].slice(2).replace("[", "").replace("]", "").trim().replace(/\s+/g, " ");
				if (window.moves && Object.prototype.hasOwnProperty.call(window.moves, move)) moves.push(move);
			} else if (movesFound === true) {
				break;
			}
		}
	}
	currentPoke.moves = moves;
	return currentPoke;
}

function createDexObjectFromPokemon(poke) {
	var dexObject = {};
	var defaultEV = window.areEVInputsDisabled && window.areEVInputsDisabled() ? 0 : (gen < 3 ? 252 : 0);
	var defaultEVs = gen === 1 ?
		{hp: defaultEV, at: defaultEV, df: defaultEV, sl: defaultEV, sp: defaultEV} :
		(gen === 2 ? {hp: defaultEV, at: defaultEV, df: defaultEV, sa: defaultEV, sd: defaultEV, sp: defaultEV} :
			{hp: defaultEV, atk: defaultEV, def: defaultEV, spa: defaultEV, spd: defaultEV, spe: defaultEV});
	if (poke.ability !== undefined) {
		dexObject.ability = poke.ability;
	}
	if (poke.teraType !== undefined) {
		dexObject.teraType = poke.teraType;
	}
	dexObject.level = poke.level;
	dexObject.evs = poke.evs || defaultEVs;
	dexObject.ivs = poke.ivs;
	if (poke.dvs !== undefined) dexObject.dvs = poke.dvs;
	dexObject.moves = poke.moves;
	dexObject.nature = poke.nature;
	dexObject.gender = poke.gender;
	dexObject.item = poke.item;
	dexObject.nickname = poke.nickname;
	dexObject.isCustomSet = poke.isCustomSet;
	if (poke.isGmax !== undefined) dexObject.isGmax = poke.isGmax;
	if (poke.dynamaxLevel !== undefined) dexObject.dynamaxLevel = poke.dynamaxLevel;
	return dexObject;
}

function addToDex(poke) {
	var originalSetName = poke.nameProp || "Imported Set";
	var setName = originalSetName;
	var suffix = 2;
	while (SETDEX[gen] && SETDEX[gen][poke.name] && SETDEX[gen][poke.name][setName] &&
		!SETDEX[gen][poke.name][setName].isCustomSet) {
		setName = originalSetName + " " + suffix;
		suffix++;
	}
	poke.nameProp = setName;
	var dexObject = createDexObjectFromPokemon(poke);
	if ($("#randoms").prop("checked")) {
		ensureCustomRandomDexPokemon(poke.name);
	} else {
		ensureCustomSetDexPokemon(poke.name);
	}
	var customsets = readCustomSets();
	if (!customsets[poke.name]) {
		customsets[poke.name] = {};
	}
	customsets[poke.name][poke.nameProp] = dexObject;
	if (poke.name === "Aegislash-Blade") {
		if (!customsets["Aegislash-Shield"]) customsets["Aegislash-Shield"] = {};
		if (!customsets["Aegislash-Both"]) customsets["Aegislash-Both"] = {};
		customsets["Aegislash-Shield"][poke.nameProp] = dexObject;
		customsets["Aegislash-Both"][poke.nameProp] = dexObject;
	}
	updateDex(customsets);
}

function ensureCustomSetDexPokemon(pokemon) {
	if (SETDEX[gen] && !SETDEX[gen][pokemon]) SETDEX[gen][pokemon] = {};
}

function ensureCustomRandomDexPokemon(pokemon) {
	if (window.randdex && !window.randdex[pokemon]) window.randdex[pokemon] = {};
}

function updateDex(customsets) {
	for (var pokemon in customsets) {
		for (var moveset in customsets[pokemon]) {
			customsets[pokemon][moveset].isCustomSet = true;
		}
	}
	if (typeof window.addCustomSetsToDex === "function") window.addCustomSetsToDex(customsets);
	getMovesetImportStorage().setItem(getMovesetCustomSetsStorageKey(), JSON.stringify(customsets));
	if (typeof syncTeamBoxWithCustomSets === "function") syncTeamBoxWithCustomSets(customsets);
}

function setImportedSetOptionsVisible(visible) {
	$(".imported-sets-options").prop("hidden", !visible);
}

window.updateImportedSetOptionsVisibility = setImportedSetOptionsVisible;

function refreshImportedSetFilters() {
	$("input.set-selector").each(function () {
		var selector = $(this);
		if (selector.data("select2")) selector.select2("destroy");
	});
	loadDefaultLists();
	$(".imported-sets-only:checked").each(function () {
		loadCustomList($(this).closest(".poke-info").prop("id"));
	});
	updateTrainerControlsForLayout();
}

function resetImportedSetFilters() {
	$(".imported-sets-only").prop("checked", false);
	refreshImportedSetFilters();
}

window.resetImportedSetFilters = resetImportedSetFilters;

function removeCustomSetsFromDex() {
	if (typeof window.removeAllCustomSetsFromDex === "function") {
		window.removeAllCustomSetsFromDex();
		return;
	}
	var generationSets = SETDEX[gen];
	if (!generationSets) return;
	for (var pokemon in generationSets) {
		if (!Object.prototype.hasOwnProperty.call(generationSets, pokemon)) continue;
		for (var setName in generationSets[pokemon]) {
			if (Object.prototype.hasOwnProperty.call(generationSets[pokemon], setName) &&
				generationSets[pokemon][setName].isCustomSet) {
				delete generationSets[pokemon][setName];
			}
		}
	}
}

function addSets(pokes, name) {
	var rows = pokes.split("\n");
	var currentRow;
	var species;
	var currentPoke;
	var addedPokes = 0;
	for (var i = 0; i < rows.length; i++) {
		species = findSpecies(rows[i]);
		if (species.offset !== undefined) {
			currentRow = rows[i].split(/[()@]/);
			currentPoke = JSON.parse(JSON.stringify(pokedex[species.name]));
			currentPoke.name = species.name;
			currentPoke.gender = getGender(currentRow, species.offset + 1);
			currentPoke.item = getItem(currentRow, species.offset + 1);
			currentPoke = getStats(currentPoke, rows, i + 1);
			currentPoke = getMoves(currentPoke, rows, i + 1);
			if (species.offset === 1 && currentRow[0].trim()) {
				currentPoke.nameProp = currentRow[0].trim();
			} else {
				currentPoke.nameProp = name;
			}
			currentPoke.isCustomSet = true;
			addToDex(currentPoke);
			addedPokes++;
		}
	}
	if (addedPokes > 0) {
		alert("Successfully imported " + addedPokes + (addedPokes === 1 ? " set" : " sets"));
		setImportedSetOptionsVisible(true);
	} else {
		alert("No sets imported, please check your syntax and try again");
	}
}

$(".imported-sets-only").on("change", refreshImportedSetFilters);

$(".clear-imported-sets").on("click", function () {
	if (!window.confirm("Clear every imported custom set? This cannot be undone.")) return;
	getMovesetImportStorage().removeItem(getMovesetCustomSetsStorageKey());
	removeCustomSetsFromDex();
	$(".imported-sets-only").prop("checked", false);
	setImportedSetOptionsVisible(false);
	if (typeof syncTeamBoxWithCustomSets === "function") syncTeamBoxWithCustomSets({});
	clearDoublesSlotSide("player");
	refreshImportedSetFilters();
	window.alert("Imported custom sets were cleared.");
});

function checkExceptionsImport(poke) {
	if (poke && poke.endsWith("-Gmax")) poke = poke.slice(0, -5);
	if (poke === "Eternatus-Eternamax") poke = "Eternatus";
	switch (poke) {
	case 'Alcremie-Vanilla-Cream':
	case 'Alcremie-Ruby-Cream':
	case 'Alcremie-Matcha-Cream':
	case 'Alcremie-Mint-Cream':
	case 'Alcremie-Lemon-Cream':
	case 'Alcremie-Salted-Cream':
	case 'Alcremie-Ruby-Swirl':
	case 'Alcremie-Caramel-Swirl':
	case 'Alcremie-Rainbow-Swirl':
		poke = "Alcremie";
		break;
	case 'Aegislash':
		poke = "Aegislash-Shield";
		break;
	case 'Aegislash-Both':
		poke = "Aegislash-Blade";
		break;
	case 'Basculin-Red-Striped':
		poke = "Basculin";
		break;
	case 'Burmy-Plant':
	case 'Burmy-Sandy':
	case 'Burmy-Trash':
		poke = "Burmy";
		break;
	case 'Calyrex-Ice-Rider':
		poke = "Calyrex-Ice";
		break;
	case 'Calyrex-Shadow-Rider':
		poke = "Calyrex-Shadow";
		break;
	case 'Deerling-Summer':
	case 'Deerling-Autumn':
	case 'Deerling-Winter':
	case 'Deerling-Spring':
		poke = "Deerling";
		break;
	case 'Flabébé-Blue':
	case 'Flabébé-Orange':
	case 'Flabébé-Red':
	case 'Flabébé-White':
	case 'Flabébé-Yellow':
	case 'Flabebe':
	case 'Flabebe-Blue':
	case 'Flabebe-Orange':
	case 'Flabebe-Red':
	case 'Flabebe-White':
	case 'Flabebe-Yellow':
		poke = "Flabébé";
		break;
	case 'Floette-Blue':
	case 'Floette-Orange':
	case 'Floette-Red':
	case 'Floette-White':
	case 'Floette-Yellow':
		poke = "Floette";
		break;
	case 'Florges-Blue':
	case 'Florges-Orange':
	case 'Florges-Red':
	case 'Florges-White':
	case 'Florges-Yellow':
		poke = "Florges";
		break;
	case 'Furfrou-Dandy':
	case 'Furfrou-Debutante':
	case 'Furfrou-Diamond':
	case 'Furfrou-Heart':
	case 'Furfrou-Kabuki':
	case 'Furfrou-La-Reine':
	case 'Furfrou-Matron':
	case 'Furfrou-Natural':
	case 'Furfrou-Pharaoh':
	case 'Furfrou-Star':
		poke = "Furfrou";
		break;
	case 'Gastrodon-East':
	case 'Gastrodon-West':
		poke = "Gastrodon";
		break;
	case 'Giratina-Altered':
		poke = "Giratina";
		break;
	case 'Gourgeist-Average':
	case 'Gourgeist-Medium':
		poke = "Gourgeist";
		break;
	case 'Gourgeist-Jumbo':
		poke = "Gourgeist-Super";
		break;
	case 'Mimikyu-Busted-Totem':
		poke = "Mimikyu-Totem";
		break;
	case 'Mimikyu-Busted':
		poke = "Mimikyu";
		break;
	case 'Minior-Red':
	case 'Minior-Orange':
	case 'Minior-Yellow':
	case 'Minior-Green':
	case 'Minior-Blue':
	case 'Minior-Indigo':
	case 'Minior-Violet':
		poke = "Minior";
		break;
	case 'Poltchageist-Artisan':
	case 'Poltchageist-Counterfeit':
		poke = "Poltchageist";
		break;
	case 'Polteageist-Antique':
	case 'Polteageist-Phony':
		poke = "Polteageist";
		break;
	case 'Pumpkaboo-Average':
	case 'Pumpkaboo-Medium':
		poke = "Pumpkaboo";
		break;
	case 'Pumpkaboo-Jumbo':
		poke = "Pumpkaboo-Super";
		break;
	case 'Sawsbuck-Summer':
	case 'Sawsbuck-Autumn':
	case 'Sawsbuck-Winter':
	case 'Sawsbuck-Spring':
		poke = "Sawsbuck";
		break;
	case 'Shellos-East':
	case 'Shellos-West':
		poke = "Shellos";
		break;
	case 'Sinistcha-Masterpiece':
	case 'Sinistcha-Unremarkable':
		poke = "Sinistcha";
		break;
	case 'Sinistea-Antique':
	case 'Sinistea-Phony':
		poke = "Sinistea";
		break;
	case 'Tastugiri-Curly':
		poke = "Tatsugiri";
		break;
	case 'Unown-A':
	case 'Unown-B':
	case 'Unown-C':
	case 'Unown-D':
	case 'Unown-E':
	case 'Unown-F':
	case 'Unown-G':
	case 'Unown-H':
	case 'Unown-I':
	case 'Unown-J':
	case 'Unown-K':
	case 'Unown-L':
	case 'Unown-M':
	case 'Unown-N':
	case 'Unown-O':
	case 'Unown-P':
	case 'Unown-Q':
	case 'Unown-R':
	case 'Unown-S':
	case 'Unown-T':
	case 'Unown-U':
	case 'Unown-V':
	case 'Unown-W':
	case 'Unown-X':
	case 'Unown-Y':
	case 'Unown-Z':
	case 'Unown-Exclamation':
	case 'Unown-Question':
		poke = "Unown";
		break;
	case 'Vivillon-Archipelago':
	case 'Vivillon-Continental':
	case 'Vivillon-Elegant':
	case 'Vivillon-Garden':
	case 'Vivillon-High Plains':
	case 'Vivillon-Icy Snow':
	case 'Vivillon-Meadow':
	case 'Vivillon-Modern':
	case 'Vivillon-Monsoon':
	case 'Vivillon-Ocean':
	case 'Vivillon-Polar':
	case 'Vivillon-River':
	case 'Vivillon-Sandstorm':
	case 'Vivillon-Savanna':
	case 'Vivillon-Sun':
	case 'Vivillon-Tundra':
		poke = "Vivillon";
		break;
	case 'Vivillon-Pokéball':
		poke = "Vivillon-Pokeball";
		break;
	case 'Wormadam-Plant':
		poke = "Wormadam";
		break;
	case 'Xerneas-Neutral':
		poke = "Xerneas";
		break;
	}
	return poke;
}

function checkExceptionsExport(name) {
	switch (name) {
	case 'Aegislash-Shield':
	case 'Aegislash-Both':
		name = "Aegislash";
		break;
	}
	return name;
}

$(document).ready(function () {
	var customSets = readCustomSets();
	placeBsBtn();
	if (Object.keys(customSets).length) {
		updateDex(customSets);
		setImportedSetOptionsVisible(true);
	} else {
		loadDefaultLists();
	}
	loadTrainerData(installTrainerControls);
});
