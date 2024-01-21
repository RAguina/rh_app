import React, {useState} from 'react';
import { useDropzone } from 'react-dropzone'; // Importa useDropzone de react-dropzone
import { subirImagen } from '../api/imagenes_inmuebles';
import { generarNombreUnico } from "../config/index.js";
import NavBarLine from './NavBarLine.jsx';
import { useParams, useNavigate } from 'react-router-dom';


const FormUploadImages = () => {
  const {propiedadId} = useParams();
  const [uploadedImages, setUploadedImages] = useState([]);
  const [mainImage, setMainImage] = useState(null);
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
          //const response = await subirImagen(fileConNombreUnico, propiedadId);
          newImages.push({
            url: URL.createObjectURL(file),
            file: fileConNombreUnico,
          });
        } catch (error) {
          console.error("Error subiendo imagen", error);
        }
      }
      setUploadedImages((prevImages) => [...prevImages, ...newImages]); //Agrega nuevas imagenes al estado
    }
  });

  const saveImages = async () => {
    for (const { url, file } of uploadedImages) {
      const isCover = url === mainImage;
      const response = await subirImagen(file, propiedadId, isCover);
    }
  };
  
  console.log("Maininage y uploaded",mainImage, uploadedImages);
  return (
    <>
    <NavBarLine propiedadId={propiedadId} />
    <div className='grid'>
      <div className='container-dropzone' {...getRootProps()}>
        <input {...getInputProps()} />
        <p className='text-blue-500 mt-10 text-2xl text-center font-bold'>Arrastra y suelta algunas imágenes aquí, o haz clic para seleccionar imágenes</p>
      </div>
      <div>
      {uploadedImages.map(({ url, file }, index) => (
        <img
          key={index}
          src={url}
          alt=""
          className={`w-32 h-32 object-cover ${mainImage === url ? 'border-2 border-blue-500' : ''}`}
          onClick={() => setMainImage(url)}
        />
      ))}
      </div>
    </div>
     <button className="navlinks"
     onClick={saveImages} disabled={mainImage === null || uploadedImages.length === 0}>Guardar imagen principal</button>
    </>
  )
};

export default FormUploadImages;
