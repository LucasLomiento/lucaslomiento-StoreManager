const salesModel = require('../models/sales.model');
const products = require('./products.service');

const getAll = async () => {
  const sales = await salesModel.getAll();
  return sales;
};

const getById = async (id) => {
  const sale = await salesModel.getById(id);
  if (sale.length <= 0) {
    return {
      type: 404, message: { message: 'Sale not found' },
    };
  }
  return sale;
};

const returnJson = (array, insertId) => ({
  type: null,
  statusCode: 201,
  message: {
    id: insertId,
    itemsSold: array,
  },
});

const register = async (sales) => {
  const allProducts = await products.getAll();
  const sale = sales.every((product) => allProducts.some((e) => e.id === product.productId));
  if (!sale) { 
    return {
      type: 'PRODUCT_NOT_FOUND',
      statusCode: 404,
      message: 'Product not found',
    };
  }

  const insertId = await salesModel.registerSale(sales);
  await Promise.all(await sales.map(async (product) =>
    salesModel.registerProduct(insertId, product.productId, product.quantity)));
  
  return returnJson(sales, insertId);
};

module.exports = {
  getAll,
  getById,
  register,
};