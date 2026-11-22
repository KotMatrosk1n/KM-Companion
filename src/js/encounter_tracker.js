/*global window, document */
(function () {
	"use strict";
	function el(tag, className, text) {
		var node = document.createElement(tag);
		if (className) node.className = className;
		if (text !== undefined) node.textContent = text;
		return node;
	}
	function button(text, action) {
		var node = el("button", "", text);
		node.type = "button";
		node.addEventListener("click", action);
		return node;
	}
	// Rules belong to the profile. Shared areas spend one allowance together;
	// separate allowances (such as a trade and a water encounter) never substitute for each other.
	function createRules(reference, family, mode) {
		mode = mode || "royalocke";
		family = family || function (name) { return name; };
		var byArea = Object.create(null);
		(mode === "royalocke" ? reference.encounterRules || [] : []).forEach(function (rule) {
			rule.areas.forEach(function (id) { byArea[id] = rule; });
		});
		reference.areas.forEach(function (area) {
			if (!byArea[area.id]) byArea[area.id] = {areas: [area.id], allowances: [{id: "encounter", label: "Encounter", limit: mode === "normal" ? null : 1}]};
		});
		function allowance(record) {
			var rule = byArea[record.area];
			if (!rule) return null;
			if (record.allowance) {
				var saved = rule.allowances.filter(function (item) { return item.id === record.allowance; })[0];
				if (saved) return saved;
			}
			if (rule.allowances.length === 1) return rule.allowances[0];
			var special = rule.allowances.filter(function (item) {
				return item.pokemon && item.pokemon.some(function (name) { return family(name) === family(record.pokemon); });
			})[0];
			if (special) return special;
			if (record.source === "Trade") return rule.allowances.filter(function (item) { return item.id === "trade"; })[0] || null;
			return rule.allowances.filter(function (item) {
				if (!item.methods || record.source === "Trade") return false;
				if (item.methods.indexOf(record.method || record.source) !== -1 || record.source === "Wild") return true;
				var area = reference.areas.filter(function (entry) { return entry.id === record.area; })[0];
				return area.groups.some(function (group) {
					return item.methods.indexOf(group.method) !== -1 && group.entries.some(function (entry) { return family(entry.pokemon) === family(record.pokemon); });
				});
			})[0] || null;
		}
		function describe(area, state) {
			var rule = byArea[area.id];
			var records = state.catches.filter(function (record) { return rule.areas.indexOf(record.area) !== -1; });
			var manual = mode !== "normal" && rule.areas.some(function (id) { return state.usedAreas.indexOf(id) !== -1; });
			var allowances = rule.allowances.map(function (item) {
				var count = records.filter(function (record) { var match = allowance(record); return match && match.id === item.id; }).length;
				return {id: item.id, label: item.label, limit: item.limit, count: count, remaining: item.limit === null ? Infinity : Math.max(0, item.limit - count)};
			});
			return {areas: rule.areas, allowances: allowances, manual: manual,
				closed: manual || allowances.every(function (item) { return item.remaining === 0; }),
				unmatched: records.filter(function (record) { return !allowance(record); }).length};
		}
		function reason(record, state) {
			if (mode === "normal") return "";
			if (mode === "nuzlocke" && !record.area) return "Choose a location. Nuzlocke allows one encounter per location.";
			if (!record.area) return "";
			var status = describe({id: record.area}, state);
			if (status.manual) return status.areas.length > 1 ? "These paired areas are manually closed." : "This location is manually closed.";
			var match = allowance(record);
			if (!match) return "Choose " + status.allowances.map(function (item) { return item.label.toLowerCase(); }).join(" or ") + " for this location, or use Unassigned for a record for the evolution family.";
			var progress = status.allowances.filter(function (item) { return item.id === match.id; })[0];
			return progress.remaining ? "" : match.label + " limit reached (" + progress.count + "/" + progress.limit + ").";
		}
		return {allowance: allowance, describe: describe, reason: reason};
	}
	function create(options) {
		var profileId, data, state, families, species, rules;
		var mode = "royalocke";
		var modes = [{id: "normal", name: "Normal"}, {id: "royalocke", name: "Royalocke"}, {id: "nuzlocke", name: "Nuzlocke"}];
		var storage = window.kmCalculatorStorage;
		var prefix = "km-calculator.encounters.v2.";
		var modeTabs = el("nav", "km-encounter-modes"); modeTabs.setAttribute("role", "tablist"); modeTabs.setAttribute("aria-label", "Encounter rules");
		var modePanel = el("div", "km-encounter-mode-panel"); modePanel.id = "km-encounter-mode-panel"; modePanel.setAttribute("role", "tabpanel");
		Array.prototype.slice.call(options.panel.children).forEach(function (child) { if (child !== options.heading) modePanel.appendChild(child); });
		options.heading.appendChild(modeTabs); options.panel.appendChild(modePanel);
		var modeButtons = modes.map(function (item, index) {
			var tab = button(item.name, function () { changeMode(item.id); });
			tab.id = "km-encounter-mode-" + item.id; tab.setAttribute("role", "tab"); tab.setAttribute("aria-controls", modePanel.id);
			tab.addEventListener("keydown", function (event) {
				var target = event.key === "ArrowRight" ? (index + 1) % modes.length : event.key === "ArrowLeft" ? (index + modes.length - 1) % modes.length : event.key === "Home" ? 0 : event.key === "End" ? modes.length - 1 : -1;
				if (target === -1) return;
				event.preventDefault(); if (changeMode(modes[target].id)) modeButtons[target].focus();
			});
			modeTabs.appendChild(tab); return tab;
		});
		var summary = el("div", "km-catch-summary");
		var count = el("span", "km-muted");
		var logButton = button("Catch log", openLog);
		summary.appendChild(count); summary.appendChild(logButton);
		options.heading.appendChild(summary);
		var dialog = el("dialog", "km-catch-dialog");
		dialog.setAttribute("aria-labelledby", "km-catch-title");
		var dialogHeading = el("div", "km-card-heading");
		var title = el("h2", "", "Catch log"); title.id = "km-catch-title";
		dialogHeading.appendChild(title);
		dialogHeading.appendChild(button("Close", function () { dialog.close(); }));
		dialog.appendChild(dialogHeading);
		var logDescription = el("p", "km-muted"); dialog.appendChild(logDescription);
		var form = el("form", "km-catch-form");
		function field(label, control) {
			var group = el("label", "km-filter"); group.appendChild(el("span", "", label)); group.appendChild(control); form.appendChild(group); return control;
		}
		var pokemonInput = field("Pokémon", el("input"));
		pokemonInput.setAttribute("list", "km-catch-species"); pokemonInput.required = true; pokemonInput.placeholder = "Search species or evolution"; pokemonInput.autocomplete = "off";
		var speciesList = el("datalist"); speciesList.id = "km-catch-species"; form.appendChild(speciesList);
		var sourceInput = field("Obtained by", el("select"));
		["Gift", "Trade", "Starter", "Wild", "Static", "Other"].forEach(function (name) { sourceInput.appendChild(el("option", "", name)); });
		var areaInput = field("Location", el("select"));
		var submit = el("button", "", "Record catch"); submit.type = "submit"; form.appendChild(submit);
		var feedback = el("p", "km-catch-feedback"); feedback.setAttribute("role", "status");
		form.appendChild(feedback); dialog.appendChild(form);
		var log = el("div", "km-catch-log"); dialog.appendChild(log);
		var logPage = 0, pageSize = 8;
		var pagination = el("nav", "km-pagination"); pagination.setAttribute("aria-label", "Catch log pages");
		var pageStatus = el("span", "km-pagination-summary"); pageStatus.setAttribute("aria-live", "polite");
		var previous = button("Previous", function () { logPage--; renderLog(); });
		var nextPage = button("Next", function () { logPage++; renderLog(); });
		pagination.appendChild(pageStatus); pagination.appendChild(previous); pagination.appendChild(nextPage);
		dialog.appendChild(pagination);
		dialog.appendChild(button("Clear this mode…", function () {
			if (window.confirm("Clear all " + modeName() + " catches and used locations for this profile? Other modes will be kept. This cannot be undone.")) {
				commit({version: 2, catches: [], usedAreas: []});
			}
		}));
		options.panel.appendChild(dialog);
		pokemonInput.addEventListener("input", function () { pokemonInput.setCustomValidity(""); });
		form.addEventListener("submit", function (event) {
			event.preventDefault();
			var name = species.filter(function (s) { return s.toLowerCase() === pokemonInput.value.trim().toLowerCase(); })[0];
			if (!name) { pokemonInput.setCustomValidity("Choose a Pokémon from this profile's species list."); pokemonInput.reportValidity(); return; }
			if (mode !== "normal" && state.catches.some(function (c) { return c.pokemon === name && c.area === areaInput.value; })) {
				feedback.textContent = "That Pokémon is already recorded at this location."; return;
			}
			var next = copyState();
			var record = {pokemon: name, area: areaInput.value, source: sourceInput.value};
			var blocked = catchBlocked(record);
			if (blocked) { feedback.textContent = blocked; return; }
			var allowance = rules.allowance(record); if (allowance) record.allowance = allowance.id;
			next.catches.push(record);
			logPage = Math.floor((next.catches.length - 1) / pageSize);
			if (commit(next)) { pokemonInput.value = ""; feedback.textContent = name + " recorded."; pokemonInput.focus(); }
		});
		function family(name) { return families[name] || name; }
		function sameSpecies(first, second) {
			var aliases = data.encounterAliases || {};
			var firstName = Object.prototype.hasOwnProperty.call(aliases, first) ? aliases[first] : first;
			var secondName = Object.prototype.hasOwnProperty.call(aliases, second) ? aliases[second] : second;
			return firstName === secondName;
		}
		function familyCatch(name) { return mode === "normal" ? null : state.catches.filter(function (c) { return family(c.pokemon) === family(name); })[0]; }
		function catchBlocked(record) {
			var duplicate = familyCatch(record.pokemon);
			return duplicate ? "Duplicate family: " + duplicate.pokemon + " · " + areaName(duplicate.area) : rules.reason(record, state);
		}
		function caught(area, name) { return state.catches.some(function (c) { return c.area === area.id && sameSpecies(c.pokemon, name); }); }
		function used(area) { return rules.describe(area, state).closed; }
		function progressText(status) {
			return status.allowances.map(function (item) { return item.limit === null ? item.count + " recorded · Unlimited" : item.label + " " + item.count + "/" + item.limit; }).join(" · ");
		}
		function entryRecord(area, group, entry) {
			return {pokemon: entry.pokemon, area: area.id, method: group.method,
				source: area.name === "Starter" ? "Starter" : group.method === "Other" ? "Gift / trade / static" : group.method};
		}
		function copyState() { return JSON.parse(JSON.stringify(state)); }
		function areaName(id) {
			var area = data.areas.filter(function (a) { return a.id === id; })[0];
			return area ? area.name : "Unassigned";
		}
		function refreshSummary() {
			var usedFamilies = {};
			state.catches.forEach(function (c) { usedFamilies[family(c.pokemon)] = true; });
			var familyCount = Object.keys(usedFamilies).length;
			count.textContent = mode === "normal" ? state.catches.length + " catches recorded" : state.catches.length + " caught · " + familyCount + (familyCount === 1 ? " family excluded" : " families excluded");
		}
		function modeName() { return modes.filter(function (item) { return item.id === mode; })[0].name; }
		function storageKey() { return prefix + profileId + "." + mode; }
		function loadMode() {
			state = {version: 2, catches: [], usedAreas: []}; logPage = 0;
			rules = createRules(data, family, mode);
			try {
				var raw = storage.getItem(storageKey());
				// Existing encounter progress belongs to Royalocke. Never copy it into another mode.
				if (raw === null && mode === "royalocke") raw = storage.getItem("km-calculator.encounters.v1." + profileId);
				var saved = JSON.parse(raw);
				if (saved && (saved.version === 1 || saved.version === 2) && Array.isArray(saved.catches) && Array.isArray(saved.usedAreas)) {
					state.catches = saved.catches.filter(function (c) {
						return c && typeof c.pokemon === "string" && c.pokemon.trim() && typeof c.source === "string" &&
							(c.area === "" || data.areas.some(function (a) { return a.id === c.area; }));
					});
					state.usedAreas = saved.usedAreas.filter(function (id) { return data.areas.some(function (a) { return a.id === id; }); });
				}
			} catch (error) { /* A missing or unreadable save starts with an empty view. */ }
			modeButtons.forEach(function (tab, index) { var active = modes[index].id === mode; tab.setAttribute("aria-selected", String(active)); tab.tabIndex = active ? 0 : -1; });
			modePanel.setAttribute("aria-labelledby", "km-encounter-mode-" + mode);
			var description = mode === "normal" ? "Unlimited catches at every location. Records do not exclude species or evolution families. Use the catch log to record additional catches of the same Pokémon." : mode === "nuzlocke" ? "One encounter per location, including gifts and trades. No shared allowances. Caught evolution families are crossed out and unavailable everywhere; missed catches do not exclude a family." : "Shared Wild Area catch limits and separate city trades. Caught evolution families are crossed out and unavailable everywhere; missed catches do not exclude a family.";
			if (options.note) options.note.textContent = description;
			title.textContent = modeName() + " catch log"; logDescription.textContent = description;
			areaInput.required = mode === "nuzlocke";
			areaInput.options[0].textContent = mode === "nuzlocke" ? "Choose a location" : mode === "normal" ? "Unassigned" : "Unassigned (family only)";
			areaInput.options[0].disabled = mode === "nuzlocke";
			areaInput.value = ""; pokemonInput.value = ""; pokemonInput.setCustomValidity(""); feedback.textContent = "";
			refreshSummary();
		}
		function changeMode(nextMode) {
			if (!data || nextMode === mode) return true;
			var key = "km-calculator.encounter-mode." + profileId;
			try {
				storage.setItem(key, nextMode);
				if (storage.getItem(key) !== nextMode) throw new Error("Storage unavailable");
			} catch (error) { window.alert("The encounter mode could not be saved. Please try again."); return false; }
			if (dialog.open) dialog.close();
			mode = nextMode; loadMode(); options.onChange(); return true;
		}
		function commit(next) {
			var serialized = JSON.stringify(next);
			try {
				storage.setItem(storageKey(), serialized);
				if (storage.getItem(storageKey()) !== serialized) throw new Error("Storage unavailable");
			} catch (error) {
				window.alert("Your catch could not be saved. Please check available storage and try again.");
				options.onChange(); return false;
			}
			state = next; refreshSummary(); options.onChange();
			if (dialog.open) renderLog();
			return true;
		}
		function renderLog() {
			log.textContent = "";
			var pages = Math.max(1, Math.ceil(state.catches.length / pageSize));
			logPage = Math.max(0, Math.min(logPage, pages - 1));
			pagination.hidden = state.catches.length === 0;
			previous.disabled = logPage === 0; nextPage.disabled = logPage === pages - 1;
			pageStatus.textContent = state.catches.length + " catches · Page " + (logPage + 1) + " of " + pages;
			if (!state.catches.length) log.appendChild(el("p", "km-muted", "No catches yet. Check a Pokémon in an encounter table or record one above."));
			state.catches.forEach(function (record, index) {
				var row = el("div", "km-catch-record");
				row.hidden = Math.floor(index / pageSize) !== logPage;
				var copy = el("div"); copy.appendChild(el("strong", "", record.pokemon));
				var allowance = rules.allowance(record);
				copy.appendChild(el("small", "km-muted", (allowance ? allowance.label : record.source) + " · " + areaName(record.area)));
				if (record.area && !allowance) copy.appendChild(el("small", "km-muted", "Family excluded; location allowance needs review."));
				row.appendChild(copy);
				var remove = button("Remove", function () {
					var next = copyState(); next.catches.splice(index, 1);
					if (commit(next)) {
						feedback.textContent = record.pokemon + " removed.";
						var remaining = log.querySelectorAll(".km-catch-record:not([hidden]) button");
						if (remaining.length) remaining[Math.min(index % pageSize, remaining.length - 1)].focus();
						else pokemonInput.focus();
					}
				});
				remove.setAttribute("aria-label", "Remove " + record.pokemon + " from " + areaName(record.area));
				row.appendChild(remove); log.appendChild(row);
			});
		}
		function openLog() { feedback.textContent = ""; renderLog(); dialog.showModal(); pokemonInput.focus(); }
		return {
			setProfile: function (profile, reference) {
				if (dialog.open) dialog.close();
				profileId = profile && profile.id; data = reference; families = Object.create(null); species = [];
				logPage = 0;
				state = {version: 2, catches: [], usedAreas: []};
				summary.hidden = !data;
				modeTabs.hidden = !data;
				if (!data) { if (options.note) options.note.textContent = ""; return; }
				(data.encounterFamilies || []).forEach(function (f) { f.members.forEach(function (name) { families[name] = f.id; }); });
				Object.keys(data.encounterAliases || {}).forEach(function (name) {
					var canonical = data.encounterAliases[name]; families[name] = families[canonical] || canonical;
				});
				var names = Object.keys(families);
				data.areas.forEach(function (a) { a.groups.forEach(function (g) { g.entries.forEach(function (e) { names.push(e.pokemon); }); }); });
				species = names.filter(function (name, i) { return names.indexOf(name) === i; }).sort();
				speciesList.textContent = "";
				species.forEach(function (name) { var option = el("option"); option.value = name; speciesList.appendChild(option); });
				areaInput.textContent = "";
				var unassigned = el("option", "", "Unassigned (family only)"); unassigned.value = ""; areaInput.appendChild(unassigned);
				data.areas.forEach(function (a) { var option = el("option", "", a.name); option.value = a.id; areaInput.appendChild(option); });
				mode = "royalocke";
				try { var savedMode = storage.getItem("km-calculator.encounter-mode." + profileId); if (modes.some(function (item) { return item.id === savedMode; })) mode = savedMode; } catch (error) { /* Keep Royalocke as the existing-run default. */ }
				loadMode();
			},
			renderArea: function (container, area) {
				var status = rules.describe(area, state);
				var bar = el("div", "km-area-state");
				bar.appendChild(el("span", "km-tag", progressText(status)));
				if (status.areas.length > 1) bar.appendChild(el("span", "km-area-shared", "Shared with " + status.areas.filter(function (id) { return id !== area.id; }).map(areaName).join(" + ")));
				bar.appendChild(el("span", "km-muted", status.manual ? "Manually closed" : status.closed ? "Complete" : "Available"));
				var label = el("label"); var check = el("input"); check.type = "checkbox";
				check.id = "km-area-used-" + encodeURIComponent(area.id);
				check.checked = status.manual;
				check.addEventListener("change", function () {
					var next = copyState(); next.usedAreas = next.usedAreas.filter(function (id) { return status.areas.indexOf(id) === -1; });
					if (check.checked) next.usedAreas = next.usedAreas.concat(status.areas);
					commit(next);
					var replacement = document.getElementById(check.id); if (replacement) replacement.focus({preventScroll: true});
				});
				label.appendChild(check); label.appendChild(document.createTextNode(status.areas.length > 1 ? " Close both areas early" : " Mark used / missed without a catch"));
				if (mode !== "normal") bar.appendChild(label);
				container.appendChild(bar);
				if (status.unmatched) container.appendChild(el("p", "km-reference-note", status.unmatched + " saved catch(es) do not match these allowances. Review them in the catch log."));
			},
			decorateLocation: function (node, area) {
				var status = rules.describe(area, state);
				if (status.closed) node.classList.add("km-location-used");
				node.appendChild(el("small", "km-location-status", progressText(status) + (status.manual ? " · Closed" : status.closed ? " · Complete" : status.areas.length > 1 ? " · Shared" : "")));
			},
			renderEntry: function (row, area, group, entry) {
				var isCaught = caught(area, entry.pokemon); var duplicate = familyCatch(entry.pokemon);
				var record = entryRecord(area, group, entry), blocked = catchBlocked(record);
				var reason = isCaught ? "Caught here" : duplicate ? "Duplicate family: " + duplicate.pokemon + " · " + areaName(duplicate.area) : blocked || "Available";
				row.className = isCaught ? "km-encounter-caught" : duplicate || blocked ? "km-encounter-excluded" : "";
				row.title = reason;
				var cell = el("td"); var check = el("input"); check.type = "checkbox"; check.checked = isCaught;
				check.disabled = !isCaught && !!blocked;
				check.id = "km-caught-" + encodeURIComponent([area.id, group.method, entry.slot, entry.pokemon].join("|"));
				check.setAttribute("aria-label", "Caught " + entry.pokemon + " in " + area.name + " (" + group.method + ")");
				check.addEventListener("change", function () {
					var next = copyState();
					if (check.checked) {
						if (catchBlocked(record)) { options.onChange(); return; }
						var allowance = rules.allowance(record); if (allowance) record.allowance = allowance.id;
						next.catches.push(record);
					} else if (mode === "normal") {
						for (var index = next.catches.length - 1; index >= 0; index--) {
							if (next.catches[index].area === area.id && sameSpecies(next.catches[index].pokemon, entry.pokemon)) { next.catches.splice(index, 1); break; }
						}
					} else next.catches = next.catches.filter(function (c) { return c.area !== area.id || !sameSpecies(c.pokemon, entry.pokemon); });
					commit(next);
					var replacement = document.getElementById(check.id); if (replacement) replacement.focus({preventScroll: true});
				});
				cell.appendChild(check); var status = el("span", "km-catch-state", reason); status.id = check.id + "-status";
				if (mode === "normal" && isCaught) {
					var total = state.catches.filter(function (c) { return c.area === area.id && sameSpecies(c.pokemon, entry.pokemon); }).length;
					cell.appendChild(el("span", "km-catch-total", " ×" + total));
					status.textContent = total + " recorded here. Uncheck to remove one; use the catch log to add another.";
				}
				check.setAttribute("aria-describedby", status.id); cell.appendChild(status); row.appendChild(cell);
			},
			rate: function (area, group, entry) {
				if (mode === "normal") {
					if (data.encounterRates !== "weights") return entry.rate === null ? "N/A" : entry.rate + "%";
					var weight = group.totalEntries.reduce(function (sum, e) { return sum + Number(e.rate); }, 0);
					return entry.rate === null || !weight ? "N/A" : Number((entry.rate / weight * 100).toFixed(1)) + "%";
				}
				if (entry.rate === null || used(area) || rules.reason(entryRecord(area, group, entry), state)) return "N/A";
				if (familyCatch(entry.pokemon)) return "0%";
				var total = group.totalEntries.reduce(function (sum, e) { return sum + (familyCatch(e.pokemon) ? 0 : Number(e.rate)); }, 0);
				return total ? Number((entry.rate / total * 100).toFixed(1)) + "%" : "N/A";
			}
		};
	}
	window.KMEncounterTracker = {create: create, createRules: createRules};
})();
