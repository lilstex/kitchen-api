const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")
const Validate = require("../middlewares/validate")
const validator = require("../validators/authValidator")

router.post(
    "/customers/register",
    Validate(validator.register),
    authController.registerCustomer,
)
router.post(
    "/customers/login",
    Validate(validator.login),
    authController.customerLogin,
)
router.post(
    "/vendors/login",
    Validate(validator.login),
    authController.vendorLogin,
)

module.exports = router
