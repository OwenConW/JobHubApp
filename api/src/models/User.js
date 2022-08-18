const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('User', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		last_Name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		image: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		mail: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		dni: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false
		},
		postal_code: {
			type: DataTypes.STRING,
			allowNull: false
		},
		phone: {
			type: DataTypes.INTEGER,

		},
		plan_premium: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			allowNull: false
		},
		country: {
			type: DataTypes.STRING,
			allowNull: false
		},
		city: {
			type: DataTypes.STRING,
			allowNull: false
		},
		coordinate: {
			type: DataTypes.ARRAY(DataTypes.STRING),
			allowNull: false
		},
		active: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},

	}, {
		timestamps: false
	});
};
