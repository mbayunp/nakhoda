const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Material = sequelize.define('Material', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  sku: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  name: { type: DataTypes.STRING(200), allowNull: false, validate: { notEmpty: { msg: 'Nama material wajib diisi' } } },
  category: { type: DataTypes.ENUM('Kain','Aksesoris','Benang','Packaging','Lainnya'), defaultValue: 'Lainnya' },
  stock: { type: DataTypes.DECIMAL(10,2), defaultValue: 0 },
  min_stock: { type: DataTypes.DECIMAL(10,2), defaultValue: 0 },
  unit: { type: DataTypes.STRING(20), defaultValue: 'pcs' },
  supplier_name: { type: DataTypes.STRING(200), allowNull: true },
  supplier_contact: { type: DataTypes.STRING(100), allowNull: true },
  supplier_notes: { type: DataTypes.TEXT, allowNull: true },
}, { tableName: 'materials' });

module.exports = Material;
