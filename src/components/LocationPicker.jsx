import React, { useEffect, useCallback, useMemo, useRef } from 'react';
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
  const markerRef = useRef();

  const memoizedViewport = useMemo(() => viewport, [viewport]);

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_REACT_APP_MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: 'map-container',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: memoizedViewport.center,
      zoom: memoizedViewport.zoom,
    });

    markerRef.current = new mapboxgl.Marker();

    map.on('load', () => {
      console.log('Mapa cargado exitosamente.');
    });

    map.on('click', (e) => {
      const { lng, lat } = e.lngLat;
      onLocationSelect({ lat, lng });
      markerRef.current.setLngLat([lng, lat]).addTo(map);
    });

    return () => {
      map.remove();
    };
  }, [onLocationSelect, memoizedViewport]);

  return (
    <div>
      <div id="map-container" style={{ width: '500px', height: '500px', border: '2px solid red' }} />
    </div>
  );
};

export default React.memo(LocationPicker);
