const { Sequelize } = require("sequelize")
const dotenv = require("dotenv")
dotenv.config()

/**
 * Create a new Sequelize instance using database credentials from environment variables.
 *
 * @type {Sequelize}
 * @param {string} process.env.DB_NAME - The name of the database.
 * @param {string} process.env.DB_USER - The username for the database.
 * @param {string} process.env.DB_PASS - The password for the database.
 * @param {object} options - Additional options for configuring the Sequelize instance.
 * @param {string} options.host - The host of the database.
 * @param {string} options.dialect - The dialect of the database (e.g., "mysql").
 * Author: Emmanuel
 */
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        port: process.env.DB_PORT,
        logging: false, // Disable logging SQL queries
    },
)

module.exports = sequelize
