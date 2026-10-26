var path = require("path");
var fsSync = require("fs");
var fs = require("fs/promises");
var os = require("os");
var pathToFileURL = require("url").pathToFileURL;
var builderUtilRuntime = require("builder-util-runtime");
var electron = require("electron");
var electronUpdater = require("electron-updater");
var pokemonArtwork = require("./pokemon-artwork");
var pokemonArtworkLibrary;
var CancellationToken = builderUtilRuntime.CancellationToken;
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var dialog = electron.dialog;
var ipcMain = electron.ipcMain;
var Menu = electron.Menu;
var net = electron.net;
var protocol = electron.protocol;
var screen = electron.screen;
var session = electron.session;
var shell = electron.shell;
var autoUpdater = electronUpdater.autoUpdater;

// Keep the existing scheme so origin-scoped localStorage remains available after the product rebrand.
var APP_SCHEME = "royal-sword";
var APP_HOST = "app";
var APP_DISPLAY_NAME = "KM Companion";
// Retain the existing data directory so renaming the app preserves every profile and backup.
var APP_USER_DATA_DIRECTORY = "KM Calculator";
var APP_ICON_PATH = path.join(__dirname, "assets", "km-companion-icon.png");
var APP_STORAGE_FILE = "app-storage.json";
var MAIN_WINDOW_STATE_FILE = "main-window-state.json";
var UPDATER_LOG_FILE = "updater.log";
var MAIN_WINDOW_DEFAULT_WIDTH = 1480;
var MAIN_WINDOW_DEFAULT_HEIGHT = 960;
var MAIN_WINDOW_MIN_WIDTH = 900;
var MAIN_WINDOW_MIN_HEIGHT = 600;
var LOCAL_SPRITE_ROUTE_PREFIX = "/local-sprites/";
var UPDATER_CACHE_DIR_NAMES = ["km-calculator-updater", "km-companion-updater"];
var UPDATE_CHECK_DELAY_MS = 0;
var UPDATE_FIRST_PROGRESS_TIMEOUT_MS = 30000;
var UPDATE_STALL_TIMEOUT_MS = 90000;
var UPDATE_STALL_CHECK_INTERVAL_MS = 5000;
var UPDATE_INSTALL_HANDOFF_DELAY_MS = 2500;
var STALE_UPDATE_CACHE_CLEANUP_DELAY_MS = 3000;
var APP_STORAGE_WRITE_DELAY_MS = 250;
var ALLOWED_RENDERER_NETWORK_ORIGINS = [];
var activeUpdateInfo = null;
var updaterMainWindow = null;
var updaterConfigured = false;
var updaterIpcRegistered = false;
var updateCheckPromise = null;
var updateDownloadInProgress = false;
var updateInstallAuthorized = false;
var updateDownloadedReady = false;
var updateDownloadCancellationToken = null;
var updateDownloadInfo = null;
var updateDownloadWatchdog = null;
var updateLastProgressAt = 0;
var updateLastProgressPercent = 0;
var updateLastProgressBytes = 0;
var updateLastLoggedProgressPercent = -1;
var updaterState = {
	status: "idle",
	message: "Not checked",
	version: "",
	percent: null,
	transferred: 0,
	total: 0,
	bytesPerSecond: 0,
	error: "",
	errorTitle: "",
	nextStep: ""
};
var appStorageCache = null;
var appStorageWriteTimer = null;
app.setName(APP_DISPLAY_NAME);
if (app.isPackaged) {
	var kmCalculatorUserDataPath = path.join(app.getPath("appData"), APP_USER_DATA_DIRECTORY);
	app.setPath("userData", kmCalculatorUserDataPath);
}

protocol.registerSchemesAsPrivileged([
	{
		scheme: APP_SCHEME,
		privileges: {
			standard: true,
			secure: true,
			supportFetchAPI: true,
			corsEnabled: true
		}
	}
]);

function getDistRoot() {
	return path.join(app.getAppPath(), "dist");
}

function getSpriteRoot() {
	if (app.isPackaged) return path.join(process.resourcesPath, "sprites");
	return path.join(__dirname, "sprites");
}

function resolveInside(rootPath, requestedPath) {
	var resolvedRoot = path.resolve(rootPath);
	var relativeRequestedPath = String(requestedPath || "").replace(/^[/\\]+/, "");
	var filePath = path.resolve(resolvedRoot, relativeRequestedPath);
	var relativePath = path.relative(resolvedRoot, filePath);
	if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) return null;
	return filePath;
}

function getRequestedFilePath(requestUrl) {
	var url;
	var pathname;
	try {
		url = new URL(requestUrl);
		pathname = decodeURIComponent(url.pathname);
	} catch (error) {
		var message = error && error.message ? error.message : error;
		console.warn("Invalid app protocol request:", message);
		return path.join(getDistRoot(), "index.html");
	}
	if (pathname.indexOf(LOCAL_SPRITE_ROUTE_PREFIX) === 0) {
		var requestedSpritePath = pathname.slice(LOCAL_SPRITE_ROUTE_PREFIX.length);
		if (!requestedSpritePath) return null;
		return resolveInside(getSpriteRoot(), requestedSpritePath);
	}
	if (pathname === "/" || pathname === "") pathname = "/index.html";
	var distRoot = getDistRoot();
	var filePath = resolveInside(distRoot, pathname);
	if (!filePath) return path.join(distRoot, "index.html");
	return filePath;
}

