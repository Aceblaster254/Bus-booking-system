import React, { useEffect, useState } from "react";

function PickupPointsList({ reloadFlag, onEdit, onDeleted }) {
  const [pickupPoints, setPickupPoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/maps/pickup-points")
      .then((res) => res.json())
      .then((data) => {
        setPickupPoints(data);
        setLoading(false);
      });
  }, [reloadFlag]);

  useEffect(() => {
    if (search.length === 0) {
      setSuggestions([]);
      return;
    }
    // Fetch suggestions from backend
    fetch(`http://localhost:3000/maps/pickup-points/suggest?query=${encodeURIComponent(search)}`)
      .then((res) => res.json())
      .then((data) => setSuggestions(data));
  }, [search]);

  const filteredPoints = pickupPoints.filter(
    (point) =>
      point.name.toLowerCase().includes(search.toLowerCase()) ||
      (point.address && point.address.toLowerCase().includes(search.toLowerCase()))
  );

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this pickup point?")) return;
    await fetch(`http://localhost:3000/maps/pickup-points/${id}`, {
      method: "DELETE",
    });
    if (onDeleted) onDeleted();
  };

  const handleSuggestionClick = (suggestion) => {
    setSearch(suggestion.name);
    setShowSuggestions(false);
  };

  return (
    <div>
      <h2>Pickup Points</h2>
      <input
        type="text"
        placeholder="Search by name or address"
        value={search}
        onChange={e => {
          setSearch(e.target.value);
          setShowSuggestions(true);
        }}
        style={{ marginBottom: 10, padding: 4, width: "80%" }}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul style={{
          border: "1px solid #ccc", background: "#fff", position: "absolute", width: "80%", zIndex: 2, listStyle: "none", padding: 0, margin: 0
        }}>
          {suggestions.map(suggestion => (
            <li
              key={suggestion._id}
              style={{ padding: 6, cursor: "pointer" }}
              onMouseDown={() => handleSuggestionClick(suggestion)}
            >
              <strong>{suggestion.name}</strong> ({suggestion.address})
            </li>
          ))}
        </ul>
      )}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {filteredPoints.map((point) => (
            <li key={point._id || point.id}>
              <strong>{point.name}</strong> ({point.address})
              <button onClick={() => onEdit(point)} style={{ marginLeft: 10 }}>Edit</button>
              <button onClick={() => handleDelete(point._id || point.id)} style={{ marginLeft: 5, color: "red" }}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PickupPointsList;