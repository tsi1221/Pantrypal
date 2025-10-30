import { useEffect, useState } from "react";
import {
  getAllAlerts,
  getSoonExpiringItems,
  markAlertAsSeen,
} from "../../api/api";
import "./Alerts.css";

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [soonItems, setSoonItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return; // redirect logic if needed

    const fetchAlerts = async () => {
      try {
        const [alertsRes, soonRes] = await Promise.all([
          getAllAlerts(),
          getSoonExpiringItems(),
        ]);
        setAlerts(alertsRes.data || []);
        setSoonItems(soonRes.data || []);
      } catch (err) {
        console.error("Error fetching alerts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  const handleMarkSeen = async (alertId) => {
    try {
      await markAlertAsSeen(alertId);
      setAlerts((prev) =>
        prev.map((alert) =>
          alert._id === alertId ? { ...alert, seen: true } : alert
        )
      );
    } catch (err) {
      console.error("Error marking alert as seen:", err);
    }
  };

  if (loading) return <p>Loading alerts...</p>;

  return (
    <div className="alerts-container">
      <h2>Notifications & Alerts</h2>

      <section className="alerts-section">
        <h3>🛎️ General Alerts</h3>
        {alerts.length ? (
          alerts.map((alert) => (
            <div
              key={alert._id}
              className={`alert-card ${alert.seen ? "seen" : "unseen"}`}
            >
              <p>{alert.message}</p>
              <small>{new Date(alert.createdAt).toLocaleString()}</small>
              {!alert.seen && (
                <button
                  className="mark-seen-btn"
                  onClick={() => handleMarkSeen(alert._id)}
                >
                  Mark as Seen
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No alerts found 🎉</p>
        )}
      </section>

      <section className="alerts-section">
        <h3>⏰ Soon Expiring Items</h3>
        {soonItems.length ? (
          soonItems.map((item) => (
            <div key={item._id} className="alert-card expiring">
              <p>
                {item.name} is expiring soon (
                {new Date(item.expiryDate).toLocaleDateString()})
              </p>
            </div>
          ))
        ) : (
          <p>No items expiring soon 🌿</p>
        )}
      </section>
    </div>
  );
};

export default Alerts;
