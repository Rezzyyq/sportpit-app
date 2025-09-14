import express from "express";
import Product from "../models/Product.js"; // перевір, що у тебе є модель Product

const router = express.Router();

// GET /api/products — повертає всі товари
router.get("/", async (req, res) => {
  try {
    const products = await Product.find(); // забираємо всі товари з Mongo
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
}
