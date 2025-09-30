// api/products.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

// Підключення до MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ Підключено до MongoDB"))
  .catch((err) => console.log("❌ Помилка підключення до MongoDB:", err));

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const products = await Product.find({});
      res.status(200).json(products);
    } else if (req.method === "POST") {
      const newProduct = new Product(req.body);
      const saved = await newProduct.save();
      res.status(201).json(saved);
    } else if (req.method === "PUT") {
      const updated = await Product.findByIdAndUpdate(req.query.id, req.body, { new: true });
      res.status(200).json(updated);
    } else if (req.method === "DELETE") {
      await Product.findByIdAndDelete(req.query.id);
      res.status(200).json({ message: "Товар видалено" });
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Помилка на сервері" });
  }
};

const productSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  customer: String,
  date: String,
  image: String,
});

const Product = mongoose.model("Product", productSchema);

export default handler;