const Joi = require("joi")

module.exports = {
    listMenu: {
        vendorId: Joi.number().required(),
        page: Joi.number().allow(null),
        pageSize: Joi.number().allow(null),
    },
    createMenu: {
        vendorId: Joi.number().required(),
        name: Joi.string().required(),
        price: Joi.string().required(),
        description: Joi.string().allow(null),
    },
    updateMenu: {
        vendorId: Joi.number().required(),
        menuId: Joi.number().required(),
        name: Joi.string().allow(null),
        price: Joi.string().allow(null),
        description: Joi.string().allow(null),
    },
    getVendor: {
        vendorId: Joi.number().required(),
    },
    getMenu: {
        vendorId: Joi.number().required(),
        menuId: Joi.number().required(),
    },
}
