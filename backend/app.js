import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandlers.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ ok: true, message: "Sportpit API is running" });
});

app.use("/api/products", productRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
