/*global addTrainerPokemonToDex, calc, checkStatBoost, createField, createPokemon, createPokemonSprite,
GENERATION,
getTrainerEntry, getTrainerPokemon, getTrainerPokemonButtonLabel, getTrainerPokemonLabel,
getActiveCalcGeneration, getTrainerPokemonSpecies, isDoublesFormatSelected */

var BATTLE_SCRIPT_EMPTY_TEXT = "Calculate a script to see timeline actions.";
var BATTLE_SCRIPT_AUTOCOMPLETE_LIMIT = 8;
var BATTLE_SCRIPT_STORAGE_KEY = "royalSwordBattleScriptState";
var BATTLE_SCRIPT_IMPORTED_BAG_ITEMS_KEY = "kmCalculatorImportedBagItems";
/* Compatibility-only read key for inventory imported before the KM Companion rebrand. */
var BATTLE_SCRIPT_LEGACY_IMPORTED_BAG_ITEMS_KEY = "royalSwordImportedBagItems";
var BATTLE_SCRIPT_BAG_ITEM_EVALUATION_LIMIT = 36;
var BATTLE_SCRIPT_BAG_ITEM_ACTION_LIMIT = 4;
var BATTLE_SCRIPT_CRAFT_ITEM_ASSIGN_THRESHOLD = 0.15;
var BATTLE_SCRIPT_CRAFT_DAMAGE_CACHE_LIMIT = 50000;
var BATTLE_SCRIPT_CRAFT_ITEM_CACHE_LIMIT = 6000;
var BATTLE_SCRIPT_CRAFT_STATE_CACHE_LIMIT = 50000;
var BATTLE_SCRIPT_CRAFT_PREDICTION_CACHE_LIMIT = 20000;
var BATTLE_SCRIPT_CRAFT_AI_SCORE_CACHE_LIMIT = 20000;
var BATTLE_SCRIPT_CRAFT_SWITCH_CACHE_LIMIT = 12000;
var BATTLE_SCRIPT_CRAFT_REPLACEMENT_CACHE_LIMIT = 12000;
var BATTLE_SCRIPT_SIDE_LABELS = {
	player: "Player",
	opponent: "Trainer"
};
var BATTLE_SCRIPT_AI_MODELS = {
	"swsh": "Trainer"
};
var BATTLE_SCRIPT_DEFAULT_AI_MODEL = "swsh";
var BATTLE_SCRIPT_PROFILE_CAPABILITY = "royal-sword-swsh-ai";
var BATTLE_SCRIPT_TYPE_BOOST_ITEMS = {
	blackbelt: "Fighting",
	blackglasses: "Dark",
	charcoal: "Fire",
	dragonfang: "Dragon",
	hardstone: "Rock",
	magnet: "Electric",
	metalcoat: "Steel",
	miracleseed: "Grass",
	mysticwater: "Water",
	nevermeltice: "Ice",
	oddincense: "Psychic",
	poisonbarb: "Poison",
	rockincense: "Rock",
	roseincense: "Grass",
	seaincense: "Water",
	sharpbeak: "Flying",
	silkscarf: "Normal",
	silverpowder: "Bug",
	softsand: "Ground",
	spelltag: "Ghost",
	twistedspoon: "Psychic",
	waveincense: "Water"
};
var BATTLE_SCRIPT_TYPE_IDS = {
	Normal: 0,
	Fighting: 1,
	Flying: 2,
	Poison: 3,
	Ground: 4,
	Rock: 5,
	Bug: 6,
	Ghost: 7,
	Steel: 8,
	Fire: 9,
	Water: 10,
	Grass: 11,
	Electric: 12,
	Psychic: 13,
	Ice: 14,
	Dragon: 15,
	Dark: 16,
	Fairy: 17
};
var BATTLE_SCRIPT_EFFECTIVENESS_CHART = [
	[4, 4, 4, 4, 4, 2, 4, 0, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4],
	[8, 4, 2, 2, 4, 8, 2, 0, 8, 4, 4, 4, 4, 2, 8, 4, 8, 2],
	[4, 8, 4, 4, 4, 2, 8, 4, 2, 4, 4, 8, 2, 4, 4, 4, 4, 4],
	[4, 4, 4, 2, 2, 2, 4, 2, 0, 4, 4, 8, 4, 4, 4, 4, 4, 8],
	[4, 4, 0, 8, 4, 8, 2, 4, 8, 8, 4, 2, 8, 4, 4, 4, 4, 4],
	[4, 2, 8, 4, 2, 4, 8, 4, 2, 8, 4, 4, 4, 4, 8, 4, 4, 4],
	[4, 2, 2, 2, 4, 4, 4, 2, 2, 2, 4, 8, 4, 8, 4, 4, 8, 2],
	[0, 4, 4, 4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 8, 4, 4, 2, 4],
	[4, 4, 4, 4, 4, 8, 4, 4, 2, 2, 2, 4, 2, 4, 8, 4, 4, 8],
	[4, 4, 4, 4, 4, 2, 8, 4, 8, 2, 2, 8, 4, 4, 8, 2, 4, 4],
	[4, 4, 4, 4, 8, 8, 4, 4, 4, 8, 2, 2, 4, 4, 4, 2, 4, 4],
	[4, 4, 2, 2, 8, 8, 2, 4, 2, 2, 8, 2, 4, 4, 4, 2, 4, 4],
	[4, 4, 8, 4, 0, 4, 4, 4, 4, 4, 8, 2, 2, 4, 4, 2, 4, 4],
	[4, 8, 4, 8, 4, 4, 4, 4, 2, 4, 4, 4, 4, 2, 4, 4, 0, 4],
	[4, 4, 8, 4, 8, 4, 4, 4, 2, 2, 2, 8, 4, 4, 2, 8, 4, 4],
	[4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4, 4, 4, 4, 4, 8, 4, 0],
	[4, 2, 4, 4, 4, 4, 4, 8, 4, 4, 4, 4, 4, 8, 4, 4, 2, 2],
	[4, 8, 4, 2, 4, 4, 4, 4, 2, 2, 4, 4, 4, 4, 4, 8, 8, 4]
];
var BATTLE_SCRIPT_CRAFT_BATCH_SIZE = 42;
var BATTLE_SCRIPT_CRAFT_LOADOUT_ITEM_LIMIT = 42;
var BATTLE_SCRIPT_CRAFT_DEFAULT_MAX_NODES = 2400;
var BATTLE_SCRIPT_CRAFT_ANY_COST_MAX_NODES = 3600;
var BATTLE_SCRIPT_CRAFT_NO_LOSSES_MAX_NODES = 4800;
var BATTLE_SCRIPT_CRAFT_MAX_RESULTS = 10;
var BATTLE_SCRIPT_CRAFT_SUGGESTION_BEAM_WIDTH = 42;
var BATTLE_SCRIPT_CRAFT_SUGGESTION_CANDIDATE_LIMIT = 12;
var BATTLE_SCRIPT_CRAFT_SUGGESTION_COLLECT_LIMIT = 18;
var BATTLE_SCRIPT_CRAFT_MAX_SUGGESTIONS = 3;
var BATTLE_SCRIPT_CRAFT_MAX_TURNS = 18;
var BATTLE_SCRIPT_CRAFT_SEARCH_LIMIT = 260;
var BATTLE_SCRIPT_CRAFT_SUGGESTION_MAX_NODES = 700;
var BATTLE_SCRIPT_CRAFT_SUGGESTION_QUEUE_LIMIT = 120;
var BATTLE_SCRIPT_CRAFT_SUGGESTION_SEARCH_LIMIT = 36;
var BATTLE_SCRIPT_CRAFT_SUGGESTION_TOTAL_MAX_NODES = 18000;
var BATTLE_SCRIPT_CRAFT_FRAME_BUDGET_MS = 12;
var BATTLE_SCRIPT_CRAFT_GREEDY_SEED_LIMIT = 0;
var BATTLE_SCRIPT_CRAFT_MODES = {
	"no-losses": {
		label: "Try For No Losses",
		description: "Prioritize wins with the fewest Player faints."
	},
	"default": {
		label: "Default",
		description: "Balance consistency, losses, risk, and speed."
	},
	"any-cost": {
		label: "Win At Any Cost",
		description: "Prioritize finding wins over protecting Pokemon."
	}
};
var BATTLE_SCRIPT_DEFAULT_CRAFT_MODE = "default";
var BATTLE_SCRIPT_RECHARGE_MOVES = [
	"Blast Burn", "Eternabeam", "Frenzy Plant", "Giga Impact", "Hydro Cannon",
	"Hyper Beam", "Meteor Assault", "Prismatic Laser", "Roar of Time", "Rock Wrecker"
];
var BATTLE_SCRIPT_CHARGE_MOVES = {
	"Bounce": {
		invulnerable: "in the air",
		hitBy: ["Gust", "Hurricane", "Sky Uppercut", "Smack Down", "Thunder", "Twister"]
	},
	"Dig": {
		invulnerable: "underground",
		hitBy: ["Earthquake", "Fissure", "Magnitude"]
	},
	"Dive": {
		invulnerable: "underwater",
		hitBy: ["Surf", "Whirlpool"]
	},
	"Fly": {
		invulnerable: "in the air",
		hitBy: ["Gust", "Hurricane", "Sky Uppercut", "Smack Down", "Thunder", "Twister"]
	},
	"Freeze Shock": {},
	"Geomancy": {},
	"Ice Burn": {},
	"Meteor Beam": {
		startEffects: [{kind: "boost", target: "attacker", stat: "spa", amount: 1, chance: 100}]
	},
	"Phantom Force": {
		invulnerable: "vanished",
		hitBy: []
	},
	"Razor Wind": {},
	"Shadow Force": {
		invulnerable: "vanished",
		hitBy: []
	},
	"Skull Bash": {
		startEffects: [{kind: "boost", target: "attacker", stat: "def", amount: 1, chance: 100}]
	},
	"Sky Attack": {},
	"Sky Drop": {
		invulnerable: "in the air",
		hitBy: ["Gust", "Hurricane", "Sky Uppercut", "Smack Down", "Thunder", "Twister"]
	},
	"Solar Beam": {
		skipChargeWeather: ["Sun", "Harsh Sunshine"]
	},
	"Solar Blade": {
		skipChargeWeather: ["Sun", "Harsh Sunshine"]
	}
};
var BATTLE_SCRIPT_ABILITY_IGNORE_MOVES = {
	"G-Max Drum Solo": true,
	"G-Max Fire Ball": true,
	"G-Max Hydrosnipe": true,
	"Light That Burns the Sky": true,
	"Menacing Moonraze Maelstrom": true,
	"Moongeist Beam": true,
	"Photon Geyser": true,
	"Searing Sunraze Smash": true,
	"Sunsteel Strike": true
};
var BATTLE_SCRIPT_NEUTRALIZING_GAS_IGNORED_ABILITIES = {
	"As One (Glastrier)": true,
	"As One (Spectrier)": true,
	"Battle Bond": true,
	"Comatose": true,
	"Disguise": true,
	"Gulp Missile": true,
	"Ice Face": true,
	"Multitype": true,
	"Neutralizing Gas": true,
	"Power Construct": true,
	"RKS System": true,
	"Schooling": true,
	"Shields Down": true,
	"Stance Change": true,
	"Tera Shift": true,
	"Zen Mode": true,
	"Zero to Hero": true
};
var BATTLE_SCRIPT_CRAFT_QUIP_BUFFER_SIZE = 50;
var BATTLE_SCRIPT_CRAFT_QUIP_REFILL_THRESHOLD = 12;
var BATTLE_SCRIPT_CRAFT_QUIP_RECENT_LIMIT = 200;
var BATTLE_SCRIPT_CRAFT_QUIP_RECENT_THEME_LIMIT = 12;
var BATTLE_SCRIPT_CRAFT_QUIP_RECENT_PHRASE_LIMIT = 60;
var BATTLE_SCRIPT_CRAFT_QUIP_RECENT_WORD_WINDOW = 5;
var BATTLE_SCRIPT_CRAFT_QUIP_STRIDE = 7919;
var BATTLE_SCRIPT_CRAFT_QUIP_SEEDS = [
	"Crafting a line", "Counting damage rolls", "Checking pivot math", "Testing safer KOs",
	"Watching recharge turns", "Comparing AI branches", "Looking for a clean endgame",
	"Scoring sacrifice lines", "Sorting switch pressure", "Checking accuracy risk",
	"Following weather swings", "Trying the boring but correct line", "Checking outs without critical hits",
	"Reading pressure after a KO", "Auditing move effects", "Ranking consistent paths",
	"Looking past the first KO", "Testing setup value", "Checking all remaining threats",
	"Trimming shaky branches", "Measuring return damage", "Finding the least messy win",
	"Keeping bag items honest", "Checking Power Herb timing", "Reading terrain pressure",
	"Counting remaining weather turns", "Testing pivots supported by items", "Finding clean switches",
	"Checking status berry value", "Watching entry pressure", "Sorting endgame routes",
	"Rechecking speed control", "Comparing safer finishers", "Looking for a guaranteed close",
	"Measuring ability breakpoints", "Testing branches without losses", "Checking all trainer outs"
];
var BATTLE_SCRIPT_CRAFT_QUIP_VERBS = [
	"Checking", "Comparing", "Scoring", "Ranking", "Testing", "Auditing", "Threading",
	"Trimming", "Reading", "Measuring", "Exploring", "Prioritizing", "Rechecking",
	"Simulating", "Mapping", "Balancing", "Proving", "Stress-testing", "Ordering",
	"Filtering", "Estimating", "Reweighing", "Finding", "Validating", "Watching",
	"Planning", "Selecting", "Trying", "Scanning", "Refining", "Weighing", "Solving"
];
var BATTLE_SCRIPT_CRAFT_QUIP_SUBJECTS = [
	"damage rolls", "AI move scores", "safe KOs", "pivot windows", "switch pressure",
	"item assignments", "status answers", "terrain turns", "weather turns", "entry hazard pressure",
	"speed ties", "ability triggers", "Power Herb turns", "Berry timing", "accuracy risk",
	"paths without critical hits", "pressure after a KO", "sacrifice counts", "endgame routes",
	"setup value", "return damage", "survival ranges", "trainer replacements",
	"player item locks", "remaining HP", "field duration", "moves spanning two turns",
	"contact punishment", "priority moves", "screen turns", "bag limits", "switch order",
	"status pressure", "recharge turns", "forced trainer choices", "move legality",
	"recovery timing", "roll safety", "branch dominance", "search priorities"
];
var BATTLE_SCRIPT_CRAFT_QUIP_ENDINGS = [
	"for the current branch", "before pruning", "against the trainer line",
	"with bag limits", "under trainer AI", "through the next KO",
	"for the active matchup", "without wasting a faint", "after item effects",
	"inside the sandbox", "against the predicted move", "across the remaining team",
	"before the endgame", "with current HP", "around field effects",
	"after hazards", "before the switch decision", "with ability effects",
	"around the safest pivot", "for a cleaner finish", "against bad rolls",
	"with terrain in mind", "with weather in mind", "past the obvious line",
	"before committing", "for consistency", "with the current inventory",
	"after the next faint", "for the shortest proof", "while preserving outs",
	"before ranking results", "with every legal move", "under the selected mode"
];
var BATTLE_SCRIPT_CRAFT_QUIPS = createBattleScriptCraftQuipSource();
var BATTLE_SCRIPT_CRAFT_TEAM_PLAN_QUIPS = [
	"Checking Box team plans", "Testing repairs across the full party", "Comparing safer swaps",
	"Looking for a cleaner roster", "Ranking backup options", "Trying deeper Box plans",
	"Measuring team rebuild risk", "Searching for consistent imports", "Checking who fixes the line",
	"Auditing Box depth", "Finding safer replacements", "Testing routes with multiple swaps",
	"Looking past the first swap", "Sorting rescue plans", "Checking possibilities across all six slots",
	"Finding the least risky rebuild", "Testing Box answers", "Comparing consistency gains",
	"Keeping the strong plan honest", "Looking for a team that survives"
];

function createBattleScriptCraftQuipSource() {
	return {
		kind: "generated",
		buffer: [],
		comboCursor: 0,
		recent: {},
		recentPhrases: {},
		recentThemes: {},
		recentWords: {},
		recentQueue: [],
		recentPhraseQueue: [],
		recentThemeQueue: [],
		recentWordBuckets: [],
		seedCursor: 0
	};
}
var BATTLE_SCRIPT_ALWAYS_HIT_MOVES = {
	"Aerial Ace": true,
	"Aura Sphere": true,
	"Clear Smog": true,
	"Disarming Voice": true,
	"Feint Attack": true,
	"Magical Leaf": true,
	"Magnet Bomb": true,
	"Nuzzle": true,
	"Shock Wave": true,
	"Smart Strike": true,
	"Swift": true
};
var BATTLE_SCRIPT_MOVE_ACCURACY = {
	"Air Slash": 95,
	"Blaze Kick": 90,
	"Blizzard": 70,
	"Blue Flare": 85,
	"Bounce": 85,
	"Cross Chop": 80,
	"Dark Void": 50,
	"Dragon Rush": 75,
	"Dynamic Punch": 50,
	"Fire Blast": 85,
	"Fire Fang": 95,
	"Focus Blast": 70,
	"Focus Energy": 100,
	"Gunk Shot": 80,
	"Grass Whistle": 55,
	"Grasswhistle": 55,
	"Heat Wave": 90,
	"High Jump Kick": 90,
	"Hurricane": 70,
	"Hypnosis": 60,
	"Ice Fang": 95,
	"Inferno": 50,
	"Iron Tail": 75,
	"Jump Kick": 95,
	"Lovely Kiss": 75,
	"Magma Storm": 75,
	"Mean Look": 100,
	"Megahorn": 85,
	"Muddy Water": 85,
	"Play Rough": 90,
	"Poison Gas": 90,
	"Poison Powder": 75,
	"Rock Blast": 90,
	"Rock Slide": 90,
	"Rock Tomb": 95,
	"Sand Attack": 100,
	"Screech": 85,
	"Sing": 55,
	"Sleep Powder": 75,
	"Stun Spore": 75,
	"Stone Edge": 80,
	"Supersonic": 55,
	"Thunder": 70,
	"Thunder Fang": 95,
	"Thunder Wave": 90,
	"Toxic": 90,
	"Will-O-Wisp": 85,
	"Zap Cannon": 50,
	"Zen Headbutt": 90
};
var BATTLE_SCRIPT_STAT_LABELS = {
	atk: "Attack",
	def: "Defense",
	spa: "Sp. Atk",
	spd: "Sp. Def",
	spe: "Speed"
};
var BATTLE_SCRIPT_STATUS_LABELS = {
	brn: "burned",
	frz: "frozen",
	par: "paralyzed",
	psn: "poisoned",
	slp: "put to sleep",
	tox: "badly poisoned"
};
var BATTLE_SCRIPT_TARGET_BOOST_MOVES = {
	"Acid Spray": [{stat: "spd", amount: -2}],
	"Apple Acid": [{stat: "spd", amount: -1}],
	"Baby-Doll Eyes": [{stat: "atk", amount: -1}],
	"Breaking Swipe": [{stat: "atk", amount: -1}],
	"Captivate": [{stat: "spa", amount: -2}],
	"Charm": [{stat: "atk", amount: -2}],
	"Confide": [{stat: "spa", amount: -1}],
	"Cotton Spore": [{stat: "spe", amount: -2}],
	"Eerie Impulse": [{stat: "spa", amount: -2}],
	"Electroweb": [{stat: "spe", amount: -1}],
	"Fake Tears": [{stat: "spd", amount: -2}],
	"Feather Dance": [{stat: "atk", amount: -2}],
	"Fire Lash": [{stat: "def", amount: -1}],
	"Grav Apple": [{stat: "def", amount: -1}],
	"Growl": [{stat: "atk", amount: -1}],
	"Icy Wind": [{stat: "spe", amount: -1}],
	"Leer": [{stat: "def", amount: -1}],
	"Low Sweep": [{stat: "spe", amount: -1}],
	"Lunge": [{stat: "atk", amount: -1}],
	"Metal Sound": [{stat: "spd", amount: -2}],
	"Mud Shot": [{stat: "spe", amount: -1}],
	"Mystical Fire": [{stat: "spa", amount: -1}],
	"Noble Roar": [{stat: "atk", amount: -1}, {stat: "spa", amount: -1}],
	"Parting Shot": [{stat: "atk", amount: -1}, {stat: "spa", amount: -1}],
	"Play Nice": [{stat: "atk", amount: -1}],
	"Rock Tomb": [{stat: "spe", amount: -1}],
	"Scary Face": [{stat: "spe", amount: -2}],
	"Screech": [{stat: "def", amount: -2}],
	"Skitter Smack": [{stat: "spa", amount: -1}],
	"Snarl": [{stat: "spa", amount: -1}],
	"Spirit Break": [{stat: "spa", amount: -1}],
	"String Shot": [{stat: "spe", amount: -2}],
	"Struggle Bug": [{stat: "spa", amount: -1}],
	"Tail Whip": [{stat: "def", amount: -1}],
	"Tearful Look": [{stat: "atk", amount: -1}, {stat: "spa", amount: -1}],
	"Tickle": [{stat: "atk", amount: -1}, {stat: "def", amount: -1}]
};
var BATTLE_SCRIPT_INTIMIDATE_BLOCKERS = [
	"Clear Body", "Full Metal Body", "Hyper Cutter", "Inner Focus",
	"Oblivious", "Own Tempo", "Scrappy", "White Smoke"
];
var BATTLE_SCRIPT_WEATHER_ABILITIES = {
	"Desolate Land": "Harsh Sunshine",
	"Delta Stream": "Strong Winds",
	"Drought": "Sun",
	"Drizzle": "Rain",
	"Orichalcum Pulse": "Sun",
	"Primordial Sea": "Heavy Rain",
	"Sand Stream": "Sand",
	"Snow Warning": "Hail"
};
var BATTLE_SCRIPT_TERRAIN_ABILITIES = {
	"Electric Surge": "Electric",
	"Grassy Surge": "Grassy",
	"Misty Surge": "Misty",
	"Psychic Surge": "Psychic"
};
var BATTLE_SCRIPT_DEFAULT_WEATHER_TURNS = 5;
var BATTLE_SCRIPT_DEFAULT_TERRAIN_TURNS = 5;
var BATTLE_SCRIPT_PERMANENT_WEATHERS = {
	"Harsh Sunshine": true,
	"Heavy Rain": true,
	"Strong Winds": true
};
var BATTLE_SCRIPT_WEATHER_DURATION_ITEMS = {
	Rain: "Damp Rock",
	Sun: "Heat Rock",
	Hail: "Icy Rock",
	Snow: "Icy Rock",
	Sand: "Smooth Rock"
};
var BATTLE_SCRIPT_SIDE_CONDITION_DEFS = {
	auroraveil: {label: "Aurora Veil", swshSlot: 17, calcKey: "isAuroraVeil", timed: true, defaultTurns: 5, lightClay: true},
	cannonade: {label: "Cannonade", swshSlot: 23, calcKey: "cannonade"},
	craftyshield: {label: "Crafty Shield", timed: true, defaultTurns: 1},
	lightscreen: {label: "Light Screen", swshSlot: 1, calcKey: "isLightScreen", timed: true, defaultTurns: 5, lightClay: true},
	luckychant: {label: "Lucky Chant", swshSlot: 5, timed: true, defaultTurns: 5},
	matblock: {label: "Mat Block", timed: true, defaultTurns: 1},
	mist: {label: "Mist", swshSlot: 3, timed: true, defaultTurns: 5},
	quickguard: {label: "Quick Guard", timed: true, defaultTurns: 1},
	rainbow: {label: "Rainbow", swshSlot: 13, timed: true, defaultTurns: 4},
	reflect: {label: "Reflect", swshSlot: 0, calcKey: "isReflect", timed: true, defaultTurns: 5, lightClay: true},
	safeguard: {label: "Safeguard", swshSlot: 2, timed: true, defaultTurns: 5},
	seaoffire: {label: "Sea of Fire", swshSlot: 11, timed: true, defaultTurns: 4},
	spikes: {label: "Spikes", swshSlot: 6, calcKey: "spikes", layers: true, max: 3},
	stealthrock: {label: "Stealth Rock", swshSlot: 8, calcKey: "isSR"},
	steelsurge: {label: "Steelsurge", swshSlot: 21, calcKey: "steelsurge"},
	stickyweb: {label: "Sticky Web", swshSlot: 14},
	swamp: {label: "Swamp", swshSlot: 12, timed: true, defaultTurns: 4},
	tailwind: {label: "Tailwind", swshSlot: 4, calcKey: "isTailwind", timed: true, defaultTurns: 4},
	toxicspikes: {label: "Toxic Spikes", swshSlot: 7, layers: true, max: 2},
	vinelash: {label: "Vine Lash", swshSlot: 22, calcKey: "vinelash"},
	volcalith: {label: "Volcalith", swshSlot: 20, calcKey: "volcalith"},
	wideguard: {label: "Wide Guard", timed: true, defaultTurns: 1},
	wildfire: {label: "Wildfire", swshSlot: 19, calcKey: "wildfire"}
};
var BATTLE_SCRIPT_SIDE_CONDITION_ALIASES = {
	auroraveil: "auroraveil",
	cannonade: "cannonade",
	craftyshield: "craftyshield",
	firepledge: "seaoffire",
	gmaxcannonade: "cannonade",
	gmaxsteelsurge: "steelsurge",
	gmaxvinelash: "vinelash",
	gmaxvolcalith: "volcalith",
	gmaxwildfire: "wildfire",
	grasspledge: "swamp",
	lightscreen: "lightscreen",
	light: "lightscreen",
	luckychant: "luckychant",
	matblock: "matblock",
	mist: "mist",
	pledgerainbow: "rainbow",
	quickguard: "quickguard",
	rainbow: "rainbow",
	reflect: "reflect",
	rocks: "stealthrock",
	safeguard: "safeguard",
	screen: "reflect",
	seaoffire: "seaoffire",
	spike: "spikes",
	spikes: "spikes",
	sr: "stealthrock",
	stealthrock: "stealthrock",
	stealthrocks: "stealthrock",
	steelsurge: "steelsurge",
	stickyweb: "stickyweb",
	stickywebs: "stickyweb",
	swamp: "swamp",
	tailwind: "tailwind",
	toxicspike: "toxicspikes",
	toxicspikes: "toxicspikes",
	tspike: "toxicspikes",
	tspikes: "toxicspikes",
	vinelash: "vinelash",
	volcalith: "volcalith",
	waterpledge: "rainbow",
	web: "stickyweb",
	webs: "stickyweb",
	wideguard: "wideguard",
	wildfire: "wildfire"
};
var BATTLE_SCRIPT_FIELD_EFFECT_DEFS = {
	gravity: {label: "Gravity", calcKey: "isGravity", timed: true, defaultTurns: 5},
	magicroom: {label: "Magic Room", calcKey: "isMagicRoom", timed: true, defaultTurns: 5},
	trickroom: {label: "Trick Room", timed: true, defaultTurns: 5},
	wonderroom: {label: "Wonder Room", calcKey: "isWonderRoom", timed: true, defaultTurns: 5}
};
var BATTLE_SCRIPT_FIELD_EFFECT_ALIASES = {
	gravity: "gravity",
	magicroom: "magicroom",
	trickroom: "trickroom",
	wonderroom: "wonderroom"
};
var BATTLE_SCRIPT_HAZARD_KEYS = ["spikes", "toxicspikes", "stealthrock", "stickyweb", "steelsurge", "vinelash", "wildfire", "cannonade", "volcalith"];
var BATTLE_SCRIPT_SCREEN_KEYS = ["reflect", "lightscreen", "auroraveil"];
var BATTLE_SCRIPT_DEFOG_SIDE_KEYS = BATTLE_SCRIPT_SCREEN_KEYS.concat(["mist", "safeguard"]);
var BATTLE_SCRIPT_FIELD_MOVE_EFFECTS = {
	"Aurora Veil": [{kind: "sideCondition", target: "attackerSide", condition: "auroraveil"}],
	"Brick Break": [{kind: "clearSideConditions", target: "defenderSide", conditions: BATTLE_SCRIPT_SCREEN_KEYS}],
	"Court Change": [{kind: "swapSideConditions"}],
	"Crafty Shield": [{kind: "sideCondition", target: "attackerSide", condition: "craftyshield"}],
	"Defog": [{kind: "clearSideConditions", target: "bothSides", conditions: BATTLE_SCRIPT_HAZARD_KEYS}, {kind: "clearSideConditions", target: "defenderSide", conditions: BATTLE_SCRIPT_DEFOG_SIDE_KEYS}],
	"Electric Terrain": [{kind: "terrain", terrain: "Electric"}],
	"Gravity": [{kind: "fieldEffect", fieldEffect: "gravity"}],
	"Grassy Terrain": [{kind: "terrain", terrain: "Grassy"}],
	"Hail": [{kind: "weather", weather: "Hail"}],
	"Light Screen": [{kind: "sideCondition", target: "attackerSide", condition: "lightscreen"}],
	"Lucky Chant": [{kind: "sideCondition", target: "attackerSide", condition: "luckychant"}],
	"Magic Room": [{kind: "fieldEffect", fieldEffect: "magicroom"}],
	"Mat Block": [{kind: "sideCondition", target: "attackerSide", condition: "matblock"}],
	"Mist": [{kind: "sideCondition", target: "attackerSide", condition: "mist"}],
	"Misty Terrain": [{kind: "terrain", terrain: "Misty"}],
	"Psychic Fangs": [{kind: "clearSideConditions", target: "defenderSide", conditions: BATTLE_SCRIPT_SCREEN_KEYS}],
	"Psychic Terrain": [{kind: "terrain", terrain: "Psychic"}],
	"Quick Guard": [{kind: "sideCondition", target: "attackerSide", condition: "quickguard"}],
	"Rain Dance": [{kind: "weather", weather: "Rain"}],
	"Rapid Spin": [{kind: "clearSideConditions", target: "attackerSide", conditions: BATTLE_SCRIPT_HAZARD_KEYS}],
	"Reflect": [{kind: "sideCondition", target: "attackerSide", condition: "reflect"}],
	"Safeguard": [{kind: "sideCondition", target: "attackerSide", condition: "safeguard"}],
	"Sandstorm": [{kind: "weather", weather: "Sand"}],
	"Snowscape": [{kind: "weather", weather: "Snow"}],
	"Spikes": [{kind: "sideCondition", target: "defenderSide", condition: "spikes", addLayer: true}],
	"Stealth Rock": [{kind: "sideCondition", target: "defenderSide", condition: "stealthrock"}],
	"Steel Roller": [{kind: "clearTerrain"}],
	"Sticky Web": [{kind: "sideCondition", target: "defenderSide", condition: "stickyweb"}],
	"Sunny Day": [{kind: "weather", weather: "Sun"}],
	"Tailwind": [{kind: "sideCondition", target: "attackerSide", condition: "tailwind"}],
	"Toxic Spikes": [{kind: "sideCondition", target: "defenderSide", condition: "toxicspikes", addLayer: true}],
	"Trick Room": [{kind: "fieldEffect", fieldEffect: "trickroom"}],
	"Wide Guard": [{kind: "sideCondition", target: "attackerSide", condition: "wideguard"}],
	"Wonder Room": [{kind: "fieldEffect", fieldEffect: "wonderroom"}]
};
var BATTLE_SCRIPT_MOVE_EFFECTS = {
	"Acid": [{kind: "boost", target: "defender", stat: "spd", amount: -1, chance: 10}],
	"Ancient Power": [{kind: "boost", target: "attacker", stat: "atk", amount: 1, chance: 10}, {kind: "boost", target: "attacker", stat: "def", amount: 1, chance: 10}, {kind: "boost", target: "attacker", stat: "spa", amount: 1, chance: 10}, {kind: "boost", target: "attacker", stat: "spd", amount: 1, chance: 10}, {kind: "boost", target: "attacker", stat: "spe", amount: 1, chance: 10}],
	"Apple Acid": [{kind: "boost", target: "defender", stat: "spd", amount: -1, chance: 100}],
	"Attract": [{kind: "volatile", target: "defender", volatile: "infatuation", chance: 100, requiresOppositeGender: true}],
	"Aurora Beam": [{kind: "boost", target: "defender", stat: "atk", amount: -1, chance: 10}],
	"Captivate": [{kind: "boost", target: "defender", stat: "spa", amount: -2, chance: 100, requiresOppositeGender: true}],
	"Baby-Doll Eyes": [{kind: "boost", target: "defender", stat: "atk", amount: -1, chance: 100}],
	"Blaze Kick": [{kind: "status", target: "defender", status: "brn", chance: 10}],
	"Blizzard": [{kind: "status", target: "defender", status: "frz", chance: 10}],
	"Blue Flare": [{kind: "status", target: "defender", status: "brn", chance: 20}],
	"Body Slam": [{kind: "status", target: "defender", status: "par", chance: 30}],
	"Bounce": [{kind: "status", target: "defender", status: "par", chance: 30}],
	"Breaking Swipe": [{kind: "boost", target: "defender", stat: "atk", amount: -1, chance: 100}],
	"Bubble": [{kind: "boost", target: "defender", stat: "spe", amount: -1, chance: 10}],
	"Bubble Beam": [{kind: "boost", target: "defender", stat: "spe", amount: -1, chance: 10}],
	"Bug Buzz": [{kind: "boost", target: "defender", stat: "spd", amount: -1, chance: 10}],
	"Bulldoze": [{kind: "boost", target: "defender", stat: "spe", amount: -1, chance: 100}],
	"Charge Beam": [{kind: "boost", target: "attacker", stat: "spa", amount: 1, chance: 70}],
	"Charm": [{kind: "boost", target: "defender", stat: "atk", amount: -2, chance: 100}],
	"Clanging Scales": [{kind: "boost", target: "attacker", stat: "def", amount: -1, chance: 100}],
	"Close Combat": [{kind: "boost", target: "attacker", stat: "def", amount: -1, chance: 100}, {kind: "boost", target: "attacker", stat: "spd", amount: -1, chance: 100}],
	"Coil": [{kind: "boost", target: "attacker", stat: "atk", amount: 1, chance: 100}, {kind: "boost", target: "attacker", stat: "def", amount: 1, chance: 100}, {kind: "accuracy", target: "attacker", amount: 1, chance: 100}],
	"Confide": [{kind: "boost", target: "defender", stat: "spa", amount: -1, chance: 100}],
	"Confusion": [{kind: "volatile", target: "defender", volatile: "confusion", chance: 10}],
	"Constrict": [{kind: "boost", target: "defender", stat: "spe", amount: -1, chance: 10}],
	"Cotton Spore": [{kind: "boost", target: "defender", stat: "spe", amount: -2, chance: 100}],
	"Crunch": [{kind: "boost", target: "defender", stat: "def", amount: -1, chance: 20}],
	"Crush Claw": [{kind: "boost", target: "defender", stat: "def", amount: -1, chance: 50}],
	"Dark Pulse": [{kind: "volatile", target: "defender", volatile: "flinch", chance: 20}],
	"Dragon Ascent": [{kind: "boost", target: "attacker", stat: "def", amount: -1, chance: 100}, {kind: "boost", target: "attacker", stat: "spd", amount: -1, chance: 100}],
	"Dragon Breath": [{kind: "status", target: "defender", status: "par", chance: 30}],
	"Dragon Rush": [{kind: "volatile", target: "defender", volatile: "flinch", chance: 20}],
	"Draco Meteor": [{kind: "boost", target: "attacker", stat: "spa", amount: -2, chance: 100}],
	"Dynamic Punch": [{kind: "volatile", target: "defender", volatile: "confusion", chance: 100}],
	"Earth Power": [{kind: "boost", target: "defender", stat: "spd", amount: -1, chance: 10}],
	"Eerie Impulse": [{kind: "boost", target: "defender", stat: "spa", amount: -2, chance: 100}],
	"Electroweb": [{kind: "boost", target: "defender", stat: "spe", amount: -1, chance: 100}],
	"Ember": [{kind: "status", target: "defender", status: "brn", chance: 10}],
	"Energy Ball": [{kind: "boost", target: "defender", stat: "spd", amount: -1, chance: 10}],
	"Fake Out": [{kind: "volatile", target: "defender", volatile: "flinch", chance: 100}],
	"Fake Tears": [{kind: "boost", target: "defender", stat: "spd", amount: -2, chance: 100}],
	"Feather Dance": [{kind: "boost", target: "defender", stat: "atk", amount: -2, chance: 100}],
	"Fiery Dance": [{kind: "boost", target: "attacker", stat: "spa", amount: 1, chance: 50}],
	"Fire Blast": [{kind: "status", target: "defender", status: "brn", chance: 10}],
	"Fire Fang": [{kind: "status", target: "defender", status: "brn", chance: 10}, {kind: "volatile", target: "defender", volatile: "flinch", chance: 10}],
	"Fire Lash": [{kind: "boost", target: "defender", stat: "def", amount: -1, chance: 100}],
	"Fire Punch": [{kind: "status", target: "defender", status: "brn", chance: 10}],
	"Flame Charge": [{kind: "boost", target: "attacker", stat: "spe", amount: 1, chance: 100}],
	"Flame Wheel": [{kind: "status", target: "defender", status: "brn", chance: 10}],
	"Flamethrower": [{kind: "status", target: "defender", status: "brn", chance: 10}],
	"Flare Blitz": [{kind: "status", target: "defender", status: "brn", chance: 10}],
	"Flash": [{kind: "accuracy", target: "defender", amount: -1, chance: 100}],
	"Flash Cannon": [{kind: "boost", target: "defender", stat: "spd", amount: -1, chance: 10}],
	"Fleur Cannon": [{kind: "boost", target: "attacker", stat: "spa", amount: -2, chance: 100}],
	"Focus Blast": [{kind: "boost", target: "defender", stat: "spd", amount: -1, chance: 10}],
	"Force Palm": [{kind: "status", target: "defender", status: "par", chance: 30}],
	"Freeze-Dry": [{kind: "status", target: "defender", status: "frz", chance: 10}],
	"Freezing Glare": [{kind: "status", target: "defender", status: "frz", chance: 10}],
	"Glare": [{kind: "status", target: "defender", status: "par", chance: 100}],
	"Grav Apple": [{kind: "boost", target: "defender", stat: "def", amount: -1, chance: 100}],
	"Growl": [{kind: "boost", target: "defender", stat: "atk", amount: -1, chance: 100}],
	"Gunk Shot": [{kind: "status", target: "defender", status: "psn", chance: 30}],
	"Hammer Arm": [{kind: "boost", target: "attacker", stat: "spe", amount: -1, chance: 100}],
	"Headbutt": [{kind: "volatile", target: "defender", volatile: "flinch", chance: 30}],
	"Heat Wave": [{kind: "status", target: "defender", status: "brn", chance: 10}],
	"Hone Claws": [{kind: "boost", target: "attacker", stat: "atk", amount: 1, chance: 100}, {kind: "accuracy", target: "attacker", amount: 1, chance: 100}],
	"Hurricane": [{kind: "volatile", target: "defender", volatile: "confusion", chance: 30}],
	"Hyper Fang": [{kind: "volatile", target: "defender", volatile: "flinch", chance: 10}],
	"Hypnosis": [{kind: "status", target: "defender", status: "slp", chance: 100}],
	"Ice Beam": [{kind: "status", target: "defender", status: "frz", chance: 10}],
	"Ice Fang": [{kind: "status", target: "defender", status: "frz", chance: 10}, {kind: "volatile", target: "defender", volatile: "flinch", chance: 10}],
	"Ice Punch": [{kind: "status", target: "defender", status: "frz", chance: 10}],
	"Icy Wind": [{kind: "boost", target: "defender", stat: "spe", amount: -1, chance: 100}],
	"Iron Head": [{kind: "volatile", target: "defender", volatile: "flinch", chance: 30}],
	"Iron Tail": [{kind: "boost", target: "defender", stat: "def", amount: -1, chance: 30}],
	"Kinesis": [{kind: "accuracy", target: "defender", amount: -1, chance: 100}],
	"Lava Plume": [{kind: "status", target: "defender", status: "brn", chance: 30}],
	"Leaf Storm": [{kind: "boost", target: "attacker", stat: "spa", amount: -2, chance: 100}],
	"Leer": [{kind: "boost", target: "defender", stat: "def", amount: -1, chance: 100}],
	"Lick": [{kind: "status", target: "defender", status: "par", chance: 30}],
	"Low Sweep": [{kind: "boost", target: "defender", stat: "spe", amount: -1, chance: 100}],
	"Lunge": [{kind: "boost", target: "defender", stat: "atk", amount: -1, chance: 100}],
	"Luster Purge": [{kind: "boost", target: "defender", stat: "spd", amount: -1, chance: 50}],
	"Metal Claw": [{kind: "boost", target: "attacker", stat: "atk", amount: 1, chance: 10}],
	"Metal Sound": [{kind: "boost", target: "defender", stat: "spd", amount: -2, chance: 100}],
	"Meteor Mash": [{kind: "boost", target: "attacker", stat: "atk", amount: 1, chance: 20}],
	"Memento": [{kind: "boost", target: "defender", stat: "atk", amount: -2, chance: 100}, {kind: "boost", target: "defender", stat: "spa", amount: -2, chance: 100}, {kind: "self-faint", target: "attacker", chance: 100}],
	"Mist Ball": [{kind: "boost", target: "defender", stat: "spa", amount: -1, chance: 50}],
	"Mirror Shot": [{kind: "accuracy", target: "defender", amount: -1, chance: 30}],
	"Moonblast": [{kind: "boost", target: "defender", stat: "spa", amount: -1, chance: 30}],
	"Mud Bomb": [{kind: "accuracy", target: "defender", amount: -1, chance: 30}],
	"Mud Shot": [{kind: "boost", target: "defender", stat: "spe", amount: -1, chance: 100}],
	"Mud-Slap": [{kind: "accuracy", target: "defender", amount: -1, chance: 100}],
	"Muddy Water": [{kind: "accuracy", target: "defender", amount: -1, chance: 30}],
	"Mystical Fire": [{kind: "boost", target: "defender", stat: "spa", amount: -1, chance: 100}],
	"Noble Roar": [{kind: "boost", target: "defender", stat: "atk", amount: -1, chance: 100}, {kind: "boost", target: "defender", stat: "spa", amount: -1, chance: 100}],
	"Nuzzle": [{kind: "status", target: "defender", status: "par", chance: 100}],
	"Octazooka": [{kind: "accuracy", target: "defender", amount: -1, chance: 50}],
	"Ominous Wind": [{kind: "boost", target: "attacker", stat: "atk", amount: 1, chance: 10}, {kind: "boost", target: "attacker", stat: "def", amount: 1, chance: 10}, {kind: "boost", target: "attacker", stat: "spa", amount: 1, chance: 10}, {kind: "boost", target: "attacker", stat: "spd", amount: 1, chance: 10}, {kind: "boost", target: "attacker", stat: "spe", amount: 1, chance: 10}],
	"Overheat": [{kind: "boost", target: "attacker", stat: "spa", amount: -2, chance: 100}],
	"Parting Shot": [{kind: "boost", target: "defender", stat: "atk", amount: -1, chance: 100}, {kind: "boost", target: "defender", stat: "spa", amount: -1, chance: 100}],
	"Play Nice": [{kind: "boost", target: "defender", stat: "atk", amount: -1, chance: 100}],
	"Play Rough": [{kind: "boost", target: "defender", stat: "atk", amount: -1, chance: 10}],
	"Poison Fang": [{kind: "status", target: "defender", status: "tox", chance: 50}],
	"Poison Gas": [{kind: "status", target: "defender", status: "psn", chance: 100}],
	"Poison Jab": [{kind: "status", target: "defender", status: "psn", chance: 30}],
	"Poison Powder": [{kind: "status", target: "defender", status: "psn", chance: 100}],
	"Poison Sting": [{kind: "status", target: "defender", status: "psn", chance: 30}],
	"Poison Tail": [{kind: "status", target: "defender", status: "psn", chance: 10}],
	"Powder Snow": [{kind: "status", target: "defender", status: "frz", chance: 10}],
	"Power-Up Punch": [{kind: "boost", target: "attacker", stat: "atk", amount: 1, chance: 100}],
	"Psybeam": [{kind: "volatile", target: "defender", volatile: "confusion", chance: 10}],
	"Psychic": [{kind: "boost", target: "defender", stat: "spd", amount: -1, chance: 10}],
	"Psycho Boost": [{kind: "boost", target: "attacker", stat: "spa", amount: -2, chance: 100}],
	"Rock Climb": [{kind: "volatile", target: "defender", volatile: "confusion", chance: 20}],
	"Rock Smash": [{kind: "boost", target: "defender", stat: "def", amount: -1, chance: 50}],
	"Rock Slide": [{kind: "volatile", target: "defender", volatile: "flinch", chance: 30}],
	"Rock Tomb": [{kind: "boost", target: "defender", stat: "spe", amount: -1, chance: 100}],
	"Sacred Fire": [{kind: "status", target: "defender", status: "brn", chance: 50}],
	"Sand Attack": [{kind: "accuracy", target: "defender", amount: -1, chance: 100}],
	"Scald": [{kind: "status", target: "defender", status: "brn", chance: 30}],
	"Scary Face": [{kind: "boost", target: "defender", stat: "spe", amount: -2, chance: 100}],
	"Screech": [{kind: "boost", target: "defender", stat: "def", amount: -2, chance: 100}],
	"Seed Flare": [{kind: "boost", target: "defender", stat: "spd", amount: -2, chance: 40}],
	"Shadow Ball": [{kind: "boost", target: "defender", stat: "spd", amount: -1, chance: 20}],
	"Signal Beam": [{kind: "volatile", target: "defender", volatile: "confusion", chance: 10}],
	"Silver Wind": [{kind: "boost", target: "attacker", stat: "atk", amount: 1, chance: 10}, {kind: "boost", target: "attacker", stat: "def", amount: 1, chance: 10}, {kind: "boost", target: "attacker", stat: "spa", amount: 1, chance: 10}, {kind: "boost", target: "attacker", stat: "spd", amount: 1, chance: 10}, {kind: "boost", target: "attacker", stat: "spe", amount: 1, chance: 10}],
	"Sky Attack": [{kind: "volatile", target: "defender", volatile: "flinch", chance: 30}],
	"Sleep Powder": [{kind: "status", target: "defender", status: "slp", chance: 100}],
	"Sludge": [{kind: "status", target: "defender", status: "psn", chance: 30}],
	"Sludge Bomb": [{kind: "status", target: "defender", status: "psn", chance: 30}],
	"Smog": [{kind: "status", target: "defender", status: "psn", chance: 40}],
	"Snarl": [{kind: "boost", target: "defender", stat: "spa", amount: -1, chance: 100}],
	"Spark": [{kind: "status", target: "defender", status: "par", chance: 30}],
	"Spirit Break": [{kind: "boost", target: "defender", stat: "spa", amount: -1, chance: 100}],
	"Spore": [{kind: "status", target: "defender", status: "slp", chance: 100}],
	"Steam Eruption": [{kind: "status", target: "defender", status: "brn", chance: 30}],
	"Steel Wing": [{kind: "boost", target: "attacker", stat: "def", amount: 1, chance: 10}],
	"Stomp": [{kind: "volatile", target: "defender", volatile: "flinch", chance: 30}],
	"String Shot": [{kind: "boost", target: "defender", stat: "spe", amount: -2, chance: 100}],
	"Struggle Bug": [{kind: "boost", target: "defender", stat: "spa", amount: -1, chance: 100}],
	"Superpower": [{kind: "boost", target: "attacker", stat: "atk", amount: -1, chance: 100}, {kind: "boost", target: "attacker", stat: "def", amount: -1, chance: 100}],
	"Tail Whip": [{kind: "boost", target: "defender", stat: "def", amount: -1, chance: 100}],
	"Tearful Look": [{kind: "boost", target: "defender", stat: "atk", amount: -1, chance: 100}, {kind: "boost", target: "defender", stat: "spa", amount: -1, chance: 100}],
	"Thunder": [{kind: "status", target: "defender", status: "par", chance: 30}],
	"Thunder Fang": [{kind: "status", target: "defender", status: "par", chance: 10}, {kind: "volatile", target: "defender", volatile: "flinch", chance: 10}],
	"Thunder Punch": [{kind: "status", target: "defender", status: "par", chance: 10}],
	"Thunder Shock": [{kind: "status", target: "defender", status: "par", chance: 10}],
	"Thunder Wave": [{kind: "status", target: "defender", status: "par", chance: 100}],
	"Thunderbolt": [{kind: "status", target: "defender", status: "par", chance: 10}],
	"Tickle": [{kind: "boost", target: "defender", stat: "atk", amount: -1, chance: 100}, {kind: "boost", target: "defender", stat: "def", amount: -1, chance: 100}],
	"Toxic": [{kind: "status", target: "defender", status: "tox", chance: 100}],
	"Tri Attack": [{kind: "status", target: "defender", status: "brn", chance: 6.67}, {kind: "status", target: "defender", status: "frz", chance: 6.67}, {kind: "status", target: "defender", status: "par", chance: 6.67}],
	"Twineedle": [{kind: "status", target: "defender", status: "psn", chance: 20}],
	"V-create": [{kind: "boost", target: "attacker", stat: "def", amount: -1, chance: 100}, {kind: "boost", target: "attacker", stat: "spd", amount: -1, chance: 100}, {kind: "boost", target: "attacker", stat: "spe", amount: -1, chance: 100}],
	"Water Pulse": [{kind: "volatile", target: "defender", volatile: "confusion", chance: 20}],
	"Will-O-Wisp": [{kind: "status", target: "defender", status: "brn", chance: 100}],
	"Zap Cannon": [{kind: "status", target: "defender", status: "par", chance: 100}]
};
var battleScriptAutocompleteIndex = 0;
var battleScriptAutocompleteItems = [];
var battleScriptAIModel = BATTLE_SCRIPT_DEFAULT_AI_MODEL;
var battleScriptCraftDots = 0;
var battleScriptCraftAnimationTarget = "#battle-script-craft-status";
var battleScriptCraftLines = [];
var battleScriptCraftLastQuip = "";
var battleScriptCraftQuip = BATTLE_SCRIPT_CRAFT_QUIP_SEEDS[0];
var battleScriptCraftQuipBag = [];
var battleScriptCraftQuipList = BATTLE_SCRIPT_CRAFT_QUIPS;
var battleScriptCraftBuildingSearch = null;
var battleScriptCraftSearch = null;
var battleScriptCraftSuggestions = [];
var battleScriptCraftTimer = null;
var battleScriptDragState = null;
var battleScriptHasCalculatedSinceOpen = false;
var battleScriptLoadedCraftLineReasons = {};
var battleScriptLoadedCraftScriptText = "";
var battleScriptMessages = [];
var battleScriptItemNameMap = null;
var battleScriptMoveEffectLibrary = {};
var battleScriptMoveEffectLibraryGen = null;
var battleScriptResizeObserver = null;
var battleScriptRuntimeState = null;
var battleScriptTeamObserver = null;
var BATTLE_SCRIPT_STATUS_HEAL_ITEMS = {
	cheriberry: ["par"],
	chestoberry: ["slp"],
	pechaberry: ["psn", "tox"],
	rawstberry: ["brn"],
	aspearberry: ["frz"],
	persimberry: ["confusion"],
	lumberry: ["brn", "frz", "par", "psn", "slp", "tox"]
};
var BATTLE_SCRIPT_CONFUSION_ITEMS = {
	aguavberry: true,
	figyberry: true,
	iapapaberry: true,
	magoberry: true,
	wikiberry: true
};
var BATTLE_SCRIPT_PINCH_HEAL_BERRIES = {
	aguavberry: true,
	figyberry: true,
	iapapaberry: true,
	magoberry: true,
	wikiberry: true
};
var BATTLE_SCRIPT_RESIST_BERRIES = {
	babiriberry: "Steel",
	chartiberry: "Rock",
	chilanberry: "Normal",
	chopleberry: "Fighting",
	cobaberry: "Flying",
	colburberry: "Dark",
	habanberry: "Dragon",
	kasibberry: "Ghost",
	kebiaberry: "Poison",
	occaberry: "Fire",
	passhoberry: "Water",
	payapaberry: "Psychic",
	rindoberry: "Grass",
	roseliberry: "Fairy",
	shucaberry: "Ground",
	tangaberry: "Bug",
	wacanberry: "Electric",
	yacheberry: "Ice"
};
var BATTLE_SCRIPT_PINCH_STAT_BERRIES = {
	liechiberry: "atk",
	ganlonberry: "def",
	petayaberry: "spa",
	apicotberry: "spd",
	salacberry: "spe"
};
var BATTLE_SCRIPT_TERRAIN_SEEDS = {
	electricseed: {terrain: "Electric", stat: "def"},
	grassyseed: {terrain: "Grassy", stat: "def"},
	mistyseed: {terrain: "Misty", stat: "spd"},
	psychicseed: {terrain: "Psychic", stat: "spd"}
};
var BATTLE_SCRIPT_DAMAGE_TRIGGER_ITEMS = {
	absorbbulb: {type: "Water", stat: "spa", amount: 1},
	cellbattery: {type: "Electric", stat: "atk", amount: 1},
	luminousmoss: {type: "Water", stat: "spd", amount: 1},
	snowball: {type: "Ice", stat: "atk", amount: 1}
};
var BATTLE_SCRIPT_NON_BATTLE_HOLD_EFFECTS = {
	52: true, // Soothe Bell
	57: true, // Amulet Coin / Luck Incense
	58: true, // Cleanse Tag / Pure Incense
	62: true, // Smoke Ball
	63: true, // Everstone
	65: true, // Lucky Egg
	69: true, // Dragon Scale
	86: true, // Upgrade
	141: true, // Protector
	142: true, // Electirizer
	143: true, // Magmarizer
	144: true, // Dubious Disc
	145: true // Reaper Cloth
};
var BATTLE_SCRIPT_EXPLICIT_BATTLE_ITEM_KEYS = {
	blunderpolicy: true,
	ejectpack: true,
	heavydutyboots: true,
	protectivepads: true,
	roomservice: true,
	safetygoggles: true,
	terrainextender: true,
	throatspray: true,
	utilityumbrella: true
};
var BATTLE_SCRIPT_POWDER_MOVES = {
	"Cotton Spore": true,
	"Poison Powder": true,
	"Powder": true,
	"Rage Powder": true,
	"Sleep Powder": true,
	"Spore": true,
	"Stun Spore": true
};

function normalizeBattleScriptText(text) {
	return (text || "").toString().toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function getBattleScriptItemNameMap() {
	var runtimeIndex;
	if (battleScriptItemNameMap) return battleScriptItemNameMap;
	runtimeIndex = window.royalSwordRuntimeIndex && window.royalSwordRuntimeIndex.getGeneration ?
		window.royalSwordRuntimeIndex.getGeneration(9) : null;
	if (runtimeIndex && runtimeIndex.itemsById) {
		battleScriptItemNameMap = runtimeIndex.itemsById;
		return battleScriptItemNameMap;
	}
	battleScriptItemNameMap = {};
	var items = calc && calc.ITEMS ? calc.ITEMS[9] : [];
	for (var i = 0; i < items.length; i++) battleScriptItemNameMap[normalizeBattleScriptText(items[i])] = items[i];
	return battleScriptItemNameMap;
}

function getBattleScriptKnownItemName(itemName) {
	var normalized = normalizeBattleScriptText(itemName);
	if (!normalized) return "";
	return getBattleScriptItemNameMap()[normalized] || "";
}

function readBattleScriptStoredImportedBagItems() {
	var storage = getBattleScriptStorage();
	if (!storage) return [];
	var raw = storage.getItem(BATTLE_SCRIPT_IMPORTED_BAG_ITEMS_KEY);
	var usedLegacyKey = false;
	if (!raw) {
		raw = storage.getItem(BATTLE_SCRIPT_LEGACY_IMPORTED_BAG_ITEMS_KEY);
		usedLegacyKey = !!raw;
	}
	if (!raw) return [];
	try {
		var items = JSON.parse(raw);
		if (!$.isArray(items)) return [];
		if (usedLegacyKey) {
			storage.setItem(BATTLE_SCRIPT_IMPORTED_BAG_ITEMS_KEY, JSON.stringify(items));
			storage.removeItem(BATTLE_SCRIPT_LEGACY_IMPORTED_BAG_ITEMS_KEY);
		}
		return items;
	} catch (e) {
		if (usedLegacyKey) storage.removeItem(BATTLE_SCRIPT_LEGACY_IMPORTED_BAG_ITEMS_KEY);
		return [];
	}
}

function getBattleScriptImportedPlayerBagItems() {
	var rawItems = [];
	var hasProfileReader = typeof window.getImportedPlayerBagItems === "function";
	var counts = {};
	var items = [];
	if (hasProfileReader) {
		rawItems = window.getImportedPlayerBagItems();
	}
	if (!$.isArray(rawItems)) rawItems = [];
	if (!rawItems.length && !hasProfileReader) rawItems = readBattleScriptStoredImportedBagItems();
	if (!$.isArray(rawItems)) rawItems = [];
	for (var i = 0; i < rawItems.length; i++) {
		var rawItem = rawItems[i];
		var name = getBattleScriptKnownItemName(typeof rawItem === "string" ? rawItem : rawItem && rawItem.name);
		var count = typeof rawItem === "string" ? 1 : Math.max(0, ~~(rawItem && rawItem.count));
		if (!name || !count) continue;
		counts[name] = (counts[name] || 0) + count;
	}
	for (var itemName in counts) {
		if (Object.prototype.hasOwnProperty.call(counts, itemName)) items.push({name: itemName, count: counts[itemName]});
	}
	items.sort(function (a, b) {
		return a.name.localeCompare(b.name);
	});
	return items;
}

function getBattleScriptImportedPlayerBagItemCounts() {
	var items = getBattleScriptImportedPlayerBagItems();
	var counts = {};
	for (var i = 0; i < items.length; i++) counts[items[i].name] = items[i].count;
	return counts;
}

function hasBattleScriptRosterAllHeldItems(roster) {
	if (!roster || !roster.length) return false;
	for (var i = 0; i < (roster || []).length; i++) {
		if (!roster[i] || !roster[i].pokemon || !roster[i].pokemon.item) return false;
	}
	return true;
}

function hasBattleScriptCraftPlayerItemSource(baseRosters) {
	if (getBattleScriptImportedPlayerBagItems().length) return true;
	return hasBattleScriptRosterAllHeldItems(baseRosters && baseRosters.player);
}

function findBattleScriptImportedBagItemName(query) {
	var normalized = normalizeBattleScriptText(query);
	var items = getBattleScriptImportedPlayerBagItems();
	if (!normalized) return "";
	for (var i = 0; i < items.length; i++) {
		if (normalizeBattleScriptText(items[i].name) === normalized) return items[i].name;
	}
	for (var j = 0; j < items.length; j++) {
		if (normalizeBattleScriptText(items[j].name).indexOf(normalized) !== -1) return items[j].name;
	}
	return "";
}

function normalizeBattleScriptGender(gender) {
	var normalized = normalizeBattleScriptText(gender);
	if (normalized === "m" || normalized === "male") return "M";
	if (normalized === "f" || normalized === "female") return "F";
	if (normalized === "n" || normalized === "genderless" || normalized === "none") return "N";
	return "";
}

function getBattleScriptGenderText(gender) {
	gender = normalizeBattleScriptGender(gender);
	if (gender === "M") return "Male";
	if (gender === "F") return "Female";
	if (gender === "N") return "Genderless";
	return "";
}

function parseBattleScriptPokemonFormat(text) {
	var raw = $.trim(text || "");
	var name = raw;
	var item = "";
	var itemText = "";
	var gender = "";
	var match;
	var knownItem;
	match = name.match(/\s*\[([^\]]+)\]\s*/);
	if (match) {
		itemText = $.trim(match[1] || "");
		knownItem = getBattleScriptKnownItemName(itemText);
		if (knownItem) {
			item = knownItem;
			name = $.trim(name.slice(0, match.index) + " " + name.slice(match.index + match[0].length));
		} else {
			itemText = "";
		}
	}
	match = name.match(/\s+\((M|F|N|Male|Female|Genderless)\)\s*$/i);
	if (match) {
		gender = normalizeBattleScriptGender(match[1]);
		name = $.trim(name.slice(0, match.index));
	}
	return {
		raw: raw,
		name: name || raw,
		item: item,
		itemText: itemText,
		gender: gender
	};
}

function addBattleScriptFormattedAliases(aliases, name, gender, item) {
	var genderSuffix = gender && gender !== "N" ? " (" + gender + ")" : "";
	addBattleScriptAlias(aliases, name);
	if (genderSuffix) addBattleScriptAlias(aliases, name + genderSuffix);
	if (item) {
		addBattleScriptAlias(aliases, name + " [" + item + "]");
		if (genderSuffix) addBattleScriptAlias(aliases, name + genderSuffix + " [" + item + "]");
		if (genderSuffix) addBattleScriptAlias(aliases, name + " [" + item + "]" + genderSuffix);
	}
}

function addBattleScriptPokemonFormatAliases(aliases, text) {
	var parsed = parseBattleScriptPokemonFormat(text);
	var parenIndex = (parsed.name || "").indexOf(" (");
	addBattleScriptFormattedAliases(aliases, parsed.raw, parsed.gender, parsed.item);
	addBattleScriptFormattedAliases(aliases, parsed.name, parsed.gender, parsed.item);
	if (parenIndex !== -1) addBattleScriptFormattedAliases(aliases, parsed.name.substring(0, parenIndex), parsed.gender, parsed.item);
}

function getBattleScriptPokemonCommandName(entry) {
	var pokemon = entry && entry.pokemon ? entry.pokemon : null;
	var label = entry && entry.label ? entry.label : (pokemon && pokemon.name ? pokemon.name : "");
	var parsed = parseBattleScriptPokemonFormat(label);
	var name = parsed.name || label;
	var item = pokemon ? pokemon.item || "" : "";
	if (name && item) name += " [" + item + "]";
	return name;
}

function refreshBattleScriptEntryItemAliases(entry) {
	var pokemon = entry && entry.pokemon ? entry.pokemon : null;
	var item = pokemon ? pokemon.item || "" : "";
	var gender = pokemon ? pokemon.gender || "" : "";
	var label = parseBattleScriptPokemonFormat(entry && entry.label).name || (entry && entry.label) || "";
	if (!entry || !entry.aliases || !item) return;
	addBattleScriptFormattedAliases(entry.aliases, label, gender, item);
	addBattleScriptFormattedAliases(entry.aliases, pokemon.name, gender, item);
	addBattleScriptFormattedAliases(entry.aliases, entry.source, gender, item);
}

function battleScriptEntryMatchesGender(entry, gender) {
	gender = normalizeBattleScriptGender(gender);
	if (!gender) return true;
	return entry && entry.pokemon && normalizeBattleScriptGender(entry.pokemon.gender) === gender;
}

function battleScriptEntryMatchesQuery(entry, parsedQuery, normalized) {
	if (!entry || !parsedQuery) return false;
	if (!battleScriptEntryMatchesGender(entry, parsedQuery.gender)) return false;
	return !!(entry.aliases[normalized] || entry.aliases[normalizeBattleScriptText(parsedQuery.name)]);
}

function getBattleScriptAssignedBagItemCount(state, itemName) {
	return state && state.assignedBagItems && state.assignedBagItems[itemName] ? state.assignedBagItems[itemName] : 0;
}

function getBattleScriptAvailableBagItemCount(state, itemName) {
	var counts = getBattleScriptImportedPlayerBagItemCounts();
	return Math.max(0, (counts[itemName] || 0) - getBattleScriptAssignedBagItemCount(state, itemName));
}

function releaseBattleScriptAssignedBagItem(state, entry) {
	var currentItem;
	if (!entry || !entry.bagItemAssigned || !entry.assignedBagItem || !state || !state.assignedBagItems) return;
	currentItem = entry.pokemon ? entry.pokemon.item || "" : "";
	if (currentItem === entry.assignedBagItem) {
		state.assignedBagItems[entry.assignedBagItem] = Math.max(0, (state.assignedBagItems[entry.assignedBagItem] || 0) - 1);
	}
	entry.bagItemAssigned = false;
	entry.assignedBagItem = "";
}

function assignBattleScriptBagItem(state, entry, itemName) {
	if (!state || !entry || !entry.pokemon || !itemName) return false;
	if (entry.bagItemAssigned && entry.assignedBagItem === itemName) return entry.pokemon.item === itemName;
	if (!entry.bagItemAssigned && entry.pokemon.item === itemName) return true;
	if (!state.assignedBagItems) state.assignedBagItems = {};
	releaseBattleScriptAssignedBagItem(state, entry);
	if (getBattleScriptAvailableBagItemCount(state, itemName) <= 0) return false;
	if (typeof entry.originalItem === "undefined") entry.originalItem = entry.pokemon.item || "";
	entry.pokemon.item = itemName;
	entry.bagItemAssigned = true;
	entry.assignedBagItem = itemName;
	state.assignedBagItems[itemName] = (state.assignedBagItems[itemName] || 0) + 1;
	refreshBattleScriptEntryItemAliases(entry);
	return true;
}

function consumeBattleScriptHeldItem(entry) {
	var item = entry && entry.pokemon ? entry.pokemon.item || "" : "";
	if (!item) return "";
	entry.pokemon.item = "";
	entry.consumedItem = item;
	if (isBattleScriptBerryItemName(item)) entry.belchBerryConsumed = true;
	refreshBattleScriptEntryItemAliases(entry);
	return item;
}

function cloneBattleScriptPokemon(pokemon) {
	return pokemon && typeof pokemon.clone === "function" ? pokemon.clone() : pokemon;
}

function setBattleScriptCalcPokemonHP(pokemon, currentHP) {
	var maxHP;
	var rawMaxHP;
	var factor;
	if (!pokemon || typeof pokemon.maxHP !== "function" || typeof currentHP !== "number") return pokemon;
	maxHP = pokemon.maxHP();
	currentHP = Math.max(0, Math.min(maxHP, Math.round(currentHP)));
	if (pokemon.isDynamaxed && pokemon.rawStats && pokemon.rawStats.hp && typeof pokemon.maxHP === "function") {
		rawMaxHP = pokemon.maxHP(true);
		factor = rawMaxHP ? maxHP / rawMaxHP : 1;
		pokemon.originalCurHP = currentHP <= 0 ? 0 : Math.max(1, Math.min(rawMaxHP, Math.floor(currentHP / factor)));
	} else {
		pokemon.originalCurHP = currentHP;
	}
	return pokemon;
}

function cloneBattleScriptPokemonAtHP(pokemon, currentHP) {
	return setBattleScriptCalcPokemonHP(cloneBattleScriptPokemon(pokemon), currentHP);
}

function getBattleScriptPokemonMaxHP(pokemon) {
	return pokemon && typeof pokemon.maxHP === "function" ? pokemon.maxHP() : 0;
}

function getBattleScriptPokemonCurrentHP(pokemon) {
	return pokemon && typeof pokemon.curHP === "function" ? pokemon.curHP() : getBattleScriptPokemonMaxHP(pokemon);
}

function getBattleScriptHPText(range, maxHP) {
	if (!range || !maxHP) return "unknown HP";
	var minPercent = Math.max(0, Math.round(range.min * 1000 / maxHP) / 10);
	var maxPercent = Math.max(0, Math.round(range.max * 1000 / maxHP) / 10);
	if (range.min === range.max) return range.min + "/" + maxHP + " (" + minPercent + "%)";
	return range.min + " to " + range.max + "/" + maxHP + " (" + minPercent + " to " + maxPercent + "%)";
}

function getBattleScriptDamageRange(result, move) {
	if (result && result.battleScriptDamageRange) {
		return {
			min: result.battleScriptDamageRange.min,
			max: result.battleScriptDamageRange.max
		};
	}
	if (!result || typeof result.range !== "function") return null;
	var range = result.range();
	var hits = move && move.hits ? move.hits : 1;
	return {
		min: Math.max(0, range[0] * hits),
		max: Math.max(0, range[1] * hits)
	};
}

function getBattleScriptDamageRolls(result, move) {
	if (result && result.battleScriptDamageRolls) return result.battleScriptDamageRolls.slice(0);
	var damage = result ? result.damage : null;
	var hits = move && move.hits ? move.hits : 1;
	var rolls = [];
	var sum = 0;
	if (typeof damage === "number") return [damage * hits];
	if (!$.isArray(damage) || !damage.length) return rolls;
	if (typeof damage[0] === "number") {
		if (damage.length >= 16) {
			for (var i = 0; i < damage.length; i++) rolls.push(damage[i] * hits);
			return rolls;
		}
		for (var j = 0; j < damage.length; j++) sum += damage[j];
		return [sum * hits];
	}
	if ($.isArray(damage[0])) {
		var range = getBattleScriptDamageRange(result, move);
		if (range) return [range.min, range.max];
	}
	return rolls;
}

function getBattleScriptMoveDamageResult(attackerSide, attackerState, defenderState, move, state, options) {
	var blockedReason = getBattleScriptChargeBlockedReason(attackerState, defenderState, move, state);
	var damageAttacker = attackerState;
	var attackerHPValues;
	var defenderHPValues;
	var results = [];
	var result;
	if (blockedReason) {
		return {
			result: createBattleScriptZeroDamageResult(blockedReason),
			damage: createBattleScriptZeroDamage(blockedReason)
		};
	}
	if (!options || !options.forceChargeResolve) {
		if (requiresBattleScriptChargeTurn(attackerState, move, state)) {
			return {
				result: createBattleScriptZeroDamageResult(move.name + " is charging"),
				damage: createBattleScriptZeroDamage(move.name + " is charging")
			};
		}
	}
	if (options && options.previewChargeStartEffects) {
		damageAttacker = cloneBattleScriptRosterEntry(attackerState) || attackerState;
		applyBattleScriptChargeStartEffects(damageAttacker, move);
	}
	attackerHPValues = getBattleScriptHPValuesForDamage(damageAttacker);
	defenderHPValues = getBattleScriptHPValuesForDamage(defenderState);
	for (var attackerIndex = 0; attackerIndex < attackerHPValues.length; attackerIndex++) {
		for (var defenderIndex = 0; defenderIndex < defenderHPValues.length; defenderIndex++) {
			results.push(calculateBattleScriptDamage(attackerSide, damageAttacker.pokemon, defenderState.pokemon, move, state, {
				attackerHP: attackerHPValues[attackerIndex],
				defenderHP: defenderHPValues[defenderIndex]
			}));
		}
	}
	result = results.length === 1 ? results[0] : createBattleScriptAggregateDamageResult(results, move);
	return {
		result: result,
		damage: getBattleScriptDamageRange(result, move)
	};
}

function getBattleScriptKOChanceInfo(result, damage, targetState, attackerState, defenderState, move, state) {
	var accuracy = getBattleScriptEffectiveAccuracy(move, attackerState, defenderState, state);
	var targetHP = targetState && targetState.hp ? targetState.hp.max : 0;
	var rolls;
	var koRolls = 0;
	var damageKOChance = 0;
	var finalKOChance;
	var riskText = "";
	if (!damage || !targetHP || damage.max < targetHP) {
		return {
			koChance: 0,
			damageKOChance: 0,
			accuracy: accuracy,
			riskText: ""
		};
	}
	if (damage.min >= targetHP) {
		damageKOChance = 1;
	} else {
		rolls = getBattleScriptDamageRolls(result, move);
		if (rolls.length) {
			for (var i = 0; i < rolls.length; i++) {
				if (rolls[i] >= targetHP) koRolls++;
			}
			damageKOChance = koRolls / rolls.length;
		} else {
			damageKOChance = 0.5;
		}
	}
	finalKOChance = damageKOChance * accuracy.chance;
	if (finalKOChance > 0 && finalKOChance < 1) {
		var pieces = [];
		if (damageKOChance < 1) pieces.push(formatBattleScriptChanceValue(damageKOChance) + " damage rolls KO");
		if (accuracy.chance < 1) pieces.push(formatBattleScriptChanceValue(accuracy.chance) + " effective accuracy" + (accuracy.text ? " from " + accuracy.text : ""));
		riskText = formatBattleScriptChanceValue(1 - finalKOChance) + " chance not to KO" + (pieces.length ? " (" + pieces.join("; ") + ")" : "");
	}
	return {
		koChance: finalKOChance,
		damageKOChance: damageKOChance,
		accuracy: accuracy,
		riskText: riskText
	};
}

function getBattleScriptDamageText(damage, defender) {
	var maxHP = getBattleScriptPokemonMaxHP(defender);
	if (!damage || !maxHP) return "unknown damage";
	var minPercent = Math.round(damage.min * 1000 / maxHP) / 10;
	var maxPercent = Math.round(damage.max * 1000 / maxHP) / 10;
	if (damage.min === damage.max) return damage.min + " HP (" + minPercent + "%)";
	return damage.min + " to " + damage.max + " HP (" + minPercent + " to " + maxPercent + "%)";
}

function getBattleScriptRisk(damage, targetState) {
	if (!damage || !targetState || !targetState.hp || !targetState.maxHP) return "Unknown";
	if (damage.min >= targetState.hp.max) return "Guaranteed KO";
	if (damage.max >= targetState.hp.min) return "KO risk";
	var percent = damage.max / targetState.maxHP;
	if (percent >= 0.5) return "High";
	if (percent >= 0.25) return "Medium";
	return "Low";
}

function getBattleScriptModifiedStat(baseValue, boost) {
	if (!baseValue) return 0;
	boost = boost || 0;
	if (boost > 0) return Math.floor(baseValue * (2 + boost) / 2);
	if (boost < 0) return Math.floor(baseValue * 2 / (2 - boost));
	return baseValue;
}

function getBattleScriptStateWeather(state) {
	return state && state.weather ? state.weather : "";
}

function getBattleScriptStateTerrain(state) {
	return state && state.terrain ? state.terrain : "";
}

function normalizeBattleScriptWeatherName(value) {
	var normalized = normalizeBattleScriptText(value);
	var names = {
		clear: "",
		heavyrain: "Heavy Rain",
		heavyrains: "Heavy Rain",
		hail: "Hail",
		harshsun: "Harsh Sunshine",
		harshsunlight: "Harsh Sunshine",
		harshsunshine: "Harsh Sunshine",
		none: "",
		noweather: "",
		rain: "Rain",
		raindance: "Rain",
		sand: "Sand",
		sandstorm: "Sand",
		snow: "Snow",
		snowscape: "Snow",
		strongwinds: "Strong Winds",
		sun: "Sun",
		sunny: "Sun",
		sunnyday: "Sun"
	};
	if (Object.prototype.hasOwnProperty.call(names, normalized)) return names[normalized];
	return $.trim(value || "");
}

function normalizeBattleScriptTerrainName(value) {
	var normalized = normalizeBattleScriptText(value);
	var names = {
		clear: "",
		electric: "Electric",
		electricterrain: "Electric",
		grassy: "Grassy",
		grassyterrain: "Grassy",
		misty: "Misty",
		mistyterrain: "Misty",
		none: "",
		noterrain: "",
		psychic: "Psychic",
		psychicterrain: "Psychic"
	};
	if (Object.prototype.hasOwnProperty.call(names, normalized)) return names[normalized];
	return $.trim(value || "");
}

function getBattleScriptTimedFieldValue(text, normalizeFn) {
	var raw = $.trim(text || "");
	var match = raw.match(/^(.*?)(?:\s*\(?\s*(\d+)\s*(?:turns?)?\s*\)?)$/i);
	var turns = 0;
	var valueText = raw;
	if (match && $.trim(match[1] || "")) {
		valueText = $.trim(match[1] || "");
		turns = Math.max(0, ~~match[2]);
	}
	return {
		value: normalizeFn(valueText),
		turns: turns
	};
}

function getBattleScriptWeatherTurns(entry, weather) {
	var itemName = entry && entry.pokemon ? entry.pokemon.item || "" : "";
	if (!weather || BATTLE_SCRIPT_PERMANENT_WEATHERS[weather]) return 0;
	if (BATTLE_SCRIPT_WEATHER_DURATION_ITEMS[weather] === itemName) return 8;
	return BATTLE_SCRIPT_DEFAULT_WEATHER_TURNS;
}

function getBattleScriptTerrainTurns(entry) {
	var itemName = entry && entry.pokemon ? entry.pokemon.item || "" : "";
	return itemName === "Terrain Extender" ? 8 : BATTLE_SCRIPT_DEFAULT_TERRAIN_TURNS;
}

function getBattleScriptSideConditionKey(name) {
	var key = normalizeBattleScriptText(name);
	var alias = BATTLE_SCRIPT_SIDE_CONDITION_ALIASES[key] || key;
	return BATTLE_SCRIPT_SIDE_CONDITION_DEFS[alias] ? alias : "";
}

function getBattleScriptFieldEffectKey(name) {
	var key = normalizeBattleScriptText(name);
	var alias = BATTLE_SCRIPT_FIELD_EFFECT_ALIASES[key] || key;
	return BATTLE_SCRIPT_FIELD_EFFECT_DEFS[alias] ? alias : "";
}

function createBattleScriptEmptySideConditions() {
	return {player: {}, opponent: {}};
}

function cloneBattleScriptSideConditionRecord(record) {
	var cloned = {};
	for (var key in record || {}) {
		if (!Object.prototype.hasOwnProperty.call(record, key)) continue;
		cloned[key] = {
			value: record[key].value || 0,
			turns: record[key].turns || 0
		};
	}
	return cloned;
}

function cloneBattleScriptSideConditions(conditions) {
	conditions = conditions || {};
	return {
		player: cloneBattleScriptSideConditionRecord(conditions.player || {}),
		opponent: cloneBattleScriptSideConditionRecord(conditions.opponent || {})
	};
}

function cloneBattleScriptFieldEffects(effects) {
	var cloned = {};
	for (var key in effects || {}) {
		if (!Object.prototype.hasOwnProperty.call(effects, key)) continue;
		cloned[key] = {
			value: effects[key].value || 0,
			turns: effects[key].turns || 0
		};
	}
	return cloned;
}

function getBattleScriptSideConditionTurns(def, source, explicitTurns) {
	if (!def || !def.timed) return 0;
	if (explicitTurns) return explicitTurns;
	if (def.lightClay && source && source.pokemon && source.pokemon.item === "Light Clay") return 8;
	return def.defaultTurns || 0;
}

function setBattleScriptSideCondition(state, side, conditionKey, value, turns) {
	var def = BATTLE_SCRIPT_SIDE_CONDITION_DEFS[conditionKey];
	var record;
	if (!state || !def || !side) return null;
	if (!state.sideConditions) state.sideConditions = createBattleScriptEmptySideConditions();
	if (!state.sideConditions[side]) state.sideConditions[side] = {};
	record = state.sideConditions[side];
	value = def.layers ? Math.max(1, Math.min(def.max || 3, ~~value || 1)) : (value ? 1 : 0);
	if (!value) {
		delete record[conditionKey];
		return null;
	}
	record[conditionKey] = {
		value: value,
		turns: def.timed ? Math.max(0, ~~turns) : 0
	};
	return record[conditionKey];
}

function clearBattleScriptSideCondition(state, side, conditionKey) {
	if (state && state.sideConditions && state.sideConditions[side]) delete state.sideConditions[side][conditionKey];
}

function setBattleScriptFieldEffect(state, fieldKey, turns) {
	var def = BATTLE_SCRIPT_FIELD_EFFECT_DEFS[fieldKey];
	if (!state || !def) return null;
	if (!state.fieldEffects) state.fieldEffects = {};
	state.fieldEffects[fieldKey] = {
		value: 1,
		turns: def.timed ? Math.max(0, ~~turns || def.defaultTurns || 0) : 0
	};
	return state.fieldEffects[fieldKey];
}

function clearBattleScriptFieldEffect(state, fieldKey) {
	if (state && state.fieldEffects) delete state.fieldEffects[fieldKey];
}

function getBattleScriptBaseTerrain() {
	try {
		var field = createField();
		return field && field.terrain ? field.terrain : "";
	} catch (e) {
		return "";
	}
}

function getBattleScriptBaseFieldEffects() {
	var effects = {};
	try {
		var field = createField();
		if (field && field.isGravity) effects.gravity = {value: 1, turns: 0};
		if (field && field.isMagicRoom) effects.magicroom = {value: 1, turns: 0};
		if (field && field.isWonderRoom) effects.wonderroom = {value: 1, turns: 0};
	} catch (e) {}
	return effects;
}

function getBattleScriptUISideConditionRecord(suffix) {
	var record = {};
	var layers = ~~$("input:radio[name='spikes" + suffix + "']:checked").val();
	if ($("#reflect" + suffix).prop("checked")) record.reflect = {value: 1, turns: 0};
	if ($("#lightScreen" + suffix).prop("checked")) record.lightscreen = {value: 1, turns: 0};
	if ($("#tailwind" + suffix).prop("checked")) record.tailwind = {value: 1, turns: 0};
	if (layers) record.spikes = {value: layers, turns: 0};
	if ($("#sr" + suffix).prop("checked")) record.stealthrock = {value: 1, turns: 0};
	if ($("#auroraVeil" + suffix).prop("checked")) record.auroraveil = {value: 1, turns: 0};
	if ($("#wildfire" + suffix).prop("checked")) record.wildfire = {value: 1, turns: 0};
	if ($("#volcalith" + suffix).prop("checked")) record.volcalith = {value: 1, turns: 0};
	if ($("#steelsurge" + suffix).prop("checked")) record.steelsurge = {value: 1, turns: 0};
	if ($("#vinelash" + suffix).prop("checked")) record.vinelash = {value: 1, turns: 0};
	if ($("#cannonade" + suffix).prop("checked")) record.cannonade = {value: 1, turns: 0};
	return record;
}

function getBattleScriptBaseSideConditions() {
	return {
		player: getBattleScriptUISideConditionRecord("L"),
		opponent: getBattleScriptUISideConditionRecord("R")
	};
}

function resetBattleScriptFieldState(state) {
	state.turn = 0;
	state.weather = getBattleScriptBaseWeather();
	state.weatherTurns = 0;
	state.terrain = getBattleScriptBaseTerrain();
	state.terrainTurns = 0;
	state.sideConditions = getBattleScriptBaseSideConditions();
	state.fieldEffects = getBattleScriptBaseFieldEffects();
}

function applyBattleScriptSideConditionsToCalcSide(calcSide, record) {
	var key;
	var def;
	if (!calcSide) return;
	for (key in BATTLE_SCRIPT_SIDE_CONDITION_DEFS) {
		if (!Object.prototype.hasOwnProperty.call(BATTLE_SCRIPT_SIDE_CONDITION_DEFS, key)) continue;
		def = BATTLE_SCRIPT_SIDE_CONDITION_DEFS[key];
		if (!def.calcKey) continue;
		calcSide[def.calcKey] = def.layers ? 0 : false;
	}
	for (key in record || {}) {
		if (!Object.prototype.hasOwnProperty.call(record, key)) continue;
		def = BATTLE_SCRIPT_SIDE_CONDITION_DEFS[key];
		if (!def || !def.calcKey) continue;
		calcSide[def.calcKey] = def.layers ? (record[key].value || 0) : !!record[key].value;
	}
}

function applyBattleScriptFieldStateToField(field, state) {
	var effects = state && state.fieldEffects ? state.fieldEffects : {};
	if (!field) return field;
	field.weather = getBattleScriptStateWeather(state);
	field.terrain = getBattleScriptStateTerrain(state);
	applyBattleScriptSideConditionsToCalcSide(field.attackerSide, state && state.sideConditions ? state.sideConditions.player : {});
	applyBattleScriptSideConditionsToCalcSide(field.defenderSide, state && state.sideConditions ? state.sideConditions.opponent : {});
	field.isGravity = !!(effects.gravity && effects.gravity.value);
	field.isMagicRoom = !!(effects.magicroom && effects.magicroom.value);
	field.isTrickRoom = !!(effects.trickroom && effects.trickroom.value);
	field.isWonderRoom = !!(effects.wonderroom && effects.wonderroom.value);
	return field;
}

function getBattleScriptSwShSideConditionSlotsFromRecord(record) {
	var slots = {payload: {}};
	var key;
	var def;
	var condition;
	for (key in BATTLE_SCRIPT_SIDE_CONDITION_DEFS) {
		if (!Object.prototype.hasOwnProperty.call(BATTLE_SCRIPT_SIDE_CONDITION_DEFS, key)) continue;
		def = BATTLE_SCRIPT_SIDE_CONDITION_DEFS[key];
		if (typeof def.swshSlot === "number") slots[def.swshSlot] = 0;
	}
	for (key in record || {}) {
		if (!Object.prototype.hasOwnProperty.call(record, key)) continue;
		def = BATTLE_SCRIPT_SIDE_CONDITION_DEFS[key];
		condition = record[key];
		if (!def || typeof def.swshSlot !== "number" || !condition || !condition.value) continue;
		slots[def.swshSlot] = condition.value;
		slots.payload[def.swshSlot] = condition.turns || condition.value;
	}
	return slots;
}

function getBattleScriptSwShSideConditions(state) {
	state = state || battleScriptRuntimeState || {};
	return {
		player: getBattleScriptSwShSideConditionSlotsFromRecord(state.sideConditions && state.sideConditions.player),
		opponent: getBattleScriptSwShSideConditionSlotsFromRecord(state.sideConditions && state.sideConditions.opponent)
	};
}

function getBattleScriptFieldStateSignature(state) {
	return [
		"weather=" + (state && state.weather || ""),
		"weatherTurns=" + (state && state.weatherTurns || 0),
		"terrain=" + (state && state.terrain || ""),
		"terrainTurns=" + (state && state.terrainTurns || 0),
		"side=" + JSON.stringify(state && state.sideConditions || {}),
		"effects=" + JSON.stringify(state && state.fieldEffects || {})
	].join("|");
}

function createBattleScriptSpeedField(state) {
	var field;
	try {
		field = createField();
	} catch (e) {
		field = null;
	}
	applyBattleScriptFieldStateToField(field, state);
	return field;
}

function getBattleScriptWeatherSpeedMultiplier(pokemonState, weather, state) {
	var context = {state: state};
	if (hasBattleScriptEffectiveAbility(pokemonState, ["Chlorophyll"], context) && /Sun|Harsh Sunshine/i.test(weather || "")) return 2;
	if (hasBattleScriptEffectiveAbility(pokemonState, ["Swift Swim"], context) && /Rain|Heavy Rain/i.test(weather || "")) return 2;
	if (hasBattleScriptEffectiveAbility(pokemonState, ["Sand Rush"], context) && weather === "Sand") return 2;
	if (hasBattleScriptEffectiveAbility(pokemonState, ["Slush Rush"], context) && (weather === "Hail" || weather === "Snow")) return 2;
	return 1;
}

function getBattleScriptSpeed(pokemonState, state) {
	var pokemon = pokemonState && pokemonState.pokemon;
	var baseSpeed = pokemon && pokemon.rawStats && pokemon.rawStats.spe ? pokemon.rawStats.spe : (pokemon && pokemon.stats ? pokemon.stats.spe : 0);
	var boost = pokemon && pokemon.boosts ? pokemon.boosts.spe : 0;
	var field;
	var side;
	var speed = getBattleScriptModifiedStat(baseSpeed, boost);
	var effectivePokemon = pokemon;
	var abilityContext = {state: state};
	if (!pokemon) return 0;
	try {
		if (calc && typeof calc.getFinalSpeed === "function" && calc.Generations && typeof calc.Generations.get === "function") {
			field = createBattleScriptSpeedField(state);
			if (field) {
				if (isBattleScriptAbilitySuppressedByNeutralizingGas(pokemonState, state)) {
					effectivePokemon = cloneBattleScriptPokemonAtHP(pokemon, pokemonState && pokemonState.hp ? pokemonState.hp.max : undefined);
					if (effectivePokemon) effectivePokemon.ability = "";
				}
				side = pokemonState.side === "opponent" ? field.defenderSide : field.attackerSide;
				return calc.getFinalSpeed(getActiveCalcGeneration(), effectivePokemon, field, side);
			}
		}
	} catch (e) {}
	speed = Math.floor(speed * getBattleScriptWeatherSpeedMultiplier(pokemonState, getBattleScriptStateWeather(state), state));
	if (hasBattleScriptEffectiveAbility(pokemonState, ["Surge Surfer"], abilityContext) && getBattleScriptStateTerrain(state) === "Electric") speed *= 2;
	if (hasBattleScriptEffectiveAbility(pokemonState, ["Unburden"], abilityContext) && pokemon.abilityOn) speed *= 2;
	if (hasBattleScriptEffectiveAbility(pokemonState, ["Slow Start"], abilityContext) && pokemon.abilityOn) speed = Math.floor(speed * 0.5);
	if (pokemon.item === "Choice Scarf") speed = Math.floor(speed * 1.5);
	if (pokemon.item === "Iron Ball") speed = Math.floor(speed * 0.5);
	if (pokemon && pokemon.status && hasBattleScriptEffectiveAbility(pokemonState, ["Quick Feet"], abilityContext)) speed = Math.floor(speed * 1.5);
	if (pokemon && pokemon.status === "par" && !hasBattleScriptEffectiveAbility(pokemonState, ["Quick Feet"], abilityContext)) {
		speed = Math.floor(speed * (gen >= 7 ? 0.5 : 0.25));
	}
	return speed;
}

function hasBattleScriptMoveLastItem(pokemonState, state) {
	var key = getBattleScriptHeldItemKey(pokemonState, state);
	return key === "laggingtail" || key === "fullincense";
}

function isBattleScriptTrickRoomActive(state) {
	return !!(state && state.fieldEffects && state.fieldEffects.trickroom && state.fieldEffects.trickroom.value);
}

function isBattleScriptFasterOrTied(attackerState, defenderState, state) {
	var attackerSpeed = getBattleScriptSpeed(attackerState, state);
	var defenderSpeed = getBattleScriptSpeed(defenderState, state);
	var attackerLast = hasBattleScriptMoveLastItem(attackerState, state);
	var defenderLast = hasBattleScriptMoveLastItem(defenderState, state);
	if (attackerLast !== defenderLast) return !attackerLast;
	return isBattleScriptTrickRoomActive(state) ? attackerSpeed <= defenderSpeed : attackerSpeed >= defenderSpeed;
}

function getBattleScriptSpeedRelationText(candidateState, attackerState, state) {
	var candidateSpeed = getBattleScriptSpeed(candidateState, state);
	var attackerSpeed = getBattleScriptSpeed(attackerState, state);
	var candidateLast = hasBattleScriptMoveLastItem(candidateState, state);
	var attackerLast = hasBattleScriptMoveLastItem(attackerState, state);
	if (candidateLast !== attackerLast) return candidateLast ? "moves last from held item" : "moves before held item lag";
	if (isBattleScriptTrickRoomActive(state)) {
		if (candidateSpeed < attackerSpeed) return "moves first in Trick Room (" + candidateSpeed + " < " + attackerSpeed + ")";
		if (candidateSpeed === attackerSpeed) return "Trick Room speed tie (" + candidateSpeed + ")";
		return "moves after in Trick Room (" + candidateSpeed + " > " + attackerSpeed + ")";
	}
	if (candidateSpeed > attackerSpeed) return "faster (" + candidateSpeed + " > " + attackerSpeed + ")";
	if (candidateSpeed === attackerSpeed) return "speed tie (" + candidateSpeed + ")";
	return "slower (" + candidateSpeed + " < " + attackerSpeed + ")";
}

function getBattleScriptAIScoreDisplayBase(score) {
	if (!score || typeof score.displayBase !== "number") return 0;
	return score.displayBase;
}

function formatBattleScriptAIScoreValue(score, value) {
	var displayValue = Math.round((value - getBattleScriptAIScoreDisplayBase(score)) * 10) / 10;
	if (Object.is(displayValue, -0)) displayValue = 0;
	return (displayValue > 0 ? "+" : "") + displayValue;
}

function formatBattleScriptAIScore(score) {
	var minText;
	var maxText;
	if (!score) return "";
	minText = formatBattleScriptAIScoreValue(score, score.minScore);
	maxText = formatBattleScriptAIScoreValue(score, score.maxScore);
	if (minText === maxText) return maxText;
	return minText + " to " + maxText;
}

function formatBattleScriptAIExpectedScore(score) {
	if (!score || typeof score.expectedScore !== "number") return "";
	return formatBattleScriptAIScoreValue(score, score.expectedScore);
}

function formatBattleScriptAIScoreSummary(score) {
	var rangeText = formatBattleScriptAIScore(score);
	var expectedText = formatBattleScriptAIExpectedScore(score);
	if (!rangeText || !expectedText || rangeText === expectedText) return rangeText;
	return expectedText + " expected, " + rangeText + " range";
}

function getBattleScriptAIScoreConfidence(scores) {
	var top = scores && scores.length ? scores[0] : null;
	var second = scores && scores.length > 1 ? scores[1] : null;
	if (!top) return {guaranteed: false, text: "unknown"};
	if (!second) return {guaranteed: true, text: "only legal choice"};
	if (top.minScore > second.maxScore) return {guaranteed: true, text: "guaranteed by score range"};
	return {
		guaranteed: false,
		text: "contested with " + second.move + " (" + formatBattleScriptAIScore(second) + ")"
	};
}

function isBattleScriptDamagingMove(move) {
	return !!(move && move.name && move.name !== "(No Move)" && move.category && move.category !== "Status");
}

function getBattleScriptAIMoveContextBlockReason(move, attackerSide, attackerState, defenderState, state) {
	var effects = getBattleScriptMoveEffects(move);
	var defenderSide = attackerSide ? getBattleScriptOpposingSide(attackerSide) : "";
	var checked = 0;
	var reasons = [];
	var damagingBlockReason = getBattleScriptDamagingMoveContextBlockReason(move, attackerSide, attackerState, defenderState, state);
	function addReason(reason) {
		if (reason && reasons.indexOf(reason) === -1) reasons.push(reason);
	}
	if (damagingBlockReason) return damagingBlockReason;
	if (!move || move.category !== "Status" || !effects.length) return "";
	for (var i = 0; i < effects.length; i++) {
		var effect = effects[i];
		var targetState = effect.target === "attacker" ? attackerState : defenderState;
		var targetSide = effect.target === "attacker" ? attackerSide : defenderSide;
		var context = {state: state, attackerSide: attackerSide, attackerState: attackerState, targetSide: targetSide, move: move};
		var reason = "";
		if (effect.target === "attacker") return "";
		if (effect.kind === "status") {
			checked++;
			reason = getBattleScriptStatusBlockReason(targetState, effect.status, context);
			if (!reason) return "";
			addReason(reason);
			continue;
		}
		if (effect.kind === "volatile") {
			checked++;
			if (effect.requiresOppositeGender && !isBattleScriptOppositeGender(attackerState, targetState)) reason = "gender matchup";
			if (!reason) return "";
			addReason(reason);
			continue;
		}
		if ((effect.kind === "boost" || effect.kind === "accuracy" || effect.kind === "evasion") && effect.amount < 0) {
			checked++;
			if (effect.requiresOppositeGender && !isBattleScriptOppositeGender(attackerState, targetState)) reason = "gender matchup";
			if (!reason) reason = getBattleScriptStatEffectBlockReason(targetState, effect, context);
			if (!reason) return "";
			addReason(reason);
			continue;
		}
		return "";
	}
	return checked ? reasons.join(", ") || "no effect" : "";
}

function applyBattleScriptAIContextFilters(scores, state, attackerSide, attackerState, defenderState) {
	var allowed = [];
	var blocked = [];
	if (!scores || !scores.length) return scores || [];
	for (var i = 0; i < scores.length; i++) {
		var score = $.extend({}, scores[i], {
			notes: scores[i].notes ? scores[i].notes.slice(0) : []
		});
		var move = findBattleScriptMove(attackerState && attackerState.pokemon, score.move);
		var blockReason = getBattleScriptAIMoveContextBlockReason(move, attackerSide, attackerState, defenderState, state);
		if (blockReason) {
			score.minScore = -10000;
			score.maxScore = -10000;
			score.expectedScore = -10000;
			score.notes.push("blocked in current matchup: " + blockReason);
			blocked.push(score);
		} else {
			allowed.push(score);
		}
	}
	if (!allowed.length) allowed = blocked;
	allowed.sort(function (a, b) {
		if (b.maxScore !== a.maxScore) return b.maxScore - a.maxScore;
		if (b.expectedScore !== a.expectedScore) return b.expectedScore - a.expectedScore;
		return (a.moveIndex || 0) - (b.moveIndex || 0);
	});
	return allowed;
}

function isBattleScriptRechargeMove(move) {
	return !!(move && BATTLE_SCRIPT_RECHARGE_MOVES.indexOf(move.name) !== -1);
}

function getBattleScriptChargeMoveInfo(move) {
	return move && move.name ? BATTLE_SCRIPT_CHARGE_MOVES[move.name] || null : null;
}

function isBattleScriptChargeMove(move) {
	return !!getBattleScriptChargeMoveInfo(move);
}

function clearBattleScriptChargeState(entry) {
	if (!entry) return;
	entry.chargingMove = "";
}

function isBattleScriptChargeRelease(entry, move) {
	return !!(entry && move && entry.chargingMove &&
		normalizeBattleScriptText(entry.chargingMove) === normalizeBattleScriptText(move.name));
}

function isBattleScriptSunWeather(state) {
	var weather = getBattleScriptStateWeather(state);
	return weather === "Sun" || weather === "Harsh Sunshine";
}

function doesBattleScriptWeatherSkipCharge(move, state) {
	var info = getBattleScriptChargeMoveInfo(move);
	var weather = getBattleScriptStateWeather(state);
	if (!info || !info.skipChargeWeather || !info.skipChargeWeather.length) return false;
	return info.skipChargeWeather.indexOf(weather) !== -1 || (info.skipChargeWeather.indexOf("Sun") !== -1 && isBattleScriptSunWeather(state));
}

function hasBattleScriptPowerHerb(entry) {
	return !!(entry && entry.pokemon && entry.pokemon.item === "Power Herb");
}

function requiresBattleScriptChargeTurn(entry, move, state) {
	if (!isBattleScriptChargeMove(move)) return false;
	if (isBattleScriptChargeRelease(entry, move)) return false;
	if (doesBattleScriptWeatherSkipCharge(move, state)) return false;
	if (hasBattleScriptPowerHerb(entry)) return false;
	return true;
}

function doesBattleScriptPowerHerbResolveCharge(entry, move, state) {
	return !!(isBattleScriptChargeMove(move) && !isBattleScriptChargeRelease(entry, move) &&
		!doesBattleScriptWeatherSkipCharge(move, state) && hasBattleScriptPowerHerb(entry));
}

function consumeBattleScriptPowerHerb(entry) {
	var item = entry && entry.pokemon ? entry.pokemon.item || "" : "";
	if (item !== "Power Herb") return "";
	return consumeBattleScriptHeldItem(entry);
}

function createBattleScriptZeroDamage(reason) {
	return {
		min: 0,
		max: 0,
		blocked: true,
		reason: reason || ""
	};
}

function createBattleScriptZeroDamageResult(reason) {
	return {
		battleScriptDamageRange: {min: 0, max: 0},
		battleScriptDamageRolls: [0],
		range: function () { return [0, 0]; },
		damage: [0],
		battleScriptZeroDamage: true,
		battleScriptZeroReason: reason || ""
	};
}

function getBattleScriptHPValuesForDamage(entry) {
	var values = [];
	var seen = {};
	function add(value) {
		value = Math.max(0, Math.round(Number(value) || 0));
		if (seen[value]) return;
		seen[value] = true;
		values.push(value);
	}
	if (!entry || !entry.hp) return [0];
	add(entry.hp.min);
	add(entry.hp.max);
	return values.length ? values : [0];
}

function createBattleScriptAggregateDamageResult(results, move) {
	var min = Infinity;
	var max = 0;
	var rolls = [];
	var seenRolls = {};
	for (var i = 0; i < (results || []).length; i++) {
		var damage = getBattleScriptDamageRange(results[i], move);
		var resultRolls = getBattleScriptDamageRolls(results[i], move);
		if (!damage) continue;
		min = Math.min(min, damage.min);
		max = Math.max(max, damage.max);
		for (var j = 0; j < resultRolls.length; j++) {
			var roll = Math.max(0, Math.round(resultRolls[j]));
			if (seenRolls[roll]) continue;
			seenRolls[roll] = true;
			rolls.push(roll);
		}
	}
	if (!isFinite(min)) min = 0;
	rolls.sort(function (a, b) { return a - b; });
	if (!rolls.length) rolls = [min, max];
	return {
		battleScriptDamageRange: {min: min, max: max},
		battleScriptDamageRolls: rolls
	};
}

function isBattleScriptChargeStartEffect(effect, startEffects) {
	for (var i = 0; i < (startEffects || []).length; i++) {
		var start = startEffects[i];
		if (!effect || !start || effect.kind !== start.kind || effect.target !== start.target) continue;
		if (effect.kind === "boost" && effect.stat === start.stat && effect.amount === start.amount) return true;
	}
	return false;
}

function filterBattleScriptChargeStartEffects(move, effects) {
	var info = getBattleScriptChargeMoveInfo(move);
	var startEffects = info && info.startEffects ? info.startEffects : [];
	if (!startEffects.length) return effects;
	return $.grep(effects || [], function (effect) {
		return !isBattleScriptChargeStartEffect(effect, startEffects);
	});
}

function applyBattleScriptChargeStartEffects(attackerState, move) {
	var info = getBattleScriptChargeMoveInfo(move);
	var effects = info && info.startEffects ? info.startEffects : [];
	var details = [];
	for (var i = 0; i < effects.length; i++) {
		var effect = effects[i];
		var change = null;
		if (effect.kind === "boost") change = applyBattleScriptBoost(attackerState, effect.stat, effect.amount);
		if (!change || change.changed || change.blocked) {
			details.push(formatBattleScriptEffectText(effect, attackerState, change, true));
		}
	}
	return $.grep(details, function (detail) { return !!detail; });
}

function getBattleScriptChargeBlockedReason(attackerState, defenderState, move, state) {
	var info = defenderState && defenderState.chargingMove ?
		BATTLE_SCRIPT_CHARGE_MOVES[defenderState.chargingMove] || null : null;
	var hitBy;
	if (!info || !info.invulnerable) return "";
	if (hasBattleScriptEffectiveAbility(attackerState, ["No Guard"], {state: state}) ||
			hasBattleScriptEffectiveAbility(defenderState, ["No Guard"], {state: state})) return "";
	hitBy = info.hitBy || [];
	if (move && hitBy.indexOf(move.name) !== -1) return "";
	return defenderState.label + " is " + info.invulnerable + " after using " + defenderState.chargingMove;
}

function cloneBattleScriptMoveEffects(effects) {
	var cloned = [];
	for (var i = 0; i < (effects || []).length; i++) cloned.push($.extend({}, effects[i]));
	return cloned;
}

function getBattleScriptExplicitMoveEffects(move) {
	var effects = [];
	var moveEffects = move && move.name ? (BATTLE_SCRIPT_MOVE_EFFECTS[move.name] || null) : null;
	var fieldEffects = move && move.name ? (BATTLE_SCRIPT_FIELD_MOVE_EFFECTS[move.name] || null) : null;
	var fallbackBoosts = move && move.name ? (BATTLE_SCRIPT_TARGET_BOOST_MOVES[move.name] || null) : null;
	if (moveEffects) effects = effects.concat(cloneBattleScriptMoveEffects(moveEffects));
	if (fieldEffects) effects = effects.concat(cloneBattleScriptMoveEffects(fieldEffects));
	if (!moveEffects && fallbackBoosts) {
		for (var i = 0; i < fallbackBoosts.length; i++) {
			effects.push({
				kind: "boost",
				target: "defender",
				stat: fallbackBoosts[i].stat,
				amount: fallbackBoosts[i].amount,
				chance: 100
			});
		}
	}
	return effects;
}

function getBattleScriptConfiguredMoveAccuracy(moveName) {
	if (BATTLE_SCRIPT_ALWAYS_HIT_MOVES[moveName]) return {accuracy: 100, alwaysHits: true};
	if (Object.prototype.hasOwnProperty.call(BATTLE_SCRIPT_MOVE_ACCURACY, moveName)) {
		return {accuracy: BATTLE_SCRIPT_MOVE_ACCURACY[moveName], alwaysHits: false};
	}
	return {accuracy: 100, alwaysHits: false};
}

function getBattleScriptMoveLibrarySource() {
	try {
		if (typeof GENERATION !== "undefined" && GENERATION && GENERATION.moves) return GENERATION.moves;
		if (calc && calc.Generations && typeof calc.Generations.get === "function") return getActiveCalcGeneration().moves;
	} catch (e) {}
	return null;
}

function getBattleScriptMoveLibraryGeneration() {
	try {
		if (typeof GENERATION !== "undefined" && GENERATION && GENERATION.num) return GENERATION.num;
	} catch (e) {}
	return typeof gen !== "undefined" ? gen : 0;
}

function hasBattleScriptEquivalentMoveEffect(effects, candidate) {
	for (var i = 0; i < (effects || []).length; i++) {
		var effect = effects[i];
		if (effect.kind !== candidate.kind || effect.target !== candidate.target) continue;
		if (effect.kind === "boost" && effect.stat === candidate.stat && effect.amount === candidate.amount) return true;
		if ((effect.kind === "accuracy" || effect.kind === "evasion") && effect.amount === candidate.amount) return true;
		if (effect.kind === "status" && effect.status === candidate.status) return true;
		if (effect.kind === "volatile" && effect.volatile === candidate.volatile) return true;
		if ((effect.kind === "drain" || effect.kind === "recoil" || effect.kind === "crash" || effect.kind === "secondary") && effect.kind === candidate.kind) return true;
	}
	return false;
}

function addBattleScriptProfileEffect(profile, effect) {
	if (!hasBattleScriptEquivalentMoveEffect(profile.effects, effect)) profile.effects.push(effect);
}

function addBattleScriptSelfBoostEffects(profile, moveData) {
	var boosts = moveData && moveData.self && moveData.self.boosts ? moveData.self.boosts : null;
	var stat;
	if (!boosts) return;
	for (stat in boosts) {
		if (!Object.prototype.hasOwnProperty.call(boosts, stat)) continue;
		if (stat === "accuracy") {
			addBattleScriptProfileEffect(profile, {kind: "accuracy", target: "attacker", amount: boosts[stat], chance: 100});
		} else if (stat === "evasion") {
			addBattleScriptProfileEffect(profile, {kind: "evasion", target: "attacker", amount: boosts[stat], chance: 100});
		} else {
			addBattleScriptProfileEffect(profile, {kind: "boost", target: "attacker", stat: stat, amount: boosts[stat], chance: 100});
		}
	}
}

function addBattleScriptMoveDataEffects(profile, moveData) {
	if (!moveData) return;
	addBattleScriptSelfBoostEffects(profile, moveData);
	if (moveData.drain) addBattleScriptProfileEffect(profile, {kind: "drain", target: "attacker", ratio: moveData.drain, chance: 100});
	if (moveData.recoil) addBattleScriptProfileEffect(profile, {kind: "recoil", target: "attacker", ratio: moveData.recoil, chance: 100});
	if (moveData.hasCrashDamage) addBattleScriptProfileEffect(profile, {kind: "crash", target: "attacker", chance: 100});
	if (moveData.mindBlownRecoil) addBattleScriptProfileEffect(profile, {kind: "recoil", target: "attacker", ratio: [1, 2], chance: 100});
	if (moveData.struggleRecoil) addBattleScriptProfileEffect(profile, {kind: "recoil", target: "attacker", ratio: [1, 4], chance: 100});
	if (moveData.secondaries && !profile.explicitEffects.length) {
		addBattleScriptProfileEffect(profile, {kind: "secondary", target: "defender", chance: null});
	}
	if (moveData.multiaccuracy) {
		addBattleScriptProfileEffect(profile, {kind: "secondary", target: "defender", chance: null, text: "each hit checks accuracy"});
	}
}

function createBattleScriptMoveEffectProfile(moveData) {
	var name = moveData && moveData.name ? moveData.name : "";
	var accuracyInfo = getBattleScriptConfiguredMoveAccuracy(name);
	var explicitEffects = getBattleScriptExplicitMoveEffects(moveData);
	var profile = {
		name: name,
		type: moveData && moveData.type ? moveData.type : "",
		category: moveData && moveData.category ? moveData.category : "",
		basePower: moveData && (moveData.bp || moveData.basePower) ? (moveData.bp || moveData.basePower) : 0,
		priority: moveData && moveData.priority ? moveData.priority : 0,
		accuracy: accuracyInfo.accuracy,
		alwaysHits: accuracyInfo.alwaysHits,
		explicitEffects: explicitEffects,
		effects: explicitEffects.slice(0)
	};
	addBattleScriptMoveDataEffects(profile, moveData);
	profile.recharge = isBattleScriptRechargeMove(moveData);
	profile.highCrit = isBattleScriptHighCritMove(moveData);
	return profile;
}

function ensureBattleScriptMoveEffectLibrary() {
	var currentGen = getBattleScriptMoveLibraryGeneration();
	var source;
	var moves = [];
	if (battleScriptMoveEffectLibraryGen === currentGen && battleScriptMoveEffectLibrary) return;
	battleScriptMoveEffectLibrary = {};
	battleScriptMoveEffectLibraryGen = currentGen;
	source = getBattleScriptMoveLibrarySource();
	if (!source) return;
	try {
		moves = Array.from(source);
	} catch (e) {
		if (source && typeof source.forEach === "function") {
			source.forEach(function (moveData) {
				moves.push(moveData);
			});
		}
	}
	for (var i = 0; i < moves.length; i++) {
		if (!moves[i] || !moves[i].name) continue;
		battleScriptMoveEffectLibrary[normalizeBattleScriptText(moves[i].name)] = createBattleScriptMoveEffectProfile(moves[i]);
	}
}

function getBattleScriptMoveEffectProfile(move) {
	var key = normalizeBattleScriptText(move && move.name);
	ensureBattleScriptMoveEffectLibrary();
	if (key && battleScriptMoveEffectLibrary[key]) return battleScriptMoveEffectLibrary[key];
	return createBattleScriptMoveEffectProfile(move);
}

function getBattleScriptMoveEffects(move) {
	return cloneBattleScriptMoveEffects(getBattleScriptMoveEffectProfile(move).effects);
}

function getBattleScriptGuaranteedMoveEffects(move) {
	return $.grep(getBattleScriptMoveEffects(move), function (effect) {
		return (effect.chance || 100) >= 100;
	});
}

function getBattleScriptBoostStageText(stat, amount) {
	var label = BATTLE_SCRIPT_STAT_LABELS[stat] || stat;
	return label + " " + (amount > 0 ? "+" : "") + amount;
}

function getBattleScriptStageText(kind, amount) {
	var label = kind === "accuracy" ? "Accuracy" : "Evasion";
	return label + " " + (amount > 0 ? "+" : "") + amount;
}

function getBattleScriptStageMultiplier(stage) {
	stage = stage || 0;
	if (stage >= 0) return (3 + stage) / 3;
	return 3 / (3 - stage);
}

function formatBattleScriptChanceValue(chance) {
	var percent = Math.round(chance * 1000) / 10;
	return (percent % 1 === 0 ? Math.round(percent) : percent) + "%";
}

function getBattleScriptEffectiveAccuracy(move, attackerState, defenderState, state) {
	var profile = getBattleScriptMoveEffectProfile(move);
	var attackerAccuracy = attackerState && attackerState.accuracyStage ? attackerState.accuracyStage : 0;
	var defenderEvasion = defenderState && defenderState.evasionStage ? defenderState.evasionStage : 0;
	var attackerItem = getBattleScriptHeldItemKey(attackerState, state);
	var defenderItem = getBattleScriptHeldItemKey(defenderState, state);
	var notes = [];
	var chance;
	if (profile.alwaysHits ||
			hasBattleScriptEffectiveAbility(attackerState, ["No Guard"], {state: state}) ||
			hasBattleScriptEffectiveAbility(defenderState, ["No Guard"], {state: state})) {
		return {
			chance: 1,
			text: profile.alwaysHits ? "always hits" : "No Guard"
		};
	}
	chance = (profile.accuracy || 100) / 100;
	chance *= getBattleScriptStageMultiplier(attackerAccuracy);
	chance /= getBattleScriptStageMultiplier(defenderEvasion);
	if (attackerItem === "widelens") {
		chance *= 1.1;
		notes.push("Wide Lens");
	}
	if (attackerItem === "zoomlens" && defenderState && !isBattleScriptFasterOrTied(attackerState, defenderState, state)) {
		chance *= 1.2;
		notes.push("Zoom Lens");
	}
	if (defenderItem === "brightpowder" || defenderItem === "laxincense") {
		chance *= 0.9;
		notes.push(defenderItem === "brightpowder" ? "Bright Powder" : "Lax Incense");
	}
	if (attackerState && attackerState.micleReady) {
		chance *= 1.2;
		notes.push("Micle Berry");
	}
	chance = Math.max(0, Math.min(1, chance));
	if ((profile.accuracy || 100) < 100) notes.push((profile.accuracy || 100) + "% accuracy");
	if (attackerAccuracy) notes.push(getBattleScriptStageText("accuracy", attackerAccuracy));
	if (defenderEvasion) notes.push(getBattleScriptStageText("evasion", defenderEvasion));
	return {
		chance: chance,
		text: notes.join(", ")
	};
}

function getBattleScriptEffectiveBoostAmount(pokemonState, amount, context) {
	if (!amount || !pokemonState) return amount;
	if (hasBattleScriptEffectiveAbility(pokemonState, ["Contrary"], context)) amount *= -1;
	if (hasBattleScriptEffectiveAbility(pokemonState, ["Simple"], context)) amount *= 2;
	return amount;
}

function applyBattleScriptBoost(pokemonState, stat, amount, context) {
	var pokemon = pokemonState && pokemonState.pokemon;
	var before;
	var after;
	if (!pokemon || !pokemon.boosts || !stat || !amount) return null;
	amount = getBattleScriptEffectiveBoostAmount(pokemonState, amount, context);
	before = pokemon.boosts[stat] || 0;
	after = Math.max(-6, Math.min(6, before + amount));
	pokemon.boosts[stat] = after;
	return {
		stat: stat,
		amount: after - before,
		before: before,
		after: after,
		changed: after !== before
	};
}

function applyBattleScriptStage(pokemonState, kind, amount) {
	var field = kind === "evasion" ? "evasionStage" : "accuracyStage";
	var before;
	var after;
	if (!pokemonState || !amount) return null;
	before = pokemonState[field] || 0;
	after = Math.max(-6, Math.min(6, before + amount));
	pokemonState[field] = after;
	return {
		kind: kind,
		amount: after - before,
		before: before,
		after: after,
		changed: after !== before
	};
}

function hasBattleScriptType(pokemonState, typeName) {
	var pokemon = pokemonState && pokemonState.pokemon;
	var types = pokemon ? (pokemon.types || pokemon.rawTypes || []) : [];
	return types.indexOf(typeName) !== -1;
}

function getBattleScriptActiveSideCondition(state, side, conditionKey) {
	var record = state && state.sideConditions && side ? state.sideConditions[side] : null;
	var condition = record ? record[conditionKey] : null;
	return !!(condition && condition.value);
}

function isBattleScriptGrounded(pokemonState, state) {
	var effects = state && state.fieldEffects ? state.fieldEffects : {};
	var item = pokemonState && pokemonState.pokemon ? pokemonState.pokemon.item || "" : "";
	if (effects.gravity && effects.gravity.value) return true;
	if (item === "Iron Ball") return true;
	if (hasBattleScriptType(pokemonState, "Flying")) return false;
	if (hasBattleScriptEffectiveAbility(pokemonState, ["Levitate"], {state: state})) return false;
	if (item === "Air Balloon") return false;
	return true;
}

function isBattleScriptOppositeGender(attackerState, targetState) {
	var attackerGender = normalizeBattleScriptGender(attackerState && attackerState.pokemon ? attackerState.pokemon.gender : "");
	var targetGender = normalizeBattleScriptGender(targetState && targetState.pokemon ? targetState.pokemon.gender : "");
	return (attackerGender === "M" && targetGender === "F") || (attackerGender === "F" && targetGender === "M");
}

function getBattleScriptStatusBlockReason(targetState, status, context) {
	var state = context && context.state;
	var targetSide = context && context.targetSide;
	var attackerState = context && context.attackerState;
	var abilityContext = {state: state, attackerState: attackerState, targetState: targetState, move: context && context.move};
	var terrain = getBattleScriptStateTerrain(state);
	if (!targetState || !targetState.pokemon) return "unknown target";
	if (context && isBattleScriptPowderMove(context.move) &&
			(hasBattleScriptType(targetState, "Grass") ||
			getBattleScriptHeldItemKey(targetState, state) === "safetygoggles" ||
			hasBattleScriptEffectiveAbility(targetState, ["Overcoat"], abilityContext))) return "powder immunity";
	if (targetState.pokemon.status) return "already has a status";
	if (status === "brn" && (hasBattleScriptType(targetState, "Fire") || hasBattleScriptEffectiveAbility(targetState, ["Water Veil", "Water Bubble"], abilityContext))) return "burn immunity";
	if ((status === "psn" || status === "tox") &&
			(hasBattleScriptType(targetState, "Poison") || hasBattleScriptType(targetState, "Steel") ||
			hasBattleScriptEffectiveAbility(targetState, ["Immunity", "Pastel Veil"], abilityContext))) return "poison immunity";
	if (status === "par" && (hasBattleScriptType(targetState, "Electric") || hasBattleScriptEffectiveAbility(targetState, ["Limber"], abilityContext))) return "paralysis immunity";
	if (status === "slp" && hasBattleScriptEffectiveAbility(targetState, ["Insomnia", "Vital Spirit", "Sweet Veil"], abilityContext)) return "sleep immunity";
	if (status === "frz" && (hasBattleScriptType(targetState, "Ice") || hasBattleScriptEffectiveAbility(targetState, ["Magma Armor"], abilityContext))) return "freeze immunity";
	if (targetSide && getBattleScriptActiveSideCondition(state, targetSide, "safeguard") &&
			!hasBattleScriptEffectiveAbility(attackerState, ["Infiltrator"], {state: state})) return "Safeguard";
	if (terrain === "Misty" && isBattleScriptGrounded(targetState, state)) return "Misty Terrain";
	if (terrain === "Electric" && status === "slp" && isBattleScriptGrounded(targetState, state)) return "Electric Terrain";
	return "";
}

function applyBattleScriptStatus(targetState, status, context) {
	var blockReason = getBattleScriptStatusBlockReason(targetState, status, context);
	if (blockReason) return {changed: false, blocked: true, reason: blockReason};
	targetState.pokemon.status = status;
	return {changed: true, blocked: false, reason: ""};
}

function getBattleScriptStatEffectBlockReason(targetState, effect, context) {
	if (!effect || !context || effect.amount >= 0) return "";
	if (!context.targetSide || context.targetSide === context.attackerSide) return "";
	if (isBattleScriptPowderMove(context.move) &&
			(hasBattleScriptType(targetState, "Grass") ||
			getBattleScriptHeldItemKey(targetState, context.state) === "safetygoggles" ||
			hasBattleScriptEffectiveAbility(targetState, ["Overcoat"], {state: context.state, attackerState: context.attackerState, targetState: targetState, move: context.move}))) return "powder immunity";
	if (getBattleScriptActiveSideCondition(context.state, context.targetSide, "mist") &&
			!hasBattleScriptEffectiveAbility(context.attackerState, ["Infiltrator"], {state: context.state})) return "Mist";
	return "";
}

function getBattleScriptStatusHealingStatuses(itemName) {
	return BATTLE_SCRIPT_STATUS_HEAL_ITEMS[normalizeBattleScriptText(itemName)] || [];
}

function isBattleScriptStatusHealingItem(itemName) {
	return getBattleScriptStatusHealingStatuses(itemName).length > 0;
}

function doesBattleScriptItemHealStatus(itemName, status) {
	var statuses = getBattleScriptStatusHealingStatuses(itemName);
	return statuses.indexOf(status) !== -1 || (status === "tox" && statuses.indexOf("psn") !== -1);
}

function isBattleScriptMagicRoomActive(state) {
	return !!(state && state.fieldEffects && state.fieldEffects.magicroom && state.fieldEffects.magicroom.value);
}

function getBattleScriptActiveHeldItem(pokemonState, state) {
	if (!pokemonState || !pokemonState.pokemon || isBattleScriptMagicRoomActive(state)) return "";
	return pokemonState.pokemon.item || "";
}

function getBattleScriptHeldItemKey(pokemonState, state) {
	return normalizeBattleScriptText(getBattleScriptActiveHeldItem(pokemonState, state));
}

function isBattleScriptBerryItemName(itemName) {
	return /berry$/.test(normalizeBattleScriptText(itemName || ""));
}

function getBattleScriptSwShMoveId(move) {
	var data = window.SWSH_AI_DATA || null;
	var key = normalizeBattleScriptText(move && move.name);
	var record = key && data && data.moveIndex ? data.moveIndex[key] : null;
	if (record && typeof record.id === "number") return record.id;
	if (typeof record === "number") return record;
	return 0;
}

function getBattleScriptSwShItemRecord(itemName) {
	var data = window.SWSH_AI_DATA || null;
	var key = normalizeBattleScriptText(itemName);
	if (!key || !data || !data.itemIndex) return null;
	return data.itemIndex[key] || null;
}

function getBattleScriptSwShItemHoldEffect(itemName) {
	var record = getBattleScriptSwShItemRecord(itemName);
	return record && typeof record.holdEffect === "number" ? record.holdEffect : 0;
}

function isBattleScriptModeledHeldItemCandidate(itemName) {
	var key = normalizeBattleScriptText(itemName);
	var record = getBattleScriptSwShItemRecord(itemName);
	var holdEffect = getBattleScriptSwShItemHoldEffect(itemName);
	if (!key) return false;
	if (BATTLE_SCRIPT_EXPLICIT_BATTLE_ITEM_KEYS[key]) return true;
	if (isBattleScriptStatusHealingItem(itemName) || BATTLE_SCRIPT_CONFUSION_ITEMS[key] ||
			BATTLE_SCRIPT_PINCH_HEAL_BERRIES[key] || BATTLE_SCRIPT_RESIST_BERRIES[key] ||
			BATTLE_SCRIPT_PINCH_STAT_BERRIES[key] || BATTLE_SCRIPT_TERRAIN_SEEDS[key] ||
			BATTLE_SCRIPT_DAMAGE_TRIGGER_ITEMS[key]) return true;
	if (/^(?:choiceband|choicescarf|choicespecs|lifeorb|expertbelt|focussash|eviolite|assaultvest|leftovers|blacksludge|rockyhelmet|weaknesspolicy|lightclay|airballoon|whiteherb|powerherb|shellbell|flameorb|toxicorb|stickybarb|berryjuice|oranberry|sitrusberry|bigroot|widelens|zoomlens|brightpowder|laxincense|muscleband|wiseglasses|metronome|ironball|laggingtail|fullincense|machobrace|quickclaw|quickpowder|floatstone|bindingband|gripclaw|shedshell|redcard|ejectbutton|mentalherb|safetygoggles|kingsrock|razorfang|scopelens|razorclaw|focusband|custapberry|lansatberry|micleberry|starfberry|jabocaberry|rowapberry|keeberry|marangaberry)$/.test(key)) return true;
	if (record && record.category === 6) return true;
	if (/(?:plate|gem|memory|drive)$/.test(key)) return true;
	return !!(holdEffect && !BATTLE_SCRIPT_NON_BATTLE_HOLD_EFFECTS[holdEffect]);
}

function isBattleScriptChoiceItemName(itemName) {
	var key = normalizeBattleScriptText(itemName);
	return key === "choiceband" || key === "choicescarf" || key === "choicespecs";
}

function getBattleScriptChoiceLockReason(entry, move, state) {
	var item = getBattleScriptActiveHeldItem(entry, state);
	if (!entry || !move || !isBattleScriptChoiceItemName(item) || !entry.choiceLockMove) return "";
	if (normalizeBattleScriptText(entry.choiceLockMove) === normalizeBattleScriptText(move.name)) return "";
	return item + " locks " + entry.label + " into " + entry.choiceLockMove;
}

function lockBattleScriptChoiceMove(entry, move, state) {
	var item = getBattleScriptActiveHeldItem(entry, state);
	if (!entry || !move || !isBattleScriptChoiceItemName(item)) return "";
	if (!entry.choiceLockMove) {
		entry.choiceLockMove = move.name;
		entry.choiceLockMoveId = getBattleScriptSwShMoveId(move);
	}
	return entry.choiceLockMove;
}

function getBattleScriptMoveLegalityBlockReason(entry, move, state) {
	var item = getBattleScriptActiveHeldItem(entry, state);
	var choiceReason = getBattleScriptChoiceLockReason(entry, move, state);
	if (choiceReason) return choiceReason;
	if (item === "Assault Vest" && move && move.category === "Status") return "Assault Vest prevents status moves";
	return "";
}

function commitBattleScriptMoveUse(entry) {
	if (!entry) return;
	entry.custapReady = false;
	entry.micleReady = false;
}

function applyBattleScriptAfterMoveUseHeldItemEffects(attackerState, move, details, state) {
	var itemKey = getBattleScriptHeldItemKey(attackerState, state);
	var change;
	if (!attackerState || !move) return;
	commitBattleScriptMoveUse(attackerState);
	lockBattleScriptChoiceMove(attackerState, move, state);
	if (itemKey === "throatspray" && isBattleScriptSoundMove(move)) {
		consumeBattleScriptHeldItem(attackerState);
		change = applyBattleScriptBoost(attackerState, "spa", 1, {state: state, attackerState: attackerState, targetState: attackerState, move: move});
		if (change && change.changed) details.push(attackerState.label + "'s Throat Spray raised " + getBattleScriptBoostStageText(change.stat, change.amount) + ".");
	}
	applyBattleScriptWhiteHerb(attackerState, details, state);
}

function clearBattleScriptSwitchVolatileState(entry) {
	if (!entry) return;
	entry.choiceLockMove = "";
	entry.choiceLockMoveId = 0;
	entry.mustRecharge = false;
	entry.rechargeMove = "";
	clearBattleScriptChargeState(entry);
}

function getBattleScriptMoveTypeId(typeName) {
	return BATTLE_SCRIPT_TYPE_IDS[typeName] !== undefined ? BATTLE_SCRIPT_TYPE_IDS[typeName] : null;
}

function getBattleScriptMoveType(move) {
	return getBattleScriptMoveEffectProfile(move).type || (move && move.type) || "";
}

function doesBattleScriptMoveBypassTypeImmunity(typeName, defendTypeName, attackerState, targetState, move, state) {
	if (typeName === "Ground" && defendTypeName === "Flying" && move && move.name === "Thousand Arrows") return true;
	return (typeName === "Normal" || typeName === "Fighting") && defendTypeName === "Ghost" &&
		hasBattleScriptEffectiveAbility(attackerState, ["Scrappy"], {state: state, attackerState: attackerState, targetState: targetState, move: move});
}

function doesBattleScriptGroundMoveHitUngrounded(move) {
	return !!(move && move.name === "Thousand Arrows");
}

function getBattleScriptTypeEffectivenessValue(typeName, targetState, state, attackerState, move) {
	var attackTypeId = getBattleScriptMoveTypeId(typeName);
	var pokemon = targetState && targetState.pokemon;
	var types = pokemon ? pokemon.types || pokemon.rawTypes || [] : [];
	var value = 4;
	var itemKey = getBattleScriptHeldItemKey(targetState, state);
	var abilityContext = {state: state, attackerState: attackerState, targetState: targetState, move: move};
	if (attackTypeId === null) return value;
	if (typeName === "Ground" && !isBattleScriptGrounded(targetState, state) && !doesBattleScriptGroundMoveHitUngrounded(move)) return itemKey === "ringtarget" ? value : 0;
	for (var i = 0; i < types.length; i++) {
		var defendTypeId = getBattleScriptMoveTypeId(types[i]);
		if (defendTypeId === null || !BATTLE_SCRIPT_EFFECTIVENESS_CHART[attackTypeId]) continue;
		var matchup = BATTLE_SCRIPT_EFFECTIVENESS_CHART[attackTypeId][defendTypeId];
		if (matchup === 0 && (itemKey === "ringtarget" || doesBattleScriptMoveBypassTypeImmunity(typeName, types[i], attackerState, targetState, move, state))) matchup = 4;
		value = Math.floor(value * matchup / 4);
	}
	if (value > 4 && hasBattleScriptEffectiveAbility(targetState, ["Wonder Guard"], abilityContext)) return value;
	return value;
}

function getBattleScriptMoveEffectivenessValue(move, targetState, state, attackerState) {
	return getBattleScriptTypeEffectivenessValue(getBattleScriptMoveType(move), targetState, state, attackerState, move);
}

function isBattleScriptBulletMove(move) {
	return !!(move && move.flags && move.flags.bullet);
}

function getBattleScriptAbilityMoveImmunityReason(move, attackerState, defenderState, state) {
	var moveType = getBattleScriptMoveType(move);
	var context = {state: state, attackerState: attackerState, targetState: defenderState, move: move};
	var typeAbsorbers = {
		Electric: ["Lightning Rod", "Motor Drive", "Volt Absorb"],
		Fire: ["Flash Fire"],
		Grass: ["Sap Sipper"],
		Water: ["Dry Skin", "Storm Drain", "Water Absorb"]
	};
	var abilities = typeAbsorbers[moveType] || [];
	var ability;
	for (var i = 0; i < abilities.length; i++) {
		ability = abilities[i];
		if (hasBattleScriptEffectiveAbility(defenderState, [ability], context)) return ability + " blocks " + moveType + " moves";
	}
	if (isBattleScriptSoundMove(move) && hasBattleScriptEffectiveAbility(defenderState, ["Soundproof"], context)) return "Soundproof blocks sound moves";
	if (isBattleScriptBulletMove(move) && hasBattleScriptEffectiveAbility(defenderState, ["Bulletproof"], context)) return "Bulletproof blocks bullet moves";
	if (hasBattleScriptEffectiveAbility(defenderState, ["Wonder Guard"], context) &&
			getBattleScriptMoveEffectivenessValue(move, defenderState, state, attackerState) <= 4) {
		return "Wonder Guard blocks damage that is not super effective";
	}
	return "";
}

function getBattleScriptTypeImmunityReason(move, attackerState, defenderState, state) {
	var moveType = getBattleScriptMoveType(move);
	var attackTypeId = getBattleScriptMoveTypeId(moveType);
	var pokemon = defenderState && defenderState.pokemon;
	var types = pokemon ? pokemon.types || pokemon.rawTypes || [] : [];
	var itemKey = getBattleScriptHeldItemKey(defenderState, state);
	var immuneTypes = [];
	if (attackTypeId === null) return "";
	if (moveType === "Ground" && !isBattleScriptGrounded(defenderState, state) &&
			itemKey !== "ringtarget" && !doesBattleScriptGroundMoveHitUngrounded(move)) {
		return "Ground has no effect on ungrounded targets";
	}
	for (var i = 0; i < types.length; i++) {
		var defendTypeId = getBattleScriptMoveTypeId(types[i]);
		if (defendTypeId === null || !BATTLE_SCRIPT_EFFECTIVENESS_CHART[attackTypeId]) continue;
		if (BATTLE_SCRIPT_EFFECTIVENESS_CHART[attackTypeId][defendTypeId] === 0 &&
				itemKey !== "ringtarget" &&
				!doesBattleScriptMoveBypassTypeImmunity(moveType, types[i], attackerState, defenderState, move, state)) {
			immuneTypes.push(types[i]);
		}
	}
	if (immuneTypes.length) return moveType + " has no effect on " + immuneTypes.join("/") + " types";
	return "";
}

function getBattleScriptDamagingMoveContextBlockReason(move, attackerSide, attackerState, defenderState, state) {
	var damage;
	var abilityReason;
	if (!isBattleScriptDamagingMove(move)) return "";
	if (getBattleScriptMoveEffectivenessValue(move, defenderState, state, attackerState) === 0) {
		return getBattleScriptTypeImmunityReason(move, attackerState, defenderState, state) || "type immunity";
	}
	abilityReason = getBattleScriptAbilityMoveImmunityReason(move, attackerState, defenderState, state);
	if (abilityReason) return abilityReason;
	if (requiresBattleScriptChargeTurn(attackerState, move, state)) return "";
	try {
		damage = getBattleScriptMoveDamage(attackerSide, attackerState, defenderState, move, state, {forceChargeResolve: true});
	} catch (e) {
		damage = null;
	}
	if (damage && damage.max <= 0) return "no effect";
	return "";
}

function getBattleScriptFractionalHP(entry, numerator, denominator) {
	if (!entry || !entry.maxHP || !denominator) return 0;
	return Math.max(1, Math.floor(entry.maxHP * numerator / denominator));
}

function damageBattleScriptEntryRange(entry, minDamage, maxDamage) {
	if (!entry || !entry.hp) return null;
	minDamage = Math.max(0, Math.round(minDamage || 0));
	maxDamage = Math.max(minDamage, Math.round(maxDamage || minDamage || 0));
	var before = {min: entry.hp.min, max: entry.hp.max};
	entry.hp = {
		min: Math.max(0, before.min - maxDamage),
		max: Math.max(0, before.max - minDamage)
	};
	if (entry.pokemon) setBattleScriptCalcPokemonHP(entry.pokemon, entry.hp.max);
	return before;
}

function healBattleScriptEntryRange(entry, minHeal, maxHeal) {
	if (!entry || !entry.hp) return null;
	minHeal = Math.max(0, Math.round(minHeal || 0));
	maxHeal = Math.max(minHeal, Math.round(maxHeal || minHeal || 0));
	var before = {min: entry.hp.min, max: entry.hp.max};
	entry.hp = {
		min: Math.min(entry.maxHP, before.min + minHeal),
		max: Math.min(entry.maxHP, before.max + maxHeal)
	};
	if (entry.pokemon) setBattleScriptCalcPokemonHP(entry.pokemon, entry.hp.max);
	return before;
}

function formatBattleScriptHPTrigger(entry, before, verb, reason) {
	return entry.label + " " + verb + " (" + getBattleScriptHPText(before, entry.maxHP) + " -> " + getBattleScriptHPText(entry.hp, entry.maxHP) + ")" + (reason ? " from " + reason : "") + ".";
}

function damageBattleScriptEntry(entry, amount, reason) {
	var before = damageBattleScriptEntryRange(entry, amount, amount);
	return before ? formatBattleScriptHPTrigger(entry, before, "lost " + amount + " HP", reason) : "";
}

function healBattleScriptEntry(entry, amount, reason) {
	var before = healBattleScriptEntryRange(entry, amount, amount);
	return before ? formatBattleScriptHPTrigger(entry, before, "healed " + amount + " HP", reason) : "";
}

function isBattleScriptContactMove(move) {
	return !!(move && move.flags && move.flags.contact);
}

function isBattleScriptSoundMove(move) {
	return !!(move && move.flags && move.flags.sound);
}

function isBattleScriptPowderMove(move) {
	if (!move || !move.name) return false;
	return !!(move.flags && move.flags.powder) || !!BATTLE_SCRIPT_POWDER_MOVES[move.name];
}

function isBattleScriptPhysicalMove(move) {
	return !!(move && move.category === "Physical");
}

function isBattleScriptSpecialMove(move) {
	return !!(move && move.category === "Special");
}

function hasBattleScriptNegativeBoosts(entry) {
	var boosts = entry && entry.pokemon ? entry.pokemon.boosts || {} : {};
	for (var stat in boosts) {
		if (Object.prototype.hasOwnProperty.call(boosts, stat) && boosts[stat] < 0) return true;
	}
	return false;
}

function clearBattleScriptNegativeBoosts(entry) {
	var boosts = entry && entry.pokemon ? entry.pokemon.boosts || {} : {};
	var cleared = [];
	for (var stat in boosts) {
		if (!Object.prototype.hasOwnProperty.call(boosts, stat) || boosts[stat] >= 0) continue;
		boosts[stat] = 0;
		cleared.push(BATTLE_SCRIPT_STAT_LABELS[stat] || stat);
	}
	return cleared;
}

function applyBattleScriptWhiteHerb(entry, details, state) {
	var item = getBattleScriptActiveHeldItem(entry, state);
	var cleared;
	if (item !== "White Herb" || !hasBattleScriptNegativeBoosts(entry)) return;
	cleared = clearBattleScriptNegativeBoosts(entry);
	if (!cleared.length) return;
	consumeBattleScriptHeldItem(entry);
	details.push(entry.label + "'s White Herb restored " + cleared.join(", ") + " and was consumed.");
}

function applyBattleScriptStatusHealingItem(targetState, status) {
	var item = targetState && targetState.pokemon ? targetState.pokemon.item || "" : "";
	if (!item || !doesBattleScriptItemHealStatus(item, status)) return null;
	targetState.pokemon.status = "";
	consumeBattleScriptHeldItem(targetState);
	return {
		item: item,
		status: status,
		text: targetState.label + "'s " + item + " healed " + (BATTLE_SCRIPT_STATUS_LABELS[status] || status) + "."
	};
}

function formatBattleScriptEffectChance(chance) {
	chance = chance || 100;
	return chance >= 100 ? "" : (Math.round(chance * 100) / 100) + "% chance: ";
}

function getBattleScriptTurnsText(turns) {
	turns = Math.max(0, ~~turns);
	if (!turns) return "active";
	return turns + " turn" + (turns === 1 ? "" : "s") + " remaining";
}

function getBattleScriptEffectSide(effect, attackerSide) {
	if (effect.target === "attackerSide") return attackerSide;
	if (effect.target === "defenderSide") return getBattleScriptOpposingSide(attackerSide);
	return "";
}

function applyBattleScriptWeatherEffect(state, effect, attackerState) {
	var weather = normalizeBattleScriptWeatherName(effect.weather || "");
	var turns = effect.turns || getBattleScriptWeatherTurns(attackerState, weather);
	if (!state || !weather) return "";
	if (state.weather === weather) {
		return weather + " is already active" + (state.weatherTurns ? " (" + getBattleScriptTurnsText(state.weatherTurns) + ")" : "") + ".";
	}
	state.weather = weather;
	state.weatherTurns = turns;
	return "Weather became " + weather + (turns ? " (" + getBattleScriptTurnsText(turns) + ")" : "") + ".";
}

function applyBattleScriptTerrainEffect(state, effect, attackerState) {
	var terrain = normalizeBattleScriptTerrainName(effect.terrain || "");
	var turns = effect.turns || getBattleScriptTerrainTurns(attackerState);
	var details = [];
	if (!state || !terrain) return "";
	if (state.terrain === terrain) {
		return terrain + " Terrain is already active" + (state.terrainTurns ? " (" + getBattleScriptTurnsText(state.terrainTurns) + ")" : "") + ".";
	}
	state.terrain = terrain;
	state.terrainTurns = turns;
	details.push(terrain + " Terrain became active" + (turns ? " (" + getBattleScriptTurnsText(turns) + ")" : "") + ".");
	applyBattleScriptTerrainSeedsForActivePokemon(state, details);
	return details.join("; ");
}

function applyBattleScriptFieldEffectState(state, effect) {
	var key = getBattleScriptFieldEffectKey(effect.fieldEffect || "");
	var def = BATTLE_SCRIPT_FIELD_EFFECT_DEFS[key];
	var existing = state && state.fieldEffects ? state.fieldEffects[key] : null;
	var turns;
	if (!state || !def) return "";
	if (existing && existing.value) {
		return def.label + " is already active" + (existing.turns ? " (" + getBattleScriptTurnsText(existing.turns) + ")" : "") + ".";
	}
	turns = effect.turns || def.defaultTurns || 0;
	setBattleScriptFieldEffect(state, key, turns);
	return def.label + " became active" + (turns ? " (" + getBattleScriptTurnsText(turns) + ")" : "") + ".";
}

function applyBattleScriptSideConditionEffect(state, effect, attackerSide, attackerState) {
	var side = getBattleScriptEffectSide(effect, attackerSide);
	var key = getBattleScriptSideConditionKey(effect.condition || "");
	var def = BATTLE_SCRIPT_SIDE_CONDITION_DEFS[key];
	var record;
	var existing;
	var value = 1;
	var turns;
	if (!state || !side || !def) return "";
	if (!state.sideConditions) state.sideConditions = createBattleScriptEmptySideConditions();
	if (!state.sideConditions[side]) state.sideConditions[side] = {};
	record = state.sideConditions[side];
	existing = record[key];
	if (def.layers) {
		value = effect.addLayer && existing ? existing.value + 1 : (effect.value || 1);
		value = Math.max(1, Math.min(def.max || 3, value));
		if (existing && existing.value >= value) {
			return def.label + " is already at " + existing.value + " layer" + (existing.value === 1 ? "" : "s") + " on " + BATTLE_SCRIPT_SIDE_LABELS[side] + " side.";
		}
	} else if (existing && existing.value) {
		return def.label + " is already active on " + BATTLE_SCRIPT_SIDE_LABELS[side] + " side" + (existing.turns ? " (" + getBattleScriptTurnsText(existing.turns) + ")" : "") + ".";
	}
	turns = getBattleScriptSideConditionTurns(def, attackerState, effect.turns);
	setBattleScriptSideCondition(state, side, key, value, turns);
	return def.label + (def.layers ? " layer " + value : "") + " became active on " + BATTLE_SCRIPT_SIDE_LABELS[side] + " side" + (turns ? " (" + getBattleScriptTurnsText(turns) + ")" : "") + ".";
}

function clearBattleScriptSideConditionsForEffect(state, effect, attackerSide) {
	var sides = effect.target === "bothSides" ? ["player", "opponent"] : [getBattleScriptEffectSide(effect, attackerSide)];
	var cleared = [];
	var conditions = effect.conditions || [];
	var sideIndex;
	var conditionIndex;
	for (sideIndex = 0; sideIndex < sides.length; sideIndex++) {
		var side = sides[sideIndex];
		if (!side || !state || !state.sideConditions || !state.sideConditions[side]) continue;
		for (conditionIndex = 0; conditionIndex < conditions.length; conditionIndex++) {
			var key = getBattleScriptSideConditionKey(conditions[conditionIndex]);
			var def = BATTLE_SCRIPT_SIDE_CONDITION_DEFS[key];
			if (!key || !state.sideConditions[side][key]) continue;
			delete state.sideConditions[side][key];
			cleared.push((def ? def.label : key) + " from " + BATTLE_SCRIPT_SIDE_LABELS[side] + " side");
		}
	}
	return cleared.length ? "Cleared " + cleared.join(", ") + "." : "";
}

function swapBattleScriptSideConditions(state) {
	var player;
	if (!state) return "";
	if (!state.sideConditions) state.sideConditions = createBattleScriptEmptySideConditions();
	player = state.sideConditions.player || {};
	state.sideConditions.player = state.sideConditions.opponent || {};
	state.sideConditions.opponent = player;
	return "Player and Trainer side conditions were swapped.";
}

function clearBattleScriptTerrainEffect(state) {
	var terrain = getBattleScriptStateTerrain(state);
	if (!state || !terrain) return "";
	state.terrain = "";
	state.terrainTurns = 0;
	return terrain + " Terrain ended.";
}

function formatBattleScriptEffectText(effect, targetState, change, applied) {
	var chanceText = formatBattleScriptEffectChance(effect.chance);
	var targetLabel = targetState ? targetState.label : "target";
	if (effect.kind === "boost") {
		if (applied && change && change.blocked) return targetLabel + " resisted " + getBattleScriptBoostStageText(effect.stat, effect.amount) + " (" + change.reason + ")";
		return chanceText + targetLabel + " " + getBattleScriptBoostStageText(effect.stat, applied && change ? change.amount : effect.amount);
	}
	if (effect.kind === "accuracy" || effect.kind === "evasion") {
		if (applied && change && change.blocked) return targetLabel + " resisted " + getBattleScriptStageText(effect.kind, effect.amount) + " (" + change.reason + ")";
		return chanceText + targetLabel + " " + getBattleScriptStageText(effect.kind, applied && change ? change.amount : effect.amount);
	}
	if (effect.kind === "status") {
		if (applied && change && change.blocked) return targetLabel + " resisted " + (BATTLE_SCRIPT_STATUS_LABELS[effect.status] || effect.status) + " (" + change.reason + ")";
		if (applied && change && change.healed) return change.healed.text;
		return chanceText + targetLabel + " " + (effect.chance >= 100 ? "is " : "may be ") + (BATTLE_SCRIPT_STATUS_LABELS[effect.status] || effect.status);
	}
	if (effect.kind === "volatile") {
		if (applied && change && change.blocked) return targetLabel + " resisted " + effect.volatile + " (" + change.reason + ")";
		return chanceText + targetLabel + " may suffer " + effect.volatile;
	}
	if (effect.kind === "drain") {
		return "attacker heals from damage dealt";
	}
	if (effect.kind === "recoil") {
		return "attacker takes recoil";
	}
	if (effect.kind === "crash") {
		return "attacker may take crash damage on a miss";
	}
	if (effect.kind === "secondary") {
		return effect.text || "has a secondary effect";
	}
	if (effect.kind === "self-faint") {
		return targetLabel + " faints";
	}
	if (effect.kind === "weather") {
		return "sets " + (effect.weather || "weather");
	}
	if (effect.kind === "terrain") {
		return "sets " + (effect.terrain || "terrain") + " Terrain";
	}
	if (effect.kind === "fieldEffect") {
		var fieldDef = BATTLE_SCRIPT_FIELD_EFFECT_DEFS[getBattleScriptFieldEffectKey(effect.fieldEffect || "")];
		return "sets " + (fieldDef ? fieldDef.label : "a field effect");
	}
	if (effect.kind === "sideCondition") {
		var sideDef = BATTLE_SCRIPT_SIDE_CONDITION_DEFS[getBattleScriptSideConditionKey(effect.condition || "")];
		return "sets " + (sideDef ? sideDef.label : "a side condition");
	}
	if (effect.kind === "clearSideConditions") {
		return "clears mapped side conditions";
	}
	if (effect.kind === "swapSideConditions") {
		return "swaps side conditions";
	}
	if (effect.kind === "clearTerrain") {
		return "clears terrain";
	}
	return chanceText + targetLabel + " has an effect";
}

function applyBattleScriptMoveEffects(attackerState, defenderState, move, options) {
	var effects = getBattleScriptMoveEffects(move);
	var details = [];
	var applyChanceEffects = options && options.applyChanceEffects;
	var skipDefender = options && options.skipDefender;
	var attackerSide = options && options.attackerSide;
	var defenderSide = attackerSide ? getBattleScriptOpposingSide(attackerSide) : "";
	if (options && options.skipChargeStartEffects) effects = filterBattleScriptChargeStartEffects(move, effects);
	for (var i = 0; i < effects.length; i++) {
		var effect = effects[i];
		var chance = effect.chance || 100;
		var targetState = effect.target === "attacker" ? attackerState : defenderState;
		var targetSide = effect.target === "attacker" ? attackerSide : defenderSide;
		var effectContext = {state: options && options.state, attackerSide: attackerSide, attackerState: attackerState, targetSide: targetSide, move: move};
		var shouldApply = chance >= 100 || applyChanceEffects;
		var change = null;
		if (shouldApply && effect.kind === "weather") {
			details.push(applyBattleScriptWeatherEffect(options && options.state, effect, attackerState));
			continue;
		}
		if (shouldApply && effect.kind === "terrain") {
			details.push(applyBattleScriptTerrainEffect(options && options.state, effect, attackerState));
			continue;
		}
		if (shouldApply && effect.kind === "fieldEffect") {
			details.push(applyBattleScriptFieldEffectState(options && options.state, effect));
			continue;
		}
		if (shouldApply && effect.kind === "sideCondition") {
			details.push(applyBattleScriptSideConditionEffect(options && options.state, effect, options && options.attackerSide, attackerState));
			continue;
		}
		if (shouldApply && effect.kind === "clearSideConditions") {
			details.push(clearBattleScriptSideConditionsForEffect(options && options.state, effect, options && options.attackerSide));
			continue;
		}
		if (shouldApply && effect.kind === "swapSideConditions") {
			details.push(swapBattleScriptSideConditions(options && options.state));
			continue;
		}
		if (shouldApply && effect.kind === "clearTerrain") {
			details.push(clearBattleScriptTerrainEffect(options && options.state));
			continue;
		}
		if (!targetState || (skipDefender && effect.target !== "attacker")) continue;
		if (shouldApply && effect.requiresOppositeGender && !isBattleScriptOppositeGender(attackerState, targetState)) {
			details.push(formatBattleScriptEffectText(effect, targetState, {changed: false, blocked: true, reason: "gender matchup"}, shouldApply));
			continue;
		}
		if (shouldApply && effect.kind === "boost") {
			var boostBlock = getBattleScriptStatEffectBlockReason(targetState, effect, effectContext);
			change = boostBlock ? {changed: false, blocked: true, reason: boostBlock} : applyBattleScriptBoost(targetState, effect.stat, effect.amount, effectContext);
		}
		if (shouldApply && (effect.kind === "accuracy" || effect.kind === "evasion")) {
			var stageBlock = getBattleScriptStatEffectBlockReason(targetState, effect, effectContext);
			change = stageBlock ? {changed: false, blocked: true, reason: stageBlock} : applyBattleScriptStage(targetState, effect.kind, effect.amount);
		}
		if (shouldApply && effect.kind === "status") {
			change = applyBattleScriptStatus(targetState, effect.status, effectContext);
			if (change && change.changed) change.healed = applyBattleScriptStatusHealingItem(targetState, effect.status);
		}
		if (!shouldApply || effect.kind === "volatile" || !change || change.changed || change.blocked) {
			details.push(formatBattleScriptEffectText(effect, targetState, change, shouldApply));
		}
	}
	applyBattleScriptWhiteHerb(attackerState, details, options && options.state);
	applyBattleScriptWhiteHerb(defenderState, details, options && options.state);
	return $.grep(details, function (detail) { return !!detail; });
}

function isBattleScriptIntimidateBlocked(targetState, sourceState, state) {
	return hasBattleScriptEffectiveAbility(targetState, BATTLE_SCRIPT_INTIMIDATE_BLOCKERS, {
		state: state,
		attackerState: sourceState,
		targetState: targetState
	});
}

function applyBattleScriptTerrainSeed(entry, state, details) {
	var itemKey = getBattleScriptHeldItemKey(entry, state);
	var seed = BATTLE_SCRIPT_TERRAIN_SEEDS[itemKey];
	var change;
	if (!seed || !state || state.terrain !== seed.terrain || !isBattleScriptGrounded(entry, state)) return;
	change = applyBattleScriptBoost(entry, seed.stat, 1, {state: state, targetState: entry});
	consumeBattleScriptHeldItem(entry);
	if (change && change.changed) {
		details.push(entry.label + "'s " + seed.terrain + " Seed raised " + getBattleScriptBoostStageText(change.stat, change.amount) + " and was consumed.");
	}
}

function applyBattleScriptTerrainSeedsForActivePokemon(state, details) {
	if (!state || !state.active) return;
	applyBattleScriptTerrainSeed(state.active.player, state, details);
	applyBattleScriptTerrainSeed(state.active.opponent, state, details);
}

function applyBattleScriptEntryHeldItemEffects(state, entry) {
	var details = [];
	var item = getBattleScriptActiveHeldItem(entry, state);
	var itemKey = normalizeBattleScriptText(item);
	var change;
	if (!entry || !entry.pokemon || !item) return details;
	applyBattleScriptTerrainSeed(entry, state, details);
	if (itemKey === "roomservice" && isBattleScriptTrickRoomActive(state)) {
		change = applyBattleScriptBoost(entry, "spe", -1, {state: state, targetState: entry});
		consumeBattleScriptHeldItem(entry);
		if (change && change.changed) details.push(entry.label + "'s Room Service lowered " + getBattleScriptBoostStageText(change.stat, change.amount) + " and was consumed.");
	}
	if (itemKey === "airballoon") details.push(entry.label + " is floating on an Air Balloon.");
	return details;
}

function applyBattleScriptStealthRockDamage(state, entry, details) {
	var condition = state && state.sideConditions && state.sideConditions[entry.side] ? state.sideConditions[entry.side].stealthrock : null;
	var effectiveness;
	var damage;
	if (!condition || !condition.value) return;
	effectiveness = getBattleScriptTypeEffectivenessValue("Rock", entry, state);
	if (!effectiveness) return;
	damage = Math.max(1, Math.floor(entry.maxHP * effectiveness / 32));
	details.push(damageBattleScriptEntry(entry, damage, "Stealth Rock"));
}

function applyBattleScriptSteelsurgeDamage(state, entry, details) {
	var condition = state && state.sideConditions && state.sideConditions[entry.side] ? state.sideConditions[entry.side].steelsurge : null;
	var effectiveness;
	var damage;
	if (!condition || !condition.value) return;
	effectiveness = getBattleScriptTypeEffectivenessValue("Steel", entry, state);
	if (!effectiveness) return;
	damage = Math.max(1, Math.floor(entry.maxHP * effectiveness / 32));
	details.push(damageBattleScriptEntry(entry, damage, "Steelsurge"));
}

function applyBattleScriptSpikesDamage(state, entry, details) {
	var condition = state && state.sideConditions && state.sideConditions[entry.side] ? state.sideConditions[entry.side].spikes : null;
	var layers;
	var denominator;
	if (!condition || !condition.value || !isBattleScriptGrounded(entry, state)) return;
	layers = Math.max(1, Math.min(3, condition.value || 1));
	denominator = layers === 1 ? 8 : layers === 2 ? 6 : 4;
	details.push(damageBattleScriptEntry(entry, getBattleScriptFractionalHP(entry, 1, denominator), "Spikes"));
}

function applyBattleScriptToxicSpikes(state, entry, details) {
	var record = state && state.sideConditions && state.sideConditions[entry.side] ? state.sideConditions[entry.side] : null;
	var condition = record ? record.toxicspikes : null;
	var status;
	var change;
	if (!condition || !condition.value || !isBattleScriptGrounded(entry, state)) return;
	if (hasBattleScriptType(entry, "Poison")) {
		delete record.toxicspikes;
		details.push(entry.label + " absorbed Toxic Spikes.");
		return;
	}
	if (hasBattleScriptType(entry, "Steel")) return;
	status = condition.value >= 2 ? "tox" : "psn";
	change = applyBattleScriptStatus(entry, status, {state: state, targetSide: entry.side, targetState: entry});
	if (change && change.changed) {
		details.push(entry.label + " was " + (status === "tox" ? "badly poisoned" : "poisoned") + " by Toxic Spikes.");
		applyBattleScriptStatusHealingItem(entry, status);
	}
}

function applyBattleScriptStickyWeb(state, entry, details) {
	var condition = state && state.sideConditions && state.sideConditions[entry.side] ? state.sideConditions[entry.side].stickyweb : null;
	var change;
	var block;
	if (!condition || !condition.value || !isBattleScriptGrounded(entry, state)) return;
	block = getBattleScriptStatEffectBlockReason(entry, {kind: "boost", amount: -1}, {state: state, targetSide: entry.side, targetState: entry});
	if (block) {
		details.push(entry.label + " resisted Sticky Web (" + block + ").");
		return;
	}
	change = applyBattleScriptBoost(entry, "spe", -1, {state: state, targetState: entry});
	if (change && change.changed) details.push(entry.label + " was slowed by Sticky Web: " + getBattleScriptBoostStageText(change.stat, change.amount) + ".");
}

function applyBattleScriptEntryHazards(state, side, entry) {
	var details = [];
	if (!state || !entry || !entry.hp || entry.hp.max <= 0) return details;
	entry.side = side;
	if (getBattleScriptHeldItemKey(entry, state) === "heavydutyboots") return details;
	applyBattleScriptStealthRockDamage(state, entry, details);
	applyBattleScriptSteelsurgeDamage(state, entry, details);
	applyBattleScriptSpikesDamage(state, entry, details);
	applyBattleScriptToxicSpikes(state, entry, details);
	applyBattleScriptStickyWeb(state, entry, details);
	applyBattleScriptWhiteHerb(entry, details, state);
	return $.grep(details, function (detail) { return !!detail; });
}

function applyBattleScriptEntryEffects(state, side, entry, options) {
	var opposingSide = getBattleScriptOpposingSide(side);
	var target = state.active[opposingSide];
	var details = [];
	var weather = getBattleScriptEntryWeather(entry, state);
	var terrain = getBattleScriptEntryTerrain(entry, state);
	if (!entry) return details;
	details = details.concat(applyBattleScriptEntryHazards(state, side, entry));
	if (!options || !options.skipWeather) {
		if (weather && state.weather !== weather) {
			state.weather = weather;
			state.weatherTurns = getBattleScriptWeatherTurns(entry, weather);
			details.push(entry.label + "'s " + entry.pokemon.ability + " set " + weather + (state.weatherTurns ? " (" + getBattleScriptTurnsText(state.weatherTurns) + ")" : "") + ".");
		}
		if (terrain && state.terrain !== terrain) {
			state.terrain = terrain;
			state.terrainTurns = getBattleScriptTerrainTurns(entry);
			details.push(entry.label + "'s " + entry.pokemon.ability + " set " + terrain + " Terrain (" + getBattleScriptTurnsText(state.terrainTurns) + ").");
		}
	}
	applyBattleScriptTerrainSeedsForActivePokemon(state, details);
	details = details.concat(applyBattleScriptEntryHeldItemEffects(state, entry));
	if (!target) {
		entry.pendingEntryEffects = true;
		return details;
	}
	entry.pendingEntryEffects = false;
	if (hasBattleScriptEffectiveAbility(entry, ["Intimidate"], {state: state})) {
		if (isBattleScriptIntimidateBlocked(target, entry, state)) {
			details.push(entry.label + "'s Intimidate was blocked by " + target.label + ".");
		} else {
			var change = applyBattleScriptBoost(target, "atk", -1, {state: state, attackerState: entry, targetState: target});
			if (change && change.changed) {
				details.push(entry.label + "'s Intimidate changed " + target.label + " " + getBattleScriptBoostStageText(change.stat, change.amount) + ".");
				applyBattleScriptWhiteHerb(target, details, state);
			}
		}
	}
	return details;
}

function applyBattleScriptPendingEntryEffects(state, side) {
	var opposingSide = getBattleScriptOpposingSide(side);
	var opposing = state.active[opposingSide];
	if (!opposing || !opposing.pendingEntryEffects) return [];
	return applyBattleScriptEntryEffects(state, opposingSide, opposing, {skipWeather: true});
}

function isBattleScriptPriorityMove(move) {
	return move && move.priority && move.priority > 0;
}

function isBattleScriptHighCritMove(move) {
	return !!(move && (move.isCrit || move.willCrit || move.flags && move.flags.highCrit ||
		/Slash|Night Slash|Leaf Blade|Psycho Cut|Cross Poison|Stone Edge|Crabhammer|Razor Leaf|Air Cutter|Shadow Claw|Karate Chop|Drill Run|Attack Order|Spacial Rend|Razor Shell|Snipe Shot/i.test(move.name)));
}

function isBattleScriptSelfFaintMove(move) {
	return !!(move && ["Memento", "Healing Wish", "Lunar Dance"].indexOf(move.name) !== -1);
}

function hasBattleScriptAbility(pokemonState, abilities) {
	var ability = pokemonState && pokemonState.pokemon ? pokemonState.pokemon.ability : "";
	return abilities.indexOf(ability) !== -1;
}

function getBattleScriptAbility(pokemonState) {
	return pokemonState && pokemonState.pokemon ? pokemonState.pokemon.ability || "" : "";
}

function hasBattleScriptAbilityShield(pokemonState) {
	return !!(pokemonState && pokemonState.pokemon && pokemonState.pokemon.item === "Ability Shield");
}

function doesBattleScriptMoveIgnoreAbility(move) {
	return !!(move && BATTLE_SCRIPT_ABILITY_IGNORE_MOVES[move.name]);
}

function doesBattleScriptAttackerIgnoreTargetAbility(attackerState, targetState, move, state) {
	if (hasBattleScriptAbilityShield(targetState)) return false;
	return (hasBattleScriptAbility(attackerState, ["Mold Breaker", "Teravolt", "Turboblaze"]) &&
			!isBattleScriptAbilitySuppressedByNeutralizingGas(attackerState, state)) ||
		doesBattleScriptMoveIgnoreAbility(move);
}

function isBattleScriptAbilitySuppressedByNeutralizingGas(pokemonState, state) {
	var side = pokemonState && pokemonState.side;
	var activeOpponent = state && state.active && side ? state.active[getBattleScriptOpposingSide(side)] : null;
	var ability = getBattleScriptAbility(pokemonState);
	if (!ability || hasBattleScriptAbilityShield(pokemonState) || BATTLE_SCRIPT_NEUTRALIZING_GAS_IGNORED_ABILITIES[ability]) return false;
	return !!(activeOpponent && (!activeOpponent.hp || activeOpponent.hp.max > 0) && hasBattleScriptAbility(activeOpponent, ["Neutralizing Gas"]));
}

function hasBattleScriptEffectiveAbility(pokemonState, abilities, context) {
	if (!hasBattleScriptAbility(pokemonState, abilities)) return false;
	if (context && isBattleScriptAbilitySuppressedByNeutralizingGas(pokemonState, context.state)) return false;
	if (context && context.targetState === pokemonState &&
			doesBattleScriptAttackerIgnoreTargetAbility(context.attackerState, pokemonState, context.move, context.state)) return false;
	return true;
}

function hasBattleScriptItem(pokemonState, items) {
	var item = pokemonState && pokemonState.pokemon ? pokemonState.pokemon.item : "";
	return items.indexOf(item) !== -1;
}

function hasBattleScriptMoveNamed(pokemonState, names) {
	if (!pokemonState || !pokemonState.pokemon || !pokemonState.pokemon.moves) return false;
	for (var i = 0; i < pokemonState.pokemon.moves.length; i++) {
		if (names.indexOf(pokemonState.pokemon.moves[i].name) !== -1) return true;
	}
	return false;
}

function hasBattleScriptMoveMatching(pokemonState, predicate) {
	if (!pokemonState || !pokemonState.pokemon || !pokemonState.pokemon.moves || typeof predicate !== "function") return false;
	for (var i = 0; i < pokemonState.pokemon.moves.length; i++) {
		if (predicate(pokemonState.pokemon.moves[i])) return true;
	}
	return false;
}

function getBattleScriptEntryWeather(entry, state) {
	var ability = entry && entry.pokemon ? entry.pokemon.ability : "";
	if (!ability) return "";
	if (!hasBattleScriptEffectiveAbility(entry, [ability], {state: state})) return "";
	return BATTLE_SCRIPT_WEATHER_ABILITIES[ability] || "";
}

function getBattleScriptEntryTerrain(entry, state) {
	var ability = entry && entry.pokemon ? entry.pokemon.ability : "";
	if (!ability) return "";
	if (!hasBattleScriptEffectiveAbility(entry, [ability], {state: state})) return "";
	return BATTLE_SCRIPT_TERRAIN_ABILITIES[ability] || "";
}

function getBattleScriptBaseWeather() {
	try {
		var field = createField();
		return field && field.weather ? field.weather : "";
	} catch (e) {
		return "";
	}
}

function getBattleScriptBestDamage(attackerState, defenderState, state) {
	var best = null;
	var activeSearch = getBattleScriptCraftActiveSearch();
	if (!attackerState || !attackerState.pokemon || !attackerState.pokemon.moves || !defenderState) return null;
	for (var i = 0; i < attackerState.pokemon.moves.length; i++) {
		var move = attackerState.pokemon.moves[i];
		var options;
		var damage;
		if (attackerState.chargingMove && normalizeBattleScriptText(attackerState.chargingMove) !== normalizeBattleScriptText(move.name)) continue;
		if (!isBattleScriptDamagingMove(move)) continue;
		try {
			options = {
				previewChargeStartEffects: doesBattleScriptPowerHerbResolveCharge(attackerState, move, state)
			};
			damage = activeSearch ?
				getBattleScriptCraftMoveDamage(state, attackerState.side, attackerState, defenderState, move, options) :
				getBattleScriptMoveDamageResult(attackerState.side, attackerState, defenderState, move, state, options).damage;
			if (!damage) continue;
			if (!best || damage.max > best.damage.max) {
				best = {move: move, damage: damage};
			}
		} catch (e) {}
	}
	return best;
}

function getBattleScriptDamagePercentAgainst(damage, defenderState) {
	return damage && defenderState && defenderState.maxHP ? damage.max / defenderState.maxHP : 0;
}

function getBattleScriptMoveDamage(attackerSide, attackerState, defenderState, move, state, options) {
	return getBattleScriptMoveDamageResult(attackerSide, attackerState, defenderState, move, state, options).damage;
}

function getBattleScriptAITurnMoveDamageRange(state, attackerSide, attackerState, defenderState, move) {
	var damageResult = getBattleScriptMoveDamageResult(attackerSide, attackerState, defenderState, move, state, {
		previewChargeStartEffects: doesBattleScriptPowerHerbResolveCharge(attackerState, move, state)
	});
	return damageResult.damage;
}

function cloneBattleScriptMoveWithOptions(move, options) {
	var cloned = move && typeof move.clone === "function" ? move.clone() : move;
	if (cloned && options && typeof options.isCrit !== "undefined") cloned.isCrit = options.isCrit;
	return cloned;
}

function getBattleScriptCritDamage(attackerSide, attackerState, defenderState, move, state) {
	var critMove = cloneBattleScriptMoveWithOptions(move, {isCrit: true});
	return getBattleScriptMoveDamage(attackerSide, attackerState, defenderState, critMove, state, {
		previewChargeStartEffects: doesBattleScriptPowerHerbResolveCharge(attackerState, critMove, state)
	});
}

function getBattleScriptSurvivalInfo(defenderState, damage) {
	var hp = defenderState && defenderState.hp ? defenderState.hp.max : 0;
	var hitsToKO;
	if (!hp || !damage) return {turns: 0, text: "unknown"};
	if (damage.max <= 0) return {turns: 4, text: "no damage"};
	hitsToKO = Math.ceil(hp / damage.max);
	if (hitsToKO <= 1) return {turns: 0, text: "falls this turn"};
	if (hitsToKO >= 5) return {turns: 4, text: "4+ turns (" + hitsToKO + "HKO)"};
	return {turns: hitsToKO - 1, text: (hitsToKO - 1) + " turn" + (hitsToKO === 2 ? "" : "s") + " (" + hitsToKO + "HKO)"};
}

function getBattleScriptReturnDamageInfo(candidateState, attackerState, state) {
	var bestDamage = getBattleScriptBestDamage(candidateState, attackerState, state);
	var risk;
	if (!bestDamage) {
		return {
			maxPercent: 0,
			koBonus: 0,
			text: "no damaging move"
		};
	}
	risk = getBattleScriptRisk(bestDamage.damage, attackerState);
	return {
		maxPercent: getBattleScriptDamagePercentAgainst(bestDamage.damage, attackerState),
		koBonus: risk === "Guaranteed KO" ? 1 : risk === "KO risk" ? 0.5 : 0,
		text: bestDamage.move.name + " for " + getBattleScriptDamageText(bestDamage.damage, attackerState.pokemon) + " (" + risk + ")"
	};
}

function getBattleScriptPostDamageState(pokemonState, damage, context) {
	var clonedState = cloneBattleScriptRosterEntry(pokemonState);
	if (!clonedState) return null;
	if (damage) updateBattleScriptHP(clonedState, damage, context);
	return clonedState;
}

function getBattleScriptLikelyAIMoveInfo(state, attackerState, defenderState, incomingDamage, incomingMove) {
	var scores;
	var top;
	var damageText;
	var nextState;
	var nextAttackerState;
	var nextDefenderState;
	var damagePercent;
	var remainingPercent;
	var favorable = false;
	if (battleScriptAIModel !== "swsh") {
		return {
			favorable: false,
			maxPercent: 1,
			text: ""
		};
	}
	nextAttackerState = cloneBattleScriptRosterEntry(attackerState) || attackerState;
	nextDefenderState = getBattleScriptPostDamageState(defenderState, incomingDamage, {
		state: state,
		attackerState: attackerState,
		move: incomingMove
	});
	if (!nextDefenderState) {
		return {
			favorable: false,
			maxPercent: 1,
			text: "unknown"
		};
	}
	nextAttackerState.hasActed = true;
	if (nextDefenderState.hp.max <= 0) {
		return {
			favorable: false,
			maxPercent: 2,
			targetState: nextDefenderState,
			text: "no further action; " + defenderState.label + " faints on entry"
		};
	}
	nextState = createBattleScriptRecommendationState(state, nextDefenderState, nextAttackerState);
	try {
		scores = getBattleScriptAIModelMoveScores(nextState, "opponent", nextAttackerState, nextDefenderState);
	} catch (e) {
		return {
			favorable: false,
			maxPercent: 1,
			targetState: nextDefenderState,
			text: "unknown"
		};
	}
	if (!scores.length) {
		return {
			favorable: false,
			maxPercent: 1,
			targetState: nextDefenderState,
			text: "unknown"
		};
	}
	top = scores[0];
	if (top.damage) {
		damageText = getBattleScriptDamageText(top.damage, nextDefenderState.pokemon);
		damagePercent = getBattleScriptDamagePercentAgainst(top.damage, nextDefenderState);
		remainingPercent = nextDefenderState.hp.max ? top.damage.max / nextDefenderState.hp.max : damagePercent;
		favorable = Math.max(damagePercent, remainingPercent) <= 0.25;
	} else {
		damageText = top.notes && top.notes.length ? top.notes[0] : "no damage";
		damagePercent = 0;
		remainingPercent = 0;
		favorable = true;
	}
	return {
		favorable: favorable,
		maxPercent: Math.max(damagePercent || 0, remainingPercent || 0),
		damage: top.damage,
		targetState: nextDefenderState,
		text: top.move + " next (" + formatBattleScriptAIScoreSummary(top) + ", " + damageText + ")"
	};
}

function getBattleScriptSwShTerrain() {
	return getBattleScriptStateTerrain(battleScriptRuntimeState);
}

function isBattleScriptSwShDoublesBattle(state) {
	if (typeof isDoublesFormatSelected === "function" && isDoublesFormatSelected()) return true;
	if (state && state.doubles) return true;
	if (state && state.active) {
		if (state.active.player2 || state.active.opponent2) return true;
		if (Array.isArray(state.active.player) || Array.isArray(state.active.opponent)) return true;
	}
	return false;
}

function getSwShMoveScores(state, attackerSide, attackerState, defenderState) {
	if (!window.SwShAIPredictor || !window.SwShAIPredictor.hasData()) return [];
	return window.SwShAIPredictor.getMoveScores(state, attackerSide, attackerState, defenderState, {
		calculateDamage: calculateBattleScriptDamage,
		getDamageRange: getBattleScriptDamageRange,
		getMoveDamageRange: getBattleScriptAITurnMoveDamageRange,
		getMoveEffectiveness: getBattleScriptMoveEffectivenessValue,
		getBestDamage: getBattleScriptBestDamage,
		getSpeed: getBattleScriptSpeed,
		getTerrain: function () { return getBattleScriptStateTerrain(state); },
		getSideConditions: function () { return getBattleScriptSwShSideConditions(state); },
		isDoublesBattle: isBattleScriptSwShDoublesBattle
	});
}

function getBattleScriptAIModelMoveScores(state, attackerSide, attackerState, defenderState) {
	if (battleScriptAIModel === "swsh") {
		return applyBattleScriptAIContextFilters(getSwShMoveScores(state, attackerSide, attackerState, defenderState), state, attackerSide, attackerState, defenderState);
	}
	return [];
}

function getBattleScriptAIModelMoveChoice(state, attackerSide, attackerState, defenderState, selectedMove) {
	var scores;
	var switchDecisions;
	var switchDecision = null;
	var selected = null;
	if (battleScriptAIModel !== "swsh" || attackerSide !== "opponent") return null;
	switchDecisions = getSwShSwitchDecisions(state, "opponent", defenderState);
	if (switchDecisions.length && switchDecisions[0].enabled) switchDecision = switchDecisions[0];
	scores = getBattleScriptAIModelMoveScores(state, attackerSide, attackerState, defenderState);
	if (!scores.length) return null;
	for (var i = 0; i < scores.length; i++) {
		if (selectedMove && scores[i].move === selectedMove.name) selected = scores[i];
	}
	return {
		model: getBattleScriptAIModelName(battleScriptAIModel),
		top: scores[0],
		selected: selected,
		switchDecision: switchDecision,
		confidence: getBattleScriptAIScoreConfidence(scores),
		scores: scores.slice(0, 4)
	};
}

function getSwShSwitchDecisions(state, side, playerState) {
	if (battleScriptAIModel !== "swsh" || side !== "opponent" || !playerState || !window.SwShAIPredictor) return [];
	return window.SwShAIPredictor.getSwitchDecisions(state, side, playerState, {
		calculateDamage: calculateBattleScriptDamage,
		getDamageRange: getBattleScriptDamageRange,
		getMoveDamageRange: getBattleScriptAITurnMoveDamageRange,
		getMoveEffectiveness: getBattleScriptMoveEffectivenessValue,
		getBestDamage: getBattleScriptBestDamage,
		getSpeed: getBattleScriptSpeed,
		getTerrain: function () { return getBattleScriptStateTerrain(state); },
		getSideConditions: function () { return getBattleScriptSwShSideConditions(state); },
		isDoublesBattle: isBattleScriptSwShDoublesBattle
	});
}

function isBattleScriptFullHPRange(range, maxHP) {
	return !!(range && maxHP && range.min === maxHP && range.max === maxHP);
}

function canBattleScriptSurviveOneHit(targetState, before, damage, context) {
	var move = context && context.move;
	if (!targetState || !before || !damage || damage.max <= 0) return false;
	if (!isBattleScriptFullHPRange(before, targetState.maxHP)) return false;
	if (move && move.hits && move.hits > 1) return false;
	return targetState.hp.min <= 0;
}

function applyBattleScriptSurvivalEffects(targetState, before, damage, context) {
	var details = [];
	var sturdyContext = {
		state: context && context.state,
		attackerState: context && context.attackerState,
		targetState: targetState,
		move: context && context.move
	};
	if (!canBattleScriptSurviveOneHit(targetState, before, damage, context)) return details;
	if (hasBattleScriptEffectiveAbility(targetState, ["Sturdy"], sturdyContext)) {
		targetState.hp.min = Math.max(1, targetState.hp.min);
		targetState.hp.max = Math.max(1, targetState.hp.max);
		details.push(targetState.label + "'s Sturdy let it hang on with 1 HP.");
		return details;
	}
	if (targetState.pokemon && targetState.pokemon.item === "Focus Sash") {
		targetState.hp.min = Math.max(1, targetState.hp.min);
		targetState.hp.max = Math.max(1, targetState.hp.max);
		if (damage.min >= before.max) {
			consumeBattleScriptHeldItem(targetState);
			details.push(targetState.label + "'s Focus Sash let it hang on with 1 HP and was consumed.");
		} else {
			details.push(targetState.label + "'s Focus Sash can let it hang on with 1 HP on KO rolls.");
		}
	}
	return details;
}

function getBattleScriptDamageRatioRange(damage, numerator, denominator) {
	var minDamage = Math.max(0, Math.floor((damage && damage.min || 0) * numerator / denominator));
	var maxDamage = Math.max(0, Math.floor((damage && damage.max || 0) * numerator / denominator));
	if (damage && damage.max > 0 && !maxDamage) maxDamage = 1;
	if (damage && damage.min > 0 && !minDamage) minDamage = 1;
	return {min: minDamage, max: Math.max(minDamage, maxDamage)};
}

function applyBattleScriptHPThresholdHeldItems(entry, details, state) {
	var item = getBattleScriptActiveHeldItem(entry, state);
	var itemKey = normalizeBattleScriptText(item);
	var threshold;
	var heal;
	var change;
	if (!entry || !entry.hp || entry.hp.max <= 0 || !item) return;
	threshold = Math.floor(entry.maxHP / 2);
	if (itemKey === "oranberry" && entry.hp.max <= threshold) {
		consumeBattleScriptHeldItem(entry);
		details.push(healBattleScriptEntry(entry, 10, "Oran Berry"));
		return;
	}
	if (itemKey === "berryjuice" && entry.hp.max <= threshold) {
		consumeBattleScriptHeldItem(entry);
		details.push(healBattleScriptEntry(entry, 20, "Berry Juice"));
		return;
	}
	if (itemKey === "sitrusberry" && entry.hp.max <= threshold) {
		consumeBattleScriptHeldItem(entry);
		details.push(healBattleScriptEntry(entry, getBattleScriptFractionalHP(entry, 1, 4), "Sitrus Berry"));
		return;
	}
	threshold = Math.floor(entry.maxHP / 4);
	if (BATTLE_SCRIPT_PINCH_HEAL_BERRIES[itemKey] && entry.hp.max <= threshold) {
		consumeBattleScriptHeldItem(entry);
		heal = getBattleScriptFractionalHP(entry, 1, 3);
		details.push(healBattleScriptEntry(entry, heal, item));
		return;
	}
	if (BATTLE_SCRIPT_PINCH_STAT_BERRIES[itemKey] && entry.hp.max <= threshold) {
		change = applyBattleScriptBoost(entry, BATTLE_SCRIPT_PINCH_STAT_BERRIES[itemKey], 1, {state: state, targetState: entry});
		consumeBattleScriptHeldItem(entry);
		if (change && change.changed) details.push(entry.label + "'s " + item + " raised " + getBattleScriptBoostStageText(change.stat, change.amount) + " and was consumed.");
		return;
	}
	if (itemKey === "custapberry" && entry.hp.max <= threshold) {
		entry.custapReady = true;
		consumeBattleScriptHeldItem(entry);
		details.push(entry.label + "'s Custap Berry will make its next move act early.");
		return;
	}
	if (itemKey === "lansatberry" && entry.hp.max <= threshold) {
		entry.focusEnergy = true;
		consumeBattleScriptHeldItem(entry);
		details.push(entry.label + "'s Lansat Berry heightened its critical hit chance.");
		return;
	}
	if (itemKey === "micleberry" && entry.hp.max <= threshold) {
		entry.micleReady = true;
		consumeBattleScriptHeldItem(entry);
		details.push(entry.label + "'s Micle Berry will boost its next move accuracy.");
		return;
	}
	if (itemKey === "starfberry" && entry.hp.max <= threshold) {
		change = applyBattleScriptBoost(entry, "atk", 2, {state: state, targetState: entry});
		consumeBattleScriptHeldItem(entry);
		if (change && change.changed) details.push(entry.label + "'s Starf Berry raised " + getBattleScriptBoostStageText(change.stat, change.amount) + " and was consumed.");
	}
}

function applyBattleScriptDrainAndRecoil(attackerState, move, damage, details, state) {
	var effects = getBattleScriptMoveEffects(move);
	var attackerItemKey = getBattleScriptHeldItemKey(attackerState, state);
	for (var i = 0; i < effects.length; i++) {
		var effect = effects[i];
		var ratio;
		var range;
		var before;
		if (!effect.ratio || (effect.kind !== "drain" && effect.kind !== "recoil")) continue;
		ratio = $.isArray(effect.ratio) ? effect.ratio : [effect.ratio, 100];
		range = getBattleScriptDamageRatioRange(damage, ratio[0], ratio[1]);
		if (effect.kind === "drain") {
			if (attackerItemKey === "bigroot") {
				range.min = Math.max(range.min ? 1 : 0, Math.floor(range.min * 13 / 10));
				range.max = Math.max(range.min, Math.max(range.max ? 1 : 0, Math.floor(range.max * 13 / 10)));
			}
			before = healBattleScriptEntryRange(attackerState, range.min, range.max);
			if (before) details.push(formatBattleScriptHPTrigger(attackerState, before, "healed", move.name + " drain" + (attackerItemKey === "bigroot" ? " with Big Root" : "")));
		} else {
			before = damageBattleScriptEntryRange(attackerState, range.min, range.max);
			if (before) details.push(formatBattleScriptHPTrigger(attackerState, before, "lost HP", move.name + " recoil"));
			applyBattleScriptHPThresholdHeldItems(attackerState, details, state);
		}
	}
}

function applyBattleScriptPostHitAbilityEffects(attackerState, defenderState, move, damage, before, details, state) {
	var moveType = getBattleScriptMoveType(move);
	var defenderContext = {state: state, attackerState: attackerState, targetState: defenderState, move: move};
	var attackerContext = {state: state, attackerState: defenderState, targetState: attackerState, move: move};
	var change;
	if (!attackerState || !defenderState || !damage || damage.max <= 0) return;
	if (hasBattleScriptEffectiveAbility(defenderState, ["Weak Armor"], defenderContext) && isBattleScriptPhysicalMove(move)) {
		change = applyBattleScriptBoost(defenderState, "def", -1, defenderContext);
		if (change && change.changed) details.push(defenderState.label + "'s Weak Armor changed " + getBattleScriptBoostStageText(change.stat, change.amount) + ".");
		change = applyBattleScriptBoost(defenderState, "spe", 2, defenderContext);
		if (change && change.changed) details.push(defenderState.label + "'s Weak Armor changed " + getBattleScriptBoostStageText(change.stat, change.amount) + ".");
	}
	if (hasBattleScriptEffectiveAbility(defenderState, ["Stamina"], defenderContext)) {
		change = applyBattleScriptBoost(defenderState, "def", 1, defenderContext);
		if (change && change.changed) details.push(defenderState.label + "'s Stamina raised " + getBattleScriptBoostStageText(change.stat, change.amount) + ".");
	}
	if (hasBattleScriptEffectiveAbility(defenderState, ["Water Compaction"], defenderContext) && moveType === "Water") {
		change = applyBattleScriptBoost(defenderState, "def", 2, defenderContext);
		if (change && change.changed) details.push(defenderState.label + "'s Water Compaction raised " + getBattleScriptBoostStageText(change.stat, change.amount) + ".");
	}
	if (hasBattleScriptEffectiveAbility(defenderState, ["Steam Engine"], defenderContext) && (moveType === "Water" || moveType === "Fire")) {
		change = applyBattleScriptBoost(defenderState, "spe", 6, defenderContext);
		if (change && change.changed) details.push(defenderState.label + "'s Steam Engine raised " + getBattleScriptBoostStageText(change.stat, change.amount) + ".");
	}
	if (hasBattleScriptEffectiveAbility(defenderState, ["Justified"], defenderContext) && moveType === "Dark") {
		change = applyBattleScriptBoost(defenderState, "atk", 1, defenderContext);
		if (change && change.changed) details.push(defenderState.label + "'s Justified raised " + getBattleScriptBoostStageText(change.stat, change.amount) + ".");
	}
	if (hasBattleScriptEffectiveAbility(defenderState, ["Rattled"], defenderContext) && /^(?:Bug|Dark|Ghost)$/.test(moveType)) {
		change = applyBattleScriptBoost(defenderState, "spe", 1, defenderContext);
		if (change && change.changed) details.push(defenderState.label + "'s Rattled raised " + getBattleScriptBoostStageText(change.stat, change.amount) + ".");
	}
	if (hasBattleScriptEffectiveAbility(defenderState, ["Berserk"], defenderContext) &&
			before && before.max > Math.floor(defenderState.maxHP / 2) && defenderState.hp.max <= Math.floor(defenderState.maxHP / 2)) {
		change = applyBattleScriptBoost(defenderState, "spa", 1, defenderContext);
		if (change && change.changed) details.push(defenderState.label + "'s Berserk raised " + getBattleScriptBoostStageText(change.stat, change.amount) + ".");
	}
	if (hasBattleScriptEffectiveAbility(defenderState, ["Sand Spit"], defenderContext) && state && state.weather !== "Sand") {
		state.weather = "Sand";
		state.weatherTurns = BATTLE_SCRIPT_DEFAULT_WEATHER_TURNS;
		details.push(defenderState.label + "'s Sand Spit started Sand (" + getBattleScriptTurnsText(state.weatherTurns) + ").");
	}
	if (hasBattleScriptEffectiveAbility(defenderState, ["Cotton Down"], defenderContext)) {
		change = applyBattleScriptBoost(attackerState, "spe", -1, attackerContext);
		if (change && change.changed) details.push(defenderState.label + "'s Cotton Down changed " + attackerState.label + " " + getBattleScriptBoostStageText(change.stat, change.amount) + ".");
	}
	if (isBattleScriptContactMove(move) && getBattleScriptHeldItemKey(attackerState, state) !== "protectivepads" &&
			hasBattleScriptEffectiveAbility(defenderState, ["Gooey", "Tangling Hair"], defenderContext)) {
		change = applyBattleScriptBoost(attackerState, "spe", -1, attackerContext);
		if (change && change.changed) details.push(defenderState.label + "'s ability changed " + attackerState.label + " " + getBattleScriptBoostStageText(change.stat, change.amount) + ".");
	}
	if (isBattleScriptContactMove(move) && getBattleScriptHeldItemKey(attackerState, state) !== "protectivepads" &&
			hasBattleScriptEffectiveAbility(defenderState, ["Rough Skin", "Iron Barbs"], defenderContext)) {
		details.push(damageBattleScriptEntry(attackerState, getBattleScriptFractionalHP(attackerState, 1, 8), defenderState.pokemon.ability));
		applyBattleScriptHPThresholdHeldItems(attackerState, details, state);
	}
	applyBattleScriptWhiteHerb(defenderState, details, state);
	applyBattleScriptWhiteHerb(attackerState, details, state);
}

function applyBattleScriptPostDamageHeldItemEffects(attackerState, defenderState, move, damage, before, details, state) {
	var defenderItem = getBattleScriptActiveHeldItem(defenderState, state);
	var defenderItemKey = normalizeBattleScriptText(defenderItem);
	var attackerItem = getBattleScriptActiveHeldItem(attackerState, state);
	var attackerItemKey = normalizeBattleScriptText(attackerItem);
	var moveType = getBattleScriptMoveType(move);
	var effectiveness = getBattleScriptMoveEffectivenessValue(move, defenderState, state, attackerState);
	var change;
	var trigger;
	var range;
	var beforeHeal;
	if (!attackerState || !defenderState || !damage || damage.max <= 0) return;
	if (defenderItemKey === "airballoon") {
		consumeBattleScriptHeldItem(defenderState);
		details.push(defenderState.label + "'s Air Balloon popped.");
	}
	if (BATTLE_SCRIPT_RESIST_BERRIES[defenderItemKey] === moveType && effectiveness > 4) {
		consumeBattleScriptHeldItem(defenderState);
		details.push(defenderState.label + "'s " + defenderItem + " was consumed after weakening " + move.name + ".");
	}
	if (defenderItemKey === "weaknesspolicy" && effectiveness > 4) {
		consumeBattleScriptHeldItem(defenderState);
		change = applyBattleScriptBoost(defenderState, "atk", 2, {state: state, attackerState: attackerState, targetState: defenderState, move: move});
		if (change && change.changed) details.push(defenderState.label + "'s Weakness Policy raised " + getBattleScriptBoostStageText(change.stat, change.amount) + ".");
		change = applyBattleScriptBoost(defenderState, "spa", 2, {state: state, attackerState: attackerState, targetState: defenderState, move: move});
		if (change && change.changed) details.push(defenderState.label + "'s Weakness Policy raised " + getBattleScriptBoostStageText(change.stat, change.amount) + ".");
	}
	trigger = BATTLE_SCRIPT_DAMAGE_TRIGGER_ITEMS[defenderItemKey];
	if (trigger && trigger.type === moveType) {
		consumeBattleScriptHeldItem(defenderState);
		change = applyBattleScriptBoost(defenderState, trigger.stat, trigger.amount, {state: state, attackerState: attackerState, targetState: defenderState, move: move});
		if (change && change.changed) details.push(defenderState.label + "'s " + defenderItem + " raised " + getBattleScriptBoostStageText(change.stat, change.amount) + ".");
	}
	if (defenderItemKey === "keeberry" && isBattleScriptPhysicalMove(move)) {
		consumeBattleScriptHeldItem(defenderState);
		change = applyBattleScriptBoost(defenderState, "def", 1, {state: state, attackerState: attackerState, targetState: defenderState, move: move});
		if (change && change.changed) details.push(defenderState.label + "'s Kee Berry raised " + getBattleScriptBoostStageText(change.stat, change.amount) + ".");
	}
	if (defenderItemKey === "marangaberry" && isBattleScriptSpecialMove(move)) {
		consumeBattleScriptHeldItem(defenderState);
		change = applyBattleScriptBoost(defenderState, "spd", 1, {state: state, attackerState: attackerState, targetState: defenderState, move: move});
		if (change && change.changed) details.push(defenderState.label + "'s Maranga Berry raised " + getBattleScriptBoostStageText(change.stat, change.amount) + ".");
	}
	if (defenderItemKey === "jabocaberry" && isBattleScriptPhysicalMove(move)) {
		consumeBattleScriptHeldItem(defenderState);
		details.push(damageBattleScriptEntry(attackerState, getBattleScriptFractionalHP(attackerState, 1, 8), "Jaboca Berry"));
	}
	if (defenderItemKey === "rowapberry" && isBattleScriptSpecialMove(move)) {
		consumeBattleScriptHeldItem(defenderState);
		details.push(damageBattleScriptEntry(attackerState, getBattleScriptFractionalHP(attackerState, 1, 8), "Rowap Berry"));
	}
	if (defenderItemKey === "rockyhelmet" && isBattleScriptContactMove(move) && attackerItemKey !== "protectivepads") {
		details.push(damageBattleScriptEntry(attackerState, getBattleScriptFractionalHP(attackerState, 1, 6), "Rocky Helmet"));
	}
	applyBattleScriptHPThresholdHeldItems(defenderState, details, state);
	if (attackerItemKey === "shellbell") {
		range = getBattleScriptDamageRatioRange(damage, 1, 8);
		beforeHeal = healBattleScriptEntryRange(attackerState, range.min, range.max);
		if (beforeHeal) details.push(formatBattleScriptHPTrigger(attackerState, beforeHeal, "healed", "Shell Bell"));
	}
	if (attackerItemKey === "lifeorb" && !hasBattleScriptEffectiveAbility(attackerState, ["Magic Guard"], {state: state, attackerState: attackerState, targetState: defenderState, move: move})) {
		details.push(damageBattleScriptEntry(attackerState, getBattleScriptFractionalHP(attackerState, 1, 10), "Life Orb"));
	}
	if (attackerItemKey === "throatspray" && isBattleScriptSoundMove(move)) {
		consumeBattleScriptHeldItem(attackerState);
		change = applyBattleScriptBoost(attackerState, "spa", 1, {state: state, attackerState: attackerState, targetState: attackerState, move: move});
		if (change && change.changed) details.push(attackerState.label + "'s Throat Spray raised " + getBattleScriptBoostStageText(change.stat, change.amount) + ".");
	}
	applyBattleScriptHPThresholdHeldItems(attackerState, details, state);
}

function applyBattleScriptPostDamageEffects(attackerState, defenderState, move, damage, before, state) {
	var details = [];
	if (!attackerState || !defenderState || !move || !damage || damage.max <= 0 || damage.blocked) return details;
	applyBattleScriptDrainAndRecoil(attackerState, move, damage, details, state);
	applyBattleScriptPostHitAbilityEffects(attackerState, defenderState, move, damage, before, details, state);
	applyBattleScriptPostDamageHeldItemEffects(attackerState, defenderState, move, damage, before, details, state);
	commitBattleScriptMoveUse(attackerState);
	lockBattleScriptChoiceMove(attackerState, move, state);
	return $.grep(details, function (detail) { return !!detail; });
}

function updateBattleScriptHP(targetState, damage, context) {
	var before = {min: targetState.hp.min, max: targetState.hp.max};
	targetState.hp = {
		min: Math.max(0, before.min - damage.max),
		max: Math.max(0, before.max - damage.min)
	};
	before.survivalDetails = applyBattleScriptSurvivalEffects(targetState, before, damage, context);
	before.postDamageDetails = applyBattleScriptPostDamageEffects(
		context && context.attackerState,
		targetState,
		context && context.move,
		damage,
		before,
		context && context.state
	);
	if (targetState.pokemon) setBattleScriptCalcPokemonHP(targetState.pokemon, targetState.hp.max);
	return before;
}

function addBattleScriptAlias(aliases, value) {
	var key = normalizeBattleScriptText(value);
	if (key) aliases[key] = true;
}

function createBattleScriptRosterEntry(side, pokemon, label, source) {
	if (!pokemon) return null;
	var maxHP = getBattleScriptPokemonMaxHP(pokemon);
	var currentHP = getBattleScriptPokemonCurrentHP(pokemon) || maxHP;
	var entry = {
		side: side,
		pokemon: pokemon,
		label: label || pokemon.name,
		source: source || "",
		maxHP: maxHP,
		hp: {min: currentHP, max: currentHP},
		accuracyStage: 0,
		evasionStage: 0,
		hasActed: false,
		mustRecharge: false,
		chargingMove: "",
		pendingEntryEffects: false,
		originalItem: pokemon.item || "",
		bagItemAssigned: false,
		assignedBagItem: "",
		consumedItem: "",
		belchBerryConsumed: false,
		choiceLockMove: "",
		choiceLockMoveId: 0,
		custapReady: false,
		focusEnergy: false,
		micleReady: false,
		toxicCounter: 0,
		rechargeMove: "",
		aliases: {}
	};
	setBattleScriptCalcPokemonHP(entry.pokemon, entry.hp.max);
	addBattleScriptPokemonFormatAliases(entry.aliases, entry.label);
	addBattleScriptPokemonFormatAliases(entry.aliases, pokemon.name);
	addBattleScriptPokemonFormatAliases(entry.aliases, source);
	refreshBattleScriptEntryItemAliases(entry);
	return entry;
}

function cloneBattleScriptRosterEntry(entry) {
	var clonedPokemon;
	var clonedEntry;
	if (!entry) return null;
	clonedPokemon = cloneBattleScriptPokemon(entry.pokemon);
	clonedEntry = createBattleScriptRosterEntry(entry.side, clonedPokemon, entry.label, entry.source);
	if (!clonedEntry) return null;
	clonedEntry.hp = {min: entry.hp.min, max: entry.hp.max};
	clonedEntry.maxHP = entry.maxHP;
	setBattleScriptCalcPokemonHP(clonedEntry.pokemon, clonedEntry.hp.max);
	clonedEntry.accuracyStage = entry.accuracyStage || 0;
	clonedEntry.evasionStage = entry.evasionStage || 0;
	clonedEntry.hasActed = !!entry.hasActed;
	clonedEntry.mustRecharge = !!entry.mustRecharge;
	clonedEntry.chargingMove = entry.chargingMove || "";
	clonedEntry.pendingEntryEffects = !!entry.pendingEntryEffects;
	clonedEntry.originalItem = typeof entry.originalItem === "undefined" ? (clonedPokemon.item || "") : entry.originalItem;
	clonedEntry.bagItemAssigned = !!entry.bagItemAssigned;
	clonedEntry.assignedBagItem = entry.assignedBagItem || "";
	clonedEntry.consumedItem = entry.consumedItem || "";
	clonedEntry.belchBerryConsumed = !!entry.belchBerryConsumed;
	clonedEntry.choiceLockMove = entry.choiceLockMove || "";
	clonedEntry.choiceLockMoveId = entry.choiceLockMoveId || 0;
	clonedEntry.custapReady = !!entry.custapReady;
	clonedEntry.focusEnergy = !!entry.focusEnergy;
	clonedEntry.micleReady = !!entry.micleReady;
	clonedEntry.toxicCounter = entry.toxicCounter || 0;
	clonedEntry.rechargeMove = entry.rechargeMove || "";
	return clonedEntry;
}

function addBattleScriptRosterEntry(roster, entry) {
	if (!entry) return;
	for (var i = 0; i < roster.length; i++) {
		if (entry.source && roster[i].source && normalizeBattleScriptText(roster[i].source) === normalizeBattleScriptText(entry.source)) return;
		if (!entry.source && normalizeBattleScriptText(roster[i].label) === normalizeBattleScriptText(entry.label)) return;
	}
	roster.push(entry);
}

function getBattleScriptPlayerRoster() {
	var roster = [];
	$("#team-poke-list .box-pokemon").each(function () {
		var fullSetName = $(this).attr("data-id");
		try {
			addBattleScriptRosterEntry(
				roster,
				createBattleScriptRosterEntry("player", createPokemon(fullSetName), $(this).attr("data-pokemon"), fullSetName)
			);
		} catch (e) {}
	});
	return roster;
}

function getBattleScriptBoxRoster() {
	var roster = [];
	$("#box-poke-list .box-pokemon").each(function () {
		var fullSetName = $(this).attr("data-id");
		try {
			addBattleScriptRosterEntry(
				roster,
				createBattleScriptRosterEntry("player", createPokemon(fullSetName), $(this).attr("data-pokemon"), fullSetName)
			);
		} catch (e) {}
	});
	return roster;
}

function getBattleScriptTrainerRoster() {
	var roster = [];
	var trainerId = $("#trainer-selector").val();
	var entry = typeof getTrainerEntry === "function" ? getTrainerEntry(trainerId) : null;
	var trainer = typeof getTrainerPokemon === "function" ? getTrainerPokemon(entry) : [];
	for (var i = 0; i < trainer.length; i++) {
		var trainerPokemon = trainer[i];
		var fullSetName = addTrainerPokemonToDex(entry, trainerPokemon);
		if (!fullSetName) continue;
		try {
			var label = getTrainerPokemonButtonLabel(trainerPokemon);
			var rosterEntry = createBattleScriptRosterEntry(
				"opponent",
				createPokemon(fullSetName),
				label,
				getTrainerPokemonLabel(trainerPokemon)
			);
			addBattleScriptAlias(rosterEntry.aliases, getTrainerPokemonSpecies(trainerPokemon));
			addBattleScriptRosterEntry(roster, rosterEntry);
		} catch (e) {}
	}
	return roster;
}

function getBattleScriptRosters() {
	return {
		player: getBattleScriptPlayerRoster(),
		opponent: getBattleScriptTrainerRoster()
	};
}

function cloneBattleScriptRoster(roster) {
	var clonedRoster = [];
	for (var i = 0; i < roster.length; i++) {
		addBattleScriptRosterEntry(clonedRoster, cloneBattleScriptRosterEntry(roster[i]));
	}
	return clonedRoster;
}

function cloneBattleScriptCraftEnvironmentRosters(rosters) {
	return {
		player: cloneBattleScriptRoster(rosters && rosters.player ? rosters.player : []),
		opponent: cloneBattleScriptRoster(rosters && rosters.opponent ? rosters.opponent : [])
	};
}

function createBattleScriptRunState() {
	var rosters = getBattleScriptRosters();
	var state = {
		rosters: {
			player: cloneBattleScriptRoster(rosters.player),
			opponent: cloneBattleScriptRoster(rosters.opponent)
		},
		active: {player: null, opponent: null},
		lastActionSide: "",
		messages: [],
		assignedBagItems: {}
	};
	resetBattleScriptFieldState(state);
	return state;
}

function clearBattleScriptRuntimeState() {
	battleScriptRuntimeState = null;
}

function findBattleScriptRosterEntry(roster, query) {
	var parsed = parseBattleScriptPokemonFormat(query);
	var normalized = normalizeBattleScriptText(query);
	var normalizedName = normalizeBattleScriptText(parsed.name);
	if (!normalized) return null;
	for (var i = 0; i < roster.length; i++) {
		if (battleScriptEntryMatchesQuery(roster[i], parsed, normalized)) return roster[i];
	}
	for (var j = 0; j < roster.length; j++) {
		if (!battleScriptEntryMatchesGender(roster[j], parsed.gender)) continue;
		for (var alias in roster[j].aliases) {
			if (Object.prototype.hasOwnProperty.call(roster[j].aliases, alias) && (
				alias.indexOf(normalized) !== -1 || (normalizedName && alias.indexOf(normalizedName) !== -1))) {
				return roster[j];
			}
		}
	}
	return null;
}

function findBattleScriptMove(pokemon, moveName) {
	var normalized = normalizeBattleScriptText(moveName);
	if (!pokemon || !pokemon.moves) return null;
	for (var i = 0; i < pokemon.moves.length; i++) {
		var move = pokemon.moves[i];
		if (move && normalizeBattleScriptText(move.name) === normalized) return move;
	}
	for (var j = 0; j < pokemon.moves.length; j++) {
		var candidate = pokemon.moves[j];
		if (candidate && normalizeBattleScriptText(candidate.name).indexOf(normalized) !== -1) return candidate;
	}
	return null;
}

function getBattleScriptOpposingSide(side) {
	return side === "player" ? "opponent" : "player";
}

function calculateBattleScriptDamage(attackerSide, attacker, defender, move, state, options) {
	var leftHP = options && attackerSide === "player" ? options.attackerHP : options && options.defenderHP;
	var rightHP = options && attackerSide === "player" ? options.defenderHP : options && options.attackerHP;
	var leftPokemon = attackerSide === "player" ? cloneBattleScriptPokemonAtHP(attacker, leftHP) : cloneBattleScriptPokemonAtHP(defender, leftHP);
	var rightPokemon = attackerSide === "player" ? cloneBattleScriptPokemonAtHP(defender, rightHP) : cloneBattleScriptPokemonAtHP(attacker, rightHP);
	var calcAttacker = attackerSide === "player" ? leftPokemon : rightPokemon;
	var calcDefender = attackerSide === "player" ? rightPokemon : leftPokemon;
	var field = createField();
	applyBattleScriptFieldStateToField(field, state);
	checkStatBoost(leftPokemon, rightPokemon);
	if (attackerSide !== "player") field = field.clone().swap();
	return calc.calculate(getActiveCalcGeneration(), calcAttacker, calcDefender, move, field);
}

function parseBattleScriptValueWithTrailingNumber(text) {
	var raw = $.trim(text || "");
	var match = raw.match(/^(.*?)(?:\s*\(?\s*(\d+)\s*(?:turns?|layers?)?\s*\)?)$/i);
	if (match && $.trim(match[1] || "")) {
		return {
			name: $.trim(match[1] || ""),
			number: Math.max(0, ~~match[2])
		};
	}
	return {name: raw, number: 0};
}

function parseBattleScriptSideConditionList(text) {
	var raw = $.trim(text || "");
	var parts = raw.split(/\s*,\s*/);
	var conditions = [];
	var parsed;
	var key;
	var def;
	if (/^(?:clear|none|no side conditions|no hazards)$/i.test(raw)) return {clear: true, conditions: [], unknown: []};
	var unknown = [];
	for (var i = 0; i < parts.length; i++) {
		if (!parts[i]) continue;
		parsed = parseBattleScriptValueWithTrailingNumber(parts[i]);
		key = getBattleScriptSideConditionKey(parsed.name);
		def = BATTLE_SCRIPT_SIDE_CONDITION_DEFS[key];
		if (!def) {
			unknown.push(parts[i]);
			continue;
		}
		conditions.push({
			key: key,
			value: def.layers ? (parsed.number || 1) : 1,
			turns: def.timed ? (parsed.number || def.defaultTurns || 0) : 0
		});
	}
	return {clear: false, conditions: conditions, unknown: unknown};
}

function formatBattleScriptSideConditionState(condition) {
	var def = BATTLE_SCRIPT_SIDE_CONDITION_DEFS[condition.key];
	var text = def ? def.label : condition.key;
	if (def && def.layers) text += " x" + condition.value;
	if (condition.turns) text += " (" + getBattleScriptTurnsText(condition.turns) + ")";
	return text;
}

function applyBattleScriptManualFieldEffect(state, parsed) {
	var key = getBattleScriptFieldEffectKey(parsed.value);
	var def = BATTLE_SCRIPT_FIELD_EFFECT_DEFS[key];
	if (!def) return "";
	if (parsed.clear) {
		clearBattleScriptFieldEffect(state, key);
		return def.label + " cleared.";
	}
	setBattleScriptFieldEffect(state, key, parsed.turns || def.defaultTurns || 0);
	return def.label + " active" + (parsed.turns ? " (" + getBattleScriptTurnsText(parsed.turns) + ")" : "") + ".";
}

function runBattleScriptFieldState(state, parsed, lineNumber) {
	var text = "";
	if (parsed.field === "weather") {
		state.weather = parsed.value;
		state.weatherTurns = parsed.value ? parsed.turns : 0;
		text = parsed.value ? "Weather: " + parsed.value + (parsed.turns ? " (" + getBattleScriptTurnsText(parsed.turns) + ")" : "") : "Weather cleared.";
	} else if (parsed.field === "terrain") {
		state.terrain = parsed.value;
		state.terrainTurns = parsed.value ? parsed.turns : 0;
		text = parsed.value ? "Terrain: " + parsed.value + (parsed.turns ? " (" + getBattleScriptTurnsText(parsed.turns) + ")" : "") : "Terrain cleared.";
	} else if (parsed.field === "fieldEffect") {
		text = applyBattleScriptManualFieldEffect(state, parsed);
	}
	if (!text) {
		addBattleScriptMessage(state.messages, lineNumber, "error", "Could not apply field state.", "Use Weather Rain 5, Terrain Electric 5, or Field Gravity 5.");
		return;
	}
	addBattleScriptMessage(state.messages, lineNumber, "state", text, "Trainer AI and damage calculations now use this cloned field state.");
}

function runBattleScriptSideConditionState(state, parsed, lineNumber) {
	var side = parsed.side;
	var conditionState = parsed.conditions;
	var applied = [];
	var condition;
	if (!state.sideConditions) state.sideConditions = createBattleScriptEmptySideConditions();
	if (conditionState.clear) {
		state.sideConditions[side] = {};
		addBattleScriptMessage(state.messages, lineNumber, "state", BATTLE_SCRIPT_SIDE_LABELS[side] + " side cleared.", "All mapped side conditions cleared.");
		return;
	}
	if (conditionState.unknown.length) {
		addBattleScriptMessage(state.messages, lineNumber, "error", "Unknown side condition: " + conditionState.unknown[0] + ".", "Mapped side conditions include Reflect, Light Screen, Safeguard, Mist, Tailwind, Lucky Chant, Spikes, Toxic Spikes, Stealth Rock, Sticky Web, Aurora Veil, pledge fields, and G-Max side effects.");
		return;
	}
	for (var i = 0; i < conditionState.conditions.length; i++) {
		condition = conditionState.conditions[i];
		setBattleScriptSideCondition(state, side, condition.key, condition.value, condition.turns);
		applied.push(formatBattleScriptSideConditionState(condition));
	}
	addBattleScriptMessage(
		state.messages,
		lineNumber,
		"state",
		BATTLE_SCRIPT_SIDE_LABELS[side] + " side: " + (applied.length ? applied.join(", ") : "unchanged"),
		"Trainer AI and damage calculations now use these mapped side conditions."
	);
}

function decrementBattleScriptTimedSideConditions(state, amount, details) {
	var sides = ["player", "opponent"];
	for (var sideIndex = 0; sideIndex < sides.length; sideIndex++) {
		var side = sides[sideIndex];
		var record = state.sideConditions && state.sideConditions[side] ? state.sideConditions[side] : {};
		for (var key in record) {
			if (!Object.prototype.hasOwnProperty.call(record, key)) continue;
			var condition = record[key];
			var def = BATTLE_SCRIPT_SIDE_CONDITION_DEFS[key];
			if (!condition.turns) continue;
			condition.turns = Math.max(0, condition.turns - amount);
			if (!condition.turns) {
				delete record[key];
				details.push((def ? def.label : key) + " ended on " + BATTLE_SCRIPT_SIDE_LABELS[side] + " side");
			}
		}
	}
}

function decrementBattleScriptTimedFieldEffects(state, amount, details) {
	for (var key in state.fieldEffects || {}) {
		if (!Object.prototype.hasOwnProperty.call(state.fieldEffects, key)) continue;
		var effect = state.fieldEffects[key];
		var def = BATTLE_SCRIPT_FIELD_EFFECT_DEFS[key];
		if (!effect.turns) continue;
		effect.turns = Math.max(0, effect.turns - amount);
		if (!effect.turns) {
			delete state.fieldEffects[key];
			details.push((def ? def.label : key) + " ended");
		}
	}
}

function canBattleScriptTakeIndirectDamage(entry, state) {
	return !hasBattleScriptEffectiveAbility(entry, ["Magic Guard"], {state: state, targetState: entry});
}

function applyBattleScriptEndTurnWeatherEffects(state, entry, details) {
	var weather = getBattleScriptStateWeather(state);
	var abilityContext = {state: state, targetState: entry};
	var safetyGoggles = getBattleScriptHeldItemKey(entry, state) === "safetygoggles";
	if (!entry || !entry.hp || entry.hp.max <= 0 || !weather) return;
	if ((weather === "Sand" || weather === "Sandstorm") && canBattleScriptTakeIndirectDamage(entry, state) &&
			!safetyGoggles &&
			!hasBattleScriptType(entry, "Rock") && !hasBattleScriptType(entry, "Ground") && !hasBattleScriptType(entry, "Steel") &&
			!hasBattleScriptEffectiveAbility(entry, ["Overcoat", "Sand Force", "Sand Rush", "Sand Veil"], abilityContext)) {
		details.push(damageBattleScriptEntry(entry, getBattleScriptFractionalHP(entry, 1, 16), "Sand"));
	}
	if ((weather === "Hail" || weather === "Snow") && canBattleScriptTakeIndirectDamage(entry, state) &&
			!safetyGoggles &&
			!hasBattleScriptType(entry, "Ice") &&
			!hasBattleScriptEffectiveAbility(entry, ["Overcoat", "Ice Body", "Snow Cloak"], abilityContext)) {
		details.push(damageBattleScriptEntry(entry, getBattleScriptFractionalHP(entry, 1, 16), weather));
	}
	if ((weather === "Hail" || weather === "Snow") && hasBattleScriptEffectiveAbility(entry, ["Ice Body"], abilityContext)) {
		details.push(healBattleScriptEntry(entry, getBattleScriptFractionalHP(entry, 1, 16), "Ice Body"));
	}
	if ((weather === "Rain" || weather === "Heavy Rain") && hasBattleScriptEffectiveAbility(entry, ["Rain Dish"], abilityContext)) {
		details.push(healBattleScriptEntry(entry, getBattleScriptFractionalHP(entry, 1, 16), "Rain Dish"));
	}
	if ((weather === "Rain" || weather === "Heavy Rain") && hasBattleScriptEffectiveAbility(entry, ["Dry Skin"], abilityContext)) {
		details.push(healBattleScriptEntry(entry, getBattleScriptFractionalHP(entry, 1, 8), "Dry Skin"));
	}
	if ((weather === "Sun" || weather === "Harsh Sunshine") && hasBattleScriptEffectiveAbility(entry, ["Dry Skin", "Solar Power"], abilityContext) &&
			canBattleScriptTakeIndirectDamage(entry, state)) {
		details.push(damageBattleScriptEntry(entry, getBattleScriptFractionalHP(entry, 1, 8), entry.pokemon.ability));
	}
}

function applyBattleScriptEndTurnStatusEffects(state, entry, details) {
	var status = entry && entry.pokemon ? entry.pokemon.status || "" : "";
	var damage;
	if (!status || !entry.hp || entry.hp.max <= 0) return;
	if (status === "brn" && canBattleScriptTakeIndirectDamage(entry, state)) {
		damage = hasBattleScriptEffectiveAbility(entry, ["Heatproof"], {state: state, targetState: entry}) ?
			getBattleScriptFractionalHP(entry, 1, 32) : getBattleScriptFractionalHP(entry, 1, 16);
		details.push(damageBattleScriptEntry(entry, damage, "burn"));
	}
	if ((status === "psn" || status === "tox") && hasBattleScriptEffectiveAbility(entry, ["Poison Heal"], {state: state, targetState: entry})) {
		details.push(healBattleScriptEntry(entry, getBattleScriptFractionalHP(entry, 1, 8), "Poison Heal"));
		return;
	}
	if (status === "psn" && canBattleScriptTakeIndirectDamage(entry, state)) {
		details.push(damageBattleScriptEntry(entry, getBattleScriptFractionalHP(entry, 1, 8), "poison"));
	}
	if (status === "tox" && canBattleScriptTakeIndirectDamage(entry, state)) {
		entry.toxicCounter = Math.max(1, (entry.toxicCounter || 0) + 1);
		details.push(damageBattleScriptEntry(entry, getBattleScriptFractionalHP(entry, entry.toxicCounter, 16), "bad poison"));
	}
	if ((status === "brn" || status === "psn" || status === "tox" || status === "par" || status === "slp" || status === "frz") &&
			hasBattleScriptEffectiveAbility(entry, ["Hydration"], {state: state, targetState: entry}) &&
			(getBattleScriptStateWeather(state) === "Rain" || getBattleScriptStateWeather(state) === "Heavy Rain")) {
		entry.pokemon.status = "";
		entry.toxicCounter = 0;
		details.push(entry.label + "'s Hydration cured its status.");
	}
}

function applyBattleScriptEndTurnSideConditionEffects(state, entry, details) {
	var record = state && state.sideConditions && state.sideConditions[entry.side] ? state.sideConditions[entry.side] : {};
	var effects = [
		{key: "wildfire", type: "Fire", denominator: 6, label: "Wildfire"},
		{key: "cannonade", type: "Water", denominator: 6, label: "Cannonade"},
		{key: "vinelash", type: "Grass", denominator: 6, label: "Vine Lash"},
		{key: "volcalith", type: "Rock", denominator: 6, label: "Volcalith"},
		{key: "seaoffire", type: "Fire", denominator: 8, label: "Sea of Fire"}
	];
	if (!entry || !entry.hp || entry.hp.max <= 0 || !canBattleScriptTakeIndirectDamage(entry, state)) return;
	for (var i = 0; i < effects.length; i++) {
		if (!record[effects[i].key] || !record[effects[i].key].value || hasBattleScriptType(entry, effects[i].type)) continue;
		details.push(damageBattleScriptEntry(entry, getBattleScriptFractionalHP(entry, 1, effects[i].denominator), effects[i].label));
	}
}

function applyBattleScriptEndTurnHeldItemEffects(state, entry, details) {
	var item = getBattleScriptActiveHeldItem(entry, state);
	var itemKey = normalizeBattleScriptText(item);
	if (!entry || !entry.hp || entry.hp.max <= 0 || !item) return;
	if (itemKey === "leftovers") details.push(healBattleScriptEntry(entry, getBattleScriptFractionalHP(entry, 1, 16), "Leftovers"));
	if (itemKey === "blacksludge") {
		if (hasBattleScriptType(entry, "Poison")) details.push(healBattleScriptEntry(entry, getBattleScriptFractionalHP(entry, 1, 16), "Black Sludge"));
		else if (canBattleScriptTakeIndirectDamage(entry, state)) details.push(damageBattleScriptEntry(entry, getBattleScriptFractionalHP(entry, 1, 8), "Black Sludge"));
	}
	if (itemKey === "stickybarb" && canBattleScriptTakeIndirectDamage(entry, state)) {
		details.push(damageBattleScriptEntry(entry, getBattleScriptFractionalHP(entry, 1, 8), "Sticky Barb"));
	}
	if (itemKey === "flameorb" && !entry.pokemon.status) {
		var burn = applyBattleScriptStatus(entry, "brn", {state: state, targetSide: entry.side, targetState: entry});
		if (burn && burn.changed) details.push(entry.label + "'s Flame Orb burned it.");
	}
	if (itemKey === "toxicorb" && !entry.pokemon.status) {
		var poison = applyBattleScriptStatus(entry, "tox", {state: state, targetSide: entry.side, targetState: entry});
		if (poison && poison.changed) details.push(entry.label + "'s Toxic Orb badly poisoned it.");
	}
	applyBattleScriptHPThresholdHeldItems(entry, details, state);
}

function applyBattleScriptEndTurnTerrainEffects(state, entry, details) {
	if (getBattleScriptStateTerrain(state) !== "Grassy" || !isBattleScriptGrounded(entry, state)) return;
	details.push(healBattleScriptEntry(entry, getBattleScriptFractionalHP(entry, 1, 16), "Grassy Terrain"));
}

function applyBattleScriptEndTurnEffectsForEntry(state, side, entry, details) {
	if (!entry || !entry.hp || entry.hp.max <= 0) return;
	entry.side = side;
	applyBattleScriptEndTurnWeatherEffects(state, entry, details);
	applyBattleScriptEndTurnTerrainEffects(state, entry, details);
	applyBattleScriptEndTurnSideConditionEffects(state, entry, details);
	applyBattleScriptEndTurnStatusEffects(state, entry, details);
	applyBattleScriptEndTurnHeldItemEffects(state, entry, details);
}

function applyBattleScriptEndTurnEffects(state) {
	var details = [];
	if (!state || !state.turn || !state.active) return details;
	applyBattleScriptEndTurnEffectsForEntry(state, "player", state.active.player, details);
	applyBattleScriptEndTurnEffectsForEntry(state, "opponent", state.active.opponent, details);
	return $.grep(details, function (detail) { return !!detail; });
}

function advanceBattleScriptFieldDurations(state, nextTurnNumber) {
	var nextTurn = Math.max(0, ~~nextTurnNumber);
	var previousTurn = state.turn || 0;
	var amount = nextTurn > previousTurn && previousTurn ? nextTurn - previousTurn : 0;
	var details = [];
	state.turn = nextTurn || previousTurn;
	if (!amount) return details;
	if (state.weather && state.weatherTurns) {
		var weather = state.weather;
		state.weatherTurns = Math.max(0, state.weatherTurns - amount);
		if (!state.weatherTurns) {
			state.weather = "";
			details.push(weather + " ended");
		}
	}
	if (state.terrain && state.terrainTurns) {
		var terrain = state.terrain;
		state.terrainTurns = Math.max(0, state.terrainTurns - amount);
		if (!state.terrainTurns) {
			state.terrain = "";
			details.push(terrain + " Terrain ended");
		}
	}
	decrementBattleScriptTimedSideConditions(state, amount, details);
	decrementBattleScriptTimedFieldEffects(state, amount, details);
	return details;
}

function parseBattleScriptLine(line) {
	var trimmed = $.trim(line || "");
	var match;
	if (!trimmed) return {type: "blank"};
	if (/^(?:fight start|\|start\|?)$/i.test(trimmed)) return {type: "start"};
	match = trimmed.match(/^(?:turn\s+|\|turn\|)(\d+)$/i);
	if (match) return {type: "turn", number: match[1]};
	match = trimmed.match(/^clear\s+(weather|terrain)$/i);
	if (match) return {type: "field", field: match[1].toLowerCase(), value: "", turns: 0};
	match = trimmed.match(/^clear\s+field\s+(.+)$/i);
	if (match) return {type: "field", field: "fieldEffect", value: match[1], turns: 0, clear: true};
	match = trimmed.match(/^clear\s+(player|trainer|opponent)\s+(?:side|hazards?|screens?|field)$/i);
	if (match) {
		return {
			type: "sideCondition",
			side: match[1].toLowerCase() === "player" ? "player" : "opponent",
			conditions: {clear: true, conditions: [], unknown: []}
		};
	}
	match = trimmed.match(/^(?:field\s+)?(weather|terrain)[:\s]+(.+)$/i);
	if (match) {
		var fieldValue = getBattleScriptTimedFieldValue(
			match[2],
			match[1].toLowerCase() === "weather" ? normalizeBattleScriptWeatherName : normalizeBattleScriptTerrainName
		);
		return {
			type: "field",
			field: match[1].toLowerCase(),
			value: fieldValue.value,
			turns: fieldValue.turns
		};
	}
	match = trimmed.match(/^field\s+(.+)$/i);
	if (match) {
		var effectValue = parseBattleScriptValueWithTrailingNumber(match[1]);
		return {type: "field", field: "fieldEffect", value: effectValue.name, turns: effectValue.number};
	}
	match = trimmed.match(/^(player|trainer|opponent)\s+(?:side|hazards?|screens?|field)[:\s]+(.+)$/i);
	if (match) {
		return {
			type: "sideCondition",
			side: match[1].toLowerCase() === "player" ? "player" : "opponent",
			conditions: parseBattleScriptSideConditionList(match[2])
		};
	}
	match = trimmed.match(/^(player|trainer|opponent)\s+(.+)\s+in$/i);
	if (match) {
		return {
			type: "active",
			side: match[1].toLowerCase() === "player" ? "player" : "opponent",
			name: match[2]
		};
	}
	match = trimmed.match(/^(player|trainer|opponent)\s+switch(?:es)?(?:\s+to)?\s+(.+)$/i);
	if (match) {
		return {
			type: "switch",
			side: match[1].toLowerCase() === "player" ? "player" : "opponent",
			name: match[2]
		};
	}
	match = trimmed.match(/^(player|trainer|opponent)\s+(.+?)\s+(?:holds?|item)\s+(.+)$/i);
	if (match) {
		return {
			type: "item",
			side: match[1].toLowerCase() === "player" ? "player" : "opponent",
			name: match[2],
			item: match[3]
		};
	}
	match = trimmed.match(/^(player|trainer|opponent)\s+(.+\[[^\]]+\])$/i);
	if (match) {
		var formatted = parseBattleScriptPokemonFormat(match[2]);
		if (formatted.item) {
			return {
				type: "item",
				side: match[1].toLowerCase() === "player" ? "player" : "opponent",
				name: match[2],
				item: formatted.item
			};
		}
	}
	match = trimmed.match(/^(?:(player|trainer|opponent)\s+)?(.+?)\s+(?:faints|fainted|dies|died|ko'd|kod)$/i);
	if (match) {
		return {
			type: "faint",
			side: match[1] ? (match[1].toLowerCase() === "player" ? "player" : "opponent") : "",
			name: match[2]
		};
	}
	match = trimmed.match(/^(.+?)\s+uses\s+(.+)$/i);
	if (match) return {type: "move", actor: match[1], move: match[2]};
	return {type: "unknown", text: trimmed};
}

function addBattleScriptMessage(messages, lineNumber, type, text, detail, options) {
	var message = {
		lineNumber: lineNumber,
		type: type,
		text: text,
		detail: $.isArray(detail) ? "" : (detail || "")
	};
	if ($.isArray(detail)) message.detailLines = detail;
	if (options && options.recommendations) message.recommendations = options.recommendations;
	if (options && options.aiChoice) message.aiChoice = options.aiChoice;
	messages.push(message);
}

function applyBattleScriptPokemonFormat(state, side, entry, format, lineNumber) {
	var details = [];
	var requestedItem;
	var previousItem;
	var currentItem;
	if (!entry || !format) return {ok: true, details: details};
	if (format.gender) {
		if (!entry.pokemon.gender || normalizeBattleScriptGender(entry.pokemon.gender) !== format.gender) {
			entry.pokemon.gender = format.gender;
			details.push("Gender treated as " + getBattleScriptGenderText(format.gender) + ".");
		}
	}
	if (format.item) {
		currentItem = entry.pokemon.item || "";
		if (normalizeBattleScriptText(currentItem) === normalizeBattleScriptText(format.item)) {
			return {ok: true, details: details};
		}
		if (side !== "player") {
			addBattleScriptMessage(
				state.messages,
				lineNumber,
				"error",
				"Trainer held items are fixed.",
				entry.label + (currentItem ? " already has " + currentItem + "." : " has no held item in the Trainer data.")
			);
			return {ok: false, details: details};
		}
		requestedItem = findBattleScriptImportedBagItemName(format.item);
		if (!requestedItem) {
			addBattleScriptMessage(
				state.messages,
				lineNumber,
				"error",
				"Could not find " + format.item + " in the imported player bag.",
				"Import a Sword/Shield save with that held item in the bag, then recalculate."
			);
			return {ok: false, details: details};
		}
		previousItem = currentItem || "No Item";
		if (!assignBattleScriptBagItem(state, entry, requestedItem)) {
			addBattleScriptMessage(
				state.messages,
				lineNumber,
				"error",
				"No imported " + requestedItem + " remains for " + entry.label + ".",
				"The simulator tracks imported bag item counts across bracketed Player item lines."
			);
			return {ok: false, details: details};
		}
		if (previousItem !== requestedItem) details.push("Held item changed from " + previousItem + " to " + requestedItem + ".");
	}
	return {ok: true, details: details};
}

function getBattleScriptLoadedCraftReason(lineNumber) {
	if (!battleScriptLoadedCraftScriptText) return "";
	return battleScriptLoadedCraftLineReasons && battleScriptLoadedCraftLineReasons[lineNumber] ? battleScriptLoadedCraftLineReasons[lineNumber] : "";
}

function setBattleScriptActive(state, side, name, lineNumber, actionLabel) {
	var format = parseBattleScriptPokemonFormat(name);
	var entry = findBattleScriptRosterEntry(state.rosters[side], format.name) ||
		findBattleScriptRosterEntry(state.rosters[side], name);
	var detail;
	var formatResult;
	var entryEffects;
	var pendingEffects;
	var reason;
	if (!entry) {
		addBattleScriptMessage(state.messages, lineNumber, "error", "Could not find " + name + " on " + BATTLE_SCRIPT_SIDE_LABELS[side] + ".");
		return;
	}
	formatResult = applyBattleScriptPokemonFormat(state, side, entry, format, lineNumber);
	if (!formatResult.ok) return;
	if (state.active[side] && state.active[side] !== entry) clearBattleScriptSwitchVolatileState(state.active[side]);
	entry.hasActed = false;
	clearBattleScriptSwitchVolatileState(entry);
	state.active[side] = entry;
	detail = getBattleScriptHPText(entry.hp, entry.maxHP) + (actionLabel ? " after " + actionLabel : "");
	if (formatResult.details.length) detail += "; " + formatResult.details.join(" ");
	entryEffects = applyBattleScriptEntryEffects(state, side, entry);
	pendingEffects = applyBattleScriptPendingEntryEffects(state, side);
	if (entryEffects.length || pendingEffects.length) {
		detail += "; " + entryEffects.concat(pendingEffects).join(" ");
	}
	reason = side === "opponent" ? getBattleScriptLoadedCraftReason(lineNumber) : "";
	if (reason) detail += "; Reason: " + reason;
	addBattleScriptMessage(
		state.messages,
		lineNumber,
		"state",
		BATTLE_SCRIPT_SIDE_LABELS[side] + " active: " + getBattleScriptPokemonCommandName(entry),
		detail
	);
}

function findBattleScriptActorSide(state, actorName) {
	var sides = ["player", "opponent"];
	var parsed = parseBattleScriptPokemonFormat(actorName);
	var normalized = normalizeBattleScriptText(actorName);
	var normalizedName = normalizeBattleScriptText(parsed.name);
	for (var i = 0; i < sides.length; i++) {
		var active = state.active[sides[i]];
		if (active && battleScriptEntryMatchesGender(active, parsed.gender) &&
				(active.aliases[normalized] || active.aliases[normalizedName])) return sides[i];
	}
	for (var j = 0; j < sides.length; j++) {
		if (findBattleScriptRosterEntry(state.rosters[sides[j]], actorName)) return sides[j];
	}
	return "";
}

function findBattleScriptFaintTarget(state, parsed) {
	var sides = parsed.side ? [parsed.side] : ["player", "opponent"];
	var format = parseBattleScriptPokemonFormat(parsed.name);
	var normalized = normalizeBattleScriptText(parsed.name);
	var normalizedName = normalizeBattleScriptText(format.name);
	for (var i = 0; i < sides.length; i++) {
		var active = state.active[sides[i]];
		if (active && battleScriptEntryMatchesGender(active, format.gender) &&
				(active.aliases[normalized] || active.aliases[normalizedName])) return {side: sides[i], entry: active};
	}
	for (var j = 0; j < sides.length; j++) {
		var entry = findBattleScriptRosterEntry(state.rosters[sides[j]], parsed.name);
		if (entry) return {side: sides[j], entry: entry};
	}
	return null;
}

function runBattleScriptFaint(state, parsed, lineNumber) {
	var target = findBattleScriptFaintTarget(state, parsed);
	if (!target || !target.entry) {
		addBattleScriptMessage(state.messages, lineNumber, "error", "Could not find " + parsed.name + " to mark fainted.");
		return;
	}
	target.entry.hp = {min: 0, max: 0};
	clearBattleScriptSwitchVolatileState(target.entry);
	if (state.active[target.side] === target.entry) state.active[target.side] = null;
	addBattleScriptMessage(
		state.messages,
		lineNumber,
		"state",
		target.entry.label + " fainted.",
		BATTLE_SCRIPT_SIDE_LABELS[target.side] + " active slot cleared."
	);
}

function findBattleScriptItemTarget(state, parsed) {
	var active;
	var format;
	var normalized;
	var normalizedName;
	if (!state || !parsed || parsed.side !== "player") return null;
	active = state.active.player;
	format = parseBattleScriptPokemonFormat(parsed.name);
	normalized = normalizeBattleScriptText(parsed.name);
	normalizedName = normalizeBattleScriptText(format.name);
	if (active && battleScriptEntryMatchesGender(active, format.gender) &&
			(active.aliases[normalized] || active.aliases[normalizedName])) return active;
	return findBattleScriptRosterEntry(state.rosters.player, parsed.name);
}

function runBattleScriptHeldItem(state, parsed, lineNumber) {
	var entry;
	var format;
	var itemQuery;
	var itemName;
	var previousItem;
	if (parsed.side !== "player") {
		addBattleScriptMessage(
			state.messages,
			lineNumber,
			"error",
			"Trainer held items are fixed.",
			"Only Player Pokemon can be given imported bag items in the simulator."
		);
		return;
	}
	entry = findBattleScriptItemTarget(state, parsed);
	format = parseBattleScriptPokemonFormat(parsed.name);
	if (!entry) {
		addBattleScriptMessage(state.messages, lineNumber, "error", "Could not find " + parsed.name + " on Player Team.");
		return;
	}
	if (format.gender && (!entry.pokemon.gender || normalizeBattleScriptGender(entry.pokemon.gender) !== format.gender)) {
		entry.pokemon.gender = format.gender;
	}
	itemQuery = parsed.item || format.item;
	itemName = findBattleScriptImportedBagItemName(itemQuery);
	if (!itemName) {
		addBattleScriptMessage(
			state.messages,
			lineNumber,
			"error",
			"Could not find " + itemQuery + " in the imported player bag.",
			"Import a Sword/Shield save with that held item in the bag, then recalculate."
		);
		return;
	}
	previousItem = entry.pokemon.item || "No Item";
	if (!assignBattleScriptBagItem(state, entry, itemName)) {
		addBattleScriptMessage(
			state.messages,
			lineNumber,
			"error",
			"No imported " + itemName + " remains for " + entry.label + ".",
			"The simulator tracks imported bag item counts across Player item lines."
		);
		return;
	}
	addBattleScriptMessage(
		state.messages,
		lineNumber,
		"state",
		entry.label + " holds " + itemName + ".",
		previousItem === itemName ? "Held item unchanged." : "Held item changed from " + previousItem + " to " + itemName + "."
	);
}

function getBattleScriptActionSide(state, parsed) {
	if (parsed.type === "switch") return parsed.side;
	if (parsed.type === "move") return findBattleScriptActorSide(state, parsed.actor);
	return "";
}

function addBattleScriptActionOrderError(state, lineNumber, side) {
	addBattleScriptMessage(
		state.messages,
		lineNumber,
		"error",
		"Illegal action order: " + BATTLE_SCRIPT_SIDE_LABELS[side] + " acted twice in a row.",
		"Add a " + BATTLE_SCRIPT_SIDE_LABELS[getBattleScriptOpposingSide(side)] + " action before another " + BATTLE_SCRIPT_SIDE_LABELS[side] + " action."
	);
}

function canRunBattleScriptAction(state, parsed, lineNumber) {
	var actionSide = getBattleScriptActionSide(state, parsed);
	if (!actionSide) return true;
	if (state.lastActionSide === actionSide) {
		addBattleScriptActionOrderError(state, lineNumber, actionSide);
		return false;
	}
	state.lastActionSide = actionSide;
	return true;
}

function canRunBattleScriptSwitch(state, parsed, lineNumber) {
	if (state.active[parsed.side] && state.active[parsed.side].mustRecharge) {
		addBattleScriptMessage(
			state.messages,
			lineNumber,
			"error",
			"Illegal switch: " + state.active[parsed.side].label + " must recharge.",
			"Resolve the recharge turn after " + (state.active[parsed.side].rechargeMove || "the recharge move") + " before switching."
		);
		return false;
	}
	if (state.active[parsed.side] && state.active[parsed.side].chargingMove) {
		addBattleScriptMessage(
			state.messages,
			lineNumber,
			"error",
			"Illegal switch: " + state.active[parsed.side].label + " must finish " + state.active[parsed.side].chargingMove + ".",
			"Resolve the stored charged move release before switching."
		);
		return false;
	}
	if (state.active[parsed.side]) return true;
	addBattleScriptMessage(
		state.messages,
		lineNumber,
		"error",
		"Illegal switch: " + BATTLE_SCRIPT_SIDE_LABELS[parsed.side] + " has no active Pokemon yet.",
		"Use `" + BATTLE_SCRIPT_SIDE_LABELS[parsed.side] + " " + parsed.name + " in` before switching."
	);
	return false;
}

function addBattleScriptRechargeMessage(state, lineNumber, pokemonState) {
	var moveName = pokemonState.rechargeMove || "the recharge move";
	pokemonState.mustRecharge = false;
	pokemonState.rechargeMove = "";
	clearBattleScriptChargeState(pokemonState);
	pokemonState.hasActed = true;
	addBattleScriptMessage(
		state.messages,
		lineNumber,
		"state",
		pokemonState.label + " must recharge.",
		"Skipped this action after using " + moveName + "."
	);
}

function getBattleScriptForcedChargeMove(entry) {
	return entry && entry.chargingMove && entry.pokemon ? findBattleScriptMove(entry.pokemon, entry.chargingMove) : null;
}

function getBattleScriptChargeActionInfo(attackerState, move, state) {
	var info = getBattleScriptChargeMoveInfo(move);
	var release = isBattleScriptChargeRelease(attackerState, move);
	var consumesPowerHerb = doesBattleScriptPowerHerbResolveCharge(attackerState, move, state);
	var startsCharge = requiresBattleScriptChargeTurn(attackerState, move, state);
	return {
		isChargeMove: !!info,
		info: info,
		release: release,
		consumesPowerHerb: consumesPowerHerb,
		startsCharge: startsCharge,
		resolvesNow: !info || release || consumesPowerHerb || doesBattleScriptWeatherSkipCharge(move, state)
	};
}

function getBattleScriptPivotRecommendations(state, attacker, move) {
	var suggestions = [];
	var roster = state.rosters.player || [];
	for (var i = 0; i < roster.length; i++) {
		var candidate = roster[i];
		var damage;
		var critDamage;
		var incomingMaxPercent;
		var critMaxPercent;
		var survival;
		var aiSurvival;
		var aiPressurePercent;
		var worstPressurePercent;
		var incomingKOs;
		var returnDamage;
		var aiMove;
		var fasterOrTied;
		var rank;
		if (!candidate || candidate === state.active.player) continue;
		try {
			damage = getBattleScriptMoveDamage("opponent", attacker, candidate, move, state);
			if (!damage) continue;
			critDamage = getBattleScriptCritDamage("opponent", attacker, candidate, move, state);
			incomingMaxPercent = getBattleScriptDamagePercentAgainst(damage, candidate);
			critMaxPercent = getBattleScriptDamagePercentAgainst(critDamage, candidate);
			survival = getBattleScriptSurvivalInfo(candidate, damage);
			returnDamage = getBattleScriptReturnDamageInfo(candidate, attacker, state);
			aiMove = getBattleScriptLikelyAIMoveInfo(state, attacker, candidate, damage, move);
			aiSurvival = aiMove.damage ? getBattleScriptSurvivalInfo(aiMove.targetState || candidate, aiMove.damage) : null;
			aiPressurePercent = battleScriptAIModel === "swsh" ? aiMove.maxPercent : incomingMaxPercent;
			worstPressurePercent = Math.max(incomingMaxPercent, aiPressurePercent);
			incomingKOs = damage.max >= candidate.hp.min && damage.max > 0;
			fasterOrTied = isBattleScriptFasterOrTied(candidate, attacker, state);
			rank =
				(1 - worstPressurePercent) * 5 +
				Math.min(survival.turns, 4) * 0.55 +
				returnDamage.maxPercent * 2 +
				returnDamage.koBonus +
				(fasterOrTied ? 0.5 : 0) +
				(aiMove.favorable ? 0.8 : 0) -
				critMaxPercent * 0.5 -
				(incomingKOs ? 6 : 0);
			suggestions.push({
				label: candidate.label,
				target: candidate.pokemon,
				damage: damage,
				critDamage: critDamage,
				maxPercent: incomingMaxPercent,
				critMaxPercent: critMaxPercent,
				survival: survival,
				aiSurvival: aiSurvival,
				returnDamage: returnDamage,
				aiMove: aiMove,
				speedText: getBattleScriptSpeedRelationText(candidate, attacker, state),
				rank: rank
			});
		} catch (e) {}
	}
	suggestions.sort(function (a, b) {
		if (b.rank !== a.rank) return b.rank - a.rank;
		return a.maxPercent - b.maxPercent;
	});
	return suggestions.slice(0, 4).map(function (suggestion) {
		var survivalText = suggestion.survival.text;
		var details = [
			{label: "Crit", value: getBattleScriptDamageText(suggestion.critDamage, suggestion.target)},
			{label: "Speed", value: suggestion.speedText},
			{label: "Survival", value: survivalText},
			{label: "Return", value: suggestion.returnDamage.text}
		];
		if (suggestion.aiSurvival) {
			details[2].value += "; likely AI: " + suggestion.aiSurvival.text;
		}
		if (suggestion.aiMove.text) details.push({label: "Likely AI", value: suggestion.aiMove.text});
		return {
			label: suggestion.label,
			value: getBattleScriptDamageText(suggestion.damage, suggestion.target),
			details: details
		};
	});
}

function getBattleScriptRecommendationEffectScore(move) {
	var effects = getBattleScriptMoveEffects(move);
	var score = 0;
	for (var i = 0; i < effects.length; i++) {
		var effect = effects[i];
		var chanceFactor = (effect.chance || 100) / 100;
		var magnitude = Math.abs(effect.amount || 1);
		if (effect.kind === "boost") score += chanceFactor * magnitude * (effect.target === "defender" ? 0.55 : 0.35);
		if (effect.kind === "status") score += chanceFactor * (effect.status === "slp" ? 1.2 : effect.status === "par" || effect.status === "brn" ? 0.9 : 0.55);
		if (effect.kind === "accuracy") score += chanceFactor * magnitude * 0.35;
		if (effect.kind === "volatile") score += chanceFactor * 0.45;
		if (effect.kind === "drain") score += 0.35;
		if (effect.kind === "recoil" || effect.kind === "crash") score -= 0.45;
		if (effect.kind === "self-faint") score -= 2.5;
		if (effect.kind === "secondary") score += 0.15;
	}
	return score;
}

function getBattleScriptRecommendationEffectText(move) {
	var effects = getBattleScriptMoveEffects(move);
	var text = [];
	for (var i = 0; i < effects.length; i++) {
		text.push(formatBattleScriptEffectText(effects[i], null, null, false));
	}
	return text.join("; ");
}

function createBattleScriptRecommendationState(baseState, playerState, opponentState, weather) {
	return {
		rosters: {
			player: [playerState],
			opponent: [opponentState]
		},
		active: {
			player: playerState,
			opponent: opponentState
		},
		lastActionSide: "",
		messages: [],
		assignedBagItems: copyBattleScriptCraftKeyMap(baseState.assignedBagItems || {}),
		turn: baseState.turn || 0,
		weather: weather || baseState.weather || "",
		weatherTurns: weather ? 0 : baseState.weatherTurns || 0,
		terrain: baseState.terrain || "",
		terrainTurns: baseState.terrainTurns || 0,
		sideConditions: cloneBattleScriptSideConditions(baseState.sideConditions || {}),
		fieldEffects: cloneBattleScriptFieldEffects(baseState.fieldEffects || {})
	};
}

function getBattleScriptTrainerPrediction(baseState, playerState, opponentState) {
	var state = createBattleScriptRecommendationState(baseState, playerState, opponentState);
	var scores;
	var confidence;
	var bestDamage;
	var move;
	if (!playerState || !opponentState) return null;
	if (opponentState.mustRecharge) {
		return {
			move: null,
			damage: null,
			recharge: true,
			scoreText: "forced recharge",
			certaintyText: "forced recharge"
		};
	}
	if (opponentState.chargingMove) {
		move = getBattleScriptForcedChargeMove(opponentState);
		return {
			move: move,
			damage: move ? getBattleScriptMoveDamage("opponent", opponentState, playerState, move, state, {forceChargeResolve: true}) : null,
			guaranteed: true,
			scoreText: "forced " + (move ? move.name : opponentState.chargingMove) + " release",
			certaintyText: "forced charge release"
		};
	}
	if (battleScriptAIModel === "swsh") {
		try {
			scores = getBattleScriptAIModelMoveScores(state, "opponent", opponentState, playerState);
		} catch (e) {
			scores = [];
		}
		if (!scores.length) return null;
		confidence = getBattleScriptAIScoreConfidence(scores);
		move = findBattleScriptMove(opponentState.pokemon, scores[0].move);
		return {
			move: move,
			damage: scores[0].damage,
			score: scores[0],
			guaranteed: confidence.guaranteed,
			scoreText: formatBattleScriptAIScoreSummary(scores[0]),
			certaintyText: confidence.text
		};
	}
	bestDamage = getBattleScriptBestDamage(opponentState, playerState, state);
	if (!bestDamage) return null;
	return {
		move: bestDamage.move,
		damage: bestDamage.damage,
		guaranteed: true,
		scoreText: "best damage",
		certaintyText: "best damage"
	};
}

function formatBattleScriptTrainerPrediction(prediction, defenderState) {
	var damageText;
	if (!prediction) return "unknown";
	if (prediction.recharge) return "Recharge (" + prediction.certaintyText + ")";
	if (!prediction.move) return "unknown";
	damageText = prediction.damage ? getBattleScriptDamageText(prediction.damage, defenderState.pokemon) :
		(prediction.score && prediction.score.notes && prediction.score.notes.length ? prediction.score.notes[0] : "no damage");
	return prediction.move.name + " (" + prediction.scoreText + ", " + damageText + (prediction.guaranteed ? "" : ", " + prediction.certaintyText) + ")";
}

function getBattleScriptSafeNonRechargeKOMoves(player, opponent, state) {
	var moves = [];
	if (!player || !opponent || !player.pokemon || !player.pokemon.moves) return moves;
	for (var i = 0; i < player.pokemon.moves.length; i++) {
		var move = player.pokemon.moves[i];
		var info;
		var koInfo;
		if (!isBattleScriptDamagingMove(move) || isBattleScriptRechargeMove(move)) continue;
		try {
			info = getBattleScriptMoveDamageResult("player", player, opponent, move, state, {
				previewChargeStartEffects: doesBattleScriptPowerHerbResolveCharge(player, move, state)
			});
			koInfo = getBattleScriptKOChanceInfo(info.result, info.damage, opponent, player, opponent, move, state);
			if (koInfo.koChance >= 1) moves.push(move.name);
		} catch (e) {}
	}
	return moves;
}

function getBattleScriptRechargeFollowupInfo(baseState, playerAfter, defeatedOpponent) {
	var roster = baseState && baseState.rosters ? baseState.rosters.opponent || [] : [];
	var worst = null;
	for (var i = 0; i < roster.length; i++) {
		var candidate = roster[i];
		var trainerAfter;
		var rechargePlayer;
		var recState;
		var prediction;
		var pressure = 0;
		if (!candidate || candidate === defeatedOpponent || candidate.hp.max <= 0) continue;
		trainerAfter = cloneBattleScriptRosterEntry(candidate);
		rechargePlayer = cloneBattleScriptRosterEntry(playerAfter);
		if (!trainerAfter || !rechargePlayer) continue;
		rechargePlayer.mustRecharge = true;
		recState = createBattleScriptRecommendationState(baseState, rechargePlayer, trainerAfter);
		applyBattleScriptEntryEffects(recState, "opponent", trainerAfter);
		prediction = getBattleScriptTrainerPrediction(recState, rechargePlayer, trainerAfter);
		if (prediction && prediction.damage) pressure = getBattleScriptDamagePercentAgainst(prediction.damage, rechargePlayer);
		if (!worst || pressure > worst.pressure) {
			worst = {
				trainer: trainerAfter,
				prediction: prediction,
				pressure: pressure
			};
		}
	}
	if (!worst) {
		return {
			maxPercent: 0,
			text: "No remaining Trainer Pokemon can punish the recharge."
		};
	}
	return {
		maxPercent: worst.pressure,
		text: "Must recharge after the KO; worst remaining response is " + worst.trainer.label + " with " + formatBattleScriptTrainerPrediction(worst.prediction, playerAfter) + "."
	};
}

function getBattleScriptMoveActionRecommendations(state) {
	var recommendations = [];
	var player = state.active.player;
	var opponent = state.active.opponent;
	var safeNonRechargeKOs;
	if (!player || !opponent || !player.pokemon || !player.pokemon.moves || player.hp.max <= 0) return recommendations;
	if (player.mustRecharge) {
		recommendations.push({
			type: "recharge",
			label: "Recharge",
			value: player.label + " must recharge before acting.",
			rank: -2,
			details: [{label: "Reason", value: "Required after " + (player.rechargeMove || "the previous recharge move") + "."}]
		});
		return recommendations;
	}
	safeNonRechargeKOs = getBattleScriptSafeNonRechargeKOMoves(player, opponent, state);
	for (var i = 0; i < player.pokemon.moves.length; i++) {
		var move = player.pokemon.moves[i];
		var damage = null;
		var damageInfo = null;
		var opponentAfter;
		var playerAfter;
		var prediction;
		var predictionPressure = 0;
		var koInfo = null;
		var riskText = "";
		var effectText = getBattleScriptRecommendationEffectText(move);
		var followupState;
		var details;
		var damagePercent = 0;
		var koBonus = 0;
		var speedBonus = isBattleScriptFasterOrTied(player, opponent, state) || isBattleScriptPriorityMove(move) ? 0.55 : 0;
		var rechargeFollowup = null;
		var rechargePenalty = 0;
		var isRecharge = false;
		var rank;
		if (!move || !move.name || move.name === "(No Move)") continue;
		isRecharge = isBattleScriptRechargeMove(move);
		if (isBattleScriptDamagingMove(move)) {
			try {
				damageInfo = getBattleScriptMoveDamageResult("player", player, opponent, move, state, {
					previewChargeStartEffects: doesBattleScriptPowerHerbResolveCharge(player, move, state)
				});
				damage = damageInfo.damage;
				koInfo = getBattleScriptKOChanceInfo(damageInfo.result, damage, opponent, player, opponent, move, state);
			} catch (e) {
				damage = null;
			}
			if (!damage) continue;
			damagePercent = getBattleScriptDamagePercentAgainst(damage, opponent);
			riskText = koInfo ? koInfo.riskText : "";
			koBonus = koInfo && koInfo.koChance >= 1 ? 4 : (koInfo && koInfo.koChance > 0 ? 2 * koInfo.koChance : 0);
		} else if (!getBattleScriptMoveEffects(move).length) {
			continue;
		}
		opponentAfter = cloneBattleScriptRosterEntry(opponent);
		playerAfter = cloneBattleScriptRosterEntry(player);
		opponentAfter.hasActed = true;
		if (damage) updateBattleScriptHP(opponentAfter, damage, {
			state: state,
			attackerState: playerAfter,
			move: move
		});
		if (isRecharge) {
			playerAfter.mustRecharge = true;
			playerAfter.rechargeMove = move.name;
		}
		if (opponentAfter.hp.max > 0) {
			followupState = createBattleScriptRecommendationState(state, playerAfter, opponentAfter);
			applyBattleScriptMoveEffects(playerAfter, opponentAfter, move, {state: followupState, attackerSide: "player"});
			prediction = getBattleScriptTrainerPrediction(followupState, playerAfter, opponentAfter);
			if (prediction && prediction.damage) predictionPressure = getBattleScriptDamagePercentAgainst(prediction.damage, playerAfter);
		} else if (isRecharge) {
			rechargeFollowup = getBattleScriptRechargeFollowupInfo(state, playerAfter, opponent);
			rechargePenalty = (safeNonRechargeKOs.length ? 3.5 : 0.75) + (rechargeFollowup ? rechargeFollowup.maxPercent * 2 : 0);
		}
		if (koInfo && koInfo.koChance > 0 && koInfo.koChance < 1) rechargePenalty += (1 - koInfo.koChance) * 1.5;
		if (koInfo && koInfo.accuracy && koInfo.accuracy.chance < 1) rechargePenalty += (1 - koInfo.accuracy.chance) * 0.75;
		if (isRecharge && opponentAfter.hp.max > 0) rechargePenalty += 2.25;
		rank = damagePercent * 5 + koBonus + speedBonus + getBattleScriptRecommendationEffectScore(move) - predictionPressure * 2 - rechargePenalty;
		details = [
			{label: "Type", value: "Use move"},
			{label: "Damage", value: damage ? getBattleScriptDamageText(damage, opponent.pokemon) : "status/setup"},
			{label: "Speed", value: getBattleScriptSpeedRelationText(player, opponent, state)}
		];
		if (riskText) details.splice(2, 0, {label: "Risk", value: riskText});
		if (effectText) details.push({label: "Effect", value: effectText});
		if (isRecharge) {
			details.push({
				label: "Recharge",
				value: safeNonRechargeKOs.length ?
					"Must recharge; safer guaranteed KO available with " + safeNonRechargeKOs.join(", ") + "." :
					"Must recharge before acting again."
			});
			if (rechargeFollowup) details.push({label: "After KO", value: rechargeFollowup.text});
		}
		if (prediction && opponentAfter.hp.max > 0) details.push({label: "Likely AI", value: formatBattleScriptTrainerPrediction(prediction, playerAfter)});
		recommendations.push({
			type: "move",
			label: "Use " + move.name,
			value: damage ? getBattleScriptDamageText(damage, opponent.pokemon) : (effectText || "utility move"),
			rank: rank,
			details: details
		});
	}
	return recommendations;
}

function getBattleScriptSwitchActionRecommendations(state) {
	var recommendations = [];
	var roster = state.rosters.player || [];
	var opponent = state.active.opponent;
	if (!opponent) return recommendations;
	for (var i = 0; i < roster.length; i++) {
		var candidate = roster[i];
		var candidateAfter;
		var opponentAfter;
		var recState;
		var entryEffects;
		var prediction;
		var incomingPercent = 0;
		var incomingCritPercent = 0;
		var survival;
		var critDamage;
		var returnDamage;
		var rank;
		var details;
		if (!candidate || candidate === state.active.player || candidate.hp.max <= 0) continue;
		candidateAfter = cloneBattleScriptRosterEntry(candidate);
		opponentAfter = cloneBattleScriptRosterEntry(opponent);
		opponentAfter.hasActed = true;
		recState = createBattleScriptRecommendationState(state, candidateAfter, opponentAfter);
		entryEffects = applyBattleScriptEntryEffects(recState, "player", candidateAfter).concat(applyBattleScriptPendingEntryEffects(recState, "player"));
		prediction = getBattleScriptTrainerPrediction(recState, candidateAfter, opponentAfter);
		if (prediction && prediction.damage) {
			incomingPercent = getBattleScriptDamagePercentAgainst(prediction.damage, candidateAfter);
			critDamage = prediction.move ? getBattleScriptCritDamage("opponent", opponentAfter, candidateAfter, prediction.move, recState) : null;
			incomingCritPercent = getBattleScriptDamagePercentAgainst(critDamage, candidateAfter);
			survival = getBattleScriptSurvivalInfo(candidateAfter, prediction.damage);
		} else {
			survival = {turns: 4, text: prediction && prediction.recharge ? "free turn" : "no direct damage"};
		}
		returnDamage = getBattleScriptReturnDamageInfo(candidateAfter, opponentAfter, recState);
		rank =
			(1 - incomingPercent) * 3 +
			Math.min(survival.turns, 4) * 0.55 +
			returnDamage.maxPercent * 2 +
			returnDamage.koBonus +
			(isBattleScriptFasterOrTied(candidateAfter, opponentAfter, recState) ? 0.5 : 0) -
			incomingCritPercent * 0.5 +
			(prediction && prediction.guaranteed === false ? 0.15 : 0);
		details = [
			{label: "Type", value: "Switch"},
			{label: "Likely AI", value: formatBattleScriptTrainerPrediction(prediction, candidateAfter)},
			{label: "Damage", value: prediction && prediction.damage ? getBattleScriptDamageText(prediction.damage, candidateAfter.pokemon) : "0 HP (0%)"},
			{label: "Crit", value: critDamage ? getBattleScriptDamageText(critDamage, candidateAfter.pokemon) : "0 HP (0%)"},
			{label: "Speed", value: getBattleScriptSpeedRelationText(candidateAfter, opponentAfter, recState)},
			{label: "Survival", value: survival.text},
			{label: "Return", value: returnDamage.text}
		];
		if (entryEffects.length) details.push({label: "Entry", value: entryEffects.join(" ")});
		recommendations.push({
			type: "switch",
			label: "Switch to " + candidate.label,
			value: prediction && prediction.damage ? "faces " + getBattleScriptDamageText(prediction.damage, candidateAfter.pokemon) : "avoids direct damage",
			rank: rank,
			details: details
		});
	}
	return recommendations;
}

function getBattleScriptBagItemActionRecommendations(state) {
	var recommendations = [];
	var player = state.active.player;
	var actions = getBattleScriptCraftBagItemActions(state);
	for (var i = 0; i < actions.length; i++) {
		var evaluation = actions[i].evaluation || {};
		var details = [
			{label: "Type", value: "Held item"},
			{label: "Current", value: player && player.pokemon && player.pokemon.item ? player.pokemon.item : "No Item"},
			{label: "Best move", value: evaluation.bestMove || "no immediate damage gain"}
		];
		if (evaluation.attackGain) details.push({label: "Attack gain", value: Math.round(evaluation.attackGain * 1000) / 10 + "% max HP"});
		if (evaluation.defenseGain) details.push({label: "Defense gain", value: Math.round(evaluation.defenseGain * 1000) / 10 + "% max HP"});
		if (evaluation.speedGain) details.push({label: "Speed", value: "turns the Player into the faster side"});
		if (evaluation.koGain) details.push({label: "KO", value: "unlocks a guaranteed KO range"});
		if (evaluation.survivalGain) details.push({label: "Survival", value: "avoids the predicted Trainer KO"});
		recommendations.push({
			type: "item",
			label: "Give " + actions[i].itemName,
			value: "from imported Player bag",
			rank: actions[i].score,
			details: details
		});
	}
	return recommendations;
}

function getBattleScriptRecommendations(state, attackerSide, attacker, move) {
	if (attackerSide !== "opponent") return [];
	return getBattleScriptMoveActionRecommendations(state)
		.concat(getBattleScriptSwitchActionRecommendations(state))
		.concat(getBattleScriptBagItemActionRecommendations(state))
		.sort(function (a, b) {
			return b.rank - a.rank;
		})
		.slice(0, 3)
		.map(function (recommendation, index) {
			recommendation.label = "#" + (index + 1) + " " + recommendation.label;
			return recommendation;
		});
}

function isBattleScriptCraftAlive(entry) {
	return !!(entry && entry.hp && entry.hp.max > 0);
}

function getBattleScriptCraftAliveEntries(roster) {
	var entries = [];
	for (var i = 0; i < roster.length; i++) {
		if (isBattleScriptCraftAlive(roster[i])) entries.push(roster[i]);
	}
	return entries;
}

function getBattleScriptCraftEntryIndex(roster, entry) {
	for (var i = 0; i < roster.length; i++) {
		if (roster[i] === entry) return i;
	}
	return -1;
}

function cloneBattleScriptCraftState(state) {
	var playerIndex = getBattleScriptCraftEntryIndex(state.rosters.player, state.active.player);
	var trainerIndex = getBattleScriptCraftEntryIndex(state.rosters.opponent, state.active.opponent);
	var rosters = {
		player: cloneBattleScriptRoster(state.rosters.player),
		opponent: cloneBattleScriptRoster(state.rosters.opponent)
	};
	return {
		rosters: rosters,
		active: {
			player: playerIndex >= 0 ? rosters.player[playerIndex] : null,
			opponent: trainerIndex >= 0 ? rosters.opponent[trainerIndex] : null
		},
		turn: state.turn,
		script: state.script.slice(0),
		aiChoices: state.aiChoices,
		guaranteedAIChoices: state.guaranteedAIChoices,
		rollRisks: state.rollRisks,
		nodes: state.nodes,
		craftMode: state.craftMode || BATTLE_SCRIPT_DEFAULT_CRAFT_MODE,
		assignedBagItems: copyBattleScriptCraftKeyMap(state.assignedBagItems || {}),
		lineReasons: copyBattleScriptCraftKeyMap(state.lineReasons || {}),
		weather: state.weather || "",
		weatherTurns: state.weatherTurns || 0,
		terrain: state.terrain || "",
		terrainTurns: state.terrainTurns || 0,
		sideConditions: cloneBattleScriptSideConditions(state.sideConditions || {}),
		fieldEffects: cloneBattleScriptFieldEffects(state.fieldEffects || {})
	};
}

function getBattleScriptCraftActiveSearch() {
	if (battleScriptCraftBuildingSearch) return battleScriptCraftBuildingSearch;
	if (!battleScriptCraftSearch) return null;
	return battleScriptCraftSearch.currentSearch || battleScriptCraftSearch;
}

function getBattleScriptCraftProfileTime() {
	return window.performance && typeof window.performance.now === "function" ? window.performance.now() : Date.now();
}

function createBattleScriptCraftProfile() {
	return {
		startedAt: getBattleScriptCraftProfileTime(),
		elapsedMs: 0,
		nodes: 0,
		expanded: 0,
		generated: 0,
		kept: 0,
		pruned: 0,
		deadPruned: 0,
		boundPruned: 0,
		dominatedPruned: 0,
		heapPushes: 0,
		heapPops: 0,
		cacheHits: 0,
		cacheMisses: 0,
		damageCalls: 0,
		damageMs: 0,
		aiScoreCalls: 0,
		aiScoreMs: 0,
		switchCalls: 0,
		switchMs: 0,
		itemEvaluations: 0,
		itemEvaluationMs: 0,
		itemPrefiltered: 0
	};
}

function getBattleScriptCraftProfile(search) {
	return search && search.profile ? search.profile : null;
}

function incrementBattleScriptCraftProfile(search, key, amount) {
	var profile = getBattleScriptCraftProfile(search);
	if (!profile) return;
	profile[key] = (profile[key] || 0) + (amount === undefined ? 1 : amount);
}

function addBattleScriptCraftProfileTime(search, key, startedAt) {
	var profile = getBattleScriptCraftProfile(search);
	if (!profile) return;
	profile[key] = (profile[key] || 0) + Math.max(0, getBattleScriptCraftProfileTime() - startedAt);
}

function finishBattleScriptCraftProfile(search) {
	var profile = getBattleScriptCraftProfile(search);
	if (!profile) return null;
	profile.elapsedMs = Math.max(0, getBattleScriptCraftProfileTime() - profile.startedAt);
	profile.nodes = search.nodes || profile.nodes || 0;
	window.royalSwordLastCraftProfile = $.extend({}, profile);
	return profile;
}

function cloneBattleScriptCraftCacheValue(value) {
	if (value === null || value === undefined) return value;
	if (typeof value !== "object") return value;
	if ($.isArray(value)) return $.map(value, cloneBattleScriptCraftCacheValue);
	return $.extend(true, {}, value);
}

function cacheBattleScriptCraftValue(search, cacheName, orderName, limit, key, value) {
	var cache;
	var order;
	if (!search || !key) return value;
	if (!search[cacheName]) search[cacheName] = {};
	if (!search[orderName]) search[orderName] = [];
	cache = search[cacheName];
	order = search[orderName];
	if (!Object.prototype.hasOwnProperty.call(cache, key)) order.push(key);
	cache[key] = cloneBattleScriptCraftCacheValue(value);
	while (order.length > limit) delete cache[order.shift()];
	return value;
}

function getBattleScriptCraftCachedValue(search, cacheName, key) {
	if (!search || !search[cacheName] || !Object.prototype.hasOwnProperty.call(search[cacheName], key)) {
		incrementBattleScriptCraftProfile(search, "cacheMisses");
		return undefined;
	}
	incrementBattleScriptCraftProfile(search, "cacheHits");
	return cloneBattleScriptCraftCacheValue(search[cacheName][key]);
}

function createBattleScriptCraftFrontier() {
	return {
		heap: [],
		length: 0,
		sequence: 0
	};
}

function compareBattleScriptCraftFrontierItems(a, b) {
	if (a.score !== b.score) return a.score - b.score;
	return b.sequence - a.sequence;
}

function swapBattleScriptCraftFrontierItems(heap, left, right) {
	var temp = heap[left];
	heap[left] = heap[right];
	heap[right] = temp;
}

function pushBattleScriptCraftFrontier(search, state) {
	var frontier = search && search.frontier;
	var heap;
	var index;
	var item;
	if (!frontier || !state) return;
	heap = frontier.heap;
	state.craftQueueScore = getBattleScriptCraftQueueScore(state, search.queueMode || state.craftMode);
	item = {
		state: state,
		score: state.craftQueueScore,
		sequence: frontier.sequence++
	};
	heap.push(item);
	index = heap.length - 1;
	while (index > 0) {
		var parent = Math.floor((index - 1) / 2);
		if (compareBattleScriptCraftFrontierItems(heap[index], heap[parent]) <= 0) break;
		swapBattleScriptCraftFrontierItems(heap, index, parent);
		index = parent;
	}
	frontier.length = heap.length;
	incrementBattleScriptCraftProfile(search, "heapPushes");
}

function popBattleScriptCraftFrontier(search) {
	var frontier = search && search.frontier;
	var heap = frontier ? frontier.heap : null;
	var top;
	var last;
	var index = 0;
	if (!heap || !heap.length) return null;
	top = heap[0];
	last = heap.pop();
	if (heap.length) {
		heap[0] = last;
		while (true) {
			var left = index * 2 + 1;
			var right = left + 1;
			var best = index;
			if (left < heap.length && compareBattleScriptCraftFrontierItems(heap[left], heap[best]) > 0) best = left;
			if (right < heap.length && compareBattleScriptCraftFrontierItems(heap[right], heap[best]) > 0) best = right;
			if (best === index) break;
			swapBattleScriptCraftFrontierItems(heap, index, best);
			index = best;
		}
	}
	frontier.length = heap.length;
	incrementBattleScriptCraftProfile(search, "heapPops");
	return top.state;
}

function getBattleScriptCraftFrontierStates(frontier) {
	if (!frontier) return [];
	if ($.isArray(frontier)) return frontier.slice(0);
	return $.map(frontier.heap || [], function (item) { return item.state; });
}

function getBattleScriptCraftEntrySignature(entry) {
	var pokemon = entry && entry.pokemon;
	var boosts = pokemon && pokemon.boosts ? pokemon.boosts : {};
	var moves = pokemon && pokemon.moves ? $.map(pokemon.moves, function (move) { return move && move.name ? move.name : ""; }).join(",") : "";
	if (!entry || !pokemon) return "empty";
	return [
		entry.side || "",
		entry.label || "",
		entry.source || "",
		pokemon.name || "",
		pokemon.gender || "",
		pokemon.item || "",
		pokemon.ability || "",
		pokemon.abilityOn ? "1" : "0",
		pokemon.status || "",
		entry.hp ? entry.hp.min + "-" + entry.hp.max : "",
		entry.maxHP || 0,
		["atk", "def", "spa", "spd", "spe"].map(function (stat) { return boosts[stat] || 0; }).join(","),
		entry.accuracyStage || 0,
		entry.evasionStage || 0,
		entry.mustRecharge ? entry.rechargeMove || "recharge" : "",
		entry.chargingMove ? "charging:" + entry.chargingMove : "",
		entry.hasActed ? "acted" : "",
		entry.bagItemAssigned ? entry.assignedBagItem || "" : "",
		entry.consumedItem || "",
		entry.belchBerryConsumed ? "belch" : "",
		entry.choiceLockMove || "",
		entry.choiceLockMoveId || 0,
		entry.custapReady ? "custap" : "",
		entry.focusEnergy ? "focus" : "",
		entry.micleReady ? "micle" : "",
		entry.toxicCounter || 0,
		moves
	].join("|");
}

function getBattleScriptCraftRosterSignature(roster) {
	return $.map(roster || [], getBattleScriptCraftEntrySignature).join(";");
}

function getBattleScriptCraftStateSignatureParts(state, includeTurn) {
	if (!state) return [];
	var parts = [
		getBattleScriptFieldStateSignature(state),
		"activeP=" + getBattleScriptCraftEntryIndex(state.rosters.player, state.active.player),
		"activeT=" + getBattleScriptCraftEntryIndex(state.rosters.opponent, state.active.opponent),
		"player=" + getBattleScriptCraftRosterSignature(state.rosters.player),
		"opponent=" + getBattleScriptCraftRosterSignature(state.rosters.opponent),
		"bag=" + JSON.stringify(state.assignedBagItems || {})
	];
	if (includeTurn) parts.unshift("turn=" + (state.turn || 0));
	return parts;
}

function getBattleScriptCraftStateSignature(state) {
	return getBattleScriptCraftStateSignatureParts(state, true).join("||");
}

function getBattleScriptCraftFutureSignature(state) {
	return getBattleScriptCraftStateSignatureParts(state, false).join("||");
}

function getBattleScriptCraftPredictionCacheKey(state, defenderState) {
	var defenderSide = defenderState && defenderState.side === "opponent" ? "opponent" : "player";
	var defenderRoster = state && state.rosters ? state.rosters[defenderSide] || [] : [];
	return getBattleScriptCraftStateSignature(state) + "||def=" +
		defenderSide + ":" + getBattleScriptCraftEntryIndex(defenderRoster, defenderState) + ":" +
		getBattleScriptCraftEntrySignature(defenderState);
}

function getBattleScriptCraftDamageCacheKey(state, attackerSide, attackerState, defenderState, move, options) {
	return [
		"side=" + (attackerSide || ""),
		"move=" + (move && move.name || ""),
		"opts=" + JSON.stringify({
			forceChargeResolve: !!(options && options.forceChargeResolve),
			previewChargeStartEffects: !!(options && options.previewChargeStartEffects)
		}),
		getBattleScriptFieldStateSignature(state),
		"attacker=" + getBattleScriptCraftEntrySignature(attackerState),
		"defender=" + getBattleScriptCraftEntrySignature(defenderState)
	].join("||");
}

function cacheBattleScriptCraftDamage(search, key, damage) {
	return cacheBattleScriptCraftValue(search, "damageCache", "damageCacheOrder", BATTLE_SCRIPT_CRAFT_DAMAGE_CACHE_LIMIT, key, damage);
}

function cloneBattleScriptCraftPrediction(prediction) {
	if (!prediction) return prediction;
	return $.extend({}, prediction, {
		switchDecision: prediction.switchDecision ? $.extend({}, prediction.switchDecision) : prediction.switchDecision
	});
}

function cloneBattleScriptCraftPredictions(predictions) {
	return predictions ? $.map(predictions, cloneBattleScriptCraftPrediction) : predictions;
}

function cacheBattleScriptCraftPredictions(search, key, predictions) {
	return cacheBattleScriptCraftValue(search, "predictionCache", "predictionCacheOrder", BATTLE_SCRIPT_CRAFT_PREDICTION_CACHE_LIMIT, key, predictions);
}

function getBattleScriptCraftAIScoreCacheKey(state, attackerSide, attackerState, defenderState) {
	return [
		getBattleScriptCraftStateSignature(state),
		"side=" + (attackerSide || ""),
		"attacker=" + getBattleScriptCraftEntrySignature(attackerState),
		"defender=" + getBattleScriptCraftEntrySignature(defenderState)
	].join("||");
}

function getBattleScriptCraftCachedAIModelMoveScores(state, attackerSide, attackerState, defenderState) {
	var activeSearch = getBattleScriptCraftActiveSearch();
	var cacheKey = activeSearch ? getBattleScriptCraftAIScoreCacheKey(state, attackerSide, attackerState, defenderState) : "";
	var cached = getBattleScriptCraftCachedValue(activeSearch, "aiScoreCache", cacheKey);
	var startedAt;
	var scores;
	if (cached !== undefined) return cached;
	startedAt = getBattleScriptCraftProfileTime();
	incrementBattleScriptCraftProfile(activeSearch, "aiScoreCalls");
	try {
		scores = getBattleScriptAIModelMoveScores(state, attackerSide, attackerState, defenderState);
	} catch (e) {
		scores = [];
	}
	addBattleScriptCraftProfileTime(activeSearch, "aiScoreMs", startedAt);
	return cacheBattleScriptCraftValue(activeSearch, "aiScoreCache", "aiScoreCacheOrder", BATTLE_SCRIPT_CRAFT_AI_SCORE_CACHE_LIMIT, cacheKey, scores);
}

function getBattleScriptCraftSwitchDecisionCacheKey(state, side, playerState) {
	return [
		getBattleScriptCraftStateSignature(state),
		"side=" + (side || ""),
		"player=" + getBattleScriptCraftEntrySignature(playerState)
	].join("||");
}

function getBattleScriptCraftCachedSwShSwitchDecisions(state, side, playerState) {
	var activeSearch = getBattleScriptCraftActiveSearch();
	var cacheKey = activeSearch ? getBattleScriptCraftSwitchDecisionCacheKey(state, side, playerState) : "";
	var cached = getBattleScriptCraftCachedValue(activeSearch, "switchDecisionCache", cacheKey);
	var startedAt;
	var decisions;
	if (cached !== undefined) return cached;
	startedAt = getBattleScriptCraftProfileTime();
	incrementBattleScriptCraftProfile(activeSearch, "switchCalls");
	decisions = getSwShSwitchDecisions(state, side, playerState);
	addBattleScriptCraftProfileTime(activeSearch, "switchMs", startedAt);
	return cacheBattleScriptCraftValue(activeSearch, "switchDecisionCache", "switchDecisionCacheOrder", BATTLE_SCRIPT_CRAFT_SWITCH_CACHE_LIMIT, cacheKey, decisions);
}

function getBattleScriptCraftReplacementCacheKey(state, partyIndex) {
	return [
		getBattleScriptCraftStateSignature(state),
		"replacement=" + partyIndex
	].join("||");
}

function getBattleScriptCraftMoveDamage(state, attackerSide, attackerState, defenderState, move, options) {
	var activeSearch = getBattleScriptCraftActiveSearch();
	var cacheKey = activeSearch ? getBattleScriptCraftDamageCacheKey(state, attackerSide, attackerState, defenderState, move, options) : "";
	var cached = getBattleScriptCraftCachedValue(activeSearch, "damageCache", cacheKey);
	var startedAt;
	if (cached !== undefined) return cached;
	startedAt = getBattleScriptCraftProfileTime();
	incrementBattleScriptCraftProfile(activeSearch, "damageCalls");
	try {
		var damage = getBattleScriptMoveDamage(attackerSide, attackerState, defenderState, move, state, options);
		addBattleScriptCraftProfileTime(activeSearch, "damageMs", startedAt);
		return cacheBattleScriptCraftDamage(activeSearch, cacheKey, damage);
	} catch (e) {
		addBattleScriptCraftProfileTime(activeSearch, "damageMs", startedAt);
		return cacheBattleScriptCraftDamage(activeSearch, cacheKey, null);
	}
}

function updateBattleScriptCraftHP(state, targetState, damage, context) {
	if (!targetState || !damage) return;
	updateBattleScriptHP(targetState, damage, context);
	if (targetState.hp.min <= 0 && targetState.hp.max > 0) state.rollRisks++;
}

function applyBattleScriptCraftEntryEffects(state, side, entry) {
	applyBattleScriptEntryEffects(state, side, entry);
	applyBattleScriptPendingEntryEffects(state, side);
}

function applyBattleScriptCraftRechargeAction(state, side) {
	var entry = state.active[side];
	if (!entry) return false;
	state.script.push(getBattleScriptPokemonCommandName(entry) + " uses Recharge");
	entry.mustRecharge = false;
	entry.rechargeMove = "";
	entry.hasActed = true;
	return true;
}

function appendBattleScriptCraftTurn(state) {
	var lastLine = state.script.length ? state.script[state.script.length - 1] : "";
	var nextTurn;
	if (/^Turn\s+\d+$/i.test(lastLine)) return;
	nextTurn = (state.turn || 0) + 1;
	applyBattleScriptEndTurnEffects(state);
	advanceBattleScriptFieldDurations(state, nextTurn);
	state.script.push("Turn " + state.turn);
}

function createBattleScriptCraftPredictionFromScore(trainer, score, guaranteed, contestedWith) {
	return {
		move: findBattleScriptMove(trainer.pokemon, score.move),
		damage: score.damage,
		guaranteed: guaranteed,
		scoreText: formatBattleScriptAIScoreSummary(score),
		contestedWith: contestedWith || ""
	};
}

function createBattleScriptCraftPredictionFromSwitchDecision(decision, guaranteed, contestedWith) {
	return {
		move: null,
		damage: null,
		switchDecision: decision,
		guaranteed: guaranteed,
		scoreText: decision ? decision.value : "",
		contestedWith: contestedWith || ""
	};
}

function getBattleScriptCraftPredictedTrainerMoves(state, defenderState) {
	var trainer = state.active.opponent;
	var scores = [];
	var switchDecisions = [];
	var enabledSwitches = [];
	var topSwitch;
	var activeSearch = getBattleScriptCraftActiveSearch();
	var predictionCacheKey = "";
	var top;
	var second;
	var confidence;
	var predictions = [];
	var bestDamage;
	if (!trainer || !defenderState) return null;
	if (activeSearch) {
		predictionCacheKey = getBattleScriptCraftPredictionCacheKey(state, defenderState);
		var cached = getBattleScriptCraftCachedValue(activeSearch, "predictionCache", predictionCacheKey);
		if (cached !== undefined) return cloneBattleScriptCraftPredictions(cached);
	}
	if (trainer.mustRecharge) {
		return cacheBattleScriptCraftPredictions(activeSearch, predictionCacheKey, [{
			move: null,
			damage: null,
			guaranteed: true,
			recharge: true,
			scoreText: "forced recharge"
		}]);
	}
	if (trainer.chargingMove) {
		top = getBattleScriptForcedChargeMove(trainer);
		return cacheBattleScriptCraftPredictions(activeSearch, predictionCacheKey, [{
			move: top,
			damage: top ? getBattleScriptCraftMoveDamage(state, "opponent", trainer, defenderState, top, {forceChargeResolve: true}) : null,
			guaranteed: true,
			chargingRelease: true,
			scoreText: "forced " + (top ? top.name : trainer.chargingMove) + " release"
		}]);
	}
	if (battleScriptAIModel === "swsh") {
		switchDecisions = getBattleScriptCraftCachedSwShSwitchDecisions(state, "opponent", defenderState);
		for (var switchIndex = 0; switchIndex < switchDecisions.length; switchIndex++) {
			if (switchDecisions[switchIndex].enabled) enabledSwitches.push(switchDecisions[switchIndex]);
		}
		if (enabledSwitches.length) {
			topSwitch = enabledSwitches[0];
			predictions.push(createBattleScriptCraftPredictionFromSwitchDecision(
				topSwitch,
				enabledSwitches.length === 1 || enabledSwitches[1].score !== topSwitch.score,
				enabledSwitches[1] && enabledSwitches[1].score === topSwitch.score ? enabledSwitches[1].label : ""
			));
			return cacheBattleScriptCraftPredictions(activeSearch, predictionCacheKey, predictions);
		}
		scores = getBattleScriptCraftCachedAIModelMoveScores(state, "opponent", trainer, defenderState);
		if (!scores.length) return cacheBattleScriptCraftPredictions(activeSearch, predictionCacheKey, null);
		top = scores[0];
		second = scores.length > 1 ? scores[1] : null;
		confidence = getBattleScriptAIScoreConfidence(scores);
		predictions.push(createBattleScriptCraftPredictionFromScore(trainer, top, confidence.guaranteed, confidence.guaranteed ? "" : (second ? second.move : "")));
		return cacheBattleScriptCraftPredictions(activeSearch, predictionCacheKey, predictions);
	}
	bestDamage = getBattleScriptBestDamage(trainer, defenderState, state);
	if (!bestDamage) return cacheBattleScriptCraftPredictions(activeSearch, predictionCacheKey, null);
	return cacheBattleScriptCraftPredictions(activeSearch, predictionCacheKey, [{
		move: bestDamage.move,
		damage: bestDamage.damage,
		guaranteed: true,
		scoreText: "best damage"
	}]);
}

function getBattleScriptCraftPredictedTrainerMove(state, defenderState) {
	var predictions = getBattleScriptCraftPredictedTrainerMoves(state, defenderState);
	return predictions && predictions.length ? predictions[0] : null;
}

function applyBattleScriptCraftTrainerSwitchAction(state, prediction) {
	var decision = prediction && prediction.switchDecision;
	var candidate;
	if (!decision || typeof decision.partyIndex !== "number") return false;
	candidate = state.rosters.opponent[decision.partyIndex];
	if (!isBattleScriptCraftAlive(candidate) || candidate === state.active.opponent) return false;
	state.script.push("Trainer switch to " + getBattleScriptPokemonCommandName(candidate));
	if (state.active.opponent) clearBattleScriptSwitchVolatileState(state.active.opponent);
	state.active.opponent = candidate;
	candidate.hasActed = true;
	clearBattleScriptSwitchVolatileState(candidate);
	applyBattleScriptCraftEntryEffects(state, "opponent", candidate);
	state.aiChoices++;
	if (prediction.guaranteed) state.guaranteedAIChoices++;
	else state.rollRisks++;
	return true;
}

function applyBattleScriptCraftTrainerAction(state, prediction) {
	var damage;
	var fainted;
	var chargeInfo;
	var blockedReason;
	prediction = prediction || getBattleScriptCraftPredictedTrainerMove(state, state.active.player);
	if (!prediction) return;
	if (prediction.recharge) {
		applyBattleScriptCraftRechargeAction(state, "opponent");
		state.aiChoices++;
		state.guaranteedAIChoices++;
		return;
	}
	if (prediction.switchDecision) {
		applyBattleScriptCraftTrainerSwitchAction(state, prediction);
		return;
	}
	if (!prediction.move) return;
	if (getBattleScriptMoveLegalityBlockReason(state.active.opponent, prediction.move, state)) return;
	state.script.push(getBattleScriptPokemonCommandName(state.active.opponent) + " uses " + prediction.move.name);
	state.aiChoices++;
	if (prediction.guaranteed) state.guaranteedAIChoices++;
	chargeInfo = getBattleScriptChargeActionInfo(state.active.opponent, prediction.move, state);
	if (chargeInfo.startsCharge) {
		applyBattleScriptChargeStartEffects(state.active.opponent, prediction.move);
		commitBattleScriptMoveUse(state.active.opponent);
		lockBattleScriptChoiceMove(state.active.opponent, prediction.move, state);
		state.active.opponent.chargingMove = prediction.move.name;
		state.active.opponent.hasActed = true;
		return;
	}
	if (chargeInfo.consumesPowerHerb) applyBattleScriptChargeStartEffects(state.active.opponent, prediction.move);
	damage = getBattleScriptCraftMoveDamage(state, "opponent", state.active.opponent, state.active.player, prediction.move, {forceChargeResolve: chargeInfo.resolvesNow}) || prediction.damage;
	if (chargeInfo.consumesPowerHerb) consumeBattleScriptPowerHerb(state.active.opponent);
	blockedReason = getBattleScriptChargeBlockedReason(state.active.opponent, state.active.player, prediction.move, state);
	if (damage) updateBattleScriptCraftHP(state, state.active.player, damage, {
		state: state,
		attackerState: state.active.opponent,
		move: prediction.move
	});
	if (!blockedReason) {
		applyBattleScriptMoveEffects(state.active.opponent, state.active.player, prediction.move, {state: state, attackerSide: "opponent", skipDefender: !isBattleScriptCraftAlive(state.active.player), skipChargeStartEffects: true});
	}
	applyBattleScriptAfterMoveUseHeldItemEffects(state.active.opponent, prediction.move, [], state);
	if (isBattleScriptSelfFaintMove(prediction.move)) {
		fainted = state.active.opponent;
		fainted.hp = {min: 0, max: 0};
		fainted.mustRecharge = false;
		fainted.rechargeMove = "";
		clearBattleScriptChargeState(fainted);
		fainted.hasActed = true;
		state.script.push("Trainer " + getBattleScriptPokemonCommandName(fainted) + " faints");
		state.active.opponent = null;
		return;
	}
	if (chargeInfo.release) clearBattleScriptChargeState(state.active.opponent);
	lockBattleScriptChoiceMove(state.active.opponent, prediction.move, state);
	if (isBattleScriptRechargeMove(prediction.move)) {
		state.active.opponent.mustRecharge = true;
		state.active.opponent.rechargeMove = prediction.move.name;
		clearBattleScriptChargeState(state.active.opponent);
	}
	state.active.opponent.hasActed = true;
	if (!isBattleScriptCraftAlive(state.active.player)) {
		fainted = state.active.player;
		clearBattleScriptChargeState(fainted);
		state.script.push("Player " + getBattleScriptPokemonCommandName(fainted) + " faints");
		state.active.player = null;
	}
}

function applyBattleScriptCraftPlayerMove(state, move) {
	var damage = null;
	var fainted;
	var chargeInfo;
	var blockedReason;
	var moveEffects;
	if (state.active.player && state.active.player.chargingMove &&
			normalizeBattleScriptText(state.active.player.chargingMove) !== normalizeBattleScriptText(move && move.name)) {
		return false;
	}
	if (getBattleScriptMoveLegalityBlockReason(state.active.player, move, state)) return false;
	chargeInfo = getBattleScriptChargeActionInfo(state.active.player, move, state);
	moveEffects = getBattleScriptMoveEffects(move);
	if (!isBattleScriptDamagingMove(move) && !moveEffects.length && !chargeInfo.isChargeMove) return false;
	state.script.push(getBattleScriptPokemonCommandName(state.active.player) + " uses " + move.name);
	if (chargeInfo.startsCharge) {
		applyBattleScriptChargeStartEffects(state.active.player, move);
		commitBattleScriptMoveUse(state.active.player);
		lockBattleScriptChoiceMove(state.active.player, move, state);
		state.active.player.chargingMove = move.name;
		state.active.player.hasActed = true;
		return true;
	}
	if (chargeInfo.consumesPowerHerb) applyBattleScriptChargeStartEffects(state.active.player, move);
	if (isBattleScriptDamagingMove(move)) {
		damage = getBattleScriptCraftMoveDamage(state, "player", state.active.player, state.active.opponent, move, {forceChargeResolve: chargeInfo.resolvesNow});
		if (!damage) return false;
	} else if (!moveEffects.length && !chargeInfo.isChargeMove) {
		return false;
	}
	if (chargeInfo.consumesPowerHerb) consumeBattleScriptPowerHerb(state.active.player);
	blockedReason = getBattleScriptChargeBlockedReason(state.active.player, state.active.opponent, move, state);
	if (damage) updateBattleScriptCraftHP(state, state.active.opponent, damage, {
		state: state,
		attackerState: state.active.player,
		move: move
	});
	if (!blockedReason) {
		applyBattleScriptMoveEffects(state.active.player, state.active.opponent, move, {state: state, attackerSide: "player", skipDefender: !isBattleScriptCraftAlive(state.active.opponent), skipChargeStartEffects: true});
	}
	applyBattleScriptAfterMoveUseHeldItemEffects(state.active.player, move, [], state);
	if (isBattleScriptSelfFaintMove(move)) {
		fainted = state.active.player;
		fainted.hp = {min: 0, max: 0};
		fainted.mustRecharge = false;
		fainted.rechargeMove = "";
		clearBattleScriptChargeState(fainted);
		fainted.hasActed = true;
		state.script.push("Player " + getBattleScriptPokemonCommandName(fainted) + " faints");
		state.active.player = null;
		return true;
	}
	if (chargeInfo.release) clearBattleScriptChargeState(state.active.player);
	lockBattleScriptChoiceMove(state.active.player, move, state);
	if (isBattleScriptRechargeMove(move)) {
		state.active.player.mustRecharge = true;
		state.active.player.rechargeMove = move.name;
		clearBattleScriptChargeState(state.active.player);
	}
	state.active.player.hasActed = true;
	if (!isBattleScriptCraftAlive(state.active.opponent)) {
		fainted = state.active.opponent;
		clearBattleScriptChargeState(fainted);
		state.script.push("Trainer " + getBattleScriptPokemonCommandName(fainted) + " faints");
		state.active.opponent = null;
	}
	return true;
}

function isBattleScriptCraftPlayerFirst(state, playerState, trainerState, playerMove, trainerMove) {
	var playerPriority = playerMove && playerMove.priority ? playerMove.priority : 0;
	var trainerPriority = trainerMove && trainerMove.priority ? trainerMove.priority : 0;
	if (playerState && playerState.custapReady) playerPriority += 0.5;
	if (trainerState && trainerState.custapReady) trainerPriority += 0.5;
	if (playerPriority !== trainerPriority) return playerPriority > trainerPriority;
	return isBattleScriptFasterOrTied(playerState, trainerState, state);
}

function isBattleScriptCraftTrainerSwitchPrediction(prediction) {
	return !!(prediction && prediction.switchDecision);
}

function getBattleScriptCraftBoostMoveScore(state, move) {
	var effects = getBattleScriptMoveEffects(move) || [];
	var score = isBattleScriptDamagingMove(move) ? 0.6 : 1.1;
	var prediction = getBattleScriptCraftPredictedTrainerMove(state, state.active.player);
	var threatened = prediction && prediction.damage && prediction.damage.max >= state.active.player.hp.min;
	for (var i = 0; i < effects.length; i++) {
		var magnitude = Math.abs(effects[i].amount || 0);
		var chanceFactor = (effects[i].chance || 100) / 100;
		var helpsPlayer = effects[i].target !== "attacker" || effects[i].amount > 0;
		if (effects[i].kind === "boost") {
			score += chanceFactor * magnitude * (helpsPlayer ? 0.65 : -0.45);
			if ((effects[i].stat === "atk" || effects[i].stat === "spa") && helpsPlayer) score += chanceFactor * 0.9;
			if ((effects[i].stat === "def" || effects[i].stat === "spd") && helpsPlayer) score += chanceFactor * 0.7;
			if (effects[i].stat === "spe" && helpsPlayer && !isBattleScriptFasterOrTied(state.active.player, state.active.opponent, state)) score += chanceFactor * 1.1;
		}
		if (effects[i].kind === "status") {
			if (effects[i].status === "brn" || effects[i].status === "par" || effects[i].status === "slp") score += chanceFactor * 1.2;
			else score += chanceFactor * 0.55;
		}
		if (effects[i].kind === "accuracy") score += chanceFactor * magnitude * (helpsPlayer ? 0.35 : -0.25);
		if (effects[i].kind === "volatile" && effects[i].volatile === "flinch" && isBattleScriptFasterOrTied(state.active.player, state.active.opponent, state)) score += chanceFactor * 0.7;
	}
	if (threatened) score += 0.85;
	return score;
}

function getBattleScriptCraftMoveActions(state) {
	var actions = [];
	var player = state.active.player;
	var opponent = state.active.opponent;
	var safeNonRechargeKOs;
	var forcedChargeMove;
	if (!player || !opponent || !player.pokemon || !player.pokemon.moves) return actions;
	forcedChargeMove = getBattleScriptForcedChargeMove(player);
	if (forcedChargeMove) {
		return [{
			type: "move",
			move: forcedChargeMove,
			damage: getBattleScriptCraftMoveDamage(state, "player", player, opponent, forcedChargeMove, {forceChargeResolve: true}),
			score: 25
		}];
	}
	safeNonRechargeKOs = getBattleScriptSafeNonRechargeKOMoves(player, opponent, state);
	for (var i = 0; i < player.pokemon.moves.length; i++) {
		var move = player.pokemon.moves[i];
		var damage;
		var effects = getBattleScriptMoveEffects(move);
		var accuracy = getBattleScriptEffectiveAccuracy(move, player, opponent, state);
		var score;
		if (getBattleScriptMoveLegalityBlockReason(player, move, state)) continue;
		if (!isBattleScriptDamagingMove(move) && !effects.length) continue;
		if (isBattleScriptDamagingMove(move)) {
			damage = getBattleScriptCraftMoveDamage(state, "player", player, opponent, move);
			if (!damage) continue;
		}
		score = (damage ? (damage.max / opponent.maxHP) + (damage.min >= opponent.hp.max ? 3 : 0) : 0) +
			(effects.length ? getBattleScriptCraftBoostMoveScore(state, move) : 0) -
			(accuracy.chance < 1 ? (1 - accuracy.chance) * 1.5 : 0);
		if (damage && damage.min >= opponent.hp.max) score += 8;
		else if (damage && damage.max >= opponent.hp.max) score += 2.5;
		if (damage && damage.min >= opponent.hp.max && !isBattleScriptRechargeMove(move) &&
				!requiresBattleScriptChargeTurn(player, move, state)) {
			score += 3;
		}
		if (isBattleScriptRechargeMove(move)) {
			score -= damage && damage.min >= opponent.hp.max && safeNonRechargeKOs.length ? 3.5 : 1.1;
		}
		if (requiresBattleScriptChargeTurn(player, move, state)) {
			score -= getBattleScriptChargeMoveInfo(move).invulnerable ? 0.55 : 1.65;
		}
		actions.push({
			type: "move",
			move: move,
			damage: damage,
			score: score
		});
	}
	actions.sort(function (a, b) {
		return b.score - a.score;
	});
	return actions.slice(0, 5);
}

function getBattleScriptCraftPredictedIncomingInfoForSwitch(state, candidate, prediction) {
	var move = prediction && prediction.move;
	var damage = null;
	var blockReason = "";
	var incomingPercent = 0;
	var hasDisruption = false;
	if (!state || !candidate || !move || !state.active || !state.active.opponent || prediction.switchDecision || prediction.recharge) {
		return {
			damage: null,
			incomingPercent: 0,
			survives: true,
			blocked: false,
			disruption: false
		};
	}
	blockReason = getBattleScriptAIMoveContextBlockReason(move, "opponent", state.active.opponent, candidate, state);
	if (isBattleScriptDamagingMove(move)) {
		damage = getBattleScriptCraftMoveDamage(state, "opponent", state.active.opponent, candidate, move, {
			forceChargeResolve: isBattleScriptChargeRelease(state.active.opponent, move)
		});
		if (damage) incomingPercent = getBattleScriptDamagePercentAgainst(damage, candidate);
		if ((damage && damage.max <= 0) || getBattleScriptMoveEffectivenessValue(move, candidate, state, state.active.opponent) === 0) {
			blockReason = blockReason || "type immunity";
		}
	} else if (!blockReason) {
		var effects = getBattleScriptMoveEffects(move);
		for (var i = 0; i < effects.length; i++) {
			if (effects[i].target !== "defender") continue;
			if (effects[i].kind === "status" || effects[i].kind === "volatile" ||
					((effects[i].kind === "boost" || effects[i].kind === "accuracy" || effects[i].kind === "evasion") && effects[i].amount < 0)) {
				hasDisruption = true;
				break;
			}
		}
	}
	return {
		damage: damage,
		incomingPercent: incomingPercent,
		survives: !damage || damage.max < candidate.hp.min,
		blocked: !!blockReason,
		blockReason: blockReason,
		disruption: hasDisruption
	};
}

function getBattleScriptCraftSwitchScore(state, candidate) {
	var prediction = getBattleScriptCraftPredictedTrainerMove(state, state.active.player);
	var incomingInfo = getBattleScriptCraftPredictedIncomingInfoForSwitch(state, candidate, prediction);
	var returnDamage = getBattleScriptReturnDamageInfo(candidate, state.active.opponent, state);
	var score = (incomingInfo.survives ? 2 : -5) + returnDamage.maxPercent * 2.4 + returnDamage.koBonus * 3.2 -
		incomingInfo.incomingPercent * 3.5;
	if (incomingInfo.blocked) score += 6;
	else if (incomingInfo.disruption) score -= 2.75;
	if (incomingInfo.survives && incomingInfo.incomingPercent <= 0.15) score += 1.25;
	if (incomingInfo.survives && returnDamage.koBonus) score += 1.75;
	if (!incomingInfo.survives) score -= 4;
	return score;
}

function getBattleScriptCraftSwitchActions(state) {
	var actions = [];
	var roster = state.rosters.player;
	for (var i = 0; i < roster.length; i++) {
		var candidate = roster[i];
		if (!isBattleScriptCraftAlive(candidate) || candidate === state.active.player) continue;
		actions.push({
			type: "switch",
			target: candidate,
			score: getBattleScriptCraftSwitchScore(state, candidate)
		});
	}
	actions.sort(function (a, b) {
		return b.score - a.score;
	});
	return actions.slice(0, 3);
}

function hasBattleScriptDamagingMoveType(entry, typeName) {
	var moves = entry && entry.pokemon ? entry.pokemon.moves || [] : [];
	for (var i = 0; i < moves.length; i++) {
		if (isBattleScriptDamagingMove(moves[i]) && getBattleScriptMoveEffectProfile(moves[i]).type === typeName) return true;
	}
	return false;
}

function hasBattleScriptChargeMove(entry) {
	var moves = entry && entry.pokemon ? entry.pokemon.moves || [] : [];
	for (var i = 0; i < moves.length; i++) {
		if (isBattleScriptChargeMove(moves[i])) return true;
	}
	return false;
}

function getBattleScriptTypeBoostItemType(itemName) {
	return BATTLE_SCRIPT_TYPE_BOOST_ITEMS[normalizeBattleScriptText(itemName)] || "";
}

function getBattleScriptEntryAbilityWeather(entry) {
	var ability = entry && entry.pokemon ? entry.pokemon.ability || "" : "";
	return ability ? BATTLE_SCRIPT_WEATHER_ABILITIES[ability] || "" : "";
}

function getBattleScriptEntryAbilityTerrain(entry) {
	var ability = entry && entry.pokemon ? entry.pokemon.ability || "" : "";
	return ability ? BATTLE_SCRIPT_TERRAIN_ABILITIES[ability] || "" : "";
}

function getBattleScriptWeatherDurationItemWeather(itemName) {
	for (var weather in BATTLE_SCRIPT_WEATHER_DURATION_ITEMS) {
		if (Object.prototype.hasOwnProperty.call(BATTLE_SCRIPT_WEATHER_DURATION_ITEMS, weather) &&
				BATTLE_SCRIPT_WEATHER_DURATION_ITEMS[weather] === itemName) return weather;
	}
	return "";
}

function hasBattleScriptScreenMove(entry) {
	return hasBattleScriptMoveNamed(entry, ["Aurora Veil", "Light Screen", "Reflect"]);
}

function hasBattleScriptInaccurateMove(entry) {
	var moves = entry && entry.pokemon ? entry.pokemon.moves || [] : [];
	for (var i = 0; i < moves.length; i++) {
		if (getBattleScriptMoveEffectProfile(moves[i]).accuracy < 100) return true;
	}
	return false;
}

function hasBattleScriptPlayerSideEntryHazards(state) {
	var side = state && state.sideConditions ? state.sideConditions.player || {} : {};
	for (var i = 0; i < BATTLE_SCRIPT_HAZARD_KEYS.length; i++) {
		if (side[BATTLE_SCRIPT_HAZARD_KEYS[i]]) return true;
	}
	return false;
}

function shouldConsiderBattleScriptLoadoutBagItem(state, player, itemName) {
	var key = normalizeBattleScriptText(itemName);
	var type = getBattleScriptTypeBoostItemType(itemName);
	var weather = getBattleScriptEntryWeather(player, state);
	var terrain = getBattleScriptEntryTerrain(player, state);
	var holdEffect;
	if (!key) return false;
	if (isBattleScriptStatusHealingItem(itemName)) return true;
	if (type && hasBattleScriptDamagingMoveType(player, type)) return true;
	if (/^(?:choiceband|choicespecs|choicescarf|lifeorb|expertbelt|focussash|eviolite|assaultvest|leftovers|blacksludge|shellbell|sitrusberry|berryjuice|oranberry|weaknesspolicy)$/.test(key)) return true;
	if (key === "powerherb") return hasBattleScriptChargeMove(player);
	if (key === "lightclay") return hasBattleScriptScreenMove(player);
	if (key === "terrainextender") return !!terrain;
	if (getBattleScriptWeatherDurationItemWeather(itemName)) return !!weather && BATTLE_SCRIPT_WEATHER_DURATION_ITEMS[weather] === itemName;
	if (key === "heavydutyboots") return hasBattleScriptPlayerSideEntryHazards(state);
	if (/^(?:widelens|zoomlens|micleberry)$/.test(key)) return hasBattleScriptInaccurateMove(player);
	if (/^(?:brightpowder|laxincense|rockyhelmet|airballoon|safetygoggles|protectivepads|bigroot|roomservice|throatspray)$/.test(key)) return true;
	if (BATTLE_SCRIPT_RESIST_BERRIES[key] || BATTLE_SCRIPT_PINCH_HEAL_BERRIES[key] ||
			BATTLE_SCRIPT_PINCH_STAT_BERRIES[key] || BATTLE_SCRIPT_DAMAGE_TRIGGER_ITEMS[key]) return true;
	if (BATTLE_SCRIPT_TERRAIN_SEEDS[key]) {
		return state && state.terrain === BATTLE_SCRIPT_TERRAIN_SEEDS[key].terrain || terrain === BATTLE_SCRIPT_TERRAIN_SEEDS[key].terrain;
	}
	if ((key === "flameorb" || key === "toxicorb") &&
			hasBattleScriptEffectiveAbility(player, ["Guts", "Quick Feet", "Marvel Scale", "Poison Heal"], {state: state, targetState: player})) {
		return true;
	}
	if (/(?:plate|gem|memory|drive)$/.test(key)) return true;
	holdEffect = getBattleScriptSwShItemHoldEffect(itemName);
	return !!(holdEffect && !BATTLE_SCRIPT_NON_BATTLE_HOLD_EFFECTS[holdEffect] &&
		getBattleScriptBagItemStaticPriority(itemName, player) >= 6);
}

function getBattleScriptBagItemStaticPriority(itemName, player) {
	var key = normalizeBattleScriptText(itemName);
	var score = 1;
	var type = getBattleScriptTypeBoostItemType(itemName);
	var weather = getBattleScriptEntryAbilityWeather(player);
	var holdEffect = getBattleScriptSwShItemHoldEffect(itemName);
	if (/^(?:choiceband|choicespecs|choicescarf|lifeorb|expertbelt|focussash|eviolite|assaultvest|leftovers|blacksludge|rockyhelmet|weaknesspolicy|lightclay|heavydutyboots)$/.test(key)) {
		score += 9;
	}
	if (isBattleScriptModeledHeldItemCandidate(itemName)) score += 3;
	if (/berry$/.test(key)) score += 4;
	if (key === "powerherb" && hasBattleScriptChargeMove(player)) score += 10;
	if (key === "terrainextender" && getBattleScriptEntryAbilityTerrain(player)) score += 10;
	if (weather && BATTLE_SCRIPT_WEATHER_DURATION_ITEMS[weather] === itemName) score += 10;
	if (key === "lightclay" && hasBattleScriptScreenMove(player)) score += 8;
	if (/^(?:widelens|zoomlens|micleberry)$/.test(key) && hasBattleScriptInaccurateMove(player)) score += 6;
	if (holdEffect && !BATTLE_SCRIPT_NON_BATTLE_HOLD_EFFECTS[holdEffect]) score += 2;
	if (/(?:plate|gem|memory|drive)$/.test(key)) score += 2;
	if (type && hasBattleScriptDamagingMoveType(player, type)) score += 8;
	return score;
}

function shouldAlwaysConsiderBattleScriptBagItem(itemName, player) {
	var key = normalizeBattleScriptText(itemName);
	var type = getBattleScriptTypeBoostItemType(itemName);
	if (isBattleScriptStatusHealingItem(itemName)) return true;
	if (BATTLE_SCRIPT_RESIST_BERRIES[key] || BATTLE_SCRIPT_PINCH_HEAL_BERRIES[key] ||
			BATTLE_SCRIPT_PINCH_STAT_BERRIES[key] || BATTLE_SCRIPT_TERRAIN_SEEDS[key] ||
			BATTLE_SCRIPT_DAMAGE_TRIGGER_ITEMS[key]) return true;
	if (/^(?:choiceband|choicespecs|choicescarf|lifeorb|expertbelt|focussash|eviolite|assaultvest|leftovers|blacksludge|rockyhelmet|weaknesspolicy|lightclay|heavydutyboots|powerherb|terrainextender|airballoon|whiteherb|roomservice|throatspray|shellbell|flameorb|toxicorb|stickybarb|custapberry|lansatberry|micleberry|starfberry|berryjuice|oranberry|sitrusberry|jabocaberry|rowapberry|keeberry|marangaberry)$/.test(key)) {
		return true;
	}
	if (isBattleScriptModeledHeldItemCandidate(itemName)) return true;
	if (type && hasBattleScriptDamagingMoveType(player, type)) return true;
	if (/(?:plate|gem|memory|drive)$/.test(key)) return true;
	return false;
}

function getBattleScriptBagItemCandidates(state, player, options) {
	var items = getBattleScriptImportedPlayerBagItems();
	var assigned = state && state.assignedBagItems ? state.assignedBagItems : {};
	var candidates = [];
	var selected = [];
	var selectedMap = {};
	var loadout = !!(options && options.loadout);
	var limit = loadout ? BATTLE_SCRIPT_CRAFT_LOADOUT_ITEM_LIMIT : BATTLE_SCRIPT_BAG_ITEM_EVALUATION_LIMIT;
	for (var i = 0; i < items.length; i++) {
		var priority;
		if (Math.max(0, (items[i].count || 0) - (assigned[items[i].name] || 0)) <= 0) continue;
		if (player && player.pokemon && player.pokemon.item === items[i].name) continue;
		priority = getBattleScriptBagItemStaticPriority(items[i].name, player);
		if (loadout && shouldConsiderBattleScriptLoadoutBagItem(state, player, items[i].name)) priority += 14;
		candidates.push({
			name: items[i].name,
			count: items[i].count,
			priority: priority
		});
	}
	candidates.sort(function (a, b) {
		if (b.priority !== a.priority) return b.priority - a.priority;
		return a.name.localeCompare(b.name);
	});
	selected = candidates.slice(0, limit);
	for (var j = 0; j < selected.length; j++) selectedMap[selected[j].name] = true;
	for (var k = 0; k < candidates.length; k++) {
		if (selectedMap[candidates[k].name]) continue;
		if (loadout) {
			if (!shouldConsiderBattleScriptLoadoutBagItem(state, player, candidates[k].name)) continue;
		} else if (!shouldAlwaysConsiderBattleScriptBagItem(candidates[k].name, player)) {
			continue;
		}
		selected.push(candidates[k]);
		selectedMap[candidates[k].name] = true;
	}
	return selected;
}

function getBattleScriptPredictionPressure(prediction, defenderState) {
	return prediction && prediction.damage ? getBattleScriptDamagePercentAgainst(prediction.damage, defenderState) : 0;
}

function getBattleScriptPredictionStatusThreat(prediction, defenderState, state, attackerState, attackerSide) {
	var effects;
	var targetSide = attackerSide ? getBattleScriptOpposingSide(attackerSide) : "player";
	if (!prediction || !prediction.move || !defenderState || defenderState.pokemon.status) return null;
	effects = getBattleScriptMoveEffects(prediction.move);
	for (var i = 0; i < effects.length; i++) {
		if (effects[i].kind !== "status" || effects[i].target !== "defender") continue;
		if ((effects[i].chance || 100) < 100 && prediction.move.category !== "Status") continue;
		if (getBattleScriptStatusBlockReason(defenderState, effects[i].status, {
			state: state,
			attackerSide: attackerSide || "opponent",
			attackerState: attackerState,
			targetSide: targetSide,
			move: prediction.move
		})) continue;
		return {
			move: prediction.move.name,
			status: effects[i].status,
			chance: effects[i].chance || 100
		};
	}
	return null;
}

function getBattleScriptCraftItemEvaluationCacheKey(state, player, opponent, itemName) {
	return [
		getBattleScriptCraftStateSignature(state),
		"player=" + getBattleScriptCraftEntrySignature(player),
		"opponent=" + getBattleScriptCraftEntrySignature(opponent),
		"item=" + (itemName || "")
	].join("||");
}

function cacheBattleScriptCraftItemEvaluation(search, key, evaluation) {
	return cacheBattleScriptCraftValue(search, "itemEvaluationCache", "itemEvaluationCacheOrder", BATTLE_SCRIPT_CRAFT_ITEM_CACHE_LIMIT, key, evaluation);
}

function getBattleScriptBagItemActionScore(state, player, opponent, itemName) {
	var activeSearch = getBattleScriptCraftActiveSearch();
	var cacheKey = activeSearch ? getBattleScriptCraftItemEvaluationCacheKey(state, player, opponent, itemName) : "";
	var cached = getBattleScriptCraftCachedValue(activeSearch, "itemEvaluationCache", cacheKey);
	var startedAt;
	var basePlayer = cloneBattleScriptRosterEntry(player);
	var baseOpponent = cloneBattleScriptRosterEntry(opponent);
	var itemPlayer = cloneBattleScriptRosterEntry(player);
	var itemOpponent = cloneBattleScriptRosterEntry(opponent);
	var baseState;
	var itemState;
	var baseBest;
	var itemBest;
	var basePrediction;
	var itemPrediction;
	var baseAttack = 0;
	var itemAttack = 0;
	var baseIncoming = 0;
	var itemIncoming = 0;
	var speedGain = 0;
	var koGain = 0;
	var survivalGain = 0;
	var statusHealing = getBattleScriptStatusHealingStatuses(itemName);
	var craftPrediction;
	var statusThreat;
	var statusGain = 0;
	if (cached !== undefined) return cached;
	startedAt = getBattleScriptCraftProfileTime();
	incrementBattleScriptCraftProfile(activeSearch, "itemEvaluations");
	if (!basePlayer || !baseOpponent || !itemPlayer || !itemOpponent) {
		addBattleScriptCraftProfileTime(activeSearch, "itemEvaluationMs", startedAt);
		return cacheBattleScriptCraftItemEvaluation(activeSearch, cacheKey, null);
	}
	itemPlayer.pokemon.item = itemName;
	baseState = createBattleScriptRecommendationState(state, basePlayer, baseOpponent);
	itemState = createBattleScriptRecommendationState(state, itemPlayer, itemOpponent);
	baseBest = getBattleScriptBestDamage(basePlayer, baseOpponent, baseState);
	itemBest = getBattleScriptBestDamage(itemPlayer, itemOpponent, itemState);
	if (baseBest && baseBest.damage) baseAttack = getBattleScriptDamagePercentAgainst(baseBest.damage, baseOpponent);
	if (itemBest && itemBest.damage) itemAttack = getBattleScriptDamagePercentAgainst(itemBest.damage, itemOpponent);
	basePrediction = getBattleScriptTrainerPrediction(baseState, basePlayer, baseOpponent);
	itemPrediction = getBattleScriptTrainerPrediction(itemState, itemPlayer, itemOpponent);
	baseIncoming = getBattleScriptPredictionPressure(basePrediction, basePlayer);
	itemIncoming = getBattleScriptPredictionPressure(itemPrediction, itemPlayer);
	if (statusHealing.length) {
		craftPrediction = getBattleScriptCraftPredictedTrainerMove(state, player);
		statusThreat = getBattleScriptPredictionStatusThreat(craftPrediction, player, state, opponent, "opponent");
		if (!statusThreat || !doesBattleScriptItemHealStatus(itemName, statusThreat.status)) {
			addBattleScriptCraftProfileTime(activeSearch, "itemEvaluationMs", startedAt);
			return cacheBattleScriptCraftItemEvaluation(activeSearch, cacheKey, null);
		}
		statusGain = 6.5 + Math.min(2.5, (statusThreat.chance || 100) / 100);
	}
	if (!isBattleScriptFasterOrTied(basePlayer, baseOpponent, baseState) &&
			isBattleScriptFasterOrTied(itemPlayer, itemOpponent, itemState)) {
		speedGain = 0.45;
	}
	if (itemBest && itemBest.damage && itemBest.damage.min >= itemOpponent.hp.max &&
			(!baseBest || !baseBest.damage || baseBest.damage.min < baseOpponent.hp.max)) {
		koGain = 2.75;
	}
	if (basePrediction && basePrediction.damage && basePrediction.damage.max >= basePlayer.hp.min &&
			(!itemPrediction || !itemPrediction.damage || itemPrediction.damage.max < itemPlayer.hp.min)) {
		survivalGain = 2.25;
	}
	addBattleScriptCraftProfileTime(activeSearch, "itemEvaluationMs", startedAt);
	return cacheBattleScriptCraftItemEvaluation(activeSearch, cacheKey, {
		itemName: itemName,
		bestMove: itemBest && itemBest.move ? itemBest.move.name : "",
		baseAttack: baseAttack,
		itemAttack: itemAttack,
		baseIncoming: baseIncoming,
		itemIncoming: itemIncoming,
		attackGain: itemAttack - baseAttack,
		defenseGain: baseIncoming - itemIncoming,
		speedGain: speedGain,
		koGain: koGain,
		survivalGain: survivalGain,
		statusThreat: statusThreat,
		statusGain: statusGain,
		score: ((itemAttack - baseAttack) * 8) + ((baseIncoming - itemIncoming) * 6) + speedGain + koGain + survivalGain + statusGain
	});
}

function createBattleScriptCraftBagItemAction(itemName, score, evaluation, reason) {
	return {
		type: "item",
		itemName: itemName,
		score: score,
		evaluation: evaluation,
		loadoutReason: reason || ""
	};
}

function getBattleScriptCraftItemEvaluationGain(evaluation) {
	if (!evaluation) return 0;
	return Math.max(0,
		evaluation.attackGain || 0,
		evaluation.defenseGain || 0,
		evaluation.speedGain || 0,
		evaluation.koGain || 0,
		evaluation.survivalGain || 0,
		evaluation.statusGain || 0
	);
}

function getBattleScriptCraftSafeFallbackItemScore(state, player, candidate, evaluation) {
	var itemName = candidate && candidate.name ? candidate.name : "";
	var key = normalizeBattleScriptText(itemName);
	var type = getBattleScriptTypeBoostItemType(itemName);
	var gain = getBattleScriptCraftItemEvaluationGain(evaluation);
	if (!itemName || !isBattleScriptModeledHeldItemCandidate(itemName)) return null;
	if (/^(?:flameorb|toxicorb|stickybarb|choiceband|choicespecs|choicescarf|assaultvest|laggingtail|fullincense|ironball|machobrace|ringtarget|redcard|ejectbutton|ejectpack|blunderpolicy|quickclaw|focusband)$/.test(key)) return null;
	if (type && hasBattleScriptDamagingMoveType(player, type)) {
		return {
			score: 120 + (candidate.priority || 0) / 100 + gain,
			reason: "safe modeled " + type + " damage item"
		};
	}
	if (/(?:plate|gem|memory|drive)$/.test(key)) {
		return {
			score: 115 + (candidate.priority || 0) / 100 + gain,
			reason: "safe modeled held item"
		};
	}
	if (/^(?:leftovers|shellbell|sitrusberry|berryjuice|oranberry|heavydutyboots|safetygoggles|widelens|zoomlens|brightpowder|laxincense|bigroot|protectivepads|terrainextender|lightclay|roomservice|throatspray|eviolite|focussash|expertbelt|muscleband|wiseglasses)$/.test(key)) {
		return {
			score: 110 + (candidate.priority || 0) / 100 + gain,
			reason: "safe modeled held item"
		};
	}
	return null;
}

function getBattleScriptCraftLoadoutItemScore(state, player, candidate, evaluation) {
	var itemName = candidate && candidate.name ? candidate.name : "";
	var key = normalizeBattleScriptText(itemName);
	var type = getBattleScriptTypeBoostItemType(itemName);
	var weather = getBattleScriptEntryWeather(player, state);
	var terrain = getBattleScriptEntryTerrain(player, state);
	var gain = getBattleScriptCraftItemEvaluationGain(evaluation);
	var prediction = null;
	var predictionLoaded = false;
	var predictedType = "";
	var predictedEffectiveness = 4;
	var fallbackScore;
	function getPrediction() {
		if (!predictionLoaded) {
			prediction = getBattleScriptCraftPredictedTrainerMove(state, player);
			predictionLoaded = true;
		}
		return prediction;
	}
	function getPredictedType() {
		var currentPrediction = getPrediction();
		if (!predictedType && currentPrediction && currentPrediction.move) predictedType = getBattleScriptMoveType(currentPrediction.move);
		return predictedType;
	}
	function getPredictedEffectiveness() {
		var currentPrediction = getPrediction();
		if (currentPrediction && currentPrediction.move && predictedEffectiveness === 4) {
			predictedEffectiveness = getBattleScriptMoveEffectivenessValue(currentPrediction.move, player, state, state && state.active ? state.active.opponent : null);
		}
		return predictedEffectiveness;
	}
	if (!itemName) return null;
	evaluation = evaluation || {};
	if (isBattleScriptStatusHealingItem(itemName)) {
		if (!evaluation.statusGain) return null;
		return {
			score: 500 + evaluation.statusGain,
			reason: evaluation.statusThreat ? "covers predicted " + evaluation.statusThreat.status + " from " + evaluation.statusThreat.move : "covers predicted status"
		};
	}
	if (key === "powerherb" && hasBattleScriptChargeMove(player)) {
		return {
			score: 450 + Math.max(0, evaluation.score || 0) + (candidate.priority || 0) / 100,
			reason: "resolves setup for moves spanning two turns"
		};
	}
	if (type && hasBattleScriptDamagingMoveType(player, type)) {
		return {
			score: 400 + Math.max(0, evaluation.score || 0) + (evaluation.attackGain || 0) + (candidate.priority || 0) / 100,
			reason: "boosts " + type + " attacks"
		};
	}
	if (key === "expertbelt" && (evaluation.attackGain || 0) > 0) {
		return {
			score: 350 + evaluation.attackGain,
			reason: "boosts super effective damage"
		};
	}
	if (/^(?:choiceband|choicespecs|lifeorb)$/.test(key) && evaluation && (evaluation.attackGain || 0) > 0) {
		return {
			score: 340 + evaluation.attackGain,
			reason: "improves best damage"
		};
	}
	if (key === "choicescarf" && evaluation && (evaluation.speedGain || 0) > 0) {
		return {
			score: 335 + evaluation.speedGain,
			reason: "wins the modeled speed check"
		};
	}
	if (key === "focussash" && (evaluation.survivalGain || gain) > 0) {
		return {
			score: 325 + gain,
			reason: "preserves a survival line at full HP"
		};
	}
	if (/^(?:eviolite|assaultvest)$/.test(key) && evaluation && (evaluation.defenseGain || evaluation.survivalGain || 0) > 0) {
		return {
			score: 300 + gain,
			reason: "improves modeled bulk"
		};
	}
	if (key === "weaknesspolicy" && getPrediction() && prediction.damage && getPredictedEffectiveness() > 4 && prediction.damage.max < player.hp.min) {
		return {
			score: 295,
			reason: "survives predicted super effective hit and triggers Weakness Policy"
		};
	}
	if (BATTLE_SCRIPT_RESIST_BERRIES[key] && getPrediction() && prediction.move &&
			BATTLE_SCRIPT_RESIST_BERRIES[key] === getPredictedType() && getPredictedEffectiveness() > 4) {
		return {
			score: 290,
			reason: "resists predicted " + predictedType + " hit from " + prediction.move.name
		};
	}
	if (key === "airballoon" && getPrediction() && prediction.move && getPredictedType() === "Ground") {
		return {
			score: 285,
			reason: "blocks predicted Ground pressure"
		};
	}
	if (key === "heavydutyboots" && state && state.sideConditions && state.sideConditions.player &&
			Object.keys(state.sideConditions.player).length) {
		return {
			score: 280,
			reason: "ignores Player side entry hazards"
		};
	}
	if (key === "terrainextender" && terrain) {
		return {
			score: 275,
			reason: "extends " + terrain + " Terrain from " + player.pokemon.ability
		};
	}
	if (weather && BATTLE_SCRIPT_WEATHER_DURATION_ITEMS[weather] === itemName) {
		return {
			score: 260,
			reason: "extends " + weather + " from " + player.pokemon.ability
		};
	}
	if (key === "lightclay" && hasBattleScriptScreenMove(player)) {
		return {
			score: 240,
			reason: "extends Player screen turns"
		};
	}
	if (BATTLE_SCRIPT_TERRAIN_SEEDS[key] &&
			(state && state.terrain === BATTLE_SCRIPT_TERRAIN_SEEDS[key].terrain || terrain === BATTLE_SCRIPT_TERRAIN_SEEDS[key].terrain)) {
		return {
			score: 225,
			reason: "activates on " + BATTLE_SCRIPT_TERRAIN_SEEDS[key].terrain + " Terrain"
		};
	}
	if (key === "roomservice" && isBattleScriptTrickRoomActive(state)) {
		return {
			score: 215,
			reason: "activates under Trick Room"
		};
	}
	if (key === "throatspray" && hasBattleScriptMoveMatching(player, function (move) { return isBattleScriptSoundMove(move); })) {
		return {
			score: 205,
			reason: "boosts after a sound move"
		};
	}
	if ((key === "widelens" || key === "zoomlens" || key === "micleberry") && hasBattleScriptInaccurateMove(player)) {
		return {
			score: 202 + Math.max(0, evaluation.score || 0),
			reason: "improves modeled accuracy"
		};
	}
	if ((key === "brightpowder" || key === "laxincense") && getPrediction() && prediction.move) {
		return {
			score: 198 + Math.max(0, evaluation.defenseGain || 0),
			reason: "lowers predicted move accuracy"
		};
	}
	if (key === "bigroot" && hasBattleScriptMoveMatching(player, function (move) {
		var effects = getBattleScriptMoveEffects(move);
		for (var i = 0; i < effects.length; i++) {
			if (effects[i].kind === "drain") return true;
		}
		return false;
	})) {
		return {
			score: 196 + gain,
			reason: "boosts drain recovery"
		};
	}
	if (key === "protectivepads" && hasBattleScriptMoveMatching(player, function (move) { return isBattleScriptContactMove(move); })) {
		return {
			score: 194,
			reason: "blocks contact punishment"
		};
	}
	if (key === "safetygoggles" && (state && state.weather || getPrediction() && prediction.move && isBattleScriptPowderMove(prediction.move))) {
		return {
			score: 192,
			reason: prediction && prediction.move && isBattleScriptPowderMove(prediction.move) ? "blocks predicted powder move" : "blocks weather chip"
		};
	}
	if (key === "leftovers" || key === "shellbell" || key === "sitrusberry" || key === "berryjuice") {
		return {
			score: 190 + gain,
			reason: "adds modeled recovery"
		};
	}
	if (key === "blacksludge" && hasBattleScriptType(player, "Poison")) {
		return {
			score: 188 + gain,
			reason: "adds modeled recovery for Poison types"
		};
	}
	if (key === "rockyhelmet" && getPrediction() && prediction.move && isBattleScriptContactMove(prediction.move)) {
		return {
			score: 180,
			reason: "punishes predicted contact"
		};
	}
	if ((key === "flameorb" || key === "toxicorb") &&
			hasBattleScriptEffectiveAbility(player, ["Guts", "Quick Feet", "Marvel Scale", "Poison Heal"], {state: state, targetState: player})) {
		return {
			score: 175,
			reason: "activates " + player.pokemon.ability
		};
	}
	if (evaluation && (evaluation.koGain || 0) > 0) {
		return {
			score: 170 + evaluation.koGain + Math.max(0, evaluation.attackGain || 0),
			reason: "turns modeled damage into a guaranteed KO"
		};
	}
	if (evaluation && (evaluation.survivalGain || 0) > 0) {
		return {
			score: 168 + evaluation.survivalGain + Math.max(0, evaluation.defenseGain || 0),
			reason: "preserves modeled survival"
		};
	}
	if (evaluation && (evaluation.attackGain || 0) > 0) {
		return {
			score: 166 + evaluation.attackGain,
			reason: "improves modeled damage"
		};
	}
	if (evaluation && (evaluation.defenseGain || 0) > 0) {
		return {
			score: 164 + evaluation.defenseGain,
			reason: "reduces modeled incoming damage"
		};
	}
	if (evaluation && (evaluation.speedGain || 0) > 0) {
		return {
			score: 162 + evaluation.speedGain,
			reason: "wins the modeled speed check"
		};
	}
	fallbackScore = getBattleScriptCraftSafeFallbackItemScore(state, player, candidate, evaluation);
	return fallbackScore;
}

function shouldEvaluateBattleScriptCraftBagItem(state, player, opponent, candidate, options) {
	var itemName = candidate && candidate.name ? candidate.name : "";
	var key = normalizeBattleScriptText(itemName);
	var type = getBattleScriptTypeBoostItemType(itemName);
	var prediction;
	var predictedType;
	var predictedEffectiveness;
	if (!itemName) return false;
	if (isBattleScriptStatusHealingItem(itemName)) {
		prediction = getBattleScriptCraftPredictedTrainerMove(state, player);
		return !!getBattleScriptPredictionStatusThreat(prediction, player, state, opponent, "opponent");
	}
	if (type && hasBattleScriptDamagingMoveType(player, type)) return true;
	if (/^(?:choiceband|choicespecs|choicescarf|lifeorb|expertbelt|focussash|eviolite|assaultvest|weaknesspolicy|leftovers|blacksludge|shellbell|sitrusberry|berryjuice|oranberry)$/.test(key)) return true;
	if (BATTLE_SCRIPT_RESIST_BERRIES[key] || key === "airballoon" || key === "rockyhelmet" || key === "safetygoggles" ||
			key === "brightpowder" || key === "laxincense") {
		prediction = getBattleScriptCraftPredictedTrainerMove(state, player);
		if (!prediction || !prediction.move) return false;
		predictedType = getBattleScriptMoveType(prediction.move);
		predictedEffectiveness = getBattleScriptMoveEffectivenessValue(prediction.move, player, state, opponent);
		if (BATTLE_SCRIPT_RESIST_BERRIES[key]) return BATTLE_SCRIPT_RESIST_BERRIES[key] === predictedType && predictedEffectiveness > 4;
		if (key === "airballoon") return predictedType === "Ground";
		if (key === "rockyhelmet") return isBattleScriptContactMove(prediction.move);
		if (key === "safetygoggles") return isBattleScriptPowderMove(prediction.move) || !!(state && state.weather);
		return true;
	}
	if (/^(?:widelens|zoomlens|micleberry)$/.test(key)) return hasBattleScriptInaccurateMove(player);
	if (key === "powerherb") return hasBattleScriptChargeMove(player);
	if (key === "lightclay") return hasBattleScriptScreenMove(player);
	if (key === "terrainextender") return !!getBattleScriptEntryTerrain(player, state);
	if (getBattleScriptWeatherDurationItemWeather(itemName)) return !!getBattleScriptEntryWeather(player, state);
	if (BATTLE_SCRIPT_TERRAIN_SEEDS[key]) return state && state.terrain === BATTLE_SCRIPT_TERRAIN_SEEDS[key].terrain;
	return false;
}

function getBattleScriptCraftBagItemActions(state) {
	var player = state && state.active ? state.active.player : null;
	var opponent = state && state.active ? state.active.opponent : null;
	if (!player || !opponent || !player.pokemon || player.hp.max <= 0 || player.bagItemAssigned) return [];
	return getBattleScriptCraftBagItemActionsForEntry(state, player, opponent, BATTLE_SCRIPT_BAG_ITEM_ACTION_LIMIT);
}

function getBattleScriptCraftBagItemActionsForEntry(state, player, opponent, limit, options) {
	var candidates;
	var actions = [];
	var fallbackAction = null;
	if (!state || !player || !opponent || !player.pokemon || player.hp.max <= 0 || player.bagItemAssigned) return actions;
	candidates = getBattleScriptBagItemCandidates(state, player, options && options.includeLoadoutFallback ? {loadout: true} : null);
	for (var i = 0; i < candidates.length; i++) {
		var loadoutScore = getBattleScriptCraftLoadoutItemScore(state, player, candidates[i], null);
		var evaluation = null;
		if (loadoutScore && options && options.includeLoadoutFallback) {
			actions.push(createBattleScriptCraftBagItemAction(candidates[i].name, loadoutScore.score, evaluation, loadoutScore.reason));
			continue;
		}
		if (!shouldEvaluateBattleScriptCraftBagItem(state, player, opponent, candidates[i], options)) {
			incrementBattleScriptCraftProfile(getBattleScriptCraftActiveSearch(), "itemPrefiltered");
			continue;
		}
		evaluation = getBattleScriptBagItemActionScore(state, player, opponent, candidates[i].name);
		loadoutScore = getBattleScriptCraftLoadoutItemScore(state, player, candidates[i], evaluation);
		if (options && options.includeLoadoutFallback && loadoutScore && (!fallbackAction || loadoutScore.score > fallbackAction.score)) {
			fallbackAction = createBattleScriptCraftBagItemAction(candidates[i].name, loadoutScore.score, evaluation, loadoutScore.reason);
		}
		if (loadoutScore) {
			actions.push(createBattleScriptCraftBagItemAction(candidates[i].name, loadoutScore.score, evaluation, loadoutScore.reason));
			continue;
		}
		if (!evaluation || evaluation.score <= BATTLE_SCRIPT_CRAFT_ITEM_ASSIGN_THRESHOLD) continue;
		actions.push(createBattleScriptCraftBagItemAction(candidates[i].name, evaluation.score, evaluation, ""));
	}
	if (!actions.length && fallbackAction) actions.push(fallbackAction);
	actions.sort(function (a, b) {
		return b.score - a.score;
	});
	return actions.slice(0, limit || BATTLE_SCRIPT_BAG_ITEM_ACTION_LIMIT);
}

function getBattleScriptCraftBestBagItemActionForEntry(state, player, opponent) {
	var actions = getBattleScriptCraftBagItemActionsForEntry(state, player, opponent, 1, {includeLoadoutFallback: true});
	return actions.length ? actions[0] : null;
}

function assignBattleScriptCraftBestBagItem(state, player, opponent) {
	var action = getBattleScriptCraftBestBagItemActionForEntry(state, player, opponent);
	if (!action) return null;
	if (!assignBattleScriptBagItem(state, player, action.itemName)) return null;
	return action;
}

function getBattleScriptCraftActions(state) {
	var actions;
	if (state.active.player && state.active.player.mustRecharge) {
		return [{type: "recharge", score: 0}];
	}
	if (state.active.player && state.active.player.chargingMove) {
		return getBattleScriptCraftMoveActions(state);
	}
	actions = getBattleScriptCraftMoveActions(state)
		.concat(getBattleScriptCraftSwitchActions(state));
	actions.sort(function (a, b) {
		return (b.score || 0) - (a.score || 0);
	});
	return actions;
}

function getBattleScriptCraftOpponentReplacementScore(state, candidate, partyIndex) {
	var activeSearch = getBattleScriptCraftActiveSearch();
	var cacheKey = activeSearch ? getBattleScriptCraftReplacementCacheKey(state, partyIndex) : "";
	var cached = getBattleScriptCraftCachedValue(activeSearch, "replacementScoreCache", cacheKey);
	var tempState;
	var prediction;
	var damagePercent = 0;
	var speedScore = 0;
	var speedText = "";
	var predictionText = "";
	var score;
	if (cached !== undefined) return cached;
	if (!state.active.player || !isBattleScriptCraftAlive(candidate)) return null;
	tempState = cloneBattleScriptCraftState(state);
	candidate = tempState.rosters.opponent[partyIndex];
	tempState.active.opponent = candidate;
	clearBattleScriptSwitchVolatileState(candidate);
	applyBattleScriptCraftEntryEffects(tempState, "opponent", candidate);
	prediction = getBattleScriptCraftPredictedTrainerMove(tempState, tempState.active.player);
	if (prediction && prediction.damage) {
		damagePercent = getBattleScriptDamagePercentAgainst(prediction.damage, tempState.active.player);
	}
	speedText = getBattleScriptSpeedRelationText(candidate, tempState.active.player, tempState);
	speedScore = getBattleScriptSpeed(candidate, tempState) >= getBattleScriptSpeed(tempState.active.player, tempState) ? 0.15 : 0;
	if (prediction && prediction.switchDecision) {
		predictionText = "Trainer AI predicts a switch to " + prediction.switchDecision.label;
	} else if (prediction && prediction.move) {
		predictionText = "Trainer AI predicts " + prediction.move.name + " for " +
			(prediction.damage ? getBattleScriptDamageText(prediction.damage, tempState.active.player.pokemon) : prediction.scoreText);
	} else if (prediction && prediction.recharge) {
		predictionText = "Trainer AI predicts Recharge";
	}
	score = {
		partyIndex: partyIndex,
		score: damagePercent + speedScore,
		guaranteed: prediction ? !!prediction.guaranteed : false,
		damagePercent: damagePercent,
		speedText: speedText,
		predictionText: predictionText
	};
	return cacheBattleScriptCraftValue(activeSearch, "replacementScoreCache", "replacementScoreCacheOrder", BATTLE_SCRIPT_CRAFT_REPLACEMENT_CACHE_LIMIT, cacheKey, score);
}

function getBattleScriptCraftOpponentReplacementReason(state, candidate, partyIndex) {
	var score = getBattleScriptCraftOpponentReplacementScore(state, candidate, partyIndex);
	if (!score) return "";
	return "best replacement score; " + (score.predictionText || "no damaging prediction") + "; " + score.speedText;
}

function getBattleScriptCraftOpponentReplacementIndexes(state, roster) {
	var choices = [];
	choices = $.map(roster, function (candidate, index) {
		return getBattleScriptCraftOpponentReplacementScore(state, candidate, index);
	});
	choices.sort(function (a, b) {
		if (b.score !== a.score) return b.score - a.score;
		if (b.guaranteed !== a.guaranteed) return b.guaranteed ? 1 : -1;
		return a.partyIndex - b.partyIndex;
	});
	return choices.length ? [choices[0].partyIndex] : [];
}

function addBattleScriptCraftReplacementStates(state, side) {
	var states = [];
	var roster = state.rosters[side];
	var sideLabel = BATTLE_SCRIPT_SIDE_LABELS[side];
	var indexes = [];
	for (var i = 0; i < roster.length; i++) indexes.push(i);
	if (side === "opponent") indexes = getBattleScriptCraftOpponentReplacementIndexes(state, roster);
	for (var j = 0; j < indexes.length; j++) {
		var candidate = roster[indexes[j]];
		var nextState;
		if (!isBattleScriptCraftAlive(candidate)) continue;
		nextState = cloneBattleScriptCraftState(state);
		candidate = nextState.rosters[side][indexes[j]];
		appendBattleScriptCraftTurn(nextState);
		nextState.active[side] = candidate;
		candidate.hasActed = false;
		clearBattleScriptSwitchVolatileState(candidate);
		if (side === "player") assignBattleScriptCraftBestBagItem(nextState, candidate, nextState.active.opponent);
		applyBattleScriptCraftEntryEffects(nextState, side, candidate);
		if (side === "opponent") {
			nextState.lineReasons[nextState.script.length + 1] = getBattleScriptCraftOpponentReplacementReason(state, candidate, indexes[j]);
		}
		nextState.script.push(sideLabel + " " + getBattleScriptPokemonCommandName(candidate) + " in");
		states.push(nextState);
	}
	return states;
}

function expandBattleScriptCraftMoveState(state, action) {
	var states = [];
	var predictions = getBattleScriptCraftPredictedTrainerMoves(state, state.active.player) || [null];
	for (var i = 0; i < predictions.length; i++) {
		var nextState = cloneBattleScriptCraftState(state);
		var trainerPrediction = predictions[i];
		var trainerMove = trainerPrediction && trainerPrediction.move;
		if (!isBattleScriptCraftTrainerSwitchPrediction(trainerPrediction) &&
				isBattleScriptCraftPlayerFirst(nextState, nextState.active.player, nextState.active.opponent, action.move, trainerMove)) {
			if (!applyBattleScriptCraftPlayerMove(nextState, action.move)) continue;
			if (nextState.active.opponent) applyBattleScriptCraftTrainerAction(nextState, trainerPrediction);
		} else {
			applyBattleScriptCraftTrainerAction(nextState, trainerPrediction);
			if (nextState.active.player && !applyBattleScriptCraftPlayerMove(nextState, action.move)) continue;
		}
		if (nextState.active.player && nextState.active.opponent) appendBattleScriptCraftTurn(nextState);
		states.push(nextState);
	}
	return states;
}

function expandBattleScriptCraftRechargeState(state) {
	var states = [];
	var predictions = getBattleScriptCraftPredictedTrainerMoves(state, state.active.player) || [null];
	for (var i = 0; i < predictions.length; i++) {
		var nextState = cloneBattleScriptCraftState(state);
		var trainerPrediction = predictions[i];
		var trainerMove = trainerPrediction && trainerPrediction.move;
		if (!isBattleScriptCraftTrainerSwitchPrediction(trainerPrediction) &&
				isBattleScriptCraftPlayerFirst(nextState, nextState.active.player, nextState.active.opponent, null, trainerMove)) {
			applyBattleScriptCraftRechargeAction(nextState, "player");
			if (nextState.active.opponent) applyBattleScriptCraftTrainerAction(nextState, trainerPrediction);
		} else {
			applyBattleScriptCraftTrainerAction(nextState, trainerPrediction);
			if (nextState.active.player) applyBattleScriptCraftRechargeAction(nextState, "player");
		}
		if (nextState.active.player && nextState.active.opponent) appendBattleScriptCraftTurn(nextState);
		states.push(nextState);
	}
	return states;
}

function expandBattleScriptCraftItemState(state, action) {
	var nextState = cloneBattleScriptCraftState(state);
	if (!nextState.active.player || !assignBattleScriptBagItem(nextState, nextState.active.player, action.itemName)) return [];
	nextState.script.push("Player " + getBattleScriptPokemonCommandName(nextState.active.player));
	return [nextState];
}

function expandBattleScriptCraftSwitchState(state, action) {
	var targetIndex = getBattleScriptCraftEntryIndex(state.rosters.player, action.target);
	var baseState = cloneBattleScriptCraftState(state);
	var predictions = getBattleScriptCraftPredictedTrainerMoves(state, state.active.player) || [null];
	var states = [];
	if (targetIndex < 0) return null;
	if (baseState.active.player) clearBattleScriptSwitchVolatileState(baseState.active.player);
	baseState.active.player = baseState.rosters.player[targetIndex];
	baseState.active.player.hasActed = false;
	clearBattleScriptSwitchVolatileState(baseState.active.player);
	assignBattleScriptCraftBestBagItem(baseState, baseState.active.player, baseState.active.opponent);
	applyBattleScriptCraftEntryEffects(baseState, "player", baseState.active.player);
	baseState.script.push("Player switch to " + getBattleScriptPokemonCommandName(baseState.active.player));
	for (var i = 0; i < predictions.length; i++) {
		var nextState = cloneBattleScriptCraftState(baseState);
		applyBattleScriptCraftTrainerAction(nextState, predictions[i]);
		if (nextState.active.player && nextState.active.opponent) appendBattleScriptCraftTurn(nextState);
		states.push(nextState);
	}
	return states;
}

function expandBattleScriptCraftState(state) {
	var actions;
	var states = [];
	if (state.turn > BATTLE_SCRIPT_CRAFT_MAX_TURNS) return states;
	if (!getBattleScriptCraftAliveEntries(state.rosters.opponent).length) return states;
	if (!getBattleScriptCraftAliveEntries(state.rosters.player).length) return states;
	if (!isBattleScriptCraftAlive(state.active.opponent)) return addBattleScriptCraftReplacementStates(state, "opponent");
	if (!isBattleScriptCraftAlive(state.active.player)) return addBattleScriptCraftReplacementStates(state, "player");
	actions = getBattleScriptCraftActions(state);
	for (var i = 0; i < actions.length; i++) {
		var expanded = actions[i].type === "move" ?
			expandBattleScriptCraftMoveState(state, actions[i]) :
			actions[i].type === "recharge" ?
				expandBattleScriptCraftRechargeState(state) :
				actions[i].type === "item" ?
					expandBattleScriptCraftItemState(state, actions[i]) :
					expandBattleScriptCraftSwitchState(state, actions[i]);
		if (!expanded) continue;
		if ($.isArray(expanded)) {
			for (var j = 0; j < expanded.length; j++) {
				if (expanded[j]) states.push(expanded[j]);
			}
		} else {
			states.push(expanded);
		}
	}
	return states;
}

function normalizeBattleScriptCraftMode(mode) {
	return BATTLE_SCRIPT_CRAFT_MODES[mode] ? mode : BATTLE_SCRIPT_DEFAULT_CRAFT_MODE;
}

function getBattleScriptCraftModeLabel(mode) {
	mode = normalizeBattleScriptCraftMode(mode);
	return BATTLE_SCRIPT_CRAFT_MODES[mode].label;
}

function getBattleScriptCraftPlayerFaintCount(state) {
	var roster = state && state.rosters ? state.rosters.player || [] : [];
	var fainted = 0;
	for (var i = 0; i < roster.length; i++) {
		if (roster[i] && roster[i].maxHP && !isBattleScriptCraftAlive(roster[i])) fainted++;
	}
	return fainted;
}

function getBattleScriptCraftPlayerAliveCount(state) {
	var roster = state && state.rosters ? state.rosters.player || [] : [];
	var alive = 0;
	for (var i = 0; i < roster.length; i++) {
		if (roster[i] && roster[i].maxHP && isBattleScriptCraftAlive(roster[i])) alive++;
	}
	return alive;
}

function getBattleScriptCraftStateScore(state, modeOverride) {
	var defeated = state.rosters.opponent.length - getBattleScriptCraftAliveEntries(state.rosters.opponent).length;
	var playerHP = 0;
	var opponentProgress = 0;
	var setupScore = 0;
	var contestedChoices = Math.max(0, (state.aiChoices || 0) - (state.guaranteedAIChoices || 0));
	var playerFaints = getBattleScriptCraftPlayerFaintCount(state);
	var mode = normalizeBattleScriptCraftMode(modeOverride || state.craftMode);
	for (var i = 0; i < state.rosters.player.length; i++) {
		if (state.rosters.player[i].maxHP) playerHP += Math.max(0, state.rosters.player[i].hp.max) / state.rosters.player[i].maxHP;
	}
	for (var j = 0; j < state.rosters.opponent.length; j++) {
		if (state.rosters.opponent[j].maxHP) opponentProgress += 1 - Math.max(0, state.rosters.opponent[j].hp.max) / state.rosters.opponent[j].maxHP;
		if (state.rosters.opponent[j].pokemon && state.rosters.opponent[j].pokemon.boosts) {
			setupScore += Math.max(0, -state.rosters.opponent[j].pokemon.boosts.atk || 0) * 0.9;
			setupScore += Math.max(0, -state.rosters.opponent[j].pokemon.boosts.spa || 0) * 0.9;
			setupScore += Math.max(0, -state.rosters.opponent[j].pokemon.boosts.def || 0) * 0.7;
			setupScore += Math.max(0, -state.rosters.opponent[j].pokemon.boosts.spd || 0) * 0.7;
			setupScore += Math.max(0, -state.rosters.opponent[j].pokemon.boosts.spe || 0) * 0.45;
		}
	}
	if (mode === "no-losses") {
		return defeated * 130 + opponentProgress * 28 + setupScore * 5 + playerHP * 10 -
			playerFaints * 95 - state.rollRisks * 18 - contestedChoices * 12 - state.turn * 4;
	}
	if (mode === "any-cost") {
		return defeated * 150 + opponentProgress * 44 + setupScore * 3 + playerHP * 1.5 -
			state.turn * 2 - contestedChoices * 1.5;
	}
	return defeated * 120 + opponentProgress * 32 + setupScore * 5 + playerHP * 6 - state.turn * 4 - state.rollRisks * 12 - contestedChoices * 8;
}

function getBattleScriptCraftRemainingOpponentHPUnits(state) {
	var remaining = 0;
	var roster = state && state.rosters ? state.rosters.opponent || [] : [];
	for (var i = 0; i < roster.length; i++) {
		if (roster[i] && roster[i].maxHP) remaining += Math.max(0, roster[i].hp.max) / roster[i].maxHP;
	}
	return remaining;
}

function getBattleScriptCraftMinimumTurnsToWin(state) {
	var alive = getBattleScriptCraftAliveEntries(state && state.rosters ? state.rosters.opponent || [] : []).length;
	if (state && state.active && state.active.opponent && isBattleScriptCraftAlive(state.active.opponent)) {
		return Math.max(0, alive - 1);
	}
	return alive;
}

function getBattleScriptCraftQueueScore(state, modeOverride) {
	var mode = normalizeBattleScriptCraftMode(modeOverride || state.craftMode);
	var base = getBattleScriptCraftStateScore(state, mode);
	var remainingHP = getBattleScriptCraftRemainingOpponentHPUnits(state);
	var aliveOpponents = getBattleScriptCraftAliveEntries(state.rosters.opponent).length;
	var defeated = state.rosters.opponent.length - aliveOpponents;
	var playerFaints = getBattleScriptCraftPlayerFaintCount(state);
	var contestedChoices = Math.max(0, (state.aiChoices || 0) - (state.guaranteedAIChoices || 0));
	var activePressure = 0;
	if (state.active && state.active.opponent && state.active.opponent.maxHP) {
		activePressure = 1 - Math.max(0, state.active.opponent.hp.max) / state.active.opponent.maxHP;
	}
	if (mode === "any-cost") {
		return base + defeated * 95 + activePressure * 24 - remainingHP * 34 -
			getBattleScriptCraftMinimumTurnsToWin(state) * 18 - state.turn * 6 - contestedChoices * 1.5;
	}
	if (mode === "no-losses") {
		return base + defeated * 70 + activePressure * 18 - remainingHP * 22 -
			playerFaints * 140 - state.rollRisks * 20 - contestedChoices * 13;
	}
	return base + defeated * 75 + activePressure * 20 - remainingHP * 26 -
		playerFaints * 45 - state.rollRisks * 12 - contestedChoices * 8 - state.turn * 3;
}

function rememberBattleScriptCraftStateCache(search, cacheName, orderName, key, value) {
	return cacheBattleScriptCraftValue(search, cacheName, orderName, BATTLE_SCRIPT_CRAFT_STATE_CACHE_LIMIT, key, value);
}

function getBattleScriptCraftStateCache(search, cacheName, key) {
	return getBattleScriptCraftCachedValue(search, cacheName, key);
}

function isBattleScriptCraftKnownDeadState(search, state) {
	var key = getBattleScriptCraftStateSignature(state);
	return !!getBattleScriptCraftStateCache(search, "deadStateCache", key);
}

function markBattleScriptCraftDeadState(search, state) {
	rememberBattleScriptCraftStateCache(search, "deadStateCache", "deadStateCacheOrder", getBattleScriptCraftStateSignature(state), true);
}

function updateBattleScriptCraftBestBounds(search, line) {
	if (!search || !line) return;
	if (!search.bestLine || compareBattleScriptCraftLines(line, search.bestLine) < 0) search.bestLine = line;
	if (typeof search.bestPlayerFaints !== "number" || line.playerFaints < search.bestPlayerFaints) {
		search.bestPlayerFaints = line.playerFaints;
	}
	if (typeof search.bestAnyCostTurn !== "number" || line.turns < search.bestAnyCostTurn) {
		search.bestAnyCostTurn = line.turns;
	}
	if (typeof search.bestAnyCostAlivePlayers !== "number" || getBattleScriptCraftPlayerAliveCountFromLine(line) > search.bestAnyCostAlivePlayers) {
		search.bestAnyCostAlivePlayers = getBattleScriptCraftPlayerAliveCountFromLine(line);
	}
}

function getBattleScriptCraftPlayerAliveCountFromLine(line) {
	if (!line) return 0;
	return Math.max(0, (line.playerTeamSize || 0) - (line.playerFaints || 0));
}

function shouldPruneBattleScriptCraftByBounds(search, state) {
	var mode;
	var playerFaints;
	var earliestFinishTurn;
	if (!search || !search.bestLine || !state) return false;
	mode = normalizeBattleScriptCraftMode(state.craftMode || search.craftMode);
	playerFaints = getBattleScriptCraftPlayerFaintCount(state);
	if (mode === "no-losses" && typeof search.bestPlayerFaints === "number" &&
			playerFaints > search.bestPlayerFaints) {
		return true;
	}
	if (mode === "any-cost" && typeof search.bestAnyCostTurn === "number" &&
			state.turn > search.bestAnyCostTurn) {
		return true;
	}
	earliestFinishTurn = state.turn + getBattleScriptCraftMinimumTurnsToWin(state);
	if (mode === "any-cost" && typeof search.bestAnyCostTurn === "number" &&
			earliestFinishTurn > search.bestAnyCostTurn) {
		return true;
	}
	return false;
}

function getBattleScriptCraftDominanceMetrics(state, score) {
	var aiChoices = state.aiChoices || 0;
	var guaranteedAIChoices = state.guaranteedAIChoices || 0;
	return {
		turn: state.turn || 0,
		score: score,
		playerFaints: getBattleScriptCraftPlayerFaintCount(state),
		rollRisks: state.rollRisks || 0,
		aiChoices: aiChoices,
		guaranteedAIChoices: guaranteedAIChoices,
		scriptLength: state.script ? state.script.length : 0
	};
}

function doesBattleScriptCraftMetricDominate(left, right, mode) {
	var leftConsistency;
	var rightConsistency;
	if (!left || !right) return false;
	mode = normalizeBattleScriptCraftMode(mode);
	if (left.turn > right.turn) return false;
	if (left.score < right.score) return false;
	if (mode === "any-cost") {
		return left.scriptLength <= right.scriptLength + 2;
	}
	if (left.playerFaints > right.playerFaints) return false;
	if (left.rollRisks > right.rollRisks) return false;
	leftConsistency = left.guaranteedAIChoices / Math.max(1, left.aiChoices);
	rightConsistency = right.guaranteedAIChoices / Math.max(1, right.aiChoices);
	if (leftConsistency < rightConsistency) return false;
	if (left.scriptLength > right.scriptLength + 2) return false;
	return true;
}

function shouldKeepBattleScriptCraftState(search, state) {
	var key;
	var futureKey;
	var score;
	var mode;
	var existing;
	var futureExisting;
	var dominanceExisting;
	var dominanceMetrics;
	if (!search || !state) return true;
	if (shouldPruneBattleScriptCraftByBounds(search, state)) {
		incrementBattleScriptCraftProfile(search, "pruned");
		incrementBattleScriptCraftProfile(search, "boundPruned");
		return false;
	}
	if (isBattleScriptCraftKnownDeadState(search, state)) {
		incrementBattleScriptCraftProfile(search, "pruned");
		incrementBattleScriptCraftProfile(search, "deadPruned");
		return false;
	}
	key = getBattleScriptCraftStateSignature(state);
	mode = normalizeBattleScriptCraftMode(state.craftMode || search.craftMode);
	score = getBattleScriptCraftStateScore(state, mode);
	existing = getBattleScriptCraftStateCache(search, "stateScores", key);
	if (typeof existing === "number" && existing >= score) {
		incrementBattleScriptCraftProfile(search, "pruned");
		incrementBattleScriptCraftProfile(search, "dominatedPruned");
		return false;
	}
	rememberBattleScriptCraftStateCache(search, "stateScores", "stateScoreOrder", key, score);
	futureKey = getBattleScriptCraftFutureSignature(state);
	futureExisting = getBattleScriptCraftStateCache(search, "stateFutureScores", futureKey);
	if (futureExisting && futureExisting.turn <= state.turn && futureExisting.score >= score) {
		incrementBattleScriptCraftProfile(search, "pruned");
		incrementBattleScriptCraftProfile(search, "dominatedPruned");
		return false;
	}
	dominanceMetrics = getBattleScriptCraftDominanceMetrics(state, score);
	dominanceExisting = getBattleScriptCraftStateCache(search, "dominanceScores", futureKey);
	if (doesBattleScriptCraftMetricDominate(dominanceExisting, dominanceMetrics, mode)) {
		incrementBattleScriptCraftProfile(search, "pruned");
		incrementBattleScriptCraftProfile(search, "dominatedPruned");
		return false;
	}
	if (!dominanceExisting || doesBattleScriptCraftMetricDominate(dominanceMetrics, dominanceExisting, mode) ||
			dominanceMetrics.score > dominanceExisting.score) {
		rememberBattleScriptCraftStateCache(search, "dominanceScores", "dominanceScoreOrder", futureKey, dominanceMetrics);
	}
	if (!futureExisting || state.turn < futureExisting.turn || score > futureExisting.score) {
		rememberBattleScriptCraftStateCache(search, "stateFutureScores", "stateFutureScoreOrder", futureKey, {
			turn: state.turn,
			score: score
		});
	}
	incrementBattleScriptCraftProfile(search, "kept");
	return true;
}

function createBattleScriptCraftLine(state) {
	var consistency = state.aiChoices ? state.guaranteedAIChoices / state.aiChoices : 1;
	var playerFaints = getBattleScriptCraftPlayerFaintCount(state);
	var mode = normalizeBattleScriptCraftMode(state.craftMode);
	var score = consistency * 100 - state.rollRisks * 12 - state.turn - playerFaints * 18;
	if (mode === "no-losses") score = consistency * 110 - playerFaints * 125 - state.rollRisks * 16 - state.turn;
	if (mode === "any-cost") score = 140 - state.turn * 2 + (state.rosters.player.length - playerFaints) * 0.1;
	var steps = state.script.slice(0);
	var summary = getBattleScriptCraftLineSummary(steps);
	return {
		script: steps.join("\n"),
		steps: steps,
		summary: summary,
		turns: state.turn,
		aiChoices: state.aiChoices,
		guaranteedAIChoices: state.guaranteedAIChoices,
		rollRisks: state.rollRisks,
		playerFaints: playerFaints,
		playerTeamSize: state.rosters.player.length,
		craftMode: mode,
		consistency: consistency,
		lineReasons: copyBattleScriptCraftKeyMap(state.lineReasons || {}),
		score: score
	};
}

function addBattleScriptCraftSearchResult(search, state) {
	var line = createBattleScriptCraftLine(state);
	search.results.push(line);
	updateBattleScriptCraftBestBounds(search, line);
	return line;
}

function normalizeBattleScriptCraftScript(script) {
	return (script || "").split(/\r?\n/)
		.map(function (line) { return line.replace(/\s+/g, " ").trim(); })
		.filter(function (line) { return !!line; })
		.join("\n");
}

function getBattleScriptCraftScriptLines(scriptOrLines) {
	if ($.isArray(scriptOrLines)) return scriptOrLines.slice(0);
	return (scriptOrLines || "").split(/\r?\n/);
}

function getBattleScriptCraftLead(steps) {
	for (var i = 0; i < steps.length; i++) {
		var match = (steps[i] || "").match(/^Player\s+(.+)\s+in$/i);
		if (match) return match[1];
	}
	return "Unknown lead";
}

function isBattleScriptCraftSummaryLine(line) {
	if (!line) return false;
	if (/^(Fight start|Turn\s+\d+)$/i.test(line)) return false;
	if (/^Trainer\s+.+\s+in$/i.test(line)) return false;
	if (/^Trainer\s+.+\s+faints$/i.test(line)) return false;
	return true;
}

function getBattleScriptCraftLineSummary(steps) {
	var rawSteps = getBattleScriptCraftScriptLines(steps);
	var lines = rawSteps
		.map(function (line) { return line.replace(/\s+/g, " ").trim(); })
		.filter(isBattleScriptCraftSummaryLine);
	var lead = getBattleScriptCraftLead(rawSteps);
	var opening = [];
	var finish = "";
	for (var i = 0; i < lines.length && opening.length < 3; i++) {
		opening.push(lines[i]);
	}
	for (var j = lines.length - 1; j >= 0; j--) {
		if (!/^Player\s+.+\s+in$/i.test(lines[j])) {
			finish = lines[j];
			break;
		}
	}
	return {
		lead: lead,
		opening: opening.join(" > "),
		finish: finish || (lines.length ? lines[lines.length - 1] : "")
	};
}

function getBattleScriptCraftMeaningfulLines(line) {
	return getBattleScriptCraftScriptLines(line.steps || line.script)
		.map(function (step) { return step.replace(/\s+/g, " ").trim(); })
		.filter(function (step) {
			return !!step && !/^(Fight start|Turn\s+\d+)$/i.test(step);
		});
}

function summarizeBattleScriptCraftTraits(line) {
	var steps = getBattleScriptCraftScriptLines(line.steps || line.script);
	var traits;
	var switches = 0;
	var playerFaints = 0;
	var trainerFaints = 0;
	var recharges = 0;
	var itemLabels = [];
	var seenItems = {};
	var match;
	for (var i = 0; i < steps.length; i++) {
		if (/^Player\s+switch/i.test(steps[i])) switches++;
		if (/^Player\s+.+\s+faints$/i.test(steps[i])) playerFaints++;
		if (/^Trainer\s+.+\s+faints$/i.test(steps[i])) trainerFaints++;
		if (/\suses\s+Recharge$/i.test(steps[i])) recharges++;
		match = (steps[i] || "").match(/^Player\s+(?:switch to\s+)?(.+?\[[^\]]+\])(?:\s+in)?$/i);
		if (match && !seenItems[match[1]]) {
			seenItems[match[1]] = true;
			itemLabels.push(match[1]);
		}
	}
	traits = [
		switches + " switch" + (switches === 1 ? "" : "es"),
		playerFaints + " sacrifice" + (playerFaints === 1 ? "" : "s"),
		trainerFaints + " KO" + (trainerFaints === 1 ? "" : "s"),
		recharges + " recharge turn" + (recharges === 1 ? "" : "s")
	];
	if (itemLabels.length) traits.push("items: " + itemLabels.join(", "));
	return traits.join(", ");
}

function getBattleScriptCraftLineDifference(line, baseline, index) {
	var current = getBattleScriptCraftMeaningfulLines(line);
	var compare = getBattleScriptCraftMeaningfulLines(baseline);
	var max = Math.max(current.length, compare.length);
	if (index === 0) return "Highest ranked baseline after consistency, risk, and turn count scoring.";
	for (var i = 0; i < max; i++) {
		if (current[i] === compare[i]) continue;
		if (!compare[i]) return "Adds step " + (i + 1) + ": " + current[i] + ".";
		if (!current[i]) return "Skips Line 1 step " + (i + 1) + ": " + compare[i] + ".";
		return "First differs at step " + (i + 1) + ": " + current[i] + " instead of " + compare[i] + ".";
	}
	return "Same visible route as Line 1, but kept for a different scoring path.";
}

function annotateBattleScriptCraftLineDifferences(lines) {
	if (!lines.length) return lines;
	for (var i = 0; i < lines.length; i++) {
		lines[i].summary = lines[i].summary || getBattleScriptCraftLineSummary(lines[i].steps || lines[i].script);
		lines[i].summary.difference = getBattleScriptCraftLineDifference(lines[i], lines[0], i);
		lines[i].summary.traits = summarizeBattleScriptCraftTraits(lines[i]);
	}
	return lines;
}

function getBattleScriptCraftDiversityKey(line) {
	var summary = line.summary || getBattleScriptCraftLineSummary(line.steps || line.script);
	var opening = (summary.opening || "").split(" > ").slice(0, 2).join(" > ");
	return normalizeBattleScriptText(summary.lead + " " + opening);
}

function selectBattleScriptCraftLines(results) {
	var sorted = (results || []).slice(0).sort(compareBattleScriptCraftLines);
	var unique = [];
	var seenScripts = {};
	var selected = [];
	var selectedScripts = {};
	var seenRoutes = {};
	function addLine(line) {
		var key = normalizeBattleScriptCraftScript(line.script);
		if (selectedScripts[key]) return false;
		selectedScripts[key] = true;
		selected.push(line);
		return true;
	}
	for (var i = 0; i < sorted.length; i++) {
		var scriptKey = normalizeBattleScriptCraftScript(sorted[i].script);
		if (seenScripts[scriptKey]) continue;
		seenScripts[scriptKey] = true;
		unique.push(sorted[i]);
	}
	for (var j = 0; j < unique.length && selected.length < BATTLE_SCRIPT_CRAFT_MAX_RESULTS; j++) {
		var routeKey = getBattleScriptCraftDiversityKey(unique[j]);
		if (seenRoutes[routeKey]) continue;
		seenRoutes[routeKey] = true;
		addLine(unique[j]);
	}
	for (var k = 0; k < unique.length && selected.length < BATTLE_SCRIPT_CRAFT_MAX_RESULTS; k++) {
		addLine(unique[k]);
	}
	return annotateBattleScriptCraftLineDifferences(selected);
}

function compareBattleScriptCraftLines(a, b) {
	var mode = normalizeBattleScriptCraftMode((a && a.craftMode) || (b && b.craftMode));
	if (mode === "no-losses" && a.playerFaints !== b.playerFaints) return a.playerFaints - b.playerFaints;
	if (b.score !== a.score) return b.score - a.score;
	if (mode === "any-cost" && a.turns !== b.turns) return a.turns - b.turns;
	if (b.consistency !== a.consistency) return b.consistency - a.consistency;
	return a.turns - b.turns;
}

function isBattleScriptCraftWin(state) {
	return getBattleScriptCraftAliveEntries(state.rosters.opponent).length === 0 &&
		getBattleScriptCraftAliveEntries(state.rosters.player).length > 0;
}

function getBattleScriptCraftGreedySeedNextState(expanded) {
	if (!expanded || !expanded.length) return null;
	expanded.sort(function (a, b) {
		return getBattleScriptCraftStateScore(b) - getBattleScriptCraftStateScore(a);
	});
	return expanded[0] || null;
}

function seedBattleScriptCraftGreedyLine(search, startState) {
	var state = cloneBattleScriptCraftState(startState);
	var seen = {};
	var guardLimit = BATTLE_SCRIPT_CRAFT_MAX_TURNS + state.rosters.opponent.length + state.rosters.player.length + 4;
	for (var guard = 0; guard < guardLimit; guard++) {
		var key = getBattleScriptCraftStateSignature(state);
		var expanded;
		var nextState;
		if (isBattleScriptCraftWin(state)) {
			addBattleScriptCraftSearchResult(search, state);
			return true;
		}
		if (seen[key] || shouldPruneBattleScriptCraftByBounds(search, state)) return false;
		seen[key] = true;
		expanded = expandBattleScriptCraftState(state);
		nextState = getBattleScriptCraftGreedySeedNextState(expanded);
		if (!nextState) return false;
		state = nextState;
	}
	return false;
}

function seedBattleScriptCraftSearch(search) {
	var frontier;
	var seeded = 0;
	if (!search || search.error || search.seeded) return;
	search.seeded = true;
	frontier = getBattleScriptCraftFrontierStates(search.frontier)
		.sort(function (a, b) {
			return getBattleScriptCraftStateScore(b) - getBattleScriptCraftStateScore(a);
		});
	for (var i = 0; i < frontier.length && seeded < BATTLE_SCRIPT_CRAFT_GREEDY_SEED_LIMIT; i++) {
		if (search.results.length >= search.searchLimit) break;
		if (seedBattleScriptCraftGreedyLine(search, frontier[i])) seeded++;
	}
}

function getBattleScriptCraftSearchQueueMode(mode) {
	mode = normalizeBattleScriptCraftMode(mode);
	return mode === "any-cost" ? "default" : mode;
}

function getBattleScriptCraftSearchMaxNodes(mode, requestedMaxNodes) {
	mode = normalizeBattleScriptCraftMode(mode);
	if (requestedMaxNodes) return requestedMaxNodes;
	if (mode === "no-losses") return BATTLE_SCRIPT_CRAFT_NO_LOSSES_MAX_NODES;
	if (mode === "any-cost") return BATTLE_SCRIPT_CRAFT_ANY_COST_MAX_NODES;
	return BATTLE_SCRIPT_CRAFT_DEFAULT_MAX_NODES;
}

function createBattleScriptCraftInitialState(baseRosters, playerLeadIndex, craftMode) {
	var rosters = {
		player: cloneBattleScriptRoster(baseRosters.player),
		opponent: cloneBattleScriptRoster(baseRosters.opponent)
	};
	var playerLead = rosters.player[playerLeadIndex];
	var trainerLead = rosters.opponent[0];
	var state = {
		rosters: rosters,
		active: {player: playerLead, opponent: trainerLead},
		turn: 1,
		script: ["Fight start"],
		aiChoices: 0,
		guaranteedAIChoices: 0,
		rollRisks: 0,
		nodes: 0,
		craftMode: normalizeBattleScriptCraftMode(craftMode),
		assignedBagItems: {},
		lineReasons: {}
	};
	resetBattleScriptFieldState(state);
	state.turn = 1;
	assignBattleScriptCraftBestBagItem(state, playerLead, trainerLead);
	state.script.push("Player " + getBattleScriptPokemonCommandName(playerLead) + " in");
	state.script.push("Trainer " + getBattleScriptPokemonCommandName(trainerLead) + " in");
	state.script.push("Turn 1");
	applyBattleScriptCraftEntryEffects(state, "player", playerLead);
	applyBattleScriptCraftEntryEffects(state, "opponent", trainerLead);
	return state;
}

function createBattleScriptCraftSearch(baseRosters, options) {
	baseRosters = cloneBattleScriptCraftEnvironmentRosters(baseRosters || getBattleScriptRosters());
	options = options || {};
	var frontier = createBattleScriptCraftFrontier();
	var craftMode = normalizeBattleScriptCraftMode(options.craftMode);
	var search;
	if (!baseRosters.player.length || !baseRosters.opponent.length) {
		return {frontier: [], results: [], nodes: 0, error: "Add Player Team Pokemon and select a Trainer before crafting a line."};
	}
	if (!hasBattleScriptCraftPlayerItemSource(baseRosters)) {
		return {
			baseRosters: baseRosters,
			craftMode: craftMode,
			frontier: [],
			results: [],
			nodes: 0,
			error: "No imported Player held item inventory was found. Import a full Sword/Shield save with usable held items before Craft a Line can assign items."
		};
	}
	search = {
		baseRosters: baseRosters,
		craftMode: craftMode,
		queueMode: getBattleScriptCraftSearchQueueMode(craftMode),
		frontier: frontier,
		results: [],
		nodes: 0,
		error: "",
		stateScores: {},
		stateScoreOrder: [],
		stateFutureScores: {},
		stateFutureScoreOrder: [],
		deadStateCache: {},
		deadStateCacheOrder: [],
		dominanceScores: {},
		dominanceScoreOrder: [],
		predictionCache: {},
		predictionCacheOrder: [],
		aiScoreCache: {},
		aiScoreCacheOrder: [],
		switchDecisionCache: {},
		switchDecisionCacheOrder: [],
		replacementScoreCache: {},
		replacementScoreCacheOrder: [],
		bestLine: null,
		bestPlayerFaints: null,
		bestAnyCostTurn: null,
		bestAnyCostAlivePlayers: null,
		maxNodes: getBattleScriptCraftSearchMaxNodes(craftMode, options.maxNodes),
		searchLimit: options.searchLimit || BATTLE_SCRIPT_CRAFT_SEARCH_LIMIT,
		profile: createBattleScriptCraftProfile()
	};
	var previousBuildingSearch = battleScriptCraftBuildingSearch;
	battleScriptCraftBuildingSearch = search;
	try {
		for (var i = 0; i < baseRosters.player.length; i++) {
			var initialState = createBattleScriptCraftInitialState(baseRosters, i, options.craftMode);
			if (shouldKeepBattleScriptCraftState(search, initialState)) pushBattleScriptCraftFrontier(search, initialState);
		}
	} finally {
		battleScriptCraftBuildingSearch = previousBuildingSearch;
	}
	return search;
}

function processBattleScriptCraftSearchBatch(search, maxProcessed, startedAt) {
	var processed = 0;
	if (!search || search.error) return {processed: 0, done: true};
	while (search.frontier.length && processed < maxProcessed &&
			search.nodes < search.maxNodes &&
			search.results.length < search.searchLimit) {
		var state = popBattleScriptCraftFrontier(search);
		var expanded;
		if (!state) break;
		if (startedAt && processed > 0 && !hasBattleScriptCraftFrameBudget(startedAt)) {
			pushBattleScriptCraftFrontier(search, state);
			break;
		}
		if (shouldPruneBattleScriptCraftByBounds(search, state)) {
			incrementBattleScriptCraftProfile(search, "pruned");
			incrementBattleScriptCraftProfile(search, "boundPruned");
			processed++;
			continue;
		}
		if (isBattleScriptCraftKnownDeadState(search, state)) {
			incrementBattleScriptCraftProfile(search, "pruned");
			incrementBattleScriptCraftProfile(search, "deadPruned");
			processed++;
			continue;
		}
		search.nodes++;
		incrementBattleScriptCraftProfile(search, "nodes");
		processed++;
		if (isBattleScriptCraftWin(state)) {
			addBattleScriptCraftSearchResult(search, state);
			continue;
		}
		expanded = expandBattleScriptCraftState(state);
		incrementBattleScriptCraftProfile(search, "expanded");
		incrementBattleScriptCraftProfile(search, "generated", expanded.length);
		if (!expanded.length) {
			markBattleScriptCraftDeadState(search, state);
			continue;
		}
		for (var i = 0; i < expanded.length; i++) {
			if (shouldKeepBattleScriptCraftState(search, expanded[i])) pushBattleScriptCraftFrontier(search, expanded[i]);
		}
	}
	return {
		processed: processed,
		done: !search.frontier.length || search.nodes >= search.maxNodes || search.results.length >= search.searchLimit
	};
}

function getBattleScriptCraftSuggestionTeamLimit() {
	return window && typeof window.TEAM_BOX_TEAM_LIMIT === "number" ? window.TEAM_BOX_TEAM_LIMIT : 6;
}

function getBattleScriptCraftEntrySourceKey(entry) {
	return normalizeBattleScriptText(entry && (entry.source || entry.label || entry.pokemon && entry.pokemon.name));
}

function getBattleScriptCraftEntryPowerScore(entry) {
	var pokemon = entry && entry.pokemon;
	var stats = pokemon && (pokemon.rawStats || pokemon.stats) ? (pokemon.rawStats || pokemon.stats) : {};
	var attacking = Math.max(stats.atk || 0, stats.spa || 0);
	return (entry && entry.maxHP ? entry.maxHP : stats.hp || 0) * 0.35 +
		attacking +
		((stats.def || 0) + (stats.spd || 0)) * 0.35 +
		(stats.spe || 0) * 0.85;
}

function getBattleScriptCraftBoxCandidatePool(baseRosters) {
	var boxRoster = getBattleScriptBoxRoster();
	var teamRoster = baseRosters && baseRosters.player ? baseRosters.player : [];
	var seenTeamSources = {};
	var pool = [];
	for (var i = 0; i < teamRoster.length; i++) {
		seenTeamSources[getBattleScriptCraftEntrySourceKey(teamRoster[i])] = true;
	}
	for (var boxIndex = 0; boxIndex < boxRoster.length; boxIndex++) {
		var candidate = boxRoster[boxIndex];
		var key = getBattleScriptCraftEntrySourceKey(candidate);
		if (!candidate || !key || seenTeamSources[key]) continue;
		pool.push({
			boxIndex: boxIndex,
			entry: candidate,
			score: getBattleScriptCraftEntryPowerScore(candidate)
		});
	}
	pool.sort(function (a, b) {
		if (b.score !== a.score) return b.score - a.score;
		return a.boxIndex - b.boxIndex;
	});
	return pool.slice(0, BATTLE_SCRIPT_CRAFT_SUGGESTION_CANDIDATE_LIMIT);
}

function copyBattleScriptCraftKeyMap(map) {
	var copied = {};
	for (var key in map) {
		if (Object.prototype.hasOwnProperty.call(map, key)) copied[key] = map[key];
	}
	return copied;
}

function getBattleScriptCraftReplacementText(replacement) {
	if (replacement.replaced) {
		return "Swap " + replacement.candidate.label + " for " + replacement.replaced.label;
	}
	return "Add " + replacement.candidate.label + " to Player Team";
}

function buildBattleScriptCraftPlanRosters(baseRosters, replacements) {
	var rosters = cloneBattleScriptCraftEnvironmentRosters(baseRosters);
	for (var i = 0; i < replacements.length; i++) {
		var replacement = replacements[i];
		var candidate = cloneBattleScriptRosterEntry(replacement.candidate);
		if (replacement.replaceIndex < rosters.player.length) {
			rosters.player[replacement.replaceIndex] = candidate;
		} else {
			rosters.player.push(candidate);
		}
	}
	return rosters;
}

function getBattleScriptCraftPlanKey(replacements) {
	var parts = [];
	for (var i = 0; i < replacements.length; i++) {
		parts.push(replacements[i].replaceIndex + ":" + getBattleScriptCraftEntrySourceKey(replacements[i].candidate));
	}
	return parts.sort().join("|");
}

function createBattleScriptCraftRosterPlan(baseRosters, replacements, score) {
	return {
		replacements: replacements.slice(0),
		changeCount: replacements.length,
		key: getBattleScriptCraftPlanKey(replacements),
		score: score || 0,
		rosters: buildBattleScriptCraftPlanRosters(baseRosters, replacements)
	};
}

function getBattleScriptCraftPlanQueue(baseRosters) {
	var teamRoster = baseRosters && baseRosters.player ? baseRosters.player : [];
	var candidates = getBattleScriptCraftBoxCandidatePool(baseRosters);
	var teamLimit = getBattleScriptCraftSuggestionTeamLimit();
	var slotCount = Math.min(teamLimit, Math.max(teamRoster.length, Math.min(teamLimit, teamRoster.length + candidates.length)));
	var pairs = [];
	var layers = [];
	var queue = [];
	var maxDepth = Math.min(slotCount, candidates.length, teamLimit);
	var seenPlans = {};
	if (!candidates.length || !slotCount) return queue;
	for (var slotIndex = 0; slotIndex < slotCount; slotIndex++) {
		var replaced = teamRoster[slotIndex] || null;
		var replacedScore = replaced ? getBattleScriptCraftEntryPowerScore(replaced) : 0;
		for (var candidateIndex = 0; candidateIndex < candidates.length; candidateIndex++) {
			pairs.push({
				candidateIndex: candidateIndex,
				replaceIndex: slotIndex,
				candidate: candidates[candidateIndex].entry,
				replaced: replaced,
				score: candidates[candidateIndex].score - replacedScore * 0.35
			});
		}
	}
	pairs.sort(function (a, b) {
		if (b.score !== a.score) return b.score - a.score;
		if (a.replaceIndex !== b.replaceIndex) return a.replaceIndex - b.replaceIndex;
		return a.candidateIndex - b.candidateIndex;
	});
	var previous = [{
		replacements: [],
		usedCandidates: {},
		usedSlots: {},
		nextPairIndex: 0,
		score: 0
	}];
	for (var depth = 1; depth <= maxDepth; depth++) {
		var nextLayer = [];
		for (var partialIndex = 0; partialIndex < previous.length; partialIndex++) {
			var partial = previous[partialIndex];
			for (var pairIndex = partial.nextPairIndex; pairIndex < pairs.length; pairIndex++) {
				var pair = pairs[pairIndex];
				var candidateKey = getBattleScriptCraftEntrySourceKey(pair.candidate);
				var slotKey = String(pair.replaceIndex);
				var nextUsedCandidates;
				var nextUsedSlots;
				var nextReplacements;
				var nextPartial;
				if (partial.usedCandidates[candidateKey] || partial.usedSlots[slotKey]) continue;
				nextUsedCandidates = copyBattleScriptCraftKeyMap(partial.usedCandidates);
				nextUsedSlots = copyBattleScriptCraftKeyMap(partial.usedSlots);
				nextUsedCandidates[candidateKey] = true;
				nextUsedSlots[slotKey] = true;
				nextReplacements = partial.replacements.concat([{
					candidate: pair.candidate,
					replaced: pair.replaced,
					replaceIndex: pair.replaceIndex
				}]);
				nextPartial = {
					replacements: nextReplacements,
					usedCandidates: nextUsedCandidates,
					usedSlots: nextUsedSlots,
					nextPairIndex: pairIndex + 1,
					score: partial.score + pair.score - (depth - 1) * 1.5
				};
				nextLayer.push(nextPartial);
			}
		}
		nextLayer.sort(function (a, b) {
			if (b.score !== a.score) return b.score - a.score;
			return a.replacements.length - b.replacements.length;
		});
		layers[depth] = nextLayer.slice(0, BATTLE_SCRIPT_CRAFT_SUGGESTION_BEAM_WIDTH);
		previous = layers[depth];
	}
	for (var round = 0; queue.length < BATTLE_SCRIPT_CRAFT_SUGGESTION_QUEUE_LIMIT; round++) {
		var added = false;
		for (var layerDepth = 1; layerDepth <= maxDepth && queue.length < BATTLE_SCRIPT_CRAFT_SUGGESTION_QUEUE_LIMIT; layerDepth++) {
			var layer = layers[layerDepth] || [];
			var plan;
			if (!layer[round]) continue;
			plan = createBattleScriptCraftRosterPlan(baseRosters, layer[round].replacements, layer[round].score);
			if (seenPlans[plan.key]) continue;
			seenPlans[plan.key] = true;
			queue.push(plan);
			added = true;
		}
		if (!added) break;
	}
	return queue;
}

function getBattleScriptCraftLineDanger(line) {
	var steps = getBattleScriptCraftScriptLines(line.steps || line.script);
	var sacrifices = 0;
	var recharges = 0;
	for (var i = 0; i < steps.length; i++) {
		if (/^Player\s+.+\s+faints$/i.test(steps[i])) sacrifices++;
		if (/\suses\s+Recharge$/i.test(steps[i])) recharges++;
	}
	return (1 - line.consistency) * 100 + line.rollRisks * 28 + sacrifices * 14 + recharges * 4 + line.turns * 0.6;
}

function getBattleScriptCraftDangerLabel(danger, line) {
	if (line && line.consistency >= 0.995 && !line.rollRisks && danger < 12) return "Riskless";
	if (danger < 20) return "Low danger";
	if (danger < 45) return "Medium danger";
	return "High danger";
}

function getBattleScriptCraftSuggestionRiskTier(line, danger) {
	if (line && line.consistency >= 0.995 && !line.rollRisks && danger < 12) return 0;
	if (line && line.consistency >= 0.85 && line.rollRisks <= 1 && danger < 45) return 1;
	return 2;
}

function createBattleScriptCraftSuggestion(plan, search) {
	var line = selectBattleScriptCraftLines(search.results)[0];
	var danger;
	if (!line) return null;
	danger = getBattleScriptCraftLineDanger(line);
	return {
		replacements: plan.replacements,
		changeCount: plan.changeCount,
		line: line,
		danger: danger,
		dangerLabel: getBattleScriptCraftDangerLabel(danger, line),
		riskTier: getBattleScriptCraftSuggestionRiskTier(line, danger)
	};
}

function compareBattleScriptCraftSuggestions(a, b) {
	if (a.riskTier !== b.riskTier) return a.riskTier - b.riskTier;
	if (b.line.consistency !== a.line.consistency) return b.line.consistency - a.line.consistency;
	if (a.danger !== b.danger) return a.danger - b.danger;
	if (a.changeCount !== b.changeCount) return a.changeCount - b.changeCount;
	return a.line.turns - b.line.turns;
}

function startBattleScriptCraftSuggestionSearch(baseRosters, craftMode) {
	var queue = getBattleScriptCraftPlanQueue(baseRosters);
	if (!queue.length) return false;
	battleScriptCraftSuggestions = [];
	battleScriptCraftSearch = {
		kind: "suggestions",
		craftMode: normalizeBattleScriptCraftMode(craftMode),
		planQueue: queue,
		initialPlanCount: queue.length,
		currentPlan: null,
		currentSearch: null,
		suggestions: [],
		totalNodes: 0
	};
	setBattleScriptCraftResultMode("empty");
	$("#battle-script-craft-status").text("NO WINNING LINES FOUND");
	$("#battle-script-craft-actions").prop("hidden", false);
	$("#battle-script-craft-show").prop("hidden", true);
	$("#battle-script-craft-dismiss").text("OH NO");
	$("#battle-script-craft-suggestions").prop("hidden", false).empty()
		.append($("<p id='battle-script-craft-suggestion-note' class='battle-script-craft-suggestion-note'></p>"));
	startBattleScriptCraftAnimation({
		target: "#battle-script-craft-suggestion-note",
		quips: BATTLE_SCRIPT_CRAFT_TEAM_PLAN_QUIPS
	});
	setBattleScriptCraftProgress(0);
	scheduleBattleScriptCraftBatch(runBattleScriptCraftSuggestionBatch);
	return true;
}

function runBattleScriptCraftSuggestionBatch() {
	var search = battleScriptCraftSearch;
	var processed = 0;
	var startedAt = getBattleScriptCraftTime();
	if (!search || search.kind !== "suggestions") return;
	while (processed < BATTLE_SCRIPT_CRAFT_BATCH_SIZE &&
			hasBattleScriptCraftFrameBudget(startedAt) &&
			search.suggestions.length < BATTLE_SCRIPT_CRAFT_SUGGESTION_COLLECT_LIMIT &&
			search.totalNodes < BATTLE_SCRIPT_CRAFT_SUGGESTION_TOTAL_MAX_NODES) {
		var beforeNodes;
		var result;
		var suggestion;
		if (!search.currentSearch) {
			if (!search.planQueue.length) break;
			search.currentPlan = search.planQueue.shift();
			search.currentSearch = createBattleScriptCraftSearch(search.currentPlan.rosters, {
				maxNodes: BATTLE_SCRIPT_CRAFT_SUGGESTION_MAX_NODES,
				searchLimit: BATTLE_SCRIPT_CRAFT_SUGGESTION_SEARCH_LIMIT,
				craftMode: search.craftMode
			});
		}
		beforeNodes = search.currentSearch.nodes;
		result = processBattleScriptCraftSearchBatch(search.currentSearch, BATTLE_SCRIPT_CRAFT_BATCH_SIZE - processed, startedAt);
		processed += Math.max(1, result.processed);
		search.totalNodes += search.currentSearch.nodes - beforeNodes;
		if (!result.done) break;
		if (search.currentSearch.results.length) {
			suggestion = createBattleScriptCraftSuggestion(search.currentPlan, search.currentSearch);
			if (suggestion) search.suggestions.push(suggestion);
		}
		search.currentSearch = null;
		search.currentPlan = null;
	}
	updateBattleScriptCraftProgress(search);
	if (search.suggestions.length >= BATTLE_SCRIPT_CRAFT_SUGGESTION_COLLECT_LIMIT ||
			(!search.planQueue.length && !search.currentSearch) ||
			search.totalNodes >= BATTLE_SCRIPT_CRAFT_SUGGESTION_TOTAL_MAX_NODES) {
		battleScriptCraftSuggestions = search.suggestions.slice(0).sort(compareBattleScriptCraftSuggestions).slice(0, BATTLE_SCRIPT_CRAFT_MAX_SUGGESTIONS);
		battleScriptCraftSearch = null;
		stopBattleScriptCraftAnimation();
		setBattleScriptCraftProgress(100);
		renderBattleScriptCraftNoLineState(battleScriptCraftSuggestions);
		return;
	}
	scheduleBattleScriptCraftBatch(runBattleScriptCraftSuggestionBatch);
}

function clampBattleScriptCraftProgress(value) {
	value = Math.round((Number(value) || 0) * 10) / 10;
	return Math.max(0, Math.min(100, value));
}

function setBattleScriptCraftProgress(value) {
	var percent = clampBattleScriptCraftProgress(value);
	var label = Math.round(percent) + "%";
	$("#battle-script-craft-progress")
		.prop("hidden", false)
		.attr("aria-valuenow", Math.round(percent));
	$("#battle-script-craft-progress-fill").css("width", percent + "%");
	$("#battle-script-craft-progress-label").text(label);
}

function hideBattleScriptCraftProgress() {
	$("#battle-script-craft-progress")
		.prop("hidden", true)
		.attr("aria-valuenow", "0");
	$("#battle-script-craft-progress-fill").css("width", "0%");
	$("#battle-script-craft-progress-label").text("0%");
}

function getBattleScriptRegularSearchProgress(search) {
	var nodeFraction;
	var frontierFraction;
	var resultFraction;
	if (!search) return 0;
	if (!search.frontier || !search.frontier.length || search.nodes >= search.maxNodes || search.results.length >= search.searchLimit) return 100;
	nodeFraction = search.maxNodes ? search.nodes / search.maxNodes : 0;
	frontierFraction = search.nodes / Math.max(1, search.nodes + search.frontier.length);
	resultFraction = search.searchLimit ? search.results.length / search.searchLimit : 0;
	return Math.min(99, Math.max(nodeFraction, frontierFraction * 0.95, resultFraction) * 100);
}

function getBattleScriptSuggestionSearchProgress(search) {
	var initialPlans;
	var currentFraction = 0;
	var completedPlans;
	var planFraction;
	var nodeFraction;
	if (!search) return 0;
	initialPlans = search.initialPlanCount || 0;
	if (!initialPlans) return 0;
	if (!search.planQueue.length && !search.currentSearch) return 100;
	if (search.currentSearch) currentFraction = getBattleScriptRegularSearchProgress(search.currentSearch) / 100;
	completedPlans = Math.max(0, initialPlans - search.planQueue.length - (search.currentSearch ? 1 : 0));
	planFraction = (completedPlans + currentFraction) / initialPlans;
	nodeFraction = search.totalNodes / Math.max(1, BATTLE_SCRIPT_CRAFT_SUGGESTION_TOTAL_MAX_NODES);
	return Math.min(99, Math.max(planFraction, nodeFraction) * 100);
}

function updateBattleScriptCraftProgress(search) {
	if (!search) return;
	if (search.kind === "suggestions") setBattleScriptCraftProgress(getBattleScriptSuggestionSearchProgress(search));
	else setBattleScriptCraftProgress(getBattleScriptRegularSearchProgress(search));
}

function getBattleScriptCraftTime() {
	return window.performance && typeof window.performance.now === "function" ? window.performance.now() : Date.now();
}

function hasBattleScriptCraftFrameBudget(startedAt) {
	return getBattleScriptCraftTime() - startedAt < BATTLE_SCRIPT_CRAFT_FRAME_BUDGET_MS;
}

function scheduleBattleScriptCraftBatch(callback) {
	if (window.requestIdleCallback) {
		window.requestIdleCallback(callback, {timeout: 50});
		return;
	}
	window.setTimeout(callback, 0);
}

function scheduleBattleScriptCraftAfterPaint(callback) {
	if (window.requestAnimationFrame) {
		window.requestAnimationFrame(function () {
			window.requestAnimationFrame(callback);
		});
		return;
	}
	window.setTimeout(callback, 16);
}

function setBattleScriptCraftResultMode(mode) {
	$("#battle-script-craft").removeClass("is-picker is-crafting is-empty is-results").addClass(mode ? "is-" + mode : "");
	$("#battle-script-craft-status").removeClass("battle-script-craft-status-empty");
	if (mode === "empty") $("#battle-script-craft-status").addClass("battle-script-craft-status-empty");
}

function finishBattleScriptLineCraft(search) {
	var profile;
	stopBattleScriptCraftAnimation();
	battleScriptCraftSearch = null;
	profile = finishBattleScriptCraftProfile(search);
	if (profile && window.console && typeof window.console.info === "function") {
		window.console.info("Royal Sword Craft profile", profile);
	}
	battleScriptCraftLines = selectBattleScriptCraftLines(search.results);
	setBattleScriptCraftProgress(100);
	if (search.error) {
		setBattleScriptCraftResultMode("results");
		$("#battle-script-craft-status").text(search.error);
		$("#battle-script-craft-actions").prop("hidden", false);
		$("#battle-script-craft-show").prop("hidden", true);
		$("#battle-script-craft-dismiss").text("Nah I dont need it");
		$("#battle-script-craft-suggestions").prop("hidden", true).empty();
		return;
	}
	if (!battleScriptCraftLines.length && startBattleScriptCraftSuggestionSearch(search.baseRosters, search.craftMode)) return;
	if (!battleScriptCraftLines.length) {
		renderBattleScriptCraftNoLineState([]);
		return;
	}
	setBattleScriptCraftResultMode("results");
	$("#battle-script-craft-status").text("Found " + battleScriptCraftLines.length + " distinct line" + (battleScriptCraftLines.length === 1 ? "." : "s."));
	$("#battle-script-craft-show").prop("hidden", false);
	$("#battle-script-craft-actions").prop("hidden", false);
	$("#battle-script-craft-dismiss").text("Nah I dont need it");
	$("#battle-script-craft-suggestions").prop("hidden", true).empty();
}

function runBattleScriptLineCraftBatch() {
	var search = battleScriptCraftSearch;
	var result;
	var startedAt = getBattleScriptCraftTime();
	if (!search) return;
	if (search.error) {
		finishBattleScriptLineCraft(search);
		return;
	}
	do {
		result = processBattleScriptCraftSearchBatch(search, BATTLE_SCRIPT_CRAFT_BATCH_SIZE, startedAt);
	} while (!result.done && hasBattleScriptCraftFrameBudget(startedAt));
	updateBattleScriptCraftProgress(search);
	if (result.done) {
		finishBattleScriptLineCraft(search);
		return;
	}
	scheduleBattleScriptCraftBatch(runBattleScriptLineCraftBatch);
}

function runBattleScriptMove(state, parsed, lineNumber) {
	var attackerSide = findBattleScriptActorSide(state, parsed.actor);
	var activeAttacker;
	var actorFormat = parseBattleScriptPokemonFormat(parsed.actor);
	var formatResult;
	var forcedChargeMove;
	var move;
	var moveEffects;
	var chargeInfo;
	var aiChoice;
	var recommendations;
	var blockedReason;
	var legalityReason;
	var chargeDetails;
	var consumedPowerHerb;
	if (!attackerSide) {
		addBattleScriptMessage(state.messages, lineNumber, "error", "Could not identify attacker: " + parsed.actor + ".");
		return;
	}
	var defenderSide = getBattleScriptOpposingSide(attackerSide);
	activeAttacker = state.active[attackerSide];
	if (activeAttacker && !battleScriptEntryMatchesQuery(activeAttacker, actorFormat, normalizeBattleScriptText(parsed.actor))) {
		addBattleScriptMessage(
			state.messages,
			lineNumber,
			"error",
			parsed.actor + " is not the active " + BATTLE_SCRIPT_SIDE_LABELS[attackerSide] + " Pokemon."
		);
		return;
	}
	var attacker = activeAttacker || findBattleScriptRosterEntry(state.rosters[attackerSide], parsed.actor);
	var defender = state.active[defenderSide];
	if (!attacker || !defender) {
		addBattleScriptMessage(state.messages, lineNumber, "error", "Set both active Pokemon before calculating a move.");
		return;
	}
	formatResult = applyBattleScriptPokemonFormat(state, attackerSide, attacker, actorFormat, lineNumber);
	if (!formatResult.ok) return;
	if (!state.active[attackerSide]) state.active[attackerSide] = attacker;
	if (attacker.mustRecharge) {
		addBattleScriptRechargeMessage(state, lineNumber, attacker);
		return;
	}
	forcedChargeMove = getBattleScriptForcedChargeMove(attacker);
	if (forcedChargeMove && normalizeBattleScriptText(parsed.move) !== normalizeBattleScriptText(forcedChargeMove.name)) {
		addBattleScriptMessage(
			state.messages,
			lineNumber,
			"error",
			attacker.label + " must finish " + forcedChargeMove.name + ".",
			"Moves spanning two turns force the stored release before another move can be chosen."
		);
		return;
	}
	move = forcedChargeMove || findBattleScriptMove(attacker.pokemon, parsed.move);
	if (!move) {
		addBattleScriptMessage(state.messages, lineNumber, "error", attacker.label + " does not have " + parsed.move + ".");
		return;
	}
	legalityReason = getBattleScriptMoveLegalityBlockReason(attacker, move, state);
	if (legalityReason) {
		addBattleScriptMessage(state.messages, lineNumber, "error", attacker.label + " cannot use " + move.name + ".", legalityReason + ".");
		return;
	}
	moveEffects = getBattleScriptMoveEffects(move);
	chargeInfo = getBattleScriptChargeActionInfo(attacker, move, state);
	aiChoice = getBattleScriptAIModelMoveChoice(state, attackerSide, attacker, defender, move);
	recommendations = getBattleScriptRecommendations(state, attackerSide, attacker, move);
	if (chargeInfo.startsCharge) {
		chargeDetails = applyBattleScriptChargeStartEffects(attacker, move);
		commitBattleScriptMoveUse(attacker);
		lockBattleScriptChoiceMove(attacker, move, state);
		attacker.chargingMove = move.name;
		attacker.hasActed = true;
		chargeDetails = chargeDetails.length ? [{label: "Effect", value: chargeDetails.join("; ")}] : [];
		chargeDetails.unshift({label: "Charge", value: attacker.label + " is preparing " + move.name + "."});
		if (chargeInfo.info && chargeInfo.info.invulnerable) {
			chargeDetails.push({label: "Position", value: attacker.label + " is " + chargeInfo.info.invulnerable + "."});
		}
		addBattleScriptMessage(
			state.messages,
			lineNumber,
			"state",
			attacker.label + " uses " + move.name + " on " + defender.label,
			chargeDetails,
			{recommendations: recommendations, aiChoice: aiChoice}
		);
		return;
	}
	blockedReason = getBattleScriptChargeBlockedReason(attacker, defender, move, state);
	if (chargeInfo.consumesPowerHerb) {
		chargeDetails = applyBattleScriptChargeStartEffects(attacker, move);
		consumedPowerHerb = consumeBattleScriptPowerHerb(attacker);
	} else {
		chargeDetails = [];
		consumedPowerHerb = "";
	}
	if (!isBattleScriptDamagingMove(move) && moveEffects.length) {
		var effectDetails = blockedReason ? [] : applyBattleScriptMoveEffects(attacker, defender, move, {state: state, attackerSide: attackerSide, skipChargeStartEffects: true});
		var detail = [{label: "Effect", value: effectDetails.length ? effectDetails.join("; ") : "No effect applied."}];
		applyBattleScriptAfterMoveUseHeldItemEffects(attacker, move, effectDetails, state);
		detail = [{label: "Effect", value: effectDetails.length ? effectDetails.join("; ") : "No effect applied."}];
		if (blockedReason) detail = [{label: "Miss", value: blockedReason + "."}];
		if (chargeDetails.length) detail.push({label: "Charge", value: chargeDetails.join("; ")});
		if (consumedPowerHerb) detail.push({label: "Item", value: consumedPowerHerb + " was consumed."});
		if (isBattleScriptSelfFaintMove(move)) {
			attacker.hp = {min: 0, max: 0};
			attacker.mustRecharge = false;
			attacker.rechargeMove = "";
			clearBattleScriptChargeState(attacker);
			if (state.active[attackerSide] === attacker) state.active[attackerSide] = null;
			detail.push({label: "Faint", value: attacker.label + " fainted."});
		}
		if (chargeInfo.release) clearBattleScriptChargeState(attacker);
		addBattleScriptMessage(
			state.messages,
			lineNumber,
			"state",
			attacker.label + " uses " + move.name + " on " + defender.label,
			detail,
			{recommendations: recommendations, aiChoice: aiChoice}
		);
		attacker.hasActed = true;
		return;
	}
	var result;
	try {
		result = getBattleScriptMoveDamageResult(attackerSide, attacker, defender, move, state, {
			forceChargeResolve: chargeInfo.resolvesNow,
			previewChargeStartEffects: false
		});
	} catch (e) {
		addBattleScriptMessage(state.messages, lineNumber, "error", "Could not calculate " + move.name + ".");
		return;
	}
	var damage = result.damage;
	if (!damage) {
		addBattleScriptMessage(state.messages, lineNumber, "error", "Could not read damage for " + move.name + ".");
		return;
	}
	var before = updateBattleScriptHP(defender, damage, {
		state: state,
		attackerState: attacker,
		move: move
	});
	var koInfo = attackerSide === "player" && !damage.blocked ? getBattleScriptKOChanceInfo(result.result, damage, {hp: before, maxHP: defender.maxHP}, attacker, defender, move, state) : null;
	var risk = attackerSide === "player" ? (koInfo ? koInfo.riskText : "") : getBattleScriptRisk(damage, {hp: before, maxHP: defender.maxHP});
	var detail = [
		{label: "Damage", value: getBattleScriptDamageText(damage, defender.pokemon)},
		{label: "HP", value: defender.label + ": " + getBattleScriptHPText(before, defender.maxHP) + " -> " + getBattleScriptHPText(defender.hp, defender.maxHP)}
	];
	if (blockedReason) detail.push({label: "Miss", value: blockedReason + "."});
	commitBattleScriptMoveUse(attacker);
	lockBattleScriptChoiceMove(attacker, move, state);
	if (risk) detail.push({label: "Risk", value: risk});
	if (before.survivalDetails && before.survivalDetails.length) {
		detail.push({label: "Survival", value: before.survivalDetails.join("; ")});
	}
	if (before.postDamageDetails && before.postDamageDetails.length) {
		detail.push({label: "After hit", value: before.postDamageDetails.join("; ")});
	}
	if (moveEffects.length) {
		var effectText = blockedReason ? [] : applyBattleScriptMoveEffects(attacker, defender, move, {state: state, attackerSide: attackerSide, skipDefender: defender.hp.max <= 0, skipChargeStartEffects: true});
		if (effectText.length) detail.push({label: "Effect", value: effectText.join("; ")});
	}
	if (chargeDetails.length) detail.push({label: "Charge", value: chargeDetails.join("; ")});
	if (consumedPowerHerb) detail.push({label: "Item", value: consumedPowerHerb + " was consumed."});
	if (chargeInfo.release) clearBattleScriptChargeState(attacker);
	if (isBattleScriptRechargeMove(move)) {
		attacker.mustRecharge = true;
		attacker.rechargeMove = move.name;
		clearBattleScriptChargeState(attacker);
		detail.push({label: "Next", value: attacker.label + " must recharge before acting again."});
	}
	addBattleScriptMessage(
		state.messages,
		lineNumber,
		"damage",
		attacker.label + " uses " + move.name + " on " + defender.label,
		detail,
		{recommendations: recommendations, aiChoice: aiChoice}
	);
	attacker.hasActed = true;
}

function runBattleScript(scriptText) {
	var state;
	var lines = (scriptText || "").split(/\r?\n/);
	if (battleScriptLoadedCraftScriptText &&
			normalizeBattleScriptCraftScript(scriptText) !== battleScriptLoadedCraftScriptText) {
		battleScriptLoadedCraftLineReasons = {};
		battleScriptLoadedCraftScriptText = "";
	}
	clearBattleScriptRuntimeState();
	state = createBattleScriptRunState();
	battleScriptRuntimeState = state;
	for (var i = 0; i < lines.length; i++) {
		var parsed = parseBattleScriptLine(lines[i]);
		var lineNumber = i + 1;
		switch (parsed.type) {
		case "blank":
			break;
		case "start":
			state.active = {player: null, opponent: null};
			state.lastActionSide = "";
			resetBattleScriptFieldState(state);
			addBattleScriptMessage(state.messages, lineNumber, "state", "Fight start", "Battle state reset.");
			break;
		case "turn":
			state.lastActionSide = "";
			var endTurnUpdates = applyBattleScriptEndTurnEffects(state);
			var fieldUpdates = advanceBattleScriptFieldDurations(state, parsed.number);
			addBattleScriptMessage(
				state.messages,
				lineNumber,
				"state",
				"Turn " + parsed.number,
				endTurnUpdates.concat(fieldUpdates).length ?
					"Action order reset. " + endTurnUpdates.concat(fieldUpdates).join("; ") + "." :
					"Action order reset."
			);
			break;
		case "field":
			runBattleScriptFieldState(state, parsed, lineNumber);
			break;
		case "sideCondition":
			runBattleScriptSideConditionState(state, parsed, lineNumber);
			break;
		case "active":
			setBattleScriptActive(state, parsed.side, parsed.name, lineNumber);
			break;
		case "faint":
			runBattleScriptFaint(state, parsed, lineNumber);
			break;
		case "item":
			runBattleScriptHeldItem(state, parsed, lineNumber);
			break;
		case "switch":
			if (!canRunBattleScriptSwitch(state, parsed, lineNumber)) break;
			if (!canRunBattleScriptAction(state, parsed, lineNumber)) break;
			setBattleScriptActive(state, parsed.side, parsed.name, lineNumber, "switch");
			break;
		case "move":
			if (!canRunBattleScriptAction(state, parsed, lineNumber)) break;
			runBattleScriptMove(state, parsed, lineNumber);
			break;
		default:
			addBattleScriptMessage(state.messages, lineNumber, "error", "Could not parse: " + parsed.text);
		}
	}
	return state.messages;
}

function addBattleScriptSyntaxIssue(issues, lineNumber, text) {
	issues.push({lineNumber: lineNumber, text: text});
}

function getBattleScriptLiveAliases(name) {
	var aliases = {};
	addBattleScriptPokemonFormatAliases(aliases, name);
	return aliases;
}

function getBattleScriptLiveActionSide(active, parsed) {
	var actor;
	var actorInfo;
	var actorName;
	if (parsed.type === "switch") return parsed.side;
	if (parsed.type !== "move") return "";
	actorInfo = parseBattleScriptPokemonFormat(parsed.actor);
	actor = normalizeBattleScriptText(parsed.actor);
	actorName = normalizeBattleScriptText(actorInfo.name);
	if (active.player && (active.player[actor] || active.player[actorName])) return "player";
	if (active.opponent && (active.opponent[actor] || active.opponent[actorName])) return "opponent";
	return "";
}

function getBattleScriptLiveFaintSide(active, parsed) {
	var info = parseBattleScriptPokemonFormat(parsed.name);
	var normalized = normalizeBattleScriptText(parsed.name);
	var normalizedName = normalizeBattleScriptText(info.name);
	if (parsed.side) return active[parsed.side] && (active[parsed.side][normalized] || active[parsed.side][normalizedName]) ? parsed.side : "";
	if (active.player && (active.player[normalized] || active.player[normalizedName])) return "player";
	if (active.opponent && (active.opponent[normalized] || active.opponent[normalizedName])) return "opponent";
	return "";
}

function getBattleScriptSyntaxIssues(scriptText) {
	var active = {player: null, opponent: null};
	var issues = [];
	var lastActionSide = "";
	var lines = (scriptText || "").split(/\r?\n/);
	for (var i = 0; i < lines.length; i++) {
		var parsed = parseBattleScriptLine(lines[i]);
		var lineNumber = i + 1;
		var actionSide = getBattleScriptLiveActionSide(active, parsed);
		switch (parsed.type) {
		case "blank":
			break;
		case "start":
			active = {player: null, opponent: null};
			lastActionSide = "";
			break;
		case "turn":
			lastActionSide = "";
			break;
		case "field":
		case "sideCondition":
			break;
		case "active":
			active[parsed.side] = getBattleScriptLiveAliases(parsed.name);
			break;
		case "faint":
			actionSide = getBattleScriptLiveFaintSide(active, parsed);
			if (!actionSide) {
				addBattleScriptSyntaxIssue(issues, lineNumber, "Faint lines should name an active Player or Trainer Pokemon.");
			} else {
				active[actionSide] = null;
			}
			break;
		case "item":
			if (parsed.side !== "player") addBattleScriptSyntaxIssue(issues, lineNumber, "Trainer held items are fixed.");
			break;
		case "switch":
			if (!active[actionSide]) {
				addBattleScriptSyntaxIssue(issues, lineNumber, BATTLE_SCRIPT_SIDE_LABELS[actionSide] + " needs an active Pokemon before switching.");
			}
			if (lastActionSide === actionSide) {
				addBattleScriptSyntaxIssue(issues, lineNumber, BATTLE_SCRIPT_SIDE_LABELS[actionSide] + " acted twice in a row.");
			}
			active[actionSide] = getBattleScriptLiveAliases(parsed.name);
			lastActionSide = actionSide;
			break;
		case "move":
			if (!active.player || !active.opponent) {
				addBattleScriptSyntaxIssue(issues, lineNumber, "Set both active Pokemon before using a move.");
			} else if (!actionSide) {
				addBattleScriptSyntaxIssue(issues, lineNumber, "Move lines must use the currently active Player or Trainer Pokemon.");
			} else if (lastActionSide === actionSide) {
				addBattleScriptSyntaxIssue(issues, lineNumber, BATTLE_SCRIPT_SIDE_LABELS[actionSide] + " acted twice in a row.");
			}
			if (actionSide) lastActionSide = actionSide;
			break;
		default:
			addBattleScriptSyntaxIssue(issues, lineNumber, "Could not parse this line.");
		}
	}
	return issues;
}

function updateBattleScriptSyntaxStatus() {
	var issues = getBattleScriptSyntaxIssues($("#battle-script-input").val());
	var status = $("#battle-script-syntax-status");
	if (!issues.length) {
		status.removeClass("battle-script-syntax-error").text("Syntax ready.");
		return;
	}
	status
		.addClass("battle-script-syntax-error")
		.text("Line " + issues[0].lineNumber + ": " + issues[0].text);
}

function getBattleScriptStorage() {
	try {
		return window.getRoyalSwordStorage ? window.getRoyalSwordStorage() : window.localStorage || null;
	} catch (e) {
		return null;
	}
}

function saveBattleScriptState(messages) {
	var storage = getBattleScriptStorage();
	if (!storage) return;
	try {
		storage.setItem(BATTLE_SCRIPT_STORAGE_KEY, JSON.stringify({
			script: $("#battle-script-input").val() || "",
			aiModel: battleScriptAIModel,
			messages: messages || battleScriptMessages
		}));
	} catch (e) {}
}

function clearBattleScriptState() {
	var storage = getBattleScriptStorage();
	if (!storage) return;
	try {
		storage.removeItem(BATTLE_SCRIPT_STORAGE_KEY);
	} catch (e) {}
}

function getSavedBattleScriptState() {
	var storage = getBattleScriptStorage();
	var rawState;
	if (!storage) return null;
	try {
		rawState = storage.getItem(BATTLE_SCRIPT_STORAGE_KEY);
		return rawState ? JSON.parse(rawState) : null;
	} catch (e) {
		return null;
	}
}

function createBattleScriptResultItem(message) {
	var item = $("<li class='battle-script-result'></li>");
	item.addClass("battle-script-result-" + message.type);
	item.append($("<div class='battle-script-result-title'></div>").text(message.text));
	if (message.detailLines && message.detailLines.length) {
		var detailList = $("<div class='battle-script-result-detail battle-script-result-detail-list'></div>");
		for (var j = 0; j < message.detailLines.length; j++) {
			var detailLine = message.detailLines[j];
			detailList.append(
				$("<div class='battle-script-result-detail-row'></div>")
					.append($("<span class='battle-script-result-detail-label'></span>").text(detailLine.label))
					.append($("<span class='battle-script-result-detail-value'></span>").text(detailLine.value))
			);
		}
		item.append(detailList);
	}
	if (message.detail) item.append($("<div class='battle-script-result-detail'></div>").text(message.detail));
	if (message.aiChoice) {
		var aiChoice = $("<div class='battle-script-ai-choice'></div>");
		var aiRows = $("<div class='battle-script-ai-choice-rows'></div>");
		aiChoice.append($("<div class='battle-script-ai-choice-title'></div>").text(message.aiChoice.model + " Move Scores"));
		if (message.aiChoice.switchDecision) {
			aiRows.append(
				$("<div class='battle-script-ai-choice-row battle-script-ai-choice-top'></div>")
					.append($("<span></span>").text("Predicted action"))
					.append($("<span></span>").text("Switch to " + message.aiChoice.switchDecision.label + " (" + message.aiChoice.switchDecision.value + ")"))
			);
		}
		aiRows.append(
			$("<div></div>")
				.addClass("battle-script-ai-choice-row")
				.toggleClass("battle-script-ai-choice-top", !message.aiChoice.switchDecision)
				.append($("<span></span>").text(message.aiChoice.switchDecision ? "Best move if staying in" : "Predicted choice"))
				.append($("<span></span>").text(message.aiChoice.top.move + " (" + formatBattleScriptAIScoreSummary(message.aiChoice.top) + ")"))
		);
		if (message.aiChoice.confidence) {
			aiRows.append(
				$("<div class='battle-script-ai-choice-row'></div>")
					.append($("<span></span>").text("Certainty"))
					.append($("<span></span>").text(message.aiChoice.confidence.text))
			);
		}
		if (message.aiChoice.selected && message.aiChoice.selected.move !== message.aiChoice.top.move) {
			aiRows.append(
				$("<div class='battle-script-ai-choice-row'></div>")
					.append($("<span></span>").text("Script move"))
					.append($("<span></span>").text(message.aiChoice.selected.move + " (" + formatBattleScriptAIScoreSummary(message.aiChoice.selected) + ")"))
			);
		}
		for (var aiIndex = 0; aiIndex < message.aiChoice.scores.length; aiIndex++) {
			var score = message.aiChoice.scores[aiIndex];
			var noteText = score.notes && score.notes.length ? ": " + score.notes.slice(0, 2).join("; ") : "";
			aiRows.append(
				$("<div class='battle-script-ai-choice-row'></div>")
					.append($("<span></span>").text(score.move))
					.append($("<span></span>").text(formatBattleScriptAIScoreSummary(score) + noteText))
			);
		}
		aiChoice.append(aiRows);
		item.append(aiChoice);
	}
	if (message.recommendations && message.recommendations.length) {
		var recommendations = $("<details class='battle-script-recommendations'></details>");
		var list = $("<ul></ul>");
		recommendations.append($("<summary class='battle-script-recommendations-title'></summary>").text("Top 3 Best Picks"));
		for (var k = 0; k < message.recommendations.length; k++) {
			var recommendation = message.recommendations[k];
			var recommendationItem = $("<li class='battle-script-recommendation'></li>");
			var recommendationDetails = $("<div class='battle-script-recommendation-details'></div>");
			var summary = $("<div class='battle-script-recommendation-summary'></div>")
				.append($("<span class='battle-script-recommendation-name'></span>").text(recommendation.label));
			if (recommendation.value) summary.append(document.createTextNode(": " + recommendation.value));
			recommendationItem.append(summary);
			if (recommendation.details && recommendation.details.length) {
				for (var detailIndex = 0; detailIndex < recommendation.details.length; detailIndex++) {
					recommendationDetails.append(
						$("<div class='battle-script-recommendation-detail-row'></div>")
							.append($("<span class='battle-script-recommendation-detail-label'></span>").text(recommendation.details[detailIndex].label))
							.append($("<span class='battle-script-recommendation-detail-value'></span>").text(recommendation.details[detailIndex].value))
					);
				}
				recommendationItem.append(recommendationDetails);
			}
			list.append(recommendationItem);
		}
		recommendations.append(list);
		item.append(recommendations);
	}
	item.attr("data-line", message.lineNumber);
	return item;
}

function getBattleScriptTimelineGroups(messages) {
	var groups = [];
	var currentGroup = null;
	for (var i = 0; i < messages.length; i++) {
		var message = messages[i];
		if (message.type === "state" && /^Turn\s+\d+$/i.test(message.text)) {
			currentGroup = {
				title: message.text,
				lineNumber: message.lineNumber,
				messages: []
			};
			groups.push(currentGroup);
			continue;
		}
		if (!currentGroup) {
			currentGroup = {
				title: "Setup",
				lineNumber: message.lineNumber,
				messages: []
			};
			groups.push(currentGroup);
		}
		currentGroup.messages.push(message);
	}
	return groups;
}

function createBattleScriptTimelineGroup(group, isOpen) {
	var item = $("<li class='battle-script-turn-group'></li>");
	var frame = $("<details class='battle-script-turn-frame'></details>");
	var summary = $("<summary class='battle-script-turn-summary'></summary>");
	var nested = $("<ol class='battle-script-turn-results'></ol>");
	frame.prop("open", !!isOpen);
	summary
		.append($("<span class='battle-script-turn-title'></span>").text(group.title))
		.append($("<span class='battle-script-turn-count'></span>").text(group.messages.length + " item" + (group.messages.length === 1 ? "" : "s")));
	frame.append(summary);
	if (!group.messages.length) {
		nested.append($("<li class='battle-script-result battle-script-result-empty'></li>").text("Action order reset."));
	}
	for (var i = 0; i < group.messages.length; i++) {
		nested.append(createBattleScriptResultItem(group.messages[i]));
	}
	frame.append(nested);
	item.attr("data-line", group.lineNumber);
	item.append(frame);
	return item;
}

function renderBattleScriptResults(messages, options) {
	var results = $("#battle-script-results");
	battleScriptMessages = messages || [];
	results.empty();
	if (!battleScriptMessages.length) {
		results.append($("<li class='battle-script-result battle-script-result-empty'></li>").text(BATTLE_SCRIPT_EMPTY_TEXT));
		if (!options || !options.skipSave) saveBattleScriptState(battleScriptMessages);
		return;
	}
	var groups = getBattleScriptTimelineGroups(battleScriptMessages);
	for (var i = 0; i < groups.length; i++) {
		results.append(createBattleScriptTimelineGroup(groups[i], false));
	}
	if (!options || !options.skipSave) saveBattleScriptState(battleScriptMessages);
}

function updateBattleScriptCraftStatusText() {
	var dots = "";
	if (battleScriptCraftDots === 0 && battleScriptCraftTimer) {
		battleScriptCraftQuip = getNextBattleScriptCraftQuip();
	}
	for (var i = 0; i < battleScriptCraftDots + 1; i++) dots += ".";
	$(battleScriptCraftAnimationTarget).empty()
		.append($("<span class='battle-script-craft-quip-text'></span>")
			.text(battleScriptCraftQuip)
			.append($("<span class='battle-script-craft-dots'></span>").text(dots)));
	battleScriptCraftDots = (battleScriptCraftDots + 1) % 3;
}

function isBattleScriptGeneratedCraftQuipSource(source) {
	return !!(source && source.kind === "generated");
}

function resetBattleScriptGeneratedCraftQuipSource(source) {
	if (!isBattleScriptGeneratedCraftQuipSource(source)) return;
	source.buffer = [];
	source.comboCursor = Math.floor(Math.random() * Math.max(1, getBattleScriptGeneratedCraftQuipTotalCombos()));
	source.recent = {};
	source.recentPhrases = {};
	source.recentThemes = {};
	source.recentWords = {};
	source.recentQueue = [];
	source.recentPhraseQueue = [];
	source.recentThemeQueue = [];
	source.recentWordBuckets = [];
	source.seedCursor = 0;
}

function getBattleScriptCraftQuipWords(quip) {
	var matches = (quip || "").toString().toLowerCase().match(/[a-z0-9]+/g) || [];
	var words = [];
	var seen = {};
	for (var i = 0; i < matches.length; i++) {
		if (!matches[i] || seen[matches[i]]) continue;
		seen[matches[i]] = true;
		words.push(matches[i]);
	}
	return words;
}

function addBattleScriptCraftQuipPhrase(phrases, phrase) {
	phrase = normalizeBattleScriptText(phrase);
	if (phrase && phrases.indexOf(phrase) === -1) phrases.push(phrase);
}

function getBattleScriptCraftQuipPhrases(quip) {
	var normalized = normalizeBattleScriptText(quip);
	var phrases = [];
	if (!normalized) return phrases;
	if (/priority/.test(normalized)) addBattleScriptCraftQuipPhrase(phrases, "family:priority");
	if (/(?:legalmove|movelegality|everylegalmove)/.test(normalized)) addBattleScriptCraftQuipPhrase(phrases, "family:legalmove");
	if (/(?:contactpunishment|rockyhelmet|protectivepads)/.test(normalized)) addBattleScriptCraftQuipPhrase(phrases, "family:contact");
	if (/(?:hazard|entrypressure|entryhazard)/.test(normalized)) addBattleScriptCraftQuipPhrase(phrases, "family:hazards");
	if (/(?:searchpriorit|branchdominance|beforepruning)/.test(normalized)) addBattleScriptCraftQuipPhrase(phrases, "family:search");
	return phrases;
}

function getBattleScriptCraftQuipTheme(quip) {
	var normalized = normalizeBattleScriptText(quip);
	if (!normalized) return "";
	if (/(?:hazard|hazards|entrypressure|entryhazard)/.test(normalized)) return "entryhazards";
	if (/(?:weather|rain|sun|hail|sand|snow)/.test(normalized)) return "weather";
	if (/terrain/.test(normalized)) return "terrain";
	if (/(?:status|paralysis|poison|burn|sleep|freeze|berry)/.test(normalized)) return "status";
	if (/(?:switch|pivot|replacement)/.test(normalized)) return "switching";
	if (/(?:item|bag|powerherb)/.test(normalized)) return "items";
	for (var i = 0; i < BATTLE_SCRIPT_CRAFT_QUIP_SUBJECTS.length; i++) {
		if (normalized.indexOf(normalizeBattleScriptText(BATTLE_SCRIPT_CRAFT_QUIP_SUBJECTS[i])) !== -1) {
			return normalizeBattleScriptText(BATTLE_SCRIPT_CRAFT_QUIP_SUBJECTS[i]);
		}
	}
	return normalized;
}

function hasRecentBattleScriptCraftQuipPhrase(source, quip) {
	var phrases = getBattleScriptCraftQuipPhrases(quip);
	if (!phrases.length) return false;
	for (var i = 0; i < phrases.length; i++) {
		if (source.recentPhrases && source.recentPhrases[phrases[i]]) return true;
	}
	return false;
}

function hasRecentBattleScriptCraftQuipWord(source, quip) {
	var words = getBattleScriptCraftQuipWords(quip);
	if (!words.length) return false;
	for (var i = 0; i < words.length; i++) {
		if (source.recentWords && source.recentWords[words[i]]) return true;
	}
	return false;
}

function rememberBattleScriptGeneratedCraftQuip(source, quip) {
	var theme = getBattleScriptCraftQuipTheme(quip);
	var phrases = getBattleScriptCraftQuipPhrases(quip);
	var words = getBattleScriptCraftQuipWords(quip);
	if (!isBattleScriptGeneratedCraftQuipSource(source) || !quip || source.recent[quip]) return;
	source.recent[quip] = true;
	source.recentQueue.push(quip);
	if (theme) {
		source.recentThemes[theme] = true;
		source.recentThemeQueue.push(theme);
	}
	for (var i = 0; i < phrases.length; i++) {
		source.recentPhrases[phrases[i]] = true;
		source.recentPhraseQueue.push(phrases[i]);
	}
	if (words.length) {
		source.recentWordBuckets.push(words);
		for (var wordIndex = 0; wordIndex < words.length; wordIndex++) {
			source.recentWords[words[wordIndex]] = (source.recentWords[words[wordIndex]] || 0) + 1;
		}
	}
	while (source.recentQueue.length > BATTLE_SCRIPT_CRAFT_QUIP_RECENT_LIMIT) {
		delete source.recent[source.recentQueue.shift()];
	}
	while (source.recentPhraseQueue.length > BATTLE_SCRIPT_CRAFT_QUIP_RECENT_PHRASE_LIMIT) {
		var oldPhrase = source.recentPhraseQueue.shift();
		if (source.recentPhraseQueue.indexOf(oldPhrase) === -1) delete source.recentPhrases[oldPhrase];
	}
	while (source.recentThemeQueue.length > BATTLE_SCRIPT_CRAFT_QUIP_RECENT_THEME_LIMIT) {
		var oldTheme = source.recentThemeQueue.shift();
		if (source.recentThemeQueue.indexOf(oldTheme) === -1) delete source.recentThemes[oldTheme];
	}
	while (source.recentWordBuckets.length > BATTLE_SCRIPT_CRAFT_QUIP_RECENT_WORD_WINDOW) {
		var oldWords = source.recentWordBuckets.shift();
		for (var oldWordIndex = 0; oldWordIndex < oldWords.length; oldWordIndex++) {
			source.recentWords[oldWords[oldWordIndex]] = Math.max(0, (source.recentWords[oldWords[oldWordIndex]] || 0) - 1);
			if (!source.recentWords[oldWords[oldWordIndex]]) delete source.recentWords[oldWords[oldWordIndex]];
		}
	}
}

function getBattleScriptGeneratedCraftQuipTotalCombos() {
	return BATTLE_SCRIPT_CRAFT_QUIP_VERBS.length *
		BATTLE_SCRIPT_CRAFT_QUIP_SUBJECTS.length *
		BATTLE_SCRIPT_CRAFT_QUIP_ENDINGS.length;
}

function createBattleScriptGeneratedCraftQuip(source) {
	var total = getBattleScriptGeneratedCraftQuipTotalCombos();
	var attempts = 0;
	var fallback = "";
	if (!isBattleScriptGeneratedCraftQuipSource(source)) return "";
	while (source.seedCursor < BATTLE_SCRIPT_CRAFT_QUIP_SEEDS.length) {
		var seed = BATTLE_SCRIPT_CRAFT_QUIP_SEEDS[source.seedCursor++];
		var seedTheme = getBattleScriptCraftQuipTheme(seed);
		if (!source.recent[seed] && !source.recentThemes[seedTheme] &&
				!hasRecentBattleScriptCraftQuipPhrase(source, seed) &&
				!hasRecentBattleScriptCraftQuipWord(source, seed)) return seed;
	}
	while (attempts < total) {
		var combo = source.comboCursor % total;
		var endingIndex = combo % BATTLE_SCRIPT_CRAFT_QUIP_ENDINGS.length;
		var subjectIndex = Math.floor(combo / BATTLE_SCRIPT_CRAFT_QUIP_ENDINGS.length) % BATTLE_SCRIPT_CRAFT_QUIP_SUBJECTS.length;
		var verbIndex = Math.floor(combo / (BATTLE_SCRIPT_CRAFT_QUIP_ENDINGS.length * BATTLE_SCRIPT_CRAFT_QUIP_SUBJECTS.length)) %
			BATTLE_SCRIPT_CRAFT_QUIP_VERBS.length;
		var quip = BATTLE_SCRIPT_CRAFT_QUIP_VERBS[verbIndex] + " " +
			BATTLE_SCRIPT_CRAFT_QUIP_SUBJECTS[subjectIndex] + " " +
			BATTLE_SCRIPT_CRAFT_QUIP_ENDINGS[endingIndex];
		var theme = getBattleScriptCraftQuipTheme(quip);
		source.comboCursor = (source.comboCursor + BATTLE_SCRIPT_CRAFT_QUIP_STRIDE) % total;
		if (!fallback) fallback = quip;
		if (!source.recent[quip] && !source.recentThemes[theme] &&
				!hasRecentBattleScriptCraftQuipPhrase(source, quip) &&
				!hasRecentBattleScriptCraftQuipWord(source, quip)) return quip;
		attempts++;
	}
	return fallback || BATTLE_SCRIPT_CRAFT_QUIP_SEEDS[0] || "";
}

function refillBattleScriptGeneratedCraftQuipBuffer(source) {
	var guard = 0;
	if (!isBattleScriptGeneratedCraftQuipSource(source)) return;
	while (source.buffer.length < BATTLE_SCRIPT_CRAFT_QUIP_BUFFER_SIZE && guard < BATTLE_SCRIPT_CRAFT_QUIP_BUFFER_SIZE * 8) {
		var quip = createBattleScriptGeneratedCraftQuip(source);
		guard++;
		if (!quip || source.recent[quip]) continue;
		source.buffer.push(quip);
		rememberBattleScriptGeneratedCraftQuip(source, quip);
	}
}

function getNextBattleScriptGeneratedCraftQuip(source) {
	if (!isBattleScriptGeneratedCraftQuipSource(source)) return "";
	if (source.buffer.length <= BATTLE_SCRIPT_CRAFT_QUIP_REFILL_THRESHOLD) {
		refillBattleScriptGeneratedCraftQuipBuffer(source);
	}
	if (!source.buffer.length) return BATTLE_SCRIPT_CRAFT_QUIP_SEEDS[0] || "";
	return source.buffer.shift();
}

function shuffleBattleScriptCraftQuips() {
	var bag = battleScriptCraftQuipList && battleScriptCraftQuipList.slice ? battleScriptCraftQuipList.slice(0) : [];
	for (var i = bag.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = bag[i];
		bag[i] = bag[j];
		bag[j] = temp;
	}
	if (bag.length > 1 && bag[0] === battleScriptCraftLastQuip) {
		var swapIndex = Math.floor(Math.random() * (bag.length - 1)) + 1;
		var swap = bag[0];
		bag[0] = bag[swapIndex];
		bag[swapIndex] = swap;
	}
	return bag;
}

function getNextBattleScriptCraftQuip() {
	if (isBattleScriptGeneratedCraftQuipSource(battleScriptCraftQuipList)) {
		battleScriptCraftLastQuip = getNextBattleScriptGeneratedCraftQuip(battleScriptCraftQuipList);
		return battleScriptCraftLastQuip;
	}
	if (!battleScriptCraftQuipBag.length) {
		battleScriptCraftQuipBag = shuffleBattleScriptCraftQuips();
	}
	battleScriptCraftLastQuip = battleScriptCraftQuipBag.shift() || battleScriptCraftQuipList[0] || "";
	return battleScriptCraftLastQuip;
}

function startBattleScriptCraftAnimation(options) {
	options = options || {};
	stopBattleScriptCraftAnimation();
	battleScriptCraftAnimationTarget = options.target || "#battle-script-craft-status";
	battleScriptCraftQuipList = options.quips || BATTLE_SCRIPT_CRAFT_QUIPS;
	battleScriptCraftQuipBag = [];
	battleScriptCraftLastQuip = "";
	resetBattleScriptGeneratedCraftQuipSource(battleScriptCraftQuipList);
	battleScriptCraftDots = 0;
	battleScriptCraftQuip = getNextBattleScriptCraftQuip();
	updateBattleScriptCraftStatusText();
	battleScriptCraftTimer = window.setInterval(updateBattleScriptCraftStatusText, 350);
}

function stopBattleScriptCraftAnimation() {
	if (battleScriptCraftTimer) window.clearInterval(battleScriptCraftTimer);
	battleScriptCraftTimer = null;
}

function openBattleScriptCraftWindow() {
	$("#battle-script-craft").prop("hidden", false);
	keepBattleScriptWindowsInBounds();
}

function openBattleScriptCraftModePicker() {
	openBattleScriptCraftWindow();
	stopBattleScriptCraftAnimation();
	battleScriptCraftSearch = null;
	battleScriptCraftSuggestions = [];
	hideBattleScriptCraftProgress();
	setBattleScriptCraftResultMode("picker");
	$("#battle-script-craft-status").text("Choose Craft mode.");
	$("#battle-script-craft-mode-picker").prop("hidden", false);
	$("#battle-script-craft-actions").prop("hidden", true);
	$("#battle-script-craft-lines").prop("hidden", true).empty();
	$("#battle-script-craft-suggestions").prop("hidden", true).empty();
}

function closeBattleScriptCraftWindow() {
	stopBattleScriptCraftAnimation();
	battleScriptCraftSearch = null;
	battleScriptCraftSuggestions = [];
	hideBattleScriptCraftSuggestionMenu();
	hideBattleScriptCraftProgress();
	setBattleScriptCraftResultMode("");
	$("#battle-script-craft-mode-picker").prop("hidden", true);
	$("#battle-script-craft-lines").prop("hidden", true).empty();
	$("#battle-script-craft-suggestions").prop("hidden", true).empty();
	$("#battle-script-craft").prop("hidden", true);
	releaseBattleScriptClosedWindowFocus("#battle-script-craft", "#battle-script-craft-open");
}

function ensureBattleScriptCraftSuggestionMenu() {
	var menu = $("#battle-script-craft-suggestion-menu");
	if (menu.length) return menu;
	menu = $("<div id='battle-script-craft-suggestion-menu' class='doubles-slot-menu' role='menu' hidden></div>");
	menu.append("<button type='button' role='menuitem' data-action='implement'>Implement</button>");
	$("body").append(menu);
	menu.on("click", "button", function (event) {
		event.preventDefault();
		var index = ~~menu.attr("data-suggestion-index");
		hideBattleScriptCraftSuggestionMenu();
		implementBattleScriptCraftSuggestion(index);
	});
	return menu;
}

function hideBattleScriptCraftSuggestionMenu() {
	$("#battle-script-craft-suggestion-menu").attr("hidden", true).removeAttr("data-suggestion-index");
}

function showBattleScriptCraftSuggestionMenu(event, index) {
	var nativeEvent = event.originalEvent || event;
	var menu = ensureBattleScriptCraftSuggestionMenu();
	event.preventDefault();
	menu
		.attr("data-suggestion-index", index)
		.css({left: nativeEvent.pageX + "px", top: nativeEvent.pageY + "px"})
		.removeAttr("hidden");
}

function getBattleScriptTeamBoxButtonByFullSetName(fullSetName) {
	var match = null;
	$(".box-pokemon").each(function () {
		if (!match && $(this).attr("data-id") === fullSetName) match = this;
	});
	return match;
}

function getBattleScriptCurrentTeamIds() {
	var ids = [];
	$("#team-poke-list .box-pokemon").each(function () {
		ids.push($(this).attr("data-id"));
	});
	return ids;
}

function getBattleScriptCraftSuggestionFinalTeamIds(suggestion) {
	var teamLimit = getBattleScriptCraftSuggestionTeamLimit();
	var finalIds = getBattleScriptCurrentTeamIds().slice(0, teamLimit);
	var seen = {};
	for (var i = 0; i < suggestion.replacements.length; i++) {
		var replacement = suggestion.replacements[i];
		var candidateId = replacement.candidate && replacement.candidate.source;
		var replacedId = replacement.replaced && replacement.replaced.source;
		var targetIndex = replacedId ? finalIds.indexOf(replacedId) : -1;
		if (!candidateId) continue;
		if (targetIndex === -1 && replacement.replaceIndex < finalIds.length) targetIndex = replacement.replaceIndex;
		if (targetIndex >= 0 && targetIndex < finalIds.length) {
			finalIds[targetIndex] = candidateId;
		} else if (finalIds.length < teamLimit) {
			finalIds.push(candidateId);
		}
	}
	return finalIds.filter(function (id) {
		if (!id || seen[id]) return false;
		seen[id] = true;
		return true;
	}).slice(0, teamLimit);
}

function implementBattleScriptCraftSuggestion(index) {
	var suggestion = battleScriptCraftSuggestions[index];
	var team = document.getElementById("team-poke-list");
	var box = document.getElementById("box-poke-list");
	var finalTeamIds;
	var finalTeamMap = {};
	var currentTeamIds;
	if (!suggestion || !team || !box) return;
	finalTeamIds = getBattleScriptCraftSuggestionFinalTeamIds(suggestion);
	for (var i = 0; i < finalTeamIds.length; i++) {
		if (!getBattleScriptTeamBoxButtonByFullSetName(finalTeamIds[i])) {
			alert("Could not find " + finalTeamIds[i] + " in Team/Box.");
			return;
		}
		finalTeamMap[finalTeamIds[i]] = true;
	}
	for (var replacementIndex = 0; replacementIndex < suggestion.replacements.length; replacementIndex++) {
		var candidateId = suggestion.replacements[replacementIndex].candidate && suggestion.replacements[replacementIndex].candidate.source;
		var candidateButton = getBattleScriptTeamBoxButtonByFullSetName(candidateId);
		if (candidateButton && candidateButton.parentNode && candidateButton.parentNode.id !== "box-poke-list" &&
				candidateButton.parentNode.id !== "team-poke-list") {
			alert(candidateId + " is no longer in Box or Team.");
			return;
		}
	}
	currentTeamIds = getBattleScriptCurrentTeamIds();
	for (var currentIndex = 0; currentIndex < currentTeamIds.length; currentIndex++) {
		var currentButton = getBattleScriptTeamBoxButtonByFullSetName(currentTeamIds[currentIndex]);
		if (currentButton && !finalTeamMap[currentTeamIds[currentIndex]]) box.appendChild(currentButton);
	}
	for (var finalIndex = 0; finalIndex < finalTeamIds.length; finalIndex++) {
		var finalButton = getBattleScriptTeamBoxButtonByFullSetName(finalTeamIds[finalIndex]);
		if (finalButton) team.appendChild(finalButton);
	}
	if (window.saveTeamBoxLayout) window.saveTeamBoxLayout();
	if (window.refreshColorCode) window.refreshColorCode();
	if (window.performCalculations) window.performCalculations();
	refreshBattleScriptTeamStrip();
}

function renderBattleScriptCraftSuggestionPanels(suggestions) {
	var container = $("#battle-script-craft-suggestions");
	container.empty();
	if (!suggestions.length) {
		container.prop("hidden", true);
		return;
	}
	container.prop("hidden", false)
		.append($("<h3 class='battle-script-craft-suggestions-title'></h3>").text("BOX SWAP SUGGESTIONS"));
	for (var i = 0; i < suggestions.length; i++) {
		var suggestion = suggestions[i];
		var line = suggestion.line;
		var summary = line.summary || getBattleScriptCraftLineSummary(line.steps || line.script);
		var consistency = Math.round(line.consistency * 100);
		var details = $("<details class='battle-script-craft-suggestion'></details>");
		var body = $("<div class='battle-script-craft-suggestion-body'></div>");
		var title = suggestion.changeCount === 1 ?
			getBattleScriptCraftReplacementText(suggestion.replacements[0]) :
			suggestion.changeCount + " team changes";
		details.attr("data-index", i);
		details.append(
			$("<summary class='battle-script-craft-suggestion-summary'></summary>")
				.append($("<span class='battle-script-craft-suggestion-title'></span>").text("Suggestion " + (i + 1) + ": " + title))
				.append($("<span class='battle-script-craft-suggestion-danger'></span>").text(
					suggestion.dangerLabel + ", " + consistency + "% AI consistency" +
					(line.rollRisks ? ", " + line.rollRisks + " roll risk" + (line.rollRisks === 1 ? "" : "s") : "")
				))
		);
		body.append($("<span class='battle-script-craft-suggestion-section'></span>").text("Team changes"));
		for (var replacementIndex = 0; replacementIndex < suggestion.replacements.length; replacementIndex++) {
			body.append(
				$("<span class='battle-script-craft-suggestion-change'></span>")
					.text(getBattleScriptCraftReplacementText(suggestion.replacements[replacementIndex]))
			);
		}
		body.append($("<span class='battle-script-craft-suggestion-section'></span>").text("Line preview"))
			.append($("<span></span>").text(line.turns + " turn" + (line.turns === 1 ? "" : "s") +
				(line.rollRisks ? ", " + line.rollRisks + " roll risk" + (line.rollRisks === 1 ? "" : "s") : "")))
			.append($("<span></span>").text(summary.opening || "No preview available."))
			.append($("<span></span>").text(summary.finish ? "Finish: " + summary.finish : ""))
			.append($("<span></span>").text(summary.traits || ""));
		details.append(body);
		container.append(details);
	}
}

function renderBattleScriptCraftNoLineState(suggestions) {
	setBattleScriptCraftResultMode("empty");
	$("#battle-script-craft-status").text("NO WINNING LINES FOUND");
	$("#battle-script-craft-actions").prop("hidden", false);
	$("#battle-script-craft-show").prop("hidden", true);
	$("#battle-script-craft-dismiss").text("OH NO");
	$("#battle-script-craft-lines").prop("hidden", true).empty();
	renderBattleScriptCraftSuggestionPanels(suggestions || []);
}

function renderBattleScriptCraftLineButtons() {
	var container = $("#battle-script-craft-lines");
	container.empty();
	$("#battle-script-craft-suggestions").prop("hidden", true).empty();
	for (var i = 0; i < battleScriptCraftLines.length; i++) {
		var line = battleScriptCraftLines[i];
		var consistency = Math.round(line.consistency * 100);
		var summary = line.summary || getBattleScriptCraftLineSummary(line.steps || line.script);
		var details = $("<details class='battle-script-craft-line'></details>").attr("data-index", i);
		var detailsBody = $("<div class='battle-script-craft-line-body'></div>");
		if (i < 3) details.attr("open", "open");
		details.append(
			$("<summary class='battle-script-craft-line-summary'></summary>")
				.append($("<span class='battle-script-craft-line-title'></span>").text("Line " + (i + 1) + ": " + summary.lead))
				.append($("<span class='battle-script-craft-line-detail'></span>").text(
					consistency + "% AI consistency, " + line.turns + " turn" + (line.turns === 1 ? "" : "s") +
					(line.rollRisks ? ", " + line.rollRisks + " roll risk" + (line.rollRisks === 1 ? "" : "s") : "")
				))
		);
		detailsBody
			.append($("<span class='battle-script-craft-line-difference'></span>").text(summary.difference || "Distinct route."))
			.append($("<span class='battle-script-craft-line-preview'></span>").text(summary.opening || "No preview available."))
			.append($("<span class='battle-script-craft-line-finish'></span>").text(summary.finish ? "Finish: " + summary.finish : ""))
			.append($("<span class='battle-script-craft-line-traits'></span>").text(summary.traits || ""))
			.append($("<button type='button' class='battle-script-craft-line-load'></button>").attr("data-index", i).text("Load this line"));
		details.append(detailsBody);
		container.append(
			details
		);
	}
	container.prop("hidden", false);
}

function beginBattleScriptLineCraftSearch(mode) {
	setBattleScriptCraftProgress(1);
	battleScriptCraftSearch = createBattleScriptCraftSearch(null, {craftMode: mode});
	updateBattleScriptCraftProgress(battleScriptCraftSearch);
	scheduleBattleScriptCraftBatch(runBattleScriptLineCraftBatch);
}

function startBattleScriptLineCraft(mode) {
	mode = normalizeBattleScriptCraftMode(mode);
	openBattleScriptCraftWindow();
	setBattleScriptCraftResultMode("crafting");
	$("#battle-script-craft-mode-picker").prop("hidden", true);
	$("#battle-script-craft-actions").prop("hidden", true);
	$("#battle-script-craft-lines").prop("hidden", true).empty();
	$("#battle-script-craft-suggestions").prop("hidden", true).empty();
	$("#battle-script-craft-show").prop("hidden", false);
	$("#battle-script-craft-dismiss").text("Nah I dont need it");
	battleScriptCraftSuggestions = [];
	setBattleScriptCraftProgress(0);
	startBattleScriptCraftAnimation({
		target: "#battle-script-craft-status",
		quips: BATTLE_SCRIPT_CRAFT_QUIPS
	});
	scheduleBattleScriptCraftAfterPaint(function () {
		beginBattleScriptLineCraftSearch(mode);
	});
}

function applyBattleScriptCraftLine(index) {
	var line = battleScriptCraftLines[index];
	if (!line) return;
	battleScriptLoadedCraftLineReasons = copyBattleScriptCraftKeyMap(line.lineReasons || {});
	battleScriptLoadedCraftScriptText = normalizeBattleScriptCraftScript(line.script);
	$("#battle-script-input").val(line.script).trigger("input");
	hideBattleScriptAutocomplete();
}

function getBattleScriptAIModelName(modelId) {
	return BATTLE_SCRIPT_AI_MODELS[modelId] || BATTLE_SCRIPT_AI_MODELS[BATTLE_SCRIPT_DEFAULT_AI_MODEL];
}

function updateBattleScriptAIModelUI() {
	$("#battle-script-model-status").text(getBattleScriptAIModelName(battleScriptAIModel));
	$("#battle-script-model-menu button").each(function () {
		$(this).toggleClass("is-selected", $(this).attr("data-model") === battleScriptAIModel);
	});
}

function hideBattleScriptAIModelMenu() {
	$("#battle-script-model-menu").prop("hidden", true);
	$("#battle-script-model-open").attr("aria-expanded", "false");
	$(document).off(".battleScriptModelMenu");
}

function bindBattleScriptAIModelMenuDismiss() {
	$(document)
		.off(".battleScriptModelMenu")
		.on("mousedown.battleScriptModelMenu", function (event) {
			if ($(event.target).closest("#battle-script-model-menu, #battle-script-model-open").length) return;
			hideBattleScriptAIModelMenu();
		});
}

function toggleBattleScriptAIModelMenu(event) {
	if (event) {
		event.preventDefault();
		event.stopPropagation();
	}
	var menu = $("#battle-script-model-menu");
	var isHidden = menu.prop("hidden");
	menu.prop("hidden", !isHidden);
	$("#battle-script-model-open").attr("aria-expanded", isHidden ? "true" : "false");
	updateBattleScriptAIModelUI();
	if (isHidden) bindBattleScriptAIModelMenuDismiss();
	else hideBattleScriptAIModelMenu();
}

function selectBattleScriptAIModel(modelId) {
	if (!BATTLE_SCRIPT_AI_MODELS[modelId]) return;
	battleScriptAIModel = modelId;
	battleScriptMessages = [];
	battleScriptHasCalculatedSinceOpen = false;
	clearBattleScriptRuntimeState();
	updateBattleScriptAIModelUI();
	hideBattleScriptAIModelMenu();
	renderBattleScriptResults([]);
}

function getBattleScriptCurrentTemplate() {
	var playerTeam = getBattleScriptPlayerTeamPokemon();
	var trainerTeam = getBattleScriptTrainerTeamPokemon();
	var player = playerTeam[0] ? getBattleScriptTeamCommandName(playerTeam[0]) : "Player Pokemon";
	var trainer = trainerTeam[0] ? getBattleScriptTeamCommandName(trainerTeam[0]) : "Trainer Pokemon";
	return [
		"Fight start",
		"Player " + player + " in",
		"Trainer " + trainer + " in"
	].join("\n");
}

function getBattleScriptCurrentLineRange(textarea) {
	var value = textarea.value || "";
	var caret = typeof textarea.selectionStart === "number" ? textarea.selectionStart : value.length;
	var start = value.lastIndexOf("\n", caret - 1) + 1;
	var end = value.indexOf("\n", caret);
	if (end === -1) end = value.length;
	return {
		start: start,
		end: end,
		text: value.substring(start, end)
	};
}

function replaceBattleScriptCurrentLine(replacement) {
	var textarea = $("#battle-script-input")[0];
	var value;
	var lineRange;
	var nextValue;
	var caret;
	if (!textarea) return;
	value = textarea.value || "";
	lineRange = getBattleScriptCurrentLineRange(textarea);
	nextValue = value.substring(0, lineRange.start) + replacement + value.substring(lineRange.end);
	caret = lineRange.start + replacement.length;
	textarea.value = nextValue;
	textarea.focus();
	textarea.setSelectionRange(caret, caret);
	$("#battle-script-input").trigger("input");
	hideBattleScriptAutocomplete();
}

function insertBattleScriptLine(command) {
	var textarea = $("#battle-script-input")[0];
	var value;
	var start;
	var end;
	var before;
	var after;
	var insertion;
	var caret;
	if (!textarea) return;
	value = textarea.value || "";
	start = typeof textarea.selectionStart === "number" ? textarea.selectionStart : value.length;
	end = typeof textarea.selectionEnd === "number" ? textarea.selectionEnd : start;
	before = value.substring(0, start);
	after = value.substring(end);
	insertion = (before && !/\n$/.test(before) ? "\n" : "") + command + (after && !/^\n/.test(after) ? "\n" : "");
	textarea.value = before + insertion + after;
	caret = before.length + insertion.length;
	textarea.focus();
	textarea.setSelectionRange(caret, caret);
	$("#battle-script-input").trigger("input");
}

function getBattleScriptTextBeforeCaret() {
	var textarea = $("#battle-script-input")[0];
	var value;
	var caret;
	if (!textarea) return "";
	value = textarea.value || "";
	caret = typeof textarea.selectionStart === "number" ? textarea.selectionStart : value.length;
	return value.substring(0, caret);
}

function getBattleScriptActiveStateBeforeCaret() {
	var active = {player: false, opponent: false};
	var lines = getBattleScriptTextBeforeCaret().split(/\r?\n/);
	for (var i = 0; i < lines.length; i++) {
		var parsed = parseBattleScriptLine(lines[i]);
		switch (parsed.type) {
		case "start":
			active = {player: false, opponent: false};
			break;
		case "active":
		case "switch":
			active[parsed.side] = true;
			break;
		default:
			break;
		}
	}
	return active;
}

function getBattleScriptPlayerTeamPokemon() {
	var team = [];
	$("#team-poke-list .box-pokemon").each(function () {
		team.push({
			fullSetName: $(this).attr("data-id"),
			pokemonName: $(this).attr("data-pokemon")
		});
	});
	return team;
}

function getBattleScriptTrainerTeamPokemon() {
	var team = [];
	var trainerId = $("#trainer-selector").val();
	var entry = typeof getTrainerEntry === "function" ? getTrainerEntry(trainerId) : null;
	var trainer = typeof getTrainerPokemon === "function" ? getTrainerPokemon(entry) : [];
	for (var i = 0; i < trainer.length; i++) {
		var trainerPokemon = trainer[i];
		var fullSetName = addTrainerPokemonToDex(entry, trainerPokemon);
		if (!fullSetName) continue;
		team.push({
			fullSetName: fullSetName,
			pokemonName: getTrainerPokemonSpecies(trainerPokemon),
			label: getTrainerPokemonButtonLabel(trainerPokemon),
			detail: getTrainerPokemonLabel(trainerPokemon)
		});
	}
	return team;
}

function getBattleScriptTeamCommandName(teamMember) {
	return teamMember && (teamMember.pokemonName || teamMember.label || teamMember.fullSetName) ? (teamMember.pokemonName || teamMember.label || teamMember.fullSetName) : "";
}

function renderBattleScriptTeamStrip(strip, team, side) {
	var sideLabel = BATTLE_SCRIPT_SIDE_LABELS[side];
	strip.empty();
	for (var i = 0; i < team.length; i++) {
		var commandName = getBattleScriptTeamCommandName(team[i]);
		var button = $("<button type='button' class='battle-script-team-pokemon'></button>");
		button.attr("draggable", "true");
		button.attr("data-id", team[i].fullSetName);
		button.attr("data-pokemon", team[i].pokemonName);
		button.attr("data-command-name", commandName);
		button.attr("data-side", side);
		button.attr("title", "Drag to insert this " + sideLabel + " Pokemon into the script" + (team[i].detail ? "\n" + team[i].detail : ""));
		button.attr("aria-label", "Drag to insert " + sideLabel + " " + commandName + " into the script");
		button.append(createPokemonSprite(team[i].pokemonName, "trainer-pokemon-sprite"));
		strip.append(button);
	}
}

function refreshBattleScriptTeamStrip() {
	renderBattleScriptTeamStrip($("#battle-script-player-team-strip"), getBattleScriptPlayerTeamPokemon(), "player");
	renderBattleScriptTeamStrip($("#battle-script-trainer-team-strip"), getBattleScriptTrainerTeamPokemon(), "opponent");
}

function observeBattleScriptTeamStrip() {
	var teamList = document.getElementById("team-poke-list");
	var trainerTeam = document.getElementById("trainer-team");
	if (battleScriptTeamObserver) return;
	if (!teamList && !trainerTeam) return;
	battleScriptTeamObserver = new MutationObserver(refreshBattleScriptTeamStrip);
	if (teamList) battleScriptTeamObserver.observe(teamList, {childList: true});
	if (trainerTeam) battleScriptTeamObserver.observe(trainerTeam, {childList: true});
}

function addBattleScriptAutocompleteItem(items, text, detail, insertText) {
	var commandText = insertText || text;
	for (var i = 0; i < items.length; i++) {
		if (items[i].text === text && items[i].detail === detail && items[i].insertText === commandText) return;
	}
	items.push({text: text, detail: detail || "", insertText: commandText});
}

function getBattleScriptPokemonAutocompleteDetail(entry) {
	var name = getBattleScriptPokemonCommandName(entry);
	var details = [];
	if (entry && entry.label && normalizeBattleScriptText(entry.label) !== normalizeBattleScriptText(name)) {
		details.push(entry.label);
	}
	if (entry && entry.source &&
			normalizeBattleScriptText(entry.source) !== normalizeBattleScriptText(name) &&
			normalizeBattleScriptText(entry.source) !== normalizeBattleScriptText(entry.label)) {
		details.push(entry.source);
	}
	return details.join(", ");
}

function addBattleScriptRosterAutocomplete(items, roster, side, lineText) {
	var sideLabel = BATTLE_SCRIPT_SIDE_LABELS[side];
	for (var i = 0; i < roster.length; i++) {
		var name = getBattleScriptPokemonCommandName(roster[i]);
		var detail = getBattleScriptPokemonAutocompleteDetail(roster[i]);
		addBattleScriptAutocompleteItem(items, sideLabel + " " + name + " in", detail || "Set active " + sideLabel + " Pokemon");
		addBattleScriptAutocompleteItem(items, sideLabel + " switch to " + name, detail || "Switch active " + sideLabel + " Pokemon");
		addBattleScriptAutocompleteItem(items, sideLabel + " " + name + " faints", detail || "Mark " + sideLabel + " Pokemon fainted");
		if (lineText.toLowerCase().indexOf("uses") !== -1) {
			addBattleScriptMoveAutocomplete(items, roster[i]);
		}
	}
}

function addBattleScriptMoveAutocomplete(items, entry) {
	if (!entry || !entry.pokemon || !entry.pokemon.moves) return;
	var commandName = getBattleScriptPokemonCommandName(entry);
	var detail = getBattleScriptPokemonAutocompleteDetail(entry);
	for (var i = 0; i < entry.pokemon.moves.length; i++) {
		var move = entry.pokemon.moves[i];
		if (!move || !move.name || move.name === "(No Move)") continue;
		addBattleScriptAutocompleteItem(items, commandName + " uses " + move.name, detail || "Calculate move damage");
	}
}

function getBattleScriptAutocompleteItems(lineText) {
	var items = [];
	var rosters = getBattleScriptRosters();
	var normalizedLine = normalizeBattleScriptText(lineText);
	addBattleScriptAutocompleteItem(items, "Fight start", "Reset battle state");
	addBattleScriptAutocompleteItem(items, "Turn 1", "Start a turn and reset action order");
	addBattleScriptAutocompleteItem(items, "Weather Rain 5", "Set simulator weather and remaining turns");
	addBattleScriptAutocompleteItem(items, "Terrain Electric 5", "Set simulator terrain and remaining turns");
	addBattleScriptAutocompleteItem(items, "Player side: Stealth Rock, Spikes 1, Toxic Spikes 1", "Set mapped Player side hazards");
	addBattleScriptAutocompleteItem(items, "Trainer side: Reflect 5, Tailwind 4", "Set mapped Trainer side conditions");
	addBattleScriptAutocompleteItem(items, "Field Gravity 5", "Set a mapped global field effect");
	addBattleScriptAutocompleteItem(items, "Field Trick Room 5", "Set simulator action order and remaining turns");
	addBattleScriptAutocompleteItem(items, "Clear Trainer side", "Clear mapped Trainer side conditions");
	addBattleScriptRosterAutocomplete(items, rosters.player, "player", lineText);
	addBattleScriptRosterAutocomplete(items, rosters.opponent, "opponent", lineText);
	for (var side in rosters) {
		if (!Object.prototype.hasOwnProperty.call(rosters, side)) continue;
		for (var i = 0; i < rosters[side].length; i++) {
			addBattleScriptMoveAutocomplete(items, rosters[side][i]);
		}
	}
	if (normalizedLine) {
		items = $.grep(items, function (item) {
			return normalizeBattleScriptText(item.text + " " + item.detail).indexOf(normalizedLine) !== -1;
		});
	}
	return items.slice(0, BATTLE_SCRIPT_AUTOCOMPLETE_LIMIT);
}

function getBattleScriptTeamDropCommand(side, commandName) {
	var active = getBattleScriptActiveStateBeforeCaret();
	var sideLabel = BATTLE_SCRIPT_SIDE_LABELS[side] || BATTLE_SCRIPT_SIDE_LABELS.player;
	return sideLabel + " " + (active[side] ? "switch to " : "") + commandName + (active[side] ? "" : " in");
}

function hideBattleScriptAutocomplete() {
	battleScriptAutocompleteItems = [];
	battleScriptAutocompleteIndex = 0;
	$("#battle-script-autocomplete").prop("hidden", true).empty();
	$(document).off(".battleScriptAutocomplete");
}

function bindBattleScriptAutocompleteDismiss() {
	$(document)
		.off(".battleScriptAutocomplete")
		.on("mousedown.battleScriptAutocomplete", function (event) {
			if ($(event.target).closest("#battle-script-autocomplete").length) return;
			hideBattleScriptAutocomplete();
		});
}

function renderBattleScriptAutocomplete(items) {
	var list = $("#battle-script-autocomplete");
	list.empty();
	if (!items.length) {
		hideBattleScriptAutocomplete();
		return;
	}
	battleScriptAutocompleteItems = items;
	if (battleScriptAutocompleteIndex >= items.length) battleScriptAutocompleteIndex = 0;
	for (var i = 0; i < items.length; i++) {
		var option = $("<button type='button' class='battle-script-autocomplete-option'></button>");
		option.attr("role", "option");
		option.attr("data-index", i);
		option.toggleClass("is-selected", i === battleScriptAutocompleteIndex);
		option.append($("<span class='battle-script-autocomplete-main'></span>").text(items[i].text));
		if (items[i].detail) option.append($("<span class='battle-script-autocomplete-detail'></span>").text(items[i].detail));
		list.append(option);
	}
	list.prop("hidden", false);
	bindBattleScriptAutocompleteDismiss();
}

function updateBattleScriptAutocomplete() {
	var textarea = $("#battle-script-input")[0];
	var lineRange;
	if (!textarea || $("#battle-script").prop("hidden")) return;
	lineRange = getBattleScriptCurrentLineRange(textarea);
	renderBattleScriptAutocomplete(getBattleScriptAutocompleteItems(lineRange.text));
}

function applyBattleScriptAutocomplete(index) {
	var item = battleScriptAutocompleteItems[index];
	if (!item) return;
	replaceBattleScriptCurrentLine(item.insertText || item.text);
}

function getBattleScriptViewportSize() {
	return {
		width: window.innerWidth || document.documentElement.clientWidth || 1024,
		height: window.innerHeight || document.documentElement.clientHeight || 768
	};
}

function clampBattleScriptWindowValue(value, min, max) {
	if (max < min) return min;
	return Math.max(min, Math.min(max, value));
}

function canBattleScriptElementScroll(element, deltaY) {
	var overflowY;
	if (!element || element.scrollHeight <= element.clientHeight) return false;
	overflowY = window.getComputedStyle ? window.getComputedStyle(element).overflowY : $(element).css("overflow-y");
	if (["auto", "scroll", "overlay"].indexOf(overflowY) === -1 && element.tagName !== "TEXTAREA") return false;
	if (deltaY < 0) return element.scrollTop > 0;
	if (deltaY > 0) return element.scrollTop + element.clientHeight < element.scrollHeight;
	return false;
}

function findBattleScriptScrollableElement(target, boundary, deltaY) {
	var element = target;
	while (element && element !== boundary) {
		if (canBattleScriptElementScroll(element, deltaY)) return element;
		element = element.parentElement;
	}
	return canBattleScriptElementScroll(boundary, deltaY) ? boundary : null;
}

function containBattleScriptWindowWheel(event) {
	var originalEvent = event.originalEvent || event;
	var scrollable = findBattleScriptScrollableElement(event.target, this, originalEvent.deltaY || 0);
	if (scrollable) {
		event.stopPropagation();
		return;
	}
	event.preventDefault();
	event.stopPropagation();
}

function positionBattleScriptWindow(windowElement, left, top) {
	var viewport = getBattleScriptViewportSize();
	var width = windowElement.outerWidth();
	var height = windowElement.outerHeight();
	windowElement.css({
		left: clampBattleScriptWindowValue(left, 0, viewport.width - width) + "px",
		top: clampBattleScriptWindowValue(top, 0, viewport.height - height) + "px",
		transform: "none"
	});
}

function beginBattleScriptWindowDrag(event) {
	var target = $(event.target);
	var windowElement = target.closest(".notes-window");
	var rect;
	if (target.closest("button, input, select, textarea, a").length || !windowElement.length) return;
	rect = windowElement[0].getBoundingClientRect();
	battleScriptDragState = {
		windowElement: windowElement,
		offsetX: event.clientX - rect.left,
		offsetY: event.clientY - rect.top
	};
	event.preventDefault();
	$(document)
		.off(".battleScriptDrag")
		.on("mousemove.battleScriptDrag", dragBattleScriptWindow)
		.on("mouseup.battleScriptDrag", endBattleScriptWindowDrag);
}

function dragBattleScriptWindow(event) {
	if (!battleScriptDragState) return;
	positionBattleScriptWindow(
		battleScriptDragState.windowElement,
		event.clientX - battleScriptDragState.offsetX,
		event.clientY - battleScriptDragState.offsetY
	);
}

function endBattleScriptWindowDrag() {
	battleScriptDragState = null;
	$(document).off(".battleScriptDrag");
}

function keepBattleScriptWindowsInBounds() {
	var battleScriptRect;
	var craftRect;
	var guideRect;
	if (!$("#battle-script").prop("hidden")) {
		battleScriptRect = $("#battle-script")[0].getBoundingClientRect();
		positionBattleScriptWindow($("#battle-script"), battleScriptRect.left, battleScriptRect.top);
	}
	if (!$("#battle-script-craft").prop("hidden")) {
		craftRect = $("#battle-script-craft")[0].getBoundingClientRect();
		positionBattleScriptWindow($("#battle-script-craft"), craftRect.left, craftRect.top);
	}
	if (!$("#battle-script-guide").prop("hidden")) {
		guideRect = $("#battle-script-guide")[0].getBoundingClientRect();
		positionBattleScriptWindow($("#battle-script-guide"), guideRect.left, guideRect.top);
	}
}

function observeBattleScriptWindowResize() {
	var battleScriptElement = $("#battle-script")[0];
	if (!battleScriptElement || !window.ResizeObserver || battleScriptResizeObserver) return;
	battleScriptResizeObserver = new window.ResizeObserver(function () {
		keepBattleScriptWindowsInBounds();
	});
	battleScriptResizeObserver.observe(battleScriptElement);
}

function releaseBattleScriptClosedWindowFocus(windowSelector, fallbackSelector) {
	var active = document.activeElement;
	if (battleScriptDragState) endBattleScriptWindowDrag();
	if (active && $(active).closest(windowSelector).length && typeof active.blur === "function") active.blur();
	if (!fallbackSelector) return;
	window.setTimeout(function () {
		var fallback = $(fallbackSelector);
		if (fallback.length && !fallback.prop("hidden") && fallback.is(":visible")) fallback.focus();
	}, 0);
}

function closeBattleScriptGuide() {
	$("#battle-script-guide").prop("hidden", true);
	releaseBattleScriptClosedWindowFocus("#battle-script-guide", "#battle-script-guide-open");
}

function openBattleScriptGuide(event) {
	if (event) {
		event.preventDefault();
		event.stopPropagation();
	}
	$("#battle-script-guide").prop("hidden", false);
	keepBattleScriptWindowsInBounds();
	$("#battle-script-guide").find(".battle-script-guide-close").focus();
}

function restoreBattleScriptState() {
	var savedState = getSavedBattleScriptState();
	var savedMessages = savedState && $.isArray(savedState.messages) ? savedState.messages : [];
	if (savedState && typeof savedState.script === "string") $("#battle-script-input").val(savedState.script);
	if (savedState && BATTLE_SCRIPT_AI_MODELS[savedState.aiModel]) battleScriptAIModel = savedState.aiModel;
	updateBattleScriptAIModelUI();
	renderBattleScriptResults(savedMessages, {skipSave: true});
	updateBattleScriptSyntaxStatus();
}

function closeBattleScriptWindow() {
	$("#battle-script").prop("hidden", true);
	$("#battle-script-open").attr("aria-expanded", "false");
	clearBattleScriptRuntimeState();
	hideBattleScriptAutocomplete();
	hideBattleScriptAIModelMenu();
	closeBattleScriptGuide();
	closeBattleScriptCraftWindow();
	releaseBattleScriptClosedWindowFocus("#battle-script, #battle-script-guide, #battle-script-craft", "#battle-script-open");
}

function isBattleScriptAvailableForActiveProfile() {
	var registry = window.kmRomHackRegistry;
	var profile = registry && typeof registry.getActiveProfile === "function" ? registry.getActiveProfile() : null;
	return !!(profile && profile.features &&
		profile.features.battleSimulator === BATTLE_SCRIPT_PROFILE_CAPABILITY);
}

function updateBattleScriptProfileAvailability() {
	var available = isBattleScriptAvailableForActiveProfile();
	$("#battle-script-open").prop("hidden", !available);
	if (!available) closeBattleScriptWindow();
}

function openBattleScriptWindow(event) {
	if (event) {
		event.preventDefault();
		event.stopPropagation();
	}
	if (!isBattleScriptAvailableForActiveProfile()) return;
	$("#battle-script").prop("hidden", false);
	$("#battle-script-open").attr("aria-expanded", "true");
	battleScriptHasCalculatedSinceOpen = false;
	refreshBattleScriptTeamStrip();
	keepBattleScriptWindowsInBounds();
	$("#battle-script").find(".battle-script-close").focus();
}

$(document).ready(function () {
	restoreBattleScriptState();
	refreshBattleScriptTeamStrip();
	observeBattleScriptTeamStrip();
	observeBattleScriptWindowResize();
	$("#battle-script-open").click(openBattleScriptWindow);
	updateBattleScriptProfileAvailability();
	$("#battle-script .battle-script-close").click(closeBattleScriptWindow);
	$("#battle-script-guide-open").click(openBattleScriptGuide);
	$("#battle-script-guide .battle-script-guide-close").click(closeBattleScriptGuide);
	$("#battle-script-craft-open").click(openBattleScriptCraftModePicker);
	$("#battle-script-craft .battle-script-craft-close").click(closeBattleScriptCraftWindow);
	$("#battle-script-craft-mode-picker").on("click", ".battle-script-craft-mode", function () {
		startBattleScriptLineCraft($(this).attr("data-craft-mode"));
	});
	$("#battle-script-craft-show").click(renderBattleScriptCraftLineButtons);
	$("#battle-script-craft-dismiss").click(closeBattleScriptCraftWindow);
	$("#battle-script-craft-lines").on("click", ".battle-script-craft-line-load", function () {
		applyBattleScriptCraftLine(~~$(this).attr("data-index"));
	});
	$("#battle-script-craft-suggestions").on("contextmenu", ".battle-script-craft-suggestion", function (event) {
		showBattleScriptCraftSuggestionMenu(event, ~~$(this).attr("data-index"));
	});
	$(document).on("mousedown.battleScriptCraftSuggestionMenu", function (event) {
		if ($(event.target).closest("#battle-script-craft-suggestion-menu, .battle-script-craft-suggestion").length) return;
		hideBattleScriptCraftSuggestionMenu();
	});
	$(document).on("keydown.battleScriptCraftSuggestionMenu", function (event) {
		if (event.key === "Escape") hideBattleScriptCraftSuggestionMenu();
	});
	$("#battle-script-model-open").click(toggleBattleScriptAIModelMenu);
	$("#battle-script-model-menu").on("mousedown", "button", function (event) {
		event.preventDefault();
		event.stopPropagation();
		selectBattleScriptAIModel($(this).attr("data-model"));
	});
	$("#battle-script .battle-script-header, #battle-script-guide .notes-window-header, #battle-script-craft .notes-window-header").on("mousedown", beginBattleScriptWindowDrag);
	$("#battle-script, #battle-script-craft").on("wheel", containBattleScriptWindowWheel);
	$(window).on("scroll.battleScriptCraftSuggestionMenu resize.battleScriptCraftSuggestionMenu", hideBattleScriptCraftSuggestionMenu);
	$(window).on("resize.battleScriptWindows", keepBattleScriptWindowsInBounds);
	$("#battle-script-input").on("input", function () {
		saveBattleScriptState(battleScriptMessages);
		updateBattleScriptSyntaxStatus();
		updateBattleScriptAutocomplete();
	});
	$("#battle-script-input").on("keydown", function (event) {
		if ($("#battle-script-autocomplete").prop("hidden")) return;
		if (event.which === 38 || event.which === 40) {
			event.preventDefault();
			battleScriptAutocompleteIndex += event.which === 38 ? -1 : 1;
			if (battleScriptAutocompleteIndex < 0) battleScriptAutocompleteIndex = battleScriptAutocompleteItems.length - 1;
			if (battleScriptAutocompleteIndex >= battleScriptAutocompleteItems.length) battleScriptAutocompleteIndex = 0;
			renderBattleScriptAutocomplete(battleScriptAutocompleteItems);
		} else if (event.which === 9 || event.which === 13) {
			event.preventDefault();
			applyBattleScriptAutocomplete(battleScriptAutocompleteIndex);
		} else if (event.which === 27) {
			hideBattleScriptAutocomplete();
		}
	});
	$("#battle-script-autocomplete").on("mousedown", ".battle-script-autocomplete-option", function (event) {
		event.preventDefault();
		event.stopPropagation();
		applyBattleScriptAutocomplete(~~$(this).attr("data-index"));
	});
	$(".battle-script-team-strip").on("dragstart", ".battle-script-team-pokemon", function (event) {
		var originalEvent = event.originalEvent || event;
		var side = $(this).attr("data-side") || "player";
		var commandName = $(this).attr("data-command-name") || $(this).attr("data-pokemon");
		if (!originalEvent.dataTransfer) return;
		originalEvent.dataTransfer.effectAllowed = "copy";
		originalEvent.dataTransfer.setData("text/plain", getBattleScriptTeamDropCommand(side, commandName));
		originalEvent.dataTransfer.setData("text/x-battle-script-side", side);
		originalEvent.dataTransfer.setData("text/x-battle-script-command-name", commandName);
	});
	$("#battle-script-input, .battle-script-editor").on("dragover", function (event) {
		var originalEvent = event.originalEvent || event;
		event.preventDefault();
		event.stopPropagation();
		if (originalEvent.dataTransfer) originalEvent.dataTransfer.dropEffect = "copy";
	});
	$("#battle-script-input, .battle-script-editor").on("drop", function (event) {
		var originalEvent = event.originalEvent || event;
		var command;
		var commandName;
		var side;
		event.preventDefault();
		event.stopPropagation();
		if (!originalEvent.dataTransfer) return;
		side = originalEvent.dataTransfer.getData("text/x-battle-script-side");
		commandName = originalEvent.dataTransfer.getData("text/x-battle-script-command-name");
		command = side && commandName ? getBattleScriptTeamDropCommand(side, commandName) : originalEvent.dataTransfer.getData("text/plain");
		if (command) insertBattleScriptLine(command);
	});
	$("#battle-script-run").click(function () {
		if (battleScriptHasCalculatedSinceOpen && !window.confirm("Recalculate the simulator timeline? This will replace the current timeline.")) return;
		updateBattleScriptSyntaxStatus();
		renderBattleScriptResults(runBattleScript($("#battle-script-input").val()));
		battleScriptHasCalculatedSinceOpen = true;
	});
	$("#battle-script-clear").click(function () {
		$("#battle-script-input").val("");
		battleScriptMessages = [];
		clearBattleScriptRuntimeState();
		clearBattleScriptState();
		renderBattleScriptResults([], {skipSave: true});
		updateBattleScriptSyntaxStatus();
		hideBattleScriptAutocomplete();
	});
	$("#battle-script-load-current").click(function () {
		$("#battle-script-input").val(getBattleScriptCurrentTemplate());
		updateBattleScriptSyntaxStatus();
		renderBattleScriptResults(runBattleScript($("#battle-script-input").val()));
	});
	$("#trainer-selector").on("change.battleScriptTeam", refreshBattleScriptTeamStrip);
});

window.addEventListener("kmcalculator:romhackchange", updateBattleScriptProfileAvailability);
