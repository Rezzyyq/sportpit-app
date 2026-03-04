import useProducts from "./hooks/useProducts";
import ProductsView from "./views/ProductsView";
import SettingsView from "./views/SettingsView";
import ShipmentView from "./views/ShipmentView";
import StatsView from "./views/StatsView";
import { useState } from "react";
import "./App.css";

function Content({ view, theme, toggleTheme }) {
  const { products, setProducts, loading, error } = useProducts();
  const [shipmentList, setShipmentList] = useState([]);

  const handleSend = (index) => {
    const product = products[index];
    const name = prompt("Кому відправлено?", product.customer || "");
    const date = prompt("Введіть дату (YYYY-MM-DD)", product.date || "");

    if (name && date) {
      const updated = [...products];
      updated[index] = { ...product, customer: name, date };
      setProducts(updated);
      setShipmentList([...shipmentList, { ...product, customer: name, date }]);
    }
  };

  if (loading) return <div className="content">Завантаження...</div>;
  if (error) return <div className="content">Помилка: {error}</div>;

  if (view === "stats") return <StatsView products={products} />;
  if (view === "settings") return <SettingsView theme={theme} toggleTheme={toggleTheme} />;
  if (view === "shipment") return <ShipmentView shipmentList={shipmentList} />;

  return <ProductsView products={products} setProducts={setProducts} onSend={handleSend} />;
}

export default Content;
