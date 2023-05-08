"use strict";

// Faker dokumentáció, API referencia: https://fakerjs.dev/guide/#node-js
const { faker } = require("@faker-js/faker");
const chalk = require("chalk");
const { ForeignKeyConstraintError } = require("sequelize");
const { Product, User, Order } = require("../models");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {
            const productCount = faker.datatype.number({ min: 10, max: 30 });
            const products = [];
            for (let i = 0; i < productCount; i++) {
                products.push(
                    await Product.create({
                        name: faker.commerce.productName(),
                        description: faker.datatype.boolean() ? faker.commerce.productDescription() : null,
                        price: faker.datatype.number({ min: 1000, max: 100000 }),
                        count: faker.datatype.number({ min: 1, max: 100 }),
                    })
                );
            }

            const userCount = faker.datatype.number({ min: 5, max: 10 });
            const users = [];
            for (let i = 0; i < userCount; i++) {
                users.push(
                    await User.create({
                        email: faker.helpers.unique(faker.internet.email),
                        isWorker: faker.datatype.boolean(),
                    })
                );
            }

            const orderCount = faker.datatype.number({ min: 5, max: 10 });
            for (let i = 0; i < orderCount; i++) {
                const order = await Order.create({
                    address: faker.address.streetAddress(true),
                    UserId: faker.helpers.arrayElement(users).id,
                    shipped: faker.datatype.boolean(),
                });
                await order.setProducts(faker.helpers.arrayElements(products));
            }

            console.log(chalk.green("A DatabaseSeeder lefutott"));
        } catch (e) {
            // Ha a seederben valamilyen hiba van, akkor alapértelmezés szerint elég szegényesen írja
            // ki azokat a rendszer a seeder futtatásakor. Ezért ez Neked egy segítség, hogy láthasd a
            // hiba részletes kiírását.
            // Így ha valamit elrontasz a seederben, azt könnyebben tudod debug-olni.
            console.log(chalk.red("A DatabaseSeeder nem futott le teljesen, mivel az alábbi hiba történt:"));
            console.log(chalk.gray(e));
        }
    },

    // Erre alapvetően nincs szükséged, mivel a parancsok úgy vannak felépítve,
    // hogy tiszta adatbázist generálnak, vagyis a korábbi adatok enélkül is elvesznek
    down: async (queryInterface, Sequelize) => {},
};
