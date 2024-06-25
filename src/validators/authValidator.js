const Joi = require("joi")

module.exports = {
    register: {
        password: Joi.string().required(),
        email: Joi.string().email().required(),
    },
    login: {
        password: Joi.string().required(),
        email: Joi.string().email().required(),
    },
}
