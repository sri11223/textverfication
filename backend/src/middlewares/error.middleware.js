const errorHandler = (err, _req, res, _next) => {
  const status = err.statusCode || 500;
  const message = err.message || 'Server error';
  return res.status(status).json({ error: message });
};

module.exports = errorHandler;
