const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Portfolio = sequelize.define('Portfolio', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Judul portfolio wajib diisi' },
      len: { args: [3, 200], msg: 'Judul harus 3-200 karakter' },
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING(500),
    allowNull: true,
  },
  category: {
    type: DataTypes.ENUM('Kemeja', 'Kaos', 'Jaket', 'Seragam', 'Merchandise', 'Lainnya'),
    allowNull: false,
    defaultValue: 'Lainnya',
    validate: {
      notEmpty: { msg: 'Kategori wajib diisi' },
    },
  },
  is_featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'portfolios',
});

module.exports = Portfolio;
