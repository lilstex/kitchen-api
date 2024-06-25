const { DataTypes } = require("sequelize")
const sequelize = require("../config/config")
const Vendor = require("./vendor")

/**
 * Define the MenuItem model representing a menu item in a restaurant.
 *
 * @param {object} sequelize - The Sequelize instance.
 * @param {object} DataTypes - The data types used for defining model attributes.
 * @returns {Model} MenuItem model
 * Author: Emmanuel
 */
const MenuItem = sequelize.define("MenuItem", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
})

// Establish a relationship between Vendor and MenuItem
Vendor.hasMany(MenuItem, { as: "menuItems" })
MenuItem.belongsTo(Vendor)

module.exports = MenuItem
