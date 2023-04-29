const connection = require('./connection');

const getAll = async () => {
  const [sales] = await connection.execute(`
    SELECT sales.id saleId,
    sales.date, sales_products.product_id AS productId, sales_products.quantity
    FROM StoreManager.sales
    INNER JOIN StoreManager.sales_products
    ON sales.id = sales_products.sale_id;
  `);
  return sales;
};

const getById = async (id) => {
  const [sale] = await connection.execute(`
    SELECT
    sales.date, sales_products.product_id productId, sales_products.quantity
    FROM sales
    INNER JOIN sales_products
    ON sales.id = sales_products.sale_id
    WHERE sales.id = ?;
  `, [id]);
  return sale;
};

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

// delete from sales and sales_products where sale_id = 1
const exclude = async (id) => {
  const sale = await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [id],
  );
  return sale;
};

module.exports = {
  getAll,
  getById,
  registerSale,
  registerProduct,
  exclude,
};