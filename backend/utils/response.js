/**
 * Standardized API response helpers.
 * Every controller returns consistent JSON shape.
 */

const success = (res, data = null, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json({ success: true, message, data });
};

const error = (res, message = 'Error', statusCode = 400, errors = null) => {
  const response = { success: false, message };
  if (errors) response.errors = errors;
  return res.status(statusCode).json(response);
};

const paginated = (res, data, page, limit, total) => {
  return res.status(200).json({
    success: true,
    message: 'Data berhasil diambil.',
    data,
    pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
  });
};

module.exports = { success, error, paginated };
