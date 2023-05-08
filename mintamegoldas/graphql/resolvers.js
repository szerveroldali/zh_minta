const auth = require("./auth");
const db = require("../models");
const { Sequelize, sequelize } = db;
const { ValidationError, DatabaseError, Op } = Sequelize;
const { Product, Order, User } = db;

module.exports = {
    Query: {
        products: async () => await Product.findAll(),
        orders: async () => await Order.findAll(),
        priceBetween: async (_, { min, max }) =>
            await Product.findAll({
                where: {
                    [Op.and]: [
                        {
                            price: {
                                [Op.gte]: min,
                            },
                        },
                        {
                            price: {
                                [Op.lte]: max,
                            },
                        },
                    ],
                },
            }),
        statistics: async () => {
            return {
                registeredUsers: await User.count(),
                unshippedOrders: await Order.count({ where: { shipped: false } }),
                largeOrders: (await Order.findAll({ include: Product })).filter((o) => o.Products.length >= 5).length,
                mostExpensivePrice: (await Product.findOne({ order: [["price", "DESC"]] })).price,
                averagePrice: (await Product.findAll()).reduce((s, x) => s + x.price, 0) / (await Product.count()),
            };
        },
    },
    Mutation: {
        createProduct: async (_, { input }) => await Product.create(input),
        addProduct: async (_, { ProductId, OrderId }) => {
            const product = await Product.findByPk(ProductId);
            if (!product) return "INVALID PRODUCT";
            const order = await Order.findByPk(OrderId);
            if (!order) return "INVALID ORDER";
            if (await order.hasProduct(product)) return "ALREADY ADDED";
            else {
                await order.addProduct(product);
                return "SUCCESS";
            }
        },
    },
    Order: {
        user: async (order) => await order.getUser(),
        products: async (order) => await order.getProducts(),
        totalPrice: async (order) => (await order.getProducts()).reduce((s, x) => s + x.price, 0),
    },
};
