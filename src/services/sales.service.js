const salesModel = require('../models/sales.model');
const { getAll } = require('./products.service');

const returnJson = (array, insertId) => ({
  type: null,
  statusCode: 201,
  message: {
    id: insertId,
    itemsSold: array,
  },
});

const register = async (sales) => {
  const allProducts = await getAll();
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
  register,
};