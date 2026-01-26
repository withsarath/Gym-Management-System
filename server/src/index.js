import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
dotenv.config()

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json( ))

app.get("/", (req, res) => {
    res.send("Working!!")
})
connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`the server is running on ${PORT}`);
    })
})

