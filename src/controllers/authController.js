const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { Customer, Vendor } = require("../models")
const Response = require("../helper/response")

/**
 * Register a new customer.
 *
 * @async
 * @function register
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<{ status: boolean, message: string, data?: {id, email, createdAt, updatedAt} }>} Contains status and message
 * Author: Emmanuel
 */
const register = async (req, res) => {
    try {
        const { email, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 12)
        const customer = await Customer.create({
            email,
            password: hashedPassword,
        })
        return Response(
            res,
            {
                status: true,
                message: "Account registered successfully",
                data: {
                    id: customer.id,
                    email: customer.email,
                    createdAt: customer.createdAt,
                    updatedAt: customer.updatedAt,
                },
            },
            201,
        )
    } catch (error) {
        console.log(error)
        return Response(
            res,
            {
                status: false,
                message: "An error occurred",
            },
            500,
        )
    }
}

/**
 * Login a customer and generate a JWT token.
 *
 * @async
 * @function customerLogin
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<{ status: boolean, message: string, data?: token }>} Contains status and message
 * Author: Emmanuel
 */
const customerLogin = async (req, res) => {
    try {
        const { email, password } = req.body
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
            return Response(
                res,
                {
                    status: true,
                    message: "Login successful",
                    data: { token },
                },
                200,
            )
        } else {
            return Response(
                res,
                {
                    status: false,
                    message: "Invalid credentials",
                },
                400,
            )
        }
    } catch (error) {
        console.log(error)
        return Response(
            res,
            {
                status: false,
                message: "An error occurred",
            },
            500,
        )
    }
}

/**
 * Login a vendor and generate a JWT token.
 *
 * @async
 * @function vendorLogin
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<{ status: boolean, message: string, data?: token }>} Contains status and message
 * Author: Emmanuel
 */
const vendorLogin = async (req, res) => {
    try {
        const { email, password } = req.body
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
            return Response(
                res,
                {
                    status: true,
                    message: "Login successful",
                    data: { token },
                },
                200,
            )
        } else {
            // return Response(
            //     res,
            //     {
            //         status: false,
            //         message: "Invalid credentials",
            //     },
            //     400,
            // )
        }
    } catch (error) {
        console.log(error)
        return Response(
            res,
            {
                status: false,
                message: "An error occurred during login attempt",
            },
            500,
        )
    }
}

module.exports = {
    register,
    customerLogin,
    vendorLogin,
}
