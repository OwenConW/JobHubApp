const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('professional', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        name_job: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
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