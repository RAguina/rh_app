import NavBarLine from '../components/NavBarLine.jsx';
import LocationPicker from '../components/LocationPicker.jsx';
import { useState } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import { agregarCoordenadas } from '../api/inmuebles.js';
import ErrorPage from '../components/ErrorPage.jsx';
import { useEffect } from 'react';

const LocationStep = () => {
  console.log('LocationStep se está renderizando.');
  const {propiedadId} = useParams();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState({ mensaje: null, tipo: null });
  const navigate = useNavigate();

  const handleConfirmClick = async () => {
    if (selectedLocation) {
      const { lat, lng } = selectedLocation;
      try {
        await agregarCoordenadas(propiedadId, lat, lng);
        console.log('Coordenadas actualizadas exitosamente.');
        setErrorMessage({ mensaje: 'Las coordenadas se guardaron correctamente. Espera por favor, en instantes serás redireccionado', tipo: 'exito' });
      } catch (error) {
        console.error('Error actualizando las coordenadas:', error);
        setErrorMessage({ mensaje: 'Hubo un error al guardar las coordenadas. Por favor, inténtalo de nuevo.', tipo: 'error' });
      }
    }
  };

  useEffect(() => {
    if (errorMessage && errorMessage.tipo === 'exito') {
      const timer = setTimeout(() => {
        navigate(`/amenitiesStep/${propiedadId}`);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage, navigate,propiedadId]);

  return (
    <>
    <NavBarLine propiedadId={propiedadId} />
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="mt-8 w-500 h-500">
        <LocationPicker onLocationSelect={setSelectedLocation} />
      </div>
      {errorMessage && <ErrorPage mensaje={errorMessage.mensaje} tipo={errorMessage.tipo} />}
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
