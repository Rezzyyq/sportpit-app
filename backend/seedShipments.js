import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

// Підключення до MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB підключено для seedShipments"))
  .catch(err => console.error("❌ Помилка підключення:", err));

// Схема продукту (для пошуку по назві)
const ProductSchema = new mongoose.Schema({
  name: String,
  quantity: Number
});
const Product = mongoose.model("Product", ProductSchema);

// Схема відправки
const ShipmentSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity: Number,
  date: Date
});
const Shipment = mongoose.model("Shipment", ShipmentSchema);

// Масив відправок
const shipments = [
  { productName: "Dark Matter (1560g)", quantity: 2, date: new Date("2025-09-01") },
  { productName: "Glucosamine, Chondroitin, MSM plus Hyaluronic Acid (120 caps)", quantity: 1, date: new Date("2025-09-02") },
  { productName: "Whey Protein Isolate (1kg)", quantity: 3, date: new Date("2025-09-03") },
  { productName: "Creatine Monohydrate (500g)", quantity: 4, date: new Date("2025-09-04") },
  // додай свої відправки сюди
];

async function seedShipments() {
  try {
    // Очищаємо колекцію перед заливкою
    await Shipment.deleteMany({});
    console.log("🗑 Колекція shipments очищена");

    for (let s of shipments) {
      // Знаходимо продукт по назві
      const product = await Product.findOne({ name: s.productName });
      if (!product) {
        console.log(`⚠️ Продукт не знайдено: ${s.productName}`);
        continue;
      }

      // Створюємо відправку
      await Shipment.create({
        product: product._id,
        quantity: s.quantity,
        date: s.date
      });
      console.log(`✅ Відправка для ${s.productName} додана`);
    }
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
}

seedShipments();
