const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('conversation', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        emisor_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        receptor_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
        }, {
        timestamps: false
    });
};