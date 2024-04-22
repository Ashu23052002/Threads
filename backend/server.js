import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();

connectDB();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json()); // to parse json data into req.body
app.use(express.urlencoded({ extended: true })); // to parse from data in req.body
app.use(cookieParser());

// Routes
app.use("/api/users",userRoutes);
app.use("/api/posts",postRoutes);

app.listen(5000, () => console.log(`Server started at port ${PORT}`));
