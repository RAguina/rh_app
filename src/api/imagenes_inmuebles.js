import axios from "axios";

// Cambia tu función subirImagen en RegistrarPropiedades.jsx a algo así:

export const subirImagen = async (file) => {
  try {
    // Crea un objeto FormData
    const formData = new FormData();
    formData.append('image', file);

     //Muestra el contenido de FormData
    for (let pair of formData.entries()) {
      console.log(`Nombre del archivo: ${file.name}`);
      console.log(`Tamaño del archivo: ${file.size}`);
      console.log(`Tipo de archivo: ${file.type}`);
      console.log(pair[0] + ', ' + pair[1]);
    }
    

    // Realiza la solicitud POST al servidor
    const response = await axios.post('https://rhapi-dev-kkbb.3.us-1.fl0.io/imagen_inmuebles/upload', formData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Agrega el token de autenticación si es necesario
      },
    });

    return response.data.url;
  } catch (error) {
    console.error('Error subiendo la imagen', error.response.data);
    throw error; // Re-lanza el error para que pueda ser manejado en el componente llamador
  }
};
