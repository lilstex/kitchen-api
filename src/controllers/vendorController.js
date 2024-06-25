const { Vendor, MenuItem } = require("../models")
const Response = require("../helper/response")

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
        const { userId } = req.form

        // Check if userId is equal to vendor id
        if (userId !== parseInt(req.params.id)) {
            return Response(
                res,
                {
                    status: false,
                    message: "Not authorised to view this vendor detail",
                },
                403,
            )
        }

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
        const { userId } = req.form
        const page = parseInt(req.query.page) || 1 // Current page number, default to 1 if not provided
        const pageSize = parseInt(req.query.pageSize) || 10 // Number of records per page, default to 10 if not provided

        const offset = (page - 1) * pageSize

        // Check if userId is equal to vendor id
        if (userId !== parseInt(req.params.id)) {
            return Response(
                res,
                {
                    status: false,
                    message: "Not authorised to view this vendor menu",
                },
                403,
            )
        }

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

        const totalPages = Math.ceil(count / pageSize)

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
 * Create a menu item for a vendor.
 *
 * @async
 * @function createMenuItem
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the menu item is created.
 * Author: Emmanuel
 */
const createMenu = async (req, res) => {
    try {
        const { name, price, description, userId } = req.form

        // Check if userId is equal to req.params.id
        if (userId !== parseInt(req.params.id, 10)) {
            return Response(
                res,
                {
                    status: false,
                    message: "Forbidden access",
                },
                403,
            )
        }

        // Create the menu item for the vendor
        const menuItem = await MenuItem.create({
            name,
            price,
            description,
            VendorId: req.params.id,
        })

        return Response(
            res,
            {
                status: true,
                message: "Menu item created successfully",
                data: menuItem,
            },
            201,
        )
    } catch (error) {
        console.error(error)
        return Response(
            res,
            {
                status: false,
                message: "An error occurred while creating the menu item",
            },
            500,
        )
    }
}

/**
 * Update a menu item.
 *
 * @async
 * @function updateMenuItem
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the menu item is updated.
 * Author: Emmanuel
 */
const updateMenu = async (req, res) => {
    try {
        const { name, price, description, userId } = req.form
        // Check if userId matches VendorId of the menu item
        const menuItem = await MenuItem.findByPk(req.params.menuId)
        if (!menuItem) {
            return Response(
                res,
                {
                    status: false,
                    message: "Menu not found",
                },
                404,
            )
        }
        // Check if userId is equal to vendorId
        if (userId !== menuItem.VendorId) {
            return Response(
                res,
                {
                    status: false,
                    message: "Forbidden access",
                },
                403,
            )
        }

        // Update the menu item
        await MenuItem.update(
            { name, price, description },
            { where: { id: req.params.menuId } },
        )

        return Response(
            res,
            {
                status: true,
                message: "Menu item updated successfully",
            },
            200,
        )
    } catch (error) {
        console.error(error)
        return Response(
            res,
            {
                status: false,
                message: "An error occurred while updating the menu item",
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

/**
 * Delete a menu item.
 *
 * @async
 * @function deleteMenuItem
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the menu item is deleted.
 * Author: Emmanuel
 */
const deleteMenu = async (req, res) => {
    try {
        const { userId } = req.form

        // Check if userId matches VendorId of the menu item
        const menuItem = await MenuItem.findByPk(req.params.id)
        if (!menuItem) {
            return Response(
                res,
                {
                    status: false,
                    message: "Menu not found",
                },
                404,
            )
        }
        // Check if userId is equal to vendorId
        if (userId !== menuItem.VendorId) {
            return Response(
                res,
                {
                    status: false,
                    message: "Forbidden access",
                },
                403,
            )
        }

        // Delete the menu item
        await MenuItem.destroy({ where: { id: req.params.id } })

        return Response(
            res,
            {
                status: true,
                message: "Menu item deleted successfully",
            },
            200,
        )
    } catch (error) {
        console.error(error)
        return Response(
            res,
            {
                status: false,
                message: "An error occurred while deleting the menu item",
            },
            500,
        )
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
