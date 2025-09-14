import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productsRouter from "./routes/productRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API працює 🚀");
});


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Підключено до MongoDB"))
  .catch((err) => console.log("❌ Помилка підключення до MongoDB:", err));

app.use("/api/products", productsRouter); // <-- ось тут підключаємо роут

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Сервер слухає порт ${PORT}`));






