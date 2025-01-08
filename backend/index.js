import cookieParser from "cookie-parser";
import express from "express";
import connectDb from "./database/db.js";
import userrouter from "./routes/user.js";
import PinRouter from "./routes/pin.js";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.cloud_apikey,
  api_secret: process.env.cloud_apisecret,
  secure: true,
  timeout: 600000,
});
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userrouter);
app.use("/api/pin", PinRouter);
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

connectDb();

app.listen(5000, () => {
  console.log("server is listening on port 5000");
});
