const sequelize = require('../config/database');
const User = require('./User');
const Portfolio = require('./Portfolio');
const Order = require('./Order');
const Material = require('./Material');
const Customer = require('./Customer');
const Transaction = require('./Transaction');

// Associations
Customer.hasMany(Order, { foreignKey: 'customer_id', as: 'orders' });
Order.belongsTo(Customer, { foreignKey: 'customer_id', as: 'customer' });

Order.hasMany(Transaction, { foreignKey: 'order_id', as: 'transactions' });
Transaction.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });

const db = {
  sequelize,
  User,
  Portfolio,
  Order,
  Material,
  Customer,
  Transaction,
};

module.exports = db;
