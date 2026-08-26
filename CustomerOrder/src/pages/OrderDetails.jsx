import { useParams, Link } from "react-router-dom";
import { getOrderById } from "../data/orders";

const StatusBadge = ({ status }) => (
  <span className={`badge ${status}`}>{status}</span>
);

export default function OrderDetails() {
  const { id } = useParams();
  const order = getOrderById(id);

  if (!order) {
    return (
      <div className="empty-state" style={{ marginTop: 48 }}>
        <p>Order <strong>{id}</strong> was not found.</p>
        <Link to="/orders" className="btn btn-primary" style={{ marginTop: 16 }}>
          ← Back to Orders
        </Link>
      </div>
    );
  }

  const subtotal = order.products.reduce((sum, p) => sum + p.quantity * p.price, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <>
      {/* Back + Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Link to="/orders" className="btn btn-ghost">← Back</Link>
          <div>
            <h2 style={{ fontSize: 17, fontWeight: 700, margin: 0 }}>{order.id}</h2>
            <span style={{ fontSize: 12, color: "var(--muted)" }}>
              Placed on{" "}
              {new Date(order.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
        <StatusBadge status={order.status} />
      </div>

      {/* Customer + Shipping */}
      <div className="details-grid">
        <div className="info-card">
          <h4>Customer Information</h4>
          <div className="info-row">
            <span className="key">Name</span>
            <span className="val">{order.customer.name}</span>
          </div>
          <div className="info-row">
            <span className="key">Email</span>
            <span className="val">{order.customer.email}</span>
          </div>
          <div className="info-row">
            <span className="key">Phone</span>
            <span className="val">{order.customer.phone}</span>
          </div>
        </div>

        <div className="info-card">
          <h4>Shipping Information</h4>
          <div className="info-row">
            <span className="key">Address</span>
            <span className="val">{order.shipping.address}</span>
          </div>
          <div className="info-row">
            <span className="key">City</span>
            <span className="val">{order.shipping.city}</span>
          </div>
          <div className="info-row">
            <span className="key">State / ZIP</span>
            <span className="val">{order.shipping.state} {order.shipping.zip}</span>
          </div>
          <div className="info-row">
            <span className="key">Country</span>
            <span className="val">{order.shipping.country}</span>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="section">
        <div className="section-header">
          <h3>Products</h3>
          <span style={{ fontSize: 13, color: "var(--muted)" }}>
            {order.products.length} item{order.products.length !== 1 ? "s" : ""}
          </span>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th style={{ textAlign: "center" }}>Quantity</th>
                <th style={{ textAlign: "right" }}>Unit Price</th>
                <th style={{ textAlign: "right" }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {order.products.map((p, i) => (
                <tr key={i}>
                  <td>{p.name}</td>
                  <td style={{ textAlign: "center" }}>{p.quantity}</td>
                  <td style={{ textAlign: "right" }}>${p.price.toFixed(2)}</td>
                  <td style={{ textAlign: "right" }}>
                    <strong>${(p.quantity * p.price).toFixed(2)}</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="totals-row">
          <div className="totals-box">
            <div className="totals-line">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="totals-line">
              <span>Shipping</span>
              <span style={{ color: "var(--success)" }}>Free</span>
            </div>
            <div className="totals-line grand">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
