const salesService = require('../services/sales.service');

const register = async (req, res) => {
  const sales = req.body;

  const test = await salesService.register(sales);
  console.log(test);
  const { type, message, statusCode } = test;
  if (type) return res.status(statusCode).json({ message });

  return res.status(statusCode).json(message);
};

module.exports = {
  register,
};