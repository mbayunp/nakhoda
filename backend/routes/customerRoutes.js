const router = require('express').Router();
const ctrl = require('../controllers/customerController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, ctrl.getAll);
router.get('/:id', protect, ctrl.getById);
router.post('/', protect, ctrl.create);
router.put('/:id', protect, ctrl.update);
router.delete('/:id', protect, ctrl.delete);

module.exports = router;
