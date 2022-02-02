'use strict';
const { identityBeforeUpdateHandler } = require('../helpers/model/identityHelper');
const {
    Model,
} = require('sequelize');
const db = require("./index.js")
module.exports = (sequelize, DataTypes) => {
    class bicycle_add_meeting_status_type extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    bicycle_add_meeting_status_type.init({
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'bicycle_add_meeting_status_type',
        timestamps: false,
    });

    return bicycle_add_meeting_status_type;
};