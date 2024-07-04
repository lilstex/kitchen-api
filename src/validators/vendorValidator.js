const Joi = require("joi")

module.exports = {
    listMenu: {
        page: Joi.number().allow(null),
        pageSize: Joi.number().allow(null),
    },
    createMenu: {
        name: Joi.string().required(),
        price: Joi.string().required(),
        description: Joi.string().allow(null),
    },
    updateMenu: {
        name: Joi.string().allow(null),
        price: Joi.string().allow(null),
        description: Joi.string().allow(null),
    },
    empty: {},
}
