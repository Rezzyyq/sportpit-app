import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Підключено до MongoDB"))
  .catch((err) => console.log("❌ Помилка підключення до MongoDB:", err));

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Сервер запущено на http://localhost:${PORT}`);
});
