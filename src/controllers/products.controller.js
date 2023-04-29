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
  return res.status(201).json({ id: product.id, name: product.name });
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const product = await productsService.update(id, name);
  if (product.type) return res.status(product.type).json(product.message);
  return res.status(200).json(product);
};

module.exports = {
  getAll,
  getById,
  register,
  update,
};