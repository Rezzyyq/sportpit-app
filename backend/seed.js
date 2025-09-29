import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js"; // Шлях до моделі

dotenv.config();

console.log("MONGO_URI from .env:", process.env.MONGO_URI);

const initialProducts = [
  { name: "Glucosamine, Chondroitin, MSM plus Hyaluronic Acid (120 caps)", quantity: 2, customer: "", date: "" },
  { name: "Glucosamine, Chondroitin, MSM plus Hyaluronic Acid (60 caps)", quantity: 2, customer: "", date: "" },
  { name: "SAMe (400 mg)", quantity: 1, customer: "", date: "" },
  { name: "Black Maca (60 capsules)", quantity: 1, customer: "", date: "" },
  { name: "Probolic-SR (1940g)", quantity: 1, customer: "", date: "" }, // Оновлено з 2 до 1
  { name: "Dark Matter (1560g)", quantity: 3, customer: "", date: "" },
  { name: "Blade Isolate (30g)", quantity: 1, customer: "", date: "" },
  { name: "Beef-XP (150g)", quantity: 1, customer: "", date: "" },
  { name: "Hyper Crush (453g)", quantity: 1, customer: "", date: "" },
  { name: "Urolithin A NAD+ (120 caps)", quantity: 1, customer: "", date: "" },
  { name: "Cortisol Health (120 caps)", quantity: 2, customer: "", date: "" },
  { name: "Animal stak Comprehensive Support Pack (132g)", quantity: 1, customer: "", date: "" },
  { name: "Animal stak Comprehensive Non-Hormonal Pack (213g)", quantity: 1, customer: "", date: "" },
  { name: "Amino power Liquid (500ml)", quantity: 1, customer: "", date: "" },
  { name: "MST MSM1000", quantity: 1, customer: "", date: "" },
  { name: "The last emperor (240 caps)", quantity: 1, customer: "", date: "" },
  { name: "Bee propolis (120 caps)", quantity: 1, customer: "", date: "" },
  { name: "Phosphatidyl Serine (60 caps)", quantity: 1, customer: "", date: "" },
  { name: "Forskolin (60 cups)", quantity: 1, customer: "", date: "" },
  { name: "Testofx (80 caps)", quantity: 1, customer: "", date: "" },
  { name: "Crass-fed Bone Marrow (180 caps)", quantity: 1, customer: "", date: "" },
  { name: "Serrapeptase (120 caps)", quantity: 1, customer: "", date: "" },
  { name: "Liposomal Vitamin C (20 mL)", quantity: 4, customer: "", date: "" }, // Оновлено з 2 до 4
  { name: "Liposomal Glutathione (20 mL)", quantity: 1, customer: "", date: "" },
  { name: "EAA STRONG (308g)", quantity: 1, customer: "", date: "" },
  { name: "Magnesium 12-in-1 Complex (120 caps)", quantity: 1, customer: "", date: "" },
  { name: "LongJack (30caps)", quantity: 1, customer: "", date: "" },
  { name: "Methylene Blue (120 caps)", quantity: 1, customer: "", date: "" },
  { name: "Vitamin B Complex Plus 13-in-1 (120 caps)", quantity: 2, customer: "", date: "" },
  { name: "ANADROX Pump&Burn (224 cups)", quantity: 2, customer: "", date: "" },
  { name: "C.G.P - Creatine Glycerol Phosphate (400 grams)", quantity: 1, customer: "", date: "" }, // Новий товар
  { name: "Aurora Micro-Pack exoFlex", quantity: 3, customer: "", date: "" } // Новий товар
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Підключено до MongoDB");

    await Product.deleteMany({});
    console.log("🗑 Колекція очищена");

    await Product.insertMany(initialProducts);
    console.log(`📦 Додано ${initialProducts.length} товарів`);

    mongoose.disconnect();
    console.log("🔌 Відключено від MongoDB");
  } catch (err) {
    console.log("❌ Помилка при seed:", err);
  }
};

seedDB();


