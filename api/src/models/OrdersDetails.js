const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('orders_details', {
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
        id_user_client: {
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

        }, {
        timestamps: false
    });
};