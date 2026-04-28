const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');
const Portfolio = require('../models/Portfolio');
const { success, error, paginated } = require('../utils/response');

/**
 * GET /api/portfolios
 * Public — list all portfolios with optional filters and pagination.
 *
 * Query params:
 *   ?featured=true       — filter featured only
 *   ?category=Kemeja     — filter by category
 *   ?search=text         — search title/description
 *   ?page=1&limit=10     — pagination
 *   ?sort=latest|oldest  — sort order
 */
const getAll = async (req, res) => {
  try {
    const {
      featured,
      category,
      search,
      page = 1,
      limit = 10,
      sort = 'latest',
    } = req.query;

    // Build WHERE clause
    const where = {};
    if (featured === 'true') where.is_featured = true;
    if (category) where.category = category;
    if (search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
      ];
    }

    // Pagination
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 10));
    const offset = (pageNum - 1) * limitNum;

    // Sort
    const order = sort === 'oldest' ? [['created_at', 'ASC']] : [['created_at', 'DESC']];

    const { count, rows } = await Portfolio.findAndCountAll({
      where,
      order,
      limit: limitNum,
      offset,
    });

    return paginated(res, rows, pageNum, limitNum, count);
  } catch (err) {
    console.error('GetAll portfolios error:', err);
    return error(res, 'Terjadi kesalahan server.', 500);
  }
};

/**
 * GET /api/portfolios/:id
 * Public — get a single portfolio by ID.
 */
const getById = async (req, res) => {
  try {
    const portfolio = await Portfolio.findByPk(req.params.id);
    if (!portfolio) {
      return error(res, 'Portfolio tidak ditemukan.', 404);
    }
    return success(res, portfolio, 'Detail portfolio berhasil diambil.');
  } catch (err) {
    console.error('GetById portfolio error:', err);
    return error(res, 'Terjadi kesalahan server.', 500);
  }
};

/**
 * POST /api/portfolios
 * Admin — create a new portfolio (with optional image upload).
 */
const create = async (req, res) => {
  try {
    const { title, description, category, is_featured } = req.body;

    if (!title) {
      return error(res, 'Judul portfolio wajib diisi.', 400);
    }

    const portfolioData = {
      title,
      description: description || null,
      category: category || 'Lainnya',
      is_featured: is_featured === 'true' || is_featured === true,
      image: req.file ? req.file.filename : null,
    };

    const portfolio = await Portfolio.create(portfolioData);
    return success(res, portfolio, 'Portfolio berhasil dibuat.', 201);
  } catch (err) {
    // Clean up uploaded file on error
    if (req.file) {
      const filePath = path.join(__dirname, '..', 'uploads', req.file.filename);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    if (err.name === 'SequelizeValidationError') {
      const messages = err.errors.map((e) => e.message);
      return error(res, messages.join(', '), 400);
    }
    console.error('Create portfolio error:', err);
    return error(res, 'Terjadi kesalahan server.', 500);
  }
};

/**
 * PUT /api/portfolios/:id
 * Admin — update a portfolio (with optional new image).
 */
const update = async (req, res) => {
  try {
    const portfolio = await Portfolio.findByPk(req.params.id);
    if (!portfolio) {
      // Clean up uploaded file if portfolio not found
      if (req.file) {
        const filePath = path.join(__dirname, '..', 'uploads', req.file.filename);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }
      return error(res, 'Portfolio tidak ditemukan.', 404);
    }

    const { title, description, category, is_featured } = req.body;

    // Update fields
    if (title !== undefined) portfolio.title = title;
    if (description !== undefined) portfolio.description = description;
    if (category !== undefined) portfolio.category = category;
    if (is_featured !== undefined) portfolio.is_featured = is_featured === 'true' || is_featured === true;

    // Handle image replacement
    if (req.file) {
      // Delete old image
      if (portfolio.image) {
        const oldPath = path.join(__dirname, '..', 'uploads', portfolio.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      portfolio.image = req.file.filename;
    }

    await portfolio.save();
    return success(res, portfolio, 'Portfolio berhasil diupdate.');
  } catch (err) {
    if (req.file) {
      const filePath = path.join(__dirname, '..', 'uploads', req.file.filename);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    if (err.name === 'SequelizeValidationError') {
      const messages = err.errors.map((e) => e.message);
      return error(res, messages.join(', '), 400);
    }
    console.error('Update portfolio error:', err);
    return error(res, 'Terjadi kesalahan server.', 500);
  }
};

/**
 * DELETE /api/portfolios/:id
 * Admin — delete a portfolio and its image file.
 */
const remove = async (req, res) => {
  try {
    const portfolio = await Portfolio.findByPk(req.params.id);
    if (!portfolio) {
      return error(res, 'Portfolio tidak ditemukan.', 404);
    }

    // Delete image file
    if (portfolio.image) {
      const imagePath = path.join(__dirname, '..', 'uploads', portfolio.image);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await portfolio.destroy();
    return success(res, null, 'Portfolio berhasil dihapus.');
  } catch (err) {
    console.error('Delete portfolio error:', err);
    return error(res, 'Terjadi kesalahan server.', 500);
  }
};

module.exports = { getAll, getById, create, update, remove };
