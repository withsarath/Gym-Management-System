import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { authorizeRole } from "../middleware/roleMiddleware.js"
const router = express.Router();

// * Only admin can access this route
router.get("/admin", verifyToken, authorizeRole("admin"),  (req, res) => {
    res.json({ message: "Welcome Admin" })
})
// * Both admin and trainer can access this route
router.get("/trainer",verifyToken, authorizeRole("admin", "trainer"), (req, res) => {
    res.json({ message: "Welcome trainer" })
})
// * All can access this route
router.get("/member", verifyToken, authorizeRole("admin", "trainer", "user"), (req, res) => {
    res.json({ message: "Welcome member" })
})

export default router