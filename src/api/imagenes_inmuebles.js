import axios from "axios";


export const subirImagen = async (file,idPropietario) => {
  try {
    // Crea un objeto FormData
    const formData = new FormData();
    formData.append('image', file);
    formData.append('propietario_id', idPropietario);

    // Muestra el contenido de FormData
    for (let pair of formData.entries()) {
      console.log(`Nombre del archivo: ${file.name}`);
      console.log(`Tamaño del archivo: ${file.size}`);
      console.log(`Tipo de archivo: ${file.type}`);
      console.log(pair[0] + ', ' + pair[1]);
    }
    
    


    // Realiza la solicitud POST al servidor
    const response = await axios.post('https://rhapi-dev-kkbb.3.us-1.fl0.io/imagen_inmuebles/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Agrega el token de autenticación si es necesario
      },
    });
    console.log('Respuesta del servidor:', response.data); // Agrega esta línea para obtener más información

    return response.data.url;
  } catch (error) {
    console.error('Error subiendo la imagen', error.response ? error.response.data : error.message);
    throw error;
  }
};
