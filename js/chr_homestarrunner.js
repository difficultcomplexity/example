addLayer("HRchr", {
    challenges: {
        11: {
            name: "Fighter",
            challengeDescription: "Scientists layer is locked. EXP gain is increased to ^1.25",
            goalDescription: "30 Experience Points",
            rewardDescription: "1.25x EXP permanently, add more research upgrades. Advanced Research effect increased by log(4)[Scientists].",
            canComplete: function() {return player.points.gte(30)},
            unlocked() { return true },
        },
        12: {
            name: "Wizard",
            challengeDescription: "Research gain is reducted to ^0.75, science gain is divided by 3. EXP gain is ^0.66. Few of upgrades are buffed.",
            goalDescription: "15000 Experience Points",
            rewardDescription: "x1.5 RP permanently, and add more mastery upgrades. Speciality upgrade is based on RP upgrades^1.1",
            canComplete: function() {return player.points.gte(15000)},
            unlocked() { return true },
        },
        21: {
            name: "Cleverist",
            challengeDescription: "Mastery layer is almost useless. EXP gain is reducted to ^0.95. Master of Research and more are buffed in this challenge.",
            goalDescription: "9000 Experience Points",
            rewardDescription: "Unlock more Level Upgrades. EXP gain is increased ^1.01",
            canComplete: function() {return player.points.gte(9000)},
            unlocked() { return true },
        },
        22: {
            name: "Magician",
            challengeDescription: "Boosters layer is locked. Upgraders are useless.",
            goalDescription: "57000 Experience Points",
            rewardDescription: "Unlock the final upgrade.",
            canComplete: function() {return player.points.gte(57000)},
            unlocked() { return true },
        },
        31: {
            name: "Tourist",
            challengeDescription: "Last 2 layers on row 2 unlocked are locked.",
            goalDescription: "4000 Experience Points",
            rewardDescription: "Remove Upgrader's Penalty.",
            canComplete: function() {return player.points.gte(4000)},
            unlocked() { return player.tier.points.gte(3) },
        },
    },
    name: "Characters", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Chr", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 4, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    branches: ["InflationRPGLevel"],
    startData() { return {
        unlocked: true,
		points: new Decimal(4),
    }},
    color: "#B0F0C0",
    nodeStyle: {
        background: "linear-gradient(85deg, #FF0000, #00FF00, #0000FF)",
        "background-origin": "border-box",
    },
    requires: new Decimal('eeeeeeeee10'), // Can be a function that takes requirement increases into account
    resource: "Characters", // Name of prestige currency
    baseResource: "Levels", // Name of resource prestige is based on
    baseAmount() {return player.InflationRPGLevel.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 9999999999, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(0.9)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return hasUpgrade('InflationRPGLevel', 14)}
})