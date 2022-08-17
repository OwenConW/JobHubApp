const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('admin', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    }, {
        timestamps: false
    });
};