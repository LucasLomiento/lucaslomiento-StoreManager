const salesService = require('../services/sales.service');

const getAll = async (_req, res) => {
  const sales = await salesService.getAll();
  return res.status(200).json(sales);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const sales = await salesService.getById(id);
  if (sales.type) return res.status(sales.type).json(sales.message);
  return res.status(200).json(sales);
};

const register = async (req, res) => {
  const sales = req.body;

  const test = await salesService.register(sales);
  const { type, message, statusCode } = test;
  if (type) return res.status(statusCode).json({ message });

  return res.status(statusCode).json(message);
};

module.exports = {
  getAll,
  getById,
  register,
};