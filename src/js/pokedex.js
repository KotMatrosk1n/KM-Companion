/*global window, document, Promise, Set */
(function () {
	"use strict";
	var data = window.KMPokedexData;
	var manifestPromise;
	function el(tag, className, text) {
		var node = document.createElement(tag);
		if (className) node.className = className;
		if (text !== undefined && text !== null) node.textContent = text;
		return node;
	}
	function button(text, action, className) {
		var node = el("button", className || "km-action", text); node.type = "button";
		node.addEventListener("click", action); return node;
	}
	function field(parent, label, node) {
		var wrapper = el("label", "km-dex-field"); wrapper.appendChild(el("span", "", label)); wrapper.appendChild(node); parent.appendChild(wrapper); return node;
	}
	function select(options, label) {
		var node = el("select"); node.setAttribute("aria-label", label);
		options.forEach(function (pair) { var option = el("option", "", pair[1]); option.value = pair[0]; node.appendChild(option); });
		return node;
	}
	function badge(type) { var node = el("span", "km-type-badge", type); node.setAttribute("data-type", type); return node; }
	function number(value) { return "#" + String(value).padStart(4, "0"); }
	function pokemonLabel(entry) { return entry.name.replace(/^(.*)-Mega(?:-([XY]))?$/, function (match, name, suffix) { return "Mega " + name + (suffix ? " " + suffix : ""); }); }
	function sprite(name, className) {
		if (window.createPokemonSprite) return window.createPokemonSprite(name, className, {preferStatic: true})[0];
		return el("span", className);
	}
	function loadManifest() {
		if (!manifestPromise) manifestPromise = window.fetch("./data/pokedex-artwork.json").then(function (response) {
			if (!response.ok) throw new Error("The artwork list could not load."); return response.json();
		}).catch(function (error) { manifestPromise = null; throw error; });
		return manifestPromise;
	}
	function create(options) {
		var registry = options.registry, profile, index, results = [], visible = false, artworkImage, artworkToken = 0, artworkTimer;
		var saved = Object.create(null), state, generation;
		var panel = el("section", "km-pokedex-panel");
		var heading = el("div", "km-page-heading km-dex-heading");
		var title = el("div"); title.appendChild(el("h1", "", "Dex"));
		var subtitle = el("p", "km-muted"); title.appendChild(subtitle); heading.appendChild(title);
		var totals = el("div", "km-dex-totals"); heading.appendChild(totals); panel.appendChild(heading);
		var filters = el("div", "km-dex-filters"); panel.appendChild(filters);
		var search = field(filters, "Find a Pokémon", el("input")); search.type = "search"; search.placeholder = "Name or National Dex number"; search.autocomplete = "off";
		search.setAttribute("aria-label", "Search Pokémon by name or National Dex number"); search.parentNode.classList.add("km-dex-search");
		var type = field(filters, "Type", select([["", "All types"]].concat(["Normal", "Fire", "Water", "Electric", "Grass", "Ice", "Fighting", "Poison", "Ground", "Flying", "Psychic", "Bug", "Rock", "Ghost", "Dragon", "Dark", "Steel", "Fairy"].map(function (name) { return [name, name]; })), "Filter Pokémon by type"));
		var gen = field(filters, "Introduced in", select([["", "All generations"]].concat([1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (n) { return [n, "Generation " + n]; })), "Filter Pokémon by generation"));
		var availability = field(filters, "Availability", select([["", "All National numbers"], ["present", "In the game data"], ["locations", "Encounter listed"], ["missing", "No profile data"]], "Filter Pokémon by availability"));
		filters.appendChild(button("Reset filters", function () { search.value = type.value = gen.value = availability.value = ""; filter(); }));
		var browser = el("div", "km-dex-browser"); panel.appendChild(browser);
		var directory = el("aside", "km-dex-directory"); directory.setAttribute("aria-label", "National Dex"); browser.appendChild(directory);
		var directoryHead = el("div", "km-dex-directory-heading"); directoryHead.appendChild(el("strong", "", "National order"));
		var resultCount = el("span", "km-muted"); resultCount.setAttribute("role", "status"); directoryHead.appendChild(resultCount); directory.appendChild(directoryHead);
		var list = el("div", "km-dex-list"); list.setAttribute("aria-label", "Pokémon results"); directory.appendChild(list);
		var listPager = el("div", "km-dex-pager"); directory.appendChild(listPager);
		var detail = el("article", "km-dex-detail"); detail.setAttribute("aria-label", "Pokémon details"); browser.appendChild(detail);
		function filtersValue() { return {type: type.value, generation: gen.value, availability: availability.value}; }
		function allForms(species) { return (index.forms[species.number] || []).filter(data.hasData); }
		function defaultEntry(species) {
			var forms = allForms(species), q = data.normalize(search.value);
			var base = index.entries[species.number + ":0"];
			if (base && forms.some(function (entry) { return entry.formKind === "mega"; }) && (!q || q === data.normalize(species.name) || /^#?\d+$/.test(search.value.trim())) && (!type.value || base.types.indexOf(type.value) !== -1)) return base;
			var matching = forms.filter(function (entry) { return (!type.value || entry.types.indexOf(type.value) !== -1) && (availability.value !== "present" || entry.present); });
			if (matching.length) forms = matching;
			return q && forms.find(function (entry) { return data.searchNames(entry.name).indexOf(q) !== -1; }) || forms.find(function (entry) { return entry.present; }) || forms[0];
		}
		function selectedSpecies() { return results.find(function (species) { return species.number === state.number; }); }
		function selectedEntry() { return index.entries[state.key]; }
		function pager(container, page, count, perPage, changed, label) {
			container.textContent = "";
			var pages = Math.max(1, Math.ceil(count / perPage));
			var previous = button("Previous", function () { changed(page - 1); }); previous.disabled = page === 0; previous.setAttribute("aria-label", "Previous " + label + " page");
			var next = button("Next", function () { changed(page + 1); }); next.disabled = page + 1 >= pages; next.setAttribute("aria-label", "Next " + label + " page");
			container.appendChild(previous); container.appendChild(el("span", "km-muted", (page * perPage + (count ? 1 : 0)) + " to " + Math.min(count, (page + 1) * perPage) + " of " + count)); container.appendChild(next);
			container.hidden = count <= perPage;
		}
		function listSize() {
			var scale = Number(window.getComputedStyle(document.body).zoom) || 1;
			var top = list.getBoundingClientRect().top / scale || 240;
			var row = list.querySelector("button"), pitch = row && row.getBoundingClientRect().height / scale + 3 || 49;
			var footer = listPager.getBoundingClientRect().height / scale || 38;
			return Math.max(1, Math.min(60, Math.floor((window.innerHeight / scale - top - footer - 24) / pitch)));
		}
		var perPage = listSize();
		function renderList() {
			list.textContent = ""; resultCount.textContent = results.length + " Pokémon";
			state.page = Math.min(state.page, Math.max(0, Math.ceil(results.length / perPage) - 1));
			results.slice(state.page * perPage, (state.page + 1) * perPage).forEach(function (species) {
				var entry = defaultEntry(species);
				var b = button("", function () { choose(species, entry); }, "km-dex-entry");
				b.setAttribute("aria-current", String(species.number === state.number));
				b.appendChild(el("span", "km-dex-number", number(species.number)));
				b.appendChild(sprite(entry ? entry.name : species.name, "km-dex-sprite"));
				var name = el("span", "km-dex-entry-name", species.name); b.appendChild(name);
				name.appendChild(el("small", "km-muted", entry ? entry.types.join(" / ") : "No profile data"));
				list.appendChild(b);
			});
			if (!results.length) list.appendChild(el("p", "km-dex-empty", "No Pokémon match these filters."));
			pager(listPager, state.page, results.length, perPage, function (page) { state.page = page; renderList(); list.querySelector("button").focus(); }, "Pokémon");
		}
		function filter() {
			if (!index) return;
			state.query = search.value; state.filters = filtersValue(); state.page = 0;
			results = data.search(index, state.query, state.filters);
			var species = results.find(function (entry) { return data.normalize(entry.name) === data.normalize(state.query); }) || selectedSpecies() || results[0];
			if (species) {
				var entry = defaultEntry(species);
				state.number = species.number; state.key = entry ? entry.key : species.number + ":0";
			}
			state.movePage = 0; renderList(); renderDetail();
		}
		[search, type, gen, availability].forEach(function (node) { node.addEventListener(node === search ? "input" : "change", filter); });
		search.addEventListener("keydown", function (event) {
			if (event.key === "ArrowDown" && list.querySelector("button")) { event.preventDefault(); list.querySelector("button").focus(); }
			if (event.key === "Escape") { search.value = ""; filter(); }
		});
		list.addEventListener("keydown", function (event) {
			var nodes = Array.prototype.slice.call(list.querySelectorAll("button")), i = nodes.indexOf(document.activeElement);
			if (event.key === "ArrowDown") i = Math.min(nodes.length - 1, i + 1);
			else if (event.key === "ArrowUp") i = Math.max(0, i - 1);
			else if (event.key === "Home") i = 0;
			else if (event.key === "End") i = nodes.length - 1;
			else return;
			event.preventDefault(); if (nodes[i]) nodes[i].focus();
		});
		function choose(species, entry) {
			state.number = species.number; state.key = entry ? entry.key : species.number + ":0"; state.movePage = 0;
			renderList(); renderDetail();
		}
		function card(parent, heading, className) {
			var node = el("section", "km-dex-card " + (className || "")); node.appendChild(el("h3", "", heading)); parent.appendChild(node); return node;
		}
		function facts(parent, values) {
			var dl = el("dl", "km-dex-facts"); parent.appendChild(dl);
			values.forEach(function (pair) { var group = el("div"); group.appendChild(el("dt", "", pair[0])); group.appendChild(el("dd", "", pair[1] === undefined || pair[1] === null ? "Not recorded" : pair[1])); dl.appendChild(group); });
		}

		function stopArtwork() {
			artworkToken++; window.clearTimeout(artworkTimer);
			if (artworkImage) { artworkImage.onload = artworkImage.onerror = null; artworkImage.removeAttribute("src"); artworkImage = null; }
		}
		function renderArtwork(host, species, entry) {
			stopArtwork(); host.textContent = "";
			var enabled = !window.KMPokemonArtwork || window.KMPokemonArtwork.isEnabled();
			host.hidden = !enabled; host.parentNode.classList.toggle("km-dex-without-artwork", !enabled);
			if (!enabled) return;
			var token = artworkToken, key = entry ? entry.key : species.number + ":0";
			var status = el("p", "km-dex-artwork-status km-muted", "Loading artwork"); status.setAttribute("role", "status"); host.appendChild(status);
			function fail(message, retry) {
				if (token !== artworkToken) return;
				window.clearTimeout(artworkTimer); host.removeAttribute("aria-busy"); status.hidden = false; status.textContent = message;
				if (artworkImage) artworkImage.hidden = true;
				if (retry) status.appendChild(button(window.KMPokemonArtwork ? "Artwork settings" : "Retry artwork", function () {
					if (!window.KMPokemonArtwork) { renderArtwork(host, species, entry); return; }
					document.getElementById("km-settings-button").click();
					window.dispatchEvent(new window.CustomEvent("kmcalculator:settingsopen", {detail: {section: "artwork"}}));
				}));
			}
			loadManifest().then(function (manifest) {
				if (token !== artworkToken || !visible) return;
				var artwork = manifest.artwork[key];
				if (!artwork) { fail("Official artwork is unavailable for this exact form.", false); return; }
				artworkImage = el("img", "km-dex-artwork"); artworkImage.alt = "Official artwork of " + (entry ? pokemonLabel(entry) : species.name); artworkImage.decoding = "async";
				artworkImage.onload = function () { if (token !== artworkToken) return; window.clearTimeout(artworkTimer); host.removeAttribute("aria-busy"); status.hidden = true; };
				artworkImage.onerror = function () { fail(window.KMPokemonArtwork ? "Artwork is not saved. Download or check it in Settings → Artwork." : "Artwork could not load. Check your connection and retry.", true); };
				host.appendChild(artworkImage);
				host.setAttribute("aria-busy", "true");
				artworkTimer = window.setTimeout(function () { fail("Artwork is taking too long to load. Retry when connected.", true); }, 25000);
				artworkImage.src = window.location.protocol === "royal-sword:" ? new window.URL("./pokedex-artwork/" + key, document.baseURI).href : manifest.baseUrl + artwork.path;
			}).catch(function () { fail("Artwork could not load. Try again.", true); });
		}
		function renderStats(parent, entry) {
			var stats = card(parent, "Base stats", "km-dex-stats");
			var ranges = select([["50", "Ranges at level 50"], ["100", "Ranges at level 100"]], "Stat range level"); ranges.className = "km-dex-range-level"; ranges.value = state.statLevel || "50"; stats.appendChild(ranges);
			var rangeNodes = [];
			entry.stats.forEach(function (value, i) {
				var row = el("div", "km-dex-stat"); row.appendChild(el("span", "", data.statNames[i])); row.appendChild(el("strong", "", value));
				var track = el("span", "km-dex-stat-track"), bar = el("span"); bar.style.width = Math.min(100, value / 255 * 100) + "%"; track.appendChild(bar); row.appendChild(track); stats.appendChild(row);
				var range = el("small", "km-dex-stat-range km-muted"); row.appendChild(range); rangeNodes.push(range);
			});
			var total = el("div", "km-dex-stat-total"); total.appendChild(el("span", "", "Total")); total.appendChild(el("strong", "", entry.stats.reduce(function (a, b) { return a + b; }, 0))); stats.appendChild(total);
			function updateRanges() {
				state.statLevel = ranges.value;
				var evs = !(profile.inputs && profile.inputs.evs === "disabled");
				rangeNodes.forEach(function (node, i) { var range = data.statRange(entry, i, Number(ranges.value), evs); node.textContent = range[0] + " to " + range[1]; node.setAttribute("aria-label", data.statNames[i] + " range at level " + ranges.value + ": " + node.textContent); });
			}
			ranges.addEventListener("change", updateRanges); updateRanges();
			stats.appendChild(el("p", "km-dex-footnote km-muted", "Ranges include IVs and natures" + (profile.inputs && profile.inputs.evs === "disabled" ? ", with no EVs." : ", from 0 to 252 EVs.")));
		}
		function renderAbilities(parent, entry) {
			var abilities = card(parent, "Abilities", "km-dex-abilities");
			entry.abilities.forEach(function (name, i) {
				var row = el("div", "km-dex-ability"); row.appendChild(el("span", "km-dex-slot", ["1", "2", "Hidden"][i]));
				var copy = el("div"); copy.appendChild(el("strong", "", name || "None"));
				var descriptions = index.pack.abilities || (window.KMCalculatorTooltipData && window.KMCalculatorTooltipData.swsh && profile.id === "pokemon-royal-sword" ? window.KMCalculatorTooltipData.swsh.abilities : {});
				var description = descriptions[data.normalize(name)];
				if (description) copy.appendChild(el("p", "km-muted", typeof description === "string" ? description : description.description));
				row.appendChild(copy); abilities.appendChild(row);
			});
		}
		function overview(parent, species, entry) {
			var grid = el("div", "km-dex-info-grid"); parent.appendChild(grid);
			var body = card(grid, "Pokémon data");
			var values = [["Species", species.genus], ["Height", entry.height == null ? null : entry.height + " m"], ["Weight", entry.weight == null ? null : entry.weight + " kg"], ["Gender", data.gender(entry.gender)], ["Color", entry.color], ["Introduced", "Generation " + species.generation], ["Classification", species.mythical ? "Mythical" : species.legendary ? "Legendary" : species.baby ? "Baby Pokémon" : "Standard"]];
			Object.keys(entry.dexNumbers || {}).forEach(function (name) { if (entry.dexNumbers[name]) values.push([name, number(entry.dexNumbers[name])]); }); facts(body, values);
			var training = card(grid, "Training and breeding");
			var evs = entry.evYield.length === 6 ? entry.evYield.map(function (value, i) { return value ? value + " " + data.statNames[i] : ""; }).filter(Boolean).join(", ") || "None" : null;
			facts(training, [["Catch rate", entry.catchRate == null ? null : entry.catchRate + " / 255"], ["Base friendship", entry.friendship], ["Base experience", entry.baseExperience], ["Growth rate", entry.growth], ["EV yield", evs], ["Egg groups", entry.eggGroups.join(" / ") || null], ["Egg cycles", entry.hatchCycles], ["Wild held items", entry.heldItems ? [...new Set(entry.heldItems.filter(function (name) { return name && name !== "None"; }))].join(", ") || "None" : null]]);
			if (profile.inputs && profile.inputs.evs === "disabled") training.appendChild(el("p", "km-dex-footnote km-muted", "EV training is disabled in this profile."));
			var defense = card(grid, "Type defenses", "km-dex-defenses-card");
			defense.appendChild(el("p", "km-dex-footnote km-muted", "Damage taken from each type, before abilities, items, or battle effects."));
			var chart = el("div", "km-dex-defenses"); defense.appendChild(chart);
			data.defenses(entry, generation).forEach(function (value) { var tile = el("div", "km-dex-defense"); tile.appendChild(badge(value.type)); var n = el("strong", "", value.multiplier + "×"); n.setAttribute("data-effect", value.multiplier > 1 ? "weak" : value.multiplier < 1 ? "resist" : "neutral"); tile.appendChild(n); chart.appendChild(tile); });
			if (!chart.children.length) chart.appendChild(el("p", "km-muted", "Type chart not available for this profile."));
		}
		function evolution(parent, entry) {
			var section = card(parent, "Evolution family", "km-dex-evolution");
			var edges = data.evolutionFamily(index, entry.key);
			if (!edges.length) { section.appendChild(el("p", "km-muted", "No evolution is recorded for this form in the game data.")); return; }
			var grid = el("div", "km-dex-evolution-grid"); section.appendChild(grid);
			edges.forEach(function (edge) {
				if (!edge.to) return;
				var link = el("div", "km-dex-evolution-link");
				[edge.from, edge.to].forEach(function (pokemon, i) {
					if (i) { var condition = el("div", "km-dex-evolution-condition"); condition.appendChild(el("span", "", "→")); condition.appendChild(el("span", "", data.evolutionText(edge.rule, window.SAVE_IMPORT_TEXT))); link.appendChild(condition); }
					var b = button("", function () {
						var species = index.catalog.species.find(function (s) { return s.number === pokemon.number; });
						if (!results.some(function (s) { return s.number === pokemon.number; })) { search.value = type.value = gen.value = availability.value = ""; filter(); }
						state.page = Math.floor(results.indexOf(species) / perPage); choose(species, pokemon);
					}, "km-dex-evolution-pokemon");
					b.appendChild(sprite(pokemon.name, "km-dex-evolution-sprite")); b.appendChild(el("small", "km-muted", number(pokemon.number))); b.appendChild(el("strong", "", pokemon.name)); b.setAttribute("aria-current", String(pokemon.key === entry.key)); link.appendChild(b);
				});
				grid.appendChild(link);
			});
		}
		function moves(parent, entry) {
			var section = card(parent, "Moves", "km-dex-moves");
			var methods = [["Level", "Level up"], ["TM", "TM"], ["TR", "TR"], ["Tutor", "Tutor"], ["Egg", "Egg"]];
			if (!methods.some(function (method) { return method[0] === state.moveMethod; })) state.moveMethod = "Level";
			var tabs = el("div", "km-dex-move-tabs"); tabs.setAttribute("role", "tablist"); tabs.setAttribute("aria-label", "Move learnsets"); section.appendChild(tabs);
			var controls = el("div", "km-dex-move-filters"); section.appendChild(controls);
			var query = field(controls, "Find a move", el("input")); query.type = "search"; query.placeholder = "Move name"; query.value = state.moveQuery || "";
			var output = el("div", "km-dex-move-results"); output.id = "km-dex-move-panel"; output.setAttribute("role", "tabpanel"); output.tabIndex = 0; section.appendChild(output);
			function activateMethod(method, focus) {
				state.moveMethod = method; state.movePage = 0; renderMoves();
				if (focus) tabs.querySelector('[aria-selected="true"]').focus();
			}
			methods.forEach(function (method, i) {
				var tab = button(method[1], function () { activateMethod(method[0], false); }, "km-dex-move-tab");
				tab.id = "km-dex-move-tab-" + method[0].toLowerCase(); tab.setAttribute("role", "tab"); tab.setAttribute("aria-controls", output.id);
				tab.addEventListener("keydown", function (event) {
					var target = event.key === "ArrowRight" ? (i + 1) % methods.length : event.key === "ArrowLeft" ? (i + methods.length - 1) % methods.length : event.key === "Home" ? 0 : event.key === "End" ? methods.length - 1 : null;
					if (target === null) return; event.preventDefault(); activateMethod(methods[target][0], true);
				}); tabs.appendChild(tab);
			});
			function renderMoves() {
				state.moveQuery = query.value; output.textContent = "";
				var active = methods.find(function (method) { return method[0] === state.moveMethod; });
				Array.prototype.forEach.call(tabs.children, function (tab, i) {
					var selected = methods[i][0] === state.moveMethod; tab.setAttribute("aria-selected", String(selected)); tab.tabIndex = selected ? 0 : -1;
					if (selected) output.setAttribute("aria-labelledby", tab.id);
				});
				var rows = entry.moves.filter(function (move) { var details = index.pack.moves[move.id]; return details && move.method === state.moveMethod && data.normalize(details.name).indexOf(data.normalize(query.value)) !== -1; });
				var table = el("table", "km-dex-move-table"), caption = el("caption", "km-muted", rows.length + " " + active[1] + " move records for " + pokemonLabel(entry)); table.appendChild(caption);
				var header = el("thead"), labels = el("tr"); ["Learn", "Move", "Type", "Category", "Power", "Accuracy", "PP"].forEach(function (label) { var cell = el("th", "", label); cell.scope = "col"; labels.appendChild(cell); }); header.appendChild(labels); table.appendChild(header);
				var body = el("tbody"); table.appendChild(body);
				var limit = 18; state.movePage = Math.min(state.movePage, Math.max(0, Math.ceil(rows.length / limit) - 1));
				rows.slice(state.movePage * limit, (state.movePage + 1) * limit).forEach(function (move) {
					var details = index.pack.moves[move.id], row = el("tr");
					row.appendChild(el("td", "km-muted", move.method === "Level" ? move.level === 0 ? "Evolution" : "Lv. " + move.level : move.machine || move.method));
					var cell = el("td"), disclosure = el("details"), summary = el("summary", "", details.name); disclosure.appendChild(summary);
					var text = index.pack.moveDescriptions && index.pack.moveDescriptions[move.id];
					if (!text && profile.id === "pokemon-royal-sword" && window.KMCalculatorTooltipData) {
						var detail = window.KMCalculatorTooltipData.swsh.moves[data.normalize(details.name)]; text = detail && (detail.effects || detail.description);
					}
					disclosure.appendChild(el("p", "km-muted", text || "Move effect text is not recorded.")); disclosure.appendChild(el("small", "km-muted", "Priority: " + details.priority)); cell.appendChild(disclosure); row.appendChild(cell);
					cell = el("td"); cell.appendChild(badge(details.type)); row.appendChild(cell);
					[details.category, details.category === "Status" ? "None" : details.power || "Varies", details.accuracy > 100 ? "Always" : details.accuracy + "%", details.pp].forEach(function (value) { row.appendChild(el("td", "", value)); }); body.appendChild(row);
				});
				output.appendChild(table);
				if (!rows.length) output.appendChild(el("p", "km-dex-empty", query.value ? "No " + active[1] + " moves match this search." : "No " + active[1] + " moves are recorded for this form."));
				var pages = el("div", "km-dex-pager"); output.appendChild(pages);
				pager(pages, state.movePage, rows.length, limit, function (page) { state.movePage = page; renderMoves(); output.querySelector("summary").focus(); }, "move");
			}
			query.addEventListener("input", function () { state.movePage = 0; renderMoves(); }); renderMoves();
		}
		function locations(parent, entry) {
			var section = card(parent, "Where to find", "km-dex-locations");
			var rows = index.locations[entry.baseKey || entry.key] || [];
			if (!rows.length) { section.appendChild(el("p", "km-muted", "No encounter location is recorded for this form. This does not rule out gifts, evolution, or other ways of obtaining it.")); return; }
			var grid = el("div", "km-dex-location-grid"); section.appendChild(grid);
			rows.forEach(function (row) {
				var tile = el("div", "km-dex-location"); tile.appendChild(el("strong", "", row.area)); tile.appendChild(el("span", "km-muted", row.method + (row.weather ? " · " + row.weather : "")));
				tile.appendChild(el("span", "", (row.level ? "Level " + row.level : "Level not recorded") + (row.rate !== null && row.rate !== undefined ? " · " + row.rate + "%" : ""))); if (row.note) tile.appendChild(el("small", "km-muted", row.note)); grid.appendChild(tile);
			});
		}
		function renderDetail() {
			stopArtwork(); detail.textContent = "";
			var species = selectedSpecies(), entry = selectedEntry();
			if (!species) { detail.appendChild(el("p", "km-dex-empty", "Try another Pokémon name, number, or filter.")); return; }
			var top = el("div", "km-dex-identity"); detail.appendChild(top);
			var identity = el("div"); identity.appendChild(el("span", "km-dex-kicker", number(species.number) + " · " + profile.shortName)); identity.appendChild(el("h2", "", entry ? pokemonLabel(entry) : species.name));
			var types = el("div", "km-dex-types"); if (data.hasData(entry)) entry.types.forEach(function (type) { types.appendChild(badge(type)); }); types.appendChild(el("span", "km-muted", species.genus)); identity.appendChild(types); top.appendChild(identity);
			var nav = el("div", "km-dex-neighbors");
			var position = results.indexOf(species);
			[["Previous Pokémon", position - 1], ["Next Pokémon", position + 1]].forEach(function (pair) {
				var b = button(pair[0], function () { var species = results[pair[1]]; state.page = Math.floor(pair[1] / perPage); choose(species, defaultEntry(species)); }); b.disabled = !results[pair[1]]; nav.appendChild(b);
			}); top.appendChild(nav);

			var forms = allForms(species), megas = forms.filter(function (form) { return form.formKind === "mega" || /-Mega(?:-[XY])?$/.test(form.name); });
			var ordinary = forms.filter(function (form) { return megas.indexOf(form) === -1; });
			if (ordinary.length > 1 || megas.length) {
				var formRow = el("div", "km-dex-form-row");
				if (ordinary.length > 1) {
					var choices = ordinary.map(function (entry) { return [entry.key, entry.name + (entry.present ? "" : " (not in game)")]; });
					if (megas.some(function (mega) { return mega.key === state.key; })) choices.unshift(["", "Choose another form"]);
					var form = select(choices, "Pokémon form"); form.value = ordinary.some(function (entry) { return entry.key === state.key; }) ? state.key : "";
					if (form.options[0].value === "") form.options[0].disabled = true;
					form.addEventListener("change", function () { state.key = form.value; state.movePage = 0; renderDetail(); }); field(formRow, "Form", form);
				}
				if (megas.length) {
					var switches = el("div", "km-dex-mega-switches"); switches.setAttribute("role", "group"); switches.setAttribute("aria-label", "Mega Evolution forms");
					var base = index.entries[species.number + ":0"];
					[base].concat(megas).filter(Boolean).forEach(function (form) {
						var label = form === base ? "Base" : form.buttonLabel || form.name.match(/-Mega(?:-([XY]))?$/)[0].replace(/-/g, " ").trim();
						var control = button(label, function () {
							state.key = form.key; state.movePage = 0; renderDetail();
							var selected = detail.querySelector('.km-dex-mega-switches [aria-pressed="true"]'); if (selected) selected.focus({preventScroll: true});
						}, "km-dex-form-button");
						control.setAttribute("aria-pressed", String(state.key === form.key)); control.setAttribute("aria-label", species.name + " " + label + " form"); switches.appendChild(control);
					}); formRow.appendChild(switches);
				} detail.appendChild(formRow);
			}
			var hero = el("div", "km-dex-hero"); detail.appendChild(hero);
			var artwork = el("figure", "km-dex-artwork-card"); artwork.setAttribute("aria-label", "Official Pokémon artwork"); hero.appendChild(artwork);
			if (visible) renderArtwork(artwork, species, entry);
			var summary = hero;
			if (!data.hasData(entry)) {
				var missing = card(summary, "No profile data", "km-dex-missing"); missing.appendChild(el("p", "km-muted", "This National Dex entry has no recorded stats, abilities, or learnset for " + profile.shortName + ".")); return;
			}
			if (!entry.present) detail.appendChild(el("p", "km-dex-availability km-muted", "This form is not marked as present in the game data."));
			renderStats(summary, entry); renderAbilities(summary, entry);
			var sections = [["overview", "Overview"], ["evolution", "Evolution"], ["moves", "Moves"], ["locations", "Where to find"]];
			if (!sections.some(function (section) { return section[0] === state.section; })) state.section = "overview";
			var tabs = el("div", "km-dex-sections"); tabs.setAttribute("role", "tablist"); tabs.setAttribute("aria-label", "Pokémon information"); detail.appendChild(tabs);
			var content = el("div", "km-dex-section-content"); content.id = "km-dex-section-content"; content.setAttribute("role", "tabpanel"); detail.appendChild(content);
			sections.forEach(function (pair, i) {
				var b = button(pair[1], function () { state.section = pair[0]; renderSection(); }, "km-dex-section-tab"); b.id = "km-dex-section-" + pair[0]; b.setAttribute("role", "tab"); b.setAttribute("aria-controls", content.id);
				b.addEventListener("keydown", function (event) {
					var target = event.key === "ArrowRight" ? (i + 1) % sections.length : event.key === "ArrowLeft" ? (i + sections.length - 1) % sections.length : event.key === "Home" ? 0 : event.key === "End" ? sections.length - 1 : null;
					if (target === null) return; event.preventDefault(); state.section = sections[target][0]; renderSection(); tabs.children[target].focus();
				}); tabs.appendChild(b);
			});
			function renderSection() {
				content.textContent = "";
				Array.prototype.forEach.call(tabs.children, function (b, i) { var active = sections[i][0] === state.section; b.setAttribute("aria-selected", String(active)); b.tabIndex = active ? 0 : -1; if (active) content.setAttribute("aria-labelledby", b.id); });
				if (state.section === "evolution") evolution(content, entry);
				else if (state.section === "moves") moves(content, entry);
				else if (state.section === "locations") locations(content, entry);
				else overview(content, species, entry);
			}
			renderSection();
		}
		function setProfile(next) {
			stopArtwork(); profile = next; generation = null;
			if (!profile) { index = null; subtitle.textContent = "Choose a ROM hack to browse its Dex."; detail.textContent = list.textContent = totals.textContent = ""; return; }
			var context = registry.getActiveContext(), provider = context && context.resolvedProvider;
			var pack = provider && typeof provider.getPokedexData === "function" ? provider.getPokedexData(profile, context) : (window.KMPokedexProfiles || {})[profile.id];
			if (pack && pack.profileId !== profile.id) pack = null;
			try { generation = registry.getActiveGeneration(window.calc); } catch (error) { generation = null; }
			index = data.createIndex(window.KMPokedexCatalog, pack, (window.KMCalculatorReferenceData || {})[profile.id], generation);
			state = saved[profile.id] || {number: 1, key: "1:0", page: 0, section: "overview", query: "", filters: {}, movePage: 0}; saved[profile.id] = state;
			search.value = state.query; type.value = state.filters.type || ""; gen.value = state.filters.generation || ""; availability.value = state.filters.availability || "";
			subtitle.textContent = profile.name + " · Pokémon, moves, evolutions, and encounter locations";
			totals.textContent = "";
			[[index.catalog.species.length, "National entries"], [Object.keys(index.forms).filter(function (number) { return index.forms[number].some(function (entry) { return entry.present && data.hasData(entry); }); }).length, "in the game data"]].forEach(function (pair) { var tile = el("div"); tile.appendChild(el("strong", "", pair[0])); tile.appendChild(el("span", "km-muted", pair[1])); totals.appendChild(tile); });
			results = data.search(index, state.query, state.filters);
			if (!selectedSpecies() && results.length) { state.number = results[0].number; state.key = defaultEntry(results[0]) ? defaultEntry(results[0]).key : state.number + ":0"; }
			renderList(); renderDetail();
		}
		function setVisible(value) {
			if (visible === value) return; visible = value;
			if (!visible) stopArtwork();
			else if (index) { resize(); renderDetail(); }
		}
		function resize() {
			if (!visible || !state) return;
			var scale = Number(window.getComputedStyle(document.body).zoom) || 1;
			panel.setAttribute("data-density", window.innerHeight / scale < 900 ? "compact" : "normal");
			var size = listSize();
			if (size !== perPage) { var anchor = state.page * perPage; perPage = size; state.page = Math.floor(anchor / size); renderList(); }
		}
		window.addEventListener("resize", resize);
		window.addEventListener("kmcalculator:artworkchange", function () { if (visible && index) { renderList(); renderDetail(); } });
		if (window.ResizeObserver) { var observer = new window.ResizeObserver(resize); observer.observe(heading); observer.observe(filters); }
		return {element: panel, setProfile: setProfile, setVisible: setVisible};
	}
	window.KMPokedex = {create: create};
})();
