// src/pages/Dashboard/components/PantryModal.jsx
import React from "react";
import Pantry from "../../Pantry/Pantry";
// import "./PantryModal.css";

const PantryModal = ({ editingItem, items, setItems, closeModal }) => {
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{editingItem ? "Edit Item" : "Add New Item"}</h3>
          <button className="close-modal-btn" onClick={closeModal}>✕</button>
        </div>
        <Pantry
          editingItem={editingItem}
          closeModal={closeModal}
          addNewItem={(newItem) => setItems([...items, newItem])}
          updateItem={(updated) => setItems(items.map(i => i._id === updated._id ? updated : i))}
        />
      </div>
    </div>
  );
};

export default PantryModal;
