const express = require('express');

const {
    addExpense,
    getallExpense,
    deleteExpense,
    downloadExpenseExcel
} = require("../controllers/expenseController");

const {protect} = require("../middleware/authMiddleware");

const router= express.Router();

router.post("/add", protect, addExpense);
router.get("/get", protect, getallExpense);
router.delete("/:id", protect, deleteExpense);
router.get("/downloadexcel", protect, downloadExpenseExcel);


module.exports = router;