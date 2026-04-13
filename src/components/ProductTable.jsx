export default function ProductTable({ products, onEdit, onDelete }) {
  return (
    <>
      {products.length === 0 ? (
        <p style={{ textAlign: "center" }}>Немає даних</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Назва</th>
              <th>Кількість</th>
              <th>Кому</th>
              <th>Дата</th>
              <th>Дії</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr key={p._id || p.name || i}>
                <td>{p.name}</td>
                <td>{p.quantity}</td>
                <td>{p.customer}</td>
                <td>{p.date}</td>
                <td>
                  <button type="button" onClick={() => onEdit(i)}>Редагувати</button>
                  <button type="button" onClick={() => onDelete(i)}>Видалити</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
