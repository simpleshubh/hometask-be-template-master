const express = require('express');
const router = express.Router();
const adminController = require("../controller/adminController");
const asyncHandler = require('../middleware/asyncHandler');



router.get('/best-profession', asyncHandler(adminController.getBestProfession));

router.get('/best-client', asyncHandler(adminController.getBestClient));

module.exports = router;