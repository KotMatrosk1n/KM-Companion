var fs = require("fs");
var https = require("https");
var path = require("path");
var vm = require("vm");
var pokemonSprites = require("../src/js/pokemon_sprites");

var SPRITE_ROOT = path.join(__dirname, "sprites");
var CONCURRENCY = 16;
var SOURCES = [
	{
		name: "gen5",
		extension: "png",
		indexUrl: "https://play.pokemonshowdown.com/sprites/gen5/",
		mode: "calc"
	},
	{
		name: "ani",
		extension: "gif",
		indexUrl: "https://play.pokemonshowdown.com/sprites/ani/",
		mode: "calc"
	}
];

function getText(url) {
	return request(url).then(function (response) {
		return response.body.toString("utf8");
	});
}

function request(url, redirectsRemaining) {
	if (typeof redirectsRemaining !== "number") redirectsRemaining = 5;
	return new Promise(function (resolve, reject) {
		https.get(url, function (response) {
			var statusCode = response.statusCode || 0;
			var location = response.headers.location;
			if (statusCode >= 300 && statusCode < 400 && location && redirectsRemaining > 0) {
				response.resume();
				resolve(request(new URL(location, url).toString(), redirectsRemaining - 1));
				return;
			}
			if (statusCode < 200 || statusCode >= 300) {
				var error = new Error("Request failed for " + url + " with HTTP " + statusCode);
				error.statusCode = statusCode;
				response.resume();
				reject(error);
				return;
			}
			var chunks = [];
			response.on("data", function (chunk) {
				chunks.push(chunk);
			});
			response.on("end", function () {
				resolve({body: Buffer.concat(chunks)});
			});
		}).on("error", reject);
	});
}

function parseSpriteIndex(html, extension) {
	var sprites = [];
	var seen = {};
	var pattern = /href="\.\/([^"]+)"/g;
	var match;
	while ((match = pattern.exec(html))) {
		var fileName = decodeURIComponent(match[1]);
		if (path.extname(fileName).toLowerCase() !== "." + extension) continue;
		if (path.basename(fileName) !== fileName) continue;
		if (seen[fileName]) continue;
		seen[fileName] = true;
		sprites.push(fileName);
	}
	sprites.sort();
	return sprites;
}

function loadCalcData() {
	try {
		return require(path.join(__dirname, "..", "calc", "dist"));
	} catch (error) {
		var message = error && error.message ? error.message : error;
		console.warn("Could not load calc sprite data. Downloading the full animated index instead:", message);
		return null;
	}
}

function getCalcSpriteFileNames(extension) {
	var calc = loadCalcData();
	var spriteFiles = {};
	if (!calc || !Array.isArray(calc.SPECIES)) return null;
	function addPokemon(name, species, suppliedId) {
		var spriteId = suppliedId || pokemonSprites.getId(name, species, calc.SPECIES);
		if (extension === "png") spriteId = pokemonSprites.getStaticId(spriteId);
		if (/^[a-z0-9-]+$/.test(spriteId)) spriteFiles[spriteId + "." + extension] = true;
	}
	pokemonSprites.getKnownIds().forEach(function (id) { addPokemon("", null, id); });

	calc.SPECIES.forEach(function (generationSpecies) {
		if (!generationSpecies) return;
		Object.keys(generationSpecies).forEach(function (pokemonName) {
			addPokemon(pokemonName, generationSpecies[pokemonName]);
		});
	});
	var dex = {window: {}};
	["pokedex_catalog.js", "pokedex_royal_sword.js"].forEach(function (file) {
		vm.runInNewContext(fs.readFileSync(path.join(__dirname, "..", "src", "js", "data", file), "utf8"), dex);
	});
	dex.window.KMPokedexCatalog.species.forEach(function (species) { addPokemon(species.name); });
	Object.keys(dex.window.KMPokedexProfiles).forEach(function (id) {
		var pack = dex.window.KMPokedexProfiles[id];
		pack.entries.forEach(function (entry) { addPokemon(entry.name); });
		(pack.battleForms || []).forEach(function (form) { addPokemon(form.calcName); });
	});
	// Reference cards may use display names or forms outside calculator sets.
	var referenceSource = fs.readFileSync(path.join(__dirname, "..", "src", "js", "data", "royal_sword_reference.js"), "utf8");
	var referenceAssignment = /^window\.KMCalculatorReferenceData = (\{[\s\S]*?^\});/m.exec(referenceSource);
	if (!referenceAssignment) throw new Error("Could not read bundled reference sprite data");
	var references = JSON.parse(referenceAssignment[1]);
	Object.keys(references).forEach(function (profileId) {
		(references[profileId].trainers || []).forEach(function (trainer) {
			trainer.team.forEach(function (pokemon) {
				var species = calc.SPECIES[9][pokemon.pokemon] || calc.SPECIES[8][pokemon.pokemon];
				addPokemon(pokemon.pokemon, species, pokemon.sprite);
			});
		});
	});
	return spriteFiles;
}

function ensureDirectory(directory) {
	fs.mkdirSync(directory, {recursive: true});
}

function removeObsoleteSourceDirectories() {
	var sourceNames = SOURCES.reduce(function (names, source) {
		names[source.name] = true;
		return names;
	}, {});
	if (!fs.existsSync(SPRITE_ROOT)) return;
	fs.readdirSync(SPRITE_ROOT, {withFileTypes: true}).forEach(function (entry) {
		if (!entry.isDirectory() || sourceNames[entry.name]) return;
		fs.rmSync(path.join(SPRITE_ROOT, entry.name), {recursive: true, force: true});
	});
}

