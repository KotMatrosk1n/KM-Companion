var electron = require("electron");
var contextBridge = electron.contextBridge;
var ipcRenderer = electron.ipcRenderer;

var storageSnapshot = {};

try {
	storageSnapshot = ipcRenderer.sendSync("km-calculator-storage-snapshot") || {};
} catch (error) {
	storageSnapshot = {};
}

function normalizeStorageKey(key) {
	return key === undefined || key === null ? "" : String(key);
}

function setStorageValue(key, value) {
	key = normalizeStorageKey(key);
	if (!key) return;
	storageSnapshot[key] = value === undefined || value === null ? "" : String(value);
	ipcRenderer.send("km-calculator-storage-set", key, storageSnapshot[key]);
}

function removeStorageValue(key) {
	key = normalizeStorageKey(key);
	if (!key) return;
	delete storageSnapshot[key];
	ipcRenderer.send("km-calculator-storage-remove", key);
}

function subscribeToUpdateState(listener) {
	if (typeof listener !== "function") return function () {};
	var wrappedListener = function (event, state) {
		void event;
		listener(state);
	};
	ipcRenderer.on("km-calculator-update-state-changed", wrappedListener);
	return function () {
		ipcRenderer.removeListener("km-calculator-update-state-changed", wrappedListener);
	};
}

function createUpdateBridge() {
	return {
		getState: function () {
			return ipcRenderer.invoke("km-calculator-update-state");
		},
		check: function () {
			return ipcRenderer.invoke("km-calculator-update-check");
		},
		install: function () {
			return ipcRenderer.invoke("km-calculator-update-install");
		},
		openReleasePage: function () {
			return ipcRenderer.invoke("km-calculator-update-open-release");
		},
		subscribe: subscribeToUpdateState
	};
}


function createDesktopBridge() {
	return {
		// The legacy scheme is retained because localStorage is scoped to this origin.
		localSpriteBaseUrl: "royal-sword://app/local-sprites",
		dialogs: {
			alert: function (message) {
				ipcRenderer.sendSync("km-calculator-dialog", "alert", message);
			},
			confirm: function (message) {
				return ipcRenderer.sendSync("km-calculator-dialog", "confirm", message) === true;
			}
		},
		storage: {
			getItem: function (key) {
				key = normalizeStorageKey(key);
				return Object.prototype.hasOwnProperty.call(storageSnapshot, key) ? storageSnapshot[key] : null;
			},
			setItem: setStorageValue,
			removeItem: removeStorageValue,
			key: function (index) {
				var keys = Object.keys(storageSnapshot);
				return keys[index] || null;
			},
			length: function () {
				return Object.keys(storageSnapshot).length;
			},
			clearByPrefix: function (prefix) {
				prefix = prefix === undefined || prefix === null ? "" : String(prefix);
				Object.keys(storageSnapshot).forEach(function (key) {
					if (key.indexOf(prefix) !== 0) return;
					delete storageSnapshot[key];
				});
				ipcRenderer.send("km-calculator-storage-clear-prefix", prefix);
			}
		},
		updates: createUpdateBridge(),
		artwork: {
			getState: function () { return ipcRenderer.invoke("km-calculator-artwork-getState"); },
			check: function () { return ipcRenderer.invoke("km-calculator-artwork-check"); },
			choose: function (value) { return ipcRenderer.invoke("km-calculator-artwork-choose", value); },
			setEnabled: function (value) { return ipcRenderer.invoke("km-calculator-artwork-setEnabled", value); },
			download: function () { return ipcRenderer.invoke("km-calculator-artwork-download"); },
			pause: function () { return ipcRenderer.invoke("km-calculator-artwork-pause"); },
			subscribe: function (listener) {
				if (typeof listener !== "function") return function () {};
				var handler = function (event, state) { listener(state); };
				ipcRenderer.on("km-calculator-artwork-changed", handler);
				return function () { ipcRenderer.removeListener("km-calculator-artwork-changed", handler); };
			}
		},
		runs: {
			save: function (backup) { return ipcRenderer.invoke("km-calculator-run-save", backup); },
			read: function () { return ipcRenderer.invoke("km-calculator-run-read"); },
			recovery: function (profile) { return ipcRenderer.invoke("km-calculator-run-recovery", profile); },
			resetProgress: function (profileId) {
				return ipcRenderer.invoke("km-calculator-run-reset", profileId).then(function (result) {
					if (result.snapshot) storageSnapshot = result.snapshot;
					return result;
				});
			},
			restore: function (backup) {
				return ipcRenderer.invoke("km-calculator-run-restore", backup).then(function (result) {
					if (result.snapshot) storageSnapshot = result.snapshot;
					return result;
				});
			}
		}
	};
}

contextBridge.exposeInMainWorld("kmCalculatorDesktop", createDesktopBridge());
// Backwards-compatible bridge for integrations built against pre-rebrand releases.
contextBridge.exposeInMainWorld("royalSwordDesktop", createDesktopBridge());
