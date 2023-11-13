// models/User.js
const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Product = require("./Product");

const User = sequelize.define("User", {
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
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deliveryAddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasMany(Product, { as: "favoriteItems" });
User.hasMany(Product, { as: "shoppingCart" });
User.hasMany(Product, { as: "boughtItems" });

module.exports = User;
