addLayer("r", {
    upgrades: {
        11: {
            title: "Research!",
            description: "Level up speed based on research.",
            cost: new Decimal(1),
            effect() {
                let effect = (player.r.points.add(1)).log(1.2).add(1).pow(0.33)
                if (hasUpgrade('sc', 22)) effect = (player.r.points.add(1)).log(1.15).add(1).pow(0.4)
                return effect
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        12: {
            title: "Basic Researching!",
            description: "Level up speed based on experience.",
            cost: new Decimal(3),
            unlocked() {return hasUpgrade('r', 11) && player.tier.points.gte(1)},
            effect() {
                return (player.points.add(4.7)).pow(0.5).pow(0.9).log(2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
            title: "Speciality!",
            description: "Level up speed based on upgrades.",
            cost: new Decimal(5),
            unlocked() {return hasUpgrade('r', 12) && player.tier.points.gte(1)},
            effect() {
                let effect = Decimal.pow(1.15, player.r.upgrades.length)
                if (hasUpgrade('s', 14)) effect = Decimal.pow(1.25, player.r.upgrades.length)
                return effect
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        14: {
            title: "Special Research!",
            description: "Power up speed based on research.",
            cost: new Decimal(7),
            unlocked() {return hasUpgrade('r', 13) && player.tier.points.gte(1)},
            effect() {
                return (player.r.points.add(1)).log(1.1).add(2).pow(0.15).pow(0.3)
            },
            effectDisplay() { return "^"+format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
        },
        15: {
            title: "New Research!",
            description: "Unlock Scientists.",
            cost: new Decimal(10),
            unlocked() {return hasUpgrade('r', 14) && player.tier.points.gte(1)},
        },
        21: {
            title: "Transcending Research!",
            description: "Research base is increased by scientists.",
            cost: new Decimal(2000),
            unlocked() {return hasUpgrade('r', 15) && player.tier.points.gte(2)},
            effect() {
                return (player.s.points.add(2)).log(2).add(2).pow(0.2).pow(0.25).add(1).log(2)
            },
            effectDisplay() { return "^"+format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
        },
        22: {
            title: "Advanced Research!",
            description: "Research gain is increased by research.",
            cost: new Decimal(5000),
            unlocked() {return hasUpgrade('r', 21) && player.tier.points.gte(2)},
            effect() {
                return (player.r.points.add('e3')).log(10).log(3).pow(3)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        23: {
            title: "Lucky Research!",
            description: "Speed up gain by science.",
            cost: new Decimal(7777),
            unlocked() {return hasUpgrade('r', 22) && player.tier.points.gte(2)},
            effect() {
                return (player.sc.points.add('e4')).log(10).log(4).pow(2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        24: {
            title: "Master of Research",
            description: "Gain x1.05 more research per RP upgrade.",
            cost: new Decimal('e4'),
            unlocked() {return hasUpgrade('r', 22) && player.tier.points.gte(2)},
            effect() {
                return new Decimal.pow(1.05, player.r.upgrades.length)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        25: {
            title: "Levellings",
            description: "Unlock Mastery.",
            cost: new Decimal(15000),
            unlocked() {return hasUpgrade('r', 22) && player.tier.points.gte(2)},
        },
    },
    milestones: {
        1: {
            requirementDescription: "Level 100",
            effectDescription: "Unlock Tiers.",
            done() { return player.points.gte(100) }
        },
    },
    //autoUpgrade() {
    //    return hasMilestone("o", 2)
    //},
    passiveGeneration() {
        let gen = new Decimal(0)
        if (hasMilestone("mL", 1)) gen = new Decimal(0.5)
        return gen
    },
    name: "research", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    branches: ["sc", "s"],
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(1),
    }},
    color: "#222255",
    requires: new Decimal(5), // Can be a function that takes requirement increases into account
    resource: "research points", // Name of prestige currency
    baseResource: "experience points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.4, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('s', 12)) mult = mult.times(upgradeEffect('s', 12))
        if (hasUpgrade('sc', 14)) mult = mult.times(upgradeEffect('sc', 14))
        if (hasUpgrade('upg', 12)) mult = mult.times(upgradeEffect('upg', 12))
        if (hasUpgrade('s', 22)) mult = mult.times(upgradeEffect('s', 22))
        if (hasUpgrade('s', 24)) mult = mult.times(upgradeEffect('s', 24))
        if (hasUpgrade('sc', 33)) mult = mult.times(upgradeEffect('sc', 33))
        if (hasUpgrade('bp', 11)) mult = mult.times(2)
        if (hasUpgrade('s', 21)) mult = mult.pow(upgradeEffect('s', 21))
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
        {key: "r", description: "R: Reset for research", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})
