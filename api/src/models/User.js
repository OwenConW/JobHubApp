const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('user', {
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
		dni: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false
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

		phone: {
			type: DataTypes.STRING,
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
		street: {
			type: DataTypes.STRING,
			allowNull: false
		},
		address: {
			type: DataTypes.STRING,
			allowNull: false
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
		isPremium: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			allowNull: false
		},
		preapproval_id:{
            type: DataTypes.STRING,
        },
        payment_date:{
            type: DataTypes.STRING,
        },
        expiration_date:{
			type: DataTypes.STRING,
        },
		isProfessional: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			allowNull: false
		},
		photo_gallery: {
			type: DataTypes.JSONB
		},
		isAdmin: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			allowNull: false
		},
		isBanned: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			allowNull: false
		},

		isActive: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},

	}, {
		timestamps: false
	});
};
