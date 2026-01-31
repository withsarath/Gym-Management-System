import express from "express";
import { createMember, getAllMembers, getMember, updateMember } from "../controllers/memberController.js";
import {verifyToken} from "../middleware/authMiddleware.js"
import {authorizeRole} from "../middleware/roleMiddleware.js"

const router = express.Router();

// * 🔐 Apply middleware to ALL routes below
router.use(verifyToken, authorizeRole("admin"))

router.get("/", getAllMembers)
router.get("/:id", getMember)
router.post("/", createMember)
router.patch("/:id", updateMember)


export default router
