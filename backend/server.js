import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/api/products", productRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Підключено до MongoDB"))
  .catch((err) => console.error("❌ Помилка підключення:", err));

app.listen(5000, () => console.log("🚀 Сервер слухає порт 5000"));







