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

const update = async (id, name) => {
  const allProducts = await getAll();
  const product = allProducts.some((e) => e.id === parseInt(id, 10));
  if (!product) {
    return {
      type: 404, message: { message: 'Product not found' },
    };
  }
  
  await productsModel.update(id, name);
  return { id, name };
};

const exclude = async (id) => {
  const allProducts = await getAll();
  const product = allProducts.some((e) => e.id === parseInt(id, 10));
  if (!product) {
    return {
      type: 404, message: { message: 'Product not found' },
    };
  }

  await productsModel.exclude(id);
  return { message: 'Product deleted successfully' };
};

module.exports = {
  getAll,
  getById,
  register,
  update,
  exclude,
};