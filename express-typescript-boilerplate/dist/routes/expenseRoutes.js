"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const expenseControllers_1 = require("../controllers/expenseControllers");
const router = (0, express_1.Router)();
router.post("/", expenseControllers_1.getExpenseData);
// router.post("/", getExampleDataValidation, getExpenseData)
exports.default = router;
