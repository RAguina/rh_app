import axios from 'axios';

const API_URL = "http://localhost:3000/inmuebles"
export const registrarInmueble = async (inmueble) => {
  try {
    const response = await axios.post(API_URL, {inmueble},{headers: {'Authorization': `Bearer ${token}`}});
    return response.data;
  } catch (error) {
    console.error('Error registrando el inmueble', error.response.data);
    throw error;
  }
};

export const actualizarInmueble = async (id, inmuebleModificado) => {
  try {
    const response = await axios.put(`http://localhost:3000/inmuebles/${id}`, inmuebleModificado);
    return response.data;
  } catch (error) {
    console.error(`Error actualizando el inmueble con id ${id}`, error);
    throw error;
  }
};

export const eliminarInmueble = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3000/inmuebles/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error eliminando el inmueble con id ${id}`, error);
    throw error;
  }
};

export const obtenerInmuebles = async () => {
  try {
    const response = await axios.get('http://localhost:3000/inmuebles');
    return response.data;
  } catch (error) {
    console.error('Error obteniendo los inmuebles', error);
    throw error;
  }
};


export const obtenerInmueblePorId = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3000/inmuebles/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error obteniendo el inmueble con id ${id}`, error);
    throw error;
  }
};


