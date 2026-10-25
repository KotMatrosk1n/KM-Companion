/*global window, document */
/* The app shell keeps the live calculator mounted while profile reference views change. */
(function () {
	"use strict";
	var tabs = ["Calculator", "Encounters", "Trainers", "Route Items"];
	var panels = [];
	var buttons = [];
	var views = [];
	var activeTab = 0;
	var previousTab = 0;
	var tabScroll = [0, 0, 0, 0];
	var registry;
	var profileLabel;
	var sourceData;
	var encounterTracker;
	var trainerProgress = {version: 1, beaten: []};
	var trainerProfileId;
	var itemProgress = {version: 1, pickedUp: []};
	var itemProfileId;
	var resetRunDialog;
	var resizeWorkspace = function () {};

	function el(tag, className, text) {
		var node = document.createElement(tag);
		if (className) node.className = className;
		if (text !== undefined && text !== null) node.textContent = text;
		return node;
	}
	function button(text, action, className) {
		var node = el("button", className || "km-action", text);
		node.type = "button";
		node.addEventListener("click", action);
		return node;
	}
	function textMatch(text, query) {
		return String(text || "").toLowerCase().indexOf(query) !== -1;
	}
	function disclosure(title, node, open) {
		var details = el("details", "km-disclosure");
		details.appendChild(el("summary", "", title));
		if (node.parentNode) node.parentNode.insertBefore(details, node);
		details.appendChild(node);
		details.open = !!open;
		return details;
	}
	function activateTab(index, focus) {
		if (window.KMTrainerTooltips) window.KMTrainerTooltips.hide();
		Array.prototype.forEach.call(document.querySelectorAll(".km-toolbar-disclosure"), function (details) { details.open = false; });
		tabScroll[activeTab] = window.scrollY;
		activeTab = index;
		document.getElementById("km-settings-page").hidden = index !== -1;
		document.getElementById("km-settings-button").setAttribute("aria-pressed", String(index === -1));
		panels.forEach(function (panel, i) {
			panel.hidden = i !== index;
			buttons[i].setAttribute("aria-selected", String(i === index));
			buttons[i].tabIndex = i === (index === -1 ? previousTab : index) ? 0 : -1;
		});
		// Close any detached Select2 popup before its owning panel is hidden.
		if (window.jQuery) window.jQuery(".select2-offscreen").each(function () {
			if (window.jQuery(this).data("select2")) window.jQuery(this).select2("close");
		});
		if (focus) buttons[index].focus();
		window.scrollTo(0, tabScroll[index] || 0);
		resizeWorkspace();
		resizeReferences();
	}
	function modal(title, className, parent) {
		var dialog = el("dialog", "km-dialog " + className);
		var heading = el("div", "km-dialog-heading");
		var name = el("h2", "", title);
		name.id = "km-dialog-" + className;
		dialog.setAttribute("aria-labelledby", name.id);
		heading.appendChild(name);
		heading.appendChild(button("Done", function () { dialog.close(); }));
		dialog.appendChild(heading);
		parent.appendChild(dialog);
		return dialog;
	}
	function setupField(field, parent) {
		var content = el("div", "km-field-content");
		var globals = el("div", "km-field-global");
		var sides = el("div", "km-field-sides");
		var groups = {};
		function group(key, title, parent, className) {
			var region = el("section", className);
			region.appendChild(el("h3", "", title));
			var controls = el("div", "km-field-options");
			region.appendChild(controls); parent.appendChild(region); groups[key] = controls;
		}
		group("weather", "Weather", globals, "km-global-weather");
		group("terrain", "Terrain", globals, "km-global-terrain");
		group("other", "Field effects", globals, "km-global-other");
		group("L", "Player", sides, "km-field-side");
		group("R", "Trainer", sides, "km-field-side");
		Array.prototype.forEach.call(field.querySelectorAll("input"), function (input) {
			var label = field.querySelector("label[for='" + input.id + "']");
			if (!label) return;
			var generation = input.closest(".gen-specific");
			var classes = generation ? generation.className.split(/\s+/).filter(function (name) { return /^(gen-specific|g\d+|format-specific|doubles|singles)$/.test(name); }).join(" ") : "";
			var format = input.closest(".format-specific");
			if (format && format !== generation) classes += " " + format.className.split(/\s+/).filter(function (name) { return /^(format-specific|doubles|singles)$/.test(name); }).join(" ");
			if (input.closest(".base-layout-only")) classes += " base-layout-only";
			var choice = el("div", "km-field-choice " + classes);
			if ((generation && generation.style.display === "none") || (format && format.style.display === "none")) choice.style.display = "none";
			var side = /([LR])\d*$/.exec(input.id);
			var target = side ? groups[side[1]] : input.name === "weather" || input.name === "gscWeather" ? groups.weather : input.name === "terrain" ? groups.terrain : groups.other;
			if (/^spikes[LR]$/.test(input.name)) {
				var spikes = groups[input.name];
				if (!spikes) {
					spikes = el("div", "km-spikes " + choice.className);
					spikes.style.display = choice.style.display;
					spikes.appendChild(el("span", "", "Spikes"));
					groups[input.name] = spikes; target.appendChild(spikes);
				}
				label.textContent = input.value; target = spikes;
			}
			choice.appendChild(input); choice.appendChild(label); target.appendChild(choice);
		});
		function effectKey(choice) { return choice.classList.contains("km-spikes") ? "spikes" : choice.querySelector("input").id.replace(/[LR](?=\d*$)/, ""); }
		var order = Array.prototype.map.call(groups.L.children, effectKey);
		Array.prototype.slice.call(groups.R.children).sort(function (a, b) { return order.indexOf(effectKey(a)) - order.indexOf(effectKey(b)); }).forEach(function (choice) { groups.R.appendChild(choice); });
		if (groups.spikesR) Array.prototype.slice.call(groups.spikesR.querySelectorAll(".km-field-choice")).sort(function (a, b) { return Number(a.querySelector("input").value) - Number(b.querySelector("input").value); }).forEach(function (choice) { groups.spikesR.appendChild(choice); });
		// Keep original descriptions and the live field anchor, but replace the legacy table.
		var descriptions = el("div"); descriptions.hidden = true;
		Array.prototype.forEach.call(field.querySelectorAll("[id]"), function (node) { if (!node.querySelector("input, button")) descriptions.appendChild(node); });
		field.textContent = "";
		content.appendChild(sides); content.appendChild(globals); field.appendChild(content); field.appendChild(descriptions);
		parent.appendChild(field);
	}
	function setupTeamDrawer(wrapper, field) {
		var drawer = el("section", "km-team-drawer");
		var bar = el("div", "km-team-drawer-bar");
		var content = el("div", "km-team-drawer-content"); content.id = "km-team-drawer-content"; content.hidden = true;
		var lower = wrapper.querySelector(".lower-workspace");
		var box = lower.querySelector("#team-box");
		var open = null;
		var activePanel = null;
		var tools = [];
		var toggle = button("Team & Boxes", function () { setOpen(open === "team" ? null : "team"); }, "km-team-drawer-toggle");
		toggle.id = "km-team-drawer-toggle"; toggle.setAttribute("aria-controls", content.id); toggle.setAttribute("aria-expanded", "false");
		content.setAttribute("role", "region"); content.setAttribute("aria-labelledby", toggle.id);
		var battlefield = el("div", "km-team-drawer-content km-battlefield-content"); battlefield.id = "km-battlefield-content"; battlefield.hidden = true;
		var fieldToggle = button("Battlefield", function () { setOpen(open === "field" ? null : "field"); }, "km-team-drawer-toggle");
		fieldToggle.id = "km-battlefield-toggle"; fieldToggle.setAttribute("aria-controls", battlefield.id); fieldToggle.setAttribute("aria-expanded", "false");
		battlefield.setAttribute("role", "region"); battlefield.setAttribute("aria-labelledby", fieldToggle.id);
		var indicator = el("span", "km-field-indicator", "Active"); indicator.hidden = true; fieldToggle.appendChild(indicator);
		var fieldStatus = el("span", "visually-hidden"); fieldStatus.id = "km-battlefield-status"; fieldStatus.setAttribute("role", "status");
		fieldToggle.setAttribute("aria-describedby", fieldStatus.id);
		var fieldTooltip = el("div", "km-field-tooltip"); fieldTooltip.hidden = true;
		// The full accessible description remains in fieldStatus; this is its visual preview.
		fieldTooltip.setAttribute("aria-hidden", "true");
		var tooltipTimer;
		var fieldEffects = [];
		function hideFieldTooltip() { window.clearTimeout(tooltipTimer); fieldTooltip.hidden = true; }
		function positionFieldTooltip() {
			var scale = Number(window.getComputedStyle(document.body).zoom) || 1;
			var viewport = window.visualViewport;
			var width = document.documentElement.clientWidth || window.innerWidth;
			var height = document.documentElement.clientHeight || window.innerHeight;
			var inset = 8 * scale;
			var left = (viewport ? viewport.offsetLeft : 0) + inset;
			var top = (viewport ? viewport.offsetTop : 0) + inset;
			var right = left + Math.min(width, viewport ? viewport.width : width) - 2 * inset;
			var bottom = top + Math.min(height, viewport ? viewport.height : height) - 2 * inset;
			fieldTooltip.style.width = Math.min(420, (right - left) / scale) + "px";
			fieldTooltip.style.left = "0px"; fieldTooltip.style.top = "0px"; fieldTooltip.style.visibility = "hidden";
			fieldTooltip.hidden = false;
			fieldTooltip.textContent = fieldEffects.length ? "Active battlefield effects: " + fieldEffects.slice(0, 6).join(", ") +
				(fieldEffects.length > 6 ? ". Plus " + (fieldEffects.length - 6) + " more. Open Battlefield to view all effects." : "") : "No active battlefield effects";
			var rect = fieldTooltip.getBoundingClientRect();
			if (rect.height > bottom - top) {
				fieldTooltip.textContent = fieldEffects.length + " active battlefield effects. Open Battlefield to view them.";
				rect = fieldTooltip.getBoundingClientRect();
			}
			var anchor = fieldToggle.getBoundingClientRect();
			var y = anchor.top - inset - rect.height;
			if (y < top && anchor.bottom + inset + rect.height <= bottom) y = anchor.bottom + inset;
			fieldTooltip.style.left = Math.max(left, Math.min(anchor.left, right - rect.width)) / scale + "px";
			fieldTooltip.style.top = Math.max(top, Math.min(y, bottom - rect.height)) / scale + "px";
			fieldTooltip.style.visibility = "visible";
		}
		function showFieldTooltip() {
			window.clearTimeout(tooltipTimer);
			if (!fieldToggle.closest("[hidden]")) positionFieldTooltip();
		}
		fieldToggle.addEventListener("mouseenter", showFieldTooltip);
		fieldToggle.addEventListener("focus", showFieldTooltip);
		fieldToggle.addEventListener("mouseleave", function () { tooltipTimer = window.setTimeout(hideFieldTooltip, 150); });
		fieldToggle.addEventListener("blur", hideFieldTooltip);
		fieldTooltip.addEventListener("mouseenter", function () { window.clearTimeout(tooltipTimer); });
		fieldTooltip.addEventListener("mouseleave", hideFieldTooltip);
		fieldToggle.addEventListener("keydown", function (event) {
			if (event.key !== "Escape" || fieldTooltip.hidden) return;
			hideFieldTooltip(); event.preventDefault(); event.stopPropagation();
		});
		document.addEventListener("pointerdown", hideFieldTooltip, true);
		window.addEventListener("resize", hideFieldTooltip);
		window.addEventListener("scroll", hideFieldTooltip, true);
		window.addEventListener("blur", hideFieldTooltip);
		if (window.visualViewport) {
			window.visualViewport.addEventListener("resize", hideFieldTooltip);
			window.visualViewport.addEventListener("scroll", hideFieldTooltip);
		}
		setupField(field, battlefield);
		var resetField = button("Reset Battlefield", function () {
			if (typeof window.resetCurrentBattlefield === "function") window.resetCurrentBattlefield();
		}, "km-field-reset");
		resetField.id = "km-battlefield-reset"; resetField.hidden = true;
		resetField.setAttribute("aria-label", "Reset Battlefield to the current matchup's starting conditions");
		var hint = el("span", "km-muted km-team-drawer-hint", "Drag to rearrange · Right click to assign"); hint.hidden = true;
		var actions = el("div", "km-team-drawer-actions"); actions.hidden = true;
		function setOpen(value) {
			hideFieldTooltip();
			open = value; content.hidden = open !== "team"; actions.hidden = open !== "team"; hint.hidden = open !== "team";
			battlefield.hidden = open !== "field";
			resetField.hidden = open !== "field";
			toggle.setAttribute("aria-expanded", String(open === "team"));
			fieldToggle.setAttribute("aria-expanded", String(open === "field"));
			drawer.classList.toggle("km-team-drawer-open", !!open);
			resizeWorkspace();
		}
		function updateFieldIndicator() {
			var generation = Number(window.gen || (document.querySelector(".gen:checked") || {}).value || 8);
			var effects = [];
			Array.prototype.forEach.call(field.querySelectorAll("input:checked"), function (input) {
				if (!input.classList.contains("calc-trigger") || input.name === "defaultLevel" || (input.type === "radio" && (!input.value || input.value === "0"))) return;
				var specific = input.closest(".gen-specific");
				if (specific && !specific.classList.contains("g" + generation)) return;
				var label = field.querySelector("label[for='" + input.id + "']");
				if (!label) return;
				var side = /([LR])\d*$/.exec(input.id);
				var text = /^spikes[LR]$/.test(input.name) ? "Spikes " + input.value : label.textContent.trim();
				effects.push((side ? side[1] === "L" ? "Player: " : "Trainer: " : "") + text);
			});
			indicator.hidden = !effects.length;
			fieldToggle.classList.toggle("km-field-active", !!effects.length);
			var description = effects.length ? "Active battlefield effects: " + effects.join(", ") : "No active battlefield effects";
			fieldEffects = effects;
			if (fieldStatus.textContent !== description) fieldStatus.textContent = description;
			if (open === "field") resizeWorkspace();
			if (!fieldTooltip.hidden) positionFieldTooltip();
		}
		if (window.jQuery) {
			window.jQuery(document).on("change.kmBattlefield keyup.kmBattlefield", ".calc-trigger, .gen, input.set-selector", updateFieldIndicator);
		}
		window.addEventListener("kmcalculator:fieldchange", updateFieldIndicator);
		updateFieldIndicator();
		function showPanel(name) {
			activePanel = name;
			tools.forEach(function (tool) {
				tool.panel.hidden = tool.name !== name;
				tool.button.setAttribute("aria-expanded", String(tool.name === name));
			});
			lower.classList.toggle("km-drawer-has-tools", !!name);
			setOpen("team");
		}
		function addPanel(name, label, panel) {
			panel.id = "km-drawer-" + name; panel.classList.add("km-drawer-tool-panel"); panel.hidden = true;
			var opener = button(label, function () { showPanel(activePanel === name ? null : name); });
			opener.id = panel.id + "-button"; opener.setAttribute("aria-controls", panel.id); opener.setAttribute("aria-expanded", "false");
			panel.setAttribute("role", "region"); panel.setAttribute("aria-labelledby", opener.id);
			tools.push({name: name, panel: panel, button: opener}); actions.appendChild(opener); lower.appendChild(panel);
		}
		var search = el("div", "km-drawer-search");
		search.appendChild(box.querySelector(".team-box-filter-section")); search.appendChild(box.querySelector(".team-box-sort-section"));
		addPanel("search", "Search & sort", search);
		addPanel("colors", "Color coding", box.querySelector(".color-coding-controls"));
		addPanel("manage", "Manage boxes", box.querySelector(".team-box-control-section"));
		addPanel("import", "Import / Export", lower.querySelector(".calculator-import-column"));
		bar.appendChild(toggle); bar.appendChild(fieldToggle); bar.appendChild(fieldStatus); bar.appendChild(hint); bar.appendChild(actions); bar.appendChild(resetField);
		content.appendChild(lower); drawer.appendChild(bar); drawer.appendChild(content); drawer.appendChild(battlefield); drawer.appendChild(fieldTooltip); wrapper.appendChild(drawer);
		wrapper.classList.add("km-has-team-drawer");
		drawer.addEventListener("keydown", function (event) {
			if (event.key !== "Escape" || event.defaultPrevented || event.target.closest("dialog")) return;
			if (window.jQuery && window.jQuery(".select2-drop-active").length) return;
			if (!open) return;
			var opener = open === "field" ? fieldToggle : toggle;
			event.preventDefault(); event.stopPropagation(); setOpen(null); opener.focus({preventScroll: true});
			hideFieldTooltip();
		});
		return {
			lower: lower,
			box: box,
			resize: function (height) {
				var size = open ? Math.min(330, Math.max(260, Math.floor(height * 0.31))) : 40;
				if (open === "field") size = Math.max(300, field.scrollHeight + 60);
				wrapper.style.setProperty("--km-team-drawer-size", size + "px");
				return size;
			}
		};
	}
	function getBoxPageLayout(zone, scale, height) {
		if (zone.id === "team-poke-list") return {capacity: 6, columns: 6, rows: 1};
		var profile = registry && registry.getActiveProfile();
		var generation = Number(profile ? profile.baseGeneration : window.gen || (document.querySelector(".gen:checked") || {}).value || 8);
		var minimum = generation <= 2 ? 20 : 30;
		var rect = zone.getBoundingClientRect();
		var width = Math.max(1, rect.width / scale - 8);
		height = Math.max(1, (height === undefined ? rect.height / scale : height) - 8);
		var columns = Math.max(1, Math.floor((width + 3) / 35));
		var rows = Math.max(1, Math.floor((height + 3) / 35));
		if (columns * rows < minimum) {
			// Keep the minimum capacity in small windows, choosing the shape that fits best.
			var bestSize = -Infinity;
			for (var count = 1; count <= minimum; count++) {
				var neededRows = Math.ceil(minimum / count);
				var size = Math.min((width - (count - 1) * 3) / count, (height - (neededRows - 1) * 3) / neededRows);
				if (size > bestSize) { bestSize = size; columns = count; rows = neededRows; }
			}
		}
		return {capacity: columns * rows, columns: columns, rows: rows};
	}
	function updateBoxPage(view, scale) {
		var rect = view.zone.getBoundingClientRect();
		if (!rect.width || !rect.height) return;
		var matches = Array.prototype.filter.call(view.zone.children, function (node) {
			return node.classList.contains("box-pokemon") && !node.classList.contains("team-box-filter-hidden");
		}).sort(function (left, right) { return (Number(left.style.order) || 0) - (Number(right.style.order) || 0); });
		var pagerHeight = view.pager.getBoundingClientRect().height / scale || 34;
		var height = rect.height / scale + (view.pager.hidden ? 0 : pagerHeight);
		var layout = getBoxPageLayout(view.zone, scale, height);
		if (matches.length > layout.capacity) layout = getBoxPageLayout(view.zone, scale, height - pagerHeight);
		if (view.capacity && view.capacity !== layout.capacity) view.page = Math.floor(view.page * view.capacity / layout.capacity);
		view.capacity = layout.capacity;
		var pages = Math.max(1, Math.ceil(matches.length / layout.capacity));
		view.page = Math.max(0, Math.min(view.page, pages - 1));
		Array.prototype.forEach.call(view.zone.children, function (node) {
			if (!node.classList.contains("box-pokemon")) return;
			var index = matches.indexOf(node);
			var hide = index < 0 || Math.floor(index / layout.capacity) !== view.page;
			if (node.hidden !== hide) node.hidden = hide;
			if (typeof window.updateTeamBoxPokemonPresentation === "function") window.updateTeamBoxPokemonPresentation(node);
		});
		view.pager.hidden = pages === 1;
		view.status.textContent = (view.page + 1) + " / " + pages;
		view.previous.disabled = view.page === 0; view.next.disabled = view.page === pages - 1;
		var properties = {"--km-box-columns": String(layout.columns), "--km-box-rows": String(layout.rows)};
		if (view.zone.id === "team-poke-list") {
			var cardWidth = Math.max(1, (rect.width / scale - 8 - 5 * 3) / 6);
			properties["--km-team-card-height"] = Math.max(1, Math.min(rect.height / scale - 8, cardWidth + 18)) + "px";
		}
		Object.keys(properties).forEach(function (key) {
			if (view.zone.style.getPropertyValue(key) !== properties[key]) view.zone.style.setProperty(key, properties[key]);
		});
	}
	function setupCalculator(wrapper) {
		var boxViews = [];
		var heading = el("div", "km-page-heading km-calculator-heading");
		heading.appendChild(el("h1", "", "Calculator"));
		var trainerNavigation = el("div", "km-trainer-navigation"); trainerNavigation.id = "km-trainer-navigation";
		trainerNavigation.setAttribute("role", "group"); trainerNavigation.setAttribute("aria-label", "Battle format and trainer navigation");
		var trainerRow = wrapper.querySelector(".trainer-selector-row");
		if (trainerRow) trainerNavigation.appendChild(trainerRow);
		heading.appendChild(trainerNavigation);
		var actions = el("div", "km-heading-actions"); heading.appendChild(actions);
		wrapper.insertBefore(heading, wrapper.firstChild);
		var title = wrapper.querySelector(".main-title-text"); if (title) title.hidden = true;
		var settings = wrapper.querySelector(".calc-layout-settings");
		if (settings) {
			var preferences = disclosure("Preferences", settings, false);
			preferences.classList.add("km-toolbar-disclosure"); actions.appendChild(preferences);
		}
		var layout = el("div", "km-calculator-grid");
		var main = el("div", "km-battle-column");
		var results = el("aside", "km-results-column"); results.setAttribute("aria-label", "Damage results");
		var resultHeading = el("div", "km-results-heading"); resultHeading.appendChild(el("h2", "", "Damage results")); results.appendChild(resultHeading);
		var resultTabs = el("div", "km-result-slots doubles-result-only"); resultTabs.setAttribute("aria-label", "Damage result slot");
		function showSlot(slot) {
			results.classList.toggle("km-show-slot-2", slot === 2);
			Array.prototype.forEach.call(resultTabs.children, function (b, i) { b.setAttribute("aria-pressed", String(i + 1 === slot)); });
		}
		[1, 2].forEach(function (slot) { resultTabs.appendChild(button("Slot " + slot, function () { showSlot(slot); })); });
		showSlot(1); resultHeading.appendChild(resultTabs);
		results.addEventListener("click", function (event) {
			if (event.target.classList.contains("result-move")) showSlot(event.target.name === "resultMoveSlot2" ? 2 : 1);
		});
		document.addEventListener("click", function (event) {
			var slot = event.target.closest(".doubles-slot-card"); if (slot) showSlot(Number(slot.getAttribute("data-slot")));
		}, true);
		[".main-result-group", ".move-result-group"].forEach(function (selector) {
			Array.prototype.forEach.call(wrapper.querySelectorAll(":scope > " + selector), function (node) { results.appendChild(node); });
		});
		Array.prototype.forEach.call(results.querySelectorAll(".move-result-column"), function (column) {
			Array.prototype.forEach.call(column.querySelectorAll(".result-move-header"), function (header, slot) {
				var name = header.querySelector("span"); name.classList.add("km-result-side");
				name.after(el("small", "km-result-slot-number doubles-result-only", "Slot " + (slot + 1)));
			});
		});
		Array.prototype.forEach.call(results.querySelectorAll(".small-text details"), function (details) {
			var old = details.querySelector("summary");
			var values = el("div", "km-damage-values"); values.id = old.id; values.textContent = old.textContent;
			old.remove(); details.before(values); details.classList.add("km-extra-damage-rolls");
			details.hidden = !details.querySelector("p").textContent.trim();
			details.insertBefore(el("summary", "", "More damage rolls"), details.firstChild);
		});
		var combat = wrapper.querySelector(".combat-workspace"); wrapper.insertBefore(layout, combat);
		main.appendChild(combat); layout.appendChild(main); layout.appendChild(results);
		var field = combat.querySelector(".field-info"); var fieldPanel = field.closest(".panel"); fieldPanel.hidden = true;
		var format = field.querySelector(".field-format-toggle"); trainerNavigation.insertBefore(format, trainerNavigation.firstChild);
		format.addEventListener("change", function () { if (document.getElementById("singles-format").checked) showSlot(1); });
		Array.prototype.forEach.call(combat.querySelectorAll(".poke-info"), function (pokemon, index) {
			if (!index) {
				var playerControls = pokemon.querySelector(".player-controls-spacer");
				var setInput = pokemon.querySelector("input.set-selector");
				var setContainer = pokemon.querySelector(":scope > .select2-container");
				if (setContainer) pokemon.insertBefore(setContainer, playerControls);
				pokemon.insertBefore(setInput, playerControls);
				var editorActions = el("div", "km-editor-actions"); pokemon.parentNode.appendChild(editorActions);
				editorActions.appendChild(pokemon.querySelector(".player-notes-controls"));
			}
			var currentHP = pokemon.querySelector(".current-hp");
			var health = currentHP.parentNode; health.classList.add("km-health-controls");
			var hpLabel = health.querySelector("label"); hpLabel.textContent = "HP";
			var amount = el("div", "km-control-group km-hp-amount");
			var total = el("span", "km-hp-total", "/"); total.appendChild(health.querySelector(".max-hp"));
			amount.appendChild(hpLabel); amount.appendChild(currentHP); amount.appendChild(total);
			var percentage = el("div", "km-control-group km-hp-percentage");
			var percentHP = pokemon.querySelector(".percent-hp"); percentHP.setAttribute("aria-label", "Current HP percentage");
			percentage.appendChild(percentHP); percentage.appendChild(el("span", "km-hp-unit", "%"));
			Array.prototype.slice.call(health.childNodes).forEach(function (node) {
				if (node.nodeType === 3 || node.nodeName === "BR") node.remove();
			});
			var level = pokemon.querySelector(".level").parentNode; level.classList.add("km-level-control", "km-control-group");
			health.prepend(level, amount, percentage);
			var statsContent = el("div", "km-stats-content");
			var statsTop = pokemon.querySelector(".info-group.top"); statsContent.appendChild(statsTop);
			var genderControl = statsTop.querySelector(".gender").parentNode; genderControl.classList.add("km-gender-control");
			statsTop.querySelector(".pokemon-type-row").after(genderControl, statsTop.querySelector(".pokemon-forme-control"));
			var statsTable = pokemon.querySelector(".info-group table");
			var headers = statsTable.querySelectorAll("thead th");
			headers[5].textContent = "Stat"; headers[6].textContent = "Stage";
			var modified = el("th", "", "Final"); modified.scope = "col"; headers[0].parentNode.appendChild(modified);
			statsContent.appendChild(statsTable.parentNode);
			var firstMove = pokemon.querySelector(".move1");
			var inlineStats = el("section", "km-inline-stats");
			var statsHeading = el("h3", "", "Stats & details"); statsHeading.id = "km-stats-heading-" + index;
			inlineStats.setAttribute("aria-labelledby", statsHeading.id);
			inlineStats.appendChild(statsHeading); inlineStats.appendChild(statsContent); pokemon.insertBefore(inlineStats, firstMove);
			if (firstMove) pokemon.insertBefore(el("h3", "km-section-heading", "Moves"), firstMove);
			Array.prototype.forEach.call(pokemon.querySelectorAll(".move-bp"), function (input) { input.setAttribute("aria-label", "Move base power"); input.title = "Base power"; });
		});
		var drawer = setupTeamDrawer(wrapper, field);
		var lower = drawer.lower;
		var box = drawer.box;
		Array.prototype.forEach.call(box.querySelectorAll(".box-poke"), function (zone) {
			var name = zone.parentNode.querySelector(".team-box-heading").textContent;
			var pager = el("div", "km-box-pages"); var status = el("span"); status.setAttribute("aria-live", "polite");
			var view = {zone: zone, page: 0, pager: pager, status: status};
			view.previous = button("‹", function () { view.page--; resizeWorkspace(); }); view.previous.setAttribute("aria-label", "Previous " + name + " page");
			view.next = button("›", function () { view.page++; resizeWorkspace(); }); view.next.setAttribute("aria-label", "Next " + name + " page");
			pager.appendChild(view.previous); pager.appendChild(status); pager.appendChild(view.next); zone.after(pager); boxViews.push(view);
			new window.MutationObserver(function (records) {
				records = records.filter(function (record) {
					return record.type !== "attributes" || record.attributeName !== "style" || record.target.classList.contains("box-pokemon");
				});
				if (!records.length) return;
				if (records.some(function (record) {
					return record.type === "attributes" && record.attributeName === "class" && /\bteam-box-filter-hidden\b/.test(record.oldValue || "") !== record.target.classList.contains("team-box-filter-hidden");
				})) view.page = 0;
				resizeWorkspace();
			}).observe(zone, {childList: true, subtree: true, attributes: true, attributeOldValue: true, attributeFilter: ["class", "style"]});
		});
		resizeWorkspace = function () {
			var scale = Number(window.getComputedStyle(document.body).zoom) || 1;
			var availableHeight = window.innerHeight / scale - drawer.resize(window.innerHeight / scale);
			var expanded = window.innerWidth / scale >= 1500 && availableHeight >= 960;
			results.classList.toggle("km-results-expanded", expanded);
			boxViews.forEach(function (view) { updateBoxPage(view, scale); });
		};
		window.addEventListener("resize", resizeWorkspace);
		window.addEventListener("kmcalculator:romhackchange", function () {
			boxViews.forEach(function (view) { view.page = 0; }); resizeWorkspace();
		});
		if (window.jQuery) window.jQuery(document).on("change.kmBoxPages", ".gen", function () { resizeWorkspace(); });
		if (window.ResizeObserver) {
			var boxObserver = new window.ResizeObserver(resizeWorkspace);
			boxObserver.observe(lower);
			boxViews.forEach(function (view) { boxObserver.observe(view.zone); });
		}
		if (window.ResizeObserver) new window.ResizeObserver(resizeWorkspace).observe(field);
	}

	function makeFilter(view, label, values) {
		var group = el("label", "km-filter");
		group.appendChild(el("span", "", label));
		var select = el("select");
		values.forEach(function (entry) {
			var option = el("option", "", entry.label || entry);
			option.value = entry.value === undefined ? entry : entry.value;
			select.appendChild(option);
		});
		select.addEventListener("change", function () { render(view); });
		group.appendChild(select);
		view.filters.appendChild(group);
		return select;
	}
	function empty(container, title, message) {
		var box = el("div", "km-empty-state");
		box.appendChild(el("h2", "", title));
		box.appendChild(el("p", "km-muted", message));
		container.appendChild(box);
	}
	function referenceDetails(title, content, parent) {
		var opener = button(title, function () {
			var dialog = modal(title, "km-reference-dialog", document.body);
			dialog.appendChild(content.cloneNode(true));
			dialog.addEventListener("close", function () { dialog.remove(); opener.focus({preventScroll: true}); });
			dialog.showModal();
		}, "km-reference-more");
		parent.appendChild(opener);
	}
	function layoutEncounterTables(grid, tables, available) {
		var scale = Number(window.getComputedStyle(document.body).zoom) || 1;
		grid.classList.remove("km-encounter-compact");
		var style = window.getComputedStyle(grid);
		var gap = parseFloat(style.columnGap) || 0;
		var minimumWidth = parseFloat(style.getPropertyValue("--km-encounter-min-width")) || 300;
		var maximumColumns = Math.max(1, Math.min(4, Math.floor((grid.getBoundingClientRect().width / scale + gap) / (minimumWidth + gap))));
		function arrange(columns, compact) {
			grid.classList.toggle("km-encounter-compact", compact);
			grid.style.gridTemplateColumns = "repeat(" + columns + ", minmax(0, 1fr))";
			grid.textContent = "";
			// Reuse the live catch controls when a small window needs to split a table.
			tables.forEach(function (table) {
				var card = table.card; card.hidden = false;
				card.style.gridColumn = ""; card.style.gridRow = "";
				var body = card.querySelector("tbody"); table.rows.forEach(function (row) { body.appendChild(row); });
				grid.appendChild(card);
				var overhead = card.getBoundingClientRect().height - body.getBoundingClientRect().height;
				var rowHeight = Math.max.apply(null, table.rows.map(function (row) { return row.getBoundingClientRect().height; }));
				var capacity = Math.max(1, Math.floor((available - overhead) / rowHeight));
				if (table.rows.length <= capacity) { card.setAttribute("data-page-key", table.rows[0].querySelector("input").id); return; }
				var range = el("small", "km-table-range", " · " + table.rows.length + " to " + table.rows.length + " / " + table.rows.length);
				card.querySelector("h3").appendChild(range);
				overhead = card.getBoundingClientRect().height - body.getBoundingClientRect().height;
				capacity = Math.max(1, Math.floor((available - overhead) / rowHeight));
				range.remove();
				for (var start = 0; start < table.rows.length; start += capacity) {
					var chunk = card.cloneNode(true); var chunkBody = chunk.querySelector("tbody"); chunkBody.textContent = "";
					table.rows.slice(start, start + capacity).forEach(function (row) { chunkBody.appendChild(row); });
					chunk.querySelector("h3").appendChild(el("small", "km-table-range", " · " + (start + 1) + " to " + Math.min(start + capacity, table.rows.length) + " / " + table.rows.length));
					chunk.setAttribute("data-page-key", table.rows[start].querySelector("input").id); grid.insertBefore(chunk, card);
				}
				card.remove();
			});
			var nodes = Array.prototype.slice.call(grid.children);
			var land = nodes.filter(function (node) { return node.getAttribute("data-encounter-section") === "land"; });
			var other = nodes.filter(function (node) { return node.getAttribute("data-encounter-section") !== "land"; });
			var pages = [];
			function placeLane(entries, firstColumn, count) {
				var heights = new Array(count).fill(0), page = 0;
				entries.forEach(function (node) {
					var column = heights.indexOf(Math.min.apply(null, heights));
					var cardHeight = Math.ceil(node.getBoundingClientRect().height / scale);
					if (heights[column] && heights[column] + cardHeight > available / scale) {
						page++; heights.fill(0); column = 0;
					}
					node.style.gridColumn = String(firstColumn + column + 1);
					node.style.gridRow = (heights[column] + 1) + " / span " + cardHeight;
					heights[column] += cardHeight + gap;
					if (!pages[page]) pages[page] = [];
					pages[page].push(node);
				});
			}
			if (land.length && other.length && columns > 1) {
				// Keep Fishing, then Shaking Trees, beside the land/weather block.
				var landColumns = Math.min(land.length, columns - 1);
				var baseLand = land.filter(function (node) { return node.getAttribute("data-encounter-method") === "Land"; });
				if (landColumns >= 3 && baseLand.length) {
					placeLane(baseLand, 0, 1);
					placeLane(land.filter(function (node) { return node.getAttribute("data-encounter-method") !== "Land"; }), 1, landColumns - 1);
				} else placeLane(land, 0, landColumns);
				placeLane(other, landColumns, columns - landColumns);
			} else placeLane(nodes, 0, columns);
			return pages;
		}
		var pages;
		// Use the available width before reducing row spacing or introducing another page.
		for (var density = 0; density < 2; density++) {
			pages = arrange(Math.max(1, Math.min(tables.length, maximumColumns)), density === 1);
			if (pages.length <= 1) return pages;
		}
		return pages;
	}
	function referencePager(parent, grid, label, state) {
		var encounterTables = grid.classList.contains("km-encounter-groups") ? Array.prototype.map.call(grid.children, function (card) {
			return {card: card, rows: Array.prototype.slice.call(card.querySelector("tbody").children)};
		}) : null;
		var viewport = el("div", "km-page-viewport");
		grid.parentNode.insertBefore(viewport, grid); viewport.appendChild(grid);
		var footer = el("nav", "km-pagination"); footer.setAttribute("aria-label", label + " pages");
		var summary = el("span", "km-pagination-summary"); summary.setAttribute("role", "status");
		var pages = [];
		var previous = button("Previous", function () { show(state.page - 1); });
		var select = el("select"); select.setAttribute("aria-label", label + " page");
		var next = button("Next", function () { show(state.page + 1); });
		previous.setAttribute("aria-label", "Previous " + label.toLowerCase() + " page");
		next.setAttribute("aria-label", "Next " + label.toLowerCase() + " page");
		select.addEventListener("change", function () { show(Number(select.value)); });
		[summary, previous, select, next].forEach(function (node) { footer.appendChild(node); });
		parent.appendChild(footer);
		function show(index) {
			state.page = Math.max(0, Math.min(index, pages.length - 1));
			var page = pages[state.page] || [];
			Array.prototype.forEach.call(grid.children, function (node) { node.hidden = page.indexOf(node) === -1; });
			state.anchor = page.length ? page[0].getAttribute("data-page-key") : null;
			previous.disabled = state.page === 0; next.disabled = state.page >= pages.length - 1;
			select.value = String(state.page);
			footer.hidden = !!encounterTables && pages.length <= 1;
			summary.textContent = encounterTables ? page.length + " of " + grid.children.length + " tables" : page.length ? (Array.prototype.indexOf.call(grid.children, page[0]) + 1) + " to " +
				(Array.prototype.indexOf.call(grid.children, page[page.length - 1]) + 1) + " of " + grid.children.length : "0 results";
		}
		return function () {
			footer.hidden = !!encounterTables;
			if (!viewport.getBoundingClientRect().height) return;
			var available = viewport.getBoundingClientRect().height;
			if (encounterTables) {
				pages = layoutEncounterTables(grid, encounterTables, available);
				if (pages.length > 1) {
					footer.hidden = false;
					pages = layoutEncounterTables(grid, encounterTables, viewport.getBoundingClientRect().height);
				}
			} else {
				var nodes = Array.prototype.slice.call(grid.children);
				nodes.forEach(function (node) { node.hidden = false; });
				var style = window.getComputedStyle(grid);
				var scale = Number(window.getComputedStyle(document.body).zoom) || 1;
				var columns = style.display === "grid" ? style.gridTemplateColumns.split(" ").length : 1;
				var gap = (parseFloat(style.rowGap) || 0) * scale;
				pages = []; var page = []; var height = 0;
				for (var i = 0; i < nodes.length; i += columns) {
					var row = nodes.slice(i, i + columns);
					var rowHeight = Math.max.apply(null, row.map(function (node) { return node.getBoundingClientRect().height; }));
					if (page.length && height + gap + rowHeight > available + 1) { pages.push(page); page = []; height = 0; }
					height += (page.length ? gap : 0) + rowHeight; page = page.concat(row);
				}
				if (page.length) pages.push(page);
			}
			select.textContent = "";
			pages.forEach(function (entries, index) {
				var option = el("option", "", (index + 1) + " / " + pages.length); option.value = index; select.appendChild(option);
				if (entries.some(function (node) { return node.getAttribute("data-page-key") === state.anchor || (state.anchor && node.contains(document.getElementById(state.anchor))); })) state.page = index;
			});
			show(state.page || 0);
		};
	}
	function resizeReferences() {
		views.forEach(function (view) {
			if (view.panel.hidden) return;
			if (view.resizeList) view.resizeList();
			if (view.resizeDetail) view.resizeDetail();
		});
	}
	function reloadReferenceProgress(profile) {
		loadTrainerProgress(profile);
		loadItemProgress(profile);
		if (encounterTracker) encounterTracker.setProfile(profile, sourceData);
		views.forEach(function (view) { render(view); });
	}
	function confirmResetRun(opener) {
		var profile = registry && registry.getActiveProfile();
		if (!profile || !sourceData || resetRunDialog) return;
		var profileId = profile.id, busy = false;
		var dialog = el("dialog", "km-dialog km-reset-run-dialog");
		resetRunDialog = dialog;
		dialog.setAttribute("role", "alertdialog");
		dialog.setAttribute("aria-labelledby", "km-reset-run-title");
		dialog.setAttribute("aria-describedby", "km-reset-run-description");
		var title = el("h2", "", "Reset Run"); title.id = "km-reset-run-title"; dialog.appendChild(title);
		var description = el("div"); description.id = "km-reset-run-description";
		description.appendChild(el("p", "", "Accept will permanently clear the following progress for " + (profile.shortName || profile.name) + ":"));
		var list = el("ul");
		[
			"All encounter records in Normal, Royalocke, and Nuzlocke, including catches, excluded families, and locations marked used, missed, or closed.",
			"Every Route Items pickup check.",
			"Every trainer's Beaten check."
		].forEach(function (text) { list.appendChild(el("li", "", text)); });
		description.appendChild(list);
		description.appendChild(el("p", "", "Your team, boxes, imported inventory, notes, settings, and other ROM hack profiles will be kept."));
		description.appendChild(el("p", "km-reset-run-warning", "This is NOT reversible. There is no undo."));
		dialog.appendChild(description);
		var feedback = el("p", "km-reset-run-error"); feedback.setAttribute("role", "alert"); feedback.hidden = true; dialog.appendChild(feedback);
		var actions = el("div", "km-dialog-actions");
		var decline = button("Decline", function () { if (!busy) dialog.close(); });
		decline.autofocus = true;
		var accept = button("Accept", function () {
			if (busy || !dialog.open || (registry.getActiveProfile() || {}).id !== profileId) return;
			busy = true; accept.disabled = decline.disabled = true;
			feedback.hidden = true; dialog.setAttribute("aria-busy", "true");
			window.kmCalculatorStorage.resetProgress(profileId).then(function () {
				if ((registry.getActiveProfile() || {}).id === profileId) {
					reloadReferenceProgress(registry.getActiveProfile());
				}
				busy = false; dialog.close();
			}, function (error) {
				busy = false; accept.disabled = decline.disabled = false; dialog.removeAttribute("aria-busy");
				feedback.textContent = error.message || "The run could not be reset. Check available storage and try again."; feedback.hidden = false;
				decline.focus(); return;
			});
		}, "km-action km-danger-action");
		actions.appendChild(decline); actions.appendChild(accept); dialog.appendChild(actions);
		dialog.addEventListener("cancel", function (event) { if (busy) event.preventDefault(); });
		dialog.addEventListener("close", function () {
			dialog.remove(); if (resetRunDialog === dialog) resetRunDialog = null;
			if (opener.isConnected && !opener.closest("[hidden]")) opener.focus({preventScroll: true});
		});
		document.body.appendChild(dialog); dialog.showModal(); decline.focus();
	}
	function buildReference(title, kind, subtitle) {
		var panel = el("section", "km-reference-panel" + (kind === "encounters" ? " km-encounters-panel" : ""));
		var heading = el("div", "km-page-heading");
		var copy = el("div");
		copy.appendChild(el("span", "km-eyebrow", "PROFILE REFERENCE"));
		copy.appendChild(el("h1", "", title));
		if (kind !== "encounters") copy.appendChild(el("p", "km-muted", subtitle));
		heading.appendChild(copy);
		panel.appendChild(heading);
		var filters = el("div", "km-reference-filters");
		var searchLabel = el("label", "km-filter km-search");
		searchLabel.appendChild(el("span", "", "Search " + title.toLowerCase()));
		var search = el("input");
		search.type = "search";
		search.placeholder = kind === "encounters" ? "Pokémon or location" : kind === "items" ? "Item, location, or landmark" : "Trainer, Pokémon, move, or location";
		searchLabel.appendChild(search);
		filters.appendChild(searchLabel);
		panel.appendChild(filters);
		var note = el("p", "km-reference-note");
		panel.appendChild(note);
		var status = el("p", "km-result-count");
		status.setAttribute("role", "status");
		panel.appendChild(status);
		var browser = el("div", "km-reference-browser");
		var navigation = el("nav", "km-location-list");
		navigation.setAttribute("aria-label", kind === "trainers" ? "Trainers" : "Locations");
		var list = el("div", "km-location-options"); navigation.appendChild(list);
		var detail = el("div", "km-reference-detail");
		browser.appendChild(navigation);
		browser.appendChild(detail);
		panel.appendChild(browser);
		var view = {kind: kind, panel: panel, filters: filters, search: search, note: note, status: status, list: list, detail: detail, selected: null, listPage: {}, detailPage: {}};
		view.resizeList = referencePager(navigation, list, kind === "trainers" ? "Trainers" : title + " locations", view.listPage);
		if (kind === "encounters") {
			encounterTracker = window.KMEncounterTracker.create({panel: panel, heading: heading, note: note, onChange: function () { render(view); }});
			var help = el("div");
			help.appendChild(note);
			help.appendChild(el("p", "km-muted", "In areas with weather encounters, the first seven land slots apply in every weather. Weather cards show only the three replacement slots, with odds calculated from all ten slots. Land shows the odds for normal weather. Filter by a weather to see its complete table."));
			referenceDetails("Encounter rules", help, heading.querySelector(".km-catch-summary"));
			navigation.insertBefore(status, navigation.firstChild);
		}
		var actions = kind === "encounters" ? heading.querySelector(".km-catch-summary") : el("div", "km-reference-actions");
		if (kind !== "encounters") heading.appendChild(actions);
		view.resetButton = button("Reset Run", function () { confirmResetRun(view.resetButton); }, "km-action km-danger-action");
		view.resetButton.disabled = true;
		view.resetButton.setAttribute("aria-haspopup", "dialog");
		actions.appendChild(view.resetButton);
		search.addEventListener("input", function () { render(view); });
		view.primary = makeFilter(view, kind === "encounters" ? "Encounter method" : kind === "items" ? "Acquisition" : "Story split", [{value: "", label: "All"}]);
		if (kind === "trainers") view.secondary = makeFilter(view, "Battle format", [{value: "", label: "All formats"}, "Single", "Double", "Not listed"]);
		filters.appendChild(button("Reset filters", function () {
			view.search.value = "";
			view.primary.value = "";
			if (view.secondary) view.secondary.value = "";
			render(view);
		}));
		views.push(view);
		return panel;
	}
	function getGroups(area) {
		var land = area.groups.filter(function (g) { return g.method === "Land"; })[0];
		function order(group) { return group.method === "Land" ? 0 : group.weather ? 1 : group.method === "Fishing" ? 2 : group.method === "Shaking Trees" ? 3 : 4; }
		return area.groups.map(function (g) {
			var weather = ["Land", "Fishing", "Shaking Trees", "Trade", "Gift", "Starter", "Static", "Other"].indexOf(g.method) === -1;
			var shared = weather && land ? land.entries.filter(function (e) { return e.slot <= 7; }) : [];
			return {method: g.method, weather: weather, sharedEntries: shared, entries: shared.concat(g.entries)};
		}).sort(function (a, b) { return order(a) - order(b); });
	}
	function itemLocationName(item) { return item.postGame === true ? "Post Game" : item.location; }
	function getResults(view) {
		var query = view.search.value.toLowerCase().trim();
		var filter = view.primary.value;
		if (!sourceData) return [];
		if (view.kind === "encounters") {
			return sourceData.areas.map(function (area) {
				var groups = getGroups(area).filter(function (group) { return !filter || group.method === filter; }).map(function (group) {
					return {method: group.method, weather: group.weather, sharedEntries: group.sharedEntries, totalEntries: group.entries, entries: group.entries.filter(function (entry) {
						return !query || textMatch(area.name, query) || textMatch(entry.pokemon, query) || textMatch(entry.requiredPokemon, query);
					})};
				}).filter(function (group) { return group.entries.length; });
				var land = groups.filter(function (group) { return group.method === "Land"; })[0];
				var sharedWeather = false;
				if (land) groups.forEach(function (group) {
					group.entries = group.entries.filter(function (entry) {
						var shared = group.sharedEntries.indexOf(entry) !== -1 && land.entries.indexOf(entry) !== -1;
						if (shared) sharedWeather = true;
						return !shared;
					});
				});
				groups = groups.filter(function (group) { return group.entries.length; });
				return {id: area.id, name: area.name, groups: groups, sharedWeather: sharedWeather, count: groups.reduce(function (n, g) { return n + g.entries.length; }, 0)};
			}).filter(function (area) { return area.groups.length; });
		}
		if (view.kind === "trainers") return sourceData.trainers.filter(function (trainer) {
			var format = trainerBattleType(trainer);
			return (!filter || trainer.split === filter) && (!view.secondary.value || format === view.secondary.value) &&
				(!query || textMatch([trainer.name, trainer.location, trainerSplitLabel(trainer.split), JSON.stringify(trainer.team)].join(" "), query));
		});
		var rows = sourceData.routeItems.filter(function (item) {
			return (!filter || item.acquisition === filter) && (!query || textMatch([itemLocationName(item), item.location, item.items, item.directions].join(" "), query));
		});
		var locations = [];
		rows.forEach(function (item) {
			var name = itemLocationName(item);
			var group = locations.filter(function (entry) { return entry.name === name; })[0];
			if (!group) { group = {id: name, name: name, items: [], count: 0}; locations.push(group); }
			group.items.push(item);
			group.count++;
		});
		var encounterNames = sourceData.areas.map(function (area) { return area.name; });
		var locationOrder = Object.create(null);
		encounterNames.forEach(function (name, index) { locationOrder[name] = index * 3 + 1; });
		(sourceData.itemLocations || []).forEach(function (location) {
			var anchor = location.encounterLocation || location.beforeEncounter || location.afterEncounter;
			var index = encounterNames.indexOf(anchor);
			if (index !== -1) locationOrder[location.name] = index * 3 + (location.beforeEncounter ? 0 : location.afterEncounter ? 2 : 1);
		});
		var fallback = encounterNames.length * 3;
		locationOrder["Post Game"] = fallback + 1;
		locations.sort(function (a, b) {
			var aOrder = locationOrder[a.name], bOrder = locationOrder[b.name];
			return (aOrder === undefined ? fallback : aOrder) - (bOrder === undefined ? fallback : bOrder);
		});
		return locations;
	}
	function renderEncounters(container, area) {
		var heading = el("div", "km-encounter-area-header");
		heading.appendChild(el("h2", "", area.name));
		encounterTracker.renderArea(heading, area);
		container.appendChild(heading);
		var grid = el("div", "km-encounter-groups");
		container.appendChild(grid);
		area.groups.forEach(function (group) {
			var card = el("section", "km-reference-card");
			card.setAttribute("data-encounter-section", group.method === "Land" || group.weather ? "land" : "other");
			card.setAttribute("data-encounter-method", group.method);
			var trade = group.method === "Trade";
			var level = !trade && group.totalEntries[0].level;
			var sharedLevel = level && group.totalEntries.every(function (entry) { return entry.level === level; });
			var cardHeading = el("div", "km-encounter-card-heading");
			cardHeading.appendChild(el("h3", "", group.method === "Land" ? "Land (no weather)" : group.method));
			if (sharedLevel) cardHeading.appendChild(el("span", "km-encounter-level", "Lv. " + String(level).replace(/(\d)\s*-\s*(?=\d)/g, "$1 to ")));
			card.appendChild(cardHeading);
			var table = el("table", "km-data-table");
			var head = el("thead");
			var header = el("tr");
			var columns = ["Caught", "Pokémon"].concat(sharedLevel ? [] : ["Level"], [trade ? "Required Pokémon" : "Base", "Available"]);
			columns.forEach(function (text) { var th = el("th", text === "Base" ? "km-rate" : "", text); th.scope = "col"; header.appendChild(th); });
			head.appendChild(header); table.appendChild(head);
			var body = el("tbody");
			group.entries.forEach(function (entry) {
				var row = el("tr");
				encounterTracker.renderEntry(row, area, group, entry);
				row.appendChild(el("td", "km-pokemon-name", entry.pokemon));
				if (!sharedLevel) row.appendChild(el("td", "", entry.level ? String(entry.level).replace(/(\d)\s*-\s*(?=\d)/g, "$1 to ") : "Not listed"));
				var rate = trade ? el("td", "km-pokemon-name", entry.requiredPokemon || "Not listed") : el("td", "km-rate", entry.rate === null ? "N/A" : entry.rate + "%");
				row.appendChild(rate); body.appendChild(row);
				row.appendChild(el("td", "km-available-rate", encounterTracker.rate(area, group, entry)));
			});
			table.appendChild(body); card.appendChild(table); grid.appendChild(card);
		});
	}
	function trainerSplitLabel(split) {
		var name = String(split || "").trim();
		return name && !/\bsplit$/i.test(name) ? name + " Split" : name;
	}
	function trainerBattleType(trainer) {
		if (trainer.battleType === "Single" || trainer.battleType === "Double") return trainer.battleType;
		var format = /\[(Single|Double)\]/.exec(trainer.name);
		return format ? format[1] : "Not listed";
	}
	function loadTrainerProgress(profile) {
		trainerProfileId = profile && profile.id;
		trainerProgress = {version: 1, beaten: []};
		if (!sourceData || !trainerProfileId) return;
		try {
			var saved = JSON.parse(window.kmCalculatorStorage.getItem("km-calculator.trainers.v1." + trainerProfileId));
			if (saved && saved.version === 1 && Array.isArray(saved.beaten)) {
				trainerProgress.beaten = saved.beaten.filter(function (id, index, ids) {
					return ids.indexOf(id) === index && sourceData.trainers.some(function (trainer) { return trainer.id === id; });
				});
			}
		} catch (error) { /* Missing or unreadable progress leaves trainers unchecked. */ }
	}
	function markTrainerBeaten(trainer, checked) {
		var next = {version: 1, beaten: trainerProgress.beaten.filter(function (id) { return id !== trainer.id; })};
		if (checked) next.beaten.push(trainer.id);
		var serialized = JSON.stringify(next), key = "km-calculator.trainers.v1." + trainerProfileId;
		try {
			window.kmCalculatorStorage.setItem(key, serialized);
			if (window.kmCalculatorStorage.getItem(key) !== serialized) throw new Error("Storage unavailable");
		} catch (error) {
			window.alert("Trainer progress could not be saved. Please check available storage and try again.");
			return false;
		}
		trainerProgress = next;
		views.filter(function (view) { return view.kind === "trainers"; }).forEach(function (view) {
			Array.prototype.forEach.call(view.list.children, function (node) {
				node.classList.toggle("km-trainer-beaten", trainerProgress.beaten.indexOf(node.getAttribute("data-page-key")) !== -1);
			});
		});
		return true;
	}
	function trainerRewards(trainer) {
		var rewards = trainer.rewards || {};
		var money = typeof rewards.money === "number" && isFinite(rewards.money) && rewards.money >= 0 ? "₽" + rewards.money.toLocaleString("en-US") : "Not recorded";
		var validItems = Array.isArray(rewards.items) && rewards.items.every(function (item) {
			return typeof item === "string" && item.trim() || item && typeof item.name === "string" && item.name.trim() && (item.quantity === undefined || typeof item.quantity === "number" && isFinite(item.quantity) && item.quantity > 0);
		});
		var items = validItems ? rewards.items.map(function (item) {
			return typeof item === "string" ? item : item.name + (item.quantity > 1 ? " ×" + item.quantity : "");
		}).join(", ") || "None" : "Not recorded";
		return "Money: " + money + " · Items: " + items;
	}
	function renderTrainerStats(card, pokemon) {
		var text = pokemon.stats || "", values = {}, match;
		var pattern = /\b(HP|Sp\.?\s*Atk|Sp\.?\s*Def|Atk|Def|Speed)\s*:\s*(\d+|\*)/gi;
		while ((match = pattern.exec(text))) values[match[1].toLowerCase().replace(/[.\s]/g, "")] = match[2];
		var stats = [["HP", "hp"], ["Atk", "atk"], ["Def", "def"], ["SpA", "spatk"], ["SpD", "spdef"], ["Spe", "speed"]];
		if (!stats.every(function (stat) { return Object.prototype.hasOwnProperty.call(values, stat[1]); })) {
			card.appendChild(el("pre", "km-trainer-stats-fallback", text || "Stats not recorded")); return;
		}
		var table = el("table", "km-trainer-stats"); table.setAttribute("aria-label", "Recorded stats for " + pokemon.pokemon);
		var head = el("thead"), labels = el("tr"), body = el("tbody"), numbers = el("tr");
		stats.forEach(function (stat) {
			var label = el("th", "", stat[0]); label.scope = "col"; labels.appendChild(label); numbers.appendChild(el("td", "", values[stat[1]]));
		});
		head.appendChild(labels); body.appendChild(numbers); table.appendChild(head); table.appendChild(body); card.appendChild(table);
	}
	function renderTrainerModels(container, trainer) {
		var catalog = sourceData.trainerModels || {};
		var models = Array.isArray(trainer.models) ? trainer.models.slice(0, 2).filter(function (id) {
			return typeof id === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id) && Object.prototype.hasOwnProperty.call(catalog, id) && typeof catalog[id] === "string";
		}) : [];
		if (!models.length) return;
		var portraits = el("div", "km-trainer-models");
		models.forEach(function (id) {
			var image = el("img", "km-trainer-model");
			image.src = "./img/trainers/" + id + ".png";
			image.alt = catalog[id];
			image.width = 384; image.height = 512;
			image.decoding = "async"; image.draggable = false;
			image.addEventListener("error", function () {
				var fallback = el("span", "km-trainer-model-fallback km-muted", catalog[id] + " image unavailable");
				if (image.parentNode) image.parentNode.replaceChild(fallback, image);
			});
			portraits.appendChild(image);
		});
		container.appendChild(portraits);
	}
	function trainerPokemonTypes(pokemon) {
		var generation = typeof window.getActiveCalcGeneration === "function" && window.getActiveCalcGeneration();
		if (!generation || !generation.species) return [];
		var names = [pokemon.sprite, pokemon.pokemon];
		var equivalents = {aegislash: "aegislashshield", dialgaorigin: "dialga", palkiaorigin: "palkia"};
		for (var index = 0; index < names.length; index++) {
			var id = String(names[index] || "").toLowerCase().replace(/[^a-z0-9]/g, "");
			if (!id) continue;
			var species = generation.species.get(id) || generation.species.get(id.replace(/gmax$/, ""));
			if (!species && Object.prototype.hasOwnProperty.call(equivalents, id)) species = generation.species.get(equivalents[id]);
			if (species && Array.isArray(species.types)) return species.types.slice(0, 2);
		}
		return [];
	}
	function renderTrainer(container, trainer) {
		if (window.KMTrainerTooltips) window.KMTrainerTooltips.hide();
		function tooltip(target, kind, name, pokemon) {
			if (!window.KMTrainerTooltips) return;
			var label = el("span", "", target.textContent);
			target.textContent = ""; target.appendChild(label);
			window.KMTrainerTooltips.bind(label, sourceData.tooltipData, kind, name, pokemon);
		}
		var summary = el("div", "km-trainer-summary"), info = el("div", "km-trainer-summary-info");
		renderTrainerModels(summary, trainer);
		summary.appendChild(info);
		var heading = el("div", "km-trainer-heading");
		var format = trainerBattleType(trainer);
		var notes = (trainer.name.match(/\[[^\]]+\]/g) || []).filter(function (note) { return !/^\[(Single|Double)\]$/.test(note); });
		heading.appendChild(el("h2", "", trainer.name.replace(/\s*\[[\s\S]*$/, "")));
		heading.appendChild(el("span", "km-tag", format === "Not listed" ? "Format not recorded" : format));
		var beaten = el("label", "km-trainer-beaten-control"), check = el("input"); check.type = "checkbox";
		check.checked = trainerProgress.beaten.indexOf(trainer.id) !== -1;
		check.addEventListener("change", function () {
			if (!markTrainerBeaten(trainer, check.checked)) check.checked = !check.checked;
		});
		beaten.appendChild(check); beaten.appendChild(document.createTextNode(" Beaten")); heading.appendChild(beaten); info.appendChild(heading);
		info.appendChild(el("p", "km-muted", [trainerSplitLabel(trainer.split), trainer.location, trainer.levelCap ? "Level cap " + trainer.levelCap : ""].filter(Boolean).join(" · ")));
		if (notes.length) info.appendChild(el("p", "km-trainer-notes km-muted", notes.map(function (note) { return note.slice(1, -1); }).join(" · ")));
		info.appendChild(el("p", "km-trainer-rewards km-muted", trainerRewards(trainer)));
		var addToCalculator = button("Add to Calculator", function () {
			if (typeof window.selectCalculatorTrainer !== "function" || !window.selectCalculatorTrainer(sourceData.profileId, trainer.calculatorTrainerId)) {
				window.alert("This trainer is not available in the calculator for the current profile.");
				return;
			}
			activateTab(0, true);
		}, "km-action km-trainer-add");
		addToCalculator.disabled = !trainer.calculatorTrainerId;
		summary.appendChild(addToCalculator);
		container.appendChild(summary);
		var grid = el("div", "km-trainer-roster");
		trainer.team.forEach(function (pokemon) {
			var card = el("article", "km-reference-card km-trainer-card");
			var top = el("div", "km-card-heading"); top.appendChild(el("h3", "", pokemon.pokemon));
			top.appendChild(el("span", "km-eyebrow", "LEVEL " + pokemon.level)); card.appendChild(top);
			var identity = el("div", "km-trainer-pokemon");
			var portrait = el("div", "km-trainer-portrait");
			if (typeof window.createPokemonSprite === "function") {
				var sprite = window.createPokemonSprite(pokemon.pokemon, "km-trainer-sprite", {spriteId: pokemon.sprite});
				if (sprite && sprite[0]) portrait.appendChild(sprite[0]);
			}
			identity.appendChild(portrait);
			var dl = el("dl", "km-pokemon-facts");
			[["Ability", pokemon.ability], ["Item", pokemon.item || "None"], ["Nature", pokemon.nature], ["Gender", pokemon.gender]].forEach(function (pair) {
				var value = el("dd", "", pair[1] || "Not listed");
				if (pair[0] === "Ability") tooltip(value, "abilities", pair[1], pokemon);
				if (pair[0] === "Item") tooltip(value, "items", pair[1]);
				dl.appendChild(el("dt", "", pair[0])); dl.appendChild(value);
			});
			identity.appendChild(dl);
			var types = trainerPokemonTypes(pokemon);
			if (types.length) {
				var badges = el("div", "km-trainer-types");
				badges.setAttribute("role", "group"); badges.setAttribute("aria-label", "Pokémon types");
				types.forEach(function (type) {
					var badge = el("span", "km-type-badge", type);
					badge.setAttribute("data-type", type); badges.appendChild(badge);
				});
				identity.appendChild(badges);
			}
			card.appendChild(identity);
			var moves = el("ul", "km-move-list");
			pokemon.moves.forEach(function (move) {
				var entry = el("li", "", move); tooltip(entry, "moves", move); moves.appendChild(entry);
			});
			card.appendChild(moves);
			renderTrainerStats(card, pokemon);
			grid.appendChild(card);
		});
		container.appendChild(grid);
	}
	function loadItemProgress(profile) {
		itemProfileId = profile && profile.id;
		itemProgress = {version: 1, pickedUp: []};
		if (!sourceData || !itemProfileId) return;
		try {
			var saved = JSON.parse(window.kmCalculatorStorage.getItem("km-calculator.route-items.v1." + itemProfileId));
			if (saved && saved.version === 1 && Array.isArray(saved.pickedUp)) {
				itemProgress.pickedUp = saved.pickedUp.filter(function (id, index, ids) {
					return typeof id === "string" && ids.indexOf(id) === index && sourceData.routeItems.some(function (item) { return item.id === id; });
				});
			}
		} catch (error) { /* Missing or unreadable progress leaves item cards unchecked. */ }
	}
	function markItemPickedUp(item, checked) {
		var next = {version: 1, pickedUp: itemProgress.pickedUp.filter(function (id) { return id !== item.id; })};
		if (checked) next.pickedUp.push(item.id);
		var serialized = JSON.stringify(next), key = "km-calculator.route-items.v1." + itemProfileId;
		try {
			window.kmCalculatorStorage.setItem(key, serialized);
			if (window.kmCalculatorStorage.getItem(key) !== serialized) throw new Error("Storage unavailable");
		} catch (error) {
			window.alert("Item pickup progress could not be saved. Please check available storage and try again.");
			return false;
		}
		itemProgress = next;
		views.forEach(function (view) {
			if (view.kind !== "items") return;
			Array.prototype.forEach.call(view.list.children, function (node) { decorateItemLocation(node, node.getAttribute("data-page-key")); });
			var heading = view.detail.querySelector(".km-item-location-heading");
			if (heading) decorateItemLocation(heading, view.selected);
		});
		return true;
	}
	function decorateItemLocation(node, name) {
		var items = sourceData.routeItems.filter(function (item) { return itemLocationName(item) === name; });
		var complete = items.length > 0 && items.every(function (item) { return itemProgress.pickedUp.indexOf(item.id) !== -1; });
		node.classList.toggle("km-item-location-complete", complete);
		if (complete) node.setAttribute("aria-label", name + ", all items picked up");
		else node.removeAttribute("aria-label");
	}
	function renderItems(container, area) {
		var locationHeading = el("h2", "km-item-location-heading", area.name);
		decorateItemLocation(locationHeading, area.name);
		container.appendChild(locationHeading);
		var notes = (sourceData.itemNotes || []).filter(function (n) { return n.location === area.name; });
		if (notes.length) {
			var content = el("div");
			notes.forEach(function (n) { content.appendChild(el("p", "km-muted", n.note)); });
			referenceDetails("Location notes and corrections", content, container);
		}
		var grid = el("div", "km-item-grid"); container.appendChild(grid);
		area.items.forEach(function (item) {
			var card = el("article", "km-reference-card km-item-card");
			var top = el("div", "km-card-heading");
			var heading = el("h3");
			var label = el("label", "km-item-picked-control");
			var check = el("input"); check.type = "checkbox";
			check.setAttribute("aria-label", "Picked up: " + item.items);
			check.checked = itemProgress.pickedUp.indexOf(item.id) !== -1;
			card.classList.toggle("km-item-picked-up", check.checked);
			check.addEventListener("change", function () {
				if (!markItemPickedUp(item, check.checked)) check.checked = !check.checked;
				card.classList.toggle("km-item-picked-up", check.checked);
			});
			label.appendChild(check);
			label.appendChild(el("span", "km-item-name", item.items));
			heading.appendChild(label);
			top.appendChild(heading);
			top.appendChild(el("span", "km-tag", item.acquisition));
			card.appendChild(top);
			if (item.postGame === true) card.appendChild(el("p", "km-item-origin km-muted", "Location: " + item.location));
			card.appendChild(el("p", "km-item-directions", item.directions));
			if (item.edition && item.edition !== "Both") card.appendChild(el("p", "km-edition", "Edition: " + item.edition));
			var evidence = el("div", "km-item-evidence");
			evidence.appendChild(el("p", "", "Placement match: " + item.match + ". " + (item.reason || "")));
			if (item.map) evidence.appendChild(el("p", "km-muted", "Map: " + item.map));
			evidence.appendChild(el("p", "km-muted", "Guide entry " + item.id + ". Source: " + item.source + ". A data match does not confirm placement in the game."));
			var location = (sourceData.itemLocations || []).filter(function (l) { return l.name === item.location; })[0];
			if (location) [["GameWith guide", location.gameWith], ["Bulbapedia guide", location.bulbapedia]].forEach(function (pair) {
				if (!/^https:\/\/(gamewith\.net|bulbapedia\.bulbagarden\.net)\//.test(pair[1] || "")) return;
				var link = el("a", "km-source-link", pair[0]); link.href = pair[1]; link.target = "_blank"; link.rel = "noopener noreferrer"; evidence.appendChild(link);
			});
			referenceDetails("Source and placement details", evidence, card);
			grid.appendChild(card);
		});
	}
	function render(view) {
		var results = getResults(view);
		var restoreFocus = view.list.contains(document.activeElement);
		var previousSelection = view.renderedSelection;
		view.list.textContent = "";
		view.detail.textContent = "";
		var selected = results.filter(function (entry) { return entry.id === view.selected; })[0] || results[0];
		view.selected = selected ? selected.id : null;
		var resultKey = results.map(function (entry) { return entry.id; }).join("|");
		if (view.resultKey !== resultKey) { view.listPage.anchor = view.selected; view.listPage.page = 0; view.resultKey = resultKey; }
		var filterKey = [view.search.value, view.primary.value, view.secondary && view.secondary.value].join("|");
		if (previousSelection !== view.selected || view.filterKey !== filterKey) { view.detailPage.anchor = null; view.detailPage.page = 0; }
		view.renderedSelection = view.selected; view.filterKey = filterKey;
		view.resizeDetail = null;
		view.status.textContent = results.length + (view.kind === "trainers" ? " trainer" : " location") + (results.length === 1 ? "" : "s") + " found";
		if (!results.length) {
			view.resizeList();
			empty(view.detail, sourceData ? "No matches" : "No reference data for this profile", sourceData ? "Try another search or reset the filters." : "Reference tables are specific to each ROM hack. Switch profiles to browse its available data.");
			return;
		}
		results.forEach(function (entry) {
			var b = button("", function () { view.selected = entry.id; render(view); }, "km-location-button");
			b.setAttribute("data-page-key", entry.id);
			b.appendChild(el("span", "", entry.name));
			b.appendChild(el("small", "", view.kind === "trainers" ? trainerSplitLabel(entry.split) + " · " + entry.team.length + " Pokémon" : entry.count + (view.kind === "items" ? " item" : " encounter slot") + (entry.count === 1 ? "" : "s")));
			if (view.kind === "encounters") encounterTracker.decorateLocation(b, entry);
			if (view.kind === "trainers") b.classList.toggle("km-trainer-beaten", trainerProgress.beaten.indexOf(entry.id) !== -1);
			if (view.kind === "items") decorateItemLocation(b, entry.name);
			b.setAttribute("aria-current", String(entry.id === view.selected));
			view.list.appendChild(b);
		});
		if (view.kind === "encounters") renderEncounters(view.detail, selected);
		else if (view.kind === "trainers") renderTrainer(view.detail, selected);
		else renderItems(view.detail, selected);
		var grid = view.detail.querySelector(".km-encounter-groups, .km-trainer-roster, .km-item-grid");
		Array.prototype.forEach.call(grid.children, function (node, index) { node.setAttribute("data-page-key", String(index)); });
		view.resizeDetail = referencePager(view.detail, grid, "Reference details", view.detailPage);
		resizeReferences();
		if (restoreFocus) {
			var current = view.list.querySelector('[aria-current="true"]');
			if (current && !current.hidden) current.focus({preventScroll: true});
		}
	}
	function refreshProfile() {
		if (resetRunDialog) resetRunDialog.close();
		var profile = registry.getActiveProfile();
		var data = window.KMCalculatorReferenceData;
		sourceData = profile && data && Object.prototype.hasOwnProperty.call(data, profile.id) ? data[profile.id] : null;
		loadTrainerProgress(profile);
		loadItemProgress(profile);
		if (encounterTracker) encounterTracker.setProfile(profile, sourceData);
		profileLabel.textContent = profile ? profile.shortName + " / Generation " + profile.baseGeneration : "Choose a ROM hack";
		views.forEach(function (view) {
			view.resetButton.disabled = !profile || !sourceData;
			view.selected = null; view.search.value = ""; view.listPage.anchor = null; view.listPage.page = 0; view.detailPage.anchor = null; view.detailPage.page = 0;
			var options = [];
			if (sourceData) {
				if (view.kind === "encounters") sourceData.areas.forEach(function (a) { a.groups.forEach(function (g) { if (options.indexOf(g.method) === -1) options.push(g.method); }); });
				else (view.kind === "items" ? sourceData.routeItems : sourceData.trainers).forEach(function (entry) {
					var value = view.kind === "items" ? entry.acquisition : entry.split;
					if (options.indexOf(value) === -1) options.push(value);
				});
			}
			view.primary.textContent = "";
			var all = el("option", "", "All"); all.value = ""; view.primary.appendChild(all);
			options.forEach(function (value) { var option = el("option", "", view.kind === "trainers" ? trainerSplitLabel(value) : value); option.value = value; view.primary.appendChild(option); });
			if (view.secondary) view.secondary.value = "";
			if (view.kind !== "encounters") view.note.textContent = !sourceData ? "" : view.kind === "items" ? "Reference for the base Sword/Shield 1.3.2 games; item placements in this ROM hack are unverified. Includes both editions. Some landmarks and item pools remain uncertain; expand an entry for its source and match details." : "Trainers are organized by story split. Check Beaten to record your progress.";
			render(view);
		});
	}
	function start() {
		registry = window.kmRomHackRegistry;
		if (!registry || document.getElementById("km-app-tabs")) return;
		document.body.classList.add("km-app");
		var wrapper = document.querySelector(".wrapper");
		var nav = el("nav", "km-app-tabs"); nav.id = "km-app-tabs"; nav.setAttribute("role", "tablist"); nav.setAttribute("aria-label", "App sections");
		wrapper.parentNode.insertBefore(nav, wrapper);
		wrapper.parentNode.insertBefore(document.getElementById("km-settings-page"), wrapper);
		profileLabel = el("span", "km-active-profile");
		document.querySelector(".km-calculator-header").appendChild(profileLabel);
		var changeProfile = document.querySelector(".km-rom-hack-change");
		if (changeProfile) document.querySelector("header").appendChild(changeProfile);
		setupCalculator(wrapper);
		panels.push(wrapper);
		panels.push(buildReference("Encounters", "encounters", "Find Pokémon by location, encounter method, and weather."));
		panels.push(buildReference("Trainers", "trainers", "Plan ahead with trainer teams, moves, and level caps."));
		panels.push(buildReference("Route Items", "items", "Find pickups, gifts, shops, and berry trees by location."));
		tabs.forEach(function (label, i) {
			var b = button(label, function () { activateTab(i, false); }, "km-app-tab");
			b.id = "km-tab-" + i; b.setAttribute("role", "tab"); b.setAttribute("aria-controls", "km-panel-" + i);
			b.addEventListener("keydown", function (event) {
				var index = i;
				if (event.key === "ArrowRight") index = (i + 1) % tabs.length;
				else if (event.key === "ArrowLeft") index = (i + tabs.length - 1) % tabs.length;
				else if (event.key === "Home") index = 0;
				else if (event.key === "End") index = tabs.length - 1;
				else return;
				event.preventDefault(); activateTab(index, true);
			});
			buttons.push(b); nav.appendChild(b);
			panels[i].id = "km-panel-" + i; panels[i].setAttribute("role", "tabpanel"); panels[i].setAttribute("aria-labelledby", b.id);
			if (i) wrapper.parentNode.insertBefore(panels[i], wrapper.nextSibling);
		});
		var credits = document.querySelector(".credits");
		if (credits) {
			var theme = credits.querySelector("#dark-theme-toggle");
			if (theme) document.querySelector("header").appendChild(theme);
			var about = disclosure("About", credits, false);
			about.classList.add("km-about", "km-toolbar-disclosure");
			document.querySelector("header").appendChild(about);
			document.addEventListener("click", function (event) {
				if (about.open && !about.contains(event.target)) about.open = false;
			}, true);
		}
		document.querySelector("header").appendChild(document.getElementById("km-report-problem"));
		document.getElementById("km-settings-button").addEventListener("click", function () {
			if (activeTab !== -1) previousTab = activeTab;
			document.getElementById("km-settings-back").textContent = "Back to " + tabs[previousTab];
			activateTab(-1, false);
			window.dispatchEvent(new window.CustomEvent("kmcalculator:settingsopen"));
		});
		document.getElementById("km-settings-back").addEventListener("click", function () { activateTab(previousTab, true); });
		window.addEventListener("kmcalculator:romhackchange", refreshProfile);
		window.addEventListener("kmcalculator:runrestored", refreshProfile);
		window.addEventListener("resize", resizeReferences);
		refreshProfile(); activateTab(0, false);
		document.documentElement.removeAttribute("data-km-starting");
		var startupStatus = document.getElementById("km-startup-status");
		if (startupStatus) startupStatus.remove();
	}
	if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
	else start();
})();
