import { Link } from "react-router-dom";
import { orders, getStats } from "../data/orders";

const StatusBadge = ({ status }) => (
  <span className={`badge ${status}`}>{status}</span>
);

export default function Dashboard() {
  const stats = getStats();
  const recent = [...orders].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  return (
    <>
      {/* ── Stat Cards ── */}
      <div className="stats-grid">
        <div className="stat-card total">
          <span className="label">Total Orders</span>
          <span className="value">{stats.total}</span>
        </div>
        <div className="stat-card pending">
          <span className="label">Pending</span>
          <span className="value">{stats.pending}</span>
        </div>
        <div className="stat-card completed">
          <span className="label">Completed</span>
          <span className="value">{stats.completed}</span>
        </div>
        <div className="stat-card cancelled">
          <span className="label">Cancelled</span>
          <span className="value">{stats.cancelled}</span>
        </div>
      </div>

      {/* ── Recent Orders ── */}
      <div className="section">
        <div className="section-header">
          <h3>Recent Orders</h3>
          <Link to="/orders" className="btn btn-outline">View All</Link>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {recent.map((order) => (
                <tr key={order.id}>
                  <td><strong>{order.id}</strong></td>
                  <td>{order.customer.name}</td>
                  <td>{new Date(order.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</td>
                  <td><strong>${order.amount.toFixed(2)}</strong></td>
                  <td><StatusBadge status={order.status} /></td>
                  <td>
                    <Link to={`/orders/${order.id}`} className="btn btn-ghost">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
