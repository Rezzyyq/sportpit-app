function Sidebar({ onSelect, activeView }) {
  const items = [
    { id: "products", label: "Каталог товарів" },
    { id: "stats", label: "Статистика" },
    { id: "shipment", label: "Відправки" },
    { id: "settings", label: "Налаштування" },
  ];

  return (
    <div className="sidebar">
      <h2>Меню</h2>
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className={activeView === item.id ? "active" : ""}
          onClick={() => onSelect(item.id)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export default Sidebar;
