const router = require('express').Router();
const ctrl = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/upload');

router.get('/summary', protect, ctrl.summary);
router.get('/', protect, ctrl.getAll);
router.get('/:id', protect, ctrl.getById);
router.post('/', protect, upload.single('design_file'), ctrl.create);
router.put('/:id', protect, upload.single('design_file'), ctrl.update);
router.put('/:id/status', protect, ctrl.updateStatus);
router.delete('/:id', protect, ctrl.delete);

module.exports = router;
