'use strict';
const {
    Model,
    Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class wallet extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            wallet.belongsTo(models.identity, {
                foreignKey: "tc",
                onDelete: 'cascade',
            })
        }
    };
    wallet.init({
        tc: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        balance: {
            type: DataTypes.DOUBLE,
            defaultValue: 0,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'wallet',
    });
    return wallet;
};