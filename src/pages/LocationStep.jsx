import NavBarLine from './NavBarLine.jsx';
import LocationPicker from '../components/LocationPicker.jsx';
import { useState } from 'react';

const LocationStep = () => {
  // Aquí puedes poner cualquier estado o lógica que necesites compartir entre NavBarLine y LocationPicker
  const [location, setLocation] = useState(null);

  const handleLocationSelect = (newLocation) => {
    setLocation(newLocation);
  };
  
  return (
    <>
      <NavBarLine propiedadId={propiedadId} />
      <LocationPicker onLocationSelect={handleLocationSelect} />
      {/* Aquí puedes poner cualquier otro componente o contenido que necesites */}
    </>
  );
};

export default LocationStep;
