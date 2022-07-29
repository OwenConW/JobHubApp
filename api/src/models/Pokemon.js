const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    key: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    id:{
      type: DataTypes.VIRTUAL,
      get(){
        return this.key + 40 
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    hp: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 100
      }
    },
    attack: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 300
      }
    },
    defense: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 300
      }
    },
    speed: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 200
      }
    },
    height: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 100
      }
    },
    weight: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 300
      }
    },
    image: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false
  });
};
