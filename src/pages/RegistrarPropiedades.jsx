
import React, { useState } from 'react';
import { registrarInmueble } from '../api/inmuebles'; // Asegúrate de tener una función para registrar la propiedad
import ErrorPage from '../components/ErrorPage'; 
import { subirImagen } from '../api/imagenes_inmuebles';
import {generarNombreUnico} from '../config/index'



function RegistrarPropiedades() {
  const [errorMessage, setErrorMessage] = useState({ mensaje: null, tipo: null });
  const [errores, setErrores] = useState([]);
  const [form, setForm] = useState({
    nombre_propiedad: '',
    descripcion: '',
    tipo_propiedad: '',
    ubicacion_propiedad: '',
    precio_propiedad: '',
    estado_propiedad: '',
    propietario_id: '',
    imagen_propiedad: null,
  }); 
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
  
    // Genera un nombre único para el archivo
    const nombreUnico = generarNombreUnico();
  
    // Crea un nuevo objeto File con el nombre único
    const fileConNombreUnico = new File([file], nombreUnico, { type: file.type });
  
    setSelectedFile(fileConNombreUnico);
  };
  
/*vIEJO HANDLE CHANG
  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.type === 'file' ? e.target.files[0] : e.target.value;
    
    setForm({
      ...form,
      [name]: value,
      propietario_id: name === 'propietario_id' ? value : form.propietario_id,
    });
  };
  */

  const handleChange = (e) => {
    if(e.target) {
      const name = e.target.name;
      const value = e.target.type === 'file' ? e.target.files[0] : e.target.value;
  
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    } else {
      console.log('e.target es null o undefined');
    }
  };
  const camposRequeridos = [
    { nombre: 'nombre_propiedad', mensaje: 'Falta completar el nombre de la propiedad.' },
    { nombre: 'descripcion', mensaje: 'Falta completar la descripción.' },
    { nombre: 'tipo_propiedad', mensaje: 'Falta completar el tipo de propiedad.' },
    { nombre: 'ubicacion_propiedad', mensaje: 'Falta completar la ubicación de la propiedad.' },
    { nombre: 'precio_propiedad', mensaje: 'Falta completar el precio de la propiedad.' },
    { nombre: 'estado_propiedad', mensaje: 'Falta completar el estado de la propiedad.' },
  ];


      // Validaciones de handleSubmit
    /*
    camposRequeridos.forEach(({ nombre, mensaje }) => {
      if (!form[nombre]) {
        setErrores((prevErrores) => [...prevErrores, mensaje]);
      }
    });
    
    const errores = camposRequeridos
    .filter(({ nombre }) => !form[nombre])
    .map(({ mensaje }) => mensaje);

    if (errores.length > 0) {
      setErrorMessage({ mensaje: errores.map((error, index) => <p key={index}>{error}</p>), tipo: 'error' });
      return;
    }
    */

  const handleSubmit = async (e) => {
    e.preventDefault();


    console.log("nombre archivo:", selectedFile.name);
    console.log("id propietario de form:", form.propietario_id);
    try {
      const newProperty = await registrarInmueble({
        ...form,
        imagen_propiedad: selectedFile ? selectedFile.name : null,
      });
      // Subir imagen
      await subirImagen(selectedFile,form.propietario_id);  
      if (newProperty) {
        console.log('hola');
      }
      setErrorMessage({ mensaje: 'Propiedad registrada con éxito', tipo: 'exito' });
      console.log('Propiedad registrada:', newProperty);
    } catch (error) {
      console.error('Error registrando la propiedad', error);
      if (error.response && error.response.data) {
        console.error('Detalles del error:', error.response.data);
      }
      setErrorMessage({ mensaje: 'Hubo un error registrando la propiedad. Por favor, inténtalo de nuevo.', tipo: 'error' });
      throw error;
    }
  }

  

  return (
    <div className="ml-5 mt-10 w-2/5 md:w-1/4">
     {errorMessage.mensaje && <ErrorPage mensaje={errorMessage.mensaje} tipo={errorMessage.tipo} />}
      <h1 className="text-2xl font-bold mb-5">Registrar Propiedades</h1>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <input 
        type="text" 
        name="nombre_propiedad" 
        placeholder="Nombre de la propiedad" 
        onChange={handleChange} 
        className="w-full p-2 border border-gray-300 rounded" />
        <textarea 
        name="descripcion" 
        placeholder="Descripción" 
        onChange={handleChange} 
        className="w-full p-2 border border-gray-300 rounded" />
        <input 
        type="text" 
        name="tipo_propiedad" 
        placeholder="Tipo de propiedad" 
        onChange={handleChange} 
        className="w-full p-2 border border-gray-300 rounded" />
        <input 
        type="text" 
        name="ubicacion_propiedad" 
        placeholder="Ubicación de la propiedad" 
        onChange={handleChange} 
        className="w-full p-2 border border-gray-300 rounded" />
        <input 
        type="number" 
        step="0.01" 
        name="precio_propiedad" 
        placeholder="Precio de la propiedad" 
        onChange={handleChange} 
        className="w-full p-2 border border-gray-300 rounded" />
        <input 
        type="text" 
        name="estado_propiedad" 
        placeholder="Estado de la propiedad" 
        onChange={handleChange} 
        className="w-full p-2 border border-gray-300 rounded" />
        <input 
        type="number" 
        name="propietario_id" 
        placeholder="ID del propietario" 
        onChange={handleChange} 
        className="w-full p-2 border border-gray-300 rounded" />
        <input 
          type="file" 
          name="imagen_propiedad" 
          onChange={handleFileChange} 
          className="w-full p-2 border border-gray-300 rounded" 
        />
        <button 
        type="submit" 
        className="w-full p-2 bg-blue-500 text-white rounded">Registrar</button>
      </form>
    </div>
  );
}

export default RegistrarPropiedades;
