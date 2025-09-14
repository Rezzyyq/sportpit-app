import { useState } from "react";
import Content from "./Content";
import "./App.css";

function App() {
  const [view, setView] = useState("products"); // products, stats, shipment, settings
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <div className={`app ${theme}`}>
      <div className="sidebar">
        <h2>Меню</h2>
        <button onClick={() => setView("products")}>Каталог товарів</button>
        <button onClick={() => setView("stats")}>Статистика</button>
        <button onClick={() => setView("shipment")}>Відправка</button>
        <button onClick={() => setView("settings")}>Налаштування</button>
      </div>

      <div className="main-content">
        <header className="site-header">
          <h1>Офіцерський пептид</h1>
        </header>
        <Content view={view} theme={theme} toggleTheme={toggleTheme} />
      </div>
    </div>
  );
}

export default App;




















 












