import dotenv from "dotenv";
import connectDatabase from "../backend/utils/connectDatabase.js";
import Product from "../backend/models/Product.js";
import { validateProductPayload } from "../backend/utils/productPayload.js";

dotenv.config();

const sendApiError = (res, error) => {
  if (error.name === "ValidationError") {
    return res.status(400).json({ message: error.message });
  }

  console.error("Vercel API error:", error);
  return res.status(500).json({ message: "Не вдалося виконати запит до API" });
};

export default async function handler(req, res) {
  try {
    await connectDatabase();

    if (req.method === "GET") {
      const products = await Product.find({});
      return res.status(200).json(products);
    }

    if (req.method === "POST") {
      const validated = validateProductPayload(req.body || {});
      if (validated.error) {
        return res.status(400).json({ message: validated.error });
      }

      const product = new Product(validated.value);
      const saved = await product.save();
      return res.status(201).json(saved);
    }

    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ message: "Метод не підтримується" });
  } catch (error) {
    return sendApiError(res, error);
  }
}
