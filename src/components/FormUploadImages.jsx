import React, {useContext} from 'react';
import { useDropzone } from 'react-dropzone'; // Importa useDropzone de react-dropzone
import axios from 'axios'; // Importa axios
import { subirImagen } from '../api/imagenes_inmuebles';
import { AuthContext } from '../config/AuthContext';

const FormUploadImages = () => {
  const { idPropietario } = useContext(AuthContext);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: true,
    onDrop: async (acceptedFiles) => {
      console.log(acceptedFiles);
      // Itera sobre cada archivo aceptado
      for (const file of acceptedFiles) {
        try {
          // Llama a subirImagen para cada archivo
          const response = await subirImagen(file, idPropietario);
          console.log('Respuesta del servidor:', response);
        } catch (error) {
          console.log("Error subiendo imagen");
          throw error;
        }
      }
    }
  });
  
  return (
    <div className='min-h-screen' {...getRootProps()}>
      <input {...getInputProps()} />
      <p className='text-blue-500 mt-10 text-2xl text-center font-bold'>Arrastra y suelta algunas imágenes aquí, o haz clic para seleccionar imágenes</p>
    </div>
  )
};

export default FormUploadImages;
