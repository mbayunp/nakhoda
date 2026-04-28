const { Customer, Order } = require('../models');
const { Op, fn, col } = require('sequelize');
const { success, error, paginated } = require('../utils/response');

exports.getAll = async (req, res) => {
  try {
    const { page = 1, limit = 50, search } = req.query;
    const where = {};
    if (search) where.name = { [Op.like]: `%${search}%` };
    const offset = (page - 1) * limit;
    const { count, rows } = await Customer.findAndCountAll({
      where, order: [['name', 'ASC']], limit: +limit, offset,
      attributes: {
        include: [[fn('COUNT', col('orders.id')), 'order_count']],
      },
      include: [{ model: Order, as: 'orders', attributes: [] }],
      group: ['Customer.id'],
      subQuery: false,
    });
    return paginated(res, rows, +page, +limit, count.length || count);
  } catch (e) { return error(res, e.message, 500); }
};

exports.getById = async (req, res) => {
  try {
    const c = await Customer.findByPk(req.params.id, {
      include: [{ model: Order, as: 'orders', order: [['createdAt','DESC']], limit: 20 }],
    });
    if (!c) return error(res, 'Pelanggan tidak ditemukan', 404);
    return success(res, c);
  } catch (e) { return error(res, e.message, 500); }
};

exports.create = async (req, res) => {
  try {
    const c = await Customer.create(req.body);
    return success(res, c, 'Pelanggan berhasil ditambahkan', 201);
  } catch (e) { return error(res, e.message, 500); }
};

exports.update = async (req, res) => {
  try {
    const c = await Customer.findByPk(req.params.id);
    if (!c) return error(res, 'Pelanggan tidak ditemukan', 404);
    await c.update(req.body);
    return success(res, c, 'Pelanggan berhasil diperbarui');
  } catch (e) { return error(res, e.message, 500); }
};

exports.delete = async (req, res) => {
  try {
    const c = await Customer.findByPk(req.params.id);
    if (!c) return error(res, 'Pelanggan tidak ditemukan', 404);
    await c.destroy();
    return success(res, null, 'Pelanggan berhasil dihapus');
  } catch (e) { return error(res, e.message, 500); }
};
