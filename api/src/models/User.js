const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    LastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    DNI: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false
    },
    Mail: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
  }, {
    timestamps: false
  });
};
