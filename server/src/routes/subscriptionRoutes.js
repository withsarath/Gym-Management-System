import express from "express";
import { assignPlan, cancelPlan, memberSubscription, pausePlan, resumePlan } from "../controllers/subscriptionController";
import { verifyToken } from "../middleware/authMiddleware";
import { authorizeRole } from "../middleware/roleMiddleware";

const router = express.Router();

router.post("/", verifyToken, authorizeRole("admin"), assignPlan);
router.get("/:id", verifyToken, authorizeRole("admin"),memberSubscription);
router.patch("/:id/pause", verifyToken, authorizeRole("admin"), pausePlan);
router.patch("/:id/resume",verifyToken, authorizeRole("admin"), resumePlan);
router.patch("/:id/cancel", verifyToken, authorizeRole("admin"), cancelPlan);

export default router;
