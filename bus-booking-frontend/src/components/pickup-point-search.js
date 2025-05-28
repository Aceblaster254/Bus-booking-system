import React, { useState, useEffect } from "react";

function PickupPointSearch({ onSelect }) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (input.length === 0) {
      setSuggestions([]);
      return;
    }
    fetch(`http://localhost:3000/maps/pickup-points/suggest?query=${encodeURIComponent(input)}`)
      .then(res => res.json())
      .then(data => setSuggestions(data));
  }, [input]);

  const handleSelect = (point) => {
    setInput(point.name);
    setShowSuggestions(false);
    setSuggestions([]);
    onSelect(point);
  };

  return (
    <div style={{ position: "relative" }}>
      <input
        value={input}
        onChange={e => {
          setInput(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
        placeholder="Enter pickup point"
        style={{ width: "300px", padding: 6 }}
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul style={{
          position: "absolute", zIndex: 2, background: "#fff", border: "1px solid #ccc",
          width: "300px", padding: 0, margin: 0, listStyle: "none"
        }}>
          {suggestions.map(s => (
            <li key={s._id} style={{ padding: 5, cursor: "pointer" }}
                onMouseDown={() => handleSelect(s)}>
              {s.name} ({s.address})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PickupPointSearch;