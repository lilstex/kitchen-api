const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")
const Validate = require("../middlewares/validate")
const validator = require("../validators/authValidator")

router.post(
    "/register-customer",
    Validate(validator.register),
    authController.register,
)
router.post(
    "/customer-login",
    Validate(validator.login),
    authController.customerLogin,
)
router.post(
    "/vendor-login",
    Validate(validator.login),
    authController.vendorLogin,
)

module.exports = router
