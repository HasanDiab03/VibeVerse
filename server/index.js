import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/posts.js";
dotenv.config();

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);

const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() =>
    app.listen(port, () => console.log(`Server running on port: ${port}...`))
  )
  .catch((err) => console.log(err.message));
