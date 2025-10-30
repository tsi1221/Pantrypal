const getCategoryIcon = (category) => {
  const icons = {
    Vegetable: "🥦",
    Fruit: "🍎",
    Drink: "🥤",
    Dairy: "🥛",
    Grain: "🌾",
    Spice: "🌶️",
    Snack: "🍿",
    Other: "📦",
  };
  return icons[category] || "📦";
};

const getExpiryStatus = (expiryDate) => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const days = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
  if (days < 0) return "expired";
  if (days <= 3) return "expiring-soon";
  return "fresh";
};

const StatsSection = ({ stats, recentItems }) => (
  <section className="stats-section">
    <div className="container">
      <h2 className="section-title">Your Pantry Overview</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{stats.totalItems}</div>
          <div className="stat-label">Total Items</div>
        </div>
        <div className="stat-card warning">
          <div className="stat-number">{stats.expiringSoon}</div>
          <div className="stat-label">Expiring Soon</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.categories}</div>
          <div className="stat-label">Categories</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.locations}</div>
          <div className="stat-label">Storage Locations</div>
        </div>
      </div>

      {recentItems.length > 0 && (
        <div className="recent-items">
          <h3>Recently Added Items</h3>
          <div className="recent-items-grid">
            {recentItems.map((item) => (
              <div key={item._id} className="recent-item-card">
                <div className="item-header">
                  <span className="item-icon">{getCategoryIcon(item.category)}</span>
                  <span className="item-name">{item.name}</span>
                </div>
                <div className="item-details">
                  <span className={`expiry-status ${getExpiryStatus(item.expiryDate)}`}>
                    Expires: {new Date(item.expiryDate).toLocaleDateString()}
                  </span>
                  <span className="item-location">{item.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </section>
);

export default StatsSection;
