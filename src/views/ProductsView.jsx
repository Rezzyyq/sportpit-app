import { useMemo, useState } from "react";
import { getProductImage } from "../utils/productImages";

export default function ProductsView({ products, onCreate, onUpdate, onDelete, onSend, actionError }) {
  const [form, setForm] = useState({ name: "", quantity: "", customer: "", date: "", image: "" });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(
    () => products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase())),
    [products, search],
  );

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const resetForm = () => {
    setForm({ name: "", quantity: "", customer: "", date: "", image: "" });
    setEditId(null);
  };

  const handleAddOrEdit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.quantity) return;

    const payload = {
      ...form,
      image: form.image || getProductImage(form.name),
      quantity: Number(form.quantity),
    };

    if (editId) {
      const result = await onUpdate(editId, payload);
      if (result.ok) resetForm();
      return;
    }

    const result = await onCreate(payload);
    if (result.ok) resetForm();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Видалити товар?")) {
      await onDelete(id);
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      quantity: String(product.quantity),
      customer: product.customer || "",
      date: product.date || "",
      image: product.image || "",
    });
    setEditId(product._id);
  };

  return (
    <div className="content">
      {actionError && <p style={{ color: "#ff6b6b" }}>Помилка: {actionError}</p>}

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
        <input type="text" name="image" placeholder="URL зображення" value={form.image} onChange={handleChange} />
        <button type="submit">{editId ? "Зберегти" : "Додати"}</button>
      </form>

      <div className="product-grid">
        {filteredProducts.map((p) => (
          <div key={p._id} className="product-card">
            {p.image && <img src={p.image} alt={p.name} className="product-image" />}
            <div className="product-name">{p.name}</div>
            <div className="product-quantity">Кількість: {p.quantity}</div>
            <div className="button-row">
              <button type="button" onClick={() => handleEdit(p)}>✏️</button>
              <button type="button" onClick={() => handleDelete(p._id)}>❌</button>
              <button type="button" onClick={() => onSend(p)}>✉️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
