import dotenv from "dotenv";
import connectDatabase from "../../backend/utils/connectDatabase.js";
import Product from "../../backend/models/Product.js";
import { validateProductPayload } from "../../backend/utils/productPayload.js";

dotenv.config();

const sendApiError = (res, error) => {
  if (error.name === "CastError") {
    return res.status(400).json({ message: "Некоректний формат ідентифікатора" });
  }

  if (error.name === "ValidationError") {
    return res.status(400).json({ message: error.message });
  }

  if (error.publicMessage) {
    return res.status(500).json({ message: error.publicMessage });
  }

  console.error("Vercel API error:", error);
  return res.status(500).json({ message: "Не вдалося підключитися до MongoDB. Перевір MONGO_URI у Vercel та доступ MongoDB Atlas." });
};

export default async function handler(req, res) {
  try {
    await connectDatabase();

    const { id } = req.query;

    if (req.method === "PUT") {
      const validated = validateProductPayload(req.body || {});
      if (validated.error) {
        return res.status(400).json({ message: validated.error });
      }

      const updated = await Product.findByIdAndUpdate(id, validated.value, { new: true });
      if (!updated) {
        return res.status(404).json({ message: "Товар не знайдено" });
      }

      return res.status(200).json(updated);
    }

    if (req.method === "DELETE") {
      const deleted = await Product.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ message: "Товар не знайдено" });
      }

      return res.status(200).json({ message: "Товар видалено" });
    }

    res.setHeader("Allow", "PUT, DELETE");
    return res.status(405).json({ message: "Метод не підтримується" });
  } catch (error) {
    return sendApiError(res, error);
  }
}
