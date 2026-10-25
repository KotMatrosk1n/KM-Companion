// SPDX-License-Identifier: GPL-3.0-only
// Copyright (c) 2026 Matroskin
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import crypto from "node:crypto";
import {execFileSync} from "node:child_process";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const readJson = file => JSON.parse(fs.readFileSync(file, "utf8"));
const sha256 = bytes => crypto.createHash("sha256").update(bytes).digest("hex");

export function verifyIntegrity(bytes, integrity) {
  const entries = String(integrity || "").split(/\s+/).filter(Boolean);
  if (!entries.length || !entries.some(entry => {
    const separator = entry.indexOf("-");
    const algorithm = entry.slice(0, separator);
    return ["sha512", "sha256"].includes(algorithm) &&
      crypto.createHash(algorithm).update(bytes).digest("base64") === entry.slice(separator + 1);
  })) throw new Error("Source download integrity mismatch");
}

export function verifyReleaseCheckout(directory, version) {
  const git = args => execFileSync("git", args, {cwd: directory, encoding: "utf8"}).trim();
  if (git(["status", "--porcelain", "--untracked-files=normal"])) {
    throw new Error("Source packaging requires a clean checkout, including untracked source files.");
  }
  const commit = git(["rev-parse", "HEAD"]);
  if (git(["rev-parse", `refs/tags/v${version}^{commit}`]) !== commit) {
    throw new Error("Source packaging requires HEAD at the package version tag.");
  }
  const files = new Set(git(["ls-tree", "-r", "--name-only", "HEAD"]).split("\n"));
  for (const required of [
    "LICENSE", "LICENSING.md", "LICENSES/MIT-legacy.txt", "package-lock.json",
    "build", "src/js/save_import.js", "calc/package-lock.json", "import/package-lock.json",
    "import/THIRD_PARTY_NOTICES.md", "installer/windows/README.md",
    "scripts/copy-distribution-licenses.cjs", "scripts/release-sources.json",
    "scripts/package-release-source.mjs", ".github/workflows/release.yml"
  ]) {
    if (!files.has(required)) throw new Error("Missing release source: " + required);
  }
  return commit;
}

async function download(url) {
  if (new URL(url).protocol !== "https:") throw new Error("Source URL must use HTTPS");
  const response = await fetch(url, {signal: AbortSignal.timeout(120000)});
  if (!response.ok) throw new Error(`Source download failed (${response.status}): ${url}`);
  return Buffer.from(await response.arrayBuffer());
}

