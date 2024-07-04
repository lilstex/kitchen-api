const express = require("express")
const router = express.Router()
const customerController = require("../controllers/customerController")
const Validate = require("../middlewares/validate")
const validator = require("../validators/vendorValidator")

router.get(
    "/:customerId/vendors",
    Validate(validator.listVendors),
    customerController.listVendors,
)
router.get("/:customerId/vendors/:vendorId", customerController.getVendor)

router.get(
    "/:customerId/vendors/:vendorId/menu",
    Validate(validator.listMenu),
    customerController.listMenu,
)

router.get(
    "/:customerId/vendors/:vendorId/menu/:menuId",
    customerController.getMenu,
)

module.exports = router
