// SPDX-License-Identifier: MIT
"use strict";

var childProcess = require("child_process");
var crypto = require("crypto");
var fs = require("fs/promises");
var os = require("os");
var path = require("path");
var pipeline = require("stream/promises").pipeline;
var createWriteStream = require("fs").createWriteStream;

var releaseRoot = "https://github.com/KotMatrosk1n/KM-Companion/releases/download/";
var registryKey = "HKLM\\Software\\KM Calculator";
var versionPattern = /^(0|[1-9]\d{0,2})\.(0|[1-9]\d{0,2})\.(0|[1-9]\d{0,4})$/;
var productCodePattern = /^\{[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}\}$/i;
var sha512Pattern = /^[A-Za-z0-9+/]{86}==$/;

function isMsiVersion(version) {
	if (typeof version !== "string" || !versionPattern.test(version)) return false;
	var parts = version.split(".").map(Number);
	return parts[0] <= 255 && parts[1] <= 255 && parts[2] <= 65535;
}

function getPatch(info, currentVersion) {
	var patch = info && info.windowsPatch;
	if (!patch || !isMsiVersion(info.version) || !isMsiVersion(currentVersion) ||
		info.version.localeCompare(currentVersion, "en", {numeric: true}) <= 0 ||
		!Array.isArray(patch.from) || !patch.from.includes(currentVersion) ||
		typeof patch.productCode !== "string" || !productCodePattern.test(patch.productCode) ||
		typeof patch.sha512 !== "string" || !sha512Pattern.test(patch.sha512)) return null;

	var installerName = "KM-Companion-Setup-" + info.version + ".exe";
	var installer = Array.isArray(info.files) && info.files.find(function (file) {
		return file && file.url === installerName;
	});
	if (!installer || !Number.isSafeInteger(installer.size) || !Number.isSafeInteger(patch.size) ||
		patch.size <= 0 || patch.size >= installer.size) return null;

	return {
		version: info.version,
		from: currentVersion,
		productCode: patch.productCode.toUpperCase(),
		sha512: patch.sha512,
		size: patch.size,
		url: releaseRoot + "v" + info.version + "/KM-Companion-Update-" + info.version + ".msp"
	};
}

function getAttemptPath(userData) {
	return path.join(userData, "windows-patch-attempt.txt");
}

function getAttemptKey(currentVersion, targetVersion) {
	return currentVersion + " > " + targetVersion;
}

async function alreadyAttempted(userData, currentVersion, targetVersion) {
	try {
		return await fs.readFile(getAttemptPath(userData), "utf8") === getAttemptKey(currentVersion, targetVersion);
	} catch (error) {
		if (error.code !== "ENOENT") throw error;
		return false;
	}
}

function queryRegistration(systemDirectory) {
	return new Promise(function (resolve, reject) {
		childProcess.execFile(path.join(systemDirectory, "reg.exe"), ["query", registryKey, "/reg:64"], {
			windowsHide: true,
			timeout: 5000
		}, function (error, output) {
			if (error) { reject(error); return; }
			var values = new Map();
			for (var line of output.split(/\r?\n/)) {
				var match = /^\s+(\w+)\s+REG_SZ\s+(.*?)\s*$/.exec(line);
				if (match) values.set(match[1], match[2]);
			}
			resolve(values);
		});
	});
}

async function isEligible(patch, executable, systemDirectory) {
	var programFiles = process.env.ProgramW6432 || process.env.ProgramFiles;
	if (!programFiles || !path.isAbsolute(programFiles)) return false;
	var expected = path.join(programFiles, "KM Companion", "KM Companion.exe");
	if (executable.toLowerCase() !== expected.toLowerCase() ||
		(await fs.realpath(executable)).toLowerCase() !== expected.toLowerCase()) return false;
	var values = await queryRegistration(systemDirectory);
	return values.get("InstallerFamily") === "BurnMsi" && values.get("InstallScope") === "perMachine" &&
		values.get("MainBinaryName") === "KM Companion.exe" && values.get("Version") === patch.from &&
		String(values.get("ProductCode")).toUpperCase() === patch.productCode &&
		path.resolve(values.get("InstallLocation") || "").toLowerCase() === path.dirname(expected).toLowerCase();
}

