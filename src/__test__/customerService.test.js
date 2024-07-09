const {
    listVendors,
    getVendor,
    listMenu,
    getMenu,
} = require("../services/customerService")
const { Vendor, MenuItem } = require("../models")

// Mock the models
jest.mock("../models")

describe("Customer Service", () => {
    describe("listVendors", () => {
        it("should list vendors successfully", async () => {
            Vendor.findAndCountAll.mockResolvedValue({
                count: 2,
                rows: [
                    { id: 1, email: "vendor1@example.com" },
                    { id: 2, email: "vendor2@example.com" },
                ],
            })

            const params = { page: 1, pageSize: 10 }
            const response = await listVendors(params)

            expect(response.code).toBe(200)
            expect(response.status).toBe(true)
            expect(response.data.vendors.length).toBe(2)
            expect(response.data.currentPage).toBe(1)
            expect(response.data.pageSize).toBe(10)
            expect(response.data.totalPages).toBe(1)
            expect(response.data.totalItems).toBe(2)
        })

        it("should handle errors during vendor listing", async () => {
            Vendor.findAndCountAll.mockRejectedValue(
                new Error("Database error"),
            )

            const params = { page: 1, pageSize: 10 }
            const response = await listVendors(params)

            expect(response.code).toBe(500)
            expect(response.status).toBe(false)
            expect(response.message).toBe(
                "An error occurred while fetching list of vendors",
            )
        })
    })

    describe("getVendor", () => {
        it("should retrieve vendor successfully", async () => {
            Vendor.findByPk.mockResolvedValue({
                id: 1,
                email: "vendor1@example.com",
            })

            const params = { vendorId: 1 }
            const response = await getVendor(params)

            expect(response.code).toBe(200)
            expect(response.status).toBe(true)
            expect(response.data.id).toBe(1)
            expect(response.data.email).toBe("vendor1@example.com")
        })

        it("should return vendor not found", async () => {
            Vendor.findByPk.mockResolvedValue(null)

            const params = { vendorId: 1 }
            const response = await getVendor(params)

            expect(response.code).toBe(404)
            expect(response.status).toBe(false)
            expect(response.message).toBe("Vendor not found")
        })

        it("should handle errors during vendor retrieval", async () => {
            Vendor.findByPk.mockRejectedValue(new Error("Database error"))

            const params = { vendorId: 1 }
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

            const params = { vendorId: 1, page: 1, pageSize: 10 }
            const response = await listMenu(params)

            expect(response.code).toBe(200)
            expect(response.status).toBe(true)
            expect(response.data.menu.length).toBe(2)
            expect(response.data.currentPage).toBe(1)
            expect(response.data.pageSize).toBe(10)
            expect(response.data.totalPages).toBe(1)
            expect(response.data.totalItems).toBe(2)
        })

        it("should handle errors during menu listing", async () => {
            MenuItem.findAndCountAll.mockRejectedValue(
                new Error("Database error"),
            )

            const params = { vendorId: 1, page: 1, pageSize: 10 }
            const response = await listMenu(params)

            expect(response.code).toBe(500)
            expect(response.status).toBe(false)
            expect(response.message).toBe(
                "An error occurred while fetching menu items",
            )
        })
    })

    describe("getMenu", () => {
        it("should retrieve menu item successfully", async () => {
            MenuItem.findOne.mockResolvedValue({
                id: 1,
                name: "item1",
                VendorId: 1,
                Vendor: { id: 1, email: "vendor1@example.com" },
            })

            const params = { menuId: 1, vendorId: 1 }
            const response = await getMenu(params)

            expect(response.code).toBe(200)
            expect(response.status).toBe(true)
            expect(response.data.id).toBe(1)
            expect(response.data.name).toBe("item1")
            expect(response.data.Vendor.id).toBe(1)
            expect(response.data.Vendor.email).toBe("vendor1@example.com")
        })

        it("should return menu item not found", async () => {
            MenuItem.findOne.mockResolvedValue(null)

            const params = { menuId: 1, vendorId: 1 }
            const response = await getMenu(params)

            expect(response.code).toBe(404)
            expect(response.status).toBe(false)
            expect(response.message).toBe("Menu item not found")
        })

        it("should handle errors during menu item retrieval", async () => {
            MenuItem.findOne.mockRejectedValue(new Error("Database error"))

            const params = { menuId: 1, vendorId: 1 }
            const response = await getMenu(params)

            expect(response.code).toBe(500)
            expect(response.status).toBe(false)
            expect(response.message).toBe(
                "An error occurred while fetching menu item",
            )
        })
    })
})
