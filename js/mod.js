let modInfo = {
	name: "The Meta Tree",
	id: "omni",
	author: "DifficultComplexity",
	pointsName: "starts",
	modFiles: ["tree.js", "achievement.js", "layers.js", "planck.js"], // IMPORTANT: ADD THE FILES HERE TO BE MENTIONED!
    
	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}
// Set your version in num and name
let VERSION = {
	num: "-0.1",
	name: "The Start",
}

let changelog = `<h1>Changelog:</h1><br>
        <h2>v0.0</h2><br>
        - Start.<br>`

	

let winText = `Congratulations! You researched all types of any objects and caused a new invention to go more META! (Please do not press "Keep going.")`

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

	let gain = (new Decimal(0.00001).div((player.points).pow(150).add(1)).pow(0.1).div(5))
	if (hasAchievement('a', 13)) gain = gain.times(1.75)
	if (hasUpgrade('p', 11)) gain = gain.times(upgradeEffect('p', 11))
	if (hasUpgrade('p', 12)) gain = gain.times(upgradeEffect('p', 12))
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
	return player.p.points.gte(110000)
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
