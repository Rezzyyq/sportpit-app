import React from "react";

export default function ProductTable({ products, onEdit, onDelete }) {
  return (
    <>
      {products.length === 0 ? (
        <p style={{ textAlign: "center" }}>Немає даних</p>
      ) : (
        <table style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "14px",
        }}>
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
              <tr key={i} style={{ background: i % 2 === 0 ? "#1f1f1f" : "#2a2a2a" }}>
                <td>{p.name}</td>
                <td>{p.quantity}</td>
                <td>{p.customer}</td>
                <td>{p.date}</td>
                <td style={{ display: "flex", gap: "5px" }}>
                  <button onClick={() => onEdit(i)} style={{
                    padding: "5px 10px",
                    borderRadius: "5px",
                    border: "none",
                    background: "#2196f3",
                    color: "#fff",
                    cursor: "pointer",
                  }}>✏️</button>
                  <button onClick={() => onDelete(i)} style={{
                    padding: "5px 10px",
                    borderRadius: "5px",
                    border: "none",
                    background: "#f44336",
                    color: "#fff",
                    cursor: "pointer",
                  }}>❌</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
