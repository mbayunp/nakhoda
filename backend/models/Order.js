const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  client_name: { type: DataTypes.STRING(200), allowNull: false, validate: { notEmpty: { msg: 'Nama klien wajib diisi' } } },
  product: { type: DataTypes.STRING(200), allowNull: false },
  qty: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  sizes: { type: DataTypes.JSON, allowNull: true, comment: '{ S:10, M:20, L:15, XL:5 }' },
  deadline: { type: DataTypes.DATEONLY, allowNull: true },
  status: {
    type: DataTypes.ENUM('pending','cutting','sewing','decorating','finishing','delivered','cancelled'),
    defaultValue: 'pending',
  },
  payment_status: { type: DataTypes.ENUM('belum','dp','lunas'), defaultValue: 'belum' },
  design_file: { type: DataTypes.STRING(500), allowNull: true },
  material_cost: { type: DataTypes.DECIMAL(15,2), defaultValue: 0 },
  sewing_cost: { type: DataTypes.DECIMAL(15,2), defaultValue: 0 },
  printing_cost: { type: DataTypes.DECIMAL(15,2), defaultValue: 0 },
  overhead: { type: DataTypes.DECIMAL(15,2), defaultValue: 0 },
  margin: { type: DataTypes.DECIMAL(5,2), defaultValue: 20 },
  total: { type: DataTypes.DECIMAL(15,2), defaultValue: 0 },
  notes: { type: DataTypes.TEXT, allowNull: true },
  customer_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
}, { tableName: 'orders' });

module.exports = Order;
