import { useState } from "react";
import Content from "./Content";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "./App.css";

function App() {
  const [view, setView] = useState("products");
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <div className={`app ${theme}`}>
      <Sidebar activeView={view} onSelect={setView} />

      <div className="main-content">
        <Header />
        <Content view={view} theme={theme} toggleTheme={toggleTheme} />
      </div>
    </div>
  );
}

export default App;