async function discard(download) {
	await fs.unlink(download.file).catch(function () {});
	await fs.unlink(download.file + ".ready").catch(function () {});
	await fs.rmdir(path.dirname(download.file)).catch(function () {});
}

async function downloadPatch(info, options) {
	if (process.platform !== "win32" || process.arch !== "x64") return null;
	var patch = getPatch(info, options.version);
	if (!patch || await alreadyAttempted(options.userData, patch.from, patch.version)) return null;
	var systemDirectory = path.join(process.env.SystemRoot || "C:\\Windows", "System32");
	if (!await isEligible(patch, options.executable, systemDirectory)) return null;
	var controller = new AbortController();
	var cancel = function () { controller.abort(); };
	options.token.onCancel(cancel);
	var downloaded;
	try {
		var response = await options.fetch(patch.url, {signal: controller.signal, credentials: "omit"});
		var actualUrl = new URL(response.url);
		if (!response.ok || !response.body || actualUrl.protocol !== "https:" ||
			!["github.com", "release-assets.githubusercontent.com"].includes(actualUrl.hostname)) {
			throw new Error("The release patch download could not be opened.");
		}
		var folder = await fs.mkdtemp(path.join(os.tmpdir(), "km-companion-patch-"));
		downloaded = {file: path.join(folder, "update.msp"), patch: patch, systemDirectory: systemDirectory};
		var hash = crypto.createHash("sha512");
		var transferred = 0;
		var started = Date.now();
		await pipeline(response.body, async function* (chunks) {
			for await (var chunk of chunks) {
				transferred += chunk.length;
				if (transferred > patch.size) throw new Error("The patch exceeded its expected size.");
				hash.update(chunk);
				options.progress({
					transferred: transferred,
					total: patch.size,
					percent: transferred / patch.size * 100,
					bytesPerSecond: transferred * 1000 / Math.max(1, Date.now() - started)
				});
				yield chunk;
			}
		}, createWriteStream(downloaded.file, {flags: "wx"}), {signal: controller.signal});
		if (transferred !== patch.size || hash.digest("base64") !== patch.sha512) {
			throw new Error("The patch did not match the release checksum or size.");
		}
		return downloaded;
	} catch (error) {
		if (downloaded) await discard(downloaded);
		throw error;
	} finally {
		options.token.removeListener("cancel", cancel);
	}
}

async function installPatch(download, options) {
	var runner = await fs.readFile(path.join(__dirname, "windows-apply-update.ps1"), "utf8");
	var patch = download.patch;
	var payload = Buffer.from(JSON.stringify({
		file: download.file,
		pid: process.pid,
		executable: options.executable,
		from: patch.from,
		version: patch.version,
		productCode: patch.productCode,
		sha512: patch.sha512,
		size: patch.size,
		log: path.join(options.userData, "windows-patch.log")
	})).toString("base64");
	var command = "$patch = ConvertFrom-Json ([Text.Encoding]::UTF8.GetString([Convert]::FromBase64String('" + payload + "')))\n" + runner;
	await fs.writeFile(getAttemptPath(options.userData), getAttemptKey(patch.from, patch.version), "utf8");
	await new Promise(function (resolve, reject) {
		var powershell = path.join(download.systemDirectory, "WindowsPowerShell", "v1.0", "powershell.exe");
		var child = childProcess.spawn(powershell, ["-NoProfile", "-NonInteractive", "-EncodedCommand",
			Buffer.from(command, "utf16le").toString("base64")], {windowsHide: true, detached: true, stdio: "ignore"});
		var poll = setInterval(function () {
			fs.access(download.file + ".ready").then(function () { finish(); }, function () {});
		}, 100);
		var timeout = setTimeout(function () {
			child.kill();
			finish(new Error("The Windows patch installer did not become ready."));
		}, 15000);
		function finish(error) {
			clearInterval(poll);
			clearTimeout(timeout);
			child.unref();
			if (error) reject(error);
			else resolve();
		}
		child.once("error", finish);
		child.once("exit", function (code) {
			finish(new Error("The Windows patch installer exited before handoff (" + code + ")."));
		});
	});
}

module.exports = {getPatch: getPatch, alreadyAttempted: alreadyAttempted, downloadPatch: downloadPatch,
	installPatch: installPatch, discard: discard};
