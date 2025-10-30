// src/pages/Dashboard/components/ItemCard.jsx
import React from "react";
import api from "../../../api/api";
// import "./ItemCard.css";

const ItemCard = ({ item, setItems, setShowPantryModal, setEditingItem }) => {
  const getExpiryStatus = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const days = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    if (days < 0) return "expired";
    if (days <= 3) return "expiring-soon";
    return "fresh";
  };

  const getCategoryIcon = (cat) => ({
    Vegetable: "🥦", Fruit: "🍎", Drink: "🥤", Dairy: "🥛",
    Grain: "🌾", Spice: "🌶️", Snack: "🍿", Other: "📦",
  }[cat] || "📦");

  const getLocationIcon = (loc) => ({
    Pantry: "🗄️", Fridge: "❄️", Freezer: "🧊",
  }[loc] || "📦");

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/items/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setItems(prev => prev.filter(i => i._id !== id));
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  const handleEditClick = () => {
    setEditingItem(item);
    setShowPantryModal(true);
  };

  const expiryStatus = getExpiryStatus(item.expiryDate);

  return (
    <div className={`item-card ${expiryStatus}`}>
      <div className="item-header">
        <div className="item-icon-category">
          <span className="item-icon">{getCategoryIcon(item.category)}</span>
          <span className="item-category">{item.category}</span>
        </div>
        <div className="item-location">
          {getLocationIcon(item.location)} {item.location}
        </div>
      </div>

      <div className="item-content">
        <h4 className="item-name">{item.name}</h4>
        <p><strong>Quantity:</strong> {item.quantity} {item.unit}</p>
        <p><strong>Expires:</strong> <span className={`expiry-date ${expiryStatus}`}>{new Date(item.expiryDate).toLocaleDateString()}</span></p>
        {item.notes && <p><strong>Notes:</strong> {item.notes}</p>}
      </div>

      <div className="item-actions">
        <button className="edit-btn" onClick={handleEditClick}>✏️ Edit</button>
        <button className="delete-btn" onClick={() => handleDelete(item._id)}>🗑️ Delete</button>
      </div>
    </div>
  );
};

export default ItemCard;
