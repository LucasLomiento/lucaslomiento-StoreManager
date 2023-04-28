const express = require('express');
const salesController = require('../controllers/sales.controller');
const validate = require('../middlewares/sales.middlewares');

const router = express.Router();

router.get('/', salesController.getAll);
router.post('/', validate.productId, validate.quantity, salesController.register);
router.get('/:id', salesController.getById);

module.exports = router;