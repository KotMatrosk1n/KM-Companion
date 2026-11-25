/*global window */
/*
Sword/Shield reference text and move details. Asset and text credits: CREDITS.md.
Official game text and PokéSprite artwork: Nintendo / Creatures Inc. / GAME FREAK inc.
Move effect text and accuracy adapted from Pokémon Showdown, with Generation 8 overrides.

The MIT License (MIT)

Copyright (c) 2011-2026 Guangcong Luo and other contributors http://pokemonshowdown.com/

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
window.KMCalculatorTooltipData = window.KMCalculatorTooltipData || {};
window.KMCalculatorTooltipData.swsh = {
	"generation": 8,
	"aliases": {
		"galewngs": "galewings",
		"psychicfang": "psychicfangs",
		"spatialrend": "spacialrend"
	},
	"abilities": {
		"adaptability": {
			"name": "Adaptability",
			"description": "Powers up moves of the same type as the Pokémon."
		},
		"aftermath": {
			"name": "Aftermath",
			"description": "Damages the attacker if it contacts the Pokémon with a finishing hit."
		},
		"analytic": {
			"name": "Analytic",
			"description": "Boosts move power when the Pokémon moves last."
		},
		"angerpoint": {
			"name": "Anger Point",
			"description": "The Pokémon is angered when it takes a critical hit, and that maxes its Attack stat."
		},
		"arenatrap": {
			"name": "Arena Trap",
			"description": "Prevents opposing Pokémon from fleeing."
		},
		"aromaveil": {
			"name": "Aroma Veil",
			"description": "Protects itself and its allies from attacks that limit their move choices."
		},
		"asone": {
			"name": "As One",
			"description": "This Ability combines the effects of both Calyrex’s Unnerve Ability and Glastrier’s Chilling Neigh Ability.",
			"forms": {
				"calyrex-ice": "This Ability combines the effects of both Calyrex’s Unnerve Ability and Glastrier’s Chilling Neigh Ability.",
				"calyrex-shadow": "This Ability combines the effects of both Calyrex’s Unnerve Ability and Spectrier’s Grim Neigh Ability."
			}
		},
		"aurabreak": {
			"name": "Aura Break",
			"description": "The effects of “Aura” Abilities are reversed to lower the power of affected moves."
		},
		"battlearmor": {
			"name": "Battle Armor",
			"description": "Hard armor protects the Pokémon from critical hits."
		},
		"beastboost": {
			"name": "Beast Boost",
			"description": "The Pokémon boosts its most proficient stat each time it knocks out a Pokémon."
		},
		"berserk": {
			"name": "Berserk",
			"description": "Boosts the Pokémon’s Sp. Atk stat when it takes a hit that causes its HP to become half or less."
		},
		"bigpecks": {
			"name": "Big Pecks",
			"description": "Protects the Pokémon from Defense-lowering effects."
		},
		"bulletproof": {
			"name": "Bulletproof",
			"description": "Protects the Pokémon from some ball and bomb moves."
		},
		"cheekpouch": {
			"name": "Cheek Pouch",
			"description": "Restores HP as well when the Pokémon eats a Berry."
		},
		"chlorophyll": {
			"name": "Chlorophyll",
			"description": "Boosts the Pokémon’s Speed stat in harsh sunlight."
		},
		"clearbody": {
			"name": "Clear Body",
			"description": "Prevents other Pokémon’s moves or Abilities from lowering the Pokémon’s stats."
		},
		"competitive": {
			"name": "Competitive",
			"description": "Boosts the Sp. Atk stat sharply when a stat is lowered."
		},
		"compoundeyes": {
			"name": "Compound Eyes",
			"description": "The Pokémon’s compound eyes boost its accuracy."
		},
		"contrary": {
			"name": "Contrary",
			"description": "Makes stat changes have an opposite effect."
		},
		"corrosion": {
			"name": "Corrosion",
			"description": "The Pokémon can poison the target even if it’s a Steel or Poison type."
		},
		"cottondown": {
			"name": "Cotton Down",
			"description": "When the Pokémon is hit by an attack, it scatters cotton fluff around and lowers the Speed stat of all Pokémon except itself."
		},
		"cursedbody": {
			"name": "Cursed Body",
			"description": "May disable a move used on the Pokémon."
		},
		"cutecharm": {
			"name": "Cute Charm",
			"description": "Contact with the Pokémon may cause infatuation."
		},
		"darkaura": {
			"name": "Dark Aura",
			"description": "Powers up each Pokémon’s Dark-type moves."
		},
		"dauntlessshield": {
			"name": "Dauntless Shield",
			"description": "Boosts the Pokémon’s Defense stat when the Pokémon enters a battle."
		},
		"defeatist": {
			"name": "Defeatist",
			"description": "Halves the Pokémon’s Attack and Sp. Atk stats when its HP becomes half or less."
		},
		"defiant": {
			"name": "Defiant",
			"description": "Boosts the Pokémon’s Attack stat sharply when its stats are lowered."
		},
		"deltastream": {
			"name": "Delta Stream",
			"description": "The Pokémon changes the weather to eliminate all of the Flying type’s weaknesses."
		},
		"desolateland": {
			"name": "Desolate Land",
			"description": "The Pokémon changes the weather to nullify Water-type attacks."
		},
		"disguise": {
			"name": "Disguise",
			"description": "Once per battle, the shroud that covers the Pokémon can protect it from an attack."
		},
		"download": {
			"name": "Download",
			"description": "Compares an opposing Pokémon’s Defense and Sp. Def stats before raising its own Attack or Sp. Atk stat—whichever will be more effective."
		},
		"dragonsmaw": {
			"name": "Dragon’s Maw",
			"description": "Powers up Dragon-type moves."
		},
		"drizzle": {
			"name": "Drizzle",
			"description": "The Pokémon makes it rain when it enters a battle."
		},
		"drought": {
			"name": "Drought",
			"description": "Turns the sunlight harsh when the Pokémon enters a battle."
		},
		"dryskin": {
			"name": "Dry Skin",
			"description": "Restores HP in rain or when hit by Water-type moves. Reduces HP in harsh sunlight, and increases the damage received from Fire-type moves."
		},
		"effectspore": {
			"name": "Effect Spore",
			"description": "Contact with the Pokémon may inflict poison, sleep, or paralysis on its attacker."
		},
		"electricsurge": {
			"name": "Electric Surge",
			"description": "Turns the ground into Electric Terrain when the Pokémon enters a battle."
		},
		"emergencyexit": {
			"name": "Emergency Exit",
			"description": "The Pokémon, sensing danger, switches out when its HP becomes half or less."
		},
		"fairyaura": {
			"name": "Fairy Aura",
			"description": "Powers up each Pokémon’s Fairy-type moves."
		},
		"filter": {
			"name": "Filter",
			"description": "Reduces the power of supereffective attacks taken."
		},
		"flamebody": {
			"name": "Flame Body",
			"description": "Contact with the Pokémon may burn the attacker."
		},
		"flashfire": {
			"name": "Flash Fire",
			"description": "Powers up the Pokémon’s Fire-type moves if it’s hit by one."
		},
		"flowergift": {
			"name": "Flower Gift",
			"description": "Boosts the Attack and Sp. Def stats of itself and allies in harsh sunlight."
		},
		"fluffy": {
			"name": "Fluffy",
			"description": "Halves the damage taken from moves that make direct contact, but doubles that of Fire-type moves."
		},
		"frisk": {
			"name": "Frisk",
			"description": "When it enters a battle, the Pokémon can check an opposing Pokémon’s held item."
		},
		"furcoat": {
			"name": "Fur Coat",
			"description": "Halves the damage from physical moves."
		},
		"galewings": {
			"name": "Gale Wings",
			"description": "Gives priority to Flying-type moves when the Pokémon’s HP is full."
		},
		"gluttony": {
			"name": "Gluttony",
			"description": "Makes the Pokémon eat a held Berry when its HP drops to half or less, which is sooner than usual."
		},
		"gooey": {
			"name": "Gooey",
			"description": "Contact with the Pokémon lowers the attacker’s Speed stat."
		},
		"grassysurge": {
			"name": "Grassy Surge",
			"description": "Turns the ground into Grassy Terrain when the Pokémon enters a battle."
		},
		"grimneigh": {
			"name": "Grim Neigh",
			"description": "When the Pokémon knocks out a target, it utters a terrifying neigh, which boosts its Sp. Atk stat."
		},
		"gulpmissile": {
			"name": "Gulp Missile",
			"description": "When the Pokémon uses Surf or Dive, it will come back with prey. When it takes damage, it will spit out the prey to attack."
		},
		"guts": {
			"name": "Guts",
			"description": "It’s so gutsy that having a status condition boosts the Pokémon’s Attack stat."
		},
		"harvest": {
			"name": "Harvest",
			"description": "May create another Berry after one is used."
		},
		"healer": {
			"name": "Healer",
			"description": "Sometimes heals an ally’s status condition."
		},
		"heatproof": {
			"name": "Heatproof",
			"description": "The heatproof body of the Pokémon halves the damage from Fire-type moves that hit it."
		},
		"heavymetal": {
			"name": "Heavy Metal",
			"description": "Doubles the Pokémon’s weight."
		},
		"hugepower": {
			"name": "Huge Power",
			"description": "Doubles the Pokémon’s Attack stat."
		},
		"hungerswitch": {
			"name": "Hunger Switch",
			"description": "The Pokémon changes its form, alternating between its Full Belly Mode and Hangry Mode after the end of each turn."
		},
		"hustle": {
			"name": "Hustle",
			"description": "Boosts the Attack stat, but lowers accuracy."
		},
		"hydration": {
			"name": "Hydration",
			"description": "Heals status conditions if it’s raining."
		},
		"icebody": {
			"name": "Ice Body",
			"description": "The Pokémon gradually regains HP in a hailstorm."
		},
		"iceface": {
			"name": "Ice Face",
			"description": "The Pokémon’s ice head can take a physical attack as a substitute, but the attack also changes the Pokémon’s appearance. The ice will be restored when it hails."
		},
		"icescales": {
			"name": "Ice Scales",
			"description": "The Pokémon is protected by ice scales, which halve the damage taken from special moves."
		},
		"illusion": {
			"name": "Illusion",
			"description": "Comes out disguised as the Pokémon in the party’s last spot."
		},
		"imposter": {
			"name": "Imposter",
			"description": "The Pokémon transforms itself into the Pokémon it’s facing."
		},
		"infiltrator": {
			"name": "Infiltrator",
			"description": "Passes through the opposing Pokémon’s barrier, substitute, and the like and strikes."
		},
		"innardsout": {
			"name": "Innards Out",
			"description": "Damages the attacker landing the finishing hit by the amount equal to its last HP."
		},
		"innerfocus": {
			"name": "Inner Focus",
			"description": "The Pokémon’s intensely focused, and that protects the Pokémon from flinching."
		},
		"intimidate": {
			"name": "Intimidate",
			"description": "The Pokémon intimidates opposing Pokémon upon entering battle, lowering their Attack stat."
		},
		"intrepidsword": {
			"name": "Intrepid Sword",
			"description": "Boosts the Pokémon’s Attack stat when the Pokémon enters a battle."
		},
		"ironbarbs": {
			"name": "Iron Barbs",
			"description": "Inflicts damage on the attacker upon contact with iron barbs."
		},
		"ironfist": {
			"name": "Iron Fist",
			"description": "Powers up punching moves."
		},
		"justified": {
			"name": "Justified",
			"description": "Being hit by a Dark-type move boosts the Attack stat of the Pokémon, for justice."
		},
		"klutz": {
			"name": "Klutz",
			"description": "The Pokémon can’t use any held items."
		},
		"leafguard": {
			"name": "Leaf Guard",
			"description": "Prevents status conditions in harsh sunlight."
		},
		"levitate": {
			"name": "Levitate",
			"description": "By floating in the air, the Pokémon receives full immunity to all Ground-type moves."
		},
		"libero": {
			"name": "Libero",
			"description": "Changes the Pokémon’s type to the type of the move it’s about to use."
		},
		"lightmetal": {
			"name": "Light Metal",
			"description": "Halves the Pokémon’s weight."
		},
		"lightningrod": {
			"name": "Lightning Rod",
			"description": "The Pokémon draws in all Electric-type moves. Instead of being hit by Electric-type moves, it boosts its Sp. Atk."
		},
		"limber": {
			"name": "Limber",
			"description": "Its limber body protects the Pokémon from paralysis."
		},
		"liquidooze": {
			"name": "Liquid Ooze",
			"description": "The oozed liquid has a strong stench, which damages attackers using any draining move."
		},
		"liquidvoice": {
			"name": "Liquid Voice",
			"description": "All sound-based moves become Water-type moves."
		},
		"magicbounce": {
			"name": "Magic Bounce",
			"description": "Reflects status moves instead of getting hit by them."
		},
		"magicguard": {
			"name": "Magic Guard",
			"description": "The Pokémon only takes damage from attacks."
		},
		"marvelscale": {
			"name": "Marvel Scale",
			"description": "The Pokémon’s marvelous scales boost the Defense stat if it has a status condition."
		},
		"megalauncher": {
			"name": "Mega Launcher",
			"description": "Powers up aura and pulse moves."
		},
		"mimicry": {
			"name": "Mimicry",
			"description": "Changes the Pokémon’s type depending on the terrain."
		},
		"minus": {
			"name": "Minus",
			"description": "Boosts the Sp. Atk stat of the Pokémon if an ally with the Plus or Minus Ability is also in battle."
		},
		"mirrorarmor": {
			"name": "Mirror Armor",
			"description": "Bounces back only the stat-lowering effects that the Pokémon receives."
		},
		"mistysurge": {
			"name": "Misty Surge",
			"description": "Turns the ground into Misty Terrain when the Pokémon enters a battle."
		},
		"moldbreaker": {
			"name": "Mold Breaker",
			"description": "Moves can be used on the target regardless of its Abilities."
		},
		"motordrive": {
			"name": "Motor Drive",
			"description": "Boosts its Speed stat if hit by an Electric-type move instead of taking damage."
		},
		"moxie": {
			"name": "Moxie",
			"description": "The Pokémon shows moxie, and that boosts the Attack stat after knocking out any Pokémon."
		},
		"multiscale": {
			"name": "Multiscale",
			"description": "Reduces the amount of damage the Pokémon takes while its HP is full."
		},
		"mummy": {
			"name": "Mummy",
			"description": "Contact with the Pokémon changes the attacker’s Ability to Mummy."
		},
		"naturalcure": {
			"name": "Natural Cure",
			"description": "All status conditions heal when the Pokémon switches out."
		},
		"neutralizinggas": {
			"name": "Neutralizing Gas",
			"description": "If the Pokémon with Neutralizing Gas is in the battle, the effects of all Pokémon’s Abilities will be nullified or will not be triggered."
		},
		"noguard": {
			"name": "No Guard",
			"description": "The Pokémon employs no-guard tactics to ensure incoming and outgoing attacks always land."
		},
		"overcoat": {
			"name": "Overcoat",
			"description": "Protects the Pokémon from things like sand, hail, and powder."
		},
		"owntempo": {
			"name": "Own Tempo",
			"description": "This Pokémon has its own tempo, and that prevents it from becoming confused."
		},
		"parentalbond": {
			"name": "Parental Bond",
			"description": "Parent and child each attacks."
		},
		"pastelveil": {
			"name": "Pastel Veil",
			"description": "Protects the Pokémon and its ally Pokémon from being poisoned."
		},
		"pickpocket": {
			"name": "Pickpocket",
			"description": "Steals an item from an attacker that made direct contact."
		},
		"pixilate": {
			"name": "Pixilate",
			"description": "Normal-type moves become Fairy-type moves. The power of those moves is boosted a little."
		},
		"plus": {
			"name": "Plus",
			"description": "Boosts the Sp. Atk stat of the Pokémon if an ally with the Plus or Minus Ability is also in battle."
		},
		"poisonpoint": {
			"name": "Poison Point",
			"description": "Contact with the Pokémon may poison the attacker."
		},
		"powerspot": {
			"name": "Power Spot",
			"description": "Just being next to the Pokémon powers up moves."
		},
		"prankster": {
			"name": "Prankster",
			"description": "Gives priority to a status move."
		},
		"pressure": {
			"name": "Pressure",
			"description": "By putting pressure on the opposing Pokémon, it raises their PP usage."
		},
		"primordialsea": {
			"name": "Primordial Sea",
			"description": "The Pokémon changes the weather to nullify Fire-type attacks."
		},
		"prismarmor": {
			"name": "Prism Armor",
			"description": "Reduces the power of supereffective attacks taken."
		},
		"psychicsurge": {
			"name": "Psychic Surge",
			"description": "Turns the ground into Psychic Terrain when the Pokémon enters a battle."
		},
		"punkrock": {
			"name": "Punk Rock",
			"description": "Boosts the power of sound-based moves. The Pokémon also takes half the damage from these kinds of moves."
		},
		"queenlymajesty": {
			"name": "Queenly Majesty",
			"description": "Its majesty pressures the opposing Pokémon, making it unable to attack using priority moves."
		},
		"quickdraw": {
			"name": "Quick Draw",
			"description": "Enables the Pokémon to move first occasionally."
		},
		"quickfeet": {
			"name": "Quick Feet",
			"description": "Boosts the Speed stat if the Pokémon has a status condition."
		},
		"raindish": {
			"name": "Rain Dish",
			"description": "The Pokémon gradually regains HP in rain."
		},
		"refrigerate": {
			"name": "Refrigerate",
			"description": "Normal-type moves become Ice-type moves. The power of those moves is boosted a little."
		},
		"regenerator": {
			"name": "Regenerator",
			"description": "Restores a little HP when withdrawn from battle."
		},
		"ripen": {
			"name": "Ripen",
			"description": "Ripens Berries and doubles their effect."
		},
		"rockhead": {
			"name": "Rock Head",
			"description": "Protects the Pokémon from recoil damage."
		},
		"roughskin": {
			"name": "Rough Skin",
			"description": "This Pokémon inflicts damage with its rough skin to the attacker on contact."
		},
		"sandforce": {
			"name": "Sand Force",
			"description": "Boosts the power of Rock-, Ground-, and Steel-type moves in a sandstorm."
		},
		"sandrush": {
			"name": "Sand Rush",
			"description": "Boosts the Pokémon’s Speed stat in a sandstorm."
		},
		"sandspit": {
			"name": "Sand Spit",
			"description": "The Pokémon creates a sandstorm when it’s hit by an attack."
		},
		"sandstream": {
			"name": "Sand Stream",
			"description": "The Pokémon summons a sandstorm when it enters a battle."
		},
		"sapsipper": {
			"name": "Sap Sipper",
			"description": "Boosts the Attack stat if hit by a Grass-type move instead of taking damage."
		},
		"schooling": {
			"name": "Schooling",
			"description": "When it has a lot of HP, the Pokémon forms a powerful school. It stops schooling when its HP is low."
		},
		"scrappy": {
			"name": "Scrappy",
			"description": "The Pokémon can hit Ghost-type Pokémon with Normal- and Fighting-type moves."
		},
		"screencleaner": {
			"name": "Screen Cleaner",
			"description": "When the Pokémon enters a battle, the effects of Light Screen, Reflect, and Aurora Veil are nullified for both opposing and ally Pokémon."
		},
		"serenegrace": {
			"name": "Serene Grace",
			"description": "Boosts the likelihood of additional effects occurring when attacking."
		},
		"shadowtag": {
			"name": "Shadow Tag",
			"description": "This Pokémon steps on the opposing Pokémon’s shadow to prevent it from escaping."
		},
		"shedskin": {
			"name": "Shed Skin",
			"description": "The Pokémon may heal its own status conditions by shedding its skin."
		},
		"sheerforce": {
			"name": "Sheer Force",
			"description": "Removes additional effects to increase the power of moves when attacking."
		},
		"shellarmor": {
			"name": "Shell Armor",
			"description": "A hard shell protects the Pokémon from critical hits."
		},
		"shielddust": {
			"name": "Shield Dust",
			"description": "This Pokémon’s dust blocks the additional effects of attacks taken."
		},
		"simple": {
			"name": "Simple",
			"description": "The stat changes the Pokémon receives are doubled."
		},
		"skilllink": {
			"name": "Skill Link",
			"description": "Maximizes the number of times multistrike moves hit."
		},
		"slowstart": {
			"name": "Slow Start",
			"description": "For five turns, the Pokémon’s Attack and Speed stats are halved."
		},
		"slushrush": {
			"name": "Slush Rush",
			"description": "Boosts the Pokémon’s Speed stat in a hailstorm."
		},
		"sniper": {
			"name": "Sniper",
			"description": "Powers up moves if they become critical hits when attacking."
		},
		"snowcloak": {
			"name": "Snow Cloak",
			"description": "Boosts evasiveness in a hailstorm."
		},
		"snowwarning": {
			"name": "Snow Warning",
			"description": "The Pokémon summons a hailstorm when it enters a battle."
		},
		"solarpower": {
			"name": "Solar Power",
			"description": "Boosts the Sp. Atk stat in harsh sunlight, but HP decreases every turn."
		},
		"solidrock": {
			"name": "Solid Rock",
			"description": "Reduces the power of supereffective attacks taken."
		},
		"soulheart": {
			"name": "Soul-Heart",
			"description": "Boosts its Sp. Atk stat every time a Pokémon faints."
		},
		"soundproof": {
			"name": "Soundproof",
			"description": "Soundproofing gives the Pokémon full immunity to all sound-based moves."
		},
		"speedboost": {
			"name": "Speed Boost",
			"description": "Its Speed stat is boosted every turn."
		},
		"stakeout": {
			"name": "Stakeout",
			"description": "Doubles the damage dealt to the target’s replacement if the target switches out."
		},
		"stalwart": {
			"name": "Stalwart",
			"description": "Ignores the effects of opposing Pokémon’s Abilities and moves that draw in moves."
		},
		"stamina": {
			"name": "Stamina",
			"description": "Boosts the Defense stat when hit by an attack."
		},
		"stancechange": {
			"name": "Stance Change",
			"description": "The Pokémon changes its form to Blade Forme when it uses an attack move and changes to Shield Forme when it uses King’s Shield."
		},
		"static": {
			"name": "Static",
			"description": "The Pokémon is charged with static electricity, so contact with it may cause paralysis."
		},
		"steadfast": {
			"name": "Steadfast",
			"description": "The Pokémon’s determination boosts the Speed stat each time the Pokémon flinches."
		},
		"steamengine": {
			"name": "Steam Engine",
			"description": "Boosts the Pokémon’s Speed stat drastically if hit by a Fire- or Water-type move."
		},
		"steelworker": {
			"name": "Steelworker",
			"description": "Powers up Steel-type moves."
		},
		"steelyspirit": {
			"name": "Steely Spirit",
			"description": "Powers up ally Pokémon’s Steel-type moves."
		},
		"stormdrain": {
			"name": "Storm Drain",
			"description": "Draws in all Water-type moves. Instead of being hit by Water-type moves, it boosts its Sp. Atk."
		},
		"strongjaw": {
			"name": "Strong Jaw",
			"description": "The Pokémon’s strong jaw boosts the power of its biting moves."
		},
		"sturdy": {
			"name": "Sturdy",
			"description": "It cannot be knocked out with one hit. One-hit KO moves cannot knock it out, either."
		},
		"superluck": {
			"name": "Super Luck",
			"description": "The Pokémon is so lucky that the critical-hit ratios of its moves are boosted."
		},
		"surgesurfer": {
			"name": "Surge Surfer",
			"description": "Doubles the Pokémon’s Speed stat on Electric Terrain."
		},
		"swarm": {
			"name": "Swarm",
			"description": "Powers up Bug-type moves when the Pokémon’s HP is low."
		},
		"sweetveil": {
			"name": "Sweet Veil",
			"description": "Prevents itself and ally Pokémon from falling asleep."
		},
		"swiftswim": {
			"name": "Swift Swim",
			"description": "Boosts the Pokémon’s Speed stat in rain."
		},
		"synchronize": {
			"name": "Synchronize",
			"description": "The attacker will receive the same status condition if it inflicts a burn, poison, or paralysis to the Pokémon."
		},
		"tanglinghair": {
			"name": "Tangling Hair",
			"description": "Contact with the Pokémon lowers the attacker’s Speed stat."
		},
		"technician": {
			"name": "Technician",
			"description": "Powers up the Pokémon’s weaker moves."
		},
		"telepathy": {
			"name": "Telepathy",
			"description": "Anticipates an ally’s attack and dodges it."
		},
		"thickfat": {
			"name": "Thick Fat",
			"description": "The Pokémon is protected by a layer of thick fat, which halves the damage taken from Fire- and Ice-type moves."
		},
		"tintedlens": {
			"name": "Tinted Lens",
			"description": "The Pokémon can use “not very effective” moves to deal regular damage."
		},
		"torrent": {
			"name": "Torrent",
			"description": "Powers up Water-type moves when the Pokémon’s HP is low."
		},
		"toughclaws": {
			"name": "Tough Claws",
			"description": "Powers up moves that make direct contact."
		},
		"trace": {
			"name": "Trace",
			"description": "When it enters a battle, the Pokémon copies an opposing Pokémon’s Ability."
		},
		"transistor": {
			"name": "Transistor",
			"description": "Powers up Electric-type moves."
		},
		"triage": {
			"name": "Triage",
			"description": "Gives priority to a healing move."
		},
		"truant": {
			"name": "Truant",
			"description": "The Pokémon can’t use a move if it had used a move on the previous turn."
		},
		"unaware": {
			"name": "Unaware",
			"description": "When attacking, the Pokémon ignores the target Pokémon’s stat changes."
		},
		"unburden": {
			"name": "Unburden",
			"description": "Boosts the Speed stat if the Pokémon’s held item is used or lost."
		},
		"unnerve": {
			"name": "Unnerve",
			"description": "Unnerves opposing Pokémon and makes them unable to eat Berries."
		},
		"unseenfist": {
			"name": "Unseen Fist",
			"description": "If the Pokémon uses moves that make direct contact, it can attack the target even if the target protects itself."
		},
		"victorystar": {
			"name": "Victory Star",
			"description": "Boosts the accuracy of its allies and itself."
		},
		"voltabsorb": {
			"name": "Volt Absorb",
			"description": "Restores HP if hit by an Electric-type move instead of taking damage."
		},
		"wanderingspirit": {
			"name": "Wandering Spirit",
			"description": "The Pokémon exchanges Abilities with a Pokémon that hits it with a move that makes direct contact."
		},
		"waterabsorb": {
			"name": "Water Absorb",
			"description": "Restores HP if hit by a Water-type move instead of taking damage."
		},
		"waterbubble": {
			"name": "Water Bubble",
			"description": "Lowers the power of Fire-type moves done to the Pokémon and prevents the Pokémon from getting a burn."
		},
		"watercompaction": {
			"name": "Water Compaction",
			"description": "Boosts the Pokémon’s Defense stat sharply when hit by a Water-type move."
		},
		"waterveil": {
			"name": "Water Veil",
			"description": "The Pokémon is covered with a water veil, which prevents the Pokémon from getting a burn."
		},
		"weakarmor": {
			"name": "Weak Armor",
			"description": "Physical attacks to the Pokémon lower its Defense stat but sharply raise its Speed stat."
		},
		"whitesmoke": {
			"name": "White Smoke",
			"description": "The Pokémon is protected by its white smoke, which prevents other Pokémon from lowering its stats."
		},
		"wonderguard": {
			"name": "Wonder Guard",
			"description": "Its mysterious power only lets supereffective moves hit the Pokémon."
		}
	},
	"items": {
		"absolite": {
			"name": "Absolite",
			"description": "One of a variety of mysterious Mega Stones. Have Absol hold it, and this stone will enable it to Mega Evolve during battle.",
			"sprite": "absolite"
		},
		"aerodactylite": {
			"name": "Aerodactylite",
			"description": "One of a variety of mysterious Mega Stones. Have Aerodactyl hold it, and this stone will enable it to Mega Evolve during battle.",
			"sprite": "aerodactylite"
		},
		"airballoon": {
			"name": "Air Balloon",
			"description": "An item to be held by a Pokémon. The holder will float in the air until hit. Once the holder is hit, this item will burst.",
			"sprite": "airballoon"
		},
		"assaultvest": {
			"name": "Assault Vest",
			"description": "An item to be held by a Pokémon. This offensive vest raises Sp. Def but prevents the use of status moves.",
			"sprite": "assaultvest"
		},
		"babiriberry": {
			"name": "Babiri Berry",
			"description": "If held by a Pokémon, this Berry will lessen the damage taken from one supereffective Steel-type attack.",
			"sprite": "babiriberry"
		},
		"berryjuice": {
			"name": "Berry Juice",
			"description": "A 100 percent pure juice made of Berries. It can be used to restore 20 HP to a single Pokémon.",
			"sprite": "berryjuice"
		},
		"bigroot": {
			"name": "Big Root",
			"description": "An item to be held by a Pokémon. It boosts the amount of HP the holder restores from HP-stealing moves.",
			"sprite": "bigroot"
		},
		"bindingband": {
			"name": "Binding Band",
			"description": "An item to be held by a Pokémon. It’s a band that increases the power of binding moves used by the holder.",
			"sprite": "bindingband"
		},
		"blackbelt": {
			"name": "Black Belt",
			"description": "An item to be held by a Pokémon. This belt helps the wearer to focus and boosts the power of Fighting-type moves.",
			"sprite": "blackbelt"
		},
		"blackglasses": {
			"name": "Black Glasses",
			"description": "An item to be held by a Pokémon. It’s a pair of shady-looking glasses that boost the power of Dark-type moves.",
			"sprite": "blackglasses"
		},
		"blacksludge": {
			"name": "Black Sludge",
			"description": "An item to be held by a Pokémon. It gradually restores HP to Poison-type Pokémon. It damages any other type.",
			"sprite": "blacksludge"
		},
		"brightpowder": {
			"name": "Bright Powder",
			"description": "An item to be held by a Pokémon. It casts a tricky glare that lowers the opposing Pokémon’s accuracy.",
			"sprite": "brightpowder"
		},
		"charcoal": {
			"name": "Charcoal",
			"description": "An item to be held by a Pokémon. It’s a combustible fuel that boosts the power of Fire-type moves.",
			"sprite": "charcoal"
		},
		"chartiberry": {
			"name": "Charti Berry",
			"description": "If held by a Pokémon, this Berry will lessen the damage taken from one supereffective Rock-type attack.",
			"sprite": "chartiberry"
		},
		"chestoberry": {
			"name": "Chesto Berry",
			"description": "A Berry to be consumed by Pokémon. If a Pokémon holds one, it can recover from sleep on its own in battle.",
			"sprite": "chestoberry"
		},
		"choiceband": {
			"name": "Choice Band",
			"description": "An item to be held by a Pokémon. This curious headband boosts Attack but only allows the use of one move.",
			"sprite": "choiceband"
		},
		"choicescarf": {
			"name": "Choice Scarf",
			"description": "An item to be held by a Pokémon. This curious scarf boosts Speed but only allows the use of one move.",
			"sprite": "choicescarf"
		},
		"choicespecs": {
			"name": "Choice Specs",
			"description": "An item to be held by a Pokémon. These curious glasses boost Sp. Atk but only allow the use of one move.",
			"sprite": "choicespecs"
		},
		"chopleberry": {
			"name": "Chople Berry",
			"description": "If held by a Pokémon, this Berry will lessen the damage taken from one supereffective Fighting-type attack.",
			"sprite": "chopleberry"
		},
		"cobaberry": {
			"name": "Coba Berry",
			"description": "If held by a Pokémon, this Berry will lessen the damage taken from one supereffective Flying-type attack.",
			"sprite": "cobaberry"
		},
		"colburberry": {
			"name": "Colbur Berry",
			"description": "If held by a Pokémon, this Berry will lessen the damage taken from one supereffective Dark-type attack.",
			"sprite": "colburberry"
		},
		"custapberry": {
			"name": "Custap Berry",
			"description": "A Berry to be consumed by Pokémon. If a Pokémon holds one, it will be able to move first just once when it’s in a pinch.",
			"sprite": "custapberry"
		},
		"damprock": {
			"name": "Damp Rock",
			"description": "An item to be held by a Pokémon. It extends the duration of the move Rain Dance when used by the holder.",
			"sprite": "damprock"
		},
		"dousedrive": {
			"name": "Douse Drive",
			"description": "A cassette to be held by Genesect. It changes Genesect’s Techno Blast move so it becomes Water type.",
			"sprite": "dousedrive"
		},
		"dracoplate": {
			"name": "Draco Plate",
			"description": "An item to be held by a Pokémon. It’s a stone tablet that boosts the power of Dragon-type moves.",
			"sprite": "dracoplate"
		},
		"dragonfang": {
			"name": "Dragon Fang",
			"description": "An item to be held by a Pokémon. This hard and sharp fang boosts the power of Dragon-type moves.",
			"sprite": "dragonfang"
		},
		"dragongem": {
			"name": "Dragon Gem",
			"description": "A gem with a draconic essence. When held, it strengthens the power of a Dragon-type move one time.",
			"sprite": "dragongem"
		},
		"ejectbutton": {
			"name": "Eject Button",
			"description": "An item to be held by a Pokémon. If the holder is hit by an attack, it will be switched out of battle.",
			"sprite": "ejectbutton"
		},
		"ejectpack": {
			"name": "Eject Pack",
			"description": "An item to be held by a Pokémon. When the holder’s stats are lowered, it will be switched out of battle.",
			"sprite": "ejectpack"
		},
		"electricseed": {
			"name": "Electric Seed",
			"description": "An item to be held by a Pokémon. It boosts Defense on Electric Terrain. It can only be used once.",
			"sprite": "electricseed"
		},
		"eviolite": {
			"name": "Eviolite",
			"description": "A mysterious evolutionary lump. When held by a Pokémon that can still evolve, it raises both Defense and Sp. Def.",
			"sprite": "eviolite"
		},
		"expertbelt": {
			"name": "Expert Belt",
			"description": "An item to be held by a Pokémon. It’s a well-worn belt that slightly boosts the power of supereffective moves.",
			"sprite": "expertbelt"
		},
		"figyberry": {
			"name": "Figy Berry",
			"description": "If held by a Pokémon, it restores the user’s HP in a pinch, but it will cause confusion if the user hates the taste.",
			"sprite": "figyberry"
		},
		"flameorb": {
			"name": "Flame Orb",
			"description": "An item to be held by a Pokémon. It’s a bizarre orb that will afflict the holder with a burn during battle.",
			"sprite": "flameorb"
		},
		"flyinggem": {
			"name": "Flying Gem",
			"description": "A gem with an essence of air. When held, it strengthens the power of a Flying-type move one time.",
			"sprite": "flyinggem"
		},
		"focussash": {
			"name": "Focus Sash",
			"description": "An item to be held by a Pokémon. If the holder has full HP, it will endure a potential KO attack with 1 HP. The item then disappears.",
			"sprite": "focussash"
		},
		"garchompite": {
			"name": "Garchompite",
			"description": "One of a variety of mysterious Mega Stones. Have Garchomp hold it, and this stone will enable it to Mega Evolve during battle.",
			"sprite": "garchompite"
		},
		"grassyseed": {
			"name": "Grassy Seed",
			"description": "An item to be held by a Pokémon. It boosts Defense on Grassy Terrain. It can only be used once.",
			"sprite": "grassyseed"
		},
		"gripclaw": {
			"name": "Grip Claw",
			"description": "An item to be held by a Pokémon. It extends the duration of multi-turn attacks, such as Bind and Wrap.",
			"sprite": "gripclaw"
		},
		"griseousorb": {
			"name": "Griseous Orb",
			"description": "A glowing orb to be held by Giratina. It boosts the power of Dragon- and Ghost-type moves when it is held.",
			"sprite": "griseousorb"
		},
		"groundgem": {
			"name": "Ground Gem",
			"description": "A gem with an essence of land. When held, it strengthens the power of a Ground-type move one time.",
			"sprite": "groundgem"
		},
		"gyaradosite": {
			"name": "Gyaradosite",
			"description": "One of a variety of mysterious Mega Stones. Have Gyarados hold it, and this stone will enable it to Mega Evolve during battle.",
			"sprite": "gyaradosite"
		},
		"hardstone": {
			"name": "Hard Stone",
			"description": "An item to be held by a Pokémon. It’s a durable stone that boosts the power of Rock-type moves.",
			"sprite": "hardstone"
		},
		"heatrock": {
			"name": "Heat Rock",
			"description": "An item to be held by a Pokémon. It extends the duration of the move Sunny Day when used by the holder.",
			"sprite": "heatrock"
		},
		"heavydutyboots": {
			"name": "Heavy-Duty Boots",
			"description": "These boots prevent the effects of traps set on the battlefield.",
			"sprite": "heavydutyboots"
		},
		"icyrock": {
			"name": "Icy Rock",
			"description": "An item to be held by a Pokémon. It extends the duration of the move Hail when used by the holder.",
			"sprite": "icyrock"
		},
		"ironball": {
			"name": "Iron Ball",
			"description": "An item to be held by a Pokémon. It lowers Speed and allows Ground-type moves to hit Flying types and holders that are levitating.",
			"sprite": "ironball"
		},
		"keeberry": {
			"name": "Kee Berry",
			"description": "If held by a Pokémon, this Berry will increase the holder’s Defense if it’s hit with a physical move.",
			"sprite": "keeberry"
		},
		"kingsrock": {
			"name": "King’s Rock",
			"description": "An item to be held by a Pokémon. When the holder successfully inflicts damage, the target may also flinch.",
			"sprite": "kingsrock"
		},
		"leek": {
			"name": "Leek",
			"description": "An item to be held by Farfetch’d. This very long and stiff stalk of leek boosts its critical-hit ratio.",
			"sprite": "leek"
		},
		"leftovers": {
			"name": "Leftovers",
			"description": "An item to be held by a Pokémon. The holder’s HP is slowly but steadily restored throughout every battle.",
			"sprite": "leftovers"
		},
		"lifeorb": {
			"name": "Life Orb",
			"description": "An item to be held by a Pokémon. It boosts the power of moves but at the cost of some HP on each hit.",
			"sprite": "lifeorb"
		},
		"lightclay": {
			"name": "Light Clay",
			"description": "An item to be held by a Pokémon. Protective moves like Light Screen and Reflect will be effective longer.",
			"sprite": "lightclay"
		},
		"lumberry": {
			"name": "Lum Berry",
			"description": "A Berry to be consumed by Pokémon. If a Pokémon holds one, it can recover from any status condition during battle.",
			"sprite": "lumberry"
		},
		"lustrousorb": {
			"name": "Lustrous Orb",
			"description": "A beautifully glowing orb to be held by Palkia. It boosts the power of Dragon- and Water-type moves when it is held.",
			"sprite": "lustrousorb"
		},
		"magnet": {
			"name": "Magnet",
			"description": "An item to be held by a Pokémon. It’s a powerful magnet that boosts the power of Electric-type moves.",
			"sprite": "magnet"
		},
		"mentalherb": {
			"name": "Mental Herb",
			"description": "An item to be held by a Pokémon. The holder shakes off move-binding effects to move freely. It can be used only once.",
			"sprite": "mentalherb"
		},
		"metalcoat": {
			"name": "Metal Coat",
			"description": "An item to be held by a Pokémon. It’s a special metallic film that can boost the power of Steel-type moves.",
			"sprite": "metalcoat"
		},
		"miracleseed": {
			"name": "Miracle Seed",
			"description": "An item to be held by a Pokémon. It’s a seed imbued with life-force that boosts the power of Grass-type moves.",
			"sprite": "miracleseed"
		},
		"muscleband": {
			"name": "Muscle Band",
			"description": "An item to be held by a Pokémon. This headband exudes strength, slightly boosting the power of physical moves.",
			"sprite": "muscleband"
		},
		"mysticwater": {
			"name": "Mystic Water",
			"description": "An item to be held by a Pokémon. This teardrop-shaped gem boosts the power of Water-type moves.",
			"sprite": "mysticwater"
		},
		"nevermeltice": {
			"name": "Never-Melt Ice",
			"description": "An item to be held by a Pokémon. It’s a heat- repelling piece of ice that boosts the power of Ice-type moves.",
			"sprite": "nevermeltice"
		},
		"none": {
			"name": "No held item",
			"description": "This Pokémon is not holding an item."
		},
		"occaberry": {
			"name": "Occa Berry",
			"description": "If held by a Pokémon, this Berry will lessen the damage taken from one supereffective Fire-type attack.",
			"sprite": "occaberry"
		},
		"oranberry": {
			"name": "Oran Berry",
			"description": "A Berry to be consumed by Pokémon. If a Pokémon holds one, it can restore its own HP by 10 points during battle.",
			"sprite": "oranberry"
		},
		"passhoberry": {
			"name": "Passho Berry",
			"description": "If held by a Pokémon, this Berry will lessen the damage taken from one supereffective Water-type attack.",
			"sprite": "passhoberry"
		},
		"pixieplate": {
			"name": "Pixie Plate",
			"description": "An item to be held by a Pokémon. It’s a stone tablet that boosts the power of Fairy-type moves.",
			"sprite": "pixieplate"
		},
		"powerherb": {
			"name": "Power Herb",
			"description": "A single-use item to be held by a Pokémon. It allows the holder to immediately use a move that normally requires a turn to charge.",
			"sprite": "powerherb"
		},
		"protectivepads": {
			"name": "Protective Pads",
			"description": "An item to be held by a Pokémon. These pads protect the holder from effects caused by making direct contact with the target.",
			"sprite": "protectivepads"
		},
		"psychicgem": {
			"name": "Psychic Gem",
			"description": "A gem with an essence of the mind. When held, it strengthens the power of a Psychic-type move one time.",
			"sprite": "psychicgem"
		},
		"quickclaw": {
			"name": "Quick Claw",
			"description": "An item to be held by a Pokémon. This light, sharp claw lets the bearer move first occasionally.",
			"sprite": "quickclaw"
		},
		"razorclaw": {
			"name": "Razor Claw",
			"description": "An item to be held by a Pokémon. This sharply hooked claw increases the holder’s critical-hit ratio.",
			"sprite": "razorclaw"
		},
		"redcard": {
			"name": "Red Card",
			"description": "An item to be held by a Pokémon. When the holder is hit by an attack, the attacker is removed from battle.",
			"sprite": "redcard"
		},
		"rindoberry": {
			"name": "Rindo Berry",
			"description": "If held by a Pokémon, this Berry will lessen the damage taken from one supereffective Grass-type attack.",
			"sprite": "rindoberry"
		},
		"rockyhelmet": {
			"name": "Rocky Helmet",
			"description": "An item to be held by a Pokémon. If the holder is hit, the attacker will also be damaged upon contact.",
			"sprite": "rockyhelmet"
		},
		"roomservice": {
			"name": "Room Service",
			"description": "An item to be held by a Pokémon. Lowers Speed when Trick Room takes effect.",
			"sprite": "roomservice"
		},
		"roseincense": {
			"name": "Rose Incense",
			"description": "An item to be held by a Pokémon. This exotic-smelling incense boosts the power of Grass-type moves.",
			"sprite": "roseincense"
		},
		"roseliberry": {
			"name": "Roseli Berry",
			"description": "If held by a Pokémon, this Berry will lessen the damage taken from one supereffective Fairy-type attack.",
			"sprite": "roseliberry"
		},
		"safetygoggles": {
			"name": "Safety Goggles",
			"description": "An item to be held by a Pokémon. These goggles protect the holder from both weather-related damage and powder.",
			"sprite": "safetygoggles"
		},
		"salacberry": {
			"name": "Salac Berry",
			"description": "A Berry to be consumed by Pokémon. If a Pokémon holds one, its Speed stat will increase when it’s in a pinch.",
			"sprite": "salacberry"
		},
		"scopelens": {
			"name": "Scope Lens",
			"description": "An item to be held by a Pokémon. It’s a lens for scoping out weak points. It boosts the holder’s critical-hit ratio.",
			"sprite": "scopelens"
		},
		"sharpbeak": {
			"name": "Sharp Beak",
			"description": "An item to be held by a Pokémon. It’s a long, sharp beak that boosts the power of Flying-type moves.",
			"sprite": "sharpbeak"
		},
		"shucaberry": {
			"name": "Shuca Berry",
			"description": "If held by a Pokémon, this Berry will lessen the damage taken from one supereffective Ground-type attack.",
			"sprite": "shucaberry"
		},
		"silkscarf": {
			"name": "Silk Scarf",
			"description": "An item to be held by a Pokémon. It’s a sumptuous scarf that boosts the power of Normal-type moves.",
			"sprite": "silkscarf"
		},
		"silverpowder": {
			"name": "Silver Powder",
			"description": "An item to be held by a Pokémon. It’s a shiny silver powder that will boost the power of Bug-type moves.",
			"sprite": "silverpowder"
		},
		"sitrusberry": {
			"name": "Sitrus Berry",
			"description": "A Berry to be consumed by Pokémon. If a Pokémon holds one, it can restore its own HP by a small amount during battle.",
			"sprite": "sitrusberry"
		},
		"smokeball": {
			"name": "Smoke Ball",
			"description": "An item to be held by a Pokémon. It enables the holder to flee from any wild Pokémon encounter without fail.",
			"sprite": "smokeball"
		},
		"smoothrock": {
			"name": "Smooth Rock",
			"description": "An item to be held by a Pokémon. It extends the duration of the move Sandstorm when used by the holder.",
			"sprite": "smoothrock"
		},
		"softsand": {
			"name": "Soft Sand",
			"description": "An item to be held by a Pokémon. It’s a loose, silky sand that boosts the power of Ground-type moves.",
			"sprite": "softsand"
		},
		"souldew": {
			"name": "Soul Dew",
			"description": "A wondrous orb to be held by either Latios or Latias. It raises the power of Psychic- and Dragon-type moves.",
			"sprite": "souldew"
		},
		"spelltag": {
			"name": "Spell Tag",
			"description": "An item to be held by a Pokémon. It’s a sinister, eerie tag that boosts the power of Ghost-type moves.",
			"sprite": "spelltag"
		},
		"stickybarb": {
			"name": "Sticky Barb",
			"description": "An item to be held by a Pokémon. It damages the holder every turn and may latch on to Pokémon that touch the holder.",
			"sprite": "stickybarb"
		},
		"terrainextender": {
			"name": "Terrain Extender",
			"description": "An item to be held by a Pokémon. It extends the duration of the terrain caused by the holder’s move or Ability.",
			"sprite": "terrainextender"
		},
		"thickclub": {
			"name": "Thick Club",
			"description": "An item to be held by Cubone or Marowak. It’s a hard bone of some sort that boosts the Attack stat.",
			"sprite": "thickclub"
		},
		"throatspray": {
			"name": "Throat Spray",
			"description": "Raises Sp. Atk when a Pokémon uses a sound-based move.",
			"sprite": "throatspray"
		},
		"toxicorb": {
			"name": "Toxic Orb",
			"description": "An item to be held by a Pokémon. It’s a bizarre orb that will badly poison the holder during battle.",
			"sprite": "toxicorb"
		},
		"twistedspoon": {
			"name": "Twisted Spoon",
			"description": "An item to be held by a Pokémon. This spoon is imbued with telekinetic power and boosts Psychic-type moves.",
			"sprite": "twistedspoon"
		},
		"wacanberry": {
			"name": "Wacan Berry",
			"description": "If held by a Pokémon, this Berry will lessen the damage taken from one supereffective Electric-type attack.",
			"sprite": "wacanberry"
		},
		"weaknesspolicy": {
			"name": "Weakness Policy",
			"description": "An item to be held by a Pokémon. Attack and Sp. Atk sharply increase if the holder is hit with a move it’s weak to.",
			"sprite": "weaknesspolicy"
		},
		"whiteherb": {
			"name": "White Herb",
			"description": "An item to be held by a Pokémon. It will restore any lowered stat in battle. It can be used only once.",
			"sprite": "whiteherb"
		},
		"widelens": {
			"name": "Wide Lens",
			"description": "An item to be held by a Pokémon. It’s a magnifying lens that slightly boosts the accuracy of moves.",
			"sprite": "widelens"
		},
		"wiseglasses": {
			"name": "Wise Glasses",
			"description": "An item to be held by a Pokémon. This thick pair of glasses slightly boosts the power of special moves.",
			"sprite": "wiseglasses"
		},
		"yacheberry": {
			"name": "Yache Berry",
			"description": "If held by a Pokémon, this Berry will lessen the damage taken from one supereffective Ice-type attack.",
			"sprite": "yacheberry"
		}
	},
	"moves": {
		"accelerock": {
			"name": "Accelerock",
			"type": "Rock",
			"category": "Physical",
			"power": 40,
			"accuracy": 100,
			"effects": "Usually goes first.",
			"summary": "Usually goes first."
		},
		"acidarmor": {
			"name": "Acid Armor",
			"type": "Poison",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "Raises the user's Defense by 2 stages.",
			"summary": "Raises the user's Defense by 2."
		},
		"acidspray": {
			"name": "Acid Spray",
			"type": "Poison",
			"category": "Special",
			"power": 40,
			"accuracy": 100,
			"effects": "Has a 100% chance to lower the target's Special Defense by 2 stages.",
			"summary": "100% chance to lower the target's Sp. Def by 2."
		},
		"acrobatics": {
			"name": "Acrobatics",
			"type": "Flying",
			"category": "Physical",
			"power": 55,
			"accuracy": 100,
			"effects": "Power doubles if the user has no held item.",
			"summary": "Power doubles if the user has no held item."
		},
		"aerialace": {
			"name": "Aerial Ace",
			"type": "Flying",
			"category": "Physical",
			"power": 60,
			"accuracy": true,
			"effects": "This move does not check accuracy.",
			"summary": "This move does not check accuracy."
		},
		"afteryou": {
			"name": "After You",
			"type": "Normal",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "The target makes its move immediately after the user this turn, no matter the priority of its selected move. Fails if the target would have moved next anyway, or if the target already moved this turn.",
			"summary": "The target makes its move right after the user."
		},
		"agility": {
			"name": "Agility",
			"type": "Psychic",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "Raises the user's Speed by 2 stages.",
			"summary": "Raises the user's Speed by 2."
		},
		"airslash": {
			"name": "Air Slash",
			"type": "Flying",
			"category": "Special",
			"power": 75,
			"accuracy": 95,
			"effects": "Has a 30% chance to make the target flinch.",
			"summary": "30% chance to make the target flinch."
		},
		"allyswitch": {
			"name": "Ally Switch",
			"type": "Psychic",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "The user swaps positions with its ally. Fails if the user is the only Pokemon on its side.",
			"summary": "The user swaps positions with its ally."
		},
		"anchorshot": {
			"name": "Anchor Shot",
			"type": "Steel",
			"category": "Physical",
			"power": 80,
			"accuracy": 100,
			"effects": "Prevents the target from switching out. The target can still switch out if it is holding Shed Shell or uses Baton Pass, Flip Turn, Parting Shot, Teleport, U-turn, or Volt Switch. The effect ends if either the user or the target leaves the field.",
			"summary": "Prevents the target from switching out."
		},
		"ancientpower": {
			"name": "Ancient Power",
			"type": "Rock",
			"category": "Special",
			"power": 60,
			"accuracy": 100,
			"effects": "Has a 10% chance to raise the user's Attack, Defense, Special Attack, Special Defense, and Speed by 1 stage.",
			"summary": "10% chance to raise all stats by 1 (not acc/eva)."
		},
		"appleacid": {
			"name": "Apple Acid",
			"type": "Grass",
			"category": "Special",
			"power": 80,
			"accuracy": 100,
			"effects": "Has a 100% chance to lower the target's Special Defense by 1 stage.",
			"summary": "100% chance to lower the target's Sp. Def by 1."
		},
		"aquajet": {
			"name": "Aqua Jet",
			"type": "Water",
			"category": "Physical",
			"power": 40,
			"accuracy": 100,
			"effects": "Usually goes first.",
			"summary": "Usually goes first."
		},
		"aquaring": {
			"name": "Aqua Ring",
			"type": "Water",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "The user has 1/16 of its maximum HP, rounded down, restored at the end of each turn while it remains active. If Big Root is held by the user, the HP recovered is 1.3× normal, rounded half down. If the user uses Baton Pass, the replacement will receive the healing effect.",
			"summary": "User recovers 1/16 max HP per turn."
		},
		"aquatail": {
			"name": "Aqua Tail",
			"type": "Water",
			"category": "Physical",
			"power": 90,
			"accuracy": 90,
			"effects": "No additional effect.",
			"summary": "No additional effect."
		},
		"aromatherapy": {
			"name": "Aromatherapy",
			"type": "Grass",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "Every Pokemon in the user's party is cured of its non-volatile status condition. Active Pokemon with the Sap Sipper Ability are not cured, unless they are the user.",
			"summary": "Cures the user's party of all status conditions."
		},
		"assurance": {
			"name": "Assurance",
			"type": "Dark",
			"category": "Physical",
			"power": 60,
			"accuracy": 100,
			"effects": "Power doubles if the target has already taken damage this turn, other than direct damage from Belly Drum, confusion, Curse, or Pain Split.",
			"summary": "Power doubles if target was damaged this turn."
		},
		"attackorder": {
			"name": "Attack Order",
			"type": "Bug",
			"category": "Physical",
			"power": 90,
			"accuracy": 100,
			"effects": "Has a higher chance for a critical hit.",
			"summary": "High critical hit ratio."
		},
		"attract": {
			"name": "Attract",
			"type": "Normal",
			"category": "Status",
			"power": 0,
			"accuracy": 100,
			"effects": "Causes the target to become infatuated, making it unable to attack 50% of the time. Fails if both the user and the target are the same gender, if either is genderless, or if the target is already infatuated. The effect ends when either the user or the target is no longer active. Pokemon with the Oblivious Ability or protected by the Aroma Veil Ability are immune.",
			"summary": "A target of the opposite gender gets infatuated."
		},
		"aurasphere": {
			"name": "Aura Sphere",
			"type": "Fighting",
			"category": "Special",
			"power": 80,
			"accuracy": true,
			"effects": "This move does not check accuracy.",
			"summary": "This move does not check accuracy."
		},
		"aurawheel": {
			"name": "Aura Wheel",
			"type": "Electric",
			"category": "Physical",
			"power": 110,
			"accuracy": 100,
			"effects": "Has a 100% chance to raise the user's Speed by 1 stage. If the user is a Morpeko in Full Belly Mode, this move is Electric type. If the user is a Morpeko in Hangry Mode, this move is Dark type. This move cannot be used successfully unless the user's current form, while considering Transform, is Full Belly or Hangry Mode Morpeko.",
			"summary": "Morpeko: Electric; Hangry: Dark; 100% +1 Spe."
		},
		"auroraveil": {
			"name": "Aurora Veil",
			"type": "Ice",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "For 5 turns, damage to allies is halved. Hail only.",
			"summary": "For 5 turns, damage to allies is halved. Hail only."
		},
		"autotomize": {
			"name": "Autotomize",
			"type": "Steel",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "Raises the user's Speed by 2 stages. If the user's Speed was changed, the user's weight is reduced by 100 kg as long as it remains active. This effect is stackable but cannot reduce the user's weight to less than 0.1 kg.",
			"summary": "Raises the user's Speed by 2; user loses 100 kg."
		},
		"babydolleyes": {
			"name": "Baby-Doll Eyes",
			"type": "Fairy",
			"category": "Status",
			"power": 0,
			"accuracy": 100,
			"effects": "Lowers the target's Attack by 1 stage.",
			"summary": "Lowers the target's Attack by 1."
		},
		"banefulbunker": {
			"name": "Baneful Bunker",
			"type": "Poison",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "Protects from moves. Contact: poison.",
			"summary": "Protects from moves. Contact: poison."
		},
		"batonpass": {
			"name": "Baton Pass",
			"type": "Normal",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "User switches, passing stat changes and more.",
			"summary": "User switches, passing stat changes and more."
		},
		"beatup": {
			"name": "Beat Up",
			"type": "Dark",
			"category": "Physical",
			"power": 0,
			"accuracy": 100,
			"effects": "Hits one time for the user and one time for each unfainted Pokemon without a non-volatile status condition in the user's party. The power of each hit is equal to 5+(X/10), where X is each participating Pokemon's base Attack; each hit is considered to come from the user.",
			"summary": "All healthy allies aid in damaging the target."
		},
		"bellydrum": {
			"name": "Belly Drum",
			"type": "Normal",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "Raises the user's Attack by 12 stages in exchange for the user losing 1/2 of its maximum HP, rounded down. Fails if the user would faint or if its Attack stat stage is 6.",
			"summary": "User loses 50% max HP. Maximizes Attack."
		},
		"bite": {
			"name": "Bite",
			"type": "Dark",
			"category": "Physical",
			"power": 60,
			"accuracy": 100,
			"effects": "Has a 30% chance to make the target flinch.",
			"summary": "30% chance to make the target flinch."
		},
		"blastburn": {
			"name": "Blast Burn",
			"type": "Fire",
			"category": "Special",
			"power": 150,
			"accuracy": 90,
			"effects": "If this move is successful, the user must recharge on the following turn and cannot select a move.",
			"summary": "User cannot move next turn."
		},
		"blazekick": {
			"name": "Blaze Kick",
			"type": "Fire",
			"category": "Physical",
			"power": 85,
			"accuracy": 90,
			"effects": "Has a 10% chance to burn the target and a higher chance for a critical hit.",
			"summary": "High critical hit ratio. 10% chance to burn."
		},
		"blizzard": {
			"name": "Blizzard",
			"type": "Ice",
			"category": "Special",
			"power": 110,
			"accuracy": 70,
			"effects": "Has a 10% chance to freeze the target. If the weather is Hail, this move does not check accuracy.",
			"summary": "10% chance to freeze foe(s). Can't miss in Hail."
		},
		"bodypress": {
			"name": "Body Press",
			"type": "Fighting",
			"category": "Physical",
			"power": 80,
			"accuracy": 100,
			"effects": "Damage is calculated using the user's Defense stat as its Attack, including stat stage changes. Other effects that modify the Attack stat are used as normal.",
			"summary": "Uses user's Def stat as Atk in damage calculation."
		},
		"bodyslam": {
			"name": "Body Slam",
			"type": "Normal",
			"category": "Physical",
			"power": 85,
			"accuracy": 100,
			"effects": "Has a 30% chance to paralyze the target. Damage doubles and no accuracy check is done if the target has used Minimize while active.",
			"summary": "30% chance to paralyze the target."
		},
		"boltbeak": {
			"name": "Bolt Beak",
			"type": "Electric",
			"category": "Physical",
			"power": 85,
			"accuracy": 100,
			"effects": "Power doubles if the user moves before the target.",
			"summary": "Power doubles if user moves before the target."
		},
		"boltstrike": {
			"name": "Bolt Strike",
			"type": "Electric",
			"category": "Physical",
			"power": 130,
			"accuracy": 85,
			"effects": "Has a 20% chance to paralyze the target.",
			"summary": "20% chance to paralyze the target."
		},
		"bonemerang": {
			"name": "Bonemerang",
			"type": "Ground",
			"category": "Physical",
			"power": 50,
			"accuracy": 90,
			"effects": "Hits twice. If the first hit breaks the target's substitute, it will take damage for the second hit.",
			"summary": "Hits 2 times in one turn."
		},
		"boomburst": {
			"name": "Boomburst",
			"type": "Normal",
			"category": "Special",
			"power": 140,
			"accuracy": 100,
			"effects": "No additional effect. Hits adjacent Pokemon.",
			"summary": "No additional effect. Hits adjacent Pokemon."
		},
		"bounce": {
			"name": "Bounce",
			"type": "Flying",
			"category": "Physical",
			"power": 85,
			"accuracy": 85,
			"effects": "Has a 30% chance to paralyze the target. This attack charges on the first turn and executes on the second. On the first turn, the user avoids all attacks other than Gust, Hurricane, Sky Uppercut, Smack Down, Thousand Arrows, Thunder, and Twister, and Gust and Twister have doubled power when used against it. If the user is holding a Power Herb, the move completes in one turn.",
			"summary": "Bounces turn 1. Hits turn 2. 30% paralyze."
		},
		"branchpoke": {
			"name": "Branch Poke",
			"type": "Grass",
			"category": "Physical",
			"power": 40,
			"accuracy": 100,
			"effects": "No additional effect.",
			"summary": "No additional effect."
		},
		"bravebird": {
			"name": "Brave Bird",
			"type": "Flying",
			"category": "Physical",
			"power": 120,
			"accuracy": 100,
			"effects": "If the target lost HP, the user takes recoil damage equal to 33% the HP lost by the target, rounded half up, but not less than 1 HP.",
			"summary": "Has 33% recoil."
		},
		"breakingswipe": {
			"name": "Breaking Swipe",
			"type": "Dragon",
			"category": "Physical",
			"power": 60,
			"accuracy": 100,
			"effects": "Has a 100% chance to lower the target's Attack by 1 stage.",
			"summary": "100% chance to lower the foe(s) Attack by 1."
		},
		"brickbreak": {
			"name": "Brick Break",
			"type": "Fighting",
			"category": "Physical",
			"power": 75,
			"accuracy": 100,
			"effects": "If this attack does not miss, the effects of Reflect, Light Screen, and Aurora Veil end for the target's side of the field before damage is calculated.",
			"summary": "Destroys screens, unless the target is immune."
		},
		"brutalswing": {
			"name": "Brutal Swing",
			"type": "Dark",
			"category": "Physical",
			"power": 60,
			"accuracy": 100,
			"effects": "No additional effect. Hits adjacent Pokemon.",
			"summary": "No additional effect. Hits adjacent Pokemon."
		},
		"bubblebeam": {
			"name": "Bubble Beam",
			"type": "Water",
			"category": "Special",
			"power": 65,
			"accuracy": 100,
			"effects": "Has a 10% chance to lower the target's Speed by 1 stage.",
			"summary": "10% chance to lower the target's Speed by 1."
		},
		"bugbite": {
			"name": "Bug Bite",
			"type": "Bug",
			"category": "Physical",
			"power": 60,
			"accuracy": 100,
			"effects": "If this move is successful and the user has not fainted, it steals the target's held Berry if it is holding one and eats it immediately, gaining its effects even if the user's item is being ignored. Items lost to this move cannot be regained with Recycle or the Harvest Ability.",
			"summary": "User steals and eats the target's Berry."
		},
		"bugbuzz": {
			"name": "Bug Buzz",
			"type": "Bug",
			"category": "Special",
			"power": 90,
			"accuracy": 100,
			"effects": "Has a 10% chance to lower the target's Special Defense by 1 stage.",
			"summary": "10% chance to lower the target's Sp. Def by 1."
		},
		"bulkup": {
			"name": "Bulk Up",
			"type": "Fighting",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "Raises the user's Attack and Defense by 1 stage.",
			"summary": "Raises the user's Attack and Defense by 1."
		},
		"bulldoze": {
			"name": "Bulldoze",
			"type": "Ground",
			"category": "Physical",
			"power": 60,
			"accuracy": 100,
			"effects": "Has a 100% chance to lower the target's Speed by 1 stage.",
			"summary": "100% chance lower adjacent Pkmn Speed by 1."
		},
		"bulletpunch": {
			"name": "Bullet Punch",
			"type": "Steel",
			"category": "Physical",
			"power": 40,
			"accuracy": 100,
			"effects": "Usually goes first.",
			"summary": "Usually goes first."
		},
		"bulletseed": {
			"name": "Bullet Seed",
			"type": "Grass",
			"category": "Physical",
			"power": 25,
			"accuracy": 100,
			"effects": "Hits two to five times. Has a 35% chance to hit two or three times and a 15% chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times.",
			"summary": "Hits 2-5 times in one turn."
		},
		"burningjealousy": {
			"name": "Burning Jealousy",
			"type": "Fire",
			"category": "Special",
			"power": 70,
			"accuracy": 100,
			"effects": "Has a 100% chance to burn the target if it had a stat stage raised this turn.",
			"summary": "100% burns a target that had a stat rise this turn."
		},
		"calmmind": {
			"name": "Calm Mind",
			"type": "Psychic",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "Raises the user's Special Attack and Special Defense by 1 stage.",
			"summary": "Raises the user's Sp. Atk and Sp. Def by 1."
		},
		"chargebeam": {
			"name": "Charge Beam",
			"type": "Electric",
			"category": "Special",
			"power": 50,
			"accuracy": 90,
			"effects": "Has a 70% chance to raise the user's Special Attack by 1 stage.",
			"summary": "70% chance to raise the user's Sp. Atk by 1."
		},
		"charm": {
			"name": "Charm",
			"type": "Fairy",
			"category": "Status",
			"power": 0,
			"accuracy": 100,
			"effects": "Lowers the target's Attack by 2 stages.",
			"summary": "Lowers the target's Attack by 2."
		},
		"circlethrow": {
			"name": "Circle Throw",
			"type": "Fighting",
			"category": "Physical",
			"power": 60,
			"accuracy": 90,
			"effects": "If both the user and the target have not fainted, the target is forced to switch out and be replaced with a random unfainted ally. This effect fails if the target is under the effect of Ingrain, has the Suction Cups Ability, or this move hit a substitute.",
			"summary": "Forces the target to switch to a random ally."
		},
		"clangingscales": {
			"name": "Clanging Scales",
			"type": "Dragon",
			"category": "Special",
			"power": 110,
			"accuracy": 100,
			"effects": "Lowers the user's Defense by 1 stage.",
			"summary": "Lowers the user's Defense by 1."
		},
		"clangoroussoul": {
			"name": "Clangorous Soul",
			"type": "Dragon",
			"category": "Status",
			"power": 0,
			"accuracy": 100,
			"effects": "Raises the user's Attack, Defense, Special Attack, Special Defense, and Speed by 1 stage in exchange for the user losing 33% of its maximum HP, rounded down. Fails if the user would faint or if its Attack, Defense, Special Attack, Special Defense, and Speed stat stages would not change.",
			"summary": "User loses 33% of its max HP. +1 to all stats."
		},
		"clearsmog": {
			"name": "Clear Smog",
			"type": "Poison",
			"category": "Special",
			"power": 50,
			"accuracy": true,
			"effects": "Resets all of the target's stat stages to 0.",
			"summary": "Resets all of the target's stat stages to 0."
		},
		"closecombat": {
			"name": "Close Combat",
			"type": "Fighting",
			"category": "Physical",
			"power": 120,
			"accuracy": 100,
			"effects": "Lowers the user's Defense and Special Defense by 1 stage.",
			"summary": "Lowers the user's Defense and Sp. Def by 1."
		},
		"coil": {
			"name": "Coil",
			"type": "Poison",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "Raises the user's Attack, Defense, and accuracy by 1 stage.",
			"summary": "Raises user's Attack, Defense, accuracy by 1."
		},
		"confuseray": {
			"name": "Confuse Ray",
			"type": "Ghost",
			"category": "Status",
			"power": 0,
			"accuracy": 100,
			"effects": "Causes the target to become confused.",
			"summary": "Confuses the target."
		},
		"copycat": {
			"name": "Copycat",
			"type": "Normal",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "Uses the last move used in the battle.",
			"summary": "Uses the last move used in the battle."
		},
		"cosmicpower": {
			"name": "Cosmic Power",
			"type": "Psychic",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "Raises the user's Defense and Special Defense by 1 stage.",
			"summary": "Raises the user's Defense and Sp. Def by 1."
		},
		"cottonguard": {
			"name": "Cotton Guard",
			"type": "Grass",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "Raises the user's Defense by 3 stages.",
			"summary": "Raises the user's Defense by 3."
		},
		"cottonspore": {
			"name": "Cotton Spore",
			"type": "Grass",
			"category": "Status",
			"power": 0,
			"accuracy": 100,
			"effects": "Lowers the target's Speed by 2 stages.",
			"summary": "Lowers the target's Speed by 2."
		},
		"counter": {
			"name": "Counter",
			"type": "Fighting",
			"category": "Physical",
			"power": 0,
			"accuracy": 100,
			"effects": "If hit by physical attack, returns double damage.",
			"summary": "If hit by physical attack, returns double damage."
		},
		"courtchange": {
			"name": "Court Change",
			"type": "Normal",
			"category": "Status",
			"power": 0,
			"accuracy": 100,
			"effects": "Switches the Mist, Light Screen, Reflect, Spikes, Safeguard, Tailwind, Toxic Spikes, Stealth Rock, Water Pledge, Fire Pledge, Grass Pledge, Sticky Web, Aurora Veil, G-Max Steelsurge, G-Max Cannonade, G-Max Vine Lash, and G-Max Wildfire effects from the user's side to the opposing side and vice versa.",
			"summary": "Swaps user's field effects with the opposing side."
		},
		"crabhammer": {
			"name": "Crabhammer",
			"type": "Water",
			"category": "Physical",
			"power": 100,
			"accuracy": 90,
			"effects": "Has a higher chance for a critical hit.",
			"summary": "High critical hit ratio."
		},
		"crosschop": {
			"name": "Cross Chop",
			"type": "Fighting",
			"category": "Physical",
			"power": 100,
			"accuracy": 80,
			"effects": "Has a higher chance for a critical hit.",
			"summary": "High critical hit ratio."
		},
		"crosspoison": {
			"name": "Cross Poison",
			"type": "Poison",
			"category": "Physical",
			"power": 70,
			"accuracy": 100,
			"effects": "Has a 10% chance to poison the target and a higher chance for a critical hit.",
			"summary": "High critical hit ratio. 10% chance to poison."
		},
		"crunch": {
			"name": "Crunch",
			"type": "Dark",
			"category": "Physical",
			"power": 80,
			"accuracy": 100,
			"effects": "Has a 20% chance to lower the target's Defense by 1 stage.",
			"summary": "20% chance to lower the target's Defense by 1."
		},
		"crushclaw": {
			"name": "Crush Claw",
			"type": "Normal",
			"category": "Physical",
			"power": 75,
			"accuracy": 95,
			"effects": "Has a 50% chance to lower the target's Defense by 1 stage.",
			"summary": "50% chance to lower the target's Defense by 1."
		},
		"crushgrip": {
			"name": "Crush Grip",
			"type": "Normal",
			"category": "Physical",
			"power": 0,
			"accuracy": 100,
			"effects": "Power is equal to 120 × (target's current HP / target's maximum HP), rounded half down, but not less than 1.",
			"summary": "More power the more HP the target has left."
		},
		"curse": {
			"name": "Curse",
			"type": "Ghost",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "Curses if Ghost, else -1 Spe, +1 Atk, +1 Def.",
			"summary": "Curses if Ghost, else -1 Spe, +1 Atk, +1 Def."
		},
		"darkpulse": {
			"name": "Dark Pulse",
			"type": "Dark",
			"category": "Special",
			"power": 80,
			"accuracy": 100,
			"effects": "Has a 20% chance to make the target flinch.",
			"summary": "20% chance to make the target flinch."
		},
		"darkestlariat": {
			"name": "Darkest Lariat",
			"type": "Dark",
			"category": "Physical",
			"power": 85,
			"accuracy": 100,
			"effects": "Ignores the target's stat stage changes, including evasiveness.",
			"summary": "Ignores the target's stat stage changes."
		},
		"dazzlinggleam": {
			"name": "Dazzling Gleam",
			"type": "Fairy",
			"category": "Special",
			"power": 80,
			"accuracy": 100,
			"effects": "No additional effect. Hits adjacent foes.",
			"summary": "No additional effect. Hits adjacent foes."
		},
		"decorate": {
			"name": "Decorate",
			"type": "Fairy",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "Raises the target's Attack and Special Attack by 2 stages.",
			"summary": "Raises the target's Attack and Sp. Atk by 2."
		},
		"defendorder": {
			"name": "Defend Order",
			"type": "Bug",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "Raises the user's Defense and Special Defense by 1 stage.",
			"summary": "Raises the user's Defense and Sp. Def by 1."
		},
		"destinybond": {
			"name": "Destiny Bond",
			"type": "Ghost",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "Until the user's next move, if an opposing Pokemon's attack knocks the user out, that Pokemon faints as well, unless the attack was Doom Desire or Future Sight. Fails if the user used this move successfully as its last move, disregarding moves used through the Dancer Ability.",
			"summary": "If an opponent knocks out the user, it also faints."
		},
		"detect": {
			"name": "Detect",
			"type": "Fighting",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "Prevents moves from affecting the user this turn.",
			"summary": "Prevents moves from affecting the user this turn."
		},
		"diamondstorm": {
			"name": "Diamond Storm",
			"type": "Rock",
			"category": "Physical",
			"power": 100,
			"accuracy": 95,
			"effects": "Has a 50% chance to raise the user's Defense by 2 stages.",
			"summary": "50% chance to raise user's Defense by 2."
		},
		"dig": {
			"name": "Dig",
			"type": "Ground",
			"category": "Physical",
			"power": 80,
			"accuracy": 100,
			"effects": "This attack charges on the first turn and executes on the second. On the first turn, the user avoids all attacks other than Earthquake and Magnitude but takes double damage from them, and is also unaffected by weather. If the user is holding a Power Herb, the move completes in one turn.",
			"summary": "Digs underground turn 1, strikes turn 2."
		},
		"disable": {
			"name": "Disable",
			"type": "Normal",
			"category": "Status",
			"power": 0,
			"accuracy": 100,
			"effects": "For 4 turns, the target's last move used becomes disabled. Fails if one of the target's moves is already disabled, if the target has not made a move, if the target no longer knows the move, or if the move was a Max or G-Max Move.",
			"summary": "For 4 turns, disables the target's last move used."
		},
		"discharge": {
			"name": "Discharge",
			"type": "Electric",
			"category": "Special",
			"power": 80,
			"accuracy": 100,
			"effects": "Has a 30% chance to paralyze the target.",
			"summary": "30% chance to paralyze adjacent Pokemon."
		},
		"dive": {
			"name": "Dive",
			"type": "Water",
			"category": "Physical",
			"power": 80,
			"accuracy": 100,
			"effects": "This attack charges on the first turn and executes on the second. On the first turn, the user avoids all attacks other than Surf and Whirlpool but takes double damage from them, and is also unaffected by weather. If the user is holding a Power Herb, the move completes in one turn.",
			"summary": "Dives underwater turn 1, strikes turn 2."
		},
		"doublehit": {
			"name": "Double Hit",
			"type": "Normal",
			"category": "Physical",
			"power": 35,
			"accuracy": 90,
			"effects": "Hits twice. If the first hit breaks the target's substitute, it will take damage for the second hit.",
			"summary": "Hits 2 times in one turn."
		},
		"doubleironbash": {
			"name": "Double Iron Bash",
			"type": "Steel",
			"category": "Physical",
			"power": 60,
			"accuracy": 100,
			"effects": "Hits twice. If the first hit breaks the target's substitute, it will take damage for the second hit. Has a 30% chance to make the target flinch.",
			"summary": "Hits twice. 30% chance to make the target flinch."
		},
		"doublekick": {
			"name": "Double Kick",
			"type": "Fighting",
			"category": "Physical",
			"power": 30,
			"accuracy": 100,
			"effects": "Hits twice. If the first hit breaks the target's substitute, it will take damage for the second hit.",
			"summary": "Hits 2 times in one turn."
		},
		"doubleteam": {
			"name": "Double Team",
			"type": "Normal",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "Raises the user's evasiveness by 1 stage.",
			"summary": "Raises the user's evasiveness by 1."
		},
		"doubleedge": {
			"name": "Double-Edge",
			"type": "Normal",
			"category": "Physical",
			"power": 120,
			"accuracy": 100,
			"effects": "If the target lost HP, the user takes recoil damage equal to 33% the HP lost by the target, rounded half up, but not less than 1 HP.",
			"summary": "Has 33% recoil."
		},
		"dracometeor": {
			"name": "Draco Meteor",
			"type": "Dragon",
			"category": "Special",
			"power": 130,
			"accuracy": 90,
			"effects": "Lowers the user's Special Attack by 2 stages.",
			"summary": "Lowers the user's Sp. Atk by 2."
		},
		"dragonascent": {
			"name": "Dragon Ascent",
			"type": "Flying",
			"category": "Physical",
			"power": 120,
			"accuracy": 100,
			"effects": "Lowers the user's Defense and Special Defense by 1 stage.",
			"summary": "Lowers the user's Defense and Sp. Def by 1."
		},
		"dragonclaw": {
			"name": "Dragon Claw",
			"type": "Dragon",
			"category": "Physical",
			"power": 80,
			"accuracy": 100,
			"effects": "No additional effect.",
			"summary": "No additional effect."
		},
		"dragondance": {
			"name": "Dragon Dance",
			"type": "Dragon",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "Raises the user's Attack and Speed by 1 stage.",
			"summary": "Raises the user's Attack and Speed by 1."
		},
		"dragondarts": {
			"name": "Dragon Darts",
			"type": "Dragon",
			"category": "Physical",
			"power": 50,
			"accuracy": 100,
			"effects": "Hits twice. If the first hit breaks the target's substitute, it will take damage for the second hit. In Double Battles, this move attempts to hit the targeted Pokemon and its ally once each. If hitting one of these Pokemon would be prevented by immunity, protection, semi-invulnerability, an Ability, or accuracy, it attempts to hit the other Pokemon twice instead. If this move is redirected, it hits that target twice.",
			"summary": "Hits twice. Doubles: Tries to hit each foe once."
		},
		"dragonenergy": {
			"name": "Dragon Energy",
			"type": "Dragon",
			"category": "Special",
			"power": 150,
			"accuracy": 100,
			"effects": "Power is equal to (user's current HP × 150 / user's maximum HP), rounded down, but not less than 1.",
			"summary": "Less power as user's HP decreases. Hits foe(s)."
		},
		"dragonpulse": {
			"name": "Dragon Pulse",
			"type": "Dragon",
			"category": "Special",
			"power": 85,
			"accuracy": 100,
			"effects": "No additional effect.",
			"summary": "No additional effect."
		},
		"dragonrush": {
			"name": "Dragon Rush",
			"type": "Dragon",
			"category": "Physical",
			"power": 100,
			"accuracy": 75,
			"effects": "Has a 20% chance to make the target flinch. Damage doubles and no accuracy check is done if the target has used Minimize while active.",
			"summary": "20% chance to make the target flinch."
		},
		"dragontail": {
			"name": "Dragon Tail",
			"type": "Dragon",
			"category": "Physical",
			"power": 60,
			"accuracy": 90,
			"effects": "If both the user and the target have not fainted, the target is forced to switch out and be replaced with a random unfainted ally. This effect fails if the target used Ingrain previously, has the Suction Cups Ability, or this move hit a substitute.",
			"summary": "Forces the target to switch to a random ally."
		},
		"drainpunch": {
			"name": "Drain Punch",
			"type": "Fighting",
			"category": "Physical",
			"power": 75,
			"accuracy": 100,
			"effects": "The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3× normal, rounded half down.",
			"summary": "User recovers 50% of the damage dealt."
		},
		"drainingkiss": {
			"name": "Draining Kiss",
			"type": "Fairy",
			"category": "Special",
			"power": 50,
			"accuracy": 100,
			"effects": "The user recovers 3/4 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3× normal, rounded half down.",
			"summary": "User recovers 75% of the damage dealt."
		},
		"dreameater": {
			"name": "Dream Eater",
			"type": "Psychic",
			"category": "Special",
			"power": 100,
			"accuracy": 100,
			"effects": "The target is unaffected by this move unless it is asleep. The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3× normal, rounded half down.",
			"summary": "User gains 1/2 HP inflicted. Sleeping target only."
		},
		"drillrun": {
			"name": "Drill Run",
			"type": "Ground",
			"category": "Physical",
			"power": 80,
			"accuracy": 95,
			"effects": "Has a higher chance for a critical hit.",
			"summary": "High critical hit ratio."
		},
		"drumbeating": {
			"name": "Drum Beating",
			"type": "Grass",
			"category": "Physical",
			"power": 80,
			"accuracy": 100,
			"effects": "Has a 100% chance to lower the target's Speed by 1 stage.",
			"summary": "100% chance to lower the target's Speed by 1."
		},
		"dualwingbeat": {
			"name": "Dual Wingbeat",
			"type": "Flying",
			"category": "Physical",
			"power": 40,
			"accuracy": 90,
			"effects": "Hits twice. If the first hit breaks the target's substitute, it will take damage for the second hit.",
			"summary": "Hits 2 times in one turn."
		},
		"dynamicpunch": {
			"name": "Dynamic Punch",
			"type": "Fighting",
			"category": "Physical",
			"power": 100,
			"accuracy": 50,
			"effects": "Has a 100% chance to confuse the target.",
			"summary": "100% chance to confuse the target."
		},
		"earthpower": {
			"name": "Earth Power",
			"type": "Ground",
			"category": "Special",
			"power": 90,
			"accuracy": 100,
			"effects": "Has a 10% chance to lower the target's Special Defense by 1 stage.",
			"summary": "10% chance to lower the target's Sp. Def by 1."
		},
		"earthquake": {
			"name": "Earthquake",
			"type": "Ground",
			"category": "Physical",
			"power": 100,
			"accuracy": 100,
			"effects": "Damage doubles if the target is using Dig.",
			"summary": "Hits adjacent Pokemon. Double damage on Dig."
		},
		"eerieimpulse": {
			"name": "Eerie Impulse",
			"type": "Electric",
			"category": "Status",
			"power": 0,
			"accuracy": 100,
			"effects": "Lowers the target's Special Attack by 2 stages.",
			"summary": "Lowers the target's Sp. Atk by 2."
		},
		"eeriespell": {
			"name": "Eerie Spell",
			"type": "Psychic",
			"category": "Special",
			"power": 80,
			"accuracy": 100,
			"effects": "If this move is successful and the user has not fainted, the target loses 3 PP from its last move.",
			"summary": "Removes 3 PP from the target's last move."
		},
		"electricterrain": {
			"name": "Electric Terrain",
			"type": "Electric",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "5 turns. Grounded: +Electric power, can't sleep.",
			"summary": "5 turns. Grounded: +Electric power, can't sleep."
		},
		"electroball": {
			"name": "Electro Ball",
			"type": "Electric",
			"category": "Special",
			"power": 0,
			"accuracy": 100,
			"effects": "The power of this move depends on (user's current Speed / target's current Speed), rounded down. Power is equal to 150 if the result is 4 or more, 120 if 3, 80 if 2, 60 if 1, 40 if less than 1. If the target's current Speed is 0, this move's power is 40.",
			"summary": "More power the faster the user is than the target."
		},
		"electroweb": {
			"name": "Electroweb",
			"type": "Electric",
			"category": "Special",
			"power": 55,
			"accuracy": 95,
			"effects": "Has a 100% chance to lower the target's Speed by 1 stage.",
			"summary": "100% chance to lower the foe(s) Speed by 1."
		},
		"ember": {
			"name": "Ember",
			"type": "Fire",
			"category": "Special",
			"power": 40,
			"accuracy": 100,
			"effects": "Has a 10% chance to burn the target.",
			"summary": "10% chance to burn the target."
		},
		"encore": {
			"name": "Encore",
			"type": "Normal",
			"category": "Status",
			"power": 0,
			"accuracy": 100,
			"effects": "For its next 3 turns, the target is forced to repeat its last move used. If the affected move runs out of PP, the effect ends. Fails if the target is already under this effect, if it has not made a move, if the move has 0 PP, if the target is Dynamaxed, or if the move is Assist, Copycat, Dynamax Cannon, Encore, Me First, Metronome, Mimic, Mirror Move, Nature Power, Sketch, Sleep Talk, Struggle, or Transform.",
			"summary": "Target repeats its last move for its next 3 turns."
		},
		"endure": {
			"name": "Endure",
			"type": "Normal",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "User survives attacks this turn with at least 1 HP.",
			"summary": "User survives attacks this turn with at least 1 HP."
		},
		"energyball": {
			"name": "Energy Ball",
			"type": "Grass",
			"category": "Special",
			"power": 90,
			"accuracy": 100,
			"effects": "Has a 10% chance to lower the target's Special Defense by 1 stage.",
			"summary": "10% chance to lower the target's Sp. Def by 1."
		},
		"entrainment": {
			"name": "Entrainment",
			"type": "Normal",
			"category": "Status",
			"power": 0,
			"accuracy": 100,
			"effects": "The target's Ability changes to match the user's.",
			"summary": "The target's Ability changes to match the user's."
		},
		"expandingforce": {
			"name": "Expanding Force",
			"type": "Psychic",
			"category": "Special",
			"power": 80,
			"accuracy": 100,
			"effects": "If the current terrain is Psychic Terrain and the user is grounded, this move hits all opposing Pokemon and has its power multiplied by 1.5.",
			"summary": "User on Psychic Terrain: 1.5× power, hits foes."
		},
		"extrasensory": {
			"name": "Extrasensory",
			"type": "Psychic",
			"category": "Special",
			"power": 80,
			"accuracy": 100,
			"effects": "Has a 10% chance to make the target flinch.",
			"summary": "10% chance to make the target flinch."
		},
		"extremespeed": {
			"name": "Extreme Speed",
			"type": "Normal",
			"category": "Physical",
			"power": 80,
			"accuracy": 100,
			"effects": "Nearly always goes first.",
			"summary": "Nearly always goes first."
		},
		"fakeout": {
			"name": "Fake Out",
			"type": "Normal",
			"category": "Physical",
			"power": 40,
			"accuracy": 100,
			"effects": "Has a 100% chance to make the target flinch. Fails unless it is the user's first turn on the field.",
			"summary": "Hits first. First turn out only. 100% flinch chance."
		},
		"faketears": {
			"name": "Fake Tears",
			"type": "Dark",
			"category": "Status",
			"power": 0,
			"accuracy": 100,
			"effects": "Lowers the target's Special Defense by 2 stages.",
			"summary": "Lowers the target's Sp. Def by 2."
		},
		"facade": {
			"name": "Facade",
			"type": "Normal",
			"category": "Physical",
			"power": 70,
			"accuracy": 100,
			"effects": "Power doubles if the user is burned, paralyzed, or poisoned. The physical damage halving effect from the user's burn is ignored.",
			"summary": "Power doubles if user is burn/poison/paralyzed."
		},
		"feint": {
			"name": "Feint",
			"type": "Normal",
			"category": "Physical",
			"power": 30,
			"accuracy": 100,
			"effects": "If this move is successful, it breaks through the target's Baneful Bunker, Detect, King's Shield, Protect, or Spiky Shield for this turn, allowing other Pokemon to attack the target normally. If the target's side is protected by Crafty Shield, Mat Block, Quick Guard, or Wide Guard, that protection is also broken for this turn and other Pokemon may attack the target's side normally.",
			"summary": "Nullifies Detect, Protect, and Quick/Wide Guard."
		},
		"fierydance": {
			"name": "Fiery Dance",
			"type": "Fire",
			"category": "Special",
			"power": 80,
			"accuracy": 100,
			"effects": "Has a 50% chance to raise the user's Special Attack by 1 stage.",
			"summary": "50% chance to raise the user's Sp. Atk by 1."
		},
		"fierywrath": {
			"name": "Fiery Wrath",
			"type": "Dark",
			"category": "Special",
			"power": 90,
			"accuracy": 100,
			"effects": "Has a 20% chance to make the target flinch.",
			"summary": "20% chance to make the foe(s) flinch."
		},
		"fireblast": {
			"name": "Fire Blast",
			"type": "Fire",
			"category": "Special",
			"power": 110,
			"accuracy": 85,
			"effects": "Has a 10% chance to burn the target.",
			"summary": "10% chance to burn the target."
		},
		"firefang": {
			"name": "Fire Fang",
			"type": "Fire",
			"category": "Physical",
			"power": 65,
			"accuracy": 95,
			"effects": "Has a 10% chance to burn the target and a 10% chance to make it flinch.",
			"summary": "10% chance to burn. 10% chance to flinch."
		},
		"firelash": {
			"name": "Fire Lash",
			"type": "Fire",
			"category": "Physical",
			"power": 80,
			"accuracy": 100,
			"effects": "Has a 100% chance to lower the target's Defense by 1 stage.",
			"summary": "100% chance to lower the target's Defense by 1."
		},
		"firepunch": {
			"name": "Fire Punch",
			"type": "Fire",
			"category": "Physical",
			"power": 75,
			"accuracy": 100,
			"effects": "Has a 10% chance to burn the target.",
			"summary": "10% chance to burn the target."
		},
		"firespin": {
			"name": "Fire Spin",
			"type": "Fire",
			"category": "Special",
			"power": 35,
			"accuracy": 85,
			"effects": "Traps and damages the target for 4-5 turns.",
			"summary": "Traps and damages the target for 4-5 turns."
		},
		"firstimpression": {
			"name": "First Impression",
			"type": "Bug",
			"category": "Physical",
			"power": 90,
			"accuracy": 100,
			"effects": "Fails unless it is the user's first turn on the field.",
			"summary": "Nearly always goes first. First turn out only."
		},
		"fishiousrend": {
			"name": "Fishious Rend",
			"type": "Water",
			"category": "Physical",
			"power": 85,
			"accuracy": 100,
			"effects": "Power doubles if the user moves before the target.",
			"summary": "Power doubles if user moves before the target."
		},
		"flamecharge": {
			"name": "Flame Charge",
			"type": "Fire",
			"category": "Physical",
			"power": 50,
			"accuracy": 100,
			"effects": "Has a 100% chance to raise the user's Speed by 1 stage.",
			"summary": "100% chance to raise the user's Speed by 1."
		},
		"flamethrower": {
			"name": "Flamethrower",
			"type": "Fire",
			"category": "Special",
			"power": 90,
			"accuracy": 100,
			"effects": "Has a 10% chance to burn the target.",
			"summary": "10% chance to burn the target."
		},
		"flareblitz": {
			"name": "Flare Blitz",
			"type": "Fire",
			"category": "Physical",
			"power": 120,
			"accuracy": 100,
			"effects": "Has a 10% chance to burn the target. If the target lost HP, the user takes recoil damage equal to 33% the HP lost by the target, rounded half up, but not less than 1 HP.",
			"summary": "Has 33% recoil. 10% chance to burn. Thaws user."
		},
		"flashcannon": {
			"name": "Flash Cannon",
			"type": "Steel",
			"category": "Special",
			"power": 80,
			"accuracy": 100,
			"effects": "Has a 10% chance to lower the target's Special Defense by 1 stage.",
			"summary": "10% chance to lower the target's Sp. Def by 1."
		},
		"flatter": {
			"name": "Flatter",
			"type": "Dark",
			"category": "Status",
			"power": 0,
			"accuracy": 100,
			"effects": "Raises the target's Special Attack by 1 stage and confuses it.",
			"summary": "Raises the target's Sp. Atk by 1 and confuses it."
		},
		"fleurcannon": {
			"name": "Fleur Cannon",
			"type": "Fairy",
			"category": "Special",
			"power": 130,
			"accuracy": 90,
			"effects": "Lowers the user's Special Attack by 2 stages.",
			"summary": "Lowers the user's Sp. Atk by 2."
		},
		"flipturn": {
			"name": "Flip Turn",
			"type": "Water",
			"category": "Physical",
			"power": 60,
			"accuracy": 100,
			"effects": "If this move is successful and the user has not fainted, the user switches out even if it is trapped and is replaced immediately by a selected party member. The user does not switch out if there are no unfainted party members, or if the target switched out using an Eject Button or through the effect of the Emergency Exit or Wimp Out Abilities.",
			"summary": "User switches out after damaging the target."
		},
		"floralhealing": {
			"name": "Floral Healing",
			"type": "Fairy",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "The target restores 1/2 of its maximum HP, rounded half up. If the terrain is Grassy Terrain, the target instead restores 2/3 of its maximum HP, rounded half down.",
			"summary": "Heals the target by 50% of its max HP."
		},
		"focusblast": {
			"name": "Focus Blast",
			"type": "Fighting",
			"category": "Special",
			"power": 120,
			"accuracy": 70,
			"effects": "Has a 10% chance to lower the target's Special Defense by 1 stage.",
			"summary": "10% chance to lower the target's Sp. Def by 1."
		},
		"focusenergy": {
			"name": "Focus Energy",
			"type": "Normal",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "Raises the user's chance for a critical hit by 2 stages. Fails if the user already has the effect. Baton Pass can be used to transfer this effect to an ally.",
			"summary": "Raises the user's critical hit ratio by 2."
		},
		"followme": {
			"name": "Follow Me",
			"type": "Normal",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "Until the end of the turn, all single-target attacks from the opposing side are redirected to the user. Such attacks are redirected to the user before they can be reflected by Magic Coat or the Magic Bounce Ability, or drawn in by the Lightning Rod or Storm Drain Abilities. Fails if it is not a Double Battle or Battle Royal. This effect is ignored while the user is under the effect of Sky Drop.",
			"summary": "The foes' moves target the user on the turn used."
		},
		"foulplay": {
			"name": "Foul Play",
			"type": "Dark",
			"category": "Physical",
			"power": 95,
			"accuracy": 100,
			"effects": "Damage is calculated using the target's Attack stat, including stat stage changes. The user's Ability, item, and burn are used as normal.",
			"summary": "Uses target's Attack stat in damage calculation."
		},
		"freezedry": {
			"name": "Freeze-Dry",
			"type": "Ice",
			"category": "Special",
			"power": 70,
			"accuracy": 100,
			"effects": "Has a 10% chance to freeze the target. This move's type effectiveness against Water is changed to be super effective no matter what this move's type is.",
			"summary": "10% chance to freeze. Super effective on Water."
		},
		"freezingglare": {
			"name": "Freezing Glare",
			"type": "Psychic",
			"category": "Special",
			"power": 90,
			"accuracy": 100,
			"effects": "Has a 10% chance to freeze the target.",
			"summary": "10% chance to freeze the target."
		},
		"frostbreath": {
			"name": "Frost Breath",
			"type": "Ice",
			"category": "Special",
			"power": 60,
			"accuracy": 90,
			"effects": "This move is always a critical hit unless the target is under the effect of Lucky Chant or has the Battle Armor or Shell Armor Abilities.",
			"summary": "Always results in a critical hit."
		},
		"futuresight": {
			"name": "Future Sight",
			"type": "Psychic",
			"category": "Special",
			"power": 120,
			"accuracy": 100,
			"effects": "Hits two turns after being used.",
			"summary": "Hits two turns after being used."
		},
		"geargrind": {
			"name": "Gear Grind",
			"type": "Steel",
			"category": "Physical",
			"power": 50,
			"accuracy": 85,
			"effects": "Hits twice. If the first hit breaks the target's substitute, it will take damage for the second hit.",
			"summary": "Hits 2 times in one turn."
		},
		"geomancy": {
			"name": "Geomancy",
			"type": "Fairy",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "Raises the user's Special Attack, Special Defense, and Speed by 2 stages. This attack charges on the first turn and executes on the second. If the user is holding a Power Herb, the move completes in one turn.",
			"summary": "Charges, then raises SpA, SpD, Spe by 2 turn 2."
		},
		"gigadrain": {
			"name": "Giga Drain",
			"type": "Grass",
			"category": "Special",
			"power": 75,
			"accuracy": 100,
			"effects": "The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3× normal, rounded half down.",
			"summary": "User recovers 50% of the damage dealt."
		},
		"glaciallance": {
			"name": "Glacial Lance",
			"type": "Ice",
			"category": "Physical",
			"power": 130,
			"accuracy": 100,
			"effects": "No additional effect. Hits adjacent foes.",
			"summary": "No additional effect. Hits adjacent foes."
		},
		"glare": {
			"name": "Glare",
			"type": "Normal",
			"category": "Status",
			"power": 0,
			"accuracy": 100,
			"effects": "Paralyzes the target.",
			"summary": "Paralyzes the target."
		},
		"grassknot": {
			"name": "Grass Knot",
			"type": "Grass",
			"category": "Special",
			"power": 0,
			"accuracy": 100,
			"effects": "This move's power is 20 if the target weighs less than 10 kg, 40 if less than 25 kg, 60 if less than 50 kg, 80 if less than 100 kg, 100 if less than 200 kg, and 120 if greater than or equal to 200 kg.",
			"summary": "More power the heavier the target."
		},
		"grassyglide": {
			"name": "Grassy Glide",
			"type": "Grass",
			"category": "Physical",
			"power": 70,
			"accuracy": 100,
			"effects": "If the current terrain is Grassy Terrain and the user is grounded, this move has its priority increased by 1.",
			"summary": "User on Grassy Terrain: +1 priority."
		},
		"grassyterrain": {
			"name": "Grassy Terrain",
			"type": "Grass",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "5 turns. Grounded: +Grass power, +1/16 max HP.",
			"summary": "5 turns. Grounded: +Grass power, +1/16 max HP."
		},
		"gravapple": {
			"name": "Grav Apple",
			"type": "Grass",
			"category": "Physical",
			"power": 80,
			"accuracy": 100,
			"effects": "Has a 100% chance to lower the target's Defense by 1 stage. Power is multiplied by 1.5 during Gravity's effect.",
			"summary": "Target: 100% -1 Def. During Gravity: 1.5× power."
		},
		"gravity": {
			"name": "Gravity",
			"type": "Psychic",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "5 turns: no Ground immunities, 1.67× accuracy.",
			"summary": "5 turns: no Ground immunities, 1.67× accuracy."
		},
		"growl": {
			"name": "Growl",
			"type": "Normal",
			"category": "Status",
			"power": 0,
			"accuracy": 100,
			"effects": "Lowers the target's Attack by 1 stage.",
			"summary": "Lowers the foe(s) Attack by 1."
		},
		"growth": {
			"name": "Growth",
			"type": "Normal",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "Raises the user's Attack and Special Attack by 1 stage. If the weather is Sun or Intense Sun, this move raises the user's Attack and Special Attack by 2 stages. If the user is holding Utility Umbrella, this move will only raise the user's Attack and Special Attack by 1 stage, even if the weather is Sun or Intense Sun.",
			"summary": "Raises user's Attack and Sp. Atk by 1; 2 in Sun."
		},
		"guardsplit": {
			"name": "Guard Split",
			"type": "Psychic",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "The user and the target have their Defense and Special Defense stats set to be equal to the average of the user and the target's Defense and Special Defense stats, respectively, rounded down. Stat stage changes are unaffected.",
			"summary": "Averages Defense and Sp. Def stats with target."
		},
		"gunkshot": {
			"name": "Gunk Shot",
			"type": "Poison",
			"category": "Physical",
			"power": 120,
			"accuracy": 80,
			"effects": "Has a 30% chance to poison the target.",
			"summary": "30% chance to poison the target."
		},
		"gyroball": {
			"name": "Gyro Ball",
			"type": "Steel",
			"category": "Physical",
			"power": 0,
			"accuracy": 100,
			"effects": "Power is equal to (25 * target's current Speed / user's current Speed) + 1, rounded down, but not more than 150. If the user's current Speed is 0, this move's power is 1.",
			"summary": "More power the slower the user than the target."
		},
		"hail": {
			"name": "Hail",
			"type": "Ice",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "For 5 turns, the weather becomes Hail. At the end of each turn except the last, all active Pokemon lose 1/16 of their maximum HP, rounded down, unless they are an Ice type or have the Ice Body, Magic Guard, Overcoat, or Snow Cloak Abilities. Lasts for 8 turns if the user is holding Icy Rock. Fails if the current weather is Hail.",
			"summary": "For 5 turns, hail crashes down."
		},
		"hammerarm": {
			"name": "Hammer Arm",
			"type": "Fighting",
			"category": "Physical",
			"power": 100,
			"accuracy": 90,
			"effects": "Lowers the user's Speed by 1 stage.",
			"summary": "Lowers the user's Speed by 1."
		},
		"haze": {
			"name": "Haze",
			"type": "Ice",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "Resets the stat stages of all active Pokemon to 0.",
			"summary": "Eliminates all stat changes."
		},
		"headsmash": {
			"name": "Head Smash",
			"type": "Rock",
			"category": "Physical",
			"power": 150,
			"accuracy": 80,
			"effects": "If the target lost HP, the user takes recoil damage equal to 1/2 the HP lost by the target, rounded half up, but not less than 1 HP.",
			"summary": "Has 1/2 recoil."
		},
		"headbutt": {
			"name": "Headbutt",
			"type": "Normal",
			"category": "Physical",
			"power": 70,
			"accuracy": 100,
			"effects": "Has a 30% chance to make the target flinch.",
			"summary": "30% chance to make the target flinch."
		},
		"healbell": {
			"name": "Heal Bell",
			"type": "Normal",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "Every Pokemon in the user's party is cured of its non-volatile status condition. Active Pokemon with the Soundproof Ability are not cured, unless they are the user.",
			"summary": "Cures the user's party of all status conditions."
		},
		"healorder": {
			"name": "Heal Order",
			"type": "Bug",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "The user restores 1/2 of its maximum HP, rounded half up.",
			"summary": "Heals the user by 50% of its max HP."
		},
		"healpulse": {
			"name": "Heal Pulse",
			"type": "Psychic",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "The target restores 1/2 of its maximum HP, rounded half up. If the user has the Mega Launcher Ability, the target instead restores 3/4 of its maximum HP, rounded half down.",
			"summary": "Heals the target by 50% of its max HP."
		},
		"healingwish": {
			"name": "Healing Wish",
			"type": "Psychic",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "User faints. Next hurt Pokemon is fully healed.",
			"summary": "User faints. Next hurt Pokemon is fully healed."
		},
		"heatcrash": {
			"name": "Heat Crash",
			"type": "Fire",
			"category": "Physical",
			"power": 0,
			"accuracy": 100,
			"effects": "The power of this move depends on (user's weight / target's weight), rounded down. Power is equal to 120 if the result is 5 or more, 100 if 4, 80 if 3, 60 if 2, and 40 if 1 or less. Damage doubles and no accuracy check is done if the target has used Minimize while active.",
			"summary": "More power the heavier the user than the target."
		},
		"heatwave": {
			"name": "Heat Wave",
			"type": "Fire",
			"category": "Special",
			"power": 95,
			"accuracy": 90,
			"effects": "Has a 10% chance to burn the target.",
			"summary": "10% chance to burn the foe(s)."
		},
		"heavyslam": {
			"name": "Heavy Slam",
			"type": "Steel",
			"category": "Physical",
			"power": 0,
			"accuracy": 100,
			"effects": "The power of this move depends on (user's weight / target's weight), rounded down. Power is equal to 120 if the result is 5 or more, 100 if 4, 80 if 3, 60 if 2, and 40 if 1 or less. Damage doubles and no accuracy check is done if the target has used Minimize while active.",
			"summary": "More power the heavier the user than the target."
		},
		"helpinghand": {
			"name": "Helping Hand",
			"type": "Normal",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "The power of the target's attack this turn is multiplied by 1.5 (this effect is stackable). Fails if there is no ally adjacent to the user or if the ally already moved this turn, but does not fail if the ally is using a two-turn move.",
			"summary": "One adjacent ally's move power is 1.5× this turn."
		},
		"hex": {
			"name": "Hex",
			"type": "Ghost",
			"category": "Special",
			"power": 65,
			"accuracy": 100,
			"effects": "Power doubles if the target has a non-volatile status condition.",
			"summary": "Power doubles if the target has a status ailment."
		},
		"highhorsepower": {
			"name": "High Horsepower",
			"type": "Ground",
			"category": "Physical",
			"power": 95,
			"accuracy": 95,
			"effects": "No additional effect.",
			"summary": "No additional effect."
		},
		"highjumpkick": {
			"name": "High Jump Kick",
			"type": "Fighting",
			"category": "Physical",
			"power": 130,
			"accuracy": 90,
			"effects": "If this attack is not successful, the user loses half of its maximum HP, rounded down, as crash damage. Pokemon with the Magic Guard Ability are unaffected by crash damage.",
			"summary": "User is hurt by 50% of its max HP if it misses."
		},
		"honeclaws": {
			"name": "Hone Claws",
			"type": "Dark",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "Raises the user's Attack and accuracy by 1 stage.",
			"summary": "Raises the user's Attack and accuracy by 1."
		},
		"hornleech": {
			"name": "Horn Leech",
			"type": "Grass",
			"category": "Physical",
			"power": 75,
			"accuracy": 100,
			"effects": "The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3× normal, rounded half down.",
			"summary": "User recovers 50% of the damage dealt."
		},
		"howl": {
			"name": "Howl",
			"type": "Normal",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "Raises the Attack of the user and all allies 1 stage.",
			"summary": "Raises the user's and ally's Attack by 1."
		},
		"hurricane": {
			"name": "Hurricane",
			"type": "Flying",
			"category": "Special",
			"power": 110,
			"accuracy": 70,
			"effects": "Has a 30% chance to confuse the target. This move can hit a target using Bounce, Fly, or Sky Drop, or is under the effect of Sky Drop. If the weather is Heavy Rain or Rain, this move does not check accuracy. If the weather is Intense Sun or Sun, this move's accuracy is 50%. If this move is used against a Pokemon holding Utility Umbrella, this move's accuracy remains at 70%.",
			"summary": "30% chance to confuse target. Can't miss in rain."
		},
		"hydrocannon": {
			"name": "Hydro Cannon",
			"type": "Water",
			"category": "Special",
			"power": 150,
			"accuracy": 90,
			"effects": "If this move is successful, the user must recharge on the following turn and cannot select a move.",
			"summary": "User cannot move next turn."
		},
		"hydropump": {
			"name": "Hydro Pump",
			"type": "Water",
			"category": "Special",
			"power": 110,
			"accuracy": 80,
			"effects": "No additional effect.",
			"summary": "No additional effect."
		},
		"hyperbeam": {
			"name": "Hyper Beam",
			"type": "Normal",
			"category": "Special",
			"power": 150,
			"accuracy": 90,
			"effects": "If this move is successful, the user must recharge on the following turn and cannot select a move.",
			"summary": "User cannot move next turn."
		},
		"hypervoice": {
			"name": "Hyper Voice",
			"type": "Normal",
			"category": "Special",
			"power": 90,
			"accuracy": 100,
			"effects": "No additional effect. Hits adjacent foes.",
			"summary": "No additional effect. Hits adjacent foes."
		},
		"hypnosis": {
			"name": "Hypnosis",
			"type": "Psychic",
			"category": "Status",
			"power": 0,
			"accuracy": 60,
			"effects": "Causes the target to fall asleep.",
			"summary": "Causes the target to fall asleep."
		},
		"icebeam": {
			"name": "Ice Beam",
			"type": "Ice",
			"category": "Special",
			"power": 90,
			"accuracy": 100,
			"effects": "Has a 10% chance to freeze the target.",
			"summary": "10% chance to freeze the target."
		},
		"icefang": {
			"name": "Ice Fang",
			"type": "Ice",
			"category": "Physical",
			"power": 65,
			"accuracy": 95,
			"effects": "Has a 10% chance to freeze the target and a 10% chance to make it flinch.",
			"summary": "10% chance to freeze. 10% chance to flinch."
		},
		"icepunch": {
			"name": "Ice Punch",
			"type": "Ice",
			"category": "Physical",
			"power": 75,
			"accuracy": 100,
			"effects": "Has a 10% chance to freeze the target.",
			"summary": "10% chance to freeze the target."
		},
		"iceshard": {
			"name": "Ice Shard",
			"type": "Ice",
			"category": "Physical",
			"power": 40,
			"accuracy": 100,
			"effects": "Usually goes first.",
			"summary": "Usually goes first."
		},
		"iciclecrash": {
			"name": "Icicle Crash",
			"type": "Ice",
			"category": "Physical",
			"power": 85,
			"accuracy": 90,
			"effects": "Has a 30% chance to make the target flinch.",
			"summary": "30% chance to make the target flinch."
		},
		"iciclespear": {
			"name": "Icicle Spear",
			"type": "Ice",
			"category": "Physical",
			"power": 25,
			"accuracy": 100,
			"effects": "Hits two to five times. Has a 35% chance to hit two or three times and a 15% chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times.",
			"summary": "Hits 2-5 times in one turn."
		},
		"icywind": {
			"name": "Icy Wind",
			"type": "Ice",
			"category": "Special",
			"power": 55,
			"accuracy": 95,
			"effects": "Has a 100% chance to lower the target's Speed by 1 stage.",
			"summary": "100% chance to lower the foe(s) Speed by 1."
		},
		"imprison": {
			"name": "Imprison",
			"type": "Psychic",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "The user prevents all opposing Pokemon from using any moves that the user also knows as long as the user remains active.",
			"summary": "No foe can use any move known by the user."
		},
		"incinerate": {
			"name": "Incinerate",
			"type": "Fire",
			"category": "Special",
			"power": 60,
			"accuracy": 100,
			"effects": "The target loses its held item if it is a Berry or a Gem. This move cannot cause Pokemon with the Sticky Hold Ability to lose their held item. Items lost to this move cannot be regained with Recycle or the Harvest Ability.",
			"summary": "Destroys the foe(s) Berry/Gem."
		},
		"infestation": {
			"name": "Infestation",
			"type": "Bug",
			"category": "Special",
			"power": 20,
			"accuracy": 100,
			"effects": "Traps and damages the target for 4-5 turns.",
			"summary": "Traps and damages the target for 4-5 turns."
		},
		"ingrain": {
			"name": "Ingrain",
			"type": "Grass",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "Traps/grounds user; heals 1/16 max HP per turn.",
			"summary": "Traps/grounds user; heals 1/16 max HP per turn."
		},
		"instruct": {
			"name": "Instruct",
			"type": "Psychic",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "The target immediately uses its last used move.",
			"summary": "The target immediately uses its last used move."
		},
		"irondefense": {
			"name": "Iron Defense",
			"type": "Steel",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "Raises the user's Defense by 2 stages.",
			"summary": "Raises the user's Defense by 2."
		},
		"ironhead": {
			"name": "Iron Head",
			"type": "Steel",
			"category": "Physical",
			"power": 80,
			"accuracy": 100,
			"effects": "Has a 30% chance to make the target flinch.",
			"summary": "30% chance to make the target flinch."
		},
		"irontail": {
			"name": "Iron Tail",
			"type": "Steel",
			"category": "Physical",
			"power": 100,
			"accuracy": 75,
			"effects": "Has a 30% chance to lower the target's Defense by 1 stage.",
			"summary": "30% chance to lower the target's Defense by 1."
		},
		"jawlock": {
			"name": "Jaw Lock",
			"type": "Dark",
			"category": "Physical",
			"power": 80,
			"accuracy": 100,
			"effects": "Prevents the user and the target from switching out. The user and the target can still switch out if either of them is holding Shed Shell or uses Baton Pass, Flip Turn, Parting Shot, Teleport, U-turn, or Volt Switch. The effect ends if either the user or the target leaves the field.",
			"summary": "Prevents both user and target from switching out."
		},
		"jumpkick": {
			"name": "Jump Kick",
			"type": "Fighting",
			"category": "Physical",
			"power": 100,
			"accuracy": 95,
			"effects": "If this attack is not successful, the user loses half of its maximum HP, rounded down, as crash damage. Pokemon with the Magic Guard Ability are unaffected by crash damage.",
			"summary": "User is hurt by 50% of its max HP if it misses."
		},
		"junglehealing": {
			"name": "Jungle Healing",
			"type": "Grass",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "Each Pokemon on the user's side restores 1/4 of its maximum HP, rounded half up, and has its status condition cured.",
			"summary": "User and allies: healed 1/4 max HP, status cured."
		},
		"kingsshield": {
			"name": "King's Shield",
			"type": "Steel",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "Protects from damaging attacks. Contact: -1 Atk.",
			"summary": "Protects from damaging attacks. Contact: -1 Atk."
		},
		"knockoff": {
			"name": "Knock Off",
			"type": "Dark",
			"category": "Physical",
			"power": 65,
			"accuracy": 100,
			"effects": "1.5× damage if foe holds an item. Removes item.",
			"summary": "1.5× damage if foe holds an item. Removes item."
		},
		"laserfocus": {
			"name": "Laser Focus",
			"type": "Normal",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "Until the end of the next turn, the user's attacks will be critical hits.",
			"summary": "Until the end of the next turn, user's moves crit."
		},
		"leafblade": {
			"name": "Leaf Blade",
			"type": "Grass",
			"category": "Physical",
			"power": 90,
			"accuracy": 100,
			"effects": "Has a higher chance for a critical hit.",
			"summary": "High critical hit ratio."
		},
		"leafstorm": {
			"name": "Leaf Storm",
			"type": "Grass",
			"category": "Special",
			"power": 130,
			"accuracy": 90,
			"effects": "Lowers the user's Special Attack by 2 stages.",
			"summary": "Lowers the user's Sp. Atk by 2."
		},
		"leaftornado": {
			"name": "Leaf Tornado",
			"type": "Grass",
			"category": "Special",
			"power": 65,
			"accuracy": 90,
			"effects": "Has a 50% chance to lower the target's accuracy by 1 stage.",
			"summary": "50% chance to lower the target's accuracy by 1."
		},
		"leafage": {
			"name": "Leafage",
			"type": "Grass",
			"category": "Physical",
			"power": 40,
			"accuracy": 100,
			"effects": "No additional effect.",
			"summary": "No additional effect."
		},
		"leechlife": {
			"name": "Leech Life",
			"type": "Bug",
			"category": "Physical",
			"power": 80,
			"accuracy": 100,
			"effects": "The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3× normal, rounded half down.",
			"summary": "User recovers 50% of the damage dealt."
		},
		"leechseed": {
			"name": "Leech Seed",
			"type": "Grass",
			"category": "Status",
			"power": 0,
			"accuracy": 90,
			"effects": "1/8 of target's HP is restored to user every turn.",
			"summary": "1/8 of target's HP is restored to user every turn."
		},
		"leer": {
			"name": "Leer",
			"type": "Normal",
			"category": "Status",
			"power": 0,
			"accuracy": 100,
			"effects": "Lowers the target's Defense by 1 stage.",
			"summary": "Lowers the foe(s) Defense by 1."
		},
		"lick": {
			"name": "Lick",
			"type": "Ghost",
			"category": "Physical",
			"power": 30,
			"accuracy": 100,
			"effects": "Has a 30% chance to paralyze the target.",
			"summary": "30% chance to paralyze the target."
		},
		"lifedew": {
			"name": "Life Dew",
			"type": "Water",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "Each Pokemon on the user's side restores 1/4 of its maximum HP, rounded half up.",
			"summary": "Heals the user and its allies by 1/4 their max HP."
		},
		"lightscreen": {
			"name": "Light Screen",
			"type": "Psychic",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "For 5 turns, special damage to allies is halved.",
			"summary": "For 5 turns, special damage to allies is halved."
		},
		"liquidation": {
			"name": "Liquidation",
			"type": "Water",
			"category": "Physical",
			"power": 85,
			"accuracy": 100,
			"effects": "Has a 20% chance to lower the target's Defense by 1 stage.",
			"summary": "20% chance to lower the target's Defense by 1."
		},
		"lowkick": {
			"name": "Low Kick",
			"type": "Fighting",
			"category": "Physical",
			"power": 0,
			"accuracy": 100,
			"effects": "This move's power is 20 if the target weighs less than 10 kg, 40 if less than 25 kg, 60 if less than 50 kg, 80 if less than 100 kg, 100 if less than 200 kg, and 120 if greater than or equal to 200 kg.",
			"summary": "More power the heavier the target."
		},
		"lowsweep": {
			"name": "Low Sweep",
			"type": "Fighting",
			"category": "Physical",
			"power": 65,
			"accuracy": 100,
			"effects": "Has a 100% chance to lower the target's Speed by 1 stage.",
			"summary": "100% chance to lower the target's Speed by 1."
		},
		"lunge": {
			"name": "Lunge",
			"type": "Bug",
			"category": "Physical",
			"power": 80,
			"accuracy": 100,
			"effects": "Has a 100% chance to lower the target's Attack by 1 stage.",
			"summary": "100% chance to lower the target's Attack by 1."
		},
		"machpunch": {
			"name": "Mach Punch",
			"type": "Fighting",
			"category": "Physical",
			"power": 40,
			"accuracy": 100,
			"effects": "Usually goes first.",
			"summary": "Usually goes first."
		},
		"magmastorm": {
			"name": "Magma Storm",
			"type": "Fire",
			"category": "Special",
			"power": 100,
			"accuracy": 75,
			"effects": "Traps and damages the target for 4-5 turns.",
			"summary": "Traps and damages the target for 4-5 turns."
		},
		"magneticflux": {
			"name": "Magnetic Flux",
			"type": "Electric",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "Raises the Defense and Special Defense of Pokemon on the user's side with the Plus or Minus Abilities by 1 stage.",
			"summary": "Raises Def, Sp. Def of allies with Plus/Minus by 1."
		},
		"meanlook": {
			"name": "Mean Look",
			"type": "Normal",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "Prevents the target from switching out. The target can still switch out if it is holding Shed Shell or uses Baton Pass, Flip Turn, Parting Shot, Teleport, U-turn, or Volt Switch. The effect ends if either the user or the target leaves the field.",
			"summary": "Prevents the target from switching out."
		},
		"megadrain": {
			"name": "Mega Drain",
			"type": "Grass",
			"category": "Special",
			"power": 40,
			"accuracy": 100,
			"effects": "The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3× normal, rounded half down.",
			"summary": "User recovers 50% of the damage dealt."
		},
		"megahorn": {
			"name": "Megahorn",
			"type": "Bug",
			"category": "Physical",
			"power": 120,
			"accuracy": 85,
			"effects": "No additional effect.",
			"summary": "No additional effect."
		},
		"memento": {
			"name": "Memento",
			"type": "Dark",
			"category": "Status",
			"power": 0,
			"accuracy": 100,
			"effects": "Lowers the target's Attack and Special Attack by 2 stages. The user faints unless this move misses or there is no target. Fails entirely if this move hits a substitute, but does not fail if the target's stats cannot be changed.",
			"summary": "Lowers target's Attack, Sp. Atk by 2. User faints."
		},
		"metalsound": {
			"name": "Metal Sound",
			"type": "Steel",
			"category": "Status",
			"power": 0,
			"accuracy": 85,
			"effects": "Lowers the target's Special Defense by 2 stages.",
			"summary": "Lowers the target's Sp. Def by 2."
		},
		"meteorassault": {
			"name": "Meteor Assault",
			"type": "Fighting",
			"category": "Physical",
			"power": 150,
			"accuracy": 100,
			"effects": "If this move is successful, the user must recharge on the following turn and cannot select a move.",
			"summary": "User cannot move next turn."
		},
		"meteorbeam": {
			"name": "Meteor Beam",
			"type": "Rock",
			"category": "Special",
			"power": 120,
			"accuracy": 90,
			"effects": "This attack charges on the first turn and executes on the second. Raises the user's Special Attack by 1 stage on the first turn. If the user is holding a Power Herb, the move completes in one turn.",
			"summary": "Raises user's Sp. Atk by 1 on turn 1. Hits turn 2."
		},
		"meteormash": {
			"name": "Meteor Mash",
			"type": "Steel",
			"category": "Physical",
			"power": 90,
			"accuracy": 90,
			"effects": "Has a 20% chance to raise the user's Attack by 1 stage.",
			"summary": "20% chance to raise the user's Attack by 1."
		},
		"mirrorcoat": {
			"name": "Mirror Coat",
			"type": "Psychic",
			"category": "Special",
			"power": 0,
			"accuracy": 100,
			"effects": "If hit by special attack, returns double damage.",
			"summary": "If hit by special attack, returns double damage."
		},
		"mistball": {
			"name": "Mist Ball",
			"type": "Psychic",
			"category": "Special",
			"power": 70,
			"accuracy": 100,
			"effects": "Has a 50% chance to lower the target's Special Attack by 1 stage.",
			"summary": "50% chance to lower the target's Sp. Atk by 1."
		},
		"moonblast": {
			"name": "Moonblast",
			"type": "Fairy",
			"category": "Special",
			"power": 95,
			"accuracy": 100,
			"effects": "Has a 30% chance to lower the target's Special Attack by 1 stage.",
			"summary": "30% chance to lower the target's Sp. Atk by 1."
		},
		"moonlight": {
			"name": "Moonlight",
			"type": "Fairy",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "The user restores 1/2 of its maximum HP if Strong Winds or no weather conditions are in effect or if the user is holding Utility Umbrella, 2/3 of its maximum HP if the weather is Intense Sun or Sun, and 1/4 of its maximum HP if the weather is Hail, Heavy Rain, Rain, or Sandstorm, all rounded half down.",
			"summary": "Heals the user by a weather-dependent amount."
		},
		"morningsun": {
			"name": "Morning Sun",
			"type": "Normal",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "The user restores 1/2 of its maximum HP if Strong Winds or no weather conditions are in effect or if the user is holding Utility Umbrella, 2/3 of its maximum HP if the weather is Intense Sun or Sun, and 1/4 of its maximum HP if the weather is Hail, Heavy Rain, Rain, or Sandstorm, all rounded half down.",
			"summary": "Heals the user by a weather-dependent amount."
		},
		"mudshot": {
			"name": "Mud Shot",
			"type": "Ground",
			"category": "Special",
			"power": 55,
			"accuracy": 95,
			"effects": "Has a 100% chance to lower the target's Speed by 1 stage.",
			"summary": "100% chance to lower the target's Speed by 1."
		},
		"muddywater": {
			"name": "Muddy Water",
			"type": "Water",
			"category": "Special",
			"power": 90,
			"accuracy": 85,
			"effects": "Has a 30% chance to lower the target's accuracy by 1 stage.",
			"summary": "30% chance to lower the foe(s) accuracy by 1."
		},
		"mysticalfire": {
			"name": "Mystical Fire",
			"type": "Fire",
			"category": "Special",
			"power": 75,
			"accuracy": 100,
			"effects": "Has a 100% chance to lower the target's Special Attack by 1 stage.",
			"summary": "100% chance to lower the target's Sp. Atk by 1."
		},
		"nastyplot": {
			"name": "Nasty Plot",
			"type": "Dark",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "Raises the user's Special Attack by 2 stages.",
			"summary": "Raises the user's Sp. Atk by 2."
		},
		"naturesmadness": {
			"name": "Nature's Madness",
			"type": "Fairy",
			"category": "Special",
			"power": 0,
			"accuracy": 90,
			"effects": "Deals damage to the target equal to half of its current HP, rounded down, but not less than 1 HP.",
			"summary": "Does damage equal to 1/2 target's current HP."
		},
		"nightdaze": {
			"name": "Night Daze",
			"type": "Dark",
			"category": "Special",
			"power": 85,
			"accuracy": 95,
			"effects": "Has a 40% chance to lower the target's accuracy by 1 stage.",
			"summary": "40% chance to lower the target's accuracy by 1."
		},
		"nightslash": {
			"name": "Night Slash",
			"type": "Dark",
			"category": "Physical",
			"power": 70,
			"accuracy": 100,
			"effects": "Has a higher chance for a critical hit.",
			"summary": "High critical hit ratio."
		},
		"noretreat": {
			"name": "No Retreat",
			"type": "Fighting",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "Raises the user's Attack, Defense, Special Attack, Special Defense, and Speed by 1 stage, but it becomes prevented from switching out. The user can still switch out if it uses Baton Pass, Flip Turn, Parting Shot, Teleport, U-turn, or Volt Switch. Fails if the user has already been prevented from switching by this effect.",
			"summary": "Raises all stats by 1 (not acc/eva). Traps user."
		},
		"nobleroar": {
			"name": "Noble Roar",
			"type": "Normal",
			"category": "Status",
			"power": 0,
			"accuracy": 100,
			"effects": "Lowers the target's Attack and Special Attack by 1 stage.",
			"summary": "Lowers the target's Attack and Sp. Atk by 1."
		},
		"nuzzle": {
			"name": "Nuzzle",
			"type": "Electric",
			"category": "Physical",
			"power": 20,
			"accuracy": 100,
			"effects": "Has a 100% chance to paralyze the target.",
			"summary": "100% chance to paralyze the target."
		},
		"oblivionwing": {
			"name": "Oblivion Wing",
			"type": "Flying",
			"category": "Special",
			"power": 80,
			"accuracy": 100,
			"effects": "The user recovers 3/4 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3× normal, rounded half down.",
			"summary": "User recovers 75% of the damage dealt."
		},
		"obstruct": {
			"name": "Obstruct",
			"type": "Dark",
			"category": "Status",
			"power": 0,
			"accuracy": 100,
			"effects": "Protects from damaging attacks. Contact: -2 Def.",
			"summary": "Protects from damaging attacks. Contact: -2 Def."
		},
		"octazooka": {
			"name": "Octazooka",
			"type": "Water",
			"category": "Special",
			"power": 65,
			"accuracy": 85,
			"effects": "Has a 50% chance to lower the target's accuracy by 1 stage.",
			"summary": "50% chance to lower the target's accuracy by 1."
		},
		"octolock": {
			"name": "Octolock",
			"type": "Fighting",
			"category": "Status",
			"power": 0,
			"accuracy": 100,
			"effects": "Prevents the target from switching out. At the end of each turn during effect, the target's Defense and Special Defense are lowered by 1 stage. The target can still switch out if it is holding Shed Shell or uses Baton Pass, Flip Turn, Parting Shot, Teleport, U-turn, or Volt Switch. The effect ends if either the user or the target leaves the field.",
			"summary": "Traps target, lowers Def and SpD by 1 each turn."
		},
		"originpulse": {
			"name": "Origin Pulse",
			"type": "Water",
			"category": "Special",
			"power": 110,
			"accuracy": 85,
			"effects": "No additional effect. Hits adjacent foes.",
			"summary": "No additional effect. Hits adjacent foes."
		},
		"outrage": {
			"name": "Outrage",
			"type": "Dragon",
			"category": "Physical",
			"power": 120,
			"accuracy": 100,
			"effects": "Lasts 2-3 turns. Confuses the user afterwards.",
			"summary": "Lasts 2-3 turns. Confuses the user afterwards."
		},
		"overdrive": {
			"name": "Overdrive",
			"type": "Electric",
			"category": "Special",
			"power": 80,
			"accuracy": 100,
			"effects": "No additional effect. Hits foe(s).",
			"summary": "No additional effect. Hits foe(s)."
		},
		"overheat": {
			"name": "Overheat",
			"type": "Fire",
			"category": "Special",
			"power": 130,
			"accuracy": 90,
			"effects": "Lowers the user's Special Attack by 2 stages.",
			"summary": "Lowers the user's Sp. Atk by 2."
		},
		"painsplit": {
			"name": "Pain Split",
			"type": "Normal",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "The user and the target's HP become the average of their current HP, rounded down, but not more than the maximum HP of either one.",
			"summary": "Shares HP of user and target equally."
		},
		"paraboliccharge": {
			"name": "Parabolic Charge",
			"type": "Electric",
			"category": "Special",
			"power": 65,
			"accuracy": 100,
			"effects": "The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3× normal, rounded half down.",
			"summary": "User recovers 50% of the damage dealt."
		},
		"partingshot": {
			"name": "Parting Shot",
			"type": "Dark",
			"category": "Status",
			"power": 0,
			"accuracy": 100,
			"effects": "Lowers the target's Attack and Special Attack by 1 stage. If this move is successful, the user switches out even if it is trapped and is replaced immediately by a selected party member. The user does not switch out if the target's Attack and Special Attack stat stages were both unchanged, or if there are no unfainted party members.",
			"summary": "Lowers target's Atk, Sp. Atk by 1. User switches."
		},
		"payback": {
			"name": "Payback",
			"type": "Dark",
			"category": "Physical",
			"power": 50,
			"accuracy": 100,
			"effects": "Power doubles if the user moves after the target this turn, including actions taken through Instruct or the Dancer Ability. Switching in does not count as an action.",
			"summary": "Power doubles if the user moves after the target."
		},
		"peck": {
			"name": "Peck",
			"type": "Flying",
			"category": "Physical",
			"power": 35,
			"accuracy": 100,
			"effects": "No additional effect.",
			"summary": "No additional effect."
		},
		"phantomforce": {
			"name": "Phantom Force",
			"type": "Ghost",
			"category": "Physical",
			"power": 90,
			"accuracy": 100,
			"effects": "Disappears turn 1. Hits turn 2. Breaks protection.",
			"summary": "Disappears turn 1. Hits turn 2. Breaks protection."
		},
		"photongeyser": {
			"name": "Photon Geyser",
			"type": "Psychic",
			"category": "Special",
			"power": 100,
			"accuracy": 100,
			"effects": "This move becomes a physical attack if the user's Attack is greater than its Special Attack, including stat stage changes. This move and its effects ignore the Abilities of other Pokemon.",
			"summary": "Physical if user's Atk > Sp. Atk. Ignores Abilities."
		},
		"pinmissile": {
			"name": "Pin Missile",
			"type": "Bug",
			"category": "Physical",
			"power": 25,
			"accuracy": 95,
			"effects": "Hits two to five times. Has a 35% chance to hit two or three times and a 15% chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times.",
			"summary": "Hits 2-5 times in one turn."
		},
		"plasmafists": {
			"name": "Plasma Fists",
			"type": "Electric",
			"category": "Physical",
			"power": 100,
			"accuracy": 100,
			"effects": "If this move is successful, causes Normal-type moves to become Electric type this turn.",
			"summary": "Normal moves become Electric type this turn."
		},
		"playrough": {
			"name": "Play Rough",
			"type": "Fairy",
			"category": "Physical",
			"power": 90,
			"accuracy": 90,
			"effects": "Has a 10% chance to lower the target's Attack by 1 stage.",
			"summary": "10% chance to lower the target's Attack by 1."
		},
		"pluck": {
			"name": "Pluck",
			"type": "Flying",
			"category": "Physical",
			"power": 60,
			"accuracy": 100,
			"effects": "If this move is successful and the user has not fainted, it steals the target's held Berry if it is holding one and eats it immediately, gaining its effects even if the user's item is being ignored. Items lost to this move cannot be regained with Recycle or the Harvest Ability.",
			"summary": "User steals and eats the target's Berry."
		},
		"poisonfang": {
			"name": "Poison Fang",
			"type": "Poison",
			"category": "Physical",
			"power": 50,
			"accuracy": 100,
			"effects": "Has a 50% chance to badly poison the target.",
			"summary": "50% chance to badly poison the target."
		},
		"poisonjab": {
			"name": "Poison Jab",
			"type": "Poison",
			"category": "Physical",
			"power": 80,
			"accuracy": 100,
			"effects": "Has a 30% chance to poison the target.",
			"summary": "30% chance to poison the target."
		},
		"poisonpowder": {
			"name": "Poison Powder",
			"type": "Poison",
			"category": "Status",
			"power": 0,
			"accuracy": 75,
			"effects": "Poisons the target.",
			"summary": "Poisons the target."
		},
		"pollenpuff": {
			"name": "Pollen Puff",
			"type": "Bug",
			"category": "Special",
			"power": 90,
			"accuracy": 100,
			"effects": "If the target is an ally, this move restores 1/2 of its maximum HP, rounded down, instead of dealing damage.",
			"summary": "If the target is an ally, heals 50% of its max HP."
		},
		"poltergeist": {
			"name": "Poltergeist",
			"type": "Ghost",
			"category": "Physical",
			"power": 110,
			"accuracy": 90,
			"effects": "Fails if the target has no held item.",
			"summary": "Fails if the target has no held item."
		},
		"powergem": {
			"name": "Power Gem",
			"type": "Rock",
			"category": "Special",
			"power": 80,
			"accuracy": 100,
			"effects": "No additional effect.",
			"summary": "No additional effect."
		},
		"powersplit": {
			"name": "Power Split",
			"type": "Psychic",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "The user and the target have their Attack and Special Attack stats set to be equal to the average of the user and the target's Attack and Special Attack stats, respectively, rounded down. Stat stage changes are unaffected.",
			"summary": "Averages Attack and Sp. Atk stats with target."
		},
		"powerwhip": {
			"name": "Power Whip",
			"type": "Grass",
			"category": "Physical",
			"power": 120,
			"accuracy": 85,
			"effects": "No additional effect.",
			"summary": "No additional effect."
		},
		"poweruppunch": {
			"name": "Power-Up Punch",
			"type": "Fighting",
			"category": "Physical",
			"power": 40,
			"accuracy": 100,
			"effects": "Has a 100% chance to raise the user's Attack by 1 stage.",
			"summary": "100% chance to raise the user's Attack by 1."
		},
		"precipiceblades": {
			"name": "Precipice Blades",
			"type": "Ground",
			"category": "Physical",
			"power": 120,
			"accuracy": 85,
			"effects": "No additional effect. Hits adjacent foes.",
			"summary": "No additional effect. Hits adjacent foes."
		},
		"protect": {
			"name": "Protect",
			"type": "Normal",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "Prevents moves from affecting the user this turn.",
			"summary": "Prevents moves from affecting the user this turn."
		},
		"psychic": {
			"name": "Psychic",
			"type": "Psychic",
			"category": "Special",
			"power": 90,
			"accuracy": 100,
			"effects": "Has a 10% chance to lower the target's Special Defense by 1 stage.",
			"summary": "10% chance to lower the target's Sp. Def by 1."
		},
		"psychicfangs": {
			"name": "Psychic Fangs",
			"type": "Psychic",
			"category": "Physical",
			"power": 85,
			"accuracy": 100,
			"effects": "If this attack does not miss, the effects of Reflect, Light Screen, and Aurora Veil end for the target's side of the field before damage is calculated.",
			"summary": "Destroys screens, unless the target is immune."
		},
		"psychocut": {
			"name": "Psycho Cut",
			"type": "Psychic",
			"category": "Physical",
			"power": 70,
			"accuracy": 100,
			"effects": "Has a higher chance for a critical hit.",
			"summary": "High critical hit ratio."
		},
		"psychoshift": {
			"name": "Psycho Shift",
			"type": "Psychic",
			"category": "Status",
			"power": 0,
			"accuracy": 100,
			"effects": "The user's non-volatile status condition is transferred to the target, and the user is then cured. Fails if the user has no non-volatile status condition or if the target already has one.",
			"summary": "Transfers the user's status ailment to the target."
		},
		"psyshock": {
			"name": "Psyshock",
			"type": "Psychic",
			"category": "Special",
			"power": 80,
			"accuracy": 100,
			"effects": "Deals damage to the target based on its Defense instead of Special Defense.",
			"summary": "Damages target based on Defense, not Sp. Def."
		},
		"pyroball": {
			"name": "Pyro Ball",
			"type": "Fire",
			"category": "Physical",
			"power": 120,
			"accuracy": 90,
			"effects": "Has a 10% chance to burn the target.",
			"summary": "10% chance to burn the target. Thaws user."
		},
		"quash": {
			"name": "Quash",
			"type": "Dark",
			"category": "Status",
			"power": 0,
			"accuracy": 100,
			"effects": "Causes the target to take its turn after all other Pokemon this turn, no matter the priority of its selected move. Fails if the target already moved this turn.",
			"summary": "Forces the target to move last this turn."
		},
		"quickattack": {
			"name": "Quick Attack",
			"type": "Normal",
			"category": "Physical",
			"power": 40,
			"accuracy": 100,
			"effects": "Usually goes first.",
			"summary": "Usually goes first."
		},
		"quickguard": {
			"name": "Quick Guard",
			"type": "Fighting",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "Protects allies from priority attacks this turn.",
			"summary": "Protects allies from priority attacks this turn."
		},
		"quiverdance": {
			"name": "Quiver Dance",
			"type": "Bug",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "Raises the user's Special Attack, Special Defense, and Speed by 1 stage.",
			"summary": "Raises the user's Sp. Atk, Sp. Def, Speed by 1."
		},
		"raindance": {
			"name": "Rain Dance",
			"type": "Water",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "For 5 turns, the weather becomes Rain. The damage of Water-type attacks is multiplied by 1.5 and the damage of Fire-type attacks is multiplied by 0.5 during the effect. Lasts for 8 turns if the user is holding Damp Rock. Fails if the current weather is Rain.",
			"summary": "For 5 turns, heavy rain powers Water moves."
		},
		"rapidspin": {
			"name": "Rapid Spin",
			"type": "Normal",
			"category": "Physical",
			"power": 50,
			"accuracy": 100,
			"effects": "If this move is successful and the user has not fainted, the effects of Leech Seed and binding moves end for the user, and all hazards are removed from the user's side of the field. Has a 100% chance to raise the user's Speed by 1 stage.",
			"summary": "Free user from hazards/bind/Leech Seed; +1 Spe."
		},
		"razorshell": {
			"name": "Razor Shell",
			"type": "Water",
			"category": "Physical",
			"power": 75,
			"accuracy": 95,
			"effects": "Has a 50% chance to lower the target's Defense by 1 stage.",
			"summary": "50% chance to lower the target's Defense by 1."
		},
		"recover": {
			"name": "Recover",
			"type": "Normal",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "The user restores 1/2 of its maximum HP, rounded half up.",
			"summary": "Heals the user by 50% of its max HP."
		},
		"recycle": {
			"name": "Recycle",
			"type": "Normal",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "The user regains the item it last used. Fails if the user is holding an item, if the user has not held an item, if the item was a popped Air Balloon, if the item was picked up by a Pokemon with the Pickup Ability, or if the item was lost to Bug Bite, Corrosive Gas, Covet, Incinerate, Knock Off, Pluck, or Thief. Items thrown with Fling can be regained.",
			"summary": "Restores the item the user last used."
		},
		"reflect": {
			"name": "Reflect",
			"type": "Psychic",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "For 5 turns, physical damage to allies is halved.",
			"summary": "For 5 turns, physical damage to allies is halved."
		},
		"rest": {
			"name": "Rest",
			"type": "Psychic",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "The user falls asleep for the next two turns and restores all of its HP, curing itself of any non-volatile status condition in the process. Fails if the user has full HP, is already asleep, or if another effect is preventing sleep.",
			"summary": "User sleeps 2 turns and restores HP and status."
		},
		"retaliate": {
			"name": "Retaliate",
			"type": "Normal",
			"category": "Physical",
			"power": 70,
			"accuracy": 100,
			"effects": "Power doubles if one of the user's party members fainted last turn.",
			"summary": "Power doubles if an ally fainted last turn."
		},
		"reversal": {
			"name": "Reversal",
			"type": "Fighting",
			"category": "Physical",
			"power": 0,
			"accuracy": 100,
			"effects": "The power of this move is 20 if X is 33 to 48, 40 if X is 17 to 32, 80 if X is 10 to 16, 100 if X is 5 to 9, 150 if X is 2 to 4, and 200 if X is 0 or 1, where X is equal to (user's current HP × 48 / user's maximum HP), rounded down.",
			"summary": "More power the less HP the user has left."
		},
		"risingvoltage": {
			"name": "Rising Voltage",
			"type": "Electric",
			"category": "Special",
			"power": 70,
			"accuracy": 100,
			"effects": "If the current terrain is Electric Terrain and the target is grounded, this move's power is doubled.",
			"summary": "2× power if target is grounded in Electric Terrain."
		},
		"roaroftime": {
			"name": "Roar of Time",
			"type": "Dragon",
			"category": "Special",
			"power": 150,
			"accuracy": 90,
			"effects": "If this move is successful, the user must recharge on the following turn and cannot select a move.",
			"summary": "User cannot move next turn."
		},
		"rockblast": {
			"name": "Rock Blast",
			"type": "Rock",
			"category": "Physical",
			"power": 25,
			"accuracy": 90,
			"effects": "Hits two to five times. Has a 35% chance to hit two or three times and a 15% chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times.",
			"summary": "Hits 2-5 times in one turn."
		},
		"rockpolish": {
			"name": "Rock Polish",
			"type": "Rock",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "Raises the user's Speed by 2 stages.",
			"summary": "Raises the user's Speed by 2."
		},
		"rockslide": {
			"name": "Rock Slide",
			"type": "Rock",
			"category": "Physical",
			"power": 75,
			"accuracy": 90,
			"effects": "Has a 30% chance to make the target flinch.",
			"summary": "30% chance to make the foe(s) flinch."
		},
		"rocktomb": {
			"name": "Rock Tomb",
			"type": "Rock",
			"category": "Physical",
			"power": 60,
			"accuracy": 95,
			"effects": "Has a 100% chance to lower the target's Speed by 1 stage.",
			"summary": "100% chance to lower the target's Speed by 1."
		},
		"roost": {
			"name": "Roost",
			"type": "Flying",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "The user restores 1/2 of its maximum HP, rounded half up. Until the end of the turn, Flying-type users lose their Flying type and pure Flying-type users become Normal type. Does nothing if the user's HP is full.",
			"summary": "Heals 50% HP. Flying-type removed 'til turn ends."
		},
		"round": {
			"name": "Round",
			"type": "Normal",
			"category": "Special",
			"power": 60,
			"accuracy": 100,
			"effects": "If there are other active Pokemon that chose this move for use this turn, those Pokemon take their turn immediately after the user, in Speed order, and this move's power is 120 for each other user.",
			"summary": "Power doubles if others used Round this turn."
		},
		"sacredfire": {
			"name": "Sacred Fire",
			"type": "Fire",
			"category": "Physical",
			"power": 100,
			"accuracy": 95,
			"effects": "Has a 50% chance to burn the target.",
			"summary": "50% chance to burn the target. Thaws user."
		},
		"sacredsword": {
			"name": "Sacred Sword",
			"type": "Fighting",
			"category": "Physical",
			"power": 90,
			"accuracy": 100,
			"effects": "Ignores the target's stat stage changes, including evasiveness.",
			"summary": "Ignores the target's stat stage changes."
		},
		"safeguard": {
			"name": "Safeguard",
			"type": "Normal",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "For 5 turns, the user and its party members cannot have non-volatile status conditions or confusion inflicted on them by other Pokemon. Pokemon on the user's side cannot become affected by Yawn but can fall asleep from its effect. It is removed from the user's side if the user or an ally is successfully hit by Defog. Fails if the effect is already active on the user's side.",
			"summary": "For 5 turns, protects user's party from status."
		},
		"sandattack": {
			"name": "Sand Attack",
			"type": "Ground",
			"category": "Status",
			"power": 0,
			"accuracy": 100,
			"effects": "Lowers the target's accuracy by 1 stage.",
			"summary": "Lowers the target's accuracy by 1."
		},
		"sandtomb": {
			"name": "Sand Tomb",
			"type": "Ground",
			"category": "Physical",
			"power": 35,
			"accuracy": 85,
			"effects": "Traps and damages the target for 4-5 turns.",
			"summary": "Traps and damages the target for 4-5 turns."
		},
		"sandstorm": {
			"name": "Sandstorm",
			"type": "Rock",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "For 5 turns, a sandstorm rages. Rock: 1.5× SpD.",
			"summary": "For 5 turns, a sandstorm rages. Rock: 1.5× SpD."
		},
		"scald": {
			"name": "Scald",
			"type": "Water",
			"category": "Special",
			"power": 80,
			"accuracy": 100,
			"effects": "Has a 30% chance to burn the target. The target thaws out if it is frozen.",
			"summary": "30% chance to burn the target. Thaws target."
		},
		"scaleshot": {
			"name": "Scale Shot",
			"type": "Dragon",
			"category": "Physical",
			"power": 25,
			"accuracy": 90,
			"effects": "Hits 2-5 times. User: -1 Def, +1 Spe after last hit.",
			"summary": "Hits 2-5 times. User: -1 Def, +1 Spe after last hit."
		},
		"scaryface": {
			"name": "Scary Face",
			"type": "Normal",
			"category": "Status",
			"power": 0,
			"accuracy": 100,
			"effects": "Lowers the target's Speed by 2 stages.",
			"summary": "Lowers the target's Speed by 2."
		},
		"scorchingsands": {
			"name": "Scorching Sands",
			"type": "Ground",
			"category": "Special",
			"power": 70,
			"accuracy": 100,
			"effects": "Has a 30% chance to burn the target. The target thaws out if it is frozen.",
			"summary": "30% chance to burn the target. Thaws target."
		},
		"scratch": {
			"name": "Scratch",
			"type": "Normal",
			"category": "Physical",
			"power": 40,
			"accuracy": 100,
			"effects": "No additional effect.",
			"summary": "No additional effect."
		},
		"screech": {
			"name": "Screech",
			"type": "Normal",
			"category": "Status",
			"power": 0,
			"accuracy": 85,
			"effects": "Lowers the target's Defense by 2 stages.",
			"summary": "Lowers the target's Defense by 2."
		},
		"seedbomb": {
			"name": "Seed Bomb",
			"type": "Grass",
			"category": "Physical",
			"power": 80,
			"accuracy": 100,
			"effects": "No additional effect.",
			"summary": "No additional effect."
		},
		"shadowball": {
			"name": "Shadow Ball",
			"type": "Ghost",
			"category": "Special",
			"power": 80,
			"accuracy": 100,
			"effects": "Has a 20% chance to lower the target's Special Defense by 1 stage.",
			"summary": "20% chance to lower the target's Sp. Def by 1."
		},
		"shadowbone": {
			"name": "Shadow Bone",
			"type": "Ghost",
			"category": "Physical",
			"power": 85,
			"accuracy": 100,
			"effects": "Has a 20% chance to lower the target's Defense by 1 stage.",
			"summary": "20% chance to lower the target's Defense by 1."
		},
		"shadowclaw": {
			"name": "Shadow Claw",
			"type": "Ghost",
			"category": "Physical",
			"power": 70,
			"accuracy": 100,
			"effects": "Has a higher chance for a critical hit.",
			"summary": "High critical hit ratio."
		},
		"shadowforce": {
			"name": "Shadow Force",
			"type": "Ghost",
			"category": "Physical",
			"power": 120,
			"accuracy": 100,
			"effects": "Disappears turn 1. Hits turn 2. Breaks protection.",
			"summary": "Disappears turn 1. Hits turn 2. Breaks protection."
		},
		"shadowpunch": {
			"name": "Shadow Punch",
			"type": "Ghost",
			"category": "Physical",
			"power": 60,
			"accuracy": true,
			"effects": "This move does not check accuracy.",
			"summary": "This move does not check accuracy."
		},
		"shadowsneak": {
			"name": "Shadow Sneak",
			"type": "Ghost",
			"category": "Physical",
			"power": 40,
			"accuracy": 100,
			"effects": "Usually goes first.",
			"summary": "Usually goes first."
		},
		"shellsidearm": {
			"name": "Shell Side Arm",
			"type": "Poison",
			"category": "Special",
			"power": 90,
			"accuracy": 100,
			"effects": "20% psn. Physical+contact if it would be stronger.",
			"summary": "20% psn. Physical+contact if it would be stronger."
		},
		"shellsmash": {
			"name": "Shell Smash",
			"type": "Normal",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "Lowers the user's Defense and Special Defense by 1 stage. Raises the user's Attack, Special Attack, and Speed by 2 stages.",
			"summary": "Lowers Def, SpD by 1; raises Atk, SpA, Spe by 2."
		},
		"shelltrap": {
			"name": "Shell Trap",
			"type": "Fire",
			"category": "Special",
			"power": 150,
			"accuracy": 100,
			"effects": "Fails unless the user is hit by a physical attack from an opponent this turn before it can execute the move. If the user was hit and has not fainted, it attacks immediately after being hit, and the effect ends. If the opponent's physical attack had a secondary effect removed by the Sheer Force Ability, it does not count for the purposes of this effect.",
			"summary": "User must take physical damage before moving."
		},
		"shiftgear": {
			"name": "Shift Gear",
			"type": "Steel",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "Raises the user's Speed by 2 stages and its Attack by 1 stage.",
			"summary": "Raises the user's Speed by 2 and Attack by 1."
		},
		"shoreup": {
			"name": "Shore Up",
			"type": "Ground",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "The user restores 1/2 of its maximum HP, rounded half down. If the weather is Sandstorm, the user instead restores 2/3 of its maximum HP, rounded half down.",
			"summary": "User restores 1/2 its max HP; 2/3 in Sandstorm."
		},
		"simplebeam": {
			"name": "Simple Beam",
			"type": "Normal",
			"category": "Status",
			"power": 0,
			"accuracy": 100,
			"effects": "Causes the target's Ability to become Simple. Fails if the target's Ability is As One, Battle Bond, Comatose, Disguise, Gulp Missile, Ice Face, Multitype, Power Construct, RKS System, Schooling, Shields Down, Simple, Stance Change, Truant, or Zen Mode.",
			"summary": "The target's Ability becomes Simple."
		},
		"sing": {
			"name": "Sing",
			"type": "Normal",
			"category": "Status",
			"power": 0,
			"accuracy": 55,
			"effects": "Causes the target to fall asleep.",
			"summary": "Causes the target to fall asleep."
		},
		"skillswap": {
			"name": "Skill Swap",
			"type": "Psychic",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "The user swaps its Ability with the target's Ability. Fails if either the user or the target's Ability is As One, Battle Bond, Comatose, Disguise, Gulp Missile, Hunger Switch, Ice Face, Illusion, Multitype, Neutralizing Gas, Power Construct, RKS System, Schooling, Shields Down, Stance Change, Wonder Guard, or Zen Mode.",
			"summary": "The user and the target trade Abilities."
		},
		"skyattack": {
			"name": "Sky Attack",
			"type": "Flying",
			"category": "Physical",
			"power": 140,
			"accuracy": 90,
			"effects": "Has a 30% chance to make the target flinch and a higher chance for a critical hit. This attack charges on the first turn and executes on the second. If the user is holding a Power Herb, the move completes in one turn.",
			"summary": "Charges, then hits turn 2. 30% flinch. High crit."
		},
		"slackoff": {
			"name": "Slack Off",
			"type": "Normal",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "The user restores 1/2 of its maximum HP, rounded half up.",
			"summary": "Heals the user by 50% of its max HP."
		},
		"slash": {
			"name": "Slash",
			"type": "Normal",
			"category": "Physical",
			"power": 70,
			"accuracy": 100,
			"effects": "Has a higher chance for a critical hit.",
			"summary": "High critical hit ratio."
		},
		"sleeppowder": {
			"name": "Sleep Powder",
			"type": "Grass",
			"category": "Status",
			"power": 0,
			"accuracy": 75,
			"effects": "Causes the target to fall asleep.",
			"summary": "Causes the target to fall asleep."
		},
		"sleeptalk": {
			"name": "Sleep Talk",
			"type": "Normal",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "User must be asleep. Uses another known move.",
			"summary": "User must be asleep. Uses another known move."
		},
		"sludge": {
			"name": "Sludge",
			"type": "Poison",
			"category": "Special",
			"power": 65,
			"accuracy": 100,
			"effects": "Has a 30% chance to poison the target.",
			"summary": "30% chance to poison the target."
		},
		"sludgebomb": {
			"name": "Sludge Bomb",
			"type": "Poison",
			"category": "Special",
			"power": 90,
			"accuracy": 100,
			"effects": "Has a 30% chance to poison the target.",
			"summary": "30% chance to poison the target."
		},
		"sludgewave": {
			"name": "Sludge Wave",
			"type": "Poison",
			"category": "Special",
			"power": 95,
			"accuracy": 100,
			"effects": "Has a 10% chance to poison the target.",
			"summary": "10% chance to poison adjacent Pokemon."
		},
		"smackdown": {
			"name": "Smack Down",
			"type": "Rock",
			"category": "Physical",
			"power": 50,
			"accuracy": 100,
			"effects": "Removes the target's Ground immunity.",
			"summary": "Removes the target's Ground immunity."
		},
		"smartstrike": {
			"name": "Smart Strike",
			"type": "Steel",
			"category": "Physical",
			"power": 70,
			"accuracy": true,
			"effects": "This move does not check accuracy.",
			"summary": "This move does not check accuracy."
		},
		"smog": {
			"name": "Smog",
			"type": "Poison",
			"category": "Special",
			"power": 30,
			"accuracy": 70,
			"effects": "Has a 40% chance to poison the target.",
			"summary": "40% chance to poison the target."
		},
		"smokescreen": {
			"name": "Smokescreen",
			"type": "Normal",
			"category": "Status",
			"power": 0,
			"accuracy": 100,
			"effects": "Lowers the target's accuracy by 1 stage.",
			"summary": "Lowers the target's accuracy by 1."
		},
		"snaptrap": {
			"name": "Snap Trap",
			"type": "Grass",
			"category": "Physical",
			"power": 35,
			"accuracy": 100,
			"effects": "Traps and damages the target for 4-5 turns.",
			"summary": "Traps and damages the target for 4-5 turns."
		},
		"snarl": {
			"name": "Snarl",
			"type": "Dark",
			"category": "Special",
			"power": 55,
			"accuracy": 95,
			"effects": "Has a 100% chance to lower the target's Special Attack by 1 stage.",
			"summary": "100% chance to lower the foe(s) Sp. Atk by 1."
		},
		"snipeshot": {
			"name": "Snipe Shot",
			"type": "Water",
			"category": "Special",
			"power": 80,
			"accuracy": 100,
			"effects": "Has a higher chance for a critical hit. This move cannot be redirected to a different target by any effect.",
			"summary": "High critical hit ratio. Cannot be redirected."
		},
		"soak": {
			"name": "Soak",
			"type": "Water",
			"category": "Status",
			"power": 0,
			"accuracy": 100,
			"effects": "Causes the target to become a Water type. Fails if the target is an Arceus or a Silvally, or if the target is already purely Water type.",
			"summary": "Changes the target's type to Water."
		},
		"softboiled": {
			"name": "Soft-Boiled",
			"type": "Normal",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "The user restores 1/2 of its maximum HP, rounded half up.",
			"summary": "Heals the user by 50% of its max HP."
		},
		"solarbeam": {
			"name": "Solar Beam",
			"type": "Grass",
			"category": "Special",
			"power": 120,
			"accuracy": 100,
			"effects": "This attack charges on the first turn and executes on the second. Power is halved if the weather is Hail, Heavy Rain, Rain, or Sandstorm and the user is not holding Utility Umbrella. If the user is holding a Power Herb or the weather is Intense Sun or Sun, the move completes in one turn. If the user is holding Utility Umbrella and the weather is Intense Sun or Sun, the move still requires a turn to charge.",
			"summary": "Charges turn 1. Hits turn 2. No charge in sunlight."
		},
		"solarblade": {
			"name": "Solar Blade",
			"type": "Grass",
			"category": "Physical",
			"power": 125,
			"accuracy": 100,
			"effects": "This attack charges on the first turn and executes on the second. Power is halved if the weather is Hail, Heavy Rain, Rain, or Sandstorm and the user is not holding Utility Umbrella. If the user is holding a Power Herb or the weather is Intense Sun or Sun, the move completes in one turn. If the user is holding Utility Umbrella and the weather is Intense Sun or Sun, the move still requires a turn to charge.",
			"summary": "Charges turn 1. Hits turn 2. No charge in sunlight."
		},
		"spark": {
			"name": "Spark",
			"type": "Electric",
			"category": "Physical",
			"power": 65,
			"accuracy": 100,
			"effects": "Has a 30% chance to paralyze the target.",
			"summary": "30% chance to paralyze the target."
		},
		"sparklingaria": {
			"name": "Sparkling Aria",
			"type": "Water",
			"category": "Special",
			"power": 90,
			"accuracy": 100,
			"effects": "If the user has not fainted, the target is cured of its burn.",
			"summary": "The target is cured of its burn."
		},
		"spacialrend": {
			"name": "Spacial Rend",
			"type": "Dragon",
			"category": "Special",
			"power": 100,
			"accuracy": 95,
			"effects": "Has a higher chance for a critical hit.",
			"summary": "High critical hit ratio."
		},
		"spectralthief": {
			"name": "Spectral Thief",
			"type": "Ghost",
			"category": "Physical",
			"power": 90,
			"accuracy": 100,
			"effects": "The target's stat stages greater than 0 are stolen from it and applied to the user before dealing damage.",
			"summary": "Steals target's boosts before dealing damage."
		},
		"speedswap": {
			"name": "Speed Swap",
			"type": "Psychic",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "The user swaps its Speed stat with the target. Stat stage changes are unaffected.",
			"summary": "Swaps Speed stat with target."
		},
		"spikes": {
			"name": "Spikes",
			"type": "Ground",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "Hurts grounded foes on switch-in. Max 3 layers.",
			"summary": "Hurts grounded foes on switch-in. Max 3 layers."
		},
		"spiritbreak": {
			"name": "Spirit Break",
			"type": "Fairy",
			"category": "Physical",
			"power": 75,
			"accuracy": 100,
			"effects": "Has a 100% chance to lower the target's Special Attack by 1 stage.",
			"summary": "100% chance to lower the target's Sp. Atk by 1."
		},
		"spore": {
			"name": "Spore",
			"type": "Grass",
			"category": "Status",
			"power": 0,
			"accuracy": 100,
			"effects": "Causes the target to fall asleep.",
			"summary": "Causes the target to fall asleep."
		},
		"stealthrock": {
			"name": "Stealth Rock",
			"type": "Rock",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "Hurts foes on switch-in. Factors Rock weakness.",
			"summary": "Hurts foes on switch-in. Factors Rock weakness."
		},
		"steameruption": {
			"name": "Steam Eruption",
			"type": "Water",
			"category": "Special",
			"power": 110,
			"accuracy": 95,
			"effects": "Has a 30% chance to burn the target. The target thaws out if it is frozen.",
			"summary": "30% chance to burn the target. Thaws target."
		},
		"stickyweb": {
			"name": "Sticky Web",
			"type": "Bug",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "Sets up a hazard on the opposing side of the field, lowering the Speed by 1 stage of each opposing Pokemon that switches in, unless it is a Flying-type Pokemon or has the Levitate Ability. Fails if the effect is already active on the opposing side. Can be removed from the opposing side if any opposing Pokemon uses Rapid Spin or Defog successfully, or is hit by Defog.",
			"summary": "Lowers Speed of grounded foes by 1 on switch-in."
		},
		"stockpile": {
			"name": "Stockpile",
			"type": "Normal",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "Raises the user's Defense and Special Defense by 1 stage. The user's Stockpile count increases by 1. Fails if the user's Stockpile count is 3. The user's Stockpile count is reset to 0 when it is no longer active.",
			"summary": "Raises user's Defense, Sp. Def by 1. Max 3 uses."
		},
		"stompingtantrum": {
			"name": "Stomping Tantrum",
			"type": "Ground",
			"category": "Physical",
			"power": 75,
			"accuracy": 100,
			"effects": "Power doubles if the user's last move failed.",
			"summary": "Power doubles if the user's last move failed."
		},
		"stoneedge": {
			"name": "Stone Edge",
			"type": "Rock",
			"category": "Physical",
			"power": 100,
			"accuracy": 80,
			"effects": "Has a higher chance for a critical hit.",
			"summary": "High critical hit ratio."
		},
		"storedpower": {
			"name": "Stored Power",
			"type": "Psychic",
			"category": "Special",
			"power": 20,
			"accuracy": 100,
			"effects": "Power is equal to 20+(X × 20), where X is the user's total stat stage changes that are greater than 0.",
			"summary": " + 20 power for each of the user's stat boosts."
		},
		"strangesteam": {
			"name": "Strange Steam",
			"type": "Fairy",
			"category": "Special",
			"power": 90,
			"accuracy": 95,
			"effects": "Has a 20% chance to confuse the target.",
			"summary": "20% chance to confuse the target."
		},
		"strength": {
			"name": "Strength",
			"type": "Normal",
			"category": "Physical",
			"power": 80,
			"accuracy": 100,
			"effects": "No additional effect.",
			"summary": "No additional effect."
		},
		"strengthsap": {
			"name": "Strength Sap",
			"type": "Grass",
			"category": "Status",
			"power": 0,
			"accuracy": 100,
			"effects": "Lowers the target's Attack by 1 stage. The user restores its HP equal to the target's Attack stat calculated with its stat stage before this move was used. If Big Root is held by the user, the HP recovered is 1.3× normal, rounded half down. Fails if the target's Attack stat stage is -6.",
			"summary": "User heals HP=target's Atk stat. Lowers Atk by 1."
		},
		"strugglebug": {
			"name": "Struggle Bug",
			"type": "Bug",
			"category": "Special",
			"power": 50,
			"accuracy": 100,
			"effects": "Has a 100% chance to lower the target's Special Attack by 1 stage.",
			"summary": "100% chance to lower the foe(s) Sp. Atk by 1."
		},
		"stuffcheeks": {
			"name": "Stuff Cheeks",
			"type": "Normal",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "This move cannot be selected unless the user is holding a Berry. The user eats its Berry and raises its Defense by 2 stages. This effect is not prevented by the Klutz or Unnerve Abilities, or the effects of Embargo or Magic Room. Fails if the user is not holding a Berry.",
			"summary": "Must hold Berry to use. User eats Berry, Def +2."
		},
		"stunspore": {
			"name": "Stun Spore",
			"type": "Grass",
			"category": "Status",
			"power": 0,
			"accuracy": 75,
			"effects": "Paralyzes the target.",
			"summary": "Paralyzes the target."
		},
		"substitute": {
			"name": "Substitute",
			"type": "Normal",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "User takes 1/4 its max HP to put in a substitute.",
			"summary": "User takes 1/4 its max HP to put in a substitute."
		},
		"suckerpunch": {
			"name": "Sucker Punch",
			"type": "Dark",
			"category": "Physical",
			"power": 70,
			"accuracy": 100,
			"effects": "Fails if the target did not select a physical attack, special attack, or Me First for use this turn, or if the target moves before the user.",
			"summary": "Usually goes first. Fails if target is not attacking."
		},
		"sunnyday": {
			"name": "Sunny Day",
			"type": "Fire",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "For 5 turns, the weather becomes Sun. The damage of Fire-type attacks is multiplied by 1.5 and the damage of Water-type attacks is multiplied by 0.5 during the effect. Lasts for 8 turns if the user is holding Heat Rock. Fails if the current weather is Sun.",
			"summary": "For 5 turns, intense sunlight powers Fire moves."
		},
		"sunsteelstrike": {
			"name": "Sunsteel Strike",
			"type": "Steel",
			"category": "Physical",
			"power": 100,
			"accuracy": 100,
			"effects": "This move and its effects ignore the Abilities of other Pokemon.",
			"summary": "Ignores the Abilities of other Pokemon."
		},
		"superfang": {
			"name": "Super Fang",
			"type": "Normal",
			"category": "Physical",
			"power": 0,
			"accuracy": 90,
			"effects": "Deals damage to the target equal to half of its current HP, rounded down, but not less than 1 HP.",
			"summary": "Does damage equal to 1/2 target's current HP."
		},
		"superpower": {
			"name": "Superpower",
			"type": "Fighting",
			"category": "Physical",
			"power": 120,
			"accuracy": 100,
			"effects": "Lowers the user's Attack and Defense by 1 stage.",
			"summary": "Lowers the user's Attack and Defense by 1."
		},
		"supersonic": {
			"name": "Supersonic",
			"type": "Normal",
			"category": "Status",
			"power": 0,
			"accuracy": 55,
			"effects": "Causes the target to become confused.",
			"summary": "Causes the target to become confused."
		},
		"surf": {
			"name": "Surf",
			"type": "Water",
			"category": "Special",
			"power": 90,
			"accuracy": 100,
			"effects": "Damage doubles if the target is using Dive.",
			"summary": "Hits adjacent Pokemon. Double damage on Dive."
		},
		"surgingstrikes": {
			"name": "Surging Strikes",
			"type": "Water",
			"category": "Physical",
			"power": 25,
			"accuracy": 100,
			"effects": "Hits three times. This move is always a critical hit unless the target is under the effect of Lucky Chant or has the Battle Armor or Shell Armor Abilities.",
			"summary": "Always results in a critical hit. Hits 3 times."
		},
		"swagger": {
			"name": "Swagger",
			"type": "Normal",
			"category": "Status",
			"power": 0,
			"accuracy": 85,
			"effects": "Raises the target's Attack by 2 stages and confuses it.",
			"summary": "Raises the target's Attack by 2 and confuses it."
		},
		"swift": {
			"name": "Swift",
			"type": "Normal",
			"category": "Special",
			"power": 60,
			"accuracy": true,
			"effects": "This move does not check accuracy.",
			"summary": "This move does not check accuracy. Hits foes."
		},
		"switcheroo": {
			"name": "Switcheroo",
			"type": "Dark",
			"category": "Status",
			"power": 0,
			"accuracy": 100,
			"effects": "The user swaps its held item with the target's held item. Fails if both the user and the target have no held item, or if the user is trying to give or take a Blue Orb, Red Orb, Griseous Orb, Plate, Drive, Memory, Rusted Sword, or Rusted Shield to or from a Kyogre, Groudon, Giratina, Arceus, Genesect, Silvally, Zacian, or Zamazenta, respectively. The target is immune to this move if it has the Sticky Hold Ability.",
			"summary": "User switches its held item with the target's."
		},
		"swordsdance": {
			"name": "Swords Dance",
			"type": "Normal",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "Raises the user's Attack by 2 stages.",
			"summary": "Raises the user's Attack by 2."
		},
		"synthesis": {
			"name": "Synthesis",
			"type": "Grass",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "The user restores 1/2 of its maximum HP if Strong Winds or no weather conditions are in effect or if the user is holding Utility Umbrella, 2/3 of its maximum HP if the weather is Intense Sun or Sun, and 1/4 of its maximum HP if the weather is Hail, Heavy Rain, Rain, or Sandstorm, all rounded half down.",
			"summary": "Heals the user by a weather-dependent amount."
		},
		"tackle": {
			"name": "Tackle",
			"type": "Normal",
			"category": "Physical",
			"power": 40,
			"accuracy": 100,
			"effects": "No additional effect.",
			"summary": "No additional effect."
		},
		"tailglow": {
			"name": "Tail Glow",
			"type": "Bug",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "Raises the user's Special Attack by 3 stages.",
			"summary": "Raises the user's Sp. Atk by 3."
		},
		"tailslap": {
			"name": "Tail Slap",
			"type": "Normal",
			"category": "Physical",
			"power": 25,
			"accuracy": 85,
			"effects": "Hits two to five times. Has a 35% chance to hit two or three times and a 15% chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times.",
			"summary": "Hits 2-5 times in one turn."
		},
		"tailwhip": {
			"name": "Tail Whip",
			"type": "Normal",
			"category": "Status",
			"power": 0,
			"accuracy": 100,
			"effects": "Lowers the target's Defense by 1 stage.",
			"summary": "Lowers the foe(s) Defense by 1."
		},
		"tailwind": {
			"name": "Tailwind",
			"type": "Flying",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "For 4 turns, the user and its party members have their Speed doubled. Fails if this move is already in effect for the user's side.",
			"summary": "For 4 turns, allies' Speed is doubled."
		},
		"tarshot": {
			"name": "Tar Shot",
			"type": "Rock",
			"category": "Status",
			"power": 0,
			"accuracy": 100,
			"effects": "Lowers the target's Speed by 1 stage. Until the target switches out, the effectiveness of Fire-type moves is doubled against it.",
			"summary": "Target gets -1 Spe and becomes weaker to Fire."
		},
		"taunt": {
			"name": "Taunt",
			"type": "Dark",
			"category": "Status",
			"power": 0,
			"accuracy": 100,
			"effects": "Prevents the target from using non-damaging moves for its next three turns. Pokemon with the Oblivious Ability or protected by the Aroma Veil Ability are immune.",
			"summary": "Target can't use status moves its next 3 turns."
		},
		"teatime": {
			"name": "Teatime",
			"type": "Normal",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "All active Pokemon consume their held Berries. This effect is not prevented by substitutes, the Klutz or Unnerve Abilities, or the effects of Embargo or Magic Room. Fails if no active Pokemon is holding a Berry.",
			"summary": "All active Pokemon consume held Berries."
		},
		"technoblast": {
			"name": "Techno Blast",
			"type": "Normal",
			"category": "Special",
			"power": 120,
			"accuracy": 100,
			"effects": "This move's type depends on the user's held Drive.",
			"summary": "Type varies based on the held Drive."
		},
		"teeterdance": {
			"name": "Teeter Dance",
			"type": "Normal",
			"category": "Status",
			"power": 0,
			"accuracy": 100,
			"effects": "Causes the target to become confused.",
			"summary": "Confuses adjacent Pokemon."
		},
		"teleport": {
			"name": "Teleport",
			"type": "Psychic",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "If this move is successful and the user has not fainted, the user switches out even if it is trapped and is replaced immediately by a selected party member. The user does not switch out if there are no unfainted party members.",
			"summary": "User switches out."
		},
		"terrainpulse": {
			"name": "Terrain Pulse",
			"type": "Normal",
			"category": "Special",
			"power": 50,
			"accuracy": 100,
			"effects": "Power doubles if the user is grounded and a terrain is active, and this move's type changes to match. Electric type during Electric Terrain, Grass type during Grassy Terrain, Fairy type during Misty Terrain, and Psychic type during Psychic Terrain.",
			"summary": "User on terrain: power doubles, type varies."
		},
		"thief": {
			"name": "Thief",
			"type": "Dark",
			"category": "Physical",
			"power": 60,
			"accuracy": 100,
			"effects": "If the user has no item, it steals the target's.",
			"summary": "If the user has no item, it steals the target's."
		},
		"thousandarrows": {
			"name": "Thousand Arrows",
			"type": "Ground",
			"category": "Physical",
			"power": 90,
			"accuracy": 100,
			"effects": "Grounds adjacent foes. First hit neutral on Flying.",
			"summary": "Grounds adjacent foes. First hit neutral on Flying."
		},
		"throatchop": {
			"name": "Throat Chop",
			"type": "Dark",
			"category": "Physical",
			"power": 80,
			"accuracy": 100,
			"effects": "For 2 turns, the target cannot use sound-based moves.",
			"summary": "For 2 turns, the target cannot use sound moves."
		},
		"thunder": {
			"name": "Thunder",
			"type": "Electric",
			"category": "Special",
			"power": 110,
			"accuracy": 70,
			"effects": "Has a 30% chance to paralyze the target. This move can hit a target using Bounce, Fly, or Sky Drop, or is under the effect of Sky Drop. If the weather is Heavy Rain or Rain, this move does not check accuracy. If the weather is Intense Sun or Sun, this move's accuracy is 50%. If this move is used against a Pokemon holding Utility Umbrella, this move's accuracy remains at 70%.",
			"summary": "30% chance to paralyze. Can't miss in rain."
		},
		"thundercage": {
			"name": "Thunder Cage",
			"type": "Electric",
			"category": "Special",
			"power": 80,
			"accuracy": 90,
			"effects": "Traps and damages the target for 4-5 turns.",
			"summary": "Traps and damages the target for 4-5 turns."
		},
		"thunderfang": {
			"name": "Thunder Fang",
			"type": "Electric",
			"category": "Physical",
			"power": 65,
			"accuracy": 95,
			"effects": "Has a 10% chance to paralyze the target and a 10% chance to make it flinch.",
			"summary": "10% chance to paralyze. 10% chance to flinch."
		},
		"thunderpunch": {
			"name": "Thunder Punch",
			"type": "Electric",
			"category": "Physical",
			"power": 75,
			"accuracy": 100,
			"effects": "Has a 10% chance to paralyze the target.",
			"summary": "10% chance to paralyze the target."
		},
		"thunderwave": {
			"name": "Thunder Wave",
			"type": "Electric",
			"category": "Status",
			"power": 0,
			"accuracy": 90,
			"effects": "Paralyzes the target. This move does not ignore type immunity.",
			"summary": "Paralyzes the target."
		},
		"thunderbolt": {
			"name": "Thunderbolt",
			"type": "Electric",
			"category": "Special",
			"power": 90,
			"accuracy": 100,
			"effects": "Has a 10% chance to paralyze the target.",
			"summary": "10% chance to paralyze the target."
		},
		"thunderouskick": {
			"name": "Thunderous Kick",
			"type": "Fighting",
			"category": "Physical",
			"power": 90,
			"accuracy": 100,
			"effects": "Has a 100% chance to lower the target's Defense by 1 stage.",
			"summary": "100% chance to lower the target's Defense by 1."
		},
		"topsyturvy": {
			"name": "Topsy-Turvy",
			"type": "Dark",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "The target's positive stat stages become negative and vice versa. Fails if all of the target's stat stages are 0.",
			"summary": "Inverts the target's stat stages."
		},
		"torment": {
			"name": "Torment",
			"type": "Dark",
			"category": "Status",
			"power": 0,
			"accuracy": 100,
			"effects": "Prevents the target from selecting the same move for use two turns in a row. This effect ends when the target is no longer active.",
			"summary": "Target can't select the same move twice in a row."
		},
		"toxic": {
			"name": "Toxic",
			"type": "Poison",
			"category": "Status",
			"power": 0,
			"accuracy": 90,
			"effects": "Badly poisons the target. If a Poison-type Pokemon uses this move, the target cannot avoid the attack, even if the target is in the middle of a two-turn move.",
			"summary": "Badly poisons the target. Poison types can't miss."
		},
		"toxicspikes": {
			"name": "Toxic Spikes",
			"type": "Poison",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "Poisons grounded foes on switch-in. Max 2 layers.",
			"summary": "Poisons grounded foes on switch-in. Max 2 layers."
		},
		"transform": {
			"name": "Transform",
			"type": "Normal",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "Copies target's stats, moves, types, and Ability.",
			"summary": "Copies target's stats, moves, types, and Ability."
		},
		"triattack": {
			"name": "Tri Attack",
			"type": "Normal",
			"category": "Special",
			"power": 80,
			"accuracy": 100,
			"effects": "Has a 20% chance to either burn, freeze, or paralyze the target.",
			"summary": "20% chance to paralyze or burn or freeze target."
		},
		"trick": {
			"name": "Trick",
			"type": "Psychic",
			"category": "Status",
			"power": 0,
			"accuracy": 100,
			"effects": "The user swaps its held item with the target's held item. Fails if both the user and the target have no held item, or if the user is trying to give or take a Blue Orb, Red Orb, Griseous Orb, Plate, Drive, Memory, Rusted Sword, or Rusted Shield to or from a Kyogre, Groudon, Giratina, Arceus, Genesect, Silvally, Zacian, or Zamazenta, respectively. The target is immune to this move if it has the Sticky Hold Ability.",
			"summary": "User switches its held item with the target's."
		},
		"trickroom": {
			"name": "Trick Room",
			"type": "Psychic",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "For 5 turns, the Speed of every Pokemon is recalculated for the purposes of determining turn order. During the effect, each Pokemon's Speed is considered to be (10000 - its normal Speed), and if this value is greater than 8191, 8192 is subtracted from it. If this move is used during the effect, the effect ends.",
			"summary": "Goes last. For 5 turns, turn order is reversed."
		},
		"tripleaxel": {
			"name": "Triple Axel",
			"type": "Ice",
			"category": "Physical",
			"power": 20,
			"accuracy": 90,
			"effects": "Hits three times. Power increases to 40 for the second hit and 60 for the third. This move checks accuracy for each hit, and the attack ends if the target avoids a hit. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit three times.",
			"summary": "Hits 3 times. Each hit can miss, but power rises."
		},
		"triplekick": {
			"name": "Triple Kick",
			"type": "Fighting",
			"category": "Physical",
			"power": 10,
			"accuracy": 90,
			"effects": "Hits three times. Power increases to 20 for the second hit and 30 for the third. This move checks accuracy for each hit, and the attack ends if the target avoids a hit. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit three times.",
			"summary": "Hits 3 times. Each hit can miss, but power rises."
		},
		"tropkick": {
			"name": "Trop Kick",
			"type": "Grass",
			"category": "Physical",
			"power": 70,
			"accuracy": 100,
			"effects": "Has a 100% chance to lower the target's Attack by 1 stage.",
			"summary": "100% chance to lower the target's Attack by 1."
		},
		"uturn": {
			"name": "U-turn",
			"type": "Bug",
			"category": "Physical",
			"power": 70,
			"accuracy": 100,
			"effects": "If this move is successful and the user has not fainted, the user switches out even if it is trapped and is replaced immediately by a selected party member. The user does not switch out if there are no unfainted party members, or if the target switched out using an Eject Button or through the effect of the Emergency Exit or Wimp Out Abilities.",
			"summary": "User switches out after damaging the target."
		},
		"vcreate": {
			"name": "V-create",
			"type": "Fire",
			"category": "Physical",
			"power": 180,
			"accuracy": 95,
			"effects": "Lowers the user's Speed, Defense, and Special Defense by 1 stage.",
			"summary": "Lowers the user's Defense, Sp. Def, Speed by 1."
		},
		"vacuumwave": {
			"name": "Vacuum Wave",
			"type": "Fighting",
			"category": "Special",
			"power": 40,
			"accuracy": 100,
			"effects": "Usually goes first.",
			"summary": "Usually goes first."
		},
		"venoshock": {
			"name": "Venoshock",
			"type": "Poison",
			"category": "Special",
			"power": 65,
			"accuracy": 100,
			"effects": "Power doubles if the target is poisoned.",
			"summary": "Power doubles if the target is poisoned."
		},
		"voltswitch": {
			"name": "Volt Switch",
			"type": "Electric",
			"category": "Special",
			"power": 70,
			"accuracy": 100,
			"effects": "If this move is successful and the user has not fainted, the user switches out even if it is trapped and is replaced immediately by a selected party member. The user does not switch out if there are no unfainted party members, or if the target switched out using an Eject Button or through the effect of the Emergency Exit or Wimp Out Abilities.",
			"summary": "User switches out after damaging the target."
		},
		"waterpulse": {
			"name": "Water Pulse",
			"type": "Water",
			"category": "Special",
			"power": 60,
			"accuracy": 100,
			"effects": "Has a 20% chance to confuse the target.",
			"summary": "20% chance to confuse the target."
		},
		"waterspout": {
			"name": "Water Spout",
			"type": "Water",
			"category": "Special",
			"power": 150,
			"accuracy": 100,
			"effects": "Power is equal to (user's current HP × 150 / user's maximum HP), rounded down, but not less than 1.",
			"summary": "Less power as user's HP decreases. Hits foe(s)."
		},
		"waterfall": {
			"name": "Waterfall",
			"type": "Water",
			"category": "Physical",
			"power": 80,
			"accuracy": 100,
			"effects": "Has a 20% chance to make the target flinch.",
			"summary": "20% chance to make the target flinch."
		},
		"weatherball": {
			"name": "Weather Ball",
			"type": "Normal",
			"category": "Special",
			"power": 50,
			"accuracy": 100,
			"effects": "Power doubles if a weather condition other than Strong Winds is active, and this move's type changes to match. Ice type during Hail, Water type during Heavy Rain or Rain, Rock type during Sandstorm, and Fire type during Intense Sun or Sun. If the user is holding Utility Umbrella and uses Weather Ball during Heavy Rain, Rain, Intense Sun, or Sun, this move remains Normal type and does not double in power.",
			"summary": "Power doubles and type varies in each weather."
		},
		"whirlpool": {
			"name": "Whirlpool",
			"type": "Water",
			"category": "Special",
			"power": 35,
			"accuracy": 85,
			"effects": "Traps and damages the target for 4-5 turns.",
			"summary": "Traps and damages the target for 4-5 turns."
		},
		"wickedblow": {
			"name": "Wicked Blow",
			"type": "Dark",
			"category": "Physical",
			"power": 80,
			"accuracy": 100,
			"effects": "This move is always a critical hit unless the target is under the effect of Lucky Chant or has the Battle Armor or Shell Armor Abilities.",
			"summary": "Always results in a critical hit."
		},
		"wideguard": {
			"name": "Wide Guard",
			"type": "Rock",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "Protects allies from multi-target moves this turn.",
			"summary": "Protects allies from multi-target moves this turn."
		},
		"wildcharge": {
			"name": "Wild Charge",
			"type": "Electric",
			"category": "Physical",
			"power": 90,
			"accuracy": 100,
			"effects": "If the target lost HP, the user takes recoil damage equal to 1/4 the HP lost by the target, rounded half up, but not less than 1 HP.",
			"summary": "Has 1/4 recoil."
		},
		"willowisp": {
			"name": "Will-O-Wisp",
			"type": "Fire",
			"category": "Status",
			"power": 0,
			"accuracy": 85,
			"effects": "Burns the target.",
			"summary": "Burns the target."
		},
		"wish": {
			"name": "Wish",
			"type": "Normal",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "At the end of the next turn, the Pokemon at the user's position has 1/2 of the user's maximum HP restored to it, rounded down. Fails if this move is already in effect for the user's position.",
			"summary": "Next turn, 50% of the user's max HP is restored."
		},
		"woodhammer": {
			"name": "Wood Hammer",
			"type": "Grass",
			"category": "Physical",
			"power": 120,
			"accuracy": 100,
			"effects": "If the target lost HP, the user takes recoil damage equal to 33% the HP lost by the target, rounded half up, but not less than 1 HP.",
			"summary": "Has 33% recoil."
		},
		"wrap": {
			"name": "Wrap",
			"type": "Normal",
			"category": "Physical",
			"power": 15,
			"accuracy": 90,
			"effects": "Traps and damages the target for 4-5 turns.",
			"summary": "Traps and damages the target for 4-5 turns."
		},
		"xscissor": {
			"name": "X-Scissor",
			"type": "Bug",
			"category": "Physical",
			"power": 80,
			"accuracy": 100,
			"effects": "No additional effect.",
			"summary": "No additional effect."
		},
		"yawn": {
			"name": "Yawn",
			"type": "Normal",
			"category": "Status",
			"power": 0,
			"accuracy": true,
			"effects": "Puts the target to sleep after 1 turn.",
			"summary": "Puts the target to sleep after 1 turn."
		},
		"zenheadbutt": {
			"name": "Zen Headbutt",
			"type": "Psychic",
			"category": "Physical",
			"power": 80,
			"accuracy": 90,
			"effects": "Has a 20% chance to make the target flinch.",
			"summary": "20% chance to make the target flinch."
		},
		"zingzap": {
			"name": "Zing Zap",
			"type": "Electric",
			"category": "Physical",
			"power": 80,
			"accuracy": 100,
			"effects": "Has a 30% chance to make the target flinch.",
			"summary": "30% chance to make the target flinch."
		},
		"pound": {"name":"Pound","type":"Normal","category":"Physical","power":40,"accuracy":100,"effects":"No additional effect.","summary":"No additional effect."},
		"karatechop": {"name":"Karate Chop","type":"Fighting","category":"Physical","power":50,"accuracy":100,"effects":"Has a higher chance for a critical hit.","summary":"High critical hit ratio."},
		"doubleslap": {"name":"Double Slap","type":"Normal","category":"Physical","power":15,"accuracy":85,"effects":"Hits two to five times. Has a 35% chance to hit two or three times and a 15% chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times.","summary":"Hits 2-5 times in one turn."},
		"cometpunch": {"name":"Comet Punch","type":"Normal","category":"Physical","power":18,"accuracy":85,"effects":"Hits two to five times. Has a 35% chance to hit two or three times and a 15% chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times.","summary":"Hits 2-5 times in one turn."},
		"megapunch": {"name":"Mega Punch","type":"Normal","category":"Physical","power":80,"accuracy":85,"effects":"No additional effect.","summary":"No additional effect."},
		"payday": {"name":"Pay Day","type":"Normal","category":"Physical","power":40,"accuracy":100,"effects":"Scatters coins.","summary":"Scatters coins."},
		"visegrip": {"name":"Vise Grip","type":"Normal","category":"Physical","power":55,"accuracy":100,"effects":"No additional effect.","summary":"No additional effect."},
		"guillotine": {"name":"Guillotine","type":"Normal","category":"Physical","power":0,"accuracy":30,"effects":"Deals damage to the target equal to the target's maximum HP. Ignores accuracy and evasiveness modifiers. This attack's accuracy is equal to (user's level - target's level + 30)%, and fails if the target is at a higher level. Pokemon with the Sturdy Ability are immune.","summary":"OHKOs the target. Fails if user is a lower level."},
		"razorwind": {"name":"Razor Wind","type":"Normal","category":"Special","power":80,"accuracy":100,"effects":"Has a higher chance for a critical hit. This attack charges on the first turn and executes on the second. If the user is holding a Power Herb, the move completes in one turn.","summary":"Charges, then hits foe(s) turn 2. High crit ratio."},
		"cut": {"name":"Cut","type":"Normal","category":"Physical","power":50,"accuracy":95,"effects":"No additional effect.","summary":"No additional effect."},
		"gust": {"name":"Gust","type":"Flying","category":"Special","power":40,"accuracy":100,"effects":"Power doubles if the target is using Bounce, Fly, or Sky Drop, or is under the effect of Sky Drop.","summary":"Power doubles during Bounce, Fly, and Sky Drop."},
		"wingattack": {"name":"Wing Attack","type":"Flying","category":"Physical","power":60,"accuracy":100,"effects":"No additional effect.","summary":"No additional effect."},
		"whirlwind": {"name":"Whirlwind","type":"Normal","category":"Status","power":0,"accuracy":true,"effects":"The target is forced to switch out and be replaced with a random unfainted ally. Fails if the target is the last unfainted Pokemon in its party, or if the target used Ingrain previously or has the Suction Cups Ability.","summary":"Forces the target to switch to a random ally."},
		"fly": {"name":"Fly","type":"Flying","category":"Physical","power":90,"accuracy":95,"effects":"This attack charges on the first turn and executes on the second. On the first turn, the user avoids all attacks other than Gust, Hurricane, Sky Uppercut, Smack Down, Thousand Arrows, Thunder, and Twister, and Gust and Twister have doubled power when used against it. If the user is holding a Power Herb, the move completes in one turn.","summary":"Flies up on first turn, then strikes the next turn."},
		"bind": {"name":"Bind","type":"Normal","category":"Physical","power":15,"accuracy":85,"effects":"Traps and damages the target for 4-5 turns.","summary":"Traps and damages the target for 4-5 turns."},
		"slam": {"name":"Slam","type":"Normal","category":"Physical","power":80,"accuracy":75,"effects":"No additional effect.","summary":"No additional effect."},
		"vinewhip": {"name":"Vine Whip","type":"Grass","category":"Physical","power":45,"accuracy":100,"effects":"No additional effect.","summary":"No additional effect."},
		"stomp": {"name":"Stomp","type":"Normal","category":"Physical","power":65,"accuracy":100,"effects":"Has a 30% chance to make the target flinch. Damage doubles and no accuracy check is done if the target has used Minimize while active.","summary":"30% chance to make the target flinch."},
		"megakick": {"name":"Mega Kick","type":"Normal","category":"Physical","power":120,"accuracy":75,"effects":"No additional effect.","summary":"No additional effect."},
		"rollingkick": {"name":"Rolling Kick","type":"Fighting","category":"Physical","power":60,"accuracy":85,"effects":"Has a 30% chance to make the target flinch.","summary":"30% chance to make the target flinch."},
		"hornattack": {"name":"Horn Attack","type":"Normal","category":"Physical","power":65,"accuracy":100,"effects":"No additional effect.","summary":"No additional effect."},
		"furyattack": {"name":"Fury Attack","type":"Normal","category":"Physical","power":15,"accuracy":85,"effects":"Hits two to five times. Has a 35% chance to hit two or three times and a 15% chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times.","summary":"Hits 2-5 times in one turn."},
		"horndrill": {"name":"Horn Drill","type":"Normal","category":"Physical","power":0,"accuracy":30,"effects":"Deals damage to the target equal to the target's maximum HP. Ignores accuracy and evasiveness modifiers. This attack's accuracy is equal to (user's level - target's level + 30)%, and fails if the target is at a higher level. Pokemon with the Sturdy Ability are immune.","summary":"OHKOs the target. Fails if user is a lower level."},
		"takedown": {"name":"Take Down","type":"Normal","category":"Physical","power":90,"accuracy":85,"effects":"If the target lost HP, the user takes recoil damage equal to 1/4 the HP lost by the target, rounded half up, but not less than 1 HP.","summary":"Has 1/4 recoil."},
		"thrash": {"name":"Thrash","type":"Normal","category":"Physical","power":120,"accuracy":100,"effects":"Lasts 2-3 turns. Confuses the user afterwards.","summary":"Lasts 2-3 turns. Confuses the user afterwards."},
		"poisonsting": {"name":"Poison Sting","type":"Poison","category":"Physical","power":15,"accuracy":100,"effects":"Has a 30% chance to poison the target.","summary":"30% chance to poison the target."},
		"twineedle": {"name":"Twineedle","type":"Bug","category":"Physical","power":25,"accuracy":100,"effects":"Hits twice, with each hit having a 20% chance to poison the target. If the first hit breaks the target's substitute, it will take damage for the second hit.","summary":"Hits 2 times. Each hit has 20% chance to poison."},
		"roar": {"name":"Roar","type":"Normal","category":"Status","power":0,"accuracy":true,"effects":"The target is forced to switch out and be replaced with a random unfainted ally. Fails if the target is the last unfainted Pokemon in its party, or if the target used Ingrain previously or has the Suction Cups Ability.","summary":"Forces the target to switch to a random ally."},
		"sonicboom": {"name":"Sonic Boom","type":"Normal","category":"Special","power":0,"accuracy":90,"effects":"Deals 20 HP of damage to the target.","summary":"Always does 20 HP of damage."},
		"acid": {"name":"Acid","type":"Poison","category":"Special","power":40,"accuracy":100,"effects":"Has a 10% chance to lower the target's Special Defense by 1 stage.","summary":"10% chance to lower the foe(s) Sp. Def by 1."},
		"mist": {"name":"Mist","type":"Ice","category":"Status","power":0,"accuracy":true,"effects":"For 5 turns, the user and its party members are protected from having their stat stages lowered by other Pokemon. Fails if the effect is already active on the user's side.","summary":"For 5 turns, protects user's party from stat drops."},
		"watergun": {"name":"Water Gun","type":"Water","category":"Special","power":40,"accuracy":100,"effects":"No additional effect.","summary":"No additional effect."},
		"psybeam": {"name":"Psybeam","type":"Psychic","category":"Special","power":65,"accuracy":100,"effects":"Has a 10% chance to confuse the target.","summary":"10% chance to confuse the target."},
		"aurorabeam": {"name":"Aurora Beam","type":"Ice","category":"Special","power":65,"accuracy":100,"effects":"Has a 10% chance to lower the target's Attack by 1 stage.","summary":"10% chance to lower the target's Attack by 1."},
		"drillpeck": {"name":"Drill Peck","type":"Flying","category":"Physical","power":80,"accuracy":100,"effects":"No additional effect.","summary":"No additional effect."},
		"submission": {"name":"Submission","type":"Fighting","category":"Physical","power":80,"accuracy":80,"effects":"If the target lost HP, the user takes recoil damage equal to 1/4 the HP lost by the target, rounded half up, but not less than 1 HP.","summary":"Has 1/4 recoil."},
		"seismictoss": {"name":"Seismic Toss","type":"Fighting","category":"Physical","power":0,"accuracy":100,"effects":"Deals damage to the target equal to the user's level.","summary":"Does damage equal to the user's level."},
		"absorb": {"name":"Absorb","type":"Grass","category":"Special","power":20,"accuracy":100,"effects":"The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3× normal, rounded half down.","summary":"User recovers 50% of the damage dealt."},
		"razorleaf": {"name":"Razor Leaf","type":"Grass","category":"Physical","power":55,"accuracy":95,"effects":"Has a higher chance for a critical hit.","summary":"High critical hit ratio. Hits adjacent foes."},
		"petaldance": {"name":"Petal Dance","type":"Grass","category":"Special","power":120,"accuracy":100,"effects":"Lasts 2-3 turns. Confuses the user afterwards.","summary":"Lasts 2-3 turns. Confuses the user afterwards."},
		"stringshot": {"name":"String Shot","type":"Bug","category":"Status","power":0,"accuracy":95,"effects":"Lowers the target's Speed by 2 stages.","summary":"Lowers the foe(s) Speed by 2."},
		"dragonrage": {"name":"Dragon Rage","type":"Dragon","category":"Special","power":0,"accuracy":100,"effects":"Deals 40 HP of damage to the target.","summary":"Deals 40 HP of damage to the target."},
		"thundershock": {"name":"Thunder Shock","type":"Electric","category":"Special","power":40,"accuracy":100,"effects":"Has a 10% chance to paralyze the target.","summary":"10% chance to paralyze the target."},
		"rockthrow": {"name":"Rock Throw","type":"Rock","category":"Physical","power":50,"accuracy":90,"effects":"No additional effect.","summary":"No additional effect."},
		"fissure": {"name":"Fissure","type":"Ground","category":"Physical","power":0,"accuracy":30,"effects":"Deals damage to the target equal to the target's maximum HP. Ignores accuracy and evasiveness modifiers. This attack's accuracy is equal to (user's level - target's level + 30)%, and fails if the target is at a higher level. Pokemon with the Sturdy Ability are immune.","summary":"OHKOs the target. Fails if user is a lower level."},
		"confusion": {"name":"Confusion","type":"Psychic","category":"Special","power":50,"accuracy":100,"effects":"Has a 10% chance to confuse the target.","summary":"10% chance to confuse the target."},
		"meditate": {"name":"Meditate","type":"Psychic","category":"Status","power":0,"accuracy":true,"effects":"Raises the user's Attack by 1 stage.","summary":"Raises the user's Attack by 1."},
		"rage": {"name":"Rage","type":"Normal","category":"Physical","power":20,"accuracy":100,"effects":"Once this move is successfully used, the user's Attack is raised by 1 stage every time it is hit by another Pokemon's attack as long as this move is chosen for use.","summary":"Raises the user's Attack by 1 if hit during use."},
		"nightshade": {"name":"Night Shade","type":"Ghost","category":"Special","power":0,"accuracy":100,"effects":"Deals damage to the target equal to the user's level.","summary":"Does damage equal to the user's level."},
		"mimic": {"name":"Mimic","type":"Normal","category":"Status","power":0,"accuracy":true,"effects":"While the user remains active, this move is replaced by the last move used by the target. The copied move has the maximum PP for that move. Fails if the target has not made a move, if the user has Transformed, if the user already knows the move, or if the move is Behemoth Bash, Behemoth Blade, Chatter, Dynamax Cannon, Mimic, Sketch, Struggle, Transform, or any Max or G-Max Move.","summary":"The last move the target used replaces this one."},
		"harden": {"name":"Harden","type":"Normal","category":"Status","power":0,"accuracy":true,"effects":"Raises the user's Defense by 1 stage.","summary":"Raises the user's Defense by 1."},
		"minimize": {"name":"Minimize","type":"Normal","category":"Status","power":0,"accuracy":true,"effects":"Raises the user's evasiveness by 2 stages. Whether or not the user's evasiveness was changed, Body Slam, Dragon Rush, Flying Press, Heat Crash, Heavy Slam, Malicious Moonsault, Steamroller, and Stomp will not check accuracy and have their damage doubled if used against the user while it is active.","summary":"Raises the user's evasiveness by 2."},
		"withdraw": {"name":"Withdraw","type":"Water","category":"Status","power":0,"accuracy":true,"effects":"Raises the user's Defense by 1 stage.","summary":"Raises the user's Defense by 1."},
		"defensecurl": {"name":"Defense Curl","type":"Normal","category":"Status","power":0,"accuracy":true,"effects":"Raises the user's Defense by 1 stage. As long as the user remains active, the power of the user's Ice Ball and Rollout will be doubled (this effect is not stackable).","summary":"Raises the user's Defense by 1."},
		"barrier": {"name":"Barrier","type":"Psychic","category":"Status","power":0,"accuracy":true,"effects":"Raises the user's Defense by 2 stages.","summary":"Raises the user's Defense by 2."},
		"bide": {"name":"Bide","type":"Normal","category":"Physical","power":0,"accuracy":true,"effects":"Waits 2 turns; deals double the damage taken.","summary":"Waits 2 turns; deals double the damage taken."},
		"metronome": {"name":"Metronome","type":"Normal","category":"Status","power":0,"accuracy":true,"effects":"Picks a random move.","summary":"Picks a random move."},
		"mirrormove": {"name":"Mirror Move","type":"Flying","category":"Status","power":0,"accuracy":true,"effects":"The user uses the last move used by the target. The copied move is used against that target, if possible. Fails if the target has not made a move, or if the last move used cannot be copied by this move.","summary":"User uses the target's last used move against it."},
		"selfdestruct": {"name":"Self-Destruct","type":"Normal","category":"Physical","power":200,"accuracy":100,"effects":"The user faints after using this move, even if this move fails for having no target. This move is prevented from executing if any active Pokemon has the Damp Ability.","summary":"Hits adjacent Pokemon. The user faints."},
		"eggbomb": {"name":"Egg Bomb","type":"Normal","category":"Physical","power":100,"accuracy":75,"effects":"No additional effect.","summary":"No additional effect."},
		"boneclub": {"name":"Bone Club","type":"Ground","category":"Physical","power":65,"accuracy":85,"effects":"Has a 10% chance to make the target flinch.","summary":"10% chance to make the target flinch."},
		"clamp": {"name":"Clamp","type":"Water","category":"Physical","power":35,"accuracy":85,"effects":"Traps and damages the target for 4-5 turns.","summary":"Traps and damages the target for 4-5 turns."},
		"skullbash": {"name":"Skull Bash","type":"Normal","category":"Physical","power":130,"accuracy":100,"effects":"This attack charges on the first turn and executes on the second. Raises the user's Defense by 1 stage on the first turn. If the user is holding a Power Herb, the move completes in one turn.","summary":"Raises user's Defense by 1 on turn 1. Hits turn 2."},
		"spikecannon": {"name":"Spike Cannon","type":"Normal","category":"Physical","power":20,"accuracy":100,"effects":"Hits two to five times. Has a 35% chance to hit two or three times and a 15% chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times.","summary":"Hits 2-5 times in one turn."},
		"constrict": {"name":"Constrict","type":"Normal","category":"Physical","power":10,"accuracy":100,"effects":"Has a 10% chance to lower the target's Speed by 1 stage.","summary":"10% chance to lower the target's Speed by 1."},
		"amnesia": {"name":"Amnesia","type":"Psychic","category":"Status","power":0,"accuracy":true,"effects":"Raises the user's Special Defense by 2 stages.","summary":"Raises the user's Sp. Def by 2."},
		"kinesis": {"name":"Kinesis","type":"Psychic","category":"Status","power":0,"accuracy":80,"effects":"Lowers the target's accuracy by 1 stage.","summary":"Lowers the target's accuracy by 1."},
		"poisongas": {"name":"Poison Gas","type":"Poison","category":"Status","power":0,"accuracy":90,"effects":"Poisons the target.","summary":"Poisons the foe(s)."},
		"barrage": {"name":"Barrage","type":"Normal","category":"Physical","power":15,"accuracy":85,"effects":"Hits two to five times. Has a 35% chance to hit two or three times and a 15% chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times.","summary":"Hits 2-5 times in one turn."},
		"lovelykiss": {"name":"Lovely Kiss","type":"Normal","category":"Status","power":0,"accuracy":75,"effects":"Causes the target to fall asleep.","summary":"Causes the target to fall asleep."},
		"bubble": {"name":"Bubble","type":"Water","category":"Special","power":40,"accuracy":100,"effects":"Has a 10% chance to lower the target's Speed by 1 stage.","summary":"10% chance to lower the foe(s) Speed by 1."},
		"dizzypunch": {"name":"Dizzy Punch","type":"Normal","category":"Physical","power":70,"accuracy":100,"effects":"Has a 20% chance to confuse the target.","summary":"20% chance to confuse the target."},
		"flash": {"name":"Flash","type":"Normal","category":"Status","power":0,"accuracy":100,"effects":"Lowers the target's accuracy by 1 stage.","summary":"Lowers the target's accuracy by 1."},
		"psywave": {"name":"Psywave","type":"Psychic","category":"Special","power":0,"accuracy":100,"effects":"Deals damage to the target equal to (user's level) × (X + 50) / 100, where X is a random number from 0 to 100, rounded down, but not less than 1 HP.","summary":"Random damage equal to 0.5×-1.5× user's level."},
		"splash": {"name":"Splash","type":"Normal","category":"Status","power":0,"accuracy":true,"effects":"No competitive use.","summary":"No competitive use."},
		"explosion": {"name":"Explosion","type":"Normal","category":"Physical","power":250,"accuracy":100,"effects":"The user faints after using this move, even if this move fails for having no target. This move is prevented from executing if any active Pokemon has the Damp Ability.","summary":"Hits adjacent Pokemon. The user faints."},
		"furyswipes": {"name":"Fury Swipes","type":"Normal","category":"Physical","power":18,"accuracy":80,"effects":"Hits two to five times. Has a 35% chance to hit two or three times and a 15% chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times.","summary":"Hits 2-5 times in one turn."},
		"hyperfang": {"name":"Hyper Fang","type":"Normal","category":"Physical","power":80,"accuracy":90,"effects":"Has a 10% chance to make the target flinch.","summary":"10% chance to make the target flinch."},
		"sharpen": {"name":"Sharpen","type":"Normal","category":"Status","power":0,"accuracy":true,"effects":"Raises the user's Attack by 1 stage.","summary":"Raises the user's Attack by 1."},
		"conversion": {"name":"Conversion","type":"Normal","category":"Status","power":0,"accuracy":true,"effects":"The user's type changes to match the original type of the move in its first move slot. Fails if the user cannot change its type, or if the type is one of the user's current types.","summary":"Changes user's type to match its first move."},
		"struggle": {"name":"Struggle","type":"Normal","category":"Physical","power":50,"accuracy":true,"effects":"Deals typeless damage to a random opposing Pokemon. If this move was successful, the user loses 1/4 of its maximum HP, rounded half up, and the Rock Head Ability does not prevent this. This move is automatically used if none of the user's known moves can be selected.","summary":"User loses 1/4 of its max HP."},
		"sketch": {"name":"Sketch","type":"Normal","category":"Status","power":0,"accuracy":true,"effects":"This move is permanently replaced by the last move used by the target. The copied move has the maximum PP for that move. Fails if the target has not made a move, if the user has Transformed, or if the move is Chatter, Sketch, Struggle, or any move the user knows.","summary":"Permanently copies the last move target used."},
		"spiderweb": {"name":"Spider Web","type":"Bug","category":"Status","power":0,"accuracy":true,"effects":"Prevents the target from switching out. The target can still switch out if it is holding Shed Shell or uses Baton Pass, Flip Turn, Parting Shot, Teleport, U-turn, or Volt Switch. The effect ends if either the user or the target leaves the field.","summary":"Prevents the target from switching out."},
		"mindreader": {"name":"Mind Reader","type":"Normal","category":"Status","power":0,"accuracy":true,"effects":"Until the end of the next turn, the target cannot avoid the user's moves, even if the target is in the middle of a two-turn move. The effect ends if either the user or the target leaves the field. Fails if this effect is active for the user.","summary":"User's next move will not miss the target."},
		"nightmare": {"name":"Nightmare","type":"Ghost","category":"Status","power":0,"accuracy":100,"effects":"Causes the target to lose 1/4 of its maximum HP, rounded down, at the end of each turn as long as it is asleep. This move does not affect the target unless it is asleep. The effect ends when the target wakes up, even if it falls asleep again in the same turn.","summary":"A sleeping target is hurt by 1/4 max HP per turn."},
		"flamewheel": {"name":"Flame Wheel","type":"Fire","category":"Physical","power":60,"accuracy":100,"effects":"Has a 10% chance to burn the target.","summary":"10% chance to burn the target. Thaws user."},
		"snore": {"name":"Snore","type":"Normal","category":"Special","power":50,"accuracy":100,"effects":"Has a 30% chance to make the target flinch. Fails if the user is not asleep.","summary":"User must be asleep. 30% chance to flinch target."},
		"flail": {"name":"Flail","type":"Normal","category":"Physical","power":0,"accuracy":100,"effects":"The power of this move is 20 if X is 33 to 48, 40 if X is 17 to 32, 80 if X is 10 to 16, 100 if X is 5 to 9, 150 if X is 2 to 4, and 200 if X is 0 or 1, where X is equal to (user's current HP × 48 / user's maximum HP), rounded down.","summary":"More power the less HP the user has left."},
		"conversion2": {"name":"Conversion 2","type":"Normal","category":"Status","power":0,"accuracy":true,"effects":"The user's type changes to match a type that resists or is immune to the type of the last move used by the target, but not either of its current types. The determined type of the move is used rather than the original type. Fails if the target has not made a move, if the user cannot change its type, or if this move would only be able to select one of the user's current types.","summary":"Changes user's type to resist target's last move."},
		"aeroblast": {"name":"Aeroblast","type":"Flying","category":"Special","power":100,"accuracy":95,"effects":"Has a higher chance for a critical hit.","summary":"High critical hit ratio."},
		"spite": {"name":"Spite","type":"Ghost","category":"Status","power":0,"accuracy":100,"effects":"Causes the target's last move used to lose 4 PP. Fails if the target has not made a move, if the move has 0 PP, or if it no longer knows the move.","summary":"Lowers the PP of the target's last move by 4."},
		"powdersnow": {"name":"Powder Snow","type":"Ice","category":"Special","power":40,"accuracy":100,"effects":"Has a 10% chance to freeze the target.","summary":"10% chance to freeze the foe(s)."},
		"feintattack": {"name":"Feint Attack","type":"Dark","category":"Physical","power":60,"accuracy":true,"effects":"This move does not check accuracy.","summary":"This move does not check accuracy."},
		"sweetkiss": {"name":"Sweet Kiss","type":"Fairy","category":"Status","power":0,"accuracy":75,"effects":"Causes the target to become confused.","summary":"Causes the target to become confused."},
		"mudslap": {"name":"Mud-Slap","type":"Ground","category":"Special","power":20,"accuracy":100,"effects":"Has a 100% chance to lower the target's accuracy by 1 stage.","summary":"100% chance to lower the target's accuracy by 1."},
		"zapcannon": {"name":"Zap Cannon","type":"Electric","category":"Special","power":120,"accuracy":50,"effects":"Has a 100% chance to paralyze the target.","summary":"100% chance to paralyze the target."},
		"foresight": {"name":"Foresight","type":"Normal","category":"Status","power":0,"accuracy":true,"effects":"As long as the target remains active, its evasiveness stat stage is ignored during accuracy checks against it if it is greater than 0, and Normal- and Fighting-type attacks can hit the target if it is a Ghost type. Fails if the target is already affected, or affected by Miracle Eye or Odor Sleuth.","summary":"Fighting, Normal hit Ghost. Evasiveness ignored."},
		"perishsong": {"name":"Perish Song","type":"Normal","category":"Status","power":0,"accuracy":true,"effects":"All active Pokemon will faint in 3 turns.","summary":"All active Pokemon will faint in 3 turns."},
		"bonerush": {"name":"Bone Rush","type":"Ground","category":"Physical","power":25,"accuracy":90,"effects":"Hits two to five times. Has a 35% chance to hit two or three times and a 15% chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times.","summary":"Hits 2-5 times in one turn."},
		"lockon": {"name":"Lock-On","type":"Normal","category":"Status","power":0,"accuracy":true,"effects":"Until the end of the next turn, the target cannot avoid the user's moves, even if the target is in the middle of a two-turn move. The effect ends if either the user or the target leaves the field. Fails if this effect is active for the user.","summary":"User's next move will not miss the target."},
		"rollout": {"name":"Rollout","type":"Rock","category":"Physical","power":30,"accuracy":90,"effects":"If this move is successful, the user is locked into this move and cannot make another move until it misses, 5 turns have passed, or the attack cannot be used. Power doubles with each successful hit of this move and doubles again if Defense Curl was used previously by the user. If this move is called by Sleep Talk, the move is used for one turn.","summary":"Power doubles with each hit. Repeats for 5 turns."},
		"falseswipe": {"name":"False Swipe","type":"Normal","category":"Physical","power":40,"accuracy":100,"effects":"Leaves the target with at least 1 HP.","summary":"Always leaves the target with at least 1 HP."},
		"milkdrink": {"name":"Milk Drink","type":"Normal","category":"Status","power":0,"accuracy":true,"effects":"The user restores 1/2 of its maximum HP, rounded half up.","summary":"Heals the user by 50% of its max HP."},
		"furycutter": {"name":"Fury Cutter","type":"Bug","category":"Physical","power":40,"accuracy":95,"effects":"Power doubles with each successful hit, up to a maximum of 160 power. The power is reset if this move misses or another move is used.","summary":"Power doubles with each hit, up to 160."},
		"steelwing": {"name":"Steel Wing","type":"Steel","category":"Physical","power":70,"accuracy":90,"effects":"Has a 10% chance to raise the user's Defense by 1 stage.","summary":"10% chance to raise the user's Defense by 1."},
		"return": {"name":"Return","type":"Normal","category":"Physical","power":0,"accuracy":100,"effects":"Power is equal to the greater of (user's Happiness × 2/5), rounded down, or 1.","summary":"Max 102 power at maximum Happiness."},
		"present": {"name":"Present","type":"Normal","category":"Physical","power":0,"accuracy":90,"effects":"If this move is successful, it deals damage or heals the target. 40% chance for 40 power, 30% chance for 80 power, 10% chance for 120 power, and 20% chance to heal the target by 1/4 of its maximum HP, rounded down.","summary":"40, 80, 120 power, or heals target 1/4 max HP."},
		"frustration": {"name":"Frustration","type":"Normal","category":"Physical","power":0,"accuracy":100,"effects":"Power is equal to the greater of ((255 - user's Happiness) × 2/5), rounded down, or 1.","summary":"Max 102 power at minimum Happiness."},
		"magnitude": {"name":"Magnitude","type":"Ground","category":"Physical","power":0,"accuracy":100,"effects":"The power of this move varies; 5% chances for 10 and 150 power, 10% chances for 30 and 110 power, 20% chances for 50 and 90 power, and 30% chance for 70 power. Damage doubles if the target is using Dig.","summary":"Hits adjacent Pokemon. Power varies; 2× on Dig."},
		"dragonbreath": {"name":"Dragon Breath","type":"Dragon","category":"Special","power":60,"accuracy":100,"effects":"Has a 30% chance to paralyze the target.","summary":"30% chance to paralyze the target."},
		"pursuit": {"name":"Pursuit","type":"Dark","category":"Physical","power":40,"accuracy":100,"effects":"If a foe is switching out, hits it at 2× power.","summary":"If a foe is switching out, hits it at 2× power."},
		"sweetscent": {"name":"Sweet Scent","type":"Normal","category":"Status","power":0,"accuracy":100,"effects":"Lowers the target's evasiveness by 2 stages.","summary":"Lowers the foe(s) evasiveness by 2."},
		"metalclaw": {"name":"Metal Claw","type":"Steel","category":"Physical","power":50,"accuracy":95,"effects":"Has a 10% chance to raise the user's Attack by 1 stage.","summary":"10% chance to raise the user's Attack by 1."},
		"vitalthrow": {"name":"Vital Throw","type":"Fighting","category":"Physical","power":70,"accuracy":true,"effects":"This move does not check accuracy.","summary":"This move does not check accuracy. Goes last."},
		"hiddenpower": {"name":"Hidden Power","type":"Normal","category":"Special","power":60,"accuracy":100,"effects":"This move's type depends on the user's individual values (IVs), and can be any type but Fairy and Normal.","summary":"Varies in type based on the user's IVs."},
		"twister": {"name":"Twister","type":"Dragon","category":"Special","power":40,"accuracy":100,"effects":"Has a 20% chance to make the target flinch. Power doubles if the target is using Bounce, Fly, or Sky Drop, or is under the effect of Sky Drop.","summary":"20% chance to make the foe(s) flinch."},
		"psychup": {"name":"Psych Up","type":"Normal","category":"Status","power":0,"accuracy":true,"effects":"The user copies all of the target's current stat stage changes.","summary":"Copies the target's current stat stages."},
		"rocksmash": {"name":"Rock Smash","type":"Fighting","category":"Physical","power":40,"accuracy":100,"effects":"Has a 50% chance to lower the target's Defense by 1 stage.","summary":"50% chance to lower the target's Defense by 1."},
		"uproar": {"name":"Uproar","type":"Normal","category":"Special","power":90,"accuracy":100,"effects":"Lasts 3 turns. Active Pokemon cannot fall asleep.","summary":"Lasts 3 turns. Active Pokemon cannot fall asleep."},
		"spitup": {"name":"Spit Up","type":"Normal","category":"Special","power":0,"accuracy":100,"effects":"Power is equal to 100 times the user's Stockpile count. Fails if the user's Stockpile count is 0. Whether or not this move is successful, the user's Defense and Special Defense decrease by as many stages as Stockpile had increased them, and the user's Stockpile count resets to 0.","summary":"More power with more uses of Stockpile."},
		"swallow": {"name":"Swallow","type":"Normal","category":"Status","power":0,"accuracy":true,"effects":"The user restores its HP based on its Stockpile count. Restores 1/4 of its maximum HP if it's 1, 1/2 of its maximum HP if it's 2, both rounded half down, and all of its HP if it's 3. Fails if the user's Stockpile count is 0. The user's Defense and Special Defense decrease by as many stages as Stockpile had increased them, and the user's Stockpile count resets to 0.","summary":"Heals the user based on uses of Stockpile."},
		"focuspunch": {"name":"Focus Punch","type":"Fighting","category":"Physical","power":150,"accuracy":100,"effects":"The user loses its focus and does nothing if it is hit by a damaging attack this turn before it can execute the move.","summary":"Fails if the user takes damage before it hits."},
		"smellingsalts": {"name":"Smelling Salts","type":"Normal","category":"Physical","power":70,"accuracy":100,"effects":"Power doubles if the target is paralyzed. If the user has not fainted, the target is cured of paralysis.","summary":"Power doubles if target is paralyzed, and cures it."},
		"naturepower": {"name":"Nature Power","type":"Normal","category":"Status","power":0,"accuracy":true,"effects":"This move calls another move for use based on the battle terrain. Tri Attack on the regular Wi-Fi terrain, Thunderbolt during Electric Terrain, Moonblast during Misty Terrain, Energy Ball during Grassy Terrain, and Psychic during Psychic Terrain.","summary":"Attack depends on terrain (default Tri Attack)."},
		"charge": {"name":"Charge","type":"Electric","category":"Status","power":0,"accuracy":true,"effects":"Raises the user's Special Defense by 1 stage. If the user uses an Electric-type attack on the next turn, its power will be doubled.","summary":"+1 SpD, user's Electric move next turn 2× power."},
		"roleplay": {"name":"Role Play","type":"Psychic","category":"Status","power":0,"accuracy":true,"effects":"User replaces its Ability with the target's.","summary":"User replaces its Ability with the target's."},
		"assist": {"name":"Assist","type":"Normal","category":"Status","power":0,"accuracy":true,"effects":"Uses a random move known by a team member.","summary":"Uses a random move known by a team member."},
		"magiccoat": {"name":"Magic Coat","type":"Psychic","category":"Status","power":0,"accuracy":true,"effects":"Bounces back certain non-damaging moves.","summary":"Bounces back certain non-damaging moves."},
		"revenge": {"name":"Revenge","type":"Fighting","category":"Physical","power":60,"accuracy":100,"effects":"Power doubles if the user was hit by the target this turn.","summary":"Power doubles if user is damaged by the target."},
		"endeavor": {"name":"Endeavor","type":"Normal","category":"Physical","power":0,"accuracy":100,"effects":"Deals damage to the target equal to (target's current HP - user's current HP). The target is unaffected if its current HP is less than or equal to the user's current HP.","summary":"Lowers the target's HP to the user's HP."},
		"eruption": {"name":"Eruption","type":"Fire","category":"Special","power":150,"accuracy":100,"effects":"Power is equal to (user's current HP × 150 / user's maximum HP), rounded down, but not less than 1.","summary":"Less power as user's HP decreases. Hits foe(s)."},
		"refresh": {"name":"Refresh","type":"Normal","category":"Status","power":0,"accuracy":true,"effects":"The user cures its burn, poison, or paralysis. Fails if the user is not burned, poisoned, or paralyzed.","summary":"User cures its burn, poison, or paralysis."},
		"grudge": {"name":"Grudge","type":"Ghost","category":"Status","power":0,"accuracy":true,"effects":"Until the user's next turn, if an opposing Pokemon's attack knocks the user out, that move loses all its remaining PP.","summary":"If the user faints, the attack used loses all its PP."},
		"snatch": {"name":"Snatch","type":"Dark","category":"Status","power":0,"accuracy":true,"effects":"If another Pokemon uses certain non-damaging moves this turn, the user steals that move to use itself. If multiple Pokemon use one of those moves this turn, the applicable moves are all stolen by the first Pokemon in turn order that used this move this turn. This effect is ignored while the user is under the effect of Sky Drop.","summary":"User steals certain support moves to use itself."},
		"secretpower": {"name":"Secret Power","type":"Normal","category":"Physical","power":70,"accuracy":100,"effects":"Has a 30% chance to cause a secondary effect on the target based on the battle terrain. Causes paralysis on the regular Wi-Fi terrain, causes paralysis during Electric Terrain, lowers Special Attack by 1 stage during Misty Terrain, causes sleep during Grassy Terrain and lowers Speed by 1 stage during Psychic Terrain.","summary":"Effect varies with terrain. (30% paralysis chance)"},
		"armthrust": {"name":"Arm Thrust","type":"Fighting","category":"Physical","power":15,"accuracy":100,"effects":"Hits two to five times. Has a 35% chance to hit two or three times and a 15% chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times.","summary":"Hits 2-5 times in one turn."},
		"camouflage": {"name":"Camouflage","type":"Normal","category":"Status","power":0,"accuracy":true,"effects":"The user's type changes based on the battle terrain. Normal type on the regular Wi-Fi terrain, Electric type during Electric Terrain, Fairy type during Misty Terrain, Grass type during Grassy Terrain, and Psychic type during Psychic Terrain. Fails if the user's type cannot be changed or if the user is already purely that type.","summary":"Changes user's type by terrain (default Normal)."},
		"lusterpurge": {"name":"Luster Purge","type":"Psychic","category":"Special","power":70,"accuracy":100,"effects":"Has a 50% chance to lower the target's Special Defense by 1 stage.","summary":"50% chance to lower the target's Sp. Def by 1."},
		"featherdance": {"name":"Feather Dance","type":"Flying","category":"Status","power":0,"accuracy":100,"effects":"Lowers the target's Attack by 2 stages.","summary":"Lowers the target's Attack by 2."},
		"mudsport": {"name":"Mud Sport","type":"Ground","category":"Status","power":0,"accuracy":true,"effects":"For 5 turns, all Electric-type attacks used by any active Pokemon have their power multiplied by 0.33. Fails if this effect is already active.","summary":"For 5 turns, Electric-type attacks have 1/3 power."},
		"iceball": {"name":"Ice Ball","type":"Ice","category":"Physical","power":30,"accuracy":90,"effects":"If this move is successful, the user is locked into this move and cannot make another move until it misses, 5 turns have passed, or the attack cannot be used. Power doubles with each successful hit of this move and doubles again if Defense Curl was used previously by the user. If this move is called by Sleep Talk, the move is used for one turn.","summary":"Power doubles with each hit. Repeats for 5 turns."},
		"needlearm": {"name":"Needle Arm","type":"Grass","category":"Physical","power":60,"accuracy":100,"effects":"Has a 30% chance to make the target flinch.","summary":"30% chance to make the target flinch."},
		"astonish": {"name":"Astonish","type":"Ghost","category":"Physical","power":30,"accuracy":100,"effects":"Has a 30% chance to make the target flinch.","summary":"30% chance to make the target flinch."},
		"aircutter": {"name":"Air Cutter","type":"Flying","category":"Special","power":60,"accuracy":95,"effects":"Has a higher chance for a critical hit.","summary":"High critical hit ratio. Hits adjacent foes."},
		"odorsleuth": {"name":"Odor Sleuth","type":"Normal","category":"Status","power":0,"accuracy":true,"effects":"As long as the target remains active, its evasiveness stat stage is ignored during accuracy checks against it if it is greater than 0, and Normal- and Fighting-type attacks can hit the target if it is a Ghost type. Fails if the target is already affected, or affected by Foresight or Miracle Eye.","summary":"Fighting, Normal hit Ghost. Evasiveness ignored."},
		"silverwind": {"name":"Silver Wind","type":"Bug","category":"Special","power":60,"accuracy":100,"effects":"Has a 10% chance to raise the user's Attack, Defense, Special Attack, Special Defense, and Speed by 1 stage.","summary":"10% chance to raise all stats by 1 (not acc/eva)."},
		"grasswhistle": {"name":"Grass Whistle","type":"Grass","category":"Status","power":0,"accuracy":55,"effects":"Causes the target to fall asleep.","summary":"Causes the target to fall asleep."},
		"tickle": {"name":"Tickle","type":"Normal","category":"Status","power":0,"accuracy":100,"effects":"Lowers the target's Attack and Defense by 1 stage.","summary":"Lowers the target's Attack and Defense by 1."},
		"signalbeam": {"name":"Signal Beam","type":"Bug","category":"Special","power":75,"accuracy":100,"effects":"Has a 10% chance to confuse the target.","summary":"10% chance to confuse the target."},
		"skyuppercut": {"name":"Sky Uppercut","type":"Fighting","category":"Physical","power":85,"accuracy":90,"effects":"This move can hit a target using Bounce, Fly, or Sky Drop, or is under the effect of Sky Drop.","summary":"Can hit Pokemon using Bounce, Fly, or Sky Drop."},
		"sheercold": {"name":"Sheer Cold","type":"Ice","category":"Special","power":0,"accuracy":30,"effects":"Deals damage to the target equal to the target's maximum HP. Ignores accuracy and evasiveness modifiers. This attack's accuracy is equal to (user's level - target's level + X)%, where X is 30 if the user is an Ice type and 20 otherwise, and fails if the target is at a higher level. Ice-type Pokemon and Pokemon with the Sturdy Ability are immune.","summary":"OHKOs non-Ice targets. Fails if user's lower level."},
		"block": {"name":"Block","type":"Normal","category":"Status","power":0,"accuracy":true,"effects":"Prevents the target from switching out. The target can still switch out if it is holding Shed Shell or uses Baton Pass, Flip Turn, Parting Shot, Teleport, U-turn, or Volt Switch. The effect ends if either the user or the target leaves the field.","summary":"Prevents the target from switching out."},
		"frenzyplant": {"name":"Frenzy Plant","type":"Grass","category":"Special","power":150,"accuracy":90,"effects":"If this move is successful, the user must recharge on the following turn and cannot select a move.","summary":"User cannot move next turn."},
		"poisontail": {"name":"Poison Tail","type":"Poison","category":"Physical","power":50,"accuracy":100,"effects":"Has a 10% chance to poison the target and a higher chance for a critical hit.","summary":"High critical hit ratio. 10% chance to poison."},
		"covet": {"name":"Covet","type":"Normal","category":"Physical","power":60,"accuracy":100,"effects":"If the user has no item, it steals the target's.","summary":"If the user has no item, it steals the target's."},
		"volttackle": {"name":"Volt Tackle","type":"Electric","category":"Physical","power":120,"accuracy":100,"effects":"Has a 10% chance to paralyze the target. If the target lost HP, the user takes recoil damage equal to 33% the HP lost by the target, rounded half up, but not less than 1 HP.","summary":"Has 33% recoil. 10% chance to paralyze target."},
		"magicalleaf": {"name":"Magical Leaf","type":"Grass","category":"Special","power":60,"accuracy":true,"effects":"This move does not check accuracy.","summary":"This move does not check accuracy."},
		"watersport": {"name":"Water Sport","type":"Water","category":"Status","power":0,"accuracy":true,"effects":"For 5 turns, all Fire-type attacks used by any active Pokemon have their power multiplied by 0.33. Fails if this effect is already active.","summary":"For 5 turns, Fire-type attacks have 1/3 power."},
		"shockwave": {"name":"Shock Wave","type":"Electric","category":"Special","power":60,"accuracy":true,"effects":"This move does not check accuracy.","summary":"This move does not check accuracy."},
		"doomdesire": {"name":"Doom Desire","type":"Steel","category":"Special","power":140,"accuracy":100,"effects":"Hits two turns after being used.","summary":"Hits two turns after being used."},
		"psychoboost": {"name":"Psycho Boost","type":"Psychic","category":"Special","power":140,"accuracy":90,"effects":"Lowers the user's Special Attack by 2 stages.","summary":"Lowers the user's Sp. Atk by 2."},
		"miracleeye": {"name":"Miracle Eye","type":"Psychic","category":"Status","power":0,"accuracy":true,"effects":"As long as the target remains active, its evasiveness stat stage is ignored during accuracy checks against it if it is greater than 0, and Psychic-type attacks can hit the target if it is a Dark type. Fails if the target is already affected, or affected by Foresight or Odor Sleuth.","summary":"Psychic hits Dark. Evasiveness ignored."},
		"wakeupslap": {"name":"Wake-Up Slap","type":"Fighting","category":"Physical","power":70,"accuracy":100,"effects":"Power doubles if the target is asleep. If the user has not fainted, the target wakes up.","summary":"Power doubles if target is asleep, and wakes it."},
		"brine": {"name":"Brine","type":"Water","category":"Special","power":65,"accuracy":100,"effects":"Power doubles if the target has less than or equal to half of its maximum HP remaining.","summary":"Power doubles if the target's HP is 50% or less."},
		"naturalgift": {"name":"Natural Gift","type":"Normal","category":"Physical","power":0,"accuracy":100,"effects":"The type and power of this move depend on the user's held Berry, and the Berry is lost. Fails if the user is not holding a Berry, if the user has the Klutz Ability, or if Embargo or Magic Room is in effect for the user.","summary":"Power and type depends on the user's Berry."},
		"acupressure": {"name":"Acupressure","type":"Normal","category":"Status","power":0,"accuracy":true,"effects":"Raises a random stat by 2 stages as long as the stat is not already at stage 6. The user can choose to use this move on itself or an adjacent ally. Fails if no stat stage can be raised or if used on an ally with a substitute.","summary":"Raises a random stat of the user or an ally by 2."},
		"metalburst": {"name":"Metal Burst","type":"Steel","category":"Physical","power":0,"accuracy":100,"effects":"If hit by an attack, returns 1.5× damage.","summary":"If hit by an attack, returns 1.5× damage."},
		"embargo": {"name":"Embargo","type":"Dark","category":"Status","power":0,"accuracy":100,"effects":"For 5 turns, the target's held item has no effect. An item's effect of causing forme changes is unaffected, but any other effects from such items are negated. During the effect, Fling and Natural Gift are prevented from being used by the target. Items thrown at the target with Fling will still activate for it. If the target uses Baton Pass, the replacement will remain unable to use items.","summary":"For 5 turns, the target's item has no effect."},
		"fling": {"name":"Fling","type":"Dark","category":"Physical","power":0,"accuracy":100,"effects":"Flings the user's item at the target. Power varies.","summary":"Flings the user's item at the target. Power varies."},
		"trumpcard": {"name":"Trump Card","type":"Normal","category":"Special","power":0,"accuracy":true,"effects":"The power of this move is based on the amount of PP remaining after normal PP reduction and the Pressure Ability resolve. 200 power for 0 PP, 80 power for 1 PP, 60 power for 2 PP, 50 power for 3 PP, and 40 power for 4 or more PP.","summary":"More power the fewer PP this move has left."},
		"healblock": {"name":"Heal Block","type":"Psychic","category":"Status","power":0,"accuracy":100,"effects":"For 5 turns, the target is prevented from restoring any HP as long as it remains active. During the effect, healing and draining moves are unusable, and Abilities and items that grant healing will not heal the user. If an affected Pokemon uses Baton Pass, the replacement will remain unable to restore its HP. Pain Split and the Regenerator Ability are unaffected.","summary":"For 5 turns, the foe(s) is prevented from healing."},
		"wringout": {"name":"Wring Out","type":"Normal","category":"Special","power":0,"accuracy":100,"effects":"Power is equal to 120 × (target's current HP / target's maximum HP), rounded half down, but not less than 1.","summary":"More power the more HP the target has left."},
		"powertrick": {"name":"Power Trick","type":"Psychic","category":"Status","power":0,"accuracy":true,"effects":"Switches user's Attack and Defense stats.","summary":"Switches user's Attack and Defense stats."},
		"gastroacid": {"name":"Gastro Acid","type":"Poison","category":"Status","power":0,"accuracy":100,"effects":"Nullifies the target's Ability.","summary":"Nullifies the target's Ability."},
		"luckychant": {"name":"Lucky Chant","type":"Normal","category":"Status","power":0,"accuracy":true,"effects":"For 5 turns, the user and its party members cannot be struck by a critical hit. Fails if the effect is already active on the user's side.","summary":"For 5 turns, shields user's party from critical hits."},
		"mefirst": {"name":"Me First","type":"Normal","category":"Status","power":0,"accuracy":true,"effects":"The user uses the move the target chose for use this turn against it, if possible, with its power multiplied by 1.5. The move must be a damaging move other than Beak Blast, Belch, Chatter, Counter, Covet, Focus Punch, Me First, Metal Burst, Mirror Coat, Shell Trap, Struggle, or Thief. Fails if the target moves before the user. Ignores the target's substitute for the purpose of copying the move.","summary":"Copies a foe at 1.5× power. User must be faster."},
		"powerswap": {"name":"Power Swap","type":"Psychic","category":"Status","power":0,"accuracy":true,"effects":"The user swaps its Attack and Special Attack stat stage changes with the target.","summary":"Swaps Attack and Sp. Atk stat stages with target."},
		"guardswap": {"name":"Guard Swap","type":"Psychic","category":"Status","power":0,"accuracy":true,"effects":"The user swaps its Defense and Special Defense stat stage changes with the target.","summary":"Swaps Defense and Sp. Def changes with target."},
		"punishment": {"name":"Punishment","type":"Dark","category":"Physical","power":0,"accuracy":100,"effects":"Power is equal to 60+(X × 20), where X is the target's total stat stage changes that are greater than 0, but not more than 200 power.","summary":"60 power +20 for each of the target's stat boosts."},
		"lastresort": {"name":"Last Resort","type":"Normal","category":"Physical","power":140,"accuracy":100,"effects":"This move fails unless the user knows this move and at least one other move, and has used all the other moves it knows at least once each since it became active or Transformed.","summary":"Fails unless each known move has been used."},
		"worryseed": {"name":"Worry Seed","type":"Grass","category":"Status","power":0,"accuracy":100,"effects":"Causes the target's Ability to become Insomnia. Fails if the target's Ability is As One, Battle Bond, Comatose, Disguise, Gulp Missile, Ice Face, Insomnia, Multitype, Power Construct, RKS System, Schooling, Shields Down, Stance Change, Truant, or Zen Mode.","summary":"The target's Ability becomes Insomnia."},
		"heartswap": {"name":"Heart Swap","type":"Psychic","category":"Status","power":0,"accuracy":true,"effects":"The user swaps all its stat stage changes with the target.","summary":"Swaps all stat changes with target."},
		"magnetrise": {"name":"Magnet Rise","type":"Electric","category":"Status","power":0,"accuracy":true,"effects":"For 5 turns, the user has immunity to Ground.","summary":"For 5 turns, the user has immunity to Ground."},
		"forcepalm": {"name":"Force Palm","type":"Fighting","category":"Physical","power":60,"accuracy":100,"effects":"Has a 30% chance to paralyze the target.","summary":"30% chance to paralyze the target."},
		"gigaimpact": {"name":"Giga Impact","type":"Normal","category":"Physical","power":150,"accuracy":90,"effects":"If this move is successful, the user must recharge on the following turn and cannot select a move.","summary":"User cannot move next turn."},
		"avalanche": {"name":"Avalanche","type":"Ice","category":"Physical","power":60,"accuracy":100,"effects":"Power doubles if the user was hit by the target this turn.","summary":"Power doubles if user is damaged by the target."},
		"mudbomb": {"name":"Mud Bomb","type":"Ground","category":"Special","power":65,"accuracy":85,"effects":"Has a 30% chance to lower the target's accuracy by 1 stage.","summary":"30% chance to lower the target's accuracy by 1."},
		"mirrorshot": {"name":"Mirror Shot","type":"Steel","category":"Special","power":65,"accuracy":85,"effects":"Has a 30% chance to lower the target's accuracy by 1 stage.","summary":"30% chance to lower the target's accuracy by 1."},
		"rockclimb": {"name":"Rock Climb","type":"Normal","category":"Physical","power":90,"accuracy":85,"effects":"Has a 20% chance to confuse the target.","summary":"20% chance to confuse the target."},
		"defog": {"name":"Defog","type":"Flying","category":"Status","power":0,"accuracy":true,"effects":"Lowers the target's evasiveness by one stage. Clears entry hazards from both sides and removes terrain. Clears Reflect, Light Screen, Aurora Veil, Mist, and Safeguard from the target's side.","summary":"Lowers evasiveness and clears hazards, the target's screens, and terrain."},
		"lavaplume": {"name":"Lava Plume","type":"Fire","category":"Special","power":80,"accuracy":100,"effects":"Has a 30% chance to burn the target.","summary":"30% chance to burn adjacent Pokemon."},
		"rockwrecker": {"name":"Rock Wrecker","type":"Rock","category":"Physical","power":150,"accuracy":90,"effects":"If this move is successful, the user must recharge on the following turn and cannot select a move.","summary":"User cannot move next turn."},
		"magnetbomb": {"name":"Magnet Bomb","type":"Steel","category":"Physical","power":60,"accuracy":true,"effects":"This move does not check accuracy.","summary":"This move does not check accuracy."},
		"captivate": {"name":"Captivate","type":"Normal","category":"Status","power":0,"accuracy":100,"effects":"Lowers the target's Special Attack by 2 stages. The target is unaffected if both the user and the target are the same gender, or if either is genderless. Pokemon with the Oblivious Ability are immune.","summary":"Lowers the foe(s) Sp. Atk by 2 if opposite gender."},
		"chatter": {"name":"Chatter","type":"Flying","category":"Special","power":65,"accuracy":100,"effects":"Has a 100% chance to confuse the target.","summary":"100% chance to confuse the target."},
		"judgment": {"name":"Judgment","type":"Normal","category":"Special","power":100,"accuracy":100,"effects":"This move's type depends on the user's held Plate.","summary":"Type varies based on the held Plate."},
		"lunardance": {"name":"Lunar Dance","type":"Psychic","category":"Status","power":0,"accuracy":true,"effects":"User faints. Next hurt Pkmn is cured, max HP/PP.","summary":"User faints. Next hurt Pkmn is cured, max HP/PP."},
		"darkvoid": {"name":"Dark Void","type":"Dark","category":"Status","power":0,"accuracy":50,"effects":"Causes the target to fall asleep. This move cannot be used successfully unless the user's current form, while considering Transform, is Darkrai.","summary":"Darkrai: Causes the foe(s) to fall asleep."},
		"seedflare": {"name":"Seed Flare","type":"Grass","category":"Special","power":120,"accuracy":85,"effects":"Has a 40% chance to lower the target's Special Defense by 2 stages.","summary":"40% chance to lower the target's Sp. Def by 2."},
		"ominouswind": {"name":"Ominous Wind","type":"Ghost","category":"Special","power":60,"accuracy":100,"effects":"Has a 10% chance to raise the user's Attack, Defense, Special Attack, Special Defense, and Speed by 1 stage.","summary":"10% chance to raise all stats by 1 (not acc/eva)."},
		"wonderroom": {"name":"Wonder Room","type":"Psychic","category":"Status","power":0,"accuracy":true,"effects":"For 5 turns, all active Pokemon have their Defense and Special Defense stats swapped. Stat stage changes are unaffected. If this move is used during the effect, the effect ends.","summary":"For 5 turns, all Defense and Sp. Def stats switch."},
		"ragepowder": {"name":"Rage Powder","type":"Bug","category":"Status","power":0,"accuracy":true,"effects":"Until the end of the turn, all single-target attacks from the opposing side are redirected to the user. Such attacks are redirected to the user before they can be reflected by Magic Coat or the Magic Bounce Ability, or drawn in by the Lightning Rod or Storm Drain Abilities. Fails if it is not a Double Battle or Battle Royal. This effect is ignored while the user is under the effect of Sky Drop.","summary":"The foes' moves target the user on the turn used."},
		"telekinesis": {"name":"Telekinesis","type":"Psychic","category":"Status","power":0,"accuracy":true,"effects":"For 3 turns, target floats but moves can't miss it.","summary":"For 3 turns, target floats but moves can't miss it."},
		"magicroom": {"name":"Magic Room","type":"Psychic","category":"Status","power":0,"accuracy":true,"effects":"For 5 turns, the held items of all active Pokemon have no effect. An item's effect of causing forme changes is unaffected, but any other effects from such items are negated. During the effect, Fling and Natural Gift are prevented from being used by all active Pokemon. If this move is used during the effect, the effect ends.","summary":"For 5 turns, all held items have no effect."},
		"stormthrow": {"name":"Storm Throw","type":"Fighting","category":"Physical","power":60,"accuracy":100,"effects":"This move is always a critical hit unless the target is under the effect of Lucky Chant or has the Battle Armor or Shell Armor Abilities.","summary":"Always results in a critical hit."},
		"flameburst": {"name":"Flame Burst","type":"Fire","category":"Special","power":70,"accuracy":100,"effects":"If this move is successful, the target's ally loses 1/16 of its maximum HP, rounded down, unless it has the Magic Guard Ability.","summary":"Damages Pokemon next to the target as well."},
		"synchronoise": {"name":"Synchronoise","type":"Psychic","category":"Special","power":120,"accuracy":100,"effects":"The target is immune if it does not share a type with the user.","summary":"Hits adjacent Pokemon sharing the user's type."},
		"echoedvoice": {"name":"Echoed Voice","type":"Normal","category":"Special","power":40,"accuracy":100,"effects":"For every consecutive turn that this move is used by at least one Pokemon, this move's power is multiplied by the number of turns to pass, but not more than 5.","summary":"Power increases when used on consecutive turns."},
		"chipaway": {"name":"Chip Away","type":"Normal","category":"Physical","power":70,"accuracy":100,"effects":"Ignores the target's stat stage changes, including evasiveness.","summary":"Ignores the target's stat stage changes."},
		"skydrop": {"name":"Sky Drop","type":"Flying","category":"Physical","power":60,"accuracy":100,"effects":"User and foe fly up turn 1. Damages on turn 2.","summary":"User and foe fly up turn 1. Damages on turn 2."},
		"reflecttype": {"name":"Reflect Type","type":"Normal","category":"Status","power":0,"accuracy":true,"effects":"Causes the user's types to become the same as the current types of the target. If the target's current types include typeless and a non-added type, typeless is ignored. If the target's current types include typeless and an added type from Forest's Curse or Trick-or-Treat, typeless is copied as the Normal type instead. Fails if the user is an Arceus or a Silvally, or if the target's current type is typeless alone.","summary":"User becomes the same type as the target."},
		"finalgambit": {"name":"Final Gambit","type":"Fighting","category":"Special","power":0,"accuracy":100,"effects":"Deals damage to the target equal to the user's current HP. If this move is successful, the user faints.","summary":"Does damage equal to the user's HP. User faints."},
		"bestow": {"name":"Bestow","type":"Normal","category":"Status","power":0,"accuracy":true,"effects":"User passes its held item to the target.","summary":"User passes its held item to the target."},
		"inferno": {"name":"Inferno","type":"Fire","category":"Special","power":100,"accuracy":50,"effects":"Has a 100% chance to burn the target.","summary":"100% chance to burn the target."},
		"waterpledge": {"name":"Water Pledge","type":"Water","category":"Special","power":80,"accuracy":100,"effects":"Use with Grass or Fire Pledge for added effect.","summary":"Use with Grass or Fire Pledge for added effect."},
		"firepledge": {"name":"Fire Pledge","type":"Fire","category":"Special","power":80,"accuracy":100,"effects":"Use with Grass or Water Pledge for added effect.","summary":"Use with Grass or Water Pledge for added effect."},
		"grasspledge": {"name":"Grass Pledge","type":"Grass","category":"Special","power":80,"accuracy":100,"effects":"Use with Fire or Water Pledge for added effect.","summary":"Use with Fire or Water Pledge for added effect."},
		"workup": {"name":"Work Up","type":"Normal","category":"Status","power":0,"accuracy":true,"effects":"Raises the user's Attack and Special Attack by 1 stage.","summary":"Raises the user's Attack and Sp. Atk by 1."},
		"dualchop": {"name":"Dual Chop","type":"Dragon","category":"Physical","power":40,"accuracy":90,"effects":"Hits twice. If the first hit breaks the target's substitute, it will take damage for the second hit.","summary":"Hits 2 times in one turn."},
		"heartstamp": {"name":"Heart Stamp","type":"Psychic","category":"Physical","power":60,"accuracy":100,"effects":"Has a 30% chance to make the target flinch.","summary":"30% chance to make the target flinch."},
		"steamroller": {"name":"Steamroller","type":"Bug","category":"Physical","power":65,"accuracy":100,"effects":"Has a 30% chance to make the target flinch. Damage doubles and no accuracy check is done if the target has used Minimize while active.","summary":"30% chance to make the target flinch."},
		"psystrike": {"name":"Psystrike","type":"Psychic","category":"Special","power":100,"accuracy":100,"effects":"Deals damage to the target based on its Defense instead of Special Defense.","summary":"Damages target based on Defense, not Sp. Def."},
		"headcharge": {"name":"Head Charge","type":"Normal","category":"Physical","power":120,"accuracy":100,"effects":"If the target lost HP, the user takes recoil damage equal to 1/4 the HP lost by the target, rounded half up, but not less than 1 HP.","summary":"Has 1/4 recoil."},
		"searingshot": {"name":"Searing Shot","type":"Fire","category":"Special","power":100,"accuracy":100,"effects":"Has a 30% chance to burn the target.","summary":"30% chance to burn adjacent Pokemon."},
		"relicsong": {"name":"Relic Song","type":"Normal","category":"Special","power":75,"accuracy":100,"effects":"Has a 10% chance to cause the target to fall asleep. If this move is successful on at least one target and the user is a Meloetta, it changes to Pirouette Forme if it is currently in Aria Forme, or changes to Aria Forme if it is currently in Pirouette Forme. This forme change does not happen if the Meloetta has the Sheer Force Ability. The Pirouette Forme reverts to Aria Forme when Meloetta is not active.","summary":"10% chance to sleep foe(s). Meloetta transforms."},
		"secretsword": {"name":"Secret Sword","type":"Fighting","category":"Special","power":85,"accuracy":100,"effects":"Deals damage to the target based on its Defense instead of Special Defense.","summary":"Damages target based on Defense, not Sp. Def."},
		"glaciate": {"name":"Glaciate","type":"Ice","category":"Special","power":65,"accuracy":95,"effects":"Has a 100% chance to lower the target's Speed by 1 stage.","summary":"100% chance to lower the foe(s) Speed by 1."},
		"blueflare": {"name":"Blue Flare","type":"Fire","category":"Special","power":130,"accuracy":85,"effects":"Has a 20% chance to burn the target.","summary":"20% chance to burn the target."},
		"freezeshock": {"name":"Freeze Shock","type":"Ice","category":"Physical","power":140,"accuracy":90,"effects":"Has a 30% chance to paralyze the target. This attack charges on the first turn and executes on the second. If the user is holding a Power Herb, the move completes in one turn.","summary":"Charges turn 1. Hits turn 2. 30% paralyze."},
		"iceburn": {"name":"Ice Burn","type":"Ice","category":"Special","power":140,"accuracy":90,"effects":"Has a 30% chance to burn the target. This attack charges on the first turn and executes on the second. If the user is holding a Power Herb, the move completes in one turn.","summary":"Charges turn 1. Hits turn 2. 30% burn."},
		"fusionflare": {"name":"Fusion Flare","type":"Fire","category":"Special","power":100,"accuracy":100,"effects":"Power doubles if the last move used by any Pokemon this turn was Fusion Bolt.","summary":"Power doubles if used after Fusion Bolt this turn."},
		"fusionbolt": {"name":"Fusion Bolt","type":"Electric","category":"Physical","power":100,"accuracy":100,"effects":"Power doubles if the last move used by any Pokemon this turn was Fusion Flare.","summary":"Power doubles if used after Fusion Flare this turn."},
		"flyingpress": {"name":"Flying Press","type":"Fighting","category":"Physical","power":100,"accuracy":95,"effects":"This move combines Flying in its type effectiveness against the target. Damage doubles and no accuracy check is done if the target has used Minimize while active.","summary":"Combines Flying in its type effectiveness."},
		"matblock": {"name":"Mat Block","type":"Fighting","category":"Status","power":0,"accuracy":true,"effects":"The user and its party members are protected from damaging attacks made by other Pokemon, including allies, during this turn. Fails unless it is the user's first turn on the field, if the user moves last this turn, or if this move is already in effect for the user's side.","summary":"Protects allies from damaging attacks. Turn 1 only."},
		"belch": {"name":"Belch","type":"Poison","category":"Special","power":120,"accuracy":90,"effects":"Cannot be selected until the user eats a Berry.","summary":"Cannot be selected until the user eats a Berry."},
		"rototiller": {"name":"Rototiller","type":"Ground","category":"Status","power":0,"accuracy":true,"effects":"Raises the Attack and Special Attack of all grounded Grass-type Pokemon on the field by 1 stage.","summary":"Raises Atk/Sp. Atk of grounded Grass types by 1."},
		"fellstinger": {"name":"Fell Stinger","type":"Bug","category":"Physical","power":50,"accuracy":100,"effects":"Raises the user's Attack by 3 stages if this move knocks out the target.","summary":"Raises user's Attack by 3 if this KOes the target."},
		"trickortreat": {"name":"Trick-or-Treat","type":"Ghost","category":"Status","power":0,"accuracy":100,"effects":"Causes the Ghost type to be added to the target, effectively making it have two or three types. Fails if the target is already a Ghost type. If Forest's Curse adds a type to the target, it replaces the type added by this move and vice versa.","summary":"Adds Ghost to the target's type(s)."},
		"iondeluge": {"name":"Ion Deluge","type":"Electric","category":"Status","power":0,"accuracy":true,"effects":"Causes Normal-type moves to become Electric type this turn. The effect happens after other effects that change a move's type.","summary":"Normal moves become Electric type this turn."},
		"forestscurse": {"name":"Forest's Curse","type":"Grass","category":"Status","power":0,"accuracy":100,"effects":"Causes the Grass type to be added to the target, effectively making it have two or three types. Fails if the target is already a Grass type. If Trick-or-Treat adds a type to the target, it replaces the type added by this move and vice versa.","summary":"Adds Grass to the target's type(s)."},
		"petalblizzard": {"name":"Petal Blizzard","type":"Grass","category":"Physical","power":90,"accuracy":100,"effects":"No additional effect. Hits adjacent Pokemon.","summary":"No additional effect. Hits adjacent Pokemon."},
		"disarmingvoice": {"name":"Disarming Voice","type":"Fairy","category":"Special","power":40,"accuracy":true,"effects":"This move does not check accuracy.","summary":"This move does not check accuracy. Hits foes."},
		"craftyshield": {"name":"Crafty Shield","type":"Fairy","category":"Status","power":0,"accuracy":true,"effects":"The user and its party members are protected from non-damaging attacks made by other Pokemon, including allies, during this turn. Fails if the user moves last this turn or if this move is already in effect for the user's side.","summary":"Protects allies from Status moves this turn."},
		"flowershield": {"name":"Flower Shield","type":"Fairy","category":"Status","power":0,"accuracy":true,"effects":"Raises the Defense of all active Grass-type Pokemon by 1 stage. Fails if there are no active Grass-type Pokemon.","summary":"Raises Defense by 1 of all active Grass types."},
		"mistyterrain": {"name":"Misty Terrain","type":"Fairy","category":"Status","power":0,"accuracy":true,"effects":"For five turns, grounded Pokémon are protected from status conditions and confusion. Dragon moves deal half damage to grounded targets.","summary":"Protects grounded Pokémon from status and weakens Dragon moves."},
		"electrify": {"name":"Electrify","type":"Electric","category":"Status","power":0,"accuracy":true,"effects":"Causes the target's move to become Electric type this turn. Among effects that can change a move's type, this effect happens last. Fails if the target already moved this turn.","summary":"Changes the target's move to Electric this turn."},
		"fairywind": {"name":"Fairy Wind","type":"Fairy","category":"Special","power":40,"accuracy":100,"effects":"No additional effect.","summary":"No additional effect."},
		"fairylock": {"name":"Fairy Lock","type":"Fairy","category":"Status","power":0,"accuracy":true,"effects":"Prevents all active Pokemon from switching next turn. A Pokemon can still switch out if it is holding Shed Shell or uses Baton Pass, Flip Turn, Parting Shot, Teleport, U-turn, or Volt Switch. Fails if the effect is already active.","summary":"Prevents all Pokemon from switching next turn."},
		"playnice": {"name":"Play Nice","type":"Normal","category":"Status","power":0,"accuracy":true,"effects":"Lowers the target's Attack by 1 stage.","summary":"Lowers the target's Attack by 1."},
		"confide": {"name":"Confide","type":"Normal","category":"Status","power":0,"accuracy":true,"effects":"Lowers the target's Special Attack by 1 stage.","summary":"Lowers the target's Sp. Atk by 1."},
		"hyperspacehole": {"name":"Hyperspace Hole","type":"Psychic","category":"Special","power":80,"accuracy":true,"effects":"If this move is successful, it breaks through the target's Baneful Bunker, Detect, King's Shield, Protect, or Spiky Shield for this turn, allowing other Pokemon to attack the target normally. If the target's side is protected by Crafty Shield, Mat Block, Quick Guard, or Wide Guard, that protection is also broken for this turn and other Pokemon may attack the target's side normally.","summary":"Breaks the target's protection for this turn."},
		"watershuriken": {"name":"Water Shuriken","type":"Water","category":"Special","power":15,"accuracy":100,"effects":"Hits two to five times. Has a 35% chance to hit two or three times and a 15% chance to hit four or five times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times.","summary":"Usually goes first. Hits 2-5 times in one turn."},
		"spikyshield": {"name":"Spiky Shield","type":"Grass","category":"Status","power":0,"accuracy":true,"effects":"Protects from moves. Contact: loses 1/8 max HP.","summary":"Protects from moves. Contact: loses 1/8 max HP."},
		"aromaticmist": {"name":"Aromatic Mist","type":"Fairy","category":"Status","power":0,"accuracy":true,"effects":"Raises the target's Special Defense by 1 stage. Fails if there is no ally adjacent to the user.","summary":"Raises an ally's Sp. Def by 1."},
		"venomdrench": {"name":"Venom Drench","type":"Poison","category":"Status","power":0,"accuracy":100,"effects":"Lowers the target's Attack, Special Attack, and Speed by 1 stage if the target is poisoned. Fails if the target is not poisoned.","summary":"Lowers Atk/Sp. Atk/Speed of poisoned foes by 1."},
		"powder": {"name":"Powder","type":"Bug","category":"Status","power":0,"accuracy":100,"effects":"If the target uses a Fire-type move this turn, it is prevented from executing and the target loses 1/4 of its maximum HP, rounded half up. This effect does not happen if the Fire-type move is prevented by Primordial Sea.","summary":"If using a Fire move, target loses 1/4 max HP."},
		"happyhour": {"name":"Happy Hour","type":"Normal","category":"Status","power":0,"accuracy":true,"effects":"No competitive use.","summary":"No competitive use."},
		"celebrate": {"name":"Celebrate","type":"Normal","category":"Status","power":0,"accuracy":true,"effects":"No competitive use.","summary":"No competitive use."},
		"holdhands": {"name":"Hold Hands","type":"Normal","category":"Status","power":0,"accuracy":true,"effects":"No competitive use. Fails if there is no ally adjacent to the user.","summary":"No competitive use."},
		"holdback": {"name":"Hold Back","type":"Normal","category":"Physical","power":40,"accuracy":100,"effects":"Leaves the target with at least 1 HP.","summary":"Always leaves the target with at least 1 HP."},
		"thousandwaves": {"name":"Thousand Waves","type":"Ground","category":"Physical","power":90,"accuracy":100,"effects":"Prevents the target from switching out. The target can still switch out if it is holding Shed Shell or uses Baton Pass, Flip Turn, Parting Shot, Teleport, U-turn, or Volt Switch. The effect ends if either the user or the target leaves the field.","summary":"Hits adjacent foes. Prevents them from switching."},
		"landswrath": {"name":"Land's Wrath","type":"Ground","category":"Physical","power":90,"accuracy":100,"effects":"No additional effect. Hits adjacent foes.","summary":"No additional effect. Hits adjacent foes."},
		"lightofruin": {"name":"Light of Ruin","type":"Fairy","category":"Special","power":140,"accuracy":90,"effects":"If the target lost HP, the user takes recoil damage equal to 1/2 the HP lost by the target, rounded half up, but not less than 1 HP.","summary":"Has 1/2 recoil."},
		"hyperspacefury": {"name":"Hyperspace Fury","type":"Dark","category":"Physical","power":100,"accuracy":true,"effects":"Hoopa-U: Lowers user's Def by 1; breaks protect.","summary":"Hoopa-U: Lowers user's Def by 1; breaks protect."},
		"breakneckblitz": {"name":"Breakneck Blitz","type":"Normal","category":"Physical","power":1,"accuracy":true,"effects":"Power is equal to the base move's Z-Power.","summary":"Power is equal to the base move's Z-Power."},
		"alloutpummeling": {"name":"All-Out Pummeling","type":"Fighting","category":"Physical","power":1,"accuracy":true,"effects":"Power is equal to the base move's Z-Power.","summary":"Power is equal to the base move's Z-Power."},
		"supersonicskystrike": {"name":"Supersonic Skystrike","type":"Flying","category":"Physical","power":1,"accuracy":true,"effects":"Power is equal to the base move's Z-Power.","summary":"Power is equal to the base move's Z-Power."},
		"aciddownpour": {"name":"Acid Downpour","type":"Poison","category":"Physical","power":1,"accuracy":true,"effects":"Power is equal to the base move's Z-Power.","summary":"Power is equal to the base move's Z-Power."},
		"tectonicrage": {"name":"Tectonic Rage","type":"Ground","category":"Physical","power":1,"accuracy":true,"effects":"Power is equal to the base move's Z-Power.","summary":"Power is equal to the base move's Z-Power."},
		"continentalcrush": {"name":"Continental Crush","type":"Rock","category":"Physical","power":1,"accuracy":true,"effects":"Power is equal to the base move's Z-Power.","summary":"Power is equal to the base move's Z-Power."},
		"savagespinout": {"name":"Savage Spin-Out","type":"Bug","category":"Physical","power":1,"accuracy":true,"effects":"Power is equal to the base move's Z-Power.","summary":"Power is equal to the base move's Z-Power."},
		"neverendingnightmare": {"name":"Never-Ending Nightmare","type":"Ghost","category":"Physical","power":1,"accuracy":true,"effects":"Power is equal to the base move's Z-Power.","summary":"Power is equal to the base move's Z-Power."},
		"corkscrewcrash": {"name":"Corkscrew Crash","type":"Steel","category":"Physical","power":1,"accuracy":true,"effects":"Power is equal to the base move's Z-Power.","summary":"Power is equal to the base move's Z-Power."},
		"infernooverdrive": {"name":"Inferno Overdrive","type":"Fire","category":"Physical","power":1,"accuracy":true,"effects":"Power is equal to the base move's Z-Power.","summary":"Power is equal to the base move's Z-Power."},
		"hydrovortex": {"name":"Hydro Vortex","type":"Water","category":"Physical","power":1,"accuracy":true,"effects":"Power is equal to the base move's Z-Power.","summary":"Power is equal to the base move's Z-Power."},
		"bloomdoom": {"name":"Bloom Doom","type":"Grass","category":"Physical","power":1,"accuracy":true,"effects":"Power is equal to the base move's Z-Power.","summary":"Power is equal to the base move's Z-Power."},
		"gigavolthavoc": {"name":"Gigavolt Havoc","type":"Electric","category":"Physical","power":1,"accuracy":true,"effects":"Power is equal to the base move's Z-Power.","summary":"Power is equal to the base move's Z-Power."},
		"shatteredpsyche": {"name":"Shattered Psyche","type":"Psychic","category":"Physical","power":1,"accuracy":true,"effects":"Power is equal to the base move's Z-Power.","summary":"Power is equal to the base move's Z-Power."},
		"subzeroslammer": {"name":"Subzero Slammer","type":"Ice","category":"Physical","power":1,"accuracy":true,"effects":"Power is equal to the base move's Z-Power.","summary":"Power is equal to the base move's Z-Power."},
		"devastatingdrake": {"name":"Devastating Drake","type":"Dragon","category":"Physical","power":1,"accuracy":true,"effects":"Power is equal to the base move's Z-Power.","summary":"Power is equal to the base move's Z-Power."},
		"blackholeeclipse": {"name":"Black Hole Eclipse","type":"Dark","category":"Physical","power":1,"accuracy":true,"effects":"Power is equal to the base move's Z-Power.","summary":"Power is equal to the base move's Z-Power."},
		"twinkletackle": {"name":"Twinkle Tackle","type":"Fairy","category":"Physical","power":1,"accuracy":true,"effects":"Power is equal to the base move's Z-Power.","summary":"Power is equal to the base move's Z-Power."},
		"catastropika": {"name":"Catastropika","type":"Electric","category":"Physical","power":210,"accuracy":true,"effects":"No additional effect.","summary":"No additional effect."},
		"spiritshackle": {"name":"Spirit Shackle","type":"Ghost","category":"Physical","power":80,"accuracy":100,"effects":"Prevents the target from switching out. The target can still switch out if it is holding Shed Shell or uses Baton Pass, Flip Turn, Parting Shot, Teleport, U-turn, or Volt Switch. The effect ends if either the user or the target leaves the field.","summary":"Prevents the target from switching out."},
		"icehammer": {"name":"Ice Hammer","type":"Ice","category":"Physical","power":100,"accuracy":90,"effects":"Lowers the user's Speed by 1 stage.","summary":"Lowers the user's Speed by 1."},
		"spotlight": {"name":"Spotlight","type":"Normal","category":"Status","power":0,"accuracy":true,"effects":"Until the end of the turn, all single-target attacks from opponents of the target are redirected to the target. Such attacks are redirected to the target before they can be reflected by Magic Coat or the Magic Bounce Ability, or drawn in by the Lightning Rod or Storm Drain Abilities. Fails if it is not a Double Battle or Battle Royal.","summary":"Target's foes' moves are redirected to it this turn."},
		"toxicthread": {"name":"Toxic Thread","type":"Poison","category":"Status","power":0,"accuracy":100,"effects":"Lowers the target's Speed by 1 stage and poisons it.","summary":"Lowers the target's Speed by 1 and poisons it."},
		"gearup": {"name":"Gear Up","type":"Steel","category":"Status","power":0,"accuracy":true,"effects":"Raises the Attack and Special Attack of Pokemon on the user's side with the Plus or Minus Abilities by 1 stage.","summary":"Raises Atk, Sp. Atk of allies with Plus/Minus by 1."},
		"psychicterrain": {"name":"Psychic Terrain","type":"Psychic","category":"Status","power":0,"accuracy":true,"effects":"For five turns, grounded Pokémon's Psychic moves are 30% stronger. Opposing priority moves cannot hit grounded Pokémon.","summary":"Boosts Psychic moves and blocks opposing priority moves for grounded Pokémon."},
		"powertrip": {"name":"Power Trip","type":"Dark","category":"Physical","power":20,"accuracy":100,"effects":"Power is equal to 20+(X × 20), where X is the user's total stat stage changes that are greater than 0.","summary":" + 20 power for each of the user's stat boosts."},
		"burnup": {"name":"Burn Up","type":"Fire","category":"Special","power":130,"accuracy":100,"effects":"Fails unless the user is a Fire type. If this move is successful, the user's Fire type becomes typeless as long as it remains active.","summary":"User's Fire type becomes typeless; must be Fire."},
		"purify": {"name":"Purify","type":"Poison","category":"Status","power":0,"accuracy":true,"effects":"Cures the target's status condition. If it succeeds, the user regains half its maximum HP.","summary":"Cures the target's status and heals the user."},
		"revelationdance": {"name":"Revelation Dance","type":"Normal","category":"Special","power":90,"accuracy":100,"effects":"This move's type depends on the user's primary type. If the user's primary type is typeless, this move's type is the user's secondary type if it has one, otherwise the added type from Forest's Curse or Trick-or-Treat. This move is typeless if the user's type is typeless alone.","summary":"Type varies based on the user's primary type."},
		"coreenforcer": {"name":"Core Enforcer","type":"Dragon","category":"Special","power":100,"accuracy":100,"effects":"Nullifies the foe(s) Ability if the foe(s) move first.","summary":"Nullifies the foe(s) Ability if the foe(s) move first."},
		"beakblast": {"name":"Beak Blast","type":"Flying","category":"Physical","power":100,"accuracy":100,"effects":"If the user is hit by a contact move this turn before it can execute this move, the attacker is burned.","summary":"Burns on contact with the user before it moves."},
		"dragonhammer": {"name":"Dragon Hammer","type":"Dragon","category":"Physical","power":90,"accuracy":100,"effects":"No additional effect.","summary":"No additional effect."},
		"sinisterarrowraid": {"name":"Sinister Arrow Raid","type":"Ghost","category":"Physical","power":180,"accuracy":true,"effects":"No additional effect.","summary":"No additional effect."},
		"maliciousmoonsault": {"name":"Malicious Moonsault","type":"Dark","category":"Physical","power":180,"accuracy":true,"effects":"Damage doubles and no accuracy check is done if the target has used Minimize while active.","summary":"Damage doubles if the target used Minimize."},
		"oceanicoperetta": {"name":"Oceanic Operetta","type":"Water","category":"Special","power":195,"accuracy":true,"effects":"No additional effect.","summary":"No additional effect."},
		"guardianofalola": {"name":"Guardian of Alola","type":"Fairy","category":"Special","power":0,"accuracy":true,"effects":"Deals damage to the target equal to 3/4 of its current HP, rounded down, but not less than 1 HP.","summary":"Does damage equal to 3/4 target's current HP."},
		"soulstealing7starstrike": {"name":"Soul-Stealing 7-Star Strike","type":"Ghost","category":"Physical","power":195,"accuracy":true,"effects":"No additional effect.","summary":"No additional effect."},
		"stokedsparksurfer": {"name":"Stoked Sparksurfer","type":"Electric","category":"Special","power":175,"accuracy":true,"effects":"Has a 100% chance to paralyze the target.","summary":"100% chance to paralyze the target."},
		"pulverizingpancake": {"name":"Pulverizing Pancake","type":"Normal","category":"Physical","power":210,"accuracy":true,"effects":"No additional effect.","summary":"No additional effect."},
		"extremeevoboost": {"name":"Extreme Evoboost","type":"Normal","category":"Status","power":0,"accuracy":true,"effects":"Raises the user's Attack, Defense, Special Attack, Special Defense, and Speed by 2 stages.","summary":"Raises user's Atk, Def, SpA, SpD, and Spe by 2."},
		"genesissupernova": {"name":"Genesis Supernova","type":"Psychic","category":"Special","power":185,"accuracy":true,"effects":"If this move is successful, the terrain becomes Psychic Terrain.","summary":"Summons Psychic Terrain."},
		"prismaticlaser": {"name":"Prismatic Laser","type":"Psychic","category":"Special","power":160,"accuracy":100,"effects":"If this move is successful, the user must recharge on the following turn and cannot select a move.","summary":"User cannot move next turn."},
		"moongeistbeam": {"name":"Moongeist Beam","type":"Ghost","category":"Special","power":100,"accuracy":100,"effects":"This move and its effects ignore the Abilities of other Pokemon.","summary":"Ignores the Abilities of other Pokemon."},
		"tearfullook": {"name":"Tearful Look","type":"Normal","category":"Status","power":0,"accuracy":true,"effects":"Lowers the target's Attack and Special Attack by 1 stage.","summary":"Lowers the target's Attack and Sp. Atk by 1."},
		"multiattack": {"name":"Multi-Attack","type":"Normal","category":"Physical","power":120,"accuracy":100,"effects":"This move's type depends on the user's held Memory.","summary":"Type varies based on the held Memory."},
		"10000000voltthunderbolt": {"name":"10,000,000 Volt Thunderbolt","type":"Electric","category":"Special","power":195,"accuracy":true,"effects":"Has a very high chance for a critical hit.","summary":"Very high critical hit ratio."},
		"mindblown": {"name":"Mind Blown","type":"Fire","category":"Special","power":150,"accuracy":100,"effects":"Whether or not this move is successful and even if it would cause fainting, the user loses 1/2 of its maximum HP, rounded up, unless the user has the Magic Guard Ability. This move is prevented from executing and the user does not lose HP if any active Pokemon has the Damp Ability, or if this move is Fire type and the user is affected by Powder or the weather is Heavy Rain.","summary":"User loses 50% max HP. Hits adjacent Pokemon."},
		"lightthatburnsthesky": {"name":"Light That Burns the Sky","type":"Psychic","category":"Special","power":200,"accuracy":true,"effects":"This move becomes a physical attack if the user's Attack is greater than its Special Attack, including stat stage changes. This move and its effects ignore the Abilities of other Pokemon.","summary":"Physical if user's Atk > Sp. Atk. Ignores Abilities."},
		"searingsunrazesmash": {"name":"Searing Sunraze Smash","type":"Steel","category":"Physical","power":200,"accuracy":true,"effects":"This move and its effects ignore the Abilities of other Pokemon.","summary":"Ignores the Abilities of other Pokemon."},
		"menacingmoonrazemaelstrom": {"name":"Menacing Moonraze Maelstrom","type":"Ghost","category":"Special","power":200,"accuracy":true,"effects":"This move and its effects ignore the Abilities of other Pokemon.","summary":"Ignores the Abilities of other Pokemon."},
		"letssnuggleforever": {"name":"Let's Snuggle Forever","type":"Fairy","category":"Physical","power":190,"accuracy":true,"effects":"No additional effect.","summary":"No additional effect."},
		"splinteredstormshards": {"name":"Splintered Stormshards","type":"Rock","category":"Physical","power":190,"accuracy":true,"effects":"Ends the effects of Electric Terrain, Grassy Terrain, Misty Terrain, and Psychic Terrain.","summary":"Ends the effects of terrain."},
		"clangoroussoulblaze": {"name":"Clangorous Soulblaze","type":"Dragon","category":"Special","power":185,"accuracy":true,"effects":"Raises the user's Attack, Defense, Special Attack, Special Defense, and Speed by 1 stage.","summary":"Raises the user's Atk/Def/SpAtk/SpDef/Spe by 1."},
		"zippyzap": {"name":"Zippy Zap","type":"Electric","category":"Physical","power":80,"accuracy":100,"effects":"Has a 100% chance to raise the user's evasion by 1 stage.","summary":"Goes first. Raises user's evasion by 1."},
		"splishysplash": {"name":"Splishy Splash","type":"Water","category":"Special","power":90,"accuracy":100,"effects":"Has a 30% chance to paralyze the target.","summary":"30% chance to paralyze the target."},
		"floatyfall": {"name":"Floaty Fall","type":"Flying","category":"Physical","power":90,"accuracy":95,"effects":"Has a 30% chance to make the target flinch.","summary":"30% chance to make the target flinch."},
		"pikapapow": {"name":"Pika Papow","type":"Electric","category":"Special","power":0,"accuracy":true,"effects":"Power is equal to the greater of (user's Happiness × 2/5), rounded down, or 1.","summary":"Max happiness: 102 power. Can't miss."},
		"bouncybubble": {"name":"Bouncy Bubble","type":"Water","category":"Special","power":60,"accuracy":100,"effects":"The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3× normal, rounded half down.","summary":"User recovers 50% of the damage dealt."},
		"buzzybuzz": {"name":"Buzzy Buzz","type":"Electric","category":"Special","power":60,"accuracy":100,"effects":"Has a 100% chance to paralyze the foe.","summary":"100% chance to paralyze the foe."},
		"sizzlyslide": {"name":"Sizzly Slide","type":"Fire","category":"Physical","power":60,"accuracy":100,"effects":"Has a 100% chance to burn the foe.","summary":"100% chance to burn the foe."},
		"glitzyglow": {"name":"Glitzy Glow","type":"Psychic","category":"Special","power":80,"accuracy":95,"effects":"This move summons Light Screen for 5 turns upon use.","summary":"Summons Light Screen."},
		"baddybad": {"name":"Baddy Bad","type":"Dark","category":"Special","power":80,"accuracy":95,"effects":"This move summons Reflect for 5 turns upon use.","summary":"Summons Reflect."},
		"sappyseed": {"name":"Sappy Seed","type":"Grass","category":"Physical","power":100,"accuracy":90,"effects":"This move summons Leech Seed on the foe.","summary":"Summons Leech Seed."},
		"freezyfrost": {"name":"Freezy Frost","type":"Ice","category":"Special","power":100,"accuracy":90,"effects":"Resets the stat stages of all active Pokemon to 0.","summary":"Eliminates all stat changes."},
		"sparklyswirl": {"name":"Sparkly Swirl","type":"Fairy","category":"Special","power":120,"accuracy":85,"effects":"Every Pokemon in the user's party is cured of its non-volatile status condition.","summary":"Cures the user's party of all status conditions."},
		"veeveevolley": {"name":"Veevee Volley","type":"Normal","category":"Physical","power":0,"accuracy":true,"effects":"Power is equal to the greater of (user's Happiness × 2/5), rounded down, or 1.","summary":"Max happiness: 102 power. Can't miss."},
		"maxguard": {"name":"Max Guard","type":"Normal","category":"Status","power":0,"accuracy":true,"effects":"Protects user from moves & Max Moves this turn.","summary":"Protects user from moves & Max Moves this turn."},
		"dynamaxcannon": {"name":"Dynamax Cannon","type":"Dragon","category":"Special","power":100,"accuracy":100,"effects":"Damage doubles if the target is Dynamaxed.","summary":"Damage doubles if the target is Dynamaxed."},
		"magicpowder": {"name":"Magic Powder","type":"Psychic","category":"Status","power":0,"accuracy":100,"effects":"Causes the target to become a Psychic type. Fails if the target is an Arceus or a Silvally, or if the target is already purely Psychic type.","summary":"Changes the target's type to Psychic."},
		"maxflare": {"name":"Max Flare","type":"Fire","category":"Physical","power":100,"accuracy":true,"effects":"Power is equal to the base move's Max Move power. If this move is successful, the effect of Sun begins. This effect does not happen if the user is not Dynamaxed. If this move is used as a base move, it deals damage with a power of 0.","summary":"Base move affects power. Starts Sun."},
		"maxflutterby": {"name":"Max Flutterby","type":"Bug","category":"Physical","power":10,"accuracy":true,"effects":"Power is equal to the base move's Max Move power. If this move is successful, the Special Attack of each Pokemon on the opposing side is lowered by 1 stage, even if they have a substitute. This effect does not happen if the user is not Dynamaxed. If this move is used as a base move, it deals damage with a power of 0.","summary":"Base move affects power. Foes: -1 Sp. Atk."},
		"maxlightning": {"name":"Max Lightning","type":"Electric","category":"Physical","power":10,"accuracy":true,"effects":"Power is equal to the base move's Max Move power. If this move is successful, the effect of Electric Terrain begins. This effect does not happen if the user is not Dynamaxed. If this move is used as a base move, it deals damage with a power of 0.","summary":"Base move affects power. Starts Electric Terrain."},
		"maxstrike": {"name":"Max Strike","type":"Normal","category":"Physical","power":10,"accuracy":true,"effects":"Power is equal to the base move's Max Move power. If this move is successful, the Speed of each Pokemon on the opposing side is lowered by 1 stage, even if they have a substitute. This effect does not happen if the user is not Dynamaxed. If this move is used as a base move, it deals damage with a power of 0.","summary":"Base move affects power. Foes: -1 Speed."},
		"maxknuckle": {"name":"Max Knuckle","type":"Fighting","category":"Physical","power":10,"accuracy":true,"effects":"Boosts the user and its allies' Attack by 1 stage. BP scales with the base move's BP. This effect does not happen if the user is not Dynamaxed. If this move is used as a base move, it deals damage with a power of 0.","summary":"Base move affects power. Allies: +1 Attack."},
		"maxphantasm": {"name":"Max Phantasm","type":"Ghost","category":"Physical","power":10,"accuracy":true,"effects":"Power is equal to the base move's Max Move power. If this move is successful, the Defense of each Pokemon on the opposing side is lowered by 1 stage, even if they have a substitute. This effect does not happen if the user is not Dynamaxed. If this move is used as a base move, it deals damage with a power of 0.","summary":"Base move affects power. Foes: -1 Defense."},
		"maxhailstorm": {"name":"Max Hailstorm","type":"Ice","category":"Physical","power":10,"accuracy":true,"effects":"Power is equal to the base move's Max Move power. If this move is successful, the effect of Hail begins. This effect does not happen if the user is not Dynamaxed. If this move is used as a base move, it deals damage with a power of 0.","summary":"Base move affects power. Starts Hail."},
		"maxooze": {"name":"Max Ooze","type":"Poison","category":"Physical","power":10,"accuracy":true,"effects":"Power is equal to the base move's Max Move power. If this move is successful, the Special Attack of each Pokemon on the user's side is raised by 1 stage, even if they have a substitute. This effect does not happen if the user is not Dynamaxed. If this move is used as a base move, it deals damage with a power of 0.","summary":"Base move affects power. Allies: +1 Sp. Atk."},
		"maxgeyser": {"name":"Max Geyser","type":"Water","category":"Physical","power":10,"accuracy":true,"effects":"Power is equal to the base move's Max Move power. If this move is successful, the effect of Rain begins. This effect does not happen if the user is not Dynamaxed. If this move is used as a base move, it deals damage with a power of 0.","summary":"Base move affects power. Starts Rain."},
		"maxairstream": {"name":"Max Airstream","type":"Flying","category":"Physical","power":10,"accuracy":true,"effects":"Power is equal to the base move's Max Move power. If this move is successful, the Speed of each Pokemon on the user's side is raised by 1 stage, even if they have a substitute. This effect does not happen if the user is not Dynamaxed. If this move is used as a base move, it deals damage with a power of 0.","summary":"Base move affects power. Allies: +1 Speed."},
		"maxstarfall": {"name":"Max Starfall","type":"Fairy","category":"Physical","power":10,"accuracy":true,"effects":"Power is equal to the base move's Max Move power. If this move is successful, the effect of Misty Terrain begins. This effect does not happen if the user is not Dynamaxed. If this move is used as a base move, it deals damage with a power of 0.","summary":"Base move affects power. Starts Misty Terrain."},
		"maxwyrmwind": {"name":"Max Wyrmwind","type":"Dragon","category":"Physical","power":10,"accuracy":true,"effects":"Power is equal to the base move's Max Move power. If this move is successful, the Attack of each Pokemon on the opposing side is lowered by 1 stage, even if they have a substitute. This effect does not happen if the user is not Dynamaxed. If this move is used as a base move, it deals damage with a power of 0.","summary":"Base move affects power. Foes: -1 Attack."},
		"maxmindstorm": {"name":"Max Mindstorm","type":"Psychic","category":"Physical","power":10,"accuracy":true,"effects":"Power is equal to the base move's Max Move power. If this move is successful, the effect of Psychic Terrain begins. This effect does not happen if the user is not Dynamaxed. If this move is used as a base move, it deals damage with a power of 0.","summary":"Base move affects power. Starts Psychic Terrain."},
		"maxrockfall": {"name":"Max Rockfall","type":"Rock","category":"Physical","power":10,"accuracy":true,"effects":"Power is equal to the base move's Max Move power. If this move is successful, the effect of Sandstorm begins. This effect does not happen if the user is not Dynamaxed. If this move is used as a base move, it deals damage with a power of 0.","summary":"Base move affects power. Starts Sandstorm."},
		"maxquake": {"name":"Max Quake","type":"Ground","category":"Physical","power":10,"accuracy":true,"effects":"Power is equal to the base move's Max Move power. If this move is successful, the Special Defense of each Pokemon on the user's side is raised by 1 stage, even if they have a substitute. This effect does not happen if the user is not Dynamaxed. If this move is used as a base move, it deals damage with a power of 0.","summary":"Base move affects power. Allies: +1 Sp. Def."},
		"maxdarkness": {"name":"Max Darkness","type":"Dark","category":"Physical","power":10,"accuracy":true,"effects":"Power is equal to the base move's Max Move power. If this move is successful, the Special Defense of each Pokemon on the opposing side is lowered by 1 stage, even if they have a substitute. This effect does not happen if the user is not Dynamaxed. If this move is used as a base move, it deals damage with a power of 0.","summary":"Base move affects power. Foes: -1 Sp. Def."},
		"maxovergrowth": {"name":"Max Overgrowth","type":"Grass","category":"Physical","power":10,"accuracy":true,"effects":"Power is equal to the base move's Max Move power. If this move is successful, the effect of Grassy Terrain begins. This effect does not happen if the user is not Dynamaxed. If this move is used as a base move, it deals damage with a power of 0.","summary":"Base move affects power. Starts Grassy Terrain."},
		"maxsteelspike": {"name":"Max Steelspike","type":"Steel","category":"Physical","power":10,"accuracy":true,"effects":"Power is equal to the base move's Max Move power. If this move is successful, the Defense of each Pokemon on the user's side is raised by 1 stage, even if they have a substitute. This effect does not happen if the user is not Dynamaxed. If this move is used as a base move, it deals damage with a power of 0.","summary":"Base move affects power. Allies: +1 Defense."},
		"behemothblade": {"name":"Behemoth Blade","type":"Steel","category":"Physical","power":100,"accuracy":100,"effects":"Damage doubles if the target is Dynamaxed.","summary":"Damage doubles if the target is Dynamaxed."},
		"behemothbash": {"name":"Behemoth Bash","type":"Steel","category":"Physical","power":100,"accuracy":100,"effects":"Damage doubles if the target is Dynamaxed.","summary":"Damage doubles if the target is Dynamaxed."},
		"falsesurrender": {"name":"False Surrender","type":"Dark","category":"Physical","power":80,"accuracy":true,"effects":"This move does not check accuracy.","summary":"This move does not check accuracy."},
		"eternabeam": {"name":"Eternabeam","type":"Dragon","category":"Special","power":160,"accuracy":90,"effects":"If this move is successful, the user must recharge on the following turn and cannot select a move.","summary":"User cannot move next turn."},
		"steelbeam": {"name":"Steel Beam","type":"Steel","category":"Special","power":140,"accuracy":95,"effects":"Whether or not this move is successful and even if it would cause fainting, the user loses 1/2 of its maximum HP, rounded up, unless the user has the Magic Guard Ability.","summary":"User loses 50% max HP."},
		"steelroller": {"name":"Steel Roller","type":"Steel","category":"Physical","power":130,"accuracy":100,"effects":"Fails if there is no terrain active. Ends the effects of Electric Terrain, Grassy Terrain, Misty Terrain, and Psychic Terrain.","summary":"Fails if there is no terrain active. Ends the terrain."},
		"mistyexplosion": {"name":"Misty Explosion","type":"Fairy","category":"Special","power":100,"accuracy":100,"effects":"If the current terrain is Misty Terrain and the user is grounded, this move's power is multiplied by 1.5. The user faints after using this move, even if this move fails for having no target. This move is prevented from executing if any active Pokemon has the Damp Ability.","summary":"User faints. User on Misty Terrain: 1.5× power."},
		"skittersmack": {"name":"Skitter Smack","type":"Bug","category":"Physical","power":70,"accuracy":90,"effects":"Has a 100% chance to lower the target's Special Attack by 1 stage.","summary":"100% chance to lower target's Sp. Atk by 1."},
		"lashout": {"name":"Lash Out","type":"Dark","category":"Physical","power":75,"accuracy":100,"effects":"Power doubles if the user had a stat stage lowered this turn.","summary":"2× power if the user had a stat lowered this turn."},
		"corrosivegas": {"name":"Corrosive Gas","type":"Poison","category":"Status","power":0,"accuracy":100,"effects":"The target loses its held item. This move cannot cause Pokemon with the Sticky Hold Ability to lose their held item or cause a Kyogre, Groudon, Giratina, Arceus, Genesect, Silvally, Zacian, or Zamazenta to lose their Blue Orb, Red Orb, Griseous Orb, Plate, Drive, Memory, Rusted Sword, or Rusted Shield, respectively. Items lost to this move cannot be regained with Recycle or the Harvest Ability.","summary":"Removes adjacent Pokemon's held items."},
		"coaching": {"name":"Coaching","type":"Fighting","category":"Status","power":0,"accuracy":true,"effects":"Raises the target's Attack and Defense by 1 stage. Fails if there is no ally adjacent to the user.","summary":"Raises an ally's Attack and Defense by 1."},
		"astralbarrage": {"name":"Astral Barrage","type":"Ghost","category":"Special","power":120,"accuracy":100,"effects":"No additional effect. Hits adjacent foes.","summary":"No additional effect. Hits adjacent foes."}
	}
};
