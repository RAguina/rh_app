import React from 'react';
import { useDropzone } from 'react-dropzone'; // Importa useDropzone de react-dropzone
import { subirImagen } from '../api/imagenes_inmuebles';
import { generarNombreUnico } from "../config/index.js";
import NavBarLine from './NavBarLine.jsx';
import { useParams, useNavigate } from 'react-router-dom';

const FormUploadImages = () => {
  const {propiedadId} = useParams();
  const [uploadedImages, setUploadedImages] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: true,
    onDrop: async (acceptedFiles) => {
      const newImages = []; //Guardar las nuevas imagenes
      // Itera sobre cada archivo aceptado
      for (const file of acceptedFiles) {
        try {
        // Genera un nombre único para el archivo
        const nombreUnico = generarNombreUnico();
        // Crea un nuevo objeto File con el nombre único
        const fileConNombreUnico = new File([file], nombreUnico, { type: file.type });
          // Llama a subirImagen para cada archivo
          const response = await subirImagen(fileConNombreUnico, propiedadId);
          newImages.push(URL.createObjectURL(file));
        } catch (error) {
          console.error("Error subiendo imagen", error);
        }
      }
      setUploadedImages((prevImages) => [...prevImages, ...newImages]); //Agrega nuevas imagenes al estado
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
      <div>
          {uploadedImages.map((src, index) => ( // Muestra las imágenes cargadas
            <img key={index} src={src} alt="" className="w-32 h-32 object-cover" />
          ))}
        </div>
    </div>
    </>
  )
};

export default FormUploadImages;
