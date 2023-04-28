const connection = require('./connection');

const registerSale = async () => {
  const [{ insertId }] = await connection
    .execute('INSERT INTO StoreManager.sales (date) VALUES (NOW())');
  return insertId;
};

const registerProduct = async (saleId, product, quantity) => {
  await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, product, quantity],
  );
};

module.exports = {
  registerSale,
  registerProduct,
};