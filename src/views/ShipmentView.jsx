export default function ShipmentView({ shipmentList }) {
  return (
    <div className="content">
      <section className="panel">
        <p className="eyebrow">Логістика</p>
        <h2>Відправки товарів</h2>
        <p>Тут зібрані позиції, для яких уже вказані отримувач і дата.</p>
      </section>
      {shipmentList.length === 0 ? (
        <div className="empty-state">
          <h3>Відправок ще немає</h3>
          <p>Додай отримувача в каталозі, і товар з'явиться в цьому списку.</p>
        </div>
      ) : (
        <div className="table-wrap">
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
              {shipmentList.map((p) => (
                <tr key={p._id}>
                  <td>{p.name}</td>
                  <td>{p.quantity}</td>
                  <td>{p.customer}</td>
                  <td>{p.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
