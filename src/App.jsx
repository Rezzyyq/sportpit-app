// App.jsx
import { useState, useEffect } from "react";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Меню</h2>
      <ul>
        <li>📦 Товари</li>
        <li>📊 Статистика</li>
        <li>⚙️ Налаштування</li>
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

function Content() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", quantity: "", customer: "", date: "" });
  const [editIndex, setEditIndex] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("products");
    if (saved) setProducts(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAddOrEdit = (e) => {
    e.preventDefault();
    if (!form.name || !form.quantity || !form.customer || !form.date) return;
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

  const handleDelete = (index) => {
    if (window.confirm("Ви впевнені, що хочете видалити цей товар?")) {
      const updated = [...products];
      updated.splice(index, 1);
      setProducts(updated);
    }
  };

  const handleEdit = (index) => setForm(products[index]) || setEditIndex(index);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.customer.toLowerCase().includes(search.toLowerCase())
  );

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
        <input type="text" name="customer" placeholder="Кому відправлено" value={form.customer} onChange={handleChange} required />
        <input type="date" name="date" value={form.date} onChange={handleChange} required />
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
                <th>Кому</th>
                <th>Дата</th>
                <th>Дії</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p, i) => (
                <tr key={i} className={i % 2 === 0 ? "even" : "odd"}>
                  <td>{p.name}</td>
                  <td>{p.quantity}</td>
                  <td>{p.customer}</td>
                  <td>{p.date}</td>
                  <td>
                    <button onClick={() => handleEdit(i)} className="edit-btn">✏️</button>
                    <button onClick={() => handleDelete(i)} className="delete-btn">❌</button>
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
  return (
    <div className="app">
      <Sidebar />
      <div className="main">
        <Header />
        <Content />
      </div>
    </div>
  );
}

<div className="app">
  <Sidebar />
  <div className="main">
    <Header />
    <Content />
  </div>
</div>

export default App;

