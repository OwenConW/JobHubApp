const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('message', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        conversationId:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        sender: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        }
        }, {
        timestamps: false
    });
};