import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

const normalizeStringField = (value, fieldName) => {
  if (value === undefined) return undefined;
  if (typeof value !== "string") {
    return { error: `${fieldName} має бути рядком` };
  }
  return value.trim();
};

const validateProductPayload = (body) => {
  const rawName = normalizeStringField(body.name, "name");
  if (rawName?.error) return rawName;

  const quantity = Number(body.quantity);

  if (!rawName || rawName.length === 0) {
    return { error: "name є обов'язковим полем" };
  }

  if (!Number.isInteger(quantity) || quantity < 0) {
    return { error: "quantity має бути цілим невід'ємним числом" };
  }

  const customer = normalizeStringField(body.customer, "customer");
  if (customer?.error) return customer;

  const date = normalizeStringField(body.date, "date");
  if (date?.error) return date;

  const image = normalizeStringField(body.image, "image");
  if (image?.error) return image;

  return {
    value: {
      name: rawName,
      quantity,
      customer: customer || "",
      date: date || "",
      ...(image ? { image } : {}),
    },
  };
};

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch {
    res.status(500).json({ message: "Не вдалося завантажити товари" });
  }
});

router.post("/", async (req, res) => {
  const validated = validateProductPayload(req.body);
  if (validated.error) {
    return res.status(400).json({ message: validated.error });
  }

  try {
    const newProduct = new Product(validated.value);
    const saved = await newProduct.save();
    return res.status(201).json(saved);
  } catch {
    return res.status(500).json({ message: "Помилка при додаванні товару" });
  }
});

router.put("/:id", async (req, res) => {
  const validated = validateProductPayload(req.body);
  if (validated.error) {
    return res.status(400).json({ message: validated.error });
  }

  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, validated.value, { new: true });

    if (!updated) {
      return res.status(404).json({ message: "Товар не знайдено" });
    }

    return res.json(updated);
  } catch {
    return res.status(500).json({ message: "Помилка при редагуванні товару" });
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
