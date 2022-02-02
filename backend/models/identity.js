'use strict';
const { identityBeforeUpdateHandler } = require('../helpers/model/identityHelper');
const {
    Model,
} = require('sequelize');
const db = require("./index.js")
module.exports = (sequelize, DataTypes) => {
    class identity extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            identity.belongsTo(models.identity_status_type, {
                foreignKey: {
                    name: 'status',
                    allowNull: false,
                    defaultValue: 'unconfirmed',
                }
            })
        }
    };
    identity.init({
        tc: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
        },
        birth: DataTypes.DATEONLY,
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    }, {
        sequelize,
        modelName: 'identity',
        hooks: {
            afterCreate: async (identity) => {
                const { tc } = identity.dataValues;
                await sequelize.models.wallet.create({ tc })
            },
            beforeUpdate: identityBeforeUpdateHandler,
        }
    });

    return identity;
};