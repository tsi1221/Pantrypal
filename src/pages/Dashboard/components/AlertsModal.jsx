// src/pages/Dashboard/components/AlertsModal.jsx
import React from "react";
import Alerts from "../../Alerts/Alerts";
// import "./AlertsModal.css";

const AlertsModal = ({ closeModal }) => {
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Alerts</h3>
          <button className="close-modal-btn" onClick={closeModal}>✕</button>
        </div>
        <Alerts />
      </div>
    </div>
  );
};

export default AlertsModal;
