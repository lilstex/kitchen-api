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
router.get(
    "/vendors/:vendorId",
    Validate(validator.getVendor),
    customerController.getVendor,
)

router.get(
    "/vendors/:vendorId/menu",
    Validate(validator.listMenu),
    customerController.listMenu,
)

router.get(
    "/vendors/:vendorId/menu/:menuId",
    Validate(validator.getMenu),
    customerController.getMenu,
)

module.exports = router
