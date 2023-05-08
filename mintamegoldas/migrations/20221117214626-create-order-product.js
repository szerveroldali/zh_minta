"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("OrderProduct", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            OrderId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "Orders",
                    key: "id",
                },
                onDelete: "cascade",
            },
            ProductId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "Products",
                    key: "id",
                },
                onDelete: "cascade",
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });

        await queryInterface.addConstraint("OrderProduct", {
            fields: ["OrderId", "ProductId"],
            type: "unique",
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("OrderProduct");
    },
};
