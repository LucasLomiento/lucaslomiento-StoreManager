const express = require('express');
const productController = require('../controllers/products.controller');
const validate = require('../middlewares/products.middlewares');

const router = express.Router();

router.get('/', productController.getAll);
router.post('/', validate.prodName, productController.register);
router.get('/:id', productController.getById);
router.put('/:id', validate.prodName, productController.update);
router.delete('/:id', productController.exclude);

module.exports = router;