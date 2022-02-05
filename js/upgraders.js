addLayer("upg", {
    upgrades: {
        11: {
            title: "Upgrade EXP!",
            description: "Upgraders increase by x1.01 on EXP.",
            cost: new Decimal(1),
            effect() {
                let effect = new Decimal.pow(1.01, (player.upg.points.pow(0.8)))
                if (hasUpgrade('upg', 21)) effect = new Decimal.pow(1.025, (player.upg.points.pow(0.8)))
                return effect
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        12: {
            title: "Upgrade RP!",
            description: "Upgraders increase by x1.005 on RP.",
            cost: new Decimal(2),
            unlocked() {return hasUpgrade('upg', 11) && player.tier.points.gte(1)},
            effect() {
                let effect = new Decimal.pow(1.005, (player.upg.points.pow(0.75)))
                if (hasUpgrade('upg', 22)) effect = new Decimal.pow(1.01, (player.upg.points.pow(0.75)))
                return effect
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
            title: "Upgrade SP!",
            description: "Upgraders increase by x1.001 on SP.",
            cost: new Decimal(3),
            unlocked() {return hasUpgrade('upg', 12) && player.tier.points.gte(1)},
            effect() {
                let effect = new Decimal.pow(1.001, (player.upg.points.pow(0.7)))
                if (hasUpgrade('upg', 21)) effect = new Decimal.pow(1.0025, (player.upg.points.pow(0.7)))
                return effect
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        21: {
            title: "Upgrade EXP BASE!",
            description: "Upgraders increase by x1.025 on EXP.",
            cost: new Decimal(5),
            unlocked() {return hasUpgrade('upg', 11) && player.tier.points.gte(2)},
        },
        22: {
            title: "Upgrade RP BASE!",
            description: "Upgraders increase by x1.01 on RP.",
            cost: new Decimal(6),
            unlocked() {return hasUpgrade('upg', 12) && player.tier.points.gte(2)},
        },
        23: {
            title: "Upgrade SP BASE!",
            description: "Upgraders increase by x1.0025 on SP.",
            cost: new Decimal(7),
            unlocked() {return hasUpgrade('upg', 13) && player.tier.points.gte(2)},
        },
    },
    //autoUpgrade() {
    //    return hasMilestone("o", 2)
    //},
    //passiveGeneration() {
    //    let gen = new Decimal(0)
    //    if (hasMilestone("o", 1)) gen = new Decimal(0.5)
    //    return gen
    //},
    name: "upgraders", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "UP", // This appears on the layer's node. Default is the id with the first letter capitalized
    branches: ["r", "s"],
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#55FF55",
    requires: new Decimal(100), // Can be a function that takes requirement increases into account
    resource: "upgraders", // Name of prestige currency
    baseResource: "RP", // Name of resource prestige is based on
    baseAmount() {return player.r.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },    
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "u", description: "U: Reset to get upgraders", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})