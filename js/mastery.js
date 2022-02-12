addLayer("mL", {
    upgrades: {
        11: {
            title: "Master Experience!",
            description: "Increase EXP gain by mastery.",
            cost: new Decimal(1),
            effect() {
                let effect = player.mL.points.add(90).div(90).pow(0.33).add(0.1).log(1.1)
                if (hasUpgrade('mL', 24)) effect = player.mL.points.add(90).div(80).pow(0.4).add(0.1).log(1.1)
                if (inChallenge('HRchr', 21)) effect = new Decimal(1)
                return effect
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        12: {
            title: "Master Science!",
            description: "Increase SP gain by mastery.",
            cost: new Decimal(3),
            effect() {
                let effect = player.mL.points.add(20).div(15).pow(0.6).add(0.1).log(1.1)
                return effect
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
            title: "Mastery Research!",
            description: "Increase RP gain by mastery.",
            cost: new Decimal(4),
            effect() {
                let effect = player.mL.points.add(70).div(70).pow(0.45).add(0.1).log(1.1)
                if (inChallenge('HRchr', 21)) effect = player.mL.points.add(70).div(70).pow(0.25).add(0.2).log(1.2)
                return effect
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        14: {
            title: "Boasterence",
            description: "Increase SP gain by mastery; boosted by boosters.",
            cost: new Decimal(5),
            unlocked() {return hasUpgrade('mL', 11) && hasUpgrade('mL', 12) && hasUpgrade('mL', 13)},
            effect() {
                let effect = player.mL.points.add(70).div(70).pow(0.45).add(0.1).log(1.1).pow(Decimal.pow(1.015, (player.bp.points).add(2).log(2)))
                if (inChallenge('HRchr', 21)) effect = new Decimal(1)
                return effect
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        15: {
            title: "Inflation RPG",
            description: "Unlock Levels.",
            cost: new Decimal(5),
            unlocked() {return hasUpgrade('mL', 14)},
        },
        21: {
            title: "EXP-intensity",
            description: "Increase SP gain by mastery; boosted by boosters.",
            cost: new Decimal(10),
            unlocked() {return hasUpgrade('mL', 15) && hasChallenge('HRchr', 12)},
            effect() {
                let effect = player.mL.points.add(150).div(100).pow(0.5).add(0.1).log(1.2).pow(Decimal.pow(1.01, (player.mL.points).add(4).log(3)))
                return effect
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        22: {
            title: "Bonus ReXP",
            description: "x1.1 XP and x1.25 RP.",
            cost: new Decimal(12),
            unlocked() {return hasUpgrade('mL', 21) && hasChallenge('HRchr', 12)},
        },
        23: {
            title: "EXP Mastery Point",
            description: "x1.01 EXP per Mastery Level.",
            cost: new Decimal(13),
            unlocked() {return hasUpgrade('mL', 22) && hasChallenge('HRchr', 12)},
            effect() {
                let effect = new Decimal.pow(1.01, player.mL.points.pow(5).add(3).log(2.25))
                return effect
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        24: {
            title: "Upgrades Formulating",
            description: "Increase formula for the 1st ML upgrade.",
            cost: new Decimal(14),
            unlocked() {return hasUpgrade('mL', 23) && hasChallenge('HRchr', 12)},
        },
        25: {
            title: "The Final Upgrade",
            description: "Ludicrous Boost is increased, enough for Tier 3.",
            cost: new Decimal(14),
            unlocked() {return hasUpgrade('mL', 24) && hasChallenge('HRchr', 22)},
        },
    },
    milestones: {
        1: {
            requirementDescription: "Mastery Level 3",
            effectDescription: "Get 10% of RP on prestige per second",
            done() { return player.mL.points.gte(3) }
        },
        2: {
            requirementDescription: "Mastery Level 5",
            effectDescription: "Automate RP Upgrades.",
            done() { return player.mL.points.gte(5) }
        },
        3: {
            requirementDescription: "Mastery Level 7",
            effectDescription: "Automate Upg<sub>(1)</sub> Upgrades.",
            done() { return player.mL.points.gte(7) }
        },
        4: {
            requirementDescription: "Mastery Level 9",
            effectDescription: "Automate Upg<sub>(2)</sub> Upgrades.",
            done() { return player.mL.points.gte(9) }
        },
        5: {
            requirementDescription: "Mastery Level 10",
            effectDescription: "Automate SP Upgrades.",
            done() { return player.mL.points.gte(10) }
        },
    },
    canBuyMax() {return hasMilestone('InflationRPGLevel', 3)},
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
    layerShown(){return hasUpgrade('r', 25) || hasUpgrade('mL', 11) &&! inChallenge('HRchr', 21) &&! inChallenge('HRchr', 31)}
})