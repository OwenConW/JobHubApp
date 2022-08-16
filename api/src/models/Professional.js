const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('professional', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
        },
        name_job: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        plan_premium: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
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