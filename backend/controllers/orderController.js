const { Order, Customer, Transaction } = require('../models');
const { Op, fn, col, literal } = require('sequelize');
const { success, error, paginated } = require('../utils/response');

exports.getAll = async (req, res) => {
  try {
    const { page = 1, limit = 20, status, payment, search } = req.query;
    const where = {};
    if (status) where.status = status;
    if (payment) where.payment_status = payment;
    if (search) where[Op.or] = [
      { client_name: { [Op.like]: `%${search}%` } },
      { product: { [Op.like]: `%${search}%` } },
    ];
    const offset = (page - 1) * limit;
    const { count, rows } = await Order.findAndCountAll({
      where, order: [['createdAt', 'DESC']], limit: +limit, offset,
      include: [{ model: Customer, as: 'customer', attributes: ['id','name','contact'] }],
    });
    return paginated(res, rows, +page, +limit, count);
  } catch (e) { return error(res, e.message, 500); }
};

exports.getById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [
        { model: Customer, as: 'customer' },
        { model: Transaction, as: 'transactions' },
      ],
    });
    if (!order) return error(res, 'Pesanan tidak ditemukan', 404);
    return success(res, order);
  } catch (e) { return error(res, e.message, 500); }
};

exports.create = async (req, res) => {
  try {
    const { client_name, product, qty, sizes, deadline, status, payment_status,
      material_cost, sewing_cost, printing_cost, overhead, margin, notes, customer_id } = req.body;
    const mc = +material_cost || 0, sc = +sewing_cost || 0, pc = +printing_cost || 0, oh = +overhead || 0, mg = +margin || 20;
    const hpp = (mc * (+qty || 0)) + sc + pc + oh;
    const total = hpp * (1 + mg / 100);
    const order = await Order.create({
      client_name, product, qty, sizes, deadline, status, payment_status,
      material_cost: mc, sewing_cost: sc, printing_cost: pc, overhead: oh, margin: mg, total, notes, customer_id,
      design_file: req.file ? req.file.filename : null,
    });
    return success(res, order, 'Pesanan berhasil dibuat', 201);
  } catch (e) { return error(res, e.message, 500); }
};

exports.update = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return error(res, 'Pesanan tidak ditemukan', 404);
    const data = { ...req.body };
    if (req.file) data.design_file = req.file.filename;
    const mc = +data.material_cost || +order.material_cost, sc = +data.sewing_cost || +order.sewing_cost;
    const pc = +data.printing_cost || +order.printing_cost, oh = +data.overhead || +order.overhead;
    const mg = +data.margin || +order.margin, q = +data.qty || +order.qty;
    const hpp = (mc * q) + sc + pc + oh;
    data.total = hpp * (1 + mg / 100);
    await order.update(data);
    return success(res, order, 'Pesanan berhasil diperbarui');
  } catch (e) { return error(res, e.message, 500); }
};

exports.updateStatus = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return error(res, 'Pesanan tidak ditemukan', 404);
    const { status } = req.body;
    await order.update({ status });
    return success(res, order, `Status diubah ke ${status}`);
  } catch (e) { return error(res, e.message, 500); }
};

exports.delete = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return error(res, 'Pesanan tidak ditemukan', 404);
    await order.destroy();
    return success(res, null, 'Pesanan berhasil dihapus');
  } catch (e) { return error(res, e.message, 500); }
};

exports.summary = async (req, res) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const sevenDays = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    const activeOrders = await Order.count({ where: { status: { [Op.notIn]: ['delivered','cancelled'] } } });
    const monthRevenue = await Order.sum('total', { where: { createdAt: { [Op.gte]: startOfMonth }, payment_status: { [Op.ne]: 'belum' } } }) || 0;
    const nearDeadline = await Order.count({ where: { deadline: { [Op.between]: [now, sevenDays] }, status: { [Op.notIn]: ['delivered','cancelled'] } } });
    const delivered = await Order.count({ where: { status: 'delivered' } });

    const statusCounts = await Order.findAll({
      attributes: ['status', [fn('COUNT', col('id')), 'count']],
      where: { status: { [Op.notIn]: ['delivered','cancelled'] } },
      group: ['status'], raw: true,
    });

    const latestOrders = await Order.findAll({
      order: [['createdAt', 'DESC']], limit: 10,
      include: [{ model: Customer, as: 'customer', attributes: ['name'] }],
    });

    return success(res, { activeOrders, monthRevenue, nearDeadline, delivered, statusCounts, latestOrders });
  } catch (e) { return error(res, e.message, 500); }
};
