const salesService = require('../services/sales.service');

const register = async (req, res) => {
  const sales = req.body;

  const { type, message, statusCode } = await salesService.register(sales);
  if (type) return res.status(statusCode).json({ message });

  return res.status(statusCode).json(message);
};

module.exports = {
  register,
};