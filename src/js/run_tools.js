/*global window, document, URL, Blob */
(function () {
	"use strict";
	var data = window.KMRunData, storage = window.kmCalculatorStorage;
	var desktop = window.kmCalculatorDesktop || window.royalSwordDesktop;
	var runs = desktop && desktop.runs;
	var backupButton = document.getElementById("km-run-backup");
	var restoreButton = document.getElementById("km-run-restore");
	var undoButton = document.getElementById("km-run-undo");
	var input = document.getElementById("km-run-file");
	var status = document.getElementById("km-run-status");
	var report = document.getElementById("km-report-problem");
	var busy = false;
	if (!backupButton || !data || !storage) return;
	function profile() {
		var selected = window.kmRomHackRegistry.getActiveProfile();
		if (!selected) throw new Error("Choose a ROM hack before backing up or restoring a run.");
		return {id: selected.id, name: selected.shortName || selected.name, generation: selected.baseGeneration,
			packId: selected.trainerData && selected.trainerData.packId || ""};
	}
	function version() { var text = document.getElementById("km-settings-version").textContent; return text === "Unavailable" ? "Source build" : text; }
	function capture() {
		if (window.KMPlayerNotes) window.KMPlayerNotes.flush();
		if (window.saveTeamBoxLayout) window.saveTeamBoxLayout();
		if (window.saveColorCodeOptions) window.saveColorCodeOptions();
		if (window.getImportedPlayerBagItems) window.getImportedPlayerBagItems();
		return data.capture(storage.snapshot(), profile(), version());
	}
	function download(backup) {
		var url = URL.createObjectURL(new Blob([JSON.stringify(backup)], {type: "application/json"}));
		var link = document.createElement("a"); link.href = url;
		link.download = "KM-Companion-" + backup.profile.id + "-" + backup.createdAt.slice(0, 10) + ".json";
		document.body.appendChild(link); link.click(); link.remove();
		window.setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
	}
	async function recovery() {
		var current = profile();
		if (runs) {
			var result = await runs.recovery(current);
			if (result.error) throw new Error(result.error);
			return result.backup;
		}
		var raw = storage.getItem("km-calculator.run-recovery." + current.id);
		return raw ? data.validate(JSON.parse(raw)) : null;
	}
	async function refreshUndo() {
		try {
			var id = profile().id, backup = await recovery();
			if (profile().id === id) undoButton.hidden = !backup;
		} catch (error) { undoButton.hidden = true; }
	}
	async function action(callback) {
		if (busy) return;
		busy = true; backupButton.disabled = restoreButton.disabled = undoButton.disabled = true;
		status.textContent = "";
		try { await callback(); } catch (error) {
			status.textContent = error.message || "The run operation could not be completed.";
		} finally { busy = false; backupButton.disabled = restoreButton.disabled = undoButton.disabled = false; refreshUndo(); }
	}
	async function restore(value) {
		var backup = data.validate(value), registry = window.kmRomHackRegistry;
		var current = registry.getActiveProfile(), target = registry.getProfile(backup.profile.id);
		var portable = backup.trainerPacks.some(function (pack) {
			return pack.id === backup.profile.packId && pack.profileId === backup.profile.id && pack.generations.length === 1 && pack.generations[0] === backup.profile.generation;
		});
		if ((!target && !portable) || (target && (target.baseGeneration !== backup.profile.generation || (target.trainerData && target.trainerData.packId || "") !== backup.profile.packId))) {
			throw new Error("This backup requires a compatible " + backup.profile.name + " profile.");
		}
		if (current) capture();
		var before = data.capture(storage.snapshot(), backup.profile, version());
		backup.trainerPacks.forEach(function (pack) { if (window.validateTrainerPackData) window.validateTrainerPackData(pack); });
		data.apply(storage.snapshot(), backup);
		var date = new Date(backup.createdAt).toLocaleString();
		if (!window.confirm("Restore the " + backup.profile.name + " run saved on " + date + "?\n\nThis replaces this profile's team, boxes, color coding, notes, catches, item pickups, and trainer progress. Other profiles are kept. A recovery copy will be saved.")) return;
		if ((registry.getActiveProfile() || {}).id !== (current || {}).id) throw new Error("The selected profile changed. Choose the backup again.");
		var restored = false;
		if (window.KMPlayerNotes) window.KMPlayerNotes.beginRestore();
		try {
			await storage.restoreRun(backup); restored = true;
			window.refreshRestoredRun(backup.profile.id);
		} catch (error) {
			if (restored) {
				await storage.restoreRun(before);
				window.refreshRestoredRun(current && current.id);
				throw new Error("The restored run could not be loaded. Your previous run has been restored.");
			}
			throw error;
		} finally { if (window.KMPlayerNotes) window.KMPlayerNotes.endRestore(restored); }
		status.textContent = "Run restored. Undo Last Restore returns to your previous run.";
	}
	backupButton.addEventListener("click", function () {
		action(async function () {
			var backup = capture();
			if (runs) {
				var result = await runs.save(backup);
				if (result.error) throw new Error(result.error);
				if (result.canceled) return;
				status.textContent = "Run backup saved.";
			} else { download(backup); status.textContent = "Run backup download started."; }
		});
	});
	restoreButton.addEventListener("click", function () {
		if (!runs) { input.click(); return; }
		action(async function () {
			profile();
			var result = await runs.read();
			if (result.error) throw new Error(result.error);
			if (!result.canceled) await restore(result.backup);
		});
	});
	input.addEventListener("change", function () {
		var file = input.files[0]; input.value = "";
		if (!file) return;
		action(async function () {
			if (file.size > data.MAX_BYTES) throw new Error("This backup is too large to restore.");
			var parsed;
			try { parsed = JSON.parse(await file.text()); } catch (error) { throw new Error("This file is not a readable run backup."); }
			await restore(parsed);
		});
	});
	undoButton.addEventListener("click", function () {
		action(async function () { var previous = await recovery(); if (previous) await restore(previous); });
	});
	function updateReport() {
		var selected = window.kmRomHackRegistry.getActiveProfile();
		var body = "# KM Companion version\n\n" + version() + "\n\n# ROM hack profile and generation\n\n" +
			(selected ? (selected.shortName || selected.name) + " / Generation " + selected.baseGeneration : "No profile selected") +
			"\n\n# Steps to reproduce\n\n1. \n\n# Expected behavior\n\n\n# Actual behavior\n\n\n# Additional details\n\nAdd relevant details or a cropped screenshot. Check attachments for personal information before posting.\n";
		var url = new URL("https://github.com/KotMatrosk1n/KM-Companion/issues/new");
		url.searchParams.set("template", "bug_report.md"); url.searchParams.set("labels", "bug"); url.searchParams.set("body", body);
		report.href = url.href;
	}
	report.addEventListener("click", updateReport);
	report.addEventListener("focus", updateReport);
	window.addEventListener("kmcalculator:romhackchange", function () { status.textContent = ""; refreshUndo(); updateReport(); });
	refreshUndo(); updateReport();
})();
