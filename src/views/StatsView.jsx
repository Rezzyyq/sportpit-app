export default function StatsView({ products }) {
  const totalQuantity = products.reduce((acc, p) => acc + Number(p.quantity || 0), 0);

  return (
    <div className="content">
      <h2>Статистика</h2>
      <div>📦 Всього товарів: {products.length}</div>
      <div>📊 Загальна кількість: {totalQuantity}</div>
    </div>
  );
}
