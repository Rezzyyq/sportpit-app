import express from "express";
import Product from "../models/Product.js";
import asyncHandler from "../utils/asyncHandler.js";
import { createHttpError } from "../utils/httpError.js";
import { validateProductPayload } from "../utils/productPayload.js";

const router = express.Router();

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
