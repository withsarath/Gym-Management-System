import express from "express";
import { createMembers, getAllMembers, getMember, updateMembers } from "../controllers/memberController.js";

const router = express.Router();

router.get("/", getAllMembers)
router.get("/:id", getMember)
router.post("/", createMembers)
router.patch("/:id", updateMembers)
router.delete("/:id", deleteMember)

export default router
