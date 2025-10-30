const features = [
  { icon: "📱", title: "Easy Tracking", desc: "Quickly add and manage your pantry items." },
  { icon: "⏰", title: "Expiry Alerts", desc: "Get notified before your food items expire." },
  { icon: "📊", title: "Smart Insights", desc: "View statistics and analytics on your habits." },
  { icon: "🔍", title: "Smart Search", desc: "Find items quickly with advanced filtering." },
];

const FeaturesSection = () => (
  <section className="features-section">
    <div className="container">
      <h2 className="section-title">Why Choose PantryPal?</h2>
      <div className="features-grid">
        {features.map((f, i) => (
          <div className="feature-card" key={i}>
            <div className="feature-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
