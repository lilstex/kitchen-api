const swaggerJsDoc = require("swagger-jsdoc")
const port = process.env.PORT

const swagger = {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "KITCHEN API SERVICE",
            contact: { name: "Emmanuel Mbagwu" },
            servers: [{ url: `http://localhost:${port}` }],
        },
    },
    apis: ["./src/swaggerDocs/**/*.yml"],
}

module.exports = swaggerJsDoc(swagger)
