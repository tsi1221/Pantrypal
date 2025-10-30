import { useEffect, useState } from "react";
import axios from "axios";
import "./Pantry.css";

const Pantry = ({ closeModal, addNewItem, updateItem, editingItem }) => {
  const [item, setItem] = useState({
    name: "",
    category: "Other",
    quantity: 1,
    unit: "pcs",
    location: "Pantry",
    purchaseDate: "",
    expiryDate: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (editingItem) {
      setItem({
        ...editingItem,
        purchaseDate: editingItem.purchaseDate?.split("T")[0] || "",
        expiryDate: editingItem.expiryDate?.split("T")[0] || "",
      });
    }
  }, [editingItem]);

  const handleInputChange = (field, value) => {
    setItem((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const headers = { Authorization: `Bearer ${token}` };
      if (editingItem) {
        const res = await axios.put(
          `https://panterypalsideback.onrender.com/api/items/${item._id}`,
          item,
          { headers }
        );
        updateItem(res.data.item || res.data);
      } else {
        const res = await axios.post(
          `https://panterypalsideback.onrender.com/api/items`,
          item,
          { headers }
        );
        addNewItem(res.data.item || res.data);
      }
      closeModal();
    } catch (err) {
      console.error("Failed to save item:", err);
      setError("Failed to save item. Please check your backend.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pantry-container">
      <h2>{editingItem ? "Edit Item" : "Add New Item"}</h2>

      {error && <div className="error">{error}</div>}

      <form className="pantry-form" onSubmit={handleSubmit}>
        <div>
          <label>Item Name</label>
          <input
            type="text"
            value={item.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            required
          />
        </div>

        <div>
          <label>Category</label>
          <select
            value={item.category}
            onChange={(e) => handleInputChange("category", e.target.value)}
          >
            <option>Vegetable</option>
            <option>Fruit</option>
            <option>Drink</option>
            <option>Dairy</option>
            <option>Grain</option>
            <option>Spice</option>
            <option>Snack</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label>Quantity</label>
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) =>
              handleInputChange("quantity", parseInt(e.target.value) || 1)
            }
            required
          />
        </div>

        <div>
          <label>Unit</label>
          <select
            value={item.unit}
            onChange={(e) => handleInputChange("unit", e.target.value)}
          >
            <option>pcs</option>
            <option>kg</option>
            <option>g</option>
            <option>ml</option>
            <option>L</option>
            <option>pack</option>
            <option>bottle</option>
            <option>other</option>
          </select>
        </div>

        <div>
          <label>Location</label>
          <select
            value={item.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
          >
            <option>Pantry</option>
            <option>Fridge</option>
            <option>Freezer</option>
          </select>
        </div>

        <div>
          <label>Purchase Date</label>
          <input
            type="date"
            value={item.purchaseDate}
            onChange={(e) => handleInputChange("purchaseDate", e.target.value)}
          />
        </div>

        <div>
          <label>Expiry Date</label>
          <input
            type="date"
            value={item.expiryDate}
            onChange={(e) => handleInputChange("expiryDate", e.target.value)}
            required
          />
        </div>

        <div>
          <label>Notes</label>
          <input
            type="text"
            value={item.notes}
            onChange={(e) => handleInputChange("notes", e.target.value)}
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : editingItem ? "Update Item" : "Add Item"}
        </button>
      </form>
    </div>
  );
};

export default Pantry;
