const steps = [
  { number: 1, title: "Add Your Items", desc: "Enter your pantry items with expiry and location." },
  { number: 2, title: "Organize & Track", desc: "Categorize and monitor expiry automatically." },
  { number: 3, title: "Stay Informed", desc: "Get alerts and insights to manage efficiently." },
];

const HowItWorksSection = () => (
  <section className="how-it-works-section">
    <div className="container">
      <h2 className="section-title">How It Works</h2>
      <div className="steps-grid">
        {steps.map((s) => (
          <div key={s.number} className="step">
            <div className="step-number">{s.number}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
