import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch {
    res.status(500).json({ message: "Не вдалося завантажити товари" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch {
    res.status(500).json({ message: "Помилка при додаванні товару" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch {
    res.status(500).json({ message: "Помилка при редагуванні товару" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Товар видалено" });
  } catch {
    res.status(500).json({ message: "Помилка при видаленні товару" });
  }
});

export default router;
