import React, { useState } from 'react';
import { StaticMap, Marker, Popup } from 'react-map-gl';

const LocationPicker = ({ onLocationSelect }) => {
  const [viewport, setViewport] = useState({
    latitude: -38.5545,
    longitude: -58.7396,
    zoom: 13,
    width: "100%",
    height: "500px",
  });

  const handleLocationSelect = (e) => {
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
