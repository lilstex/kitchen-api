const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { Customer, Vendor } = require("../models")
const {
    registerCustomer,
    loginCustomer,
    loginVendor,
} = require("../services/authService") // Adjust the path to your actual service

jest.mock("bcryptjs")
jest.mock("jsonwebtoken")
jest.mock("../models")

describe("AuthService", () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    describe("registerCustomer", () => {
        it("should register customer successfully", async () => {
            const email = "tester@gmail.com"
            const password = "A1Password"
            const hashedPassword = await bcrypt.hash(password, 12)
            const customer = { id: 1, email, password: hashedPassword }

            Customer.findOne.mockResolvedValue(null)
            bcrypt.hash.mockResolvedValue(hashedPassword)
            Customer.create.mockResolvedValue(customer)

            const result = await registerCustomer({
                email,
                password,
            })

            expect(Customer.findOne).toHaveBeenCalledWith({ where: { email } })
            expect(bcrypt.hash).toHaveBeenCalledWith(password, 12)
            expect(Customer.create).toHaveBeenCalledWith({
                email,
                password: hashedPassword,
            })
            expect(result).toEqual({
                code: 201,
                status: true,
                message: "Account registered successfully",
                data: { id: customer.id, email: customer.email },
            })
        })

        it("should return email already in use", async () => {
            const email = "tester@gmail.com"
            const password = "A1Password"
            const customer = {
                id: 1,
                email,
                password: await bcrypt.hash(password, 12),
            }

            Customer.findOne.mockResolvedValue(customer)

            const result = await registerCustomer({
                email,
                password,
            })

            expect(result).toEqual({
                code: 409,
                status: false,
                message: "Email already in use",
            })
        })

        it("should handle errors during registration", async () => {
            const email = "tester@gmail.com"
            const password = "A1Password"

            Customer.findOne.mockRejectedValue(new Error("Database error"))

            const result = await registerCustomer({
                email,
                password,
            })

            expect(result).toEqual({
                code: 500,
                status: false,
                message: "An error occurred while registering customer account",
            })
        })
    })

    describe("loginCustomer", () => {
        it("should login customer successfully", async () => {
            const email = "tester@gmail.com"
            const password = "A1Password"
            const hashedPassword = await bcrypt.hash(password, 12)
            const customer = { id: 1, email, password: hashedPassword }

            Customer.findOne.mockResolvedValue(customer)
            bcrypt.compare.mockResolvedValue(true)
            jwt.sign.mockReturnValue("mocked-jwt-token")

            const result = await loginCustomer({ email, password })

            expect(Customer.findOne).toHaveBeenCalledWith({ where: { email } })
            expect(bcrypt.compare).toHaveBeenCalledWith(
                password,
                customer.password,
            )
            expect(jwt.sign).toHaveBeenCalledWith(
                { id: customer.id, type: "customer" },
                process.env.JWT_SECRET,
                { expiresIn: process.env.TOKEN_VALIDATION_DURATION },
            )
            expect(result).toEqual({
                code: 200,
                status: true,
                message: "Login successful",
                data: { token: "mocked-jwt-token", id: customer.id },
            })
        })

        it("should return invalid credentials if password does not match", async () => {
            const email = "tester@gmail.com"
            const password = "A1Password"
            const customer = {
                id: 1,
                email,
                password: await bcrypt.hash(password, 12),
            }

            Customer.findOne.mockResolvedValue(customer)
            bcrypt.compare.mockResolvedValue(false)

            const result = await loginCustomer({ email, password })

            expect(result).toEqual({
                code: 400,
                status: false,
                message: "Invalid credentials",
            })
        })

        it("should return error if customer not found", async () => {
            const email = "tester@gmail.com"
            const password = "A1Password"

            Customer.findOne.mockResolvedValue(null)

            const result = await loginCustomer({ email, password })

            expect(result).toEqual({
                code: 400,
                status: false,
                message: "Invalid credentials",
            })
        })

        it("should handle errors during login attempt", async () => {
            const email = "tester@gmail.com"
            const password = "A1Password"

            Customer.findOne.mockRejectedValue(new Error("Database error"))

            const result = await loginCustomer({ email, password })

            expect(result).toEqual({
                code: 500,
                status: false,
                message: "An error occurred during customer login attempt",
            })
        })
    })

    describe("loginVendor", () => {
        it("should login vendor successfully", async () => {
            const email = "vendor@gmail.com"
            const password = "A1Password"
            const hashedPassword = await bcrypt.hash(password, 12)
            const vendor = { id: 1, email, password: hashedPassword }

            Vendor.findOne.mockResolvedValue(vendor)
            bcrypt.compare.mockResolvedValue(true)
            jwt.sign.mockReturnValue("mocked-jwt-token")

            const result = await loginVendor({ email, password })

            expect(Vendor.findOne).toHaveBeenCalledWith({ where: { email } })
            expect(bcrypt.compare).toHaveBeenCalledWith(
                password,
                vendor.password,
            )
            expect(jwt.sign).toHaveBeenCalledWith(
                { id: vendor.id, type: "vendor" },
                process.env.JWT_SECRET,
                { expiresIn: process.env.TOKEN_VALIDATION_DURATION },
            )
            expect(result).toEqual({
                code: 200,
                status: true,
                message: "Login successful",
                data: { token: "mocked-jwt-token", id: vendor.id },
            })
        })

        it("should return invalid credentials if password does not match", async () => {
            const email = "vendor@gmail.com"
            const password = "A1Password"
            const vendor = {
                id: 1,
                email,
                password: await bcrypt.hash(password, 12),
            }

            Vendor.findOne.mockResolvedValue(vendor)
            bcrypt.compare.mockResolvedValue(false)

            const result = await loginVendor({ email, password })

            expect(result).toEqual({
                code: 400,
                status: false,
                message: "Invalid credentials",
            })
        })

        it("should return error if vendor not found", async () => {
            const email = "vendor@gmail.com"
            const password = "A1Password"

            Vendor.findOne.mockResolvedValue(null)

            const result = await loginVendor({ email, password })

            expect(result).toEqual({
                code: 400,
                status: false,
                message: "Invalid credentials",
            })
        })

        it("should handle errors during login attempt", async () => {
            const email = "vendor@gmail.com"
            const password = "A1Password"

            Vendor.findOne.mockRejectedValue(new Error("Database error"))

            const result = await loginVendor({ email, password })

            expect(result).toEqual({
                code: 500,
                status: false,
                message: "An error occurred during vendor login attempt",
            })
        })
    })
})
