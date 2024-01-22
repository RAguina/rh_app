import React, {useState} from 'react';
import { useDropzone } from 'react-dropzone'; // Importa useDropzone de react-dropzone
import { subirImagen } from '../api/imagenes_inmuebles';
import { generarNombreUnico } from "../config/index.js";
import NavBarLine from './NavBarLine.jsx';
import { useParams, useNavigate } from 'react-router-dom';
import ErrorPage from './ErrorPage.jsx';


const FormUploadImages = () => {
  const {propiedadId} = useParams();
  const [errorMessage, setErrorMessage] = useState({ mensaje: null, tipo: null });
  const [uploadedImages, setUploadedImages] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: true,
    onDrop: async (acceptedFiles) => {
      const newImages = []; //Guardar las nuevas imagenes
      // Itera sobre cada archivo aceptado
      for (const file of acceptedFiles) {
        if (!uploadedImages.some(({ file: existingFile }) => existingFile.name === file.name)) {
          try {
            const nombreUnico = generarNombreUnico();
            const fileConNombreUnico = new File([file], nombreUnico, { type: file.type });
            newImages.push({
              url: URL.createObjectURL(file),
              file: fileConNombreUnico,
            });
          } catch (error) {
            console.error("Error subiendo imagen", error);
          }
        } else {
          console.log(`El archivo ${file.name} ya ha sido subido.`);
        }
      }
      
      setUploadedImages((prevImages) => [...prevImages, ...newImages]); //Agrega nuevas imagenes al estado
    }
  });

  const saveImages = async () => {
    try{
      for (const { url, file } of uploadedImages) {
        const isCover = url === mainImage;
        const response = await subirImagen(file, propiedadId, isCover);
      }
      setErrorMessage({ mensaje: 'Las imágenes se guardaron correctamente.', tipo: 'exito' });
      setTimeout(() => {
        navigate('/locationPicker')
      }, 5000);
    } catch (error){
      setErrorMessage({ mensaje: 'Hubo un error al guardar las imágenes.', tipo: 'error' });
    }
    
  };
  
  return (
    <>
    {errorMessage.mensaje && <ErrorPage mensaje={errorMessage.mensaje} tipo={errorMessage.tipo} />}
    <NavBarLine propiedadId={propiedadId} />
    <div className='grid'>
      <div className='container-dropzone mb-30 bg-blue-500' {...getRootProps()}>
        <input {...getInputProps()} />
        <p className='my-10 text-2xl text-center font-bold'>Arrastra y suelta algunas imágenes aquí, o haz clic para seleccionar imágenes</p>
      </div>
      <div className='flex flex-wrap justify-center'>
      {uploadedImages.map(({ url, file }, index) => (
        <img
          key={index}
          src={url}
          alt=""
          className={`w-32 h-32 object-cover m-2 rounded-lg shadow-lg ${mainImage === url ? 'border-2 border-blue-500' : ''}`}
          onClick={() => setMainImage(url)}
        />
      ))}
      </div>
    </div>
     <button className="navLinks2 mt-10"
     onClick={saveImages} disabled={mainImage === null || uploadedImages.length === 0}>Guardar imagen principal</button>
    </>
  )
};

export default FormUploadImages;
