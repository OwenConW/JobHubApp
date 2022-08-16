const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('client', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
        },

        activo: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false
        },
        }, {
        timestamps: false
    });
};