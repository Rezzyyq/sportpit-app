import { useState, useEffect } from "react";
import './App.css';

const initialProducts = [
  { name: "Glucosamine, Chondroitin, MSM plus Hyaluronic Acid (120 caps)", quantity: 3, customer: "", date: "" },
  { name: "Glucosamine, Chondroitin, MSM plus Hyaluronic Acid (60 caps)", quantity: 2, customer: "", date: "" },
  { name: "Ashwagandha (450 mg)", quantity: 1, customer: "", date: "" },
  { name: "SAMe (400 mg)", quantity: 1, customer: "", date: "" },
  { name: "Nutrex CREATINE MONOHYDRATE (300g)", quantity: 1, customer: "", date: "" },
  { name: "MHP Anadrox Pump&Burn (279g)", quantity: 1, customer: "", date: "" },
  { name: "Black Maca (60 capsules)", quantity: 1, customer: "", date: "" },
  { name: "Probolic-SR (1940g)", quantity: 3, customer: "", date: "" },
  { name: "Cell TECH Creator (274g)", quantity: 2, customer: "", date: "" },
  { name: "Dark Matter (1560g)", quantity: 4, customer: "", date: "" },
  { name: "Blade Isolate (30g)", quantity: 1, customer: "", date: "" },
  { name: "Probolic-SR (37g)", quantity: 1, customer: "", date: "" },
  { name: "Hyper Crush (15g)", quantity: 1, customer: "", date: "" },
  { name: "Dark Matter (78g)", quantity: 1, customer: "", date: "" },
  { name: "Beef-XP (150g)", quantity: 1, customer: "", date: "" },
  { name: "AMINOx EAAs (375g)", quantity: 1, customer: "", date: "" },
  { name: "Hyper Crush (453g)", quantity: 2, customer: "", date: "" },
  { name: "Urolithin A NAD+ (120 caps)", quantity: 1, customer: "", date: "" },
  { name: "Complete B-Complex (60 caps)", quantity: 1, customer: "", date: "" },
  { name: "Cortisol Health (120 caps)", quantity: 2, customer: "", date: "" },
  { name: "Animal stak Comprehensive Support Pack (132g)", quantity: 1, customer: "", date: "" },
  { name: "Animal stak Comprehensive Non-Hormonal Pack (213g)", quantity: 1, customer: "", date: "" },
  { name: "Amino power Liquid (500ml)", quantity: 1, customer: "", date: "" },
  { name: "MST MSM1000", quantity: 1, customer: "", date: "" },
  { name: "The last emperor (240 caps)", quantity: 1, customer: "", date: "" },
  { name: "Bee propolis (120 caps)", quantity: 1, customer: "", date: "" },
  { name: "Phosphatidyl Serine (60 caps)", quantity: 1, customer: "", date: "" },
  { name: "Forskolin (60 cups)", quantity: 1, customer: "", date: "" },
  { name: "Pre training Catalyst (17g)", quantity: 1, customer: "", date: "" },
  { name: "Bluelab whey (26g)", quantity: 1, customer: "", date: "" },
  { name: "Testofx (80 caps)", quantity: 1, customer: "", date: "" },
  { name: "Crass-fed Bone Marrow (180 caps)", quantity: 1, customer: "", date: "" },
  { name: "PEA with PQQ (90 caps)", quantity: 1, customer: "", date: "" },
  { name: "Serrapeptase (120 caps)", quantity: 1, customer: "", date: "" },
  { name: "Liposomal Vitamin C (20 mL)", quantity: 2, customer: "", date: "" },
  { name: "Liposomal Glutathione (20 mL)", quantity: 1, customer: "", date: "" },
  { name: "Ultra-Liposomal Sleep Support (300mL)", quantity: 5, customer: "", date: "" },
  { name: "EAA STRONG (308g)", quantity: 1, customer: "", date: "" },
  { name: "Magnesium 12-in-1 Complex (120 caps)", quantity: 2, customer: "", date: "" },
  { name: "LongJack (30caps)", quantity: 1, customer: "", date: "" },
  { name: "Methylene Blue (120 caps)", quantity: 1, customer: "", date: "" },
  { name: "Vitamin B Complex Plus 13-in-1 (120 caps)", quantity: 2, customer: "", date: "" }
];

