const { Model, DataTypes } = require("sequelize");
const db = require("../db");

class Token extends Model {}

Token.init(
  {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db, 
    modelName: "tokens", 
  }
);

module.exports = Token;
