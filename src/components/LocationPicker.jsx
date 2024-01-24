import React, { useState, useEffect, useCallback, useMemo } from 'react';
import mapboxgl from 'mapbox-gl';

const LocationPicker = ({ onLocationSelect }) => {
  const [viewport, setViewport] = useState({
    latitude: -38.5545,
    longitude: -58.7396,
    zoom: 14,
    width: '500px',
    height: '500px',
    center: [-58.7396, -38.5545],
  });

  const handleLocationSelect = useCallback(
    (newLocation) => {
      console.log('Nueva ubicación seleccionada:', newLocation);
      onLocationSelect(newLocation);
    },
    [onLocationSelect]
  );

  const memoizedViewport = useMemo(() => viewport, [viewport]);
  const memoizedHandleLocationSelect = useMemo(() => handleLocationSelect, [handleLocationSelect]);

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_REACT_APP_MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: 'map-container',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: memoizedViewport.center,
      zoom: memoizedViewport.zoom,
    });

    const marker = new mapboxgl.Marker();

    map.on('load', () => {
      console.log('Mapa cargado exitosamente.');
    });

    map.on('click', (e) => {
      const { lng, lat } = e.lngLat;
      memoizedHandleLocationSelect({ lat, lng });
      marker.setLngLat([lng, lat]).addTo(map);
    });

    return () => {
      map.remove();
    };
  }, [memoizedHandleLocationSelect, memoizedViewport]);

  return <div id="map-container" style={{ width: '500px', height: '500px', border: '1px solid red' }} />;
};

export default React.memo(LocationPicker);
