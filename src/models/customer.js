const { DataTypes } = require("sequelize")
const sequelize = require("../config/config")

/**
 * Define the Customer model representing a customer.
 *
 * @param {object} sequelize - The Sequelize instance.
 * @param {object} DataTypes - The data types used for defining model attributes.
 * @returns {Model} Customer model
 * Author: Emmanuel
 */
const Customer = sequelize.define("Customer", {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
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

module.exports = Customer
