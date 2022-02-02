'use strict';
const { driveAfterFindHandler, driveAfterUpdateHandler } = require("../helpers/model/driveHelper");
const {
    Model,
    Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class drive extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            drive.belongsTo(models.identity, {
                foreignKey: "tc",
            })
            drive.belongsTo(models.bicycle, {
                foreignKey: "bicycle_id",
            })
            drive.belongsTo(models.drive_status_type, {
                foreignKey: {
                    name: 'status',
                    allowNull: false,
                    defaultValue: 'notactive',
                }
            })
            drive.belongsTo(models.wallet_transactions, {
                foreignKey: "wallet_transaction_id",
            })
        }
    };
    drive.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        pay: {
            type: DataTypes.DOUBLE,
            defaultValue: 0,
            allowNull: false,
        },
        start_time: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        start_lat: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        start_lng: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        finish_time: {
            type: DataTypes.DATE,
        },
        finish_lat: {
            type: DataTypes.STRING,
        },
        finish_lng: {
            type: DataTypes.STRING,
        },
        message: {
            type: DataTypes.STRING,
        },
        minute: DataTypes.STRING,
        map: DataTypes.TEXT,
    }, {
        sequelize,
        modelName: 'drive',
        createdAt: false,
        updatedAt: false,
        hooks: {
            afterFind: async (data) => {
                await driveAfterFindHandler(sequelize, data);
            },
            afterUpdate: async (drive) => {
                await driveAfterUpdateHandler(sequelize, drive);
            }
        },
    });
    return drive;
};