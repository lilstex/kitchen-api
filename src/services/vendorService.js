const { Vendor, MenuItem } = require("../models")

/**
 * Get vendor information by ID.
 *
 * @async
 * @function getVendor
 * @param {Object} params - The parameters object.
 * @param {string} params.userId - The ID of the user making the request.
 * @param {string} params.vendorId - The ID of the vendor.
 * @returns {Promise<{ code: number, status: boolean, message: string, data?: any }>} Contains status and message
 * Author: Emmanuel
 */
const getVendor = async (params) => {
    try {
        const { userId } = params
        // Check if userId is equal to vendor id
        if (userId !== parseInt(params.vendorId, 10)) {
            return {
                code: 403,
                status: false,
                message: "Forbidden to view this vendor detail",
            }
        }

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
 * @param {string} params.userId - The ID of the user making the request.
 * @param {string} params.vendorId - The ID of the vendor.
 * @param {number} params.page - The current page number.
 * @param {number} params.pageSize - The number of records per page.
 * @returns {Promise<{ code: number, status: boolean, message: string, data?: { menu: Array, currentPage: number, pageSize: number, totalPages: number, totalItems: number } }>} Contains status and message
 * Author: Emmanuel
 */
const listMenu = async (params) => {
    try {
        const { userId } = params
        const page = parseInt(params.page) || 1 // Current page number, default to 1 if not provided
        const pageSize = parseInt(params.pageSize) || 10 // Number of records per page, default to 10 if not provided

        const offset = (page - 1) * pageSize

        // Check if userId is equal to vendor id
        if (userId !== parseInt(params.vendorId, 10)) {
            return {
                code: 403,
                status: false,
                message: "Forbidden to view this vendor menu",
            }
        }

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

        const totalPages = Math.ceil(count / pageSize)

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
 * Create a menu item for a vendor.
 *
 * @async
 * @function createMenu
 * @param {Object} params - The parameters object.
 * @param {string} params.name - The name of the menu item.
 * @param {number} params.price - The price of the menu item.
 * @param {string} params.description - The description of the menu item.
 * @param {string} params.userId - The ID of the user making the request.
 * @param {string} params.vendorId - The ID of the vendor.
 * @returns {Promise<{ code: number, status: boolean, message: string, data?: any }>} Contains status and message
 * Author: Emmanuel
 */
const createMenu = async (params) => {
    try {
        const { name, price, description, userId } = params

        if (userId !== parseInt(params.vendorId, 10)) {
            return {
                code: 403,
                status: false,
                message: "Forbidden access",
            }
        }

        // Create the menu item for the vendor
        const menuItem = await MenuItem.create({
            name,
            price,
            description,
            VendorId: params.vendorId,
        })

        return {
            code: 201,
            status: true,
            message: "Menu item created successfully",
            data: menuItem,
        }
    } catch (error) {
        console.error(error)
        return {
            code: 500,
            status: false,
            message: "An error occurred while creating the menu item",
        }
    }
}

/**
 * Update a menu item.
 *
 * @async
 * @function updateMenu
 * @param {Object} params - The parameters object.
 * @param {string} params.name - The name of the menu item.
 * @param {number} params.price - The price of the menu item.
 * @param {string} params.description - The description of the menu item.
 * @param {string} params.userId - The ID of the user making the request.
 * @param {string} params.menuId - The ID of the menu item.
 * @returns {Promise<{ code: number, status: boolean, message: string }>} Contains status and message
 * Author: Emmanuel
 */
const updateMenu = async (params) => {
    try {
        const { name, price, description, userId } = params
        // Check if userId matches VendorId of the menu item
        const menuItem = await MenuItem.findByPk(params.menuId)
        if (!menuItem) {
            return {
                code: 404,
                status: false,
                message: "Menu not found",
            }
        }
        // Check if userId is equal to vendorId
        if (userId !== menuItem.VendorId) {
            return {
                code: 403,
                status: false,
                message: "Forbidden access",
            }
        }

        // Update the menu item
        await MenuItem.update(
            { name, price, description },
            { where: { id: params.menuId } },
        )

        return {
            code: 200,
            status: true,
            message: "Menu item updated successfully",
        }
    } catch (error) {
        console.error(error)
        return {
            code: 500,
            status: false,
            message: "An error occurred while updating the menu item",
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
 * @returns {Promise<{ code: number, status: boolean, message: string, data?: any }>} Contains status and message
 * Author: Emmanuel
 */
const getMenu = async (params) => {
    try {
        const menuItem = await MenuItem.findByPk(params.menuId, {
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

/**
 * Delete a menu item.
 *
 * @async
 * @function deleteMenu
 * @param {Object} params - The parameters object.
 * @param {string} params.menuId - The ID of the menu item.
 * @param {string} params.userId - The ID of the user making the request.
 * @returns {Promise<{ code: number, status: boolean, message: string }>} Contains status and message
 * Author: Emmanuel
 */
const deleteMenu = async (params) => {
    try {
        const { userId } = params

        // Check if userId matches VendorId of the menu item
        const menuItem = await MenuItem.findByPk(params.menuId)
        if (!menuItem) {
            return {
                code: 404,
                status: false,
                message: "Menu not found",
            }
        }
        // Check if userId is equal to vendorId
        if (userId !== menuItem.VendorId) {
            return {
                code: 403,
                status: false,
                message: "Forbidden access",
            }
        }

        // Delete the menu item
        await MenuItem.destroy({ where: { id: params.menuId } })

        return {
            code: 200,
            status: true,
            message: "Menu item deleted successfully",
        }
    } catch (error) {
        console.error(error)
        return {
            code: 500,
            status: false,
            message: "An error occurred while deleting the menu item",
        }
    }
}

module.exports = {
    getVendor,
    listMenu,
    createMenu,
    updateMenu,
    getMenu,
    deleteMenu,
}
