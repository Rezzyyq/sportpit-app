import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// GET всі товари
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST додати новий товар
router.post("/", async (req, res) => {
  const { name, quantity } = req.body;
  const product = new Product({ name, quantity });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT редагувати товар
router.put("/:id", async (req, res) => {
  const { name, quantity } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, quantity },
      { new: true }
    );
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE видалити товар
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Товар видалено" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;


