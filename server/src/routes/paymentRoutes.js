import express from "express";
import { getPayments, makePayment, memberPayments } from "../controllers/paymentController.js";
import {verifyToken} from "../middleware/authMiddleware.js"
import {authorizeRole} from "../middleware/roleMiddleware.js"
const router = express.Router();

router.post("/pay", verifyToken, makePayment)
router.get("/", verifyToken, authorizeRole("admin"), getPayments);
router.get("/:id", verifyToken, memberPayments)



export default router;