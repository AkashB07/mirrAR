const express = require('express');

// Controller
const productController = require('../controller/product');

const router = express.Router();

//router for adding a product
router.post('/add', productController.add);

//router for getting a single product and its variants
router.get('/get/:productId', productController.get);

//router for getting all the products
router.get('/getall', productController.getall);

//router for deleting a single product
router.delete('/delete/:productId', productController.remove);

//router for updating a single product
router.put('/update', productController.update);

module.exports = router;