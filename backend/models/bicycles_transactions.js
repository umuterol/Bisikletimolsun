'use strict';
const { bicyclesTransactionsBeforeCreateHelper } = require("../helpers/model/bicyclesTransactionsHelper");
const {
    Model, Op,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class bicycles_transactions extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            bicycles_transactions.belongsTo(models.bicycle, {
                foreignKey: {
                    name: 'bicycle_id',
                    allowNull: false,
                },
            })
            bicycles_transactions.belongsTo(models.bicycles_transaction_type, {
                foreignKey: {
                    name: 'transaction_type',
                    allowNull: false,
                },
            })
            bicycles_transactions.belongsTo(models.drive, {
                foreignKey: 'drive_id'
            })
            bicycles_transactions.belongsTo(models.wallet_transactions, {
                foreignKey: {
                    name: 'wallet_transaction_id',
                    allowNull: false,
                }
            })
        }
    };
    bicycles_transactions.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        transaction_amount: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('successful', 'unsuccessful', 'waiting'),
            allowNull: false,
            defaultValue: 'waiting',
        }
    }, {
        sequelize,
        modelName: 'bicycles_transactions',
        updatedAt: false,
        hooks: {
            beforeCreate: async (bicycles_transactions, options) => {
                await bicyclesTransactionsBeforeCreateHelper(sequelize, bicycles_transactions, options)
            }
        }
    });
    return bicycles_transactions;
};