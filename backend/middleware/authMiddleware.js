const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { error } = require('../utils/response');

/**
 * Protect routes — verifies JWT from Authorization header.
 * Attaches full user object (minus password) to req.user.
 */
const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return error(res, 'Akses ditolak. Token tidak ditemukan.', 401);
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user and attach to request
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return error(res, 'User tidak ditemukan.', 401);
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return error(res, 'Token tidak valid.', 401);
    }
    if (err.name === 'TokenExpiredError') {
      return error(res, 'Token sudah kedaluwarsa.', 401);
    }
    return error(res, 'Gagal autentikasi.', 500);
  }
};

/**
 * Restrict to specific roles.
 * Usage: restrictTo('admin')
 */
const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return error(res, 'Anda tidak memiliki izin untuk aksi ini.', 403);
    }
    next();
  };
};

module.exports = { protect, restrictTo };
