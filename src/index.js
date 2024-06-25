const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const dotenv = require("dotenv")
const swaggerUi = require("swagger-ui-express")
const { initDB } = require("./models")
const routes = require("./routes")
const Security = require("./middlewares/security")
const { swagger } = require("./config")
const Response = require("./helper/response")

dotenv.config()

/**
 * Initialize the Express application and configure middleware.
 *
 * @module app
 * Author: Emmanuel
 */
const app = express()

// Middleware to enable Cross-Origin Resource Sharing
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagger))

// Apply security middleware to all routes
app.use(Security)

// Use the defined routes
app.use("", routes)

// Error handling middleware
app.use((err, req, res, next) => {
    return Response(
        res,
        { status: false, message: "Internal server error" },
        500,
    )
})

const PORT = process.env.PORT || 2020

/**
 * Start the Express server and initialize the database.
 *
 * @function listen
 * @param {number} PORT - The port number on which the server listens.
 * @async
 * @returns {Promise<void>} A promise that resolves when the server is started and the database is initialized.
 * Author: Emmanuel
 */
app.listen(PORT, async () => {
    await initDB()
    console.log(
        `Kitchen API Service running on http://localhost:${PORT}/api-docs`,
    )
})

module.exports = app
