const Response = require("../helper/response")
const AuthService = require("../services/authService")

/**
 * Register a customer
 *
 * @async
 * @function registerCustomer
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * Author: Emmanuel
 */
const registerCustomer = async (req, res) => {
    const { code, ...data } = await AuthService.registerCustomer(req.form)
    return Response(res, data, code)
}

/**
 * Login a customer
 *
 * @async
 * @function customerLogin
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * Author: Emmanuel
 */
const customerLogin = async (req, res) => {
    const { code, ...data } = await AuthService.loginCustomer(req.form)
    return Response(res, data, code)
}

/**
 * Login a vendor
 *
 * @async
 * @function vendorLogin
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * Author: Emmanuel
 */
const vendorLogin = async (req, res) => {
    const { code, ...data } = await AuthService.loginVendor(req.form)
    return Response(res, data, code)
}

module.exports = {
    registerCustomer,
    customerLogin,
    vendorLogin,
}