function hasExistingFile(filePath) {
	try {
		return fs.statSync(filePath).size > 0;
	} catch (error) {
		if (error && error.code !== "ENOENT") throw error;
		return false;
	}
}

function writeFileAtomic(filePath, content) {
	var tempPath = filePath + ".tmp";
	fs.writeFileSync(tempPath, content);
	fs.renameSync(tempPath, filePath);
}

function addUnavailableFile(summary, fileName) {
	if (summary.unavailableFiles.indexOf(fileName) === -1) summary.unavailableFiles.push(fileName);
}

function runQueue(items, worker) {
	var nextIndex = 0;
	var activeWorkers = Math.min(CONCURRENCY, items.length);
	var workers = [];

	function runWorker() {
		var item = items[nextIndex];
		nextIndex += 1;
		if (!item) return Promise.resolve();
		return worker(item).then(runWorker);
	}

	for (var index = 0; index < activeWorkers; index++) {
		workers.push(runWorker());
	}
	return Promise.all(workers);
}

function removeFilesNotInSet(directory, filesToKeep) {
	fs.readdirSync(directory, {withFileTypes: true}).forEach(function (entry) {
		if (!entry.isFile() || filesToKeep[entry.name]) return;
		fs.rmSync(path.join(directory, entry.name), {force: true});
	});
}

function downloadSprite(source, fileName, summary) {
	var targetPath = path.join(SPRITE_ROOT, source.name, fileName);
	if (hasExistingFile(targetPath)) {
		summary.cached += 1;
		return Promise.resolve();
	}
	return request(source.indexUrl + encodeURIComponent(fileName)).then(function (response) {
		writeFileAtomic(targetPath, response.body);
		summary.downloaded += 1;
	}).catch(function (error) {
		if (error && error.statusCode === 404) {
			addUnavailableFile(summary, fileName);
			return;
		}
		throw error;
	});
}

function getDirectorySize(directory) {
	var total = 0;
	fs.readdirSync(directory, {withFileTypes: true}).forEach(function (entry) {
		var entryPath = path.join(directory, entry.name);
		if (entry.isDirectory()) {
			total += getDirectorySize(entryPath);
		} else {
			total += fs.statSync(entryPath).size;
		}
	});
	return total;
}

function getFilesToDownload(source, indexFiles, targetDirectory) {
	var unavailableFiles = [];
	if (source.mode !== "calc") {
		return {files: indexFiles, unavailableFiles: unavailableFiles};
	}

	var wantedFiles = getCalcSpriteFileNames(source.extension);
	if (!wantedFiles) return {files: indexFiles, unavailableFiles: unavailableFiles};

	var availableFiles = indexFiles.reduce(function (fileSet, fileName) {
		fileSet[fileName] = true;
		return fileSet;
	}, {});
	var files = Object.keys(wantedFiles).filter(function (fileName) {
		return availableFiles[fileName];
	}).sort();
	unavailableFiles = Object.keys(wantedFiles).filter(function (fileName) {
		return !availableFiles[fileName];
	}).sort();
	removeFilesNotInSet(targetDirectory, files.reduce(function (fileSet, fileName) {
		fileSet[fileName] = true;
		return fileSet;
	}, {}));
	return {files: files, unavailableFiles: unavailableFiles};
}

async function downloadSource(source) {
	var targetDirectory = path.join(SPRITE_ROOT, source.name);
	ensureDirectory(targetDirectory);

	var html = await getText(source.indexUrl);
	var indexFiles = parseSpriteIndex(html, source.extension);
	var selectedFiles = getFilesToDownload(source, indexFiles, targetDirectory);
	var summary = {
		source: source.name,
		mode: source.mode,
		availableFiles: indexFiles.length,
		files: selectedFiles.files.length,
		unavailableFiles: selectedFiles.unavailableFiles,
		downloaded: 0,
		cached: 0
	};

	await runQueue(selectedFiles.files, function (fileName) {
		return downloadSprite(source, fileName, summary);
	});
	return summary;
}

async function main() {
	ensureDirectory(SPRITE_ROOT);
	removeObsoleteSourceDirectories();

	var summaries = [];
	for (var index = 0; index < SOURCES.length; index++) {
		var summary = await downloadSource(SOURCES[index]);
		summaries.push(summary);
		console.log(
			summary.source + ": " +
			summary.files + " files, " +
			summary.downloaded + " downloaded, " +
			summary.cached + " cached, " +
			summary.unavailableFiles.length + " unavailable"
		);
	}

	var manifest = {
		sources: SOURCES.map(function (source) {
			return {
				name: source.name,
				extension: source.extension,
				indexUrl: source.indexUrl,
				mode: source.mode
			};
		}),
		summaries: summaries,
		totalBytes: getDirectorySize(SPRITE_ROOT)
	};
	fs.writeFileSync(path.join(SPRITE_ROOT, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
	console.log("sprite cache: " + Math.round(manifest.totalBytes / 1024 / 1024 * 100) / 100 + " MiB");
}

main().catch(function (error) {
	console.error(error && error.stack ? error.stack : error);
	process.exitCode = 1;
});
