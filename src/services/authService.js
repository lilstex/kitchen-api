const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { Customer, Vendor } = require("../models")

/**
 * Register a new customer.
 *
 * @async
 * @function registerCustomer
 * @param {Object} params - The parameters object.
 * @param {string} params.email - The email of the customer.
 * @param {string} params.password - The password of the customer.
 * @returns {Promise<{ code: integer, status: boolean, message: string, data?: {id: string, email: string, createdAt: Date, updatedAt: Date} }>} Contains status and message
 * Author: Emmanuel
 */
const registerCustomer = async (params) => {
    try {
        const { email, password } = params
        // Check if email already exists
        const emailExists = await Customer.findOne({ where: { email } })
        if (emailExists) {
            return {
                code: 409,
                status: false,
                message: "Email already in use",
            }
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        const customer = await Customer.create({
            email,
            password: hashedPassword,
        })
        // Serialized user data
        const data = {
            id: customer.id,
            email: customer.email,
        }
        return {
            code: 201,
            status: true,
            message: "Account registered successfully",
            data,
        }
    } catch (error) {
        console.log(error)
        return {
            code: 500,
            status: false,
            message: "An error occurred while registering customer account",
        }
    }
}

/**
 * Login a customer and generate a JWT token.
 *
 * @async
 * @function loginCustomer
 * @param {Object} params - The parameters object.
 * @param {string} params.email - The email of the customer.
 * @param {string} params.password - The password of the customer.
 * @returns {Promise<{ code: integer, status: boolean, message: string, data?: { token: string, id: string } }>} Contains status and message
 * Author: Emmanuel
 */
const loginCustomer = async (params) => {
    try {
        const { email, password } = params
        const customer = await Customer.findOne({ where: { email } })
        // if account exist, check if password match
        if (customer && (await bcrypt.compare(password, customer.password))) {
            const token = jwt.sign(
                { id: customer.id, type: "customer" },
                process.env.JWT_SECRET,
                {
                    expiresIn: process.env.TOKEN_VALIDATION_DURATION,
                },
            )
            return {
                code: 200,
                status: true,
                message: "Login successful",
                data: { token, id: customer.id },
            }
        } else {
            return {
                code: 400,
                status: false,
                message: "Invalid credentials",
            }
        }
    } catch (error) {
        console.log(error)
        return {
            code: 500,
            status: false,
            message: "An error occurred during customer login attempt",
        }
    }
}

/**
 * Login a vendor and generate a JWT token.
 *
 * @async
 * @function loginVendor
 * @param {Object} params - The parameters object.
 * @param {string} params.email - The email of the vendor.
 * @param {string} params.password - The password of the vendor.
 * @returns {Promise<{ code: integer, status: boolean, message: string, data?: { token: string, id: string } }>} Contains status and message
 * Author: Emmanuel
 */
const loginVendor = async (params) => {
    try {
        const { email, password } = params
        const vendor = await Vendor.findOne({ where: { email } })
        // if account exist, check if password match
        if (vendor && (await bcrypt.compare(password, vendor.password))) {
            const token = jwt.sign(
                { id: vendor.id, type: "vendor" },
                process.env.JWT_SECRET,
                {
                    expiresIn: process.env.TOKEN_VALIDATION_DURATION,
                },
            )
            return {
                code: 200,
                status: true,
                message: "Login successful",
                data: { token, id: vendor.id },
            }
        } else {
            return {
                code: 400,
                status: false,
                message: "Invalid credentials",
            }
        }
    } catch (error) {
        console.log(error)
        return {
            code: 500,
            status: false,
            message: "An error occurred during vendor login attempt",
        }
    }
}

module.exports = {
    registerCustomer,
    loginCustomer,
    loginVendor,
}
