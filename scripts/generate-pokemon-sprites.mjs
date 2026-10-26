// SPDX-License-Identifier: GPL-3.0-only
// Run sprites:download explicitly before reviewing a new sprite inventory.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const entries = {};
for (const [folder, extension] of [["gen5", "png"], ["ani", "gif"]]) {
  const directory = path.join(root, "electron/sprites", folder);
  for (const filename of fs.readdirSync(directory).sort()) {
    if (!new RegExp("^[a-z0-9-]+\\." + extension + "$").test(filename)) throw new Error("Unexpected sprite: " + filename);
    const bytes = fs.readFileSync(path.join(directory, filename));
    const valid = extension === "png" ? bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])) : /^GIF8[79]a$/.test(bytes.toString("ascii", 0, 6));
    if (!valid || bytes.length > 4 * 1024 * 1024) throw new Error("Invalid sprite: " + filename);
    entries[folder + "/" + filename] = {size: bytes.length, sha256: crypto.createHash("sha256").update(bytes).digest("hex")};
  }
}
const revision = crypto.createHash("sha256").update(JSON.stringify(entries)).digest("hex");
const manifest = {version: 1, revision, baseUrl: "https://play.pokemonshowdown.com/sprites/", sprites: entries};
fs.writeFileSync(path.join(root, "src/data/pokemon-sprites.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(JSON.stringify({files: Object.keys(entries).length, bytes: Object.values(entries).reduce((n, e) => n + e.size, 0), revision}));
