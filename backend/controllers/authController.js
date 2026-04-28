const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { success, error } = require('../utils/response');

/**
 * Generate JWT token for a user.
 */
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

/**
 * POST /api/auth/register
 * Register a new admin user.
 */
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return error(res, 'Semua field wajib diisi (name, email, password).', 400);
    }

    // Check if email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return error(res, 'Email sudah terdaftar.', 409);
    }

    // Create user (password hashed by model hook)
    const user = await User.create({ name, email, password, role: 'admin' });
    const token = generateToken(user);

    return success(res, {
      user: user.toJSON(),
      token,
    }, 'Registrasi berhasil.', 201);
  } catch (err) {
    // Handle Sequelize validation errors
    if (err.name === 'SequelizeValidationError') {
      const messages = err.errors.map((e) => e.message);
      return error(res, messages.join(', '), 400);
    }
    console.error('Register error:', err);
    return error(res, 'Terjadi kesalahan server.', 500);
  }
};

/**
 * POST /api/auth/login
 * Authenticate admin and return JWT.
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return error(res, 'Email dan password wajib diisi.', 400);
    }

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return error(res, 'Email atau password salah.', 401);
    }

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return error(res, 'Email atau password salah.', 401);
    }

    const token = generateToken(user);

    return success(res, {
      user: user.toJSON(),
      token,
    }, 'Login berhasil.');
  } catch (err) {
    console.error('Login error:', err);
    return error(res, 'Terjadi kesalahan server.', 500);
  }
};

/**
 * GET /api/auth/me
 * Get current authenticated user profile.
 */
const getMe = async (req, res) => {
  try {
    return success(res, { user: req.user.toJSON() }, 'Data user berhasil diambil.');
  } catch (err) {
    console.error('GetMe error:', err);
    return error(res, 'Terjadi kesalahan server.', 500);
  }
};

module.exports = { register, login, getMe };
