addLayer("p", {
    upgrades: {
        11: {
            title: "Start Again!",
            description: "It will increase per reseting the start.",
            cost: new Decimal(1),
            effect() {
                let effect = new Decimal((player.p.points).pow(0.75)).add(1)
                return effect
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        12: {
            title: "Reset Again!",
            description: "It will increase per reseting the start.",
            cost: new Decimal(3),
            unlocked() {return hasUpgrade('p', 11)},
            effect() {
                let effect = new Decimal(player.points).pow(2).add(0.02)
                return effect
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
            title: "Repeat Again!",
            description: "Points will increase per reseting the start.",
            cost: new Decimal(10),
            unlocked() {return hasUpgrade('p', 12)},
            effect() {
                let effect = new Decimal(player.p.points).pow(0.2).pow(0.4).add(2)
                return effect
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
    },
    milestones: {
        1: {
            requirementDescription: "3rd Start",
            effectDescription: "Unlock Plancks.",
            done() { return player.points.gte(3) }
        },
    },
    //autoUpgrade() {
    //    return hasMilestone("mL", 2)
    //},
    //passiveGeneration() {
    //    let gen = new Decimal(0)
    //    if (hasMilestone("mL", 1)) gen = new Decimal(0.1)
    //    return gen
    //},
    name: "point", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    //branches: ["sc", "s"],
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(1),
    }},
    color: "#FFFFFF",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "points", // Name of prestige currency
    baseResource: "experience points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.25, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('p', 13)) mult = mult.times(upgradeEffect('p', 13))
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
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset starts for points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})
