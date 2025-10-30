// src/pages/Dashboard/components/SearchFilterBar.jsx
import React from "react";
// import "./SearchFilterBar.css";

const SearchFilterBar = ({
  searchTerm, setSearchTerm,
  filterCategory, setFilterCategory,
  filterLocation, setFilterLocation,
  categories, locations,
  sortBy, setSortBy, sortOptions
}) => {
  return (
    <div className="search-filter-bar">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search by name, category, or notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <span className="search-icon">🔍</span>
      </div>
      <div className="filter-group">
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="filter-select">
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat === "all" ? "All Categories" : cat}</option>
          ))}
        </select>
        <select value={filterLocation} onChange={(e) => setFilterLocation(e.target.value)} className="filter-select">
          {locations.map((loc) => (
            <option key={loc} value={loc}>{loc === "all" ? "All Locations" : loc}</option>
          ))}
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>Sort by: {opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchFilterBar;
