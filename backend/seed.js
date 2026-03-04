import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

console.log("MONGO_URI from .env:", process.env.MONGO_URI);

const initialProducts = [
  { name: "AMPK Metabolic Activator (30 tabls)", quantity: 1, customer: "", date: "" },
  { name: "Amino power Liquid (500ml)", quantity: 1, customer: "", date: "" },
  { name: "ANADROX Pump&Burn (279g)", quantity: 2, customer: "", date: "" },
  { name: "Animal stak Comprehensive Non-Hormonal Pack (213g)", quantity: 1, customer: "", date: "" },
  { name: "Animal stak Comprehensive Support Pack (132g)", quantity: 1, customer: "", date: "" },
  { name: "Bee propolis (120 caps)", quantity: 1, customer: "", date: "" },
  { name: "Black Maca (60 capsules)", quantity: 1, customer: "", date: "" },
  { name: "C.G.P - Creatine Glycerol Phosphate (400g)", quantity: 1, customer: "", date: "" },
  { name: "Cortisol Health (120 caps)", quantity: 2, customer: "", date: "" },
  { name: "Crass-fed Bone Marrow (180 caps)", quantity: 1, customer: "", date: "" },
  { name: "Dark Matter (1560g)", quantity: 1, customer: "", date: "" },
  { name: "Double Strength Taurine (100 caps)", quantity: 1, customer: "", date: "" },
  { name: "Forskolin (60 cups)", quantity: 1, customer: "", date: "" },
  { name: "Hyper Crush (453g)", quantity: 1, customer: "", date: "" },
  { name: "Liposomal CoQ10/PQQ+ (20 ml)", quantity: 2, customer: "", date: "" },
  { name: "Liposomal Glutathione (750 mg)", quantity: 3, customer: "", date: "" },
  { name: "Liposomal NAD+/Resveratrol (20 ml)", quantity: 2, customer: "", date: "" },
  { name: "Liposomal Vitamin C (3000 mg)", quantity: 5, customer: "", date: "" },
  { name: "exoFlex (10 ml)", quantity: 1, customer: "", date: "" },
  { name: "LongJack (30caps)", quantity: 1, customer: "", date: "" },
  { name: "Nutrex Creatine Monohydrate (300g)", quantity: 2, customer: "", date: "" },
  { name: "Phosphatidyl Serine (60 caps)", quantity: 1, customer: "", date: "" },
  { name: "Probolic-SR (1940g)", quantity: 2, customer: "", date: "" },
  { name: "Testofx (80 caps)", quantity: 1, customer: "", date: "" },
  { name: "The last emperor (240 caps)", quantity: 1, customer: "", date: "" },
  { name: "Urolithin A NAD+ (120 caps - пошкодженна упаковка)", quantity: 1, customer: "", date: "" },
  { name: "Cla95 (30 soft)", quantity: 1, customer: "", date: "" },
  { name: "Impact hydration (3,200mg) - пунш", quantity: 2, customer: "", date: "" },
  { name: "Impact hydration (3,200mg) - лимон", quantity: 1, customer: "", date: "" },
  { name: "Tart Cherry (60 gummies)", quantity: 1, customer: "", date: "" },
  { name: "Collagen peptides (198g)", quantity: 2, customer: "", date: "" },
  { name: "Protein bar 33% (50g chocolate flavour)", quantity: 3, customer: "", date: "" },
  { name: "Sporter Collagen Active + Vitamin C (200 tabls)", quantity: 1, customer: "", date: "" },
  { name: "Solgar B-Complex \"100\" (100 caps)", quantity: 1, customer: "", date: "" },
  { name: "isatori Amino GRO (300g)", quantity: 2, customer: "", date: "" },
  { name: "isatori Creatine A5X (200g)", quantity: 1, customer: "", date: "" },
  { name: "Magnum Nutraceuticals G-SPRING sleep& Grow (48 caps)", quantity: 4, customer: "", date: "" },
  { name: "California Gold Nutrition EuroHerbs Olive Leaf Extract 500mg (60 caps)", quantity: 1, customer: "", date: "" },
  { name: "ForceFactoe Anabolic Muscle Builder (150 caps)", quantity: 1, customer: "", date: "" },
  { name: "Rule One BCAA (249g - watermelon)", quantity: 1, customer: "", date: "" },
  { name: "Extreme Speed Shot (25 ml)", quantity: 3, customer: "", date: "" },
  { name: "Allmax ISOFLEX (907g)", quantity: 1, customer: "", date: "" },
  { name: "Metabolic Nutrition TRI-PEP Branch Chan Amino Acid (400 g)", quantity: 1, customer: "", date: "" },
  { name: "MHP Creatine Monohydrate (300g)", quantity: 1, customer: "", date: "" },
  { name: "Metabolic Nutrition Beta-Alanine (300g)", quantity: 1, customer: "", date: "" },
  { name: "Testosterone 21 Fadogia + Longjack Duo (120 tabl)", quantity: 1, customer: "", date: "" },
  { name: "BCAA Magnesium Vitamin D (330 ml)", quantity: 1, customer: "", date: "" },
  { name: "Aurora exoFlex 30 multi pack до 11/2026", quantity: 1, customer: "", date: "" },
  { name: "Aurora exoFlex 30 multi pack до 02/2026 (просрочка)", quantity: 1, customer: "", date: "" },
  { name: "California Gold Nutrition SAMe (400 mg 60 tabls)", quantity: 1, customer: "", date: "" },
  { name: "Nordic Naturals Complete Omega (60 soft gels)", quantity: 1, customer: "", date: "" },
  { name: "Aurora Nutrascience Liposomal B-Complex (32 single-serve)", quantity: 4, customer: "", date: "" },
  { name: "Host Defense Mushrooms Mycobotanicals Brain (60 caps)", quantity: 1, customer: "", date: "" },
  { name: "Mommys Bliss Kids sleep liquid (120 ml)", quantity: 1, customer: "", date: "" },
  { name: "EFX Sports Aminozorb Elite21 (390g - Orange splash)", quantity: 1, customer: "", date: "" },
  { name: "Paradise Collagen Extreme (120 caps)", quantity: 1, customer: "", date: "" },
  { name: "Designs for health Vitamin D Supreme 5,000 IU D3 and vitamin K1, K2 (60 caps)", quantity: 1, customer: "", date: "" },
  { name: "Now Thyroid Energy (90 caps)", quantity: 1, customer: "", date: "" },
  { name: "Nutricost Agmatine (100g)", quantity: 1, customer: "", date: "" },
  { name: "Allmax Peak02 (100g)", quantity: 1, customer: "", date: "" },
  { name: "Allmax Arachidonic Acid+ (120 caps)", quantity: 1, customer: "", date: "" },
  { name: "Aurora Sleep Support (100 ml)", quantity: 3, customer: "", date: "" },
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
