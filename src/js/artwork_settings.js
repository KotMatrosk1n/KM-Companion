/*global window, document */
(function () {
	"use strict";
	var desktop = window.kmCalculatorDesktop || window.royalSwordDesktop, bridge = desktop && desktop.artwork;
	var state = {enabled: false, status: "checking", busy: true}, revision = 0, pending = false, promptTimer;
	var toggle = document.getElementById("km-artwork-enabled"), download = document.getElementById("km-artwork-download");
	var check = document.getElementById("km-artwork-check"), pause = document.getElementById("km-artwork-pause");
	var status = document.getElementById("km-artwork-status"), summary = document.getElementById("km-artwork-summary"), progress = document.getElementById("km-artwork-progress");
	var prompt = document.getElementById("km-artwork-prompt"), yes = document.getElementById("km-artwork-accept"), no = document.getElementById("km-artwork-decline");
	window.KMPokemonArtwork = {isEnabled: function () { return !!state.enabled; }};
	function size(bytes) { return (Number(bytes || 0) / 1048576).toFixed(1) + " MiB"; }
	function schedulePrompt() {
		window.clearTimeout(promptTimer);
		if (!state.needsPrompt || state.busy || state.status === "checking" || prompt.open) return;
		var chooser = document.querySelector("[data-km-rom-hack-chooser]");
		if (document.documentElement.hasAttribute("data-km-starting") || chooser && !chooser.hidden || document.querySelector("dialog[open]")) { promptTimer = window.setTimeout(schedulePrompt, 300); return; }
		prompt.showModal(); no.focus();
	}
	function apply(next) {
		if (typeof next.revision === "number" && typeof state.revision === "number" && next.revision < state.revision) return;
		var refresh = state.enabled !== next.enabled || next.status !== "checking" && next.status !== "downloading" && (state.complete !== next.complete || state.status !== next.status);
		state = next; revision++; render();
		if (refresh) {
			Array.prototype.forEach.call(document.querySelectorAll("img[data-km-pokemon-sprite]"), function (image) { if (image.kmRefreshSprite) image.kmRefreshSprite(); });
			window.dispatchEvent(new window.CustomEvent("kmcalculator:artworkchange"));
		}
		schedulePrompt();
	}
	function render() {
		var busy = pending || !!state.busy;
		toggle.checked = !!state.enabled; toggle.disabled = !bridge || busy;
		download.disabled = check.disabled = !bridge || busy;
		pause.hidden = state.status !== "downloading"; pause.disabled = pending;
		download.textContent = state.complete === state.total ? "Repair artwork" : state.complete ? "Download missing artwork" : "Download artwork";
		status.textContent = state.message || "Checking saved artwork.";
		summary.textContent = state.total ? state.complete + " of " + state.total + " files saved · " + size(state.bytes) + " of " + size(state.totalBytes) : "";
		progress.hidden = !state.busy; progress.max = state.status === "checking" ? state.total || 1 : state.totalBytes || 1;
		progress.value = state.status === "checking" ? state.checked || 0 : state.bytes || 0;
		yes.disabled = no.disabled = busy;
		document.getElementById("km-artwork-prompt-size").textContent = "The complete collection uses " + size(state.totalBytes) + ". Files you already have are reused.";
	}
	function run(method, value) {
		if (!bridge || pending) return;
		pending = true; render();
		return bridge[method](value).then(function (next) {
			pending = false; apply(next); render();
			if (prompt.open && !state.needsPrompt) prompt.close();
		}, function () {
			pending = false; render(); status.textContent = "Artwork settings could not be saved. Check folder access and try again.";
			document.getElementById("km-artwork-prompt-error").textContent = status.textContent;
		});
	}
	if (!toggle || !prompt) return;
	toggle.addEventListener("change", function () { run("setEnabled", toggle.checked); });
	download.addEventListener("click", function () { run("download"); });
	check.addEventListener("click", function () { run("check"); });
	pause.addEventListener("click", function () { run("pause"); });
	yes.addEventListener("click", function () { run("download"); });
	no.addEventListener("click", function () { run("choose", false); });
	prompt.addEventListener("cancel", function (event) { event.preventDefault(); run("choose", false); });
	if (!bridge) { state = {enabled: false, status: "unavailable", message: "Artwork downloads are available in the desktop app."}; render(); return; }
	var unsubscribe = bridge.subscribe(apply), beforeSnapshot = revision;
	bridge.getState().then(function (next) { if (revision === beforeSnapshot) apply(next); }, function () {
		state = {enabled: false, status: "error", message: "Artwork settings could not load. Check folder access and try again."}; render();
	});
	window.addEventListener("beforeunload", function () { window.clearTimeout(promptTimer); unsubscribe(); });
	render();
})();
