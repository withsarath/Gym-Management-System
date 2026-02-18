import express from "express";
import { createPlan, getAllPlans, getPlan, updatePlan } from "../controllers/planController.js";

const router = express.Router();

router.get("/", getAllPlans);
router.get("/:id", getPlan);
router.post("/", createPlan);
router.patch("/:id", updatePlan)


export default router;