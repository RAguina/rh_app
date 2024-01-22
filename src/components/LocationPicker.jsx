import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; // Importa Leaflet para poder acceder a la función invalidateSize

const LocationPicker = ({ onLocationSelect }) => {
  const [map, setMap] = useState(null);

  const handleLocationSelect = (e) => {
    onLocationSelect(e.latlng);
  };

  useEffect(() => {
    const handleResize = () => {
      // Verifica si el mapa existe antes de intentar recargarlo
      if (map) {
        // Invalida el tamaño del mapa para forzar una recarga
        map.invalidateSize();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [map]);

  return (
    <MapContainer center={[-38.5545, -58.7396]} zoom={13} style={{ height: "100vh", width: "100%" }} onClick={handleLocationSelect} whenCreated={setMap}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[-38.5545, -58.7396]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default LocationPicker;
