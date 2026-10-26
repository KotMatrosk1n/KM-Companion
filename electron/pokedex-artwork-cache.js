/* SPDX-License-Identifier: GPL-3.0-only */
/* Only official artwork in the pinned public inventory may be fetched. */
var fs = require("fs/promises");
var path = require("path");
var crypto = require("crypto");
var ARTWORK_REVISION = "97a7832d307311c0e1c6ea9035308bf80cc94f81";
var ARTWORK_BASE = "https://raw.githubusercontent.com/PokeAPI/sprites/" + ARTWORK_REVISION + "/";
var ARTWORK_DIRECTORY = "sprites/pokemon/other/official-artwork/";
var PNG_SIGNATURE = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

function isArtworkUrl(value) {
	try {
		var url = new URL(value);
		return url.href.indexOf(ARTWORK_BASE + ARTWORK_DIRECTORY) === 0 &&
			/\/official-artwork\/\d+\.png$/.test(url.pathname) && !url.search && !url.hash;
	} catch (error) { return false; }
}
function validBytes(bytes, entry) {
	return bytes.length === entry.size && bytes.length >= 33 && bytes.subarray(0, 8).equals(PNG_SIGNATURE) &&
		bytes.toString("ascii", 12, 16) === "IHDR" && bytes.readUInt32BE(16) > 0 && bytes.readUInt32BE(16) <= 4096 &&
		bytes.readUInt32BE(20) > 0 && bytes.readUInt32BE(20) <= 4096 &&
		crypto.createHash("sha1").update("blob " + bytes.length + "\0").update(bytes).digest("hex") === entry.sha;
}
function createCache(options) {
	var pending = new Map();
	async function read(entry) {
		var filename = path.join(options.directory, entry.sha + ".png");
		try {
			var cached = await fs.readFile(filename);
			if (validBytes(cached, entry)) return cached;
		} catch (error) { if (error.code !== "ENOENT") throw error; }
		var response = await options.fetch(ARTWORK_BASE + entry.path, {signal: AbortSignal.timeout(20000), redirect: "error"});
		if (!response.ok) throw new Error("Artwork download failed");
		var parts = [], total = 0;
		for await (var chunk of response.body) {
			total += chunk.length;
			if (total > entry.size) throw new Error("Unexpected artwork size");
			parts.push(Buffer.from(chunk));
		}
		var bytes = Buffer.concat(parts);
		if (!validBytes(bytes, entry)) throw new Error("Artwork content did not match the inventory");
		await fs.mkdir(options.directory, {recursive: true});
		var temporary = filename + ".tmp";
		await fs.writeFile(temporary, bytes);
		await fs.rename(temporary, filename);
		return bytes;
	}
	return async function (key) {
		var manifest = options.manifest;
		var entry = manifest.revision === ARTWORK_REVISION && Object.prototype.hasOwnProperty.call(manifest.artwork, key) ? manifest.artwork[key] : null;
		if (!entry || !isArtworkUrl(ARTWORK_BASE + entry.path) || !/^[a-f0-9]{40}$/.test(entry.sha) || entry.size > 4 * 1024 * 1024 || entry.size < 33) return new Response("", {status: 404});
		if (!pending.has(entry.sha)) pending.set(entry.sha, read(entry).finally(function () { pending.delete(entry.sha); }));
		try {
			var bytes = await pending.get(entry.sha);
			return new Response(new Uint8Array(bytes), {headers: {"Content-Type": "image/png", "Cache-Control": "public, max-age=31536000, immutable"}});
		} catch (error) {
			console.warn("Dex artwork unavailable:", error.code || error.message);
			return new Response("Artwork unavailable. Check your connection and retry.", {status: 503});
		}
	};
}
module.exports = {createCache: createCache, isArtworkUrl: isArtworkUrl, validBytes: validBytes, ARTWORK_REVISION: ARTWORK_REVISION};
