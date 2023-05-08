const { StatusCodes } = require("http-status-codes");
const { Sequelize, sequelize, User, Order, Product } = require("../models");
const { ValidationError, DatabaseError, Op } = Sequelize;

module.exports = function (fastify, opts, next) {
    fastify.post(
        "/login",
        {
            schema: {
                body: {
                    type: "object",
                    required: ["email"],
                    properties: {
                        email: { type: "string" },
                    },
                },
            },
        },
        async (request, reply) => {
            const { email } = request.body;
            const user = await User.findOne({ where: { email } });
            if (!user) return reply.status(404).send({ message: "User not found." });
            const token = fastify.jwt.sign(user.toJSON());
            return reply.send({ token });
        }
    );

    fastify.get("/my-orders", { onRequest: [fastify.auth] }, async (request, reply) => {
        const user = await User.findOne({ where: { email: request.user.email } });
        return reply.send(await user.getOrders());
    });

    fastify.post(
        "/my-orders",
        {
            onRequest: [fastify.auth],
            schema: {
                body: {
                    type: "object",
                    required: ["address", "products"],
                    properties: {
                        address: { type: "string" },
                        products: { type: "array" },
                    },
                },
            },
        },
        async (request, reply) => {
            const user = await User.findOne({ where: { email: request.user.email } });
            const order = await Order.create({
                shipped: false,
                address: request.body.address,
                UserId: user.id,
            });
            const invalidProducts = [];
            const orderedProducts = [];
            for (const id of request.body.products) {
                const product = await Product.findByPk(id);
                if (!product) invalidProducts.push(id);
                else orderedProducts.push(id);
            }
            await order.addProducts(orderedProducts);
            return reply.status(201).send({ ...order.toJSON(), invalidProducts, orderedProducts });
        }
    );

    fastify.post(
        "/ship-orders",
        {
            onRequest: [fastify.auth],
            schema: {
                body: {
                    type: "object",
                    required: ["orders"],
                    properties: {
                        orders: { type: "array" },
                    },
                },
            },
        },
        async (request, reply) => {
            const user = await User.findOne({ where: { email: request.user.email } });
            if (!user.isWorker) return reply.status(403).send({ message: "User is not a worker." });
            const invalidOrder = [];
            const alreadyShipped = [];
            const justShipped = [];
            for (const id of request.body.orders) {
                const order = await Order.findByPk(id);
                if (!order) invalidOrder.push(id);
                else if (order.shipped) alreadyShipped.push(id);
                else {
                    await order.update({ shipped: true });
                    justShipped.push(id);
                }
            }
            return reply.send({ invalidOrder, alreadyShipped, justShipped });
        }
    );
    next();
};

module.exports.autoPrefix = "/";
