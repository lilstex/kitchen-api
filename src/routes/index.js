const { Router } = require("express")
const Response = require("../helper/response")
const authRoutes = require("./authRoutes")
const vendorRoutes = require("./vendorRoutes")
const customerRoutes = require("./customerRoutes")

const routes = Router()

routes.use("/auth", authRoutes)
routes.use("/vendors", vendorRoutes)
routes.use("/customers", customerRoutes)

routes.use((_, res) => {
    Response(res, { status: false, message: "Route not found" }, 404)
})

module.exports = routes
