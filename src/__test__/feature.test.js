const request = require("supertest")
const app = require("../index")
const { initDB, disconnectDatabase } = require("../models")

// connect to database
beforeAll(async () => {
    try {
        await initDB()
    } catch (err) {
        console.error("Error while initializing test database: ", err)
    }
})
// close databse connection
afterAll(async () => {
    try {
        await disconnectDatabase()
        app.close()
    } catch (err) {
        console.error("Error while disconnecting from the test database: ", err)
    }
})

// Authorization token

describe("CUSTOMER", () => {
    let customerToken
    let customerId
    it("/customer/register - Should register customer successfully", async () => {
        const res = await request(app).post("/auth/customers/register").send({
            email: "tester@gmail.com",
            password: "A1Password",
        })
        expect(res.statusCode).toBe(201)
        expect(res.body.status).toBe(true)
        expect(res.body.data.email).toBe("tester@gmail.com")
    })

    it("/customer/login - Should login customer successfully", async () => {
        const res = await request(app).post("/auth/customers/login").send({
            email: "tester@gmail.com",
            password: "A1Password",
        })
        expect(res.statusCode).toBe(200)
        expect(res.body.status).toBe(true)
        expect(res.body.data).toHaveProperty("token")
        expect(res.body.data).toHaveProperty("id")
        // Store the token in the customer token variable
        customerToken = res.body.data.token
        // Store the customer ID in the customer ID variable
        customerId = res.body.data.id
    })

    it("/customer/vendors - Get all vendors", async () => {
        const res = await request(app)
            .get("/customers/vendors")
            .set("Authorization", `Bearer ${customerToken}`)

        expect(res.statusCode).toBe(200)
        expect(res.body.status).toBe(true)
        expect(res.body.data).toHaveProperty("pageSize")
        expect(res.body.data).toHaveProperty("vendors")
        expect(Array.isArray(res.body.data.vendors)).toBe(true)
    })

    it("/customer/vendors/:vendorId - Get vendor detail", async () => {
        const res = await request(app)
            .get("/customers/vendors/1")
            .set("Authorization", `Bearer ${customerToken}`)

        expect(res.statusCode).toBe(200)
        expect(res.body.status).toBe(true)
        expect(res.body.data).toHaveProperty("name")
        expect(res.body.data.email).toBe("resa@gmail.com")
    })

    it("/customer/vendors/:vendorId/menu - List menu of a vendor", async () => {
        const res = await request(app)
            .get("/customers/vendors/1/menu")
            .set("Authorization", `Bearer ${customerToken}`)

        expect(res.statusCode).toBe(200)
        expect(res.body.status).toBe(true)
        expect(res.body.data).toHaveProperty("pageSize")
        expect(res.body.data).toHaveProperty("menu")
        expect(Array.isArray(res.body.data.menu)).toBe(true)
    })

    it("/customer/vendors/:vendorId/menu/:menuId - View detail of a menu from a vendor", async () => {
        const res = await request(app)
            .get("/customers/vendors/1/menu/1")
            .set("Authorization", `Bearer ${customerToken}`)

        expect(res.statusCode).toBe(200)
        expect(res.body.status).toBe(true)
        expect(res.body.data).toHaveProperty("Vendor")
        expect(res.body.data).toHaveProperty("name")
    })

    it("/customer/login - Login with incorrect credentials", async () => {
        const res = await request(app).post("/auth/customers/login").send({
            email: "tester@gmail.com",
            password: "Password",
        })
        expect(res.statusCode).toBe(400)
        expect(res.body.status).toBe(false)
        expect(res.body.message).toBe("Invalid credentials")
    })

    it("/customer/vendors/:vendorId/menu/:menuId - Get menu item of a different vendor", async () => {
        const res = await request(app)
            .get("/customers/vendors/1/menu/5")
            .set("Authorization", `Bearer ${customerToken}`)

        expect(res.statusCode).toBe(404)
        expect(res.body.status).toBe(false)
        expect(res.body.message).toBe("Menu item not found")
    })
})

