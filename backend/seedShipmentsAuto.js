import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

// Підключення до MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB підключено для seedShipmentsAuto"))
  .catch(err => console.error("❌ Помилка підключення:", err));

// Схема продукту
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

async function seedShipmentsAuto() {
  try {
    // Очищаємо колекцію shipments
    await Shipment.deleteMany({});
    console.log("🗑 Колекція shipments очищена");

    // Беремо всі продукти
    const products = await Product.find({});
    if (!products.length) {
      console.log("⚠️ Продуктів не знайдено у колекції products");
      return;
    }

    for (let product of products) {
      // Генеруємо випадкову кількість для відправки (1-5)
      const quantity = Math.floor(Math.random() * 5) + 1;
      const date = new Date(); // сьогоднішня дата

      await Shipment.create({
        product: product._id,
        quantity,
        date
      });

      console.log(`✅ Відправка для ${product.name} додана (кількість: ${quantity})`);
    }

  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
}

seedShipmentsAuto();
