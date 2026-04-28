const router = require('express').Router();
const { getAll, getById, create, update, remove } = require('../controllers/portfolioController');
const { protect } = require('../middleware/authMiddleware');
const { uploadSingle } = require('../middleware/upload');

// Public routes
router.get('/', getAll);
router.get('/:id', getById);

// Admin protected routes
router.post('/', protect, uploadSingle('image'), create);
router.put('/:id', protect, uploadSingle('image'), update);
router.delete('/:id', protect, remove);

module.exports = router;
