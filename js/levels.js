addLayer("InflationRPGLevel", {
    upgrades: {
        11: {
            title: "Weak Inflation",
            description: "x1e-5<sub>(1.5)</sub> EXP per Level. Inflation RPG, right?",
            cost: new Decimal(50),
            effect() {
                let effect = ((player.InflationRPGLevel.points).add(10000).div(1e+5).add(1)).pow(1.25)
                return effect
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        12: {
            title: "Uldragunn Finder",
            description: "x1e-5<sub>(1.5)</sub> RP per Level. Levels?",
            cost: new Decimal(70),
            effect() {
                let effect = ((player.InflationRPGLevel.points).add(20000).div(1e+5).add(1)).pow(1.4)
                return effect
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
            title: "Formulatic Stragegies",
            description: "x1e-5<sub>(5)</sub> SP per Level. Science! YEAH BABY!",
            cost: new Decimal(80),
            effect() {
                let effect = ((player.InflationRPGLevel.points).add(40000).div(1e+5).add(1)).pow(6)
                return effect
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        14: {
            title: "Game Creator Creator",
            description: "Power of XP is increased to ^1e-6 each Level, with a log.",
            cost: new Decimal(95),
            effect() {
                let effect = ((player.InflationRPGLevel.points).add(40000).div(1e+5).add(1)).pow(6)
                return effect
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"(NI)" }, // Add formatting to the effect
        },
        15: {
            title: "Seperation",
            description: "Unlock Sections. (NI)",
            cost: new Decimal(125),
        },
    },
    milestones: {
        1: {
            requirementDescription: "Level 10 | Area 2",
            effectDescription: "You unlock a new ability: Bulkalizer. (Passive)",
            done() { return player.InflationRPGLevel.points.gte(10) }
        },
        2: {
            requirementDescription: "Level 25 # Area 3",
            effectDescription: "Unlock InfiniteRPG. (NI)",
            done() { return player.InflationRPGLevel.points.gte(25) }
        },
        3: {
            requirementDescription: "Level 60 # Area 4",
            effectDescription: "Upgrade Bulkalizer ability to bulkalize UP<sub>2</sub> and M<sub>L</sub>",
            done() { return player.InflationRPGLevel.points.gte(60) }
        },
        4: {
            requirementDescription: "Level 90 # Area 5",
            effectDescription: "Not Implemented",
            done() { return player.InflationRPGLevel.points.gte(90) }
        },
        5: {
            requirementDescription: "Level 200 # Area 6",
            effectDescription: "Not Implemented",
            done() { return player.InflationRPGLevel.points.gte(130) }
        },
    },
    canBuyMax() {return hasMilestone('InflationRPGLevel', 1)},
    name: "Level", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "L", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(1),
    }},
    color: "#FF3333",
    requires: new Decimal(5), // Can be a function that takes requirement increases into account
    resource: "Levels", // Name of prestige currency
    baseResource: "XP", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.002, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(0.01)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(6.5)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return player.InflationRPGLevel.points.gte(2) || (hasUpgrade('mL', 15))}
})