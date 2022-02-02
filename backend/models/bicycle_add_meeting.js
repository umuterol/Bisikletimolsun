'use strict';
const { identityBeforeUpdateHandler } = require('../helpers/model/identityHelper');
const {
    Model,
} = require('sequelize');
const db = require("./index.js")
module.exports = (sequelize, DataTypes) => {
    class bicycle_add_meeting extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            bicycle_add_meeting.belongsTo(models.identity, {
                foreignKey: {
                    name: 'tc',
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
            bicycle_add_meeting.belongsTo(models.bicycle_add_meeting_status_type, {
                foreignKey: {
                    name: 'status',
                    allowNull: false,
                    defaultValue: 'waiting',
                }
            })
        }
    };
    bicycle_add_meeting.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        bicycle_img: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'bicycle_add_meeting',
    });

    return bicycle_add_meeting;
};