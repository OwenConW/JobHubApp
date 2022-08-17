const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('profession', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,

        },

    }, {
        timestamps: false
    });
};