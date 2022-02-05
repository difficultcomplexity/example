let modInfo = {
	name: "The Research Tree",
	id: "research",
	author: "DifficultComplexity",
	pointsName: "experience points",
	modFiles: ["layers.js", "tree.js", 'tier.js', "scientists.js", "science.js", "upgraders.js", "mastery.js", "boost.js"], // IMPORTANT: ADD THE FILES HERE TO BE MENTIONED!
    
	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 24,  // In hours
}
// Set your version in num and name
let VERSION = {
	num: "0.1",
	name: "Placeholder.",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0</h3><br>
		- Added things.<br>
		- Added stuff.`
	

let winText = `Contract! You came to an end, but now.`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(0.9).div(player.points.pow(1.3).add(0.7)).mul(new Decimal.pow(1.09, player.tier.points))
	if (hasUpgrade('s', 13)) gain = new Decimal(0.95).div(player.points.pow(1.1).add(0.5)).mul(new Decimal.pow(1.09, player.tier.points))
	if (hasUpgrade('sc', 23)) gain = new Decimal(1).div(player.points.add(0.4)).mul(new Decimal.pow(1.09, player.tier.points))
	if (hasUpgrade('sc', 34)) gain = new Decimal(1).div(player.points.pow(0.95).add(0.9)).mul(new Decimal.pow(1.1, player.tier.points))
	if (hasUpgrade('r', 11)) gain = gain.times(upgradeEffect('r', 11))
	if (hasUpgrade('r', 12)) gain = gain.times(upgradeEffect('r', 12))
	if (hasUpgrade('r', 13)) gain = gain.times(upgradeEffect('r', 13))
	if (hasUpgrade('sc', 12)) gain = gain.times(upgradeEffect('sc', 12))
	if (hasUpgrade('sc', 13)) gain = gain.times(upgradeEffect('sc', 13))
	if (hasUpgrade('sc', 25)) gain = gain.times(1.5)
	if (hasUpgrade('s', 23)) gain = gain.times(upgradeEffect('s', 23))
	if (hasUpgrade('mL', 11)) gain = gain.times(upgradeEffect('mL', 11))
	if (hasUpgrade('sc', 31)) gain = gain.times(upgradeEffect('sc', 31))
	if (hasUpgrade('bp', 12)) gain = gain.times(1.5)
	if (hasUpgrade('r', 14)) gain = gain.pow(upgradeEffect('r', 14))
	if (hasUpgrade('sc', 11)) gain = gain.pow(upgradeEffect('sc', 11))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte('eee10')
	// player.li.points.gte(7.6e9)
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(900) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}
