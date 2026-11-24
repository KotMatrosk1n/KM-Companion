(function () {
	"use strict";

	var settingsButton = document.getElementById("km-settings-button");
	var updateBadge = document.getElementById("km-settings-update-badge");
	var page = document.getElementById("km-settings-page");
	var settingsTabs = Array.prototype.slice.call(document.querySelectorAll(".km-settings-tabs [role='tab']"));
	var activeSettingsTab = 0;
	var settingsView = document.getElementById("km-settings-view");
	var updateView = document.getElementById("km-update-view");
	var versionValue = document.getElementById("km-settings-version");
	var updateAction = document.getElementById("km-settings-update-action");
	var updateActionLabel = document.getElementById("km-settings-update-action-label");
	var updateStatus = document.getElementById("km-settings-update-status");
	var openReleaseButton = document.getElementById("km-settings-open-release");
	var promptCopy = document.getElementById("km-update-prompt-copy");
	var releaseNotes = document.getElementById("km-update-release-notes");
	var notesContent = document.getElementById("km-update-notes-content");
	var notesReleaseButton = document.getElementById("km-update-open-release");
	var renderedNotes = "";
	var noteElements = ["p", "ul", "ol", "li", "blockquote", "pre", "code", "strong", "em", "del", "br", "h3", "h4", "h5"];
	var ignoredNoteElements = ["script", "style", "template", "iframe", "object", "embed", "svg", "math", "form"];
	var progressPanel = document.getElementById("km-update-progress-panel");
	var progressTitle = document.getElementById("km-update-progress-title");
	var progressPercent = document.getElementById("km-update-progress-percent");
	var progressTrack = document.getElementById("km-update-progress-track");
	var progressFill = document.getElementById("km-update-progress-fill");
	var progressMessage = document.getElementById("km-update-progress-message");
	var updateError = document.getElementById("km-update-error");
	var updateErrorTitle = document.getElementById("km-update-error-title");
	var updateErrorMessage = document.getElementById("km-update-error-message");
	var updateErrorNextStep = document.getElementById("km-update-error-next-step");
	var installButton = document.getElementById("km-update-install");
	var installLabel = document.getElementById("km-update-install-label");
	var dismissButton = document.getElementById("km-update-dismiss");
	var desktopBridge = window.kmCalculatorDesktop || window.royalSwordDesktop;
	var updateBridge = desktopBridge && desktopBridge.updates;
	var activeView = "settings";
	var unsubscribe = null;
	var stateRevision = 0;
	var updateState = {
		appVersion: "",
		packaged: false,
		status: "unavailable",
		message: "Update checks are available in the installed app.",
		version: "",
		available: false,
		percent: null,
		transferred: 0,
		total: 0,
		bytesPerSecond: 0,
		error: "",
		errorTitle: "",
		nextStep: "",
		releaseNotes: "",
		releaseUrl: "",
		busy: false,
		canCheck: false,
		canInstall: false
	};

	if (!settingsButton || !page || !settingsTabs.length || !updateAction || !installButton) return;

	function hasNumber(value) {
		return typeof value === "number" && isFinite(value);
	}

	function normalizeState(nextState) {
		nextState = nextState && typeof nextState === "object" ? nextState : {};
		var status = typeof nextState.status === "string" ? nextState.status : "idle";
		var busy = !!nextState.busy || status === "checking" || status === "downloading" || status === "installing";
		return {
			appVersion: typeof nextState.appVersion === "string" ? nextState.appVersion : "",
			packaged: !!nextState.packaged,
			status: status,
			message: typeof nextState.message === "string" ? nextState.message : "",
			version: typeof nextState.version === "string" ? nextState.version : "",
			available: !!nextState.available,
			percent: hasNumber(nextState.percent) ? Math.max(0, Math.min(100, nextState.percent)) : null,
			transferred: hasNumber(nextState.transferred) ? Math.max(0, nextState.transferred) : 0,
			total: hasNumber(nextState.total) ? Math.max(0, nextState.total) : 0,
			bytesPerSecond: hasNumber(nextState.bytesPerSecond) ? Math.max(0, nextState.bytesPerSecond) : 0,
			error: typeof nextState.error === "string" ? nextState.error : "",
			errorTitle: typeof nextState.errorTitle === "string" ? nextState.errorTitle : "",
			nextStep: typeof nextState.nextStep === "string" ? nextState.nextStep : "",
			releaseNotes: typeof nextState.releaseNotes === "string" ? nextState.releaseNotes : "",
			releaseUrl: typeof nextState.releaseUrl === "string" ? nextState.releaseUrl : "",
			busy: busy,
			canCheck: !!nextState.canCheck,
			canInstall: !!nextState.canInstall
		};
	}

	function mergeState(patch) {
		var merged = {};
		Object.keys(updateState).forEach(function (key) {
			merged[key] = updateState[key];
		});
		Object.keys(patch || {}).forEach(function (key) {
			merged[key] = patch[key];
		});
		applyState(merged);
	}

	function getVersionLabel(version) {
		if (!version) return "Unavailable";
		return /^v/i.test(version) ? version : "v" + version;
	}

	function formatBytes(bytes) {
		var units = ["B", "KB", "MB", "GB"];
		var unitIndex = 0;
		var value = bytes;
		while (value >= 1024 && unitIndex < units.length - 1) {
			value /= 1024;
			unitIndex += 1;
		}
		return (unitIndex === 0 ? Math.round(value) : value.toFixed(value >= 10 ? 1 : 2)) + " " + units[unitIndex];
	}

	function isApplyingUpdate() {
		return updateState.status === "downloading" || updateState.status === "installing";
	}

	function getSettingsActionLabel() {
		if (updateState.status === "checking") return "Checking";
		if (updateState.status === "downloading") return "Downloading";
		if (updateState.status === "installing") return "Installing";
		if (updateState.available) return updateState.status === "error" ? "Retry Update" : "Install Update";
		return "Check for Updates";
	}

	function getSettingsStatusText() {
		if (updateState.status !== "error") return updateState.message;
		var parts = [];
		if (updateState.errorTitle) parts.push(updateState.errorTitle);
		if (updateState.error || updateState.message) parts.push(updateState.error || updateState.message);
		if (updateState.nextStep) parts.push(updateState.nextStep);
		return parts.join("\n\n");
	}

	function renderSettingsView() {
		var canUsePrimaryAction = updateState.available ? updateState.canInstall : updateState.canCheck;
		versionValue.textContent = getVersionLabel(updateState.appVersion);
		updateActionLabel.textContent = getSettingsActionLabel();
		updateAction.disabled = updateState.busy || !canUsePrimaryAction;
		updateStatus.textContent = getSettingsStatusText();
		updateStatus.setAttribute("data-kind", updateState.status);
		updateStatus.setAttribute("role", updateState.status === "error" ? "alert" : "status");
		openReleaseButton.hidden = !updateState.available;
		openReleaseButton.disabled = isApplyingUpdate();
	}

	function renderBadge() {
		updateBadge.hidden = !updateState.available;
		settingsButton.setAttribute("aria-label", updateState.available ? "Settings: Update Available" : "Settings");
	}

	function renderProgress() {
		var isDownloading = updateState.status === "downloading";
		var isInstalling = updateState.status === "installing";
		var showProgress = isDownloading || isInstalling;
		var hasProgress = updateState.percent !== null;
		var message = updateState.message;
		progressPanel.hidden = !showProgress;
		if (!showProgress) return;

		progressTitle.textContent = isInstalling ? "Installing update" : "Downloading update";
		progressPercent.textContent = hasProgress ? Math.round(updateState.percent) + "%" : "";
		progressTrack.setAttribute("data-indeterminate", hasProgress ? "false" : "true");
		progressFill.style.width = hasProgress ? updateState.percent + "%" : "";
		if (hasProgress) {
			progressTrack.setAttribute("aria-valuemin", "0");
			progressTrack.setAttribute("aria-valuemax", "100");
			progressTrack.setAttribute("aria-valuenow", String(Math.round(updateState.percent)));
		} else {
			progressTrack.removeAttribute("aria-valuemin");
			progressTrack.removeAttribute("aria-valuemax");
			progressTrack.removeAttribute("aria-valuenow");
		}
		if (isDownloading && updateState.total > 0) {
			message += " (" + formatBytes(updateState.transferred) + " of " + formatBytes(updateState.total);
			if (updateState.bytesPerSecond > 0) message += ", " + formatBytes(updateState.bytesPerSecond) + "/s";
			message += ")";
		}
		progressTrack.setAttribute("aria-valuetext", message);
		progressMessage.textContent = message;
	}

	function makeNoteLink(value) {
		try {
			var url = new URL(value);
			if (url.protocol !== "https:" || url.username || url.password) return null;
			var link = document.createElement("a");
			link.href = url.href;
			link.target = "_blank";
			link.rel = "noopener noreferrer";
			return link;
		} catch (error) { return null; }
	}

	function appendNoteHtml(parent, node, depth) {
		if (node.nodeType === 3) { parent.appendChild(document.createTextNode(node.textContent)); return; }
		if (node.nodeType !== 1 || depth > 32 || ignoredNoteElements.indexOf(node.localName) !== -1) return;
		var tag = node.localName;
		if (/^h[1-6]$/.test(tag)) tag = "h" + (2 + Math.ceil(Number(tag.charAt(1)) / 2));
		if (tag === "b") tag = "strong";
		if (tag === "i") tag = "em";
		var safe = tag === "a" ? makeNoteLink(node.getAttribute("href")) :
			(noteElements.indexOf(tag) !== -1 ? document.createElement(tag) : null);
		Array.prototype.forEach.call(node.childNodes, function (child) { appendNoteHtml(safe || parent, child, depth + 1); });
		if (safe) parent.appendChild(safe);
	}

	function appendNoteText(parent, line) {
		var tokens = /`([^`]+)`|\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^\s)]+)\)|(https:\/\/[^\s<>]+)/g;
		var cursor = 0, match;
		while ((match = tokens.exec(line))) {
			parent.appendChild(document.createTextNode(line.slice(cursor, match.index)));
			var node = match[1] ? document.createElement("code") : match[2] ? document.createElement("strong") : makeNoteLink(match[4] || match[5]);
			var label = match[1] || match[2] || match[3] || match[5];
			if (node) { node.textContent = label; parent.appendChild(node); } else parent.appendChild(document.createTextNode(label));
			cursor = tokens.lastIndex;
		}
		parent.appendChild(document.createTextNode(line.slice(cursor)));
	}

	function appendPlainNotes(fragment, notes) {
		var paragraph, list;
		notes.split(/\r?\n/).forEach(function (line) {
			var heading = /^\s{0,3}(#{1,6})\s+(.+)$/.exec(line);
			var bullet = /^\s*([-*+]|\d+[.)])\s+(.+)$/.exec(line);
			if (heading) {
				var title = document.createElement("h" + (2 + Math.ceil(heading[1].length / 2)));
				appendNoteText(title, heading[2]);
				fragment.appendChild(title);
			} else if (bullet) {
				var tag = /^\d/.test(bullet[1]) ? "ol" : "ul";
				if (!list || list.localName !== tag) { list = document.createElement(tag); fragment.appendChild(list); }
				var item = document.createElement("li");
				appendNoteText(item, bullet[2]);
				list.appendChild(item);
				paragraph = null;
				return;
			} else if (line.trim()) {
				if (!paragraph) { paragraph = document.createElement("p"); fragment.appendChild(paragraph); } else paragraph.appendChild(document.createTextNode(" "));
				appendNoteText(paragraph, line.trim());
				list = null;
				return;
			}
			paragraph = list = null;
		});
	}

	function renderReleaseNotes() {
		var notes = updateState.releaseNotes;
		if (renderedNotes === notes) return;
		renderedNotes = notes;
		var content = document.createDocumentFragment();
		if (/<\/?[a-z][\w-]*(?:\s[^>]*|\/)?\s*>/i.test(notes)) {
			// Template contents stay inert. Only newly created text and allowed note elements reach the page.
			var template = document.createElement("template");
			template.innerHTML = notes;
			Array.prototype.forEach.call(template.content.childNodes, function (node) { appendNoteHtml(content, node, 0); });
		} else appendPlainNotes(content, notes);
		var body = document.createElement("div");
		body.className = "km-update-note-grid";
		var section;
		Array.prototype.slice.call(content.childNodes).forEach(function (node) {
			if (!node.textContent.trim()) return;
			if (!section || node.nodeName === "H3") {
				section = document.createElement("section");
				section.className = "km-update-note-section";
				body.appendChild(section);
			}
			if (node.nodeType === 3) {
				var paragraph = document.createElement("p");
				paragraph.textContent = node.textContent.trim();
				node = paragraph;
			}
			section.appendChild(node);
		});
		releaseNotes.replaceChildren(body);
		releaseNotes.scrollTop = 0;
		notesContent.hidden = !body.childElementCount;
	}

	function renderUpdateView() {
		var version = getVersionLabel(updateState.version);
		var applying = isApplyingUpdate();
		promptCopy.textContent = (updateState.appVersion ? "Installed " + getVersionLabel(updateState.appVersion) + " · " : "") + "Available " + version;
		renderReleaseNotes();
		notesReleaseButton.disabled = applying;
		updateError.hidden = updateState.status !== "error";
		updateErrorTitle.textContent = updateState.errorTitle || "Update failed";
		updateErrorMessage.textContent = updateState.error || updateState.message;
		updateErrorNextStep.textContent = updateState.nextStep;
		installButton.disabled = applying || !updateState.canInstall;
		dismissButton.disabled = applying;
		installLabel.textContent = applying ? (updateState.status === "installing" ? "Installing" : "Downloading") :
			(updateState.status === "error" ? "Retry Update" : "Install Update");
		renderProgress();
	}

	function render() {
		renderBadge();
		renderSettingsView();
		renderUpdateView();
		if (activeView === "update" && !updateState.available) showSettingsView(false);
	}

	function applyState(nextState) {
		updateState = normalizeState(nextState);
		stateRevision += 1;
		render();
	}

	function showSettingsView(shouldFocus) {
		activeView = "settings";
		settingsView.hidden = false;
		updateView.hidden = true;
		if (shouldFocus !== false) updateAction.focus();
	}

	function showUpdateView() {
		if (!updateState.available) return;
		activeView = "update";
		settingsView.hidden = true;
		updateView.hidden = false;
		installButton.focus();
	}

	function selectSettingsTab(index, focus) {
		activeSettingsTab = index;
		settingsTabs.forEach(function (tab, i) {
			tab.setAttribute("aria-selected", String(i === index));
			tab.tabIndex = i === index ? 0 : -1;
			document.getElementById(tab.getAttribute("aria-controls")).hidden = i !== index;
		});
		if (focus) settingsTabs[index].focus();
	}

	function setBridgeError(title, message) {
		mergeState({
			status: "error",
			message: message,
			error: message,
			errorTitle: title,
			nextStep: "Try again. If the problem continues, open the release page and install the latest version manually.",
			busy: false,
			canCheck: !!updateState.packaged,
			canInstall: !!updateState.packaged && updateState.available
		});
	}

	function runUpdateAction(methodName, pendingState, errorTitle, errorMessage) {
		if (!updateBridge || typeof updateBridge[methodName] !== "function") return;
		mergeState(pendingState);
		var result;
		try {
			result = updateBridge[methodName]();
		} catch (error) {
			void error;
			setBridgeError(errorTitle, errorMessage);
			return;
		}
		if (!result || typeof result.then !== "function") return;
		result.then(function (nextState) {
			if (nextState) applyState(nextState);
		}, function (error) {
			void error;
			setBridgeError(errorTitle, errorMessage);
		});
	}

	function checkForUpdates() {
		runUpdateAction("check", {
			status: "checking",
			message: "Checking for updates...",
			available: false,
			busy: true,
			canCheck: false,
			canInstall: false,
			error: "",
			errorTitle: "",
			nextStep: ""
		}, "Update check failed", "KM Companion could not check for updates right now.");
	}

	function installUpdate() {
		if (!updateState.available) return;
		runUpdateAction("install", {
			status: "downloading",
			message: "Preparing update download...",
			percent: 0,
			transferred: 0,
			total: 0,
			bytesPerSecond: 0,
			busy: true,
			canCheck: false,
			canInstall: false,
			error: "",
			errorTitle: "",
			nextStep: ""
		}, "Update install failed", "KM Companion could not start the update installer.");
	}

	function openReleasePage() {
		if (!updateBridge || typeof updateBridge.openReleasePage !== "function") return;
		try {
			var result = updateBridge.openReleasePage();
			if (result && typeof result.then === "function") {
				result.then(null, function (error) {
					void error;
					setBridgeError("Could not open release page", "KM Companion could not open the release page.");
				});
			}
		} catch (error) {
			void error;
			setBridgeError("Could not open release page", "KM Companion could not open the release page.");
		}
	}

	settingsTabs.forEach(function (tab, i) {
		tab.addEventListener("click", function () { selectSettingsTab(i, false); });
		tab.addEventListener("keydown", function (event) {
			var index;
			if (event.key === "ArrowRight") index = (i + 1) % settingsTabs.length;
			else if (event.key === "ArrowLeft") index = (i + settingsTabs.length - 1) % settingsTabs.length;
			else if (event.key === "Home") index = 0;
			else if (event.key === "End") index = settingsTabs.length - 1;
			else return;
			event.preventDefault(); selectSettingsTab(index, true);
		});
	});
	window.addEventListener("kmcalculator:settingsopen", function (event) {
		var section = event.detail && event.detail.section;
		var requested = settingsTabs.findIndex(function (tab) { return tab.id === "km-settings-tab-" + section; });
		selectSettingsTab(requested < 0 ? activeSettingsTab : requested, true);
	});
	updateView.addEventListener("keydown", function (event) {
		if (event.key === "Escape" && !isApplyingUpdate()) {
			event.preventDefault(); showSettingsView();
		}
	});
	updateAction.addEventListener("click", function () {
		if (updateState.available) showUpdateView();
		else checkForUpdates();
	});
	openReleaseButton.addEventListener("click", openReleasePage);
	notesReleaseButton.addEventListener("click", openReleasePage);
	installButton.addEventListener("click", installUpdate);
	dismissButton.addEventListener("click", function () {
		if (!isApplyingUpdate()) showSettingsView();
	});

	if (updateBridge && typeof updateBridge.subscribe === "function") {
		unsubscribe = updateBridge.subscribe(function (nextState) {
			applyState(nextState);
		});
	}
	if (updateBridge && typeof updateBridge.getState === "function") {
		var revisionBeforeSnapshot = stateRevision;
		updateBridge.getState().then(function (nextState) {
			if (stateRevision === revisionBeforeSnapshot) applyState(nextState);
		}, function (error) {
			void error;
			setBridgeError("Update status unavailable", "KM Companion could not read the updater status.");
		});
	}
	window.addEventListener("beforeunload", function () {
		if (typeof unsubscribe === "function") unsubscribe();
	});
	render();
})();
