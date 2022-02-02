'use strict';
const { bicycleCoordsBeforeUpdateHelper } = require("../helpers/model/bicycleCoordsHelper")
const {
    Model,
    Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class bicycle_coords extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            bicycle_coords.belongsTo(models.bicycle, {
                foreignKey: "bicycle_id",
                onDelete: 'cascade',
            })
        }
    };
    bicycle_coords.init({
        bicycle_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        lat: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lng: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'bicycle_coords',
        createdAt: false,
        hooks: {
            beforeUpdate: async (bicycle_coords) => {
                await bicycleCoordsBeforeUpdateHelper(sequelize, bicycle_coords);
            }
        }
    });
    return bicycle_coords;
};