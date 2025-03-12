addLayer("pl", {
    upgrades: {
        11: {
            title: "End!",
            description: "Plancks boost starts.",
            cost: new Decimal(1),
            effect() {
                let effect = new Decimal(((player.pl.points).times(3)).pow(0.2)).pow(0.7).add(3)
                return effect
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        12: {
            title: "End?",
            description: "Plancks boost points.",
            cost: new Decimal(1),
            effect() {
                let effect = new Decimal(((player.pl.points).times(10)).pow(0.125)).pow(0.33).add(1.5)
                return effect
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
            title: "End...",
            description: "Plancks boost itself.",
            cost: new Decimal(1),
            effect() {
                let effect = new Decimal(((player.pl.points).add(1).times(0.5)).pow(0.05)).pow(0.33)
                return effect
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        14: {
            title: "End is Never",
            description: "Plancks boost exponents of points.",
            cost: new Decimal(2),
            unlocked() {return hasUpgrade('pl', 11) && hasUpgrade('pl', 12) && hasUpgrade('pl', 13)},
            effect() {
                let effect = new Decimal(((player.pl.points).add(10)).ln().add(1).ln()).pow(0.25).pow(0.9)
                return effect
            },
            effectDisplay() { return "^"+format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
        },
        15: {
            title: "End is Here",
            description: "Unlock Yoctoprestige.",
            cost: new Decimal(5),
            unlocked() {return hasUpgrade('pl', 14)},
        },
    },
    name: "planck", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Pl", // This appears on the layer's node. Default is the id with the first letter capitalized
    branches: ["p"],
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#DADADA",
    requires: new Decimal(100), // Can be a function that takes requirement increases into account
    resource: "plancks", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.25, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('pl', 13)) mult = mult.times(upgradeEffect('pl', 13))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    //    doReset(resettingLayer) {
    //    var keep = []
    //    if (hasMilestone("o", 4)) keep.push("upgrades")
    //    if (hasMilestone("u", 1)) keep.push("milestones")
    //    if (layers[this.layer].row < layers[resettingLayer].row) return
    //    layerDataReset(this.layer, keep)
    //},    
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "l", description: "L: Planck reset", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})
