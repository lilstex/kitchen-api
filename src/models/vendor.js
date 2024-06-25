const { DataTypes } = require("sequelize")
const sequelize = require("../config/config")

/**
 * Define the Vendor model representing a restaurant.
 *
 * @param {object} sequelize - The Sequelize instance.
 * @param {object} DataTypes - The data types used for defining model attributes.
 * @returns {Model} Vendor model
 * Author: Emmanuel
 */
const Vendor = sequelize.define("Vendor", {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
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

module.exports = Vendor
