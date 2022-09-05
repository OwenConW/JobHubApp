const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('claims', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        id_user_professional: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_user_client: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        feedback_claims: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date_created:{
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        isActive: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},

    }, {
        timestamps: false
    });
};