const express = require("express")
const router = express.Router()
const vendorController = require("../controllers/vendorController")
const Validate = require("../middlewares/validate")
const validator = require("../validators/vendorValidator")

router.get(
    "/:vendorId",
    Validate(validator.getVendor),
    vendorController.getVendor,
)

router.get(
    "/:vendorId/menu",
    Validate(validator.listMenu),
    vendorController.listMenu,
)

router.post(
    "/:vendorId/menu",
    Validate(validator.createMenu),
    vendorController.createMenu,
)

router.patch(
    "/:vendorId/menu/:menuId",
    Validate(validator.updateMenu),
    vendorController.updateMenu,
)

router.get(
    "/:vendorId/menu/:menuId",
    Validate(validator.getMenu),
    vendorController.getMenu,
)

router.delete(
    "/:vendorId/menu/:menuId",
    Validate(validator.getMenu),
    vendorController.deleteMenu,
)

module.exports = router
