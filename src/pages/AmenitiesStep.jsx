import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBarLine from '../components/NavBarLine';
import ErrorPage from '../components/ErrorPage';
import { crearComodidades } from '../api/amenities';

const AmenitiesStep = () => {
  const { propiedadId } = useParams();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState({ mensaje: null, tipo: null });
  const [amenities, setAmenities] = useState({
    airConditioning: false,
    heating: false,
    garage: false,
    garden: false,
    grill: false,
    pool: false,
    tv: false,
    wifi: false,
    pets: false,
    youngGroup: false,
    ecoFriendly: false,
    checkIn: '',
    checkOut: '',
  });

  const handleChange = (event) => {
    setAmenities({
      ...amenities,
      [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
    });
  };

  useEffect(() => {
    if (errorMessage && errorMessage.tipo === 'exito') {
      const timer = setTimeout(() => {
        navigate(`/inmuebles/${propiedadId}`);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage, navigate, propiedadId]);


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Utiliza la función de cliente API para crear comodidades
      await crearComodidades(propiedadId, amenities);
      // Actualiza el estado de éxito
      setErrorMessage({ mensaje: 'Comodidades guardadas con éxito.', tipo: 'exito' });
    } catch (error) {
      console.error('Error al guardar comodidades:', error);
      setErrorMessage({ mensaje: 'Hubo un problema al guardar las comodidades.', tipo: 'error' });
    }
  };

  return (
    <>
      <NavBarLine propiedadId={propiedadId} />
      {errorMessage.mensaje && (
        <div>
          <ErrorPage mensaje={errorMessage.mensaje} tipo={errorMessage.tipo} />
        </div>
      )}
      <form onSubmit={handleSubmit} className="ml-5 mw-2/5 md:w-3/5">
        <h1 className="text-2xl font-bold mb-5 text-center">Configurar Comodidades</h1>
        <div className='w-3/5'>
          <label className="block mb-2">
            <input type="checkbox" name="airConditioning" onChange={handleChange} />
            <span className="ml-2">Aire acondicionado</span>
          </label>
          <label className="block mb-2">
            <input type="checkbox" name="heating" onChange={handleChange} />
            <span className="ml-2">Calefacción</span>
          </label>
          <label className="block mb-2">
            <input type="checkbox" name="garage" onChange={handleChange} />
            <span className="ml-2">Garage</span>
          </label>
          <label className="block mb-2">
            <input type="checkbox" name="garden" onChange={handleChange} />
            <span className="ml-2">Jardín</span>
          </label>
          <label className="block mb-2">
            <input type="checkbox" name="grill" onChange={handleChange} />
            <span className="ml-2">Parrilla</span>
          </label>
          <label className="block mb-2">
            <input type="checkbox" name="pool" onChange={handleChange} />
            <span className="ml-2">Piscina</span>
          </label>
          <label className="block mb-2">
            <input type="checkbox" name="tv" onChange={handleChange} />
            <span className="ml-2">TV</span>
          </label>
          <label className="block mb-2">
            <input type="checkbox" name="wifi" onChange={handleChange} />
            <span className="ml-2">Wifi</span>
          </label>
          <label className="block mb-2">
            <input type="checkbox" name="pets" onChange={handleChange} />
            <span className="ml-2">Mascotas</span>
          </label>
          <label className="block mb-2">
            <input type="checkbox" name="youngGroup" onChange={handleChange} />
            <span className="ml-2">Acepta Jóvenes</span>
          </label>
          <label className="block mb-2">
            <input type="checkbox" name="ecoFriendly" onChange={handleChange} />
            <span className="ml-2">Eco Friendly</span>
          </label>
          <label className="block mb-2">
            <span className="mr-2">Check in</span>
            <input type="time" name="checkIn" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          </label>
          <label className="block mb-2">
            <span className="mr-2">Check out</span>
            <input type="time" name="checkOut" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          </label>
        </div>
        <button
          type="submit"
          className="w-full mb-10 navLinks bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Guardar
        </button>
      </form>
    </>
  );
  
  
};

export default AmenitiesStep;
