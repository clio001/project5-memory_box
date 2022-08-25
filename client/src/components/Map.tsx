import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import * as leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/images/marker-shadow.png";

function Map() {
  return (
    <div className="leaflet-container">
      <MapContainer
        center={[28.66, -17.86]}
        zoom={9}
        scrollWheelZoom={false}
        style={{ height: "15rem" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
