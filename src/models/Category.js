const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Category = sequelize.define('Category', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(100), unique: true, allowNull: false },
  background_image: { type: DataTypes.STRING, allowNull: true }
});

module.exports = Category;
