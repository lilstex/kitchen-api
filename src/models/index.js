const bcrypt = require("bcryptjs")
const { sequelize } = require("../config")
const Vendor = require("./vendor")
const MenuItem = require("./menu")
const Customer = require("./customer")

/**
 * Synchronize the database models with the database schema.
 *
 * @async
 * @function syncDB
 * @returns {Promise<void>} A promise that resolves when the database models are synchronized.
 */
const syncDB = async () => {
    try {
        // Synchronize models with database schema
        await sequelize.sync()
        console.log("Database synchronized successfully.")
    } catch (error) {
        console.error("Error synchronizing database:", error)
        throw error
    }
}

/**
 * Seed initial data into the database.
 *
 * @async
 * @function seedDB
 * @returns {Promise<void>} A promise that resolves when initial data is seeded.
 */
const seedDB = async () => {
    try {
        // Seed the database with initial vendors and menu items
        const vendors = await seedVendors()
        await seedMenuItems(vendors)
    } catch (error) {
        console.error("Error seeding initial data:", error)
        throw error
    }
}

/**
 * Seed vendors into the database.
 *
 * @async
 * @function seedVendors
 * @returns {Promise<Array<Object>>} A promise that resolves with the seeded vendors.
 */
const seedVendors = async () => {
    try {
        const password = await bcrypt.hash("password", 12)
        const vendorsData = [
            {
                email: "resa@gmail.com",
                password: password,
                name: "Restaurant A",
                description: "Fine dining",
            },
            {
                email: "resb@gmail.com",
                password: password,
                name: "Restaurant B",
                description: "Casual dining",
            },
            {
                email: "resc@gmail.com",
                password: password,
                name: "Restaurant C",
                description: "Fast food",
            },
        ]

        const existingVendors = await Vendor.findAll()
        const existingVendorEmails = existingVendors.map(
            (vendor) => vendor.email,
        )

        const vendorsToCreate = vendorsData.filter(
            (vendor) => !existingVendorEmails.includes(vendor.email),
        )

        const createdVendors = await Vendor.bulkCreate(vendorsToCreate)

        return createdVendors
    } catch (error) {
        console.error("Error seeding vendors:", error)
        throw error
    }
}

/**
 * Seed menu items into the database.
 *
 * @async
 * @function seedMenuItems
 * @param {Array<Object>} vendors - Array of vendor objects.
 * @returns {Promise<void>} A promise that resolves when menu items are seeded.
 */
const seedMenuItems = async (vendors) => {
    try {
        const menuItemsData = [
            {
                name: "Pasta",
                price: 12.5,
                description: "A little pasta",
                VendorId: vendors.find((v) => v.email == "resa@gmail.com")?.id,
            },
            {
                name: "Burger",
                price: 8.5,
                description: "A little burger",
                VendorId: vendors.find((v) => v.email == "resa@gmail.com")?.id,
            },
            {
                name: "Pizza",
                price: 10.0,
                description: "A little pizza",
                VendorId: vendors.find((v) => v.email == "resa@gmail.com")?.id,
            },
            {
                name: "Shawarma",
                price: 10.0,
                description: "A little shawarma",
                VendorId: vendors.find((v) => v.email == "resb@gmail.com")?.id,
            },
            {
                name: "Cassava Chips",
                price: 10.0,
                description: "A little chips",
                VendorId: vendors.find((v) => v.email == "resb@gmail.com")?.id,
            },
            {
                name: "Plaintain Chips",
                price: 10.0,
                description: "A little plaintain chips",
                VendorId: vendors.find((v) => v.email == "resc@gmail.com")?.id,
            },
            {
                name: "Lemonade toast",
                price: 10.0,
                description: "A lemonade toast",
                VendorId: vendors.find((v) => v.email == "resc@gmail.com")?.id,
            },
        ]

        // Check if each menu item already exists by name
        for (const item of menuItemsData) {
            const existingItem = await MenuItem.findOne({
                where: { name: item.name },
            })
            if (!existingItem) {
                await MenuItem.create(item)
            }
        }
    } catch (error) {
        console.error("Error seeding menu items:", error)
        throw error
    }
}

/**
 * Initialize the database by synchronizing models and seeding initial data.
 *
 * @async
 * @function initDB
 * @returns {Promise<void>} A promise that resolves when the database has been initialized.
 */
const initDB = async () => {
    try {
        await syncDB() // Sync models with database schema
        await seedDB() // Seed initial data into the database
    } catch (error) {
        console.error("Error initializing database:", error)
        throw error
    }
}

module.exports = { sequelize, initDB, Vendor, MenuItem, Customer }
