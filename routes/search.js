const express = require('express');

// Controller
const searchController = require('../controller/search');

const router = express.Router();

//router for searching product and variant
router.get('/:word', searchController.get);

module.exports = router;