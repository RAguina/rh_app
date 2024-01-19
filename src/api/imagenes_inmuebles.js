import axios from "axios";
import {getCookie} from '../config/cookieUtils.js'

export const subirImagen = async (file, idPropietario) => {
  try {
    // Crea un objeto FormData
    const formData = new FormData();
  
  
    console.log("Hola q tal soy un clg en subirImagen y el idPropietario anda por el :", idPropietario);
    formData.append('image', file);
    formData.append('propietario_id', idPropietario); 
    formData.append('is_cover', false);

    console.log("el valor getCookie, el token, giordano", getCookie('token'));
    // Realiza la solicitud POST al servidor
    const response = await axios.post("https://rhapi-dev-kkbb.3.us-1.fl0.io/imagen_inmuebles/upload", formData, /*{
        headers: {
        'Content-Type': 'multipart/form-data'
        , 'Authorization': `Bearer ${getCookie('token')}`, // Token JWT
      },
    }*/
    );
    console.log("response.data",response.data);
    console.log("El estado de la respuesta es:", response.status)
    console.log('Respuesta del servidor:', response.data.propiedad_id); 
    console.log("response.data.public_id",response.data.nombre_imagen);
    return response.data;
  } catch (error) {
    console.log("Error subiendo imagen 25");
    console.error('Error subiendo la imagen', error.response ? error.response.data : error.message);
    throw error;
  }
};

//const API_URL = "https://rhapi-dev-kkbb.3.us-1.fl0.io"






