const { Router } = require("express")
const Response = require("../helper/response")
const authRoutes = require("./authRoutes")
const vendorRoutes = require("./vendorRoutes")
const customerRoutes = require("./customerRoutes")

const routes = Router()

routes.use("/api/v1/auth", authRoutes)
routes.use("/api/v1/vendor", vendorRoutes)
routes.use("/api/v1/customer", customerRoutes)

routes.use((_, res) => {
    Response(res, { status: false, message: "Route not found" }, 404)
})

module.exports = routes
