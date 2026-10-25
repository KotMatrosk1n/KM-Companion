/*global module, require */

/* Bundled ROM-hack profiles for KM Companion. */
(function (root, factory) {
	if (typeof module === "object" && module.exports) {
		module.exports = factory(require("../rom_hack_registry.js"), require("../rom_hack_layouts.js"));
	} else {
		var bundled = factory(root.KMCalculatorRomHacks, root.KMCalculatorRomHackLayouts);
		root.KMCalculatorBundledRomHacks = bundled;
		bundled.install(root.kmRomHackRegistry);
	}
})(typeof self !== "undefined" ? self : this, function (romHackApi, layoutApi) {
	"use strict";

	if (!romHackApi) throw new Error("rom_hack_registry.js must load before data/rom_hacks.js.");
	if (!layoutApi) throw new Error("rom_hack_layouts.js must load before data/rom_hacks.js.");

	var profiles = [
		{
			id: "pokemon-royal-sword",
			name: "Pokémon Royal Sword",
			shortName: "Royal Sword",
			version: "1",
			baseGeneration: 8,
			calcProfile: "royal-sword",
			ui: {
				layout: "royal-sword"
			},
			inputs: {
				evs: "disabled"
			},
			calc: {
				dataGeneration: 8
			},
			trainerData: {
				packId: "pokemon-royal-sword"
			},
			saveImport: {
				generation: 8
			},
			generationData: {
				canonicalProviderId: "canonical-gen-8",
				overrideProviderId: "royal-sword"
			},
			features: {
				battleSimulator: "royal-sword-swsh-ai"
			},
			tile: {
				description: "Battle calculations, encounter tracking, and team planning.",
				icon: "./img/royal-sword.png",
				badge: "Generation 8"
			},
			attribution: {
				authors: [
					{
						name: "Matroskin",
						role: "KM Companion profile, mechanics integration, and bundled trainer data"
					}
				],
				source: {
					name: "KM Companion Pokémon Royal Sword profile",
					url: "https://github.com/KotMatrosk1n/KM-Companion"
				},
				license: {
					name: "MIT",
					url: "https://github.com/KotMatrosk1n/KM-Companion/blob/master/LICENSES/MIT-legacy.txt"
				},
				notes: "Attribution covers the calculator profile and bundled support data."
			}
		}
	];

	function createCanonicalGenerationProvider(generation) {
		return {
			id: "canonical-gen-" + generation,
			kind: "canonical-generation",
			generation: generation,
			getGeneration: function (calcApi) {
				if (!calcApi || !calcApi.Generations || typeof calcApi.Generations.get !== "function") {
					throw new TypeError("The canonical calculator generation provider requires calc.Generations.get.");
				}
				return calcApi.Generations.get(generation);
			}
		};
	}

	var canonicalGenerationProviders = {};
	for (var generation = 1; generation <= 9; generation++) {
		canonicalGenerationProviders[generation] = createCanonicalGenerationProvider(generation);
	}

	var royalSwordOverrideProvider = {
		id: "royal-sword",
		kind: "rom-hack-override",
		baseGeneration: 8,
		getGeneration: function (calcApi, profile) {
			if (!calcApi || !calcApi.RoyalSwordGenerations ||
				typeof calcApi.RoyalSwordGenerations.get !== "function") {
				throw new Error("The Royal Sword calculator data profile is not available in this build.");
			}
			return calcApi.RoyalSwordGenerations.get(profile.baseGeneration);
		}
	};

	function install(registry) {
		var i;
		if (!registry || typeof registry.registerProfile !== "function") {
			throw new TypeError("A KM Companion ROM-hack registry is required.");
		}

		layoutApi.install(registry);
		for (i = 0; i < profiles.length; i++) {
			registry.registerProfile(profiles[i], {replace: !!registry.getProfile(profiles[i].id)});
		}
		for (i = 1; i <= 9; i++) {
			registry.registerGenerationProvider(i, canonicalGenerationProviders[i]);
		}
		registry.registerProfileOverrideProvider("pokemon-royal-sword", royalSwordOverrideProvider);
		return registry.listProfiles();
	}

	return {
		profiles: profiles,
		canonicalGenerationProviders: canonicalGenerationProviders,
		canonicalGenerationEightProvider: canonicalGenerationProviders[8],
		royalSwordOverrideProvider: royalSwordOverrideProvider,
		install: install
	};
});
