const express = require('express');
const {protect} = require("../middleware/authMiddleware");
const {getDashboardData} = require("../controllers/dashboardController");

router.get('/', protect, getDashboardData);

module.exports = router;