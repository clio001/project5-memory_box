import React from "react";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import * as leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/images/marker-shadow.png";
import { Typography } from "@mui/material";
import { useRef, useState } from "react";
import "https://unpkg.com/leaflet@1.8.0/dist/leaflet.js";

function Map(props: any) {
  const data = props.data;
  console.log(data);
  const latitude = data.item.location.latitude;
  const longitude = data.item.location.longitude;

  return (
    <div className="leaflet-container">
      <MapContainer
        center={[latitude, longitude]}
        zoom={9}
        scrollWheelZoom={false}
        style={{ height: "15rem" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]}>
          <Popup closeButton={false}>
            <img src={data.item.file_url} height="85" />
            <Typography variant="subtitle2">{data.item.title} </Typography>
            <Typography variant="body2">
              Latitude: {latitude}
              <br />
              Longitude: {longitude}
            </Typography>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
