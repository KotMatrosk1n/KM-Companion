/* Royal Sword encounters, trainer teams, and route item references. */
/*global window */
window.KMCalculatorReferenceData = {
	"pokemon-royal-sword": {
		"profileId": "pokemon-royal-sword",
		"version": 2,
		"encounterRates": "weights",
		"tooltipData": "swsh",
		"trainerModels": {
			"swsh-artist": "Artist",
			"swsh-backpacker": "Backpacker",
			"swsh-bea": "Bea",
			"swsh-beauty": "Beauty",
			"swsh-bede": "Bede",
			"swsh-bede-gym": "Bede in his Gym uniform",
			"swsh-black-belt": "Black Belt",
			"swsh-breeder-female": "Female Pokémon Breeder",
			"swsh-breeder-male": "Male Pokémon Breeder",
			"swsh-cabbie": "Cabbie",
			"swsh-cameraman": "Cameraman",
			"swsh-cook": "Cook",
			"swsh-dancer": "Dancer",
			"swsh-dark-gym-male": "Male Dark Gym Trainer",
			"swsh-doctor-female": "Female Doctor",
			"swsh-doctor-male": "Male Doctor",
			"swsh-dragon-gym-female": "Female Dragon Gym Trainer",
			"swsh-dragon-gym-male": "Male Dragon Gym Trainer",
			"swsh-fairy-gym": "Fairy Gym Trainer",
			"swsh-fighting-gym-female": "Female Fighting Gym Trainer",
			"swsh-fighting-gym-male": "Male Fighting Gym Trainer",
			"swsh-fire-gym-female": "Female Fire Gym Trainer",
			"swsh-fire-gym-male": "Male Fire Gym Trainer",
			"swsh-fisher": "Fisher",
			"swsh-gentleman": "Gentleman",
			"swsh-gordie": "Gordie",
			"swsh-grass-gym-female": "Female Grass Gym Trainer",
			"swsh-grass-gym-male": "Male Grass Gym Trainer",
			"swsh-hiker": "Hiker",
			"swsh-hop": "Hop",
			"swsh-kabu": "Kabu",
			"swsh-lass": "Lass",
			"swsh-leon": "Leon",
			"swsh-macro-cosmos-female": "Female Macro Cosmos Employee",
			"swsh-macro-cosmos-male": "Male Macro Cosmos Employee",
			"swsh-madame": "Madame",
			"swsh-marnie": "Marnie",
			"swsh-marnie-uniform": "Marnie in her challenge uniform",
			"swsh-milo": "Milo",
			"swsh-model": "Model",
			"swsh-musician": "Musician",
			"swsh-nessa": "Nessa",
			"swsh-office-worker-female": "Female Office Worker",
			"swsh-office-worker-male": "Male Office Worker",
			"swsh-oleana": "Oleana",
			"swsh-opal": "Opal",
			"swsh-piers": "Piers",
			"swsh-poke-kid-female": "Female Poké Kid",
			"swsh-poke-kid-male": "Male Poké Kid",
			"swsh-police-officer": "Police Officer",
			"swsh-postman": "Postman",
			"swsh-raihan": "Raihan",
			"swsh-rail-staff": "Rail Staff",
			"swsh-reporter": "Reporter",
			"swsh-rock-gym-female": "Female Rock Gym Trainer",
			"swsh-rock-gym-male": "Male Rock Gym Trainer",
			"swsh-rose": "Rose",
			"swsh-schoolboy": "Schoolboy",
			"swsh-schoolgirl": "Schoolgirl",
			"swsh-swimmer-female": "Female Swimmer",
			"swsh-swimmer-male": "Male Swimmer",
			"swsh-team-yell-female": "Female Team Yell Grunt",
			"swsh-team-yell-male": "Male Team Yell Grunt",
			"swsh-water-gym": "Water Gym Trainer",
			"swsh-worker-female": "Female Worker",
			"swsh-worker-male": "Male Worker",
			"swsh-youngster": "Youngster"
		},
		"encounterRules": [
			{"areas":["area-1"],"allowances":[{"id":"encounter","label":"Starter","limit":1}]},
			{"areas":["area-2"],"allowances":[{"id":"encounter","label":"Encounter","limit":1}]},
			{"areas":["area-3"],"allowances":[{"id":"encounter","label":"Gift","limit":1}]},
			{"areas":["area-4"],"allowances":[{"id":"encounter","label":"Encounter or gift","limit":1}]},
			{"areas":["area-5","area-6"],"allowances":[{"id":"encounter","label":"Shared catches","limit":6}]},
			{"areas":["area-7"],"allowances":[{"id":"fishing","label":"Fishing encounter","limit":1,"methods":["Fishing"]},{"id":"trade","label":"Aron trade","limit":1,"pokemon":["Aron"]}]},
			{"areas":["area-8"],"allowances":[{"id":"encounter","label":"Encounter","limit":1}]},
			{"areas":["area-9"],"allowances":[{"id":"encounter","label":"Encounter","limit":1}]},
			{"areas":["area-10"],"allowances":[{"id":"encounter","label":"Encounter","limit":1}]},
			{"areas":["area-11"],"allowances":[{"id":"encounter","label":"Trade","limit":1}]},
			{"areas":["area-12","area-13"],"allowances":[{"id":"encounter","label":"Shared catches","limit":6}]},
			{"areas":["area-14"],"allowances":[{"id":"encounter","label":"Encounter or gift","limit":1}]},
			{"areas":["area-15"],"allowances":[{"id":"fishing","label":"Fishing encounter","limit":1,"methods":["Fishing"]},{"id":"trade","label":"Nidoran♀ trade","limit":1,"pokemon":["Nidoran♀"]}]},
			{"areas":["area-16","area-17"],"allowances":[{"id":"encounter","label":"Shared catches","limit":6}]},
			{"areas":["area-18"],"allowances":[{"id":"encounter","label":"Encounter or static","limit":1}]},
			{"areas":["area-19"],"allowances":[{"id":"encounter","label":"Encounter","limit":1}]},
			{"areas":["area-20"],"allowances":[{"id":"encounter","label":"Stadium encounter","limit":1}]},
			{"areas":["area-21","area-22"],"allowances":[{"id":"encounter","label":"Shared catches","limit":6}]},
			{"areas":["area-23"],"allowances":[{"id":"encounter","label":"Encounter","limit":1}]},
			{"areas":["area-24","area-25"],"allowances":[{"id":"encounter","label":"Shared catches","limit":6}]},
			{"areas":["area-26"],"allowances":[{"id":"encounter","label":"Encounter","limit":1}]},
			{"areas":["area-27","area-28"],"allowances":[{"id":"encounter","label":"Shared catches","limit":6}]},
			{"areas":["area-29"],"allowances":[{"id":"encounter","label":"Encounter","limit":1}]},
			{"areas":["area-30"],"allowances":[{"id":"encounter","label":"Encounter","limit":1}]},
			{"areas":["area-31","area-32"],"allowances":[{"id":"encounter","label":"Shared catches","limit":6}]},
			{"areas":["area-33"],"allowances":[{"id":"encounter","label":"Encounter","limit":1}]},
			{"areas":["area-34","area-35"],"allowances":[{"id":"encounter","label":"Shared catches","limit":6}]},
			{"areas":["area-36"],"allowances":[{"id":"encounter","label":"Catches","limit":6}]},
			{"areas":["area-37"],"allowances":[{"id":"encounter","label":"Encounter","limit":1}]},
			{"areas":["area-38"],"allowances":[{"id":"encounter","label":"Encounter","limit":1}]},
			{"areas":["area-39"],"allowances":[{"id":"encounter","label":"Summit encounter","limit":1}]}
		],
		"areas": [
			{"id":"area-1","name":"Starter","groups":[{"method":"Starter","entries":[{"pokemon":"Turtwig","level":"5","rate":null,"slot":1},{"pokemon":"Cyndaquil","level":"5","rate":null,"slot":2},{"pokemon":"Popplio","level":"5","rate":null,"slot":3}]}]},
			{"id":"area-2","name":"Route 1","groups":[{"method":"Land","entries":[{"pokemon":"Caterpie","level":"3-5","rate":20,"slot":1},{"pokemon":"Seedot","level":"3-5","rate":17,"slot":2},{"pokemon":"Lotad","level":"3-5","rate":14,"slot":3},{"pokemon":"Dwebble","level":"3-5","rate":12,"slot":4},{"pokemon":"Mudbray","level":"3-5","rate":10,"slot":5},{"pokemon":"Nidoran♀","level":"3-5","rate":9,"slot":6},{"pokemon":"Nidoran♂","level":"3-5","rate":7,"slot":7},{"pokemon":"Onix","level":"3-5","rate":6,"slot":8},{"pokemon":"Horsea","level":"3-5","rate":4,"slot":9},{"pokemon":"Dratini","level":"3-5","rate":1,"slot":10}]}]},
			{"id":"area-3","name":"Wedgehurst","groups":[{"method":"Static","entries":[{"pokemon":"Gastly","level":"12","rate":null,"slot":1}]}]},
			{"id":"area-4","name":"Route 2","groups":[{"method":"Land","entries":[{"pokemon":"Minccino","level":"4-6","rate":20,"slot":1},{"pokemon":"Electrike","level":"4-6","rate":17,"slot":2},{"pokemon":"Venipede","level":"4-6","rate":14,"slot":3},{"pokemon":"Rockruff","level":"4-6","rate":12,"slot":4},{"pokemon":"Yamper","level":"4-6","rate":10,"slot":5},{"pokemon":"Fletchling","level":"4-6","rate":9,"slot":6},{"pokemon":"Budew","level":"4-6","rate":7,"slot":7},{"pokemon":"Ralts","level":"4-6","rate":6,"slot":8},{"pokemon":"Growlithe","level":"4-6","rate":4,"slot":9},{"pokemon":"Larvitar","level":"4-6","rate":1,"slot":10}]},{"method":"Fishing","entries":[{"pokemon":"Marill","level":"4-6","rate":20,"slot":1},{"pokemon":"Goldeen","level":"4-6","rate":17,"slot":2},{"pokemon":"Arrokuda","level":"4-6","rate":14,"slot":3},{"pokemon":"Slowpoke","level":"4-6","rate":12,"slot":4},{"pokemon":"Omanyte","level":"4-6","rate":10,"slot":5},{"pokemon":"Kabuto","level":"4-6","rate":9,"slot":6},{"pokemon":"Chewtle","level":"4-6","rate":7,"slot":7},{"pokemon":"Tympole","level":"4-6","rate":6,"slot":8},{"pokemon":"Lapras","level":"4-6","rate":4,"slot":9},{"pokemon":"Wishiwashi","level":"4-6","rate":1,"slot":10}]},{"method":"Static","entries":[{"pokemon":"Abra","level":"10","rate":null,"slot":1},{"pokemon":"Snorunt","level":"10","rate":null,"slot":2}]}]},
			{"id":"area-5","name":"Rolling Fields","groups":[{"method":"Land","entries":[{"pokemon":"Bunnelby","level":"10-13","rate":20,"slot":1},{"pokemon":"Wooper","level":"10-13","rate":17,"slot":2},{"pokemon":"Tyrogue","level":"10-13","rate":14,"slot":3},{"pokemon":"Nincada","level":"10-13","rate":12,"slot":4},{"pokemon":"Cleffa","level":"10-13","rate":10,"slot":5},{"pokemon":"Rookidee","level":"10-13","rate":9,"slot":6},{"pokemon":"Machop","level":"10-13","rate":7,"slot":7},{"pokemon":"Toxel","level":"10-13","rate":6,"slot":8},{"pokemon":"Wimpod","level":"10-13","rate":4,"slot":9},{"pokemon":"Deino","level":"10-13","rate":1,"slot":10}]},{"method":"Shaking Trees","entries":[{"pokemon":"Skwovet","level":"10-13","rate":40,"slot":1},{"pokemon":"Cherubi","level":"10-13","rate":35,"slot":2},{"pokemon":"Pinsir","level":"10-13","rate":15,"slot":3},{"pokemon":"Heracross","level":"10-13","rate":9,"slot":4},{"pokemon":"Passimian","level":"10-13","rate":1,"slot":5}]},{"method":"Overcast","entries":[{"pokemon":"Helioptile","level":"10-13","rate":6,"slot":8},{"pokemon":"Ralts","level":"10-13","rate":4,"slot":9},{"pokemon":"Magneton","level":"10-13","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Rain","entries":[{"pokemon":"Barboach","level":"10-13","rate":6,"slot":8},{"pokemon":"Octillery","level":"10-13","rate":4,"slot":9},{"pokemon":"Feebas","level":"10-13","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Thunderstorm","entries":[{"pokemon":"Togedemaru","level":"10-13","rate":6,"slot":8},{"pokemon":"Galvantula","level":"10-13","rate":4,"slot":9},{"pokemon":"Electrike","level":"10-13","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Intense Sun","entries":[{"pokemon":"Solrock","level":"10-13","rate":6,"slot":8},{"pokemon":"Vulpix","level":"10-13","rate":4,"slot":9},{"pokemon":"Growlithe","level":"10-13","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Snow","entries":[{"pokemon":"Smoochum","level":"10-13","rate":6,"slot":8},{"pokemon":"Swinub","level":"10-13","rate":4,"slot":9},{"pokemon":"Vanillite","level":"10-13","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Snowstorm","entries":[{"pokemon":"Delibird","level":"10-13","rate":6,"slot":8},{"pokemon":"Froslass","level":"10-13","rate":4,"slot":9},{"pokemon":"Cubchoo","level":"10-13","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Sandstorm","entries":[{"pokemon":"Baltoy","level":"10-13","rate":6,"slot":8},{"pokemon":"Larvitar","level":"10-13","rate":4,"slot":9},{"pokemon":"Vibrava","level":"10-13","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Heavy Fog","entries":[{"pokemon":"Wynaut","level":"10-13","rate":6,"slot":8},{"pokemon":"Dewpider","level":"10-13","rate":4,"slot":9},{"pokemon":"Lunatone","level":"10-13","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]}]},
			{"id":"area-6","name":"East Lake Axewell","groups":[{"method":"Land","entries":[{"pokemon":"Wingull","level":"10-13","rate":20,"slot":1},{"pokemon":"Meowth-Alola","level":"10-13","rate":17,"slot":2},{"pokemon":"Ponyta","level":"10-13","rate":14,"slot":3},{"pokemon":"Budew","level":"10-13","rate":12,"slot":4},{"pokemon":"Sandile","level":"10-13","rate":10,"slot":5},{"pokemon":"Duskull","level":"10-13","rate":9,"slot":6},{"pokemon":"Rowlet","level":"10-13","rate":7,"slot":7},{"pokemon":"Goomy","level":"10-13","rate":6,"slot":8},{"pokemon":"Dratini","level":"10-13","rate":4,"slot":9},{"pokemon":"Deino","level":"10-13","rate":1,"slot":10}]},{"method":"Fishing","entries":[{"pokemon":"Marill","level":"10-13","rate":20,"slot":1},{"pokemon":"Goldeen","level":"10-13","rate":17,"slot":2},{"pokemon":"Arrokuda","level":"10-13","rate":14,"slot":3},{"pokemon":"Slowpoke","level":"10-13","rate":12,"slot":4},{"pokemon":"Omanyte","level":"10-13","rate":10,"slot":5},{"pokemon":"Kabuto","level":"10-13","rate":9,"slot":6},{"pokemon":"Chewtle","level":"10-13","rate":7,"slot":7},{"pokemon":"Tympole","level":"10-13","rate":6,"slot":8},{"pokemon":"Lapras","level":"10-13","rate":4,"slot":9},{"pokemon":"Wishiwashi","level":"10-13","rate":1,"slot":10}]},{"method":"Overcast","entries":[{"pokemon":"Dedenne","level":"10-13","rate":6,"slot":8},{"pokemon":"Durant","level":"10-13","rate":4,"slot":9},{"pokemon":"Abra","level":"10-13","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Rain","entries":[{"pokemon":"Poliwag","level":"10-13","rate":6,"slot":8},{"pokemon":"Lotad","level":"10-13","rate":4,"slot":9},{"pokemon":"Mantine","level":"10-13","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Thunderstorm","entries":[{"pokemon":"Chinchou","level":"10-13","rate":6,"slot":8},{"pokemon":"Shinx","level":"10-13","rate":4,"slot":9},{"pokemon":"Galvantula","level":"10-13","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Intense Sun","entries":[{"pokemon":"Litwick","level":"10-13","rate":6,"slot":8},{"pokemon":"Solrock","level":"10-13","rate":4,"slot":9},{"pokemon":"Darmanitan","level":"10-13","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Snow","entries":[{"pokemon":"Snom","level":"10-13","rate":6,"slot":8},{"pokemon":"Darumaka-Galar","level":"10-13","rate":4,"slot":9},{"pokemon":"Ninetales-Alola","level":"10-13","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Snowstorm","entries":[{"pokemon":"Spheal","level":"10-13","rate":6,"slot":8},{"pokemon":"Sandshrew-Alola","level":"10-13","rate":4,"slot":9},{"pokemon":"Avalugg","level":"10-13","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Sandstorm","entries":[{"pokemon":"Magnemite","level":"10-13","rate":6,"slot":8},{"pokemon":"Rhyhorn","level":"10-13","rate":4,"slot":9},{"pokemon":"Larvitar","level":"10-13","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Heavy Fog","entries":[{"pokemon":"Golett","level":"10-13","rate":6,"slot":8},{"pokemon":"Gastly","level":"10-13","rate":4,"slot":9},{"pokemon":"Rotom","level":"10-13","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]}]},
			{"id":"area-7","name":"City of Motostoke","groups":[{"method":"Fishing","entries":[{"pokemon":"Goldeen","level":"8-11","rate":20,"slot":1},{"pokemon":"Basculin","level":"8-11","rate":17,"slot":2},{"pokemon":"Chinchou","level":"8-11","rate":14,"slot":3},{"pokemon":"Barboach","level":"8-11","rate":12,"slot":4},{"pokemon":"Corphish","level":"8-11","rate":10,"slot":5},{"pokemon":"Remoraid","level":"8-11","rate":9,"slot":6},{"pokemon":"Chewtle","level":"8-11","rate":7,"slot":7},{"pokemon":"Tympole","level":"8-11","rate":6,"slot":8},{"pokemon":"Feebas","level":"8-11","rate":4,"slot":9},{"pokemon":"Wishiwashi","level":"8-11","rate":1,"slot":10}]},{"method":"Trade","entries":[{"pokemon":"Aron","level":"10","rate":null,"slot":1,"requiredPokemon":"Bunnelby"}]}]},
			{"id":"area-8","name":"Route 3","groups":[{"method":"Land","entries":[{"pokemon":"Togedemaru","level":"12-14","rate":30,"slot":1},{"pokemon":"Lunatone","level":"12-14","rate":25,"slot":2},{"pokemon":"Solrock","level":"12-14","rate":20,"slot":3},{"pokemon":"Skarmory","level":"12-14","rate":20,"slot":4},{"pokemon":"Smoochum","level":"12-14","rate":20,"slot":5},{"pokemon":"Vulpix","level":"12-14","rate":15,"slot":6},{"pokemon":"Vulpix-Alola","level":"12-14","rate":15,"slot":7},{"pokemon":"Sneasel","level":"12-14","rate":10,"slot":8},{"pokemon":"Swinub","level":"12-14","rate":5,"slot":9},{"pokemon":"Crobat","level":"12-14","rate":1,"slot":10}]},{"method":"Fishing","entries":[{"pokemon":"Marill","level":"12-14","rate":30,"slot":1},{"pokemon":"Goldeen","level":"12-14","rate":25,"slot":2},{"pokemon":"Arrokuda","level":"12-14","rate":20,"slot":3},{"pokemon":"Slowpoke","level":"12-14","rate":20,"slot":4},{"pokemon":"Omanyte","level":"12-14","rate":20,"slot":5},{"pokemon":"Kabuto","level":"12-14","rate":15,"slot":6},{"pokemon":"Barbaracle","level":"12-14","rate":15,"slot":7},{"pokemon":"Tympole","level":"12-14","rate":10,"slot":8},{"pokemon":"Lapras","level":"12-14","rate":5,"slot":9},{"pokemon":"Wishiwashi","level":"12-14","rate":1,"slot":10}]},{"method":"Shaking Trees","entries":[{"pokemon":"Greedent","level":"12-14","rate":40,"slot":1},{"pokemon":"Cherrim","level":"12-14","rate":35,"slot":2},{"pokemon":"Pinsir","level":"12-14","rate":15,"slot":3},{"pokemon":"Heracross","level":"12-14","rate":9,"slot":4},{"pokemon":"Trevenant","level":"12-14","rate":1,"slot":5}]}]},
			{"id":"area-9","name":"Galar Mine","groups":[{"method":"Land","entries":[{"pokemon":"Woobat","level":"10-14","rate":20,"slot":1},{"pokemon":"Morpeko","level":"10-14","rate":17,"slot":2},{"pokemon":"Liepard","level":"10-14","rate":14,"slot":3},{"pokemon":"Thievul","level":"10-14","rate":12,"slot":4},{"pokemon":"Stunky","level":"10-14","rate":10,"slot":5},{"pokemon":"Sneasel","level":"10-14","rate":9,"slot":6},{"pokemon":"Morgrem","level":"10-14","rate":7,"slot":7},{"pokemon":"Roggenrola","level":"10-14","rate":6,"slot":8},{"pokemon":"Zubat","level":"10-14","rate":4,"slot":9},{"pokemon":"Duraludon","level":"10-14","rate":1,"slot":10}]}]},
			{"id":"area-10","name":"Route 4","groups":[{"method":"Land","entries":[{"pokemon":"Sandshrew-Alola","level":"18-20","rate":20,"slot":1},{"pokemon":"Snorunt","level":"18-20","rate":17,"slot":2},{"pokemon":"Turtonator","level":"18-20","rate":14,"slot":3},{"pokemon":"Abra","level":"18-20","rate":12,"slot":4},{"pokemon":"Pinsir","level":"18-20","rate":10,"slot":5},{"pokemon":"Heracross","level":"18-20","rate":9,"slot":6},{"pokemon":"Orbeetle","level":"18-20","rate":7,"slot":7},{"pokemon":"Carkol","level":"18-20","rate":6,"slot":8},{"pokemon":"Axew","level":"18-20","rate":4,"slot":9},{"pokemon":"Archeops","level":"18-20","rate":1,"slot":10}]},{"method":"Fishing","entries":[{"pokemon":"Marill","level":"18-20","rate":20,"slot":1},{"pokemon":"Goldeen","level":"18-20","rate":17,"slot":2},{"pokemon":"Arrokuda","level":"18-20","rate":14,"slot":3},{"pokemon":"Slowpoke","level":"18-20","rate":12,"slot":4},{"pokemon":"Omanyte","level":"18-20","rate":10,"slot":5},{"pokemon":"Kabuto","level":"18-20","rate":9,"slot":6},{"pokemon":"Barbaracle","level":"18-20","rate":7,"slot":7},{"pokemon":"Tympole","level":"18-20","rate":6,"slot":8},{"pokemon":"Lapras","level":"18-20","rate":4,"slot":9},{"pokemon":"Wishiwashi","level":"18-20","rate":1,"slot":10}]},{"method":"Shaking Trees","entries":[{"pokemon":"Cherrim","level":"18-20","rate":40,"slot":1},{"pokemon":"Greedent","level":"18-20","rate":35,"slot":2},{"pokemon":"Appletun","level":"18-20","rate":15,"slot":3},{"pokemon":"Pinsir","level":"18-20","rate":9,"slot":4},{"pokemon":"Heracross","level":"18-20","rate":1,"slot":5}]}]},
			{"id":"area-11","name":"Turrfield","groups":[{"method":"Trade","entries":[{"pokemon":"Goldeen","level":"18","rate":null,"slot":1,"requiredPokemon":"Baltoy"}]}]},
			{"id":"area-12","name":"Dappled Grove","groups":[{"method":"Land","entries":[{"pokemon":"Hoothoot","level":"21-23","rate":20,"slot":1},{"pokemon":"Nickit","level":"21-23","rate":17,"slot":2},{"pokemon":"Skwovet","level":"21-23","rate":14,"slot":3},{"pokemon":"Minccino","level":"21-23","rate":12,"slot":4},{"pokemon":"Indeedee","level":"21-23","rate":10,"slot":5},{"pokemon":"Cottonee","level":"21-23","rate":9,"slot":6},{"pokemon":"Scraggy","level":"21-23","rate":7,"slot":7},{"pokemon":"Stufful","level":"21-23","rate":6,"slot":8},{"pokemon":"Budew","level":"21-23","rate":4,"slot":9},{"pokemon":"Decidueye","level":"21-23","rate":1,"slot":10}]},{"method":"Shaking Trees","entries":[{"pokemon":"Caterpie","level":"21-23","rate":40,"slot":1},{"pokemon":"Cherubi","level":"21-23","rate":35,"slot":2},{"pokemon":"Combee","level":"21-23","rate":15,"slot":3},{"pokemon":"Blipbug","level":"21-23","rate":9,"slot":4},{"pokemon":"Rillaboom","level":"21-23","rate":1,"slot":5}]},{"method":"Overcast","entries":[{"pokemon":"Woobat","level":"21-23","rate":6,"slot":8},{"pokemon":"Drapion","level":"21-23","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Rain","entries":[{"pokemon":"Wingull","level":"21-23","rate":6,"slot":8},{"pokemon":"Lotad","level":"21-23","rate":4,"slot":9},{"pokemon":"Politoed","level":"21-23","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Thunderstorm","entries":[{"pokemon":"Joltik","level":"21-23","rate":6,"slot":8},{"pokemon":"Yamper","level":"21-23","rate":4,"slot":9},{"pokemon":"Toxtricity","level":"21-23","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Intense Sun","entries":[{"pokemon":"Oddish","level":"21-23","rate":6,"slot":8},{"pokemon":"Vulpix","level":"21-23","rate":4,"slot":9},{"pokemon":"Arcanine","level":"21-23","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Snow","entries":[{"pokemon":"Sneasel","level":"21-23","rate":6,"slot":8},{"pokemon":"Cryogonal","level":"21-23","rate":4,"slot":9},{"pokemon":"Mr. Rime","level":"21-23","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Snowstorm","entries":[{"pokemon":"Cubchoo","level":"21-23","rate":6,"slot":8},{"pokemon":"Swinub","level":"21-23","rate":4,"slot":9},{"pokemon":"Vanilluxe","level":"21-23","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Sandstorm","entries":[{"pokemon":"Silicobra","level":"21-23","rate":6,"slot":8},{"pokemon":"Roggenrola","level":"21-23","rate":4,"slot":9},{"pokemon":"Krookodile","level":"21-23","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Heavy Fog","entries":[{"pokemon":"Gastly","level":"21-23","rate":6,"slot":8},{"pokemon":"Litwick","level":"21-23","rate":4,"slot":9},{"pokemon":"Dusknoir","level":"21-23","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]}]},
			{"id":"area-13","name":"Watchtower Ruins","groups":[{"method":"Land","entries":[{"pokemon":"Meowth-Galar","level":"21-23","rate":20,"slot":1},{"pokemon":"Falinks","level":"21-23","rate":17,"slot":2},{"pokemon":"Klefki","level":"21-23","rate":14,"slot":3},{"pokemon":"Trubbish","level":"21-23","rate":12,"slot":4},{"pokemon":"Yamask-Galar","level":"21-23","rate":10,"slot":5},{"pokemon":"Ferroseed","level":"21-23","rate":9,"slot":6},{"pokemon":"Pancham","level":"21-23","rate":7,"slot":7},{"pokemon":"Honedge","level":"21-23","rate":6,"slot":8},{"pokemon":"Onix","level":"21-23","rate":4,"slot":9},{"pokemon":"Aggron","level":"21-23","rate":1,"slot":10}]},{"method":"Shaking Trees","entries":[{"pokemon":"Morelull","level":"21-23","rate":40,"slot":1},{"pokemon":"Cutiefly","level":"21-23","rate":35,"slot":2},{"pokemon":"Applin","level":"21-23","rate":15,"slot":3},{"pokemon":"Oranguru","level":"21-23","rate":9,"slot":4},{"pokemon":"Tangrowth","level":"21-23","rate":1,"slot":5}]},{"method":"Overcast","entries":[{"pokemon":"Natu","level":"21-23","rate":6,"slot":8},{"pokemon":"Vullaby","level":"21-23","rate":4,"slot":9},{"pokemon":"Umbreon","level":"21-23","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Rain","entries":[{"pokemon":"Frillish","level":"21-23","rate":6,"slot":8},{"pokemon":"Croagunk","level":"21-23","rate":4,"slot":9},{"pokemon":"Inteleon","level":"21-23","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Thunderstorm","entries":[{"pokemon":"Joltik","level":"21-23","rate":6,"slot":8},{"pokemon":"Shinx","level":"21-23","rate":4,"slot":9},{"pokemon":"Electivire","level":"21-23","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Intense Sun","entries":[{"pokemon":"Salandit","level":"21-23","rate":6,"slot":8},{"pokemon":"Fletchling","level":"21-23","rate":4,"slot":9},{"pokemon":"Arcanine","level":"21-23","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Snow","entries":[{"pokemon":"Snom","level":"21-23","rate":6,"slot":8},{"pokemon":"Cryogonal","level":"21-23","rate":4,"slot":9},{"pokemon":"Aurorus","level":"21-23","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Snowstorm","entries":[{"pokemon":"Snover","level":"21-23","rate":6,"slot":8},{"pokemon":"Cubchoo","level":"21-23","rate":4,"slot":9},{"pokemon":"Walrein","level":"21-23","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Sandstorm","entries":[{"pokemon":"Drilbur","level":"21-23","rate":6,"slot":8},{"pokemon":"Roggenrola","level":"21-23","rate":4,"slot":9},{"pokemon":"Rhyperior","level":"21-23","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Heavy Fog","entries":[{"pokemon":"Sableye","level":"21-23","rate":6,"slot":8},{"pokemon":"Slowpoke","level":"21-23","rate":4,"slot":9},{"pokemon":"Polteageist","level":"21-23","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]}]},
			{"id":"area-14","name":"Route 5","groups":[{"method":"Land","entries":[{"pokemon":"Galvantula","level":"20-23","rate":20,"slot":1},{"pokemon":"Manectric","level":"20-23","rate":17,"slot":2},{"pokemon":"Gastrodon-East","level":"20-23","rate":14,"slot":3},{"pokemon":"Ferrothorn","level":"20-23","rate":12,"slot":4},{"pokemon":"Vileplume","level":"20-23","rate":10,"slot":5},{"pokemon":"Boltund","level":"20-23","rate":9,"slot":6},{"pokemon":"Roserade","level":"20-23","rate":7,"slot":7},{"pokemon":"Rotom-Mow","level":"20-23","rate":6,"slot":8},{"pokemon":"Rotom-Wash","level":"20-23","rate":4,"slot":9},{"pokemon":"Jolteon","level":"20-23","rate":1,"slot":10}]},{"method":"Fishing","entries":[{"pokemon":"Quagsire","level":"20-23","rate":20,"slot":1},{"pokemon":"Lanturn","level":"20-23","rate":17,"slot":2},{"pokemon":"Whiscash","level":"20-23","rate":14,"slot":3},{"pokemon":"Stunfisk","level":"20-23","rate":12,"slot":4},{"pokemon":"Ludicolo","level":"20-23","rate":10,"slot":5},{"pokemon":"Mantine","level":"20-23","rate":9,"slot":6},{"pokemon":"Cradily","level":"20-23","rate":7,"slot":7},{"pokemon":"Seismitoad","level":"20-23","rate":6,"slot":8},{"pokemon":"Dhelmise","level":"20-23","rate":4,"slot":9},{"pokemon":"Milotic","level":"20-23","rate":1,"slot":10}]},{"method":"Shaking Trees","entries":[{"pokemon":"Trevenant","level":"20-23","rate":40,"slot":1},{"pokemon":"Shiftry","level":"20-23","rate":35,"slot":2},{"pokemon":"Appletun","level":"20-23","rate":15,"slot":3},{"pokemon":"Vikavolt","level":"20-23","rate":9,"slot":4},{"pokemon":"Rillaboom","level":"20-23","rate":1,"slot":5}]},{"method":"Gift","entries":[{"pokemon":"Togepi","level":"1","rate":null,"slot":1}]}]},
			{"id":"area-15","name":"Town of Hulbury","groups":[{"method":"Fishing","entries":[{"pokemon":"Qwilfish","level":"20-23","rate":20,"slot":1},{"pokemon":"Frillish","level":"20-23","rate":17,"slot":2},{"pokemon":"Croagunk","level":"20-23","rate":14,"slot":3},{"pokemon":"Mareanie","level":"20-23","rate":12,"slot":4},{"pokemon":"Omanyte","level":"20-23","rate":10,"slot":5},{"pokemon":"Tentacool","level":"20-23","rate":9,"slot":6},{"pokemon":"Wartortle","level":"20-23","rate":7,"slot":7},{"pokemon":"Lapras","level":"20-23","rate":6,"slot":8},{"pokemon":"Feebas","level":"20-23","rate":4,"slot":9},{"pokemon":"Wishiwashi","level":"20-23","rate":1,"slot":10}]},{"method":"Trade","entries":[{"pokemon":"Nidoran♀","level":"10","rate":null,"slot":1,"requiredPokemon":"Elgyem"}]}]},
			{"id":"area-16","name":"West Lake Axewell","groups":[{"method":"Land","entries":[{"pokemon":"Emolga","level":"26-29","rate":20,"slot":1},{"pokemon":"Cramorant","level":"26-29","rate":17,"slot":2},{"pokemon":"Palossand","level":"26-29","rate":14,"slot":3},{"pokemon":"Heliolisk","level":"26-29","rate":12,"slot":4},{"pokemon":"Vileplume","level":"26-29","rate":10,"slot":5},{"pokemon":"Altaria","level":"26-29","rate":9,"slot":6},{"pokemon":"Toxel","level":"26-29","rate":7,"slot":7},{"pokemon":"Braviary","level":"26-29","rate":6,"slot":8},{"pokemon":"Mandibuzz","level":"26-29","rate":4,"slot":9},{"pokemon":"Electivire","level":"26-29","rate":1,"slot":10}]},{"method":"Fishing","entries":[{"pokemon":"Basculin","level":"26-29","rate":20,"slot":1},{"pokemon":"Stunfisk","level":"26-29","rate":17,"slot":2},{"pokemon":"Gastrodon","level":"26-29","rate":14,"slot":3},{"pokemon":"Slowpoke","level":"26-29","rate":12,"slot":4},{"pokemon":"Poliwag","level":"26-29","rate":10,"slot":5},{"pokemon":"Barbaracle","level":"26-29","rate":9,"slot":6},{"pokemon":"Tentacool","level":"26-29","rate":7,"slot":7},{"pokemon":"Starmie","level":"26-29","rate":6,"slot":8},{"pokemon":"Cloyster","level":"26-29","rate":4,"slot":9},{"pokemon":"Blastoise","level":"26-29","rate":1,"slot":10}]},{"method":"Overcast","entries":[{"pokemon":"Xatu","level":"26-29","rate":6,"slot":8},{"pokemon":"Skuntank","level":"26-29","rate":4,"slot":9},{"pokemon":"Espeon","level":"26-29","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Rain","entries":[{"pokemon":"Ludicolo","level":"26-29","rate":6,"slot":8},{"pokemon":"Vaporeon","level":"26-29","rate":4,"slot":9},{"pokemon":"Primarina","level":"26-29","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Thunderstorm","entries":[{"pokemon":"Morpeko","level":"26-29","rate":6,"slot":8},{"pokemon":"Raichu-Alola","level":"26-29","rate":4,"slot":9},{"pokemon":"Vikavolt","level":"26-29","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Intense Sun","entries":[{"pokemon":"Ninetales","level":"26-29","rate":6,"slot":8},{"pokemon":"Centiskorch","level":"26-29","rate":4,"slot":9},{"pokemon":"Flareon","level":"26-29","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Snow","entries":[{"pokemon":"Eiscue","level":"26-29","rate":6,"slot":8},{"pokemon":"Rotom-Frost","level":"26-29","rate":4,"slot":9},{"pokemon":"Aurorus","level":"26-29","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Snowstorm","entries":[{"pokemon":"Sandslash-Alola","level":"26-29","rate":6,"slot":8},{"pokemon":"Glaceon","level":"26-29","rate":4,"slot":9},{"pokemon":"Walrein","level":"26-29","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Sandstorm","entries":[{"pokemon":"Dugtrio-Alola","level":"26-29","rate":6,"slot":8},{"pokemon":"Sandaconda","level":"26-29","rate":4,"slot":9},{"pokemon":"Krookodile","level":"26-29","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Heavy Fog","entries":[{"pokemon":"Indeedee-F","level":"26-29","rate":6,"slot":8},{"pokemon":"Malamar","level":"26-29","rate":4,"slot":9},{"pokemon":"Drifblim","level":"26-29","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]}]},
			{"id":"area-17","name":"North Lake Miloch","groups":[{"method":"Land","entries":[{"pokemon":"Araquanid","level":"26-29","rate":20,"slot":1},{"pokemon":"Amoonguss","level":"26-29","rate":17,"slot":2},{"pokemon":"Skarmory","level":"26-29","rate":14,"slot":3},{"pokemon":"Lurantis","level":"26-29","rate":12,"slot":4},{"pokemon":"Mudsdale","level":"26-29","rate":10,"slot":5},{"pokemon":"Gallade","level":"26-29","rate":9,"slot":6},{"pokemon":"Rotom-Wash","level":"26-29","rate":7,"slot":7},{"pokemon":"Tyrantrum","level":"26-29","rate":6,"slot":8},{"pokemon":"Leafeon","level":"26-29","rate":4,"slot":9},{"pokemon":"Volcarona","level":"26-29","rate":1,"slot":10}]},{"method":"Fishing","entries":[{"pokemon":"Pincurchin","level":"26-29","rate":20,"slot":1},{"pokemon":"Basculin-Blue-Striped","level":"26-29","rate":17,"slot":2},{"pokemon":"Lanturn","level":"26-29","rate":14,"slot":3},{"pokemon":"Gastrodon-East","level":"26-29","rate":12,"slot":4},{"pokemon":"Octillery","level":"26-29","rate":10,"slot":5},{"pokemon":"Frillish","level":"26-29","rate":9,"slot":6},{"pokemon":"Croagunk","level":"26-29","rate":7,"slot":7},{"pokemon":"Wailord","level":"26-29","rate":6,"slot":8},{"pokemon":"Shuckle","level":"26-29","rate":4,"slot":9},{"pokemon":"Primarina","level":"26-29","rate":1,"slot":10}]},{"method":"Shaking Trees","entries":[{"pokemon":"Whimsicott","level":"26-29","rate":40,"slot":1},{"pokemon":"Leafeon","level":"26-29","rate":35,"slot":2},{"pokemon":"Rillaboom","level":"26-29","rate":15,"slot":3},{"pokemon":"Tangrowth","level":"26-29","rate":9,"slot":4},{"pokemon":"Blissey","level":"26-29","rate":1,"slot":5}]},{"method":"Overcast","entries":[{"pokemon":"Gothitelle","level":"26-29","rate":6,"slot":8},{"pokemon":"Drifblim","level":"26-29","rate":4,"slot":9},{"pokemon":"Espeon","level":"26-29","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Rain","entries":[{"pokemon":"Sharpedo","level":"26-29","rate":6,"slot":8},{"pokemon":"Poliwrath","level":"26-29","rate":4,"slot":9},{"pokemon":"Inteleon","level":"26-29","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Thunderstorm","entries":[{"pokemon":"Dedenne","level":"26-29","rate":6,"slot":8},{"pokemon":"Raichu-Alola","level":"26-29","rate":4,"slot":9},{"pokemon":"Arctozolt","level":"26-29","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Intense Sun","entries":[{"pokemon":"Maractus","level":"26-29","rate":6,"slot":8},{"pokemon":"Heatmor","level":"26-29","rate":4,"slot":9},{"pokemon":"Magmortar","level":"26-29","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Snow","entries":[{"pokemon":"Jynx","level":"26-29","rate":6,"slot":8},{"pokemon":"Glalie","level":"26-29","rate":4,"slot":9},{"pokemon":"Abomasnow","level":"26-29","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Snowstorm","entries":[{"pokemon":"Cryogonal","level":"26-29","rate":6,"slot":8},{"pokemon":"Mr. Rime","level":"26-29","rate":4,"slot":9},{"pokemon":"Vanillish","level":"26-29","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Sandstorm","entries":[{"pokemon":"Dugtrio-Alola","level":"26-29","rate":6,"slot":8},{"pokemon":"Hippopotas","level":"26-29","rate":4,"slot":9},{"pokemon":"Rhyhorn","level":"26-29","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Heavy Fog","entries":[{"pokemon":"Spiritomb","level":"26-29","rate":6,"slot":8},{"pokemon":"Musharna","level":"26-29","rate":4,"slot":9},{"pokemon":"Umbreon","level":"26-29","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]}]},
			{"id":"area-18","name":"Galar Mine No. 2","groups":[{"method":"Land","entries":[{"pokemon":"Swoobat","level":"26-29","rate":20,"slot":1},{"pokemon":"Golurk","level":"26-29","rate":17,"slot":2},{"pokemon":"Durant","level":"26-29","rate":14,"slot":3},{"pokemon":"Lycanroc-Midnight","level":"26-29","rate":12,"slot":4},{"pokemon":"Sigilyph","level":"26-29","rate":10,"slot":5},{"pokemon":"Exploud","level":"26-29","rate":9,"slot":6},{"pokemon":"Carbink","level":"26-29","rate":7,"slot":7},{"pokemon":"Excadrill","level":"26-29","rate":6,"slot":8},{"pokemon":"Coalossal","level":"26-29","rate":4,"slot":9},{"pokemon":"Magnezone","level":"26-29","rate":1,"slot":10}]},{"method":"Fishing","entries":[{"pokemon":"Sharpedo","level":"26-29","rate":20,"slot":1},{"pokemon":"Whiscash","level":"26-29","rate":17,"slot":2},{"pokemon":"Stunfisk-Galar","level":"26-29","rate":14,"slot":3},{"pokemon":"Gastrodon","level":"26-29","rate":12,"slot":4},{"pokemon":"Octillery","level":"26-29","rate":10,"slot":5},{"pokemon":"Slowbro-Galar","level":"26-29","rate":9,"slot":6},{"pokemon":"Shuckle","level":"26-29","rate":7,"slot":7},{"pokemon":"Tentacruel","level":"26-29","rate":6,"slot":8},{"pokemon":"Starmie","level":"26-29","rate":4,"slot":9},{"pokemon":"Kingdra","level":"26-29","rate":1,"slot":10}]},{"method":"Static","entries":[{"pokemon":"Toxicroak","level":"26","rate":null,"slot":1}]}]},
			{"id":"area-19","name":"Motostoke Outskirts","groups":[{"method":"Land","entries":[{"pokemon":"Falinks","level":"26-29","rate":20,"slot":1},{"pokemon":"Garbodor","level":"26-29","rate":17,"slot":2},{"pokemon":"Skuntank","level":"26-29","rate":14,"slot":3},{"pokemon":"Heatmor","level":"26-29","rate":12,"slot":4},{"pokemon":"Exploud","level":"26-29","rate":10,"slot":5},{"pokemon":"Weezing-Galar","level":"26-29","rate":9,"slot":6},{"pokemon":"Nidoqueen","level":"26-29","rate":7,"slot":7},{"pokemon":"Nidoking","level":"26-29","rate":6,"slot":8},{"pokemon":"Aggron","level":"26-29","rate":4,"slot":9},{"pokemon":"Magmortar","level":"26-29","rate":1,"slot":10}]}]},
			{"id":"area-20","name":"Motostoke Stadium","groups":[{"method":"Static","entries":[{"pokemon":"Baltoy","level":"26","rate":null,"slot":1},{"pokemon":"Trapinch","level":"26","rate":null,"slot":2},{"pokemon":"Hippopotas","level":"26","rate":null,"slot":3}]}]},
			{"id":"area-21","name":"Motostoke Riverbank","groups":[{"method":"Land","entries":[{"pokemon":"Perrserker","level":"30-34","rate":20,"slot":1},{"pokemon":"Liepard","level":"30-34","rate":17,"slot":2},{"pokemon":"Garbodor","level":"30-34","rate":14,"slot":3},{"pokemon":"Skuntank","level":"30-34","rate":12,"slot":4},{"pokemon":"Toxicroak","level":"30-34","rate":10,"slot":5},{"pokemon":"Accelgor","level":"30-34","rate":9,"slot":6},{"pokemon":"Escavalier","level":"30-34","rate":7,"slot":7},{"pokemon":"Pangoro","level":"30-34","rate":6,"slot":8},{"pokemon":"Conkeldurr","level":"30-34","rate":4,"slot":9},{"pokemon":"Duraludon","level":"30-34","rate":1,"slot":10}]},{"method":"Fishing","entries":[{"pokemon":"Basculin-Blue-Striped","level":"30-34","rate":20,"slot":1},{"pokemon":"Gastrodon","level":"30-34","rate":17,"slot":2},{"pokemon":"Malamar","level":"30-34","rate":14,"slot":3},{"pokemon":"Mantine","level":"30-34","rate":12,"slot":4},{"pokemon":"Slowbro-Galar","level":"30-34","rate":10,"slot":5},{"pokemon":"Slowking-Galar","level":"30-34","rate":9,"slot":6},{"pokemon":"Politoed","level":"30-34","rate":7,"slot":7},{"pokemon":"Barbaracle","level":"30-34","rate":6,"slot":8},{"pokemon":"Golduck","level":"30-34","rate":4,"slot":9},{"pokemon":"Inteleon","level":"30-34","rate":1,"slot":10}]},{"method":"Shaking Trees","entries":[{"pokemon":"Shiftry","level":"30-34","rate":40,"slot":1},{"pokemon":"Oranguru","level":"30-34","rate":35,"slot":2},{"pokemon":"Passimian","level":"30-34","rate":15,"slot":3},{"pokemon":"Bewear","level":"30-34","rate":9,"slot":4},{"pokemon":"Exeggcute","level":"30-34","rate":1,"slot":5}]},{"method":"Overcast","entries":[{"pokemon":"Weezing-Galar","level":"30-34","rate":6,"slot":8},{"pokemon":"Drifblim","level":"30-34","rate":4,"slot":9},{"pokemon":"Obstagoon","level":"30-34","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Rain","entries":[{"pokemon":"Poliwrath","level":"30-34","rate":6,"slot":8},{"pokemon":"Vaporeon","level":"30-34","rate":4,"slot":9},{"pokemon":"Inteleon","level":"30-34","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Thunderstorm","entries":[{"pokemon":"Toxtricity-Low-Key","level":"30-34","rate":6,"slot":8},{"pokemon":"Rotom-Wash","level":"30-34","rate":4,"slot":9},{"pokemon":"Electivire","level":"30-34","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Intense Sun","entries":[{"pokemon":"Centiskorch","level":"30-34","rate":6,"slot":8},{"pokemon":"Flareon","level":"30-34","rate":4,"slot":9},{"pokemon":"Magmortar","level":"30-34","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Snow","entries":[{"pokemon":"Darmanitan-Galar","level":"30-34","rate":6,"slot":8},{"pokemon":"Rotom-Frost","level":"30-34","rate":4,"slot":9},{"pokemon":"Aurorus","level":"30-34","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Snowstorm","entries":[{"pokemon":"Eiscue","level":"30-34","rate":6,"slot":8},{"pokemon":"Glalie","level":"30-34","rate":4,"slot":9},{"pokemon":"Glaceon","level":"30-34","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Sandstorm","entries":[{"pokemon":"Dugtrio-Alola","level":"30-34","rate":6,"slot":8},{"pokemon":"Sandaconda","level":"30-34","rate":4,"slot":9},{"pokemon":"Rhyperior","level":"30-34","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Heavy Fog","entries":[{"pokemon":"Sableye","level":"30-34","rate":6,"slot":8},{"pokemon":"Spiritomb","level":"30-34","rate":4,"slot":9},{"pokemon":"Polteageist","level":"30-34","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]}]},
			{"id":"area-22","name":"Bridge Field","groups":[{"method":"Land","entries":[{"pokemon":"Sudowoodo","level":"30-34","rate":20,"slot":1},{"pokemon":"Sawk","level":"30-34","rate":17,"slot":2},{"pokemon":"Throh","level":"30-34","rate":14,"slot":3},{"pokemon":"Unfezant","level":"30-34","rate":12,"slot":4},{"pokemon":"Tauros","level":"30-34","rate":10,"slot":5},{"pokemon":"Miltank","level":"30-34","rate":9,"slot":6},{"pokemon":"Stoutland","level":"30-34","rate":7,"slot":7},{"pokemon":"Mudsdale","level":"30-34","rate":6,"slot":8},{"pokemon":"Sirfetch’d","level":"30-34","rate":4,"slot":9},{"pokemon":"Rhyperior","level":"30-34","rate":1,"slot":10}]},{"method":"Fishing","entries":[{"pokemon":"Pelipper","level":"30-34","rate":20,"slot":1},{"pokemon":"Sharpedo","level":"30-34","rate":17,"slot":2},{"pokemon":"Stunfisk-Galar","level":"30-34","rate":14,"slot":3},{"pokemon":"Relicanth","level":"30-34","rate":12,"slot":4},{"pokemon":"Slowking","level":"30-34","rate":10,"slot":5},{"pokemon":"Carracosta","level":"30-34","rate":9,"slot":6},{"pokemon":"Armaldo","level":"30-34","rate":7,"slot":7},{"pokemon":"Arctovish","level":"30-34","rate":6,"slot":8},{"pokemon":"Poliwrath","level":"30-34","rate":4,"slot":9},{"pokemon":"Kingdra","level":"30-34","rate":1,"slot":10}]},{"method":"Shaking Trees","entries":[{"pokemon":"Audino","level":"30-34","rate":40,"slot":1},{"pokemon":"Lilligant","level":"30-34","rate":35,"slot":2},{"pokemon":"Comfey","level":"30-34","rate":15,"slot":3},{"pokemon":"Bellossom","level":"30-34","rate":9,"slot":4},{"pokemon":"Tsareena","level":"30-34","rate":1,"slot":5}]},{"method":"Overcast","entries":[{"pokemon":"Indeedee-F","level":"30-34","rate":6,"slot":8},{"pokemon":"Gothitelle","level":"30-34","rate":4,"slot":9},{"pokemon":"Sylveon","level":"30-34","rate":1,"slot":10}],"sharedSlots":[1,2,3,5,6,7]},{"method":"Rain","entries":[{"pokemon":"Sharpedo","level":"30-34","rate":6,"slot":8},{"pokemon":"Poliwrath","level":"30-34","rate":4,"slot":9},{"pokemon":"Kingdra","level":"30-34","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Thunderstorm","entries":[{"pokemon":"Raichu","level":"30-34","rate":6,"slot":8},{"pokemon":"Rotom-Fan","level":"30-34","rate":4,"slot":9},{"pokemon":"Jolteon","level":"30-34","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Intense Sun","entries":[{"pokemon":"Maractus","level":"30-34","rate":6,"slot":8},{"pokemon":"Rotom-Heat","level":"30-34","rate":4,"slot":9},{"pokemon":"Centiskorch","level":"30-34","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Snow","entries":[{"pokemon":"Glalie","level":"30-34","rate":6,"slot":8},{"pokemon":"Rotom-Frost","level":"30-34","rate":4,"slot":9},{"pokemon":"Aurorus","level":"30-34","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Snowstorm","entries":[{"pokemon":"Ninetales-Alola","level":"30-34","rate":6,"slot":8},{"pokemon":"Avalugg","level":"30-34","rate":4,"slot":9},{"pokemon":"Walrein","level":"30-34","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Sandstorm","entries":[{"pokemon":"Solrock","level":"30-34","rate":6,"slot":8},{"pokemon":"Steelix","level":"30-34","rate":4,"slot":9},{"pokemon":"Tyrantrum","level":"30-34","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Heavy Fog","entries":[{"pokemon":"Musharna","level":"30-34","rate":6,"slot":8},{"pokemon":"Gourgeist","level":"30-34","rate":4,"slot":9},{"pokemon":"Dusknoir","level":"30-34","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]}]},
			{"id":"area-23","name":"Route 6","groups":[{"method":"Land","entries":[{"pokemon":"Sudowoodo","level":"30-34","rate":20,"slot":1},{"pokemon":"Diggersby","level":"30-34","rate":17,"slot":2},{"pokemon":"Marowak","level":"30-34","rate":14,"slot":3},{"pokemon":"Maractus","level":"30-34","rate":12,"slot":4},{"pokemon":"Torkoal","level":"30-34","rate":10,"slot":5},{"pokemon":"Crustle","level":"30-34","rate":9,"slot":6},{"pokemon":"Turtonator","level":"30-34","rate":7,"slot":7},{"pokemon":"Scrafty","level":"30-34","rate":6,"slot":8},{"pokemon":"Claydol","level":"30-34","rate":4,"slot":9},{"pokemon":"Flygon","level":"30-34","rate":1,"slot":10}]},{"method":"Fishing","entries":[{"pokemon":"Quagsire","level":"30-34","rate":20,"slot":1},{"pokemon":"Qwilfish","level":"30-34","rate":17,"slot":2},{"pokemon":"Crawdaunt","level":"30-34","rate":14,"slot":3},{"pokemon":"Stunfisk","level":"30-34","rate":12,"slot":4},{"pokemon":"Grapploct","level":"30-34","rate":10,"slot":5},{"pokemon":"Carracosta","level":"30-34","rate":9,"slot":6},{"pokemon":"Armaldo","level":"30-34","rate":7,"slot":7},{"pokemon":"Cradily","level":"30-34","rate":6,"slot":8},{"pokemon":"Shuckle","level":"30-34","rate":4,"slot":9},{"pokemon":"Dracovish","level":"30-34","rate":1,"slot":10}]},{"method":"Shaking Trees","entries":[{"pokemon":"Shiinotic","level":"30-34","rate":40,"slot":1},{"pokemon":"Audino","level":"30-34","rate":35,"slot":2},{"pokemon":"Oranguru","level":"30-34","rate":15,"slot":3},{"pokemon":"Passimian","level":"30-34","rate":9,"slot":4},{"pokemon":"Exeggutor-Alola","level":"30-34","rate":1,"slot":5}]}]},
			{"id":"area-24","name":"Stony Wilderness","groups":[{"method":"Land","entries":[{"pokemon":"Mawile","level":"36-39","rate":20,"slot":1},{"pokemon":"Stonjourner","level":"36-39","rate":17,"slot":2},{"pokemon":"Drapion","level":"36-39","rate":14,"slot":3},{"pokemon":"Bronzong","level":"36-39","rate":12,"slot":4},{"pokemon":"Mienshao","level":"36-39","rate":10,"slot":5},{"pokemon":"Magnezone","level":"36-39","rate":9,"slot":6},{"pokemon":"Noivern","level":"36-39","rate":7,"slot":7},{"pokemon":"Duraludon","level":"36-39","rate":6,"slot":8},{"pokemon":"Haxorus","level":"36-39","rate":4,"slot":9},{"pokemon":"Kommo-o","level":"36-39","rate":1,"slot":10}]},{"method":"Overcast","entries":[{"pokemon":"Gothitelle","level":"36-39","rate":6,"slot":8},{"pokemon":"Aegislash","level":"36-39","rate":4,"slot":9},{"pokemon":"Tyrantrum","level":"36-39","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Rain","entries":[{"pokemon":"Gastrodon-East","level":"36-39","rate":6,"slot":8},{"pokemon":"Toxapex","level":"36-39","rate":4,"slot":9},{"pokemon":"Goodra","level":"36-39","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Thunderstorm","entries":[{"pokemon":"Vikavolt","level":"36-39","rate":6,"slot":8},{"pokemon":"Rotom-Heat","level":"36-39","rate":4,"slot":9},{"pokemon":"Electivire","level":"36-39","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Intense Sun","entries":[{"pokemon":"Coalossal","level":"36-39","rate":6,"slot":8},{"pokemon":"Volcarona","level":"36-39","rate":4,"slot":9},{"pokemon":"Arcanine","level":"36-39","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Snow","entries":[{"pokemon":"Frosmoth","level":"36-39","rate":6,"slot":8},{"pokemon":"Cryogonal","level":"36-39","rate":4,"slot":9},{"pokemon":"Aurorus","level":"36-39","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Snowstorm","entries":[{"pokemon":"Avalugg","level":"36-39","rate":6,"slot":8},{"pokemon":"Walrein","level":"36-39","rate":4,"slot":9},{"pokemon":"Mamoswine","level":"36-39","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Sandstorm","entries":[{"pokemon":"Gigalith","level":"36-39","rate":6,"slot":8},{"pokemon":"Rhyperior","level":"36-39","rate":4,"slot":9},{"pokemon":"Tyranitar","level":"36-39","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Heavy Fog","entries":[{"pokemon":"Runerigus","level":"36-39","rate":6,"slot":8},{"pokemon":"Chandelure","level":"36-39","rate":4,"slot":9},{"pokemon":"Dragapult","level":"36-39","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]}]},
			{"id":"area-25","name":"Giant's Mirror","groups":[{"method":"Land","entries":[{"pokemon":"Espurr","level":"35-39","rate":20,"slot":1},{"pokemon":"Mimikyu","level":"35-39","rate":17,"slot":2},{"pokemon":"Cofagrigus","level":"35-39","rate":14,"slot":3},{"pokemon":"Beheeyem","level":"35-39","rate":12,"slot":4},{"pokemon":"Reuniclus","level":"35-39","rate":10,"slot":5},{"pokemon":"Gourgeist-Small","level":"35-39","rate":9,"slot":6},{"pokemon":"Alakazam","level":"35-39","rate":7,"slot":7},{"pokemon":"Rapidash-Galar","level":"35-39","rate":6,"slot":8},{"pokemon":"Hatterene","level":"35-39","rate":4,"slot":9},{"pokemon":"Dragapult","level":"35-39","rate":1,"slot":10}]},{"method":"Fishing","entries":[{"pokemon":"Pyukumuku","level":"35-39","rate":20,"slot":1},{"pokemon":"Slowpoke","level":"35-39","rate":14,"slot":3},{"pokemon":"Dragalge","level":"35-39","rate":12,"slot":4},{"pokemon":"Clawitzer","level":"35-39","rate":10,"slot":5},{"pokemon":"Cursola","level":"35-39","rate":9,"slot":6},{"pokemon":"Starmie","level":"35-39","rate":7,"slot":7},{"pokemon":"Primarina","level":"35-39","rate":6,"slot":8},{"pokemon":"Milotic","level":"35-39","rate":4,"slot":9},{"pokemon":"Kingdra","level":"35-39","rate":1,"slot":10}]},{"method":"Shaking Trees","entries":[{"pokemon":"Wigglytuff","level":"35-39","rate":40,"slot":1},{"pokemon":"Persian","level":"35-39","rate":35,"slot":2},{"pokemon":"Klefki","level":"35-39","rate":15,"slot":3},{"pokemon":"Oranguru","level":"35-39","rate":9,"slot":4},{"pokemon":"Exeggcute","level":"35-39","rate":1,"slot":5}]},{"method":"Overcast","entries":[{"pokemon":"Zoroark","level":"35-39","rate":6,"slot":8},{"pokemon":"Grimmsnarl","level":"35-39","rate":4,"slot":9},{"pokemon":"Umbreon","level":"35-39","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Rain","entries":[{"pokemon":"Ludicolo","level":"35-39","rate":6,"slot":8},{"pokemon":"Politoed","level":"35-39","rate":4,"slot":9},{"pokemon":"Goodra","level":"35-39","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Thunderstorm","entries":[{"pokemon":"Morpeko","level":"35-39","rate":6,"slot":8},{"pokemon":"Rotom-Fan","level":"35-39","rate":4,"slot":9},{"pokemon":"Electivire","level":"35-39","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Intense Sun","entries":[{"pokemon":"Salazzle","level":"35-39","rate":6,"slot":8},{"pokemon":"Ninetales","level":"35-39","rate":4,"slot":9},{"pokemon":"Chandelure","level":"35-39","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Snow","entries":[{"pokemon":"Frosmoth","level":"35-39","rate":6,"slot":8},{"pokemon":"Cryogonal","level":"35-39","rate":4,"slot":9},{"pokemon":"Aurorus","level":"35-39","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Snowstorm","entries":[{"pokemon":"Glaceon","level":"35-39","rate":6,"slot":8},{"pokemon":"Mamoswine","level":"35-39","rate":4,"slot":9},{"pokemon":"Vanilluxe","level":"35-39","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Sandstorm","entries":[{"pokemon":"Runerigus","level":"35-39","rate":6,"slot":8},{"pokemon":"Claydol","level":"35-39","rate":4,"slot":9},{"pokemon":"Tyrantrum","level":"35-39","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Heavy Fog","entries":[{"pokemon":"Cofagrigus","level":"35-39","rate":6,"slot":8},{"pokemon":"Gourgeist-Small","level":"35-39","rate":4,"slot":9},{"pokemon":"Hydreigon","level":"35-39","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]}]},
			{"id":"area-26","name":"Glimwood Tangle","groups":[{"method":"Land","entries":[{"pokemon":"Ribombee","level":"35-39","rate":20,"slot":1},{"pokemon":"Mimikyu","level":"35-39","rate":17,"slot":2},{"pokemon":"Grimmsnarl","level":"35-39","rate":14,"slot":3},{"pokemon":"Hatterene","level":"35-39","rate":12,"slot":4},{"pokemon":"Chandelure","level":"35-39","rate":10,"slot":5},{"pokemon":"Aegislash","level":"35-39","rate":9,"slot":6},{"pokemon":"Togekiss","level":"35-39","rate":7,"slot":7},{"pokemon":"Volcarona","level":"35-39","rate":6,"slot":8},{"pokemon":"Hydreigon","level":"35-39","rate":4,"slot":9},{"pokemon":"Dragapult","level":"35-39","rate":1,"slot":10}]}]},
			{"id":"area-27","name":"Dusty Bowl","groups":[{"method":"Land","entries":[{"pokemon":"Mawile","level":"41-44","rate":20,"slot":1},{"pokemon":"Torkoal","level":"41-44","rate":17,"slot":2},{"pokemon":"Druddigon","level":"41-44","rate":14,"slot":3},{"pokemon":"Bisharp","level":"41-44","rate":12,"slot":4},{"pokemon":"Bouffalant","level":"41-44","rate":10,"slot":5},{"pokemon":"Mienshao","level":"41-44","rate":9,"slot":6},{"pokemon":"Klinklang","level":"41-44","rate":7,"slot":7},{"pokemon":"Flygon","level":"41-44","rate":6,"slot":8},{"pokemon":"Snorlax","level":"41-44","rate":4,"slot":9},{"pokemon":"Salamence","level":"41-44","rate":1,"slot":10}]},{"method":"Fishing","entries":[{"pokemon":"Qwilfish","level":"41-44","rate":20,"slot":1},{"pokemon":"Crawdaunt","level":"41-44","rate":17,"slot":2},{"pokemon":"Stunfisk-Galar","level":"41-44","rate":14,"slot":3},{"pokemon":"Grapploct","level":"41-44","rate":12,"slot":4},{"pokemon":"Carracosta","level":"41-44","rate":10,"slot":5},{"pokemon":"Armaldo","level":"41-44","rate":9,"slot":6},{"pokemon":"Cradily","level":"41-44","rate":7,"slot":7},{"pokemon":"Dracovish","level":"41-44","rate":6,"slot":8},{"pokemon":"Cloyster","level":"41-44","rate":4,"slot":9},{"pokemon":"Blastoise","level":"41-44","rate":1,"slot":10}]},{"method":"Overcast","entries":[{"pokemon":"Zoroark","level":"41-44","rate":6,"slot":8},{"pokemon":"Grimmsnarl","level":"41-44","rate":4,"slot":9},{"pokemon":"Hydreigon","level":"41-44","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Rain","entries":[{"pokemon":"Cramorant","level":"41-44","rate":6,"slot":8},{"pokemon":"Grapploct","level":"41-44","rate":4,"slot":9},{"pokemon":"Goodra","level":"41-44","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Thunderstorm","entries":[{"pokemon":"Dracozolt","level":"41-44","rate":6,"slot":8},{"pokemon":"Rotom-Mow","level":"41-44","rate":4,"slot":9},{"pokemon":"Electivire","level":"41-44","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Intense Sun","entries":[{"pokemon":"Heatmor","level":"41-44","rate":6,"slot":8},{"pokemon":"Magmortar","level":"41-44","rate":4,"slot":9},{"pokemon":"Volcarona","level":"41-44","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Snow","entries":[{"pokemon":"Darmanitan-Galar","level":"41-44","rate":6,"slot":8},{"pokemon":"Beartic","level":"41-44","rate":4,"slot":9},{"pokemon":"Mr. Rime","level":"41-44","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Snowstorm","entries":[{"pokemon":"Glalie","level":"41-44","rate":6,"slot":8},{"pokemon":"Mamoswine","level":"41-44","rate":4,"slot":9},{"pokemon":"Vanilluxe","level":"41-44","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Sandstorm","entries":[{"pokemon":"Dugtrio-Alola","level":"41-44","rate":6,"slot":8},{"pokemon":"Stonjourner","level":"41-44","rate":4,"slot":9},{"pokemon":"Tyrantrum","level":"41-44","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Heavy Fog","entries":[{"pokemon":"Salazzle","level":"41-44","rate":6,"slot":8},{"pokemon":"Spiritomb","level":"41-44","rate":4,"slot":9},{"pokemon":"Dragapult","level":"41-44","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]}]},
			{"id":"area-28","name":"Hammerlocke Hills","groups":[{"method":"Land","entries":[{"pokemon":"Espurr","level":"41-44","rate":20,"slot":1},{"pokemon":"Rapidash-Galar","level":"41-44","rate":17,"slot":2},{"pokemon":"Grimmsnarl","level":"41-44","rate":14,"slot":3},{"pokemon":"Hatterene","level":"41-44","rate":12,"slot":4},{"pokemon":"Klinklang","level":"41-44","rate":10,"slot":5},{"pokemon":"Lucario","level":"41-44","rate":9,"slot":6},{"pokemon":"Noivern","level":"41-44","rate":7,"slot":7},{"pokemon":"Togekiss","level":"41-44","rate":6,"slot":8},{"pokemon":"Dragonite","level":"41-44","rate":4,"slot":9},{"pokemon":"Kommo-o","level":"41-44","rate":1,"slot":10}]},{"method":"Shaking Trees","entries":[{"pokemon":"Copperajah","level":"41-44","rate":40,"slot":1},{"pokemon":"Lickilicky","level":"41-44","rate":35,"slot":2},{"pokemon":"Exeggcute","level":"41-44","rate":15,"slot":3},{"pokemon":"Blissey","level":"41-44","rate":9,"slot":4},{"pokemon":"Audino","level":"41-44","rate":1,"slot":5}]},{"method":"Overcast","entries":[{"pokemon":"Gardevoir","level":"41-44","rate":6,"slot":8},{"pokemon":"Sylveon","level":"41-44","rate":4,"slot":9},{"pokemon":"Umbreon","level":"41-44","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Rain","entries":[{"pokemon":"Inteleon","level":"41-44","rate":6,"slot":8},{"pokemon":"Golisopod","level":"41-44","rate":4,"slot":9},{"pokemon":"Kingdra","level":"41-44","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Thunderstorm","entries":[{"pokemon":"Rotom-Fan","level":"41-44","rate":6,"slot":8},{"pokemon":"Luxray","level":"41-44","rate":4,"slot":9},{"pokemon":"Jolteon","level":"41-44","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Intense Sun","entries":[{"pokemon":"Ninetales","level":"41-44","rate":6,"slot":8},{"pokemon":"Flareon","level":"41-44","rate":4,"slot":9},{"pokemon":"Incineroar","level":"41-44","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Snow","entries":[{"pokemon":"Ninetales-Alola","level":"41-44","rate":6,"slot":8},{"pokemon":"Avalugg","level":"41-44","rate":4,"slot":9},{"pokemon":"Aurorus","level":"41-44","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Snowstorm","entries":[{"pokemon":"Cryogonal","level":"41-44","rate":6,"slot":8},{"pokemon":"Rotom-Frost","level":"41-44","rate":4,"slot":9},{"pokemon":"Glaceon","level":"41-44","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Sandstorm","entries":[{"pokemon":"Dugtrio","level":"41-44","rate":6,"slot":8},{"pokemon":"Rhyperior","level":"41-44","rate":4,"slot":9},{"pokemon":"Tyranitar","level":"41-44","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Heavy Fog","entries":[{"pokemon":"Spiritomb","level":"41-44","rate":6,"slot":8},{"pokemon":"Zoroark","level":"41-44","rate":4,"slot":9},{"pokemon":"Dusknoir","level":"41-44","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]}]},
			{"id":"area-29","name":"Route 7","groups":[{"method":"Land","entries":[{"pokemon":"Throh","level":"43-44","rate":20,"slot":1},{"pokemon":"Sawk","level":"43-44","rate":17,"slot":2},{"pokemon":"Durant","level":"43-44","rate":14,"slot":3},{"pokemon":"Lycanroc","level":"43-44","rate":12,"slot":4},{"pokemon":"Dubwool","level":"43-44","rate":10,"slot":5},{"pokemon":"Hawlucha","level":"43-44","rate":9,"slot":6},{"pokemon":"Obstagoon","level":"43-44","rate":7,"slot":7},{"pokemon":"Crobat","level":"43-44","rate":6,"slot":8},{"pokemon":"Archeops","level":"43-44","rate":4,"slot":9},{"pokemon":"Dragonite","level":"43-44","rate":1,"slot":10}]},{"method":"Shaking Trees","entries":[{"pokemon":"Wigglytuff","level":"41-44","rate":40,"slot":1},{"pokemon":"Persian","level":"41-44","rate":35,"slot":2},{"pokemon":"Lopunny","level":"41-44","rate":15,"slot":3},{"pokemon":"Leafeon","level":"41-44","rate":9,"slot":4},{"pokemon":"Porygon-Z","level":"41-44","rate":1,"slot":5}]}]},
			{"id":"area-30","name":"Route 8","groups":[{"method":"Land","entries":[{"pokemon":"Marowak","level":"41-44","rate":20,"slot":1},{"pokemon":"Trevenant","level":"41-44","rate":17,"slot":2},{"pokemon":"Palossand","level":"41-44","rate":14,"slot":3},{"pokemon":"Golurk","level":"41-44","rate":12,"slot":4},{"pokemon":"Runerigus","level":"41-44","rate":10,"slot":5},{"pokemon":"Scolipede","level":"41-44","rate":9,"slot":6},{"pokemon":"Crustle","level":"41-44","rate":7,"slot":7},{"pokemon":"Bisharp","level":"41-44","rate":6,"slot":8},{"pokemon":"Claydol","level":"41-44","rate":4,"slot":9},{"pokemon":"Aggron","level":"41-44","rate":1,"slot":10}]},{"method":"Static","entries":[{"pokemon":"Sandslash-K","level":"41-44","rate":null,"slot":1},{"pokemon":"Golisopod","level":"41-44","rate":null,"slot":2}]}]},
			{"id":"area-31","name":"Giant's Cap","groups":[{"method":"Land","entries":[{"pokemon":"Lycanroc-Dusk","level":"46-49","rate":20,"slot":1},{"pokemon":"Dubwool","level":"46-49","rate":17,"slot":2},{"pokemon":"Corviknight","level":"46-49","rate":14,"slot":3},{"pokemon":"Talonflame","level":"46-49","rate":12,"slot":4},{"pokemon":"Hawlucha","level":"46-49","rate":10,"slot":5},{"pokemon":"Obstagoon","level":"46-49","rate":9,"slot":6},{"pokemon":"Crobat","level":"46-49","rate":7,"slot":7},{"pokemon":"Archeops","level":"46-49","rate":6,"slot":8},{"pokemon":"Dragonite","level":"46-49","rate":4,"slot":9},{"pokemon":"Kommo-o","level":"46-49","rate":1,"slot":10}]},{"method":"Fishing","entries":[{"pokemon":"Kingler","level":"46-49","rate":20,"slot":1},{"pokemon":"Golduck","level":"46-49","rate":17,"slot":2},{"pokemon":"Wailord","level":"46-49","rate":14,"slot":3},{"pokemon":"Cursola","level":"46-49","rate":12,"slot":4},{"pokemon":"Dhelmise","level":"46-49","rate":10,"slot":5},{"pokemon":"Vaporeon","level":"46-49","rate":9,"slot":6},{"pokemon":"Lapras","level":"46-49","rate":7,"slot":7},{"pokemon":"Milotic","level":"46-49","rate":6,"slot":8},{"pokemon":"Goodra","level":"46-49","rate":4,"slot":9},{"pokemon":"Wishiwashi","level":"46-49","rate":1,"slot":10}]},{"method":"Shaking Trees","entries":[{"pokemon":"Amoonguss","level":"46-49","rate":40,"slot":1},{"pokemon":"Lurantis","level":"46-49","rate":35,"slot":2},{"pokemon":"Alakazam","level":"46-49","rate":15,"slot":3},{"pokemon":"Porygon-Z","level":"46-49","rate":9,"slot":4},{"pokemon":"Blissey","level":"46-49","rate":1,"slot":5}]},{"method":"Overcast","entries":[{"pokemon":"Wobbuffet","level":"46-49","rate":6,"slot":8},{"pokemon":"Beheeyem","level":"46-49","rate":4,"slot":9},{"pokemon":"Grimmsnarl","level":"46-49","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Rain","entries":[{"pokemon":"Cramorant","level":"46-49","rate":6,"slot":8},{"pokemon":"Grapploct","level":"46-49","rate":4,"slot":9},{"pokemon":"Golisopod","level":"46-49","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Thunderstorm","entries":[{"pokemon":"Dedenne","level":"46-49","rate":6,"slot":8},{"pokemon":"Pincurchin","level":"46-49","rate":4,"slot":9},{"pokemon":"Luxray","level":"46-49","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Intense Sun","entries":[{"pokemon":"Darmanitan","level":"46-49","rate":6,"slot":8},{"pokemon":"Heatmor","level":"46-49","rate":4,"slot":9},{"pokemon":"Incineroar","level":"46-49","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Snow","entries":[{"pokemon":"Delibird","level":"46-49","rate":6,"slot":8},{"pokemon":"Jynx","level":"46-49","rate":4,"slot":9},{"pokemon":"Abomasnow","level":"46-49","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Snowstorm","entries":[{"pokemon":"Sandslash-Alola","level":"46-49","rate":6,"slot":8},{"pokemon":"Beartic","level":"46-49","rate":4,"slot":9},{"pokemon":"Mr. Rime","level":"46-49","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Sandstorm","entries":[{"pokemon":"Sudowoodo","level":"46-49","rate":6,"slot":8},{"pokemon":"Marowak","level":"46-49","rate":4,"slot":9},{"pokemon":"Hippowdon","level":"46-49","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Heavy Fog","entries":[{"pokemon":"Persian","level":"46-49","rate":6,"slot":8},{"pokemon":"Palossand","level":"46-49","rate":4,"slot":9},{"pokemon":"Drifblim","level":"46-49","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]}]},
			{"id":"area-32","name":"Axew's Eye","groups":[{"method":"Land","entries":[{"pokemon":"Dunsparce","level":"46-49","rate":20,"slot":1},{"pokemon":"Carbink","level":"46-49","rate":17,"slot":2},{"pokemon":"Drampa","level":"46-49","rate":14,"slot":3},{"pokemon":"Altaria","level":"46-49","rate":12,"slot":4},{"pokemon":"Flygon","level":"46-49","rate":10,"slot":5},{"pokemon":"Noivern","level":"46-49","rate":9,"slot":6},{"pokemon":"Haxorus","level":"46-49","rate":7,"slot":7},{"pokemon":"Salamence","level":"46-49","rate":6,"slot":8},{"pokemon":"Kommo-o","level":"46-49","rate":4,"slot":9},{"pokemon":"Hydreigon","level":"46-49","rate":1,"slot":10}]},{"method":"Fishing","entries":[{"pokemon":"Pyukumuku","level":"46-49","rate":20,"slot":1},{"pokemon":"Relicanth","level":"46-49","rate":17,"slot":2},{"pokemon":"Dragalge","level":"46-49","rate":14,"slot":3},{"pokemon":"Clawitzer","level":"46-49","rate":12,"slot":4},{"pokemon":"Toxapex","level":"46-49","rate":10,"slot":5},{"pokemon":"Dracovish","level":"46-49","rate":9,"slot":6},{"pokemon":"Arctovish","level":"46-49","rate":7,"slot":7},{"pokemon":"Golisopod","level":"46-49","rate":6,"slot":8},{"pokemon":"Primarina","level":"46-49","rate":4,"slot":9},{"pokemon":"Wishiwashi","level":"46-49","rate":1,"slot":10}]},{"method":"Shaking Trees","entries":[{"pokemon":"Emolga","level":"46-49","rate":40,"slot":1},{"pokemon":"Fletchling","level":"46-49","rate":35,"slot":2},{"pokemon":"Flapple","level":"46-49","rate":15,"slot":3},{"pokemon":"Appletun","level":"46-49","rate":9,"slot":4},{"pokemon":"Blissey","level":"46-49","rate":1,"slot":5}]},{"method":"Overcast","entries":[{"pokemon":"Malamar","level":"46-49","rate":6,"slot":8},{"pokemon":"Orbeetle","level":"46-49","rate":4,"slot":9},{"pokemon":"Umbreon","level":"46-49","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Rain","entries":[{"pokemon":"Mantine","level":"46-49","rate":6,"slot":8},{"pokemon":"Vaporeon","level":"46-49","rate":4,"slot":9},{"pokemon":"Goodra","level":"46-49","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Thunderstorm","entries":[{"pokemon":"Pincurchin","level":"46-49","rate":6,"slot":8},{"pokemon":"Rotom","level":"46-49","rate":4,"slot":9},{"pokemon":"Luxray","level":"46-49","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Intense Sun","entries":[{"pokemon":"Ninetales","level":"46-49","rate":6,"slot":8},{"pokemon":"Flareon","level":"46-49","rate":4,"slot":9},{"pokemon":"Incineroar","level":"46-49","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Snow","entries":[{"pokemon":"Eiscue","level":"46-49","rate":6,"slot":8},{"pokemon":"Froslass","level":"46-49","rate":4,"slot":9},{"pokemon":"Glaceon","level":"46-49","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Snowstorm","entries":[{"pokemon":"Frosmoth","level":"46-49","rate":6,"slot":8},{"pokemon":"Avalugg","level":"46-49","rate":4,"slot":9},{"pokemon":"Vanilluxe","level":"46-49","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Sandstorm","entries":[{"pokemon":"Sandslash","level":"46-49","rate":6,"slot":8},{"pokemon":"Krookodile","level":"46-49","rate":4,"slot":9},{"pokemon":"Hippowdon","level":"46-49","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Heavy Fog","entries":[{"pokemon":"Marowak-Alola","level":"46-49","rate":6,"slot":8},{"pokemon":"Cofagrigus","level":"46-49","rate":4,"slot":9},{"pokemon":"Zoroark","level":"46-49","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]}]},
			{"id":"area-33","name":"Route 9","groups":[{"method":"Land","entries":[{"pokemon":"Delibird","level":"46-49","rate":20,"slot":1},{"pokemon":"Eiscue","level":"46-49","rate":17,"slot":2},{"pokemon":"Darmanitan-Galar","level":"46-49","rate":14,"slot":3},{"pokemon":"Froslass","level":"46-49","rate":12,"slot":4},{"pokemon":"Abomasnow","level":"46-49","rate":10,"slot":5},{"pokemon":"Beartic","level":"46-49","rate":9,"slot":6},{"pokemon":"Weavile","level":"46-49","rate":7,"slot":7},{"pokemon":"Mr. Rime","level":"46-49","rate":6,"slot":8},{"pokemon":"Mamoswine","level":"46-49","rate":4,"slot":9},{"pokemon":"Vanilluxe","level":"46-49","rate":1,"slot":10}]},{"method":"Fishing","entries":[{"pokemon":"Pyukumuku","level":"46-49","rate":20,"slot":1},{"pokemon":"Pincurchin","level":"46-49","rate":17,"slot":2},{"pokemon":"Kingler","level":"46-49","rate":14,"slot":3},{"pokemon":"Cramorant","level":"46-49","rate":12,"slot":4},{"pokemon":"Grapploct","level":"46-49","rate":10,"slot":5},{"pokemon":"Relicanth","level":"46-49","rate":9,"slot":6},{"pokemon":"Dragalge","level":"46-49","rate":7,"slot":7},{"pokemon":"Clawitzer","level":"46-49","rate":6,"slot":8},{"pokemon":"Wailord","level":"46-49","rate":4,"slot":9},{"pokemon":"Lapras","level":"46-49","rate":1,"slot":10}]},{"method":"Shaking Trees","entries":[{"pokemon":"Wigglytuff","level":"46-49","rate":40,"slot":1},{"pokemon":"Persian","level":"46-49","rate":35,"slot":2},{"pokemon":"Lopunny","level":"46-49","rate":15,"slot":3},{"pokemon":"Alakazam","level":"46-49","rate":9,"slot":4},{"pokemon":"Leafeon","level":"46-49","rate":1,"slot":5}]},{"method":"Static","entries":[{"pokemon":"Sharpedo","level":"46-49","rate":null,"slot":1},{"pokemon":"Mantine","level":"46-49","rate":null,"slot":2},{"pokemon":"Golduck","level":"46-49","rate":null,"slot":3},{"pokemon":"Vaporeon","level":"46-49","rate":null,"slot":4},{"pokemon":"Golisopod","level":"46-49","rate":null,"slot":5}]}]},
			{"id":"area-34","name":"South Lake Miloch","groups":[{"method":"Land","entries":[{"pokemon":"Eldegoss","level":"51-54","rate":20,"slot":1},{"pokemon":"Aromatisse","level":"51-54","rate":17,"slot":2},{"pokemon":"Slurpuff","level":"51-54","rate":14,"slot":3},{"pokemon":"Lopunny","level":"51-54","rate":12,"slot":4},{"pokemon":"Miltank","level":"51-54","rate":10,"slot":5},{"pokemon":"Alcremie","level":"51-54","rate":9,"slot":6},{"pokemon":"Rapidash","level":"51-54","rate":7,"slot":7},{"pokemon":"Tsareena","level":"51-54","rate":6,"slot":8},{"pokemon":"Venusaur","level":"51-54","rate":4,"slot":9},{"pokemon":"Snorlax","level":"51-54","rate":1,"slot":10}]},{"method":"Fishing","entries":[{"pokemon":"Drednaw","level":"51-54","rate":20,"slot":1},{"pokemon":"Slowking","level":"51-54","rate":17,"slot":2},{"pokemon":"Arctovish","level":"51-54","rate":14,"slot":3},{"pokemon":"Poliwrath","level":"51-54","rate":12,"slot":4},{"pokemon":"Tentacruel","level":"51-54","rate":10,"slot":5},{"pokemon":"Dhelmise","level":"51-54","rate":9,"slot":6},{"pokemon":"Vaporeon","level":"51-54","rate":7,"slot":7},{"pokemon":"Cloyster","level":"51-54","rate":6,"slot":8},{"pokemon":"Blastoise","level":"51-54","rate":4,"slot":9},{"pokemon":"Kingdra","level":"51-54","rate":1,"slot":10}]},{"method":"Overcast","entries":[{"pokemon":"Vespiquen","level":"51-54","rate":6,"slot":8},{"pokemon":"Drifblim","level":"51-54","rate":4,"slot":9},{"pokemon":"Umbreon","level":"51-54","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Rain","entries":[{"pokemon":"Araquanid","level":"51-54","rate":6,"slot":8},{"pokemon":"Rotom-Wash","level":"51-54","rate":4,"slot":9},{"pokemon":"Inteleon","level":"51-54","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Thunderstorm","entries":[{"pokemon":"Toxtricity","level":"51-54","rate":6,"slot":8},{"pokemon":"Rotom-Mow","level":"51-54","rate":4,"slot":9},{"pokemon":"Jolteon","level":"51-54","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Intense Sun","entries":[{"pokemon":"Darmanitan","level":"51-54","rate":6,"slot":8},{"pokemon":"Flareon","level":"51-54","rate":4,"slot":9},{"pokemon":"Cinderace","level":"51-54","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Snow","entries":[{"pokemon":"Delibird","level":"51-54","rate":6,"slot":8},{"pokemon":"Ninetales-Alola","level":"51-54","rate":4,"slot":9},{"pokemon":"Rotom-Frost","level":"51-54","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Snowstorm","entries":[{"pokemon":"Darmanitan-Galar","level":"51-54","rate":6,"slot":8},{"pokemon":"Arctozolt","level":"51-54","rate":4,"slot":9},{"pokemon":"Glaceon","level":"51-54","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Sandstorm","entries":[{"pokemon":"Dugtrio-Alola","level":"51-54","rate":6,"slot":8},{"pokemon":"Hippowdon","level":"51-54","rate":4,"slot":9},{"pokemon":"Tyranitar","level":"51-54","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Heavy Fog","entries":[{"pokemon":"Ditto","level":"51-54","rate":6,"slot":8},{"pokemon":"Gourgeist-Large","level":"51-54","rate":4,"slot":9},{"pokemon":"Polteageist","level":"51-54","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]}]},
			{"id":"area-35","name":"Giant's Seat","groups":[{"method":"Land","entries":[{"pokemon":"Turtonator","level":"51-54","rate":20,"slot":1},{"pokemon":"Lycanroc","level":"51-54","rate":17,"slot":2},{"pokemon":"Copperajah","level":"51-54","rate":14,"slot":3},{"pokemon":"Machamp","level":"51-54","rate":12,"slot":4},{"pokemon":"Nidoqueen","level":"51-54","rate":10,"slot":5},{"pokemon":"Nidoking","level":"51-54","rate":9,"slot":6},{"pokemon":"Steelix","level":"51-54","rate":7,"slot":7},{"pokemon":"Coalossal","level":"51-54","rate":6,"slot":8},{"pokemon":"Gigalith","level":"51-54","rate":4,"slot":9},{"pokemon":"Aggron","level":"51-54","rate":1,"slot":10}]},{"method":"Fishing","entries":[{"pokemon":"Rotom","level":"51-54","rate":20,"slot":1},{"pokemon":"Drampa","level":"51-54","rate":17,"slot":2},{"pokemon":"Slowbro","level":"51-54","rate":14,"slot":3},{"pokemon":"Slowbro-Galar","level":"51-54","rate":12,"slot":4},{"pokemon":"Cradily","level":"51-54","rate":10,"slot":5},{"pokemon":"Kabutops","level":"51-54","rate":9,"slot":6},{"pokemon":"Toxapex","level":"51-54","rate":7,"slot":7},{"pokemon":"Arctozolt","level":"51-54","rate":6,"slot":8},{"pokemon":"Shuckle","level":"51-54","rate":4,"slot":9},{"pokemon":"Goodra","level":"51-54","rate":1,"slot":10}]},{"method":"Shaking Trees","entries":[{"pokemon":"Ninjask","level":"51-54","rate":40,"slot":1},{"pokemon":"Appletun","level":"51-54","rate":35,"slot":2},{"pokemon":"Passimian","level":"51-54","rate":15,"slot":3},{"pokemon":"Exeggutor-Alola","level":"51-54","rate":9,"slot":4},{"pokemon":"Tangrowth","level":"51-54","rate":1,"slot":5}]},{"method":"Overcast","entries":[{"pokemon":"Lycanroc-Midnight","level":"51-54","rate":6,"slot":8},{"pokemon":"Corvisquire","level":"51-54","rate":4,"slot":9},{"pokemon":"Umbreon","level":"51-54","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Rain","entries":[{"pokemon":"Politoed","level":"51-54","rate":6,"slot":8},{"pokemon":"Inteleon","level":"51-54","rate":4,"slot":9},{"pokemon":"Goodra","level":"51-54","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Thunderstorm","entries":[{"pokemon":"Vikavolt","level":"51-54","rate":6,"slot":8},{"pokemon":"Dracozolt","level":"51-54","rate":4,"slot":9},{"pokemon":"Rotom-Heat","level":"51-54","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Intense Sun","entries":[{"pokemon":"Marowak-Alola","level":"51-54","rate":6,"slot":8},{"pokemon":"Turtonator","level":"51-54","rate":4,"slot":9},{"pokemon":"Incineroar","level":"51-54","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Snow","entries":[{"pokemon":"Frosmoth","level":"51-54","rate":6,"slot":8},{"pokemon":"Cryogonal","level":"51-54","rate":4,"slot":9},{"pokemon":"Aurorus","level":"51-54","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Snowstorm","entries":[{"pokemon":"Arctozolt","level":"51-54","rate":6,"slot":8},{"pokemon":"Mamoswine","level":"51-54","rate":4,"slot":9},{"pokemon":"Darmanitan-Galar","level":"51-54","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Sandstorm","entries":[{"pokemon":"Excadrill","level":"51-54","rate":6,"slot":8},{"pokemon":"Tyranitar","level":"51-54","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7,9]},{"method":"Heavy Fog","entries":[{"pokemon":"Spiritomb","level":"51-54","rate":6,"slot":8},{"pokemon":"Gourgeist-Super","level":"51-54","rate":4,"slot":9},{"pokemon":"Polteageist","level":"51-54","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]}]},
			{"id":"area-36","name":"Lake of Outrage","groups":[{"method":"Land","entries":[{"pokemon":"Druddigon","level":"56-59","rate":20,"slot":1},{"pokemon":"Turtonator","level":"56-59","rate":17,"slot":2},{"pokemon":"Aegislash","level":"56-59","rate":14,"slot":3},{"pokemon":"Tyrantrum","level":"56-59","rate":12,"slot":4},{"pokemon":"Duraludon","level":"56-59","rate":10,"slot":5},{"pokemon":"Rhyperior","level":"56-59","rate":9,"slot":6},{"pokemon":"Haxorus","level":"56-59","rate":7,"slot":7},{"pokemon":"Volcarona","level":"56-59","rate":6,"slot":8},{"pokemon":"Kommo-o","level":"56-59","rate":4,"slot":9},{"pokemon":"Melmetal","level":"56-59","rate":1,"slot":10}]},{"method":"Fishing","entries":[{"pokemon":"Sharpedo","level":"56-59","rate":20,"slot":1},{"pokemon":"Jellicent","level":"56-59","rate":17,"slot":2},{"pokemon":"Relicanth","level":"56-59","rate":14,"slot":3},{"pokemon":"Dragalge","level":"56-59","rate":12,"slot":4},{"pokemon":"Barbaracle","level":"56-59","rate":10,"slot":5},{"pokemon":"Lapras","level":"56-59","rate":9,"slot":6},{"pokemon":"Kingdra","level":"56-59","rate":7,"slot":7},{"pokemon":"Milotic","level":"56-59","rate":6,"slot":8},{"pokemon":"Goodra","level":"56-59","rate":4,"slot":9},{"pokemon":"Tapu Fini","level":"56-59","rate":1,"slot":10}]},{"method":"Shaking Trees","entries":[{"pokemon":"Trevenant","level":"56-59","rate":40,"slot":1},{"pokemon":"Flapple","level":"56-59","rate":35,"slot":2},{"pokemon":"Appletun","level":"56-59","rate":15,"slot":3},{"pokemon":"Tangrowth","level":"56-59","rate":9,"slot":4},{"pokemon":"Virizion","level":"56-59","rate":1,"slot":5}]},{"method":"Overcast","entries":[{"pokemon":"Corviknight","level":"56-59","rate":6,"slot":8},{"pokemon":"Hydreigon","level":"56-59","rate":4,"slot":9},{"pokemon":"Cresselia","level":"56-59","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Rain","entries":[{"pokemon":"Dracovish","level":"56-59","rate":6,"slot":8},{"pokemon":"Goodra","level":"56-59","rate":4,"slot":9},{"pokemon":"Suicune","level":"56-59","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Thunderstorm","entries":[{"pokemon":"Electivire","level":"56-59","rate":6,"slot":8},{"pokemon":"Dragapult","level":"56-59","rate":4,"slot":9},{"pokemon":"Zekrom","level":"56-59","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Intense Sun","entries":[{"pokemon":"Salamence","level":"56-59","rate":4,"slot":9},{"pokemon":"Solgaleo","level":"56-59","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7,8]},{"method":"Snow","entries":[{"pokemon":"Aurorus","level":"56-59","rate":6,"slot":8},{"pokemon":"Dragonite","level":"56-59","rate":4,"slot":9},{"pokemon":"Kyurem-Black","level":"56-59","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Snowstorm","entries":[{"pokemon":"Mamoswine","level":"56-59","rate":6,"slot":8},{"pokemon":"Tyranitar","level":"56-59","rate":4,"slot":9},{"pokemon":"Regigigas","level":"56-59","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]},{"method":"Sandstorm","entries":[{"pokemon":"Excadrill","level":"56-59","rate":6,"slot":8},{"pokemon":"Landorus-Therian","level":"56-59","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7,9]},{"method":"Heavy Fog","entries":[{"pokemon":"Spiritomb","level":"56-59","rate":6,"slot":8},{"pokemon":"Dragapult","level":"56-59","rate":4,"slot":9},{"pokemon":"Lunala","level":"56-59","rate":1,"slot":10}],"sharedSlots":[1,2,3,4,5,6,7]}]},
			{"id":"area-37","name":"Route 10","groups":[{"method":"Land","entries":[{"pokemon":"Hydreigon","level":"56-59","rate":20,"slot":1},{"pokemon":"Dragapult","level":"56-59","rate":17,"slot":2},{"pokemon":"Absol","level":"56-59","rate":14,"slot":3},{"pokemon":"Sceptile","level":"56-59","rate":12,"slot":4},{"pokemon":"Aerodactyl","level":"56-59","rate":10,"slot":5},{"pokemon":"Garchomp","level":"56-59","rate":9,"slot":6},{"pokemon":"Blaziken","level":"56-59","rate":7,"slot":7},{"pokemon":"Swampert","level":"56-59","rate":6,"slot":8},{"pokemon":"Gyarados","level":"56-59","rate":4,"slot":9},{"pokemon":"Metagross","level":"56-59","rate":1,"slot":10}]}]},
			{"id":"area-38","name":"Slumbering Weald","groups":[{"method":"Land","entries":[{"pokemon":"Landorus","level":"56-59","rate":20,"slot":1},{"pokemon":"Thundurus","level":"56-59","rate":17,"slot":2},{"pokemon":"Tornadus","level":"56-59","rate":14,"slot":3},{"pokemon":"Necrozma","level":"56-59","rate":12,"slot":4},{"pokemon":"Magearna","level":"56-59","rate":10,"slot":5},{"pokemon":"Genesect","level":"56-59","rate":9,"slot":6},{"pokemon":"Lunala","level":"56-59","rate":7,"slot":7},{"pokemon":"Solgaleo","level":"56-59","rate":6,"slot":8},{"pokemon":"Necrozma-Dawn-Wings","level":"56-59","rate":4,"slot":9},{"pokemon":"Necrozma-Dusk-Mane","level":"56-59","rate":1,"slot":10}]}]},
			{"id":"area-39","name":"Tower Summit","groups":[{"method":"Static","entries":[{"pokemon":"Eternatus","level":"60","rate":null,"slot":1}]}]}
		],
		"trainers": [
			{"id":"trainer-1","calculatorTrainerId":"trainer-1","models":["swsh-youngster"],"name":"Youngster Jake [Single]","split":"Hop 1","levelCap":"10","location":"Route 2","team":[{"pokemon":"Skwovet","level":7,"gender":"Female","item":"Oran Berry","ability":"Cheek Pouch","nature":"Docile","moves":["Stuff Cheeks","Tail Whip","Tackle","Bite"],"stats":"HP: 28        Sp.Atk: 10\nAtk: 13       Sp.Def: 10\nDef: 13       Speed: 9"}]},
			{"id":"trainer-2","calculatorTrainerId":"trainer-2","models":["swsh-lass"],"name":"Lass Lauren [Single]","split":"Hop 1","levelCap":"10","location":"Route 2","team":[{"pokemon":"Chewtle","level":8,"gender":"Male","item":"None","ability":"Strong Jaw","nature":"Brave","moves":["Protect","Tackle","Bite"],"stats":"HP: 27        Sp.Atk: 12\nAtk: 18       Sp.Def: 12\nDef: 14       Speed: 10"}]},
			{"id":"trainer-3","calculatorTrainerId":"trainer-3","models":["swsh-youngster"],"name":"Youngster Benjamin [Double]","split":"Hop 1","levelCap":"10","location":"Route 2","team":[{"pokemon":"Blipbug","level":9,"gender":"Male","item":"None","ability":"Compound Eyes","nature":"Quiet","moves":["Infestation","Recover","Sticky Web","Supersonic"],"stats":"HP: 24        Sp.Atk: 13\nAtk: 9       Sp.Def: 14\nDef: 9       Speed: 13"},{"pokemon":"Nickit","level":9,"gender":"Male","item":"None","ability":"Stakeout","nature":"Modest","moves":["Fake Tears","Howl","Swift","Snarl"],"stats":"HP: 27        Sp.Atk: 17\nAtk: 9       Sp.Def: 14\nDef: 10       Speed: 16"}]},
			{"id":"trainer-4","calculatorTrainerId":"trainer-4","models":["swsh-hop"],"name":"Hop 1 Grass Starter [Single]","split":"Hop 1","levelCap":"10","location":"Route 2","team":[{"pokemon":"Wooloo","level":10,"gender":"Female","item":"Oran Berry","ability":"Fluffy","nature":"Adamant","moves":["Thunder Wave","Attract","Counter","Headbutt"],"stats":"HP: 31        Sp.Atk: 14\nAtk: 17       Sp.Def: 17\nDef: 19       Speed: 17"},{"pokemon":"Rookidee","level":10,"gender":"Male","item":"Lum Berry","ability":"Unnerve","nature":"Jolly","moves":["Roost","Peck","Hone Claws"],"stats":"HP: 30        Sp.Atk: 12\nAtk: 17       Sp.Def: 15\nDef: 15       Speed: 20"},{"pokemon":"Popplio","level":10,"gender":"Female","item":"Mystic Water","ability":"Liquid Voice","nature":"Modest","moves":["Pound","Disarming Voice","Whirlpool"],"stats":"HP: 33        Sp.Atk: 23\nAtk: 16       Sp.Def: 19\nDef: 18       Speed: 16"}]},
			{"id":"trainer-5","calculatorTrainerId":"trainer-5","models":["swsh-hop"],"name":"Hop 1 Fire Starter [Single]","split":"Hop 1","levelCap":"10","location":"Route 2","team":[{"pokemon":"Wooloo","level":10,"gender":"Female","item":"Oran Berry","ability":"Fluffy","nature":"Adamant","moves":["Thunder Wave","Attract","Counter","Headbutt"],"stats":"HP: 31        Sp.Atk: 14\nAtk: 17       Sp.Def: 17\nDef: 19       Speed: 17"},{"pokemon":"Rookidee","level":10,"gender":"Male","item":"Lum Berry","ability":"Unnerve","nature":"Jolly","moves":["Roost","Peck","Hone Claws"],"stats":"HP: 30        Sp.Atk: 12\nAtk: 17       Sp.Def: 15\nDef: 15       Speed: 20"},{"pokemon":"Turtwig","level":10,"gender":"Male","item":"Miracle Seed","ability":"Shell Armor","nature":"Adamant","moves":["Tackle","Growl","Vine Whip","Leech Seed"],"stats":"HP: 34        Sp.Atk: 15\nAtk: 23       Sp.Def: 19\nDef: 20       Speed: 14"}]},
			{"id":"trainer-6","calculatorTrainerId":"trainer-6","models":["swsh-hop"],"name":"Hop 1 Water Starter [Single]","split":"Hop 1","levelCap":"10","location":"Route 2","team":[{"pokemon":"Wooloo","level":10,"gender":"Female","item":"Oran Berry","ability":"Fluffy","nature":"Adamant","moves":["Thunder Wave","Attract","Counter","Headbutt"],"stats":"HP: 31        Sp.Atk: 14\nAtk: 17       Sp.Def: 17\nDef: 19       Speed: 17"},{"pokemon":"Rookidee","level":10,"gender":"Male","item":"Lum Berry","ability":"Unnerve","nature":"Jolly","moves":["Roost","Peck","Hone Claws"],"stats":"HP: 30        Sp.Atk: 12\nAtk: 17       Sp.Def: 15\nDef: 15       Speed: 20"},{"pokemon":"Cyndaquil","level":10,"gender":"Male","item":"Charcoal","ability":"Flash Fire","nature":"Mild","moves":["Tackle","Growl","Ember","Fire Spin"],"stats":"HP: 30        Sp.Atk: 22\nAtk: 18       Sp.Def: 18\nDef: 14       Speed: 21"}]},
			{"id":"trainer-7","calculatorTrainerId":"trainer-7","models":["swsh-team-yell-male"],"name":"Team Yell Grunt 1 Motostoke [Single]","split":"Hop 2","levelCap":"16","location":"Motostoke Hotel","team":[{"pokemon":"Zigzagoon","level":14,"gender":"Female","item":"Oran Berry","ability":"Gluttony","nature":"Adamant","moves":["Swagger","Lick","Charm","Extreme Speed"],"stats":"HP: 38        Sp.Atk: 15\nAtk: 18       Sp.Def: 20\nDef: 20       Speed: 26","sprite":"zigzagoon-galar"}]},
			{"id":"trainer-8","calculatorTrainerId":"trainer-8","models":["swsh-team-yell-female"],"name":"Team Yell Grunt 2 Motostoke [Single]","split":"Hop 2","levelCap":"16","location":"Motostoke Hotel","team":[{"pokemon":"Nickit","level":14,"gender":"Female","item":"Oran Berry","ability":"Unburden","nature":"Hasty","moves":["Torment","Taunt","Snarl","Quick Attack"],"stats":"HP: 39        Sp.Atk: 22\nAtk: 17       Sp.Def: 23\nDef: 15       Speed: 25"}]},
			{"id":"trainer-9","calculatorTrainerId":"trainer-9","models":["swsh-team-yell-male","swsh-team-yell-female"],"name":"Team Yell Grunts Motostoke [Double]","split":"Hop 2","levelCap":"16","location":"Motostoke Hotel","team":[{"pokemon":"Zigzagoon","level":15,"gender":"Male","item":"Black Glasses","ability":"Quick Feet","nature":"Hasty","moves":["Charm","Tickle","Extreme Speed","Helping Hand"],"stats":"HP: 41        Sp.Atk: 18\nAtk: 18       Sp.Def: 21\nDef: 18       Speed: 29","sprite":"zigzagoon-galar"},{"pokemon":"Nickit","level":15,"gender":"Female","item":"Oran Berry","ability":"Unburden","nature":"Rash","moves":["Nasty Plot","Attract","Snarl","Mud Shot"],"stats":"HP: 41        Sp.Atk: 25\nAtk: 18       Sp.Def: 22\nDef: 18       Speed: 24"}]},
			{"id":"trainer-10","calculatorTrainerId":"trainer-10","models":["swsh-hop"],"name":"Hop 2 Grass Starter [Single]","split":"Hop 2","levelCap":"16","location":"Bridge to Route 3","team":[{"pokemon":"Wooloo","level":16,"gender":"Female","item":"Leftovers","ability":"Fluffy","nature":"Adamant","moves":["Thunder Wave","Attract","Headbutt","Payback"],"stats":"HP: 44        Sp.Atk: 19\nAtk: 24       Sp.Def: 24\nDef: 27       Speed: 25"},{"pokemon":"Rookidee","level":16,"gender":"Male","item":"Power Herb","ability":"Unnerve","nature":"Jolly","moves":["Roost","Sand Attack","Thief","Sky Attack"],"stats":"HP: 43        Sp.Atk: 18\nAtk: 25       Sp.Def: 21\nDef: 21       Speed: 30"},{"pokemon":"Pincurchin","level":16,"gender":"Male","item":"Terrain Extender","ability":"Electric Surge","nature":"Bold","moves":["Electric Terrain","Recover","Assurance","Rising Voltage"],"stats":"HP: 46        Sp.Atk: 39\nAtk: 37       Sp.Def: 37\nDef: 44       Speed: 14"},{"pokemon":"Wingull","level":16,"gender":"Female","item":"Damp Rock","ability":"Drizzle","nature":"Bold","moves":["Aqua Ring","Tailwind","Hurricane","Surf"],"stats":"HP: 43        Sp.Atk: 27\nAtk: 17       Sp.Def: 19\nDef: 20       Speed: 37"},{"pokemon":"Munchlax","level":16,"gender":"Male","item":"Berry Juice","ability":"Thick Fat","nature":"Adamant","moves":["Curse","Recycle","Fire Punch","Body Slam"],"stats":"HP: 74        Sp.Atk: 19\nAtk: 40       Sp.Def: 37\nDef: 22       Speed: 11"},{"pokemon":"Drizzile","level":16,"gender":"Male","item":"Scope Lens","ability":"Sniper","nature":"Modest","moves":["Rain Dance","Double Team","Mud Shot","Muddy Water"],"stats":"HP: 51        Sp.Atk: 44\nAtk: 26       Sp.Def: 27\nDef: 27       Speed: 38"}]},
			{"id":"trainer-11","calculatorTrainerId":"trainer-11","models":["swsh-hop"],"name":"Hop 2 Fire Starter [Single]","split":"Hop 2","levelCap":"16","location":"Bridge to Route 3","team":[{"pokemon":"Wooloo","level":16,"gender":"Female","item":"Leftovers","ability":"Fluffy","nature":"Adamant","moves":["Thunder Wave","Attract","Headbutt","Payback"],"stats":"HP: 44        Sp.Atk: 19\nAtk: 24       Sp.Def: 24\nDef: 27       Speed: 25"},{"pokemon":"Rookidee","level":16,"gender":"Male","item":"Power Herb","ability":"Unnerve","nature":"Jolly","moves":["Roost","Sand Attack","Thief","Sky Attack"],"stats":"HP: 43        Sp.Atk: 18\nAtk: 25       Sp.Def: 21\nDef: 21       Speed: 30"},{"pokemon":"Pincurchin","level":16,"gender":"Male","item":"Terrain Extender","ability":"Electric Surge","nature":"Bold","moves":["Electric Terrain","Recover","Assurance","Rising Voltage"],"stats":"HP: 46        Sp.Atk: 39\nAtk: 37       Sp.Def: 37\nDef: 44       Speed: 14"},{"pokemon":"Amaura","level":16,"gender":"Female","item":"Icy Rock","ability":"Snow Warning","nature":"Timid","moves":["Aurora Veil","Toxic","Blizzard","Thunderbolt"],"stats":"HP: 55        Sp.Atk: 31\nAtk: 25       Sp.Def: 30\nDef: 25       Speed: 26"},{"pokemon":"Munchlax","level":16,"gender":"Male","item":"Berry Juice","ability":"Thick Fat","nature":"Adamant","moves":["Curse","Recycle","Fire Punch","Body Slam"],"stats":"HP: 74        Sp.Atk: 19\nAtk: 40       Sp.Def: 37\nDef: 22       Speed: 11"},{"pokemon":"Thwackey","level":16,"gender":"Male","item":"Grassy Seed","ability":"Grassy Surge","nature":"Jolly","moves":["Screech","Branch Poke","Drain Punch","Knock Off"],"stats":"HP: 53        Sp.Atk: 24\nAtk: 37       Sp.Def: 29\nDef: 32       Speed: 38"}]},
			{"id":"trainer-12","calculatorTrainerId":"trainer-12","models":["swsh-hop"],"name":"Hop 2 Water Starter [Single]","split":"Hop 2","levelCap":"16","location":"Bridge to Route 3","team":[{"pokemon":"Wooloo","level":16,"gender":"Female","item":"Leftovers","ability":"Fluffy","nature":"Adamant","moves":["Thunder Wave","Attract","Headbutt","Payback"],"stats":"HP: 44        Sp.Atk: 19\nAtk: 24       Sp.Def: 24\nDef: 27       Speed: 25"},{"pokemon":"Rookidee","level":16,"gender":"Male","item":"Power Herb","ability":"Unnerve","nature":"Jolly","moves":["Roost","Sand Attack","Thief","Sky Attack"],"stats":"HP: 43        Sp.Atk: 18\nAtk: 25       Sp.Def: 21\nDef: 21       Speed: 30"},{"pokemon":"Pincurchin","level":16,"gender":"Male","item":"Terrain Extender","ability":"Electric Surge","nature":"Bold","moves":["Electric Terrain","Recover","Assurance","Rising Voltage"],"stats":"HP: 46        Sp.Atk: 39\nAtk: 37       Sp.Def: 37\nDef: 44       Speed: 14"},{"pokemon":"Vulpix","level":16,"gender":"Female","item":"Heat Rock","ability":"Drought","nature":"Bold","moves":["Confuse Ray","Fire Spin","Incinerate","Extrasensory"],"stats":"HP: 43        Sp.Atk: 25\nAtk: 20       Sp.Def: 30\nDef: 24       Speed: 30"},{"pokemon":"Munchlax","level":16,"gender":"Male","item":"Berry Juice","ability":"Thick Fat","nature":"Adamant","moves":["Curse","Recycle","Fire Punch","Body Slam"],"stats":"HP: 74        Sp.Atk: 19\nAtk: 40       Sp.Def: 37\nDef: 22       Speed: 11"},{"pokemon":"Raboot","level":16,"gender":"Male","item":"Life Orb","ability":"Libero","nature":"Jolly","moves":["Bulk Up","Sucker Punch","Flame Charge","Double Kick"],"stats":"HP: 51        Sp.Atk: 24\nAtk: 37       Sp.Def: 29\nDef: 29       Speed: 44"}]},
			{"id":"trainer-13","calculatorTrainerId":"trainer-13","models":["swsh-lass"],"name":"Lass Rei [Single]","split":"Bede 1","levelCap":"20","location":"Route 3","team":[{"pokemon":"Vulpix","level":18,"gender":"Female","item":"Shuca Berry","ability":"Drought","nature":"Modest","moves":["Encore","Nasty Plot","Incinerate","Morning Sun"],"stats":"HP: 47        Sp.Atk: 30\nAtk: 22       Sp.Def: 33\nDef: 24       Speed: 33"}]},
			{"id":"trainer-14","calculatorTrainerId":"trainer-14","models":["swsh-schoolgirl"],"name":"Schoolgirl Hannah [Single]","split":"Bede 1","levelCap":"20","location":"Route 3","team":[{"pokemon":"Pancham","level":18,"gender":"Male","item":"Eviolite","ability":"Iron Fist","nature":"Adamant","moves":["Swords Dance","Drain Punch","Circle Throw","Substitute"],"stats":"HP: 57        Sp.Atk: 24\nAtk: 44       Sp.Def: 27\nDef: 32       Speed: 26"}]},
			{"id":"trainer-15","calculatorTrainerId":"trainer-15","models":["swsh-schoolboy"],"name":"Schoolboy Marvin [Double]","split":"Bede 1","levelCap":"20","location":"Route 3","team":[{"pokemon":"Roselia","level":18,"gender":"Female","item":"Big Root","ability":"Leaf Guard","nature":"Modest","moves":["Mega Drain","Ingrain","Leech Seed","Sludge"],"stats":"HP: 51        Sp.Atk: 50\nAtk: 28       Sp.Def: 39\nDef: 26       Speed: 33"},{"pokemon":"Gossifleur","level":18,"gender":"Male","item":"Leftovers","ability":"Cotton Down","nature":"Timid","moves":["Sunny Day","Pollen Puff","Leafage","Helping Hand"],"stats":"HP: 47        Sp.Atk: 24\nAtk: 21       Sp.Def: 32\nDef: 32       Speed: 15"}]},
			{"id":"trainer-16","calculatorTrainerId":"trainer-16","models":["swsh-schoolgirl"],"name":"Schoolgirl Kayleigh [Double]","split":"Bede 1","levelCap":"20","location":"Route 3","team":[{"pokemon":"Purrloin","level":18,"gender":"Female","item":"Black Glasses","ability":"Prankster","nature":"Jolly","moves":["Sucker Punch","Encore","Copycat","Play Rough"],"stats":"HP: 48        Sp.Atk: 25\nAtk: 28       Sp.Def: 23\nDef: 23       Speed: 37"},{"pokemon":"Greedent","level":18,"gender":"Male","item":"Sitrus Berry","ability":"Cheek Pouch","nature":"Brave","moves":["Belly Drum","Facade","Assurance","Fire Fang"],"stats":"HP: 76        Sp.Atk: 30\nAtk: 48       Sp.Def: 37\nDef: 44       Speed: 15"}]},
			{"id":"trainer-17","calculatorTrainerId":"trainer-17","models":["swsh-postman"],"name":"Postman Tad [Single]","split":"Bede 1","levelCap":"20","location":"Route 3","team":[{"pokemon":"Delibird","level":19,"gender":"Male","item":"Wide Lens","ability":"Hustle","nature":"Adamant","moves":["Aerial Ace","Ice Shard","Toxic","Power-Up Punch"],"stats":"HP: 51        Sp.Atk: 31\nAtk: 34       Sp.Def: 27\nDef: 27       Speed: 39"}]},
			{"id":"trainer-18","calculatorTrainerId":"trainer-18","models":["swsh-schoolboy"],"name":"Schoolboy Peter [Double]","split":"Bede 1","levelCap":"20","location":"Route 3","team":[{"pokemon":"Sizzlipede","level":19,"gender":"Male","item":"Charcoal","ability":"White Smoke","nature":"Adamant","moves":["Flame Charge","Bug Bite","Wrap","Smokescreen"],"stats":"HP: 53        Sp.Atk: 26\nAtk: 38       Sp.Def: 29\nDef: 27       Speed: 27"},{"pokemon":"Dottler","level":19,"gender":"Male","item":"Sitrus Berry","ability":"Compound Eyes","nature":"Modest","moves":["Sunny Day","Recover","Zen Headbutt","Body Press"],"stats":"HP: 53        Sp.Atk: 31\nAtk: 21       Sp.Def: 45\nDef: 41       Speed: 22"}]},
			{"id":"trainer-19","calculatorTrainerId":"trainer-19","models":["swsh-worker-male"],"name":"Worker Keith [Single]","split":"Bede 1","levelCap":"20","location":"Galar Mine","team":[{"pokemon":"Roggenrola","level":19,"gender":"Male","item":"Hard Stone","ability":"Weak Armor","nature":"Relaxed","moves":["Autotomize","Curse","Rock Slide","Body Press"],"stats":"HP: 55        Sp.Atk: 20\nAtk: 39       Sp.Def: 20\nDef: 47       Speed: 14"}]},
			{"id":"trainer-20","calculatorTrainerId":"trainer-20","models":["swsh-worker-female"],"name":"Worker Georgia [Single]","split":"Bede 1","levelCap":"20","location":"Galar Mine","team":[{"pokemon":"Timburr","level":19,"gender":"Female","item":"Flame Orb","ability":"Guts","nature":"Adamant","moves":["Fake Out","Mach Punch","Rock Slide","Ice Punch"],"stats":"HP: 63        Sp.Atk: 18\nAtk: 45       Sp.Def: 24\nDef: 31       Speed: 24"},{"pokemon":"Timburr","level":19,"gender":"Female","item":"Toxic Orb","ability":"Guts","nature":"Adamant","moves":["Fake Out","Mach Punch","Rock Slide","Fire Punch"],"stats":"HP: 63        Sp.Atk: 18\nAtk: 45       Sp.Def: 24\nDef: 31       Speed: 24"},{"pokemon":"Timburr","level":19,"gender":"Female","item":"Choice Scarf","ability":"Guts","nature":"Adamant","moves":["Strength","Mach Punch","Rock Slide","Thunder Punch"],"stats":"HP: 63        Sp.Atk: 18\nAtk: 45       Sp.Def: 24\nDef: 31       Speed: 24"}]},
			{"id":"trainer-21","calculatorTrainerId":"trainer-21","models":["swsh-worker-female"],"name":"Worker Sandra [Double]","split":"Bede 1","levelCap":"20","location":"Galar Mine","team":[{"pokemon":"Diglett","level":19,"gender":"Male","item":"Soft Sand","ability":"Arena Trap","nature":"Naive","moves":["Slash","Dig","Hone Claws","Sandstorm"],"stats":"HP: 38        Sp.Atk: 24\nAtk: 31       Sp.Def: 24\nDef: 20       Speed: 50"},{"pokemon":"Drilbur","level":19,"gender":"Male","item":"Eviolite","ability":"Mold Breaker","nature":"Jolly","moves":["Stealth Rock","Rapid Spin","High Horsepower","Rock Slide"],"stats":"HP: 57        Sp.Atk: 19\nAtk: 43       Sp.Def: 27\nDef: 26       Speed: 39"}]},
			{"id":"trainer-22","calculatorTrainerId":"trainer-22","models":["swsh-worker-male"],"name":"Worker Russell [Single]","split":"Bede 1","levelCap":"20","location":"Galar Mine","team":[{"pokemon":"Carkol","level":19,"gender":"Male","item":"Shuca Berry","ability":"Steam Engine","nature":"Sassy","moves":["Spikes","Stealth Rock","Rock Blast","Flamethrower"],"stats":"HP: 65        Sp.Atk: 33\nAtk: 33       Sp.Def: 40\nDef: 45       Speed: 26"}]},
			{"id":"trainer-23","calculatorTrainerId":"trainer-23","models":["swsh-bede"],"name":"Bede 1","battleType":"Single","split":"Bede 1","levelCap":"20","location":"Galar Mine","team":[{"pokemon":"Solosis","level":20,"gender":"Female","item":"Twisted Spoon","ability":"Magic Guard","nature":"Bold","moves":["Toxic","Recover","Calm Mind","Psyshock"],"stats":"HP: 54        Sp.Atk: 53\nAtk: 20       Sp.Def: 31\nDef: 29       Speed: 19"},{"pokemon":"Gothita","level":20,"gender":"Female","item":"Sitrus Berry","ability":"Shadow Tag","nature":"Calm","moves":["Hypnosis","Flatter","Attract","Dream Eater"],"stats":"HP: 54        Sp.Atk: 33\nAtk: 20       Sp.Def: 40\nDef: 31       Speed: 29"},{"pokemon":"Hatenna","level":20,"gender":"Female","item":"Pixie Plate","ability":"Magic Bounce","nature":"Bold","moves":["Calm Mind","Psyshock","Draining Kiss","Mystical Fire"],"stats":"HP: 53        Sp.Atk: 33\nAtk: 20       Sp.Def: 32\nDef: 31       Speed: 26"},{"pokemon":"Sylveon","level":20,"gender":"Female","item":"Leftovers","ability":"Pixilate","nature":"Calm","moves":["Attract","Calm Mind","Hyper Voice","Hyper Beam"],"stats":"HP: 74        Sp.Atk: 55\nAtk: 33       Sp.Def: 69\nDef: 37       Speed: 35"},{"pokemon":"Mawile","level":20,"gender":"Female","item":"Life Orb","ability":"Sheer Force","nature":"Adamant","moves":["Swords Dance","Iron Head","Play Rough","Rock Slide"],"stats":"HP: 56        Sp.Atk: 29\nAtk: 49       Sp.Def: 33\nDef: 45       Speed: 31"},{"pokemon":"Kirlia","level":20,"gender":"Female","item":"Choice Specs","ability":"Trace","nature":"Timid","moves":["Moonblast","Psychic","Focus Blast","Shadow Ball"],"stats":"HP: 51        Sp.Atk: 37\nAtk: 22       Sp.Def: 33\nDef: 25       Speed: 34"}]},
			{"id":"trainer-24","calculatorTrainerId":"trainer-24","models":["swsh-breeder-male"],"name":"Pokemon Breeder Jaime [Single]","split":"Milo","levelCap":"23","location":"Route 4","team":[{"pokemon":"Perrserker","level":21,"gender":"Male","item":"Leftovers","ability":"Tough Claws","nature":"Adamant","moves":["Swords Dance","Iron Head","Seed Bomb","Substitute"],"stats":"HP: 66        Sp.Atk: 28\nAtk: 62       Sp.Def: 36\nDef: 53       Speed: 32"},{"pokemon":"Frosmoth","level":21,"gender":"Female","item":"Never-Melt Ice","ability":"Ice Scales","nature":"Timid","moves":["Quiver Dance","Substitute","Ice Beam","Giga Drain"],"stats":"HP: 66        Sp.Atk: 64\nAtk: 34       Sp.Def: 49\nDef: 36       Speed: 41"},{"pokemon":"Butterfree","level":21,"gender":"Female","item":"Heavy-Duty Boots","ability":"Compound Eyes","nature":"Timid","moves":["Quiver Dance","Substitute","Hurricane","Sleep Powder"],"stats":"HP: 62        Sp.Atk: 49\nAtk: 27       Sp.Def: 45\nDef: 32       Speed: 44"}]},
			{"id":"trainer-25","calculatorTrainerId":"trainer-25","models":["swsh-poke-kid-male"],"name":"Poke Kid Shane [Single]","split":"Milo","levelCap":"23","location":"Route 4","team":[{"pokemon":"Raichu","level":21,"gender":"Male","item":"Light Clay","ability":"Static","nature":"Timid","moves":["Electroweb","Nuzzle","Reflect","Volt Switch"],"stats":"HP: 62        Sp.Atk: 49\nAtk: 44       Sp.Def: 45\nDef: 34       Speed: 62"},{"pokemon":"Boltund","level":21,"gender":"Male","item":"Sitrus Berry","ability":"Strong Jaw","nature":"Jolly","moves":["Spark","Crunch","Charm","Play Rough"],"stats":"HP: 66        Sp.Atk: 44\nAtk: 49       Sp.Def: 36\nDef: 36       Speed: 68"}]},
			{"id":"trainer-26","calculatorTrainerId":"trainer-26","models":["swsh-poke-kid-female"],"name":"Poke Kid Sunny [Single]","split":"Milo","levelCap":"23","location":"Route 4","team":[{"pokemon":"Alcremie","level":21,"gender":"Female","item":"Leftovers","ability":"Sweet Veil","nature":"Bold","moves":["Charm","Recover","Draining Kiss","Mystical Fire"],"stats":"HP: 64        Sp.Atk: 57\nAtk: 32       Sp.Def: 62\nDef: 47       Speed: 38"},{"pokemon":"Ribombee","level":21,"gender":"Female","item":"Wise Glasses","ability":"Shield Dust","nature":"Timid","moves":["Electroweb","Draining Kiss","Struggle Bug","Stun Spore"],"stats":"HP: 62        Sp.Atk: 51\nAtk: 30       Sp.Def: 40\nDef: 36       Speed: 69"}]},
			{"id":"trainer-27","calculatorTrainerId":"trainer-27","models":["swsh-breeder-male"],"name":"Pokemon Breeder Bradley [Single]","split":"Milo","levelCap":"23","location":"Route 4","team":[{"pokemon":"Pelipper","level":21,"gender":"Male","item":"Damp Rock","ability":"Drizzle","nature":"Bold","moves":["Scald","Roost","U-turn","Air Slash"],"stats":"HP: 62        Sp.Atk: 51\nAtk: 28       Sp.Def: 40\nDef: 58       Speed: 38"},{"pokemon":"Ludicolo","level":21,"gender":"Male","item":"Miracle Seed","ability":"Rain Dish","nature":"Modest","moves":["Fake Out","Rain Dance","Giga Drain","Water Pulse"],"stats":"HP: 71        Sp.Atk: 53\nAtk: 36       Sp.Def: 53\nDef: 40       Speed: 40"},{"pokemon":"Manectric","level":21,"gender":"Male","item":"Magnet","ability":"Electric Surge","nature":"Mild","moves":["Snarl","Thunder","Volt Switch","Light Screen"],"stats":"HP: 66        Sp.Atk: 60\nAtk: 43       Sp.Def: 36\nDef: 32       Speed: 55"}]},
			{"id":"trainer-28","calculatorTrainerId":"trainer-28","models":["swsh-poke-kid-female"],"name":"Poke Kid Mia [Double]","split":"Milo","levelCap":"23","location":"Route 4","team":[{"pokemon":"Vaporeon","level":21,"gender":"Female","item":"Leftovers","ability":"Water Absorb","nature":"Calm","moves":["Protect","Scald","Icy Wind","Helping Hand"],"stats":"HP: 92        Sp.Atk: 57\nAtk: 34       Sp.Def: 56\nDef: 36       Speed: 38"},{"pokemon":"Jolteon","level":21,"gender":"Male","item":"Magnet","ability":"Lightning Rod","nature":"Rash","moves":["Thunder Wave","Pin Missile","Quick Attack","Thunderbolt"],"stats":"HP: 64        Sp.Atk: 62\nAtk: 38       Sp.Def: 45\nDef: 36       Speed: 66"}]},
			{"id":"trainer-29","calculatorTrainerId":"trainer-29","models":["swsh-poke-kid-male"],"name":"Poke Kid Rhys [Double]","split":"Milo","levelCap":"23","location":"Route 4","team":[{"pokemon":"Araquanid","level":21,"gender":"Male","item":"Rocky Helmet","ability":"Water Bubble","nature":"Impish","moves":["Lunge","Scald","Infestation","Wide Guard"],"stats":"HP: 66        Sp.Atk: 28\nAtk: 40       Sp.Def: 66\nDef: 55       Speed: 29"},{"pokemon":"Galvantula","level":21,"gender":"Male","item":"Wide Lens","ability":"Compound Eyes","nature":"Mild","moves":["Thunder","Electroweb","Struggle Bug","Sucker Punch"],"stats":"HP: 66        Sp.Atk: 58\nAtk: 53       Sp.Def: 36\nDef: 32       Speed: 57"}]},
			{"id":"trainer-30","calculatorTrainerId":"trainer-30","models":["swsh-grass-gym-male"],"name":"Gym Trainer Samuel [Single]","split":"Milo","levelCap":"23","location":"Grass Gym","team":[{"pokemon":"Leafeon","level":22,"gender":"Female","item":"Terrain Extender","ability":"Leaf Guard","nature":"Impish","moves":["Grassy Terrain","Baby-Doll Eyes","Leaf Blade","X-Scissor"],"stats":"HP: 67        Sp.Atk: 34\nAtk: 60       Sp.Def: 40\nDef: 75       Speed: 53"},{"pokemon":"Maractus","level":22,"gender":"Female","item":"Leftovers","ability":"Storm Drain","nature":"Quiet","moves":["Ingrain","Leech Seed","Terrain Pulse","Giga Drain"],"stats":"HP: 71        Sp.Atk: 63\nAtk: 49       Sp.Def: 41\nDef: 41       Speed: 34"},{"pokemon":"Tangrowth","level":22,"gender":"Male","item":"Rocky Helmet","ability":"Regenerator","nature":"Relaxed","moves":["Protect","Sleep Powder","Knock Off","Power Whip"],"stats":"HP: 82        Sp.Atk: 60\nAtk: 55       Sp.Def: 33\nDef: 72       Speed: 29"}]},
			{"id":"trainer-31","calculatorTrainerId":"trainer-31","models":["swsh-grass-gym-male"],"name":"Gym Trainer Mark [Single]","split":"Milo","levelCap":"23","location":"Grass Gym","team":[{"pokemon":"Trevenant","level":22,"gender":"Male","item":"Sitrus Berry","ability":"Harvest","nature":"Careful","moves":["Will-O-Wisp","Horn Leech","Leech Seed","Shadow Claw"],"stats":"HP: 76        Sp.Atk: 36\nAtk: 60       Sp.Def: 51\nDef: 45       Speed: 29"},{"pokemon":"Cradily","level":22,"gender":"Female","item":"Binding Band","ability":"Storm Drain","nature":"Calm","moves":["Recover","Stockpile","Infestation","Giga Drain"],"stats":"HP: 76        Sp.Atk: 47\nAtk: 42       Sp.Def: 63\nDef: 54       Speed: 23"},{"pokemon":"Ferrothorn","level":22,"gender":"Female","item":"Occa Berry","ability":"Iron Barbs","nature":"Sassy","moves":["Gyro Ball","Bullet Seed","Knock Off","Leech Seed"],"stats":"HP: 71        Sp.Atk: 35\nAtk: 53       Sp.Def: 68\nDef: 69       Speed: 11"}]},
			{"id":"trainer-32","calculatorTrainerId":"trainer-32","models":["swsh-grass-gym-female"],"name":"Gym Trainer Leah [Single]","split":"Milo","levelCap":"23","location":"Grass Gym","team":[{"pokemon":"Whimsicott","level":22,"gender":"Female","item":"Heat Rock","ability":"Prankster","nature":"Timid","moves":["Sunny Day","Tailwind","Fake Tears","Energy Ball"],"stats":"HP: 65        Sp.Atk: 45\nAtk: 36       Sp.Def: 44\nDef: 49       Speed: 68"},{"pokemon":"Lilligant","level":22,"gender":"Female","item":"Miracle Seed","ability":"Chlorophyll","nature":"Modest","moves":["Growth","Sleep Powder","Giga Drain","Pollen Puff"],"stats":"HP: 69        Sp.Atk: 66\nAtk: 34       Sp.Def: 44\nDef: 44       Speed: 51"},{"pokemon":"Cherrim","level":22,"gender":"Female","item":"Expert Belt","ability":"Flower Gift","nature":"Quiet","moves":["Morning Sun","Leech Seed","Solar Beam","Weather Ball"],"stats":"HP: 69        Sp.Atk: 55\nAtk: 38       Sp.Def: 46\nDef: 42       Speed: 44"}]},
			{"id":"trainer-33","calculatorTrainerId":"trainer-33","models":["swsh-milo"],"name":"Milo [Single]","split":"Milo","levelCap":"23","location":"Grass Gym","team":[{"pokemon":"Roserade","level":23,"gender":"Female","item":"Rocky Helmet","ability":"Poison Point","nature":"Bold","moves":["Toxic Spikes","Synthesis","Sludge Bomb","Leaf Storm"],"stats":"HP: 67        Sp.Atk: 69\nAtk: 39       Sp.Def: 60\nDef: 46       Speed: 53"},{"pokemon":"Eldegoss","level":23,"gender":"Male","item":"Leftovers","ability":"Regenerator","nature":"Bold","moves":["Poison Powder","Leech Seed","Pollen Puff","Leaf Tornado"],"stats":"HP: 67        Sp.Atk: 48\nAtk: 31       Sp.Def: 67\nDef: 58       Speed: 39"},{"pokemon":"Bellossom","level":23,"gender":"Female","item":"Big Root","ability":"Chlorophyll","nature":"Timid","moves":["Sunny Day","Quiver Dance","Strength Sap","Giga Drain"],"stats":"HP: 74        Sp.Atk: 53\nAtk: 43       Sp.Def: 58\nDef: 55       Speed: 38"},{"pokemon":"Shiinotic","level":23,"gender":"Female","item":"Weakness Policy","ability":"Effect Spore","nature":"Bold","moves":["Toxic","Strength Sap","Moonblast","Giga Drain"],"stats":"HP: 67        Sp.Atk: 53\nAtk: 28       Sp.Def: 58\nDef: 52       Speed: 25"},{"pokemon":"Shiftry","level":23,"gender":"Male","item":"Life Orb","ability":"Chlorophyll","nature":"Lonely","moves":["Growth","Knock Off","Leaf Storm","Heat Wave"],"stats":"HP: 81        Sp.Atk: 53\nAtk: 63       Sp.Def: 39\nDef: 35       Speed: 48"},{"pokemon":"Flapple GMAX","level":23,"gender":"Male","item":"Yache Berry","ability":"Ripen","nature":"Naive","moves":["Dragon Dance","Dragon Rush","Grav Apple","Acrobatics"],"stats":"HP: 72        Sp.Atk: 55\nAtk: 62       Sp.Def: 35\nDef: 48       Speed: 48","sprite":"flapple-gmax"}]},
			{"id":"trainer-34","calculatorTrainerId":"trainer-34","models":["swsh-reporter","swsh-cameraman"],"name":"Reporter Gillian & Cameraman Cam [Double]","split":"Hop 3","levelCap":"25","location":"Route 5","team":[{"pokemon":"Heliolisk","level":24,"gender":"Female","item":"Magnet","ability":"Dry Skin","nature":"Mild","moves":["Mud Shot","Electroweb","Parabolic Charge","Quick Attack"],"stats":"HP: 71        Sp.Atk: 70\nAtk: 38       Sp.Def: 57\nDef: 33       Speed: 64"},{"pokemon":"Klinklang","level":24,"gender":"Genderless","item":"Metal Coat","ability":"Clear Body","nature":"Careful","moves":["Metal Sound","Gear Grind","Thunder Wave","Shift Gear"],"stats":"HP: 70        Sp.Atk: 41\nAtk: 60       Sp.Def: 58\nDef: 67       Speed: 55"},{"pokemon":"Raichu","level":24,"gender":"Female","item":"Wise Glasses","ability":"Surge Surfer","nature":"Naive","moves":["Fake Out","Psyshock","Electroweb","Thunderbolt"],"stats":"HP: 70        Sp.Atk: 58\nAtk: 53       Sp.Def: 47\nDef: 36       Speed: 71","sprite":"raichu-alola"},{"pokemon":"Lanturn","level":24,"gender":"Male","item":"Sitrus Berry","ability":"Water Absorb","nature":"Calm","moves":["Icy Wind","Scald","Thunderbolt","Eerie Impulse"],"stats":"HP: 101        Sp.Atk: 48\nAtk: 36       Sp.Def: 52\nDef: 40       Speed: 44"}]},
			{"id":"trainer-35","calculatorTrainerId":"trainer-35","models":["swsh-cook"],"name":"Cook Stuart [Single]","split":"Hop 3","levelCap":"25","location":"Route 5","team":[{"pokemon":"Vanilluxe","level":24,"gender":"Female","item":"Never-Melt Ice","ability":"Snow Warning","nature":"Quiet","moves":["Aurora Veil","Freeze-Dry","Ice Beam","Icy Wind"],"stats":"HP: 75        Sp.Atk: 71\nAtk: 58       Sp.Def: 58\nDef: 53       Speed: 45"},{"pokemon":"Polteageist","level":24,"gender":"Genderless","item":"White Herb","ability":"Weak Armor","nature":"Modest","moves":["Shell Smash","Stored Power","Giga Drain","Shadow Ball"],"stats":"HP: 70        Sp.Atk: 83\nAtk: 38       Sp.Def: 67\nDef: 43       Speed: 46"},{"pokemon":"Greedent","level":24,"gender":"Male","item":"Sitrus Berry","ability":"Cheek Pouch","nature":"Careful","moves":["Stuff Cheeks","Crunch","Seed Bomb","Body Slam"],"stats":"HP: 99        Sp.Atk: 34\nAtk: 58       Sp.Def: 52\nDef: 58       Speed: 22"},{"pokemon":"Alcremie","level":24,"gender":"Female","item":"Babiri Berry","ability":"Sweet Veil","nature":"Bold","moves":["Recover","Acid Armor","Draining Kiss","Mystical Fire"],"stats":"HP: 72        Sp.Atk: 65\nAtk: 36       Sp.Def: 70\nDef: 52       Speed: 43"}]},
			{"id":"trainer-36","calculatorTrainerId":"trainer-36","models":["swsh-breeder-female"],"name":"Pokemon Breeder Debra [Single]","split":"Hop 3","levelCap":"25","location":"Route 5","team":[{"pokemon":"Togetic","level":24,"gender":"Female","item":"Babiri Berry","ability":"Serene Grace","nature":"Calm","moves":["Wish","Thunder Wave","Ancient Power","Air Slash"],"stats":"HP: 67        Sp.Atk: 50\nAtk: 27       Sp.Def: 68\nDef: 53       Speed: 31"},{"pokemon":"Gabite","level":24,"gender":"Male","item":"Soft Sand","ability":"Rough Skin","nature":"Adamant","moves":["Sand Tomb","Rock Slide","Bulldoze","Dragon Claw"],"stats":"HP: 74        Sp.Atk: 32\nAtk: 60       Sp.Def: 38\nDef: 43       Speed: 51"},{"pokemon":"Porygon2","level":24,"gender":"Genderless","item":"Silk Scarf","ability":"Download","nature":"Modest","moves":["Recover","Icy Wind","Tri Attack","Thunderbolt"],"stats":"HP: 82        Sp.Atk: 68\nAtk: 45       Sp.Def: 58\nDef: 55       Speed: 41"},{"pokemon":"Vileplume","level":24,"gender":"Female","item":"Coba Berry","ability":"Effect Spore","nature":"Bold","moves":["Moonlight","Sleep Powder","Acid Spray","Giga Drain"],"stats":"HP: 77        Sp.Atk: 65\nAtk: 45       Sp.Def: 55\nDef: 58       Speed: 36"}]},
			{"id":"trainer-37","calculatorTrainerId":"trainer-37","models":["swsh-breeder-male"],"name":"Pokemon Breeder Adrian [Single]","split":"Hop 3","levelCap":"25","location":"Route 5","team":[{"pokemon":"Arcanine","level":24,"gender":"Male","item":"Charcoal","ability":"Intimidate","nature":"Impish","moves":["Will-O-Wisp","Snarl","Flamethrower","Extreme Speed"],"stats":"HP: 84        Sp.Atk: 54\nAtk: 65       Sp.Def: 50\nDef: 55       Speed: 58"},{"pokemon":"Bronzong","level":24,"gender":"Genderless","item":"Occa Berry","ability":"Levitate","nature":"Relaxed","moves":["Confuse Ray","Safeguard","Bulldoze","Gyro Ball"],"stats":"HP: 73        Sp.Atk: 50\nAtk: 55       Sp.Def: 68\nDef: 74       Speed: 18"},{"pokemon":"Hitmontop","level":24,"gender":"Male","item":"Black Belt","ability":"Intimidate","nature":"Adamant","moves":["Detect","Fake Out","Rapid Spin","Triple Kick"],"stats":"HP: 65        Sp.Atk: 26\nAtk: 63       Sp.Def: 65\nDef: 58       Speed: 46"},{"pokemon":"Drampa","level":24,"gender":"Male","item":"Wise Glasses","ability":"Berserk","nature":"Modest","moves":["Glare","Hyper Voice","Dragon Pulse","Thunderbolt"],"stats":"HP: 78        Sp.Atk: 84\nAtk: 36       Sp.Def: 56\nDef: 53       Speed: 29"}]},
			{"id":"trainer-38","calculatorTrainerId":"trainer-38","models":["swsh-team-yell-male"],"name":"Team Yell Grunt 1 Route 5 [Single] [No Healing After]","split":"Hop 3","levelCap":"25","location":"Route 5","team":[{"pokemon":"Liepard","level":24,"gender":"Female","item":"Focus Sash","ability":"Prankster","nature":"Jolly","moves":["Fake Out","Torment","Snarl","Assurance"],"stats":"HP: 72        Sp.Atk: 48\nAtk: 54       Sp.Def: 36\nDef: 36       Speed: 69"},{"pokemon":"Thievul","level":24,"gender":"Male","item":"Black Glasses","ability":"Unburden","nature":"Timid","moves":["Nasty Plot","Swift","Snarl","Assurance"],"stats":"HP: 75        Sp.Atk: 54\nAtk: 36       Sp.Def: 56\nDef: 40       Speed: 60"},{"pokemon":"Skuntank","level":24,"gender":"Female","item":"Air Balloon","ability":"Aftermath","nature":"Adamant","moves":["Toxic","Smokescreen","Venoshock","Sucker Punch"],"stats":"HP: 90        Sp.Atk: 41\nAtk: 62       Sp.Def: 41\nDef: 44       Speed: 52"},{"pokemon":"Pangoro","level":24,"gender":"Male","item":"Expert Belt","ability":"Mold Breaker","nature":"Adamant","moves":["Taunt","Beat Up","Low Sweep","Bullet Punch"],"stats":"HP: 87        Sp.Atk: 40\nAtk: 78       Sp.Def: 46\nDef: 49       Speed: 40"}]},
			{"id":"trainer-39","calculatorTrainerId":"trainer-39","models":["swsh-team-yell-male"],"name":"Team Yell Grunt 2 Route 5 [Single] [No Healing Before]","split":"Hop 3","levelCap":"25","location":"Route 5","team":[{"pokemon":"Scrafty","level":24,"gender":"Male","item":"Black Belt","ability":"Moxie","nature":"Careful","moves":["Fake Out","Low Sweep","Beat Up","Scary Face"],"stats":"HP: 72        Sp.Atk: 30\nAtk: 55       Sp.Def: 73\nDef: 67       Speed: 40"},{"pokemon":"Crawdaunt","level":24,"gender":"Male","item":"Mystic Water","ability":"Adaptability","nature":"Adamant","moves":["Taunt","Rock Tomb","Razor Shell","Night Slash"],"stats":"HP: 71        Sp.Atk: 49\nAtk: 77       Sp.Def: 38\nDef: 53       Speed: 38"},{"pokemon":"Mandibuzz","level":24,"gender":"Female","item":"Sharp Beak","ability":"Overcoat","nature":"Impish","moves":["Tailwind","Torment","Pluck","Snarl"],"stats":"HP: 94        Sp.Atk: 34\nAtk: 43       Sp.Def: 58\nDef: 68       Speed: 50"},{"pokemon":"Drapion","level":24,"gender":"Male","item":"Scope Lens","ability":"Sniper","nature":"Adamant","moves":["Bulldoze","Knock Off","Night Slash","Cross Poison"],"stats":"HP: 75        Sp.Atk: 36\nAtk: 60       Sp.Def: 48\nDef: 65       Speed: 58"}]},
			{"id":"trainer-40","calculatorTrainerId":"trainer-40","models":["swsh-hop"],"name":"Hop 3 Grass Starter [Single]","split":"Hop 3","levelCap":"25","location":"Route 5","team":[{"pokemon":"Dubwool","level":25,"gender":"Female","item":"Sitrus Berry","ability":"Fluffy","nature":"Adamant","moves":["Rest","Sleep Talk","Cotton Guard","Body Press"],"stats":"HP: 78        Sp.Atk: 37\nAtk: 57       Sp.Def: 57\nDef: 62       Speed: 56"},{"pokemon":"Corviknight","level":25,"gender":"Male","item":"Power Herb","ability":"Big Pecks","nature":"Jolly","moves":["Roost","Sand Attack","Thief","Sky Attack"],"stats":"HP: 91        Sp.Atk: 35\nAtk: 56       Sp.Def: 55\nDef: 65       Speed: 50"},{"pokemon":"Milotic","level":25,"gender":"Female","item":"Flame Orb","ability":"Marvel Scale","nature":"Bold","moves":["Toxic","Recover","Scald","Ice Beam"],"stats":"HP: 90        Sp.Atk: 62\nAtk: 37       Sp.Def: 75\nDef: 57       Speed: 53"},{"pokemon":"Politoed","level":25,"gender":"Male","item":"Damp Rock","ability":"Drizzle","nature":"Bold","moves":["Rest","Encore","Toxic","Scald"],"stats":"HP: 87        Sp.Atk: 57\nAtk: 45       Sp.Def: 62\nDef: 55       Speed: 47"},{"pokemon":"Snorlax","level":25,"gender":"Male","item":"Leftovers","ability":"Thick Fat","nature":"Careful","moves":["Curse","Rest","Earthquake","Body Slam"],"stats":"HP: 122        Sp.Atk: 40\nAtk: 67       Sp.Def: 73\nDef: 45       Speed: 27"},{"pokemon":"Drizzile","level":25,"gender":"Male","item":"Scope Lens","ability":"Sniper","nature":"Modest","moves":["Rain Dance","Double Team","Mud Shot","Muddy Water"],"stats":"HP: 75        Sp.Atk: 66\nAtk: 37       Sp.Def: 40\nDef: 40       Speed: 57"}]},
			{"id":"trainer-41","calculatorTrainerId":"trainer-41","models":["swsh-hop"],"name":"Hop 3 Fire Starter [Single]","split":"Hop 3","levelCap":"25","location":"Route 5","team":[{"pokemon":"Dubwool","level":25,"gender":"Female","item":"Sitrus Berry","ability":"Fluffy","nature":"Adamant","moves":["Rest","Sleep Talk","Cotton Guard","Body Press"],"stats":"HP: 78        Sp.Atk: 37\nAtk: 57       Sp.Def: 57\nDef: 62       Speed: 56"},{"pokemon":"Corviknight","level":25,"gender":"Male","item":"Power Herb","ability":"Big Pecks","nature":"Jolly","moves":["Roost","Sand Attack","Thief","Sky Attack"],"stats":"HP: 91        Sp.Atk: 35\nAtk: 56       Sp.Def: 55\nDef: 65       Speed: 50"},{"pokemon":"Dhelmise","level":25,"gender":"Genderless","item":"Iron Ball","ability":"Steelworker","nature":"Impish","moves":["Synthesis","Switcheroo","Poltergeist","Power Whip"],"stats":"HP: 77        Sp.Atk: 49\nAtk: 78       Sp.Def: 57\nDef: 68       Speed: 32"},{"pokemon":"Exeggutor","level":25,"gender":"Male","item":"White Herb","ability":"Frisk","nature":"Modest","moves":["Hypnosis","Giga Drain","Flamethrower","Draco Meteor"],"stats":"HP: 90        Sp.Atk: 82\nAtk: 58       Sp.Def: 50\nDef: 55       Speed: 35","sprite":"exeggutor-alola"},{"pokemon":"Snorlax","level":25,"gender":"Male","item":"Leftovers","ability":"Thick Fat","nature":"Careful","moves":["Curse","Rest","Earthquake","Body Slam"],"stats":"HP: 122        Sp.Atk: 40\nAtk: 67       Sp.Def: 73\nDef: 45       Speed: 27"},{"pokemon":"Thwackey","level":25,"gender":"Male","item":"Grassy Seed","ability":"Grassy Surge","nature":"Jolly","moves":["Screech","Branch Poke","Drain Punch","Knock Off"],"stats":"HP: 77        Sp.Atk: 36\nAtk: 55       Sp.Def: 42\nDef: 47       Speed: 57"}]},
			{"id":"trainer-42","calculatorTrainerId":"trainer-42","models":["swsh-hop"],"name":"Hop 3 Water Starter [Single]","split":"Hop 3","levelCap":"25","location":"Route 5","team":[{"pokemon":"Dubwool","level":25,"gender":"Female","item":"Sitrus Berry","ability":"Fluffy","nature":"Adamant","moves":["Rest","Sleep Talk","Cotton Guard","Body Press"],"stats":"HP: 78        Sp.Atk: 37\nAtk: 57       Sp.Def: 57\nDef: 62       Speed: 56"},{"pokemon":"Corviknight","level":25,"gender":"Male","item":"Power Herb","ability":"Big Pecks","nature":"Jolly","moves":["Roost","Sand Attack","Thief","Sky Attack"],"stats":"HP: 91        Sp.Atk: 35\nAtk: 56       Sp.Def: 55\nDef: 65       Speed: 50"},{"pokemon":"Rotom-Heat","level":25,"gender":"Genderless","item":"Charcoal","ability":"Levitate","nature":"Timid","moves":["Nasty Plot","Pain Split","Discharge","Overheat"],"stats":"HP: 67        Sp.Atk: 65\nAtk: 40       Sp.Def: 66\nDef: 66       Speed: 60"},{"pokemon":"Ninetales","level":25,"gender":"Female","item":"Heat Rock","ability":"Drought","nature":"Timid","moves":["Toxic","Nasty Plot","Fire Blast","Solar Beam"],"stats":"HP: 79        Sp.Atk: 53\nAtk: 45       Sp.Def: 62\nDef: 50       Speed: 68"},{"pokemon":"Snorlax","level":25,"gender":"Male","item":"Leftovers","ability":"Thick Fat","nature":"Careful","moves":["Curse","Rest","Earthquake","Body Slam"],"stats":"HP: 122        Sp.Atk: 40\nAtk: 67       Sp.Def: 73\nDef: 45       Speed: 27"},{"pokemon":"Raboot","level":25,"gender":"Male","item":"Life Orb","ability":"Libero","nature":"Jolly","moves":["Bulk Up","Sucker Punch","Flame Charge","Jump Kick"],"stats":"HP: 75        Sp.Atk: 36\nAtk: 55       Sp.Def: 42\nDef: 42       Speed: 64"}]},
			{"id":"trainer-43","calculatorTrainerId":"trainer-43","models":["swsh-breeder-female"],"name":"Pokemon Breeder Denise [Double]","split":"Nessa","levelCap":"28","location":"Route 5","team":[{"pokemon":"Cherrim","level":26,"gender":"Female","item":"Rose Incense","ability":"Flower Gift","nature":"Adamant","moves":["Sunny Day","Solar Blade","Weather Ball","Morning Sun"],"stats":"HP: 80        Sp.Atk: 52\nAtk: 48       Sp.Def: 53\nDef: 49       Speed: 57"},{"pokemon":"Ninetales","level":26,"gender":"Female","item":"Heat Rock","ability":"Drought","nature":"Timid","moves":["Will-O-Wisp","Nasty Plot","Solar Beam","Flamethrower"],"stats":"HP: 82        Sp.Atk: 55\nAtk: 46       Sp.Def: 65\nDef: 52       Speed: 71"},{"pokemon":"Venusaur","level":26,"gender":"Female","item":"Miracle Seed","ability":"Chlorophyll","nature":"Modest","moves":["Growth","Giga Drain","Weather Ball","Sleep Powder"],"stats":"HP: 85        Sp.Atk: 71\nAtk: 49       Sp.Def: 65\nDef: 56       Speed: 54"},{"pokemon":"Salazzle","level":26,"gender":"Female","item":"Black Sludge","ability":"Corrosion","nature":"Timid","moves":["Toxic","Nasty Plot","Sludge Bomb","Flamethrower"],"stats":"HP: 79        Sp.Atk: 70\nAtk: 41       Sp.Def: 44\nDef: 44       Speed: 80"}]},
			{"id":"trainer-44","calculatorTrainerId":"trainer-44","models":["swsh-office-worker-female"],"name":"Office Worker Gabrielle [Double]","split":"Nessa","levelCap":"28","location":"Route 5","team":[{"pokemon":"Politoed","level":27,"gender":"Male","item":"Damp Rock","ability":"Drizzle","nature":"Calm","moves":["Scald","Icy Wind","Encore","Hypnosis"],"stats":"HP: 93        Sp.Atk: 61\nAtk: 47       Sp.Def: 73\nDef: 53       Speed: 51"},{"pokemon":"Toxicroak","level":27,"gender":"Male","item":"Black Sludge","ability":"Dry Skin","nature":"Adamant","moves":["Bulk Up","Poison Jab","Drain Punch","Sucker Punch"],"stats":"HP: 90        Sp.Atk: 53\nAtk: 77       Sp.Def: 48\nDef: 48       Speed: 59"},{"pokemon":"Kingdra","level":27,"gender":"Female","item":"Mystic Water","ability":"Swift Swim","nature":"Modest","moves":["Hurricane","Hydro Pump","Dragon Pulse","Focus Energy"],"stats":"HP: 85        Sp.Atk: 70\nAtk: 57       Sp.Def: 64\nDef: 64       Speed: 59"},{"pokemon":"Goodra","level":27,"gender":"Female","item":"Assault Vest","ability":"Hydration","nature":"Modest","moves":["Thunder","Sludge Bomb","Dragon Pulse","Muddy Water"],"stats":"HP: 93        Sp.Atk: 79\nAtk: 60       Sp.Def: 94\nDef: 51       Speed: 56"}]},
			{"id":"trainer-45","calculatorTrainerId":"trainer-45","models":["swsh-water-gym"],"name":"Gym Trainer Julia [Single]","split":"Nessa","levelCap":"28","location":"Water Gym","team":[{"pokemon":"Golisopod","level":27,"gender":"Male","item":"Silver Powder","ability":"Emergency Exit","nature":"Adamant","moves":["First Impression","Razor Shell","Rock Tomb","Sucker Punch"],"stats":"HP: 85        Sp.Atk: 40\nAtk: 88       Sp.Def: 61\nDef: 88       Speed: 26"},{"pokemon":"Basculin","level":27,"gender":"Male","item":"Mystic Water","ability":"Adaptability","nature":"Jolly","moves":["Flip Turn","Aqua Jet","Liquidation","Crunch"],"stats":"HP: 83        Sp.Atk: 50\nAtk: 63       Sp.Def: 43\nDef: 48       Speed: 72","sprite":"basculin-bluestriped"},{"pokemon":"Mantine","level":27,"gender":"Male","item":"Wacan Berry","ability":"Water Absorb","nature":"Calm","moves":["Scald","Icy Wind","Air Slash","Roost"],"stats":"HP: 91        Sp.Atk: 56\nAtk: 30       Sp.Def: 96\nDef: 51       Speed: 51"},{"pokemon":"Quagsire","level":27,"gender":"Female","item":"Rindo Berry","ability":"Unaware","nature":"Impish","moves":["Yawn","Liquidation","Bulldoze","Recover"],"stats":"HP: 96        Sp.Atk: 43\nAtk: 59       Sp.Def: 48\nDef: 64       Speed: 23"}]},
			{"id":"trainer-46","calculatorTrainerId":"trainer-46","models":["swsh-water-gym"],"name":"Gym Trainer Heather [Single]","split":"Nessa","levelCap":"28","location":"Water Gym","team":[{"pokemon":"Seismitoad","level":27,"gender":"Female","item":"Rindo Berry","ability":"Water Absorb","nature":"Impish","moves":["Muddy Water","Bulldoze","Drain Punch","Stealth Rock"],"stats":"HP: 102        Sp.Atk: 53\nAtk: 64       Sp.Def: 53\nDef: 58       Speed: 53"},{"pokemon":"Tentacruel","level":27,"gender":"Male","item":"Black Sludge","ability":"Liquid Ooze","nature":"Calm","moves":["Scald","Acid Spray","Hex","Toxic"],"stats":"HP: 88        Sp.Atk: 56\nAtk: 45       Sp.Def: 85\nDef: 48       Speed: 67"},{"pokemon":"Lapras","level":27,"gender":"Female","item":"Never-Melt Ice","ability":"Water Absorb","nature":"Modest","moves":["Sing","Ice Shard","Freeze-Dry","Sparkling Aria"],"stats":"HP: 115        Sp.Atk: 64\nAtk: 53       Sp.Def: 64\nDef: 56       Speed: 45"},{"pokemon":"Starmie","level":27,"gender":"Genderless","item":"Expert Belt","ability":"Natural Cure","nature":"Timid","moves":["Scald","Psyshock","Thunderbolt","Rapid Spin"],"stats":"HP: 77        Sp.Atk: 67\nAtk: 47       Sp.Def: 59\nDef: 59       Speed: 82"}]},
			{"id":"trainer-47","calculatorTrainerId":"trainer-47","models":["swsh-water-gym"],"name":"Gym Trainer Lynn","battleType":"Single","split":"Nessa","levelCap":"28","location":"Water Gym","team":[{"pokemon":"Ludicolo","level":27,"gender":"Male","item":"Damp Rock","ability":"Swift Swim","nature":"Modest","moves":["Rain Dance","Scald","Giga Drain","Icy Wind"],"stats":"HP: 88        Sp.Atk: 67\nAtk: 45       Sp.Def: 67\nDef: 51       Speed: 51"},{"pokemon":"Clawitzer","level":27,"gender":"Male","item":"Wise Glasses","ability":"Mega Launcher","nature":"Quiet","moves":["Water Pulse","Aura Sphere","Dark Pulse","Ice Beam"],"stats":"HP: 83        Sp.Atk: 85\nAtk: 52       Sp.Def: 61\nDef: 60       Speed: 40"},{"pokemon":"Jellicent","level":27,"gender":"Female","item":"Colbur Berry","ability":"Water Absorb","nature":"Calm","moves":["Scald","Strength Sap","Hex","Will-O-Wisp"],"stats":"HP: 99        Sp.Atk: 59\nAtk: 40       Sp.Def: 77\nDef: 51       Speed: 45"},{"pokemon":"Kingler","level":27,"gender":"Male","item":"Muscle Band","ability":"Sheer Force","nature":"Adamant","moves":["Liquidation","X-Scissor","Stomping Tantrum","Agility"],"stats":"HP: 75        Sp.Atk: 36\nAtk: 91       Sp.Def: 40\nDef: 75       Speed: 53"}]},
			{"id":"trainer-48","calculatorTrainerId":"trainer-48","models":["swsh-nessa"],"name":"Nessa 1 [Single]","split":"Nessa","levelCap":"28","location":"Water Gym","team":[{"pokemon":"Pelipper","level":28,"gender":"Male","item":"Damp Rock","ability":"Drizzle","nature":"Modest","moves":["Roost","Hurricane","Surf","Ice Beam"],"stats":"HP: 80        Sp.Atk: 72\nAtk: 36       Sp.Def: 52\nDef: 69       Speed: 50"},{"pokemon":"Barraskewda","level":28,"gender":"Male","item":"Choice Band","ability":"Swift Swim","nature":"Adamant","moves":["Liquidation","Close Combat","Drill Run","Crunch"],"stats":"HP: 80        Sp.Atk: 42\nAtk: 90       Sp.Def: 41\nDef: 47       Speed: 89"},{"pokemon":"Blastoise","level":28,"gender":"Male","item":"White Herb","ability":"Torrent","nature":"Modest","moves":["Shell Smash","Ice Beam","Dark Pulse","Hydro Pump"],"stats":"HP: 90        Sp.Atk: 67\nAtk: 54       Sp.Def: 72\nDef: 69       Speed: 57"},{"pokemon":"Wishiwashi","level":28,"gender":"Male","item":"Chesto Berry","ability":"Schooling","nature":"Relaxed","moves":["Rest","Sleep Talk","Earthquake","Scald"],"stats":"HP: 71        Sp.Atk: 92\nAtk: 92       Sp.Def: 89\nDef: 94       Speed: 27","sprite":"wishiwashi-school"},{"pokemon":"Rotom-Wash","level":28,"gender":"Genderless","item":"Leftovers","ability":"Levitate","nature":"Bold","moves":["Will-O-Wisp","Rain Dance","Hydro Pump","Discharge"],"stats":"HP: 74        Sp.Atk: 72\nAtk: 45       Sp.Def: 73\nDef: 80       Speed: 61"},{"pokemon":"Drednaw GMAX","level":28,"gender":"Female","item":"Life Orb","ability":"Shell Armor","nature":"Adamant","moves":["Megahorn","Stone Edge","Liquidation","Jaw Lock"],"stats":"HP: 97        Sp.Atk: 36\nAtk: 85       Sp.Def: 51\nDef: 64       Speed: 55","sprite":"drednaw-gmax"}]},
			{"id":"trainer-49","calculatorTrainerId":"trainer-49","models":["swsh-bede"],"name":"Bede 2 [Single]","split":"Bede 2","levelCap":"30","location":"Galar Mine No. 2","team":[{"pokemon":"Duosion","level":30,"gender":"Female","item":"Eviolite","ability":"Magic Guard","nature":"Bold","moves":["Toxic","Recover","Calm Mind","Psyshock"],"stats":"HP: 88        Sp.Atk: 89\nAtk: 34       Sp.Def: 50\nDef: 48       Speed: 32"},{"pokemon":"Gothorita","level":30,"gender":"Female","item":"Sitrus Berry","ability":"Shadow Tag","nature":"Calm","moves":["Hypnosis","Flatter","Attract","Dream Eater"],"stats":"HP: 85        Sp.Atk: 59\nAtk: 36       Sp.Def: 71\nDef: 56       Speed: 47"},{"pokemon":"Rapidash","level":30,"gender":"Female","item":"Kee Berry","ability":"Pastel Veil","nature":"Jolly","moves":["Swords Dance","Morning Sun","Play Rough","High Horsepower"],"stats":"HP: 88        Sp.Atk: 55\nAtk: 74       Sp.Def: 62\nDef: 56       Speed: 84","sprite":"rapidash-galar"},{"pokemon":"Hattrem","level":30,"gender":"Female","item":"Pixie Plate","ability":"Magic Bounce","nature":"Bold","moves":["Calm Mind","Psyshock","Draining Kiss","Mystical Fire"],"stats":"HP: 83        Sp.Atk: 65\nAtk: 34       Sp.Def: 58\nDef: 58       Speed: 43"},{"pokemon":"Mawile","level":30,"gender":"Female","item":"Life Orb","ability":"Sheer Force","nature":"Adamant","moves":["Swords Dance","Iron Head","Play Rough","Rock Slide"],"stats":"HP: 79        Sp.Atk: 42\nAtk: 71       Sp.Def: 47\nDef: 65       Speed: 44"},{"pokemon":"Sylveon","level":30,"gender":"Female","item":"Leftovers","ability":"Pixilate","nature":"Calm","moves":["Attract","Calm Mind","Hyper Voice","Hyper Beam"],"stats":"HP: 106        Sp.Atk: 80\nAtk: 47       Sp.Def: 101\nDef: 53       Speed: 50"}]},
			{"id":"trainer-50","calculatorTrainerId":"trainer-50","models":["swsh-worker-male"],"name":"Worker Francis [Single]","split":"Marnie 1","levelCap":"32","location":"Galar Mine No. 2","team":[{"pokemon":"Dugtrio","level":31,"gender":"Male","item":"Soft Sand","ability":"Arena Trap","nature":"Jolly","moves":["Bulldoze","Rock Tomb","Sucker Punch","Sand Tomb"],"stats":"HP: 72        Sp.Atk: 40\nAtk: 76       Sp.Def: 58\nDef: 45       Speed: 97"},{"pokemon":"Runerigus","level":31,"gender":"Female","item":"Colbur Berry","ability":"Wandering Spirit","nature":"Impish","moves":["Will-O-Wisp","Shadow Claw","Bulldoze","Protect"],"stats":"HP: 86        Sp.Atk: 40\nAtk: 73       Sp.Def: 79\nDef: 114       Speed: 33"},{"pokemon":"Durant","level":31,"gender":"Male","item":"Wide Lens","ability":"Hustle","nature":"Jolly","moves":["Iron Head","X-Scissor","Rock Slide","Hone Claws"],"stats":"HP: 86        Sp.Atk: 39\nAtk: 82       Sp.Def: 44\nDef: 84       Speed: 90"},{"pokemon":"Coalossal","level":31,"gender":"Female","item":"Sitrus Berry","ability":"Flame Body","nature":"Adamant","moves":["Flame Charge","Rock Slide","Rapid Spin","Smack Down"],"stats":"HP: 118        Sp.Atk: 57\nAtk: 70       Sp.Def: 70\nDef: 89       Speed: 33"},{"pokemon":"Excadrill","level":31,"gender":"Male","item":"Life Orb","ability":"Sand Rush","nature":"Adamant","moves":["Drill Run","Iron Head","Rock Slide","Hone Claws"],"stats":"HP: 118        Sp.Atk: 40\nAtk: 107       Sp.Def: 54\nDef: 51       Speed: 69"}]},
			{"id":"trainer-51","calculatorTrainerId":"trainer-51","models":["swsh-worker-female"],"name":"Worker Yvonne [Single]","split":"Marnie 1","levelCap":"32","location":"Galar Mine No. 2","team":[{"pokemon":"Gigalith","level":31,"gender":"Male","item":"Weakness Policy","ability":"Sturdy","nature":"Adamant","moves":["Rock Slide","Bulldoze","Iron Defense","Stealth Rock"],"stats":"HP: 103        Sp.Atk: 45\nAtk: 107       Sp.Def: 64\nDef: 95       Speed: 30"},{"pokemon":"Conkeldurr","level":31,"gender":"Male","item":"Flame Orb","ability":"Guts","nature":"Adamant","moves":["Drain Punch","Mach Punch","Knock Off","Rock Slide"],"stats":"HP: 115        Sp.Atk: 43\nAtk: 111       Sp.Def: 54\nDef: 73       Speed: 42"},{"pokemon":"Mudsdale","level":31,"gender":"Male","item":"Leftovers","ability":"Stamina","nature":"Impish","moves":["High Horsepower","Rock Tomb","Body Press","Protect"],"stats":"HP: 112        Sp.Atk: 43\nAtk: 92       Sp.Def: 67\nDef: 83       Speed: 36"},{"pokemon":"Magnezone","level":31,"gender":"Genderless","item":"Air Balloon","ability":"Analytic","nature":"Modest","moves":["Flash Cannon","Volt Switch","Tri Attack","Thunder Wave"],"stats":"HP: 94        Sp.Atk: 104\nAtk: 52       Sp.Def: 70\nDef: 85       Speed: 51"},{"pokemon":"Toxicroak","level":31,"gender":"Female","item":"Black Sludge","ability":"Dry Skin","nature":"Jolly","moves":["Drain Punch","Poison Jab","Sucker Punch","Bulk Up"],"stats":"HP: 102        Sp.Atk: 60\nAtk: 80       Sp.Def: 54\nDef: 54       Speed: 73"}]},
			{"id":"trainer-52","calculatorTrainerId":"trainer-52","models":["swsh-team-yell-male","swsh-team-yell-female"],"name":"Team Yell Grunts Mine No.2 [Double] [With Hop] [Hop Team: Dubwool, Corviknight, Starter] [Grunts lead: Scrafty, Toxtricity]","split":"Marnie 1","levelCap":"32","location":"Galar Mine No. 2","team":[{"pokemon":"Scrafty","level":31,"gender":"Female","item":"Eject Button","ability":"Intimidate","nature":"Careful","moves":["Fake Out","Drain Punch","Crunch","Rock Tomb"],"stats":"HP: 90        Sp.Atk: 37\nAtk: 70       Sp.Def: 93\nDef: 85       Speed: 50"},{"pokemon":"Skuntank","level":31,"gender":"Female","item":"Shuca Berry","ability":"Aftermath","nature":"Adamant","moves":["Poison Jab","Sucker Punch","Flamethrower","Toxic"],"stats":"HP: 114        Sp.Atk: 52\nAtk: 79       Sp.Def: 52\nDef: 56       Speed: 66"},{"pokemon":"Mandibuzz","level":31,"gender":"Female","item":"Sitrus Berry","ability":"Overcoat","nature":"Impish","moves":["Foul Play","Air Slash","Snarl","Taunt"],"stats":"HP: 118        Sp.Atk: 43\nAtk: 54       Sp.Def: 73\nDef: 86       Speed: 64"},{"pokemon":"Toxtricity","level":31,"gender":"Male","item":"Magnet","ability":"Punk Rock","nature":"Modest","moves":["Overdrive","Sludge Bomb","Snarl","Acid Spray"],"stats":"HP: 97        Sp.Atk: 93\nAtk: 67       Sp.Def: 58\nDef: 58       Speed: 61"},{"pokemon":"Liepard","level":31,"gender":"Female","item":"Focus Sash","ability":"Prankster","nature":"Jolly","moves":["Fake Out","Thunder Wave","Taunt","Foul Play"],"stats":"HP: 90        Sp.Atk: 62\nAtk: 69       Sp.Def: 45\nDef: 45       Speed: 88"},{"pokemon":"Sableye","level":31,"gender":"Female","item":"Roseli Berry","ability":"Prankster","nature":"Careful","moves":["Fake Out","Quash","Knock Off","Will-O-Wisp"],"stats":"HP: 81        Sp.Atk: 48\nAtk: 61       Sp.Def: 59\nDef: 61       Speed: 45"}]},
			{"id":"trainer-53","calculatorTrainerId":"trainer-53","models":["swsh-rail-staff"],"name":"Rail Staff Vincent [Single]","split":"Marnie 1","levelCap":"32","location":"Galar Mine No. 2","team":[{"pokemon":"Stunfisk","level":31,"gender":"Female","item":"Rocky Helmet","ability":"Mimicry","nature":"Impish","moves":["Stomping Tantrum","Iron Head","Rock Tomb","Thunder Wave"],"stats":"HP: 118        Sp.Atk: 49\nAtk: 64       Sp.Def: 66\nDef: 82       Speed: 34","sprite":"stunfisk-galar"},{"pokemon":"Perrserker","level":31,"gender":"Female","item":"Metal Coat","ability":"Tough Claws","nature":"Adamant","moves":["Iron Head","Fake Out","Shadow Claw","Hone Claws"],"stats":"HP: 94        Sp.Atk: 40\nAtk: 90       Sp.Def: 51\nDef: 76       Speed: 45"},{"pokemon":"Weezing","level":31,"gender":"Male","item":"Black Sludge","ability":"Levitate","nature":"Bold","moves":["Strange Steam","Sludge Bomb","Smokescreen","Will-O-Wisp"],"stats":"HP: 90        Sp.Atk: 67\nAtk: 63       Sp.Def: 58\nDef: 97       Speed: 51","sprite":"weezing-galar"},{"pokemon":"Duraludon","level":31,"gender":"Male","item":"Expert Belt","ability":"Light Metal","nature":"Modest","moves":["Flash Cannon","Dragon Pulse","Thunderbolt","Metal Sound"],"stats":"HP: 94        Sp.Atk: 97\nAtk: 65       Sp.Def: 45\nDef: 85       Speed: 67"},{"pokemon":"Copperajah","level":31,"gender":"Male","item":"Sitrus Berry","ability":"Heavy Metal","nature":"Adamant","moves":["Heavy Slam","High Horsepower","Rock Slide","Bulldoze"],"stats":"HP: 126        Sp.Atk: 57\nAtk: 104       Sp.Def: 57\nDef: 57       Speed: 33"}]},
			{"id":"trainer-54","calculatorTrainerId":"trainer-54","models":["swsh-madame"],"name":"Madame Caroline [Single]","split":"Marnie 1","levelCap":"32","location":"Motostoke Outskirts","team":[{"pokemon":"Boltund","level":31,"gender":"Female","item":"Magnet","ability":"Strong Jaw","nature":"Jolly","moves":["Nuzzle","Thunder Fang","Crunch","Volt Switch"],"stats":"HP: 93        Sp.Atk: 63\nAtk: 70       Sp.Def: 51\nDef: 51       Speed: 97"},{"pokemon":"Swoobat","level":31,"gender":"Female","item":"Kee Berry","ability":"Simple","nature":"Timid","moves":["Calm Mind","Stored Power","Air Slash","Roost"],"stats":"HP: 92        Sp.Atk: 62\nAtk: 44       Sp.Def: 48\nDef: 48       Speed: 93"},{"pokemon":"Cinccino","level":31,"gender":"Female","item":"Silk Scarf","ability":"Skill Link","nature":"Jolly","moves":["Tail Slap","Bullet Seed","Rock Blast","Encore"],"stats":"HP: 97        Sp.Atk: 48\nAtk: 73       Sp.Def: 51\nDef: 51       Speed: 93"},{"pokemon":"Gardevoir","level":31,"gender":"Female","item":"Twisted Spoon","ability":"Trace","nature":"Modest","moves":["Psychic","Draining Kiss","Mystical Fire","Will-O-Wisp"],"stats":"HP: 92        Sp.Atk: 101\nAtk: 48       Sp.Def: 85\nDef: 54       Speed: 64"},{"pokemon":"Nidoqueen","level":31,"gender":"Female","item":"Soft Sand","ability":"Sheer Force","nature":"Modest","moves":["Earth Power","Sludge Bomb","Ice Beam","Thunderbolt"],"stats":"HP: 106        Sp.Atk: 67\nAtk: 63       Sp.Def: 67\nDef: 68       Speed: 61"}]},
			{"id":"trainer-55","calculatorTrainerId":"trainer-55","models":["swsh-police-officer"],"name":"Police Officer Raymond [Single]","split":"Marnie 1","levelCap":"32","location":"Motostoke Outskirts","team":[{"pokemon":"Arcanine","level":31,"gender":"Male","item":"Charcoal","ability":"Intimidate","nature":"Impish","moves":["Snarl","Will-O-Wisp","Flamethrower","Extreme Speed"],"stats":"HP: 106        Sp.Atk: 68\nAtk: 82       Sp.Def: 64\nDef: 70       Speed: 73"},{"pokemon":"Lycanroc","level":31,"gender":"Female","item":"Hard Stone","ability":"Tough Claws","nature":"Jolly","moves":["Accelerock","Fire Fang","Psychic Fangs","Drill Run"],"stats":"HP: 97        Sp.Atk: 43\nAtk: 87       Sp.Def: 54\nDef: 54       Speed: 90","sprite":"lycanroc-dusk"},{"pokemon":"Lycanroc","level":31,"gender":"Male","item":"Scope Lens","ability":"Adaptability","nature":"Adamant","moves":["Stone Edge","Sucker Punch","Fire Fang","Taunt"],"stats":"HP: 109        Sp.Atk: 32\nAtk: 114       Sp.Def: 48\nDef: 48       Speed: 77","sprite":"lycanroc-midnight"},{"pokemon":"Sirfetch'd","level":31,"gender":"Male","item":"Leek","ability":"Scrappy","nature":"Adamant","moves":["Brick Break","Knock Off","First Impression","Detect"],"stats":"HP: 89        Sp.Atk: 50\nAtk: 107       Sp.Def: 65\nDef: 73       Speed: 54"},{"pokemon":"Braviary","level":31,"gender":"Female","item":"Sharp Beak","ability":"Defiant","nature":"Jolly","moves":["Dual Wingbeat","Crush Claw","Tailwind","Roost"],"stats":"HP: 112        Sp.Atk: 44\nAtk: 90       Sp.Def: 61\nDef: 61       Speed: 70"}]},
			{"id":"trainer-56","calculatorTrainerId":"trainer-56","models":["swsh-marnie"],"name":"Marnie 1 [Single]","split":"Marnie 1","levelCap":"32","location":"Motostoke Hotel","team":[{"pokemon":"Sharpedo","level":32,"gender":"Male","item":"Life Orb","ability":"Speed Boost","nature":"Adamant","moves":["Aqua Jet","Crunch","Waterfall","Close Combat"],"stats":"HP: 96        Sp.Atk: 67\nAtk: 100       Sp.Def: 40\nDef: 40       Speed: 75"},{"pokemon":"Scrafty","level":32,"gender":"Female","item":"Chesto Berry","ability":"Intimidate","nature":"Careful","moves":["Rest","Bulk Up","Knock Off","Drain Punch"],"stats":"HP: 93        Sp.Atk: 38\nAtk: 72       Sp.Def: 96\nDef: 88       Speed: 52"},{"pokemon":"Morpeko","level":32,"gender":"Female","item":"Choice Band","ability":"Hunger Switch","nature":"Jolly","moves":["Crunch","Seed Bomb","Parting Shot","Aura Wheel"],"stats":"HP: 89        Sp.Atk: 53\nAtk: 75       Sp.Def: 52\nDef: 52       Speed: 84"},{"pokemon":"Liepard","level":32,"gender":"Female","item":"Black Glasses","ability":"Prankster","nature":"Jolly","moves":["Fake Out","Super Fang","Knock Off","U-turn"],"stats":"HP: 92        Sp.Atk: 63\nAtk: 71       Sp.Def: 46\nDef: 46       Speed: 90"},{"pokemon":"Grimmsnarl","level":32,"gender":"Male","item":"Light Clay","ability":"Prankster","nature":"Modest","moves":["Reflect","Light Screen","Thunder Wave","Dazzling Gleam"],"stats":"HP: 112        Sp.Atk: 82\nAtk: 81       Sp.Def: 62\nDef: 56       Speed: 53"},{"pokemon":"Weavile","level":32,"gender":"Female","item":"Chople Berry","ability":"Pressure","nature":"Adamant","moves":["Fake Out","Ice Shard","Triple Axel","Knock Off"],"stats":"HP: 96        Sp.Atk: 38\nAtk: 100       Sp.Def: 69\nDef: 56       Speed: 94"}]},
			{"id":"trainer-57","calculatorTrainerId":"trainer-57","models":["swsh-fire-gym-male"],"name":"Gym Trainer Darren [Double][MIGHT ATTACK YOU] [Left Encounter] [Baltoy]","split":"Kabu","levelCap":"36","location":"Fire Gym","team":[{"pokemon":"Coalossal","level":34,"gender":"Male","item":"Smoke Ball","ability":"Flame Body","nature":"Careful","moves":["Tar Shot","Smokescreen","Rock Tomb","Incinerate"],"stats":"HP: 129        Sp.Atk: 62\nAtk: 69       Sp.Def: 83\nDef: 97       Speed: 35"}]},
			{"id":"trainer-58","calculatorTrainerId":"trainer-58","models":["swsh-fire-gym-female"],"name":"Gym Trainer Chaka [Double][MIGHT ATTACK YOU] [Top Encounter] [Trapinch]","split":"Kabu","levelCap":"36","location":"Fire Gym","team":[{"pokemon":"Arcanine","level":34,"gender":"Female","item":"Safety Goggles","ability":"Intimidate","nature":"Impish","moves":["Will-O-Wisp","Snarl","Scary Face","Bite"],"stats":"HP: 115        Sp.Atk: 74\nAtk: 90       Sp.Def: 69\nDef: 75       Speed: 80"}]},
			{"id":"trainer-59","calculatorTrainerId":"trainer-59","models":["swsh-fire-gym-female"],"name":"Gym Trainer Elle [Double][MIGHT ATTACK YOU][Right Encounter][Hippopotas]","split":"Kabu","levelCap":"36","location":"Fire Gym","team":[{"pokemon":"Chandelure","level":34,"gender":"Female","item":"Spell Tag","ability":"Flame Body","nature":"Calm","moves":["Confuse Ray","Imprison","Smog","Hex"],"stats":"HP: 95        Sp.Atk: 114\nAtk: 46       Sp.Def: 83\nDef: 76       Speed: 69"}]},
			{"id":"trainer-60","calculatorTrainerId":"trainer-60","models":["swsh-kabu"],"name":"Kabu [Double]","split":"Kabu","levelCap":"36","location":"Fire Gym","team":[{"pokemon":"Torkoal","level":36,"gender":"Male","item":"Air Balloon","ability":"White Smoke","nature":"Bold","moves":["Rest","Iron Defense","Body Press","Burning Jealousy"],"stats":"HP: 107        Sp.Atk: 77\nAtk: 69       Sp.Def: 66\nDef: 127       Speed: 30"},{"pokemon":"Ninetales","level":36,"gender":"Female","item":"Heat Rock","ability":"Drought","nature":"Modest","moves":["Will-O-Wisp","Flamethrower","Solar Beam","Nasty Plot"],"stats":"HP: 109        Sp.Atk: 81\nAtk: 63       Sp.Def: 88\nDef: 70       Speed: 88"},{"pokemon":"Flareon","level":36,"gender":"Male","item":"Toxic Orb","ability":"Guts","nature":"Adamant","moves":["Wish","Facade","Flare Blitz","Superpower"],"stats":"HP: 103        Sp.Atk: 75\nAtk: 119       Sp.Def: 95\nDef: 59       Speed: 62"},{"pokemon":"Salazzle","level":36,"gender":"Female","item":"Black Sludge","ability":"Corrosion","nature":"Timid","moves":["Toxic","Knock Off","Fire Blast","Sludge Wave"],"stats":"HP: 106        Sp.Atk: 96\nAtk: 55       Sp.Def: 59\nDef: 59       Speed: 110"},{"pokemon":"Magmortar","level":36,"gender":"Male","item":"Passho Berry","ability":"Flame Body","nature":"Modest","moves":["Sunny Day","Fire Blast","Focus Blast","Scorching Sands"],"stats":"HP: 111        Sp.Atk: 116\nAtk: 75       Sp.Def: 84\nDef: 64       Speed: 75"},{"pokemon":"Centiskorch GMAX","level":36,"gender":"Male","item":"Assault Vest","ability":"Flame Body","nature":"Adamant","moves":["Fire Lash","Lunge","Crunch","Power Whip"],"stats":"HP: 129        Sp.Atk: 72\nAtk: 107       Sp.Def: 80\nDef: 62       Speed: 62","sprite":"centiskorch-gmax"}]},
			{"id":"trainer-61","calculatorTrainerId":"trainer-61","models":["swsh-team-yell-male"],"name":"Team Yell Grunt 1 Route 6 [Single] [No Healing After]","split":"Hop 4","levelCap":"38","location":"Route 6","team":[{"pokemon":"Bisharp","level":37,"gender":"Male","item":"Metal Coat","ability":"Defiant","nature":"Adamant","moves":["Iron Head","Night Slash","Sucker Punch","Scary Face"],"stats":"HP: 106        Sp.Atk: 54\nAtk: 118       Sp.Def: 68\nDef: 90       Speed: 68"},{"pokemon":"Morpeko","level":37,"gender":"Male","item":"Expert Belt","ability":"Hunger Switch","nature":"Jolly","moves":["Aura Wheel","Fake Out","Parting Shot","Fire Fang"],"stats":"HP: 101        Sp.Atk: 61\nAtk: 86       Sp.Def: 59\nDef: 59       Speed: 96"},{"pokemon":"Zoroark","level":37,"gender":"Male","item":"Black Glasses","ability":"Illusion","nature":"Timid","moves":["Dark Pulse","Flamethrower","Taunt","Nasty Plot"],"stats":"HP: 102        Sp.Atk: 105\nAtk: 84       Sp.Def: 60\nDef: 60       Speed: 103"},{"pokemon":"Krookodile","level":37,"gender":"Male","item":"Soft Sand","ability":"Intimidate","nature":"Jolly","moves":["Crunch","Bulldoze","Fire Fang","Torment"],"stats":"HP: 128        Sp.Atk: 57\nAtk: 103       Sp.Def: 68\nDef: 75       Speed: 92"},{"pokemon":"Incineroar","level":37,"gender":"Male","item":"Charcoal","ability":"Intimidate","nature":"Careful","moves":["Fake Out","Darkest Lariat","Fire Punch","Snarl"],"stats":"HP: 128        Sp.Atk: 67\nAtk: 101       Sp.Def: 91\nDef: 83       Speed: 60"}]},
			{"id":"trainer-62","calculatorTrainerId":"trainer-62","models":["swsh-team-yell-male"],"name":"Team Yell Grunt 2 Route 6 [Single] [No Healing Before]","split":"Hop 4","levelCap":"38","location":"Route 6","team":[{"pokemon":"Umbreon","level":37,"gender":"Female","item":"Sitrus Berry","ability":"Synchronize","nature":"Calm","moves":["Foul Play","Snarl","Moonlight","Confuse Ray"],"stats":"HP: 128        Sp.Atk: 60\nAtk: 57       Sp.Def: 123\nDef: 97       Speed: 64"},{"pokemon":"Grimmsnarl","level":37,"gender":"Male","item":"Roseli Berry","ability":"Prankster","nature":"Careful","moves":["Spirit Break","Fake Out","Thunder Wave","Taunt"],"stats":"HP: 128        Sp.Atk: 77\nAtk: 105       Sp.Def: 78\nDef: 64       Speed: 60"},{"pokemon":"Weavile","level":37,"gender":"Female","item":"Razor Claw","ability":"Pressure","nature":"Jolly","moves":["Night Slash","Ice Shard","Low Kick","Hone Claws"],"stats":"HP: 110        Sp.Atk: 44\nAtk: 105       Sp.Def: 79\nDef: 64       Speed: 118"},{"pokemon":"Sharpedo","level":37,"gender":"Male","item":"Mystic Water","ability":"Speed Boost","nature":"Adamant","moves":["Crunch","Poison Fang","Aqua Jet","Scary Face"],"stats":"HP: 110        Sp.Atk: 77\nAtk: 115       Sp.Def: 46\nDef: 46       Speed: 86"},{"pokemon":"Spiritomb","level":37,"gender":"Female","item":"Spell Tag","ability":"Pressure","nature":"Quiet","moves":["Shadow Ball","Dark Pulse","Will-O-Wisp","Pain Split"],"stats":"HP: 95        Sp.Atk: 92\nAtk: 84       Sp.Def: 96\nDef: 96       Speed: 37"}]},
			{"id":"trainer-63","calculatorTrainerId":"trainer-63","models":["swsh-beauty"],"name":"Beauty Anita [Single]","split":"Hop 4","levelCap":"38","location":"Route 6","team":[{"pokemon":"Clefable","level":37,"gender":"Female","item":"Leftovers","ability":"Magic Guard","nature":"Bold","moves":["Moonblast","Flamethrower","Moonlight","Thunder Wave"],"stats":"HP: 128        Sp.Atk: 86\nAtk: 61       Sp.Def: 83\nDef: 77       Speed: 60"},{"pokemon":"Lurantis","level":37,"gender":"Female","item":"White Herb","ability":"Contrary","nature":"Adamant","moves":["Leaf Storm","Superpower","Knock Off","Synthesis"],"stats":"HP: 110        Sp.Atk: 67\nAtk: 103       Sp.Def: 83\nDef: 83       Speed: 49"},{"pokemon":"Espeon","level":37,"gender":"Female","item":"Life Orb","ability":"Magic Bounce","nature":"Timid","moves":["Psychic","Weather Ball","Morning Sun","Calm Mind"],"stats":"HP: 106        Sp.Atk: 112\nAtk: 57       Sp.Def: 86\nDef: 60       Speed: 106"},{"pokemon":"Chandelure","level":37,"gender":"Female","item":"Choice Scarf","ability":"Flash Fire","nature":"Modest","moves":["Flamethrower","Shadow Ball","Energy Ball","Trick"],"stats":"HP: 102        Sp.Atk: 135\nAtk: 51       Sp.Def: 83\nDef: 83       Speed: 75"},{"pokemon":"Volcarona","level":37,"gender":"Female","item":"Heavy-Duty Boots","ability":"Flame Body","nature":"Timid","moves":["Quiver Dance","Fiery Dance","Bug Buzz","Morning Sun"],"stats":"HP: 121        Sp.Atk: 116\nAtk: 54       Sp.Def: 94\nDef: 64       Speed: 99"}]},
			{"id":"trainer-64","calculatorTrainerId":"trainer-64","models":["swsh-doctor-male","swsh-doctor-female"],"name":"Medical Team Iwan & Evelyn [Double] [Leads: Audino, Blissey]","split":"Hop 4","levelCap":"38","location":"Route 6","team":[{"pokemon":"Audino","level":37,"gender":"Male","item":"Sitrus Berry","ability":"Regenerator","nature":"Calm","moves":["Heal Pulse","Helping Hand","Simple Beam","Dazzling Gleam"],"stats":"HP: 134        Sp.Atk: 60\nAtk: 54       Sp.Def: 88\nDef: 80       Speed: 53"},{"pokemon":"Toxapex","level":37,"gender":"Male","item":"Black Sludge","ability":"Regenerator","nature":"Bold","moves":["Baneful Bunker","Venoshock","Toxic","Wide Guard"],"stats":"HP: 95        Sp.Atk: 55\nAtk: 56       Sp.Def: 121\nDef: 140       Speed: 42"},{"pokemon":"Porygon2","level":37,"gender":"Genderless","item":"Eviolite","ability":"Download","nature":"Modest","moves":["Tri Attack","Icy Wind","Recover","Ally Switch"],"stats":"HP: 121        Sp.Atk: 103\nAtk: 67       Sp.Def: 86\nDef: 83       Speed: 60"},{"pokemon":"Blissey","level":37,"gender":"Female","item":"Leftovers","ability":"Healer","nature":"Bold","moves":["Life Dew","Soft-Boiled","Solar Beam","Thunder Wave"],"stats":"HP: 247        Sp.Atk: 71\nAtk: 20       Sp.Def: 116\nDef: 25       Speed: 57"},{"pokemon":"Comfey","level":37,"gender":"Female","item":"Big Root","ability":"Triage","nature":"Modest","moves":["Draining Kiss","Floral Healing","Helping Hand","After You"],"stats":"HP: 96        Sp.Atk: 84\nAtk: 48       Sp.Def: 97\nDef: 83       Speed: 90"},{"pokemon":"Indeedee-F","level":37,"gender":"Female","item":"Terrain Extender","ability":"Psychic Surge","nature":"Calm","moves":["Expanding Force","Heal Pulse","Safeguard","Mystical Fire"],"stats":"HP: 110        Sp.Atk: 86\nAtk: 51       Sp.Def: 103\nDef: 64       Speed: 79"}]},
			{"id":"trainer-65","calculatorTrainerId":"trainer-65","models":["swsh-backpacker"],"name":"Backpacker Diane [Single]","split":"Hop 4","levelCap":"38","location":"Route 6","team":[{"pokemon":"Sawk","level":37,"gender":"Male","item":"Salac Berry","ability":"Sturdy","nature":"Adamant","moves":["Endure","Reversal","Knock Off","Poison Jab"],"stats":"HP: 113        Sp.Atk: 34\nAtk: 118       Sp.Def: 71\nDef: 71       Speed: 79"},{"pokemon":"Mudsdale","level":37,"gender":"Female","item":"Assault Vest","ability":"Stamina","nature":"Impish","moves":["High Horsepower","Body Press","Heavy Slam","Rock Slide"],"stats":"HP: 132        Sp.Atk: 51\nAtk: 108       Sp.Def: 79\nDef: 99       Speed: 42"},{"pokemon":"Crustle","level":37,"gender":"Male","item":"White Herb","ability":"Sturdy","nature":"Adamant","moves":["Shell Smash","Rock Blast","X-Scissor","Earthquake"],"stats":"HP: 110        Sp.Atk: 57\nAtk: 103       Sp.Def: 71\nDef: 108       Speed: 49"},{"pokemon":"Sandaconda","level":37,"gender":"Female","item":"Soft Sand","ability":"Sand Spit","nature":"Careful","moves":["Glare","Coil","Earthquake","Fire Fang"],"stats":"HP: 111        Sp.Atk: 57\nAtk: 95       Sp.Def: 74\nDef: 108       Speed: 69"},{"pokemon":"Solrock","level":37,"gender":"Genderless","item":"Heat Rock","ability":"Levitate","nature":"Adamant","moves":["Sunny Day","Solar Blade","Flare Blitz","Rock Slide"],"stats":"HP: 125        Sp.Atk: 51\nAtk: 94       Sp.Def: 64\nDef: 79       Speed: 68"}]},
			{"id":"trainer-66","calculatorTrainerId":"trainer-66","models":["swsh-model"],"name":"Model Nicola [Single]","split":"Hop 4","levelCap":"38","location":"Route 6","team":[{"pokemon":"Tsareena","level":37,"gender":"Female","item":"Miracle Seed","ability":"Queenly Majesty","nature":"Jolly","moves":["Trop Kick","High Jump Kick","U-turn","Rapid Spin"],"stats":"HP: 111        Sp.Atk: 47\nAtk: 105       Sp.Def: 88\nDef: 88       Speed: 75"},{"pokemon":"Milotic","level":37,"gender":"Female","item":"Leftovers","ability":"Competitive","nature":"Bold","moves":["Scald","Recover","Ice Beam","Dragon Tail"],"stats":"HP: 128        Sp.Atk: 90\nAtk: 54       Sp.Def: 108\nDef: 81       Speed: 76"},{"pokemon":"Salazzle","level":37,"gender":"Female","item":"Black Sludge","ability":"Corrosion","nature":"Timid","moves":["Flamethrower","Toxic","Venoshock","Substitute"],"stats":"HP: 108        Sp.Atk: 98\nAtk: 56       Sp.Def: 60\nDef: 60       Speed: 113"},{"pokemon":"Frosmoth","level":37,"gender":"Female","item":"Heavy-Duty Boots","ability":"Ice Scales","nature":"Modest","moves":["Quiver Dance","Ice Beam","Bug Buzz","Giga Drain"],"stats":"HP: 110        Sp.Atk: 118\nAtk: 57       Sp.Def: 83\nDef: 60       Speed: 64"},{"pokemon":"Lopunny","level":37,"gender":"Female","item":"Silk Scarf","ability":"Cute Charm","nature":"Jolly","moves":["Fake Out","Triple Axel","Bounce","Retaliate"],"stats":"HP: 106        Sp.Atk: 50\nAtk: 72       Sp.Def: 87\nDef: 78       Speed: 103"}]},
			{"id":"trainer-67","calculatorTrainerId":"trainer-67","models":["swsh-backpacker"],"name":"Backpacker Ruth [Single]","split":"Hop 4","levelCap":"38","location":"Route 6","team":[{"pokemon":"Throh","level":37,"gender":"Female","item":"Flame Orb","ability":"Guts","nature":"Careful","moves":["Circle Throw","Knock Off","Bulk Up","Facade"],"stats":"HP: 147        Sp.Atk: 34\nAtk: 90       Sp.Def: 86\nDef: 79       Speed: 49"},{"pokemon":"Shiftry","level":37,"gender":"Male","item":"Black Glasses","ability":"Chlorophyll","nature":"Naughty","moves":["Solar Blade","Sucker Punch","Heat Wave","Fake Out"],"stats":"HP: 125        Sp.Atk: 83\nAtk: 99       Sp.Def: 54\nDef: 60       Speed: 75"},{"pokemon":"Gigalith","level":37,"gender":"Male","item":"Weakness Policy","ability":"Sand Stream","nature":"Brave","moves":["Stone Edge","Body Press","Heavy Slam","Earthquake"],"stats":"HP: 121        Sp.Atk: 60\nAtk: 127       Sp.Def: 75\nDef: 112       Speed: 30"},{"pokemon":"Mandibuzz","level":37,"gender":"Female","item":"Sharp Beak","ability":"Overcoat","nature":"Impish","moves":["Foul Play","Brave Bird","Roost","Tailwind"],"stats":"HP: 139        Sp.Atk: 51\nAtk: 64       Sp.Def: 86\nDef: 103       Speed: 75"},{"pokemon":"Drampa","level":37,"gender":"Male","item":"Wise Glasses","ability":"Berserk","nature":"Modest","moves":["Hyper Voice","Dragon Pulse","Flamethrower","Glare"],"stats":"HP: 116        Sp.Atk: 127\nAtk: 54       Sp.Def: 83\nDef: 79       Speed: 43"}]},
			{"id":"trainer-68","calculatorTrainerId":"trainer-68","models":["swsh-artist"],"name":"Artist Duncan [Single]","split":"Hop 4","levelCap":"38","location":"Route 6","team":[{"pokemon":"Sudowoodo","level":37,"gender":"Male","item":"Hard Stone","ability":"Rock Head","nature":"Adamant","moves":["Head Smash","Wood Hammer","Sucker Punch","Rock Polish"],"stats":"HP: 110        Sp.Atk: 34\nAtk: 99       Sp.Def: 64\nDef: 101       Speed: 38"},{"pokemon":"Orbeetle","level":37,"gender":"Female","item":"Leftovers","ability":"Swarm","nature":"Bold","moves":["Calm Mind","Stored Power","Weather Ball","Recover"],"stats":"HP: 102        Sp.Atk: 75\nAtk: 44       Sp.Def: 105\nDef: 106       Speed: 83"},{"pokemon":"Claydol","level":37,"gender":"Genderless","item":"Heat Rock","ability":"Levitate","nature":"Calm","moves":["Sunny Day","Solar Beam","Earth Power","Cosmic Power"],"stats":"HP: 102        Sp.Atk: 68\nAtk: 61       Sp.Def: 115\nDef: 94       Speed: 71"},{"pokemon":"Grapploct","level":37,"gender":"Male","item":"Black Belt","ability":"Technician","nature":"Careful","moves":["Octolock","Detect","Brutal Swing","Fire Punch"],"stats":"HP: 117        Sp.Atk: 61\nAtk: 103       Sp.Def: 82\nDef: 83       Speed: 47"},{"pokemon":"Sigilyph","level":37,"gender":"Female","item":"Flame Orb","ability":"Magic Guard","nature":"Timid","moves":["Psycho Shift","Heat Wave","Cosmic Power","Air Slash"],"stats":"HP: 111        Sp.Atk: 92\nAtk: 53       Sp.Def: 75\nDef: 75       Speed: 96"}]},
			{"id":"trainer-69","calculatorTrainerId":"trainer-69","models":["swsh-hop"],"name":"Hop 4 Grass Starter [Single]","split":"Hop 4","levelCap":"38","location":"Stow-on-Side","team":[{"pokemon":"Cramorant","level":38,"gender":"Female","item":"Wacan Berry","ability":"Gulp Missile","nature":"Bold","moves":["Attract","Roost","Surf","Air Slash"],"stats":"HP: 112        Sp.Atk: 81\nAtk: 72       Sp.Def: 88\nDef: 63       Speed: 81"},{"pokemon":"Mamoswine","level":38,"gender":"Male","item":"Never-Melt Ice","ability":"Thick Fat","nature":"Adamant","moves":["Ice Shard","Knock Off","Earthquake","Icicle Crash"],"stats":"HP: 143        Sp.Atk: 62\nAtk: 126       Sp.Def: 62\nDef: 77       Speed: 77"},{"pokemon":"Cloyster","level":38,"gender":"Male","item":"King’s Rock","ability":"Skill Link","nature":"Adamant","moves":["Shell Smash","Rock Blast","Icicle Spear","Liquidation"],"stats":"HP: 97        Sp.Atk: 72\nAtk: 96       Sp.Def: 50\nDef: 153       Speed: 69"},{"pokemon":"Zygarde 10%","level":38,"gender":"Genderless","item":"Yache Berry","ability":"Aura Break","nature":"Adamant","moves":["Glare","Superpower","Outrage","Thousand Arrows"],"stats":"HP: 100        Sp.Atk: 56\nAtk: 101       Sp.Def: 81\nDef: 70       Speed: 104","sprite":"zygarde-10"},{"pokemon":"Lycanroc","level":38,"gender":"Male","item":"Life Orb","ability":"Tough Claws","nature":"Jolly","moves":["Accelerock","Stone Edge","Close Combat","Psychic Fangs"],"stats":"HP: 116        Sp.Atk: 52\nAtk: 105       Sp.Def: 66\nDef: 66       Speed: 110","sprite":"lycanroc-dusk"},{"pokemon":"Inteleon","level":38,"gender":"Male","item":"Scope Lens","ability":"Sniper","nature":"Modest","moves":["Rain Dance","Snipe Shot","Mud Shot","Air Slash"],"stats":"HP: 112        Sp.Atk: 122\nAtk: 72       Sp.Def: 66\nDef: 66       Speed: 107"}]},
			{"id":"trainer-70","calculatorTrainerId":"trainer-70","models":["swsh-hop"],"name":"Hop 4 Fire Starter [Single]","split":"Hop 4","levelCap":"38","location":"Stow-on-Side","team":[{"pokemon":"Cramorant","level":38,"gender":"Female","item":"Wacan Berry","ability":"Gulp Missile","nature":"Bold","moves":["Attract","Roost","Surf","Air Slash"],"stats":"HP: 112        Sp.Atk: 81\nAtk: 72       Sp.Def: 88\nDef: 63       Speed: 81"},{"pokemon":"Drapion","level":38,"gender":"Male","item":"Black Sludge","ability":"Battle Armor","nature":"Jolly","moves":["Swords Dance","Knock Off","Poison Jab","Aqua Tail"],"stats":"HP: 112        Sp.Atk: 55\nAtk: 85       Sp.Def: 73\nDef: 100       Speed: 96"},{"pokemon":"Aurorus","level":38,"gender":"Female","item":"Power Herb","ability":"Snow Warning","nature":"Timid","moves":["Rock Polish","Freeze-Dry","Earth Power","Meteor Beam"],"stats":"HP: 153        Sp.Atk: 92\nAtk: 67       Sp.Def: 86\nDef: 71       Speed: 66"},{"pokemon":"Zygarde 10%","level":38,"gender":"Genderless","item":"Yache Berry","ability":"Aura Break","nature":"Adamant","moves":["Glare","Superpower","Outrage","Thousand Arrows"],"stats":"HP: 100        Sp.Atk: 56\nAtk: 101       Sp.Def: 81\nDef: 70       Speed: 104","sprite":"zygarde-10"},{"pokemon":"Froslass","level":38,"gender":"Female","item":"Bright Powder","ability":"Snow Cloak","nature":"Timid","moves":["Hail","Substitute","Blizzard","Shadow Ball"],"stats":"HP: 112        Sp.Atk: 92\nAtk: 82       Sp.Def: 69\nDef: 69       Speed: 110"},{"pokemon":"Rillaboom","level":38,"gender":"Male","item":"Assault Vest","ability":"Grassy Surge","nature":"Adamant","moves":["Fake Out","Grassy Glide","High Horsepower","Drain Punch"],"stats":"HP: 135        Sp.Atk: 55\nAtk: 122       Sp.Def: 69\nDef: 85       Speed: 81"}]},
			{"id":"trainer-71","calculatorTrainerId":"trainer-71","models":["swsh-hop"],"name":"Hop 4 Water Starter [Single]","split":"Hop 4","levelCap":"38","location":"Stow-on-Side","team":[{"pokemon":"Cramorant","level":38,"gender":"Female","item":"Wacan Berry","ability":"Gulp Missile","nature":"Bold","moves":["Attract","Roost","Surf","Air Slash"],"stats":"HP: 112        Sp.Atk: 81\nAtk: 72       Sp.Def: 88\nDef: 63       Speed: 81"},{"pokemon":"Toxtricity","level":38,"gender":"Male","item":"Choice Specs","ability":"Punk Rock","nature":"Modest","moves":["Hex","Sludge Bomb","Boomburst","Snarl"],"stats":"HP: 116        Sp.Atk: 113\nAtk: 81       Sp.Def: 69\nDef: 69       Speed: 73","sprite":"toxtricity-lowkey"},{"pokemon":"Rotom-Mow","level":38,"gender":"Genderless","item":"Choice Scarf","ability":"Levitate","nature":"Timid","moves":["Trick","Leaf Storm","Thunderbolt","Shadow Ball"],"stats":"HP: 97        Sp.Atk: 96\nAtk: 59       Sp.Def: 98\nDef: 98       Speed: 90"},{"pokemon":"Zygarde 10%","level":38,"gender":"Genderless","item":"Yache Berry","ability":"Aura Break","nature":"Adamant","moves":["Glare","Superpower","Outrage","Thousand Arrows"],"stats":"HP: 100        Sp.Atk: 56\nAtk: 101       Sp.Def: 81\nDef: 70       Speed: 104","sprite":"zygarde-10"},{"pokemon":"Zoroark","level":38,"gender":"Male","item":"Assault Vest","ability":"Illusion","nature":"Naive","moves":["Knock Off","Flamethrower","Sludge Bomb","U-turn"],"stats":"HP: 105        Sp.Atk: 107\nAtk: 96       Sp.Def: 55\nDef: 62       Speed: 105"},{"pokemon":"Cinderace","level":38,"gender":"Male","item":"Life Orb","ability":"Libero","nature":"Jolly","moves":["Pyro Ball","Low Kick","Gunk Shot","U-turn"],"stats":"HP: 120        Sp.Atk: 59\nAtk: 104       Sp.Def: 73\nDef: 73       Speed: 117"}]},
			{"id":"trainer-72","calculatorTrainerId":"trainer-72","models":["swsh-fighting-gym-male"],"name":"Gym Trainer Ian [Single]","split":"Bea","levelCap":"40","location":"Fighting Gym","team":[{"pokemon":"Hitmontop","level":39,"gender":"Male","item":"Black Belt","ability":"Intimidate","nature":"Careful","moves":["Fake Out","Triple Axel","Brick Break","Bullet Punch"],"stats":"HP: 100        Sp.Atk: 39\nAtk: 91       Sp.Def: 112\nDef: 91       Speed: 71"},{"pokemon":"Passimian","level":39,"gender":"Male","item":"Expert Belt","ability":"Defiant","nature":"Jolly","moves":["Close Combat","Knock Off","Rock Slide","U-turn"],"stats":"HP: 139        Sp.Atk: 43\nAtk: 110       Sp.Def: 63\nDef: 87       Speed: 86"},{"pokemon":"Gallade","level":39,"gender":"Male","item":"Scope Lens","ability":"Steadfast","nature":"Adamant","moves":["Psycho Cut","Sacred Sword","Night Slash","Leaf Blade"],"stats":"HP: 114        Sp.Atk: 60\nAtk: 125       Sp.Def: 106\nDef: 67       Speed: 79"},{"pokemon":"Toxicroak","level":39,"gender":"Female","item":"Black Sludge","ability":"Dry Skin","nature":"Jolly","moves":["Drain Punch","Poison Jab","Sucker Punch","Taunt"],"stats":"HP: 125        Sp.Atk: 75\nAtk: 99       Sp.Def: 67\nDef: 67       Speed: 91"},{"pokemon":"Falinks","level":39,"gender":"Genderless","item":"Lum Berry","ability":"Battle Armor","nature":"Adamant","moves":["No Retreat","First Impression","Close Combat","Smart Strike"],"stats":"HP: 111        Sp.Atk: 63\nAtk: 104       Sp.Def: 63\nDef: 95       Speed: 75"}]},
			{"id":"trainer-73","calculatorTrainerId":"trainer-73","models":["swsh-fighting-gym-female"],"name":"Gym Trainer Claire [Single]","split":"Bea","levelCap":"40","location":"Fighting Gym","team":[{"pokemon":"Scrafty","level":39,"gender":"Female","item":"Roseli Berry","ability":"Intimidate","nature":"Careful","moves":["Fake Out","Drain Punch","Crunch","Bulk Up"],"stats":"HP: 111        Sp.Atk: 46\nAtk: 87       Sp.Def: 116\nDef: 106       Speed: 62"},{"pokemon":"Grapploct","level":39,"gender":"Male","item":"Big Root","ability":"Technician","nature":"Impish","moves":["Octolock","Drain Punch","Liquidation","Detect"],"stats":"HP: 123        Sp.Atk: 63\nAtk: 109       Sp.Def: 79\nDef: 95       Speed: 49"},{"pokemon":"Bewear","level":39,"gender":"Female","item":"Assault Vest","ability":"Fluffy","nature":"Adamant","moves":["Drain Punch","Double-Edge","Darkest Lariat","High Horsepower"],"stats":"HP: 154        Sp.Atk: 53\nAtk: 125       Sp.Def: 63\nDef: 79       Speed: 63"},{"pokemon":"Pangoro","level":39,"gender":"Male","item":"Black Glasses","ability":"Iron Fist","nature":"Adamant","moves":["Hammer Arm","Bullet Punch","Throat Chop","Parting Shot"],"stats":"HP: 135        Sp.Atk: 63\nAtk: 124       Sp.Def: 72\nDef: 77       Speed: 62"},{"pokemon":"Sirfetch'd","level":39,"gender":"Male","item":"Leek","ability":"Scrappy","nature":"Adamant","moves":["Meteor Assault","First Impression","Knock Off","Brave Bird"],"stats":"HP: 109        Sp.Atk: 63\nAtk: 134       Sp.Def: 81\nDef: 91       Speed: 67"}]},
			{"id":"trainer-74","calculatorTrainerId":"trainer-74","models":["swsh-fighting-gym-male"],"name":"Gym Trainer Simon [Single]","split":"Bea","levelCap":"40","location":"Fighting Gym","team":[{"pokemon":"Sawk","level":39,"gender":"Male","item":"Salac Berry","ability":"Sturdy","nature":"Adamant","moves":["Endure","Reversal","Knock Off","Poison Jab"],"stats":"HP: 119        Sp.Atk: 36\nAtk: 125       Sp.Def: 75\nDef: 75       Speed: 83"},{"pokemon":"Throh","level":39,"gender":"Male","item":"Flame Orb","ability":"Guts","nature":"Careful","moves":["Circle Throw","Facade","Knock Off","Bulk Up"],"stats":"HP: 154        Sp.Atk: 36\nAtk: 95       Sp.Def: 91\nDef: 83       Speed: 52"},{"pokemon":"Poliwrath","level":39,"gender":"Male","item":"Mystic Water","ability":"Water Absorb","nature":"Modest","moves":["Hydro Pump","Focus Blast","Ice Beam","Vacuum Wave"],"stats":"HP: 131        Sp.Atk: 78\nAtk: 81       Sp.Def: 87\nDef: 91       Speed: 71"},{"pokemon":"Heracross","level":39,"gender":"Male","item":"Coba Berry","ability":"Moxie","nature":"Adamant","moves":["Close Combat","Megahorn","Rock Slide","Throat Chop"],"stats":"HP: 123        Sp.Atk: 43\nAtk: 125       Sp.Def: 91\nDef: 75       Speed: 83"},{"pokemon":"Kommo-o","level":39,"gender":"Female","item":"Throat Spray","ability":"Bulletproof","nature":"Modest","moves":["Clanging Scales","Aura Sphere","Flash Cannon","Flamethrower"],"stats":"HP: 119        Sp.Atk: 104\nAtk: 91       Sp.Def: 98\nDef: 114       Speed: 83"}]},
			{"id":"trainer-75","calculatorTrainerId":"trainer-75","models":["swsh-bea"],"name":"Bea 1 [Single]","split":"Bea","levelCap":"40","location":"Fighting Gym","team":[{"pokemon":"Buzzwole","level":40,"gender":"Genderless","item":"Rocky Helmet","ability":"Beast Boost","nature":"Adamant","moves":["Roost","Ice Punch","Earthquake","Close Combat"],"stats":"HP: 148        Sp.Atk: 53\nAtk: 140       Sp.Def: 59\nDef: 128       Speed: 80"},{"pokemon":"Mienshao","level":40,"gender":"Female","item":"Choice Band","ability":"Inner Focus","nature":"Jolly","moves":["U-turn","Knock Off","Poison Jab","Close Combat"],"stats":"HP: 114        Sp.Atk: 83\nAtk: 117       Sp.Def: 65\nDef: 65       Speed: 111"},{"pokemon":"Lucario","level":40,"gender":"Male","item":"Life Orb","ability":"Inner Focus","nature":"Timid","moves":["Nasty Plot","Flash Cannon","Aura Sphere","Earthquake"],"stats":"HP: 118        Sp.Atk: 109\nAtk: 94       Sp.Def: 73\nDef: 73       Speed: 97"},{"pokemon":"Hawlucha","level":40,"gender":"Male","item":"Power Herb","ability":"Unburden","nature":"Jolly","moves":["Swords Dance","Acrobatics","Close Combat","Sky Attack"],"stats":"HP: 124        Sp.Atk: 68\nAtk: 91       Sp.Def: 67\nDef: 77       Speed: 122"},{"pokemon":"Marshadow","level":40,"gender":"Genderless","item":"Spell Tag","ability":"Technician","nature":"Adamant","moves":["Low Kick","Ice Punch","Rock Tomb","Spectral Thief"],"stats":"HP: 134        Sp.Atk: 80\nAtk: 128       Sp.Def: 89\nDef: 81       Speed: 117"},{"pokemon":"Machamp GMAX","level":40,"gender":"Male","item":"Assault Vest","ability":"No Guard","nature":"Adamant","moves":["Dynamic Punch","Knock Off","Stone Edge","Earthquake"],"stats":"HP: 134        Sp.Atk: 62\nAtk: 133       Sp.Def: 85\nDef: 81       Speed: 61","sprite":"machamp-gmax"}]},
			{"id":"trainer-76","calculatorTrainerId":"trainer-76","models":["swsh-bede"],"name":"Bede 3 [Single]","split":"Bede 3","levelCap":"42","location":"Stow-on-Side","team":[{"pokemon":"Copperajah","level":42,"gender":"Female","item":"Muscle Band","ability":"Sheer Force","nature":"Adamant","moves":["Heavy Slam","High Horsepower","Rock Slide","Superpower"],"stats":"HP: 167        Sp.Atk: 76\nAtk: 139       Sp.Def: 75\nDef: 75       Speed: 43"},{"pokemon":"Reuniclus","level":42,"gender":"Female","item":"Leftovers","ability":"Magic Guard","nature":"Bold","moves":["Calm Mind","Recover","Psyshock","Focus Blast"],"stats":"HP: 157        Sp.Atk: 123\nAtk: 64       Sp.Def: 89\nDef: 89       Speed: 43"},{"pokemon":"Gardevoir","level":42,"gender":"Female","item":"Wise Glasses","ability":"Trace","nature":"Timid","moves":["Moonblast","Psychic","Mystical Fire","Will-O-Wisp"],"stats":"HP: 122        Sp.Atk: 123\nAtk: 64       Sp.Def: 114\nDef: 72       Speed: 93"},{"pokemon":"Indeedee-F","level":42,"gender":"Female","item":"Terrain Extender","ability":"Psychic Surge","nature":"Modest","moves":["Expanding Force","Shadow Ball","Mystical Fire","Calm Mind"],"stats":"HP: 123        Sp.Atk: 106\nAtk: 57       Sp.Def: 106\nDef: 72       Speed: 89"},{"pokemon":"Mr. Mime","level":42,"gender":"Female","item":"Light Clay","ability":"Filter","nature":"Timid","moves":["Reflect","Light Screen","Encore","Freeze-Dry"],"stats":"HP: 98        Sp.Atk: 102\nAtk: 49       Sp.Def: 118\nDef: 72       Speed: 102"},{"pokemon":"Sylveon","level":42,"gender":"Female","item":"Throat Spray","ability":"Pixilate","nature":"Modest","moves":["Hyper Voice","Mystical Fire","Snarl","Substitute"],"stats":"HP: 144        Sp.Atk: 121\nAtk: 64       Sp.Def: 127\nDef: 72       Speed: 68"}]},
			{"id":"trainer-77","calculatorTrainerId":"trainer-77","models":["swsh-cook"],"name":"Cook Derek [Single]","split":"Opal","levelCap":"44","location":"Glimwood Tangle","team":[{"pokemon":"Amoonguss","level":43,"gender":"Male","item":"Black Sludge","ability":"Effect Spore","nature":"Bold","moves":["Spore","Giga Drain","Sludge Bomb","Clear Smog"],"stats":"HP: 164        Sp.Atk: 91\nAtk: 81       Sp.Def: 87\nDef: 85       Speed: 44"},{"pokemon":"Alcremie","level":43,"gender":"Female","item":"Sitrus Berry","ability":"Aroma Veil","nature":"Modest","moves":["Draining Kiss","Mystical Fire","Acid Armor","Recover"],"stats":"HP: 122        Sp.Atk: 123\nAtk: 62       Sp.Def: 122\nDef: 82       Speed: 73"},{"pokemon":"Appletun","level":43,"gender":"Male","item":"Big Root","ability":"Thick Fat","nature":"Calm","moves":["Apple Acid","Giga Drain","Leech Seed","Recover"],"stats":"HP: 160        Sp.Atk: 104\nAtk: 81       Sp.Def: 95\nDef: 87       Speed: 44"},{"pokemon":"Polteageist","level":43,"gender":"Genderless","item":"Leftovers","ability":"Weak Armor","nature":"Calm","moves":["Strength Sap","Shadow Ball","Teatime","Hex"],"stats":"HP: 117        Sp.Atk: 133\nAtk: 66       Sp.Def: 127\nDef: 74       Speed: 78"},{"pokemon":"Slurpuff","level":43,"gender":"Female","item":"Sitrus Berry","ability":"Unburden","nature":"Jolly","moves":["Belly Drum","Play Rough","Drain Punch","Sticky Web"],"stats":"HP: 136        Sp.Atk: 81\nAtk: 87       Sp.Def: 82\nDef: 92       Speed: 88"}]},
			{"id":"trainer-78","calculatorTrainerId":"trainer-78","models":["swsh-rail-staff","swsh-beauty"],"name":"Daring Couple Robert & Jacqueline [Double] [Leads: Shiinotic, Hatterene]","split":"Opal","levelCap":"44","location":"Glimwood Tangle","team":[{"pokemon":"Shiinotic","level":43,"gender":"Male","item":"Big Root","ability":"Effect Spore","nature":"Relaxed","moves":["Spore","Strength Sap","Giga Drain","Dazzling Gleam"],"stats":"HP: 117        Sp.Atk: 95\nAtk: 57       Sp.Def: 104\nDef: 95       Speed: 39"},{"pokemon":"Grimmsnarl","level":43,"gender":"Male","item":"Light Clay","ability":"Prankster","nature":"Careful","moves":["Reflect","Spirit Break","Fake Out","Thunder Wave"],"stats":"HP: 148        Sp.Atk: 90\nAtk: 121       Sp.Def: 90\nDef: 74       Speed: 69"},{"pokemon":"Trevenant","level":43,"gender":"Male","item":"Sitrus Berry","ability":"Harvest","nature":"Careful","moves":["Horn Leech","Shadow Claw","Will-O-Wisp","Leech Seed"],"stats":"HP: 139        Sp.Atk: 66\nAtk: 112       Sp.Def: 96\nDef: 83       Speed: 66"},{"pokemon":"Hatterene","level":43,"gender":"Female","item":"Wise Glasses","ability":"Magic Bounce","nature":"Quiet","moves":["Psychic","Dazzling Gleam","Mystical Fire","Life Dew"],"stats":"HP: 115        Sp.Atk: 148\nAtk: 95       Sp.Def: 106\nDef: 100       Speed: 38"},{"pokemon":"Mawile","level":43,"gender":"Female","item":"Occa Berry","ability":"Intimidate","nature":"Adamant","moves":["Play Rough","Iron Head","Sucker Punch","Fake Tears"],"stats":"HP: 109        Sp.Atk: 58\nAtk: 100       Sp.Def: 65\nDef: 91       Speed: 61"},{"pokemon":"Mimikyu","level":43,"gender":"Female","item":"Spell Tag","ability":"Disguise","nature":"Jolly","moves":["Play Rough","Shadow Claw","Shadow Sneak","Swords Dance"],"stats":"HP: 113        Sp.Atk: 54\nAtk: 95       Sp.Def: 108\nDef: 87       Speed: 110"}]},
			{"id":"trainer-79","calculatorTrainerId":"trainer-79","models":["swsh-madame"],"name":"Madame Judy [Single]","split":"Opal","levelCap":"44","location":"Glimwood Tangle","team":[{"pokemon":"Indeedee-F","level":43,"gender":"Female","item":"Terrain Extender","ability":"Psychic Surge","nature":"Calm","moves":["Expanding Force","Mystical Fire","Dazzling Gleam","Calm Mind"],"stats":"HP: 126        Sp.Atk: 100\nAtk: 58       Sp.Def: 118\nDef: 74       Speed: 91"},{"pokemon":"Indeedee-M","level":43,"gender":"Male","item":"Choice Specs","ability":"Inner Focus","nature":"Timid","moves":["Expanding Force","Hyper Voice","Shadow Ball","Energy Ball"],"stats":"HP: 117        Sp.Atk: 108\nAtk: 66       Sp.Def: 100\nDef: 65       Speed: 110","sprite":"indeedee"},{"pokemon":"Meowstic-M","level":43,"gender":"Male","item":"Light Clay","ability":"Prankster","nature":"Timid","moves":["Reflect","Light Screen","Thunder Wave","Psychic"],"stats":"HP: 129        Sp.Atk: 89\nAtk: 53       Sp.Def: 87\nDef: 83       Speed: 117","sprite":"meowstic"},{"pokemon":"Meowstic-F","level":43,"gender":"Female","item":"Wise Glasses","ability":"Competitive","nature":"Timid","moves":["Psychic","Shadow Ball","Charge Beam","Fake Tears"],"stats":"HP: 129        Sp.Atk: 89\nAtk: 53       Sp.Def: 87\nDef: 83       Speed: 117"},{"pokemon":"Gothitelle","level":43,"gender":"Female","item":"Colbur Berry","ability":"Shadow Tag","nature":"Modest","moves":["Psychic","Fake Tears","Thunderbolt","Rest"],"stats":"HP: 126        Sp.Atk: 110\nAtk: 58       Sp.Def: 112\nDef: 100       Speed: 74"}]},
			{"id":"trainer-80","calculatorTrainerId":"trainer-80","models":["swsh-breeder-female"],"name":"Pokemon Breeder Elena [Single]","split":"Opal","levelCap":"44","location":"Ballonlea","team":[{"pokemon":"Porygon2","level":43,"gender":"Genderless","item":"Eviolite","ability":"Download","nature":"Modest","moves":["Tri Attack","Ice Beam","Thunderbolt","Recover"],"stats":"HP: 139        Sp.Atk: 118\nAtk: 78       Sp.Def: 100\nDef: 95       Speed: 69"},{"pokemon":"Corsola","level":43,"gender":"Female","item":"Eviolite","ability":"Cursed Body","nature":"Bold","moves":["Strength Sap","Hex","Will-O-Wisp","Whirlpool"],"stats":"HP: 117        Sp.Atk: 74\nAtk: 58       Sp.Def: 104\nDef: 114       Speed: 44","sprite":"corsola-galar"},{"pokemon":"Dusclops","level":43,"gender":"Male","item":"Eviolite","ability":"Pressure","nature":"Careful","moves":["Shadow Punch","Pain Split","Will-O-Wisp","Brick Break"],"stats":"HP: 100        Sp.Atk: 62\nAtk: 78       Sp.Def: 143\nDef: 130       Speed: 39"},{"pokemon":"Roselia","level":43,"gender":"Female","item":"Eviolite","ability":"Natural Cure","nature":"Calm","moves":["Giga Drain","Sludge Bomb","Sleep Powder","Leech Seed"],"stats":"HP: 109        Sp.Atk: 104\nAtk: 62       Sp.Def: 95\nDef: 57       Speed: 74"},{"pokemon":"Rhydon","level":43,"gender":"Male","item":"Eviolite","ability":"Lightning Rod","nature":"Adamant","moves":["Earthquake","Rock Slide","Megahorn","Fire Punch"],"stats":"HP: 156        Sp.Atk: 51\nAtk: 143       Sp.Def: 57\nDef: 121       Speed: 52"},{"pokemon":"Clefairy","level":43,"gender":"Female","item":"Eviolite","ability":"Magic Guard","nature":"Bold","moves":["Moonblast","Flamethrower","Thunder Wave","Moonlight"],"stats":"HP: 126        Sp.Atk: 69\nAtk: 51       Sp.Def: 74\nDef: 64       Speed: 48"}]},
			{"id":"trainer-81","calculatorTrainerId":"trainer-81","models":["swsh-fairy-gym"],"name":"Gym Trainer Annette [Single]  [No Healing After]","split":"Opal","levelCap":"44","location":"Fairy Gym","team":[{"pokemon":"Mawile","level":43,"gender":"Female","item":"Occa Berry","ability":"Intimidate","nature":"Impish","moves":["Play Rough","Iron Head","Charm","Sucker Punch"],"stats":"HP: 109        Sp.Atk: 58\nAtk: 91       Sp.Def: 65\nDef: 100       Speed: 61"},{"pokemon":"Whimsicott","level":43,"gender":"Female","item":"Focus Sash","ability":"Prankster","nature":"Timid","moves":["Moonblast","Cotton Spore","Charm","Encore"],"stats":"HP: 117        Sp.Atk: 84\nAtk: 67       Sp.Def: 82\nDef: 91       Speed: 129"},{"pokemon":"Ribombee","level":43,"gender":"Female","item":"Silver Powder","ability":"Shield Dust","nature":"Timid","moves":["Moonblast","Struggle Bug","Sticky Web","Pollen Puff"],"stats":"HP: 117        Sp.Atk: 100\nAtk: 58       Sp.Def: 78\nDef: 69       Speed: 136"},{"pokemon":"Aromatisse","level":43,"gender":"Female","item":"Sitrus Berry","ability":"Aroma Veil","nature":"Bold","moves":["Draining Kiss","Mystical Fire","Reflect","Psychic"],"stats":"HP: 153        Sp.Atk: 103\nAtk: 72       Sp.Def: 94\nDef: 88       Speed: 43"}]},
			{"id":"trainer-82","calculatorTrainerId":"trainer-82","models":["swsh-fairy-gym"],"name":"Gym Trainer Teresa [Single] [No Healing Before or After]","split":"Opal","levelCap":"44","location":"Fairy Gym","team":[{"pokemon":"Mr. Mime","level":43,"gender":"Male","item":"Light Clay","ability":"Soundproof","nature":"Timid","moves":["Reflect","Light Screen","Encore","Dazzling Gleam"],"stats":"HP: 100        Sp.Atk: 104\nAtk: 51       Sp.Def: 121\nDef: 74       Speed: 104"},{"pokemon":"Slurpuff","level":43,"gender":"Female","item":"Sitrus Berry","ability":"Unburden","nature":"Jolly","moves":["Play Rough","Sticky Web","Yawn","Drain Punch"],"stats":"HP: 136        Sp.Atk: 81\nAtk: 87       Sp.Def: 82\nDef: 92       Speed: 88"},{"pokemon":"Klefki","level":43,"gender":"Female","item":"Shuca Berry","ability":"Prankster","nature":"Calm","moves":["Thunder Wave","Draining Kiss","Foul Play","Imprison"],"stats":"HP: 115        Sp.Atk: 87\nAtk: 78       Sp.Def: 102\nDef: 96       Speed: 82"},{"pokemon":"Primarina","level":43,"gender":"Female","item":"Throat Spray","ability":"Liquid Voice","nature":"Modest","moves":["Hyper Voice","Moonblast","Aqua Jet","Sing"],"stats":"HP: 135        Sp.Atk: 138\nAtk: 72       Sp.Def: 118\nDef: 81       Speed: 69"}]},
			{"id":"trainer-83","calculatorTrainerId":"trainer-83","models":["swsh-fairy-gym"],"name":"Gym Trainer Theodora [Single]  [No Healing Before]","split":"Opal","levelCap":"44","location":"Fairy Gym","team":[{"pokemon":"Rapidash","level":43,"gender":"Female","item":"Kee Berry","ability":"Pastel Veil","nature":"Jolly","moves":["Play Rough","Psycho Cut","Mystical Fire","Swords Dance"],"stats":"HP: 122        Sp.Atk: 78\nAtk: 104       Sp.Def: 87\nDef: 78       Speed: 118","sprite":"rapidash-galar"},{"pokemon":"Azumarill","level":43,"gender":"Female","item":"Mystic Water","ability":"Huge Power","nature":"Adamant","moves":["Play Rough","Aqua Jet","Liquidation","Knock Off"],"stats":"HP: 152        Sp.Atk: 62\nAtk: 67       Sp.Def: 87\nDef: 87       Speed: 61"},{"pokemon":"Mimikyu","level":43,"gender":"Female","item":"Lum Berry","ability":"Disguise","nature":"Jolly","moves":["Play Rough","Shadow Claw","Shadow Sneak","Hone Claws"],"stats":"HP: 113        Sp.Atk: 54\nAtk: 95       Sp.Def: 108\nDef: 87       Speed: 110"},{"pokemon":"Sylveon","level":43,"gender":"Female","item":"Throat Spray","ability":"Pixilate","nature":"Modest","moves":["Hyper Voice","Mystical Fire","Snarl","Quick Attack"],"stats":"HP: 148        Sp.Atk: 123\nAtk: 66       Sp.Def: 130\nDef: 74       Speed: 69"}]},
			{"id":"trainer-84","calculatorTrainerId":"trainer-84","models":["swsh-opal"],"name":"Opal [Single]","split":"Opal","levelCap":"44","location":"Fairy Gym","team":[{"pokemon":"Weezing","level":44,"gender":"Female","item":"Black Sludge","ability":"Levitate","nature":"Bold","moves":["Will-O-Wisp","Toxic Spikes","Sludge Bomb","Strange Steam"],"stats":"HP: 124        Sp.Atk: 93\nAtk: 87       Sp.Def: 80\nDef: 136       Speed: 71","sprite":"weezing-galar"},{"pokemon":"Togekiss","level":44,"gender":"Female","item":"Scope Lens","ability":"Super Luck","nature":"Modest","moves":["Yawn","Air Slash","Heat Wave","Dazzling Gleam"],"stats":"HP: 142        Sp.Atk: 136\nAtk: 55       Sp.Def: 119\nDef: 102       Speed: 89"},{"pokemon":"Diancie","level":44,"gender":"Genderless","item":"Leftovers","ability":"Clear Body","nature":"Brave","moves":["Trick Room","Body Press","Moonblast","Diamond Storm"],"stats":"HP: 111        Sp.Atk: 106\nAtk: 116       Sp.Def: 150\nDef: 150       Speed: 55"},{"pokemon":"Gardevoir","level":44,"gender":"Female","item":"Assault Vest","ability":"Synchronize","nature":"Modest","moves":["Moonblast","Thunderbolt","Shadow Ball","Psychic"],"stats":"HP: 127        Sp.Atk: 140\nAtk: 67       Sp.Def: 119\nDef: 75       Speed: 89"},{"pokemon":"Tapu Lele","level":44,"gender":"Genderless","item":"Terrain Extender","ability":"Psychic Surge","nature":"Timid","moves":["Flatter","Grass Knot","Psyshock","Nature’s Madness"],"stats":"HP: 129        Sp.Atk: 133\nAtk: 83       Sp.Def: 119\nDef: 84       Speed: 112"},{"pokemon":"Alcremie GMAX","level":44,"gender":"Female","item":"Babiri Berry","ability":"Aroma Veil","nature":"Modest","moves":["Dazzling Gleam","Mystical Fire","Psychic","Calm Mind"],"stats":"HP: 124        Sp.Atk: 126\nAtk: 63       Sp.Def: 125\nDef: 84       Speed: 74","sprite":"alcremie-gmax"}]},
			{"id":"trainer-85","calculatorTrainerId":"trainer-85","models":["swsh-hop"],"name":"Hop 5 Grass Starter [Single]","split":"Hop 5","levelCap":"47","location":"Route 7","team":[{"pokemon":"Dubwool","level":47,"gender":"Female","item":"Leftovers","ability":"Fluffy","nature":"Impish","moves":["Cotton Guard","Body Press","Rest","Sleep Talk"],"stats":"HP: 139        Sp.Atk: 67\nAtk: 94       Sp.Def: 104\nDef: 124       Speed: 102"},{"pokemon":"Corviknight","level":47,"gender":"Male","item":"Rocky Helmet","ability":"Mirror Armor","nature":"Careful","moves":["Brave Bird","Iron Head","Roost","Bulk Up"],"stats":"HP: 163        Sp.Atk: 62\nAtk: 101       Sp.Def: 108\nDef: 118       Speed: 82"},{"pokemon":"Politoed","level":47,"gender":"Male","item":"Damp Rock","ability":"Drizzle","nature":"Calm","moves":["Scald","Icy Wind","Encore","Hypnosis"],"stats":"HP: 156        Sp.Atk: 104\nAtk: 81       Sp.Def: 124\nDef: 90       Speed: 85"},{"pokemon":"Kingdra","level":47,"gender":"Female","item":"Life Orb","ability":"Swift Swim","nature":"Modest","moves":["Hydro Pump","Dragon Pulse","Hurricane","Flash Cannon"],"stats":"HP: 142        Sp.Atk: 118\nAtk: 97       Sp.Def: 108\nDef: 108       Speed: 99"},{"pokemon":"Raikou","level":47,"gender":"Genderless","item":"Magnet","ability":"Inner Focus","nature":"Timid","moves":["Thunder","Volt Switch","Scald","Extrasensory"],"stats":"HP: 156        Sp.Atk: 127\nAtk: 89       Sp.Def: 113\nDef: 90       Speed: 139"},{"pokemon":"Inteleon","level":47,"gender":"Male","item":"Scope Lens","ability":"Sniper","nature":"Timid","moves":["Focus Energy","Snipe Shot","Air Slash","Dark Pulse"],"stats":"HP: 137        Sp.Atk: 137\nAtk: 89       Sp.Def: 80\nDef: 80       Speed: 145"}]},
			{"id":"trainer-86","calculatorTrainerId":"trainer-86","models":["swsh-hop"],"name":"Hop 5 Fire Starter [Single]","split":"Hop 5","levelCap":"47","location":"Route 7","team":[{"pokemon":"Dubwool","level":47,"gender":"Female","item":"Leftovers","ability":"Fluffy","nature":"Impish","moves":["Cotton Guard","Body Press","Rest","Sleep Talk"],"stats":"HP: 139        Sp.Atk: 67\nAtk: 94       Sp.Def: 104\nDef: 124       Speed: 102"},{"pokemon":"Corviknight","level":47,"gender":"Male","item":"Rocky Helmet","ability":"Mirror Armor","nature":"Careful","moves":["Brave Bird","Iron Head","Roost","Bulk Up"],"stats":"HP: 163        Sp.Atk: 62\nAtk: 101       Sp.Def: 108\nDef: 118       Speed: 82"},{"pokemon":"Dhelmise","level":47,"gender":"Genderless","item":"Spell Tag","ability":"Steelworker","nature":"Adamant","moves":["Power Whip","Poltergeist","Anchor Shot","Rapid Spin"],"stats":"HP: 137        Sp.Atk: 90\nAtk: 156       Sp.Def: 104\nDef: 113       Speed: 57"},{"pokemon":"Magnezone","level":47,"gender":"Genderless","item":"Air Balloon","ability":"Analytic","nature":"Modest","moves":["Thunderbolt","Flash Cannon","Body Press","Volt Switch"],"stats":"HP: 137        Sp.Atk: 155\nAtk: 76       Sp.Def: 104\nDef: 127       Speed: 75"},{"pokemon":"Suicune","level":47,"gender":"Genderless","item":"Leftovers","ability":"Inner Focus","nature":"Bold","moves":["Scald","Ice Beam","Calm Mind","Rest"],"stats":"HP: 165        Sp.Atk: 104\nAtk: 81       Sp.Def: 127\nDef: 139       Speed: 99"},{"pokemon":"Rillaboom","level":47,"gender":"Male","item":"Miracle Seed","ability":"Grassy Surge","nature":"Adamant","moves":["Drum Beating","Grassy Glide","Knock Off","Drain Punch"],"stats":"HP: 165        Sp.Atk: 67\nAtk: 150       Sp.Def: 85\nDef: 104       Speed: 99"}]},
			{"id":"trainer-87","calculatorTrainerId":"trainer-87","models":["swsh-hop"],"name":"Hop 5 Water Starter [Single]","split":"Hop 5","levelCap":"47","location":"Route 7","team":[{"pokemon":"Dubwool","level":47,"gender":"Female","item":"Leftovers","ability":"Fluffy","nature":"Impish","moves":["Cotton Guard","Body Press","Rest","Sleep Talk"],"stats":"HP: 139        Sp.Atk: 67\nAtk: 94       Sp.Def: 104\nDef: 124       Speed: 102"},{"pokemon":"Corviknight","level":47,"gender":"Male","item":"Rocky Helmet","ability":"Mirror Armor","nature":"Careful","moves":["Brave Bird","Iron Head","Roost","Bulk Up"],"stats":"HP: 163        Sp.Atk: 62\nAtk: 101       Sp.Def: 108\nDef: 118       Speed: 82"},{"pokemon":"Ninetales","level":47,"gender":"Female","item":"Heat Rock","ability":"Drought","nature":"Timid","moves":["Flamethrower","Solar Beam","Nasty Plot","Will-O-Wisp"],"stats":"HP: 140        Sp.Atk: 95\nAtk: 81       Sp.Def: 113\nDef: 90       Speed: 124"},{"pokemon":"Venusaur","level":47,"gender":"Male","item":"Black Sludge","ability":"Chlorophyll","nature":"Modest","moves":["Growth","Giga Drain","Sludge Bomb","Weather Ball"],"stats":"HP: 146        Sp.Atk: 124\nAtk: 86       Sp.Def: 113\nDef: 97       Speed: 94"},{"pokemon":"Entei","level":47,"gender":"Genderless","item":"Choice Band","ability":"Inner Focus","nature":"Adamant","moves":["Sacred Fire","Stone Edge","Extreme Speed","Stomping Tantrum"],"stats":"HP: 179        Sp.Atk: 93\nAtk: 139       Sp.Def: 90\nDef: 99       Speed: 113"},{"pokemon":"Cinderace","level":47,"gender":"Male","item":"Life Orb","ability":"Libero","nature":"Jolly","moves":["Pyro Ball","Sucker Punch","High Jump Kick","U-turn"],"stats":"HP: 146        Sp.Atk: 72\nAtk: 128       Sp.Def: 90\nDef: 90       Speed: 144"}]},
			{"id":"trainer-88","calculatorTrainerId":"trainer-88","models":["swsh-model"],"name":"Model Mila [Single]","split":"Gordie","levelCap":"50","location":"Route 7","team":[{"pokemon":"Liepard","level":48,"gender":"Female","item":"Focus Sash","ability":"Prankster","nature":"Timid","moves":["Fake Out","Thunder Wave","Encore","Dark Pulse"],"stats":"HP: 134        Sp.Atk: 104\nAtk: 93       Sp.Def: 67\nDef: 67       Speed: 133"},{"pokemon":"Ninetales","level":48,"gender":"Female","item":"Light Clay","ability":"Snow Warning","nature":"Timid","moves":["Aurora Veil","Moonblast","Freeze-Dry","Hypnosis"],"stats":"HP: 142        Sp.Atk: 97\nAtk: 75       Sp.Def: 115\nDef: 91       Speed: 136","sprite":"ninetales-alola"},{"pokemon":"Vespiquen","level":48,"gender":"Female","item":"Sitrus Berry","ability":"Pressure","nature":"Careful","moves":["Attack Order","Defend Order","Heal Order","Toxic"],"stats":"HP: 140        Sp.Atk: 86\nAtk: 96       Sp.Def: 128\nDef: 117       Speed: 58"},{"pokemon":"Lilligant","level":48,"gender":"Female","item":"Miracle Seed","ability":"Own Tempo","nature":"Modest","moves":["Quiver Dance","Giga Drain","Pollen Puff","Sleep Powder"],"stats":"HP: 140        Sp.Atk: 137\nAtk: 69       Sp.Def: 91\nDef: 91       Speed: 106"},{"pokemon":"Milotic","level":48,"gender":"Female","item":"Flame Orb","ability":"Marvel Scale","nature":"Bold","moves":["Scald","Recover","Ice Beam","Coil"],"stats":"HP: 164        Sp.Atk: 115\nAtk: 69       Sp.Def: 139\nDef: 104       Speed: 97"},{"pokemon":"Salazzle","level":48,"gender":"Female","item":"Black Sludge","ability":"Corrosion","nature":"Timid","moves":["Flamethrower","Sludge Bomb","Toxic","Substitute"],"stats":"HP: 138        Sp.Atk: 126\nAtk: 72       Sp.Def: 77\nDef: 77       Speed: 145"}]},
			{"id":"trainer-89","calculatorTrainerId":"trainer-89","models":["swsh-cabbie"],"name":"Cabbie Bruce [Single]","split":"Gordie","levelCap":"50","location":"Route 7","team":[{"pokemon":"Corviknight","level":48,"gender":"Male","item":"Sharp Beak","ability":"Mirror Armor","nature":"Careful","moves":["Brave Bird","Iron Head","Roost","Tailwind"],"stats":"HP: 166        Sp.Atk: 63\nAtk: 103       Sp.Def: 111\nDef: 120       Speed: 84"},{"pokemon":"Klinklang","level":48,"gender":"Genderless","item":"Metal Coat","ability":"Clear Body","nature":"Adamant","moves":["Gear Grind","Wild Charge","Shift Gear","Thunder Wave"],"stats":"HP: 130        Sp.Atk: 78\nAtk: 126       Sp.Def: 101\nDef: 130       Speed: 106"},{"pokemon":"Mudsdale","level":48,"gender":"Female","item":"Assault Vest","ability":"Stamina","nature":"Impish","moves":["High Horsepower","Heavy Slam","Body Press","Rock Slide"],"stats":"HP: 168        Sp.Atk: 64\nAtk: 139       Sp.Def: 101\nDef: 126       Speed: 53"},{"pokemon":"Rotom-Fan","level":48,"gender":"Genderless","item":"Wise Glasses","ability":"Levitate","nature":"Timid","moves":["Thunderbolt","Air Slash","Volt Switch","Will-O-Wisp"],"stats":"HP: 120        Sp.Atk: 120\nAtk: 73       Sp.Def: 122\nDef: 122       Speed: 112"},{"pokemon":"Coalossal","level":48,"gender":"Male","item":"Weakness Policy","ability":"Flame Body","nature":"Adamant","moves":["Heat Crash","Rock Blast","High Horsepower","Rapid Spin"],"stats":"HP: 178        Sp.Atk: 86\nAtk: 105       Sp.Def: 106\nDef: 135       Speed: 48"},{"pokemon":"Perrserker","level":48,"gender":"Male","item":"Scope Lens","ability":"Steely Spirit","nature":"Adamant","moves":["Iron Head","Throat Chop","Close Combat","Fake Out"],"stats":"HP: 140        Sp.Atk: 60\nAtk: 137       Sp.Def: 77\nDef: 115       Speed: 67"}]},
			{"id":"trainer-90","calculatorTrainerId":"trainer-90","models":["swsh-doctor-female"],"name":"Doctor Joanna [Single]","split":"Gordie","levelCap":"50","location":"Route 8","team":[{"pokemon":"Audino","level":48,"gender":"Female","item":"Sitrus Berry","ability":"Regenerator","nature":"Calm","moves":["Hyper Voice","Thunder Wave","Wish","Protect"],"stats":"HP: 171        Sp.Atk: 77\nAtk: 69       Sp.Def: 112\nDef: 102       Speed: 67"},{"pokemon":"Aromatisse","level":48,"gender":"Female","item":"Leftovers","ability":"Aroma Veil","nature":"Bold","moves":["Moonblast","Mystical Fire","Calm Mind","Aromatherapy"],"stats":"HP: 169        Sp.Atk: 114\nAtk: 80       Sp.Def: 105\nDef: 97       Speed: 47"},{"pokemon":"Toxapex","level":48,"gender":"Female","item":"Black Sludge","ability":"Regenerator","nature":"Bold","moves":["Scald","Toxic","Recover","Venoshock"],"stats":"HP: 120        Sp.Atk: 70\nAtk: 72       Sp.Def: 156\nDef: 181       Speed: 53"},{"pokemon":"Porygon-Z","level":48,"gender":"Genderless","item":"Silk Scarf","ability":"Adaptability","nature":"Timid","moves":["Tri Attack","Thunderbolt","Ice Beam","Recover"],"stats":"HP: 154        Sp.Atk: 149\nAtk: 86       Sp.Def: 91\nDef: 87       Speed: 116"},{"pokemon":"Reuniclus","level":48,"gender":"Male","item":"Life Orb","ability":"Magic Guard","nature":"Modest","moves":["Psychic","Focus Blast","Shadow Ball","Recover"],"stats":"HP: 178        Sp.Atk: 152\nAtk: 73       Sp.Def: 101\nDef: 91       Speed: 48"},{"pokemon":"Blissey","level":48,"gender":"Female","item":"Chople Berry","ability":"Natural Cure","nature":"Calm","moves":["Soft-Boiled","Dazzling Gleam","Flamethrower","Thunder Wave"],"stats":"HP: 317        Sp.Atk: 91\nAtk: 26       Sp.Def: 163\nDef: 29       Speed: 72"}]},
			{"id":"trainer-91","calculatorTrainerId":"trainer-91","models":["swsh-backpacker"],"name":"Backpacker Barbara [Single]","split":"Gordie","levelCap":"50","location":"Route 8","team":[{"pokemon":"Flygon","level":48,"gender":"Female","item":"Ground Gem","ability":"Levitate","nature":"Jolly","moves":["Earthquake","Dragon Claw","Fire Punch","U-turn"],"stats":"HP: 149        Sp.Atk: 86\nAtk: 115       Sp.Def: 96\nDef: 96       Speed: 126"},{"pokemon":"Bronzong","level":48,"gender":"Genderless","item":"Occa Berry","ability":"Levitate","nature":"Relaxed","moves":["Gyro Ball","Body Press","Stealth Rock","Hypnosis"],"stats":"HP: 137        Sp.Atk: 95\nAtk: 105       Sp.Def: 131\nDef: 144       Speed: 32"},{"pokemon":"Golurk","level":48,"gender":"Genderless","item":"Soft Sand","ability":"Iron Fist","nature":"Adamant","moves":["Earthquake","Shadow Punch","Drain Punch","Ice Punch"],"stats":"HP: 158        Sp.Atk: 64\nAtk: 151       Sp.Def: 96\nDef: 96       Speed: 72"},{"pokemon":"Archeops","level":48,"gender":"Male","item":"Sharp Beak","ability":"Defeatist","nature":"Jolly","moves":["Acrobatics","Rock Slide","Dragon Claw","U-turn"],"stats":"HP: 144        Sp.Atk: 114\nAtk: 154       Sp.Def: 82\nDef: 82       Speed: 137"},{"pokemon":"Relicanth","level":48,"gender":"Female","item":"Hard Stone","ability":"Rock Head","nature":"Adamant","moves":["Head Smash","Liquidation","Zen Headbutt","Yawn"],"stats":"HP: 168        Sp.Atk: 56\nAtk: 116       Sp.Def: 82\nDef: 144       Speed: 72"},{"pokemon":"Stonjourner","level":48,"gender":"Male","item":"Assault Vest","ability":"Power Spot","nature":"Adamant","moves":["Stone Edge","High Horsepower","Heat Crash","Body Press"],"stats":"HP: 168        Sp.Atk: 35\nAtk: 152       Sp.Def: 39\nDef: 149       Speed: 87"}]},
			{"id":"trainer-92","calculatorTrainerId":"trainer-92","models":["swsh-musician"],"name":"Musician Charles [Single]","split":"Gordie","levelCap":"50","location":"Route 8","team":[{"pokemon":"Toxtricity","level":48,"gender":"Male","item":"Throat Spray","ability":"Punk Rock","nature":"Modest","moves":["Overdrive","Boomburst","Sludge Wave","Shift Gear"],"stats":"HP: 144        Sp.Atk: 141\nAtk: 101       Sp.Def: 87\nDef: 87       Speed: 91"},{"pokemon":"Exploud","level":48,"gender":"Male","item":"Silk Scarf","ability":"Scrappy","nature":"Modest","moves":["Boomburst","Fire Blast","Ice Beam","Surf"],"stats":"HP: 172        Sp.Atk: 117\nAtk: 96       Sp.Def: 89\nDef: 80       Speed: 85"},{"pokemon":"Noivern","level":48,"gender":"Female","item":"Wise Glasses","ability":"Infiltrator","nature":"Timid","moves":["Hurricane","Boomburst","Flamethrower","U-turn"],"stats":"HP: 154        Sp.Atk: 113\nAtk: 78       Sp.Def: 96\nDef: 96       Speed: 150"},{"pokemon":"Primarina","level":48,"gender":"Female","item":"Mystic Water","ability":"Liquid Voice","nature":"Modest","moves":["Hyper Voice","Moonblast","Energy Ball","Aqua Jet"],"stats":"HP: 149        Sp.Atk: 154\nAtk: 81       Sp.Def: 131\nDef: 90       Speed: 77"},{"pokemon":"Mr. Rime","level":48,"gender":"Male","item":"Heavy-Duty Boots","ability":"Screen Cleaner","nature":"Timid","moves":["Psychic","Freeze-Dry","Teeter Dance","Rapid Spin"],"stats":"HP: 149        Sp.Atk: 125\nAtk: 90       Sp.Def: 115\nDef: 91       Speed: 95"},{"pokemon":"Wigglytuff","level":48,"gender":"Female","item":"Kee Berry","ability":"Competitive","nature":"Bold","moves":["Hyper Voice","Dazzling Gleam","Flamethrower","Sing"],"stats":"HP: 207        Sp.Atk: 101\nAtk: 78       Sp.Def: 67\nDef: 69       Speed: 63"}]},
			{"id":"trainer-93","calculatorTrainerId":"trainer-93","models":["swsh-office-worker-female","swsh-office-worker-male"],"name":"Colleagues Alison & Jordan [Double] [Leads: Indeedee-F, Indeedee-M]","split":"Gordie","levelCap":"50","location":"Route 8","team":[{"pokemon":"Indeedee-F","level":48,"gender":"Female","item":"Terrain Extender","ability":"Psychic Surge","nature":"Calm","moves":["Expanding Force","Follow Me","Helping Hand","Mystical Fire"],"stats":"HP: 140        Sp.Atk: 111\nAtk: 64       Sp.Def: 132\nDef: 82       Speed: 101"},{"pokemon":"Klefki","level":48,"gender":"Female","item":"Light Clay","ability":"Prankster","nature":"Calm","moves":["Reflect","Light Screen","Dazzling Gleam","Foul Play"],"stats":"HP: 127        Sp.Atk: 96\nAtk: 86       Sp.Def: 113\nDef: 107       Speed: 91"},{"pokemon":"Tsareena","level":48,"gender":"Female","item":"Miracle Seed","ability":"Queenly Majesty","nature":"Adamant","moves":["Trop Kick","Power Whip","High Jump Kick","U-turn"],"stats":"HP: 142        Sp.Atk: 60\nAtk: 148       Sp.Def: 113\nDef: 113       Speed: 89"},{"pokemon":"Indeedee-M","level":48,"gender":"Male","item":"Psychic Gem","ability":"Inner Focus","nature":"Timid","moves":["Expanding Force","Hyper Voice","Shadow Ball","Energy Ball"],"stats":"HP: 130        Sp.Atk: 120\nAtk: 73       Sp.Def: 111\nDef: 72       Speed: 122","sprite":"indeedee"},{"pokemon":"Oranguru","level":48,"gender":"Male","item":"Mental Herb","ability":"Inner Focus","nature":"Sassy","moves":["Psychic","Instruct","Foul Play","Trick Room"],"stats":"HP: 159        Sp.Atk: 106\nAtk: 77       Sp.Def: 137\nDef: 96       Speed: 69"},{"pokemon":"Perrserker","level":48,"gender":"Male","item":"Metal Coat","ability":"Steely Spirit","nature":"Adamant","moves":["Iron Head","Fake Out","Close Combat","Throat Chop"],"stats":"HP: 140        Sp.Atk: 60\nAtk: 137       Sp.Def: 77\nDef: 115       Speed: 67"}]},
			{"id":"trainer-94","calculatorTrainerId":"trainer-94","models":["swsh-police-officer"],"name":"Police Officer Bobby [Single]","split":"Gordie","levelCap":"50","location":"Route 8","team":[{"pokemon":"Manectric","level":48,"gender":"Male","item":"Magnet","ability":"Lightning Rod","nature":"Timid","moves":["Thunderbolt","Flamethrower","Snarl","Volt Switch"],"stats":"HP: 140        Sp.Atk: 120\nAtk: 81       Sp.Def: 77\nDef: 77       Speed: 132"},{"pokemon":"Arcanine","level":48,"gender":"Male","item":"Assault Vest","ability":"Intimidate","nature":"Impish","moves":["Flare Blitz","Play Rough","Crunch","Extreme Speed"],"stats":"HP: 159        Sp.Atk: 103\nAtk: 125       Sp.Def: 96\nDef: 105       Speed: 111"},{"pokemon":"Duraludon","level":48,"gender":"Male","item":"Shuca Berry","ability":"Light Metal","nature":"Modest","moves":["Flash Cannon","Dragon Pulse","Thunderbolt","Body Press"],"stats":"HP: 140        Sp.Atk: 148\nAtk: 99       Sp.Def: 67\nDef: 130       Speed: 101"},{"pokemon":"Gallade","level":48,"gender":"Male","item":"Scope Lens","ability":"Justified","nature":"Jolly","moves":["Psycho Cut","Sacred Sword","Knock Off","Shadow Sneak"],"stats":"HP: 138        Sp.Atk: 73\nAtk: 139       Sp.Def: 130\nDef: 82       Speed: 105"},{"pokemon":"Bisharp","level":48,"gender":"Male","item":"Black Glasses","ability":"Defiant","nature":"Adamant","moves":["Iron Head","Night Slash","Sucker Punch","Low Sweep"],"stats":"HP: 135        Sp.Atk: 69\nAtk: 152       Sp.Def: 87\nDef: 115       Speed: 87"},{"pokemon":"Copperajah","level":48,"gender":"Female","item":"Metal Coat","ability":"Sheer Force","nature":"Adamant","moves":["Heavy Slam","High Horsepower","Rock Slide","Heat Crash"],"stats":"HP: 190        Sp.Atk: 86\nAtk: 158       Sp.Def: 86\nDef: 86       Speed: 33"}]},
			{"id":"trainer-95","calculatorTrainerId":"trainer-95","models":["swsh-rock-gym-female"],"name":"Gym Trainer Abigail [Single]","split":"Gordie","levelCap":"50","location":"Rock Gym","team":[{"pokemon":"Sudowoodo","level":49,"gender":"Male","item":"Hard Stone","ability":"Rock Head","nature":"Adamant","moves":["Head Smash","Wood Hammer","Sucker Punch","Stealth Rock"],"stats":"HP: 142        Sp.Atk: 44\nAtk: 129       Sp.Def: 83\nDef: 132       Speed: 49"},{"pokemon":"Lunatone","level":49,"gender":"Genderless","item":"Twisted Spoon","ability":"Levitate","nature":"Modest","moves":["Power Gem","Psychic","Moonlight","Hypnosis"],"stats":"HP: 162        Sp.Atk: 124\nAtk: 66       Sp.Def: 103\nDef: 83       Speed: 88"},{"pokemon":"Solrock","level":49,"gender":"Genderless","item":"Passho Berry","ability":"Levitate","nature":"Adamant","moves":["Rock Slide","Zen Headbutt","Flare Blitz","Will-O-Wisp"],"stats":"HP: 162        Sp.Atk: 66\nAtk: 124       Sp.Def: 83\nDef: 103       Speed: 88"},{"pokemon":"Crustle","level":49,"gender":"Female","item":"White Herb","ability":"Sturdy","nature":"Adamant","moves":["Shell Smash","Rock Blast","X-Scissor","Earthquake"],"stats":"HP: 142        Sp.Atk: 74\nAtk: 135       Sp.Def: 93\nDef: 142       Speed: 64"},{"pokemon":"Barbaracle","level":49,"gender":"Male","item":"Razor Claw","ability":"Tough Claws","nature":"Jolly","moves":["Stone Edge","Razor Shell","Cross Chop","Shadow Claw"],"stats":"HP: 144        Sp.Atk: 65\nAtk: 123       Sp.Def: 104\nDef: 132       Speed: 94"},{"pokemon":"Gigalith","level":49,"gender":"Male","item":"Assault Vest","ability":"Sand Stream","nature":"Careful","moves":["Rock Slide","Body Press","Heavy Slam","Earthquake"],"stats":"HP: 157        Sp.Atk: 70\nAtk: 152       Sp.Def: 107\nDef: 147       Speed: 44"}]},
			{"id":"trainer-96","calculatorTrainerId":"trainer-96","models":["swsh-rock-gym-female"],"name":"Gym Trainer Kiera [Single]","split":"Gordie","levelCap":"50","location":"Rock Gym","team":[{"pokemon":"Lycanroc","level":49,"gender":"Male","item":"Black Glasses","ability":"Adaptability","nature":"Jolly","moves":["Stone Edge","Crunch","Sucker Punch","Taunt"],"stats":"HP: 167        Sp.Atk: 48\nAtk: 162       Sp.Def: 74\nDef: 74       Speed: 132","sprite":"lycanroc-midnight"},{"pokemon":"Cradily","level":49,"gender":"Female","item":"Big Root","ability":"Storm Drain","nature":"Calm","moves":["Giga Drain","Ancient Power","Recover","Toxic"],"stats":"HP: 158        Sp.Atk: 99\nAtk: 89       Sp.Def: 137\nDef: 115       Speed: 62"},{"pokemon":"Kabutops","level":49,"gender":"Male","item":"Mystic Water","ability":"Battle Armor","nature":"Jolly","moves":["Stone Edge","Liquidation","Aqua Jet","Swords Dance"],"stats":"HP: 132        Sp.Atk: 74\nAtk: 132       Sp.Def: 88\nDef: 123       Speed: 107"},{"pokemon":"Armaldo","level":49,"gender":"Male","item":"Silver Powder","ability":"Battle Armor","nature":"Adamant","moves":["Stone Edge","Leech Life","Earthquake","Knock Off"],"stats":"HP: 147        Sp.Atk: 79\nAtk: 156       Sp.Def: 98\nDef: 118       Speed: 64"},{"pokemon":"Aurorus","level":49,"gender":"Female","item":"Throat Spray","ability":"Refrigerate","nature":"Modest","moves":["Hyper Voice","Power Gem","Earth Power","Thunder Wave"],"stats":"HP: 194        Sp.Atk: 128\nAtk: 85       Sp.Def: 110\nDef: 90       Speed: 77"},{"pokemon":"Stonjourner","level":49,"gender":"Male","item":"Assault Vest","ability":"Power Spot","nature":"Adamant","moves":["Stone Edge","High Horsepower","Heat Crash","Body Press"],"stats":"HP: 172        Sp.Atk: 35\nAtk: 156       Sp.Def: 39\nDef: 152       Speed: 88"}]},
			{"id":"trainer-97","calculatorTrainerId":"trainer-97","models":["swsh-rock-gym-male"],"name":"Gym Trainer Oliver [Single]","split":"Gordie","levelCap":"50","location":"Rock Gym","team":[{"pokemon":"Aggron","level":49,"gender":"Male","item":"Metal Coat","ability":"Rock Head","nature":"Adamant","moves":["Head Smash","Heavy Slam","Fire Punch","Stealth Rock"],"stats":"HP: 142        Sp.Atk: 70\nAtk: 139       Sp.Def: 78\nDef: 196       Speed: 69"},{"pokemon":"Omastar","level":49,"gender":"Male","item":"White Herb","ability":"Weak Armor","nature":"Modest","moves":["Shell Smash","Surf","Power Gem","Ice Beam"],"stats":"HP: 142        Sp.Atk: 145\nAtk: 70       Sp.Def: 88\nDef: 142       Speed: 74"},{"pokemon":"Relicanth","level":49,"gender":"Female","item":"Hard Stone","ability":"Rock Head","nature":"Adamant","moves":["Head Smash","Liquidation","Zen Headbutt","Yawn"],"stats":"HP: 172        Sp.Atk: 57\nAtk: 118       Sp.Def: 83\nDef: 147       Speed: 74"},{"pokemon":"Carracosta","level":49,"gender":"Male","item":"Rindo Berry","ability":"Solid Rock","nature":"Adamant","moves":["Liquidation","Rock Slide","Aqua Jet","Shell Smash"],"stats":"HP: 146        Sp.Atk: 90\nAtk: 138       Sp.Def: 83\nDef: 150       Speed: 51"},{"pokemon":"Tyrantrum","level":49,"gender":"Male","item":"Dragon Fang","ability":"Strong Jaw","nature":"Jolly","moves":["Dragon Dance","Stone Edge","Crunch","Psychic Fangs"],"stats":"HP: 154        Sp.Atk: 78\nAtk: 138       Sp.Def: 78\nDef: 136       Speed: 97"},{"pokemon":"Rhyperior","level":49,"gender":"Male","item":"Weakness Policy","ability":"Solid Rock","nature":"Adamant","moves":["High Horsepower","Stone Edge","Megahorn","Fire Punch"],"stats":"HP: 186        Sp.Atk: 66\nAtk: 172       Sp.Def: 74\nDef: 147       Speed: 59"}]},
			{"id":"trainer-98","calculatorTrainerId":"trainer-98","models":["swsh-rock-gym-female"],"name":"Gym Trainer Wendy [Single]","split":"Gordie","levelCap":"50","location":"Rock Gym","team":[{"pokemon":"Lycanroc","level":49,"gender":"Male","item":"Life Orb","ability":"Tough Claws","nature":"Jolly","moves":["Accelerock","Stone Edge","Psychic Fangs","Close Combat"],"stats":"HP: 147        Sp.Atk: 66\nAtk: 134       Sp.Def: 83\nDef: 83       Speed: 139","sprite":"lycanroc-dusk"},{"pokemon":"Archeops","level":49,"gender":"Female","item":"Flying Gem","ability":"Defeatist","nature":"Jolly","moves":["Acrobatics","Stone Edge","Earthquake","U-turn"],"stats":"HP: 147        Sp.Atk: 116\nAtk: 157       Sp.Def: 83\nDef: 83       Speed: 139"},{"pokemon":"Drednaw","level":49,"gender":"Male","item":"Mystic Water","ability":"Strong Jaw","nature":"Adamant","moves":["Jaw Lock","Liquidation","Stone Edge","Crunch"],"stats":"HP: 162        Sp.Atk: 60\nAtk: 145       Sp.Def: 86\nDef: 108       Speed: 92"},{"pokemon":"Corsola","level":49,"gender":"Female","item":"Eviolite","ability":"Natural Cure","nature":"Bold","moves":["Power Gem","Whirlpool","Recover","Stealth Rock"],"stats":"HP: 137        Sp.Atk: 83\nAtk: 66       Sp.Def: 113\nDef: 124       Speed: 54"},{"pokemon":"Avalugg","level":49,"gender":"Male","item":"Heavy-Duty Boots","ability":"Sturdy","nature":"Impish","moves":["Icicle Crash","Body Press","Stone Edge","Recover"],"stats":"HP: 167        Sp.Atk: 56\nAtk: 134       Sp.Def: 65\nDef: 220       Speed: 47"},{"pokemon":"Onix","level":49,"gender":"Male","item":"Eviolite","ability":"Weak Armor","nature":"Jolly","moves":["Stealth Rock","Rock Tomb","High Horsepower","Dragon Dance"],"stats":"HP: 108        Sp.Atk: 44\nAtk: 64       Sp.Def: 64\nDef: 176       Speed: 96"}]},
			{"id":"trainer-99","calculatorTrainerId":"trainer-99","models":["swsh-gordie"],"name":"Gordie [Double]","split":"Gordie","levelCap":"50","location":"Rock Gym","team":[{"pokemon":"Tyranitar","level":50,"gender":"Male","item":"Smooth Rock","ability":"Sand Stream","nature":"Quiet","moves":["Substitute","Focus Blast","Dark Pulse","Flamethrower"],"stats":"HP: 175        Sp.Atk: 126\nAtk: 154       Sp.Def: 120\nDef: 130       Speed: 72"},{"pokemon":"Lycanroc","level":50,"gender":"Male","item":"Life Orb","ability":"Sand Rush","nature":"Jolly","moves":["Accelerock","Rock Slide","Drill Run","Psychic Fangs"],"stats":"HP: 150        Sp.Atk: 67\nAtk: 135       Sp.Def: 85\nDef: 85       Speed: 145"},{"pokemon":"Shuckle","level":50,"gender":"Female","item":"Mental Herb","ability":"Sturdy","nature":"Bold","moves":["Sticky Web","Power Split","Guard Split","Rock Tomb"],"stats":"HP: 95        Sp.Atk: 30\nAtk: 27       Sp.Def: 250\nDef: 275       Speed: 25"},{"pokemon":"Mega Aerodactyl","level":50,"gender":"Male","item":"Aerodactylite","ability":"Tough Claws","nature":"Jolly","moves":["Rock Slide","Dual Wingbeat","Fire Fang","Ice Fang"],"stats":"HP: 155        Sp.Atk: 81\nAtk: 155       Sp.Def: 115\nDef: 105       Speed: 187","sprite":"aerodactyl-mega"},{"pokemon":"Terrakion","level":50,"gender":"Genderless","item":"Expert Belt","ability":"Justified","nature":"Jolly","moves":["Rock Slide","Sacred Sword","Earthquake","Quick Guard"],"stats":"HP: 166        Sp.Atk: 82\nAtk: 149       Sp.Def: 110\nDef: 110       Speed: 140"},{"pokemon":"Coalossal GMAX","level":50,"gender":"Male","item":"Weakness Policy","ability":"Steam Engine","nature":"Modest","moves":["Meteor Beam","Heat Wave","Earth Power","Ancient Power"],"stats":"HP: 185        Sp.Atk: 110\nAtk: 90       Sp.Def: 110\nDef: 140       Speed: 50","sprite":"coalossal-gmax"}]},
			{"id":"trainer-100","calculatorTrainerId":"trainer-100","models":["swsh-hop"],"name":"Hop 6 Grass Starter [Single]","split":"Hop 6","levelCap":"52","location":"Circhester","team":[{"pokemon":"Politoed","level":52,"gender":"Male","item":"Damp Rock","ability":"Drizzle","nature":"Calm","moves":["Scald","Icy Wind","Encore","Hypnosis"],"stats":"HP: 171        Sp.Atk: 114\nAtk: 89       Sp.Def: 137\nDef: 99       Speed: 93"},{"pokemon":"Ferrothorn","level":52,"gender":"Male","item":"Rocky Helmet","ability":"Iron Barbs","nature":"Relaxed","moves":["Power Whip","Gyro Ball","Leech Seed","Knock Off"],"stats":"HP: 155        Sp.Atk: 77\nAtk: 118       Sp.Def: 141\nDef: 172       Speed: 22"},{"pokemon":"Kingdra","level":52,"gender":"Female","item":"Life Orb","ability":"Swift Swim","nature":"Modest","moves":["Hydro Pump","Dragon Pulse","Hurricane","Flash Cannon"],"stats":"HP: 156        Sp.Atk: 130\nAtk: 107       Sp.Def: 119\nDef: 119       Speed: 109"},{"pokemon":"Toxicroak","level":52,"gender":"Male","item":"Black Sludge","ability":"Dry Skin","nature":"Adamant","moves":["Drain Punch","Poison Jab","Sucker Punch","Bulk Up"],"stats":"HP: 164        Sp.Atk: 99\nAtk: 144       Sp.Def: 88\nDef: 88       Speed: 109"},{"pokemon":"Noivern","level":52,"gender":"Female","item":"Wise Glasses","ability":"Infiltrator","nature":"Timid","moves":["Hurricane","Draco Meteor","Flamethrower","U-turn"],"stats":"HP: 166        Sp.Atk: 122\nAtk: 83       Sp.Def: 104\nDef: 104       Speed: 163"},{"pokemon":"Inteleon","level":52,"gender":"Male","item":"Scope Lens","ability":"Sniper","nature":"Timid","moves":["Focus Energy","Snipe Shot","Air Slash","Dark Pulse"],"stats":"HP: 150        Sp.Atk: 151\nAtk: 98       Sp.Def: 88\nDef: 88       Speed: 159"}]},
			{"id":"trainer-101","calculatorTrainerId":"trainer-101","models":["swsh-hop"],"name":"Hop 6 Fire Starter [Single]","split":"Hop 6","levelCap":"52","location":"Circhester","team":[{"pokemon":"Magnezone","level":52,"gender":"Genderless","item":"Air Balloon","ability":"Analytic","nature":"Modest","moves":["Thunderbolt","Flash Cannon","Body Press","Volt Switch"],"stats":"HP: 150        Sp.Atk: 171\nAtk: 83       Sp.Def: 114\nDef: 140       Speed: 83"},{"pokemon":"Hawlucha","level":52,"gender":"Male","item":"Grassy Seed","ability":"Unburden","nature":"Jolly","moves":["Acrobatics","Close Combat","Stone Edge","Swords Dance"],"stats":"HP: 159        Sp.Atk: 88\nAtk: 116       Sp.Def: 86\nDef: 99       Speed: 157"},{"pokemon":"Dhelmise","level":52,"gender":"Genderless","item":"Spell Tag","ability":"Steelworker","nature":"Adamant","moves":["Power Whip","Poltergeist","Anchor Shot","Rapid Spin"],"stats":"HP: 150        Sp.Atk: 99\nAtk: 172       Sp.Def: 114\nDef: 125       Speed: 62"},{"pokemon":"Goodra","level":52,"gender":"Female","item":"Assault Vest","ability":"Sap Sipper","nature":"Modest","moves":["Dragon Pulse","Flamethrower","Sludge Bomb","Muddy Water"],"stats":"HP: 171        Sp.Atk: 148\nAtk: 112       Sp.Def: 177\nDef: 93       Speed: 104"},{"pokemon":"Rhyperior","level":52,"gender":"Male","item":"Weakness Policy","ability":"Solid Rock","nature":"Adamant","moves":["High Horsepower","Rock Blast","Fire Punch","Ice Punch"],"stats":"HP: 197        Sp.Atk: 70\nAtk: 182       Sp.Def: 78\nDef: 156       Speed: 62"},{"pokemon":"Rillaboom","level":52,"gender":"Male","item":"Miracle Seed","ability":"Grassy Surge","nature":"Adamant","moves":["Drum Beating","Grassy Glide","Knock Off","Drain Punch"],"stats":"HP: 182        Sp.Atk: 74\nAtk: 166       Sp.Def: 93\nDef: 114       Speed: 109"}]},
			{"id":"trainer-102","calculatorTrainerId":"trainer-102","models":["swsh-hop"],"name":"Hop 6 Water Starter [Single]","split":"Hop 6","levelCap":"52","location":"Circhester","team":[{"pokemon":"Torkoal","level":52,"gender":"Male","item":"Heat Rock","ability":"Drought","nature":"Relaxed","moves":["Flamethrower","Solar Beam","Earth Power","Yawn"],"stats":"HP: 150        Sp.Atk: 109\nAtk: 109       Sp.Def: 93\nDef: 182       Speed: 36"},{"pokemon":"Venusaur","level":52,"gender":"Male","item":"Life Orb","ability":"Chlorophyll","nature":"Modest","moves":["Growth","Giga Drain","Sludge Bomb","Weather Ball"],"stats":"HP: 161        Sp.Atk: 137\nAtk: 95       Sp.Def: 125\nDef: 107       Speed: 104"},{"pokemon":"Heliolisk","level":52,"gender":"Female","item":"Wise Glasses","ability":"Solar Power","nature":"Timid","moves":["Thunderbolt","Weather Ball","Hyper Voice","Glare"],"stats":"HP: 142        Sp.Atk: 134\nAtk: 70       Sp.Def: 118\nDef: 75       Speed: 147"},{"pokemon":"Gastrodon","level":52,"gender":"Female","item":"Rindo Berry","ability":"Storm Drain","nature":"Calm","moves":["Scald","Earth Power","Ice Beam","Recover"],"stats":"HP: 193        Sp.Atk: 116\nAtk: 96       Sp.Def: 116\nDef: 91       Speed: 61"},{"pokemon":"Talonflame","level":52,"gender":"Male","item":"Sharp Beak","ability":"Gale Wings","nature":"Jolly","moves":["Brave Bird","Flare Blitz","Tailwind","Roost"],"stats":"HP: 159        Sp.Atk: 88\nAtk: 105       Sp.Def: 92\nDef: 94       Speed: 167"},{"pokemon":"Cinderace","level":52,"gender":"Male","item":"Life Orb","ability":"Libero","nature":"Jolly","moves":["Pyro Ball","Sucker Punch","High Jump Kick","U-turn"],"stats":"HP: 161        Sp.Atk: 79\nAtk: 141       Sp.Def: 99\nDef: 99       Speed: 158"}]},
			{"id":"trainer-103","calculatorTrainerId":"trainer-103","models":["swsh-fisher"],"name":"Fisher Harriet [Single]","split":"Marnie 2","levelCap":"54","location":"Route 9","team":[{"pokemon":"Lanturn","level":53,"gender":"Female","item":"Damp Rock","ability":"Volt Absorb","nature":"Calm","moves":["Rain Dance","Thunder","Scald","Volt Switch"],"stats":"HP: 211        Sp.Atk: 101\nAtk: 73       Sp.Def: 111\nDef: 82       Speed: 92"},{"pokemon":"Dhelmise","level":53,"gender":"Genderless","item":"Choice Band","ability":"Steelworker","nature":"Adamant","moves":["Anchor Shot","Poltergeist","Power Whip","Rapid Spin"],"stats":"HP: 153        Sp.Atk: 100\nAtk: 176       Sp.Def: 116\nDef: 127       Speed: 63"},{"pokemon":"Kingdra","level":53,"gender":"Male","item":"Scope Lens","ability":"Swift Swim","nature":"Modest","moves":["Focus Energy","Hydro Pump","Draco Meteor","Hurricane"],"stats":"HP: 158        Sp.Atk: 134\nAtk: 109       Sp.Def: 122\nDef: 122       Speed: 111"},{"pokemon":"Grapploct","level":53,"gender":"Male","item":"Big Root","ability":"Limber","nature":"Adamant","moves":["Octolock","Drain Punch","Liquidation","Sucker Punch"],"stats":"HP: 164        Sp.Atk: 85\nAtk: 160       Sp.Def: 106\nDef: 116       Speed: 65"},{"pokemon":"Cloyster","level":53,"gender":"Female","item":"White Herb","ability":"Skill Link","nature":"Jolly","moves":["Shell Smash","Icicle Spear","Rock Blast","Liquidation"],"stats":"HP: 132        Sp.Atk: 99\nAtk: 122       Sp.Def: 69\nDef: 212       Speed: 104"},{"pokemon":"Regice","level":53,"gender":"Genderless","item":"Weakness Policy","ability":"Clear Body","nature":"Modest","moves":["Agility","Thunder","Ice Beam","Focus Blast"],"stats":"HP: 164        Sp.Atk: 139\nAtk: 66       Sp.Def: 233\nDef: 127       Speed: 74"}]},
			{"id":"trainer-104","calculatorTrainerId":"trainer-104","models":["swsh-dancer"],"name":"Dancer Zoe [Single]","split":"Marnie 2","levelCap":"54","location":"Route 9","team":[{"pokemon":"Ludicolo","level":53,"gender":"Male","item":"Life Orb","ability":"Swift Swim","nature":"Modest","moves":["Rain Dance","Hydro Pump","Giga Drain","Ice Beam"],"stats":"HP: 164        Sp.Atk: 127\nAtk: 85       Sp.Def: 127\nDef: 95       Speed: 95"},{"pokemon":"Hitmontop","level":53,"gender":"Male","item":"Eject Pack","ability":"Intimidate","nature":"Adamant","moves":["Close Combat","Triple Axel","Rapid Spin","Sucker Punch"],"stats":"HP: 132        Sp.Atk: 52\nAtk: 134       Sp.Def: 138\nDef: 122       Speed: 95"},{"pokemon":"Tsareena","level":53,"gender":"Female","item":"Wide Lens","ability":"Queenly Majesty","nature":"Jolly","moves":["Trop Kick","High Jump Kick","Triple Axel","Rapid Spin"],"stats":"HP: 155        Sp.Atk: 66\nAtk: 148       Sp.Def: 125\nDef: 125       Speed: 106"},{"pokemon":"Mr. Rime","level":53,"gender":"Male","item":"Heavy-Duty Boots","ability":"Screen Cleaner","nature":"Timid","moves":["Freeze-Dry","Psychic","Teeter Dance","Rapid Spin"],"stats":"HP: 164        Sp.Atk: 138\nAtk: 99       Sp.Def: 127\nDef: 100       Speed: 104"},{"pokemon":"Volcarona","level":53,"gender":"Female","item":"Charti Berry","ability":"Flame Body","nature":"Timid","moves":["Quiver Dance","Fiery Dance","Bug Buzz","Giga Drain"],"stats":"HP: 169        Sp.Atk: 164\nAtk: 76       Sp.Def: 132\nDef: 90       Speed: 139"},{"pokemon":"Tapu Fini","level":53,"gender":"Genderless","item":"Leftovers","ability":"Misty Surge","nature":"Modest","moves":["Surf","Moonblast","Teeter Dance","Draining Kiss"],"stats":"HP: 153        Sp.Atk: 134\nAtk: 90       Sp.Def: 159\nDef: 143       Speed: 111"}]},
			{"id":"trainer-105","calculatorTrainerId":"trainer-105","models":["swsh-team-yell-male"],"name":"Team Yell Grunt Route 9 [Single]","split":"Marnie 2","levelCap":"54","location":"Route 9","team":[{"pokemon":"Sharpedo","level":53,"gender":"Male","item":"Expert Belt","ability":"Speed Boost","nature":"Adamant","moves":["Crunch","Liquidation","Poison Fang","Destiny Bond"],"stats":"HP: 153        Sp.Atk: 109\nAtk: 162       Sp.Def: 63\nDef: 63       Speed: 122"},{"pokemon":"Crawdaunt","level":53,"gender":"Male","item":"Mystic Water","ability":"Adaptability","nature":"Adamant","moves":["Crabhammer","Knock Off","Aqua Jet","Taunt"],"stats":"HP: 146        Sp.Atk: 104\nAtk: 162       Sp.Def: 79\nDef: 111       Speed: 79"},{"pokemon":"Scrafty","level":53,"gender":"Male","item":"Roseli Berry","ability":"Intimidate","nature":"Careful","moves":["Fake Out","Drain Punch","Crunch","Bulk Up"],"stats":"HP: 148        Sp.Atk: 62\nAtk: 116       Sp.Def: 157\nDef: 143       Speed: 82"},{"pokemon":"Mandibuzz","level":53,"gender":"Female","item":"Heavy-Duty Boots","ability":"Overcoat","nature":"Impish","moves":["Foul Play","Brave Bird","Roost","Torment"],"stats":"HP: 196        Sp.Atk: 71\nAtk: 90       Sp.Def: 122\nDef: 145       Speed: 106"},{"pokemon":"Skuntank","level":53,"gender":"Female","item":"Black Sludge","ability":"Aftermath","nature":"Jolly","moves":["Sucker Punch","Poison Jab","Smokescreen","Parting Shot"],"stats":"HP: 188        Sp.Atk: 86\nAtk: 120       Sp.Def: 86\nDef: 92       Speed: 121"},{"pokemon":"Incineroar","level":53,"gender":"Male","item":"Leftovers","ability":"Intimidate","nature":"Jolly","moves":["Fake Out","Parting Shot","Flare Blitz","Darkest Lariat"],"stats":"HP: 180        Sp.Atk: 95\nAtk: 143       Sp.Def: 116\nDef: 116       Speed: 93"}]},
			{"id":"trainer-106","calculatorTrainerId":"trainer-106","models":["swsh-fisher"],"name":"Fisher Marina [Single]","split":"Marnie 2","levelCap":"54","location":"Route 9","team":[{"pokemon":"Qwilfish","level":53,"gender":"Female","item":"Black Sludge","ability":"Intimidate","nature":"Jolly","moves":["Toxic Spikes","Taunt","Liquidation","Aqua Jet"],"stats":"HP: 148        Sp.Atk: 71\nAtk: 122       Sp.Def: 79\nDef: 111       Speed: 122"},{"pokemon":"Octillery","level":53,"gender":"Female","item":"Scope Lens","ability":"Sniper","nature":"Modest","moves":["Focus Energy","Octazooka","Ice Beam","Energy Ball"],"stats":"HP: 158        Sp.Atk: 145\nAtk: 118       Sp.Def: 100\nDef: 100       Speed: 69"},{"pokemon":"Relicanth","level":53,"gender":"Female","item":"Choice Band","ability":"Rock Head","nature":"Adamant","moves":["Head Smash","Liquidation","Zen Headbutt","Earthquake"],"stats":"HP: 185        Sp.Atk: 62\nAtk: 127       Sp.Def: 90\nDef: 159       Speed: 79"},{"pokemon":"Jellicent","level":53,"gender":"Female","item":"Colbur Berry","ability":"Cursed Body","nature":"Calm","moves":["Whirlpool","Will-O-Wisp","Hex","Strength Sap"],"stats":"HP: 185        Sp.Atk: 111\nAtk: 76       Sp.Def: 145\nDef: 95       Speed: 85"},{"pokemon":"Wailord","level":53,"gender":"Male","item":"Chesto Berry","ability":"Water Veil","nature":"Modest","moves":["Water Spout","Ice Beam","Heavy Slam","Rest"],"stats":"HP: 259        Sp.Atk: 127\nAtk: 104       Sp.Def: 69\nDef: 69       Speed: 85"},{"pokemon":"Suicune","level":53,"gender":"Genderless","item":"Binding Band","ability":"Pressure","nature":"Bold","moves":["Whirlpool","Scald","Snarl","Aqua Ring"],"stats":"HP: 185        Sp.Atk: 116\nAtk: 90       Sp.Def: 143\nDef: 157       Speed: 111"}]},
			{"id":"trainer-107","calculatorTrainerId":"trainer-107","models":["swsh-black-belt"],"name":"Black Belt Reece [Single]","split":"Marnie 2","levelCap":"54","location":"Route 9","team":[{"pokemon":"Hitmonlee","level":53,"gender":"Male","item":"White Herb","ability":"Unburden","nature":"Jolly","moves":["Close Combat","High Jump Kick","Blaze Kick","Stone Edge"],"stats":"HP: 132        Sp.Atk: 52\nAtk: 148       Sp.Def: 138\nDef: 77       Speed: 124"},{"pokemon":"Hitmonchan","level":53,"gender":"Male","item":"Assault Vest","ability":"Iron Fist","nature":"Adamant","moves":["Drain Punch","Ice Punch","Thunder Punch","Mach Punch"],"stats":"HP: 132        Sp.Atk: 52\nAtk: 145       Sp.Def: 138\nDef: 105       Speed: 101"},{"pokemon":"Grapploct","level":53,"gender":"Male","item":"Big Root","ability":"Technician","nature":"Careful","moves":["Octolock","Drain Punch","Brutal Swing","Bulk Up"],"stats":"HP: 164        Sp.Atk: 85\nAtk: 146       Sp.Def: 116\nDef: 116       Speed: 65"},{"pokemon":"Gallade","level":53,"gender":"Male","item":"Scope Lens","ability":"Justified","nature":"Jolly","moves":["Psycho Cut","Sacred Sword","Night Slash","Leaf Blade"],"stats":"HP: 151        Sp.Atk: 81\nAtk: 153       Sp.Def: 143\nDef: 90       Speed: 116"},{"pokemon":"Falinks","level":53,"gender":"Genderless","item":"Mental Herb","ability":"Battle Armor","nature":"Adamant","moves":["No Retreat","Close Combat","Smart Strike","Rock Slide"],"stats":"HP: 148        Sp.Atk: 85\nAtk: 139       Sp.Def: 85\nDef: 127       Speed: 100"},{"pokemon":"Cobalion","level":53,"gender":"Genderless","item":"Expert Belt","ability":"Justified","nature":"Jolly","moves":["Laser Focus","Sacred Sword","Iron Head","Volt Switch"],"stats":"HP: 175        Sp.Atk: 104\nAtk: 116       Sp.Def: 97\nDef: 158       Speed: 148"}]},
			{"id":"trainer-108","calculatorTrainerId":"trainer-108","models":["swsh-swimmer-male"],"name":"Swimmer Jacob [Single]","split":"Marnie 2","levelCap":"54","location":"Route 9","team":[{"pokemon":"Cramorant","level":53,"gender":"Male","item":"Safety Goggles","ability":"Gulp Missile","nature":"Timid","moves":["Surf","Ice Beam","Icy Wind","Roost"],"stats":"HP: 153        Sp.Atk: 111\nAtk: 99       Sp.Def: 122\nDef: 79       Speed: 122"},{"pokemon":"Arctovish","level":53,"gender":"Genderless","item":"Mystic Water","ability":"Slush Rush","nature":"Adamant","moves":["Fishious Rend","Icicle Crash","Crunch","Psychic Fangs"],"stats":"HP: 174        Sp.Atk: 95\nAtk: 127       Sp.Def: 116\nDef: 127       Speed: 79"},{"pokemon":"Mantine","level":53,"gender":"Female","item":"Wacan Berry","ability":"Water Absorb","nature":"Calm","moves":["Scald","Air Slash","Tailwind","Roost"],"stats":"HP: 169        Sp.Atk: 106\nAtk: 56       Sp.Def: 185\nDef: 95       Speed: 95"},{"pokemon":"Poliwrath","level":53,"gender":"Male","item":"Assault Vest","ability":"Water Absorb","nature":"Adamant","moves":["Liquidation","Drain Punch","Ice Punch","Poison Jab"],"stats":"HP: 174        Sp.Atk: 85\nAtk: 134       Sp.Def: 116\nDef: 122       Speed: 95"},{"pokemon":"Beartic","level":53,"gender":"Male","item":"Expert Belt","ability":"Slush Rush","nature":"Jolly","moves":["Icicle Crash","Liquidation","Superpower","Aqua Jet"],"stats":"HP: 180        Sp.Atk: 85\nAtk: 159       Sp.Def: 106\nDef: 106       Speed: 81"},{"pokemon":"Keldeo","level":53,"gender":"Genderless","item":"Muscle Band","ability":"Justified","nature":"Adamant","moves":["Swords Dance","Liquidation","Sacred Sword","Aqua Jet"],"stats":"HP: 175        Sp.Atk: 142\nAtk: 106       Sp.Def: 116\nDef: 116       Speed: 135"}]},
			{"id":"trainer-109","calculatorTrainerId":"trainer-109","models":["swsh-swimmer-female"],"name":"Swimmer Scarlett [Single]","split":"Marnie 2","levelCap":"54","location":"Route 9","team":[{"pokemon":"Golisopod","level":53,"gender":"Female","item":"Silver Powder","ability":"Emergency Exit","nature":"Adamant","moves":["First Impression","Liquidation","Leech Life","Aqua Jet"],"stats":"HP: 158        Sp.Atk: 76\nAtk: 168       Sp.Def: 116\nDef: 169       Speed: 63"},{"pokemon":"Starmie","level":53,"gender":"Genderless","item":"Power Herb","ability":"Analytic","nature":"Timid","moves":["Meteor Beam","Hydro Pump","Blizzard","Thunderbolt"],"stats":"HP: 143        Sp.Atk: 127\nAtk: 90       Sp.Def: 111\nDef: 111       Speed: 157"},{"pokemon":"Vaporeon","level":53,"gender":"Female","item":"Leftovers","ability":"Water Absorb","nature":"Bold","moves":["Surf","Ice Beam","Wish","Haze"],"stats":"HP: 217        Sp.Atk: 138\nAtk: 81       Sp.Def: 122\nDef: 93       Speed: 90"},{"pokemon":"Dragalge","level":53,"gender":"Female","item":"Assault Vest","ability":"Adaptability","nature":"Modest","moves":["Draco Meteor","Sludge Bomb","Hydro Pump","Flip Turn"],"stats":"HP: 148        Sp.Atk: 136\nAtk: 90       Sp.Def: 151\nDef: 116       Speed: 68"},{"pokemon":"Primarina","level":53,"gender":"Female","item":"Throat Spray","ability":"Liquid Voice","nature":"Modest","moves":["Hyper Voice","Moonblast","Blizzard","Energy Ball"],"stats":"HP: 164        Sp.Atk: 169\nAtk: 89       Sp.Def: 144\nDef: 99       Speed: 85"},{"pokemon":"Latias","level":53,"gender":"Female","item":"Soul Dew","ability":"Levitate","nature":"Calm","moves":["Mist Ball","Surf","Aqua Ring","Dive"],"stats":"HP: 164        Sp.Atk: 138\nAtk: 95       Sp.Def: 174\nDef: 116       Speed: 138"}]},
			{"id":"trainer-110","calculatorTrainerId":"trainer-110","models":["swsh-black-belt"],"name":"Black Belt Carter [Single]","split":"Marnie 2","levelCap":"54","location":"Route 9","team":[{"pokemon":"Mienshao","level":53,"gender":"Female","item":"Expert Belt","ability":"Regenerator","nature":"Jolly","moves":["Close Combat","Triple Axel","Knock Off","U-turn"],"stats":"HP: 148        Sp.Atk: 109\nAtk: 153       Sp.Def: 85\nDef: 85       Speed: 145"},{"pokemon":"Bewear","level":53,"gender":"Male","item":"Assault Vest","ability":"Fluffy","nature":"Adamant","moves":["Drain Punch","Double-Edge","Darkest Lariat","Ice Punch"],"stats":"HP: 206        Sp.Atk: 71\nAtk: 168       Sp.Def: 85\nDef: 106       Speed: 85"},{"pokemon":"Sirfetch'd","level":53,"gender":"Male","item":"Leek","ability":"Scrappy","nature":"Adamant","moves":["Meteor Assault","First Impression","Knock Off","Brave Bird"],"stats":"HP: 145        Sp.Atk: 83\nAtk: 180       Sp.Def: 108\nDef: 122       Speed: 90"},{"pokemon":"Lucario","level":53,"gender":"Male","item":"Life Orb","ability":"Inner Focus","nature":"Timid","moves":["Aura Sphere","Flash Cannon","Vacuum Wave","Nasty Plot"],"stats":"HP: 153        Sp.Atk: 143\nAtk: 124       Sp.Def: 95\nDef: 95       Speed: 127"},{"pokemon":"Kommo-o","level":53,"gender":"Female","item":"Throat Spray","ability":"Bulletproof","nature":"Modest","moves":["Clanging Scales","Aura Sphere","Flamethrower","Flash Cannon"],"stats":"HP: 158        Sp.Atk: 139\nAtk: 124       Sp.Def: 132\nDef: 153       Speed: 111"},{"pokemon":"Registeel","level":53,"gender":"Genderless","item":"Chople Berry","ability":"Clear Body","nature":"Careful","moves":["Iron Defense","Body Press","Heavy Slam","Thunder Wave"],"stats":"HP: 164        Sp.Atk: 90\nAtk: 100       Sp.Def: 198\nDef: 180       Speed: 74"}]},
			{"id":"trainer-111","calculatorTrainerId":"trainer-111","models":["swsh-swimmer-female"],"name":"Swimmer Layla [Single]","split":"Marnie 2","levelCap":"54","location":"Route 9","team":[{"pokemon":"Araquanid","level":53,"gender":"Female","item":"Big Root","ability":"Water Bubble","nature":"Adamant","moves":["Liquidation","Leech Life","Lunge","Sticky Web"],"stats":"HP: 151        Sp.Atk: 66\nAtk: 104       Sp.Def: 161\nDef: 118       Speed: 65"},{"pokemon":"Basculin","level":53,"gender":"Male","item":"Choice Scarf","ability":"Adaptability","nature":"Jolly","moves":["Liquidation","Aqua Jet","Crunch","Flip Turn"],"stats":"HP: 153        Sp.Atk: 95\nAtk: 118       Sp.Def: 79\nDef: 90       Speed: 137","sprite":"basculin-bluestriped"},{"pokemon":"Gastrodon","level":53,"gender":"Female","item":"Rindo Berry","ability":"Storm Drain","nature":"Calm","moves":["Scald","Earth Power","Ice Beam","Recover"],"stats":"HP: 197        Sp.Atk: 118\nAtk: 98       Sp.Def: 118\nDef: 93       Speed: 62"},{"pokemon":"Clawitzer","level":53,"gender":"Male","item":"Wise Glasses","ability":"Mega Launcher","nature":"Modest","moves":["Water Pulse","Aura Sphere","Dark Pulse","Dragon Pulse"],"stats":"HP: 154        Sp.Atk: 162\nAtk: 88       Sp.Def: 115\nDef: 114       Speed: 83"},{"pokemon":"Walrein","level":53,"gender":"Female","item":"Leftovers","ability":"Ice Body","nature":"Bold","moves":["Blizzard","Surf","Encore","Aqua Ring"],"stats":"HP: 196        Sp.Atk: 122\nAtk: 95       Sp.Def: 116\nDef: 127       Speed: 90"},{"pokemon":"Regieleki","level":53,"gender":"Genderless","item":"Binding Band","ability":"Transistor","nature":"Timid","moves":["Soak","Thunder Cage","Electro Ball","Volt Switch"],"stats":"HP: 164        Sp.Atk: 127\nAtk: 114       Sp.Def: 74\nDef: 74       Speed: 256"}]},
			{"id":"trainer-112","calculatorTrainerId":"trainer-112","models":["swsh-dancer","swsh-musician"],"name":"Music Crew Andrea & Owen [Double] [Leads: Toxtricity, Noivern]","split":"Marnie 2","levelCap":"54","location":"Route 9","team":[{"pokemon":"Toxtricity","level":53,"gender":"Male","item":"Throat Spray","ability":"Punk Rock","nature":"Modest","moves":["Overdrive","Boomburst","Sludge Wave","Snarl"],"stats":"HP: 158        Sp.Atk: 156\nAtk: 112       Sp.Def: 95\nDef: 95       Speed: 100","sprite":"toxtricity-lowkey"},{"pokemon":"Primarina","level":53,"gender":"Female","item":"Mystic Water","ability":"Liquid Voice","nature":"Modest","moves":["Round","Hyper Voice","Moonblast","Encore"],"stats":"HP: 164        Sp.Atk: 169\nAtk: 89       Sp.Def: 144\nDef: 99       Speed: 85"},{"pokemon":"Articuno","level":53,"gender":"Genderless","item":"Sitrus Berry","ability":"Competitive","nature":"Timid","moves":["Freezing Glare","Air Slash","Tailwind","Teeter Dance"],"stats":"HP: 174        Sp.Atk: 153\nAtk: 99       Sp.Def: 127\nDef: 111       Speed: 134","sprite":"articuno-galar"},{"pokemon":"Noivern","level":53,"gender":"Female","item":"Wise Glasses","ability":"Telepathy","nature":"Timid","moves":["Boomburst","Hurricane","Dragon Pulse","Taunt"],"stats":"HP: 169        Sp.Atk: 124\nAtk: 85       Sp.Def: 106\nDef: 106       Speed: 166"},{"pokemon":"Exploud","level":53,"gender":"Male","item":"Choice Specs","ability":"Scrappy","nature":"Modest","moves":["Boomburst","Round","Flamethrower","Ice Beam"],"stats":"HP: 189        Sp.Atk: 128\nAtk: 105       Sp.Def: 98\nDef: 88       Speed: 93"},{"pokemon":"Tapu Koko","level":53,"gender":"Genderless","item":"Terrain Extender","ability":"Electric Surge","nature":"Timid","moves":["Thunderbolt","Dazzling Gleam","Volt Switch","Eerie Impulse"],"stats":"HP: 153        Sp.Atk: 122\nAtk: 128       Sp.Def: 100\nDef: 111       Speed: 174"}]},
			{"id":"trainer-113","calculatorTrainerId":"trainer-113","models":["swsh-gentleman"],"name":"Gentleman Caden [Single]","split":"Marnie 2","levelCap":"54","location":"Route 7","team":[{"pokemon":"Persian","level":53,"gender":"Male","item":"Wide Lens","ability":"Technician","nature":"Jolly","moves":["Fake Out","Double Hit","Hypnosis","Parting Shot"],"stats":"HP: 148        Sp.Atk: 81\nAtk: 95       Sp.Def: 90\nDef: 85       Speed: 157"},{"pokemon":"Stoutland","level":53,"gender":"Male","item":"Assault Vest","ability":"Intimidate","nature":"Adamant","moves":["Retaliate","Crunch","Play Rough","Psychic Fangs"],"stats":"HP: 169        Sp.Atk: 62\nAtk: 151       Sp.Def: 116\nDef: 116       Speed: 106"},{"pokemon":"Escavalier","level":53,"gender":"Male","item":"Occa Berry","ability":"Shell Armor","nature":"Adamant","moves":["Megahorn","Iron Head","Drill Run","Knock Off"],"stats":"HP: 153        Sp.Atk: 76\nAtk: 180       Sp.Def: 132\nDef: 132       Speed: 42"},{"pokemon":"Braviary","level":53,"gender":"Male","item":"Power Herb","ability":"Defiant","nature":"Adamant","moves":["Sky Attack","Brave Bird","Crush Claw","Tailwind"],"stats":"HP: 185        Sp.Atk: 72\nAtk: 166       Sp.Def: 100\nDef: 100       Speed: 106"},{"pokemon":"Rapidash","level":53,"gender":"Female","item":"Life Orb","ability":"Flash Fire","nature":"Jolly","moves":["Flare Blitz","Megahorn","High Horsepower","Morning Sun"],"stats":"HP: 148        Sp.Atk: 95\nAtk: 127       Sp.Def: 106\nDef: 95       Speed: 145"},{"pokemon":"Entei","level":53,"gender":"Genderless","item":"Leftovers","ability":"Inner Focus","nature":"Adamant","moves":["Sacred Fire","Extreme Speed","Stone Edge","Noble Roar"],"stats":"HP: 201        Sp.Atk: 104\nAtk: 157       Sp.Def: 100\nDef: 111       Speed: 127"}]},
			{"id":"trainer-114","calculatorTrainerId":"trainer-114","models":["swsh-marnie"],"name":"Marnie 2 [Single]","split":"Marnie 2","levelCap":"54","location":"Outside Spikemuth","team":[{"pokemon":"Grimmsnarl","level":54,"gender":"Male","item":"Light Clay","ability":"Prankster","nature":"Careful","moves":["Reflect","Light Screen","Spirit Break","Thunder Wave"],"stats":"HP: 183        Sp.Atk: 111\nAtk: 151       Sp.Def: 112\nDef: 91       Speed: 86"},{"pokemon":"Drapion","level":54,"gender":"Female","item":"Scope Lens","ability":"Battle Armor","nature":"Jolly","moves":["Night Slash","Cross Poison","Earthquake","Toxic Spikes"],"stats":"HP: 156        Sp.Atk: 77\nAtk: 118       Sp.Def: 102\nDef: 140       Speed: 136"},{"pokemon":"Incineroar","level":54,"gender":"Male","item":"Figy Berry","ability":"Intimidate","nature":"Careful","moves":["Fake Out","Darkest Lariat","Flare Blitz","Parting Shot"],"stats":"HP: 183        Sp.Atk: 97\nAtk: 145       Sp.Def: 129\nDef: 118       Speed: 86"},{"pokemon":"Mega Absol","level":54,"gender":"Female","item":"Absolite","ability":"Magic Bounce","nature":"Jolly","moves":["Night Slash","Play Rough","Sucker Punch","Swords Dance"],"stats":"HP: 150        Sp.Atk: 130\nAtk: 183       Sp.Def: 86\nDef: 86       Speed: 159","sprite":"absol-mega"},{"pokemon":"Zarude","level":54,"gender":"Genderless","item":"Assault Vest","ability":"Leaf Guard","nature":"Jolly","moves":["Power Whip","Darkest Lariat","Close Combat","U-turn"],"stats":"HP: 194        Sp.Atk: 87\nAtk: 151       Sp.Def: 124\nDef: 135       Speed: 148"},{"pokemon":"Morpeko","level":54,"gender":"Female","item":"Life Orb","ability":"Hunger Switch","nature":"Jolly","moves":["Aura Wheel","Crunch","Parting Shot","Fake Out"],"stats":"HP: 143        Sp.Atk: 87\nAtk: 124       Sp.Def: 84\nDef: 84       Speed: 138"}]},
			{"id":"trainer-115","calculatorTrainerId":"trainer-115","models":["swsh-team-yell-male"],"name":"Team Yell Gym Grunt 1 [Single]","split":"Piers","levelCap":"55","location":"Dark Gym","team":[{"pokemon":"Liepard","level":54,"gender":"Female","item":"Eject Button","ability":"Prankster","nature":"Jolly","moves":["Fake Out","Thunder Wave","Torment","Snarl"],"stats":"HP: 149        Sp.Atk: 104\nAtk: 116       Sp.Def: 75\nDef: 75       Speed: 149"},{"pokemon":"Thievul","level":54,"gender":"Male","item":"Choice Scarf","ability":"Stakeout","nature":"Timid","moves":["Switcheroo","Night Daze","Burning Jealousy","Parting Shot"],"stats":"HP: 156        Sp.Atk: 115\nAtk: 75       Sp.Def: 121\nDef: 84       Speed: 129"},{"pokemon":"Persian","level":54,"gender":"Female","item":"Chople Berry","ability":"Fur Coat","nature":"Timid","moves":["Foul Play","Taunt","Parting Shot","Hypnosis"],"stats":"HP: 150        Sp.Atk: 102\nAtk: 77       Sp.Def: 91\nDef: 86       Speed: 159","sprite":"persian-alola"},{"pokemon":"Sableye","level":54,"gender":"Male","item":"Sticky Barb","ability":"Prankster","nature":"Careful","moves":["Trick","Will-O-Wisp","Foul Play","Recover"],"stats":"HP: 134        Sp.Atk: 81\nAtk: 102       Sp.Def: 100\nDef: 102       Speed: 75"},{"pokemon":"Skuntank","level":54,"gender":"Female","item":"Black Sludge","ability":"Aftermath","nature":"Jolly","moves":["Toxic","Venoshock","Sucker Punch","Smokescreen"],"stats":"HP: 191        Sp.Atk: 88\nAtk: 122       Sp.Def: 87\nDef: 94       Speed: 123"},{"pokemon":"Mandibuzz","level":54,"gender":"Female","item":"Rocky Helmet","ability":"Overcoat","nature":"Impish","moves":["Foul Play","Roost","U-turn","Knock Off"],"stats":"HP: 199        Sp.Atk: 72\nAtk: 91       Sp.Def: 124\nDef: 148       Speed: 108"}]},
			{"id":"trainer-116","calculatorTrainerId":"trainer-116","models":["swsh-team-yell-female"],"name":"Team Yell Gym Grunt 2 [Single]","split":"Piers","levelCap":"55","location":"Dark Gym","team":[{"pokemon":"Umbreon","level":54,"gender":"Female","item":"Chople Berry","ability":"Synchronize","nature":"Careful","moves":["Mean Look","Taunt","Toxic","Foul Play"],"stats":"HP: 183        Sp.Atk: 77\nAtk: 91       Sp.Def: 178\nDef: 140       Speed: 91"},{"pokemon":"Pangoro","level":54,"gender":"Male","item":"Eject Pack","ability":"Iron Fist","nature":"Adamant","moves":["Superpower","Knock Off","Bullet Punch","Parting Shot"],"stats":"HP: 183        Sp.Atk: 86\nAtk: 170       Sp.Def: 98\nDef: 105       Speed: 84"},{"pokemon":"Krookodile","level":54,"gender":"Male","item":"Soft Sand","ability":"Intimidate","nature":"Jolly","moves":["Earthquake","Crunch","Sand Tomb","Stealth Rock"],"stats":"HP: 183        Sp.Atk: 81\nAtk: 148       Sp.Def: 97\nDef: 108       Speed: 133"},{"pokemon":"Crawdaunt","level":54,"gender":"Male","item":"Mystic Water","ability":"Adaptability","nature":"Adamant","moves":["Crabhammer","Knock Off","Aqua Jet","Taunt"],"stats":"HP: 148        Sp.Atk: 106\nAtk: 166       Sp.Def: 81\nDef: 113       Speed: 81"},{"pokemon":"Sharpedo","level":54,"gender":"Female","item":"Expert Belt","ability":"Speed Boost","nature":"Jolly","moves":["Liquidation","Crunch","Poison Fang","Psychic Fangs"],"stats":"HP: 156        Sp.Atk: 111\nAtk: 151       Sp.Def: 64\nDef: 64       Speed: 136"},{"pokemon":"Bisharp","level":54,"gender":"Male","item":"Black Glasses","ability":"Defiant","nature":"Adamant","moves":["Iron Head","Throat Chop","Sucker Punch","Swords Dance"],"stats":"HP: 150        Sp.Atk: 77\nAtk: 171       Sp.Def: 97\nDef: 129       Speed: 97"}]},
			{"id":"trainer-117","calculatorTrainerId":"trainer-117","models":["swsh-team-yell-female"],"name":"Team Yell Gym Grunt 3 [Single]","split":"Piers","levelCap":"55","location":"Dark Gym","team":[{"pokemon":"Grimmsnarl","level":54,"gender":"Male","item":"Light Clay","ability":"Prankster","nature":"Careful","moves":["Reflect","Light Screen","Spirit Break","Parting Shot"],"stats":"HP: 183        Sp.Atk: 111\nAtk: 151       Sp.Def: 112\nDef: 91       Speed: 86"},{"pokemon":"Scrafty","level":54,"gender":"Male","item":"Eject Button","ability":"Intimidate","nature":"Careful","moves":["Fake Out","Drain Punch","Knock Off","Dragon Dance"],"stats":"HP: 150        Sp.Atk: 63\nAtk: 118       Sp.Def: 159\nDef: 145       Speed: 84"},{"pokemon":"Shiftry","level":54,"gender":"Female","item":"White Herb","ability":"Pickpocket","nature":"Modest","moves":["Leaf Storm","Dark Pulse","Heat Wave","Extrasensory"],"stats":"HP: 177        Sp.Atk: 129\nAtk: 116       Sp.Def: 86\nDef: 86       Speed: 108"},{"pokemon":"Weavile","level":54,"gender":"Female","item":"Muscle Band","ability":"Pressure","nature":"Jolly","moves":["Triple Axel","Throat Chop","Ice Shard","Low Kick"],"stats":"HP: 156        Sp.Atk: 63\nAtk: 151       Sp.Def: 113\nDef: 91       Speed: 171"},{"pokemon":"Morpeko","level":54,"gender":"Female","item":"Sitrus Berry","ability":"Hunger Switch","nature":"Jolly","moves":["Aura Wheel","Crunch","Parting Shot","Fire Fang"],"stats":"HP: 143        Sp.Atk: 87\nAtk: 124       Sp.Def: 84\nDef: 84       Speed: 138"},{"pokemon":"Lycanroc","level":54,"gender":"Male","item":"Black Glasses","ability":"Adaptability","nature":"Jolly","moves":["Crunch","Stone Edge","Sucker Punch","Taunt"],"stats":"HP: 183        Sp.Atk: 53\nAtk: 178       Sp.Def: 81\nDef: 81       Speed: 144","sprite":"lycanroc-midnight"}]},
			{"id":"trainer-118","calculatorTrainerId":"trainer-118","models":["swsh-team-yell-male"],"name":"Team Yell Gym Grunt 4 [Single]","split":"Piers","levelCap":"55","location":"Dark Gym","team":[{"pokemon":"Tyranitar","level":54,"gender":"Male","item":"Smooth Rock","ability":"Sand Stream","nature":"Careful","moves":["Stealth Rock","Crunch","Rock Slide","Dragon Tail"],"stats":"HP: 188        Sp.Atk: 111\nAtk: 166       Sp.Def: 141\nDef: 140       Speed: 87"},{"pokemon":"Vullaby","level":54,"gender":"Female","item":"Eviolite","ability":"Overcoat","nature":"Impish","moves":["Foul Play","Knock Off","Roost","U-turn"],"stats":"HP: 156        Sp.Atk: 63\nAtk: 81       Sp.Def: 91\nDef: 112       Speed: 86"},{"pokemon":"Drapion","level":54,"gender":"Female","item":"Scope Lens","ability":"Sniper","nature":"Jolly","moves":["Night Slash","Cross Poison","Toxic Spikes","Earthquake"],"stats":"HP: 156        Sp.Atk: 77\nAtk: 118       Sp.Def: 102\nDef: 140       Speed: 136"},{"pokemon":"Krookodile","level":54,"gender":"Male","item":"Choice Scarf","ability":"Moxie","nature":"Jolly","moves":["Earthquake","Crunch","Stone Edge","Close Combat"],"stats":"HP: 183        Sp.Atk: 81\nAtk: 148       Sp.Def: 97\nDef: 108       Speed: 133"},{"pokemon":"Bisharp","level":54,"gender":"Male","item":"Focus Sash","ability":"Defiant","nature":"Adamant","moves":["Swords Dance","Iron Head","Sucker Punch","Assurance"],"stats":"HP: 150        Sp.Atk: 77\nAtk: 171       Sp.Def: 97\nDef: 129       Speed: 97"},{"pokemon":"Sharpedo","level":54,"gender":"Female","item":"Life Orb","ability":"Speed Boost","nature":"Adamant","moves":["Protect","Crunch","Liquidation","Aqua Jet"],"stats":"HP: 156        Sp.Atk: 111\nAtk: 166       Sp.Def: 64\nDef: 64       Speed: 124"}]},
			{"id":"trainer-119","calculatorTrainerId":"trainer-119","models":["swsh-team-yell-male","swsh-dark-gym-male"],"name":"Team Yell Gym Grunts [Double] [Leads: Incineroar, Bisharp]","split":"Piers","levelCap":"55","location":"Dark Gym","team":[{"pokemon":"Incineroar","level":54,"gender":"Male","item":"Leftovers","ability":"Intimidate","nature":"Careful","moves":["Fake Out","Parting Shot","Flare Blitz","Darkest Lariat"],"stats":"HP: 183        Sp.Atk: 97\nAtk: 145       Sp.Def: 129\nDef: 118       Speed: 86"},{"pokemon":"Sableye","level":54,"gender":"Female","item":"Mental Herb","ability":"Prankster","nature":"Careful","moves":["Quash","Will-O-Wisp","Helping Hand","Foul Play"],"stats":"HP: 134        Sp.Atk: 81\nAtk: 102       Sp.Def: 100\nDef: 102       Speed: 75"},{"pokemon":"Lycanroc","level":54,"gender":"Male","item":"Black Glasses","ability":"Adaptability","nature":"Jolly","moves":["Crunch","Stone Edge","Sucker Punch","Protect"],"stats":"HP: 183        Sp.Atk: 53\nAtk: 178       Sp.Def: 81\nDef: 81       Speed: 144","sprite":"lycanroc-midnight"},{"pokemon":"Bisharp","level":54,"gender":"Male","item":"Life Orb","ability":"Defiant","nature":"Adamant","moves":["Swords Dance","Iron Head","Sucker Punch","Protect"],"stats":"HP: 150        Sp.Atk: 77\nAtk: 171       Sp.Def: 97\nDef: 129       Speed: 97"},{"pokemon":"Grimmsnarl","level":54,"gender":"Male","item":"Light Clay","ability":"Prankster","nature":"Careful","moves":["Reflect","Light Screen","Spirit Break","Thunder Wave"],"stats":"HP: 183        Sp.Atk: 111\nAtk: 151       Sp.Def: 112\nDef: 91       Speed: 86"},{"pokemon":"Mandibuzz","level":54,"gender":"Female","item":"Sitrus Berry","ability":"Overcoat","nature":"Impish","moves":["Tailwind","Snarl","Foul Play","Brave Bird"],"stats":"HP: 199        Sp.Atk: 72\nAtk: 91       Sp.Def: 124\nDef: 148       Speed: 108"}]},
			{"id":"trainer-120","calculatorTrainerId":"trainer-120","models":["swsh-piers"],"name":"Piers [Single]","split":"Piers","levelCap":"55","location":"Dark Gym","team":[{"pokemon":"Spiritomb","level":55,"gender":"Female","item":"Leftovers","ability":"Pressure","nature":"Careful","moves":["Will-O-Wisp","Foul Play","Shadow Ball","Disable"],"stats":"HP: 137        Sp.Atk: 110\nAtk: 123       Sp.Def: 154\nDef: 140       Speed: 60"},{"pokemon":"Moltres","level":55,"gender":"Genderless","item":"Weakness Policy","ability":"Berserk","nature":"Modest","moves":["Fiery Wrath","Hurricane","Nasty Plot","Agility"],"stats":"HP: 181        Sp.Atk: 145\nAtk: 103       Sp.Def: 159\nDef: 121       Speed: 121","sprite":"moltres-galar"},{"pokemon":"Mega Gyarados","level":55,"gender":"Male","item":"Gyaradosite","ability":"Mold Breaker","nature":"Adamant","moves":["Crunch","Waterfall","Earthquake","Dragon Dance"],"stats":"HP: 186        Sp.Atk: 89\nAtk: 211       Sp.Def: 165\nDef: 141       Speed: 111","sprite":"gyarados-mega"},{"pokemon":"Zoroark","level":55,"gender":"Male","item":"Focus Sash","ability":"Illusion","nature":"Timid","moves":["Night Daze","Flamethrower","Nasty Plot","U-turn"],"stats":"HP: 148        Sp.Atk: 154\nAtk: 123       Sp.Def: 88\nDef: 88       Speed: 150"},{"pokemon":"Malamar","level":55,"gender":"Female","item":"Expert Belt","ability":"Contrary","nature":"Adamant","moves":["Superpower","Knock Off","Psycho Cut","Topsy-Turvy"],"stats":"HP: 176        Sp.Atk: 86\nAtk: 135       Sp.Def: 104\nDef: 118       Speed: 102"},{"pokemon":"Obstagoon","level":55,"gender":"Male","item":"Flame Orb","ability":"Guts","nature":"Jolly","moves":["Facade","Knock Off","Close Combat","Obstruct"],"stats":"HP: 184        Sp.Atk: 79\nAtk: 121       Sp.Def: 111\nDef: 133       Speed: 138"}]},
			{"id":"trainer-121","calculatorTrainerId":"trainer-121","models":["swsh-dragon-gym-male"],"name":"Gym Trainer Sebastian [Double]","split":"Raihan","levelCap":"60","location":"Dragon Gym","team":[{"pokemon":"Kingdra","level":57,"gender":"Male","item":"Damp Rock","ability":"Swift Swim","nature":"Modest","moves":["Rain Dance","Muddy Water","Draco Meteor","Icy Wind"],"stats":"HP: 170        Sp.Atk: 143\nAtk: 117       Sp.Def: 130\nDef: 130       Speed: 119"},{"pokemon":"Noivern","level":57,"gender":"Female","item":"Wise Glasses","ability":"Telepathy","nature":"Timid","moves":["Hurricane","Boomburst","Tailwind","Taunt"],"stats":"HP: 181        Sp.Atk: 133\nAtk: 91       Sp.Def: 113\nDef: 113       Speed: 178"},{"pokemon":"Dragalge","level":57,"gender":"Female","item":"Black Sludge","ability":"Adaptability","nature":"Modest","moves":["Sludge Wave","Dragon Pulse","Hydro Pump","Acid Spray"],"stats":"HP: 158        Sp.Atk: 146\nAtk: 97       Sp.Def: 162\nDef: 125       Speed: 72"},{"pokemon":"Salamence","level":57,"gender":"Male","item":"Yache Berry","ability":"Intimidate","nature":"Jolly","moves":["Earthquake","Rock Slide","Dual Wingbeat","Breaking Swipe"],"stats":"HP: 192        Sp.Atk: 133\nAtk: 176       Sp.Def: 113\nDef: 113       Speed: 149"},{"pokemon":"Dracovish","level":57,"gender":"Genderless","item":"Choice Scarf","ability":"Strong Jaw","nature":"Adamant","moves":["Fishious Rend","Psychic Fangs","Crunch","Ice Fang"],"stats":"HP: 187        Sp.Atk: 91\nAtk: 137       Sp.Def: 113\nDef: 136       Speed: 108"},{"pokemon":"Appletun","level":57,"gender":"Female","item":"Leftovers","ability":"Thick Fat","nature":"Calm","moves":["Apple Acid","Pollen Puff","Recover","Leech Seed"],"stats":"HP: 210        Sp.Atk: 136\nAtk: 107       Sp.Def: 124\nDef: 113       Speed: 56"}]},
			{"id":"trainer-122","calculatorTrainerId":"trainer-122","models":["swsh-dragon-gym-female"],"name":"Gym Trainer Camilla [Double]","split":"Raihan","levelCap":"60","location":"Dragon Gym","team":[{"pokemon":"Drampa","level":57,"gender":"Male","item":"Mental Herb","ability":"Berserk","nature":"Quiet","moves":["Trick Room","Boomburst","Dragon Pulse","Protect"],"stats":"HP: 173        Sp.Atk: 193\nAtk: 91       Sp.Def: 126\nDef: 119       Speed: 41"},{"pokemon":"Turtonator","level":57,"gender":"Female","item":"Shuca Berry","ability":"Shell Armor","nature":"Quiet","moves":["Shell Trap","Heat Wave","Dragon Pulse","Protect"],"stats":"HP: 153        Sp.Atk: 138\nAtk: 111       Sp.Def: 119\nDef: 176       Speed: 41"},{"pokemon":"Druddigon","level":57,"gender":"Male","item":"Rocky Helmet","ability":"Rough Skin","nature":"Relaxed","moves":["Breaking Swipe","Glare","Dragon Claw","Protect"],"stats":"HP: 172        Sp.Atk: 91\nAtk: 159       Sp.Def: 125\nDef: 137       Speed: 53"},{"pokemon":"Altaria","level":57,"gender":"Female","item":"Sitrus Berry","ability":"Natural Cure","nature":"Calm","moves":["Helping Hand","Moonblast","Heal Bell","Roost"],"stats":"HP: 170        Sp.Atk: 102\nAtk: 91       Sp.Def: 156\nDef: 125       Speed: 96"},{"pokemon":"Tyrantrum","level":57,"gender":"Male","item":"Life Orb","ability":"Rock Head","nature":"Brave","moves":["Head Smash","Dragon Claw","High Horsepower","Protect"],"stats":"HP: 178        Sp.Atk: 101\nAtk: 176       Sp.Def: 89\nDef: 158       Speed: 76"},{"pokemon":"Kommo-o","level":57,"gender":"Male","item":"Throat Spray","ability":"Soundproof","nature":"Quiet","moves":["Clanging Scales","Aura Sphere","Flash Cannon","Protect"],"stats":"HP: 170        Sp.Atk: 149\nAtk: 148       Sp.Def: 142\nDef: 165       Speed: 90"}]},
			{"id":"trainer-123","calculatorTrainerId":"trainer-123","models":["swsh-dragon-gym-female"],"name":"Gym Trainer Aria [Double]","split":"Raihan","levelCap":"60","location":"Dragon Gym","team":[{"pokemon":"Flygon","level":57,"gender":"Female","item":"Yache Berry","ability":"Levitate","nature":"Jolly","moves":["Tailwind","Earthquake","Breaking Swipe","U-turn"],"stats":"HP: 175        Sp.Atk: 101\nAtk: 136       Sp.Def: 113\nDef: 113       Speed: 149"},{"pokemon":"Dracozolt","level":57,"gender":"Genderless","item":"Air Balloon","ability":"Volt Absorb","nature":"Jolly","moves":["Bolt Beak","Discharge","Dragon Claw","Protect"],"stats":"HP: 187        Sp.Atk: 101\nAtk: 136       Sp.Def: 102\nDef: 125       Speed: 118"},{"pokemon":"Flapple","level":57,"gender":"Male","item":"Sitrus Berry","ability":"Ripen","nature":"Adamant","moves":["Grav Apple","Apple Acid","Pollen Puff","Dragon Rush"],"stats":"HP: 164        Sp.Atk: 117\nAtk: 162       Sp.Def: 91\nDef: 113       Speed: 102"},{"pokemon":"Haxorus","level":57,"gender":"Male","item":"White Herb","ability":"Mold Breaker","nature":"Jolly","moves":["Scale Shot","Poison Jab","Close Combat","Rock Slide"],"stats":"HP: 171        Sp.Atk: 81\nAtk: 190       Sp.Def: 102\nDef: 125       Speed: 146"},{"pokemon":"Zygarde 10%","level":57,"gender":"Genderless","item":"Roseli Berry","ability":"Aura Break","nature":"Jolly","moves":["Thousand Arrows","Breaking Swipe","Glare","Extreme Speed"],"stats":"HP: 146        Sp.Atk: 82\nAtk: 136       Sp.Def: 119\nDef: 103       Speed: 168","sprite":"zygarde-10"},{"pokemon":"Regidrago","level":57,"gender":"Genderless","item":"Draco Plate","ability":"Dragon’s Maw","nature":"Modest","moves":["Dragon Energy","Dragon Pulse","Flamethrower","Protect"],"stats":"HP: 312        Sp.Atk: 149\nAtk: 122       Sp.Def: 79\nDef: 79       Speed: 113"}]},
			{"id":"trainer-124","calculatorTrainerId":"trainer-124","models":["swsh-raihan"],"name":"Raihan [Double]","split":"Raihan","levelCap":"60","location":"Dragon Gym","team":[{"pokemon":"Dragonite","level":60,"gender":"Male","item":"Yache Berry","ability":"Multiscale","nature":"Careful","moves":["Tailwind","Breaking Swipe","Dual Wingbeat","Thunder Wave"],"stats":"HP: 197        Sp.Atk: 128\nAtk: 184       Sp.Def: 157\nDef: 137       Speed: 119"},{"pokemon":"Goodra","level":60,"gender":"Female","item":"Assault Vest","ability":"Gooey","nature":"Modest","moves":["Dragon Pulse","Muddy Water","Sludge Bomb","Acid Spray"],"stats":"HP: 196        Sp.Atk: 170\nAtk: 128       Sp.Def: 203\nDef: 107       Speed: 119"},{"pokemon":"Hydreigon","level":60,"gender":"Male","item":"Dragon Gem","ability":"Levitate","nature":"Timid","moves":["Dark Pulse","Draco Meteor","Heat Wave","Protect"],"stats":"HP: 199        Sp.Atk: 173\nAtk: 134       Sp.Def: 131\nDef: 131       Speed: 155"},{"pokemon":"Dragapult","level":60,"gender":"Female","item":"Life Orb","ability":"Clear Body","nature":"Jolly","moves":["Dragon Darts","Phantom Force","Will-O-Wisp","Ally Switch"],"stats":"HP: 194        Sp.Atk: 128\nAtk: 167       Sp.Def: 113\nDef: 113       Speed: 213"},{"pokemon":"Mega Garchomp","level":60,"gender":"Male","item":"Garchompite","ability":"Sand Force","nature":"Adamant","moves":["Earthquake","Dragon Claw","Rock Slide","Sandstorm"],"stats":"HP: 218        Sp.Atk: 150\nAtk: 249       Sp.Def: 137\nDef: 161       Speed: 134","sprite":"garchomp-mega"},{"pokemon":"Duraludon GMAX","level":60,"gender":"Male","item":"Air Balloon","ability":"Stalwart","nature":"Modest","moves":["Dragon Pulse","Flash Cannon","Thunderbolt","Meteor Beam"],"stats":"HP: 172        Sp.Atk: 183\nAtk: 123       Sp.Def: 83\nDef: 161       Speed: 125","sprite":"duraludon-gmax"}]},
			{"id":"trainer-125","calculatorTrainerId":"trainer-125","models":["swsh-doctor-male"],"name":"Doctor Graham [Single]","split":"Wyndon","levelCap":"65","location":"Route 10","team":[{"pokemon":"Crustle","level":62,"gender":"Male","item":"White Herb","ability":"Sturdy","nature":"Adamant","moves":["Shell Smash","Rock Blast","X-Scissor","Earthquake"],"stats":"HP: 178        Sp.Atk: 93\nAtk: 169       Sp.Def: 117\nDef: 179       Speed: 80"},{"pokemon":"Shedinja","level":62,"gender":"Genderless","item":"Safety Goggles","ability":"Wonder Guard","nature":"Adamant","moves":["Poltergeist","X-Scissor","Will-O-Wisp","Protect"],"stats":"HP: 1        Sp.Atk: 54\nAtk: 148       Sp.Def: 61\nDef: 80       Speed: 73"},{"pokemon":"Quagsire","level":62,"gender":"Female","item":"Leftovers","ability":"Unaware","nature":"Bold","moves":["Scald","Earthquake","Toxic","Recover"],"stats":"HP: 209        Sp.Atk: 104\nAtk: 116       Sp.Def: 104\nDef: 141       Speed: 67"},{"pokemon":"Sigilyph","level":62,"gender":"Female","item":"Flame Orb","ability":"Magic Guard","nature":"Timid","moves":["Psycho Shift","Psychic","Air Slash","Roost"],"stats":"HP: 180        Sp.Atk: 151\nAtk: 86       Sp.Def: 123\nDef: 123       Speed: 158"},{"pokemon":"Pyukumuku","level":62,"gender":"Female","item":"Sitrus Berry","ability":"Innards Out","nature":"Bold","moves":["Counter","Mirror Coat","Toxic","Recover"],"stats":"HP: 159        Sp.Atk: 61\nAtk: 88       Sp.Def: 185\nDef: 203       Speed: 11"},{"pokemon":"Ditto","level":62,"gender":"Genderless","item":"Choice Scarf","ability":"Imposter","nature":"Hardy","moves":["Transform"],"stats":"HP: 150        Sp.Atk: 83\nAtk: 83       Sp.Def: 83\nDef: 83       Speed: 83"}]},
			{"id":"trainer-126","calculatorTrainerId":"trainer-126","models":["swsh-hiker"],"name":"Hiker Douglas [Single]","split":"Wyndon","levelCap":"65","location":"Route 10","team":[{"pokemon":"Druddigon","level":62,"gender":"Male","item":"Rocky Helmet","ability":"Rough Skin","nature":"Impish","moves":["Stealth Rock","Glare","Dragon Tail","Breaking Swipe"],"stats":"HP: 186        Sp.Atk: 88\nAtk: 173       Sp.Def: 135\nDef: 148       Speed: 83"},{"pokemon":"Cofagrigus","level":62,"gender":"Female","item":"Leftovers","ability":"Mummy","nature":"Bold","moves":["Will-O-Wisp","Hex","Iron Defense","Body Press"],"stats":"HP: 163        Sp.Atk: 142\nAtk: 77       Sp.Def: 154\nDef: 224       Speed: 42"},{"pokemon":"Turtonator","level":62,"gender":"Female","item":"Shuca Berry","ability":"Shell Armor","nature":"Modest","moves":["Shell Trap","Flamethrower","Dragon Pulse","Will-O-Wisp"],"stats":"HP: 165        Sp.Atk: 150\nAtk: 108       Sp.Def: 129\nDef: 191       Speed: 49"},{"pokemon":"Eiscue","level":62,"gender":"Female","item":"Sitrus Berry","ability":"Ice Face","nature":"Jolly","moves":["Belly Drum","Icicle Crash","Liquidation","Zen Headbutt"],"stats":"HP: 184        Sp.Atk: 93\nAtk: 123       Sp.Def: 135\nDef: 160       Speed: 94"},{"pokemon":"Aegislash","level":62,"gender":"Male","item":"Weakness Policy","ability":"Stance Change","nature":"Quiet","moves":["King’s Shield","Shadow Ball","Sacred Sword","Shadow Sneak"],"stats":"HP: 165        Sp.Atk: 94\nAtk: 86       Sp.Def: 197\nDef: 197       Speed: 88"},{"pokemon":"Volcarona","level":62,"gender":"Female","item":"Heavy-Duty Boots","ability":"Flame Body","nature":"Timid","moves":["Quiver Dance","Fiery Dance","Bug Buzz","Giga Drain"],"stats":"HP: 196        Sp.Atk: 191\nAtk: 88       Sp.Def: 154\nDef: 104       Speed: 162"}]},
			{"id":"trainer-127","calculatorTrainerId":"trainer-127","models":["swsh-office-worker-male"],"name":"Office Worker Ronald [Single]","split":"Wyndon","levelCap":"65","location":"Route 10","team":[{"pokemon":"Lopunny","level":62,"gender":"Female","item":"Assault Vest","ability":"Klutz","nature":"Jolly","moves":["Switcheroo","Encore","U-turn","Healing Wish"],"stats":"HP: 171        Sp.Atk: 81\nAtk: 118       Sp.Def: 143\nDef: 128       Speed: 169"},{"pokemon":"Salazzle","level":62,"gender":"Female","item":"Eject Pack","ability":"Corrosion","nature":"Timid","moves":["Overheat","Sludge Wave","Toxic","Dragon Pulse"],"stats":"HP: 175        Sp.Atk: 161\nAtk: 92       Sp.Def: 98\nDef: 98       Speed: 185"},{"pokemon":"Drifblim","level":62,"gender":"Male","item":"Weakness Policy","ability":"Unburden","nature":"Naive","moves":["Acrobatics","Shadow Ball","Will-O-Wisp","Destiny Bond"],"stats":"HP: 277        Sp.Atk: 135\nAtk: 123       Sp.Def: 81\nDef: 78       Speed: 135"},{"pokemon":"Greedent","level":62,"gender":"Male","item":"Sitrus Berry","ability":"Cheek Pouch","nature":"Adamant","moves":["Belly Drum","Body Slam","Crunch","Seed Bomb"],"stats":"HP: 240        Sp.Atk: 82\nAtk: 156       Sp.Def: 117\nDef: 142       Speed: 29"},{"pokemon":"Mega Sceptile","level":62,"gender":"Male","item":"White Herb","ability":"Lightning Rod","nature":"Timid","moves":["Leaf Storm","Giga Drain","Dragon Pulse","Focus Blast"],"stats":"HP: 178        Sp.Atk: 204\nAtk: 144       Sp.Def: 129\nDef: 117       Speed: 224","sprite":"sceptile-mega"},{"pokemon":"Slowbro","level":62,"gender":"Male","item":"Quick Claw","ability":"Quick Draw","nature":"Modest","moves":["Psychic","Shell Side Arm","Flamethrower","Surf"],"stats":"HP: 209        Sp.Atk: 162\nAtk: 133       Sp.Def: 111\nDef: 142       Speed: 42","sprite":"slowbro-galar"}]},
			{"id":"trainer-128","calculatorTrainerId":"trainer-128","models":["swsh-cabbie"],"name":"Cabbie Geoffrey [Single]","split":"Wyndon","levelCap":"65","location":"Route 10","team":[{"pokemon":"Seaking","level":63,"gender":"Male","item":"Assault Vest","ability":"Lightning Rod","nature":"Adamant","moves":["Liquidation","Megahorn","Drill Run","Knock Off"],"stats":"HP: 193        Sp.Atk: 95\nAtk: 154       Sp.Def: 125\nDef: 106       Speed: 110"},{"pokemon":"Azumarill","level":63,"gender":"Female","item":"Sitrus Berry","ability":"Sap Sipper","nature":"Adamant","moves":["Belly Drum","Aqua Jet","Play Rough","Knock Off"],"stats":"HP: 218        Sp.Atk: 90\nAtk: 95       Sp.Def: 125\nDef: 125       Speed: 87"},{"pokemon":"Heliolisk","level":63,"gender":"Male","item":"Choice Specs","ability":"Dry Skin","nature":"Timid","moves":["Thunderbolt","Hyper Voice","Surf","Volt Switch"],"stats":"HP: 170        Sp.Atk: 161\nAtk: 83       Sp.Def: 142\nDef: 90       Speed: 177"},{"pokemon":"Chandelure","level":63,"gender":"Female","item":"Air Balloon","ability":"Flash Fire","nature":"Timid","moves":["Flamethrower","Shadow Ball","Energy Ball","Calm Mind"],"stats":"HP: 168        Sp.Atk: 207\nAtk: 83       Sp.Def: 137\nDef: 137       Speed: 137"},{"pokemon":"Bronzong","level":63,"gender":"Genderless","item":"Leftovers","ability":"Heatproof","nature":"Relaxed","moves":["Trick Room","Gyro Ball","Earthquake","Hypnosis"],"stats":"HP: 176        Sp.Atk: 124\nAtk: 136       Sp.Def: 170\nDef: 187       Speed: 41"},{"pokemon":"Araquanid","level":63,"gender":"Female","item":"Mystic Water","ability":"Water Bubble","nature":"Adamant","moves":["Liquidation","Leech Life","Lunge","Poison Jab"],"stats":"HP: 178        Sp.Atk: 78\nAtk: 123       Sp.Def: 190\nDef: 140       Speed: 57"}]},
			{"id":"trainer-129","calculatorTrainerId":"trainer-129","models":["swsh-postman"],"name":"Postman Harper [Single]","split":"Wyndon","levelCap":"65","location":"Route 10","team":[{"pokemon":"Ninjask","level":63,"gender":"Male","item":"Safety Goggles","ability":"Speed Boost","nature":"Jolly","moves":["Protect","Swords Dance","Baton Pass","X-Scissor"],"stats":"HP: 180        Sp.Atk: 78\nAtk: 156       Sp.Def: 74\nDef: 74       Speed: 248"},{"pokemon":"Conkeldurr","level":63,"gender":"Male","item":"Flame Orb","ability":"Guts","nature":"Adamant","moves":["Drain Punch","Mach Punch","Knock Off","Ice Punch"],"stats":"HP: 224        Sp.Atk: 83\nAtk: 220       Sp.Def: 106\nDef: 144       Speed: 81"},{"pokemon":"Dunsparce","level":63,"gender":"Female","item":"Leftovers","ability":"Serene Grace","nature":"Careful","moves":["Glare","Headbutt","Rock Slide","Roost"],"stats":"HP: 218        Sp.Atk: 95\nAtk: 112       Sp.Def: 116\nDef: 112       Speed: 81"},{"pokemon":"Scolipede","level":63,"gender":"Female","item":"Black Sludge","ability":"Speed Boost","nature":"Jolly","moves":["Toxic Spikes","Megahorn","Poison Jab","Earthquake"],"stats":"HP: 168        Sp.Atk: 83\nAtk: 150       Sp.Def: 111\nDef: 136       Speed: 181"},{"pokemon":"Slowking","level":63,"gender":"Male","item":"Room Service","ability":"Regenerator","nature":"Quiet","moves":["Trick Room","Future Sight","Scald","Slack Off"],"stats":"HP: 212        Sp.Atk: 165\nAtk: 119       Sp.Def: 163\nDef: 125       Speed: 37"},{"pokemon":"Marowak","level":63,"gender":"Female","item":"Thick Club","ability":"Lightning Rod","nature":"Brave","moves":["Shadow Bone","Flare Blitz","Bonemerang","Swords Dance"],"stats":"HP: 168        Sp.Atk: 87\nAtk: 137       Sp.Def: 125\nDef: 163       Speed: 54","sprite":"marowak-alola"}]},
			{"id":"trainer-130","calculatorTrainerId":"trainer-130","models":["swsh-hiker"],"name":"Hiker Donald [Single]","split":"Wyndon","levelCap":"65","location":"Route 10","team":[{"pokemon":"Claydol","level":63,"gender":"Genderless","item":"Mental Herb","ability":"Levitate","nature":"Bold","moves":["Gravity","Stealth Rock","Earth Power","Hypnosis"],"stats":"HP: 168        Sp.Atk: 112\nAtk: 100       Sp.Def: 175\nDef: 171       Speed: 119"},{"pokemon":"Hydreigon","level":63,"gender":"Male","item":"Muscle Band","ability":"Levitate","nature":"Adamant","moves":["Dragon Rush","Crunch","Iron Tail","Body Slam"],"stats":"HP: 208        Sp.Atk: 163\nAtk: 171       Sp.Def: 137\nDef: 137       Speed: 148"},{"pokemon":"Roserade","level":63,"gender":"Female","item":"Black Sludge","ability":"Natural Cure","nature":"Timid","moves":["Sleep Powder","Leaf Storm","Sludge Bomb","Weather Ball"],"stats":"HP: 168        Sp.Atk: 182\nAtk: 100       Sp.Def: 156\nDef: 106       Speed: 150"},{"pokemon":"Clefable","level":63,"gender":"Female","item":"Life Orb","ability":"Magic Guard","nature":"Modest","moves":["Gravity","Moonblast","Fire Blast","Sing"],"stats":"HP: 212        Sp.Atk: 158\nAtk: 100       Sp.Def: 137\nDef: 116       Speed: 100"},{"pokemon":"Sandaconda","level":63,"gender":"Female","item":"Leftovers","ability":"Shed Skin","nature":"Impish","moves":["Coil","Earthquake","Stone Edge","Glare"],"stats":"HP: 183        Sp.Atk: 95\nAtk: 159       Sp.Def: 112\nDef: 200       Speed: 113"},{"pokemon":"Dugtrio","level":63,"gender":"Male","item":"Expert Belt","ability":"Tangling Hair","nature":"Jolly","moves":["Earthquake","Iron Head","Stone Edge","Sucker Punch"],"stats":"HP: 136        Sp.Atk: 78\nAtk: 150       Sp.Def: 112\nDef: 100       Speed: 179","sprite":"dugtrio-alola"}]},
			{"id":"trainer-131","calculatorTrainerId":"trainer-131","models":["swsh-gentleman"],"name":"Gentleman Glenn [Single]","split":"Wyndon","levelCap":"65","location":"Route 10","team":[{"pokemon":"Runerigus","level":63,"gender":"Male","item":"Rocky Helmet","ability":"Wandering Spirit","nature":"Impish","moves":["Stealth Rock","Poltergeist","Earthquake","Will-O-Wisp"],"stats":"HP: 165        Sp.Atk: 78\nAtk: 144       Sp.Def: 156\nDef: 227       Speed: 42"},{"pokemon":"Cramorant","level":63,"gender":"Female","item":"Safety Goggles","ability":"Gulp Missile","nature":"Timid","moves":["Surf","Hurricane","Icy Wind","Roost"],"stats":"HP: 180        Sp.Atk: 131\nAtk: 117       Sp.Def: 144\nDef: 93       Speed: 144"},{"pokemon":"Palossand","level":63,"gender":"Female","item":"Weakness Policy","ability":"Water Compaction","nature":"Bold","moves":["Shore Up","Shadow Ball","Earth Power","Giga Drain"],"stats":"HP: 199        Sp.Atk: 150\nAtk: 107       Sp.Def: 119\nDef: 179       Speed: 49"},{"pokemon":"Lurantis","level":63,"gender":"Female","item":"Leftovers","ability":"Contrary","nature":"Quiet","moves":["Leaf Storm","Superpower","Knock Off","Synthesis"],"stats":"HP: 180        Sp.Atk: 137\nAtk: 156       Sp.Def: 137\nDef: 137       Speed: 54"},{"pokemon":"Trevenant","level":63,"gender":"Male","item":"Sitrus Berry","ability":"Harvest","nature":"Careful","moves":["Sunny Day","Horn Leech","Phantom Force","Leech Seed"],"stats":"HP: 199        Sp.Atk: 95\nAtk: 163       Sp.Def: 139\nDef: 120       Speed: 75"},{"pokemon":"Mimikyu","level":63,"gender":"Female","item":"Red Card","ability":"Disguise","nature":"Jolly","moves":["Swords Dance","Play Rough","Shadow Claw","Shadow Sneak"],"stats":"HP: 161        Sp.Atk: 78\nAtk: 137       Sp.Def: 156\nDef: 125       Speed: 159"}]},
			{"id":"trainer-132","calculatorTrainerId":"trainer-132","models":["swsh-reporter","swsh-cameraman"],"name":"Interviewers Gillian & Cam [Double] [Leads: Gastrodon, Starmie]","split":"Wyndon","levelCap":"65","location":"Route 10","team":[{"pokemon":"Gastrodon","level":64,"gender":"Female","item":"Leftovers","ability":"Storm Drain","nature":"Modest","moves":["Earth Power","Ice Beam","Sludge Bomb","Recover"],"stats":"HP: 235        Sp.Atk: 156\nAtk: 117       Sp.Def: 129\nDef: 111       Speed: 74"},{"pokemon":"Ninetales","level":64,"gender":"Female","item":"Heat Rock","ability":"Drought","nature":"Timid","moves":["Heat Wave","Solar Beam","Helping Hand","Will-O-Wisp"],"stats":"HP: 187        Sp.Atk: 128\nAtk: 109       Sp.Def: 152\nDef: 120       Speed: 167"},{"pokemon":"Klinklang","level":64,"gender":"Genderless","item":"Sitrus Berry","ability":"Plus","nature":"Adamant","moves":["Gear Grind","Wild Charge","Magnetic Flux","Shift Gear"],"stats":"HP: 170        Sp.Atk: 102\nAtk: 167       Sp.Def: 133\nDef: 172       Speed: 140"},{"pokemon":"Starmie","level":64,"gender":"Genderless","item":"Damp Rock","ability":"Natural Cure","nature":"Timid","moves":["Rain Dance","Surf","Thunder","Blizzard"],"stats":"HP: 170        Sp.Atk: 152\nAtk: 108       Sp.Def: 133\nDef: 133       Speed: 189"},{"pokemon":"Leafeon","level":64,"gender":"Male","item":"Life Orb","ability":"Chlorophyll","nature":"Adamant","moves":["Solar Blade","Leaf Blade","Knock Off","Swords Dance"],"stats":"HP: 177        Sp.Atk: 90\nAtk: 181       Sp.Def: 108\nDef: 191       Speed: 146"},{"pokemon":"Toxtricity","level":64,"gender":"Male","item":"Throat Spray","ability":"Minus","nature":"Modest","moves":["Overdrive","Boomburst","Sludge Wave","Hex"],"stats":"HP: 189        Sp.Atk: 187\nAtk: 135       Sp.Def: 114\nDef: 114       Speed: 120","sprite":"toxtricity-lowkey"}]},
			{"id":"trainer-133","calculatorTrainerId":"trainer-133","models":["swsh-marnie-uniform"],"name":"Marnie 3 [Single]","split":"Wyndon","levelCap":"65","location":"Wyndon Stadium","team":[{"pokemon":"Morpeko","level":65,"gender":"Female","item":"Focus Sash","ability":"Hunger Switch","nature":"Jolly","moves":["Fake Out","Aura Wheel","Parting Shot","Seed Bomb"],"stats":"HP: 170        Sp.Atk: 104\nAtk: 148       Sp.Def: 100\nDef: 100       Speed: 166"},{"pokemon":"Mega Absol","level":65,"gender":"Female","item":"Life Orb","ability":"Magic Bounce","nature":"Jolly","moves":["Knock Off","Sucker Punch","Play Rough","Swords Dance"],"stats":"HP: 179        Sp.Atk: 156\nAtk: 220       Sp.Def: 103\nDef: 103       Speed: 191","sprite":"absol-mega"},{"pokemon":"Guzzlord","level":65,"gender":"Genderless","item":"Assault Vest","ability":"Beast Boost","nature":"Adamant","moves":["Knock Off","Dragon Claw","Heavy Slam","Earthquake"],"stats":"HP: 385        Sp.Atk: 135\nAtk: 171       Sp.Def: 94\nDef: 94       Speed: 81"},{"pokemon":"Zarude","level":65,"gender":"Genderless","item":"Leftovers","ability":"Leaf Guard","nature":"Jolly","moves":["Bulk Up","Jungle Healing","Power Whip","Darkest Lariat"],"stats":"HP: 231        Sp.Atk: 104\nAtk: 181       Sp.Def: 148\nDef: 161       Speed: 177"},{"pokemon":"Yveltal","level":65,"gender":"Genderless","item":"Heavy-Duty Boots","ability":"Dark Aura","nature":"Timid","moves":["Nasty Plot","Dark Pulse","Oblivion Wing","Heat Wave"],"stats":"HP: 258        Sp.Atk: 195\nAtk: 175       Sp.Def: 152\nDef: 148       Speed: 168"},{"pokemon":"Urshifu GMAX","level":65,"gender":"Female","item":"Protective Pads","ability":"Unseen Fist","nature":"Jolly","moves":["Wicked Blow","Close Combat","Sucker Punch","U-turn"],"stats":"HP: 225        Sp.Atk: 96\nAtk: 194       Sp.Def: 103\nDef: 155       Speed: 166","sprite":"urshifu"}]},
			{"id":"trainer-134","calculatorTrainerId":"trainer-134","models":["swsh-hop"],"name":"Hop Wyndon Grass Starter [Single]","split":"Wyndon","levelCap":"65","location":"Wyndon Stadium","team":[{"pokemon":"Jirachi","level":65,"gender":"Genderless","item":"Light Clay","ability":"Serene Grace","nature":"Jolly","moves":["Reflect","Light Screen","U-turn","Healing Wish"],"stats":"HP: 225        Sp.Atk: 139\nAtk: 155       Sp.Def: 155\nDef: 155       Speed: 170"},{"pokemon":"Zeraora","level":65,"gender":"Genderless","item":"Life Orb","ability":"Volt Absorb","nature":"Jolly","moves":["Plasma Fists","Close Combat","Knock Off","Volt Switch"],"stats":"HP: 209        Sp.Atk: 141\nAtk: 170       Sp.Def: 129\nDef: 122       Speed: 232"},{"pokemon":"Tornadus Therian","level":65,"gender":"Male","item":"Heavy-Duty Boots","ability":"Regenerator","nature":"Timid","moves":["Hurricane","Heat Wave","Knock Off","U-turn"],"stats":"HP: 197        Sp.Atk: 168\nAtk: 139       Sp.Def: 142\nDef: 129       Speed: 200","sprite":"tornadus-therian"},{"pokemon":"Mamoswine","level":65,"gender":"Male","item":"Choice Band","ability":"Thick Fat","nature":"Adamant","moves":["Icicle Crash","High Horsepower","Ice Shard","Knock Off"],"stats":"HP: 238        Sp.Atk: 104\nAtk: 213       Sp.Def: 103\nDef: 129       Speed: 129"},{"pokemon":"Celesteela","level":65,"gender":"Genderless","item":"Power Herb","ability":"Beast Boost","nature":"Modest","moves":["Autotomize","Meteor Beam","Air Slash","Flamethrower"],"stats":"HP: 221        Sp.Atk: 180\nAtk: 140       Sp.Def: 156\nDef: 159       Speed: 104"},{"pokemon":"Inteleon GMAX","level":65,"gender":"Male","item":"Scope Lens","ability":"Sniper","nature":"Timid","moves":["Focus Energy","Snipe Shot","Ice Beam","Dark Pulse"],"stats":"HP: 186        Sp.Atk: 187\nAtk: 121       Sp.Def: 109\nDef: 109       Speed: 199","sprite":"inteleon-gmax"}]},
			{"id":"trainer-135","calculatorTrainerId":"trainer-135","models":["swsh-hop"],"name":"Hop Wyndon Fire Starter [Single]","split":"Wyndon","levelCap":"65","location":"Wyndon Stadium","team":[{"pokemon":"Tapu Bulu","level":65,"gender":"Genderless","item":"Terrain Extender","ability":"Grassy Surge","nature":"Adamant","moves":["Wood Hammer","Horn Leech","Close Combat","Nature’s Madness"],"stats":"HP: 186        Sp.Atk: 121\nAtk: 213       Sp.Def: 148\nDef: 174       Speed: 122"},{"pokemon":"Kartana","level":65,"gender":"Genderless","item":"Grassy Seed","ability":"Beast Boost","nature":"Jolly","moves":["Leaf Blade","Sacred Sword","Smart Strike","Swords Dance"],"stats":"HP: 171        Sp.Atk: 90\nAtk: 260       Sp.Def: 65\nDef: 195       Speed: 182"},{"pokemon":"Blacephalon","level":65,"gender":"Genderless","item":"Choice Scarf","ability":"Beast Boost","nature":"Timid","moves":["Flamethrower","Shadow Ball","Psyshock","Trick"],"stats":"HP: 164        Sp.Atk: 221\nAtk: 171       Sp.Def: 127\nDef: 94       Speed: 180"},{"pokemon":"Zapdos","level":65,"gender":"Genderless","item":"Heavy-Duty Boots","ability":"Static","nature":"Timid","moves":["Thunderbolt","Hurricane","Heat Wave","Volt Switch"],"stats":"HP: 212        Sp.Atk: 187\nAtk: 127       Sp.Def: 142\nDef: 135       Speed: 170"},{"pokemon":"Latios","level":65,"gender":"Male","item":"Soul Dew","ability":"Levitate","nature":"Timid","moves":["Draco Meteor","Psychic","Aura Sphere","Calm Mind"],"stats":"HP: 199        Sp.Atk: 194\nAtk: 127       Sp.Def: 168\nDef: 129       Speed: 184"},{"pokemon":"Rillaboom GMAX","level":65,"gender":"Male","item":"Assault Vest","ability":"Grassy Surge","nature":"Adamant","moves":["Wood Hammer","Grassy Glide","Knock Off","High Horsepower"],"stats":"HP: 225        Sp.Atk: 92\nAtk: 205       Sp.Def: 116\nDef: 142       Speed: 135","sprite":"rillaboom-gmax"}]},
			{"id":"trainer-136","calculatorTrainerId":"trainer-136","models":["swsh-hop"],"name":"Hop Wyndon Water Starter [Single]","split":"Wyndon","levelCap":"65","location":"Wyndon Stadium","team":[{"pokemon":"Mew","level":65,"gender":"Genderless","item":"Mental Herb","ability":"Synchronize","nature":"Timid","moves":["Stealth Rock","Taunt","Thunder Wave","U-turn"],"stats":"HP: 225        Sp.Atk: 155\nAtk: 139       Sp.Def: 155\nDef: 155       Speed: 170"},{"pokemon":"Thundurus Therian","level":65,"gender":"Male","item":"Choice Specs","ability":"Volt Absorb","nature":"Timid","moves":["Thunderbolt","Volt Switch","Focus Blast","Grass Knot"],"stats":"HP: 197        Sp.Atk: 213\nAtk: 144       Sp.Def: 129\nDef: 116       Speed: 171","sprite":"thundurus-therian"},{"pokemon":"Xurkitree","level":65,"gender":"Genderless","item":"Shuca Berry","ability":"Beast Boost","nature":"Timid","moves":["Thunderbolt","Energy Ball","Dazzling Gleam","Tail Glow"],"stats":"HP: 203        Sp.Atk: 250\nAtk: 126       Sp.Def: 117\nDef: 117       Speed: 146"},{"pokemon":"Spectrier","level":65,"gender":"Genderless","item":"Leftovers","ability":"Grim Neigh","nature":"Timid","moves":["Nasty Plot","Shadow Ball","Will-O-Wisp","Substitute"],"stats":"HP: 225        Sp.Atk: 213\nAtk: 98       Sp.Def: 129\nDef: 103       Speed: 213"},{"pokemon":"Nihilego","level":65,"gender":"Genderless","item":"Power Herb","ability":"Beast Boost","nature":"Timid","moves":["Meteor Beam","Sludge Wave","Thunderbolt","Grass Knot"],"stats":"HP: 236        Sp.Atk: 190\nAtk: 84       Sp.Def: 195\nDef: 86       Speed: 174"},{"pokemon":"Cinderace GMAX","level":65,"gender":"Male","item":"Life Orb","ability":"Libero","nature":"Jolly","moves":["Pyro Ball","High Jump Kick","Sucker Punch","Court Change"],"stats":"HP: 199        Sp.Atk: 98\nAtk: 175       Sp.Def: 122\nDef: 122       Speed: 196","sprite":"cinderace-gmax"}]},
			{"id":"trainer-137","calculatorTrainerId":"trainer-137","models":["swsh-macro-cosmos-male"],"name":"Macro Cosmos's Eric 1 [Single]","split":"OIeana","levelCap":"70","location":"Wyndon","team":[{"pokemon":"Uxie","level":67,"gender":"Genderless","item":"Mental Herb","ability":"Levitate","nature":"Relaxed","moves":["Trick Room","Yawn","Memento","Psychic"],"stats":"HP: 198        Sp.Atk: 126\nAtk: 126       Sp.Def: 199\nDef: 218       Speed: 118"},{"pokemon":"Porygon2","level":67,"gender":"Genderless","item":"Eviolite","ability":"Download","nature":"Quiet","moves":["Tri Attack","Ice Beam","Thunderbolt","Recover"],"stats":"HP: 211        Sp.Atk: 182\nAtk: 132       Sp.Def: 153\nDef: 146       Speed: 76"},{"pokemon":"Escavalier","level":67,"gender":"Male","item":"Occa Berry","ability":"Shell Armor","nature":"Brave","moves":["Megahorn","Iron Head","Drill Run","Knock Off"],"stats":"HP: 191        Sp.Atk: 106\nAtk: 226       Sp.Def: 166\nDef: 166       Speed: 27"},{"pokemon":"Drampa","level":67,"gender":"Female","item":"Throat Spray","ability":"Berserk","nature":"Quiet","moves":["Hyper Voice","Dragon Pulse","Flamethrower","Glare"],"stats":"HP: 202        Sp.Atk: 226\nAtk: 106       Sp.Def: 147\nDef: 139       Speed: 47"},{"pokemon":"Copperajah","level":67,"gender":"Male","item":"Assault Vest","ability":"Heavy Metal","nature":"Brave","moves":["Heavy Slam","Heat Crash","Power Whip","High Horsepower"],"stats":"HP: 261        Sp.Atk: 132\nAtk: 218       Sp.Def: 118\nDef: 118       Speed: 40"},{"pokemon":"Stakataka","level":67,"gender":"Genderless","item":"Weakness Policy","ability":"Beast Boost","nature":"Brave","moves":["Gyro Ball","Stone Edge","Body Press","Earthquake"],"stats":"HP: 179        Sp.Atk: 96\nAtk: 221       Sp.Def: 161\nDef: 308       Speed: 19"}]},
			{"id":"trainer-138","calculatorTrainerId":"trainer-138","models":["swsh-macro-cosmos-male"],"name":"Macro Cosmos's Eric 2 [Single]","split":"OIeana","levelCap":"70","location":"Wyndon","team":[{"pokemon":"Heatran","level":68,"gender":"Random","item":"Leftovers","ability":"Flash Fire","nature":"Calm","moves":["Magma Storm","Taunt","Earth Power","Toxic"],"stats":"HP: 222        Sp.Atk: 202\nAtk: 133       Sp.Def: 187\nDef: 170       Speed: 130"},{"pokemon":"Gothitelle","level":68,"gender":"Female","item":"Colbur Berry","ability":"Shadow Tag","nature":"Bold","moves":["Psychic","Thunder Wave","Charm","Rest"],"stats":"HP: 194        Sp.Atk: 155\nAtk: 90       Sp.Def: 175\nDef: 170       Speed: 114"},{"pokemon":"Durant","level":68,"gender":"Male","item":"Life Orb","ability":"Hustle","nature":"Jolly","moves":["Hone Claws","Iron Head","X-Scissor","Stomping Tantrum"],"stats":"HP: 177        Sp.Atk: 81\nAtk: 174       Sp.Def: 91\nDef: 178       Speed: 191"},{"pokemon":"Centiskorch","level":68,"gender":"Female","item":"Grip Claw","ability":"Flash Fire","nature":"Careful","moves":["Fire Lash","Lunge","Power Whip","Coil"],"stats":"HP: 235        Sp.Atk: 133\nAtk: 182       Sp.Def: 162\nDef: 114       Speed: 114"},{"pokemon":"Slowking","level":68,"gender":"Female","item":"Black Sludge","ability":"Regenerator","nature":"Calm","moves":["Sludge Bomb","Psychic","Scald","Eerie Spell"],"stats":"HP: 228        Sp.Atk: 175\nAtk: 102       Sp.Def: 192\nDef: 134       Speed: 66","sprite":"slowking-galar"},{"pokemon":"Wobbuffet","level":68,"gender":"Female","item":"Custap Berry","ability":"Shadow Tag","nature":"Bold","moves":["Encore","Destiny Bond","Counter","Mirror Coat"],"stats":"HP: 357        Sp.Atk: 70\nAtk: 63       Sp.Def: 104\nDef: 114       Speed: 70"}]},
			{"id":"trainer-139","calculatorTrainerId":"trainer-139","models":["swsh-macro-cosmos-male"],"name":"Macro Cosmos's Eric 3 [Single]","split":"OIeana","levelCap":"70","location":"Wyndon","team":[{"pokemon":"Orbeetle","level":69,"gender":"Female","item":"Light Clay","ability":"Swarm","nature":"Bold","moves":["Reflect","Light Screen","Sticky Web","Psychic"],"stats":"HP: 183        Sp.Atk: 136\nAtk: 79       Sp.Def: 191\nDef: 195       Speed: 150"},{"pokemon":"Klinklang","level":69,"gender":"Genderless","item":"White Herb","ability":"Clear Body","nature":"Adamant","moves":["Shift Gear","Gear Grind","Wild Charge","Substitute"],"stats":"HP: 183        Sp.Atk: 109\nAtk: 180       Sp.Def: 143\nDef: 185       Speed: 150"},{"pokemon":"Magnezone","level":69,"gender":"Genderless","item":"Air Balloon","ability":"Analytic","nature":"Modest","moves":["Thunderbolt","Flash Cannon","Body Press","Volt Switch"],"stats":"HP: 196        Sp.Atk: 225\nAtk: 109       Sp.Def: 150\nDef: 185       Speed: 109"},{"pokemon":"Porygon-Z","level":69,"gender":"Genderless","item":"Choice Specs","ability":"Adaptability","nature":"Timid","moves":["Tri Attack","Shadow Ball","Thunderbolt","Ice Beam"],"stats":"HP: 217        Sp.Atk: 212\nAtk: 122       Sp.Def: 129\nDef: 122       Speed: 165"},{"pokemon":"Ditto","level":69,"gender":"Genderless","item":"Choice Scarf","ability":"Imposter","nature":"Hardy","moves":["Transform"],"stats":"HP: 166        Sp.Atk: 92\nAtk: 92       Sp.Def: 92\nDef: 92       Speed: 92"},{"pokemon":"Genesect","level":69,"gender":"Genderless","item":"Douse Drive","ability":"Download","nature":"Hasty","moves":["Techno Blast","U-turn","Ice Beam","Flamethrower"],"stats":"HP: 198        Sp.Atk: 191\nAtk: 191       Sp.Def: 157\nDef: 141       Speed: 179"}]},
			{"id":"trainer-140","calculatorTrainerId":"trainer-140","models":["swsh-macro-cosmos-male"],"name":"Macro Cosmos's Elijah [Single]","split":"OIeana","levelCap":"70","location":"Rose Tower Bottom Floor","team":[{"pokemon":"Klefki","level":69,"gender":"Female","item":"Light Clay","ability":"Prankster","nature":"Calm","moves":["Reflect","Light Screen","Spikes","Foul Play"],"stats":"HP: 179        Sp.Atk: 136\nAtk: 122       Sp.Def: 160\nDef: 151       Speed: 129"},{"pokemon":"Rotom-Fan","level":69,"gender":"Genderless","item":"Choice Scarf","ability":"Levitate","nature":"Timid","moves":["Volt Switch","Air Slash","Trick","Will-O-Wisp"],"stats":"HP: 169        Sp.Atk: 171\nAtk: 104       Sp.Def: 174\nDef: 174       Speed: 159"},{"pokemon":"Vikavolt","level":69,"gender":"Male","item":"Assault Vest","ability":"Levitate","nature":"Modest","moves":["Thunderbolt","Bug Buzz","Energy Ball","Volt Switch"],"stats":"HP: 206        Sp.Atk: 248\nAtk: 109       Sp.Def: 129\nDef: 150       Speed: 85"},{"pokemon":"Golurk","level":69,"gender":"Genderless","item":"Muscle Band","ability":"Iron Fist","nature":"Adamant","moves":["Earthquake","Poltergeist","Drain Punch","Ice Punch"],"stats":"HP: 223        Sp.Atk: 91\nAtk: 216       Sp.Def: 136\nDef: 136       Speed: 102"},{"pokemon":"Beheeyem","level":69,"gender":"Female","item":"Colbur Berry","ability":"Analytic","nature":"Quiet","moves":["Psychic","Dark Pulse","Thunderbolt","Teleport"],"stats":"HP: 203        Sp.Atk: 217\nAtk: 129       Sp.Def: 157\nDef: 129       Speed: 72"},{"pokemon":"Regigigas","level":69,"gender":"Genderless","item":"Leftovers","ability":"Slow Start","nature":"Adamant","moves":["Skill Swap","Crush Grip","Drain Punch","Knock Off"],"stats":"HP: 252        Sp.Atk: 122\nAtk: 271       Sp.Def: 178\nDef: 178       Speed: 164"}]},
			{"id":"trainer-141","calculatorTrainerId":"trainer-141","models":["swsh-macro-cosmos-female","swsh-macro-cosmos-male"],"name":"Macro Cosmos's Jane & Mateo [Double] [NO TEAM ORDER SWITCH AFTER]","split":"OIeana","levelCap":"70","location":"Rose Tower Elevator","team":[{"pokemon":"Pincurchin","level":66,"gender":"Female","item":"Terrain Extender","ability":"Electric Surge","nature":"Quiet","moves":["Discharge","Rising Voltage","Scald","Memento"],"stats":"HP: 159        Sp.Atk: 159\nAtk: 158       Sp.Def: 137\nDef: 150       Speed: 40"},{"pokemon":"Raichu","level":66,"gender":"Female","item":"Life Orb","ability":"Surge Surfer","nature":"Timid","moves":["Rising Voltage","Psychic","Focus Blast","Nasty Plot"],"stats":"HP: 175        Sp.Atk: 150\nAtk: 123       Sp.Def: 137\nDef: 91       Speed: 187","sprite":"raichu-alola"},{"pokemon":"Togedemaru","level":66,"gender":"Female","item":"Air Balloon","ability":"Lightning Rod","nature":"Jolly","moves":["Fake Out","Zing Zap","Nuzzle","Helping Hand"],"stats":"HP: 182        Sp.Atk: 70\nAtk: 154       Sp.Def: 121\nDef: 108       Speed: 167"},{"pokemon":"Electivire","level":66,"gender":"Male","item":"Expert Belt","ability":"Motor Drive","nature":"Adamant","moves":["Wild Charge","Ice Punch","Cross Chop","Earthquake"],"stats":"HP: 195        Sp.Atk: 135\nAtk: 205       Sp.Def: 137\nDef: 113       Speed: 150"},{"pokemon":"Stunfisk","level":66,"gender":"Random","item":"Electric Seed","ability":"Mimicry","nature":"Calm","moves":["Snap Trap","Terrain Pulse","Earth Power","Electric Terrain"],"stats":"HP: 240        Sp.Atk: 112\nAtk: 118       Sp.Def: 149\nDef: 156       Speed: 67","sprite":"stunfisk-galar"},{"pokemon":"Luxray","level":66,"gender":"Male","item":"Flame Orb","ability":"Guts","nature":"Adamant","moves":["Wild Charge","Facade","Crunch","Ice Fang"],"stats":"HP: 202        Sp.Atk: 135\nAtk: 201       Sp.Def: 129\nDef: 129       Speed: 117"}]},
			{"id":"trainer-142","calculatorTrainerId":"hop-partner-elevator","models":["swsh-hop"],"name":"Hop Partner Elevator Team [Double]","split":"OIeana","levelCap":"70","location":"Rose Tower Elevator","team":[{"pokemon":"Snorlax","level":70,"gender":"Male","item":"Assault Vest","ability":"Thick Fat","nature":"Adamant","moves":["Body Slam","High Horsepower","Crunch","Heavy Slam"],"stats":"HP:325        Sp.Atk:105\nAtk:198       Sp.Def:180\nDef:117       Speed: 68"},{"pokemon":"Corviknight","level":70,"gender":"Male","item":"Sitrus Berry","ability":"Mirror Armor","nature":"Careful","moves":["Brave Bird","Iron Head","Tailwind","Taunt"],"stats":"HP:238        Sp.Atk: 90\nAtk:148       Sp.Def:159\nDef:173       Speed:120"},{"pokemon":"Inteleon","level":70,"gender":"Male","item":"Scope Lens","ability":"Sniper","nature":"Timid","moves":["Snipe Shot","Ice Beam","Dark Pulse","Air Slash"],"stats":"HP:199        Sp.Atk:201\nAtk:130       Sp.Def:117\nDef:117       Speed:213"},{"pokemon":"Rillaboom","level":70,"gender":"Male","item":"Grassy Seed","ability":"Grassy Surge","nature":"Adamant","moves":["Fake Out","Grassy Glide","Wood Hammer","Knock Off"],"stats":"HP:241        Sp.Atk: 99\nAtk:221       Sp.Def:124\nDef:152       Speed:145"},{"pokemon":"Cinderace","level":70,"gender":"Male","item":"Life Orb","ability":"Libero","nature":"Jolly","moves":["Pyro Ball","High Jump Kick","Sucker Punch","U-Turn"],"stats":"HP:213        Sp.Atk:105\nAtk:189       Sp.Def:131\nDef:131       Speed:212"}]},
			{"id":"trainer-143","calculatorTrainerId":"trainer-142","models":["swsh-macro-cosmos-male","swsh-macro-cosmos-female"],"name":"Macro Cosmos's Kevin & Carla [Double] [NO TEAM ORDER SWITCH AFTER]","split":"OIeana","levelCap":"70","location":"Rose Tower Elevator","team":[{"pokemon":"Weezing","level":67,"gender":"Male","item":"Black Sludge","ability":"Neutralizing Gas","nature":"Bold","moves":["Sludge Bomb","Will-O-Wisp","Taunt","Pain Split"],"stats":"HP: 184        Sp.Atk: 139\nAtk: 131       Sp.Def: 119\nDef: 204       Speed: 106"},{"pokemon":"Durant","level":67,"gender":"Male","item":"Life Orb","ability":"Truant","nature":"Jolly","moves":["Entrainment","Iron Head","X-Scissor","Thunder Fang"],"stats":"HP: 175        Sp.Atk: 81\nAtk: 171       Sp.Def: 90\nDef: 175       Speed: 188"},{"pokemon":"Steelix","level":67,"gender":"Male","item":"Weakness Policy","ability":"Sturdy","nature":"Brave","moves":["Earthquake","Heavy Slam","Body Press","Curse"],"stats":"HP: 198        Sp.Atk: 99\nAtk: 152       Sp.Def: 112\nDef: 293       Speed: 40"},{"pokemon":"Archeops","level":67,"gender":"Female","item":"Expert Belt","ability":"Defeatist","nature":"Jolly","moves":["Stone Edge","Dual Wingbeat","Crunch","U-turn"],"stats":"HP: 198        Sp.Atk: 157\nAtk: 213       Sp.Def: 112\nDef: 112       Speed: 190"},{"pokemon":"Golisopod","level":67,"gender":"Female","item":"Sitrus Berry","ability":"Emergency Exit","nature":"Adamant","moves":["First Impression","Liquidation","Leech Life","Sucker Punch"],"stats":"HP: 198        Sp.Atk: 95\nAtk: 212       Sp.Def: 146\nDef: 213       Speed: 79"},{"pokemon":"Oranguru","level":67,"gender":"Male","item":"Mental Herb","ability":"Telepathy","nature":"Sassy","moves":["Trick Room","Instruct","Helping Hand","Foul Play"],"stats":"HP: 218        Sp.Atk: 146\nAtk: 106       Sp.Def: 190\nDef: 132       Speed: 76"}]},
			{"id":"trainer-144","calculatorTrainerId":"hop-partner-elevator","models":["swsh-hop"],"name":"Hop Partner Elevator Team [Double]","split":"OIeana","levelCap":"70","location":"Rose Tower Elevator","team":[{"pokemon":"Snorlax","level":70,"gender":"Male","item":"Assault Vest","ability":"Thick Fat","nature":"Adamant","moves":["Body Slam","High Horsepower","Crunch","Heavy Slam"],"stats":"HP:325        Sp.Atk:105\nAtk:198       Sp.Def:180\nDef:117       Speed: 68"},{"pokemon":"Corviknight","level":70,"gender":"Male","item":"Sitrus Berry","ability":"Mirror Armor","nature":"Careful","moves":["Brave Bird","Iron Head","Tailwind","Taunt"],"stats":"HP:238        Sp.Atk: 90\nAtk:148       Sp.Def:159\nDef:173       Speed:120"},{"pokemon":"Inteleon","level":70,"gender":"Male","item":"Scope Lens","ability":"Sniper","nature":"Timid","moves":["Snipe Shot","Ice Beam","Dark Pulse","Air Slash"],"stats":"HP:199        Sp.Atk:201\nAtk:130       Sp.Def:117\nDef:117       Speed:213"},{"pokemon":"Rillaboom","level":70,"gender":"Male","item":"Grassy Seed","ability":"Grassy Surge","nature":"Adamant","moves":["Fake Out","Grassy Glide","Wood Hammer","Knock Off"],"stats":"HP:241        Sp.Atk: 99\nAtk:221       Sp.Def:124\nDef:152       Speed:145"},{"pokemon":"Cinderace","level":70,"gender":"Male","item":"Life Orb","ability":"Libero","nature":"Jolly","moves":["Pyro Ball","High Jump Kick","Sucker Punch","U-Turn"],"stats":"HP:213        Sp.Atk:105\nAtk:189       Sp.Def:131\nDef:131       Speed:212"}]},
			{"id":"trainer-145","calculatorTrainerId":"trainer-143","models":["swsh-macro-cosmos-female","swsh-macro-cosmos-male"],"name":"Macro Cosmos's Adalyn & Justin [Double]","split":"OIeana","levelCap":"70","location":"Rose Tower Elevator","team":[{"pokemon":"Alcremie","level":68,"gender":"Female","item":"Babiri Berry","ability":"Aroma Veil","nature":"Bold","moves":["Decorate","Dazzling Gleam","Mystical Fire","Recover"],"stats":"HP: 187        Sp.Atk: 175\nAtk: 96       Sp.Def: 190\nDef: 140       Speed: 113"},{"pokemon":"Ribombee","level":68,"gender":"Female","item":"Focus Sash","ability":"Shield Dust","nature":"Timid","moves":["Speed Swap","Pollen Puff","Struggle Bug","Dazzling Gleam"],"stats":"HP: 180        Sp.Atk: 155\nAtk: 90       Sp.Def: 121\nDef: 107       Speed: 213"},{"pokemon":"Froslass","level":68,"gender":"Female","item":"Bright Powder","ability":"Cursed Body","nature":"Timid","moves":["Frost Breath","Icy Wind","Shadow Ball","Destiny Bond"],"stats":"HP: 194        Sp.Atk: 162\nAtk: 145       Sp.Def: 121\nDef: 121       Speed: 192"},{"pokemon":"Swoobat","level":68,"gender":"Male","item":"Colbur Berry","ability":"Simple","nature":"Timid","moves":["Stored Power","Air Slash","Heat Wave","Roost"],"stats":"HP: 190        Sp.Atk: 130\nAtk: 92       Sp.Def: 100\nDef: 100       Speed: 199"},{"pokemon":"Mudsdale","level":68,"gender":"Male","item":"Assault Vest","ability":"Stamina","nature":"Adamant","moves":["High Horsepower","Body Press","Heavy Slam","Rock Slide"],"stats":"HP: 235        Sp.Atk: 90\nAtk: 215       Sp.Def: 141\nDef: 162       Speed: 52"},{"pokemon":"Krookodile","level":68,"gender":"Male","item":"Roseli Berry","ability":"Anger Point","nature":"Jolly","moves":["Crunch","Earthquake","Rock Slide","Sucker Punch"],"stats":"HP: 228        Sp.Atk: 102\nAtk: 185       Sp.Def: 121\nDef: 134       Speed: 166"}]},
			{"id":"trainer-146","calculatorTrainerId":"hop-partner-elevator","models":["swsh-hop"],"name":"Hop Partner Elevator Team [Double]","split":"OIeana","levelCap":"70","location":"Rose Tower Elevator","team":[{"pokemon":"Snorlax","level":70,"gender":"Male","item":"Assault Vest","ability":"Thick Fat","nature":"Adamant","moves":["Body Slam","High Horsepower","Crunch","Heavy Slam"],"stats":"HP:325        Sp.Atk:105\nAtk:198       Sp.Def:180\nDef:117       Speed: 68"},{"pokemon":"Corviknight","level":70,"gender":"Male","item":"Sitrus Berry","ability":"Mirror Armor","nature":"Careful","moves":["Brave Bird","Iron Head","Tailwind","Taunt"],"stats":"HP:238        Sp.Atk: 90\nAtk:148       Sp.Def:159\nDef:173       Speed:120"},{"pokemon":"Inteleon","level":70,"gender":"Male","item":"Scope Lens","ability":"Sniper","nature":"Timid","moves":["Snipe Shot","Ice Beam","Dark Pulse","Air Slash"],"stats":"HP:199        Sp.Atk:201\nAtk:130       Sp.Def:117\nDef:117       Speed:213"},{"pokemon":"Rillaboom","level":70,"gender":"Male","item":"Grassy Seed","ability":"Grassy Surge","nature":"Adamant","moves":["Fake Out","Grassy Glide","Wood Hammer","Knock Off"],"stats":"HP:241        Sp.Atk: 99\nAtk:221       Sp.Def:124\nDef:152       Speed:145"},{"pokemon":"Cinderace","level":70,"gender":"Male","item":"Life Orb","ability":"Libero","nature":"Jolly","moves":["Pyro Ball","High Jump Kick","Sucker Punch","U-Turn"],"stats":"HP:213        Sp.Atk:105\nAtk:189       Sp.Def:131\nDef:131       Speed:212"}]},
			{"id":"trainer-147","calculatorTrainerId":"trainer-144","models":["swsh-oleana"],"name":"Oleana [Double]","split":"OIeana","levelCap":"70","location":"Rose Tower Top Floor","team":[{"pokemon":"Calyrex","level":70,"gender":"Genderless","item":"Mental Herb","ability":"As One (Glastrier)","nature":"Brave","moves":["Trick Room","Glacial Lance","High Horsepower","Zen Headbutt"],"stats":"HP: 241        Sp.Atk: 145\nAtk: 282       Sp.Def: 208\nDef: 236       Speed: 67","sprite":"calyrex-ice"},{"pokemon":"Landorus Therian","level":70,"gender":"Male","item":"Assault Vest","ability":"Intimidate","nature":"Adamant","moves":["High Horsepower","Rock Slide","U-turn","Knock Off"],"stats":"HP: 226        Sp.Atk: 155\nAtk: 251       Sp.Def: 138\nDef: 152       Speed: 154","sprite":"landorus-therian"},{"pokemon":"Milotic","level":70,"gender":"Female","item":"Leftovers","ability":"Competitive","nature":"Bold","moves":["Scald","Icy Wind","Recover","Helping Hand"],"stats":"HP: 234        Sp.Atk: 166\nAtk: 99       Sp.Def: 201\nDef: 150       Speed: 118"},{"pokemon":"Pheromosa","level":70,"gender":"Genderless","item":"Focus Sash","ability":"Beast Boost","nature":"Jolly","moves":["Close Combat","Triple Axel","U-turn","Feint"],"stats":"HP: 201        Sp.Atk: 196\nAtk: 218       Sp.Def: 78\nDef: 78       Speed: 261"},{"pokemon":"Mega Scizor","level":70,"gender":"Female","item":"Occa Berry","ability":"Technician","nature":"Adamant","moves":["Bullet Punch","Bug Bite","Swords Dance","Roost"],"stats":"HP: 199        Sp.Atk: 105\nAtk: 259       Sp.Def: 166\nDef: 222       Speed: 110","sprite":"scizor-mega"},{"pokemon":"Butterfree GMAX","level":70,"gender":"Female","item":"Charti Berry","ability":"Tinted Lens","nature":"Modest","moves":["Bug Buzz","Hurricane","Pollen Puff","Sleep Powder"],"stats":"HP: 185        Sp.Atk: 167\nAtk: 80       Sp.Def: 138\nDef: 96       Speed: 103","sprite":"butterfree-gmax"}]},
			{"id":"trainer-148","calculatorTrainerId":"trainer-145","models":["swsh-bede-gym"],"name":"Bede 4 [Single]","split":"Elite 4","levelCap":"75","location":"Wyndon Stadium","team":[{"pokemon":"Whimsicott","level":75,"gender":"Female","item":"Focus Sash","ability":"Prankster","nature":"Timid","moves":["Tailwind","Encore","Memento","Moonblast"],"stats":"HP: 198        Sp.Atk: 143\nAtk: 115       Sp.Def: 140\nDef: 155       Speed: 222"},{"pokemon":"Sylveon","level":75,"gender":"Female","item":"Leftovers","ability":"Pixilate","nature":"Modest","moves":["Hyper Beam","Mystical Fire","Snarl","Substitute"],"stats":"HP: 250        Sp.Atk: 212\nAtk: 112       Sp.Def: 223\nDef: 125       Speed: 118"},{"pokemon":"Primarina","level":75,"gender":"Female","item":"Choice Specs","ability":"Liquid Voice","nature":"Modest","moves":["Hyper Voice","Moonblast","Psychic","Ice Beam"],"stats":"HP: 228        Sp.Atk: 238\nAtk: 125       Sp.Def: 202\nDef: 139       Speed: 118"},{"pokemon":"Zacian","level":75,"gender":"Genderless","item":"Babiri Berry","ability":"Intrepid Sword","nature":"Jolly","moves":["Play Rough","Close Combat","Wild Charge","Psychic Fangs"],"stats":"HP: 246        Sp.Atk: 133\nAtk: 223       Sp.Def: 200\nDef: 200       Speed: 258"},{"pokemon":"Xerneas","level":75,"gender":"Genderless","item":"Power Herb","ability":"Fairy Aura","nature":"Modest","moves":["Geomancy","Moonblast","Thunderbolt","Psyshock"],"stats":"HP: 297        Sp.Atk: 246\nAtk: 201       Sp.Def: 175\nDef: 170       Speed: 176"},{"pokemon":"Hatterene GMAX","level":75,"gender":"Female","item":"Life Orb","ability":"Magic Bounce","nature":"Quiet","moves":["Dazzling Gleam","Psychic","Mystical Fire","Trick Room"],"stats":"HP: 193        Sp.Atk: 255\nAtk: 163       Sp.Def: 182\nDef: 170       Speed: 43","sprite":"hatterene-gmax"}]},
			{"id":"trainer-149","calculatorTrainerId":"trainer-146","models":["swsh-nessa"],"name":"Nessa 2 [Single]","split":"Elite 4","levelCap":"75","location":"Wyndon Stadium","team":[{"pokemon":"Primal Kyogre","level":75,"gender":"Genderless","item":"Choice Specs","ability":"Primordial Sea","nature":"Modest","moves":["Water Spout","Origin Pulse","Thunder","Ice Beam"],"stats":"HP: 258        Sp.Atk: 327\nAtk: 227       Sp.Def: 268\nDef: 163       Speed: 163","sprite":"kyogre-primal"},{"pokemon":"Slowbro","level":75,"gender":"Male","item":"Damp Rock","ability":"Regenerator","nature":"Bold","moves":["Rain Dance","Scald","Future Sight","Slack Off"],"stats":"HP: 250        Sp.Atk: 178\nAtk: 126       Sp.Def: 148\nDef: 212       Speed: 73"},{"pokemon":"Golisopod","level":75,"gender":"Female","item":"Sitrus Berry","ability":"Emergency Exit","nature":"Adamant","moves":["First Impression","Liquidation","Leech Life","Aqua Jet"],"stats":"HP: 220        Sp.Atk: 106\nAtk: 236       Sp.Def: 163\nDef: 238       Speed: 88"},{"pokemon":"Mega Swampert","level":75,"gender":"Male","item":"Life Orb","ability":"Swift Swim","nature":"Adamant","moves":["Liquidation","Earthquake","Ice Punch","Power-Up Punch"],"stats":"HP: 258        Sp.Atk: 153\nAtk: 278       Sp.Def: 193\nDef: 193       Speed: 133","sprite":"swampert-mega"},{"pokemon":"Palkia-Origin","level":75,"gender":"Genderless","item":"Lustrous Orb","ability":"Pressure","nature":"Timid","moves":["Spacial Rend","Hydro Pump","Thunder","Aura Sphere"],"stats":"HP: 243        Sp.Atk: 253\nAtk: 160       Sp.Def: 208\nDef: 178       Speed: 228"},{"pokemon":"Blastoise GMAX","level":75,"gender":"Female","item":"Weakness Policy","ability":"Rain Dish","nature":"Modest","moves":["Hydro Cannon","Ice Beam","Aura Sphere","Dark Pulse"],"stats":"HP: 226        Sp.Atk: 170\nAtk: 136       Sp.Def: 185\nDef: 178       Speed: 145","sprite":"blastoise-gmax"}]},
			{"id":"trainer-150","calculatorTrainerId":"trainer-147","models":["swsh-bea"],"name":"Bea 2 [Double]","split":"Elite 4","levelCap":"75","location":"Wyndon Stadium","team":[{"pokemon":"Kommo-o","level":75,"gender":"Male","item":"Throat Spray","ability":"Bulletproof","nature":"Timid","moves":["Clangorous Soul","Clanging Scales","Aura Sphere","Flamethrower"],"stats":"HP: 220        Sp.Atk: 178\nAtk: 173       Sp.Def: 185\nDef: 215       Speed: 170"},{"pokemon":"Zapdos","level":75,"gender":"Genderless","item":"Choice Band","ability":"Defiant","nature":"Jolly","moves":["Thunderous Kick","Brave Bird","U-turn","Throat Chop"],"stats":"HP: 243        Sp.Atk: 139\nAtk: 215       Sp.Def: 163\nDef: 163       Speed: 195","sprite":"zapdos-galar"},{"pokemon":"Cobalion","level":75,"gender":"Genderless","item":"Shuca Berry","ability":"Justified","nature":"Jolly","moves":["Sacred Sword","Iron Head","Thunder Wave","Volt Switch"],"stats":"HP: 244        Sp.Atk: 146\nAtk: 163       Sp.Def: 136\nDef: 221       Speed: 209"},{"pokemon":"Mega Blaziken","level":75,"gender":"Male","item":"Life Orb","ability":"Speed Boost","nature":"Jolly","moves":["Protect","Flare Blitz","Close Combat","Thunder Punch"],"stats":"HP: 228        Sp.Atk: 200\nAtk: 268       Sp.Def: 148\nDef: 148       Speed: 195","sprite":"blaziken-mega"},{"pokemon":"Zamazenta","level":75,"gender":"Genderless","item":"Assault Vest","ability":"Dauntless Shield","nature":"Jolly","moves":["Close Combat","Crunch","Wild Charge","Psychic Fangs"],"stats":"HP: 246        Sp.Atk: 133\nAtk: 223       Sp.Def: 200\nDef: 200       Speed: 258"},{"pokemon":"Urshifu GMAX","level":75,"gender":"Male","item":"Protective Pads","ability":"Unseen Fist","nature":"Jolly","moves":["Surging Strikes","Close Combat","Aqua Jet","U-turn"],"stats":"HP: 258        Sp.Atk: 109\nAtk: 223       Sp.Def: 118\nDef: 178       Speed: 190","sprite":"urshifu-rapidstrike"}]},
			{"id":"trainer-151","calculatorTrainerId":"trainer-148","models":["swsh-raihan"],"name":"Raihan 2 [Double]","split":"Elite 4","levelCap":"75","location":"Wyndon Stadium","team":[{"pokemon":"Turtonator","level":75,"gender":"Female","item":"Leftovers","ability":"Shell Armor","nature":"Bold","moves":["Stealth Rock","Shell Trap","Dragon Tail","Flamethrower"],"stats":"HP: 198        Sp.Atk: 164\nAtk: 130       Sp.Def: 155\nDef: 253       Speed: 82"},{"pokemon":"Dracovish","level":75,"gender":"Genderless","item":"Choice Scarf","ability":"Strong Jaw","nature":"Adamant","moves":["Fishious Rend"],"stats":"HP: 243        Sp.Atk: 119\nAtk: 179       Sp.Def: 148\nDef: 178       Speed: 140"},{"pokemon":"Naganadel","level":75,"gender":"Genderless","item":"Life Orb","ability":"Beast Boost","nature":"Timid","moves":["Nasty Plot","Sludge Wave","Draco Meteor","Flamethrower"],"stats":"HP: 217        Sp.Atk: 218\nAtk: 123       Sp.Def: 137\nDef: 137       Speed: 229"},{"pokemon":"Giratina Origin","level":75,"gender":"Genderless","item":"Griseous Orb","ability":"Levitate","nature":"Adamant","moves":["Shadow Force","Dragon Claw","Earthquake","Will-O-Wisp"],"stats":"HP: 333        Sp.Atk: 187\nAtk: 228       Sp.Def: 178\nDef: 178       Speed: 163","sprite":"giratina-origin"},{"pokemon":"Mega Rayquaza","level":75,"gender":"Genderless","item":"Lum Berry","ability":"Delta Stream","nature":"Jolly","moves":["Dragon Dance","Dragon Ascent","Earthquake","Extreme Speed"],"stats":"HP: 265        Sp.Atk: 268\nAtk: 298       Sp.Def: 178\nDef: 178       Speed: 220","sprite":"rayquaza-mega"},{"pokemon":"Zygarde GMAX","level":75,"gender":"Genderless","item":"Weakness Policy","ability":"Aura Break","nature":"Adamant","moves":["Thousand Arrows","Outrage","Iron Tail","Extreme Speed"],"stats":"HP: 432        Sp.Atk: 147\nAtk: 195       Sp.Def: 170\nDef: 209       Speed: 155","sprite":"zygarde-complete"}]},
			{"id":"trainer-152","calculatorTrainerId":"trainer-149","models":["swsh-rose"],"name":"Rose [Single]","split":"Rose","levelCap":"80","location":"Energy Plant","team":[{"pokemon":"Copperajah","level":80,"gender":"Male","item":"Custap Berry","ability":"Heavy Metal","nature":"Adamant","moves":["Stealth Rock","Heavy Slam","Heat Crash","Power Whip"],"stats":"HP: 310        Sp.Atk: 141\nAtk: 260       Sp.Def: 140\nDef: 140       Speed: 53"},{"pokemon":"Magearna","level":80,"gender":"Genderless","item":"White Herb","ability":"Soul-Heart","nature":"Modest","moves":["Fleur Cannon","Flash Cannon","Aura Sphere","Volt Switch"],"stats":"HP: 242        Sp.Atk: 260\nAtk: 162       Sp.Def: 213\nDef: 213       Speed: 109"},{"pokemon":"Mega Metagross","level":80,"gender":"Genderless","item":"Choice Band","ability":"Tough Claws","nature":"Jolly","moves":["Meteor Mash","Zen Headbutt","Earthquake","Bullet Punch"],"stats":"HP: 242        Sp.Atk: 177\nAtk: 261       Sp.Def: 205\nDef: 269       Speed: 199","sprite":"metagross-mega"},{"pokemon":"Dialga-Origin","level":80,"gender":"Genderless","item":"Room Service","ability":"Pressure","nature":"Quiet","moves":["Trick Room","Roar of Time","Flash Cannon","Earth Power"],"stats":"HP: 274        Sp.Atk: 295\nAtk: 189       Sp.Def: 221\nDef: 221       Speed: 134"},{"pokemon":"Dusk Mane Necrozma","level":80,"gender":"Genderless","item":"Weakness Policy","ability":"Prism Armor","nature":"Adamant","moves":["Sunsteel Strike","Photon Geyser","Earthquake","Morning Sun"],"stats":"HP: 270        Sp.Atk: 189\nAtk: 309       Sp.Def: 204\nDef: 233       Speed: 128","sprite":"necrozma-duskmane"},{"pokemon":"Melmetal GMAX","level":80,"gender":"Genderless","item":"Assault Vest","ability":"Iron Fist","nature":"Adamant","moves":["Double Iron Bash","Earthquake","Thunder Punch","Superpower"],"stats":"HP: 330        Sp.Atk: 141\nAtk: 283       Sp.Def: 133\nDef: 258       Speed: 59","sprite":"melmetal-gmax"}]},
			{"id":"trainer-153","calculatorTrainerId":"trainer-150","models":["swsh-leon"],"name":"Leon Grass Starter [Single]","split":"Leon","levelCap":"85","location":"Wyndon Stadium","team":[{"pokemon":"Primal Groudon","level":85,"gender":"Genderless","item":"Shuca Berry","ability":"Desolate Land","nature":"Adamant","moves":["Precipice Blades","Heat Crash","Stone Edge","Stealth Rock"],"stats":"HP: 291        Sp.Atk: 257\nAtk: 370       Sp.Def: 184\nDef: 303       Speed: 184","sprite":"groudon-primal"},{"pokemon":"Victini","level":85,"gender":"Genderless","item":"Choice Scarf","ability":"Victory Star","nature":"Jolly","moves":["V-create","Bolt Strike","Zen Headbutt","U-turn"],"stats":"HP: 291        Sp.Atk: 180\nAtk: 201       Sp.Def: 201\nDef: 201       Speed: 221"},{"pokemon":"Mega Kangaskhan","level":85,"gender":"Female","item":"Protective Pads","ability":"Parental Bond","nature":"Jolly","moves":["Fake Out","Double-Edge","Drain Punch","Sucker Punch"],"stats":"HP: 299        Sp.Atk: 119\nAtk: 243       Sp.Def: 201\nDef: 201       Speed: 221","sprite":"kangaskhan-mega"},{"pokemon":"Volcanion","level":85,"gender":"Genderless","item":"Assault Vest","ability":"Water Absorb","nature":"Modest","moves":["Steam Eruption","Flamethrower","Earth Power","Solar Beam"],"stats":"HP: 257        Sp.Atk: 277\nAtk: 196       Sp.Def: 184\nDef: 235       Speed: 150"},{"pokemon":"Cinderace","level":85,"gender":"Male","item":"Life Orb","ability":"Libero","nature":"Jolly","moves":["Pyro Ball","High Jump Kick","Gunk Shot","U-turn"],"stats":"HP: 257        Sp.Atk: 126\nAtk: 228       Sp.Def: 158\nDef: 158       Speed: 256"},{"pokemon":"Charizard GMAX","level":85,"gender":"Male","item":"Heavy-Duty Boots","ability":"Drought","nature":"Timid","moves":["Blast Burn","Solar Beam","Air Slash","Focus Blast"],"stats":"HP: 253        Sp.Atk: 216\nAtk: 156       Sp.Def: 175\nDef: 163       Speed: 221"}]},
			{"id":"trainer-154","calculatorTrainerId":"trainer-151","models":["swsh-leon"],"name":"Leon Fire Starter [Single]","split":"Leon","levelCap":"85","location":"Wyndon Stadium","team":[{"pokemon":"Primal Groudon","level":85,"gender":"Genderless","item":"Shuca Berry","ability":"Desolate Land","nature":"Adamant","moves":["Precipice Blades","Heat Crash","Stone Edge","Stealth Rock"],"stats":"HP: 291        Sp.Atk: 257\nAtk: 370       Sp.Def: 184\nDef: 303       Speed: 184","sprite":"groudon-primal"},{"pokemon":"Victini","level":85,"gender":"Genderless","item":"Choice Scarf","ability":"Victory Star","nature":"Jolly","moves":["V-create","Bolt Strike","Zen Headbutt","U-turn"],"stats":"HP: 291        Sp.Atk: 180\nAtk: 201       Sp.Def: 201\nDef: 201       Speed: 221"},{"pokemon":"Mega Kangaskhan","level":85,"gender":"Female","item":"Protective Pads","ability":"Parental Bond","nature":"Jolly","moves":["Fake Out","Double-Edge","Drain Punch","Sucker Punch"],"stats":"HP: 299        Sp.Atk: 119\nAtk: 243       Sp.Def: 201\nDef: 201       Speed: 221","sprite":"kangaskhan-mega"},{"pokemon":"Volcanion","level":85,"gender":"Genderless","item":"Assault Vest","ability":"Water Absorb","nature":"Modest","moves":["Steam Eruption","Flamethrower","Earth Power","Solar Beam"],"stats":"HP: 257        Sp.Atk: 277\nAtk: 196       Sp.Def: 184\nDef: 235       Speed: 150"},{"pokemon":"Inteleon","level":85,"gender":"Male","item":"Scope Lens","ability":"Sniper","nature":"Timid","moves":["Snipe Shot","Ice Beam","Dark Pulse","U-turn"],"stats":"HP: 240        Sp.Atk: 243\nAtk: 157       Sp.Def: 141\nDef: 141       Speed: 258"},{"pokemon":"Charizard GMAX","level":85,"gender":"Male","item":"Heavy-Duty Boots","ability":"Drought","nature":"Timid","moves":["Blast Burn","Solar Beam","Air Slash","Focus Blast"],"stats":"HP: 253        Sp.Atk: 216\nAtk: 156       Sp.Def: 175\nDef: 163       Speed: 221"}]},
			{"id":"trainer-155","calculatorTrainerId":"trainer-152","models":["swsh-leon"],"name":"Leon Water Starter [Single]","split":"Leon","levelCap":"85","location":"Wyndon Stadium","team":[{"pokemon":"Primal Groudon","level":85,"gender":"Genderless","item":"Shuca Berry","ability":"Desolate Land","nature":"Adamant","moves":["Precipice Blades","Heat Crash","Stone Edge","Stealth Rock"],"stats":"HP: 291        Sp.Atk: 257\nAtk: 370       Sp.Def: 184\nDef: 303       Speed: 184","sprite":"groudon-primal"},{"pokemon":"Victini","level":85,"gender":"Genderless","item":"Choice Scarf","ability":"Victory Star","nature":"Jolly","moves":["V-create","Bolt Strike","Zen Headbutt","U-turn"],"stats":"HP: 291        Sp.Atk: 180\nAtk: 201       Sp.Def: 201\nDef: 201       Speed: 221"},{"pokemon":"Mega Kangaskhan","level":85,"gender":"Female","item":"Protective Pads","ability":"Parental Bond","nature":"Jolly","moves":["Fake Out","Double-Edge","Drain Punch","Sucker Punch"],"stats":"HP: 299        Sp.Atk: 119\nAtk: 243       Sp.Def: 201\nDef: 201       Speed: 221","sprite":"kangaskhan-mega"},{"pokemon":"Volcanion","level":85,"gender":"Genderless","item":"Assault Vest","ability":"Water Absorb","nature":"Modest","moves":["Steam Eruption","Flamethrower","Earth Power","Solar Beam"],"stats":"HP: 257        Sp.Atk: 277\nAtk: 196       Sp.Def: 184\nDef: 235       Speed: 150"},{"pokemon":"Rillaboom","level":85,"gender":"Male","item":"Choice Band","ability":"Grassy Surge","nature":"Adamant","moves":["Grassy Glide","Wood Hammer","High Horsepower","U-turn"],"stats":"HP: 291        Sp.Atk: 119\nAtk: 267       Sp.Def: 150\nDef: 184       Speed: 175"},{"pokemon":"Charizard GMAX","level":85,"gender":"Male","item":"Heavy-Duty Boots","ability":"Drought","nature":"Timid","moves":["Blast Burn","Solar Beam","Air Slash","Focus Blast"],"stats":"HP: 253        Sp.Atk: 216\nAtk: 156       Sp.Def: 175\nDef: 163       Speed: 221"}]}
		],
		"routeItems": [
			{"location":"Rolling Fields","items":"TM84 (Tail Slap)","directions":"Western cliff alcove: check the hollow log.","acquisition":"Visible pickup","match":"Strong","map":"z_wr0102","records":"a_wr0101.bin|1|fieldItem|0|-","candidatePoints":1,"id":"G0001","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Rolling Fields","items":"Honey ×2; Poké Ball","directions":"Entrance northwest: search the flowers and shrubs.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0102","records":null,"candidatePoints":7,"id":"G0002","reason":"7 physical points share these items. Same map and at least one listed item. Pool or edition differences require review.","edition":"Both","source":"Bulbapedia"},
			{"location":"Rolling Fields","items":"Honey; Energy Root","directions":"Entrance west: second tree against cliffs.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0102","records":null,"candidatePoints":2,"id":"G0003","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Rolling Fields","items":"Tiny Mushroom ×2","directions":"Lakeside tree northwest of ingredient seller.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0102","records":null,"candidatePoints":6,"id":"G0004","reason":"6 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Rolling Fields","items":"Tiny Mushroom","directions":"Border den: search the tree immediately south.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0102","records":null,"candidatePoints":6,"id":"G0005","reason":"6 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Rolling Fields","items":"Tiny Mushroom; Big Mushroom","directions":"Border den: search the second tree southward.","acquisition":"Hidden pickup","match":"Strong","map":"z_wr0102","records":"a_wr0101.bin|1|hiddenItem|3|0\na_wr0101.bin|1|hiddenItem|3|1\na_wr0101.bin|1|hiddenItem|3|2","candidatePoints":1,"id":"G0006","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Rolling Fields","items":"Tiny Mushroom","directions":"Western tree pair, southeast of curved grass.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0102","records":null,"candidatePoints":6,"id":"G0007","reason":"6 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Rolling Fields","items":"Poké Ball","directions":"Central grass ring den: tree to northwest.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0102","records":null,"candidatePoints":3,"id":"G0008","reason":"3 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Rolling Fields","items":"Tiny Mushroom","directions":"Central grass ring den: tree to south.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0102","records":null,"candidatePoints":6,"id":"G0009","reason":"6 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Rolling Fields","items":"Honey; Energy Root","directions":"Southeast promontory: check shrubs overlooking Miloch.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0102","records":null,"candidatePoints":2,"id":"G0010","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Rolling Fields","items":"Poké Ball","directions":"Eastern cliff weeds, east of lakeside den.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0102","records":null,"candidatePoints":3,"id":"G0011","reason":"3 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Rolling Fields","items":"Tiny Mushroom","directions":"East Axewell boundary: beyond last grass patch.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0102","records":null,"candidatePoints":6,"id":"G0012","reason":"6 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Rolling Fields","items":"Cheri Berry; Pecha Berry; Oran Berry","directions":"Shake the tree with this item pool.","acquisition":"Berry tree","match":"Strong","map":"z_wr0102","records":"a_wr0101.bin|1|BerryTree|1|-","candidatePoints":1,"id":"G0013","reason":"Same map, pickup type and complete listed item set. Tree item and rate fields are read only in the current editor.","edition":"Both","source":"Bulbapedia"},
			{"location":"Rolling Fields","items":"Cheri Berry; Oran Berry; Persim Berry; Kelpsy Berry","directions":"Shake the tree with this item pool.","acquisition":"Berry tree","match":"Strong","map":"z_wr0102","records":"a_wr0101.bin|1|BerryTree|0|-","candidatePoints":1,"id":"G0014","reason":"Same map, pickup type and complete listed item set. Tree item and rate fields are read only in the current editor.","edition":"Both","source":"Bulbapedia"},
			{"location":"Dappled Grove","items":"Tiny Mushroom; Big Mushroom","directions":"Rolling Fields boundary: northernmost tree.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0103","records":null,"candidatePoints":7,"id":"G0015","reason":"7 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Dappled Grove","items":"Tiny Mushroom; Big Mushroom","directions":"Boundary grass: southern tree of western pair.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0103","records":null,"candidatePoints":7,"id":"G0016","reason":"7 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Dappled Grove","items":"Fancy Apple ×2","directions":"Boundary grass: northern tree of western pair.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0103","records":null,"candidatePoints":14,"id":"G0017","reason":"14 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Dappled Grove","items":"Tiny Mushroom; Big Mushroom","directions":"Further western tree pair: inspect northern tree.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0103","records":null,"candidatePoints":7,"id":"G0018","reason":"7 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Dappled Grove","items":"Fancy Apple; Tiny Mushroom; Big Mushroom","directions":"Purple flowered tree west of boundary grass.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0103","records":null,"candidatePoints":23,"id":"G0019","reason":"23 physical points share these items. Same map and at least one listed item. Pool or edition differences require review.","edition":"Both","source":"Bulbapedia"},
			{"location":"Dappled Grove","items":"Fancy Apple","directions":"Southward past twin trees and grassy field.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0103","records":null,"candidatePoints":14,"id":"G0020","reason":"14 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Dappled Grove","items":"Fancy Apple ×3","directions":"Tree immediately south of paired berry trees.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0103","records":null,"candidatePoints":14,"id":"G0021","reason":"14 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Dappled Grove","items":"Tiny Mushroom; Big Mushroom; Balm Mushroom","directions":"Twin trees: inspect log's southern opening.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0103","records":null,"candidatePoints":2,"id":"G0022","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Dappled Grove","items":"Tiny Mushroom; Big Mushroom; Balm Mushroom","directions":"Tree beside den east of twin trees.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0103","records":null,"candidatePoints":2,"id":"G0023","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Dappled Grove","items":"Fancy Apple ×3","directions":"Tree northeast of den beyond twin trees.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0103","records":null,"candidatePoints":14,"id":"G0024","reason":"14 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Dappled Grove","items":"Tiny Mushroom; Big Mushroom","directions":"Northern grass: second tree's southeast side.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0103","records":null,"candidatePoints":7,"id":"G0025","reason":"7 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Dappled Grove","items":"Tiny Mushroom; Big Mushroom","directions":"Northern grass: second tree's southwest side.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0103","records":null,"candidatePoints":7,"id":"G0026","reason":"7 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Dappled Grove","items":"Energy Root; Revival Herb; Pretty Feather","directions":"Northern cliff between the two dens.","acquisition":"Hidden pickup","match":"Strong","map":"z_wr0103","records":"a_wr0101.bin|2|hiddenItem|20|0\na_wr0101.bin|2|hiddenItem|20|1\na_wr0101.bin|2|hiddenItem|20|2\na_wr0101.bin|2|hiddenItem|20|3","candidatePoints":1,"id":"G0027","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Dappled Grove","items":"Fancy Apple ×2","directions":"Tree east of grass beyond northern dens.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0103","records":null,"candidatePoints":14,"id":"G0028","reason":"14 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Dappled Grove","items":"Fancy Apple ×2","directions":"Check the tree furthest northwest.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0103","records":null,"candidatePoints":14,"id":"G0029","reason":"14 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Dappled Grove","items":"Energy Root; Honey; Shed Shell","directions":"Purple lakeside flowers north of eastern berry tree.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0103","records":null,"candidatePoints":2,"id":"G0030","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Dappled Grove","items":"Energy Root; Honey; Shed Shell","directions":"Purple lakeside flowers east of northern berry tree.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0103","records":null,"candidatePoints":2,"id":"G0031","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Dappled Grove","items":"Chesto Berry; Pecha Berry; Oran Berry; Persim Berry","directions":"Shake the tree with this item pool.","acquisition":"Berry tree","match":"Strong","map":"z_wr0103","records":"a_wr0101.bin|2|BerryTree|0|-","candidatePoints":1,"id":"G0032","reason":"Same map, pickup type and complete listed item set. Tree item and rate fields are read only in the current editor.","edition":"Both","source":"Bulbapedia"},
			{"location":"Dappled Grove","items":"Chesto Berry; Pecha Berry; Rawst Berry; Oran Berry; Pomeg Berry","directions":"Shake the tree with this item pool.","acquisition":"Berry tree","match":"Strong","map":"z_wr0103","records":"a_wr0101.bin|2|BerryTree|1|-","candidatePoints":1,"id":"G0033","reason":"Same map, pickup type and complete listed item set. Tree item and rate fields are read only in the current editor.","edition":"Both","source":"Bulbapedia"},
			{"location":"Dappled Grove","items":"Chesto Berry; Rawst Berry; Leppa Berry; Grepa Berry; Chilan Berry","directions":"Shake the tree with this item pool.","acquisition":"Berry tree","match":"Strong","map":"z_wr0103","records":"a_wr0101.bin|2|BerryTree|2|-","candidatePoints":1,"id":"G0034","reason":"Same map, pickup type and complete listed item set. Tree item and rate fields are read only in the current editor.","edition":"Both","source":"Bulbapedia"},
			{"location":"Dappled Grove","items":"Pecha Berry; Rawst Berry; Oran Berry; Chilan Berry; Apicot Berry","directions":"Shake the tree with this item pool.","acquisition":"Berry tree","match":"Strong","map":"z_wr0103","records":"a_wr0101.bin|2|BerryTree|3|-","candidatePoints":1,"id":"G0035","reason":"Same map, pickup type and complete listed item set. Tree item and rate fields are read only in the current editor.","edition":"Both","source":"Bulbapedia"},
			{"location":"Giant's Seat","items":"TM81 (Bulldoze)","directions":"Rock spire's rear, against eastern cliffs.","acquisition":"Visible pickup","match":"Strong","map":"z_wr0109","records":"a_wr0101.bin|8|fieldItem|0|-","candidatePoints":1,"id":"G0036","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Giant's Seat","items":"Leftovers","directions":"Northeast corner: beside the small tree.","acquisition":"Visible pickup","match":"Strong","map":"z_wr0109","records":"a_wr0101.bin|8|fieldItem|1|-","candidatePoints":1,"id":"G0037","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Giant's Seat","items":"Pearl; Big Pearl","directions":"Shore below the bridge, to south.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0109","records":null,"candidatePoints":2,"id":"G0038","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Giant's Seat","items":"Pearl; Big Pearl","directions":"Southern bridge side den: inspect nearby shoreline.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0109","records":null,"candidatePoints":2,"id":"G0039","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Giant's Seat","items":"Energy Root; Pretty Feather","directions":"Southern grass field: southern cliff edge.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0109","records":null,"candidatePoints":2,"id":"G0040","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Giant's Seat","items":"Energy Root; Revival Herb; Pretty Feather","directions":"Southern grass field: southeastern cliff edge.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0109","records":null,"candidatePoints":3,"id":"G0041","reason":"3 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Giant's Seat","items":"Revive; Max Revive","directions":"Spire's southern side, beside eastern grass edge.","acquisition":"Hidden pickup","match":"Strong","map":"z_wr0109","records":"a_wr0101.bin|8|hiddenItem|0|0\na_wr0101.bin|8|hiddenItem|0|1\na_wr0101.bin|8|hiddenItem|0|2","candidatePoints":1,"id":"G0042","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Giant's Seat","items":"Energy Root; Pretty Feather","directions":"Between bridge and spire's western side.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0109","records":null,"candidatePoints":2,"id":"G0043","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Giant's Seat","items":"Energy Root; Revival Herb; Pretty Feather","directions":"Spire's northern shrubs.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0109","records":null,"candidatePoints":3,"id":"G0044","reason":"3 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Giant's Seat","items":"Tiny Mushroom; Big Mushroom; Balm Mushroom","directions":"Inspect tree beyond bridge to north.","acquisition":"Hidden pickup","match":"Strong","map":"z_wr0109","records":"a_wr0101.bin|8|hiddenItem|8|0\na_wr0101.bin|8|hiddenItem|8|1\na_wr0101.bin|8|hiddenItem|8|2\na_wr0101.bin|8|hiddenItem|8|3","candidatePoints":1,"id":"G0045","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Giant's Seat","items":"Poké Ball; Great Ball; Ultra Ball","directions":"Eastern cliff, between spire and northern den.","acquisition":"Hidden pickup","match":"Strong","map":"z_wr0109","records":"a_wr0101.bin|8|hiddenItem|7|0\na_wr0101.bin|8|hiddenItem|7|1\na_wr0101.bin|8|hiddenItem|7|2\na_wr0101.bin|8|hiddenItem|7|3","candidatePoints":1,"id":"G0046","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Giant's Seat","items":"Energy Root; Revival Herb; Pretty Feather","directions":"Bush beside den on eastern cliffs.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0109","records":null,"candidatePoints":3,"id":"G0047","reason":"3 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Giant's Seat","items":"Chesto Berry; Aspear Berry; Leppa Berry; Sitrus Berry; Qualot Berry; Ganlon Berry","directions":"Shake the tree with this item pool.","acquisition":"Berry tree","match":"Strong","map":"z_wr0109","records":"a_wr0101.bin|8|BerryTree|0|-","candidatePoints":1,"id":"G0048","reason":"Same map, pickup type and complete listed item set. Tree item and rate fields are read only in the current editor.","edition":"Both","source":"Bulbapedia"},
			{"location":"South Lake Miloch","items":"Poké Ball","directions":"Rolling Fields boundary: follow western wall north.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0108","records":null,"candidatePoints":2,"id":"G0049","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"South Lake Miloch","items":"Tiny Mushroom; Big Mushroom; Poké Ball","directions":"Northeast corner: inspect tree roots.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0108","records":null,"candidatePoints":4,"id":"G0050","reason":"4 physical points share these items. Same map and at least one listed item. Pool or edition differences require review.","edition":"Both","source":"Bulbapedia"},
			{"location":"South Lake Miloch","items":"Energy Root; Honey","directions":"Follow eastern cliff south from northeast corner.","acquisition":"Hidden pickup","match":"Strong","map":"z_wr0108","records":"a_wr0101.bin|7|hiddenItem|2|0\na_wr0101.bin|7|hiddenItem|2|1\na_wr0101.bin|7|hiddenItem|2|2","candidatePoints":1,"id":"G0051","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"South Lake Miloch","items":"Tiny Mushroom; Big Mushroom","directions":"Inspect the tree furthest south.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0108","records":null,"candidatePoints":2,"id":"G0052","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"South Lake Miloch","items":"Pearl; Big Pearl; Pearl String","directions":"Water: cliff northwest of northwestern lake den.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0108","records":null,"candidatePoints":6,"id":"G0053","reason":"6 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"South Lake Miloch","items":"Pearl; Big Pearl; Pearl String","directions":"Water: channel center, above its narrow neck.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0108","records":null,"candidatePoints":6,"id":"G0054","reason":"6 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"South Lake Miloch","items":"Prism Scale","directions":"Water: southwestern lake corner, west of den.","acquisition":"Hidden pickup","match":"Strong","map":"z_wr0108","records":"a_wr0101.bin|7|hiddenItem|6|0","candidatePoints":1,"id":"G0055","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"South Lake Miloch","items":"Pearl; Big Pearl; Pearl String","directions":"Water: below bridge's western end.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0108","records":null,"candidatePoints":6,"id":"G0056","reason":"6 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"South Lake Miloch","items":"Pearl; Big Pearl; Pearl String","directions":"Water: halfway between southern lake dens.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0108","records":null,"candidatePoints":6,"id":"G0057","reason":"6 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"South Lake Miloch","items":"Pearl; Big Pearl; Pearl String","directions":"Water: above bridge's western end.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0108","records":null,"candidatePoints":6,"id":"G0058","reason":"6 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"South Lake Miloch","items":"Pearl; Big Pearl; Pearl String","directions":"Water: northeast of Giant's Seat bridge side tree.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0108","records":null,"candidatePoints":6,"id":"G0059","reason":"6 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Axew's Eye","items":"TM95 (Air Slash)","directions":"Explore the island's western tip.","acquisition":"Visible pickup","match":"Strong","map":"z_wr0107","records":"a_wr0101.bin|6|fieldItem|0|-","candidatePoints":1,"id":"G0060","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Axew's Eye","items":"Fancy Apple ×2","directions":"Inspect the island tree's base.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0107","records":null,"candidatePoints":2,"id":"G0061","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Axew's Eye","items":"Tart Apple; Sweet Apple","directions":"Inspect tree base for edition specific apple.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0107","records":null,"candidatePoints":2,"id":"G0062","reason":"2 physical points share these items. Same map and at least one listed item. Pool or edition differences require review.","edition":"Tart Apple: Sword; Sweet Apple: Shield","source":"Bulbapedia"},
			{"location":"Axew's Eye","items":"Pearl; Big Pearl; Pearl String","directions":"Search northeastern shoreline; multiple nearby spots.","acquisition":"Hidden pickup","match":"Strong","map":"z_wr0107","records":"a_wr0101.bin|6|hiddenItem|2|0\na_wr0101.bin|6|hiddenItem|2|1\na_wr0101.bin|6|hiddenItem|2|2\na_wr0101.bin|6|hiddenItem|2|3","candidatePoints":1,"id":"G0063","reason":"The guide combines multiple spots at one landmark. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Axew's Eye","items":"Rare Candy","directions":"Eastern shoreline: inspect the three rock cluster.","acquisition":"Hidden pickup","match":"Strong","map":"z_wr0107","records":"a_wr0101.bin|6|hiddenItem|4|0\na_wr0101.bin|6|hiddenItem|4|1","candidatePoints":1,"id":"G0064","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Axew's Eye","items":"Lum Berry; Kebia Berry; Colbur Berry; Salac Berry; Kee Berry; Maranga Berry","directions":"Shake the tree with this item pool.","acquisition":"Berry tree","match":"Strong","map":"z_wr0107","records":"a_wr0101.bin|6|BerryTree|0|-","candidatePoints":1,"id":"G0065","reason":"Same map, pickup type and complete listed item set. Tree item and rate fields are read only in the current editor.","edition":"Both","source":"Bulbapedia"},
			{"location":"West Lake Axewell","items":"Tiny Mushroom; Big Mushroom","directions":"Bridge southwest: inspect tree base.","acquisition":"Hidden pickup","match":"Strong","map":"z_wr0106","records":"a_wr0101.bin|5|hiddenItem|11|0\na_wr0101.bin|5|hiddenItem|11|1\na_wr0101.bin|5|hiddenItem|11|2","candidatePoints":1,"id":"G0066","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"West Lake Axewell","items":"Pungent Root ×2","directions":"Bridge's southern end: search shoreline westward.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0106","records":null,"candidatePoints":4,"id":"G0067","reason":"4 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"West Lake Axewell","items":"Pungent Root ×2","directions":"Bridge's northern end: search shoreline eastward.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0106","records":null,"candidatePoints":4,"id":"G0068","reason":"4 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"West Lake Axewell","items":"Pearl; Big Pearl; Pearl String","directions":"Water: follow the northern shoreline.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0106","records":null,"candidatePoints":5,"id":"G0069","reason":"5 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"West Lake Axewell","items":"Pearl; Big Pearl; Pearl String","directions":"Water: east of northwestern shore den.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0106","records":null,"candidatePoints":5,"id":"G0070","reason":"5 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"West Lake Axewell","items":"Pearl; Big Pearl; Pearl String","directions":"Water: southern half, aligned with den and tower.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0106","records":null,"candidatePoints":5,"id":"G0071","reason":"5 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"West Lake Axewell","items":"Pearl; Big Pearl","directions":"Water: east northeast of southwestern den, beyond Gyarados.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0106","records":null,"candidatePoints":2,"id":"G0072","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"West Lake Axewell","items":"Pearl; Big Pearl; Pearl String","directions":"Water: southeast of southwestern den.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0106","records":null,"candidatePoints":5,"id":"G0073","reason":"5 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"West Lake Axewell","items":"Pearl; Big Pearl","directions":"Water: southwest of southwestern den.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0106","records":null,"candidatePoints":2,"id":"G0074","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"West Lake Axewell","items":"Pearl; Big Pearl; Pearl String","directions":"Water: northwest of southwestern den.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0106","records":null,"candidatePoints":5,"id":"G0075","reason":"5 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Watchtower Ruins","items":"White Herb","directions":"Southwestern hollow log, near Dappled Grove boundary.","acquisition":"Visible pickup","match":"Likely","map":"z_wr0103","records":"a_wr0101.bin|2|fieldItem|0|-","candidatePoints":1,"id":"G0076","reason":"Guide landmark lies in a neighboring editor map. Check the map boundary before editing.","edition":"Both","source":"Bulbapedia"},
			{"location":"Watchtower Ruins","items":"Max Revive","directions":"Inspect the ruined tower's base.","acquisition":"Visible pickup","match":"Strong","map":"z_wr0104","records":"a_wr0101.bin|3|fieldItem|0|-","candidatePoints":1,"id":"G0077","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Watchtower Ruins","items":"Tiny Mushroom; Big Mushroom","directions":"Southwestern tree standing clear of cliffs.","acquisition":"Hidden pickup","match":"Likely","map":"z_wr0103","records":"a_wr0101.bin|2|hiddenItem|11|0\na_wr0101.bin|2|hiddenItem|11|1\na_wr0101.bin|2|hiddenItem|11|2","candidatePoints":1,"id":"G0078","reason":"Neighboring Dappled Grove map. Mushroom point beside the White Herb/log area fits the southern tree description; tree identity needs an in game check.","edition":"Both","source":"Bulbapedia"},
			{"location":"Watchtower Ruins","items":"Tiny Mushroom; Big Mushroom","directions":"Western cliff tree above Dappled Grove boundary.","acquisition":"Hidden pickup","match":"Strong","map":"z_wr0104","records":"a_wr0101.bin|3|hiddenItem|2|0\na_wr0101.bin|3|hiddenItem|2|1\na_wr0101.bin|3|hiddenItem|2|2","candidatePoints":1,"id":"G0079","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Watchtower Ruins","items":"Revive; Poké Ball","directions":"Search the tower's northeastern side.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0104","records":null,"candidatePoints":2,"id":"G0080","reason":"2 physical points share these items. Same map and at least one listed item. Pool or edition differences require review.","edition":"Both","source":"Bulbapedia"},
			{"location":"Watchtower Ruins","items":"Cheri Berry; Leppa Berry; Oran Berry; Sitrus Berry; Tamato Berry; Liechi Berry","directions":"Shake the tree with this item pool.","acquisition":"Berry tree","match":"Strong","map":"z_wr0104","records":"a_wr0101.bin|3|BerryTree|0|-","candidatePoints":1,"id":"G0081","reason":"Same map, pickup type and complete listed item set. Tree item and rate fields are read only in the current editor.","edition":"Both","source":"Bulbapedia"},
			{"location":"East Lake Axewell","items":"Poké Ball","directions":"Bare soil beyond southern grass; wandering birds nearby.","acquisition":"Hidden pickup","match":"Strong","map":"z_wr0105","records":"a_wr0101.bin|4|hiddenItem|0|0\na_wr0101.bin|4|hiddenItem|0|1","candidatePoints":1,"id":"G0082","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"East Lake Axewell","items":"Revive","directions":"Follow gate south to the lakeshore.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0105","records":null,"candidatePoints":2,"id":"G0083","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"East Lake Axewell","items":"Pungent Root ×2","directions":"Gate southwest: inspect lakeshore.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0105","records":null,"candidatePoints":2,"id":"G0084","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"East Lake Axewell","items":"Revive","directions":"Motostoke stairs: inspect eastern wall.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0105","records":null,"candidatePoints":2,"id":"G0085","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"East Lake Axewell","items":"Energy Root; Pretty Feather","directions":"Gate west: second grassy patch along walls.","acquisition":"Hidden pickup","match":"Strong","map":"z_wr0105","records":"a_wr0101.bin|4|hiddenItem|5|0\na_wr0101.bin|4|hiddenItem|5|1\na_wr0101.bin|4|hiddenItem|5|2","candidatePoints":1,"id":"G0086","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"East Lake Axewell","items":"Tiny Mushroom; Big Mushroom","directions":"Gate west: second cliff side tree.","acquisition":"Hidden pickup","match":"Strong","map":"z_wr0105","records":"a_wr0101.bin|4|hiddenItem|6|0\na_wr0101.bin|4|hiddenItem|6|1\na_wr0101.bin|4|hiddenItem|6|2","candidatePoints":1,"id":"G0087","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"East Lake Axewell","items":"Pearl; Big Pearl","directions":"Water: east of den beside western bridge.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0105","records":null,"candidatePoints":3,"id":"G0088","reason":"3 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"East Lake Axewell","items":"Pearl; Big Pearl; Pearl String","directions":"Water: west northwest of Axew's Eye tree.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0105","records":null,"candidatePoints":2,"id":"G0089","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"East Lake Axewell","items":"Pearl; Big Pearl","directions":"Water: south of Axew's Eye tree.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0105","records":null,"candidatePoints":3,"id":"G0090","reason":"3 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"East Lake Axewell","items":"Pearl; Big Pearl; Pearl String","directions":"Water: north northeast of southeastern den, beside grass tip.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0105","records":null,"candidatePoints":2,"id":"G0091","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"East Lake Axewell","items":"Pearl; Big Pearl; Pearl String","directions":"Water: north northwest of southeastern den, beside grass tip.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0105","records":null,"candidatePoints":2,"id":"G0092","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"North Lake Miloch","items":"Thunder Stone","directions":"Southwest clifftop overlooking Giant's Seat.","acquisition":"Visible pickup","match":"Strong","map":"z_wr0110","records":"a_wr0101.bin|9|fieldItem|0|-","candidatePoints":1,"id":"G0093","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"North Lake Miloch","items":"Energy Root; Revival Herb; Honey","directions":"Hill above Giant's Seat: purple flowers.","acquisition":"Hidden pickup","match":"Strong","map":"z_wr0110","records":"a_wr0101.bin|9|hiddenItem|2|0\na_wr0101.bin|9|hiddenItem|2|1\na_wr0101.bin|9|hiddenItem|2|2\na_wr0101.bin|9|hiddenItem|2|3","candidatePoints":1,"id":"G0094","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"North Lake Miloch","items":"Poké Ball; Great Ball","directions":"Eastern cliff shrubs, below northeastern den's tree.","acquisition":"Hidden pickup","match":"Strong","map":"z_wr0110","records":"a_wr0101.bin|9|hiddenItem|5|0\na_wr0101.bin|9|hiddenItem|5|1\na_wr0101.bin|9|hiddenItem|5|2","candidatePoints":1,"id":"G0095","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"North Lake Miloch","items":"Tiny Mushroom; Big Mushroom","directions":"Northeastern tree: inspect southern roots.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0110","records":null,"candidatePoints":3,"id":"G0096","reason":"3 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"North Lake Miloch","items":"Tiny Mushroom; Big Mushroom","directions":"Northeastern tree: inspect northern roots.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0110","records":null,"candidatePoints":3,"id":"G0097","reason":"3 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"North Lake Miloch","items":"Revive","directions":"Bridge south: between the tree pair.","acquisition":"Hidden pickup","match":"Strong","map":"z_wr0110","records":"a_wr0101.bin|9|hiddenItem|4|0\na_wr0101.bin|9|hiddenItem|4|1","candidatePoints":1,"id":"G0098","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"North Lake Miloch","items":"Tiny Mushroom; Big Mushroom; Balm Mushroom","directions":"Bridge south: second tree's southern side.","acquisition":"Hidden pickup","match":"Strong","map":"z_wr0110","records":"a_wr0101.bin|9|hiddenItem|3|0\na_wr0101.bin|9|hiddenItem|3|1\na_wr0101.bin|9|hiddenItem|3|2\na_wr0101.bin|9|hiddenItem|3|3","candidatePoints":1,"id":"G0099","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"North Lake Miloch","items":"Tiny Mushroom; Big Mushroom","directions":"Inspect the tree west of bridge.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0110","records":null,"candidatePoints":3,"id":"G0100","reason":"3 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"North Lake Miloch","items":"Pearl; Big Pearl","directions":"Water: eastern end, below shoreline grass.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0110","records":null,"candidatePoints":4,"id":"G0101","reason":"4 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"North Lake Miloch","items":"Pearl; Big Pearl","directions":"Water: between southern den and western grass edge.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0110","records":null,"candidatePoints":4,"id":"G0102","reason":"4 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"North Lake Miloch","items":"Pearl; Big Pearl","directions":"Water: northwest of southern den.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0110","records":null,"candidatePoints":4,"id":"G0103","reason":"4 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"North Lake Miloch","items":"Pearl; Big Pearl","directions":"Water: western end, southeast of den.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0110","records":null,"candidatePoints":4,"id":"G0104","reason":"4 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"North Lake Miloch","items":"Rawst Berry; Aspear Berry; Persim Berry; Hondew Berry; Petaya Berry","directions":"Shake the tree with this item pool.","acquisition":"Berry tree","match":"Strong","map":"z_wr0110","records":"a_wr0101.bin|9|BerryTree|0|-","candidatePoints":1,"id":"G0105","reason":"Same map, pickup type and complete listed item set. Tree item and rate fields are read only in the current editor.","edition":"Both","source":"Bulbapedia"},
			{"location":"Motostoke Riverbank","items":"Fire Stone","directions":"Southwestern corner of Motostoke's outer wall.","acquisition":"Visible pickup","match":"Strong","map":"z_wr0121","records":"a_wr0101.bin|10|fieldItem|1|-","candidatePoints":1,"id":"G0106","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Motostoke Riverbank","items":"TM39 (Facade)","directions":"Northwestern area, east of berry tree.","acquisition":"Visible pickup","match":"Strong","map":"z_wr0121","records":"a_wr0101.bin|10|fieldItem|0|-","candidatePoints":1,"id":"G0107","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Motostoke Riverbank","items":"Tiny Mushroom; Big Mushroom; Balm Mushroom","directions":"Southwestern corner: inspect tree base.","acquisition":"Hidden pickup","match":"Strong","map":"z_wr0121","records":"a_wr0101.bin|10|hiddenItem|0|0\na_wr0101.bin|10|hiddenItem|0|1\na_wr0101.bin|10|hiddenItem|0|2\na_wr0101.bin|10|hiddenItem|0|3","candidatePoints":1,"id":"G0108","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Motostoke Riverbank","items":"Poké Ball; Great Ball","directions":"Eastern foundation block: inspect southwest corner.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0121","records":null,"candidatePoints":2,"id":"G0109","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Motostoke Riverbank","items":"Energy Root; Revival Herb; Pretty Feather","directions":"Inspect the northeastern tree.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0121","records":null,"candidatePoints":2,"id":"G0110","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Motostoke Riverbank","items":"Energy Root; Revival Herb; Pretty Feather","directions":"Inspect the tree east of pond.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0121","records":null,"candidatePoints":2,"id":"G0111","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Motostoke Riverbank","items":"Poké Ball; Great Ball","directions":"Northern pond: inspect northern bank.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0121","records":null,"candidatePoints":2,"id":"G0112","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Motostoke Riverbank","items":"Pungent Root ×2","directions":"Northern pond: inspect western bank.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0121","records":null,"candidatePoints":2,"id":"G0113","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Motostoke Riverbank","items":"Revive; Max Revive","directions":"Western foundation block: inspect northwest corner.","acquisition":"Hidden pickup","match":"Likely","map":"z_wr0121","records":"a_wr0101.bin|10|hiddenItem|5|0\na_wr0101.bin|10|hiddenItem|5|1","candidatePoints":1,"id":"G0114","reason":"Same map and at least one listed item. Pool or edition differences require review.","edition":"Both","source":"Bulbapedia"},
			{"location":"Motostoke Riverbank","items":"Leppa Berry; Sitrus Berry; Coba Berry; Tanga Berry; Salac Berry; Leftovers","directions":"Shake the tree with this item pool.","acquisition":"Berry tree","match":"Strong","map":"z_wr0121","records":"a_wr0101.bin|10|BerryTree|0|-","candidatePoints":1,"id":"G0115","reason":"Same map, pickup type and complete listed item set. Tree item and rate fields are read only in the current editor.","edition":"Both","source":"Bulbapedia"},
			{"location":"Motostoke Riverbank","items":"Pomeg Berry; Kelpsy Berry; Qualot Berry; Hondew Berry; Grepa Berry; Tamato Berry; Leftovers","directions":"Shake the tree with this item pool.","acquisition":"Berry tree","match":"Strong","map":"z_wr0121","records":"a_wr0101.bin|10|BerryTree|1|-","candidatePoints":1,"id":"G0116","reason":"Same map, pickup type and complete listed item set. Tree item and rate fields are read only in the current editor.","edition":"Both","source":"Bulbapedia"},
			{"location":"Bridge Field","items":"Water Stone","directions":"Northwest area: Motostoke wall's northeastern corner.","acquisition":"Visible pickup","match":"Strong","map":"z_wr0122","records":"a_wr0101.bin|11|fieldItem|1|-","candidatePoints":1,"id":"G0117","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Bridge Field","items":"TM75 (Low Sweep)","directions":"Water Bike: island between the bridges.","acquisition":"Visible pickup","match":"Strong","map":"z_wr0122","records":"a_wr0101.bin|11|fieldItem|0|-","candidatePoints":1,"id":"G0118","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Bridge Field","items":"Pungent Root ×2","directions":"Pond: inspect southern bank.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0122","records":null,"candidatePoints":3,"id":"G0119","reason":"3 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Bridge Field","items":"Poké Ball; Great Ball; Ultra Ball","directions":"Western wall clearing: eastern end opposite pond.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0122","records":null,"candidatePoints":5,"id":"G0120","reason":"5 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Bridge Field","items":"Revive; Max Revive","directions":"Northwestern alcove den: search southeast nearby.","acquisition":"Hidden pickup","match":"Strong","map":"z_wr0122","records":"a_wr0101.bin|11|hiddenItem|13|0\na_wr0101.bin|11|hiddenItem|13|1\na_wr0101.bin|11|hiddenItem|13|2","candidatePoints":1,"id":"G0121","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Bridge Field","items":"Tiny Mushroom; Big Mushroom; Balm Mushroom","directions":"Northwestern corner: inspect large tree.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0122","records":null,"candidatePoints":4,"id":"G0122","reason":"4 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Bridge Field","items":"Tiny Mushroom; Big Mushroom; Balm Mushroom","directions":"Inspect the tree northwest of pond.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0122","records":null,"candidatePoints":4,"id":"G0123","reason":"4 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Bridge Field","items":"Energy Root; Honey","directions":"Southwest of three berry trees: purple flowers.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0122","records":null,"candidatePoints":2,"id":"G0124","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Bridge Field","items":"Pungent Root","directions":"Pond: inspect northeastern bank.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0122","records":null,"candidatePoints":3,"id":"G0125","reason":"3 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Bridge Field","items":"Energy Root; Revival Herb; Honey","directions":"Purple flowers northwest of Digging Duo.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0122","records":null,"candidatePoints":2,"id":"G0126","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Bridge Field","items":"Poké Ball; Great Ball; Ultra Ball","directions":"Nursery's nearest den: weeds to southwest.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0122","records":null,"candidatePoints":5,"id":"G0127","reason":"5 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Bridge Field","items":"Poké Ball; Great Ball; Ultra Ball","directions":"Nursery's nearest den: northwestern pillar's west side.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0122","records":null,"candidatePoints":5,"id":"G0128","reason":"5 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Bridge Field","items":"Energy Root; Revival Herb; Pretty Feather","directions":"Northern bridge: small tree beside easternmost pillar.","acquisition":"Hidden pickup","match":"Strong","map":"z_wr0122","records":"a_wr0101.bin|11|hiddenItem|19|0\na_wr0101.bin|11|hiddenItem|19|1\na_wr0101.bin|11|hiddenItem|19|2\na_wr0101.bin|11|hiddenItem|19|3","candidatePoints":1,"id":"G0129","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Bridge Field","items":"Tiny Mushroom; Big Mushroom; Balm Mushroom","directions":"Inspect nursery's northern tree; multiple spots.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0122","records":null,"candidatePoints":4,"id":"G0130","reason":"The guide combines multiple spots at one landmark. 4 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Bridge Field","items":"Poké Ball; Great Ball; Ultra Ball","directions":"Inspect nursery's southern tree.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0122","records":null,"candidatePoints":5,"id":"G0131","reason":"5 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Bridge Field","items":"Pearl; Big Pearl; Pearl String","directions":"Island shoreline west of grass; Water Bike.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0122","records":null,"candidatePoints":2,"id":"G0132","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Bridge Field","items":"Pearl; Big Pearl; Pearl String","directions":"Island shoreline northeast of berry tree; Water Bike.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0122","records":null,"candidatePoints":2,"id":"G0133","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Bridge Field","items":"Tiny Mushroom; Big Mushroom; Balm Mushroom","directions":"Island's northeastern tree: western roots; Water Bike.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0122","records":null,"candidatePoints":4,"id":"G0134","reason":"4 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Bridge Field","items":"Tiny Mushroom; Big Mushroom; Balm Mushroom","directions":"Island's northeastern tree: southern roots; Water Bike.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0122","records":null,"candidatePoints":4,"id":"G0135","reason":"4 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Bridge Field","items":"Chople Berry; Kasib Berry; Babiri Berry; Liechi Berry; Ganlon Berry; Roseli Berry; Leftovers","directions":"Shake the tree with this item pool.","acquisition":"Berry tree","match":"Strong","map":"z_wr0122","records":"a_wr0101.bin|11|BerryTree|3|-","candidatePoints":1,"id":"G0136","reason":"Same map, pickup type and complete listed item set. Tree item and rate fields are read only in the current editor.","edition":"Both","source":"Bulbapedia"},
			{"location":"Bridge Field","items":"Sitrus Berry; Aguav Berry; Hondew Berry; Grepa Berry; Rindo Berry; Leftovers","directions":"Shake the tree with this item pool.","acquisition":"Berry tree","match":"Strong","map":"z_wr0122","records":"a_wr0101.bin|11|BerryTree|1|-","candidatePoints":1,"id":"G0137","reason":"Same map, pickup type and complete listed item set. Tree item and rate fields are read only in the current editor.","edition":"Both","source":"Bulbapedia"},
			{"location":"Bridge Field","items":"Sitrus Berry; Figy Berry; Pomeg Berry; Tamato Berry; Occa Berry; Leftovers","directions":"Shake the tree with this item pool.","acquisition":"Berry tree","match":"Strong","map":"z_wr0122","records":"a_wr0101.bin|11|BerryTree|0|-","candidatePoints":1,"id":"G0138","reason":"Same map, pickup type and complete listed item set. Tree item and rate fields are read only in the current editor.","edition":"Both","source":"Bulbapedia"},
			{"location":"Bridge Field","items":"Sitrus Berry; Wiki Berry; Kelpsy Berry; Qualot Berry; Passho Berry; Leftovers","directions":"Shake the tree with this item pool.","acquisition":"Berry tree","match":"Strong","map":"z_wr0122","records":"a_wr0101.bin|11|BerryTree|2|-","candidatePoints":1,"id":"G0139","reason":"Same map, pickup type and complete listed item set. Tree item and rate fields are read only in the current editor.","edition":"Both","source":"Bulbapedia"},
			{"location":"Stony Wilderness","items":"Tiny Mushroom; Big Mushroom; Balm Mushroom","directions":"Southeastern den: small tree immediately north.","acquisition":"Hidden pickup","match":"Strong","map":"z_wr0131","records":"a_wr0101.bin|12|hiddenItem|12|0\na_wr0101.bin|12|hiddenItem|12|1\na_wr0101.bin|12|hiddenItem|12|2\na_wr0101.bin|12|hiddenItem|12|3","candidatePoints":1,"id":"G0140","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Stony Wilderness","items":"Poké Ball; Great Ball; Ultra Ball","directions":"Southeastern den: isolated rock southwest.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0131","records":null,"candidatePoints":4,"id":"G0141","reason":"4 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Stony Wilderness","items":"Stardust; Star Piece","directions":"Southeastern den: paired rocks' northern junction.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0131","records":null,"candidatePoints":10,"id":"G0142","reason":"10 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Stony Wilderness","items":"Stardust; Star Piece","directions":"Second leaning pair westward: eastern leg.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0131","records":null,"candidatePoints":10,"id":"G0143","reason":"10 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Stony Wilderness","items":"Stardust; Star Piece","directions":"Fourth bridge pillar from east: northern rock, southern spot.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0131","records":null,"candidatePoints":10,"id":"G0144","reason":"10 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Stony Wilderness","items":"Stardust; Star Piece","directions":"Fourth bridge pillar from east: northern rock, northern spot.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0131","records":null,"candidatePoints":10,"id":"G0145","reason":"10 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Stony Wilderness","items":"Revive; Max Revive","directions":"Fifth bridge pillar from east: northern rock junction.","acquisition":"Hidden pickup","match":"Strong","map":"z_wr0131","records":"a_wr0101.bin|12|hiddenItem|5|0\na_wr0101.bin|12|hiddenItem|5|1\na_wr0101.bin|12|hiddenItem|5|2","candidatePoints":1,"id":"G0146","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Stony Wilderness","items":"Poké Ball; Great Ball; Ultra Ball","directions":"Fourth bridge pillar from east: eastern side.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0131","records":null,"candidatePoints":4,"id":"G0147","reason":"4 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Stony Wilderness","items":"Poké Ball ×2; Revive","directions":"Central bridge opening below long rock.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0131","records":null,"candidatePoints":6,"id":"G0148","reason":"6 physical points share these items. Same map and at least one listed item. Pool or edition differences require review.","edition":"Both","source":"Bulbapedia"},
			{"location":"Stony Wilderness","items":"Poké Ball; Revive","directions":"Second western pillar pair: rock's southern side.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0131","records":null,"candidatePoints":6,"id":"G0149","reason":"6 physical points share these items. Same map and at least one listed item. Pool or edition differences require review.","edition":"Both","source":"Bulbapedia"},
			{"location":"Stony Wilderness","items":"Stardust; Star Piece; Comet Shard","directions":"Inspect the southwestern corner rock.","acquisition":"Hidden pickup","match":"Strong","map":"z_wr0131","records":"a_wr0101.bin|12|hiddenItem|8|0\na_wr0101.bin|12|hiddenItem|8|1\na_wr0101.bin|12|hiddenItem|8|2\na_wr0101.bin|12|hiddenItem|8|3","candidatePoints":1,"id":"G0150","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Stony Wilderness","items":"Poké Ball; Great Ball; Ultra Ball","directions":"Rock in grass north of southwestern den.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0131","records":null,"candidatePoints":4,"id":"G0151","reason":"4 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Stony Wilderness","items":"Stardust; Star Piece","directions":"Same grassy rock: inspect eastern side.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0131","records":null,"candidatePoints":10,"id":"G0152","reason":"10 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Stony Wilderness","items":"Stardust; Star Piece","directions":"Same grassy rock: inspect northern side.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0131","records":null,"candidatePoints":10,"id":"G0153","reason":"10 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Stony Wilderness","items":"Revive","directions":"Northwestern den: rock immediately south.","acquisition":"Hidden pickup","match":"Strong","map":"z_wr0131","records":"a_wr0101.bin|12|hiddenItem|7|0\na_wr0101.bin|12|hiddenItem|7|1","candidatePoints":1,"id":"G0154","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Stony Wilderness","items":"Poké Ball; Great Ball; Ultra Ball","directions":"Northwestern den: rock to southeast.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0131","records":null,"candidatePoints":4,"id":"G0155","reason":"4 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Stony Wilderness","items":"Poké Ball; Great Ball; Ultra Ball","directions":"Below Dusty Bowl: long rock's western side.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0131","records":null,"candidatePoints":4,"id":"G0156","reason":"4 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Stony Wilderness","items":"Stardust; Star Piece","directions":"Same rock: eastern side, southern spot.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0131","records":null,"candidatePoints":10,"id":"G0157","reason":"10 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Stony Wilderness","items":"Stardust; Star Piece","directions":"Same rock: eastern side, northern spot.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0131","records":null,"candidatePoints":10,"id":"G0158","reason":"10 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Stony Wilderness","items":"Stardust; Star Piece","directions":"Northeastern ridge by brown grass: southern spot.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0131","records":null,"candidatePoints":10,"id":"G0159","reason":"10 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Stony Wilderness","items":"Stardust; Star Piece","directions":"Northeastern ridge by brown grass: northern spot.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0131","records":null,"candidatePoints":10,"id":"G0160","reason":"10 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Giant's Mirror","items":"Pungent Root ×4","directions":"Search around the pond's perimeter.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0133","records":null,"candidatePoints":4,"id":"G0161","reason":"4 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Giant's Mirror","items":"Poké Ball; Great Ball; Ultra Ball","directions":"Pond's northern end: eastern wall.","acquisition":"Hidden pickup","match":"Strong","map":"z_wr0133","records":"a_wr0101.bin|14|hiddenItem|4|0\na_wr0101.bin|14|hiddenItem|4|1\na_wr0101.bin|14|hiddenItem|4|2\na_wr0101.bin|14|hiddenItem|4|3","candidatePoints":1,"id":"G0162","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Giant's Mirror","items":"Stardust; Star Piece; Comet Shard","directions":"Pond north: long rock's southern side.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0133","records":null,"candidatePoints":2,"id":"G0163","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Giant's Mirror","items":"Stardust; Star Piece; Comet Shard","directions":"Pond north: leaning rocks' southern leg.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0133","records":null,"candidatePoints":2,"id":"G0164","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Giant's Mirror","items":"Tiny Mushroom; Big Mushroom; Balm Mushroom","directions":"Northeastern corner: inspect fallen log.","acquisition":"Hidden pickup","match":"Strong","map":"z_wr0133","records":"a_wr0101.bin|14|hiddenItem|7|0\na_wr0101.bin|14|hiddenItem|7|1\na_wr0101.bin|14|hiddenItem|7|2\na_wr0101.bin|14|hiddenItem|7|3","candidatePoints":1,"id":"G0165","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Giant's Mirror","items":"Rare Bone","directions":"Northeastern den: dead tree cluster westward.","acquisition":"Hidden pickup","match":"Strong","map":"z_wr0133","records":"a_wr0101.bin|14|hiddenItem|5|0\na_wr0101.bin|14|hiddenItem|5|1","candidatePoints":1,"id":"G0166","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Giant's Mirror","items":"Pomeg Berry; Kelpsy Berry; Qualot Berry; Hondew Berry; Grepa Berry; Tamato Berry; Leftovers","directions":"Shake the tree with this item pool.","acquisition":"Berry tree","match":"Strong","map":"z_wr0133","records":"a_wr0101.bin|14|BerryTree|0|-","candidatePoints":1,"id":"G0167","reason":"Same map, pickup type and complete listed item set. Tree item and rate fields are read only in the current editor.","edition":"Both","source":"Bulbapedia"},
			{"location":"Dusty Bowl","items":"TM73 (Cross Poison)","directions":"Water Bike: explore northwestern island.","acquisition":"Visible pickup","match":"Strong","map":"z_wr0132","records":"a_wr0101.bin|13|fieldItem|0|-","candidatePoints":1,"id":"G0168","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Dusty Bowl","items":"Sun Stone","directions":"Rock bridge's northwest end: behind pillar.","acquisition":"Visible pickup","match":"Strong","map":"z_wr0132","records":"a_wr0101.bin|13|fieldItem|2|-","candidatePoints":1,"id":"G0169","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Dusty Bowl","items":"Moon Stone","directions":"Northeastern ridge's junction with northern wall.","acquisition":"Visible pickup","match":"Strong","map":"z_wr0132","records":"a_wr0101.bin|13|fieldItem|1|-","candidatePoints":1,"id":"G0170","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Dusty Bowl","items":"Poké Ball; Great Ball; Ultra Ball","directions":"East of southern den, beneath flying Pokémon.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0132","records":null,"candidatePoints":5,"id":"G0171","reason":"5 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Dusty Bowl","items":"Revive; Max Revive","directions":"Southwestern leaning rock tunnel: rock beyond northern exit.","acquisition":"Hidden pickup","match":"Strong","map":"z_wr0132","records":"a_wr0101.bin|13|hiddenItem|18|0\na_wr0101.bin|13|hiddenItem|18|1\na_wr0101.bin|13|hiddenItem|18|2","candidatePoints":1,"id":"G0172","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Dusty Bowl","items":"Rare Bone","directions":"Northwestern wall grass: southeastern dead trees.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0132","records":null,"candidatePoints":5,"id":"G0173","reason":"5 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Dusty Bowl","items":"Rare Bone","directions":"Northwestern wall grass: western dead trees.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0132","records":null,"candidatePoints":5,"id":"G0174","reason":"5 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Dusty Bowl","items":"Rare Bone","directions":"Northwestern ponds: dead trees between grass patches.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0132","records":null,"candidatePoints":5,"id":"G0175","reason":"5 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Dusty Bowl","items":"Fossilized Bird; Fossilized Fish","directions":"Northwestern ponds: rock below them.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0132","records":null,"candidatePoints":2,"id":"G0176","reason":"2 physical points share these items. Same map and at least one listed item. Pool or edition differences require review.","edition":"Fossilized Bird: Sword; Fossilized Fish: Shield","source":"Bulbapedia"},
			{"location":"Dusty Bowl","items":"Poké Ball; Great Ball; Ultra Ball","directions":"Small northwestern pond: dead trees below.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0132","records":null,"candidatePoints":5,"id":"G0177","reason":"5 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Dusty Bowl","items":"Pungent Root ×2","directions":"Large northwestern pond: eastern bank.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0132","records":null,"candidatePoints":3,"id":"G0178","reason":"3 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Dusty Bowl","items":"Pungent Root","directions":"Small northwestern pond: southwestern bank.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0132","records":null,"candidatePoints":3,"id":"G0179","reason":"3 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Dusty Bowl","items":"Stardust; Star Piece; Comet Shard","directions":"Small northwestern pond: rock above.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0132","records":null,"candidatePoints":3,"id":"G0180","reason":"3 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Dusty Bowl","items":"Stardust; Star Piece; Comet Shard","directions":"Rock bridge's northwest end: pillar base.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0132","records":null,"candidatePoints":3,"id":"G0181","reason":"3 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Dusty Bowl","items":"Rare Bone","directions":"Dead trees northeast of bridge end pillar.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0132","records":null,"candidatePoints":5,"id":"G0182","reason":"5 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Dusty Bowl","items":"Rare Bone","directions":"Cliff side dead trees above bridge's northwest end.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0132","records":null,"candidatePoints":5,"id":"G0183","reason":"5 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Dusty Bowl","items":"Rare Bone; Star Piece; Comet Shard","directions":"Cliff corner above bridge's northwest end.","acquisition":"Hidden pickup","match":"Strong","map":"z_wr0132","records":"a_wr0101.bin|13|hiddenItem|20|0\na_wr0101.bin|13|hiddenItem|20|1\na_wr0101.bin|13|hiddenItem|20|2\na_wr0101.bin|13|hiddenItem|20|3","candidatePoints":1,"id":"G0184","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Dusty Bowl","items":"Stardust; Star Piece; Comet Shard","directions":"Rock beside den north of bridge.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0132","records":null,"candidatePoints":3,"id":"G0185","reason":"3 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Dusty Bowl","items":"Fossilized Dino; Fossilized Drake","directions":"Inspect rock beneath the natural bridge.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0132","records":null,"candidatePoints":2,"id":"G0186","reason":"2 physical points share these items. Same map and at least one listed item. Pool or edition differences require review.","edition":"Fossilized Dino: Sword; Fossilized Drake: Shield","source":"Bulbapedia"},
			{"location":"Dusty Bowl","items":"Stardust; Star Piece","directions":"Northeastern ridge den: dead trees below.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0132","records":null,"candidatePoints":2,"id":"G0187","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Dusty Bowl","items":"Poké Ball; Great Ball; Ultra Ball","directions":"Northeastern ridge den: evergreen southeast.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0132","records":null,"candidatePoints":5,"id":"G0188","reason":"5 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Dusty Bowl","items":"Stardust; Star Piece","directions":"Northeastern den: rock below second grass patch.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0132","records":null,"candidatePoints":2,"id":"G0189","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Dusty Bowl","items":"Energy Root; Revival Herb; Honey","directions":"Eastern three rock cluster: middle rock.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0132","records":null,"candidatePoints":2,"id":"G0190","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Dusty Bowl","items":"Poké Ball; Great Ball; Ultra Ball","directions":"Eastern three rock cluster: southern rock.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0132","records":null,"candidatePoints":5,"id":"G0191","reason":"5 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Dusty Bowl","items":"Poké Ball; Great Ball; Ultra Ball","directions":"South of bridge: leaning rocks' eastern leg.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0132","records":null,"candidatePoints":5,"id":"G0192","reason":"5 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Dusty Bowl","items":"Razor Claw","directions":"Northwestern island's northeast corner; Water Bike.","acquisition":"Hidden pickup","match":"Strong","map":"z_wr0132","records":"a_wr0101.bin|13|hiddenItem|25|0","candidatePoints":1,"id":"G0193","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Dusty Bowl","items":"Tiny Mushroom; Big Mushroom; Balm Mushroom","directions":"Island tree: northern roots; Water Bike.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0132","records":null,"candidatePoints":2,"id":"G0194","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Dusty Bowl","items":"Tiny Mushroom; Big Mushroom; Balm Mushroom","directions":"Island tree: southern roots; Water Bike.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0132","records":null,"candidatePoints":2,"id":"G0195","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Giant's Cap","items":"Dawn Stone","directions":"Western cliff, above southern berry tree.","acquisition":"Visible pickup","match":"Strong","map":"z_wr0135","records":"a_wr0101.bin|16|fieldItem|0|-","candidatePoints":1,"id":"G0196","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Giant's Cap","items":"Stardust; Star Piece; Comet Shard","directions":"Eastern boulder inside V shaped grass bend.","acquisition":"Hidden pickup","match":"Strong","map":"z_wr0135","records":"a_wr0101.bin|16|hiddenItem|5|0\na_wr0101.bin|16|hiddenItem|5|1\na_wr0101.bin|16|hiddenItem|5|2\na_wr0101.bin|16|hiddenItem|5|3","candidatePoints":1,"id":"G0197","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Giant's Cap","items":"Large Leek","directions":"Hill's long gray rock: western edge.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0135","records":null,"candidatePoints":6,"id":"G0198","reason":"6 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Giant's Cap","items":"Large Leek ×5","directions":"Brown boulder beside Dusty Bowl boundary.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0135","records":null,"candidatePoints":6,"id":"G0199","reason":"6 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Giant's Cap","items":"Energy Root; Revival Herb; Pretty Feather","directions":"Lakeshore's northern end: inspect tree.","acquisition":"Hidden pickup","match":"Strong","map":"z_wr0135","records":"a_wr0101.bin|16|hiddenItem|11|0\na_wr0101.bin|16|hiddenItem|11|1\na_wr0101.bin|16|hiddenItem|11|2\na_wr0101.bin|16|hiddenItem|11|3","candidatePoints":1,"id":"G0200","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Giant's Cap","items":"Pungent Root ×2","directions":"Lakeshore west of Watt Trader's tree.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0135","records":null,"candidatePoints":3,"id":"G0201","reason":"3 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Giant's Cap","items":"Pungent Root","directions":"Lake's southern tip: inspect shore.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0135","records":null,"candidatePoints":3,"id":"G0202","reason":"3 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Giant's Cap","items":"Poké Ball; Great Ball; Ultra Ball","directions":"South of lake, beside southwestern wall.","acquisition":"Hidden pickup","match":"Strong","map":"z_wr0135","records":"a_wr0101.bin|16|hiddenItem|9|0\na_wr0101.bin|16|hiddenItem|9|1\na_wr0101.bin|16|hiddenItem|9|2\na_wr0101.bin|16|hiddenItem|9|3","candidatePoints":1,"id":"G0203","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Giant's Cap","items":"Lum Berry; Qualot Berry; Tamato Berry; Ganlon Berry; Apicot Berry; Leftovers","directions":"Shake the tree with this item pool.","acquisition":"Berry tree","match":"Strong","map":"z_wr0135","records":"a_wr0101.bin|16|BerryTree|0|-","candidatePoints":1,"id":"G0204","reason":"Same map, pickup type and complete listed item set. Tree item and rate fields are read only in the current editor.","edition":"Both","source":"Bulbapedia"},
			{"location":"Hammerlocke Hills","items":"Tiny Mushroom; Big Mushroom; Balm Mushroom","directions":"Easternmost den: tree to northwest.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0134","records":null,"candidatePoints":2,"id":"G0205","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Hammerlocke Hills","items":"Energy Root; Revival Herb; Pretty Feather","directions":"Inspect Hammerlocke wall's eastern extremity.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0134","records":null,"candidatePoints":2,"id":"G0206","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Hammerlocke Hills","items":"Tiny Mushroom; Big Mushroom","directions":"Gate's eastern wall corner: southeastern tree.","acquisition":"Hidden pickup","match":"Strong","map":"z_wr0134","records":"a_wr0101.bin|15|hiddenItem|0|0\na_wr0101.bin|15|hiddenItem|0|1\na_wr0101.bin|15|hiddenItem|0|2","candidatePoints":1,"id":"G0207","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Hammerlocke Hills","items":"Revive","directions":"Inspect wall corner east of gate.","acquisition":"Hidden pickup","match":"Strong","map":"z_wr0134","records":"a_wr0101.bin|15|hiddenItem|1|0\na_wr0101.bin|15|hiddenItem|1|1","candidatePoints":1,"id":"G0208","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Hammerlocke Hills","items":"Poké Ball; Great Ball; Ultra Ball","directions":"Hammerlocke stairway: eastern side.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0134","records":null,"candidatePoints":2,"id":"G0209","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Hammerlocke Hills","items":"Stardust; Star Piece","directions":"Inspect rock below Hammerlocke gate.","acquisition":"Hidden pickup","match":"Strong","map":"z_wr0134","records":"a_wr0101.bin|15|hiddenItem|2|0\na_wr0101.bin|15|hiddenItem|2|1\na_wr0101.bin|15|hiddenItem|2|2","candidatePoints":1,"id":"G0210","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Hammerlocke Hills","items":"Energy Root; Revival Herb; Pretty Feather","directions":"Gate southwest: inspect tall tree.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0134","records":null,"candidatePoints":2,"id":"G0211","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Hammerlocke Hills","items":"Poké Ball; Great Ball; Ultra Ball","directions":"Northwestern den: bare soil to southeast.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0134","records":null,"candidatePoints":2,"id":"G0212","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Hammerlocke Hills","items":"Tiny Mushroom; Big Mushroom; Balm Mushroom","directions":"Inspect tree in northwestern corner.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0134","records":null,"candidatePoints":2,"id":"G0213","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Hammerlocke Hills","items":"Sitrus Berry; Mago Berry; Iapapa Berry; Kelpsy Berry; Hondew Berry; Leftovers","directions":"Shake the tree with this item pool.","acquisition":"Berry tree","match":"Strong","map":"z_wr0134","records":"a_wr0101.bin|15|BerryTree|0|-","candidatePoints":1,"id":"G0214","reason":"Same map, pickup type and complete listed item set. Tree item and rate fields are read only in the current editor.","edition":"Both","source":"Bulbapedia"},
			{"location":"Hammerlocke Hills","items":"Leppa Berry; Pomeg Berry; Grepa Berry; Wacan Berry; Payapa Berry; Leftovers","directions":"Shake the tree with this item pool.","acquisition":"Berry tree","match":"Strong","map":"z_wr0134","records":"a_wr0101.bin|15|BerryTree|1|-","candidatePoints":1,"id":"G0215","reason":"Same map, pickup type and complete listed item set. Tree item and rate fields are read only in the current editor.","edition":"Both","source":"Bulbapedia"},
			{"location":"Lake of Outrage","items":"TM65 (Shadow Claw)","directions":"Northern lake terrace: beside tree.","acquisition":"Visible pickup","match":"Strong","map":"z_wr0136","records":"a_wr0101.bin|17|fieldItem|0|-","candidatePoints":1,"id":"G0216","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Lake of Outrage","items":"Focus Sash","directions":"Cross lake; island's southwestern wall.","acquisition":"Visible pickup","match":"Strong","map":"z_wr0136","records":"a_wr0101.bin|17|fieldItem|1|-","candidatePoints":1,"id":"G0217","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Lake of Outrage","items":"Assault Vest","directions":"Cross lake; island's northeastern tree.","acquisition":"Visible pickup","match":"Strong","map":"z_wr0136","records":"a_wr0101.bin|17|fieldItem|2|-","candidatePoints":1,"id":"G0218","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Lake of Outrage","items":"Pearl; Big Pearl; Pearl String","directions":"Water: alcove against western cliff.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0136","records":null,"candidatePoints":4,"id":"G0219","reason":"4 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Lake of Outrage","items":"Pearl; Big Pearl; Pearl String","directions":"Water: west of island cliff's den.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0136","records":null,"candidatePoints":4,"id":"G0220","reason":"4 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Lake of Outrage","items":"Pearl; Big Pearl; Pearl String","directions":"Water: north of island cliff's den.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0136","records":null,"candidatePoints":4,"id":"G0221","reason":"4 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Lake of Outrage","items":"Pearl; Big Pearl; Pearl String","directions":"Water: eastern cliff near northern terrace.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_wr0136","records":null,"candidatePoints":4,"id":"G0222","reason":"4 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Lake of Outrage","items":"Tiny Mushroom; Big Mushroom; Balm Mushroom","directions":"Island's northeastern tree: inspect roots.","acquisition":"Hidden pickup","match":"Strong","map":"z_wr0136","records":"a_wr0101.bin|17|hiddenItem|0|0\na_wr0101.bin|17|hiddenItem|0|1\na_wr0101.bin|17|hiddenItem|0|2\na_wr0101.bin|17|hiddenItem|0|3","candidatePoints":1,"id":"G0223","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Lake of Outrage","items":"Revive; Max Revive","directions":"Island southeast: inspect long rock ridge.","acquisition":"Hidden pickup","match":"Strong","map":"z_wr0136","records":"a_wr0101.bin|17|hiddenItem|1|0\na_wr0101.bin|17|hiddenItem|1|1\na_wr0101.bin|17|hiddenItem|1|2","candidatePoints":1,"id":"G0224","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Lake of Outrage","items":"Dawn Stone","directions":"Stone circle: southern standing stone.","acquisition":"Hidden pickup","match":"Strong","map":"z_wr0136","records":"a_wr0101.bin|17|hiddenItem|9|0","candidatePoints":1,"id":"G0225","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Lake of Outrage","items":"Ice Stone","directions":"Stone circle: southwestern standing stone.","acquisition":"Hidden pickup","match":"Strong","map":"z_wr0136","records":"a_wr0101.bin|17|hiddenItem|8|0","candidatePoints":1,"id":"G0226","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Lake of Outrage","items":"Leaf Stone","directions":"Stone circle: western standing stone.","acquisition":"Hidden pickup","match":"Strong","map":"z_wr0136","records":"a_wr0101.bin|17|hiddenItem|7|0","candidatePoints":1,"id":"G0227","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Lake of Outrage","items":"Water Stone","directions":"Stone circle: northwestern standing stone.","acquisition":"Hidden pickup","match":"Strong","map":"z_wr0136","records":"a_wr0101.bin|17|hiddenItem|6|0","candidatePoints":1,"id":"G0228","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Lake of Outrage","items":"Thunder Stone","directions":"Stone circle: northern standing stone.","acquisition":"Hidden pickup","match":"Strong","map":"z_wr0136","records":"a_wr0101.bin|17|hiddenItem|5|0","candidatePoints":1,"id":"G0229","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Lake of Outrage","items":"Fire Stone","directions":"Stone circle: northeastern standing stone.","acquisition":"Hidden pickup","match":"Strong","map":"z_wr0136","records":"a_wr0101.bin|17|hiddenItem|4|0","candidatePoints":1,"id":"G0230","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Lake of Outrage","items":"Dusk Stone","directions":"Stone circle: eastern standing stone.","acquisition":"Hidden pickup","match":"Strong","map":"z_wr0136","records":"a_wr0101.bin|17|hiddenItem|3|0","candidatePoints":1,"id":"G0231","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Lake of Outrage","items":"Shiny Stone","directions":"Stone circle: southeastern standing stone.","acquisition":"Hidden pickup","match":"Strong","map":"z_wr0136","records":"a_wr0101.bin|17|hiddenItem|2|0","candidatePoints":1,"id":"G0232","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Lake of Outrage","items":"Yache Berry; Shuca Berry; Charti Berry; Haban Berry; Petaya Berry; Apicot Berry; Leftovers","directions":"Shake the tree with this item pool.","acquisition":"Berry tree","match":"Strong","map":"z_wr0136","records":"a_wr0101.bin|17|BerryTree|0|-","candidatePoints":1,"id":"G0233","reason":"Same map, pickup type and complete listed item set. Tree item and rate fields are read only in the current editor.","edition":"Both","source":"Bulbapedia"},
			{"location":"Meetup Spot","items":"Poké Doll ×5","directions":"Station entrance: speak to backpacker.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0234","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Meetup Spot","items":"Pokémon Box Link","directions":"Rolling Fields fence: speak to Sonia.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0235","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Postwick","items":"Potion ×3; Adventure Guide; Fishing Rod","directions":"Home: collect your starting bag.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0236","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Postwick","items":"Poké Ball ×5","directions":"Home: Mum's gift before first Wedgehurst visit.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0237","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Postwick","items":"Max Revive ×3","directions":"Sonia's gift after Rose interrupts tournament.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0238","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Postwick","items":"Master Ball","directions":"Home: Magnolia's gift after becoming Champion.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0239","postGame":true,"reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Wedgehurst","items":"Potion","directions":"Lab entrance: man after receiving Pokédex.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0241","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Wedgehurst","items":"Rare Candy","directions":"Search trees east of laboratory entrance.","acquisition":"Visible pickup","match":"Strong","map":"z_t0201","records":"a_0101.bin|2|fieldItem|0|-","candidatePoints":1,"id":"G0242","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Wedgehurst","items":"Poké Doll","directions":"Check the boutique's western side.","acquisition":"Visible pickup","match":"Strong","map":"z_t0201","records":"a_0101.bin|2|fieldItem|1|-","candidatePoints":1,"id":"G0243","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Wedgehurst","items":"Lum Berry","directions":"Route 2 stairs: inspect rock atop them.","acquisition":"Hidden pickup","match":"Strong","map":"z_t0201","records":"a_0101.bin|2|hiddenItem|0|0","candidatePoints":1,"id":"G0244","reason":"Same map, pickup type and complete listed item set.","edition":"Sword","source":"Royal Sword game data"},
			{"location":"Wedgehurst","items":"TM40 (Swift)","directions":"Station: Hop after Route 2 battle.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0245","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Wedgehurst","items":"Camping Gear","directions":"Station: Mum before first train departure.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0246","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Motostoke","items":"Oran Berry","directions":"Trade for Cheekers; check held item.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0248","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Motostoke","items":"Nugget","directions":"Center west: gear side walkway's end.","acquisition":"Hidden pickup","match":"Strong","map":"z_c0101","records":"a_0201.bin|0|hiddenItem|2|0","candidatePoints":1,"id":"G0249","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Motostoke","items":"TR13 (Focus Energy)","directions":"Main street's left record shop: man outside.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0250","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Motostoke","items":"Poké Ball","directions":"Lower eastern street: inspect rubbish bin.","acquisition":"Hidden pickup","match":"Strong","map":"z_c0101","records":"a_0201.bin|0|hiddenItem|0|0","candidatePoints":1,"id":"G0251","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Motostoke","items":"Super Potion","directions":"Overpass: inspect northwestern support base.","acquisition":"Hidden pickup","match":"Strong","map":"z_c0101","records":"a_0201.bin|0|hiddenItem|1|0","candidatePoints":1,"id":"G0252","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Motostoke","items":"Hi-tech Earbuds","directions":"Right record shop: speak to man.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0253","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Motostoke","items":"Paralyze Heal ×2","directions":"Lift's right side: inspect nearby gear.","acquisition":"Hidden pickup","match":"Strong","map":"z_c0101","records":"a_0201.bin|0|hiddenItem|3|0","candidatePoints":1,"id":"G0254","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Motostoke","items":"Miracle Seed","directions":"Lift: Leon's gift for choosing Grookey.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0255","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Motostoke","items":"Charcoal","directions":"Lift: Leon's gift for choosing Scorbunny.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0256","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Motostoke","items":"Mystic Water","directions":"Lift: Leon's gift for choosing Sobble.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0257","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Motostoke","items":"Great Ball ×3","directions":"Southwestern walkway: follow to its end.","acquisition":"Visible pickup","match":"Strong","map":"z_c0101","records":"a_0201.bin|0|fieldItem|4|-","candidatePoints":1,"id":"G0258","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Motostoke","items":"Black Glasses","directions":"Uniform Shop: narrow passage along west side.","acquisition":"Visible pickup","match":"Strong","map":"z_c0101","records":"a_0201.bin|0|fieldItem|1|-","candidatePoints":1,"id":"G0259","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Motostoke","items":"Revival Herb","directions":"Uniform Shop east: hedge surrounded tree.","acquisition":"Hidden pickup","match":"Strong","map":"z_c0101","records":"a_0201.bin|0|hiddenItem|4|0","candidatePoints":1,"id":"G0260","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Motostoke","items":"TM02 (Pay Day)","directions":"Inn's southern stairs: descend to containers.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0261","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Motostoke","items":"Poké Ball","directions":"Stadium frontage: speak to Ball Guy.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0262","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Motostoke","items":"Fresh Water","directions":"Minccino quest: whistle at eastern fountain before completion.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0263","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Motostoke","items":"Repel","directions":"Stadium lawn: inspect eastern fountain surroundings.","acquisition":"Hidden pickup","match":"Strong","map":"z_c0101","records":"a_0201.bin|0|hiddenItem|5|0","candidatePoints":1,"id":"G0264","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Motostoke","items":"Burn Heal ×3","directions":"Stadium lawn's northwest corner: three Burn Heals.","acquisition":"Visible pickup","match":"Strong","map":"z_c0101","records":"a_0201.bin|0|fieldItem|2|-","candidatePoints":1,"id":"G0265","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Motostoke","items":"Burn Heal ×2","directions":"Defeat Marnie at inn: two Burn Heals.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0266","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Motostoke","items":"Throat Spray","directions":"Return missing Minccino to boy near Center.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0267","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Motostoke","items":"Silk Scarf","directions":"Upper Center southeast: beside container pair.","acquisition":"Visible pickup","match":"Strong","map":"z_c0101","records":"a_0201.bin|0|fieldItem|0|-","candidatePoints":1,"id":"G0268","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Motostoke","items":"Poké Doll","directions":"Southern bridge lawn: above northeastern bench.","acquisition":"Hidden pickup","match":"Strong","map":"z_c0101","records":"a_0201.bin|0|hiddenItem|7|0","candidatePoints":1,"id":"G0269","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Motostoke","items":"X Accuracy","directions":"Inn south: container's eastern side.","acquisition":"Hidden pickup","match":"Strong","map":"z_c0101","records":"a_0201.bin|0|hiddenItem|6|0","candidatePoints":1,"id":"G0270","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Motostoke","items":"Star Piece","directions":"Inn's leftmost room: speak to man.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0271","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Motostoke","items":"TM17 (Light Screen)","directions":"Upper Pokémon Center: buy from TM counter.","acquisition":"Shop purchase","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"W0013","reason":"Sold by an NPC. Shop inventory belongs to another workflow, not a placed pickup.","edition":"Both","source":"GameWith"},
			{"location":"Motostoke","items":"TM18 (Reflect)","directions":"Upper Pokémon Center: buy from TM counter.","acquisition":"Shop purchase","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"W0014","reason":"Sold by an NPC. Shop inventory belongs to another workflow, not a placed pickup.","edition":"Both","source":"GameWith"},
			{"location":"Motostoke","items":"TM19 (Safeguard)","directions":"Upper Pokémon Center: buy from TM counter.","acquisition":"Shop purchase","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"W0015","reason":"Sold by an NPC. Shop inventory belongs to another workflow, not a placed pickup.","edition":"Both","source":"GameWith"},
			{"location":"Motostoke","items":"TM25 (Protect)","directions":"Upper Pokémon Center: buy from TM counter.","acquisition":"Shop purchase","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"W0016","reason":"Sold by an NPC. Shop inventory belongs to another workflow, not a placed pickup.","edition":"Both","source":"GameWith"},
			{"location":"Motostoke","items":"TM38 (Will-o-Wisp)","directions":"Defeat Kabu for gym TM.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"W0017","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"GameWith"},
			{"location":"Motostoke","items":"TM41 (Helping Hand)","directions":"Upper Pokémon Center: buy from TM counter.","acquisition":"Shop purchase","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"W0018","reason":"Sold by an NPC. Shop inventory belongs to another workflow, not a placed pickup.","edition":"Both","source":"GameWith"},
			{"location":"Motostoke","items":"TM76 (Round)","directions":"Upper Pokémon Center: buy from TM counter.","acquisition":"Shop purchase","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"W0019","reason":"Sold by an NPC. Shop inventory belongs to another workflow, not a placed pickup.","edition":"Both","source":"GameWith"},
			{"location":"Turffield","items":"Energy Root","directions":"Town southeast: fence east of Center.","acquisition":"Hidden pickup","match":"Strong","map":"z_t0301","records":"a_0301.bin|1|hiddenItem|1|0","candidatePoints":1,"id":"G0276","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Turffield","items":"Everstone","directions":"Stadium approach: short southeastern branch path.","acquisition":"Hidden pickup","match":"Strong","map":"z_t0301","records":"a_0301.bin|1|hiddenItem|2|0","candidatePoints":1,"id":"G0277","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Turffield","items":"TM97 (Brutal Swing)","directions":"Stadium perimeter: southeastern fenced section.","acquisition":"Visible pickup","match":"Strong","map":"z_t0301","records":"a_0301.bin|1|fieldItem|2|-","candidatePoints":1,"id":"G0278","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Turffield","items":"Max Revive","directions":"Stadium perimeter: southwestern fenced section.","acquisition":"Visible pickup","match":"Strong","map":"z_t0301","records":"a_0301.bin|1|fieldItem|1|-","candidatePoints":1,"id":"G0279","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Turffield","items":"X Attack ×3","directions":"Hilltop approach: beside Flying stone.","acquisition":"Visible pickup","match":"Strong","map":"z_t0301","records":"a_0301.bin|1|fieldItem|3|-","candidatePoints":1,"id":"G0280","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Turffield","items":"Leaf Stone","directions":"Hilltop: inspect ground below Water stone.","acquisition":"Hidden pickup","match":"Strong","map":"z_t0301","records":"a_0301.bin|1|hiddenItem|0|0","candidatePoints":1,"id":"G0281","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Turffield","items":"Revive ×2","directions":"Hilltop: receive Sonia's gifts.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0282","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Turffield","items":"Fresh Water","directions":"Hilltop: inspect smallest drinking fountain.","acquisition":"Hidden pickup","match":"Strong","map":"z_t0301","records":"a_0301.bin|1|hiddenItem|3|0","candidatePoints":1,"id":"G0283","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Turffield","items":"Expert Belt","directions":"Hear legend; inspect Grass, Water, Fire stones sequentially.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0284","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Turffield","items":"TM11 (Solar Beam)","directions":"Water Bike: reach northeastern isolated land.","acquisition":"Visible pickup","match":"Strong","map":"z_t0301","records":"a_0301.bin|1|fieldItem|0|-","candidatePoints":1,"id":"G0285","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Turffield","items":"Friend Ball","directions":"Stadium: receive gift from Ball Guy.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"W0022","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"GameWith"},
			{"location":"Hulbury","items":"Shell Bell","directions":"Southern jetty: follow to northern end.","acquisition":"Visible pickup","match":"Strong","map":"z_t0401","records":"a_0401.bin|0|fieldItem|1|-","candidatePoints":1,"id":"G0286","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Hulbury","items":"Magnet","directions":"Check the market's southwestern corner.","acquisition":"Visible pickup","match":"Strong","map":"z_t0401","records":"a_0401.bin|0|fieldItem|2|-","candidatePoints":1,"id":"G0287","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Hulbury","items":"X Sp. Def","directions":"Market: inspect eastern broken fence.","acquisition":"Hidden pickup","match":"Strong","map":"z_t0401","records":"a_0401.bin|0|hiddenItem|0|0","candidatePoints":1,"id":"G0288","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Hulbury","items":"Full Heal","directions":"Station stairway: inspect its base.","acquisition":"Hidden pickup","match":"Strong","map":"z_t0401","records":"a_0401.bin|0|hiddenItem|2|0","candidatePoints":1,"id":"G0289","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Hulbury","items":"X Speed ×2","directions":"Station frontage: inspect eastern lamppost.","acquisition":"Hidden pickup","match":"Strong","map":"z_t0401","records":"a_0401.bin|0|hiddenItem|1|0","candidatePoints":1,"id":"G0290","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Hulbury","items":"Net Ball ×5","directions":"Eastern circular pier: explore southern edge.","acquisition":"Visible pickup","match":"Strong","map":"z_t0401","records":"a_0401.bin|0|fieldItem|0|-","candidatePoints":1,"id":"G0291","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Hulbury","items":"Super Potion ×2","directions":"Northern jetty: search east of bins.","acquisition":"Hidden pickup","match":"Strong","map":"z_t0401","records":"a_0401.bin|0|hiddenItem|3|0","candidatePoints":1,"id":"G0292","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Hulbury","items":"TM82 (Electroweb)","directions":"Walk behind lighthouse to northeastern jetty.","acquisition":"Visible pickup","match":"Strong","map":"z_t0401","records":"a_0401.bin|0|fieldItem|3|-","candidatePoints":1,"id":"G0294","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Hulbury","items":"TM79 (Retaliate)","directions":"Water Badge: Sonia at Captain's Table.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0296","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Hulbury","items":"Exp. Candy L","directions":"Champion: station side house, first food delivery recipient.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0297","postGame":true,"reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Hulbury","items":"Nugget ×5","directions":"Champion: restaurant's first delivery reward.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0298","postGame":true,"reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Hulbury","items":"Big Nugget ×2","directions":"Champion: restaurant's second delivery reward.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0299","postGame":true,"reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Hulbury","items":"Lucky Egg","directions":"Champion: restaurant's third delivery reward.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0300","postGame":true,"reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Hulbury","items":"Lure Ball","directions":"Stadium: receive gift from Ball Guy.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"W0027","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"GameWith"},
			{"location":"Hammerlocke","items":"Soothe Bell","directions":"First house east of stadium: girl.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0301","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Hammerlocke","items":"Focus Sash","directions":"Central Center's western house: defeat Brian.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0304","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Hammerlocke","items":"Super Repel","directions":"Salon northwest: inspect pillar base.","acquisition":"Hidden pickup","match":"Strong","map":"z_c0201","records":"a_0501.bin|0|hiddenItem|3|0","candidatePoints":1,"id":"G0305","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Hammerlocke","items":"Hyper Potion ×2","directions":"Salon northwest: walk behind pillar.","acquisition":"Visible pickup","match":"Strong","map":"z_c0201","records":"a_0501.bin|0|fieldItem|2|-","candidatePoints":1,"id":"G0306","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Hammerlocke","items":"X Attack ×2","directions":"Western Center: inspect ground outside.","acquisition":"Hidden pickup","match":"Strong","map":"z_c0201","records":"a_0501.bin|0|hiddenItem|2|0","candidatePoints":1,"id":"G0307","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Hammerlocke","items":"Muscle Band","directions":"Western Center court: explore eastern edge.","acquisition":"Visible pickup","match":"Strong","map":"z_c0201","records":"a_0501.bin|0|fieldItem|3|-","candidatePoints":1,"id":"G0308","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Hammerlocke","items":"Nugget","directions":"Behind sign, beside second northern planter.","acquisition":"Hidden pickup","match":"Strong","map":"z_c0201","records":"a_0501.bin|0|hiddenItem|1|0","candidatePoints":1,"id":"G0309","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Hammerlocke","items":"Dire Hit","directions":"Southern Center: inspect corner to east.","acquisition":"Hidden pickup","match":"Strong","map":"z_c0201","records":"a_0501.bin|0|hiddenItem|4|0","candidatePoints":1,"id":"G0310","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Hammerlocke","items":"Heat Rock","directions":"Station road's second house: gentleman, first visit.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0311","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Hammerlocke","items":"Damp Rock","directions":"Weather rock gentleman: return next day.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0312","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Hammerlocke","items":"Icy Rock","directions":"Weather rock gentleman: return the following day.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0313","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Hammerlocke","items":"Smooth Rock","directions":"Weather rock gentleman: collect fourth day's rock.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0314","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Hammerlocke","items":"Utility Umbrella","directions":"Weather rock gentleman: after collecting all four rocks.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0315","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Hammerlocke","items":"Old Letter","directions":"Station side castle: speak to Paula.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0316","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Hammerlocke","items":"Reaper Cloth","directions":"Deliver Paula's letter; inspect her former spot.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0317","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Hammerlocke","items":"Strawberry Sweet","directions":"Station's Ball statue: southwestern side.","acquisition":"Visible pickup","match":"Strong","map":"z_c0201","records":"a_0501.bin|0|fieldItem|4|-","candidatePoints":1,"id":"G0318","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Hammerlocke","items":"Rare Candy","directions":"Station's Ball statue: northeastern corner.","acquisition":"Hidden pickup","match":"Strong","map":"z_c0201","records":"a_0501.bin|0|hiddenItem|0|0","candidatePoints":1,"id":"G0319","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Hammerlocke","items":"Wise Glasses","directions":"Station's Ball statue: eastern side.","acquisition":"Visible pickup","match":"Strong","map":"z_c0201","records":"a_0501.bin|0|fieldItem|0|-","candidatePoints":1,"id":"G0320","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Hammerlocke","items":"TM29 (Charm)","directions":"Vault rooftop: follow southern wall.","acquisition":"Visible pickup","match":"Strong","map":"z_c0201","records":"a_0501.bin|0|fieldItem|1|-","candidatePoints":1,"id":"G0322","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Hammerlocke","items":"Revive ×2","directions":"Vault: receive Sonia's gifts.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0323","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Hammerlocke","items":"Tart Apple; Sweet Apple","directions":"Vault side boy: lend an Applin.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0324","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Tart Apple: Sword; Sweet Apple: Shield","source":"Bulbapedia"},
			{"location":"Hammerlocke","items":"Level Ball","directions":"Stadium: receive gift from Ball Guy.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"W0031","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"GameWith"},
			{"location":"Hammerlocke","items":"TM13 (Fire Spin)","directions":"Pokémon Center on the Route 6 side: buy from the TM counter.","acquisition":"Shop purchase","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"W0040","reason":"Sold by an NPC. Shop inventory belongs to another workflow, not a placed pickup.","edition":"Both","source":"GameWith"},
			{"location":"Hammerlocke","items":"TM23 (Thief)","directions":"Pokémon Center on the Route 6 side: buy from the TM counter.","acquisition":"Shop purchase","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"W0041","reason":"Sold by an NPC. Shop inventory belongs to another workflow, not a placed pickup.","edition":"Both","source":"GameWith"},
			{"location":"Hammerlocke","items":"TM32 (Sandstorm)","directions":"Pokémon Center on the Route 6 side: buy from the TM counter.","acquisition":"Shop purchase","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"W0042","reason":"Sold by an NPC. Shop inventory belongs to another workflow, not a placed pickup.","edition":"Both","source":"GameWith"},
			{"location":"Hammerlocke","items":"TM34 (Sunny Day)","directions":"Pokémon Center on the Route 6 side: buy from the TM counter.","acquisition":"Shop purchase","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"W0043","reason":"Sold by an NPC. Shop inventory belongs to another workflow, not a placed pickup.","edition":"Both","source":"GameWith"},
			{"location":"Hammerlocke","items":"TM35 (Hail)","directions":"Pokémon Center on the Route 6 side: buy from the TM counter.","acquisition":"Shop purchase","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"W0044","reason":"Sold by an NPC. Shop inventory belongs to another workflow, not a placed pickup.","edition":"Both","source":"GameWith"},
			{"location":"Hammerlocke","items":"TM50 (Bullet Seed)","directions":"Pokémon Center on the Route 6 side: buy from the TM counter.","acquisition":"Shop purchase","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"W0045","reason":"Sold by an NPC. Shop inventory belongs to another workflow, not a placed pickup.","edition":"Both","source":"GameWith"},
			{"location":"Hammerlocke","items":"TM55 (Brine)","directions":"Pokémon Center on the Route 6 side: buy from the TM counter.","acquisition":"Shop purchase","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"W0046","reason":"Sold by an NPC. Shop inventory belongs to another workflow, not a placed pickup. GameWith lists TM50 (Brine); normalized to TM55 (Brine) using game item/machine names.","edition":"Both","source":"GameWith"},
			{"location":"Hammerlocke","items":"TM00 (Mega Punch)","directions":"Pokémon Center: buy from TM counter.","acquisition":"Shop purchase","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"W0047","reason":"Sold by an NPC. Shop inventory belongs to another workflow, not a placed pickup.","edition":"Both","source":"GameWith"},
			{"location":"Hammerlocke","items":"TM01 (Mega Kick)","directions":"Pokémon Center: buy from TM counter.","acquisition":"Shop purchase","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"W0048","reason":"Sold by an NPC. Shop inventory belongs to another workflow, not a placed pickup. GameWith lists TM00 (Mega Kick); normalized to TM01 (Mega Kick) using game item/machine names.","edition":"Both","source":"GameWith"},
			{"location":"Hammerlocke","items":"TM46 (Weather Ball)","directions":"Pokémon Center: buy from TM counter.","acquisition":"Shop purchase","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"W0049","reason":"Sold by an NPC. Shop inventory belongs to another workflow, not a placed pickup.","edition":"Both","source":"GameWith"},
			{"location":"Hammerlocke","items":"TM66 (Thunder Fang)","directions":"Pokémon Center: buy from TM counter.","acquisition":"Shop purchase","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"W0050","reason":"Sold by an NPC. Shop inventory belongs to another workflow, not a placed pickup.","edition":"Both","source":"GameWith"},
			{"location":"Hammerlocke","items":"TM67 (Ice Fang)","directions":"Pokémon Center: buy from TM counter.","acquisition":"Shop purchase","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"W0051","reason":"Sold by an NPC. Shop inventory belongs to another workflow, not a placed pickup.","edition":"Both","source":"GameWith"},
			{"location":"Hammerlocke","items":"TM68 (Fire Fang)","directions":"Pokémon Center: buy from TM counter.","acquisition":"Shop purchase","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"W0052","reason":"Sold by an NPC. Shop inventory belongs to another workflow, not a placed pickup.","edition":"Both","source":"GameWith"},
			{"location":"Hammerlocke","items":"TM88 (Grassy Terrain)","directions":"Pokémon Center: buy from TM counter.","acquisition":"Shop purchase","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"W0053","reason":"Sold by an NPC. Shop inventory belongs to another workflow, not a placed pickup.","edition":"Both","source":"GameWith"},
			{"location":"Hammerlocke","items":"TM89 (Misty Terrain)","directions":"Pokémon Center: buy from TM counter.","acquisition":"Shop purchase","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"W0054","reason":"Sold by an NPC. Shop inventory belongs to another workflow, not a placed pickup.","edition":"Both","source":"GameWith"},
			{"location":"Hammerlocke","items":"TM90 (Electric Terrain)","directions":"Pokémon Center: buy from TM counter.","acquisition":"Shop purchase","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"W0055","reason":"Sold by an NPC. Shop inventory belongs to another workflow, not a placed pickup.","edition":"Both","source":"GameWith"},
			{"location":"Hammerlocke","items":"TM91 (Psychic Terrain)","directions":"Pokémon Center: buy from TM counter.","acquisition":"Shop purchase","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"W0056","reason":"Sold by an NPC. Shop inventory belongs to another workflow, not a placed pickup.","edition":"Both","source":"GameWith"},
			{"location":"Stow-on-Side","items":"Dusk Stone","directions":"Walk behind Center; check corner.","acquisition":"Visible pickup","match":"Strong","map":"z_t0501","records":"a_0601.bin|1|fieldItem|3|-","candidatePoints":1,"id":"G0325","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Stow-on-Side","items":"Fossilized Bird ×2; Fossilized Drake ×2","directions":"Inside Center: speak to left hand man.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0326","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Fossilized Bird ×2: Sword; Fossilized Drake ×2: Shield","source":"Bulbapedia"},
			{"location":"Stow-on-Side","items":"Rare Bone ×3","directions":"Southern ladders: lower level's bag pile.","acquisition":"Hidden pickup","match":"Strong","map":"z_t0501","records":"a_0601.bin|1|hiddenItem|0|0","candidatePoints":1,"id":"G0327","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Stow-on-Side","items":"Rocky Helmet","directions":"Southern ladders: explore lower level.","acquisition":"Visible pickup","match":"Strong","map":"z_t0501","records":"a_0601.bin|1|fieldItem|0|-","candidatePoints":1,"id":"G0328","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Stow-on-Side","items":"Metal Coat","directions":"Western ladder: inspect rooftop.","acquisition":"Hidden pickup","match":"Strong","map":"z_t0501","records":"a_0601.bin|1|hiddenItem|3|0","candidatePoints":1,"id":"G0329","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Stow-on-Side","items":"TM74 (Venoshock)","directions":"Western ladder: collect rooftop TM.","acquisition":"Visible pickup","match":"Strong","map":"z_t0501","records":"a_0601.bin|1|fieldItem|1|-","candidatePoints":1,"id":"G0330","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Stow-on-Side","items":"X Sp. Atk ×2","directions":"Inspect ground left of Bronzong.","acquisition":"Hidden pickup","match":"Strong","map":"z_t0501","records":"a_0601.bin|1|hiddenItem|1|0","candidatePoints":1,"id":"G0331","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Stow-on-Side","items":"TM06 (Fly)","directions":"House below stairs: speak to cabbie.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0333","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Stow-on-Side","items":"Cracked Pot","directions":"Stairway's right hand ladder: reach roof.","acquisition":"Visible pickup","match":"Strong","map":"z_t0501","records":"a_0601.bin|1|fieldItem|2|-","candidatePoints":1,"id":"G0334","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Stow-on-Side","items":"Max Revive","directions":"Mural approach: first platform's left side.","acquisition":"Hidden pickup","match":"Strong","map":"z_t0501","records":"a_0601.bin|1|hiddenItem|2|0","candidatePoints":1,"id":"G0335","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Stow-on-Side","items":"Revive ×2","directions":"Mural collapse: receive Sonia's gifts.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0336","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Stow-on-Side","items":"Beast Ball","directions":"Champion: speak to bargain merchant.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0337","postGame":true,"reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Stow-on-Side","items":"Soul Dew","directions":"Bargain merchant: own Latias or Latios.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0338","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Stow-on-Side","items":"Adamant Orb","directions":"Bargain merchant: own Dialga.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0339","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Stow-on-Side","items":"Lustrous Orb","directions":"Bargain merchant: own Palkia.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0340","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Stow-on-Side","items":"Griseous Orb","directions":"Bargain merchant: own Giratina.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0341","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Stow-on-Side","items":"Reveal Glass","directions":"Bargain merchant: own Tornadus, Thundurus or Landorus.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0342","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Stow-on-Side","items":"DNA Splicers","directions":"Bargain merchant: own Kyurem.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0343","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Stow-on-Side","items":"Shock Drive; Burn Drive; Chill Drive; Douse Drive","directions":"Bargain merchant: own Genesect.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0344","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Stow-on-Side","items":"Zygarde Cube","directions":"Bargain merchant: own Zygarde.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0345","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Stow-on-Side","items":"N-Solarizer; N-Lunarizer","directions":"Bargain merchant: own Necrozma.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0346","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Stow-on-Side","items":"Heavy Ball","directions":"Stadium: receive gift from Ball Guy.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"W0060","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"GameWith"},
			{"location":"Stow-on-Side","items":"TM42 (Revenge) *Sword Only","directions":"Defeat Bea (Sword) for gym TM.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"W0064","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Sword","source":"GameWith"},
			{"location":"Stow-on-Side","items":"TM77 (Hex) *Shield Only","directions":"Defeat Allister (Shield) for gym TM.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"W0065","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Shield","source":"GameWith"},
			{"location":"Ballonlea","items":"TM78 (Acrobatics)","directions":"Southern house's neighbor: wear Fire tracksuit jacket.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0347","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Ballonlea","items":"Choice Scarf","directions":"Southern house: deliver Paula's letter to Frank.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0348","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Ballonlea","items":"Big Mushroom ×2","directions":"Between houses: inspect orange mushrooms.","acquisition":"Hidden pickup","match":"Strong","map":"z_t0601","records":"a_0701.bin|0|hiddenItem|1|0","candidatePoints":1,"id":"G0349","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Ballonlea","items":"TM77 (Hex); TM42 (Revenge)","directions":"Northern house: speak to elderly woman.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0350","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"TM77 (Hex): Sword; TM42 (Revenge): Shield","source":"Bulbapedia"},
			{"location":"Ballonlea","items":"Eviolite","directions":"Northern house: defeat Breeder Elena.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0351","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Ballonlea","items":"TM21 (Rest)","directions":"Center northeast: beside tall green mushrooms.","acquisition":"Visible pickup","match":"Strong","map":"z_t0601","records":"a_0701.bin|0|fieldItem|0|-","candidatePoints":1,"id":"G0352","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Ballonlea","items":"Balm Mushroom","directions":"Center's eastern ledge: inspect pink mushrooms.","acquisition":"Hidden pickup","match":"Strong","map":"z_t0601","records":"a_0701.bin|0|hiddenItem|0|0","candidatePoints":1,"id":"G0353","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Circhester","items":"Snowball","directions":"Hero's Bath: descend western stairs.","acquisition":"Hidden pickup","match":"Strong","map":"z_t0701","records":"a_0901.bin|0|hiddenItem|0|0","candidatePoints":1,"id":"G0354","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Circhester","items":"Poké Doll","directions":"Hero's Bath: descend eastern stairs.","acquisition":"Hidden pickup","match":"Strong","map":"z_t0701","records":"a_0901.bin|0|hiddenItem|4|0","candidatePoints":1,"id":"G0355","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Circhester","items":"Lemonade","directions":"Hero's Bath: inspect western edge.","acquisition":"Hidden pickup","match":"Strong","map":"z_t0701","records":"a_0901.bin|0|hiddenItem|3|0","candidatePoints":1,"id":"G0356","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Circhester","items":"TM51 (Icicle Spear)","directions":"Hero's Bath: explore eastern edge.","acquisition":"Visible pickup","match":"Strong","map":"z_t0701","records":"a_0901.bin|0|fieldItem|0|-","candidatePoints":1,"id":"G0357","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Circhester","items":"X Sp. Atk ×2","directions":"Stadium west: inspect corner's snow pile.","acquisition":"Hidden pickup","match":"Strong","map":"z_t0701","records":"a_0901.bin|0|hiddenItem|2|0","candidatePoints":1,"id":"G0358","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Circhester","items":"TM27 (Icy Wind); TM48 (Rock Tomb)","directions":"Western street's southernmost house: man inside.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0359","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"TM27 (Icy Wind): Sword; TM48 (Rock Tomb): Shield","source":"Bulbapedia"},
			{"location":"Circhester","items":"Catching Charm","directions":"Western hotel upstairs: leftmost room's director.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0360","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Circhester","items":"Oval Charm","directions":"Champion: defeat Morimoto, western hotel upstairs room two.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0361","postGame":true,"reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Circhester","items":"Shiny Charm","directions":"Complete Pokédex; revisit western hotel's director.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0362","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Circhester","items":"TM47 (Fake Tears)","directions":"Eastern hotel upstairs: rightmost room's musician.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0363","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Circhester","items":"TM16 (Screech)","directions":"Eastern hotel upstairs: second right room's hiker.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0364","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Circhester","items":"Wide Lens","directions":"Eastern hotel upstairs: solve Howses's berry mystery.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0365","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Circhester","items":"Full Heal ×3","directions":"Before Route 9: southeastern recess, left side.","acquisition":"Hidden pickup","match":"Strong","map":"z_t0701","records":"a_0901.bin|0|hiddenItem|1|0","candidatePoints":1,"id":"G0366","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Spikemuth","items":"Max Revive","directions":"Follow the main street.","acquisition":"Visible pickup","match":"Strong","map":"z_t0801","records":"a_1001.bin|0|fieldItem|0|-","candidatePoints":1,"id":"G0368","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Spikemuth","items":"TM85 (Snarl)","directions":"Defeat Piers for gym rewards.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0369","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Spikemuth","items":"Choice Specs","directions":"Explore below the performance stage.","acquisition":"Visible pickup","match":"Strong","map":"z_t0801","records":"a_1001.bin|0|fieldItem|1|-","candidatePoints":1,"id":"G0370","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Wyndon","items":"Max Revive","directions":"Southern Center: inspect western corner.","acquisition":"Hidden pickup","match":"Strong","map":"z_c0301","records":"a_1101.bin|0|hiddenItem|4|0","candidatePoints":1,"id":"G0372","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Wyndon","items":"Air Balloon","directions":"Hotel frontage: beside telephone booth.","acquisition":"Visible pickup","match":"Strong","map":"z_c0301","records":"a_1101.bin|0|fieldItem|1|-","candidatePoints":1,"id":"G0373","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Wyndon","items":"Big Nugget","directions":"Hotel frontage: inspect ground west of taxi.","acquisition":"Hidden pickup","match":"Strong","map":"z_c0301","records":"a_1101.bin|0|hiddenItem|2|0","candidatePoints":1,"id":"G0374","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Wyndon","items":"Black Sludge","directions":"Western waterfront: search the path.","acquisition":"Hidden pickup","match":"Strong","map":"z_c0301","records":"a_1101.bin|0|hiddenItem|0|0","candidatePoints":1,"id":"G0375","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Wyndon","items":"Nugget","directions":"Waterfront path: search its middle section.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_c0301; z_c0306","records":null,"candidatePoints":2,"id":"G0376","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Wyndon","items":"Rare Candy","directions":"Eastern park: inspect southern central area.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_c0301; z_c0306","records":null,"candidatePoints":2,"id":"G0377","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Wyndon","items":"Grassy Seed","directions":"Eastern park: explore central area.","acquisition":"Visible pickup","match":"Strong","map":"z_c0301","records":"a_1101.bin|0|fieldItem|0|-","candidatePoints":1,"id":"G0378","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Wyndon","items":"Balm Mushroom","directions":"Eastern park: inspect northeastern corner.","acquisition":"Hidden pickup","match":"Strong","map":"z_c0301","records":"a_1101.bin|0|hiddenItem|3|0","candidatePoints":1,"id":"G0379","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Wyndon","items":"Rotom Catalog","directions":"Eastern street, second house from north: defeat Isaac.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0380","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Wyndon","items":"X Speed","directions":"Stadium forecourt: search west of shops.","acquisition":"Hidden pickup","match":"Strong","map":"z_c0301","records":"a_1101.bin|0|hiddenItem|7|0","candidatePoints":1,"id":"G0381","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Wyndon","items":"X Sp. Atk ×2","directions":"Stadium forecourt: search east of stairs.","acquisition":"Hidden pickup","match":"Strong","map":"z_c0301","records":"a_1101.bin|0|hiddenItem|6|0","candidatePoints":1,"id":"G0382","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Wyndon","items":"TM93 (Eerie Impulse)","directions":"Tower forecourt: walk behind sign.","acquisition":"Visible pickup","match":"Strong","map":"z_c0306","records":"a_1106.bin|0|fieldItem|0|-","candidatePoints":1,"id":"G0383","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Wyndon","items":"Rare Candy","directions":"Tower courtyard: inspect southwestern corner.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_c0301; z_c0306","records":null,"candidatePoints":2,"id":"G0384","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Wyndon","items":"Electric Seed","directions":"Explore the tower's western flank.","acquisition":"Visible pickup","match":"Strong","map":"z_c0306","records":"a_1106.bin|0|fieldItem|1|-","candidatePoints":1,"id":"G0385","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Wyndon","items":"Nugget","directions":"Search ground beside tower's western flank.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_c0301; z_c0306","records":null,"candidatePoints":2,"id":"G0386","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Wyndon","items":"Cell Battery","directions":"Explore the tower's eastern flank.","acquisition":"Visible pickup","match":"Strong","map":"z_c0306","records":"a_1106.bin|0|fieldItem|2|-","candidatePoints":1,"id":"G0387","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Wyndon","items":"PP Up","directions":"Search ground beside tower's eastern flank.","acquisition":"Hidden pickup","match":"Strong","map":"z_c0306","records":"a_1106.bin|0|hiddenItem|0|0","candidatePoints":1,"id":"G0388","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Wyndon","items":"TM03 (Fire Punch)","directions":"Stadium Pokémon Center: buy from TM counter.","acquisition":"Shop purchase","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"W0088","reason":"Sold by an NPC. Shop inventory belongs to another workflow, not a placed pickup.","edition":"Both","source":"GameWith"},
			{"location":"Wyndon","items":"TM04 (Ice Punch)","directions":"Stadium Pokémon Center: buy from TM counter.","acquisition":"Shop purchase","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"W0089","reason":"Sold by an NPC. Shop inventory belongs to another workflow, not a placed pickup.","edition":"Both","source":"GameWith"},
			{"location":"Wyndon","items":"TM05 (Thunder Punch)","directions":"Stadium Pokémon Center: buy from TM counter.","acquisition":"Shop purchase","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"W0090","reason":"Sold by an NPC. Shop inventory belongs to another workflow, not a placed pickup.","edition":"Both","source":"GameWith"},
			{"location":"Wyndon","items":"TM08 (Hyper Beam)","directions":"Stadium Pokémon Center: buy from TM counter.","acquisition":"Shop purchase","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"W0091","reason":"Sold by an NPC. Shop inventory belongs to another workflow, not a placed pickup.","edition":"Both","source":"GameWith"},
			{"location":"Wyndon","items":"TM09 (Giga Impact)","directions":"Stadium Pokémon Center: buy from TM counter.","acquisition":"Shop purchase","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"W0092","reason":"Sold by an NPC. Shop inventory belongs to another workflow, not a placed pickup.","edition":"Both","source":"GameWith"},
			{"location":"Wyndon","items":"TM12 (Solar Blade)","directions":"Stadium Pokémon Center: buy from TM counter.","acquisition":"Shop purchase","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"W0093","reason":"Sold by an NPC. Shop inventory belongs to another workflow, not a placed pickup.","edition":"Both","source":"GameWith"},
			{"location":"Wyndon","items":"TM60 (Power Swap)","directions":"Stadium Pokémon Center: buy from TM counter.","acquisition":"Shop purchase","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"W0094","reason":"Sold by an NPC. Shop inventory belongs to another workflow, not a placed pickup.","edition":"Both","source":"GameWith"},
			{"location":"Wyndon","items":"TM61 (Guard Swap)","directions":"Stadium Pokémon Center: buy from TM counter.","acquisition":"Shop purchase","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"W0095","reason":"Sold by an NPC. Shop inventory belongs to another workflow, not a placed pickup.","edition":"Both","source":"GameWith"},
			{"location":"Wyndon","items":"TM62 (Speed Swap)","directions":"Stadium Pokémon Center: buy from TM counter.","acquisition":"Shop purchase","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"W0096","reason":"Sold by an NPC. Shop inventory belongs to another workflow, not a placed pickup.","edition":"Both","source":"GameWith"},
			{"location":"Wyndon","items":"TM63 (Drain Punch)","directions":"Stadium Pokémon Center: buy from TM counter.","acquisition":"Shop purchase","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"W0097","reason":"Sold by an NPC. Shop inventory belongs to another workflow, not a placed pickup. GameWith lists TM62 (Drain Punch); normalized to TM63 (Drain Punch) using game item/machine names.","edition":"Both","source":"GameWith"},
			{"location":"Wyndon","items":"TM20 (Self-Destruct)","directions":"Battle Tower: buy from right hand TM seller.","acquisition":"Shop purchase","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"W0098","postGame":true,"reason":"Sold by an NPC. Shop inventory belongs to another workflow, not a placed pickup.","edition":"Both","source":"GameWith"},
			{"location":"Wyndon","items":"TM28 (Giga Drain)","directions":"Battle Tower: buy from right hand TM seller.","acquisition":"Shop purchase","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"W0099","postGame":true,"reason":"Sold by an NPC. Shop inventory belongs to another workflow, not a placed pickup.","edition":"Both","source":"GameWith"},
			{"location":"Wyndon","items":"TM44 (Imprison)","directions":"Battle Tower: buy from right hand TM seller.","acquisition":"Shop purchase","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"W0100","postGame":true,"reason":"Sold by an NPC. Shop inventory belongs to another workflow, not a placed pickup.","edition":"Both","source":"GameWith"},
			{"location":"Wyndon","items":"TM52 (Bounce)","directions":"Battle Tower: buy from right hand TM seller.","acquisition":"Shop purchase","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"W0101","postGame":true,"reason":"Sold by an NPC. Shop inventory belongs to another workflow, not a placed pickup.","edition":"Both","source":"GameWith"},
			{"location":"Wyndon","items":"TM59 (Fling)","directions":"Battle Tower: buy from right hand TM seller.","acquisition":"Shop purchase","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"W0102","postGame":true,"reason":"Sold by an NPC. Shop inventory belongs to another workflow, not a placed pickup.","edition":"Both","source":"GameWith"},
			{"location":"Wyndon","items":"TM70 (Trick Room)","directions":"Battle Tower: buy from right hand TM seller.","acquisition":"Shop purchase","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"W0103","postGame":true,"reason":"Sold by an NPC. Shop inventory belongs to another workflow, not a placed pickup.","edition":"Both","source":"GameWith"},
			{"location":"Wyndon","items":"TM71 (Wonder Room)","directions":"Battle Tower: buy from right hand TM seller.","acquisition":"Shop purchase","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"W0104","postGame":true,"reason":"Sold by an NPC. Shop inventory belongs to another workflow, not a placed pickup.","edition":"Both","source":"GameWith"},
			{"location":"Wyndon","items":"TM72 (Magic Room)","directions":"Battle Tower: buy from right hand TM seller.","acquisition":"Shop purchase","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"W0105","postGame":true,"reason":"Sold by an NPC. Shop inventory belongs to another workflow, not a placed pickup.","edition":"Both","source":"GameWith"},
			{"location":"Wyndon","items":"TM83 Razor Shell","directions":"Battle Tower: buy from right hand TM seller.","acquisition":"Shop purchase","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"W0106","postGame":true,"reason":"Sold by an NPC. Shop inventory belongs to another workflow, not a placed pickup.","edition":"Both","source":"GameWith"},
			{"location":"Wyndon","items":"TM92 (Mystical Fire)","directions":"Battle Tower: buy from right hand TM seller.","acquisition":"Shop purchase","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"W0107","postGame":true,"reason":"Sold by an NPC. Shop inventory belongs to another workflow, not a placed pickup.","edition":"Both","source":"GameWith"},
			{"location":"Route 1","items":"Potion","directions":"Southern section: gap between grassy fields.","acquisition":"Visible pickup","match":"Strong","map":"z_r0101","records":"a_0101.bin|1|fieldItem|1|-","candidatePoints":1,"id":"G0389","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 1","items":"Great Ball ×2","directions":"Eastern grass clearing against rock face.","acquisition":"Visible pickup","match":"Strong","map":"z_r0101","records":"a_0101.bin|1|fieldItem|0|-","candidatePoints":1,"id":"G0390","reason":"Same map, pickup type and complete listed item set.","edition":"Sword","source":"Royal Sword game data"},
			{"location":"Route 2","items":"Poké Ball ×20","directions":"Entrance: Leon gives twenty Poké Balls.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0391","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 2","items":"Poké Ball ×3","directions":"Middle ledge: collect three Poké Balls.","acquisition":"Visible pickup","match":"Strong","map":"z_r0201","records":"a_0101.bin|3|fieldItem|1|-","candidatePoints":1,"id":"G0392","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 2","items":"Potion ×2","directions":"Beside the Trainer Tips noticeboard.","acquisition":"Visible pickup","match":"Strong","map":"z_r0201","records":"a_0101.bin|3|fieldItem|0|-","candidatePoints":1,"id":"G0393","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 2","items":"Repel","directions":"Magnolia approach: bare ground east of grass.","acquisition":"Hidden pickup","match":"Strong","map":"z_r0201","records":"a_0101.bin|3|hiddenItem|1|0","candidatePoints":1,"id":"G0394","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 2","items":"Great Ball","directions":"Magnolia's western garden: explore rear corner.","acquisition":"Visible pickup","match":"Strong","map":"z_r0201","records":"a_0101.bin|3|fieldItem|2|-","candidatePoints":1,"id":"G0395","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 2","items":"Fresh Water","directions":"Magnolia's crops: inspect pot by eastern plot.","acquisition":"Hidden pickup","match":"Strong","map":"z_r0201","records":"a_0101.bin|3|hiddenItem|0|0","candidatePoints":1,"id":"G0396","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 2","items":"TM57 (Payback)","directions":"Magnolia's house: follow rear passageway.","acquisition":"Visible pickup","match":"Strong","map":"z_r0201","records":"a_0101.bin|3|fieldItem|3|-","candidatePoints":1,"id":"G0397","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 2","items":"Endorsement","directions":"After Hop battle: receive Leon's endorsement.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0398","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 2","items":"Wishing Star","directions":"After Hop battle: receive Wishing Star.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0399","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 2","items":"Dynamax Band","directions":"After Wishing Star: receive Magnolia's band.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0400","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 2","items":"Choice Band","directions":"Water Bike: east of Magnolia's bridge.","acquisition":"Visible pickup","match":"Strong","map":"z_r0201","records":"a_0101.bin|3|fieldItem|4|-","candidatePoints":1,"id":"G0401","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 2","items":"Rare Candy","directions":"Water Bike: inspect lake island.","acquisition":"Hidden pickup","match":"Strong","map":"z_r0202","records":"a_0101.bin|5|hiddenItem|0|0","candidatePoints":1,"id":"G0402","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 2","items":"PP Max","directions":"Water Bike: explore lake island.","acquisition":"Visible pickup","match":"Strong","map":"z_r0202","records":"a_0101.bin|5|fieldItem|0|-","candidatePoints":1,"id":"G0403","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 2","items":"Lum Berry","directions":"Water Bike: inspect northern lake water.","acquisition":"Hidden pickup","match":"Strong","map":"z_r0202","records":"a_0101.bin|5|hiddenItem|1|0","candidatePoints":1,"id":"G0404","reason":"Same map, pickup type and complete listed item set.","edition":"Sword","source":"Royal Sword game data"},
			{"location":"Route 2","items":"Big Nugget","directions":"Water Bike: inspect lake's northwest corner.","acquisition":"Hidden pickup","match":"Strong","map":"z_r0202","records":"a_0101.bin|5|hiddenItem|2|0","candidatePoints":1,"id":"G0405","reason":"Same map, pickup type and complete listed item set.","edition":"Sword","source":"Royal Sword game data"},
			{"location":"Route 2","items":"TM69 (Psycho Cut)","directions":"Water Bike: explore lake's northwest corner.","acquisition":"Visible pickup","match":"Strong","map":"z_r0202","records":"a_0101.bin|5|fieldItem|2|-","candidatePoints":1,"id":"G0406","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 2","items":"Psychic Seed","directions":"Water Bike: riverbank below Magnolia's house.","acquisition":"Visible pickup","match":"Strong","map":"z_r0202","records":"a_0101.bin|5|fieldItem|1|-","candidatePoints":1,"id":"G0407","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 2","items":"Sitrus Berry","directions":"Water Bike: inspect southern river's end.","acquisition":"Hidden pickup","match":"Strong","map":"z_r0202","records":"a_0101.bin|5|hiddenItem|3|0","candidatePoints":1,"id":"G0408","reason":"Same map, pickup type and complete listed item set.","edition":"Sword","source":"Royal Sword game data"},
			{"location":"Route 3","items":"Big Mushroom","directions":"Motostoke entrance: inspect nearby tree.","acquisition":"Hidden pickup","match":"Strong","map":"z_r0301","records":"a_0201.bin|1|hiddenItem|0|0","candidatePoints":1,"id":"G0409","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 3","items":"Heal Ball ×3","directions":"Motostoke entrance: clearing west of grass.","acquisition":"Visible pickup","match":"Strong","map":"z_r0301","records":"a_0201.bin|1|fieldItem|0|-","candidatePoints":1,"id":"G0410","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 3","items":"Burn Heal","directions":"Inspect ground west of noticeboard.","acquisition":"Hidden pickup","match":"Strong","map":"z_r0301","records":"a_0201.bin|1|hiddenItem|3|0","candidatePoints":1,"id":"G0411","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 3","items":"Escape Rope","directions":"Noticeboard north: speak to Sonia.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0412","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 3","items":"Revive","directions":"Noticeboard hill: inspect northeastern rock.","acquisition":"Hidden pickup","match":"Strong","map":"z_r0301","records":"a_0201.bin|1|hiddenItem|1|0","candidatePoints":1,"id":"G0413","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 3","items":"TM37 (Beat Up)","directions":"Reach ledge adjoining the noticeboard.","acquisition":"Visible pickup","match":"Strong","map":"z_r0301","records":"a_0201.bin|1|fieldItem|3|-","candidatePoints":1,"id":"G0414","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 3","items":"Cheri Berry","directions":"Campsite: speak to Becca.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0415","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 3","items":"X Defense ×2","directions":"Mine entrance: inspect eastern side.","acquisition":"Hidden pickup","match":"Strong","map":"z_r0301","records":"a_0201.bin|1|hiddenItem|2|0","candidatePoints":1,"id":"G0416","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 3","items":"Super Potion","directions":"Mine entrance: explore nearby grass clearing.","acquisition":"Visible pickup","match":"Strong","map":"z_r0301","records":"a_0201.bin|1|fieldItem|2|-","candidatePoints":1,"id":"G0417","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 3","items":"TM54 (Rock Blast)","directions":"Enter mine; emerge onto Route 3 ledge.","acquisition":"Visible pickup","match":"Strong","map":"z_r0301","records":"a_0201.bin|1|fieldItem|1|-","candidatePoints":1,"id":"G0418","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 3","items":"Pecha Berry; Oran Berry; Rawst Berry","directions":"Shake the tree with this item pool.","acquisition":"Berry tree","match":"Strong","map":"z_r0301","records":"a_0201.bin|1|BerryTree|0|-","candidatePoints":1,"id":"G0419","reason":"Same map, pickup type and complete listed item set. Tree item and rate fields are read only in the current editor.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 3","items":"Persim Berry","directions":"Shake the tree with this item pool.","acquisition":"Berry tree","match":"Strong","map":"z_r0301","records":"a_0201.bin|1|BerryTree|0|-","candidatePoints":1,"id":"G0420","reason":"Same map, pickup type and complete listed item set. Tree item and rate fields are read only in the current editor.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 4","items":"Energy Powder","directions":"Mine side fork: inspect bag pile.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_r0401","records":null,"candidatePoints":2,"id":"G0421","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 4","items":"Energy Powder ×2","directions":"Southeastern paddock: northeast crate, two powders.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_r0401","records":null,"candidatePoints":2,"id":"G0422","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 4","items":"Paralyze Heal","directions":"Southeastern paddock: clearing above southern entrance.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_r0401","records":null,"candidatePoints":2,"id":"G0423","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 4","items":"Paralyze Heal","directions":"Northeastern paddock: inspect central fallen pillar.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_r0401","records":null,"candidatePoints":2,"id":"G0424","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 4","items":"Ether","directions":"Southeastern paddock: inspect northwest corner.","acquisition":"Hidden pickup","match":"Strong","map":"z_r0401","records":"a_0301.bin|0|hiddenItem|0|0","candidatePoints":1,"id":"G0425","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 4","items":"Cleanse Tag","directions":"Southeastern paddock: northern central clearing.","acquisition":"Visible pickup","match":"Strong","map":"z_r0401","records":"a_0301.bin|0|fieldItem|1|-","candidatePoints":1,"id":"G0426","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 4","items":"Nest Ball ×3","directions":"Southeastern paddock: central clearing.","acquisition":"Visible pickup","match":"Strong","map":"z_r0401","records":"a_0301.bin|0|fieldItem|0|-","candidatePoints":1,"id":"G0427","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 4","items":"Rare Candy","directions":"Southeastern paddock: inspect southeast corner.","acquisition":"Hidden pickup","match":"Strong","map":"z_r0401","records":"a_0301.bin|0|hiddenItem|5|0","candidatePoints":1,"id":"G0428","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 4","items":"Sharp Beak","directions":"Riverbank east of southeastern paddock.","acquisition":"Visible pickup","match":"Strong","map":"z_r0401","records":"a_0301.bin|0|fieldItem|4|-","candidatePoints":1,"id":"G0429","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 4","items":"Repel","directions":"Western paddock entrance: inspect wheelbarrow.","acquisition":"Hidden pickup","match":"Strong","map":"z_r0401","records":"a_0301.bin|0|hiddenItem|1|0","candidatePoints":1,"id":"G0430","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 4","items":"X Accuracy ×2","directions":"Western paddock: inspect northeast crate.","acquisition":"Hidden pickup","match":"Strong","map":"z_r0401","records":"a_0301.bin|0|hiddenItem|3|0","candidatePoints":1,"id":"G0431","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 4","items":"Energy Root","directions":"Western paddock: inspect western clearing.","acquisition":"Hidden pickup","match":"Strong","map":"z_r0401","records":"a_0301.bin|0|hiddenItem|2|0","candidatePoints":1,"id":"G0432","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 4","items":"Silver Powder","directions":"Western paddock: beneath northwestern tree.","acquisition":"Visible pickup","match":"Strong","map":"z_r0401","records":"a_0301.bin|0|fieldItem|2|-","candidatePoints":1,"id":"G0433","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 4","items":"Revival Herb","directions":"Northeastern paddock: inspect southwest corner.","acquisition":"Hidden pickup","match":"Strong","map":"z_r0401","records":"a_0301.bin|0|hiddenItem|6|0","candidatePoints":1,"id":"G0434","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 4","items":"TM07 (Pin Missile)","directions":"Northeastern paddock: southeastern clearing.","acquisition":"Visible pickup","match":"Strong","map":"z_r0401","records":"a_0301.bin|0|fieldItem|3|-","candidatePoints":1,"id":"G0435","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 4","items":"Cheri Berry; Pecha Berry; Oran Berry; Leppa Berry","directions":"Shake the tree with this item pool.","acquisition":"Berry tree","match":"Strong","map":"z_r0401","records":"a_0301.bin|0|BerryTree|0|-","candidatePoints":1,"id":"G0436","reason":"Same map, pickup type and complete listed item set. Tree item and rate fields are read only in the current editor.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 5","items":"Shed Shell","directions":"Before bridge: northern fenced enclosure.","acquisition":"Visible pickup","match":"Strong","map":"z_r0501","records":"a_0301.bin|2|fieldItem|0|-","candidatePoints":1,"id":"G0437","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 5","items":"Heal Ball ×3","directions":"Before bridge: southwestern clearing beyond grass.","acquisition":"Visible pickup","match":"Strong","map":"z_r0501","records":"a_0301.bin|2|fieldItem|2|-","candidatePoints":1,"id":"G0438","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 5","items":"TM31 (Attract)","directions":"Before bridge: southeastern corner beyond grass.","acquisition":"Visible pickup","match":"Strong","map":"z_r0501","records":"a_0301.bin|2|fieldItem|3|-","candidatePoints":1,"id":"G0439","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 5","items":"Big Mushroom ×2","directions":"Campsite northwest: inspect ground.","acquisition":"Hidden pickup","match":"Strong","map":"z_r0501","records":"a_0301.bin|2|hiddenItem|10|0","candidatePoints":1,"id":"G0440","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 5","items":"Exp. Candy XS ×5","directions":"Nursery: receive candy with Toxel.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0441","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 5","items":"Rotom Bike","directions":"Bridge west: rescue doctor from Team Yell.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0442","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 5","items":"Revive","directions":"Bridge: defeat Hop for a Revive.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0443","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 5","items":"Absorb Bulb","directions":"Beyond bridge: inspect eastern grass clearing.","acquisition":"Hidden pickup","match":"Strong","map":"z_r0501","records":"a_0301.bin|2|hiddenItem|11|0","candidatePoints":1,"id":"G0444","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 5","items":"X Sp. Atk ×3","directions":"Beyond bridge: grass opposite eastern approach.","acquisition":"Visible pickup","match":"Strong","map":"z_r0501","records":"a_0301.bin|2|fieldItem|1|-","candidatePoints":1,"id":"G0445","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 5","items":"Health Feather; Muscle Feather; Resist Feather; Genius Feather; Clever Feather; Swift Feather; Pretty Feather","directions":"Bridge south: second pillar from west.","acquisition":"Hidden pickup","match":"Likely","map":"z_r0501","records":"a_0301.bin|2|hiddenItem|8|0\na_0301.bin|2|hiddenItem|8|1\na_0301.bin|2|hiddenItem|8|2\na_0301.bin|2|hiddenItem|8|3\na_0301.bin|2|hiddenItem|8|4\na_0301.bin|2|hiddenItem|8|5\na_0301.bin|2|hiddenItem|8|6","candidatePoints":1,"id":"G0446","reason":"Assigned by west to east bridge order. The north/south pattern agrees with Z coordinates; pillar identity still needs an in game check.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 5","items":"Health Feather; Muscle Feather; Resist Feather; Genius Feather; Clever Feather; Swift Feather; Pretty Feather","directions":"Bridge north: between western pillars three/four.","acquisition":"Hidden pickup","match":"Likely","map":"z_r0501","records":"a_0301.bin|2|hiddenItem|7|0\na_0301.bin|2|hiddenItem|7|1\na_0301.bin|2|hiddenItem|7|2\na_0301.bin|2|hiddenItem|7|3\na_0301.bin|2|hiddenItem|7|4\na_0301.bin|2|hiddenItem|7|5\na_0301.bin|2|hiddenItem|7|6","candidatePoints":1,"id":"G0447","reason":"Assigned by west to east bridge order. The north/south pattern agrees with Z coordinates; pillar identity still needs an in game check.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 5","items":"Health Feather; Muscle Feather; Resist Feather; Genius Feather; Clever Feather; Swift Feather; Pretty Feather","directions":"Bridge north: fifth pillar from west.","acquisition":"Hidden pickup","match":"Likely","map":"z_r0501","records":"a_0301.bin|2|hiddenItem|9|0\na_0301.bin|2|hiddenItem|9|1\na_0301.bin|2|hiddenItem|9|2\na_0301.bin|2|hiddenItem|9|3\na_0301.bin|2|hiddenItem|9|4\na_0301.bin|2|hiddenItem|9|5\na_0301.bin|2|hiddenItem|9|6","candidatePoints":1,"id":"G0448","reason":"Assigned by west to east bridge order. The north/south pattern agrees with Z coordinates; pillar identity still needs an in game check.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 5","items":"Health Feather; Muscle Feather; Resist Feather; Genius Feather; Clever Feather; Swift Feather; Pretty Feather","directions":"Bridge south: sixth pillar from west.","acquisition":"Hidden pickup","match":"Likely","map":"z_r0501","records":"a_0301.bin|2|hiddenItem|6|0\na_0301.bin|2|hiddenItem|6|1\na_0301.bin|2|hiddenItem|6|2\na_0301.bin|2|hiddenItem|6|3\na_0301.bin|2|hiddenItem|6|4\na_0301.bin|2|hiddenItem|6|5\na_0301.bin|2|hiddenItem|6|6","candidatePoints":1,"id":"G0449","reason":"Assigned by west to east bridge order. The north/south pattern agrees with Z coordinates; pillar identity still needs an in game check.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 5","items":"Health Feather; Muscle Feather; Resist Feather; Genius Feather; Clever Feather; Swift Feather; Pretty Feather","directions":"Bridge center: near western pillar seven.","acquisition":"Hidden pickup","match":"Likely","map":"z_r0501","records":"a_0301.bin|2|hiddenItem|5|0\na_0301.bin|2|hiddenItem|5|1\na_0301.bin|2|hiddenItem|5|2\na_0301.bin|2|hiddenItem|5|3\na_0301.bin|2|hiddenItem|5|4\na_0301.bin|2|hiddenItem|5|5\na_0301.bin|2|hiddenItem|5|6","candidatePoints":1,"id":"G0450","reason":"Assigned by west to east bridge order. The north/south pattern agrees with Z coordinates; pillar identity still needs an in game check.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 5","items":"Health Feather; Muscle Feather; Resist Feather; Genius Feather; Clever Feather; Swift Feather; Pretty Feather","directions":"Bridge south: between eastern pillars six/seven.","acquisition":"Hidden pickup","match":"Likely","map":"z_r0501","records":"a_0301.bin|2|hiddenItem|4|0\na_0301.bin|2|hiddenItem|4|1\na_0301.bin|2|hiddenItem|4|2\na_0301.bin|2|hiddenItem|4|3\na_0301.bin|2|hiddenItem|4|4\na_0301.bin|2|hiddenItem|4|5\na_0301.bin|2|hiddenItem|4|6","candidatePoints":1,"id":"G0451","reason":"Assigned by west to east bridge order. The north/south pattern agrees with Z coordinates; pillar identity still needs an in game check.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 5","items":"Health Feather; Muscle Feather; Resist Feather; Genius Feather; Clever Feather; Swift Feather; Pretty Feather","directions":"Bridge north: sixth pillar from east.","acquisition":"Hidden pickup","match":"Likely","map":"z_r0501","records":"a_0301.bin|2|hiddenItem|3|0\na_0301.bin|2|hiddenItem|3|1\na_0301.bin|2|hiddenItem|3|2\na_0301.bin|2|hiddenItem|3|3\na_0301.bin|2|hiddenItem|3|4\na_0301.bin|2|hiddenItem|3|5\na_0301.bin|2|hiddenItem|3|6","candidatePoints":1,"id":"G0452","reason":"Assigned by west to east bridge order. The north/south pattern agrees with Z coordinates; pillar identity still needs an in game check.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 5","items":"Health Feather; Muscle Feather; Resist Feather; Genius Feather; Clever Feather; Swift Feather; Pretty Feather","directions":"Bridge south: fourth pillar from east.","acquisition":"Hidden pickup","match":"Likely","map":"z_r0501","records":"a_0301.bin|2|hiddenItem|2|0\na_0301.bin|2|hiddenItem|2|1\na_0301.bin|2|hiddenItem|2|2\na_0301.bin|2|hiddenItem|2|3\na_0301.bin|2|hiddenItem|2|4\na_0301.bin|2|hiddenItem|2|5\na_0301.bin|2|hiddenItem|2|6","candidatePoints":1,"id":"G0453","reason":"Assigned by west to east bridge order. The north/south pattern agrees with Z coordinates; pillar identity still needs an in game check.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 5","items":"Health Feather; Muscle Feather; Resist Feather; Genius Feather; Clever Feather; Swift Feather; Pretty Feather","directions":"Bridge north: between eastern pillars two/three.","acquisition":"Hidden pickup","match":"Likely","map":"z_r0501","records":"a_0301.bin|2|hiddenItem|1|0\na_0301.bin|2|hiddenItem|1|1\na_0301.bin|2|hiddenItem|1|2\na_0301.bin|2|hiddenItem|1|3\na_0301.bin|2|hiddenItem|1|4\na_0301.bin|2|hiddenItem|1|5\na_0301.bin|2|hiddenItem|1|6","candidatePoints":1,"id":"G0454","reason":"Assigned by west to east bridge order. The north/south pattern agrees with Z coordinates; pillar identity still needs an in game check.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 5","items":"Health Feather; Muscle Feather; Resist Feather; Genius Feather; Clever Feather; Swift Feather; Pretty Feather","directions":"Bridge south: second pillar from east.","acquisition":"Hidden pickup","match":"Likely","map":"z_r0501","records":"a_0301.bin|2|hiddenItem|0|0\na_0301.bin|2|hiddenItem|0|1\na_0301.bin|2|hiddenItem|0|2\na_0301.bin|2|hiddenItem|0|3\na_0301.bin|2|hiddenItem|0|4\na_0301.bin|2|hiddenItem|0|5\na_0301.bin|2|hiddenItem|0|6","candidatePoints":1,"id":"G0455","reason":"Assigned by west to east bridge order. The north/south pattern agrees with Z coordinates; pillar identity still needs an in game check.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 5","items":"Cheri Berry; Chesto Berry; Persim Berry; Chilan Berry","directions":"Shake the tree with this item pool.","acquisition":"Berry tree","match":"Strong","map":"z_r0501","records":"a_0301.bin|2|BerryTree|0|-","candidatePoints":1,"id":"G0456","reason":"Same map, pickup type and complete listed item set. Tree item and rate fields are read only in the current editor.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 6","items":"Ultra Ball ×3","directions":"Explore ledge beneath Beauty Anita.","acquisition":"Visible pickup","match":"Strong","map":"z_r0601","records":"a_0601.bin|0|fieldItem|3|-","candidatePoints":1,"id":"G0458","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 6","items":"Fossilized Dino ×2; Fossilized Fish ×2","directions":"Campsite south: inspect rock's western side.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_r0601","records":null,"candidatePoints":2,"id":"G0459","reason":"2 physical points share these items. Same map and at least one listed item. Pool or edition differences require review.","edition":"Fossilized Dino ×2: Sword; Fossilized Fish ×2: Shield","source":"Bulbapedia"},
			{"location":"Route 6","items":"TM15 (Dig)","directions":"Explore immediately east of campsite.","acquisition":"Visible pickup","match":"Strong","map":"z_r0601","records":"a_0601.bin|0|fieldItem|2|-","candidatePoints":1,"id":"G0460","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 6","items":"Light Clay","directions":"Southwestern ledge above Backpacker Diane.","acquisition":"Visible pickup","match":"Strong","map":"z_r0601","records":"a_0601.bin|0|fieldItem|0|-","candidatePoints":1,"id":"G0461","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 6","items":"Rare Bone ×2","directions":"Campsite southeast: rocks west of Nicola.","acquisition":"Hidden pickup","match":"Strong","map":"z_r0601","records":"a_0601.bin|0|hiddenItem|2|0","candidatePoints":1,"id":"G0462","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 6","items":"TM30 (Steel Wing)","directions":"Noticeboard southeast: reach clifftop.","acquisition":"Visible pickup","match":"Strong","map":"z_r0601","records":"a_0601.bin|0|fieldItem|1|-","candidatePoints":1,"id":"G0463","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 6","items":"Rare Candy","directions":"Noticeboard: inspect nearby rock frontage.","acquisition":"Hidden pickup","match":"Strong","map":"z_r0601","records":"a_0601.bin|0|hiddenItem|1|0","candidatePoints":1,"id":"G0464","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 6","items":"Sitrus Berry; Rawst Berry; Leppa Berry; Persim Berry","directions":"Shake the tree with this item pool.","acquisition":"Berry tree","match":"Strong","map":"z_r0601","records":"a_0601.bin|0|BerryTree|0|-","candidatePoints":1,"id":"G0465","reason":"Same map, pickup type and complete listed item set. Tree item and rate fields are read only in the current editor.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 7","items":"Ether","directions":"Western bridge east: inspect rock.","acquisition":"Hidden pickup","match":"Strong","map":"z_r0701","records":"a_0801.bin|0|hiddenItem|0|0","candidatePoints":1,"id":"G0466","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 7","items":"Balm Mushroom","directions":"Western bridge northeast: inspect tree.","acquisition":"Hidden pickup","match":"Strong","map":"z_r0701","records":"a_0801.bin|0|hiddenItem|2|0","candidatePoints":1,"id":"G0467","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 7","items":"Quick Ball ×3","directions":"Route 8 entrance: explore southeastern grass.","acquisition":"Visible pickup","match":"Strong","map":"z_r0701","records":"a_0801.bin|0|fieldItem|0|-","candidatePoints":1,"id":"G0468","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 7","items":"TM58 (Assurance)","directions":"Campsite southeast: beside eastern bridge.","acquisition":"Visible pickup","match":"Strong","map":"z_r0701","records":"a_0801.bin|0|fieldItem|2|-","candidatePoints":1,"id":"G0469","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 7","items":"Safety Goggles","directions":"Follow side path beside eastern bridge.","acquisition":"Visible pickup","match":"Strong","map":"z_r0701","records":"a_0801.bin|0|fieldItem|1|-","candidatePoints":1,"id":"G0470","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 7","items":"PP Up","directions":"Route 9 Tunnel northwest: inspect rocks.","acquisition":"Hidden pickup","match":"Strong","map":"z_r0701","records":"a_0801.bin|0|hiddenItem|1|0","candidatePoints":1,"id":"G0471","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 7","items":"Pomeg Berry; Kelpsy Berry; Qualot Berry; Hondew Berry; Grepa Berry; Tamato Berry; Lum Berry","directions":"Shake the tree with this item pool.","acquisition":"Berry tree","match":"Strong","map":"z_r0701","records":"a_0801.bin|0|BerryTree|1|-","candidatePoints":1,"id":"G0472","reason":"Same map, pickup type and complete listed item set. Tree item and rate fields are read only in the current editor.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 7","items":"Aspear Berry; Figy Berry; Mago Berry; Ganlon Berry; Liechi Berry","directions":"Shake the tree with this item pool.","acquisition":"Berry tree","match":"Strong","map":"z_r0701","records":"a_0801.bin|0|BerryTree|0|-","candidatePoints":1,"id":"G0473","reason":"Same map, pickup type and complete listed item set. Tree item and rate fields are read only in the current editor.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 8","items":"Shiny Stone","directions":"Explore the southeastern ledge.","acquisition":"Visible pickup","match":"Strong","map":"z_r0801","records":"a_0802.bin|0|fieldItem|0|-","candidatePoints":1,"id":"G0474","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 8","items":"X Defense ×3","directions":"First stairway: inspect corner at top.","acquisition":"Hidden pickup","match":"Strong","map":"z_r0801","records":"a_0802.bin|0|hiddenItem|0|0","candidatePoints":1,"id":"G0475","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 8","items":"TM96 (Smart Strike)","directions":"Reach ledge above noticeboard.","acquisition":"Visible pickup","match":"Strong","map":"z_r0801","records":"a_0802.bin|0|fieldItem|5|-","candidatePoints":1,"id":"G0476","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 8","items":"Hyper Potion ×3","directions":"Eastern area between the ladders.","acquisition":"Visible pickup","match":"Strong","map":"z_r0801","records":"a_0802.bin|0|fieldItem|1|-","candidatePoints":1,"id":"G0477","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 8","items":"Elixir","directions":"Central route: inspect gap between sloping ledges.","acquisition":"Hidden pickup","match":"Strong","map":"z_r0801","records":"a_0802.bin|0|hiddenItem|1|0","candidatePoints":1,"id":"G0478","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 8","items":"Luxury Ball ×3","directions":"Central route: explore sloping ledge.","acquisition":"Visible pickup","match":"Strong","map":"z_r0801","records":"a_0802.bin|0|fieldItem|2|-","candidatePoints":1,"id":"G0479","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 8","items":"Pixie Plate","directions":"First Falinks opening: inspect southern recess.","acquisition":"Hidden pickup","match":"Strong","map":"z_r0801","records":"a_0802.bin|0|hiddenItem|3|0","candidatePoints":1,"id":"G0480","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 8","items":"Max Revive","directions":"Explore the western recess.","acquisition":"Visible pickup","match":"Strong","map":"z_r0801","records":"a_0802.bin|0|fieldItem|3|-","candidatePoints":1,"id":"G0481","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 8","items":"Big Nugget","directions":"Inspect rock frontage in northwest.","acquisition":"Hidden pickup","match":"Strong","map":"z_r0801","records":"a_0802.bin|0|hiddenItem|4|0","candidatePoints":1,"id":"G0482","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 8","items":"King's Rock","directions":"Northeastern ruins: explore small alcove.","acquisition":"Visible pickup","match":"Strong","map":"z_r0801","records":"a_0802.bin|0|fieldItem|6|-","candidatePoints":1,"id":"G0483","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 8","items":"Nugget","directions":"Northeastern ruins: inspect corner between Falinks holes.","acquisition":"Hidden pickup","match":"Strong","map":"z_r0801","records":"a_0802.bin|0|hiddenItem|2|0","candidatePoints":1,"id":"G0484","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 8","items":"TM43 (Brick Break)","directions":"Northwestern narrow path: follow to end.","acquisition":"Visible pickup","match":"Strong","map":"z_r0801","records":"a_0802.bin|0|fieldItem|4|-","candidatePoints":1,"id":"G0485","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 8","items":"Terrain Extender","directions":"Campsite east: follow path to end.","acquisition":"Visible pickup","match":"Strong","map":"z_r0801","records":"a_0802.bin|0|fieldItem|7|-","candidatePoints":1,"id":"G0486","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 8","items":"Star Piece ×2","directions":"Steamdrift Way: inspect western grass patch.","acquisition":"Hidden pickup","match":"Strong","map":"z_r0901","records":"a_0901.bin|1|hiddenItem|0|0","candidatePoints":1,"id":"G0487","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 9","items":"TM64 (Avalanche)","directions":"Water Bike: westward inlet near route entrance.","acquisition":"Visible pickup","match":"Strong","map":"z_r0902","records":"a_0901.bin|2|fieldItem|1|-","candidatePoints":1,"id":"G0488","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 9","items":"Max Potion","directions":"Route sign: grass clearing to east.","acquisition":"Visible pickup","match":"Strong","map":"z_r0902","records":"a_0901.bin|2|fieldItem|0|-","candidatePoints":1,"id":"G0489","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 9","items":"Rotom Bike","directions":"After Circhester Hop battle: rescue doctor again.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0490","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 9","items":"Zoom Lens","directions":"Bay entrance: first island immediately west.","acquisition":"Visible pickup","match":"Strong","map":"z_r0904","records":"a_0901.bin|4|fieldItem|0|-","candidatePoints":1,"id":"G0491","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 9","items":"Max Revive","directions":"Bay entrance: explore island farther west.","acquisition":"Visible pickup","match":"Strong","map":"z_r0904","records":"a_0901.bin|4|fieldItem|1|-","candidatePoints":1,"id":"G0492","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 9","items":"Pearl","directions":"Above Max Revive island: western inlet.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_r0904","records":null,"candidatePoints":2,"id":"G0493","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 9","items":"Pearl","directions":"Before Outer Spikemuth: between shore fishing spots.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_r0904","records":null,"candidatePoints":2,"id":"G0494","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 9","items":"Big Pearl","directions":"Above Max Revive island: eastern inlet.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_r0904","records":null,"candidatePoints":3,"id":"G0495","reason":"3 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 9","items":"Big Pearl","directions":"Canal: search above Pearl String spot.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_r0904","records":null,"candidatePoints":3,"id":"G0496","reason":"3 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 9","items":"Big Pearl","directions":"Before Outer Spikemuth: shore west of swimmer.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_r0904","records":null,"candidatePoints":3,"id":"G0497","reason":"3 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 9","items":"Black Belt","directions":"Western Black Belt island: inspect ground.","acquisition":"Hidden pickup","match":"Strong","map":"z_r0904","records":"a_0901.bin|4|hiddenItem|6|0","candidatePoints":1,"id":"G0498","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 9","items":"Dive Ball ×3","directions":"Secret western beach: near swimmer pair.","acquisition":"Visible pickup","match":"Strong","map":"z_r0904","records":"a_0901.bin|4|fieldItem|2|-","candidatePoints":1,"id":"G0499","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 9","items":"TM45 (Dive)","directions":"Secret beach: speak to female swimmer.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0500","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 9","items":"Rare Candy","directions":"Campsite west: inspect path's end.","acquisition":"Hidden pickup","match":"Strong","map":"z_r0904","records":"a_0901.bin|4|hiddenItem|0|0","candidatePoints":1,"id":"G0501","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 9","items":"Never-Melt Ice","directions":"Fisher west: inspect grassy clearing.","acquisition":"Hidden pickup","match":"Strong","map":"z_r0904","records":"a_0901.bin|4|hiddenItem|5|0","candidatePoints":1,"id":"G0502","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 9","items":"Ice Stone","directions":"Fisher northeast: inspect canal's western edge.","acquisition":"Hidden pickup","match":"Strong","map":"z_r0904","records":"a_0901.bin|4|hiddenItem|8|0","candidatePoints":1,"id":"G0503","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 9","items":"Pearl String","directions":"Fisher northeast: inspect canal's eastern edge.","acquisition":"Hidden pickup","match":"Strong","map":"z_r0904","records":"a_0901.bin|4|hiddenItem|7|0","candidatePoints":1,"id":"G0504","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 9","items":"Protector","directions":"Noticeboard east: secluded shore beside bay sign.","acquisition":"Visible pickup","match":"Strong","map":"z_r0904","records":"a_0901.bin|4|fieldItem|4|-","candidatePoints":1,"id":"G0505","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 9","items":"PP Up","directions":"Private berry beach: inspect adjacent water.","acquisition":"Hidden pickup","match":"Strong","map":"z_r0904","records":"a_0901.bin|4|hiddenItem|10|0","candidatePoints":1,"id":"G0506","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 9","items":"Normal Gem","directions":"Beach above Outer Spikemuth, east of swimmer.","acquisition":"Hidden pickup","match":"Strong","map":"z_r0904","records":"a_0901.bin|4|hiddenItem|2|0","candidatePoints":1,"id":"G0507","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 9","items":"TM22 (Rock Slide)","directions":"Outer Spikemuth shore: secluded beach northwest.","acquisition":"Visible pickup","match":"Strong","map":"z_r0904","records":"a_0901.bin|4|fieldItem|3|-","candidatePoints":1,"id":"G0508","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 9","items":"Max Elixir","directions":"Outer Spikemuth approach: inspect three rock cluster.","acquisition":"Hidden pickup","match":"Strong","map":"z_r0904","records":"a_0901.bin|4|hiddenItem|4|0","candidatePoints":1,"id":"G0509","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 9","items":"Scope Lens","directions":"Slope's bottom: explore western grass clearing.","acquisition":"Visible pickup","match":"Strong","map":"z_r0903","records":"a_0901.bin|3|fieldItem|0|-","candidatePoints":1,"id":"G0510","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 9","items":"Dire Hit ×3","directions":"Eastern slope: inspect freight crates.","acquisition":"Hidden pickup","match":"Strong","map":"z_r0903","records":"a_0901.bin|3|hiddenItem|0|0","candidatePoints":1,"id":"G0511","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 9","items":"Guard Spec ×3","directions":"Spikemuth frontage south: clearing beside four pallets.","acquisition":"Hidden pickup","match":"Strong","map":"z_r0903","records":"a_0901.bin|3|hiddenItem|1|0","candidatePoints":1,"id":"G0512","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 9","items":"Wiki Berry; Aguav Berry; Iapapa Berry; Petaya Berry; Apicot Berry","directions":"Shake the tree with this item pool.","acquisition":"Berry tree","match":"Strong","map":"z_r0904","records":"a_0901.bin|4|BerryTree|0|-","candidatePoints":1,"id":"G0513","reason":"Same map, pickup type and complete listed item set. Tree item and rate fields are read only in the current editor.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 9","items":"Lum Berry; Roseli Berry; Chople Berry; Tanga Berry; Salac Berry","directions":"Shake the tree with this item pool.","acquisition":"Berry tree","match":"Strong","map":"z_r0903","records":"a_0901.bin|3|BerryTree|0|-","candidatePoints":1,"id":"G0514","reason":"Same map, pickup type and complete listed item set. Tree item and rate fields are read only in the current editor.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 10","items":"X Attack ×2","directions":"White Hill Station: inspect cart frontage.","acquisition":"Hidden pickup","match":"Strong","map":"z_r1001","records":"a_1201.bin|0|hiddenItem|0|0","candidatePoints":1,"id":"G0515","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 10","items":"Max Revive","directions":"White Hill Station: explore southeastern grass.","acquisition":"Visible pickup","match":"Strong","map":"z_r1001","records":"a_1201.bin|0|fieldItem|0|-","candidatePoints":1,"id":"G0516","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 10","items":"Comet Shard","directions":"Northeastern corner: inspect rock.","acquisition":"Hidden pickup","match":"Strong","map":"z_r1002","records":"a_1201.bin|1|hiddenItem|0|0","candidatePoints":1,"id":"G0517","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 10","items":"Power Herb","directions":"Wyndon slope southeast: follow side path.","acquisition":"Visible pickup","match":"Strong","map":"z_r1002","records":"a_1201.bin|1|fieldItem|0|-","candidatePoints":1,"id":"G0518","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 10","items":"PP Up","directions":"Campsite west: inspect ground.","acquisition":"Hidden pickup","match":"Strong","map":"z_r1002","records":"a_1201.bin|1|hiddenItem|1|0","candidatePoints":1,"id":"G0519","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Route 10","items":"TM98 (Stomping Tantrum)","directions":"Wyndon descent: cliff east of slope's top.","acquisition":"Visible pickup","match":"Strong","map":"z_r1003","records":"a_1201.bin|2|fieldItem|0|-","candidatePoints":1,"id":"G0520","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Galar Mine","items":"Star Piece","directions":"Entrance opposite: inspect mine cart.","acquisition":"Hidden pickup","match":"Strong","map":"z_d0201","records":"a_d0201.bin|0|hiddenItem|5|0","candidatePoints":1,"id":"G0521","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Galar Mine","items":"Revive","directions":"First fork: empty cart beside boarded tunnel.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_d0201","records":null,"candidatePoints":2,"id":"G0522","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Galar Mine","items":"Great Ball ×3","directions":"First fork south, double back east to overlook.","acquisition":"Visible pickup","match":"Strong","map":"z_d0201","records":"a_d0201.bin|0|fieldItem|0|-","candidatePoints":1,"id":"G0523","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Galar Mine","items":"TM26 (Scary Face)","directions":"Second fork west: reach passage's end.","acquisition":"Visible pickup","match":"Strong","map":"z_d0201","records":"a_d0201.bin|0|fieldItem|3|-","candidatePoints":1,"id":"G0524","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Galar Mine","items":"Stardust","directions":"Second fork west: crate against north wall.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_d0201","records":null,"candidatePoints":2,"id":"G0525","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Galar Mine","items":"Hard Stone","directions":"Bridge's southern end: inspect eastern wall.","acquisition":"Hidden pickup","match":"Strong","map":"z_d0201","records":"a_d0201.bin|0|hiddenItem|2|0","candidatePoints":1,"id":"G0526","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Galar Mine","items":"Heavy-Duty Boots","directions":"Bridge's northern end: beside gem cart.","acquisition":"Visible pickup","match":"Strong","map":"z_d0201","records":"a_d0201.bin|0|fieldItem|1|-","candidatePoints":1,"id":"G0527","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Galar Mine","items":"Ether","directions":"Bridge's northern end: inspect western crates.","acquisition":"Hidden pickup","match":"Strong","map":"z_d0201","records":"a_d0201.bin|0|hiddenItem|3|0","candidatePoints":1,"id":"G0528","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Galar Mine","items":"Revive","directions":"Bridge's northern end: inspect wheelbarrow.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_d0201","records":null,"candidatePoints":2,"id":"G0529","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Galar Mine","items":"Super Potion ×2","directions":"Past second track's bend: explore eastern side.","acquisition":"Visible pickup","match":"Strong","map":"z_d0201","records":"a_d0201.bin|0|fieldItem|2|-","candidatePoints":1,"id":"G0530","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Galar Mine","items":"Stardust","directions":"Route 4 exit: inspect nearby crate.","acquisition":"Hidden pickup","match":"Ambiguous","map":"z_d0201","records":null,"candidatePoints":2,"id":"G0531","reason":"2 physical points share these items. Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Galar Mine","items":"TM54 Rock Blast","directions":"Exit Galar Mine onto Route 3 ledge.","acquisition":"Visible pickup","match":"Likely","map":"z_r0301","records":"a_0201.bin|1|fieldItem|1|-","candidatePoints":1,"id":"W0183","reason":"Guide landmark lies in a neighboring editor map. Check the map boundary before editing.","edition":"Both","source":"GameWith"},
			{"location":"Galar Mine No. 2","items":"Dusk Ball ×3","directions":"Explore the cave's northeastern section.","acquisition":"Visible pickup","match":"Strong","map":"z_d0302","records":"a_d0302.bin|0|fieldItem|1|-","candidatePoints":1,"id":"G0534","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Galar Mine No. 2","items":"Grip Claw","directions":"Second pool south: western protruding platform.","acquisition":"Visible pickup","match":"Strong","map":"z_d0302","records":"a_d0302.bin|0|fieldItem|0|-","candidatePoints":1,"id":"G0535","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Galar Mine No. 2","items":"Star Piece","directions":"Large chamber: inspect gem filled cart.","acquisition":"Hidden pickup","match":"Strong","map":"z_d0302","records":"a_d0302.bin|0|hiddenItem|1|0","candidatePoints":1,"id":"G0536","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Galar Mine No. 2","items":"Soft Sand","directions":"Below chamber: western passage's gem cart.","acquisition":"Hidden pickup","match":"Strong","map":"z_d0302","records":"a_d0302.bin|0|hiddenItem|0|0","candidatePoints":1,"id":"G0537","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Galar Mine No. 2","items":"TM49 (Sand Tomb)","directions":"Below chamber: reach eastern passage's end.","acquisition":"Visible pickup","match":"Strong","map":"z_d0302","records":"a_d0302.bin|0|fieldItem|3|-","candidatePoints":1,"id":"G0538","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Galar Mine No. 2","items":"TM53 (Mud Shot)","directions":"Water Bike: cross both northern pools.","acquisition":"Visible pickup","match":"Strong","map":"z_d0302","records":"a_d0302.bin|0|fieldItem|2|-","candidatePoints":1,"id":"G0539","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Glimwood Tangle","items":"Bright Powder","directions":"First junction west, then south past Derek.","acquisition":"Visible pickup","match":"Strong","map":"z_d0401","records":"a_d0401.bin|0|fieldItem|1|-","candidatePoints":1,"id":"G0540","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Glimwood Tangle","items":"Full Heal ×2","directions":"First junction east: inspect ground.","acquisition":"Hidden pickup","match":"Strong","map":"z_d0401","records":"a_d0401.bin|0|hiddenItem|0|0","candidatePoints":1,"id":"G0541","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Glimwood Tangle","items":"Big Root","directions":"Eastern branch: beside exposed tree root.","acquisition":"Visible pickup","match":"Strong","map":"z_d0401","records":"a_d0401.bin|0|fieldItem|2|-","candidatePoints":1,"id":"G0542","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Glimwood Tangle","items":"TM24 (Snore)","directions":"Couple's western path: reach dead end.","acquisition":"Visible pickup","match":"Strong","map":"z_d0401","records":"a_d0401.bin|0|fieldItem|3|-","candidatePoints":1,"id":"G0543","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Glimwood Tangle","items":"Hyper Potion ×2","directions":"Explore southwest of northern exit.","acquisition":"Visible pickup","match":"Strong","map":"z_d0401","records":"a_d0401.bin|0|fieldItem|4|-","candidatePoints":1,"id":"G0544","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Glimwood Tangle","items":"Luminous Moss","directions":"Judy's nearby path: inspect ledge.","acquisition":"Hidden pickup","match":"Strong","map":"z_d0401","records":"a_d0401.bin|0|hiddenItem|1|0","candidatePoints":1,"id":"G0545","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Glimwood Tangle","items":"TM56 (U-turn)","directions":"Judy's nearby path: reach final ledge.","acquisition":"Visible pickup","match":"Strong","map":"z_d0401","records":"a_d0401.bin|0|fieldItem|0|-","candidatePoints":1,"id":"G0546","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Slumbering Weald","items":"Full Restore","directions":"Deep forest: inspect first grass patch's center.","acquisition":"Hidden pickup","match":"Strong","map":"z_d0103","records":"a_d0101.bin|1|hiddenItem|1|0","candidatePoints":1,"id":"G0547","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Slumbering Weald","items":"Life Orb","directions":"Deep forest east: cross water to path's end.","acquisition":"Visible pickup","match":"Strong","map":"z_d0103","records":"a_d0101.bin|1|fieldItem|0|-","candidatePoints":1,"id":"G0548","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Slumbering Weald","items":"Misty Seed","directions":"Deep forest eastern trail: western branch.","acquisition":"Visible pickup","match":"Strong","map":"z_d0103","records":"a_d0101.bin|1|fieldItem|2|-","candidatePoints":1,"id":"G0549","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Slumbering Weald","items":"Mental Herb","directions":"Deep forest: follow westernmost trail.","acquisition":"Visible pickup","match":"Strong","map":"z_d0103","records":"a_d0101.bin|1|fieldItem|1|-","candidatePoints":1,"id":"G0550","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Slumbering Weald","items":"Elixir","directions":"Western trail's east fork: grass beyond fallen tree.","acquisition":"Hidden pickup","match":"Strong","map":"z_d0103","records":"a_d0101.bin|1|hiddenItem|0|0","candidatePoints":1,"id":"G0551","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Slumbering Weald","items":"TM86 (Phantom Force)","directions":"Western trail's east fork: reach its end.","acquisition":"Visible pickup","match":"Strong","map":"z_d0103","records":"a_d0101.bin|1|fieldItem|4|-","candidatePoints":1,"id":"G0552","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Slumbering Weald","items":"Smoke Ball","directions":"Western trail's east fork: explore along path.","acquisition":"Visible pickup","match":"Strong","map":"z_d0103","records":"a_d0101.bin|1|fieldItem|3|-","candidatePoints":1,"id":"G0553","reason":"Same map, pickup type and complete listed item set.","edition":"Both","source":"Bulbapedia"},
			{"location":"Slumbering Weald","items":"Rusted Sword; Rusted Shield","directions":"Story event: collect relic at deepest altar.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0554","reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Rusted Sword: Sword; Rusted Shield: Shield","source":"Bulbapedia"},
			{"location":"Slumbering Weald","items":"Sonia's Book","directions":"After deep forest Hop battle: Sonia's gift.","acquisition":"Gift or event","match":"Outside Placement","map":null,"records":null,"candidatePoints":0,"id":"G0555","postGame":true,"reason":"NPC gift, trade, service or event. No item pickup match claimed.","edition":"Both","source":"Bulbapedia"}
		],
		"itemLocations": [
			{"name":"Rolling Fields","group":"Wild Area","coverage":"Includes every Items-category record in the mapped base zones.","gameWith":"https://gamewith.net/pokemon-swordshield/article/show/13886","bulbapedia":"https://bulbapedia.bulbagarden.net/wiki/Rolling_Fields"},
			{"name":"Dappled Grove","group":"Wild Area","coverage":"Includes every Items-category record in the mapped base zones.","gameWith":"https://gamewith.net/pokemon-swordshield/article/show/13888","bulbapedia":"https://bulbapedia.bulbagarden.net/wiki/Dappled_Grove"},
			{"name":"Giant's Seat","group":"Wild Area","coverage":"Includes every Items-category record in the mapped base zones.","gameWith":"https://gamewith.net/pokemon-swordshield/article/show/13891","bulbapedia":"https://bulbapedia.bulbagarden.net/wiki/Giant%27s_Seat"},
			{"name":"South Lake Miloch","group":"Wild Area","coverage":"Includes every Items-category record in the mapped base zones.","gameWith":"https://gamewith.net/pokemon-swordshield/article/show/13890","bulbapedia":"https://bulbapedia.bulbagarden.net/wiki/South_Lake_Miloch"},
			{"name":"Axew's Eye","group":"Wild Area","coverage":"Includes every Items-category record in the mapped base zones.","gameWith":"https://gamewith.net/pokemon-swordshield/article/show/13894","bulbapedia":"https://bulbapedia.bulbagarden.net/wiki/Axew%27s_Eye"},
			{"name":"West Lake Axewell","group":"Wild Area","coverage":"Includes every Items-category record in the mapped base zones.","gameWith":"https://gamewith.net/pokemon-swordshield/article/show/13892","bulbapedia":"https://bulbapedia.bulbagarden.net/wiki/West_Lake_Axewell"},
			{"name":"Watchtower Ruins","group":"Wild Area","coverage":"Includes every Items-category record in the mapped base zones. The southwest log area falls in Dappled Grove in Placement.","gameWith":"https://gamewith.net/pokemon-swordshield/article/show/13893","bulbapedia":"https://bulbapedia.bulbagarden.net/wiki/Watchtower_Ruins"},
			{"name":"East Lake Axewell","group":"Wild Area","coverage":"Includes every Items-category record in the mapped base zones.","gameWith":"https://gamewith.net/pokemon-swordshield/article/show/13897","bulbapedia":"https://bulbapedia.bulbagarden.net/wiki/East_Lake_Axewell"},
			{"name":"North Lake Miloch","group":"Wild Area","coverage":"Includes every Items-category record in the mapped base zones.","gameWith":"https://gamewith.net/pokemon-swordshield/article/show/13898","bulbapedia":"https://bulbapedia.bulbagarden.net/wiki/North_Lake_Miloch"},
			{"name":"Motostoke Riverbank","group":"Wild Area","coverage":"Includes every Items-category record in the mapped base zones.","gameWith":"https://gamewith.net/pokemon-swordshield/article/show/13904","bulbapedia":"https://bulbapedia.bulbagarden.net/wiki/Motostoke_Riverbank"},
			{"name":"Bridge Field","group":"Wild Area","coverage":"Includes every Items-category record in the mapped base zones.","gameWith":"https://gamewith.net/pokemon-swordshield/article/show/13907","bulbapedia":"https://bulbapedia.bulbagarden.net/wiki/Bridge_Field"},
			{"name":"Stony Wilderness","group":"Wild Area","coverage":"Includes every Items-category record in the mapped base zones.","gameWith":"https://gamewith.net/pokemon-swordshield/article/show/13911","bulbapedia":"https://bulbapedia.bulbagarden.net/wiki/Stony_Wilderness"},
			{"name":"Giant's Mirror","group":"Wild Area","coverage":"Includes every Items-category record in the mapped base zones.","gameWith":"https://gamewith.net/pokemon-swordshield/article/show/13912","bulbapedia":"https://bulbapedia.bulbagarden.net/wiki/Giant%27s_Mirror"},
			{"name":"Dusty Bowl","group":"Wild Area","coverage":"Includes every Items-category record in the mapped base zones.","gameWith":"https://gamewith.net/pokemon-swordshield/article/show/13916","bulbapedia":"https://bulbapedia.bulbagarden.net/wiki/Dusty_Bowl"},
			{"name":"Giant's Cap","group":"Wild Area","coverage":"Includes every Items-category record in the mapped base zones.","gameWith":"https://gamewith.net/pokemon-swordshield/article/show/13919","bulbapedia":"https://bulbapedia.bulbagarden.net/wiki/Giant%27s_Cap"},
			{"name":"Hammerlocke Hills","group":"Wild Area","coverage":"Includes every Items-category record in the mapped base zones.","gameWith":"https://gamewith.net/pokemon-swordshield/article/show/13928","bulbapedia":"https://bulbapedia.bulbagarden.net/wiki/Hammerlocke_Hills"},
			{"name":"Lake of Outrage","group":"Wild Area","coverage":"Includes every Items-category record in the mapped base zones.","gameWith":"https://gamewith.net/pokemon-swordshield/article/show/13924","bulbapedia":"https://bulbapedia.bulbagarden.net/wiki/Lake_of_Outrage"},
			{"name":"Meetup Spot","beforeEncounter":"Rolling Fields","group":"Wild Area","coverage":"No item pickup records in this map; listed items are gifts or events.","gameWith":"https://gamewith.net/pokemon-swordshield/article/show/14054","bulbapedia":"https://bulbapedia.bulbagarden.net/wiki/Meetup_Spot"},
			{"name":"Postwick","beforeEncounter":"Route 1","group":"Cities and towns","coverage":"No item pickup records in this map; listed items are gifts or events.","gameWith":"https://gamewith.net/pokemon-swordshield/article/show/14020","bulbapedia":"https://bulbapedia.bulbagarden.net/wiki/Postwick"},
			{"name":"Wedgehurst","group":"Cities and towns","coverage":"Includes every Items-category record in the mapped base zones.","gameWith":"https://gamewith.net/pokemon-swordshield/article/show/14021","bulbapedia":"https://bulbapedia.bulbagarden.net/wiki/Wedgehurst"},
			{"name":"Motostoke","encounterLocation":"City of Motostoke","group":"Cities and towns","coverage":"Includes every Items-category record in the mapped base zones.","gameWith":"https://gamewith.net/pokemon-swordshield/article/show/14023","bulbapedia":"https://bulbapedia.bulbagarden.net/wiki/Motostoke"},
			{"name":"Turffield","encounterLocation":"Turrfield","group":"Cities and towns","coverage":"Includes every Items-category record in the mapped base zones.","gameWith":"https://gamewith.net/pokemon-swordshield/article/show/14022","bulbapedia":"https://bulbapedia.bulbagarden.net/wiki/Turffield"},
			{"name":"Hulbury","encounterLocation":"Town of Hulbury","group":"Cities and towns","coverage":"Includes every Items-category record in the mapped base zones.","gameWith":"https://gamewith.net/pokemon-swordshield/article/show/14025","bulbapedia":"https://bulbapedia.bulbagarden.net/wiki/Hulbury"},
			{"name":"Hammerlocke","beforeEncounter":"Route 6","group":"Cities and towns","coverage":"Includes every Items-category record in the mapped base zones.","gameWith":"https://gamewith.net/pokemon-swordshield/article/show/14032","bulbapedia":"https://bulbapedia.bulbagarden.net/wiki/Hammerlocke"},
			{"name":"Stow-on-Side","afterEncounter":"Route 6","group":"Cities and towns","coverage":"Includes every Items-category record in the mapped base zones.","gameWith":"https://gamewith.net/pokemon-swordshield/article/show/14027","bulbapedia":"https://bulbapedia.bulbagarden.net/wiki/Stow-on-Side"},
			{"name":"Ballonlea","afterEncounter":"Glimwood Tangle","group":"Cities and towns","coverage":"Includes every Items-category record in the mapped base zones.","gameWith":"https://gamewith.net/pokemon-swordshield/article/show/14026","bulbapedia":"https://bulbapedia.bulbagarden.net/wiki/Ballonlea"},
			{"name":"Circhester","afterEncounter":"Route 8","group":"Cities and towns","coverage":"Includes every Items-category record in the mapped base zones.","gameWith":"https://gamewith.net/pokemon-swordshield/article/show/14028","bulbapedia":"https://bulbapedia.bulbagarden.net/wiki/Circhester"},
			{"name":"Spikemuth","afterEncounter":"Route 9","group":"Cities and towns","coverage":"Includes every Items-category record in the mapped base zones.","gameWith":"https://gamewith.net/pokemon-swordshield/article/show/14029","bulbapedia":"https://bulbapedia.bulbagarden.net/wiki/Spikemuth"},
			{"name":"Wyndon","afterEncounter":"Route 10","group":"Cities and towns","coverage":"Includes every Items-category record in the mapped base zones.","gameWith":"https://gamewith.net/pokemon-swordshield/article/show/14041","bulbapedia":"https://bulbapedia.bulbagarden.net/wiki/Wyndon"},
			{"name":"Route 1","group":"Routes","coverage":"Includes every Items-category record in the mapped base zones.","gameWith":"https://gamewith.net/pokemon-swordshield/article/show/14044","bulbapedia":"https://bulbapedia.bulbagarden.net/wiki/Galar_Route_1"},
			{"name":"Route 2","group":"Routes","coverage":"Includes every Items-category record in the mapped base zones.","gameWith":"https://gamewith.net/pokemon-swordshield/article/show/14035","bulbapedia":"https://bulbapedia.bulbagarden.net/wiki/Galar_Route_2"},
			{"name":"Route 3","group":"Routes","coverage":"Includes every Items-category record in the mapped base zones.","gameWith":"https://gamewith.net/pokemon-swordshield/article/show/14037","bulbapedia":"https://bulbapedia.bulbagarden.net/wiki/Galar_Route_3"},
			{"name":"Route 4","group":"Routes","coverage":"Includes every Items-category record in the mapped base zones.","gameWith":"https://gamewith.net/pokemon-swordshield/article/show/14039","bulbapedia":"https://bulbapedia.bulbagarden.net/wiki/Galar_Route_4"},
			{"name":"Route 5","group":"Routes","coverage":"Includes every Items-category record in the mapped base zones.","gameWith":"https://gamewith.net/pokemon-swordshield/article/show/14045","bulbapedia":"https://bulbapedia.bulbagarden.net/wiki/Galar_Route_5"},
			{"name":"Route 6","group":"Routes","coverage":"Includes every Items-category record in the mapped base zones.","gameWith":"https://gamewith.net/pokemon-swordshield/article/show/14047","bulbapedia":"https://bulbapedia.bulbagarden.net/wiki/Galar_Route_6"},
			{"name":"Route 7","group":"Routes","coverage":"Includes every Items-category record in the mapped base zones.","gameWith":"https://gamewith.net/pokemon-swordshield/article/show/14048","bulbapedia":"https://bulbapedia.bulbagarden.net/wiki/Galar_Route_7"},
			{"name":"Route 8","group":"Routes","coverage":"Includes every Items-category record in the mapped base zones.","gameWith":"https://gamewith.net/pokemon-swordshield/article/show/14050","bulbapedia":"https://bulbapedia.bulbagarden.net/wiki/Galar_Route_8"},
			{"name":"Route 9","group":"Routes","coverage":"Includes every Items-category record in the mapped base zones.","gameWith":"https://gamewith.net/pokemon-swordshield/article/show/14051","bulbapedia":"https://bulbapedia.bulbagarden.net/wiki/Galar_Route_9"},
			{"name":"Route 10","group":"Routes","coverage":"Includes every Items-category record in the mapped base zones.","gameWith":"https://gamewith.net/pokemon-swordshield/article/show/14049","bulbapedia":"https://bulbapedia.bulbagarden.net/wiki/Galar_Route_10"},
			{"name":"Galar Mine","group":"Other locations","coverage":"Includes every Items-category record in the mapped base zones. The outside TM54 ledge belongs to Route 3 in Placement.","gameWith":"https://gamewith.net/pokemon-swordshield/article/show/14030","bulbapedia":"https://bulbapedia.bulbagarden.net/wiki/Galar_Mine"},
			{"name":"Galar Mine No. 2","group":"Other locations","coverage":"Includes every Items-category record in the mapped base zones.","gameWith":"https://gamewith.net/pokemon-swordshield/article/show/14031","bulbapedia":"https://bulbapedia.bulbagarden.net/wiki/Galar_Mine_No._2"},
			{"name":"Glimwood Tangle","group":"Other locations","coverage":"Includes every Items-category record in the mapped base zones.","gameWith":"https://gamewith.net/pokemon-swordshield/article/show/14033","bulbapedia":"https://bulbapedia.bulbagarden.net/wiki/Glimwood_Tangle"},
			{"name":"Slumbering Weald","group":"Other locations","coverage":"Includes every Items-category record in the mapped base zones.","gameWith":"https://gamewith.net/pokemon-swordshield/article/show/14036","bulbapedia":"https://bulbapedia.bulbagarden.net/wiki/Slumbering_Weald"}
		],
		"itemNotes": [
			{"location":"Motostoke","note":"GameWith lists Friend Ball in Motostoke. The town item guide instead identifies a Poké Ball gift; Friend Ball is documented in Turffield. Motostoke Friend Ball remains unverified."},
			{"location":"Hammerlocke","note":"GameWith lists Soother Bell; normalized to Soothe Bell using game item/machine names."},
			{"location":"Hammerlocke","note":"GameWith lists Sweet Apple (Shield); normalized to Sweet Apple using game item/machine names."},
			{"location":"Hammerlocke","note":"GameWith lists Sour Apple (Sword); normalized to Tart Apple using game item/machine names."},
			{"location":"Hammerlocke","note":"GameWith lists TM50 (Brine); normalized to TM55 (Brine) using game item/machine names."},
			{"location":"Hammerlocke","note":"GameWith lists TM00 (Mega Kick); normalized to TM01 (Mega Kick) using game item/machine names."},
			{"location":"Wyndon","note":"GameWith lists X Special x2; normalized to X Sp. Atk ×2 using game item/machine names."},
			{"location":"Wyndon","note":"GameWith lists TM62 (Drain Punch); normalized to TM63 (Drain Punch) using game item/machine names."},
			{"location":"Route 7","note":"GameWith lists Safety Googles; normalized to Safety Goggles using game item/machine names."},
			{"location":"Slumbering Weald","note":"GameWith lists PP Up but gives only its effect. No matching Slumbering Weald pickup exists in this base placement catalog. Not asserted as a real pickup."},
			{"location":"All locations","note":"Guide quantities can represent several items or several nearby spots. Stored Quantity is the raw editor value, which does not always equal the quantity received in game."},
			{"location":"Route 5","note":"The guide labels ten feather sites with a total of ten. Each site is represented separately here, with its entire seven item pool in Candidates."},
			{"location":"Watchtower Ruins","note":"Southern mushroom tree is a likely neighboring map match near White Herb. Its exact tree landmark has not been tested in game."},
			{"location":"Berry trees","note":"Placement exposes tree item pools as context. Their item hashes, rates and quantities are read only; editable tree transforms do not imply editable rewards."},
			{"location":"Wild Area","note":"Hidden rows are alternative outcomes at shared coordinates. Chance slots and Wishing Piece outcomes are retained in Candidates and Placement records. A source list of outcomes is not a guarantee that each outcome is always active."},
			{"location":"Sword and Shield","note":"The extracted item placement records are identical in both editions. Script/version conditions can still select different outcomes, including apples, fossils and story relics."},
			{"location":"Editor search","note":"Search a map code, item name or coordinate individually. The current search uses literal text; it does not index the full Object ID as one searchable token. Use Object ID to verify identity."}
		]
	}
};

// Encounter spellings that differ from the family's species labels.
window.KMCalculatorReferenceData["pokemon-royal-sword"].encounterAliases = {
	"Slowpoke-K": "Slowpoke",
	"Stunfisk": "Stunfisk-K",
	"Amoongus": "Amoonguss",
	"Sirfetch'd": "Sirfetch’d",
	"Lycanrock-Dusk": "Lycanroc-Dusk",
	"Meowth-K": "Meowth",
	"Meowth-A": "Meowth-Alola",
	"Meowth-G": "Meowth-Galar",
	"Vulpix-K": "Vulpix",
	"Ponyta-K": "Ponyta",
	"Darmanitan-G": "Darmanitan-Galar",
	"Sandshrew-K": "Sandshrew",
	"Sandslash-K": "Sandslash",
	"Nidoran-F": "Nidoran♀",
	"Nidoran-M": "Nidoran♂",
	"Qwilfish-H": "Qwilfish-Hisui",
	"Ninetales-K": "Ninetales",
	"Slowbro-K": "Slowbro",
	"Slowking-K": "Slowking",
	"Landorus-Incarnate": "Landorus",
	"Thundurus-Incarnate": "Thundurus",
	"Tornadus-Incarnate": "Tornadus"
};
// Evolution families used by this profile's encounter tracker. No saved run progress.
window.KMCalculatorReferenceData["pokemon-royal-sword"].encounterFamilies = [
	{
		"id": "#001 Bulbasaur Family",
		"members": [
			"Bulbasaur",
			"Ivysaur",
			"Venusaur",
			"Venusaur-Mega"
		]
	},
	{
		"id": "#007 Squirtle Family",
		"members": [
			"Squirtle",
			"Wartortle",
			"Blastoise",
			"Blastoise-Mega"
		]
	},
	{
		"id": "#010 Caterpie Family",
		"members": [
			"Caterpie",
			"Metapod",
			"Butterfree"
		]
	},
	{
		"id": "#025 Pikachu Family",
		"members": [
			"Pichu",
			"Pikachu",
			"Raichu-K",
			"Raichu-A",
			"Pikachu-Original",
			"Pikachu-Hoenn",
			"Pikachu-Sinnoh",
			"Pikachu-Unova",
			"Pikachu-Kalos",
			"Pikachu-Alola",
			"Pikachu-Partner",
			"Pikachu-World",
			"Raichu",
			"Raichu-Alola",
			"Raichu-Mega-X",
			"Raichu-Mega-Y"
		]
	},
	{
		"id": "#027 Sandshrew Family",
		"members": [
			"Sandshrew-K",
			"Sandshrew-A",
			"Sandslash-K",
			"Sandslash-A",
			"Sandshrew",
			"Sandshrew-Alola",
			"Sandslash",
			"Sandslash-Alola"
		]
	},
	{
		"id": "#029 Nidoran Family",
		"members": [
			"Nidoran-F",
			"Nidoran-M",
			"Nidorina",
			"Nidorino",
			"Nidoqueen",
			"Nidoking",
			"Nidoran♀",
			"Nidoran♂"
		]
	},
	{
		"id": "#035 Clefairy Family",
		"members": [
			"Cleffa",
			"Clefairy",
			"Clefable",
			"Clefable-Mega"
		]
	},
	{
		"id": "#037 Vulpix Family",
		"members": [
			"Vulpix-K",
			"Vulpix-A",
			"Ninetales-K",
			"Ninetales-A",
			"Vulpix",
			"Vulpix-Alola",
			"Ninetales",
			"Ninetales-Alola"
		]
	},
	{
		"id": "#039 Jigglypuff Family",
		"members": [
			"Igglybuff",
			"Jigglypuff",
			"Wigglytuff"
		]
	},
	{
		"id": "#041 Zubat Family",
		"members": [
			"Zubat",
			"Golbat",
			"Crobat"
		]
	},
	{
		"id": "#043 Oddish Family",
		"members": [
			"Oddish",
			"Gloom",
			"Vileplume",
			"Bellossom"
		]
	},
	{
		"id": "#050 Diglett Family",
		"members": [
			"Diglett-K",
			"Diglett-A",
			"Dugtrio-K",
			"Dugtrio-A",
			"Dugtrio-G"
		]
	},
	{
		"id": "#052 Meowth Family",
		"members": [
			"Meowth-K",
			"Meowth-A",
			"Meowth-G",
			"Persian-K",
			"Persian-A",
			"Perrserker",
			"Meowth",
			"Meowth-Alola",
			"Meowth-Galar",
			"Persian",
			"Persian-Alola"
		]
	},
	{
		"id": "#054 Psyduck Family",
		"members": [
			"Psyduck",
			"Golduck"
		]
	},
	{
		"id": "#058 Growlithe Family",
		"members": [
			"Growlithe",
			"Arcanine",
			"Growlithe-Hisui",
			"Arcanine-Hisui"
		]
	},
	{
		"id": "#060 Poliwag Family",
		"members": [
			"Poliwag",
			"Poliwhirl",
			"Poliwrath",
			"Politoed"
		]
	},
	{
		"id": "#063 Abra Family",
		"members": [
			"Abra",
			"Kadabra",
			"Alakazam",
			"Alakazam-Mega"
		]
	},
	{
		"id": "#066 Machop Family",
		"members": [
			"Machop",
			"Machoke",
			"Machamp"
		]
	},
	{
		"id": "#072 Tentacool Family",
		"members": [
			"Tentacool",
			"Tentacruel"
		]
	},
	{
		"id": "#077 Ponyta Family",
		"members": [
			"Ponyta",
			"Rapidash-K",
			"Rapidash-G",
			"Ponyta-Galar",
			"Rapidash",
			"Rapidash-Galar"
		]
	},
	{
		"id": "#079 Slowpoke Family",
		"members": [
			"Slowpoke",
			"Slowbro-K",
			"Slowbro-G",
			"Slowking-K",
			"Slowking-G",
			"Slowpoke-Galar",
			"Slowbro",
			"Slowbro-Mega",
			"Slowbro-Galar",
			"Slowking",
			"Slowking-Galar"
		]
	},
	{
		"id": "#081 Magnemite Family",
		"members": [
			"Magnemite",
			"Magneton",
			"Magnezone"
		]
	},
	{
		"id": "#083 Farfetch'd Family",
		"members": [
			"Farfetch'd-K",
			"Farfetch'd-G",
			"Sirfetch’d"
		]
	},
	{
		"id": "#090 Shellder Family",
		"members": [
			"Shellder",
			"Cloyster"
		]
	},
	{
		"id": "#092 Gastly Family",
		"members": [
			"Gastly",
			"Haunter",
			"Gengar",
			"Gengar-Mega"
		]
	},
	{
		"id": "#095 Onix Family",
		"members": [
			"Onix",
			"Steelix",
			"Steelix-Mega"
		]
	},
	{
		"id": "#098 Krabby Family",
		"members": [
			"Krabby",
			"Kingler"
		]
	},
	{
		"id": "#102 Exeggcute Family",
		"members": [
			"Exeggcute",
			"Exeggutor-K",
			"Exeggutor-A",
			"Exeggutor",
			"Exeggutor-Alola"
		]
	},
	{
		"id": "#104 Cubone Family",
		"members": [
			"Cubone",
			"Marowak-K",
			"Marowak-A",
			"Marowak",
			"Marowak-Alola"
		]
	},
	{
		"id": "#106 Tyrogue / Hitmon Family",
		"members": [
			"Tyrogue",
			"Hitmonlee",
			"Hitmonchan",
			"Hitmontop"
		]
	},
	{
		"id": "#108 Lickitung Family",
		"members": [
			"Lickitung",
			"Lickilicky"
		]
	},
	{
		"id": "#109 Koffing Family",
		"members": [
			"Koffing",
			"Weezing-K",
			"Weezing-G",
			"Weezing",
			"Weezing-Galar"
		]
	},
	{
		"id": "#111 Rhyhorn Family",
		"members": [
			"Rhyhorn",
			"Rhydon",
			"Rhyperior"
		]
	},
	{
		"id": "#113 Chansey Family",
		"members": [
			"Happiny",
			"Chansey",
			"Blissey"
		]
	},
	{
		"id": "#114 Tangela Family",
		"members": [
			"Tangela",
			"Tangrowth"
		]
	},
	{
		"id": "#116 Horsea Family",
		"members": [
			"Horsea",
			"Seadra",
			"Kingdra"
		]
	},
	{
		"id": "#118 Goldeen Family",
		"members": [
			"Goldeen",
			"Seaking"
		]
	},
	{
		"id": "#120 Staryu Family",
		"members": [
			"Staryu",
			"Starmie",
			"Starmie-Mega"
		]
	},
	{
		"id": "#122 Mr. Mime Family",
		"members": [
			"Mime Jr.",
			"Mr. Mime-K",
			"Mr. Mime-G",
			"Mr. Rime",
			"Mr. Mime",
			"Mr. Mime-Galar"
		]
	},
	{
		"id": "#124 Jynx Family",
		"members": [
			"Smoochum",
			"Jynx"
		]
	},
	{
		"id": "#125 Electabuzz Family",
		"members": [
			"Elekid",
			"Electabuzz",
			"Electivire"
		]
	},
	{
		"id": "#126 Magmar Family",
		"members": [
			"Magby",
			"Magmar",
			"Magmortar"
		]
	},
	{
		"id": "#127 Pinsir Family",
		"members": [
			"Pinsir",
			"Pinsir-Mega"
		]
	},
	{
		"id": "#128 Tauros Family",
		"members": [
			"Tauros"
		]
	},
	{
		"id": "#129 Magikarp Family",
		"members": [
			"Magikarp",
			"Mega Gyarados",
			"Gyarados",
			"Gyarados-Mega"
		]
	},
	{
		"id": "#131 Lapras Family",
		"members": [
			"Lapras"
		]
	},
	{
		"id": "#132 Ditto Family",
		"members": [
			"Ditto"
		]
	},
	{
		"id": "#133 Eevee Family",
		"members": [
			"Eevee",
			"Vaporeon",
			"Jolteon",
			"Flareon",
			"Espeon",
			"Umbreon",
			"Leafeon",
			"Glaceon",
			"Sylveon"
		]
	},
	{
		"id": "#137 Porygon Family",
		"members": [
			"Porygon",
			"Porygon2",
			"Porygon-Z"
		]
	},
	{
		"id": "#138 Omanyte Family",
		"members": [
			"Omanyte",
			"Omastar"
		]
	},
	{
		"id": "#140 Kabuto Family",
		"members": [
			"Kabuto",
			"Kabutops"
		]
	},
	{
		"id": "#142 Aerodactyl Family",
		"members": [
			"Mega Aerodactyl"
		]
	},
	{
		"id": "#143 Snorlax Family",
		"members": [
			"Munchlax",
			"Snorlax"
		]
	},
	{
		"id": "#147 Dratini Family",
		"members": [
			"Dratini",
			"Dragonair",
			"Dragonite",
			"Dragonite-Mega"
		]
	},
	{
		"id": "#163 Hoothoot Family",
		"members": [
			"Hoothoot",
			"Noctowl"
		]
	},
	{
		"id": "#170 Chinchou Family",
		"members": [
			"Chinchou",
			"Lanturn"
		]
	},
	{
		"id": "#175 Togepi Family",
		"members": [
			"Togepi",
			"Togetic",
			"Togekiss"
		]
	},
	{
		"id": "#177 Natu Family",
		"members": [
			"Natu",
			"Xatu"
		]
	},
	{
		"id": "#183 Marill Family",
		"members": [
			"Azurill",
			"Marill",
			"Azumarill"
		]
	},
	{
		"id": "#185 Sudowoodo Family",
		"members": [
			"Bonsly",
			"Sudowoodo"
		]
	},
	{
		"id": "#194 Wooper Family",
		"members": [
			"Wooper",
			"Quagsire"
		]
	},
	{
		"id": "#202 Wobbuffet Family",
		"members": [
			"Wynaut",
			"Wobbuffet"
		]
	},
	{
		"id": "#206 Dunsparce Family",
		"members": [
			"Dunsparce"
		]
	},
	{
		"id": "#211 Qwilfish Family",
		"members": [
			"Qwilfish",
			"Qwilfish-Hisui",
			"Overqwil"
		]
	},
	{
		"id": "#213 Shuckle Family",
		"members": [
			"Shuckle"
		]
	},
	{
		"id": "#214 Heracross Family",
		"members": [
			"Heracross",
			"Heracross-Mega"
		]
	},
	{
		"id": "#215 Sneasel Family",
		"members": [
			"Sneasel",
			"Weavile"
		]
	},
	{
		"id": "#220 Swinub Family",
		"members": [
			"Swinub",
			"Piloswine",
			"Mamoswine"
		]
	},
	{
		"id": "#222 Corsola Family",
		"members": [
			"Corsola-K",
			"Corsola-G",
			"Cursola"
		]
	},
	{
		"id": "#223 Remoraid Family",
		"members": [
			"Remoraid",
			"Octillery"
		]
	},
	{
		"id": "#225 Delibird Family",
		"members": [
			"Delibird"
		]
	},
	{
		"id": "#226 Mantine Family",
		"members": [
			"Mantyke",
			"Mantine"
		]
	},
	{
		"id": "#227 Skarmory Family",
		"members": [
			"Skarmory",
			"Skarmory-Mega"
		]
	},
	{
		"id": "#241 Miltank Family",
		"members": [
			"Miltank"
		]
	},
	{
		"id": "#245 Suicune Family",
		"members": [
			"Suicune"
		]
	},
	{
		"id": "#246 Larvitar Family",
		"members": [
			"Larvitar",
			"Pupitar",
			"Tyranitar",
			"Tyranitar-Mega"
		]
	},
	{
		"id": "#252 Treecko Family",
		"members": [
			"Treecko",
			"Grovyle",
			"Mega Sceptile",
			"Sceptile",
			"Sceptile-Mega"
		]
	},
	{
		"id": "#255 Torchic Family",
		"members": [
			"Torchic",
			"Combusken",
			"Mega Blaziken",
			"Blaziken",
			"Blaziken-Mega"
		]
	},
	{
		"id": "#258 Mudkip Family",
		"members": [
			"Mudkip",
			"Marshtomp",
			"Mega Swampert",
			"Swampert",
			"Swampert-Mega"
		]
	},
	{
		"id": "#263 Zigzagoon Family",
		"members": [
			"Zigzagoon-K",
			"Zigzagoon-G",
			"Linoone-K",
			"Linoone-G",
			"Obstagoon"
		]
	},
	{
		"id": "#270 Lotad Family",
		"members": [
			"Lotad",
			"Lombre",
			"Ludicolo"
		]
	},
	{
		"id": "#273 Seedot Family",
		"members": [
			"Seedot",
			"Nuzleaf",
			"Shiftry"
		]
	},
	{
		"id": "#278 Wingull Family",
		"members": [
			"Wingull",
			"Pelipper"
		]
	},
	{
		"id": "#280 Ralts Family",
		"members": [
			"Ralts",
			"Kirlia",
			"Gardevoir",
			"Gallade",
			"Gardevoir-Mega",
			"Gallade-Mega"
		]
	},
	{
		"id": "#290 Nincada Family",
		"members": [
			"Nincada",
			"Ninjask/Shedinja",
			"Ninjask",
			"Shedinja"
		]
	},
	{
		"id": "#293 Whismur Family",
		"members": [
			"Whismur",
			"Loudred",
			"Exploud"
		]
	},
	{
		"id": "#302 Sableye Family",
		"members": [
			"Sableye",
			"Sableye-Mega"
		]
	},
	{
		"id": "#303 Mawile Family",
		"members": [
			"Mawile",
			"Mawile-Mega"
		]
	},
	{
		"id": "#304 Aron Family",
		"members": [
			"Aron",
			"Lairon",
			"Aggron",
			"Aggron-Mega"
		]
	},
	{
		"id": "#309 Electrike Family",
		"members": [
			"Electrike",
			"Manectric",
			"Manectric-Mega"
		]
	},
	{
		"id": "#315 Roselia Family",
		"members": [
			"Budew",
			"Roselia",
			"Roserade"
		]
	},
	{
		"id": "#318 Carvanha Family",
		"members": [
			"Carvanha",
			"Sharpedo",
			"Sharpedo-Mega"
		]
	},
	{
		"id": "#320 Wailmer Family",
		"members": [
			"Wailmer",
			"Wailord"
		]
	},
	{
		"id": "#324 Torkoal Family",
		"members": [
			"Torkoal"
		]
	},
	{
		"id": "#328 Trapinch Family",
		"members": [
			"Trapinch",
			"Vibrava",
			"Flygon"
		]
	},
	{
		"id": "#333 Swablu Family",
		"members": [
			"Swablu",
			"Altaria",
			"Altaria-Mega"
		]
	},
	{
		"id": "#337 Lunatone Family",
		"members": [
			"Lunatone"
		]
	},
	{
		"id": "#338 Solrock Family",
		"members": [
			"Solrock"
		]
	},
	{
		"id": "#339 Barboach Family",
		"members": [
			"Barboach",
			"Whiscash"
		]
	},
	{
		"id": "#341 Corphish Family",
		"members": [
			"Corphish",
			"Crawdaunt"
		]
	},
	{
		"id": "#343 Baltoy Family",
		"members": [
			"Baltoy",
			"Claydol"
		]
	},
	{
		"id": "#345 Lileep Family",
		"members": [
			"Lileep",
			"Cradily"
		]
	},
	{
		"id": "#347 Anorith Family",
		"members": [
			"Anorith",
			"Armaldo"
		]
	},
	{
		"id": "#349 Feebas Family",
		"members": [
			"Feebas",
			"Milotic"
		]
	},
	{
		"id": "#355 Duskull Family",
		"members": [
			"Duskull",
			"Dusclops",
			"Dusknoir"
		]
	},
	{
		"id": "#359 Absol Family",
		"members": [
			"Mega Absol"
		]
	},
	{
		"id": "#361 Snorunt Family",
		"members": [
			"Snorunt",
			"Glalie",
			"Froslass",
			"Glalie-Mega",
			"Froslass-Mega"
		]
	},
	{
		"id": "#363 Spheal Family",
		"members": [
			"Spheal",
			"Sealeo",
			"Walrein"
		]
	},
	{
		"id": "#369 Relicanth Family",
		"members": [
			"Relicanth"
		]
	},
	{
		"id": "#371 Bagon Family",
		"members": [
			"Bagon",
			"Shelgon",
			"Salamence",
			"Salamence-Mega"
		]
	},
	{
		"id": "#374 Beldum Family",
		"members": [
			"Beldum",
			"Metang",
			"Mega Metagross",
			"Metagross",
			"Metagross-Mega"
		]
	},
	{
		"id": "#403 Shinx Family",
		"members": [
			"Shinx",
			"Luxio",
			"Luxray"
		]
	},
	{
		"id": "#415 Combee Family",
		"members": [
			"Combee",
			"Vespiquen"
		]
	},
	{
		"id": "#420 Cherubi Family",
		"members": [
			"Cherubi",
			"Cherrim",
			"Cherrim-Sunshine"
		]
	},
	{
		"id": "#422 Shellos Family",
		"members": [
			"Shellos-Pink",
			"Shellos-Blue",
			"Gastrodon-Pink",
			"Gastrodon-Blue"
		]
	},
	{
		"id": "#425 Drifloon Family",
		"members": [
			"Drifloon",
			"Drifblim"
		]
	},
	{
		"id": "#427 Buneary Family",
		"members": [
			"Buneary",
			"Lopunny",
			"Lopunny-Mega"
		]
	},
	{
		"id": "#434 Stunky Family",
		"members": [
			"Stunky",
			"Skuntank"
		]
	},
	{
		"id": "#436 Bronzor Family",
		"members": [
			"Bronzor",
			"Bronzong"
		]
	},
	{
		"id": "#442 Spiritomb Family",
		"members": [
			"Spiritomb"
		]
	},
	{
		"id": "#443 Gible Family",
		"members": [
			"Gible",
			"Gabite",
			"Mega Garchomp",
			"Garchomp",
			"Garchomp-Mega",
			"Garchomp-Mega-Z"
		]
	},
	{
		"id": "#447 Lucario Family",
		"members": [
			"Riolu",
			"Lucario",
			"Lucario-Mega",
			"Lucario-Mega-Z"
		]
	},
	{
		"id": "#449 Hippopotas Family",
		"members": [
			"Hippopotas",
			"Hippowdon"
		]
	},
	{
		"id": "#451 Skorupi Family",
		"members": [
			"Skorupi",
			"Drapion"
		]
	},
	{
		"id": "#453 Croagunk Family",
		"members": [
			"Croagunk",
			"Toxicroak"
		]
	},
	{
		"id": "#459 Snover Family",
		"members": [
			"Snover",
			"Abomasnow",
			"Abomasnow-Mega"
		]
	},
	{
		"id": "#479 Rotom Family",
		"members": [
			"Rotom-Fan",
			"Rotom-Frost",
			"Rotom-Heat",
			"Rotom-Mow",
			"Rotom-Wash",
			"Rotom"
		]
	},
	{
		"id": "#486 Regigigas Family",
		"members": [
			"Regigigas"
		]
	},
	{
		"id": "#488 Cresselia Family",
		"members": [
			"Cresselia"
		]
	},
	{
		"id": "#506 Lillipup Family",
		"members": [
			"Lillipup",
			"Herdier",
			"Stoutland"
		]
	},
	{
		"id": "#509 Purrloin Family",
		"members": [
			"Purrloin",
			"Liepard"
		]
	},
	{
		"id": "#517 Munna Family",
		"members": [
			"Munna",
			"Musharna"
		]
	},
	{
		"id": "#519 Pidove Family",
		"members": [
			"Pidove",
			"Tranquill",
			"Unfezant"
		]
	},
	{
		"id": "#524 Roggenrola Family",
		"members": [
			"Roggenrola",
			"Boldore",
			"Gigalith"
		]
	},
	{
		"id": "#527 Woobat Family",
		"members": [
			"Woobat",
			"Swoobat"
		]
	},
	{
		"id": "#529 Drilbur Family",
		"members": [
			"Drilbur",
			"Excadrill",
			"Excadrill-Mega"
		]
	},
	{
		"id": "#531 Audino Family",
		"members": [
			"Audino",
			"Audino-Mega"
		]
	},
	{
		"id": "#532 Timburr Family",
		"members": [
			"Timburr",
			"Gurdurr",
			"Conkeldurr"
		]
	},
	{
		"id": "#535 Tympole Family",
		"members": [
			"Tympole",
			"Palpitoad",
			"Seismitoad"
		]
	},
	{
		"id": "#538 Throh Family",
		"members": [
			"Throh"
		]
	},
	{
		"id": "#539 Sawk Family",
		"members": [
			"Sawk"
		]
	},
	{
		"id": "#543 Venipede Family",
		"members": [
			"Venipede",
			"Whirlipede",
			"Scolipede",
			"Scolipede-Mega"
		]
	},
	{
		"id": "#546 Cottonee Family",
		"members": [
			"Cottonee",
			"Whimsicott"
		]
	},
	{
		"id": "#548 Petilil Family",
		"members": [
			"Petilil",
			"Lilligant"
		]
	},
	{
		"id": "#550 Basculin Family",
		"members": [
			"Basculin-Red",
			"Basculin-Blue"
		]
	},
	{
		"id": "#551 Sandile Family",
		"members": [
			"Sandile",
			"Krokorok",
			"Krookodile"
		]
	},
	{
		"id": "#554 Darumaka Family",
		"members": [
			"Darumaka-K",
			"Darumaka-G",
			"Darmanitan-K",
			"Darmanitan-G"
		]
	},
	{
		"id": "#556 Maractus Family",
		"members": [
			"Maractus"
		]
	},
	{
		"id": "#557 Dwebble Family",
		"members": [
			"Dwebble",
			"Crustle"
		]
	},
	{
		"id": "#559 Scraggy Family",
		"members": [
			"Scraggy",
			"Scrafty",
			"Scrafty-Mega"
		]
	},
	{
		"id": "#561 Sigilyph Family",
		"members": [
			"Sigilyph"
		]
	},
	{
		"id": "#562 Yamask Family",
		"members": [
			"Yamask-K",
			"Yamask-G",
			"Cofagrigus",
			"Runerigus"
		]
	},
	{
		"id": "#564 Tirtouga Family",
		"members": [
			"Tirtouga",
			"Carracosta"
		]
	},
	{
		"id": "#566 Archen Family",
		"members": [
			"Archen",
			"Archeops"
		]
	},
	{
		"id": "#568 Trubbish Family",
		"members": [
			"Trubbish",
			"Garbodor"
		]
	},
	{
		"id": "#570 Zorua Family",
		"members": [
			"Zorua",
			"Zoroark"
		]
	},
	{
		"id": "#572 Minccino Family",
		"members": [
			"Minccino",
			"Cinccino"
		]
	},
	{
		"id": "#574 Gothita Family",
		"members": [
			"Gothita",
			"Gothorita",
			"Gothitelle"
		]
	},
	{
		"id": "#577 Solosis Family",
		"members": [
			"Solosis",
			"Duosion",
			"Reuniclus"
		]
	},
	{
		"id": "#582 Vanillite Family",
		"members": [
			"Vanillite",
			"Vanillish",
			"Vanilluxe"
		]
	},
	{
		"id": "#587 Emolga Family",
		"members": [
			"Emolga"
		]
	},
	{
		"id": "#588 Karrablast Family",
		"members": [
			"Karrablast",
			"Escavalier"
		]
	},
	{
		"id": "#590 Foongus Family",
		"members": [
			"Foongus",
			"Amoonguss"
		]
	},
	{
		"id": "#592 Frillish Family",
		"members": [
			"Frillish",
			"Jellicent"
		]
	},
	{
		"id": "#595 Joltik Family",
		"members": [
			"Joltik",
			"Galvantula"
		]
	},
	{
		"id": "#597 Ferroseed Family",
		"members": [
			"Ferroseed",
			"Ferrothorn"
		]
	},
	{
		"id": "#599 Klink Family",
		"members": [
			"Klink",
			"Klang",
			"Klinklang"
		]
	},
	{
		"id": "#605 Elgyem Family",
		"members": [
			"Elgyem",
			"Beheeyem"
		]
	},
	{
		"id": "#607 Litwick Family",
		"members": [
			"Litwick",
			"Lampent",
			"Chandelure",
			"Chandelure-Mega"
		]
	},
	{
		"id": "#610 Axew Family",
		"members": [
			"Axew",
			"Fraxure",
			"Haxorus"
		]
	},
	{
		"id": "#613 Cubchoo Family",
		"members": [
			"Cubchoo",
			"Beartic"
		]
	},
	{
		"id": "#615 Cryogonal Family",
		"members": [
			"Cryogonal"
		]
	},
	{
		"id": "#616 Shelmet Family",
		"members": [
			"Shelmet",
			"Accelgor"
		]
	},
	{
		"id": "#618 Stunfisk Family",
		"members": [
			"Stunfisk-K",
			"Stunfisk-G"
		]
	},
	{
		"id": "#619 Mienfoo Family",
		"members": [
			"Mienfoo",
			"Mienshao"
		]
	},
	{
		"id": "#621 Druddigon Family",
		"members": [
			"Druddigon"
		]
	},
	{
		"id": "#622 Golett Family",
		"members": [
			"Golett",
			"Golurk",
			"Golurk-Mega"
		]
	},
	{
		"id": "#624 Pawniard Family",
		"members": [
			"Pawniard",
			"Bisharp",
			"Kingambit"
		]
	},
	{
		"id": "#626 Bouffalant Family",
		"members": [
			"Bouffalant"
		]
	},
	{
		"id": "#627 Rufflet Family",
		"members": [
			"Rufflet",
			"Braviary"
		]
	},
	{
		"id": "#629 Vullaby Family",
		"members": [
			"Vullaby",
			"Mandibuzz"
		]
	},
	{
		"id": "#631 Heatmor Family",
		"members": [
			"Heatmor"
		]
	},
	{
		"id": "#632 Durant Family",
		"members": [
			"Durant"
		]
	},
	{
		"id": "#633 Deino Family",
		"members": [
			"Deino",
			"Zweilous",
			"Hydreigon"
		]
	},
	{
		"id": "#636 Larvesta Family",
		"members": [
			"Larvesta",
			"Volcarona"
		]
	},
	{
		"id": "#640 Virizion Family",
		"members": [
			"Virizion"
		]
	},
	{
		"id": "#644 Zekrom Family",
		"members": [
			"Zekrom"
		]
	},
	{
		"id": "#645 Landorus Family",
		"members": [
			"Landorus-Incarnate",
			"Landorus-Therian",
			"Landorus"
		]
	},
	{
		"id": "#646 Kyurem Family",
		"members": [
			"Kyurem",
			"Kyurem-Black",
			"Kyurem-White"
		]
	},
	{
		"id": "#659 Bunnelby Family",
		"members": [
			"Bunnelby",
			"Diggersby"
		]
	},
	{
		"id": "#661 Fletchling Family",
		"members": [
			"Fletchling",
			"Fletchinder",
			"Talonflame"
		]
	},
	{
		"id": "#674 Pancham Family",
		"members": [
			"Pancham",
			"Pangoro"
		]
	},
	{
		"id": "#677 Espurr Family",
		"members": [
			"Espurr",
			"Meowstic-M",
			"Meowstic-F",
			"Meowstic",
			"Meowstic-Mega",
			"Meowstic-Mega-F"
		]
	},
	{
		"id": "#679 Honedge Family",
		"members": [
			"Honedge",
			"Doublade",
			"Aegislash",
			"Aegislash-Blade"
		]
	},
	{
		"id": "#682 Spritzee Family",
		"members": [
			"Spritzee",
			"Aromatisse"
		]
	},
	{
		"id": "#684 Swirlix Family",
		"members": [
			"Swirlix",
			"Slurpuff"
		]
	},
	{
		"id": "#686 Inkay Family",
		"members": [
			"Inkay",
			"Malamar",
			"Malamar-Mega"
		]
	},
	{
		"id": "#688 Binacle Family",
		"members": [
			"Binacle",
			"Barbaracle",
			"Barbaracle-Mega"
		]
	},
	{
		"id": "#690 Skrelp Family",
		"members": [
			"Skrelp",
			"Dragalge",
			"Dragalge-Mega"
		]
	},
	{
		"id": "#692 Clauncher Family",
		"members": [
			"Clauncher",
			"Clawitzer"
		]
	},
	{
		"id": "#694 Helioptile Family",
		"members": [
			"Helioptile",
			"Heliolisk"
		]
	},
	{
		"id": "#696 Tyrunt Family",
		"members": [
			"Tyrunt",
			"Tyrantrum"
		]
	},
	{
		"id": "#698 Amaura Family",
		"members": [
			"Amaura",
			"Aurorus"
		]
	},
	{
		"id": "#701 Hawlucha Family",
		"members": [
			"Hawlucha",
			"Hawlucha-Mega"
		]
	},
	{
		"id": "#702 Dedenne Family",
		"members": [
			"Dedenne"
		]
	},
	{
		"id": "#703 Carbink Family",
		"members": [
			"Carbink"
		]
	},
	{
		"id": "#704 Goomy Family",
		"members": [
			"Goomy",
			"Sliggoo",
			"Goodra",
			"Sliggoo-Hisui",
			"Goodra-Hisui"
		]
	},
	{
		"id": "#707 Klefki Family",
		"members": [
			"Klefki"
		]
	},
	{
		"id": "#708 Phantump Family",
		"members": [
			"Phantump",
			"Trevenant"
		]
	},
	{
		"id": "#710 Pumpkaboo Family",
		"members": [
			"Pumpkaboo-A",
			"Pumpkaboo-Sm",
			"Pumpkaboo-L",
			"Pumpkaboo-Su",
			"Gourgeist-A",
			"Gourgeist-Sm",
			"Gourgeist-L",
			"Gourgeist-Su"
		]
	},
	{
		"id": "#712 Bergmite Family",
		"members": [
			"Bergmite",
			"Avalugg"
		]
	},
	{
		"id": "#714 Noibat Family",
		"members": [
			"Noibat",
			"Noivern"
		]
	},
	{
		"id": "#722 Rowlet Family",
		"members": [
			"Rowlet",
			"Dartrix",
			"Decidueye",
			"Decidueye-Hisui"
		]
	},
	{
		"id": "#725 Litten Family",
		"members": [
			"Litten",
			"Torracat",
			"Incineroar"
		]
	},
	{
		"id": "#728 Popplio Family",
		"members": [
			"Popplio",
			"Brionne",
			"Primarina"
		]
	},
	{
		"id": "#736 Grubbin Family",
		"members": [
			"Grubbin",
			"Charjabug",
			"Vikavolt"
		]
	},
	{
		"id": "#742 Cutiefly Family",
		"members": [
			"Cutiefly",
			"Ribombee"
		]
	},
	{
		"id": "#744 Rockruff Family",
		"members": [
			"Rockruff",
			"Lycanroc-Midday",
			"Lycanroc-Midnight",
			"Lycanroc-Dusk",
			"Rockruff-Dusk",
			"Lycanroc"
		]
	},
	{
		"id": "#746 Wishiwashi Family",
		"members": [
			"Wishiwashi",
			"Wishiwashi-School"
		]
	},
	{
		"id": "#747 Mareanie Family",
		"members": [
			"Mareanie",
			"Toxapex"
		]
	},
	{
		"id": "#749 Mudbray Family",
		"members": [
			"Mudbray",
			"Mudsdale"
		]
	},
	{
		"id": "#751 Dewpider Family",
		"members": [
			"Dewpider",
			"Araquanid"
		]
	},
	{
		"id": "#753 Fomantis Family",
		"members": [
			"Fomantis",
			"Lurantis"
		]
	},
	{
		"id": "#755 Morelull Family",
		"members": [
			"Morelull",
			"Shiinotic"
		]
	},
	{
		"id": "#757 Salandit Family",
		"members": [
			"Salandit",
			"Salazzle"
		]
	},
	{
		"id": "#759 Stufful Family",
		"members": [
			"Stufful",
			"Bewear"
		]
	},
	{
		"id": "#761 Bounsweet Family",
		"members": [
			"Bounsweet",
			"Steenee",
			"Tsareena"
		]
	},
	{
		"id": "#764 Comfey Family",
		"members": [
			"Comfey"
		]
	},
	{
		"id": "#765 Oranguru Family",
		"members": [
			"Oranguru"
		]
	},
	{
		"id": "#766 Passimian Family",
		"members": [
			"Passimian"
		]
	},
	{
		"id": "#767 Wimpod Family",
		"members": [
			"Wimpod",
			"Golisopod",
			"Golisopod-Mega"
		]
	},
	{
		"id": "#769 Sandygast Family",
		"members": [
			"Sandygast",
			"Palossand"
		]
	},
	{
		"id": "#771 Pyukumuku Family",
		"members": [
			"Pyukumuku"
		]
	},
	{
		"id": "#776 Turtonator Family",
		"members": [
			"Turtonator"
		]
	},
	{
		"id": "#777 Togedemaru Family",
		"members": [
			"Togedemaru"
		]
	},
	{
		"id": "#778 Mimikyu Family",
		"members": [
			"Mimikyu",
			"Mimikyu-Busted"
		]
	},
	{
		"id": "#780 Drampa Family",
		"members": [
			"Drampa",
			"Drampa-Mega"
		]
	},
	{
		"id": "#781 Dhelmise Family",
		"members": [
			"Dhelmise"
		]
	},
	{
		"id": "#782 Jangmo-o Family",
		"members": [
			"Jangmo-o",
			"Hakamo-o",
			"Kommo-o"
		]
	},
	{
		"id": "#788 Tapu Fini Family",
		"members": [
			"Tapu Fini"
		]
	},
	{
		"id": "#789 Cosmog Family",
		"members": [
			"Cosmog",
			"Cosmoem",
			"Solgaleo",
			"Lunala"
		]
	},
	{
		"id": "#800 Necrozma Family",
		"members": [
			"Necrozma",
			"Necrozma-Dawn-Wings",
			"Necrozma-Dusk-Mane"
		]
	},
	{
		"id": "#809 Melmetal Family",
		"members": [
			"Melmetal"
		]
	},
	{
		"id": "#810 Grookey Family",
		"members": [
			"Grookey",
			"Thwackey",
			"Rillaboom"
		]
	},
	{
		"id": "#813 Scorbunny Family",
		"members": [
			"Scorbunny",
			"Raboot",
			"Cinderace"
		]
	},
	{
		"id": "#816 Sobble Family",
		"members": [
			"Sobble",
			"Drizzile",
			"Inteleon"
		]
	},
	{
		"id": "#819 Skwovet Family",
		"members": [
			"Skwovet",
			"Greedent"
		]
	},
	{
		"id": "#821 Rookidee Family",
		"members": [
			"Rookidee",
			"Corvisquire",
			"Corviknight"
		]
	},
	{
		"id": "#824 Blipbug Family",
		"members": [
			"Blipbug",
			"Dottler",
			"Orbeetle"
		]
	},
	{
		"id": "#827 Nickit Family",
		"members": [
			"Nickit",
			"Thievul"
		]
	},
	{
		"id": "#829 Gossifleur Family",
		"members": [
			"Gossifleur",
			"Eldegoss"
		]
	},
	{
		"id": "#831 Wooloo Family",
		"members": [
			"Wooloo",
			"Dubwool"
		]
	},
	{
		"id": "#833 Chewtle Family",
		"members": [
			"Chewtle",
			"Drednaw"
		]
	},
	{
		"id": "#835 Yamper Family",
		"members": [
			"Yamper",
			"Boltund"
		]
	},
	{
		"id": "#837 Rolycoly Family",
		"members": [
			"Rolycoly",
			"Carkol",
			"Coalossal"
		]
	},
	{
		"id": "#840 Applin Family",
		"members": [
			"Applin",
			"Flapple",
			"Appletun"
		]
	},
	{
		"id": "#843 Silicobra Family",
		"members": [
			"Silicobra",
			"Sandaconda"
		]
	},
	{
		"id": "#845 Cramorant Family",
		"members": [
			"Cramorant",
			"Cramorant-Gulping",
			"Cramorant-Gorging"
		]
	},
	{
		"id": "#846 Arrokuda Family",
		"members": [
			"Arrokuda",
			"Barraskewda"
		]
	},
	{
		"id": "#848 Toxel Family",
		"members": [
			"Toxel",
			"Toxtricity-Amped",
			"Toxtricity-Low-Key",
			"Toxtricity"
		]
	},
	{
		"id": "#850 Sizzlipede Family",
		"members": [
			"Sizzlipede",
			"Centiskorch"
		]
	},
	{
		"id": "#852 Clobbopus Family",
		"members": [
			"Clobbopus",
			"Grapploct"
		]
	},
	{
		"id": "#854 Sinistea Family",
		"members": [
			"Sinistea",
			"Polteageist",
			"Sinistea-Antique",
			"Polteageist-Antique"
		]
	},
	{
		"id": "#856 Hatenna Family",
		"members": [
			"Hatenna",
			"Hattrem",
			"Hatterene"
		]
	},
	{
		"id": "#859 Impidimp Family",
		"members": [
			"Impidimp",
			"Morgrem",
			"Grimmsnarl"
		]
	},
	{
		"id": "#868 Milcery Family",
		"members": [
			"Milcery",
			"Alcremie",
			"Alcremie-Ruby-Cream-Strawberry-Sweet",
			"Alcremie-Matcha-Cream-Strawberry-Sweet",
			"Alcremie-Mint-Cream-Strawberry-Sweet",
			"Alcremie-Lemon-Cream-Strawberry-Sweet",
			"Alcremie-Salted-Cream-Strawberry-Sweet",
			"Alcremie-Ruby-Swirl-Strawberry-Sweet",
			"Alcremie-Caramel-Swirl-Strawberry-Sweet",
			"Alcremie-Rainbow-Swirl-Strawberry-Sweet"
		]
	},
	{
		"id": "#870 Falinks Family",
		"members": [
			"Falinks",
			"Falinks-Mega"
		]
	},
	{
		"id": "#871 Pincurchin Family",
		"members": [
			"Pincurchin"
		]
	},
	{
		"id": "#872 Snom Family",
		"members": [
			"Snom",
			"Frosmoth"
		]
	},
	{
		"id": "#874 Stonjourner Family",
		"members": [
			"Stonjourner"
		]
	},
	{
		"id": "#875 Eiscue Family",
		"members": [
			"Eiscue",
			"Eiscue-Noice"
		]
	},
	{
		"id": "#876 Indeedee Family",
		"members": [
			"Indeedee-M",
			"Indeedee-F"
		]
	},
	{
		"id": "#877 Morpeko Family",
		"members": [
			"Morpeko",
			"Morpeko-Hangry"
		]
	},
	{
		"id": "#878 Cufant Family",
		"members": [
			"Cufant",
			"Copperajah"
		]
	},
	{
		"id": "#880 Dracozolt Family",
		"members": [
			"Dracozolt"
		]
	},
	{
		"id": "#881 Arctozolt Family",
		"members": [
			"Arctozolt"
		]
	},
	{
		"id": "#882 Dracovish Family",
		"members": [
			"Dracovish"
		]
	},
	{
		"id": "#883 Arctovish Family",
		"members": [
			"Arctovish"
		]
	},
	{
		"id": "#884 Duraludon Family",
		"members": [
			"Duraludon",
			"Archaludon"
		]
	},
	{
		"id": "#885 Dreepy Family",
		"members": [
			"Dreepy",
			"Drakloak",
			"Dragapult"
		]
	},
	{
		"id": "#004 Charmander Family",
		"members": [
			"Charmander"
		]
	},
	{
		"id": "#005 Charmeleon Family",
		"members": [
			"Charmeleon"
		]
	},
	{
		"id": "#006 Charizard Family",
		"members": [
			"Charizard",
			"Charizard-Mega-X",
			"Charizard-Mega-Y"
		]
	},
	{
		"id": "#013 Weedle Family",
		"members": [
			"Weedle"
		]
	},
	{
		"id": "#014 Kakuna Family",
		"members": [
			"Kakuna"
		]
	},
	{
		"id": "#015 Beedrill Family",
		"members": [
			"Beedrill",
			"Beedrill-Mega"
		]
	},
	{
		"id": "#016 Pidgey Family",
		"members": [
			"Pidgey"
		]
	},
	{
		"id": "#017 Pidgeotto Family",
		"members": [
			"Pidgeotto"
		]
	},
	{
		"id": "#018 Pidgeot Family",
		"members": [
			"Pidgeot",
			"Pidgeot-Mega"
		]
	},
	{
		"id": "#023 Ekans Family",
		"members": [
			"Ekans"
		]
	},
	{
		"id": "#024 Arbok Family",
		"members": [
			"Arbok"
		]
	},
	{
		"id": "#050 Diglett Family",
		"members": [
			"Diglett",
			"Diglett-Alola"
		]
	},
	{
		"id": "#051 Dugtrio Family",
		"members": [
			"Dugtrio",
			"Dugtrio-Alola"
		]
	},
	{
		"id": "#056 Mankey Family",
		"members": [
			"Mankey"
		]
	},
	{
		"id": "#057 Primeape Family",
		"members": [
			"Primeape"
		]
	},
	{
		"id": "#069 Bellsprout Family",
		"members": [
			"Bellsprout"
		]
	},
	{
		"id": "#070 Weepinbell Family",
		"members": [
			"Weepinbell"
		]
	},
	{
		"id": "#071 Victreebel Family",
		"members": [
			"Victreebel",
			"Victreebel-Mega"
		]
	},
	{
		"id": "#074 Geodude Family",
		"members": [
			"Geodude",
			"Geodude-Alola"
		]
	},
	{
		"id": "#075 Graveler Family",
		"members": [
			"Graveler",
			"Graveler-Alola"
		]
	},
	{
		"id": "#076 Golem Family",
		"members": [
			"Golem",
			"Golem-Alola"
		]
	},
	{
		"id": "#083 Farfetch’d Family",
		"members": [
			"Farfetch’d",
			"Farfetch’d-Galar"
		]
	},
	{
		"id": "#084 Doduo Family",
		"members": [
			"Doduo"
		]
	},
	{
		"id": "#085 Dodrio Family",
		"members": [
			"Dodrio"
		]
	},
	{
		"id": "#088 Grimer Family",
		"members": [
			"Grimer",
			"Grimer-Alola"
		]
	},
	{
		"id": "#089 Muk Family",
		"members": [
			"Muk",
			"Muk-Alola"
		]
	},
	{
		"id": "#096 Drowzee Family",
		"members": [
			"Drowzee"
		]
	},
	{
		"id": "#097 Hypno Family",
		"members": [
			"Hypno"
		]
	},
	{
		"id": "#100 Voltorb Family",
		"members": [
			"Voltorb",
			"Voltorb-Hisui"
		]
	},
	{
		"id": "#101 Electrode Family",
		"members": [
			"Electrode",
			"Electrode-Hisui"
		]
	},
	{
		"id": "#115 Kangaskhan Family",
		"members": [
			"Kangaskhan",
			"Kangaskhan-Mega"
		]
	},
	{
		"id": "#123 Scyther Family",
		"members": [
			"Scyther"
		]
	},
	{
		"id": "#142 Aerodactyl Family",
		"members": [
			"Aerodactyl",
			"Aerodactyl-Mega"
		]
	},
	{
		"id": "#144 Articuno Family",
		"members": [
			"Articuno",
			"Articuno-Galar"
		]
	},
	{
		"id": "#145 Zapdos Family",
		"members": [
			"Zapdos",
			"Zapdos-Galar"
		]
	},
	{
		"id": "#146 Moltres Family",
		"members": [
			"Moltres",
			"Moltres-Galar"
		]
	},
	{
		"id": "#150 Mewtwo Family",
		"members": [
			"Mewtwo",
			"Mewtwo-Mega-X",
			"Mewtwo-Mega-Y"
		]
	},
	{
		"id": "#151 Mew Family",
		"members": [
			"Mew"
		]
	},
	{
		"id": "#152 Chikorita Family",
		"members": [
			"Chikorita"
		]
	},
	{
		"id": "#153 Bayleef Family",
		"members": [
			"Bayleef"
		]
	},
	{
		"id": "#154 Meganium Family",
		"members": [
			"Meganium",
			"Meganium-Mega"
		]
	},
	{
		"id": "#155 Cyndaquil Family",
		"members": [
			"Cyndaquil"
		]
	},
	{
		"id": "#156 Quilava Family",
		"members": [
			"Quilava"
		]
	},
	{
		"id": "#157 Typhlosion Family",
		"members": [
			"Typhlosion",
			"Typhlosion-Hisui"
		]
	},
	{
		"id": "#158 Totodile Family",
		"members": [
			"Totodile"
		]
	},
	{
		"id": "#159 Croconaw Family",
		"members": [
			"Croconaw"
		]
	},
	{
		"id": "#160 Feraligatr Family",
		"members": [
			"Feraligatr",
			"Feraligatr-Mega"
		]
	},
	{
		"id": "#167 Spinarak Family",
		"members": [
			"Spinarak"
		]
	},
	{
		"id": "#168 Ariados Family",
		"members": [
			"Ariados"
		]
	},
	{
		"id": "#179 Mareep Family",
		"members": [
			"Mareep"
		]
	},
	{
		"id": "#180 Flaaffy Family",
		"members": [
			"Flaaffy"
		]
	},
	{
		"id": "#181 Ampharos Family",
		"members": [
			"Ampharos",
			"Ampharos-Mega"
		]
	},
	{
		"id": "#191 Sunkern Family",
		"members": [
			"Sunkern"
		]
	},
	{
		"id": "#192 Sunflora Family",
		"members": [
			"Sunflora"
		]
	},
	{
		"id": "#193 Yanma Family",
		"members": [
			"Yanma"
		]
	},
	{
		"id": "#198 Murkrow Family",
		"members": [
			"Murkrow"
		]
	},
	{
		"id": "#200 Misdreavus Family",
		"members": [
			"Misdreavus"
		]
	},
	{
		"id": "#203 Girafarig Family",
		"members": [
			"Girafarig"
		]
	},
	{
		"id": "#207 Gligar Family",
		"members": [
			"Gligar"
		]
	},
	{
		"id": "#209 Snubbull Family",
		"members": [
			"Snubbull"
		]
	},
	{
		"id": "#210 Granbull Family",
		"members": [
			"Granbull"
		]
	},
	{
		"id": "#212 Scizor Family",
		"members": [
			"Scizor",
			"Scizor-Mega"
		]
	},
	{
		"id": "#216 Teddiursa Family",
		"members": [
			"Teddiursa"
		]
	},
	{
		"id": "#217 Ursaring Family",
		"members": [
			"Ursaring"
		]
	},
	{
		"id": "#218 Slugma Family",
		"members": [
			"Slugma"
		]
	},
	{
		"id": "#219 Magcargo Family",
		"members": [
			"Magcargo"
		]
	},
	{
		"id": "#222 Corsola Family",
		"members": [
			"Corsola",
			"Corsola-Galar"
		]
	},
	{
		"id": "#228 Houndour Family",
		"members": [
			"Houndour"
		]
	},
	{
		"id": "#229 Houndoom Family",
		"members": [
			"Houndoom",
			"Houndoom-Mega"
		]
	},
	{
		"id": "#231 Phanpy Family",
		"members": [
			"Phanpy"
		]
	},
	{
		"id": "#232 Donphan Family",
		"members": [
			"Donphan"
		]
	},
	{
		"id": "#243 Raikou Family",
		"members": [
			"Raikou"
		]
	},
	{
		"id": "#244 Entei Family",
		"members": [
			"Entei"
		]
	},
	{
		"id": "#249 Lugia Family",
		"members": [
			"Lugia"
		]
	},
	{
		"id": "#250 Ho-Oh Family",
		"members": [
			"Ho-Oh"
		]
	},
	{
		"id": "#251 Celebi Family",
		"members": [
			"Celebi"
		]
	},
	{
		"id": "#261 Poochyena Family",
		"members": [
			"Poochyena"
		]
	},
	{
		"id": "#262 Mightyena Family",
		"members": [
			"Mightyena"
		]
	},
	{
		"id": "#263 Zigzagoon Family",
		"members": [
			"Zigzagoon",
			"Zigzagoon-Galar"
		]
	},
	{
		"id": "#264 Linoone Family",
		"members": [
			"Linoone",
			"Linoone-Galar"
		]
	},
	{
		"id": "#283 Surskit Family",
		"members": [
			"Surskit"
		]
	},
	{
		"id": "#284 Masquerain Family",
		"members": [
			"Masquerain"
		]
	},
	{
		"id": "#285 Shroomish Family",
		"members": [
			"Shroomish"
		]
	},
	{
		"id": "#286 Breloom Family",
		"members": [
			"Breloom"
		]
	},
	{
		"id": "#287 Slakoth Family",
		"members": [
			"Slakoth"
		]
	},
	{
		"id": "#288 Vigoroth Family",
		"members": [
			"Vigoroth"
		]
	},
	{
		"id": "#289 Slaking Family",
		"members": [
			"Slaking"
		]
	},
	{
		"id": "#296 Makuhita Family",
		"members": [
			"Makuhita"
		]
	},
	{
		"id": "#297 Hariyama Family",
		"members": [
			"Hariyama"
		]
	},
	{
		"id": "#307 Meditite Family",
		"members": [
			"Meditite"
		]
	},
	{
		"id": "#308 Medicham Family",
		"members": [
			"Medicham",
			"Medicham-Mega"
		]
	},
	{
		"id": "#311 Plusle Family",
		"members": [
			"Plusle"
		]
	},
	{
		"id": "#312 Minun Family",
		"members": [
			"Minun"
		]
	},
	{
		"id": "#316 Gulpin Family",
		"members": [
			"Gulpin"
		]
	},
	{
		"id": "#317 Swalot Family",
		"members": [
			"Swalot"
		]
	},
	{
		"id": "#322 Numel Family",
		"members": [
			"Numel"
		]
	},
	{
		"id": "#323 Camerupt Family",
		"members": [
			"Camerupt",
			"Camerupt-Mega"
		]
	},
	{
		"id": "#325 Spoink Family",
		"members": [
			"Spoink"
		]
	},
	{
		"id": "#326 Grumpig Family",
		"members": [
			"Grumpig"
		]
	},
	{
		"id": "#331 Cacnea Family",
		"members": [
			"Cacnea"
		]
	},
	{
		"id": "#332 Cacturne Family",
		"members": [
			"Cacturne"
		]
	},
	{
		"id": "#335 Zangoose Family",
		"members": [
			"Zangoose"
		]
	},
	{
		"id": "#336 Seviper Family",
		"members": [
			"Seviper"
		]
	},
	{
		"id": "#352 Kecleon Family",
		"members": [
			"Kecleon"
		]
	},
	{
		"id": "#353 Shuppet Family",
		"members": [
			"Shuppet"
		]
	},
	{
		"id": "#354 Banette Family",
		"members": [
			"Banette",
			"Banette-Mega"
		]
	},
	{
		"id": "#357 Tropius Family",
		"members": [
			"Tropius"
		]
	},
	{
		"id": "#358 Chimecho Family",
		"members": [
			"Chimecho",
			"Chimecho-Mega"
		]
	},
	{
		"id": "#359 Absol Family",
		"members": [
			"Absol",
			"Absol-Mega",
			"Absol-Mega-Z"
		]
	},
	{
		"id": "#377 Regirock Family",
		"members": [
			"Regirock"
		]
	},
	{
		"id": "#378 Regice Family",
		"members": [
			"Regice"
		]
	},
	{
		"id": "#379 Registeel Family",
		"members": [
			"Registeel"
		]
	},
	{
		"id": "#380 Latias Family",
		"members": [
			"Latias",
			"Latias-Mega"
		]
	},
	{
		"id": "#381 Latios Family",
		"members": [
			"Latios",
			"Latios-Mega"
		]
	},
	{
		"id": "#382 Kyogre Family",
		"members": [
			"Kyogre",
			"Kyogre-Primal"
		]
	},
	{
		"id": "#383 Groudon Family",
		"members": [
			"Groudon",
			"Groudon-Primal"
		]
	},
	{
		"id": "#384 Rayquaza Family",
		"members": [
			"Rayquaza",
			"Rayquaza-Mega"
		]
	},
	{
		"id": "#385 Jirachi Family",
		"members": [
			"Jirachi"
		]
	},
	{
		"id": "#386 Deoxys Family",
		"members": [
			"Deoxys",
			"Deoxys-Attack",
			"Deoxys-Defense",
			"Deoxys-Speed"
		]
	},
	{
		"id": "#387 Turtwig Family",
		"members": [
			"Turtwig"
		]
	},
	{
		"id": "#388 Grotle Family",
		"members": [
			"Grotle"
		]
	},
	{
		"id": "#389 Torterra Family",
		"members": [
			"Torterra"
		]
	},
	{
		"id": "#390 Chimchar Family",
		"members": [
			"Chimchar"
		]
	},
	{
		"id": "#391 Monferno Family",
		"members": [
			"Monferno"
		]
	},
	{
		"id": "#392 Infernape Family",
		"members": [
			"Infernape"
		]
	},
	{
		"id": "#393 Piplup Family",
		"members": [
			"Piplup"
		]
	},
	{
		"id": "#394 Prinplup Family",
		"members": [
			"Prinplup"
		]
	},
	{
		"id": "#395 Empoleon Family",
		"members": [
			"Empoleon"
		]
	},
	{
		"id": "#396 Starly Family",
		"members": [
			"Starly"
		]
	},
	{
		"id": "#397 Staravia Family",
		"members": [
			"Staravia"
		]
	},
	{
		"id": "#398 Staraptor Family",
		"members": [
			"Staraptor",
			"Staraptor-Mega"
		]
	},
	{
		"id": "#408 Cranidos Family",
		"members": [
			"Cranidos"
		]
	},
	{
		"id": "#409 Rampardos Family",
		"members": [
			"Rampardos"
		]
	},
	{
		"id": "#410 Shieldon Family",
		"members": [
			"Shieldon"
		]
	},
	{
		"id": "#411 Bastiodon Family",
		"members": [
			"Bastiodon"
		]
	},
	{
		"id": "#422 Shellos Family",
		"members": [
			"Shellos",
			"Shellos-East"
		]
	},
	{
		"id": "#423 Gastrodon Family",
		"members": [
			"Gastrodon",
			"Gastrodon-East"
		]
	},
	{
		"id": "#429 Mismagius Family",
		"members": [
			"Mismagius"
		]
	},
	{
		"id": "#430 Honchkrow Family",
		"members": [
			"Honchkrow"
		]
	},
	{
		"id": "#433 Chingling Family",
		"members": [
			"Chingling"
		]
	},
	{
		"id": "#469 Yanmega Family",
		"members": [
			"Yanmega"
		]
	},
	{
		"id": "#472 Gliscor Family",
		"members": [
			"Gliscor"
		]
	},
	{
		"id": "#480 Uxie Family",
		"members": [
			"Uxie"
		]
	},
	{
		"id": "#481 Mesprit Family",
		"members": [
			"Mesprit"
		]
	},
	{
		"id": "#482 Azelf Family",
		"members": [
			"Azelf"
		]
	},
	{
		"id": "#483 Dialga Family",
		"members": [
			"Dialga",
			"Dialga-Origin"
		]
	},
	{
		"id": "#484 Palkia Family",
		"members": [
			"Palkia",
			"Palkia-Origin"
		]
	},
	{
		"id": "#485 Heatran Family",
		"members": [
			"Heatran",
			"Heatran-Mega"
		]
	},
	{
		"id": "#487 Giratina Family",
		"members": [
			"Giratina",
			"Giratina-Origin"
		]
	},
	{
		"id": "#491 Darkrai Family",
		"members": [
			"Darkrai",
			"Darkrai-Mega"
		]
	},
	{
		"id": "#494 Victini Family",
		"members": [
			"Victini"
		]
	},
	{
		"id": "#495 Snivy Family",
		"members": [
			"Snivy"
		]
	},
	{
		"id": "#496 Servine Family",
		"members": [
			"Servine"
		]
	},
	{
		"id": "#497 Serperior Family",
		"members": [
			"Serperior"
		]
	},
	{
		"id": "#498 Tepig Family",
		"members": [
			"Tepig"
		]
	},
	{
		"id": "#499 Pignite Family",
		"members": [
			"Pignite"
		]
	},
	{
		"id": "#500 Emboar Family",
		"members": [
			"Emboar",
			"Emboar-Mega"
		]
	},
	{
		"id": "#501 Oshawott Family",
		"members": [
			"Oshawott"
		]
	},
	{
		"id": "#502 Dewott Family",
		"members": [
			"Dewott"
		]
	},
	{
		"id": "#503 Samurott Family",
		"members": [
			"Samurott",
			"Samurott-Hisui"
		]
	},
	{
		"id": "#522 Blitzle Family",
		"members": [
			"Blitzle"
		]
	},
	{
		"id": "#523 Zebstrika Family",
		"members": [
			"Zebstrika"
		]
	},
	{
		"id": "#540 Sewaddle Family",
		"members": [
			"Sewaddle"
		]
	},
	{
		"id": "#541 Swadloon Family",
		"members": [
			"Swadloon"
		]
	},
	{
		"id": "#542 Leavanny Family",
		"members": [
			"Leavanny"
		]
	},
	{
		"id": "#550 Basculin Family",
		"members": [
			"Basculin",
			"Basculin-Blue-Striped",
			"Basculin-White-Striped"
		]
	},
	{
		"id": "#554 Darumaka Family",
		"members": [
			"Darumaka",
			"Darumaka-Galar"
		]
	},
	{
		"id": "#555 Darmanitan Family",
		"members": [
			"Darmanitan",
			"Darmanitan-Zen",
			"Darmanitan-Galar",
			"Darmanitan-Galar-Zen"
		]
	},
	{
		"id": "#562 Yamask Family",
		"members": [
			"Yamask",
			"Yamask-Galar"
		]
	},
	{
		"id": "#602 Tynamo Family",
		"members": [
			"Tynamo"
		]
	},
	{
		"id": "#603 Eelektrik Family",
		"members": [
			"Eelektrik"
		]
	},
	{
		"id": "#604 Eelektross Family",
		"members": [
			"Eelektross",
			"Eelektross-Mega"
		]
	},
	{
		"id": "#618 Stunfisk Family",
		"members": [
			"Stunfisk",
			"Stunfisk-Galar"
		]
	},
	{
		"id": "#638 Cobalion Family",
		"members": [
			"Cobalion"
		]
	},
	{
		"id": "#639 Terrakion Family",
		"members": [
			"Terrakion"
		]
	},
	{
		"id": "#641 Tornadus Family",
		"members": [
			"Tornadus",
			"Tornadus-Therian"
		]
	},
	{
		"id": "#642 Thundurus Family",
		"members": [
			"Thundurus",
			"Thundurus-Therian"
		]
	},
	{
		"id": "#643 Reshiram Family",
		"members": [
			"Reshiram"
		]
	},
	{
		"id": "#647 Keldeo Family",
		"members": [
			"Keldeo",
			"Keldeo-Resolute"
		]
	},
	{
		"id": "#649 Genesect Family",
		"members": [
			"Genesect",
			"Genesect-Douse",
			"Genesect-Shock",
			"Genesect-Burn",
			"Genesect-Chill"
		]
	},
	{
		"id": "#650 Chespin Family",
		"members": [
			"Chespin"
		]
	},
	{
		"id": "#651 Quilladin Family",
		"members": [
			"Quilladin"
		]
	},
	{
		"id": "#652 Chesnaught Family",
		"members": [
			"Chesnaught",
			"Chesnaught-Mega"
		]
	},
	{
		"id": "#653 Fennekin Family",
		"members": [
			"Fennekin"
		]
	},
	{
		"id": "#654 Braixen Family",
		"members": [
			"Braixen"
		]
	},
	{
		"id": "#655 Delphox Family",
		"members": [
			"Delphox",
			"Delphox-Mega"
		]
	},
	{
		"id": "#656 Froakie Family",
		"members": [
			"Froakie"
		]
	},
	{
		"id": "#657 Frogadier Family",
		"members": [
			"Frogadier"
		]
	},
	{
		"id": "#658 Greninja Family",
		"members": [
			"Greninja",
			"Greninja-Mega"
		]
	},
	{
		"id": "#667 Litleo Family",
		"members": [
			"Litleo"
		]
	},
	{
		"id": "#668 Pyroar Family",
		"members": [
			"Pyroar",
			"Pyroar-Mega"
		]
	},
	{
		"id": "#672 Skiddo Family",
		"members": [
			"Skiddo"
		]
	},
	{
		"id": "#673 Gogoat Family",
		"members": [
			"Gogoat"
		]
	},
	{
		"id": "#710 Pumpkaboo Family",
		"members": [
			"Pumpkaboo",
			"Pumpkaboo-Small",
			"Pumpkaboo-Large",
			"Pumpkaboo-Super"
		]
	},
	{
		"id": "#711 Gourgeist Family",
		"members": [
			"Gourgeist",
			"Gourgeist-Small",
			"Gourgeist-Large",
			"Gourgeist-Super"
		]
	},
	{
		"id": "#716 Xerneas Family",
		"members": [
			"Xerneas",
			"Xerneas-Active"
		]
	},
	{
		"id": "#717 Yveltal Family",
		"members": [
			"Yveltal"
		]
	},
	{
		"id": "#718 Zygarde Family",
		"members": [
			"Zygarde",
			"Zygarde-10",
			"Zygarde-10-Power-Construct",
			"Zygarde-Power-Construct",
			"Zygarde-Complete",
			"Zygarde-Mega"
		]
	},
	{
		"id": "#719 Diancie Family",
		"members": [
			"Diancie",
			"Diancie-Mega"
		]
	},
	{
		"id": "#720 Hoopa Family",
		"members": [
			"Hoopa",
			"Hoopa-Unbound"
		]
	},
	{
		"id": "#721 Volcanion Family",
		"members": [
			"Volcanion"
		]
	},
	{
		"id": "#739 Crabrawler Family",
		"members": [
			"Crabrawler"
		]
	},
	{
		"id": "#740 Crabominable Family",
		"members": [
			"Crabominable",
			"Crabominable-Mega"
		]
	},
	{
		"id": "#772 Type: Null Family",
		"members": [
			"Type: Null"
		]
	},
	{
		"id": "#773 Silvally Family",
		"members": [
			"Silvally",
			"Silvally-Fighting",
			"Silvally-Flying",
			"Silvally-Poison",
			"Silvally-Ground",
			"Silvally-Rock",
			"Silvally-Bug",
			"Silvally-Ghost",
			"Silvally-Steel",
			"Silvally-Fire",
			"Silvally-Water",
			"Silvally-Grass",
			"Silvally-Electric",
			"Silvally-Psychic",
			"Silvally-Ice",
			"Silvally-Dragon",
			"Silvally-Dark",
			"Silvally-Fairy"
		]
	},
	{
		"id": "#785 Tapu Koko Family",
		"members": [
			"Tapu Koko"
		]
	},
	{
		"id": "#786 Tapu Lele Family",
		"members": [
			"Tapu Lele"
		]
	},
	{
		"id": "#787 Tapu Bulu Family",
		"members": [
			"Tapu Bulu"
		]
	},
	{
		"id": "#793 Nihilego Family",
		"members": [
			"Nihilego"
		]
	},
	{
		"id": "#794 Buzzwole Family",
		"members": [
			"Buzzwole"
		]
	},
	{
		"id": "#795 Pheromosa Family",
		"members": [
			"Pheromosa"
		]
	},
	{
		"id": "#796 Xurkitree Family",
		"members": [
			"Xurkitree"
		]
	},
	{
		"id": "#797 Celesteela Family",
		"members": [
			"Celesteela"
		]
	},
	{
		"id": "#798 Kartana Family",
		"members": [
			"Kartana"
		]
	},
	{
		"id": "#799 Guzzlord Family",
		"members": [
			"Guzzlord"
		]
	},
	{
		"id": "#801 Magearna Family",
		"members": [
			"Magearna",
			"Magearna-Original",
			"Magearna-Mega",
			"Magearna-Original-Mega"
		]
	},
	{
		"id": "#802 Marshadow Family",
		"members": [
			"Marshadow"
		]
	},
	{
		"id": "#803 Poipole Family",
		"members": [
			"Poipole"
		]
	},
	{
		"id": "#804 Naganadel Family",
		"members": [
			"Naganadel"
		]
	},
	{
		"id": "#805 Stakataka Family",
		"members": [
			"Stakataka"
		]
	},
	{
		"id": "#806 Blacephalon Family",
		"members": [
			"Blacephalon"
		]
	},
	{
		"id": "#807 Zeraora Family",
		"members": [
			"Zeraora",
			"Zeraora-Mega"
		]
	},
	{
		"id": "#808 Meltan Family",
		"members": [
			"Meltan"
		]
	},
	{
		"id": "#876 Indeedee Family",
		"members": [
			"Indeedee",
			"Indeedee-F"
		]
	},
	{
		"id": "#888 Zacian Family",
		"members": [
			"Zacian",
			"Zacian-Crowned"
		]
	},
	{
		"id": "#889 Zamazenta Family",
		"members": [
			"Zamazenta",
			"Zamazenta-Crowned"
		]
	},
	{
		"id": "#890 Eternatus Family",
		"members": [
			"Eternatus",
			"Eternatus-Eternamax"
		]
	},
	{
		"id": "#891 Kubfu Family",
		"members": [
			"Kubfu"
		]
	},
	{
		"id": "#892 Urshifu Family",
		"members": [
			"Urshifu",
			"Urshifu-Rapid-Strike"
		]
	},
	{
		"id": "#893 Zarude Family",
		"members": [
			"Zarude",
			"Zarude-Dada"
		]
	},
	{
		"id": "#894 Regieleki Family",
		"members": [
			"Regieleki"
		]
	},
	{
		"id": "#895 Regidrago Family",
		"members": [
			"Regidrago"
		]
	},
	{
		"id": "#896 Glastrier Family",
		"members": [
			"Glastrier"
		]
	},
	{
		"id": "#897 Spectrier Family",
		"members": [
			"Spectrier"
		]
	},
	{
		"id": "#898 Calyrex Family",
		"members": [
			"Calyrex",
			"Calyrex-Ice",
			"Calyrex-Shadow"
		]
	},
	{
		"id": "#901 Ursaluna Family",
		"members": [
			"Ursaluna"
		]
	},
	{
		"id": "#902 Basculegion Family",
		"members": [
			"Basculegion",
			"Basculegion-F"
		]
	},
	{
		"id": "#905 Enamorus Family",
		"members": [
			"Enamorus",
			"Enamorus-Therian"
		]
	},
	{
		"id": "#979 Annihilape Family",
		"members": [
			"Annihilape"
		]
	},
	{
		"id": "#981 Farigiraf Family",
		"members": [
			"Farigiraf"
		]
	},
	{
		"id": "#984 Great Tusk Family",
		"members": [
			"Great Tusk"
		]
	},
	{
		"id": "#985 Scream Tail Family",
		"members": [
			"Scream Tail"
		]
	},
	{
		"id": "#986 Brute Bonnet Family",
		"members": [
			"Brute Bonnet"
		]
	},
	{
		"id": "#987 Flutter Mane Family",
		"members": [
			"Flutter Mane"
		]
	},
	{
		"id": "#988 Slither Wing Family",
		"members": [
			"Slither Wing"
		]
	},
	{
		"id": "#989 Sandy Shocks Family",
		"members": [
			"Sandy Shocks"
		]
	},
	{
		"id": "#990 Iron Treads Family",
		"members": [
			"Iron Treads"
		]
	},
	{
		"id": "#991 Iron Bundle Family",
		"members": [
			"Iron Bundle"
		]
	},
	{
		"id": "#992 Iron Hands Family",
		"members": [
			"Iron Hands"
		]
	},
	{
		"id": "#993 Iron Jugulis Family",
		"members": [
			"Iron Jugulis"
		]
	},
	{
		"id": "#994 Iron Moth Family",
		"members": [
			"Iron Moth"
		]
	},
	{
		"id": "#995 Iron Thorns Family",
		"members": [
			"Iron Thorns"
		]
	},
	{
		"id": "#996 Frigibax Family",
		"members": [
			"Frigibax"
		]
	},
	{
		"id": "#997 Arctibax Family",
		"members": [
			"Arctibax"
		]
	},
	{
		"id": "#998 Baxcalibur Family",
		"members": [
			"Baxcalibur"
		]
	},
	{
		"id": "#1000 Gholdengo Family",
		"members": [
			"Gholdengo"
		]
	},
	{
		"id": "#1001 Wo-Chien Family",
		"members": [
			"Wo-Chien"
		]
	},
	{
		"id": "#1002 Chien-Pao Family",
		"members": [
			"Chien-Pao"
		]
	},
	{
		"id": "#1003 Ting-Lu Family",
		"members": [
			"Ting-Lu"
		]
	},
	{
		"id": "#1004 Chi-Yu Family",
		"members": [
			"Chi-Yu"
		]
	},
	{
		"id": "#1005 Roaring Moon Family",
		"members": [
			"Roaring Moon"
		]
	},
	{
		"id": "#1006 Iron Valiant Family",
		"members": [
			"Iron Valiant"
		]
	},
	{
		"id": "#1009 Walking Wake Family",
		"members": [
			"Walking Wake"
		]
	},
	{
		"id": "#1010 Iron Leaves Family",
		"members": [
			"Iron Leaves"
		]
	},
	{
		"id": "#1020 Gouging Fire Family",
		"members": [
			"Gouging Fire"
		]
	},
	{
		"id": "#1021 Raging Bolt Family",
		"members": [
			"Raging Bolt"
		]
	},
	{
		"id": "#1022 Iron Boulder Family",
		"members": [
			"Iron Boulder"
		]
	},
	{
		"id": "#1023 Iron Crown Family",
		"members": [
			"Iron Crown"
		]
	}
];
