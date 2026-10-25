/*global module */

/* Accessible startup chooser for bundled KM Companion ROM hack profiles. */
(function (root, factory) {
	if (typeof module === "object" && module.exports) {
		module.exports = factory();
	} else {
		var api = factory();
		var selector = api.createSelector({
			window: root,
			document: root.document,
			registry: root.kmRomHackRegistry,
			layoutManager: root.KMCalculatorRomHackLayouts.createLayoutManager({
				window: root,
				document: root.document,
				registry: root.kmRomHackRegistry
			})
		});
		root.KMCalculatorRomHackSelector = selector;
		root.KMCalculatorRomHackLayoutManager = selector.layoutManager;
		if (root.document.readyState === "loading") {
			root.document.addEventListener("DOMContentLoaded", function () {
				selector.start();
			});
		} else {
			selector.start();
		}
	}
})(typeof self !== "undefined" ? self : this, function () {
	"use strict";

	var QUESTION = "Which ROM Hack are you playing?";

	function createElement(documentObject, tagName, className, textContent) {
		var element = documentObject.createElement(tagName);
		if (className) element.className = className;
		if (textContent !== undefined) element.textContent = textContent;
		return element;
	}

	function getFocusableElements(dialog) {
		var candidates = dialog.querySelectorAll(
			"button:not([disabled]):not([hidden]), a[href]:not([hidden]), " +
			"input:not([disabled]):not([hidden]), select:not([disabled]):not([hidden]), " +
			"textarea:not([disabled]):not([hidden]), [tabindex]:not([tabindex='-1']):not([hidden])"
		);
		var focusable = [];
		var i;
		for (i = 0; i < candidates.length; i++) {
			if (candidates[i].offsetWidth || candidates[i].offsetHeight ||
				candidates[i].getClientRects().length) focusable.push(candidates[i]);
		}
		return focusable;
	}

	function formatAuthors(profile) {
		var names = [];
		var authors = profile.attribution.authors;
		var i;
		for (i = 0; i < authors.length; i++) names.push(authors[i].name);
		return names.join(", ");
	}

	function Selector(options) {
		options = options || {};
		this.window = options.window;
		this.document = options.document;
		this.registry = options.registry;
		this.layoutManager = options.layoutManager || null;
		this.overlay = null;
		this.dialog = null;
		this.tiles = null;
		this.cancelButton = null;
		this.changeButton = null;
		this.status = null;
		this.previousFocus = null;
		this.started = false;
		this._unsubscribeProfile = null;
		this._unsubscribeProfiles = null;
		this._unsubscribeChooser = null;
		this._boundKeydown = null;
	}

	Selector.prototype._build = function () {
		var documentObject = this.document;
		var dialog;
		var intro;
		var actions;
		var selector = this;
		var header;

		this.overlay = createElement(documentObject, "div", "km-rom-hack-overlay");
		this.overlay.hidden = true;
		this.overlay.setAttribute("data-km-rom-hack-chooser", "");

		dialog = createElement(documentObject, "section", "km-rom-hack-dialog");
		dialog.setAttribute("role", "dialog");
		dialog.setAttribute("aria-modal", "true");
		dialog.setAttribute("aria-labelledby", "km-rom-hack-question");
		dialog.setAttribute("aria-describedby", "km-rom-hack-intro");
		dialog.setAttribute("tabindex", "-1");
		this.dialog = dialog;

		dialog.appendChild(createElement(documentObject, "h1", "km-rom-hack-question", QUESTION));
		dialog.lastChild.id = "km-rom-hack-question";
		intro = createElement(
			documentObject,
			"p",
			"km-rom-hack-intro",
			"Choose your game to get started."
		);
		intro.id = "km-rom-hack-intro";
		dialog.appendChild(intro);

		this.tiles = createElement(documentObject, "div", "km-rom-hack-tiles");
		this.tiles.setAttribute("role", "list");
		dialog.appendChild(this.tiles);

		this.status = createElement(documentObject, "p", "km-rom-hack-status");
		this.status.setAttribute("role", "status");
		this.status.setAttribute("aria-live", "polite");
		dialog.appendChild(this.status);

		actions = createElement(documentObject, "div", "km-rom-hack-actions");
		this.cancelButton = createElement(documentObject, "button", "button km-rom-hack-cancel", "Cancel");
		this.cancelButton.type = "button";
		this.cancelButton.addEventListener("click", function () {
			selector.close();
		});
		actions.appendChild(this.cancelButton);
		dialog.appendChild(actions);
		this.overlay.appendChild(dialog);
		documentObject.body.appendChild(this.overlay);

		this.changeButton = createElement(documentObject, "button", "button km-rom-hack-change", "Change ROM Hack");
		this.changeButton.type = "button";
		this.changeButton.hidden = true;
		this.changeButton.addEventListener("click", function () {
			selector.registry.requestChooser("change-button");
		});
		header = documentObject.querySelector("header");
		if (header && header.parentNode) {
			header.parentNode.insertBefore(this.changeButton, header.nextSibling);
		} else {
			documentObject.body.insertBefore(this.changeButton, documentObject.body.firstChild);
		}

		this.overlay.addEventListener("mousedown", function (event) {
			if (event.target === selector.overlay && selector.registry.getActiveProfile()) selector.close();
		});
		this._boundKeydown = function (event) {
			selector._handleKeydown(event);
		};
	};

	Selector.prototype._createTile = function (profile) {
		var documentObject = this.document;
		var listItem = createElement(documentObject, "div", "km-rom-hack-tile-item");
		var button = createElement(documentObject, "button", "km-rom-hack-tile");
		var icon;
		var copy;
		var badge;
		var name;
		var description;
		var attribution;
		var selector = this;
		var activeProfile = this.registry.getActiveProfile();
		var isCurrent = activeProfile && activeProfile.id === profile.id;

		listItem.setAttribute("role", "listitem");
		button.type = "button";
		button.setAttribute("data-rom-hack-id", profile.id);
		if (isCurrent) button.setAttribute("aria-current", "true");

		if (profile.tile.icon) {
			icon = createElement(documentObject, "img", "km-rom-hack-tile-icon");
			icon.src = profile.tile.icon;
			icon.alt = "";
			button.appendChild(icon);
		}

		copy = createElement(documentObject, "span", "km-rom-hack-tile-copy");
		name = createElement(documentObject, "strong", "km-rom-hack-tile-name", profile.name);
		copy.appendChild(name);
		if (profile.tile.badge) {
			badge = createElement(documentObject, "span", "km-rom-hack-tile-badge", profile.tile.badge);
			copy.appendChild(badge);
		}
		if (isCurrent) {
			copy.appendChild(createElement(documentObject, "span", "km-rom-hack-tile-current", "Currently selected"));
		}
		description = createElement(
			documentObject,
			"span",
			"km-rom-hack-tile-description",
			profile.tile.description || ("Based on Generation " + profile.baseGeneration + ".")
		);
		copy.appendChild(description);
		attribution = createElement(
			documentObject,
			"span",
			"km-rom-hack-tile-attribution",
			"Creator: " + formatAuthors(profile)
		);
		copy.appendChild(attribution);
		button.appendChild(copy);

		button.addEventListener("click", function () {
			selector.selectProfile(profile.id);
		});
		listItem.appendChild(button);
		return listItem;
	};

	Selector.prototype.refresh = function () {
		var profiles = this.registry.listProfiles();
		var i;
		while (this.tiles.firstChild) this.tiles.removeChild(this.tiles.firstChild);
		for (i = 0; i < profiles.length; i++) this.tiles.appendChild(this._createTile(profiles[i]));
		if (!profiles.length) {
			this.status.textContent = "No ROM hack profiles are available in this build.";
		} else {
			this.status.textContent = "";
		}
	};

	Selector.prototype._handleKeydown = function (event) {
		var focusable;
		var first;
		var last;
		if (event.key === "Escape" || event.keyCode === 27) {
			if (this.registry.getActiveProfile()) {
				event.preventDefault();
				this.close();
			}
			return;
		}
		if (event.key !== "Tab" && event.keyCode !== 9) return;

		focusable = getFocusableElements(this.dialog);
		if (!focusable.length) {
			event.preventDefault();
			this.dialog.focus();
			return;
		}
		first = focusable[0];
		last = focusable[focusable.length - 1];
		if (event.shiftKey && this.document.activeElement === first) {
			event.preventDefault();
			last.focus();
		} else if (!event.shiftKey && this.document.activeElement === last) {
			event.preventDefault();
			first.focus();
		}
	};

	Selector.prototype.open = function () {
		var focusable;
		if (!this.started) {
			this.start();
			return;
		}
		this.previousFocus = this.document.activeElement;
		this.refresh();
		this.cancelButton.hidden = !this.registry.getActiveProfile();
		this.overlay.hidden = false;
		this.document.body.classList.add("km-rom-hack-chooser-open");
		this.document.addEventListener("keydown", this._boundKeydown);
		focusable = getFocusableElements(this.dialog);
		if (focusable.length) focusable[0].focus();
		else this.dialog.focus();
	};

	Selector.prototype.close = function () {
		if (!this.overlay || this.overlay.hidden || !this.registry.getActiveProfile()) return false;
		this.overlay.hidden = true;
		this.document.body.classList.remove("km-rom-hack-chooser-open");
		this.document.removeEventListener("keydown", this._boundKeydown);
		if (this.previousFocus && typeof this.previousFocus.focus === "function") this.previousFocus.focus();
		return true;
	};

	Selector.prototype.selectProfile = function (id) {
		var context;
		try {
			context = this.registry.activateProfile(id, {source: "startup-chooser"});
			this.status.textContent = context.profile.name + " selected.";
			this.close();
			return context;
		} catch (error) {
			this.status.textContent = error && error.message ? error.message : "That profile could not be loaded.";
			return null;
		}
	};

	Selector.prototype._handleActiveProfile = function (context) {
		var profile = context && context.profile;
		if (this.layoutManager) this.layoutManager.apply(context && profile ? context : null);
		this.document.body.removeAttribute("data-rom-hack");
		this.document.body.removeAttribute("data-rom-hack-generation");
		this.document.body.removeAttribute("data-calc-profile");
		if (!profile) {
			if (typeof this.window.applyActiveRomHackProfile === "function") {
				this.window.applyActiveRomHackProfile(context || null);
			}
			this.changeButton.hidden = true;
			this.changeButton.removeAttribute("title");
			this.refresh();
			return;
		}
		this.document.body.setAttribute("data-rom-hack", profile.id);
		this.document.body.setAttribute("data-rom-hack-generation", String(profile.baseGeneration));
		this.document.body.setAttribute("data-calc-profile", profile.calcProfile);
		if (typeof this.window.applyActiveRomHackProfile === "function") {
			this.window.applyActiveRomHackProfile(context);
		}
		this.changeButton.hidden = false;
		this.changeButton.title = "Currently playing " + profile.name;
		this.refresh();
	};

	Selector.prototype.start = function () {
		var selector = this;
		if (this.started) return this;
		if (!this.window || !this.document || !this.registry || !this.layoutManager) {
			throw new Error("The ROM hack selector requires window, document, registry, and layout manager.");
		}
		this.started = true;
		this._build();
		this._unsubscribeProfile = this.registry.on("profilechange", function (context) {
			selector._handleActiveProfile(context);
		});
		this._unsubscribeProfiles = this.registry.on("profileschange", function () {
			selector.refresh();
		});
		this._unsubscribeChooser = this.registry.on("chooserrequest", function () {
			selector.open();
		});
		this.open();
		return this;
	};

	Selector.prototype.destroy = function () {
		if (!this.started) return;
		this.document.removeEventListener("keydown", this._boundKeydown);
		if (this._unsubscribeProfile) this._unsubscribeProfile();
		if (this._unsubscribeProfiles) this._unsubscribeProfiles();
		if (this._unsubscribeChooser) this._unsubscribeChooser();
		if (this.overlay && this.overlay.parentNode) this.overlay.parentNode.removeChild(this.overlay);
		if (this.changeButton && this.changeButton.parentNode) {
			this.changeButton.parentNode.removeChild(this.changeButton);
		}
		if (this.layoutManager) this.layoutManager.reset();
		this.document.body.classList.remove("km-rom-hack-chooser-open");
		this.started = false;
	};

	function createSelector(options) {
		return new Selector(options);
	}

	return {
		QUESTION: QUESTION,
		Selector: Selector,
		createSelector: createSelector
	};
});
