import React, { useState } from "react";
import FloatingItems from "./FloatingItems";
import "./Home.css";

const HeroSection = ({ user, handleGetStarted }) => {
  const [isHovered, setIsHovered] = useState(false);

  const buttonStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.4rem",
    padding: "0.75rem 0rem", // smaller padding
    borderRadius: "999px",
    fontWeight: 600,
    width:"230px",
    fontSize: "0.9rem", // smaller font
    border: "none",
    cursor: "pointer",
    color: "#fff",
    background: isHovered
      ? "linear-gradient(180deg, #66BB6A 0%, #43A047 100%)"
      : "linear-gradient(180deg, #4CAF50 0%, #388E3C 100%)",
    boxShadow: isHovered
      ? "0 6px 18px rgba(76,175,80,0.25)"
      : "0 1px 3px rgba(0,0,0,0.08)",
    transform: isHovered ? "translateY(-2px)" : "translateY(0)",
    transition: "all 0.25s cubic-bezier(.2,.9,.25,1)",
  };

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">
          Welcome to <span className="brand">PantryPal</span> 🏠
        </h1>

        <p className="hero-subtitle">
          Your smart kitchen companion for managing groceries, tracking expiry
          dates, and reducing food waste.
        </p>

        <div className="hero-actions">
          {user ? (
            <div className="welcome-back">
              <p
                style={{
                  color: "#fff",
                  fontSize: "1.1rem",
                  marginBottom: "0.8rem",
                }}
              >
                Welcome back,to pantrypal <strong>{user.name}</strong>! 👋
              </p>

              <button
                onClick={handleGetStarted}
                style={{
                  ...buttonStyle,
                  background:
                    "linear-gradient(180deg, #43A047 0%, #2E7D32 100%)",
                }}
              >
                Go to Dashboard
              </button>
            </div>
          ) : (
            <button
              onClick={handleGetStarted}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={buttonStyle}
            >
              Get Started
            </button>
          )}
        </div>
      </div>

      <div className="hero-image">
        <FloatingItems />
      </div>
    </section>
  );
};

export default HeroSection;
