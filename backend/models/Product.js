import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  customer: { type: String, default: "" },
  date: { type: String, default: "" }
});

const Product = mongoose.model("Product", productSchema);
export default Product;




