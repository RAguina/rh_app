import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const LocationPicker = ({ onLocationSelect }) => {
  /* New York
  const [viewport, setViewport] = useState({
    latitude: 40.7128, // Nueva York
    longitude: -74.0060, // Nueva York
    zoom: 13,
    width: '100%',
    height: '500px',
    center: [-74.0060, 40.7128], // Nueva York
  });
  */
  
  // /* Necochea
  const [viewport, setViewport] = useState({
    latitude: -38.5545,
    longitude: -58.7396,
    zoom: 14,
    width: '100%',
    height: '500px',
    center: [-58.7396, -38.5545],
  });
  
  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_REACT_APP_MAPBOX_TOKEN;

    // Configuración detallada de Mapbox GL JS
    mapboxgl.config.API_URL = 'https://api.mapbox.com';
    mapboxgl.config.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT = false;
    mapboxgl.config.WEBGL_DEBUG_CANVAS_CONTEXT = true;
    mapboxgl.config.WEBGL_DEBUG_SHADERS = true;

    const map = new mapboxgl.Map({
      container: 'map-container',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: viewport.center,
      zoom: viewport.zoom,
    });

    map.on('load', () => {
      console.log('Mapa cargado exitosamente.');
    });

    map.on('click', (e) => {
      onLocationSelect({ lat: e.lngLat.lat, lng: e.lngLat.lng });
    });

    return () => {
      map.remove();
    };
  }, [onLocationSelect, viewport]);
  
  return <div id="map-container" style={{ width: '500px', height: '500px', border: '1px solid red' }} />;

  //return <div id="map-container" style={{ width: viewport.width, height: viewport.height, border: '1px solid red' }} />;
};

export default LocationPicker;
