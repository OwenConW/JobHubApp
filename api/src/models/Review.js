const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('review', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        id_orders: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        
        feedback_client: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rating: {
			type: DataTypes.FLOAT,
			validate: {
				min:0,
				max:5
			},
		},

    }, {
        timestamps: false
    });
};