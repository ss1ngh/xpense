const express = require('express');

const {
    addIncome,
    getallIncome,
    deleteIncome,
    downloadIncomeExcel
} = require("../controllers/incomeController");

const {protect} = require("../middleware/authMiddleware");

const router= express.Router();

router.post("/add", protect, addIncome);
router.post("/get", protect, getallIncome);
router.post("/:id", protect, deleteIncome);
router.post("/downloadexcel", protect, downloadIncomeExcel);


module.exports = router;