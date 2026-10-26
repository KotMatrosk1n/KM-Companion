/*global module */
/* One filename resolver for the app, optional collection and build checks. */
(function (root, factory) {
	if (typeof module === "object" && module.exports) module.exports = factory();
	else root.KMPokemonSprites = factory();
})(typeof self !== "undefined" ? self : this, function () {
	"use strict";
	var aliases = {
		nidoranfemale: "nidoranf", nidoranmale: "nidoranm",
		aegislashblade: "aegislash-blade", aegislashshield: "aegislash", aegislashboth: "aegislash-blade",
		greninjabond: "greninja", ribombeetotem: "ribombee", rockruffdusk: "rockruff",
		shelloseast: "shellos-east", gastrodoneast: "gastrodon-east", xerneasactive: "xerneas",
		zygarde10: "zygarde-10", zygarde10powerconstruct: "zygarde-10", zygardepowerconstruct: "zygarde",
		toxtricitylowkeygmax: "toxtricity-gmax"
	};
	["Ruby-Cream", "Matcha-Cream", "Mint-Cream", "Lemon-Cream", "Salted-Cream", "Ruby-Swirl", "Caramel-Swirl", "Rainbow-Swirl"].forEach(function (cream) {
		aliases[normalize("Alcremie-" + cream + "-Strawberry-Sweet")] = "alcremie-" + normalize(cream);
	});
	// These Totem forms have dedicated animations and share the ordinary static appearance.
	var staticAliases = {
		"araquanid-totem": "araquanid", "gumshoos-totem": "gumshoos", "kommoo-totem": "kommoo",
		"lurantis-totem": "lurantis", "marowak-alolatotem": "marowak-alola",
		"mimikyu-bustedtotem": "mimikyu-busted", "mimikyu-totem": "mimikyu",
		"raticate-alolatotem": "raticate-alola", "salazzle-totem": "salazzle",
		"togedemaru-totem": "togedemaru", "vikavolt-totem": "vikavolt"
	};
	var canonicalSource, canonicalNames;
	function normalize(value) {
		return String(value || "").replace(/♀/g, "f").replace(/♂/g, "m").normalize("NFKD").toLowerCase().replace(/[^a-z0-9]+/g, "");
	}
	function canonical(name, generations) {
		if (!generations) return null;
		if (canonicalSource !== generations) {
			canonicalSource = generations; canonicalNames = Object.create(null);
			generations.forEach(function (species) {
				Object.keys(species || {}).forEach(function (key) { canonicalNames[normalize(key)] = species[key]; });
			});
		}
		return canonicalNames[normalize(name)];
	}
	function getId(name, species, generations) {
		var id = normalize(name);
		if (Object.prototype.hasOwnProperty.call(aliases, id)) return aliases[id];
		species = species || canonical(name, generations);
		var base = species && normalize(species.baseSpecies);
		if (base && id.indexOf(base) === 0 && id.length > base.length) return base + "-" + id.slice(base.length);
		return id;
	}
	function getStaticId(id) {
		return Object.prototype.hasOwnProperty.call(staticAliases, id) ? staticAliases[id] : id;
	}
	function getKnownIds() {
		return Object.keys(aliases).map(function (key) { return aliases[key]; }).concat(Object.keys(staticAliases).map(function (key) { return staticAliases[key]; })).filter(function (id, i, all) { return all.indexOf(id) === i; });
	}
	return {getId: getId, getStaticId: getStaticId, getKnownIds: getKnownIds};
});
