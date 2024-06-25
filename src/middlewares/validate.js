const Joi = require("joi")
const Response = require("../helper/response")

module.exports = (schemaObj) => {
    return async (req, res, next) => {
        // Define the Joi schema with the provided object, ensuring no unknown keys
        const schema = Joi.object().keys(schemaObj).required().unknown(false)

        // Determine the value to validate based on the request method
        const valueToValidate = req.method === "GET" ? req.query : req.body

        // Validate the request data against the schema
        const { error, value: validatedData } = schema.validate(valueToValidate)

        // If there is a validation error, send a validation error response
        if (error) {
            return Response(res, { status: false, message: error.message }, 422)
        }
        let userData

        if (req.user) {
            userData = {
                userType: req.user.type,
                userId: req.user.id,
            }
        }
        // Serializing both user data and validated schema to request data
        const requestData = {
            ...validatedData,
            ...userData,
        }

        req.form = requestData
        // Proceed to the next middleware function
        next()
    }
}
