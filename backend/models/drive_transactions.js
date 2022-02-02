'use strict';
const { driveTransactionAfterCreateHandler } = require("../helpers/model/driveTransactionsHelper")
const {
    Model,
    Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class drive_transactions extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            drive_transactions.belongsTo(models.drive_transaction_type, {
                foreignKey: {
                    name: "transaction_type",
                    allowNull: false,
                },
            })
            drive_transactions.belongsTo(models.drive, {
                foreignKey: "drive_id",
            })
        }
    };
    drive_transactions.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('successful', 'unsuccessful', 'waiting'),
            allowNull: false,
            defaultValue: 'waiting',
        },
    }, {
        sequelize,
        modelName: 'drive_transactions',
        updatedAt: false,
        hooks: {
            afterCreate: async (drive_transactions, options) => {
                await driveTransactionAfterCreateHandler(sequelize, drive_transactions, options)
            }
        }
    });
    return drive_transactions;
};