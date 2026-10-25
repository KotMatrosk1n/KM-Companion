var fs = require("fs");
var path = require("path");
var randomUUID = require("crypto").randomUUID;

module.exports = function registerRunTools(options) {
	var data = options.data;
	function atomicWrite(file, text) {
		fs.mkdirSync(path.dirname(file), {recursive: true});
		var temp = file + "." + randomUUID() + ".tmp";
		try { fs.writeFileSync(temp, text, {encoding: "utf8", flag: "wx", flush: true}); fs.renameSync(temp, file); } finally { if (fs.existsSync(temp)) fs.unlinkSync(temp); }
	}
	function readBackup(file) {
		var fd = fs.openSync(file, "r");
		try {
			if (fs.fstatSync(fd).size > data.MAX_BYTES) throw new Error("This backup is too large to restore.");
			var buffer = Buffer.alloc(data.MAX_BYTES + 1), length = 0, bytes;
			do { bytes = fs.readSync(fd, buffer, length, buffer.length - length, null); length += bytes; } while (bytes && length < buffer.length);
			if (length > data.MAX_BYTES) throw new Error("This backup is too large to restore.");
			return data.validate(JSON.parse(buffer.subarray(0, length).toString("utf8")));
		} finally { fs.closeSync(fd); }
	}
	function recoveryPath(profile) {
		var valid = data.capture({}, profile, "").profile;
		return path.join(options.userData(), "run-recovery", valid.id + ".json");
	}
	function handle(channel, action) {
		options.ipcMain.handle(channel, async function (event, value) {
			if (!event.senderFrame || event.senderFrame !== event.sender.mainFrame || !options.isAppUrl(event.senderFrame.url)) return {error: "This action is unavailable."};
			var parent = options.BrowserWindow.fromWebContents(event.sender);
			if (!parent || parent.isDestroyed() || event.sender.isDestroyed()) return {error: "This window is unavailable."};
			try { return await action(parent, value); } catch (error) {
				return {error: channel === "km-calculator-run-reset" ? "The run could not be reset. Your saved progress has been kept. Check available storage and try again." : "The run operation could not be completed. Check the backup file and available storage, then try again."};
			} finally {
				if ((channel === "km-calculator-run-save" || channel === "km-calculator-run-read") && !parent.isDestroyed() && !event.sender.isDestroyed()) { parent.focus(); event.sender.focus(); }
			}
		});
	}
	handle("km-calculator-run-save", async function (parent, value) {
		var backup = data.validate(value);
		var result = await options.dialog.showSaveDialog(parent, {title: "Back Up Run", defaultPath: "KM-Companion-" + backup.profile.id + "-" + backup.createdAt.slice(0, 10) + ".json", filters: [{name: "KM Companion run backup", extensions: ["json"]}]});
		if (result.canceled || !result.filePath) return {canceled: true};
		atomicWrite(result.filePath, JSON.stringify(backup));
		return {saved: true};
	});
	handle("km-calculator-run-read", async function (parent) {
		var result = await options.dialog.showOpenDialog(parent, {title: "Restore Run", properties: ["openFile"], filters: [{name: "KM Companion run backup", extensions: ["json"]}]});
		if (result.canceled || !result.filePaths.length) return {canceled: true};
		return {backup: readBackup(result.filePaths[0])};
	});
	handle("km-calculator-run-recovery", async function (parent, profile) {
		var file = recoveryPath(profile);
		return {backup: fs.existsSync(file) ? readBackup(file) : null};
	});
	handle("km-calculator-run-restore", async function (parent, value) {
		var backup = data.validate(value);
		var before = options.readStorage();
		var next = data.apply(before, backup);
		var previous = data.capture(before, backup.profile, options.version());
		// The recovery copy and replacement must both reach disk before changing the live cache.
		atomicWrite(recoveryPath(backup.profile), JSON.stringify(previous));
		atomicWrite(options.storagePath(), JSON.stringify(next));
		options.replaceStorage(next);
		return {snapshot: next};
	});
	handle("km-calculator-run-reset", async function (parent, profileId) {
		var next = data.resetProgress(options.readStorage(), profileId);
		atomicWrite(options.storagePath(), JSON.stringify(next));
		options.replaceStorage(next);
		return {snapshot: next};
	});
};
