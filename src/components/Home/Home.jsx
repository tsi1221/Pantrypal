import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import StatsSection from "./StatsSection";
import HowItWorksSection from "./HowItWorksSection";
import Footer from "../Footer/Footer";
import "./Home.css";

const Home = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalItems: 0,
    expiringSoon: 0,
    categories: 0,
    locations: 0,
  });
  const [recentItems, setRecentItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const userRes = await api.get("/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(userRes.data.user);

          const itemsRes = await api.get("/items", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const items = itemsRes.data.items || [];

          const categories = new Set(items.map((i) => i.category)).size;
          const locations = new Set(items.map((i) => i.location)).size;
          const expiringSoon = items.filter((item) => {
            const expiryDate = new Date(item.expiryDate);
            const today = new Date();
            const days = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
            return days <= 7 && days >= 0;
          }).length;

          setStats({
            totalItems: items.length,
            expiringSoon,
            categories,
            locations,
          });

          const sortedItems = items.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setRecentItems(sortedItems.slice(0, 5));
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleGetStarted = () => {
    const token = localStorage.getItem("token");
    navigate(token ? "/dashboard" : "/login");
  };

  if (loading) return <div className="home-loading">Loading...</div>;

  return (
    <div className="home-container">
      <HeroSection user={user} handleGetStarted={handleGetStarted} />
      <FeaturesSection />
      {user && (
        <StatsSection stats={stats} recentItems={recentItems} />
      )}
      <HowItWorksSection />
      <Footer />
    </div>
  );
};

export default Home;
