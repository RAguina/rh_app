import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {obtenerInmuebles} from '../api/inmuebles';
import { obtenerImagenPortada } from '../api/imagenes_inmuebles';

const ListadoPropiedades = () => {
  const [propiedades, setPropiedades] = useState([])
  const [imagenesPortada, setImagenesPortada] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerPropiedades = async () => {
      try {
        const respuesta = await obtenerInmuebles();
        setPropiedades(respuesta);
        setCargando(false); 
      } catch (error) {
        console.error('Hubo un error al obtener las propiedades: ', error);
        setCargando(false);
      }
    }
  
    obtenerPropiedades();
  }, []);

  useEffect(() => {
    const obtenerImagenesPortada = async () => {
      const imagenes = await Promise.all(
        propiedades.map(async (propiedad) => {
          try {
            const imagenPortada = await obtenerImagenPortada(propiedad.id_propiedad);
            return imagenPortada;
          } catch (error) {
            console.error('Hubo un error al obtener la imagen de portada: ', error);
            return null;
          }
        })
      );
      setImagenesPortada(imagenes);
    };

    if (propiedades.length > 0) {
      obtenerImagenesPortada();
    }
  }, [propiedades]);

  return (
    <div className='text-center'>
      <h1 className='text-3xl mt-10 md:mb-10 lg:mb-20 font-bold'>ListadoPropiedades</h1>
      {cargando ? (
        <p>Cargando propiedades...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.isArray(propiedades) && propiedades.length > 0 ? (
            propiedades.map((propiedad, index) => {
              const imagenPortada = imagenesPortada[index];

              return (
                <div key={propiedad.id_propiedad} className="max-w-md bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3">
                  <div className="md:flex">
                    <div className="md:flex-shrink-0">                  
                      <Link to={`/inmuebles/${propiedad.id_propiedad}`} className='ml-5 font-bold'>Mas informacion</Link>
                    </div>
                    <div className="p-8">
                      <h2 className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{propiedad.nombre_propiedad}</h2>
                      {imagenPortada && <img src={imagenPortada.url} alt="Portada" className="w-full h-32 object-cover mb-4" />}
                      <p className="mt-2 text-gray-500 truncate-4-lines">{propiedad.descripcion}</p>
                      <p className="mt-2 text-gray-500">Tipo: {propiedad.tipo_propiedad}</p>
                      <p className="mt-2 text-gray-500">Ubicación: {propiedad.ubicacion_propiedad}</p>
                      <p className="mt-2 text-gray-500">Precio: ${propiedad.precio_propiedad}</p>
                      <p className="mt-2 text-gray-500">Estado: {propiedad.estado_propiedad}</p>
                    </div>  
                  </div>
                </div>
              );
            })
          ) : (
            <p>No hay propiedades para mostrar</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ListadoPropiedades
