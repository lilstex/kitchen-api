const {
    getVendor,
    listMenu,
    createMenu,
    updateMenu,
    getMenu,
    deleteMenu,
} = require("../services/vendorService")
const { Vendor, MenuItem } = require("../models")

// Mock the models
jest.mock("../models")

describe("Vendor Service", () => {
    describe("getVendor", () => {
        it("should retrieve vendor successfully", async () => {
            Vendor.findByPk.mockResolvedValue({
                id: 1,
                email: "vendor1@example.com",
            })

            const params = { userId: 1, vendorId: 1 }
            const response = await getVendor(params)

            expect(response.code).toBe(200)
            expect(response.status).toBe(true)
            expect(response.data.id).toBe(1)
            expect(response.data.email).toBe("vendor1@example.com")
        })

        it("should return vendor not found", async () => {
            Vendor.findByPk.mockResolvedValue(null)

            const params = { userId: 1, vendorId: 1 }
            const response = await getVendor(params)

            expect(response.code).toBe(404)
            expect(response.status).toBe(false)
            expect(response.message).toBe("Vendor not found")
        })

        it("should handle forbidden access to vendor", async () => {
            const params = { userId: 2, vendorId: 1 }
            const response = await getVendor(params)

            expect(response.code).toBe(403)
            expect(response.status).toBe(false)
            expect(response.message).toBe(
                "Forbidden to view this vendor detail",
            )
        })

        it("should handle errors during vendor retrieval", async () => {
            Vendor.findByPk.mockRejectedValue(new Error("Database error"))

            const params = { userId: 1, vendorId: 1 }
            const response = await getVendor(params)

            expect(response.code).toBe(500)
            expect(response.status).toBe(false)
            expect(response.message).toBe(
                "An error occurred while fetching vendor information",
            )
        })
    })

    describe("listMenu", () => {
        it("should list menu items successfully", async () => {
            MenuItem.findAndCountAll.mockResolvedValue({
                count: 2,
                rows: [
                    { id: 1, name: "item1", VendorId: 1 },
                    { id: 2, name: "item2", VendorId: 1 },
                ],
            })

            const params = { userId: 1, vendorId: 1, page: 1, pageSize: 10 }
            const response = await listMenu(params)

            expect(response.code).toBe(200)
            expect(response.status).toBe(true)
            expect(response.data.menu.length).toBe(2)
            expect(response.data.currentPage).toBe(1)
            expect(response.data.pageSize).toBe(10)
            expect(response.data.totalPages).toBe(1)
            expect(response.data.totalItems).toBe(2)
        })

        it("should handle forbidden access to vendor menu", async () => {
            const params = { userId: 2, vendorId: 1, page: 1, pageSize: 10 }
            const response = await listMenu(params)

            expect(response.code).toBe(403)
            expect(response.status).toBe(false)
            expect(response.message).toBe("Forbidden to view this vendor menu")
        })

        it("should handle errors during menu listing", async () => {
            MenuItem.findAndCountAll.mockRejectedValue(
                new Error("Database error"),
            )

            const params = { userId: 1, vendorId: 1, page: 1, pageSize: 10 }
            const response = await listMenu(params)

            expect(response.code).toBe(500)
            expect(response.status).toBe(false)
            expect(response.message).toBe(
                "An error occurred while fetching menu items",
            )
        })
    })

    describe("createMenu", () => {
        it("should create menu item successfully", async () => {
            const params = {
                name: "New Item",
                price: "10.99",
                description: "New menu item description",
                userId: 1,
                vendorId: 1,
            }

            const createdMenuItem = {
                id: 1,
                name: "New Item",
                price: 10.99,
                description: "New menu item description",
                VendorId: 1,
            }

            MenuItem.create.mockResolvedValue(createdMenuItem)

            const response = await createMenu(params)

            expect(response.code).toBe(201)
            expect(response.status).toBe(true)
            expect(response.message).toBe("Menu item created successfully")
            expect(response.data).toEqual(createdMenuItem)
        })

        it("should handle forbidden access to create menu item", async () => {
            const params = {
                name: "New Item",
                price: "10.99",
                description: "New menu item description",
                userId: 2,
                vendorId: 1,
            }

            const response = await createMenu(params)

            expect(response.code).toBe(403)
            expect(response.status).toBe(false)
            expect(response.message).toBe("Forbidden access")
        })

        it("should handle errors during menu item creation", async () => {
            const params = {
                name: "New Item",
                price: "10.99",
                description: "New menu item description",
                userId: 1,
                vendorId: 1,
            }

            MenuItem.create.mockRejectedValue(new Error("Database error"))

            const response = await createMenu(params)

            expect(response.code).toBe(500)
            expect(response.status).toBe(false)
            expect(response.message).toBe(
                "An error occurred while creating the menu item",
            )
        })
    })

    describe("updateMenu", () => {
        it("should update menu item successfully", async () => {
            const params = {
                name: "Updated Item",
                price: "15.99",
                description: "Updated menu item description",
                userId: 1,
                menuId: 1,
            }

            const menuItem = { id: 1, VendorId: 1 }

            MenuItem.findByPk.mockResolvedValue(menuItem)
            MenuItem.update.mockResolvedValue(true)

            const response = await updateMenu(params)

            expect(response.code).toBe(200)
            expect(response.status).toBe(true)
            expect(response.message).toBe("Menu item updated successfully")
        })

        it("should handle menu item not found during update", async () => {
            const params = {
                name: "Updated Item",
                price: "15.99",
                description: "Updated menu item description",
                userId: 1,
                menuId: 1,
            }

            MenuItem.findByPk.mockResolvedValue(null)

            const response = await updateMenu(params)

            expect(response.code).toBe(404)
            expect(response.status).toBe(false)
            expect(response.message).toBe("Menu not found")
        })

        it("should handle forbidden access to update menu item", async () => {
            const params = {
                name: "Updated Item",
                price: "15.99",
                description: "Updated menu item description",
                userId: 2,
                menuId: 1,
            }

            const menuItem = { id: 1, VendorId: 1 }

            MenuItem.findByPk.mockResolvedValue(menuItem)

            const response = await updateMenu(params)

            expect(response.code).toBe(403)
            expect(response.status).toBe(false)
            expect(response.message).toBe("Forbidden access")
        })

        it("should handle errors during menu item update", async () => {
            const params = {
                name: "Updated Item",
                price: "15.99",
                description: "Updated menu item description",
                userId: 1,
                menuId: 1,
            }

            MenuItem.findByPk.mockRejectedValue(new Error("Database error"))

            const response = await updateMenu(params)

            expect(response.code).toBe(500)
            expect(response.status).toBe(false)
            expect(response.message).toBe(
                "An error occurred while updating the menu item",
            )
        })
    })

    describe("getMenu", () => {
        it("should retrieve menu item successfully", async () => {
            const menuItem = {
                id: 1,
                name: "item1",
                VendorId: 1,
                Vendor: { id: 1, email: "vendor1@example.com" },
            }

            MenuItem.findByPk.mockResolvedValue(menuItem)

            const params = { menuId: 1, vendorId: 1 }
            const response = await getMenu(params)

            expect(response.code).toBe(200)
            expect(response.status).toBe(true)
            expect(response.data.id).toBe(1)
            expect(response.data.name).toBe("item1")
            expect(response.data.Vendor.id).toBe(1)
            expect(response.data.Vendor.email).toBe("vendor1@example.com")
        })

        it("should handle menu item not found", async () => {
            MenuItem.findByPk.mockResolvedValue(null)

            const params = { menuId: 1, vendorId: 1 }
            const response = await getMenu(params)

            expect(response.code).toBe(404)
            expect(response.status).toBe(false)
            expect(response.message).toBe("Menu item not found")
        })

        it("should handle errors during menu item retrieval", async () => {
            MenuItem.findByPk.mockRejectedValue(new Error("Database error"))

            const params = { menuId: 1, vendorId: 1 }
            const response = await getMenu(params)

            expect(response.code).toBe(500)
            expect(response.status).toBe(false)
            expect(response.message).toBe(
                "An error occurred while fetching menu item",
            )
        })
    })

    describe("deleteMenu", () => {
        it("should delete menu item successfully", async () => {
            const params = { userId: 1, menuId: 1 }

            const menuItem = { id: 1, VendorId: 1 }

            MenuItem.findByPk.mockResolvedValue(menuItem)
            MenuItem.destroy.mockResolvedValue(true)

            const response = await deleteMenu(params)

            expect(response.code).toBe(200)
            expect(response.status).toBe(true)
            expect(response.message).toBe("Menu item deleted successfully")
        })

        it("should handle menu item not found during delete", async () => {
            const params = { userId: 1, menuId: 1 }

            MenuItem.findByPk.mockResolvedValue(null)

            const response = await deleteMenu(params)

            expect(response.code).toBe(404)
            expect(response.status).toBe(false)
            expect(response.message).toBe("Menu not found")
        })

        it("should handle forbidden access to delete menu item", async () => {
            const params = { userId: 2, menuId: 1 }

            const menuItem = { id: 1, VendorId: 1 }

            MenuItem.findByPk.mockResolvedValue(menuItem)

            const response = await deleteMenu(params)

            expect(response.code).toBe(403)
            expect(response.status).toBe(false)
            expect(response.message).toBe("Forbidden access")
        })

        it("should handle errors during menu item deletion", async () => {
            const params = { userId: 1, menuId: 1 }

            MenuItem.findByPk.mockRejectedValue(new Error("Database error"))

            const response = await deleteMenu(params)

            expect(response.code).toBe(500)
            expect(response.status).toBe(false)
            expect(response.message).toBe(
                "An error occurred while deleting the menu item",
            )
        })
    })
})
