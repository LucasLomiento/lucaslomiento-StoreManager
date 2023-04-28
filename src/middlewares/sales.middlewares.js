const productId = (req, res, next) => {
  const hasProductId = req.body.some((e) => e.productId === undefined);
  if (hasProductId) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  next();
};

const quantity = (req, res, next) => {
  const { body } = req;
  const isQuantityUnd = body.some((e) => e.quantity === undefined);
  if (isQuantityUnd) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  const isQuantityValid = body.some((e) => e.quantity < 1);
  if (isQuantityValid) {
    return res
      .status(422)
      .json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

module.exports = {
  productId,
  quantity,
};