import { Router } from "express";
import { getExample, getExampleData } from "../controllers/exampleControllers";
import { getExpenseData } from "../controllers/expenseControllers";
import { getExampleDataValidation } from "../validation/exampleValidation/exampleValidation";

const router = Router();

router.get("/", getExample)
router.post("/", getExampleDataValidation, getExampleData)
router.post("/nagar", getExpenseData)

export default router;