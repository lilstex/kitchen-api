const CustomerService = require("../services/customerService")
const Response = require("../helper/response")

/**
 * List vendors
 *
 * @async
 * @function listVendors
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * Author: Emmanuel
 */
const listVendors = async (req, res) => {
    const { code, ...data } = await CustomerService.listVendors(req.form)
    return Response(res, data, code)
}

/**
 * Get vendor
 *
 * @async
 * @function getVendor
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * Author: Emmanuel
 */
const getVendor = async (req, res) => {
    const { code, ...data } = await CustomerService.getVendor(req.form)
    return Response(res, data, code)
}

/**
 * List menu items for a vendor with pagination.
 *
 * @async
 * @function listMenu
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * Author: Emmanuel
 */
const listMenu = async (req, res) => {
    const { code, ...data } = await CustomerService.listMenu(req.form)
    return Response(res, data, code)
}

/**
 * Get menu item details by ID.
 *
 * @async
 * @function getMenu
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * Author: Emmanuel
 */
const getMenu = async (req, res) => {
    const { code, ...data } = await CustomerService.getMenu(req.form)
    return Response(res, data, code)
}

module.exports = {
    listVendors,
    getVendor,
    listMenu,
    getMenu,
}
