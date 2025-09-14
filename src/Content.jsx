import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function Content({ view, theme, toggleTheme }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({ name: "", quantity: "", customer: "", date: "" });
  const [editIndex, setEditIndex] = useState(null);
  const [search, setSearch] = useState("");
  const [shipmentList, setShipmentList] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (err) {
        setError("Не вдалося завантажити товари");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

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

  const handleEdit = (i) => {
    setForm(products[i]);
    setEditIndex(i);
  };

  const handleSend = (i) => {
    const prod = products[i];
    const name = prompt("Кому відправлено?", prod.customer || "");
    const date = prompt("Введіть дату (YYYY-MM-DD)", prod.date || "");
    if (name && date) {
      const updated = [...products];
      updated[i] = { ...prod, customer: name, date };
      setProducts(updated);
      setShipmentList([...shipmentList, { ...prod, customer: name, date }]);
    }
  };

  const filteredProducts = Array.isArray(products) ? products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  ) : [];

  if (loading) return <div className="content">Завантаження...</div>;
  if (error) return <div className="content">Помилка: {error}</div>;

  if (view === "stats") {
    const totalQuantity = products.reduce((acc, p) => acc + Number(p.quantity), 0);
    return (
      <div className="content">
        <h2>Статистика</h2>
        <div>📦 Всього товарів: {products.length}</div>
        <div>📊 Загальна кількість: {totalQuantity}</div>
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
        <h2>Відправка товарів</h2>
        {shipmentList.length === 0 ? <p>Немає відправлених товарів</p> :
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
        </table>}
      </div>
    );
  }

  return (
    <div className="content">
      <input
        type="text"
        placeholder="Пошук..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
      <form onSubmit={handleAddOrEdit} className="form">
        <input type="text" name="name" placeholder="Назва товару" value={form.name} onChange={handleChange} required />
        <input type="number" name="quantity" placeholder="Кількість" value={form.quantity} onChange={handleChange} required />
        <button type="submit">{editIndex !== null ? "Зберегти" : "Додати"}</button>
      </form>
      <div className="product-grid">
        {filteredProducts.map((p, i) => (
          <div key={i} className="product-card">
            <div>{p.name}</div>
            <div>{p.quantity}</div>
            <button onClick={() => handleEdit(i)}>✏️</button>
            <button onClick={() => handleDelete(i)}>❌</button>
            <button onClick={() => handleSend(i)}>✉️</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Content;































