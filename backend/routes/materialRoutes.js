const router = require('express').Router();
const ctrl = require('../controllers/materialController');
const { protect } = require('../middleware/authMiddleware');

router.get('/low-stock', protect, ctrl.lowStock);
router.get('/', protect, ctrl.getAll);
router.get('/:id', protect, ctrl.getById);
router.post('/', protect, ctrl.create);
router.put('/:id', protect, ctrl.update);
router.put('/:id/stock', protect, ctrl.adjustStock);
router.delete('/:id', protect, ctrl.delete);

module.exports = router;
