import NavBarLine from '../components/NavBarLine.jsx';
import LocationPicker from '../components/LocationPicker.jsx';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const LocationStep = () => {
  console.log('LocationStep se está renderizando.');
  const {propiedadId} = useParams();
  console.log('Propiedad ID:', propiedadId); // Agregado

  const [location, setLocation] = useState(null);

  const handleLocationSelect = (newLocation) => {
    console.log('Nueva ubicación seleccionada:', newLocation); // Agregado
    setLocation(newLocation);
  };

  return (
    <>
    <NavBarLine propiedadId={propiedadId} />
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="mt-8">
        <LocationPicker onLocationSelect={handleLocationSelect} />
      </div>
      <h1>HOLA</h1>
    </div>
    </>
  );
};

export default LocationStep;
