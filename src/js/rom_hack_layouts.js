/*global module */

/* Reversible UI layouts for KM Companion ROM-hack profiles. */
(function (root, factory) {
	if (typeof module === "object" && module.exports) {
		module.exports = factory();
	} else {
		root.KMCalculatorRomHackLayouts = factory();
	}
})(typeof self !== "undefined" ? self : this, function () {
	"use strict";

	var BASE_LAYOUT_ID = "base";
	var REQUIRED_ANCHORS = [
		".wrapper",
		"#p1",
		"#p2",
		".field-info",
		".calculator-import-column",
		".player-notes-controls",
		"#team-box",
		"input[name='format']"
	];
	var PRESERVED_SERVICE_SELECTORS = [
		".calculator-import-column",
		".player-notes-controls",
		"#team-box",
		"#trainer-selector",
		".doubles-slot-summary"
	];

	function registerPendingCleanup(runtime, dispose) {
		if (runtime && typeof runtime.deferCleanup === "function") runtime.deferCleanup(dispose);
		return dispose;
	}

	function setLegend(runtime, selector, text) {
		var documentObject = runtime.document;
		var legend = documentObject.querySelector(selector);
		if (!legend) return noop;
		var previousText = legend ? legend.textContent : "";
		var restore = function () {
			if (legend) legend.textContent = previousText;
		};
		registerPendingCleanup(runtime, restore);
		legend.textContent = text;
		return restore;
	}

	function setPanelRegionLabel(runtime, selector, text) {
		var documentObject = runtime.document;
		var panel = documentObject.querySelector(selector);
		var region = panel && panel.parentElement;
		var previousLabel;
		var restore;
		if (!region || region.getAttribute("role") !== "region") return noop;
		previousLabel = region.getAttribute("aria-label");
		restore = function () {
			if (previousLabel === null) region.removeAttribute("aria-label");
			else region.setAttribute("aria-label", previousLabel);
		};
		registerPendingCleanup(runtime, restore);
		region.setAttribute("aria-label", text);
		return restore;
	}

	function noop() {}

	function combineDisposers(disposers) {
		return function () {
			var firstError = null;
			var i;
			for (i = disposers.length - 1; i >= 0; i--) {
				try {
					disposers[i]();
				} catch (error) {
					if (!firstError) firstError = error;
				}
			}
			if (firstError) throw firstError;
		};
	}

	function captureNodePosition(node) {
		var parent = node && node.parentNode;
		var next = node && node.nextSibling;
		return function () {
			if (!node || !parent) return;
			if (next && next.parentNode === parent) parent.insertBefore(node, next);
			else parent.appendChild(node);
		};
	}

	function moveNode(runtime, selector, targetSelector) {
		var documentObject = runtime.document;
		var node = documentObject.querySelector(selector);
		var target = documentObject.querySelector(targetSelector);
		var restore = captureNodePosition(node);
		registerPendingCleanup(runtime, restore);
		if (node && target) target.appendChild(node);
		return restore;
	}

	function positionTrainerControls(runtime, placement) {
		var controls = runtime.document.querySelector("#p2 > .trainer-controls");
		var selector = runtime.document.querySelector("#p2 > input.set-selector");
		var legend = runtime.document.querySelector("#p2 > legend");
		var jquery = runtime.window.jQuery;
		var selectorAnchor;
		if (!controls) return;
		if (placement === "royal-sword" && legend && legend.parentNode) {
			legend.parentNode.insertBefore(controls, legend.nextSibling);
			return;
		}
		if (jquery && selector) {
			selectorAnchor = jquery(selector).data("select2") ? jquery(selector).select2("container") : jquery(selector);
			if (selectorAnchor.length) selectorAnchor.after(controls);
		} else if (selector && selector.parentNode) {
			selector.parentNode.insertBefore(controls, selector.nextSibling);
		}
	}

	function placeTrainerControls(runtime, placement) {
		var controls = runtime.document.querySelector("#p2 > .trainer-controls");
		var restore = captureNodePosition(controls);
		registerPendingCleanup(runtime, restore);
		positionTrainerControls(runtime, placement);
		return restore;
	}

	function setText(runtime, selector, text) {
		var documentObject = runtime.document;
		var element = documentObject.querySelector(selector);
		var previousText = element ? element.textContent : "";
		var restore = function () {
			if (element) element.textContent = previousText;
		};
		registerPendingCleanup(runtime, restore);
		if (element) element.textContent = text;
		return restore;
	}

	function createProvider(id, playerLabel, opponentLabel, mountExtras) {
		return {
			id: id,
			requiredAnchors: REQUIRED_ANCHORS.slice(),
			mount: function (runtime) {
				var disposers = [
					setLegend(runtime, "#p1 > legend", playerLabel),
					setLegend(runtime, "#p2 > legend", opponentLabel),
					setPanelRegionLabel(runtime, "#p1", playerLabel),
					setPanelRegionLabel(runtime, "#p2", opponentLabel)
				];
				var extras = mountExtras ? mountExtras(runtime) : noop;
				if (typeof extras === "function") disposers.push(extras);
				return combineDisposers(disposers);
			}
		};
	}

	function setCheckedRadio(runtime, selector) {
		var documentObject = runtime.document;
		var radio = documentObject.querySelector(selector);
		var wasChecked = radio ? radio.checked : false;
		var restore = function () {
			if (radio) radio.checked = wasChecked;
		};
		registerPendingCleanup(runtime, restore);
		if (radio) radio.checked = true;
		return restore;
	}

	function createRoyalSwordProvider() {
		return createProvider("royal-sword", "Player", "Trainer", function (runtime) {
			var disposers = [];
			var previousNotation = runtime.document.querySelector("input[name='notation']:checked");
			var previousDefaultLevel = runtime.document.querySelector("input[name='defaultLevel']:checked");
			var previousNotationValue = runtime.window.notation;
			var previousDefaultLevelValue = runtime.window.defaultLevel;
			var restorePreferences = function () {
				if (previousNotation) previousNotation.checked = true;
				if (previousDefaultLevel) previousDefaultLevel.checked = true;
				runtime.window.notation = previousNotationValue;
				runtime.window.defaultLevel = previousDefaultLevelValue;
			};
			registerPendingCleanup(runtime, restorePreferences);
			disposers.push(moveNode(runtime, ".calculator-import-column", ".lower-workspace"));
			disposers.push(placeTrainerControls(runtime, "royal-sword"));
			disposers.push(setText(runtime, "label[for='electric']", "Electric Terrain"));
			disposers.push(setText(runtime, "label[for='grassy']", "Grassy Terrain"));
			disposers.push(setText(runtime, "label[for='misty']", "Misty Terrain"));
			disposers.push(setCheckedRadio(runtime, "#percentage"));
			disposers.push(setCheckedRadio(runtime, "#default-level-100"));
			runtime.window.notation = "%";
			runtime.window.defaultLevel = 100;
			disposers.push(restorePreferences);
			return combineDisposers(disposers);
		});
	}

	var baseLayoutProvider = createProvider(BASE_LAYOUT_ID, "Player", "Trainer", function (runtime) {
		return combineDisposers([
			moveNode(runtime, ".calculator-import-column", ".lower-workspace"),
			placeTrainerControls(runtime, BASE_LAYOUT_ID)
		]);
	});
	var royalSwordLayoutProvider = createRoyalSwordProvider();
	royalSwordLayoutProvider.ownsTrainerPlacement = true;
	baseLayoutProvider.refresh = function (runtime) {
		positionTrainerControls(runtime, BASE_LAYOUT_ID);
	};
	royalSwordLayoutProvider.refresh = function (runtime) {
		positionTrainerControls(runtime, "royal-sword");
	};

	function validateAnchors(documentObject, provider) {
		var anchors = REQUIRED_ANCHORS.concat(provider.requiredAnchors || []);
		var checked = {};
		var missing = [];
		var i;
		for (i = 0; i < anchors.length; i++) {
			if (checked[anchors[i]]) continue;
			checked[anchors[i]] = true;
			if (!documentObject.querySelector(anchors[i])) missing.push(anchors[i]);
		}
		if (missing.length) {
			throw new Error("Layout " + provider.id + " is missing required calculator anchors: " + missing.join(", ") + ".");
		}
	}

	function captureServiceNodes(documentObject) {
		var captured = [];
		var i;
		var nodes;
		var nodeIndex;
		for (i = 0; i < PRESERVED_SERVICE_SELECTORS.length; i++) {
			nodes = typeof documentObject.querySelectorAll === "function" ?
				documentObject.querySelectorAll(PRESERVED_SERVICE_SELECTORS[i]) : [];
			for (nodeIndex = 0; nodeIndex < nodes.length; nodeIndex++) {
				captured.push({selector: PRESERVED_SERVICE_SELECTORS[i], node: nodes[nodeIndex]});
			}
		}
		return captured;
	}

	function validateServiceNodes(documentObject, captured, provider) {
		var root = documentObject.documentElement;
		var missing = [];
		var i;
		if (!root || typeof root.contains !== "function") return;
		for (i = 0; i < captured.length; i++) {
			if (!root.contains(captured[i].node)) missing.push(captured[i].selector);
		}
		if (missing.length) {
			throw new Error("Layout " + provider.id + " detached shared KM Companion services: " +
				missing.join(", ") + ".");
		}
	}

	function LayoutManager(options) {
		options = options || {};
		this.window = options.window;
		this.document = options.document;
		this.registry = options.registry;
		this.currentContext = null;
		this.currentProvider = null;
		this.currentBaseDispose = null;
		this.currentOverlayDispose = null;
	}

	LayoutManager.prototype._getBaseProvider = function () {
		return this.registry && typeof this.registry.getLayoutProvider === "function" ?
			this.registry.getLayoutProvider(BASE_LAYOUT_ID) : baseLayoutProvider;
	};

	LayoutManager.prototype._mountProvider = function (provider, context, previousContext) {
		var dispose;
		var pendingDisposers = [];
		var runtime;
		var serviceNodes;
		if (!provider) throw new Error("The base calculator layout is unavailable.");
		validateAnchors(this.document, provider);
		serviceNodes = captureServiceNodes(this.document);
		runtime = {
			window: this.window,
			document: this.document,
			registry: this.registry,
			profile: context && context.profile ? context.profile : null,
			activationContext: context || null,
			previousContext: previousContext || null,
			deferCleanup: function (cleanup) {
				if (typeof cleanup !== "function") {
					throw new TypeError("Layout cleanup must be a function.");
				}
				pendingDisposers.push(cleanup);
				return cleanup;
			}
		};
		try {
			dispose = provider.mount(runtime);
			if (typeof dispose !== "function") {
				throw new TypeError("Layout " + provider.id + " must return a disposer function from mount().");
			}
			validateAnchors(this.document, provider);
			validateServiceNodes(this.document, serviceNodes, provider);
		} catch (error) {
			try {
				if (typeof dispose === "function") dispose();
				else combineDisposers(pendingDisposers)();
			} catch (cleanupError) {
				error.cleanupError = cleanupError;
			}
			throw error;
		}
		return dispose;
	};

	LayoutManager.prototype._disposeCurrent = function () {
		var disposers = [];
		var provider = this._getBaseProvider();
		var serviceNodes = captureServiceNodes(this.document);
		if (this.currentBaseDispose) disposers.push(this.currentBaseDispose);
		if (this.currentOverlayDispose) disposers.push(this.currentOverlayDispose);
		this.currentBaseDispose = null;
		this.currentOverlayDispose = null;
		this.currentProvider = null;
		this.currentContext = null;
		this.document.body.setAttribute("data-calc-layout", BASE_LAYOUT_ID);
		combineDisposers(disposers)();
		validateAnchors(this.document, provider);
		validateServiceNodes(this.document, serviceNodes, provider);
	};

	LayoutManager.prototype._mountLayout = function (provider, context, previousContext) {
		var baseProvider = this._getBaseProvider();
		var baseDispose = null;
		var overlayDispose = null;
		var targetProvider = provider || baseProvider;
		this.document.body.setAttribute("data-calc-layout", BASE_LAYOUT_ID);
		try {
			baseDispose = this._mountProvider(baseProvider, context, previousContext);
			if (targetProvider.id !== BASE_LAYOUT_ID) {
				this.document.body.setAttribute("data-calc-layout", targetProvider.id);
				overlayDispose = this._mountProvider(targetProvider, context, previousContext);
			}
		} catch (error) {
			try {
				combineDisposers([baseDispose, overlayDispose].filter(function (dispose) {
					return typeof dispose === "function";
				}))();
			} catch (cleanupError) {
				error.cleanupError = error.cleanupError || cleanupError;
			}
			this.document.body.setAttribute("data-calc-layout", BASE_LAYOUT_ID);
			throw error;
		}
		return {
			provider: targetProvider,
			context: context || null,
			baseDispose: baseDispose,
			overlayDispose: overlayDispose
		};
	};

	LayoutManager.prototype._setCurrent = function (layout) {
		this.currentProvider = layout.provider;
		this.currentContext = layout.context;
		this.currentBaseDispose = layout.baseDispose;
		this.currentOverlayDispose = layout.overlayDispose;
		this.document.body.setAttribute("data-calc-layout", layout.provider.id || BASE_LAYOUT_ID);
	};

	LayoutManager.prototype.refresh = function () {
		var baseProvider = this._getBaseProvider();
		var runtime = {
			window: this.window,
			document: this.document,
			registry: this.registry,
			profile: this.currentContext && this.currentContext.profile ? this.currentContext.profile : null,
			activationContext: this.currentContext,
			previousContext: null
		};
		if (!this.currentProvider || this.currentProvider.id === BASE_LAYOUT_ID ||
			!this.currentProvider.ownsTrainerPlacement) {
			if (baseProvider && typeof baseProvider.refresh === "function") baseProvider.refresh(runtime);
		}
		if (this.currentProvider && this.currentProvider.id !== BASE_LAYOUT_ID &&
			typeof this.currentProvider.refresh === "function") {
			this.currentProvider.refresh(runtime);
		}
	};

	LayoutManager.prototype.apply = function (context) {
		var nextProvider = context && context.layoutProvider ? context.layoutProvider : this._getBaseProvider();
		var previousProvider = this.currentProvider;
		var previousContext = this.currentContext;
		var nextLayout;
		var restoredLayout;
		try {
			this._disposeCurrent();
		} catch (disposeError) {
			if (previousProvider) {
				try {
					restoredLayout = this._mountLayout(previousProvider, previousContext, context || null);
					this._setCurrent(restoredLayout);
				} catch (restoreError) {
					disposeError.restoreError = restoreError;
				}
			}
			throw disposeError;
		}
		try {
			nextLayout = this._mountLayout(nextProvider, context || null, previousContext);
			this._setCurrent(nextLayout);
		} catch (error) {
			if (previousProvider) {
				try {
					restoredLayout = this._mountLayout(previousProvider, previousContext, context || null);
					this._setCurrent(restoredLayout);
				} catch (restoreError) {
					error.restoreError = restoreError;
				}
			} else {
				restoredLayout = this._mountLayout(this._getBaseProvider(), null, context || null);
				this._setCurrent(restoredLayout);
			}
			throw error;
		}
		return this.currentContext;
	};

	LayoutManager.prototype.reset = function () {
		return this.apply(null);
	};

	function install(registry) {
		if (!registry || typeof registry.registerLayoutProvider !== "function") {
			throw new TypeError("A KM Companion ROM hack registry with layout support is required.");
		}
		registry.registerLayoutProvider(BASE_LAYOUT_ID, baseLayoutProvider);
		registry.registerLayoutProvider("royal-sword", royalSwordLayoutProvider);
		return [baseLayoutProvider, royalSwordLayoutProvider];
	}

	function createLayoutManager(options) {
		return new LayoutManager(options);
	}

	return {
		BASE_LAYOUT_ID: BASE_LAYOUT_ID,
		LayoutManager: LayoutManager,
		baseLayoutProvider: baseLayoutProvider,
		royalSwordLayoutProvider: royalSwordLayoutProvider,
		install: install,
		createLayoutManager: createLayoutManager
	};
});
