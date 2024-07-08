const { Vendor, MenuItem } = require("../models")

/**
 * List all vendors with pagination.
 *
 * @async
 * @function listVendors
 * @param {Object} params - The parameters object.
 * @param {number} params.page - The current page number.
 * @param {number} params.pageSize - The number of records per page.
 * @returns {Promise<{ code: number, status: boolean, message: string, data?: { vendors: Array, currentPage: number, pageSize: number, totalPages: number, totalItems: number } }>} Contains status and message
 * Author: Emmanuel
 */
const listVendors = async (params) => {
    try {
        const page = parseInt(params.page) || 1 // Current page number, default to 1 if not provided
        const pageSize = parseInt(params.pageSize) || 10 // Number of records per page, default to 10 if not provided

        const offset = (page - 1) * pageSize // Offset for Sequelize query

        const { count, rows } = await Vendor.findAndCountAll({
            offset: offset,
            limit: pageSize,
            order: [["createdAt", "DESC"]],
            attributes: { exclude: ["password"] },
        })

        const totalPages = Math.ceil(count / pageSize) // Calculate total number of pages

        return {
            code: 200,
            status: true,
            message: "List of vendors retrieved successfully",
            data: {
                vendors: rows,
                currentPage: page,
                pageSize: pageSize,
                totalPages: totalPages,
                totalItems: count,
            },
        }
    } catch (error) {
        console.error(error)
        return {
            code: 500,
            status: false,
            message: "An error occurred while fetching list of vendors",
        }
    }
}

/**
 * Get vendor information by ID.
 *
 * @async
 * @function getVendor
 * @param {Object} params - The parameters object.
 * @param {string} params.vendorId - The ID of the vendor.
 * @returns {Promise<{ code: number, status: boolean, message: string, data?: { id: string, email: string, createdAt: Date, updatedAt: Date } }>} Contains status and message
 * Author: Emmanuel
 */
const getVendor = async (params) => {
    try {
        const vendor = await Vendor.findByPk(params.vendorId, {
            attributes: { exclude: ["password"] },
        })

        if (!vendor) {
            return {
                code: 404,
                status: false,
                message: "Vendor not found",
            }
        }
        return {
            code: 200,
            status: true,
            message: "Vendor retrieved successfully",
            data: vendor,
        }
    } catch (error) {
        console.error(error)
        return {
            code: 500,
            status: false,
            message: "An error occurred while fetching vendor information",
        }
    }
}

/**
 * List menu items for a vendor with pagination.
 *
 * @async
 * @function listMenu
 * @param {Object} params - The parameters object.
 * @param {string} params.vendorId - The ID of the vendor.
 * @param {number} params.page - The current page number.
 * @param {number} params.pageSize - The number of records per page.
 * @returns {Promise<{ code: number, status: boolean, message: string, data?: { menu: Array, currentPage: number, pageSize: number, totalPages: number, totalItems: number } }>} Contains status and message
 * Author: Emmanuel
 */
const listMenu = async (params) => {
    try {
        const page = parseInt(params.page) || 1 // Current page number, default to 1 if not provided
        const pageSize = parseInt(params.pageSize) || 10 // Number of records per page, default to 10 if not provided

        const offset = (page - 1) * pageSize

        const { count, rows } = await MenuItem.findAndCountAll({
            where: { VendorId: params.vendorId },
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

        return {
            code: 200,
            status: true,
            message: "Menu items retrieved successfully",
            data: {
                menu: rows,
                currentPage: page,
                pageSize: pageSize,
                totalPages: totalPages,
                totalItems: count,
            },
        }
    } catch (error) {
        console.error(error)
        return {
            code: 500,
            status: false,
            message: "An error occurred while fetching menu items",
        }
    }
}

/**
 * Get menu item details by ID.
 *
 * @async
 * @function getMenu
 * @param {Object} params - The parameters object.
 * @param {string} params.menuId - The ID of the menu item.
 * @param {string} params.vendorId - The ID of the vendor.
 * @returns {Promise<{ code: number, status: boolean, message: string, data?: { id: string, name: string, description: string, price: number, createdAt: Date, updatedAt: Date, Vendor: { id: string, email: string } } }>} Contains status and message
 * Author: Emmanuel
 */
const getMenu = async (params) => {
    try {
        const menuItem = await MenuItem.findOne({
            where: {
                id: params.menuId,
                VendorId: params.vendorId,
            },
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
            return {
                code: 404,
                status: false,
                message: "Menu item not found",
            }
        }
        return {
            code: 200,
            status: true,
            message: "Menu item retrieved successfully",
            data: menuItem,
        }
    } catch (error) {
        console.error(error)
        return {
            code: 500,
            status: false,
            message: "An error occurred while fetching menu item",
        }
    }
}

module.exports = {
    listVendors,
    getVendor,
    listMenu,
    getMenu,
}
