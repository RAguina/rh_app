import React, { useState } from 'react';
import { StaticMap } from '@urbica/react-map-gl';
import { Marker, Popup } from 'react-map-gl';

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
    <StaticMap
      {...viewport}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onClick={handleLocationSelect}
    >
      <Marker latitude={viewport.latitude} longitude={viewport.longitude}>
        <Popup latitude={viewport.latitude} longitude={viewport.longitude}>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </StaticMap>
  );
};

export default LocationPicker;
