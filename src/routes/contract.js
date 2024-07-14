const express = require('express');
const router = express.Router();
const contractController = require("../controller/contractController");
const { getProfile } = require("../middleware/getProfile");
const asyncHandler = require('../middleware/asyncHandler');


router.get('/', getProfile, asyncHandler(contractController.getContractByProfileId));

router.get('/:id', getProfile, asyncHandler(contractController.getContractById));

module.exports = router;