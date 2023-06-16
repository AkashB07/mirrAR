const express = require('express');

// Controller
const variantController = require('../controller/variant');

// Middleware
const middlewareController = require('../middleware/product');

const router = express.Router();

//router for adding a variant
router.post('/add', middlewareController.middleware, variantController.add);

//router for deleting a single variant
router.delete('/delete/:variantId', variantController.remove);

//router for updating a single variant
router.put('/update', middlewareController.middleware, variantController.update);

module.exports = router;