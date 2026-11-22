/*global window, document */
(function () {
	"use strict";
	var popup, anchor, timer;
	function node(tag, className, text) {
		var element = document.createElement(tag);
		if (className) element.className = className;
		if (text !== undefined) element.textContent = text;
		return element;
	}
	function keyFor(name) {
		return String(name || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");
	}
	function descriptionText(text) {
		return String(text || "")
			.replace(/\u2014/g, ", ")
			.replace(/(\d)\s*-\s*(?=\d)/g, "$1 to ")
			.replace("10000 - its normal Speed", "10000 minus its normal Speed")
			.replace(/\b(Bug|Dark|Dragon|Electric|Fairy|Fighting|Fire|Flying|Ghost|Grass|Ground|Ice|Normal|Poison|Psychic|Rock|Steel|Water)-type\b/g, "$1 type")
			.replace(/\b(critical-hit|Defense-lowering|HP-stealing|One-hit|exotic-smelling|gem-filled|life-force|move-binding|multi-target|multi-turn|no-guard|non-damaging|non-volatile|semi-invulnerability|shady-looking|single-target|single-use|sound-based|stat-lowering|teardrop-shaped|two-turn|weather-related|well-worn)\b/g, function (word) { return word.replace(/-/g, " "); })
			.replace(/switch-in/g, "entry");
	}
	function lookup(catalogId, kind, name, pokemon) {
		var catalogs = window.KMCalculatorTooltipData;
		var catalog = catalogs && Object.prototype.hasOwnProperty.call(catalogs, catalogId) && catalogs[catalogId];
		if (!catalog || !Object.prototype.hasOwnProperty.call(catalog, kind)) return null;
		var key = keyFor(name);
		if (catalog.aliases && Object.prototype.hasOwnProperty.call(catalog.aliases, key)) key = catalog.aliases[key];
		var generation = typeof window.getActiveCalcGeneration === "function" && window.getActiveCalcGeneration();
		var pack = generation && generation.game === "royal-sword" && window.KMPokedexProfiles && window.KMPokedexProfiles["pokemon-royal-sword"];
		if (pack && kind === "abilities" && pack.abilities && pack.abilities[key]) return {name: name, description: pack.abilities[key]};
		if (pack && kind === "items") {
			var item = generation.items.get(key);
			if (item && item.megaStone) return {name: name, description: "Allows " + Object.keys(item.megaStone).join(" or ") + " to Mega Evolve in battle."};
		}
		if (!Object.prototype.hasOwnProperty.call(catalog[kind], key)) {
			if (!pack || kind !== "moves" || !generation.moves.get(key)) return null;
		}
		var detail = Object.assign({}, catalog[kind][key]);
		if (kind === "abilities" && detail.forms) {
			var form = pokemon && pokemon.sprite;
			detail.description = form && Object.prototype.hasOwnProperty.call(detail.forms, form) ? detail.forms[form] :
				Object.keys(detail.forms).map(function (id) { return detail.forms[id]; }).join("\n\n");
		}
		if (kind === "moves" && generation) {
			var move = generation && generation.num === catalog.generation && generation.moves.get(key);
			if (move) {
				detail.name = detail.name || move.name;
				detail.power = move.basePower; detail.type = move.type; detail.category = move.category;
				if (move.accuracy === true || (typeof move.accuracy === "number" && move.accuracy >= 0 && move.accuracy <= 100)) detail.accuracy = move.accuracy;
				if (pack) {
					var id = Object.keys(pack.moveDescriptions || {}).find(function (id) { return keyFor(pack.moves[id].name) === key; });
					if (id) detail.effects = pack.moveDescriptions[id];
				}
			}
		}
		return detail;
	}
	function hide() {
		window.clearTimeout(timer);
		if (popup) popup.hidden = true;
		if (anchor) {
			var descriptions = (anchor.getAttribute("aria-describedby") || "").split(/\s+/).filter(function (id) { return id && id !== "km-trainer-tooltip"; });
			if (descriptions.length) anchor.setAttribute("aria-describedby", descriptions.join(" "));
			else anchor.removeAttribute("aria-describedby");
		}
		anchor = null;
	}
	function delayHide() { window.clearTimeout(timer); timer = window.setTimeout(hide, 140); }
	function ensurePopup() {
		if (popup) return;
		popup = node("div", "km-trainer-tooltip"); popup.id = "km-trainer-tooltip";
		popup.setAttribute("role", "tooltip"); popup.hidden = true;
		popup.addEventListener("mouseenter", function () { window.clearTimeout(timer); });
		popup.addEventListener("mouseleave", delayHide);
		document.body.appendChild(popup);
		window.addEventListener("resize", hide);
		window.addEventListener("blur", hide);
		window.addEventListener("scroll", hide, true);
		window.addEventListener("kmcalculator:romhackchange", hide);
		if (window.visualViewport) {
			window.visualViewport.addEventListener("resize", hide);
			window.visualViewport.addEventListener("scroll", hide);
		}
		document.addEventListener("pointerdown", function (event) {
			if (anchor && !anchor.contains(event.target) && !popup.contains(event.target)) hide();
		}, true);
		document.addEventListener("keydown", function (event) {
			if (event.key === "Escape" && anchor) { hide(); event.preventDefault(); event.stopPropagation(); }
		}, true);
	}
	function assetImage(className, path, width, height) {
		var image = node("img", className); image.src = path; image.alt = "";
		image.width = width; image.height = height; image.draggable = false;
		image.addEventListener("error", function () { image.hidden = true; });
		return image;
	}
	function position(detail) {
		var scale = Number(window.getComputedStyle(document.body).zoom) || 1;
		var viewport = window.visualViewport;
		var width = document.documentElement.clientWidth || window.innerWidth;
		var height = document.documentElement.clientHeight || window.innerHeight;
		var gap = 8 * scale;
		var left = (viewport ? viewport.offsetLeft : 0) + gap;
		var top = (viewport ? viewport.offsetTop : 0) + gap;
		var right = left + Math.min(width, viewport ? viewport.width : width) - 2 * gap;
		var bottom = top + Math.min(height, viewport ? viewport.height : height) - 2 * gap;
		if (right <= left || bottom <= top) { hide(); return; }
		popup.style.transform = "";
		popup.style.width = Math.min(400, (right - left) / scale) + "px";
		popup.style.left = "0px"; popup.style.top = "0px"; popup.style.visibility = "hidden"; popup.hidden = false;
		var rect = popup.getBoundingClientRect();
		if (rect.height > bottom - top) {
			var effects = popup.querySelector(".km-tooltip-description");
			if (effects && detail.summary) effects.textContent = detail.summary;
			popup.style.width = Math.min(640, (right - left) / scale) + "px";
			rect = popup.getBoundingClientRect();
		}
		if (rect.height > bottom - top) {
			popup.style.transformOrigin = "top left";
			popup.style.transform = "scale(" + Math.min(1, (bottom - top) / rect.height) + ")";
			rect = popup.getBoundingClientRect();
		}
		var target = anchor.getBoundingClientRect();
		var y = target.top - gap - rect.height;
		if (y < top && target.bottom + gap + rect.height <= bottom) y = target.bottom + gap;
		popup.style.left = Math.max(left, Math.min(target.left, right - rect.width)) / scale + "px";
		popup.style.top = Math.max(top, Math.min(y, bottom - rect.height)) / scale + "px";
		popup.style.visibility = "visible";
	}
	function show(target, catalogId, kind, name, pokemon) {
		var detail = lookup(catalogId, kind, name, pokemon);
		if (!detail || !target.isConnected || target.closest("[hidden]")) return;
		hide(); ensurePopup(); anchor = target; popup.textContent = "";
		var heading = node("div", "km-tooltip-heading");
		if (kind === "items" && /^[a-z0-9]+$/.test(detail.sprite || "")) {
			heading.appendChild(assetImage("km-tooltip-item-sprite", "./img/items/" + detail.sprite + ".png", 64, 64));
		}
		heading.appendChild(node("strong", "", detail.name)); popup.appendChild(heading);
		if (kind === "moves") {
			var facts = node("div", "km-tooltip-move-facts");
			var category = node("span", "km-tooltip-category");
			if (["Physical", "Special", "Status"].indexOf(detail.category) !== -1) {
				category.appendChild(assetImage("km-tooltip-category-icon", "./img/move-categories/" + detail.category.toLowerCase() + ".png", 36, 24));
			}
			category.appendChild(document.createTextNode(detail.category)); facts.appendChild(category);
			var type = node("span", "km-tooltip-type km-type-badge", detail.type);
			type.setAttribute("data-type", detail.type); facts.appendChild(type);
			var metrics = node("span", "km-tooltip-move-metrics");
			metrics.appendChild(node("span", "", "Power " + (detail.category === "Status" ? "None" : detail.power || detail.powerLabel || "Varies")));
			metrics.appendChild(node("span", "", "Accuracy " + (detail.accuracy === true ? "No check" : typeof detail.accuracy === "number" ? detail.accuracy + "%" : "Unknown")));
			facts.appendChild(metrics);
			popup.appendChild(facts);
			popup.appendChild(node("p", "km-tooltip-description", descriptionText(detail.effects || "Move effect text is not recorded.")));
		} else popup.appendChild(node("p", "km-tooltip-description", descriptionText(detail.description)));
		var descriptions = (anchor.getAttribute("aria-describedby") || "").split(/\s+/).filter(Boolean);
		descriptions.push(popup.id); anchor.setAttribute("aria-describedby", descriptions.join(" "));
		position(detail);
	}
	function bind(target, catalogId, kind, name, pokemon) {
		if (!lookup(catalogId, kind, name, pokemon)) return;
		target.classList.add("km-trainer-tooltip-trigger"); target.tabIndex = 0;
		function open() { show(target, catalogId, kind, name, pokemon); }
		target.addEventListener("mouseenter", open); target.addEventListener("focus", open);
		target.addEventListener("mouseleave", delayHide); target.addEventListener("blur", hide);
		target.addEventListener("click", open);
		target.addEventListener("keydown", function (event) {
			if (event.key === "Enter" || event.key === " ") { event.preventDefault(); open(); }
		});
	}
	window.KMTrainerTooltips = {bind: bind, hide: hide};
})();