function fetchLocalFile(filePath) {
	return fs.stat(filePath).then(function (stats) {
		if (!stats.isFile()) return new Response("", {status: 404});
		return net.fetch(pathToFileURL(filePath).toString());
	}).catch(function (error) {
		if (error && (error.code === "ENOENT" || error.code === "ENOTDIR")) {
			return new Response("", {status: 404});
		}
		throw error;
	});
}

function registerAppProtocol() {
	protocol.handle(APP_SCHEME, function (request) {
		var artworkUrl = parseUrl(request.url);
		if (!artworkUrl || !isAppUrl(request.url)) return new Response("", {status: 404});
		if (artworkUrl.pathname.indexOf("/pokedex-artwork/") === 0 || artworkUrl.pathname.indexOf(LOCAL_SPRITE_ROUTE_PREFIX) === 0) {
			return pokemonArtworkLibrary.read(artworkUrl.pathname.slice(1));
		}
		var filePath = getRequestedFilePath(request.url);
		if (!filePath) return new Response("", {status: 404});
		return fetchLocalFile(filePath);
	});
}

function isAllowedRendererNetworkUrl(url) {
	var parsedUrl = parseUrl(url);
	if (!parsedUrl) return true;
	if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") return true;
	if (pokemonArtworkLibrary && pokemonArtworkLibrary.allowsUrl(url)) return true;
	return ALLOWED_RENDERER_NETWORK_ORIGINS.indexOf(parsedUrl.origin) !== -1;
}

function configureRendererRequestPolicy() {
	session.defaultSession.webRequest.onBeforeRequest(function (details, callback) {
		if (isAllowedRendererNetworkUrl(details.url)) {
			callback({cancel: false});
			return;
		}
		console.warn("Blocked renderer network request:", details.url);
		callback({cancel: true});
	});
}

