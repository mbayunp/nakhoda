const router = require('express').Router();
const ctrl = require('../controllers/transactionController');
const { protect } = require('../middleware/authMiddleware');

router.get('/summary', protect, ctrl.summary);
router.get('/', protect, ctrl.getAll);
router.post('/', protect, ctrl.create);
router.put('/:id', protect, ctrl.update);
router.delete('/:id', protect, ctrl.delete);

module.exports = router;
