const { Transaction, Order } = require('../models');
const { Op, fn, col } = require('sequelize');
const { success, error, paginated } = require('../utils/response');

exports.getAll = async (req, res) => {
  try {
    const { page = 1, limit = 50, type, search } = req.query;
    const where = {};
    if (type) where.type = type;
    if (search) where.description = { [Op.like]: `%${search}%` };
    const offset = (page - 1) * limit;
    const { count, rows } = await Transaction.findAndCountAll({
      where, order: [['date','DESC'],['createdAt','DESC']], limit: +limit, offset,
      include: [{ model: Order, as: 'order', attributes: ['id','client_name','product'] }],
    });
    return paginated(res, rows, +page, +limit, count);
  } catch (e) { return error(res, e.message, 500); }
};

exports.create = async (req, res) => {
  try {
    const t = await Transaction.create(req.body);
    return success(res, t, 'Transaksi berhasil dicatat', 201);
  } catch (e) { return error(res, e.message, 500); }
};

exports.update = async (req, res) => {
  try {
    const t = await Transaction.findByPk(req.params.id);
    if (!t) return error(res, 'Transaksi tidak ditemukan', 404);
    await t.update(req.body);
    return success(res, t, 'Transaksi berhasil diperbarui');
  } catch (e) { return error(res, e.message, 500); }
};

exports.delete = async (req, res) => {
  try {
    const t = await Transaction.findByPk(req.params.id);
    if (!t) return error(res, 'Transaksi tidak ditemukan', 404);
    await t.destroy();
    return success(res, null, 'Transaksi berhasil dihapus');
  } catch (e) { return error(res, e.message, 500); }
};

exports.summary = async (req, res) => {
  try {
    const totalIncome = await Transaction.sum('amount', { where: { type: 'income' } }) || 0;
    const totalExpense = await Transaction.sum('amount', { where: { type: 'expense' } }) || 0;

    const monthly = await Transaction.findAll({
      attributes: [
        [fn('DATE_FORMAT', col('date'), '%Y-%m'), 'month'],
        'type',
        [fn('SUM', col('amount')), 'total'],
      ],
      group: [fn('DATE_FORMAT', col('date'), '%Y-%m'), 'type'],
      order: [[fn('DATE_FORMAT', col('date'), '%Y-%m'), 'ASC']],
      raw: true,
    });

    return success(res, { totalIncome, totalExpense, profit: totalIncome - totalExpense, monthly });
  } catch (e) { return error(res, e.message, 500); }
};
