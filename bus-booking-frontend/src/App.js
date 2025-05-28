import React, { useState } from "react";
import PickupPointSearch from "./components/pickup-point-search";
import BusMap from "./components/bus-map";
import "leaflet/dist/leaflet.css";

function App() {
  const [selectedPickupPoint, setSelectedPickupPoint] = useState(null);
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handles what happens when a pickup point is selected from search suggestions
  const handlePickupPointSelect = async (point) => {
    setSelectedPickupPoint(point);
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:3000/maps/pickup-points/${point._id}/buses`
      );
      const busesData = await res.json();
      setBuses(busesData);
    } catch (err) {
      setBuses([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Bus Booking System</h1>
      <PickupPointSearch onSelect={handlePickupPointSelect} />
      {selectedPickupPoint && (
        <div>
          <h2>
            Buses approaching: {selectedPickupPoint.name}
            <br />
            <small>{selectedPickupPoint.address}</small>
          </h2>
          {loading ? (
            <div>Loading buses...</div>
          ) : (
            <BusMap buses={buses} pickupPoint={selectedPickupPoint} />
          )}
        </div>
      )}
    </div>
  );
}

export default App;