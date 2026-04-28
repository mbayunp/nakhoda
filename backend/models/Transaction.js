const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Transaction = sequelize.define('Transaction', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  order_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
  type: { type: DataTypes.ENUM('income','expense'), allowNull: false },
  amount: { type: DataTypes.DECIMAL(15,2), allowNull: false, defaultValue: 0 },
  method: { type: DataTypes.STRING(50), allowNull: true, comment: 'transfer, cash, etc' },
  description: { type: DataTypes.STRING(500), allowNull: true },
  date: { type: DataTypes.DATEONLY, allowNull: false, defaultValue: DataTypes.NOW },
}, { tableName: 'transactions' });

module.exports = Transaction;
