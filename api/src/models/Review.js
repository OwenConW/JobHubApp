const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('review', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        id_user_client: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_user_professional: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_profession: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        feedback_client: {
            type: DataTypes.STRING,
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

    }, {
        timestamps: false
    });
};