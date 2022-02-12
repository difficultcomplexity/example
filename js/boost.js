addLayer("bp", {
    upgrades: {
        11: {
            title: "Doubler RP!",
            description: "Double RP gain.",
            cost: new Decimal(1),
            unlocked() {return hasUpgrade('sc', 35) || (hasChallenge('bp', 11)) || player.bp.points.gte(1) && player.tier.points.gte(2)},
            effect() {
                let effect = new Decimal(2)
                if (hasUpgrade('bp', 21)) effect = new Decimal(2.5)
                return effect
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        12: {
            title: "Semi-Doubler EXP!",
            description: "x1.5 EXP gain.",
            cost: new Decimal(1),
            unlocked() {return hasUpgrade('sc', 35) || (hasChallenge('bp', 12)) || player.bp.points.gte(1) && player.tier.points.gte(2)},
            effect() {
                let effect = new Decimal(1.5)
                if (hasUpgrade('bp', 21)) effect = new Decimal(1.75)
                return effect
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
            title: "Tripler SP!",
            description: "Triple RP gain.",
            cost: new Decimal(1),
            unlocked() {return hasUpgrade('sc', 35) || (hasChallenge('bp', 13)) || player.bp.points.gte(1) && player.tier.points.gte(2)},
            effect() {
                let effect = new Decimal(3)
                if (hasUpgrade('bp', 21)) effect = new Decimal(4)
                return effect
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        21: {
            title: "BP to RP UP!",
            description: "Increase B11 Upgrade.",
            cost: new Decimal(2),
            unlocked() {return hasUpgrade('bp', 11) && player.tier.points.gte(2) && (hasChallenge('bp', 11))}
        },
        22: {
            title: "BP to EXP UP!",
            description: "Increase B12 Upgrade.",
            cost: new Decimal(4),
            unlocked() {return hasUpgrade('bp', 12) && player.tier.points.gte(2) && (hasChallenge('bp', 12))}
        },
        23: {
            title: "BP to SP UP!",
            description: "Increase B13 Upgrade.",
            cost: new Decimal(2),
            unlocked() {return hasUpgrade('bp', 13) && player.tier.points.gte(2) && (hasChallenge('bp', 13))}
        },
    },
    challenges: {
        11: {
            name: "Unexperienced",
            challengeDescription: "Useful upgrades that gives a lot of EXP multipliers are useless.",
            goalDescription: "200 Experience Points",
            rewardDescription: "Unlock 'Base BP to EXP UP' upgrade!",
            canComplete: function() {return player.points.gte(200)},
            unlocked() { return (hasUpgrade('s', 25)) },
        },
        12: {
            name: "Unresearchable",
            challengeDescription: "Upgrades that power things are useless.",
            goalDescription: "1500 Experience Points",
            rewardDescription: "Unlock 'Base BP to RP UP' upgrade!",
            canComplete: function() {return player.points.gte(1500)},
            unlocked() { return (hasUpgrade('s', 25)) },
        },
        13: {
            name: "Science of Scilence",
            challengeDescription: "Science upgrades are nerfed.",
            goalDescription: "900 Experience Points",
            rewardDescription: "Unlock 'Base BP to SP UP' upgrade!",
            canComplete: function() {return player.points.gte(900)},
            unlocked() { return (hasUpgrade('s', 25)) },
        },
    },
    autoUpgrade() {
        return hasMilestone("mL", 4)
    },
    canBuyMax() {return hasMilestone('InflationRPGLevel', 3)},
    //passiveGeneration() {
    //    let gen = new Decimal(0)
    //    if (hasMilestone("o", 1)) gen = new Decimal(0.5)
    //    return gen
    //},
    name: "booster", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "UP<sub>2</sub>", // This appears on the layer's node. Default is the id with the first letter capitalized
    branches: ["upg"],
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#88FF88",
    requires: new Decimal(1000), // Can be a function that takes requirement increases into account
    resource: "Boosters", // Name of prestige currency
    baseResource: "RP", // Name of resource prestige is based on
    baseAmount() {return player.r.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.35, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },    
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "B: Reset to boost!", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade('sc', 35) || hasUpgrade('bp', 11) &&! inChallenge('HRchr', 22) &&! inChallenge('HRchr', 31)}
})