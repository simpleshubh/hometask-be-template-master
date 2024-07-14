const express = require('express');
const router = express.Router();
const jobController = require("../controller/jobController");
const { getProfile } = require("../middleware/getProfile");
const asyncHandler = require('../middleware/asyncHandler');



router.get('/unpaid', getProfile, asyncHandler(jobController.getUnpaidJobs));

router.post('/:id/pay', getProfile, asyncHandler(jobController.payForJob));

module.exports = router;