describe("VENDOR", () => {
    let vendorToken
    let vendorId
    let menuId
    it("/vendors/login - Should login vendor successfully", async () => {
        const res = await request(app).post("/auth/vendors/login").send({
            email: "resa@gmail.com",
            password: "password",
        })
        expect(res.statusCode).toBe(200)
        expect(res.body.status).toBe(true)
        expect(res.body.data).toHaveProperty("token")
        expect(res.body.data).toHaveProperty("id")
        // Store the token in the vendor token variable
        vendorToken = res.body.data.token
        // Store the vendor ID in the vendor ID variable
        vendorId = res.body.data.id
    })

    it("/vendors/login - Should login vendor successfully", async () => {
        const res = await request(app).post("/auth/vendors/login").send({
            email: "resa@gmail.com",
            password: "password",
        })
        expect(res.statusCode).toBe(200)
        expect(res.body.status).toBe(true)
        expect(res.body.data).toHaveProperty("token")
        expect(res.body.data).toHaveProperty("id")
        // Store the token in the vendor token variable
        vendorToken = res.body.data.token
        // Store the vendor ID in the vendor ID variable
        vendorId = res.body.data.id
    })

    it("/vendors/:vendorId - Vendor detail", async () => {
        const res = await request(app)
            .get(`/vendors/${vendorId}`)
            .set("Authorization", `Bearer ${vendorToken}`)

        expect(res.statusCode).toBe(200)
        expect(res.body.status).toBe(true)
        expect(res.body.data).toHaveProperty("name")
        expect(res.body.data.email).toBe("resa@gmail.com")
    })

    it("/vendors/:vendorId/menu - List menu items of a vendor", async () => {
        const res = await request(app)
            .get(`/vendors/${vendorId}/menu`)
            .set("Authorization", `Bearer ${vendorToken}`)

        expect(res.statusCode).toBe(200)
        expect(res.body.status).toBe(true)
        expect(res.body.data).toHaveProperty("pageSize")
        expect(res.body.data).toHaveProperty("menu")
        expect(Array.isArray(res.body.data.menu)).toBe(true)
    })

    it("/vendors/:vendorId/menu - Create menu", async () => {
        const res = await request(app)
            .post(`/vendors/${vendorId}/menu`)
            .send({
                name: "test menu",
                price: "25.55",
                description: "A test menu",
            })
            .set("Authorization", `Bearer ${vendorToken}`)

        expect(res.statusCode).toBe(201)
        expect(res.body.status).toBe(true)
        expect(res.body.data.name).toBe("test menu")
        // Store the menu ID in the menu ID variable
        menuId = res.body.data.id
    })

    it("/vendors/:vendorId/menu/:menuId - Update menu", async () => {
        const res = await request(app)
            .patch(`/vendors/${vendorId}/menu/${menuId}`)
            .send({
                name: "beans",
                price: "25.55",
            })
            .set("Authorization", `Bearer ${vendorToken}`)

        expect(res.statusCode).toBe(200)
        expect(res.body.status).toBe(true)
        expect(res.body.message).toBe("Menu item updated successfully")
    })

    it("/vendors/:vendorId/menu/:menuId - Get an item in a menu", async () => {
        const res = await request(app)
            .get(`/vendors/${vendorId}/menu/${menuId}`)
            .set("Authorization", `Bearer ${vendorToken}`)

        expect(res.statusCode).toBe(200)
        expect(res.body.status).toBe(true)
        expect(res.body.data).toHaveProperty("Vendor")
        expect(res.body.data).toHaveProperty("name")
    })

    it("/vendors/:vendorId/menu/:menuId - Delete an item in a menu", async () => {
        const res = await request(app)
            .delete(`/vendors/${vendorId}/menu/${menuId}`)
            .set("Authorization", `Bearer ${vendorToken}`)

        expect(res.statusCode).toBe(200)
        expect(res.body.status).toBe(true)
        expect(res.body.message).toBe("Menu item deleted successfully")
    })

    it("/vendors/:vendorId/menu/:menuId - Get a deleted item in a menu", async () => {
        const res = await request(app)
            .get(`/vendors/${vendorId}/menu/${menuId}`)
            .set("Authorization", `Bearer ${vendorToken}`)

        expect(res.statusCode).toBe(404)
        expect(res.body.status).toBe(false)
    })

    it("/vendors/:vendorId/menu/:menuId - Update a non existent menu item", async () => {
        const res = await request(app)
            .patch(`/vendors/${vendorId}/menu/${menuId}`)
            .send({
                name: "beans",
                price: "25.55",
            })
            .set("Authorization", `Bearer ${vendorToken}`)

        expect(res.statusCode).toBe(404)
        expect(res.body.status).toBe(false)
        expect(res.body.message).toBe("Menu not found")
    })

    it("/vendors/:vendorId - Viewing details of another vendor", async () => {
        const res = await request(app)
            .get("/vendors/2")
            .set("Authorization", `Bearer ${vendorToken}`)

        expect(res.statusCode).toBe(403)
        expect(res.body.status).toBe(false)
    })

    it("/vendors/login - Login with wrong credential", async () => {
        const res = await request(app).post("/auth/vendors/login").send({
            email: "resa@gmail.com",
            password: "password1",
        })
        expect(res.statusCode).toBe(400)
        expect(res.body.status).toBe(false)
        expect(res.body.message).toBe("Invalid credentials")
    })
})
