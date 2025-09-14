function Sidebar({ onSelect, activeView }) {
  return (
    <div className="sidebar">
      <h2>Меню</h2>
      <ul>
        <li className={activeView === "products" ? "active" : ""} onClick={() => onSelect("products")}>📦 Товари</li>
        <li className={activeView === "shipment" ? "active" : ""} onClick={() => onSelect("shipment")}>✉️ Відправка</li>
        <li className={activeView === "stats" ? "active" : ""} onClick={() => onSelect("stats")}>📊 Статистика</li>
        <li className={activeView === "settings" ? "active" : ""} onClick={() => onSelect("settings")}>⚙️ Налаштування</li>
      </ul>
    </div>
  );
}

export default Sidebar;

