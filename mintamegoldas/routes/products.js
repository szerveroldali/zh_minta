const { StatusCodes } = require("http-status-codes");
const { Sequelize, sequelize, Product } = require("../models");
const { ValidationError, DatabaseError, Op } = Sequelize;

module.exports = function (fastify, opts, next) {
    fastify.get("/", async (request, reply) => {
        return reply.send(await Product.findAll());
    });

    fastify.get(
        "/:id",
        {
            schema: {
                params: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                    },
                },
            },
        },
        async (request, reply) => {
            const product = await Product.findByPk(request.params.id);
            if (!product) return reply.status(404).send({ message: "Product not found." });
            return reply.send(product);
        }
    );

    fastify.post(
        "/",
        {
            schema: {
                body: {
                    type: "object",
                    required: ["name", "price", "count"],
                    properties: {
                        name: { type: "string" },
                        description: { type: "string", nullable: true, default: null },
                        price: { type: "integer" },
                        count: { type: "integer" },
                    },
                },
            },
        },
        async (request, reply) => {
            const product = await Product.create(request.body);
            return reply.status(201).send(product);
        }
    );

    fastify.patch(
        "/:id",
        {
            schema: {
                params: {
                    type: "object",
                    properties: {
                        id: { type: "integer" },
                    },
                },
                body: {
                    type: "object",
                    properties: {
                        name: { type: "string" },
                        description: { type: "string", nullable: true },
                        price: { type: "integer" },
                        count: { type: "integer" },
                    },
                },
            },
        },
        async (request, reply) => {
            const product = await Product.findByPk(request.params.id);
            if (!product) return reply.status(404).send({ message: "Product not found." });
            await product.update(request.body);
            return reply.send(product);
        }
    );

    next();
};

module.exports.autoPrefix = "/products";
