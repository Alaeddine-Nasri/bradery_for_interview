const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Product = sequelize.define(
  "Product",
  {
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
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    images: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    colors: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    timestamps: true, // Add this line to include timestamps
  }
);

module.exports = Product;
