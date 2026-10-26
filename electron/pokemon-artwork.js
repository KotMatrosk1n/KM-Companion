/* SPDX-License-Identifier: GPL-3.0-only */
/* Download choices and content addressed files live outside the installed app. */
var fs = require("fs/promises");
var path = require("path");
var crypto = require("crypto");
var illustrations = require("./pokedex-artwork-cache");
var SPRITE_BASE = "https://play.pokemonshowdown.com/sprites/";
var MAX_BYTES = 4 * 1024 * 1024;

function createLibrary(options) {
	var entries = new Map(), routes = new Map(), readyFiles = new Set(), downloadUrls = new Set();
	var root = options.directory, preferences = path.join(root, "artwork-settings.json");
	var choice = null, enabled = false, operation, controller, lastNotify = 0, revision = 0;
	var state = {status: "checking", checked: 0, complete: 0, total: 0, bytes: 0, totalBytes: 0, failed: 0, message: "Checking saved artwork."};
	function add(route, entry) {
		if (!entries.has(entry.id)) entries.set(entry.id, entry);
		routes.set(route, entry);
		downloadUrls.add(entry.url);
	}
	var manifest = options.illustrations;
	if (manifest.revision !== illustrations.ARTWORK_REVISION) throw new Error("Unknown illustration revision");
	Object.keys(manifest.artwork).forEach(function (key) {
		var source = manifest.artwork[key];
		if (!illustrations.isArtworkUrl(manifest.baseUrl + source.path) || !/^[a-f0-9]{40}$/.test(source.sha) || !Number.isSafeInteger(source.size) || source.size < 33 || source.size > MAX_BYTES) throw new Error("Invalid illustration inventory");
		add("pokedex-artwork/" + key, {id: source.sha, size: source.size, url: manifest.baseUrl + source.path, file: path.join(root, "pokedex-artwork", source.sha + ".png"), type: "image/png", valid: function (bytes) { return illustrations.validBytes(bytes, source); }});
	});
	if (options.sprites.version !== 1 || options.sprites.baseUrl !== SPRITE_BASE) throw new Error("Unknown sprite inventory");
	Object.keys(options.sprites.sprites).forEach(function (key) {
		var source = options.sprites.sprites[key];
		if (!/^(gen5\/[a-z0-9-]+\.png|ani\/[a-z0-9-]+\.gif)$/.test(key) || !/^[a-f0-9]{64}$/.test(source.sha256) || !Number.isSafeInteger(source.size) || source.size < 14 || source.size > MAX_BYTES) throw new Error("Invalid sprite inventory");
		var png = key.endsWith(".png");
		add("local-sprites/" + key, {id: source.sha256, size: source.size, url: SPRITE_BASE + key, file: path.join(root, "pokemon-artwork", source.sha256 + (png ? ".png" : ".gif")), legacy: options.legacySprites && path.join(options.legacySprites, key), type: png ? "image/png" : "image/gif", valid: function (bytes) {
			return bytes.length === source.size && (png ? bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])) : /^GIF8[79]a$/.test(bytes.toString("ascii", 0, 6))) && crypto.createHash("sha256").update(bytes).digest("hex") === source.sha256;
		}});
	});
	state.total = entries.size;
	entries.forEach(function (entry) { state.totalBytes += entry.size; });
	function snapshot() {
		return Object.assign({}, state, {revision: revision, enabled: enabled, choice: choice, needsPrompt: choice === null, busy: !!operation,
			version: manifest.revision.slice(0, 8) + "." + options.sprites.revision.slice(0, 8)});
	}
	function notify(force) {
		if (!force && Date.now() - lastNotify < 250) return;
		lastNotify = Date.now(); revision++; if (options.onChange) options.onChange(snapshot());
	}
	async function atomic(filename, bytes) {
		await fs.mkdir(path.dirname(filename), {recursive: true});
		var temp = filename + "." + crypto.randomUUID() + ".tmp";
		try {
			await fs.writeFile(temp, bytes);
			for (var attempt = 0; ; attempt++) {
				try { await fs.rename(temp, filename); break; } catch (error) {
					if (attempt >= 5 || !["EPERM", "EACCES", "EBUSY"].includes(error.code)) throw error;
					await new Promise(function (resolve) { setTimeout(resolve, 40 * (attempt + 1)); });
				}
			}
		} finally { await fs.rm(temp, {force: true}); }
	}
	async function read(entry, filename) {
		try {
			if ((await fs.stat(filename)).size !== entry.size) return null;
			var bytes = await fs.readFile(filename); return entry.valid(bytes) ? bytes : null;
		} catch (error) { if (error.code === "ENOENT" || error.code === "ENOTDIR") return null; throw error; }
	}
	function account(entry) {
		if (readyFiles.has(entry.id)) return;
		readyFiles.add(entry.id); state.complete++; state.bytes += entry.size;
	}
	async function scan() {
		state.status = "checking"; state.checked = state.complete = state.bytes = state.failed = 0; readyFiles.clear(); notify(true);
		for (var entry of entries.values()) {
			var bytes = await read(entry, entry.file);
			if (!bytes && entry.legacy) {
				bytes = await read(entry, entry.legacy);
				if (bytes) await atomic(entry.file, bytes);
			}
			if (bytes) account(entry);
			state.checked++; notify(false);
		}
		state.status = state.complete === state.total ? "ready" : "missing";
		state.message = state.status === "ready" ? "All artwork for this app version is saved and verified." : "Download the missing artwork to use the complete collection offline.";
	}
	async function save(nextChoice, nextEnabled) {
		await atomic(preferences, JSON.stringify({version: 1, choice: nextChoice, enabled: nextEnabled}));
		choice = nextChoice; enabled = nextEnabled; notify(true);
	}
	var initialized = (async function () {
		try {
			var saved = JSON.parse(await fs.readFile(preferences, "utf8"));
			if (saved.version === 1 && ["download", "declined"].includes(saved.choice) && typeof saved.enabled === "boolean") { choice = saved.choice; enabled = saved.enabled; }
		} catch (error) { if (error.code !== "ENOENT") console.warn("Artwork preferences could not load:", error.code || error.message); }
		try { await scan(); } catch (error) { state.status = "error"; state.message = "Saved artwork could not be checked. Check folder access and try again."; }
		notify(true);
	})();
	async function run(action) {
		await initialized;
		if (operation) return snapshot();
		operation = Promise.resolve().then(action).catch(function (error) {
			state.status = "error"; state.message = "Artwork could not be saved. Check free space, folder access, and your connection, then try again.";
			console.warn("Artwork operation failed:", error.code || error.message);
		}).finally(function () { operation = null; controller = null; notify(true); });
		notify(true); return snapshot();
	}
	async function download() {
		controller = new AbortController(); var signal = controller.signal;
		await scan();
		state.status = "downloading"; state.message = "Downloading artwork. You can keep using the app."; state.failed = 0; notify(true);
		var missing = Array.from(entries.values()).filter(function (entry) { return !readyFiles.has(entry.id); }), cursor = 0, failures = 0;
		async function worker() {
			while (cursor < missing.length && !signal.aborted) {
				var entry = missing[cursor++];
				try {
					var response = await options.fetch(entry.url, {signal: AbortSignal.any([signal, AbortSignal.timeout(30000)]), redirect: "error"});
					if (!response.ok) throw new Error("Artwork download failed: " + response.status);
					var parts = [], total = 0;
					for await (var chunk of response.body) { total += chunk.length; if (total > entry.size) throw new Error("Artwork exceeds inventory size"); parts.push(Buffer.from(chunk)); }
					var bytes = Buffer.concat(parts);
					if (!entry.valid(bytes)) throw new Error("Artwork content did not match the inventory");
					await atomic(entry.file, bytes); account(entry); failures = 0;
				} catch (error) {
					if (!signal.aborted) {
						state.failed++; failures++; console.warn("Artwork download failed:", error.code || error.message);
						if (failures >= 6) controller.abort("download-failed");
					}
				}
				notify(false);
			}
		}
		await Promise.all(Array.from({length: 6}, worker));
		state.status = signal.aborted && signal.reason !== "download-failed" ? "paused" : state.complete === state.total ? "ready" : "error";
		state.message = state.status === "ready" ? "All artwork for this app version is saved and verified." : state.status === "paused" ? "Download paused. Saved files are kept; Download artwork continues where you left off." : "Some artwork could not download. Check your connection, free space, or update the app, then retry. Saved files are kept.";
	}
	return {
		allowsUrl: function (url) { return enabled && !!operation && state.status === "downloading" && !!controller && !controller.signal.aborted && downloadUrls.has(url); },
		getState: async function () { await initialized; return snapshot(); },
		check: function () { return run(scan); },
		choose: async function (value) {
			if (typeof value !== "boolean") throw new Error("Invalid artwork choice");
			await initialized; if (!value && controller) controller.abort(); await save(value ? "download" : "declined", value); return snapshot();
		},
		setEnabled: async function (value) {
			if (typeof value !== "boolean") throw new Error("Invalid artwork preference");
			await initialized; if (!value && controller) controller.abort(); await save(choice || "declined", value); return snapshot();
		},
		download: async function () { await initialized; if (operation) return snapshot(); await save("download", true); return run(download); },
		pause: async function () { await initialized; if (controller) controller.abort(); return snapshot(); },
		read: async function (route) {
			await initialized; var entry = routes.get(route);
			if (!enabled || !entry) return new Response("", {status: 404});
			try { var bytes = await read(entry, entry.file); if (bytes) return new Response(new Uint8Array(bytes), {headers: {"Content-Type": entry.type, "Cache-Control": "no-store"}}); } catch (error) { console.warn("Saved artwork unavailable:", error.code || error.message); }
			return new Response("", {status: 404});
		}
	};
}
module.exports = {createLibrary: createLibrary};
