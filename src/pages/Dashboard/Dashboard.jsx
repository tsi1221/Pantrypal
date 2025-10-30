import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { getAllAlerts } from "../../api/api";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import SearchFilterBar from "./components/SearchFilterBar";
import ItemsGrid from "./components/ItemsGrid";
import PantryModal from "./components/PantryModal";
import AlertsModal from "./components/AlertsModal";

import "./Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showPantryModal, setShowPantryModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterLocation, setFilterLocation] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [showAlertsModal, setShowAlertsModal] = useState(false);
  const [unseenCount, setUnseenCount] = useState(0);

  const navigate = useNavigate();

  const categories = ["all", "Vegetable", "Fruit", "Drink", "Dairy", "Grain", "Spice", "Snack", "Other"];
  const locations = ["all", "Pantry", "Fridge", "Freezer"];
  const sortOptions = [
    { value: "name", label: "Name" },
    { value: "category", label: "Category" },
    { value: "expiryDate", label: "Expiry Date" },
    { value: "quantity", label: "Quantity" },
  ];

  // ✅ Fetch items
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/login");
        const headers = { Authorization: `Bearer ${token}` };

        const userRes = await api.get("/auth/me", { headers });
        setUser(userRes.data.user || userRes.data || null);

        const itemRes = await api.get("/items", { headers });
        const fetchedItems = Array.isArray(itemRes.data) ? itemRes.data : itemRes.data.items || [];
        setItems(fetchedItems);
        setFilteredItems(fetchedItems);

        const alertsRes = await getAllAlerts();
        setUnseenCount(alertsRes.data.filter((alert) => !alert.seen).length);
      } catch (err) {
        console.error("Error fetching data:", err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  // ✅ Apply search + filter + sort whenever dependencies change
  useEffect(() => {
    let updated = [...items];

    // Search
    if (searchTerm.trim() !== "") {
      const lower = searchTerm.toLowerCase();
      updated = updated.filter(
        (item) =>
          item.name.toLowerCase().includes(lower) ||
          item.category.toLowerCase().includes(lower) ||
          (item.notes && item.notes.toLowerCase().includes(lower))
      );
    }

    // Filter by category
    if (filterCategory !== "all") {
      updated = updated.filter((item) => item.category === filterCategory);
    }

    // Filter by location
    if (filterLocation !== "all") {
      updated = updated.filter((item) => item.location === filterLocation);
    }

    // Sort
    updated.sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "category") return a.category.localeCompare(b.category);
      if (sortBy === "expiryDate")
        return new Date(a.expiryDate) - new Date(b.expiryDate);
      if (sortBy === "quantity") return a.quantity - b.quantity;
      return 0;
    });

    setFilteredItems(updated);
  }, [items, searchTerm, filterCategory, filterLocation, sortBy]);

  return loading ? (
    <div className="dashboard-loading">Loading...</div>
  ) : (
    <div className="dashboard-container">
      <Header
        user={user}
        handleLogout={() => {
          localStorage.removeItem("token");
          navigate("/");
        }}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="dashboard-content">
        <Sidebar
          sidebarOpen={sidebarOpen}
          items={items}
          unseenCount={unseenCount}
          setShowPantryModal={setShowPantryModal}
          setShowAlertsModal={setShowAlertsModal}
          getExpiryStatus={(expiryDate) => {
            const today = new Date();
            const expiry = new Date(expiryDate);
            const days = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
            return days < 0
              ? "expired"
              : days <= 3
              ? "expiring-soon"
              : "fresh";
          }}
        />

        <main className="main-content">
          <SearchFilterBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            filterLocation={filterLocation}
            setFilterLocation={setFilterLocation}
            categories={categories}
            locations={locations}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOptions={sortOptions}
          />

          <ItemsGrid
            filteredItems={filteredItems}
            setItems={setItems}
            setShowPantryModal={setShowPantryModal}
            setEditingItem={setEditingItem}
          />
        </main>
      </div>

      {showPantryModal && (
        <PantryModal
          editingItem={editingItem}
          setEditingItem={setEditingItem}
          items={items}
          setItems={setItems}
          closeModal={() => setShowPantryModal(false)}
        />
      )}
      {showAlertsModal && (
        <AlertsModal closeModal={() => setShowAlertsModal(false)} />
      )}
    </div>
  );
};

export default Dashboard;
