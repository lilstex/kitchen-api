const Joi = require("joi")

module.exports = {
    listMenu: {
        page: Joi.number(),
        pageSize: Joi.number(),
    },
    createMenu: {
        name: Joi.string().required(),
        price: Joi.number().required(),
        description: Joi.string().allow(null),
    },
    updateMenu: {
        name: Joi.string().allow(null),
        price: Joi.number().allow(null),
        description: Joi.string().allow(null),
    },
    empty: {},
}
