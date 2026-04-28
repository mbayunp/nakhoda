const { Material } = require('../models');
const { Op } = require('sequelize');
const { success, error, paginated } = require('../utils/response');

exports.getAll = async (req, res) => {
  try {
    const { page = 1, limit = 50, search, category } = req.query;
    const where = {};
    if (category) where.category = category;
    if (search) where.name = { [Op.like]: `%${search}%` };
    const offset = (page - 1) * limit;
    const { count, rows } = await Material.findAndCountAll({ where, order: [['name', 'ASC']], limit: +limit, offset });
    return paginated(res, rows, +page, +limit, count);
  } catch (e) { return error(res, e.message, 500); }
};

exports.getById = async (req, res) => {
  try {
    const m = await Material.findByPk(req.params.id);
    if (!m) return error(res, 'Material tidak ditemukan', 404);
    return success(res, m);
  } catch (e) { return error(res, e.message, 500); }
};

exports.create = async (req, res) => {
  try {
    const m = await Material.create(req.body);
    return success(res, m, 'Material berhasil ditambahkan', 201);
  } catch (e) { return error(res, e.message, 500); }
};

exports.update = async (req, res) => {
  try {
    const m = await Material.findByPk(req.params.id);
    if (!m) return error(res, 'Material tidak ditemukan', 404);
    await m.update(req.body);
    return success(res, m, 'Material berhasil diperbarui');
  } catch (e) { return error(res, e.message, 500); }
};

exports.adjustStock = async (req, res) => {
  try {
    const m = await Material.findByPk(req.params.id);
    if (!m) return error(res, 'Material tidak ditemukan', 404);
    const { adjustment, type } = req.body; // type: 'in' or 'out'
    const adj = +adjustment || 0;
    const newStock = type === 'in' ? +m.stock + adj : +m.stock - adj;
    if (newStock < 0) return error(res, 'Stok tidak mencukupi', 400);
    await m.update({ stock: newStock });
    return success(res, m, `Stok ${type === 'in' ? 'masuk' : 'keluar'} berhasil`);
  } catch (e) { return error(res, e.message, 500); }
};

exports.delete = async (req, res) => {
  try {
    const m = await Material.findByPk(req.params.id);
    if (!m) return error(res, 'Material tidak ditemukan', 404);
    await m.destroy();
    return success(res, null, 'Material berhasil dihapus');
  } catch (e) { return error(res, e.message, 500); }
};

exports.lowStock = async (req, res) => {
  try {
    const items = await Material.findAll({
      where: { stock: { [Op.lt]: require('sequelize').col('min_stock') } },
      order: [['stock', 'ASC']],
    });
    return success(res, items);
  } catch (e) { return error(res, e.message, 500); }
};
