import React, { useState } from 'react';
import mapboxgl from 'mapbox-gl';

const LocationPicker = ({ onLocationSelect }) => {
  const [viewport, setViewport] = useState({
    latitude: -38.5545,
    longitude: -58.7396,
    zoom: 13,
    width: "100%",
    height: "500px",
  });

  console.log('Viewport:', viewport); // Agregado

  const handleLocationSelect = (e) => {
    console.log('Evento onClick:', e); // Agregado
    onLocationSelect({ lat: e.lngLat[1], lng: e.lngLat[0] });
  };

  return (
    <div
      ref={el => {
        const map = new mapboxgl.Map({
          container: el,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [viewport.longitude, viewport.latitude],
          zoom: viewport.zoom
        });

        map.on('click', handleLocationSelect);
      }}
      style={{
        width: viewport.width,
        height: viewport.height
      }}
    />
  );
};

export default LocationPicker;
