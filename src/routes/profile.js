const express = require('express');
const router = express.Router();
const profileController = require("../controller/profileController");
const { getProfile } = require("../middleware/getProfile");
const asyncHandler = require('../middleware/asyncHandler');


router.post('/:id/balance/deposit', getProfile, asyncHandler(profileController.depositBalance));

module.exports = router;