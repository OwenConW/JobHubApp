const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('profession', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        isActive: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},

    }, {
        timestamps: false
    });
};