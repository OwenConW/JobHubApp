const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('orders', {
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
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        complete: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
        id_user_client: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        allowReview: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        date_created:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        apointment_date:{
            type: DataTypes.STRING,
        },
        isActive: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
        

        }, {
        timestamps: false
    });
};