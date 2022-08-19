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
		description: {
            type: DataTypes.STRING,
            allowNull: true
        },
		image: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		date_of_Birth:{
            type: DataTypes.STRING,
            allownull: false
        },
		mail: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
			validate: {
                isEmail: {
					msg: "El email tiene que ser un correo valido"
                }
            }
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
		rating: {
			type: DataTypes.FLOAT,
			allowNull: false,
			defaultValue: -1,
			validate: {
				min:-1,
				max:5
			},
		},
		isProfessional: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			allowNull: false
		},

	}, {
		timestamps: false
	});
};
