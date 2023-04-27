const productsService = require('../services/products.service');

const getAll = async (_req, res) => {
  const products = await productsService.getAll();
  return res.status(200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.getById(id);
  if (product.type) return res.status(product.type).json(product.message);
  return res.status(200).json(product);
};

const register = async (req, res) => {
  const { name } = req.body;
  const product = await productsService.register(name);
  console.log(product);
  return res.status(201).json({ id: product.insertId, name });
};

module.exports = {
  getAll,
  getById,
  register,
};