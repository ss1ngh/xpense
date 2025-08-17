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
router.get("/get", protect, getallIncome);
router.delete("/:id", protect, deleteIncome);
router.get("/downloadexcel", protect, downloadIncomeExcel);


module.exports = router;