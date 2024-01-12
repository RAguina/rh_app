import axios from 'axios';

//const API_URL = "http://localhost:3000/inmuebles"
const API_URL = "https://rhapi-dev-kkbb.3.us-1.fl0.io/inmuebles"

export const registrarInmueble = async (inmueble) => {
  try {
    const response = await axios.post(API_URL, inmueble)
    return response.data;
  } catch (error) {
    console.error('Error registrando el inmueble en registrarInmueble', error);
    throw error;
  }
};  

export const actualizarInmueble = async (id, inmuebleModificado) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, inmuebleModificado);
    return response.data;
  } catch (error) {
    console.error(`Error actualizando el inmueble con id ${id}`, error);
    throw error;
  }
};

export const eliminarInmueble = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error eliminando el inmueble con id ${id}`, error);
    throw error;
  }
};

export const obtenerInmuebles = async () => {
  try {
    const response = await axios.get(API_URL);
    //const response = await axios.get(`${process.env.REACT_APP_API_URL_LOCAL}/inmuebles`);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo los inmuebles', error);
    throw error;
  }
};


export const obtenerInmueblePorId = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error obteniendo el inmueble con id ${id}`, error);
    throw error;
  }
};


