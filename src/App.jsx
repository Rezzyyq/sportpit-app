import { useState, useEffect } from "react";

// Компоненти Sidebar і Header можна зробити прямо тут
function Sidebar() {
  return (
    <div className="sidebar">
      <h2 style={{ color: "#fff", textAlign: "center" }}>Меню</h2>
      <ul style={{ listStyle: "none", padding: "0", color: "#fff" }}>
        <li>📦 Товари</li>
        <li>📊 Статистика</li>
        <li>⚙️ Налаштування</li>
      </ul>
    </div>
  );
}

function Header() {
  return (
    <div className="header">
      <h1>📦 Офіцерський пептід</h1>
    </div>
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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

  const handleEdit = (index) => {
    setForm(products[index]);
    setEditIndex(index);
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.customer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="content">
      <div style={{ padding: "20px" }}>
        {/* Пошук */}
        <input
          type="text"
          placeholder="🔍 Пошук за назвою або клієнтом"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "5px",
            border: "none",
            fontSize: "16px",
          }}
        />

        {/* Форма */}
        <form
          onSubmit={handleAddOrEdit}
          style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "20px" }}
        >
          <input type="text" name="name" placeholder="Назва товару" value={form.name} onChange={handleChange} required style={inputStyle}/>
          <input type="number" name="quantity" placeholder="Кількість" value={form.quantity} onChange={handleChange} required style={inputStyle}/>
          <input type="text" name="customer" placeholder="Кому відправлено" value={form.customer} onChange={handleChange} required style={inputStyle}/>
          <input type="date" name="date" value={form.date} onChange={handleChange} required style={inputStyle}/>
          <button type="submit" style={buttonStyle}>{editIndex !== null ? "✏️ Зберегти" : "➕ Додати"}</button>
        </form>

        {/* Таблиця */}
        <div style={{ overflowY: "auto", maxHeight: "calc(100vh - 250px)" }}>
          {filteredProducts.length === 0 ? (
            <p style={{ textAlign: "center" }}>Немає даних</p>
          ) : (
            <table style={tableStyle}>
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
                  <tr key={i} style={{ background: i % 2 === 0 ? "#1f1f1f" : "#2a2a2a" }}>
                    <td>{p.name}</td>
                    <td>{p.quantity}</td>
                    <td>{p.customer}</td>
                    <td>{p.date}</td>
                    <td style={{ display: "flex", gap: "5px" }}>
                      <button onClick={() => handleEdit(i)} style={editButtonStyle}>✏️</button>
                      <button onClick={() => handleDelete(i)} style={deleteButtonStyle}>❌</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

// Стилі
const inputStyle = {
  padding: "10px",
  borderRadius: "5px",
  border: "none",
  fontSize: "14px",
  flex: "1 1 200px",
};

const buttonStyle = {
  padding: "10px 20px",
  borderRadius: "5px",
  border: "none",
  background: "#4caf50",
  color: "#fff",
  cursor: "pointer",
  fontSize: "14px",
};

const editButtonStyle = {
  padding: "5px 10px",
  borderRadius: "5px",
  border: "none",
  background: "#2196f3",
  color: "#fff",
  cursor: "pointer",
};

const deleteButtonStyle = {
  padding: "5px 10px",
  borderRadius: "5px",
  border: "none",
  background: "#f44336",
  color: "#fff",
  cursor: "pointer",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: "14px",
};

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <Content />
      </div>
    </div>
  );
}

export default App;





