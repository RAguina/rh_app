import React from 'react';
import { useDropzone } from 'react-dropzone'; // Importa useDropzone de react-dropzone
import { subirImagen } from '../api/imagenes_inmuebles';
import { generarNombreUnico } from "../config/index.js";
import NavBarLine from './NavBarLine.jsx';
import { useParams, useNavigate } from 'react-router-dom';

const FormUploadImages = () => {
  console.log('FormUploadImages se está renderizando');
  const {propiedadId} = useParams();
  console.log('este es el mero!!!!idPropiedad en FormUploadImages:', propiedadId);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: true,
    onDrop: async (acceptedFiles) => {
      console.log(acceptedFiles);
      // Itera sobre cada archivo aceptado
      for (const file of acceptedFiles) {
        try {
        // Genera un nombre único para el archivo
        const nombreUnico = generarNombreUnico();
        // Crea un nuevo objeto File con el nombre único
        const fileConNombreUnico = new File([file], nombreUnico, { type: file.type });
          // Llama a subirImagen para cada archivo
          const response = await subirImagen(fileConNombreUnico, propiedadId);
          console.log('Respuesta del servidor:', response);
        } catch (error) {
          console.log("Error subiendo imagen");
          throw error;
        }
      }
    }
  });
  
  return (
    <>
    <NavBarLine propiedadId={propiedadId} />
    <div className='grid'>
      <div className='min-h-50vh' {...getRootProps()}>
        <input {...getInputProps()} />
        <p className='text-blue-500 mt-10 text-2xl text-center font-bold'>Arrastra y suelta algunas imágenes aquí, o haz clic para seleccionar imágenes</p>
      </div>
    </div>
    </>
  )
};

export default FormUploadImages;
