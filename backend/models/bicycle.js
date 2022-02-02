'use strict';
const {
    Model, Op,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class bicycle extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            bicycle.belongsTo(models.identity, {
                foreignKey: {
                    name: 'owner',
                    allowNull: false,
                },
            })
            bicycle.belongsTo(models.bicycle_status_type, {
                foreignKey: {
                    name: 'status',
                    allowNull: false,
                    defaultValue: 'parked',
                },
            })
        }
    };
    bicycle.init({
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        total_earn: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0,
        },
        user_earn: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0,
        },
        withdraw: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0,
        },
        img: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'bicycle',
    });
    return bicycle;
};