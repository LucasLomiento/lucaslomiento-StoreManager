const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products',
  );
  return products;
};

const getById = async (id) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [id],
  );
  return product;
};

const register = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUES (?)',
    [name],
  );
  return { id: insertId, name };
};

const update = async (id, name) => {
  const [product] = await connection.execute(
    'UPDATE products SET name = ? WHERE id = ?',
    [name, id],
  );
  return product;
};

const exclude = async (id) => {
  const product = await connection.execute(
    'DELETE FROM products WHERE id = ?',
    [id],
  );
  return product;
};
  
module.exports = {
  getAll,
  getById,
  register,
  update,
  exclude,
};