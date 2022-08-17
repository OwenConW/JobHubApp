const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('orders', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
        },
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_profession: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        rating: {
			type: DataTypes.FLOAT,
			allowNull: false,
			validate: {
				min:0,
				max:5
			},
		},
        Feedback_client: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Feedback_professional: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    }, {
        timestamps: false
    });
};