import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import memberRoutes from "./routes/memberRoutes.js";
dotenv.config()

const app = express();
const PORT = process.env.PORT || 5001;

//middlewares
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/members", memberRoutes);

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`the server is running on ${PORT}`);
    })
})

