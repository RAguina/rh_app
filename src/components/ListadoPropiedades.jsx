import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {obtenerInmuebles} from '../api/inmuebles';
import { obtenerImagenPortada } from '../api/imagenes_inmuebles';
import logo from "../assets/logov2.svg"

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
  

  return (
    <div className='text-center'>
      <h1 className='text-3xl md:mb-10 lg:mb-20 font-bold'>ListadoPropiedades</h1>
      {cargando ? (
        <p>Cargando propiedades...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.isArray(currentProperties) && currentProperties.length > 0 ? (
            currentProperties.map((propiedad, index) => {
              const urlImagenPortada = imagenesPortada[index];
  
              return (
                <div key={propiedad.id_propiedad} className="max-w-md bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3">
                  <div className="md:flex">
                    <div className="md:flex-shrink-0">
                      <Link to={`/inmuebles/${propiedad.id_propiedad}`} className='ml-5 font-bold'>Más Información</Link>
                    </div>
                    <div className="p-8">
                      <h2 className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{propiedad.nombre_propiedad}</h2>
                      {urlImagenPortada ? (
                        <img src={urlImagenPortada} alt="Portada" className="w-full h-32 object-cover mb-4" />
                      ) : (
                        <div className="w-full h-32 mb-4 bg-gray-200">Imagen no disponible</div>
                      )}
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
  
          {/* Agrega la paginación aquí */}
          <div className="pagination">
            {Array.from({ length: Math.ceil(propiedades.length / propertiesPerPage) }, (_, index) => (
              <button key={index} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
  
  
}

export default ListadoPropiedades
