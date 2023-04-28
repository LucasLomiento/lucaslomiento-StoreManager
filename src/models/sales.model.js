const connection = require('./connection');

const registerSale = async () => {
  const [{ insertId }] = await connection
    .execute('INSERT INTO StoreManager.sales (date) VALUES (NOW())');
  return insertId;
};

const registerProduct = async (saleId, product, quantity) => {
  const result = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, product, quantity],
  );
  return result;
};

module.exports = {
  registerSale,
  registerProduct,
};