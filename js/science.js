addLayer("sc", {
    upgrades: {
        11: {
            title: "Science Matters!",
            description: "EXP gain base increased based on Science.",
            cost: new Decimal(10),
            
            effect() {
                let effect = (player.sc.points.add(1e15).log(10).log(15)).add(1.1).log(1.9)
                if (inChallenge('bp', 12)) effect = new Decimal(1)
                if (inChallenge('bp', 13)) effect = new Decimal(1)
                return effect
            },
            effectDisplay() { return "^"+format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
        },
        12: {
            title: "EXP Sanity!",
            description: "EXP gain is increased based on science and scientists.",
            cost: new Decimal(30),
            unlocked() {return hasUpgrade('sc', 11) && player.tier.points.gte(1)},
            effect() {
                let effect = (player.sc.points.log(4).add(4)).pow(0.3).pow((player.s.points.add(1)).log(4).pow(0.4))
                if (inChallenge('bp', 13)) effect = new Decimal(1)
                return effect
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
            title: "Scientific Experience!",
            description: "Get x1.05 EXP boost each scientists you have.",
            cost: new Decimal(50),
            unlocked() {return hasUpgrade('sc', 12) && player.tier.points.gte(1)},
            effect() {
                let effect = new Decimal.pow(1.05, player.s.points.add(1))
                if (hasUpgrade('sc', 15)) effect = new Decimal.pow(1.1, player.s.points.add(1))
                return effect
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        14: {
            title: "Scientific Notation",
            description: "Get x1.025 RP boost each scientists.",
            cost: new Decimal(100),
            unlocked() {return hasUpgrade('sc', 13) && player.tier.points.gte(1)},
            effect() {
                let effect = new Decimal.pow(1.025, player.s.points.add(1))
                if (hasUpgrade('sc', 15)) effect = new Decimal.pow(1.05, player.s.points.add(1))
                if (hasUpgrade('sc', 43)) effect = new Decimal.pow(1.05, player.s.points.add(1)).pow(1.9)
                if (inChallenge('bp', 13)) effect = new Decimal(1)
                return effect
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        15: {
            title: "Booster Booster!",
            description: "Boost EXP and RP boost upgrade.",
            cost: new Decimal(150),
            unlocked() {return hasUpgrade('sc', 14) && player.tier.points.gte(1)},
        },
        21: {
            title: "Science DOES Matter!",
            description: "Improve Science Gain.",
            cost: new Decimal(200),
            unlocked() {return hasUpgrade('sc', 15) && player.tier.points.gte(1)},
        },
        22: {
            title: "EXP Insanity!",
            description: "Improve RP to EXP gain.",
            cost: new Decimal(270),
            unlocked() {return hasUpgrade('sc', 21) && player.tier.points.gte(1)},
        },
        23: {
            title: "EXP Rush!",
            description: "Improve EXP formula.",
            cost: new Decimal(350),
            unlocked() {return hasUpgrade('sc', 22) && player.tier.points.gte(1)},
        },
        24: {
            title: "Upgraders!",
            description: "Unlock Upgraders.",
            cost: new Decimal(500),
            unlocked() {return hasUpgrade('sc', 23) && player.tier.points.gte(1)},
        },
        25: {
            title: "Too low on the milestone...",
            description: "Get x1.5 EXP boost as a gift.",
            cost: new Decimal(1000),
            unlocked() {return hasUpgrade('sc', 24) && player.tier.points.gte(1)},
        },
        31: {
            title: "Research Mastery",
            description: "Get x1.01<sub>(3)</sub> EXP each ML, with softcap.",
            cost: new Decimal(2500),
            unlocked() {return hasUpgrade('sc', 25) && player.tier.points.gte(2)},
            effect() {
                let effect = new Decimal.pow(1.01, (player.mL.points.add(2).log(2)).pow(3))
                if (inChallenge('bp', 13)) effect = new Decimal(1)
                return effect
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        32: {
            title: "Correction of Science",
            description: "Get x1.01<sub>(6)</sub> SP each ML, with softcap<sub>(2)</sub>.",
            cost: new Decimal(5000),
            unlocked() {return hasUpgrade('sc', 31) && player.tier.points.gte(2)},
            effect() {
                let effect = new Decimal.pow(1.01, (player.mL.points.add(3).log(3)).pow(5.5))
                if (hasUpgrade('sc', 41)) effect = new Decimal.pow(1.01, (player.mL.points.add(4).log(4)).pow(7))
                return effect
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        33: {
            title: "Probabilistic Research",
            description: "Get x1.01<sub>(4)</sub> RP each ML, with softcap<sub>(2)</sub>.",
            cost: new Decimal(20000),
            unlocked() {return hasUpgrade('sc', 32) && player.tier.points.gte(2)},
            effect() {
                let effect = new Decimal.pow(1.01, (player.mL.points.add(3).log(3)).pow(4))
                if (hasUpgrade('sc', 41)) effect = new Decimal.pow(1.01, (player.mL.points.add(3).log(3)).pow(4.5))
                if (inChallenge('bp', 13)) effect = new Decimal(1)
                return effect
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        34: {
            title: "EXP Inflation!",
            description: "Improve EXP Formula<sub>(2)</sub>.",
            cost: new Decimal(40000),
            unlocked() {return hasUpgrade('sc', 33) && player.tier.points.gte(2)},

        },
        35: {
            title: "Upgrade... Upgrades?",
            description: "Unlock UPGRADE<sub>(2)</sub>.",
            cost: new Decimal(100000),
            unlocked() {return hasUpgrade('sc', 34) && player.tier.points.gte(2)},

        },
        41: {
            title: "Upgrade... Upgrades?",
            description: "EXPO +1.5 and +0.5 up to sc33 and sc34.",
            cost: new Decimal(5e8),
            unlocked() {return hasUpgrade('sc', 34) && player.tier.points.gte(2)},

        },
        42: {
            title: "Endless Frontier",
            description: "Affection",
            cost: new Decimal(1e10),
            unlocked() {return hasUpgrade('sc', 34) && player.tier.points.gte(2)},

        },
        43: {
            title: "CTRV-ResVinvo",
            description: "^2 to sc14.",
            cost: new Decimal(1e12),
            unlocked() {return hasUpgrade('sc', 34) && player.tier.points.gte(2)},

        },
        44: {
            title: "Definition",
            description: "^1.5 to s12.",
            cost: new Decimal(1e15),
            unlocked() {return hasUpgrade('sc', 34) && player.tier.points.gte(2)},

        },
        44: {
            title: "Impossible",
            description: "Im gonna go on hiatus... sorry.",
            cost: new Decimal(1e20),
            unlocked() {return hasUpgrade('sc', 34) && player.tier.points.gte(2)},

        },
    },
    autoUpgrade() {
        return hasMilestone("mL", 5)
    },
    update(diff) {
        let gain = new Decimal(0)
        if (hasUpgrade("s", 15)) gain = new Decimal(0.0001).mul(player.points.add('e4')).pow(player.s.points.add(4).log(4).pow(0.35).add(1))
        if (hasUpgrade("sc", 21)) gain = new Decimal(0.0005).mul(player.points.add(2000)).pow(player.s.points.add(4).log(3.5).pow(0.4).add(1))
        if (hasUpgrade('upg', 13)) gain = gain.times(upgradeEffect('upg', 13))
        if (hasUpgrade('mL', 12)) gain = gain.times(upgradeEffect('mL', 12))
        if (hasUpgrade('sc', 12)) gain = gain.times(upgradeEffect('sc', 12))
        if (hasUpgrade('sc', 32)) gain = gain.times(upgradeEffect('sc', 32))
        if (hasUpgrade('bp', 13)) gain = gain.times(upgradeEffect('bp', 13))
        if (hasUpgrade('bp', 14)) gain = gain.times(upgradeEffect('bp', 14))
        if (hasUpgrade('InflationRPGLevel', 12)) gain = gain.times(upgradeEffect('InflationRPGLevel', 12))
        if (hasUpgrade('r', 31)) gain = gain.times(upgradeEffect('r', 31))
        if (hasUpgrade('bonuses', 12)) gain = gain.times(upgradeEffect('bonuses', 12))
        if (inChallenge('HRchr', 12)) gain = gain.div(3)
        addPoints('sc', gain.times(diff))
    },
    name: "science", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Sc", // This appears on the layer's node. Default is the id with the first letter capitalized
    branches: ["s"],
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(1),
    }},
    color: "#19DD19",
    requires: new Decimal(5), // Can be a function that takes requirement increases into account
    resource: "science points", // Name of prestige currency
    baseResource: "scientists. Boost on gain is ^0.3", // Name of resource prestige is based on
    baseAmount() {return player.s.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.4, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },    
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: Reset for scientists", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return (hasUpgrade('s', 15))}
})