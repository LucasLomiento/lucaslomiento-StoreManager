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

// get all sales that have the same sale.id as the id passed as a parameter pode ter mais de um produto
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

module.exports = {
  getAll,
  getById,
  registerSale,
  registerProduct,
};