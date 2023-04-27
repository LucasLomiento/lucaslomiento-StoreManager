const productsModel = require('../models/products.model');

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const getById = async (id) => {
  const product = await productsModel.getById(id);
  if (!product) {
    return {
      type: 404, message: { message: 'Product not found' },
    };
  }
  return product;
};

const register = async (name) => {
  const product = await productsModel.register(name);
  return product;
};

module.exports = {
  getAll,
  getById,
  register,
};