export async function packageReleaseSource(directory = root) {
  const pkg = readJson(path.join(directory, "package.json"));
  const lock = readJson(path.join(directory, "package-lock.json"));
  if (pkg.license !== "GPL-3.0-only" || lock.packages[""].license !== pkg.license) {
    throw new Error("Release metadata must declare GPL-3.0-only.");
  }
  const commit = verifyReleaseCheckout(directory, pkg.version);
  const config = readJson(path.join(directory, "scripts/release-sources.json"));
  const wix = config.archives.find(archive => archive.id === "wix");
  for (const relative of [
    "installer/windows/KMCalculator.Setup.Bundle/KMCalculator.Setup.Bundle.wixproj",
    "installer/windows/KMCalculator.Setup.Package/KMCalculator.Setup.Package.wixproj",
    "installer/windows/KMCalculator.Setup.UI/KMCalculator.Setup.UI.csproj"
  ]) {
    const text = fs.readFileSync(path.join(directory, relative), "utf8");
    const versions = [...text.matchAll(/WixToolset\.[^"\s]+(?:\/|"\s+Version=")(\d+\.\d+\.\d+)/g)];
    if (!versions.length || versions.some(match => match[1] !== wix.version)) {
      throw new Error("Update the WiX source archive for " + relative);
    }
  }
  // Reviewed TypeScript sources must stay paired with the exact shipped packages.
  for (const identity of Object.keys(config.compiledPackages)) {
    const split = identity.lastIndexOf("@");
    const name = identity.slice(0, split);
    if (lock.packages["node_modules/" + name]?.version !== identity.slice(split + 1)) {
      throw new Error("Update preferred-source mapping for " + identity);
    }
  }

  const output = path.join(directory, "release");
  fs.mkdirSync(output, {recursive: true});
  const sourceName = `KM-Companion-Source-${pkg.version}.zip`;
  const dependencyName = `KM-Companion-Dependencies-${pkg.version}.tar.gz`;
  const manifestName = `KM-Companion-Source-${pkg.version}.json`;
  const staging = fs.mkdtempSync(path.join(os.tmpdir(), "km-release-sources-"));
  try {
    const manifest = {
      version: pkg.version, commit, license: pkg.license,
      source: `https://github.com/KotMatrosk1n/KM-Companion/tree/${commit}`,
      electron: {
        version: lock.packages["node_modules/electron"].version,
        source: `https://github.com/electron/electron/releases/tag/v${lock.packages["node_modules/electron"].version}`,
        note: "Unmodified general-purpose runtime; retain LICENSE and LICENSES.chromium.html."
      },
      preferredSources: config.compiledPackages, packages: [], archives: [], files: []
    };
    for (const [location, entry] of Object.entries(lock.packages)) {
      if (!location || entry.dev) continue;
      const metadata = readJson(path.join(directory, location, "package.json"));
      if (metadata.version !== entry.version) throw new Error("Installed package mismatch: " + location);
      const bytes = await download(entry.resolved);
      verifyIntegrity(bytes, entry.integrity);
      const filename = location.replaceAll("/", "_") + "-" + entry.version + ".tgz";
      fs.writeFileSync(path.join(staging, filename), bytes);
      manifest.packages.push({
        location, name: metadata.name, version: entry.version, license: metadata.license,
        repository: metadata.repository, url: entry.resolved, integrity: entry.integrity,
        filename, sha256: sha256(bytes)
      });
    }
    for (const archive of config.archives) {
      const bytes = await download(archive.url);
      if (sha256(bytes) !== archive.sha256) throw new Error("Upstream source hash mismatch: " + archive.id);
      const filename = `${archive.id}-${archive.revision}.zip`;
      fs.writeFileSync(path.join(staging, filename), bytes);
      manifest.archives.push({...archive, filename});
    }
    fs.writeFileSync(path.join(staging, "SOURCES.json"), JSON.stringify(manifest, null, 2) + "\n");
    // Archive the exact tracked source tree, excluding local files and build outputs.
    execFileSync("git", ["archive", "--format=zip", `--prefix=KM-Companion-${pkg.version}/`,
      "--output=" + path.join(output, sourceName), commit], {cwd: directory});
    execFileSync("tar", ["-czf", path.join(output, dependencyName), "-C", staging, "."], {cwd: directory});
    for (const name of [sourceName, dependencyName]) {
      manifest.files.push({name, sha256: sha256(fs.readFileSync(path.join(output, name)))});
    }
    fs.writeFileSync(path.join(output, manifestName), JSON.stringify(manifest, null, 2) + "\n");
    fs.writeFileSync(path.join(output, `KM-Companion-Source-${pkg.version}.sha256`),
      [...manifest.files, {name: manifestName, sha256: sha256(fs.readFileSync(path.join(output, manifestName)))}]
        .map(file => `${file.sha256}  ${file.name}`).join("\n") + "\n");
    console.log(`Prepared matching source for ${commit}: ${sourceName}, ${dependencyName}`);
    return manifest;
  } finally {
    // Remove only the unique temporary directory created by this invocation.
    if (path.dirname(staging) !== path.resolve(os.tmpdir()) ||
        !path.basename(staging).startsWith("km-release-sources-")) throw new Error("Unsafe temporary directory");
    fs.rmSync(staging, {recursive: true, force: true});
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await packageReleaseSource();
}