function isExternalUrl(url) {
	var parsedUrl = parseUrl(url);
	return !!parsedUrl && (parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:");
}

function isAppUrl(url) {
	var parsedUrl = parseUrl(url);
	return !!parsedUrl && parsedUrl.protocol === APP_SCHEME + ":" && parsedUrl.hostname === APP_HOST;
}

function parseUrl(url) {
	try {
		return new URL(url);
	} catch (error) {
		void error;
		return null;
	}
}

function openExternalUrl(url) {
	var parsedUrl = parseUrl(url);
	if (!parsedUrl || (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:")) return false;
	shell.openExternal(parsedUrl.href).catch(function (error) {
		var message = error && error.message ? error.message : error;
		console.warn("External link failed:", message);
	});
	return true;
}

function getVersionLabel(version) {
	if (!version) return "";
	return /^v/i.test(version) ? version : "v" + version;
}

function getUpdateVersionLabel(info) {
	return getVersionLabel(info && info.version);
}

function getAppCacheRoot() {
	if (process.platform === "win32") {
		return process.env.LOCALAPPDATA || path.join(os.homedir(), "AppData", "Local");
	}
	if (process.platform === "darwin") {
		return path.join(os.homedir(), "Library", "Caches");
	}
	return process.env.XDG_CACHE_HOME || path.join(os.homedir(), ".cache");
}

function getUpdaterLogPath() {
	return path.join(app.getPath("userData"), UPDATER_LOG_FILE);
}

function getAppStoragePath() {
	return path.join(app.getPath("userData"), APP_STORAGE_FILE);
}

function normalizeAppStorageKey(key) {
	key = key === undefined || key === null ? "" : String(key);
	if (!key || key.length > 512) return "";
	return key;
}

function readAppStorageCache() {
	var raw;
	if (appStorageCache) return appStorageCache;
	try {
		raw = fsSync.readFileSync(getAppStoragePath(), "utf8");
		appStorageCache = JSON.parse(raw);
		if (!appStorageCache || typeof appStorageCache !== "object" || Array.isArray(appStorageCache)) {
			appStorageCache = {};
		}
	} catch (error) {
		if (error && error.code !== "ENOENT") {
			console.warn("Could not read app storage:", error.message || error);
		}
		appStorageCache = {};
	}
	return appStorageCache;
}

function writeAppStorageNow() {
	var storagePath = getAppStoragePath();
	var tempPath = storagePath + ".tmp";
	if (appStorageWriteTimer) {
		clearTimeout(appStorageWriteTimer);
		appStorageWriteTimer = null;
	}
	try {
		fsSync.mkdirSync(path.dirname(storagePath), {recursive: true});
		fsSync.writeFileSync(tempPath, JSON.stringify(readAppStorageCache(), null, 2), "utf8");
		fsSync.renameSync(tempPath, storagePath);
	} catch (error) {
		console.warn("Could not write app storage:", error.message || error);
	}
}

function queueAppStorageWrite() {
	if (appStorageWriteTimer) clearTimeout(appStorageWriteTimer);
	appStorageWriteTimer = setTimeout(writeAppStorageNow, APP_STORAGE_WRITE_DELAY_MS);
}

function setAppStorageValue(key, value) {
	key = normalizeAppStorageKey(key);
	if (!key) return;
	readAppStorageCache()[key] = value === undefined || value === null ? "" : String(value);
	queueAppStorageWrite();
}

function removeAppStorageValue(key) {
	key = normalizeAppStorageKey(key);
	if (!key) return;
	delete readAppStorageCache()[key];
	queueAppStorageWrite();
}

function clearAppStorageByPrefix(prefix) {
	var storage = readAppStorageCache();
	var changed = false;
	prefix = prefix === undefined || prefix === null ? "" : String(prefix);
	Object.keys(storage).forEach(function (key) {
		if (key.indexOf(prefix) !== 0) return;
		delete storage[key];
		changed = true;
	});
	if (changed) queueAppStorageWrite();
}

function registerAppStorageIpc() {
	require("./run-tools")({
		data: require(path.join(__dirname, app.isPackaged ? "../dist/js/run_data.js" : "../src/js/run_data.js")),
		ipcMain: ipcMain, BrowserWindow: BrowserWindow, dialog: dialog, isAppUrl: isAppUrl,
		userData: function () { return app.getPath("userData"); }, version: function () { return app.getVersion(); },
		storagePath: getAppStoragePath, readStorage: readAppStorageCache,
		replaceStorage: function (next) {
			if (appStorageWriteTimer) clearTimeout(appStorageWriteTimer);
			appStorageWriteTimer = null; appStorageCache = next;
		}
	});
	ipcMain.on("km-calculator-storage-snapshot", function (event) {
		event.returnValue = readAppStorageCache();
	});
	ipcMain.on("km-calculator-storage-set", function (event, key, value) {
		setAppStorageValue(key, value);
	});
	ipcMain.on("km-calculator-storage-remove", function (event, key) {
		removeAppStorageValue(key);
	});
	ipcMain.on("km-calculator-storage-clear-prefix", function (event, prefix) {
		clearAppStorageByPrefix(prefix);
	});
}

function registerAppDialogIpc() {
	ipcMain.on("km-calculator-dialog", function (event, kind, message) {
		var parent = null;
		var accepted = false;
		try {
			if (kind !== "alert" && kind !== "confirm") return;
			if (typeof message !== "string") return;
			if (!event.senderFrame || event.senderFrame !== event.sender.mainFrame ||
				!isAppUrl(event.senderFrame.url)) return;
			parent = BrowserWindow.fromWebContents(event.sender);
			if (!parent || parent.isDestroyed() || event.sender.isDestroyed()) return;
			var isConfirm = kind === "confirm";
			var response = dialog.showMessageBoxSync(parent, {
				type: isConfirm ? "question" : "info",
				title: APP_DISPLAY_NAME,
				message: message,
				buttons: isConfirm ? ["OK", "Cancel"] : ["OK"],
				defaultId: isConfirm ? 1 : 0,
				cancelId: isConfirm ? 1 : 0,
				noLink: true
			});
			accepted = response === 0;
		} catch (error) {
			console.warn("Could not show calculator dialog:", error.message || error);
		} finally {
			// Native dialogs can leave the Windows renderer without keyboard focus.
			try {
				if (parent && !parent.isDestroyed() && !event.sender.isDestroyed()) {
					parent.focus();
					event.sender.focus();
				}
			} catch (error) {
				console.warn("Could not restore calculator focus:", error.message || error);
			} finally {
				event.returnValue = accepted;
			}
		}
	});
}

function stringifyUpdaterLogPart(part) {
	if (part instanceof Error) return part.stack || part.message;
	if (typeof part === "string") return part;
	if (part === undefined) return "undefined";
	try {
		return JSON.stringify(part);
	} catch (error) {
		void error;
		return String(part);
	}
}

function writeUpdaterLog(level) {
	var parts = Array.prototype.slice.call(arguments, 1);
	var message = parts.map(stringifyUpdaterLogPart).join(" ");
	var logLine = "[" + new Date().toISOString() + "] [" + level + "] " + message + os.EOL;
	var consoleMethod = console[level] || console.log;
	consoleMethod.call(console, "[updater]", message);
	try {
		fsSync.mkdirSync(path.dirname(getUpdaterLogPath()), {recursive: true});
		fsSync.appendFileSync(getUpdaterLogPath(), logLine, "utf8");
	} catch (error) {
		console.warn("Could not write updater log:", error.message || error);
	}
}

var updaterLogger = {
	info: function () {
		writeUpdaterLog.apply(null, ["info"].concat(Array.prototype.slice.call(arguments)));
	},
	warn: function () {
		writeUpdaterLog.apply(null, ["warn"].concat(Array.prototype.slice.call(arguments)));
	},
	error: function () {
		writeUpdaterLog.apply(null, ["error"].concat(Array.prototype.slice.call(arguments)));
	},
	debug: function () {
		writeUpdaterLog.apply(null, ["info"].concat(Array.prototype.slice.call(arguments)));
	}
};

function parseVersionParts(version) {
	var match = String(version || "").match(/(\d+)\.(\d+)\.(\d+)/);
	if (!match) return null;
	return [
		Number(match[1]),
		Number(match[2]),
		Number(match[3])
	];
}

function compareVersionParts(left, right) {
	for (var index = 0; index < 3; index++) {
		if (left[index] > right[index]) return 1;
		if (left[index] < right[index]) return -1;
	}
	return 0;
}

function getCachedInstallerVersion(fileName) {
	var match = String(fileName || "").match(/(\d+\.\d+\.\d+)(?:[-+][0-9A-Za-z.-]+)?(?=\.exe$)/i);
	return match ? match[1] : "";
}

function isPathInside(parentPath, childPath) {
	var relativePath = path.relative(parentPath, childPath);
	return relativePath !== "" && !relativePath.startsWith("..") && !path.isAbsolute(relativePath);
}

async function cleanUpdaterCacheDir(cacheRoot, cacheDirName, currentVersionParts) {
	var resolvedCacheRoot = path.resolve(cacheRoot);
	var cacheDir = path.resolve(resolvedCacheRoot, cacheDirName);
	var pendingDir = path.join(cacheDir, "pending");
	if (!isPathInside(resolvedCacheRoot, pendingDir)) return;

	var updateInfoPath = path.join(pendingDir, "update-info.json");
	var updateInfo;
	try {
		updateInfo = JSON.parse(await fs.readFile(updateInfoPath, "utf8"));
	} catch (error) {
		if (error && error.code !== "ENOENT") {
			console.warn("Could not read updater cache info:", error.message || error);
		}
		return;
	}

	var fileName = updateInfo && typeof updateInfo.fileName === "string" ? updateInfo.fileName : "";
	if (!fileName || fileName !== path.basename(fileName)) return;

	var cachedVersionParts = parseVersionParts(getCachedInstallerVersion(fileName));
	if (!cachedVersionParts || compareVersionParts(cachedVersionParts, currentVersionParts) > 0) return;

	try {
		await fs.rm(pendingDir, {recursive: true, force: true});
		console.info("Cleaned stale updater cache:", path.join(cacheDirName, "pending"));
	} catch (error) {
		console.warn("Could not clean stale updater cache:", error.message || error);
	}
}

function scheduleStaleUpdaterCacheCleanup() {
	if (!app.isPackaged) return;
	var currentVersionParts = parseVersionParts(app.getVersion());
	if (!currentVersionParts) return;

	setTimeout(function () {
		var cacheRoot = getAppCacheRoot();
		Promise.all(UPDATER_CACHE_DIR_NAMES.map(function (cacheDirName) {
			return cleanUpdaterCacheDir(cacheRoot, cacheDirName, currentVersionParts);
		})).catch(function (error) {
			console.warn("Updater cache cleanup failed:", error.message || error);
		});
	}, STALE_UPDATE_CACHE_CLEANUP_DELAY_MS);
}

function getMainWindowTitle() {
	return APP_DISPLAY_NAME + " " + getVersionLabel(app.getVersion());
}

function getReleaseNotesUrl(info) {
	if (info && info.version) {
		return "https://github.com/KotMatrosk1n/KM-Companion/releases/tag/v" + encodeURIComponent(info.version);
	}
	return "https://github.com/KotMatrosk1n/KM-Companion/releases";
}

function getUpdaterErrorText(error) {
	if (!error) return "";
	var parts = [];
	if (error.code) parts.push(String(error.code));
	if (error.name) parts.push(String(error.name));
	if (error.message) parts.push(String(error.message));
	return parts.join(" ");
}

function createUpdaterDiagnosticError(code, message) {
	var error = new Error(message);
	error.code = code;
	return error;
}

function getUpdaterDiagnostic(error, stage) {
	var rawText = getUpdaterErrorText(error);
	var text = rawText.toLowerCase();

	if (/err_updater_download_stalled|download stalled|stopped reporting progress|timeout|timed out/.test(text)) {
		return {
			title: "Update download stalled",
			detail: "The update download stopped reporting progress. This is usually a connection issue, a blocked download, or GitHub being temporarily slow.",
			nextStep: "Retry the download. If it stalls again, use Manual Download to install the latest release from GitHub."
		};
	}
	if (/enospc|no space|not enough disk|disk full/.test(text)) {
		return {
			title: "Not enough disk space",
			detail: "The updater could not save the installer because the system appears to be low on disk space.",
			nextStep: "Free some space, then retry the update."
		};
	}
	if (/eacces|eperm|permission|access is denied|used by another process/.test(text)) {
		return {
			title: "Permission problem",
			detail: "Windows blocked the updater from writing or replacing a file. This can happen when another copy of the app or installer is still open.",
			nextStep: "Close other KM Companion windows and retry. If Windows asks for permission during install, approve the prompt."
		};
	}
	if (/checksum|sha512|sha256|signature|verify|verification|digest/.test(text)) {
		return {
			title: "Update verification failed",
			detail: "The downloaded update did not match the release metadata, so the app refused to apply it.",
			nextStep: "Retry once. If it repeats, use Manual Download or wait for the release assets to be corrected."
		};
	}
	if (/latest\.yml|channel_file|latest version|asset_not_found|no files provided|404|not found/.test(text)) {
		return {
			title: "Release metadata problem",
			detail: "The updater could not find the release metadata or installer asset it needs for automatic updates.",
			nextStep: "Use Manual Download from the release page, or wait for the release assets to be corrected."
		};
	}
	if (/enotfound|econnreset|econnrefused|eai_again|etimedout|network|offline|internet|certificate|ssl|tls|proxy/.test(text)) {
		return {
			title: "Network problem",
			detail: "The updater could not reach the download server or the connection was interrupted.",
			nextStep: "Check your internet connection, VPN, proxy, or firewall, then retry the update."
		};
	}
	if (stage === "check") {
		return {
			title: "Update check failed",
			detail: "KM Companion could not check for updates right now.",
			nextStep: "Check your internet connection, then try again from Settings."
		};
	}
	if (stage === "install") {
		return {
			title: "Update install failed",
			detail: "KM Companion could not start the update installer.",
			nextStep: "Try again. If it still fails, open the release page and install the latest version manually."
		};
	}
	return {
		title: "Update download failed",
		detail: "The updater could not complete the download.",
		nextStep: "Retry the update. If it fails again, use Manual Download from the release page."
	};
}

function normalizeUpdateNotes(info) {
	var notes = info && info.releaseNotes;
	var normalized = "";
	if (Array.isArray(notes)) {
		normalized = notes.map(function (entry) {
			if (typeof entry === "string") return entry;
			if (!entry || typeof entry !== "object") return "";
			var version = entry.version ? getVersionLabel(String(entry.version)) + "\n" : "";
			return version + String(entry.note || entry.notes || entry.body || "");
		}).filter(Boolean).join("\n\n");
	} else if (notes && typeof notes === "object") {
		normalized = String(notes.note || notes.notes || notes.body || "");
	} else if (typeof notes === "string") {
		normalized = notes;
	}
	if (!normalized && info && info.releaseName) normalized = String(info.releaseName);
	return normalized.trim().slice(0, 4000);
}

function isUpdaterBusy() {
	return updaterState.status === "checking" ||
		updaterState.status === "downloading" ||
		updaterState.status === "installing";
}

function getUpdaterStateSnapshot() {
	var info = activeUpdateInfo;
	var busy = isUpdaterBusy();
	return {
		appVersion: app.getVersion(),
		packaged: app.isPackaged,
		status: updaterState.status,
		message: updaterState.message,
		version: updaterState.version || (info && info.version) || "",
		available: !!info,
		percent: updaterState.percent,
		transferred: updaterState.transferred,
		total: updaterState.total,
		bytesPerSecond: updaterState.bytesPerSecond,
		error: updaterState.error,
		errorTitle: updaterState.errorTitle,
		nextStep: updaterState.nextStep,
		releaseNotes: normalizeUpdateNotes(info),
		releaseUrl: getReleaseNotesUrl(info),
		busy: busy,
		canCheck: app.isPackaged && !busy,
		canInstall: app.isPackaged && !!info && !busy
	};
}

function broadcastUpdaterState() {
	if (!updaterMainWindow || updaterMainWindow.isDestroyed()) return;
	try {
		updaterMainWindow.webContents.send("km-calculator-update-state-changed", getUpdaterStateSnapshot());
	} catch (error) {
		console.warn("Could not send updater state:", error.message || error);
	}
}

function setUpdaterState(patch) {
	Object.keys(patch || {}).forEach(function (key) {
		if (Object.prototype.hasOwnProperty.call(updaterState, key)) updaterState[key] = patch[key];
	});
	broadcastUpdaterState();
}

function attachUpdaterMainWindow(mainWindow) {
	updaterMainWindow = mainWindow;
	mainWindow.webContents.once("did-finish-load", broadcastUpdaterState);
	mainWindow.once("closed", function () {
		if (updaterMainWindow === mainWindow) updaterMainWindow = null;
	});
}

function getUpdaterSenderUrl(event) {
	if (event.senderFrame && event.senderFrame.url) return event.senderFrame.url;
	if (event.sender && typeof event.sender.getURL === "function") return event.sender.getURL();
	return "";
}

function assertTrustedUpdaterEvent(event) {
	if (!isAppUrl(getUpdaterSenderUrl(event))) throw new Error("Updater request rejected.");
}

function registerUpdaterIpc() {
	if (updaterIpcRegistered) return;
	updaterIpcRegistered = true;

	ipcMain.handle("km-calculator-update-state", function (event) {
		assertTrustedUpdaterEvent(event);
		return getUpdaterStateSnapshot();
	});
	ipcMain.handle("km-calculator-update-check", function (event) {
		assertTrustedUpdaterEvent(event);
		return performUpdateCheck("manual");
	});
	ipcMain.handle("km-calculator-update-install", function (event) {
		assertTrustedUpdaterEvent(event);
		return installAvailableUpdate();
	});
	ipcMain.handle("km-calculator-update-open-release", function (event) {
		assertTrustedUpdaterEvent(event);
		return openExternalUrl(getReleaseNotesUrl(activeUpdateInfo));
	});
}

function registerArtworkIpc() {
	pokemonArtworkLibrary = pokemonArtwork.createLibrary({
		directory: app.getPath("userData"), legacySprites: getSpriteRoot(),
		illustrations: JSON.parse(fsSync.readFileSync(path.join(getDistRoot(), "data/pokedex-artwork.json"), "utf8")),
		sprites: JSON.parse(fsSync.readFileSync(path.join(getDistRoot(), "data/pokemon-sprites.json"), "utf8")),
		fetch: function (url, options) { return net.fetch(url, options); },
		onChange: function (state) {
			BrowserWindow.getAllWindows().forEach(function (win) {
				if (!win.isDestroyed() && isAppUrl(win.webContents.getURL())) win.webContents.send("km-calculator-artwork-changed", state);
			});
		}
	});
	["getState", "check", "choose", "setEnabled", "download", "pause"].forEach(function (method) {
		ipcMain.handle("km-calculator-artwork-" + method, function (event, value) {
			if (!event.senderFrame || event.senderFrame !== event.sender.mainFrame || !isAppUrl(event.senderFrame.url)) throw new Error("Artwork request rejected.");
			return pokemonArtworkLibrary[method](value);
		});
	});
}

function stopUpdateDownloadWatchdog() {
	if (!updateDownloadWatchdog) return;
	clearInterval(updateDownloadWatchdog);
	updateDownloadWatchdog = null;
}

function startUpdateDownloadWatchdog() {
	stopUpdateDownloadWatchdog();
	updateLastProgressAt = Date.now();
	updateLastProgressPercent = 0;
	updateLastProgressBytes = 0;

	updateDownloadWatchdog = setInterval(function () {
		if (!updateDownloadInProgress) {
			stopUpdateDownloadWatchdog();
			return;
		}

		var elapsed = Date.now() - updateLastProgressAt;
		var hasProgress = updateLastProgressPercent > 0 || updateLastProgressBytes > 0;
		var timeoutMs = hasProgress ? UPDATE_STALL_TIMEOUT_MS : UPDATE_FIRST_PROGRESS_TIMEOUT_MS;
		if (elapsed < timeoutMs) return;

		var error = createUpdaterDiagnosticError(
			"ERR_UPDATER_DOWNLOAD_STALLED",
			"Update download stalled after " + Math.round(timeoutMs / 1000) + " seconds without progress."
		);
		if (updateDownloadCancellationToken && !updateDownloadCancellationToken.cancelled) {
			updateDownloadCancellationToken.cancel();
		}
		handleUpdaterError(error, "download");
	}, UPDATE_STALL_CHECK_INTERVAL_MS);
}

function getUpdaterErrorStage() {
	if (updaterState.status === "installing" ||
		(updateInstallAuthorized && updateDownloadedReady && !updateDownloadInProgress)) {
		return "install";
	}
	if (updateDownloadInProgress) return "download";
	return "check";
}

function handleUpdaterError(error, stage) {
	var message = error && error.message ? error.message : error;
	var diagnostic = getUpdaterDiagnostic(error, stage);
	updaterLogger.warn("Updater " + (stage || "operation") + " failed:", message);
	if (stage === "install") {
		updateDownloadInProgress = false;
		updateDownloadCancellationToken = null;
		updateDownloadInfo = null;
		stopUpdateDownloadWatchdog();
	} else if (stage === "download" || updateDownloadInProgress) {
		if (updateDownloadCancellationToken && !updateDownloadCancellationToken.cancelled) {
			updateDownloadCancellationToken.cancel();
		}
		updateDownloadInProgress = false;
		updateDownloadedReady = false;
		updateDownloadCancellationToken = null;
		updateDownloadInfo = null;
		stopUpdateDownloadWatchdog();
	}
	updateInstallAuthorized = false;
	setUpdaterState({
		status: "error",
		message: diagnostic.detail,
		error: diagnostic.detail,
		errorTitle: diagnostic.title,
		nextStep: diagnostic.nextStep
	});
}

function updateDownloadProgress(progress) {
	if (!updateDownloadInProgress) return;
	updateLastProgressAt = Date.now();
	if (typeof progress.percent === "number") updateLastProgressPercent = progress.percent;
	if (typeof progress.transferred === "number") updateLastProgressBytes = progress.transferred;
	if (typeof progress.percent === "number") {
		var progressBucket = Math.floor(progress.percent / 10) * 10;
		if (progressBucket > updateLastLoggedProgressPercent || progress.percent >= 100) {
			updateLastLoggedProgressPercent = progressBucket;
			updaterLogger.info(
				"Update download progress",
				Math.round(progress.percent) + "%",
				"transferred=" + (progress.transferred || 0),
				"total=" + (progress.total || 0)
			);
		}
	}

	var percent = typeof progress.percent === "number" ? Math.max(0, Math.min(100, progress.percent)) : 0;
	setUpdaterState({
		status: "downloading",
		message: "Downloading update... " + Math.round(percent) + "%",
		percent: percent,
		transferred: typeof progress.transferred === "number" ? progress.transferred : 0,
		total: typeof progress.total === "number" ? progress.total : 0,
		bytesPerSecond: typeof progress.bytesPerSecond === "number" ? progress.bytesPerSecond : 0,
		error: "",
		errorTitle: "",
		nextStep: ""
	});
}

function startUpdateDownload(info) {
	if (updateDownloadInProgress || !info) return Promise.resolve(getUpdaterStateSnapshot());
	activeUpdateInfo = info;
	updateDownloadInProgress = true;
	updateInstallAuthorized = true;
	updateDownloadedReady = false;
	updateDownloadInfo = info;
	updateDownloadCancellationToken = new CancellationToken();
	updateLastLoggedProgressPercent = -1;
	updaterLogger.info("Starting update download", getUpdateVersionLabel(info));
	setUpdaterState({
		status: "downloading",
		message: "Preparing update download...",
		version: info.version || "",
		percent: 0,
		transferred: 0,
		total: 0,
		bytesPerSecond: 0,
		error: "",
		errorTitle: "",
		nextStep: ""
	});
	startUpdateDownloadWatchdog();

	return autoUpdater.downloadUpdate(updateDownloadCancellationToken).catch(function (error) {
		if (updateDownloadInProgress || updateInstallAuthorized) handleUpdaterError(error, "download");
		return null;
	}).then(function () {
		return getUpdaterStateSnapshot();
	});
}

function beginUpdateInstall(info) {
	if (!updateInstallAuthorized || updaterState.status === "installing") return;
	activeUpdateInfo = info || activeUpdateInfo;
	updateDownloadInProgress = false;
	stopUpdateDownloadWatchdog();
	updateDownloadCancellationToken = null;
	updateDownloadInfo = null;
	updateDownloadedReady = true;
	setUpdaterState({
		status: "installing",
		message: "Update ready. KM Companion will restart to finish installing.",
		version: activeUpdateInfo && activeUpdateInfo.version ? activeUpdateInfo.version : "",
		percent: 100,
		error: "",
		errorTitle: "",
		nextStep: ""
	});
	updaterLogger.info("Installing update from explicit Settings action", getUpdateVersionLabel(activeUpdateInfo));
	setTimeout(function () {
		if (!updateInstallAuthorized) return;
		try {
			autoUpdater.quitAndInstall(true, true);
		} catch (error) {
			handleUpdaterError(error, "install");
		}
	}, UPDATE_INSTALL_HANDOFF_DELAY_MS);
}

function installAvailableUpdate() {
	if (!app.isPackaged || !activeUpdateInfo || isUpdaterBusy()) {
		return Promise.resolve(getUpdaterStateSnapshot());
	}
	updateInstallAuthorized = true;
	if (updateDownloadedReady) {
		beginUpdateInstall(activeUpdateInfo);
		return Promise.resolve(getUpdaterStateSnapshot());
	}
	return startUpdateDownload(activeUpdateInfo);
}

function performUpdateCheck(source) {
	if (!app.isPackaged) return Promise.resolve(getUpdaterStateSnapshot());
	if (updateCheckPromise) {
		return updateCheckPromise.then(function () {
			return getUpdaterStateSnapshot();
		});
	}
	if (updateDownloadInProgress || updaterState.status === "installing") {
		return Promise.resolve(getUpdaterStateSnapshot());
	}
	if (source === "manual") {
		activeUpdateInfo = null;
		updateDownloadedReady = false;
	}
	updateInstallAuthorized = false;
	setUpdaterState({
		status: "checking",
		message: "Checking for updates...",
		version: "",
		percent: null,
		transferred: 0,
		total: 0,
		bytesPerSecond: 0,
		error: "",
		errorTitle: "",
		nextStep: ""
	});
	updaterLogger.info("Checking for updates", "source=" + source);
	updateCheckPromise = autoUpdater.checkForUpdates().catch(function (error) {
		if (updaterState.status !== "error") handleUpdaterError(error, "check");
		return null;
	}).then(function (result) {
		updateCheckPromise = null;
		return result;
	});
	return updateCheckPromise.then(function () {
		return getUpdaterStateSnapshot();
	});
}

function configureAutoUpdates(mainWindow) {
	attachUpdaterMainWindow(mainWindow);
	if (updaterConfigured) {
		broadcastUpdaterState();
		return;
	}
	updaterConfigured = true;
	if (!app.isPackaged) {
		setUpdaterState({
			status: "unavailable",
			message: "Update checks are available in the installed app."
		});
		return;
	}

	autoUpdater.logger = updaterLogger;
	autoUpdater.autoDownload = false;
	autoUpdater.autoInstallOnAppQuit = false;
	autoUpdater.autoRunAppAfterInstall = true;
	autoUpdater.disableDifferentialDownload = true;
	autoUpdater.disableWebInstaller = true;
	updaterLogger.info(
		"Configured updater",
		"version=" + app.getVersion(),
		"differentialDownloads=disabled",
		"webInstaller=disabled",
		"autoInstallOnQuit=disabled",
		"autoRunAfterInstall=enabled"
	);
	autoUpdater.on("checking-for-update", function () {
		updaterLogger.info("Updater event: checking-for-update");
	});
	autoUpdater.on("error", function (error) {
		if (updaterState.status === "error" && !updateDownloadInProgress && !updateInstallAuthorized) {
			updaterLogger.debug("Ignoring duplicate updater error event", getUpdaterErrorText(error));
			return;
		}
		handleUpdaterError(error, getUpdaterErrorStage());
	});
	autoUpdater.on("update-available", function (info) {
		updaterLogger.info("Updater event: update-available", getUpdateVersionLabel(info));
		activeUpdateInfo = info;
		updateInstallAuthorized = false;
		updateDownloadedReady = false;
		setUpdaterState({
			status: "available",
			message: "Update " + getUpdateVersionLabel(info) + " is available.",
			version: info && info.version ? info.version : "",
			percent: null,
			transferred: 0,
			total: 0,
			bytesPerSecond: 0,
			error: "",
			errorTitle: "",
			nextStep: ""
		});
	});
	autoUpdater.on("update-not-available", function () {
		updaterLogger.info("Updater event: update-not-available");
		activeUpdateInfo = null;
		updateDownloadedReady = false;
		updateInstallAuthorized = false;
		setUpdaterState({
			status: "up-to-date",
			message: "KM Companion is up to date.",
			version: "",
			percent: null,
			transferred: 0,
			total: 0,
			bytesPerSecond: 0,
			error: "",
			errorTitle: "",
			nextStep: ""
		});
	});
	autoUpdater.on("download-progress", updateDownloadProgress);
	autoUpdater.on("update-downloaded", function (info) {
		updaterLogger.info("Updater event: update-downloaded", getUpdateVersionLabel(info));
		activeUpdateInfo = info || activeUpdateInfo;
		updateDownloadedReady = true;
		updateDownloadInProgress = false;
		stopUpdateDownloadWatchdog();
		updateDownloadCancellationToken = null;
		updateDownloadInfo = null;
		if (updateInstallAuthorized) {
			beginUpdateInstall(activeUpdateInfo);
			return;
		}
		setUpdaterState({
			status: "available",
			message: "Update " + getUpdateVersionLabel(activeUpdateInfo) + " is ready to install.",
			version: activeUpdateInfo && activeUpdateInfo.version ? activeUpdateInfo.version : "",
			percent: 100,
			error: "",
			errorTitle: "",
			nextStep: ""
		});
	});

	setTimeout(function () {
		performUpdateCheck("launch");
	}, UPDATE_CHECK_DELAY_MS);
}

function getMainWindowStatePath() {
	return path.join(app.getPath("userData"), MAIN_WINDOW_STATE_FILE);
}

function getMainWindowSizeBounds() {
	var display;
	var workArea;
	try {
		display = screen.getPrimaryDisplay();
		workArea = display && display.workAreaSize;
	} catch (error) {
		void error;
	}
	var width = workArea && workArea.width > 0 ? workArea.width : MAIN_WINDOW_DEFAULT_WIDTH;
	var height = workArea && workArea.height > 0 ? workArea.height : MAIN_WINDOW_DEFAULT_HEIGHT;
	return {
		minWidth: Math.min(MAIN_WINDOW_MIN_WIDTH, width),
		minHeight: Math.min(MAIN_WINDOW_MIN_HEIGHT, height),
		maxWidth: width,
		maxHeight: height
	};
}

function clampMainWindowSize(value, min, max, fallback) {
	value = Math.round(Number(value));
	if (!isFinite(value) || value <= 0) value = fallback;
	return Math.max(min, Math.min(max, value));
}

function normalizeMainWindowState(state) {
	var bounds = getMainWindowSizeBounds();
	state = state && typeof state === "object" ? state : {};
	return {
		width: clampMainWindowSize(state.width, bounds.minWidth, bounds.maxWidth, MAIN_WINDOW_DEFAULT_WIDTH),
		height: clampMainWindowSize(state.height, bounds.minHeight, bounds.maxHeight, MAIN_WINDOW_DEFAULT_HEIGHT),
		maximized: state.maximized === true
	};
}

function readMainWindowState() {
	var statePath = getMainWindowStatePath();
	var raw;
	try {
		raw = fsSync.readFileSync(statePath, "utf8");
		return normalizeMainWindowState(JSON.parse(raw));
	} catch (error) {
		if (error && error.code !== "ENOENT") {
			console.warn("Could not read main window state:", error.message || error);
		}
		return normalizeMainWindowState();
	}
}

function getCurrentMainWindowState(mainWindow) {
	var bounds = mainWindow.isMaximized() ? mainWindow.getNormalBounds() : mainWindow.getBounds();
	return normalizeMainWindowState({
		width: bounds.width,
		height: bounds.height,
		maximized: mainWindow.isMaximized()
	});
}

function saveMainWindowState(mainWindow) {
	var statePath;
	var state;
	if (!mainWindow || mainWindow.isDestroyed()) return;
	statePath = getMainWindowStatePath();
	state = getCurrentMainWindowState(mainWindow);
	try {
		fsSync.mkdirSync(path.dirname(statePath), {recursive: true});
		fsSync.writeFileSync(statePath, JSON.stringify(state, null, 2), "utf8");
	} catch (error) {
		console.warn("Could not save main window state:", error.message || error);
	}
}

function wireMainWindowStatePersistence(mainWindow) {
	var saveTimer = null;

	function queueSave() {
		if (saveTimer) clearTimeout(saveTimer);
		saveTimer = setTimeout(function () {
			saveTimer = null;
			saveMainWindowState(mainWindow);
		}, 500);
	}

	mainWindow.on("resize", queueSave);
	mainWindow.on("maximize", queueSave);
	mainWindow.on("unmaximize", queueSave);
	mainWindow.on("close", function () {
		if (saveTimer) clearTimeout(saveTimer);
		saveMainWindowState(mainWindow);
	});
}

function createMainWindow() {
	var windowState = readMainWindowState();
	var sizeBounds = getMainWindowSizeBounds();
	var mainWindow = new BrowserWindow({
		width: windowState.width,
		height: windowState.height,
		minWidth: sizeBounds.minWidth,
		minHeight: sizeBounds.minHeight,
		title: getMainWindowTitle(),
		backgroundColor: "#11151c",
		icon: APP_ICON_PATH,
		show: false,
		webPreferences: {
			contextIsolation: true,
			nodeIntegration: false,
			sandbox: true,
			preload: path.join(__dirname, "preload.js")
		}
	});

	wireMainWindowStatePersistence(mainWindow);
	mainWindow.on("page-title-updated", function (event) {
		event.preventDefault();
		mainWindow.setTitle(getMainWindowTitle());
	});
	var firstPaintReady = false, pageLoaded = false;
	function showLoadedWindow() {
		if (!firstPaintReady || !pageLoaded) return;
		mainWindow.setTitle(getMainWindowTitle());
		if (windowState.maximized) mainWindow.maximize();
		mainWindow.show();
	}
	mainWindow.once("ready-to-show", function () {
		firstPaintReady = true;
		showLoadedWindow();
	});
	mainWindow.webContents.once("did-finish-load", function () {
		pageLoaded = true;
		showLoadedWindow();
	});
	mainWindow.loadURL(APP_SCHEME + "://" + APP_HOST + "/index.html");

	mainWindow.webContents.setWindowOpenHandler(function (details) {
		openExternalUrl(details.url);
		return {action: "deny"};
	});

	mainWindow.webContents.on("will-navigate", function (event, url) {
		if (isAppUrl(url)) return;
		event.preventDefault();
		openExternalUrl(url);
	});

	return mainWindow;
}

app.whenReady().then(function () {
	scheduleStaleUpdaterCacheCleanup();
	registerArtworkIpc();
	registerAppProtocol();
	registerAppStorageIpc();
	registerAppDialogIpc();
	registerUpdaterIpc();
	configureRendererRequestPolicy();
	Menu.setApplicationMenu(null);
	var mainWindow = createMainWindow();
	configureAutoUpdates(mainWindow);

	app.on("activate", function () {
		if (BrowserWindow.getAllWindows().length === 0) {
			configureAutoUpdates(createMainWindow());
		}
	});
});

app.on("window-all-closed", function () {
	if (process.platform !== "darwin") app.quit();
});

app.on("before-quit", function () {
	if (appStorageWriteTimer) writeAppStorageNow();
});
