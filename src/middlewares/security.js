const jwt = require("jsonwebtoken")
const Response = require("../helper/response")

const nonRestricted = [
    "/api/v1/auth/register-customer",
    "/api/v1/auth/customer-login",
    "/api/v1/auth/vendor-login",
]

/**
 * Middleware to authenticate JWT token.
 *
 * @function authenticateJWT
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {function} next - The next middleware function.
 * @returns {void} Calls next middleware if authentication is successful, otherwise responds with an error message.
 * Author: Emmanuel
 */
const authenticateJWT = (req, res, next) => {
    if (nonRestricted.includes(req.path)) {
        next()
    } else {
        const token = req.header("Authorization")
        if (!token) {
            return Response(
                res,
                { status: false, message: "Access denied" },
                401,
            )
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decoded
            // Restrict access to vendor routes.
            const userType = req.user.type
            const path = req.path
            if (path.startsWith("/api/v1/vendor")) {
                if (userType !== "vendor") {
                    return Response(
                        res,
                        {
                            status: false,
                            message: "Forbidden access",
                        },
                        403,
                    )
                }
            }
            // Restrict access to vendor routes.
            if (path.startsWith("/api/v1/customer")) {
                if (userType !== "customer") {
                    return Response(
                        res,
                        {
                            status: false,
                            message: "Forbidden access",
                        },
                        403,
                    )
                }
            }
            next()
        } catch (err) {
            return Response(
                res,
                { status: false, message: "Invalid or expired token" },
                401,
            )
        }
    }
}

module.exports = authenticateJWT
