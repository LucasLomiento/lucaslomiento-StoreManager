const express = require('express');
const salesController = require('../controllers/sales.controller');
const validate = require('../middlewares/sales.middlewares');

const router = express.Router();

router.post('/', validate.productId, validate.quantity, salesController.register);

module.exports = router;