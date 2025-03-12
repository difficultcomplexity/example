addLayer("a", {
    achievements: {
        11: {
            name: "Start of Everything",
            tooltip: "Begin.",
            done() { return player.points.gte(1) }
        },
        12: {
            name: "Add a point!",
            tooltip: "Start the game!.",
            done() { return player.p.points.gte(1) }
        },
        13: {
            name: "This is slow...",
            tooltip: "Buy a 2nd point upgrade. Reward: Get 75% more starts.",
            done() { return (hasUpgrade('p', 12)) }
        },
        14: {
            name: "Planck Reset!",
            tooltip: "Get a planck. Reward: Points boost itself.",
            effect() {
                let effect = new Decimal((player.p.points).pow(0.1)).pow(0.3).add(1)
                return effect
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            done() { return player.pl.points.gte(1) }
        },
    },
    name: "achievement", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(2),
    }},
    color: "#00FFFF",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "achievement", // Name of prestige currency
    baseResource: "starts!", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: "side", // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true}
})