function Sidebar({ onSelect, activeView }) {
  return (
    <div className="sidebar">
      <h2>Меню</h2>
      <ul>
        <li className={activeView === "products" ? "active" : ""} onClick={() => onSelect("products")}>📦 Товари</li>
        <li className={activeView === "shipment" ? "active" : ""} onClick={() => onSelect("shipment")}>✉️ Відправка</li>
        <li className={activeView === "stats" ? "active" : ""} onClick={() => onSelect("stats")}>📊 Статистика</li>
        <li className={activeView === "settings" ? "active" : ""} onClick={() => onSelect("settings")}>⚙️ Налаштування</li>
      </ul>
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>📦 Офіцерський пептід</h1>
    </header>
  );
}

function Content({ view, theme, toggleTheme }) {
  const [products, setProducts] = useState(() => {
    return JSON.parse(localStorage.getItem("products")) || initialProducts;
  });
  const [form, setForm] = useState({ name: "", quantity: "", customer: "", date: "" });
  const [editIndex, setEditIndex] = useState(null);
  const [search, setSearch] = useState("");
  const [shipmentList, setShipmentList] = useState([]);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAddOrEdit = (e) => {
    e.preventDefault();
    if (!form.name || !form.quantity) return;
    if (editIndex !== null) {
      const updated = [...products];
      updated[editIndex] = form;
      setProducts(updated);
      setEditIndex(null);
    } else {
      setProducts([...products, form]);
    }
    setForm({ name: "", quantity: "", customer: "", date: "" });
  };

  const handleDelete = (i) => {
    if (window.confirm("Видалити товар?")) {
      const updated = [...products];
      updated.splice(i, 1);
      setProducts(updated);
    }
  };

  const handleEdit = (i) => setForm(products[i]) || setEditIndex(i);

  const handleSend = (i) => {
    const prod = products[i];
    const name = prompt("Кому відправлено?", prod.customer || "");
    const date = prompt("Введіть дату відправки (YYYY-MM-DD)", prod.date || "");
    if (name && date) {
      const updated = [...products];
      updated[i] = { ...prod, customer: name, date };
      setProducts(updated);
      setShipmentList([...shipmentList, { ...prod, customer: name, date }]);
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (view === "stats") {
    const totalQuantity = products.reduce((acc, p) => acc + Number(p.quantity), 0);
    return (
      <div className="content">
        <div className="stats">
          <div>📦 Всього товарів: {products.length}</div>
          <div>📊 Загальна кількість: {totalQuantity}</div>
        </div>
      </div>
    );
  }

  if (view === "settings") {
    return (
      <div className="content">
        <h2>⚙️ Налаштування сайту</h2>
        <button onClick={toggleTheme}>
          {theme === "dark" ? "Світла тема" : "Темна тема"}
        </button>
      </div>
    );
  }

  if (view === "shipment") {
    return (
      <div className="content">
        <h2>✉️ Відправка товарів</h2>
        {shipmentList.length === 0 ? (
          <p className="no-data">Немає відправлених товарів</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Назва</th>
                <th>Кількість</th>
                <th>Кому</th>
                <th>Дата</th>
              </tr>
            </thead>
            <tbody>
              {shipmentList.map((p, i) => (
                <tr key={i}>
                  <td>{p.name}</td>
                  <td>{p.quantity}</td>
                  <td>{p.customer}</td>
                  <td>{p.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }

  // Default: products view
  return (
    <div className="content">
      <input
        type="text"
        placeholder="🔍 Пошук"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
      <form onSubmit={handleAddOrEdit} className="form">
        <input type="text" name="name" placeholder="Назва товару" value={form.name} onChange={handleChange} required />
        <input type="number" name="quantity" placeholder="Кількість" value={form.quantity} onChange={handleChange} required />
        <button type="submit">{editIndex !== null ? "✏️ Зберегти" : "➕ Додати"}</button>
      </form>

      <div className="table-container">
        {filteredProducts.length === 0 ? (
          <p className="no-data">Немає даних</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Назва</th>
                <th>Кількість</th>
                <th>Дії</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p, i) => (
                <tr key={i}>
                  <td>{p.name}</td>
                  <td>{p.quantity}</td>
                  <td>
                    <button onClick={() => handleEdit(i)} className="edit-btn">✏️</button>
                    <button onClick={() => handleDelete(i)} className="delete-btn">❌</button>
                    <button onClick={() => handleSend(i)} className="send-btn">✉️ Відправити</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function App() {
  const [view, setView] = useState("products");
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === "dark" ? "light" : "dark"));

  return (
    <div className="app">
      <Sidebar onSelect={setView} activeView={view} />
      <div className="main">
        <Header />
        <Content view={view} theme={theme} toggleTheme={toggleTheme} />
      </div>
    </div>
  );
}

export default App;




 












