import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function Content({ view, theme, toggleTheme }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({ name: "", quantity: "" });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [shipmentList, setShipmentList] = useState([]);

  const API_URL = "http://localhost:5000/api/products";

  // ⬇ Завантажуємо товари з бекенду
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setProducts(res.data);
    } catch (err) {
      setError("Не вдалося завантажити товари");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // ⬇ Додати або редагувати товар
  const handleAddOrEdit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.quantity) return;

    try {
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, form);
        setEditId(null);
      } else {
        await axios.post(API_URL, form);
      }
      setForm({ name: "", quantity: "" });
      fetchProducts(); // оновлюємо список після зміни
    } catch (err) {
      console.error(err);
    }
  };

  // ⬇ Видалення товару
  const handleDelete = async (id) => {
    if (!window.confirm("Видалити товар?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  // ⬇ Редагування товару
  const handleEdit = (product) => {
    setForm({ name: product.name, quantity: product.quantity });
    setEditId(product._id);
  };

  // ⬇ Відправка товару
  const handleSend = (product) => {
    const name = prompt("Кому відправлено?", product.customer || "");
    const date = prompt("Введіть дату (YYYY-MM-DD)", product.date || "");
    if (name && date) {
      const updatedProduct = { ...product, customer: name, date };
      setShipmentList([...shipmentList, updatedProduct]);
    }
  };

  const filteredProducts = Array.isArray(products)
    ? products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    : [];

  if (loading) return <div className="content">Завантаження...</div>;
  if (error) return <div className="content">Помилка: {error}</div>;

  // ⬇ Статистика
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

  // ⬇ Налаштування
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

  // ⬇ Відправка товарів
  if (view === "shipment") {
    return (
      <div className="content">
        <h2>Відправка товарів</h2>
        {shipmentList.length === 0 ? (
          <p>Немає відправлених товарів</p>
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

  // ⬇ Каталог товарів
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
        <button type="submit">{editId ? "Зберегти" : "Додати"}</button>
      </form>

      <div className="product-grid">
        {filteredProducts.map((p) => (
          <div key={p._id} className="product-card">
            <div>{p.name}</div>
            <div>{p.quantity}</div>
            <button onClick={() => handleEdit(p)}>✏️</button>
            <button onClick={() => handleDelete(p._id)}>❌</button>
            <button onClick={() => handleSend(p)}>✉️</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Content;

































