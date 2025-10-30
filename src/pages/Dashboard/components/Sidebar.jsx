// src/pages/Dashboard/components/Sidebar.jsx
import React from "react";
// import "./Sidebar.css";

const Sidebar = ({ sidebarOpen, items, unseenCount, setShowPantryModal, setShowAlertsModal, getExpiryStatus }) => {
  return (
    <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
      <h3>Pantry Actions</h3>

      <button className="alerts-btn" onClick={() => setShowAlertsModal(true)}>
        🛎️ Alerts
        {unseenCount > 0 && <span className="alerts-badge">{unseenCount}</span>}
      </button>

      <button className="open-pantry-btn" onClick={() => setShowPantryModal(true)}>
        + Add New Item
      </button>

      <div className="sidebar-stats">
        <div className="stat-card">
          <span className="stat-number">{items.length}</span>
          <span className="stat-label">Total Items</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">
            {items.filter((i) => getExpiryStatus(i.expiryDate) === "expiring-soon").length}
          </span>
          <span className="stat-label">Expiring Soon</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
