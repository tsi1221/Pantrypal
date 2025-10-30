// src/pages/Dashboard/components/Header.jsx
import React from "react";
// import "./Header.css";

const Header = ({ user, handleLogout, sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
        <h2>Welcome to pantrypal, <span className="user-name">{user?.name || "User"}</span> 👋</h2>
      </div>
      <button className="logout-btn" onClick={handleLogout}>Log <br /> out</button>
    </header>
  );
};

export default Header;
