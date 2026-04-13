import dotenv from "dotenv";
import app from "./app.js";
import connectDatabase from "./utils/connectDatabase.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

connectDatabase()
  .then(() => console.log("Підключено до MongoDB"))
  .catch((err) => console.log("Помилка підключення до MongoDB:", err));

app.listen(PORT, () => {
  console.log(`Сервер запущено на http://localhost:${PORT}`);
});
