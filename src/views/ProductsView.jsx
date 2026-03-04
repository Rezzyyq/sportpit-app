import { useMemo, useState } from "react";
import { getProductImage } from "../utils/productImages";

export default function ProductsView({ products, setProducts, onSend }) {
  const [form, setForm] = useState({ name: "", quantity: "", customer: "", date: "", image: "" });
  const [editIndex, setEditIndex] = useState(null);
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(
    () => products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase())),
    [products, search],
  );

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAddOrEdit = (e) => {
    e.preventDefault();
    if (!form.name || !form.quantity) return;

    const newProduct = { ...form, image: form.image || getProductImage(form.name) };
    if (editIndex !== null) {
      const updated = [...products];
      updated[editIndex] = newProduct;
      setProducts(updated);
      setEditIndex(null);
    } else {
      setProducts([...products, newProduct]);
    }

    setForm({ name: "", quantity: "", customer: "", date: "", image: "" });
  };

  const handleDelete = (index) => {
    if (window.confirm("Видалити товар?")) {
      const updated = [...products];
      updated.splice(index, 1);
      setProducts(updated);
    }
  };

  const handleEdit = (index) => {
    setForm(products[index]);
    setEditIndex(index);
  };

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
        <input type="text" name="image" placeholder="URL зображення" value={form.image} onChange={handleChange} />
        <button type="submit">{editIndex !== null ? "Зберегти" : "Додати"}</button>
      </form>

      <div className="product-grid">
        {filteredProducts.map((p, i) => {
          const originalIndex = products.findIndex((candidate) => candidate === p);
          return (
            <div key={i} className="product-card">
              {p.image && <img src={p.image} alt={p.name} className="product-image" />}
              <div className="product-name">{p.name}</div>
              <div className="product-quantity">Кількість: {p.quantity}</div>
              <div className="button-row">
                <button onClick={() => handleEdit(originalIndex)}>✏️</button>
                <button onClick={() => handleDelete(originalIndex)}>❌</button>
                <button onClick={() => onSend(originalIndex)}>✉️</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
