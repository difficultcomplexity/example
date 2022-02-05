addLayer("s", {
    upgrades: {
        11: {
            title: "Hire!",
            description: "Scientists boost EXP gain.",
            cost: new Decimal(1),
            effect() {
                return player.s.points.pow(1.23).add(2.5).pow(0.75)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        12: {
            title: "Eureka!",
            description: "Scientists boost Research gain.",
            cost: new Decimal(1),
            unlocked() {return hasUpgrade('s', 11) && player.tier.points.gte(1)},
            effect() {
                return player.s.points.pow(1.1).add(2.25).pow(0.55)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
            title: "EXP Boost!",
            description: "Improve EXP formula.",
            cost: new Decimal(2),
            unlocked() {return hasUpgrade('s', 12) && player.tier.points.gte(1)},
        },
        14: {
            title: "Special Certificate",
            description: "Boost multiplier upgrade on base upgrade amount.",
            cost: new Decimal(3),
            unlocked() {return hasUpgrade('s', 13) && player.tier.points.gte(1)},
        },
        15: {
            title: "Science!",
            description: "Unlock Science.",
            cost: new Decimal(4),
            unlocked() {return hasUpgrade('s', 14) && player.tier.points.gte(1)},
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
    name: "scientists", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    branches: [],
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(1),
    }},
    color: "#5555FF",
    requires: new Decimal(20), // Can be a function that takes requirement increases into account
    resource: "scientists", // Name of prestige currency
    baseResource: "research points", // Name of resource prestige is based on
    baseAmount() {return player.r.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.3, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        mult = softcap(mult, new Decimal("e4000"), 0.25) // Tetra-softcapped Layer 1
        mult = softcap(mult, new Decimal("e100000"), 0.1) // Tetra-softcapped Layer 2
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },    
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: Reset for scientists", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return (hasUpgrade('r', 15))  || hasUpgrade('s', 11)}
})