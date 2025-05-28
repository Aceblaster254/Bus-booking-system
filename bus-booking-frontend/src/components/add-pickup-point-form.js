import React, { useState } from "react";

function AddPickupPointForm({ onAdded }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const res = await fetch("http://localhost:3000/maps/pickup-points", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, address }),
    });
    if (res.ok) {
      setMessage("Pickup point added!");
      setName("");
      setAddress("");
      if (onAdded) onAdded();
    } else {
      setMessage("Failed to add pickup point.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <h3>Add Pickup Point</h3>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        value={address}
        onChange={e => setAddress(e.target.value)}
        placeholder="Address"
        required
        style={{ marginLeft: 10 }}
      />
      <button type="submit" style={{ marginLeft: 10 }}>Add</button>
      {message && <div>{message}</div>}
    </form>
  );
}

export default AddPickupPointForm;