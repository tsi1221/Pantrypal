// src/pages/Dashboard/components/ItemsGrid.jsx
import React from "react";
import ItemCard from "./ItemCard";
// import "./ItemsGrid.css";

const ItemsGrid = ({ filteredItems, setItems, setShowPantryModal, setEditingItem }) => {
  return filteredItems.length === 0 ? (
    <div className="empty-state">
      <div className="empty-icon">🥦</div>
      <h4>No items found</h4>
      <p>Try adjusting your search or filters</p>
      <button className="add-first-item-btn" onClick={() => setShowPantryModal(true)}>Add Your First Item</button>
    </div>
  ) : (
    <div className="items-grid">
      {filteredItems.map((item) => (
        <ItemCard
          key={item._id}
          item={item}
          setItems={setItems}
          setShowPantryModal={setShowPantryModal}
          setEditingItem={setEditingItem}
        />
      ))}
    </div>
  );
};

export default ItemsGrid;
