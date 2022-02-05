addLayer("mL", {
    upgrades: {
        11: {
            title: "Master Experience!",
            description: "Increase EXP gain by mastery.",
            cost: new Decimal(1),
            effect() {
                return player.mL.points.add(100).div(100).pow(0.3).add(0.1).log(1.1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        12: {
            title: "Master Science!",
            description: "Increase SP gain by mastery.",
            cost: new Decimal(3),
            effect() {
                return player.mL.points.add(20).div(15).pow(0.5).add(0.1).log(1.1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
    },
    milestones: {
        1: {
            requirementDescription: "Mastery Level 3",
            effectDescription: "Get 50% of RP on prestige per second",
            done() { return player.mL.points.gte(3) }
        },
        2: {
            requirementDescription: "Mastery Level 5",
            effectDescription: "Automate RP Upgrades. (NI)",
            done() { return player.mL.points.gte(5) }
        },
        3: {
            requirementDescription: "Mastery Level 7",
            effectDescription: "Automate Upg<sub>(1)</sub> Upgrades. (NI)",
            done() { return player.mL.points.gte(7) }
        },
        4: {
            requirementDescription: "Mastery Level 9",
            effectDescription: "Automate Upg<sub>(2)</sub> Upgrades. (NI)",
            done() { return player.mL.points.gte(9) }
        },
        5: {
            requirementDescription: "Mastery Level 10",
            effectDescription: "Automate SP Upgrades. (NI)",
            done() { return player.mL.points.gte(10) }
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
    name: "mastery", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M<sub>L</sub>", // This appears on the layer's node. Default is the id with the first letter capitalized
    branches: ["upg"],
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(1),
    }},
    color: "#004400",
    requires: new Decimal(50), // Can be a function that takes requirement increases into account
    resource: "Mastery Levels", // Name of prestige currency
    baseResource: "RP", // Name of resource prestige is based on
    baseAmount() {return player.r.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.12, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },    
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "M: Reset to master!", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade('r', 25) || hasUpgrade('mL', 11)}
})