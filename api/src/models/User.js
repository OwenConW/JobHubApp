const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    dni: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false
    },
    mail: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true
    },
    province: {
      type: DataTypes.STRING,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true
    },
    coordinate: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },

  }, {
    timestamps: false
  });
};
