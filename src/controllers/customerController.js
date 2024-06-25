const { Vendor, MenuItem } = require("../models")
const Response = require("../helper/response")

/**
 * List all vendors with pagination.
 *
 * @async
 * @function listVendors
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<{ status: boolean, message: string, data?: any }>} Contains status and message
 * Author: Emmanuel
 */
const listVendors = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1 // Current page number, default to 1 if not provided
        const pageSize = parseInt(req.query.pageSize) || 10 // Number of records per page, default to 10 if not provided

        const offset = (page - 1) * pageSize // Offset for Sequelize query

        const { count, rows } = await Vendor.findAndCountAll({
            offset: offset,
            limit: pageSize,
            order: [["createdAt", "DESC"]],
            attributes: { exclude: ["password"] },
        })

        const totalPages = Math.ceil(count / pageSize) // Calculate total number of pages

        return Response(
            res,
            {
                status: true,
                message: "List of vendors retrieved successfully",
                data: {
                    vendors: rows,
                    currentPage: page,
                    pageSize: pageSize,
                    totalPages: totalPages,
                    totalItems: count,
                },
            },
            200,
        )
    } catch (error) {
        console.error(error)
        return Response(
            res,
            {
                status: false,
                message: "An error occurred while fetching list of vendors",
            },
            500,
        )
    }
}

/**
 * Get vendor information by ID.
 *
 * @async
 * @function getVendor
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<{ status: boolean, message: string, data?: any }>} Contains status and message
 * Author: Emmanuel
 */
const getVendor = async (req, res) => {
    try {
        const vendor = await Vendor.findByPk(req.params.id, {
            attributes: { exclude: ["password"] },
        })

        if (!vendor) {
            return Response(
                res,
                {
                    status: false,
                    message: "Vendor not found",
                },
                404,
            )
        }

        return Response(
            res,
            {
                status: true,
                message: "Vendor retrieved successfully",
                data: vendor,
            },
            200,
        )
    } catch (error) {
        console.error(error)
        return Response(
            res,
            {
                status: false,
                message: "An error occurred while fetching vendor information",
            },
            500,
        )
    }
}

/**
 * List menu items for a vendor with pagination.
 *
 * @async
 * @function listMenu
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<{ status: boolean, message: string, data?: any }>} Contains status and message
 * Author: Emmanuel
 */
const listMenu = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1 // Current page number, default to 1 if not provided
        const pageSize = parseInt(req.query.pageSize) || 10 // Number of records per page, default to 10 if not provided

        const offset = (page - 1) * pageSize

        const { count, rows } = await MenuItem.findAndCountAll({
            where: { VendorId: req.params.id },
            offset: offset,
            limit: pageSize,
            order: [["createdAt", "DESC"]],
            include: [
                {
                    model: Vendor,
                    attributes: {
                        exclude: ["password", "createdAt", "updatedAt"],
                    },
                },
            ],
        })

        const totalPages = Math.ceil(count / pageSize) // Calculate total number of pages

        return Response(
            res,
            {
                status: true,
                message: "Menu items retrieved successfully",
                data: {
                    menu: rows,
                    currentPage: page,
                    pageSize: pageSize,
                    totalPages: totalPages,
                    totalItems: count,
                },
            },
            200,
        )
    } catch (error) {
        console.error(error)
        return Response(
            res,
            {
                status: false,
                message: "An error occurred while fetching menu items",
            },
            500,
        )
    }
}

/**
 * Get menu item details by ID.
 *
 * @async
 * @function getMenu
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<{ status: boolean, message: string, data?: any }>} Contains status and message
 * Author: Emmanuel
 */
const getMenu = async (req, res) => {
    try {
        const menuItem = await MenuItem.findByPk(req.params.menuId, {
            include: [
                {
                    model: Vendor,
                    attributes: {
                        exclude: ["password", "createdAt", "updatedAt"],
                    },
                },
            ],
        })

        if (!menuItem) {
            return Response(
                res,
                {
                    status: false,
                    message: "Menu item not found",
                },
                404,
            )
        }

        return Response(
            res,
            {
                status: true,
                message: "Menu item retrieved successfully",
                data: menuItem,
            },
            200,
        )
    } catch (error) {
        console.error(error)
        return Response(
            res,
            {
                status: false,
                message: "An error occurred while fetching menu item",
            },
            500,
        )
    }
}

module.exports = {
    listVendors,
    getVendor,
    listMenu,
    getMenu,
}
