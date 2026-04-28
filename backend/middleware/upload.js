const multer = require('multer');
const path = require('path');
const { error } = require('../utils/response');

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `portfolio-${uniqueSuffix}${ext}`);
  },
});

// File filter — only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Hanya file JPG, JPEG, PNG, dan WEBP yang diizinkan.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
  },
});

/**
 * Middleware wrapper that catches Multer errors and returns a clean JSON response.
 */
const uploadSingle = (fieldName) => {
  return (req, res, next) => {
    const uploadHandler = upload.single(fieldName);
    uploadHandler(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return error(res, 'Ukuran file maksimal 5MB.', 400);
        }
        return error(res, err.message, 400);
      }
      if (err) {
        return error(res, err.message, 400);
      }
      next();
    });
  };
};

module.exports = { upload, uploadSingle };
