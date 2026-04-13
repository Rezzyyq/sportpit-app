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

  const handleSend = async (product, shipment) => {
    return updateProduct(product._id, {
      ...product,
      customer: shipment.customer,
      date: shipment.date,
    });
  };

  if (loading) {
    return (
      <div className="content state-view" role="status">
        <span className="loader" aria-hidden="true" />
        Завантаження товарів...
      </div>
    );
  }

  if (error) {
    return (
      <div className="content state-view error-state" role="alert">
        <h2>Не вдалося завантажити каталог</h2>
        <p>{error}</p>
      </div>
    );
  }

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
