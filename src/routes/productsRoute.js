const express = require('express');
const productController = require('../controllers/products.controller');
const { validateName } = require('../middlewares/products.middlewares');

const router = express.Router();

router.get('/', productController.getAll);
router.post('/', validateName, productController.register);
router.get('/:id', productController.getById);

module.exports = router;