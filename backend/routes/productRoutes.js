import express from "express";
import Product from "../models/Product.js";
import asyncHandler from "../utils/asyncHandler.js";
import { createHttpError } from "../utils/httpError.js";

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

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  }),
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const validated = validateProductPayload(req.body);
    if (validated.error) {
      throw createHttpError(400, validated.error);
    }

    const newProduct = new Product(validated.value);
    const saved = await newProduct.save();
    res.status(201).json(saved);
  }),
);

router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const validated = validateProductPayload(req.body);
    if (validated.error) {
      throw createHttpError(400, validated.error);
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, validated.value, { new: true });

    if (!updated) {
      throw createHttpError(404, "Товар не знайдено");
    }

    res.json(updated);
  }),
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      throw createHttpError(404, "Товар не знайдено");
    }

    res.json({ message: "Товар видалено" });
  }),
);

export default router;
