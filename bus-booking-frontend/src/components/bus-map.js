import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function BusMap({ buses = [], pickupPoint }) {
  // Default center, or center on the pickupPoint if available
  const center = pickupPoint && pickupPoint.location
    ? [pickupPoint.location.lat, pickupPoint.location.lng]
    : [0, 0];

  return (
    <div style={{ height: "400px", width: "100%", marginTop: "20px" }}>
      <MapContainer center={center} zoom={13} style={{ height: "100%", width: "100%" }}>
        {/* OpenStreetMap tiles */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {pickupPoint && pickupPoint.location && (
          <Marker position={[pickupPoint.location.lat, pickupPoint.location.lng]}>
            <Popup>
              <strong>{pickupPoint.name}</strong><br />
              {pickupPoint.address}
            </Popup>
          </Marker>
        )}
        {buses.map(bus => (
          bus.location && (
            <Marker
              key={bus._id}
              position={[bus.location.lat, bus.location.lng]}
            >
              <Popup>
                Bus: <strong>{bus.busnumber}</strong>
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>
    </div>
  );
}

export default BusMap;