import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// GET /api/products – отримати всі товари
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Помилка сервера", error: error.message });
  }
});


// POST /api/products – додати новий товар
router.post("/", async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const newProduct = new Product({ name, quantity });
    const created = await newProduct.save();
    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ message: "Помилка при додаванні товару", error: error.message });
  }
});


export default router;

