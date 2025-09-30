import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function Content({ view, theme, toggleTheme }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({ name: "", quantity: "", customer: "", date: "", image: "" });
  const [editIndex, setEditIndex] = useState(null);
  const [search, setSearch] = useState("");
  const [shipmentList, setShipmentList] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/products");
        // Додаємо зображення для кожного товару
        const productsWithImages = response.data.map(product => ({
          ...product,
          image: getProductImage(product.name) // Функція для визначення зображення
        }));
        setProducts(productsWithImages);
      } catch (err) {
        setError("Не вдалося завантажити товари");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Функція для визначення URL зображення за назвою товару (з плейсхолдерами)
  const getProductImage = (name) => {
    const imageMap = {
      "Glucosamine, Chondroitin, MSM plus Hyaluronic Acid (120 caps)": "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/cgn/cgn01071/v/95.jpg",
      "Glucosamine, Chondroitin, MSM plus Hyaluronic Acid (60 caps)": "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/cgn/cgn01470/v/74.jpg",
      "SAMe (400 mg)": "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/cgn/cgn01177/v/61.jpg",
      "Black Maca (60 capsules)": "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/foa/foa01488/v/88.jpg",
      "Probolic-SR (1940g)": "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/mhp/mhp00969/v/8.jpg",
      "Dark Matter (1560g)": "https://fair.ua/image/cache/catalog/photo_prod/11953158/0_mhp-dark-matter-1560-3-44-1200x1200.jpg", // Твій URL, чистий
      "Blade Isolate (30g)": "https://cdn.27.ua/sc--media--prod/default/fa/34/36/fa343639-4864-4423-b1a7-3da09a997ef9.jpg",
      "Beef-XP (150g)": "https://cdn.dsmcdn.com/ty1721/prod/QC_PREP/20250806/15/ca8b0f20-3fff-3cdd-b74d-8399acd18829/1_org_zoom.jpg",
      "Hyper Crush (453g)": "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/mhp/mhp00998/l/8.jpg",
      "Urolithin A NAD+ (120 caps)": "https://content2.rozetka.com.ua/goods/images/big/461240529.jpg",
      "Cortisol Health (120 caps)": "https://sfs.in.ua/image/cache/catalog/image/cache/catalog/totariahealthcortisolhealth10-in-1120caps-240x159.webp",
      "Animal stak Comprehensive Support Pack (132g)": "https://bodymarket.ua/img/p/6/2/3/3/6233-thickbox_default.jpg",
      "Animal stak Comprehensive Non-Hormonal Pack (213g)": "https://proteinchik.com.ua/media/catalog/product/cache/86c09c8a9880d08b8d2931d1691b11a4/m/s/mstak_feb2023_1.jpeg",
      "Amino power Liquid (500ml)": "https://f3.in.ua/content/images/31/600x600l80nn50/nutrend-amino-power-liquid-500ml-49332321870098.webp",
      "MST MSM1000": "https://mstnutrition.ua/wp-content/uploads/2021/04/MSM-2-1024x1024.png",
      "The last emperor (240 caps)": "https://100kg.in.ua/image/cache/catalog/fitnessnutrition/242/IMG2425651bfb955663f187fe06dfee10e6-1000x1000.jpg",
      "Bee propolis (120 caps)": "https://pwa-api.eva.ua/img/512/512/resize/8/5/859929_1_1722009330.jpg",
      "Phosphatidyl Serine (60 caps)": "https://powerway.com.ua/upload/iblock/2f6/r2y7hbckgieklsty1innwq705evl2755.jpg",
      "Forskolin (60 cups)": "https://m.media-amazon.com/images/I/61mF8HoUduL.jpg_BO30,255,255,255_UF900,850_SR1910,1000,0,C_QL100_.jpg",
      "Testofx (80 caps)": "https://www.rhinomuscle.com/image/cache/catalog/Images_Product/Allmax-Nutrition/TESTOFX-1-600x315.jpg",
      "Crass-fed Bone Marrow (180 caps)": "https://bio.org.ua/cache/i/d7/34/26717/530.jpg",
      "Serrapeptase (120 caps)": "https://static1.biotus.ua/media/catalog/product/n/c/ncs-67399_1.jpg?store=rus&image-type=image",
      "Liposomal Vitamin C (20 mL)": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIWLs-i3KmEWaF0HQDZxfJldrjaJnNz6Dr-m2sNGpNaJu8Wik5kT6JwVEy995HQgO6qjI&usqp=CAU",
      "Liposomal Glutathione (20 mL)": "https://static1.biotus.ua/media/optimization/catalog/product/700/3/7/37aurora_nutrascience_mega-pack__1_jpg.webp",
      "EAA STRONG (308g)": "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/mhp/mhp00964/l/8.jpg",
      "Magnesium 12-in-1 Complex (120 caps)": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAYyfTjJwr8d2mR9OlvuyPCVfnEBElm91OYg&s",
      "LongJack (30caps)": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkV0D58ACk0RbcZEZpfwokoiUum7sPXtkWtA&s",
      "Methylene Blue (120 caps)": "https://img.staticdj.com/35c50a4f1c440517d35ca828442fae23.jpg",
      "Vitamin B Complex Plus 13-in-1 (120 caps)": "https://m.media-amazon.com/images/I/71QhN64hI3L._UF894,1000_QL80_.jpg",
      "ANADROX Pump&Burn (224 cups)": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3BcbAYP_ArXJPzGwQNiMaM_d5ZU4fE13d8g&s",
      "C.G.P - Creatine Glycerol Phosphate (400 grams)": "https://m.media-amazon.com/images/I/61-IQRr26qL._UF894,1000_QL80_.jpg",
      "Aurora Micro-Pack exoFlex": "https://static1.biotus.ua/media/catalog/product/a/u/aun-64822.png?store=rus&image-type=image",
    };
    return imageMap[name] || "https://via.placeholder.com/150?text=No+Image"; // За замовчуванням, якщо не знайдено
  };

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
    setForm({ name: "", quantity: "", customer: "", date: "", image: "" });
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
        <input type="text" name="image" placeholder="URL зображення" value={form.image} onChange={handleChange} />
        <button type="submit">{editIndex !== null ? "Зберегти" : "Додати"}</button>
      </form>
      <div className="product-grid">
        {filteredProducts.map((p, i) => (
          <div key={i} className="product-card">
            {p.image && <img src={p.image} alt={p.name} className="product-image" />}
            <div className="product-name">{p.name}</div>
            <div className="product-quantity">Кількість: {p.quantity}</div>
            <div className="button-row">
              <button onClick={() => handleEdit(i)}>✏️</button>
              <button onClick={() => handleDelete(i)}>❌</button>
              <button onClick={() => handleSend(i)}>✉️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Content;


































