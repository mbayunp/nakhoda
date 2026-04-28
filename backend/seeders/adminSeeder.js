/**
 * Admin Seeder — creates default admin account if none exists.
 * Run with: npm run seed
 */
require('dotenv').config();
const sequelize = require('../config/database');
const User = require('../models/User');

const seedAdmin = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected.');

    await sequelize.sync();
    console.log('✅ Tables synced.');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ where: { role: 'admin' } });
    if (existingAdmin) {
      console.log(`ℹ️  Admin already exists: ${existingAdmin.email}`);
      process.exit(0);
    }

    // Create default admin
    const admin = await User.create({
      name: 'Admin Nakhoda',
      email: 'admin@nakhodanusantara.com',
      password: 'admin123',
      role: 'admin',
    });

    console.log('✅ Default admin created:');
    console.log(`   Email:    ${admin.email}`);
    console.log(`   Password: admin123`);
    console.log(`   ⚠️  CHANGE THIS PASSWORD IMMEDIATELY IN PRODUCTION!`);

    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  }
};

seedAdmin();
