import { useState } from "react";
import { Link } from "react-router-dom";
import { orders } from "../data/orders";

const StatusBadge = ({ status }) => (
  <span className={`badge ${status}`}>{status}</span>
);

export default function AllOrders() {
  const [query, setQuery] = useState("");

  const filtered = orders.filter((o) => {
    const q = query.toLowerCase();
    return (
      o.id.toLowerCase().includes(q) ||
      o.customer.name.toLowerCase().includes(q) ||
      o.status.toLowerCase().includes(q)
    );
  });

  return (
    <div className="section">
      <div className="section-header">
        <h3>All Orders</h3>
        <span style={{ fontSize: 13, color: "var(--muted)" }}>
          {filtered.length} order{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Search */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by Order ID, customer or status…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="table-wrap">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <p>No orders match your search.</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <tr key={order.id}>
                  <td><strong>{order.id}</strong></td>
                  <td>{order.customer.name}</td>
                  <td>
                    {new Date(order.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td><strong>${order.amount.toFixed(2)}</strong></td>
                  <td><StatusBadge status={order.status} /></td>
                  <td>
                    <Link to={`/orders/${order.id}`} className="btn btn-primary">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
