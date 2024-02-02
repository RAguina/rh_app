import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { obtenerComodidadesPorPropiedadId } from '../api/amenities';
import axios from 'axios';

const API_URL_INMUEBLES = "https://rhapi-dev-kkbb.3.us-1.fl0.io/inmuebles"
const API_URL_IMAGENES = "https://rhapi-dev-kkbb.3.us-1.fl0.io/imagen_inmuebles"

const DetalleInmueble = () => {
  const { id } = useParams();
  const [inmueble, setInmueble] = useState(null);
  const [imagenes, setImagenes] = useState([]);
  const [comodidades, setComodidades] = useState([]);

  function filtrarComodidades(comodidades) {
    const camposIgnorados = ['id_amenities', 'createdat', 'updatedat', 'propiedad_id'];
    return Object.fromEntries(
      Object.entries(comodidades).filter(([campo]) => !camposIgnorados.includes(campo))
    );
  }
  

  useEffect(() => {
    const obtenerInmueble = async () => {
      try {
        const respuesta = await axios.get(`${API_URL_INMUEBLES}/${id}`);
        setInmueble(respuesta.data);
      } catch (error) {
        console.error('Hubo un error al obtener el inmueble: ', error);
      }
    };

    const obtenerImagenes = async () => {
      try {
        const respuesta = await axios.get(`${API_URL_IMAGENES}/${id}`);
        setImagenes(respuesta.data);
      } catch (error) {
        console.error('Hubo un error al obtener las imágenes: ', error);
      }
    };

    const obtenerComodidades = async () => {
      try {
        const comodidadesRespuesta = await obtenerComodidadesPorPropiedadId(id);
        const comodidadesFiltradas = filtrarComodidades(comodidadesRespuesta);
        setComodidades(comodidadesFiltradas);
      } catch (error) {
        console.error('Hubo un error al obtener las comodidades: ', error);
      }
    };

    obtenerInmueble();
    obtenerImagenes();
    obtenerComodidades();
  }, [id]);

  if (!inmueble || !imagenes || !comodidades) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <Link to="/listadoPropiedades" className="font-bold text-2xl mb-20 mt-10">&lt; Volver a la página anterior</Link>
      <h1 className="text-3xl font-bold mb-4 text-center">{inmueble.nombre_propiedad}</h1>
      <p className="mb-2">Descripcion: <span className='font-bold'>{inmueble.descripcion}</span></p>
      <p className="mb-2">Tipo de propiedad: <span className='font-bold'>{inmueble.tipo_propiedad}</span></p>
      <p className="mb-2">Ubicación: <span className='font-bold'>{inmueble.ubicacion_propiedad}</span></p>
      <p className="mb-2">Precio: <span className='font-bold'>${inmueble.precio_propiedad}</span></p>
      <p className="mb-2">Estado: <span className='font-bold'>{inmueble.estado_propiedad}</span></p>
      <p className="mb-2">ID del propietario: <span className='font-bold'>{inmueble.propietario_id}</span></p>
      <p className="mb-2">Fecha de subida: <span className='font-bold'>{inmueble && inmueble.createdat ? new Date(inmueble.createdat).toLocaleDateString() : 'N/A'}</span></p>
      
      <div className="mt-8 font-sans">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Comodidades</h2>
        <ul className="list-none pl-0">
          {Object.entries(comodidades).map(([comodidad, valor]) => (
            <li key={comodidad} className="mb-2">
              <strong className="text-gray-700">{comodidad}:</strong> 
              <span className={`${valor ? 'text-green-800' : 'text-red-500'} fontbold`}>{valor ? 'Sí' : 'No'}</span>
            </li>
          ))}
        </ul>
      </div>


      <div className="flex justify-center gap-4">
      {imagenes.map((imagen, index) => (
        <img key={index} src={imagen.url_imagen} alt={`Imagen ${index + 1}`} className="w-full object-cover h-64 border-black" />
      ))}
      </div>
    </div>
  );
  
};

export default DetalleInmueble;
