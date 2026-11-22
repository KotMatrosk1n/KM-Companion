/* SPDX-License-Identifier: GPL-3.0-only */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function checkPokemonSprites(root = path.resolve(__dirname, '..')) {
	const calc = require(path.join(root, 'calc/dist'));
	const resolver = require(path.join(root, 'src/js/pokemon_sprites'));
	const inventory = JSON.parse(fs.readFileSync(path.join(root, 'src/data/pokemon-sprites.json'), 'utf8')).sprites;
	const artwork = JSON.parse(fs.readFileSync(path.join(root, 'src/data/pokedex-artwork.json'), 'utf8')).artwork;
	const data = {window: {}};
	for (const name of ['pokedex_catalog', 'pokedex_royal_sword', 'royal_sword_reference']) {
		vm.runInNewContext(fs.readFileSync(path.join(root, 'src/js/data', name + '.js'), 'utf8'), data);
	}
	const royal = {...calc.SPECIES[8]};
	for (const species of calc.RoyalSwordGenerations.get(8).species) royal[species.name] = {...royal[species.name], ...species};
	const missing = [], ids = new Set(), checkedSprites = new Set();
	let mappings = 0;
	function check(name, species, suppliedId) {
		const id = suppliedId || resolver.getId(name, species, calc.SPECIES);
		const staticId = resolver.getStaticId(id);
		mappings++; ids.add(id);
		if (!/^[a-z0-9-]+$/.test(id) || !/^[a-z0-9-]+$/.test(staticId) ||
			!inventory['gen5/' + staticId + '.png']) missing.push(name + ' (' + staticId + ')');
		return id;
	}
	function checkPokeApiSprite(key, entry) {
		const sprite = inventory[key];
		if (!['pokeapi-za', 'pokeapi-sv'].includes(sprite?.source)) return;
		if (path.posix.basename(artwork[entry.key]?.path || '') !== sprite.pokemonId + '.png') {
			throw new Error('PokéAPI sprite and artwork form IDs differ for ' + entry.name);
		}
		checkedSprites.add(key);
	}
	for (const species of calc.SPECIES) {
		for (const name of Object.keys(species || {})) check(name, species[name]);
	}
	for (const species of data.window.KMPokedexCatalog.species) check(species.name, royal[species.name]);
	for (const pack of Object.values(data.window.KMPokedexProfiles)) {
		for (const entry of pack.entries) {
			const id = check(entry.name, royal[entry.name]);
			checkPokeApiSprite('gen5/' + resolver.getStaticId(id) + '.png', entry);
			checkPokeApiSprite('ani/' + id + '.webp', entry);
		}
		for (const form of pack.battleForms || []) check(form.calcName, royal[form.calcName]);
	}
	for (const reference of Object.values(data.window.KMCalculatorReferenceData)) {
		for (const trainer of reference.trainers || []) {
			for (const pokemon of trainer.team) check(pokemon.pokemon, royal[pokemon.pokemon], pokemon.sprite);
		}
	}
	const dataMappings = mappings;
	for (const id of resolver.getKnownIds()) check(id, null, id);
	for (const [key, sprite] of Object.entries(inventory)) {
		if (['pokeapi-za', 'pokeapi-sv'].includes(sprite.source) && !checkedSprites.has(key)) throw new Error('No Dex form for PokéAPI sprite ' + key);
	}
	if (missing.length) throw new Error('Pokemon sprite mappings missing from the collection (' + missing.length + '): ' + [...new Set(missing)].join(', '));
	return {mappings: dataMappings, aliasTargets: mappings - dataMappings, spriteIds: ids.size};
}

module.exports = {checkPokemonSprites};
if (require.main === module) console.log('Pokemon sprite coverage:', checkPokemonSprites());
