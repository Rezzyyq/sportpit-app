import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  customer: String,
  date: String,
});

const Product = mongoose.model("Product", productSchema);

export default Product;



