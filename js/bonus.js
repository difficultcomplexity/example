addLayer("bonuses", {
    upgrades: {
        11: {
            title: "Scientists Blessing",
            description: "Research is multiplied by 1.55^scientists.",
            cost: new Decimal(1),
            unlocked() {return inChallenge('HRchr', 12)},
            effect() {
                let effect = new Decimal.pow(1.55, player.s.points).add(1)
                return effect
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        12: {
            title: "Invention",
            description: "Science is multiplied by 1.6^scientists.",
            cost: new Decimal(2),
            unlocked() {return inChallenge('HRchr', 12) && hasUpgrade('s', 15)},
            effect() {
                let effect = new Decimal.pow(1.6, player.s.points).add(1)
                return effect
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
    },
    name: "Bonuses", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Bs", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 4, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(3),
    }},
    color: "#FFFF00",
    nodeStyle: {
        background: "linear-gradient(85deg, #AAAA00, #EEEE00, #AAAA22)",
        "background-origin": "border-box",
    },
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "bonuses to activate", // Name of prestige currency
    baseResource: "EXP", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.01, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true}
})