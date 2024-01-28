import axios from 'axios';

const apiUrl = import.meta.env.VITE_REACT_APP_URL_AMENITIES;

// Función para obtener detalles de comodidades por propiedadId
export const obtenerComodidadesPorPropiedadId = async (propiedadId) => {
  try {
    const response = await axios.get(`${apiUrl}/inmuebles/${propiedadId}/comodidades`);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo comodidades por propiedadId', error);
    throw error;
  }
};

// Función para crear comodidades para una propiedad
export const crearComodidades = async (propiedadId, comodidades) => {
  try {
    const response = await axios.post(`${apiUrl}/inmuebles/${propiedadId}/comodidades`, comodidades);
    return response.data;
  } catch (error) {
    console.error('Error creando comodidades', error);
    throw error;
  }
};

// Función para actualizar comodidades por propiedadId
export const actualizarComodidades = async (propiedadId, comodidades) => {
  try {
    const response = await axios.put(`${apiUrl}/inmuebles/${propiedadId}/comodidades`, comodidades);
    return response.data;
  } catch (error) {
    console.error('Error actualizando comodidades', error);
    throw error;
  }
};

// Otras funciones relacionadas con comodidades podrían ir aquí
