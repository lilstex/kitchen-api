const express = require("express")
const router = express.Router()
const vendorController = require("../controllers/vendorController")
const Validate = require("../middlewares/validate")
const validator = require("../validators/vendorValidator")

router.get("/:id", Validate(validator.empty), vendorController.getVendor)
router.get("/:id/menu", Validate(validator.listMenu), vendorController.listMenu)
router.post(
    "/:id/create/menu",
    Validate(validator.createMenu),
    vendorController.createMenu,
)
router.patch(
    "/menu/update/:menuId",
    Validate(validator.updateMenu),
    vendorController.updateMenu,
)
router.get("/menu/:menuId", vendorController.getMenu)
router.delete(
    "/menu/:id",
    Validate(validator.empty),
    vendorController.deleteMenu,
)

module.exports = router
