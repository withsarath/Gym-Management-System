import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import memberRoutes from "./routes/memberRoutes.js";
import planRoutes from "./routes/planRoutes.js"
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js"
import startExpiryJob from "./utils/expiryJob.js";
dotenv.config()

const app = express();
const PORT = process.env.PORT || 5001;

//middlewares
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/subscription", subscriptionRoutes);
app.use("/api/payments", paymentRoutes)

//* connect DB then run app
connectDb().then(() => {
    startExpiryJob();
    app.listen(PORT, () => {
        console.log(`the server is running on ${PORT}`);
    })
})

