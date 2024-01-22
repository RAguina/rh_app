import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';  // Importar los estilos de Leaflet directamente

const LocationPicker = ({ onLocationSelect }) => {
  const defaultCenter = [-38.5545, -58.7396];

  const handleLocationSelect = (e) => {
    onLocationSelect(e.latlng);
  };

  return (
    <MapContainer center={defaultCenter} zoom={13} style={{ height: "500px", width: "100%" }} onClick={handleLocationSelect}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={defaultCenter}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default LocationPicker;
