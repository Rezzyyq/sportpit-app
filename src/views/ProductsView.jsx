import { useMemo, useState } from "react";
import { getProductImage } from "../utils/productImages";

export default function ProductsView({ products, onCreate, onUpdate, onDelete, onSend, actionError }) {
  const [form, setForm] = useState({ name: "", quantity: "", customer: "", date: "", image: "" });
  const [editId, setEditId] = useState(null);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [shippingProduct, setShippingProduct] = useState(null);
  const [shippingForm, setShippingForm] = useState({ customer: "", date: "" });
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
    if (pendingDeleteId === id) {
      await onDelete(id);
      setPendingDeleteId(null);
      return;
    }

    setPendingDeleteId(id);
  };

  const handleStartShipment = (product) => {
    setShippingProduct(product);
    setShippingForm({
      customer: product.customer || "",
      date: product.date || new Date().toISOString().slice(0, 10),
    });
  };

  const handleShipmentSubmit = async (e) => {
    e.preventDefault();
    if (!shippingProduct || !shippingForm.customer || !shippingForm.date) return;

    const result = await onSend(shippingProduct, shippingForm);
    if (result.ok) {
      setShippingProduct(null);
      setShippingForm({ customer: "", date: "" });
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

      {shippingProduct && (
        <form onSubmit={handleShipmentSubmit} className="shipment-form">
          <strong>Відправка: {shippingProduct.name}</strong>
          <input
            type="text"
            placeholder="Кому"
            value={shippingForm.customer}
            onChange={(e) => setShippingForm({ ...shippingForm, customer: e.target.value })}
            required
          />
          <input
            type="date"
            value={shippingForm.date}
            onChange={(e) => setShippingForm({ ...shippingForm, date: e.target.value })}
            required
          />
          <button type="submit">Зберегти відправку</button>
          <button type="button" onClick={() => setShippingProduct(null)}>Скасувати</button>
        </form>
      )}

      <div className="product-grid">
        {filteredProducts.map((p) => (
          <div key={p._id} className="product-card">
            {p.image && <img src={p.image} alt={p.name} className="product-image" />}
            <div className="product-name">{p.name}</div>
            <div className="product-quantity">Кількість: {p.quantity}</div>
            <div className="button-row">
              <button type="button" onClick={() => handleEdit(p)} aria-label={`Редагувати ${p.name}`}>Редаг.</button>
              <button type="button" onClick={() => handleDelete(p._id)} aria-label={`Видалити ${p.name}`}>
                {pendingDeleteId === p._id ? "Так?" : "Видал."}
              </button>
              <button type="button" onClick={() => handleStartShipment(p)} aria-label={`Відправити ${p.name}`}>Відпр.</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
