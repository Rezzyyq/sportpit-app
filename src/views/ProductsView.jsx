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
    setPendingDeleteId(null);
  };

  return (
    <div className="content">
      <section className="panel catalog-hero">
        <div>
          <p className="eyebrow">Каталог</p>
          <h2>Товари на складі</h2>
          <p>Додавай позиції, редагуй залишки і готуй відправки з одного екрану.</p>
        </div>
        <div className="catalog-count">
          <strong>{filteredProducts.length}</strong>
          <span>{filteredProducts.length === 1 ? "позиція" : "позицій"}</span>
        </div>
      </section>

      {actionError && (
        <p className="inline-error" role="alert">
          Помилка: {actionError}
        </p>
      )}

      <label className="search-field">
        <span>Пошук товару</span>
        <input
          type="text"
          placeholder="Наприклад: Creatine"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </label>

      <form onSubmit={handleAddOrEdit} className="product-form">
        <div className="form-heading">
          <h3>{editId ? "Редагування товару" : "Новий товар"}</h3>
          {editId && (
            <button type="button" className="ghost-action" onClick={resetForm}>
              Скасувати редагування
            </button>
          )}
        </div>
        <label>
          <span>Назва товару</span>
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          <span>Кількість</span>
          <input type="number" min="0" name="quantity" value={form.quantity} onChange={handleChange} required />
        </label>
        <label>
          <span>URL зображення</span>
          <input type="url" name="image" value={form.image} onChange={handleChange} placeholder="Необов'язково" />
        </label>
        <button type="submit" className="primary-action">
          {editId ? "Зберегти зміни" : "Додати товар"}
        </button>
      </form>

      {shippingProduct && (
        <form onSubmit={handleShipmentSubmit} className="shipment-form">
          <strong>Відправка: {shippingProduct.name}</strong>
          <label>
            <span>Отримувач</span>
            <input
              type="text"
              value={shippingForm.customer}
              onChange={(e) => setShippingForm({ ...shippingForm, customer: e.target.value })}
              required
            />
          </label>
          <label>
            <span>Дата</span>
            <input
              type="date"
              value={shippingForm.date}
              onChange={(e) => setShippingForm({ ...shippingForm, date: e.target.value })}
              required
            />
          </label>
          <button type="submit" className="primary-action">Зберегти відправку</button>
          <button type="button" className="ghost-action" onClick={() => setShippingProduct(null)}>
            Скасувати
          </button>
        </form>
      )}

      {filteredProducts.length === 0 ? (
        <div className="empty-state">
          <h3>Нічого не знайдено</h3>
          <p>Спробуй інший запит або додай новий товар через форму вище.</p>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((p) => (
            <article key={p._id} className="product-card">
              {p.image && <img src={p.image} alt={p.name} className="product-image" />}
              <div className="product-card-body">
                <h3 className="product-name">{p.name}</h3>
                <p className="product-quantity">Кількість: {p.quantity}</p>
                {p.customer && p.date && (
                  <p className="shipment-note">Відправка: {p.customer}, {p.date}</p>
                )}
              </div>
              <div className="button-row">
                <button type="button" onClick={() => handleEdit(p)} aria-label={`Редагувати ${p.name}`}>
                  Редагувати
                </button>
                <button type="button" onClick={() => handleDelete(p._id)} aria-label={`Видалити ${p.name}`}>
                  {pendingDeleteId === p._id ? "Підтвердити" : "Видалити"}
                </button>
                <button type="button" onClick={() => handleStartShipment(p)} aria-label={`Відправити ${p.name}`}>
                  Відправити
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
