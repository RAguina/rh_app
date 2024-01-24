import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const LocationPicker = ({ onLocationSelect }) => {
  const [viewport, setViewport] = useState({
    latitude: -38.5545,
    longitude: -58.7396,
    zoom: 13,
    width: '100%',
    height: '500px',
    center: [-58.7396, -38.5545],
  });

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_REACT_APP_MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: 'map-container',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: viewport.center,
      zoom: viewport.zoom,
    });

    const marker = new mapboxgl.Marker(); // Crea un marcador

    map.on('load', () => {
      console.log('Mapa cargado exitosamente.');
    });

    map.on('click', (e) => {
      const { lng, lat } = e.lngLat;
      onLocationSelect({ lat, lng });

      // Mueve el marcador a la nueva ubicación
      marker.setLngLat([lng, lat]).addTo(map);
    });

    return () => {
      map.remove();
    };
  }, [onLocationSelect, viewport]);

  return <div id="map-container" style={{ width: '100%', height: '500px', border: '1px solid red' }} />;
};

export default LocationPicker;
