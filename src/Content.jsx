import useProducts from "./hooks/useProducts";
import ProductsView from "./views/ProductsView";
import SettingsView from "./views/SettingsView";
import ShipmentView from "./views/ShipmentView";
import StatsView from "./views/StatsView";
import "./App.css";

function Content({ view, theme, toggleTheme }) {
  const {
    products,
    loading,
    error,
    actionError,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();

  const shipmentList = products.filter((item) => item.customer && item.date);

  const handleSend = async (product) => {
    const name = prompt("Кому відправлено?", product.customer || "");
    const date = prompt("Введіть дату (YYYY-MM-DD)", product.date || "");

    if (name && date) {
      await updateProduct(product._id, {
        ...product,
        customer: name,
        date,
      });
    }
  };

  if (loading) return <div className="content">Завантаження...</div>;
  if (error) return <div className="content">Помилка: {error}</div>;

  if (view === "stats") return <StatsView products={products} />;
  if (view === "settings") return <SettingsView theme={theme} toggleTheme={toggleTheme} />;
  if (view === "shipment") return <ShipmentView shipmentList={shipmentList} />;

  return (
    <ProductsView
      products={products}
      onCreate={createProduct}
      onUpdate={updateProduct}
      onDelete={deleteProduct}
      onSend={handleSend}
      actionError={actionError}
    />
  );
}

export default Content;
