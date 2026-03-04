export const notFoundHandler = (req, res, next) => {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  error.status = 404;
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  if (res.headersSent) return next(err);

  const status = err.status || 500;

  if (err.name === "CastError") {
    return res.status(400).json({ message: "Некоректний формат ідентифікатора" });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({ message: err.message });
  }

  if (status >= 500) {
    console.error("API error:", err);
  }

  return res.status(status).json({ message: err.message || "Внутрішня помилка сервера" });
};
