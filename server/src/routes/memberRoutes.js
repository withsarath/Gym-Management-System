import express from "express";
import { createMember, getAllMembers, getMember, updateMember, updateMemberStatus } from "../controllers/memberController.js";
import {verifyToken} from "../middleware/authMiddleware.js"
import {authorizeRole} from "../middleware/roleMiddleware.js"

const router = express.Router();

// * 🔐 Apply middleware to ALL routes below
router.use(verifyToken, authorizeRole("admin"))

router.get("/", getAllMembers)
router.get("/:id", getMember)
router.post("/", createMember)
router.patch("/:id", updateMember)
router.patch("/:id/status", updateMemberStatus)


export default router
