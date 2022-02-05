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
	num: "0.2.3.3 | Non-Redux",
	name: "Tier 2 Update 3 Addition 2: Boosters",
}

let changelog = `<h1>Changelog:</h1><br>
        <h2>v0.1</h2><br>
        - Game Launch.<br>
        <h3>v0.1.1</h3><br>
        - Added Research Upgrades.<br>
        <h3>v0.1.2</h3><br>
        - Added Scientists.<br>
        - Added Scientist Upgrades.<br>
        v0.1.2.1<br>
        - Rebalanced.<br>
        <h3>v0.1.3</h3><br>
        - Added Science.<br>
        - Added 5 Science Upgrades.<br>
        v0.1.3.1<br>
        - Added 5 more Science Upgrades.<br>
        - Rebalanced.<br>
        <h3>v0.1.9</h3><br>
        - Added Tiers.<br>
        - Was useless until v0.2.<br>
		<h2>v0.2</h2><br>
		- Added Tier Boosts and effective unlocks.<br>
		- Added more Science Upgrades.<br>
		- Beginning of Tier 2.<br>
		<h3>v0.2.1</h3><br>
        - Added more Research Upgrades.<br>
        - Rebalanced.<br>
		<h3>v0.2.2</h3><br>
        - Added Mastery.<br>
        - Rebalanced boost.<br>
		v0.2.2.1<br>
        - Added Mastery Upgrades.<br>
        - Rebalanced.<br>
		<h3>v0.2.3</h3><br>
        - Added Boosters.<br>
        - Rebalanced boost.<br>
		v0.2.3.1<br>
        - Added Booster Upgrades.<br>
		v0.2.3.2<br>
        - Added Mastery Milestones.<br>
		- Rebalanced.<br>
		v0.2.3.3<br>
        - Added penalty for upgraders, but will reduce soon.<br>
		- Rebalanced to ensure to have Scientist Upgrades 21-25 and Level Layer.<br>`
	

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

	let gain = new Decimal(0.9).div(player.points.pow(1.3).add(0.7)).mul(new Decimal.pow(1.09, player.tier.points)).div((new Decimal.pow(1.005, (player.upg.points).log(1.1).add(1))))
	if (hasUpgrade('s', 13)) gain = new Decimal(0.95).div(player.points.pow(1.1).add(0.5)).mul(new Decimal.pow(1.09, player.tier.points)).div((new Decimal.pow(1.005, (player.upg.points).log(1.1).add(1))))
	if (hasUpgrade('sc', 23)) gain = new Decimal(1).div(player.points.add(0.4)).mul(new Decimal.pow(1.09, player.tier.points)).div((new Decimal.pow(1.005, (player.upg.points).log(1.1).add(1))))
	if (hasUpgrade('sc', 34)) gain = new Decimal(1).div(player.points.pow(0.95).add(0.9)).mul(new Decimal.pow(1.1, player.tier.points)).div((new Decimal.pow(1.005, (player.upg.points).log(1.1).add(1))))
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
	return player.r.points.gte('e5')
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
