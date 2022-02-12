addLayer("tier", {
    //upgrades: {
    //    11: {
    //        title: "Placeholder!",
    //        description: "Placeholder.",
    //        cost: new Decimal(1),
    //        effect() {
    //            return player.s.points.add(1).pow(0.5)
    //        },
    //        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
    //    },
    //},
    //autoUpgrade() {
    //    return hasMilestone("o", 2)
    //},
    //passiveGeneration() {
    //    let gen = new Decimal(0)
    //    if (hasMilestone("o", 1)) gen = new Decimal(0.5)
    //    return gen
    //},
    name: "tier", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Ti", // This appears on the layer's node. Default is the id with the first letter capitalized
    branches: [],
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(1),
    }},
    color: "#777777",
    requires: new Decimal(250), // Can be a function that takes requirement increases into account
    resource: "tiers", // Name of prestige currency
    baseResource: "EXP. Spend Experience to tier up.", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 3.111675, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },    
    row: 15, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "t", description: "T: Reset to tier up!", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasMilestone('r', 1) || player.tier.points.gte(1)}
})