import React, { useState, useEffect } from "react";

function EditPickupPointForm({ pickupPoint, onUpdated, onCancel }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (pickupPoint) {
      setName(pickupPoint.name);
      setAddress(pickupPoint.address);
    }
  }, [pickupPoint]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const res = await fetch(`http://localhost:3000/maps/pickup-points/${pickupPoint._id || pickupPoint.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, address }),
    });
    if (res.ok) {
      setMessage("Pickup point updated!");
      if (onUpdated) onUpdated();
    } else {
      setMessage("Failed to update pickup point.");
    }
  };

  if (!pickupPoint) return null;

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <h3>Edit Pickup Point</h3>
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
      <button type="submit" style={{ marginLeft: 10 }}>Save</button>
      <button type="button" onClick={onCancel} style={{ marginLeft: 10 }}>Cancel</button>
      {message && <div>{message}</div>}
    </form>
  );
}

export default EditPickupPointForm;