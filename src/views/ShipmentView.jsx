export default function ShipmentView({ shipmentList }) {
  return (
    <div className="content">
      <h2>Відправка товарів</h2>
      {shipmentList.length === 0 ? (
        <p>Немає відправлених товарів</p>
      ) : (
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
      )}
    </div>
  );
}
