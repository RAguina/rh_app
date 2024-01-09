import React from 'react';
import { useDropzone } from 'react-dropzone'; // Importa useDropzone de react-dropzone
import axios from 'axios'; // Importa axios

const FormUploadImages = () => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: true,
    onDrop: async (acceptedFiles) => {
      // Itera sobre cada archivo aceptado
      for (const file of acceptedFiles) {
        try {
          // Crea un objeto FormData
          const formData = new FormData();
          formData.append('image', file);
          formData.append('propietario_id', idPropietario); 

          // Realiza la solicitud POST al servidor
          const response = await axios.post("https://rhapi-dev-kkbb.3.us-1.fl0.io/imagen_inmuebles/upload", formData, {
              headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${localStorage.getItem('token')}`, // Token JWT
            },
          });
          console.log("El estado de la respuesta es:", response.status)
          console.log('Respuesta del servidor:', response.data.propiedad_id); 
          console.log("response.data.public_id",response.data.nombre_imagen);
        } catch (error) {
          console.log("Error subiendo imagen");
          throw error;
        }
      }
    }
  });

  // El resto de tu componente va aquí...
};

export default FormUploadImages;
