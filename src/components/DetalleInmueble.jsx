import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const API_URL_INMUEBLES = "https://rhapi-dev-kkbb.3.us-1.fl0.io/inmuebles"
const API_URL_IMAGENES = "https://rhapi-dev-kkbb.3.us-1.fl0.io/imagen_inmuebles"

const DetalleInmueble = () => {
  const { id } = useParams();
  const [inmueble, setInmueble] = useState(null);
  const [imagenes, setImagenes] = useState([]);

  useEffect(() => {
    const obtenerInmueble = async () => {
      try {
        const respuesta = await axios.get(`${API_URL_INMUEBLES}/${id}`);
        setInmueble(respuesta.data);
        console.log("inmueble.fecha",inmueble.createdAt);
      } catch (error) {
        console.error('Hubo un error al obtener el inmueble: ', error);
      }
    };

    const obtenerImagenes = async () => {
      try {
        const respuesta = await axios.get(`${API_URL_IMAGENES}/${id}`);
        console.log("obtenerInmueble respuesta:", respuesta);
        setImagenes(respuesta.data);
      } catch (error) {
        console.error('Hubo un error al obtener las imágenes: ', error);
      }
    };

    obtenerInmueble();
    obtenerImagenes();
  }, [id]);

  if (!inmueble || !imagenes) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <Link to="/listadoPropiedades" className="text-blue-500 text-3xl mb-20 mt-10">&lt; Volver a la página anterior</Link>
      <h1 className="text-2xl font-bold mb-4 text-center">{inmueble.nombre_propiedad}</h1>
      <p className="mb-2">Descripcion: <span className='font-bold'>{inmueble.descripcion}</span></p>
      <p className="mb-2">Tipo de propiedad: <span className='font-bold'>{inmueble.tipo_propiedad}</span></p>
      <p className="mb-2">Ubicación: <span className='font-bold'>{inmueble.ubicacion_propiedad}</span></p>
      <p className="mb-2">Precio: <span className='font-bold'>${inmueble.precio_propiedad}</span></p>
      <p className="mb-2">Estado: <span className='font-bold'>{inmueble.estado_propiedad}</span></p>
      <p className="mb-2">ID del propietario: <span className='font-bold'>{inmueble.propietario_id}</span></p>
      <p className="mb-2">Fecha de subida: <span className='font-bold'>{new Date(inmueble.createdAt).toLocaleDateString()}</span></p>
      <div className="grid grid-cols-2 gap-4">
      {imagenes.map((imagen, index) => (
        <img key={index} src={imagen.url_imagen} alt={`Imagen ${index + 1}`} className="w-full object-cover h-64" />
      ))}
      </div>
    </div>
  );
  
};

export default DetalleInmueble;
