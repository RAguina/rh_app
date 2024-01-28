import NavBarLine from '../components/NavBarLine.jsx';
import LocationPicker from '../components/LocationPicker.jsx';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { agregarCoordenadas } from '../api/inmuebles.js';

const LocationStep = () => {
  console.log('LocationStep se está renderizando.');
  const {propiedadId} = useParams();
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleConfirmClick = async () => {
    if (selectedLocation) {
      const { lat, lng } = selectedLocation;
      try {
        await agregarCoordenadas(propiedadId, lat, lng);
        console.log('Coordenadas actualizadas exitosamente.');
      } catch (error) {
        console.error('Error actualizando las coordenadas:', error);
      }
    }
  };

  return (
    <>
    <NavBarLine propiedadId={propiedadId} />
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="mt-8 w-500 h-500">
        <LocationPicker onLocationSelect={setSelectedLocation} />
      </div>
      {selectedLocation && (
      <button 
      className='navLinks'
      onClick={handleConfirmClick}>
        Confirmar ubicación
      </button> 
      )}
    </div>
    </>
  );
};

export default LocationStep;
