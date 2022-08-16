const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('orders', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        id_cliente: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_professional: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        date:{
            type: DataTypes.DATE,
            allowNull: false,
        }

    }, {
        timestamps: false
    });
};