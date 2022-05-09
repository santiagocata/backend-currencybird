const { Model, DataTypes } = require("sequelize");
const db = require("../db");

class User extends Model {
  invitationSuccess() {
    User.update(
      { invitations: this.invitations + 1, cash: this.cash + 5000 },
      {
        where: { id: this.id },
      }
    );
  }
}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    invitations: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    cash: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize: db, 
    modelName: "users", 
  }
);

module.exports = User;
