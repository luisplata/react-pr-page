import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Map = ({ location }) => {
  const { lat, lng } = location;

  return (
    <div id="mapa" className="container my-5">
      <h2 className="text-center mb-4">Ubicación en el Mapa</h2>
      <div style={{ height: "500px", width: "100%" }}>
        <MapContainer
          center={[lat, lng]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[lat, lng]}>
            <Popup>
              ¡Aquí está la ubicación que seleccionaste!
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
