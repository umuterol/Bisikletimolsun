'use strict';
const { walletAfterCreateHandler } = require("../helpers/model/walletTransactionsHelper");
const {
    Model,
    Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class wallet_transactions extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            wallet_transactions.belongsTo(models.wallet_transaction_type, {
                foreignKey: {
                    name: "transaction_type",
                    allowNull: false,
                }
            })

            wallet_transactions.belongsTo(models.identity, {
                foreignKey: {
                    name: "tc",
                    allowNull: false,
                },
            })
        }
    };
    wallet_transactions.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        transaction_amount: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('successful', 'unsuccessful', 'waiting', 'insufficient balance'),
            allowNull: false,
            defaultValue: 'waiting',
        }
    }, {
        sequelize,
        modelName: 'wallet_transactions',
        updatedAt: false,
        hooks: {
            afterCreate: async (wallet_transactions, options) => {
                await walletAfterCreateHandler(sequelize, wallet_transactions, options)
                await wallet_transactions.save()
            }
        }
    });
    return wallet_transactions;
};