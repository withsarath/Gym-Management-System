import express from "express";
import { getDashboardStats} from "../controllers/dashboardController.js";
import { verifyToken } from "../middleware/authMiddleware.js"
import { authorizeRole } from "../middleware/roleMiddleware.js"
const router = express.Router();

router.get("/", verifyToken, authorizeRole("admin"), getDashboardStats
);


export default router