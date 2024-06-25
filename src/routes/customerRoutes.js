const express = require("express")
const router = express.Router()
const customerController = require("../controllers/customerController")
const Validate = require("../middlewares/validate")
const validator = require("../validators/vendorValidator")

router.get(
    "/vendors",
    Validate(validator.listVendors),
    customerController.listVendors,
)
router.get("/vendors/:id", customerController.getVendor)
router.get(
    "/vendors/:id/menu",
    Validate(validator.listMenu),
    customerController.listMenu,
)
router.get("/menu/:menuId", customerController.getMenu)

module.exports = router
