export default function StatsView({ products }) {
  const totalQuantity = products.reduce((acc, p) => acc + Number(p.quantity || 0), 0);
  const shippedProducts = products.filter((p) => p.customer && p.date).length;
  const reservedQuantity = products
    .filter((p) => p.customer && p.date)
    .reduce((acc, p) => acc + Number(p.quantity || 0), 0);

  return (
    <div className="content">
      <section className="panel">
        <p className="eyebrow">Огляд складу</p>
        <h2>Статистика</h2>
        <p>Короткий зріз каталогу і підготовлених відправок.</p>
      </section>
      <div className="stats-grid">
        <article className="stat-card">
          <span>Позицій у каталозі</span>
          <strong>{products.length}</strong>
        </article>
        <article className="stat-card">
          <span>Одиниць на складі</span>
          <strong>{totalQuantity}</strong>
        </article>
        <article className="stat-card">
          <span>Товарів у відправках</span>
          <strong>{shippedProducts}</strong>
        </article>
        <article className="stat-card">
          <span>Одиниць у відправках</span>
          <strong>{reservedQuantity}</strong>
        </article>
      </div>
    </div>
  );
}
