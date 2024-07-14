const express = require('express');
const router = express.Router();
const contractRoutes = require("./contract");
const jobRoutes = require("./job");
const profileRoutes = require("./profile");
const adminRoutes = require("./admin");

router.use('/contracts', contractRoutes);
router.use('/jobs', jobRoutes);
router.use('/profiles', profileRoutes);
router.use('/admin', adminRoutes);

module.exports = router;