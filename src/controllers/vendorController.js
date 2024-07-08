const VendorService = require("../services/vendorService")
const Response = require("../helper/response")

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
    const { code, ...data } = await VendorService.getVendor(req.form)
    return Response(res, data, code)
}

/**
 * List menu items
 *
 * @async
 * @function listMenu
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * Author: Emmanuel
 */
const listMenu = async (req, res) => {
    const { code, ...data } = await VendorService.listMenu(req.form)
    return Response(res, data, code)
}

/**
 * Create a menu item
 *
 * @async
 * @function createMenuItem
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * Author: Emmanuel
 */
const createMenu = async (req, res) => {
    const { code, ...data } = await VendorService.createMenu(req.form)
    return Response(res, data, code)
}

/**
 * Update a menu item
 *
 * @async
 * @function updateMenuItem
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * Author: Emmanuel
 */
const updateMenu = async (req, res) => {
    const { code, ...data } = await VendorService.updateMenu(req.form)
    return Response(res, data, code)
}

/**
 * Get menu item
 *
 * @async
 * @function getMenu
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * Author: Emmanuel
 */
const getMenu = async (req, res) => {
    const { code, ...data } = await VendorService.getMenu(req.form)
    return Response(res, data, code)
}

/**
 * Delete a menu item
 *
 * @async
 * @function deleteMenuItem
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * Author: Emmanuel
 */
const deleteMenu = async (req, res) => {
    const { code, ...data } = await VendorService.deleteMenu(req.form)
    return Response(res, data, code)
}

module.exports = {
    getVendor,
    listMenu,
    createMenu,
    updateMenu,
    getMenu,
    deleteMenu,
}
