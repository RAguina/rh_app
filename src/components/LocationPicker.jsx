import React, { useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = import.meta.env.VITE_REACT_APP_MAPBOX_TOKEN_PUBLIC;

const LocationPicker = ({ onLocationSelect }) => {
  const [viewport, setViewport] = useState({
    latitude: -38.5545,
    longitude: -58.7396,
    zoom: 13,
    width: "100%",
    height: "500px",
    center: [-58.7396, -38.5545], 
  });

  console.log('Viewport:', viewport); 

  const handleLocationSelect = (e) => {
    onLocationSelect({ lat: e.lngLat[1], lng: e.lngLat[0] });
  };

  return (
    <div
      ref={el => {
        const map = new mapboxgl.Map({
          container: el,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: viewport.center, // Actualizado
          //center: [viewport.longitude, viewport.latitude],
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
