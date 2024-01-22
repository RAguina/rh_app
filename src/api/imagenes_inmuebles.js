import axios from "axios";
import {getCookie} from '../config/cookieUtils.js'

export const subirImagen = async (file, idPropietario,isCover) => {
  try {
    // Crea un objeto FormData
    const formData = new FormData();

    formData.append('image', file);
    formData.append('propietario_id', idPropietario); 
    formData.append('is_cover', isCover);

    // Realiza la solicitud POST al servidor
    const response = await axios.post("https://rhapi-dev-kkbb.3.us-1.fl0.io/imagen_inmuebles/upload", formData, /*{
        headers: {
        'Content-Type': 'multipart/form-data'
        , 'Authorization': `Bearer ${getCookie('token')}`, // Token JWT
      },
    }*/
    );
    return response.data;
  } catch (error) {
    console.error('Error subiendo la imagen', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const obtenerImagenPortada = async (idInmueble) => {
  try {
    const response = await axios.get(`https://rhapi-dev-kkbb.3.us-1.fl0.io/imagen_inmuebles/portada/${idInmueble}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener la imagen de portada', error.response ? error.response.data : error.message);
    throw error;
  }
};

//const API_URL = "https://rhapi-dev-kkbb.3.us-1.fl0.io"






