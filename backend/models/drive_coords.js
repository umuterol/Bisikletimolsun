'use strict';
const {
    Model,
    Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class drive_coords extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            drive_coords.belongsTo(models.drive, {
                foreignKey: {
                    name: "drive_id",
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
            drive_coords.belongsTo(models.bicycle, {
                foreignKey: {
                    name: "bicycle_id",
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
        }
    };
    drive_coords.init({
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
        modelName: 'drive_coords',
        updatedAt: false,
    });
    return drive_coords;
};