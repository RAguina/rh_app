import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {obtenerInmuebles} from '../api/inmuebles';
import { obtenerImagenPortada } from '../api/imagenes_inmuebles';

const ListadoPropiedades = () => {
  const [propiedades, setPropiedades] = useState([])
  const [cargando, setCargando] = useState(true);
  const [imagenesPortada,setImagenesPortada] = useState([])

  useEffect(() => {
    const obtenerPropiedadesEImagenes = async () => {
      try {
        const propiedades = await obtenerInmuebles();
        const imagenesPortada = [];
        for (let i = 0; i < propiedades.length; i++) {
          const imagenPortada = await obtenerImagenPortada(propiedades[i].id_propiedad);
          imagenesPortada.push(imagenPortada);
        }
        setPropiedades(propiedades);
        setImagenesPortada(imagenesPortada);
        setCargando(false); 
      } catch (error) {
        console.error('Hubo un error al obtener las propiedades o las imágenes: ', error);
        setCargando(false);
      }
    }
    
    obtenerPropiedadesEImagenes();
  }, []);
  

  /* Viejo haris shelman
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
  */


  return (
    <div className='text-center'>
      <h1 className='text-3xl mt-10 md:mb-10 lg:mb-20 font-bold'>ListadoPropiedades</h1>
      {cargando ? (
        <p>Cargando propiedades...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.isArray(propiedades) && propiedades.length > 0 ? (
            propiedades.map((propiedad, index) => {
              return (
                <div key={propiedad.id_propiedad} className="max-w-md bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3">
                  <div className="md:flex">
                    <div className="md:flex-shrink-0">                  
                      <Link to={`/inmuebles/${propiedad.id_propiedad}`} className='ml-5 font-bold'>Mas informacion</Link>
                    </div>
                    <div className="p-8">
                      <h2 className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{propiedad.nombre_propiedad}</h2>
                      <img src={imagenesPortada[index]} alt="Portada" className="w-full h-32 object-cover mb-4" />
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
