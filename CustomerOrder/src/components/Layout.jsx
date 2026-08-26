import { NavLink, Outlet } from "react-router-dom";

const IconDashboard = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/>
    <rect x="14" y="14" width="7" height="7" rx="1"/>
  </svg>
);

const IconOrders = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
    <rect x="9" y="3" width="6" height="4" rx="1"/>
    <line x1="9" y1="12" x2="15" y2="12"/>
    <line x1="9" y1="16" x2="13" y2="16"/>
  </svg>
);

export default function Layout() {
  const now = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <h1>OrdersApp</h1>
          <span>Management Portal</span>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/" end>
            <IconDashboard /> Dashboard
          </NavLink>
          <NavLink to="/orders">
            <IconOrders /> All Orders
          </NavLink>
        </nav>
      </aside>

      <div className="main-content">
        <div className="topbar">
          <h2>Orders Management</h2>
          <span className="topbar-meta">{now}</span>
        </div>
        <div className="page-body">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
