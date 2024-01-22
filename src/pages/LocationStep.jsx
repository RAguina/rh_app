import NavBarLine from '../components/NavBarLine.jsx';
import LocationPicker from '../components/LocationPicker.jsx';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const LocationStep = () => {
  const {propiedadId} = useParams();
  console.log('Propiedad ID:', propiedadId); // Agregado

  const [location, setLocation] = useState(null);

  const handleLocationSelect = (newLocation) => {
    console.log('Nueva ubicación seleccionada:', newLocation); // Agregado
    setLocation(newLocation);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <NavBarLine propiedadId={propiedadId} />
      <div className="mt-8">
        <LocationPicker onLocationSelect={handleLocationSelect} />
      </div>
      {/* Aquí puedes poner cualquier otro componente o contenido que necesites */}
    </div>
  );
};

export default LocationStep;
