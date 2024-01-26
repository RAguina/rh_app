
import React, { useState, useEffect, useRef } from 'react';
import { registrarInmueble, actualizarInmueble, obtenerInmueblePorId } from '../api/inmuebles'; // Asegúrate de tener una función para registrar la propiedad
import ErrorPage from '../components/ErrorPage'; 
import { useNavigate} from 'react-router-dom';
import NavBarLine from '../components/NavBarLine';


function RegistrarPropiedades() {
  const [ propiedadId, setPropiedadId ] = useState(null);
  const [newProperty, setNewProperty] = useState(null); 
  const [errorMessage, setErrorMessage] = useState({ mensaje: null, tipo: null });
  const errorRef = useRef(null);
  const [errores, setErrores] = useState([]);
  const [form, setForm] = useState({
    nombre_propiedad: '',
    descripcion: '',
    tipo_propiedad: '',
    ubicacion_propiedad: '',
    precio_propiedad: '',
    estado_propiedad: '',
    propietario_id: '',
  }); 
  const navigate = useNavigate();


/* useEffect */
  useEffect(() => {
    const cargarDetallesPropiedad = async () => {
      try {
        // Llama a tu función de la API para obtener detalles de la propiedad
        const detallesPropiedad = await obtenerInmueblePorId(propiedadId);

        // Actualiza el estado del formulario con los detalles obtenidos
        setForm({
          nombre_propiedad: detallesPropiedad.nombre_propiedad,
          descripcion: detallesPropiedad.descripcion,
          tipo_propiedad: detallesPropiedad.tipo_propiedad,
          ubicacion_propiedad: detallesPropiedad.ubicacion_propiedad,
          precio_propiedad: detallesPropiedad.precio_propiedad,
          estado_propiedad: detallesPropiedad.estado_propiedad,
          propietario_id: detallesPropiedad.propietario_id,
        });
      } catch (error) {
        console.error('Error obteniendo detalles de la propiedad', error);
        // Manejar el error según tus necesidades
      }
    };
    // Si propiedadId existe, cargar detalles de la propiedad
    if (propiedadId) {
      cargarDetallesPropiedad();
    }
  }, [propiedadId]);

  /* handleChange */
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

  /* scrollToError */
    const scrollToError = () => {
      if (errorRef.current) {
        errorRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    };
  /*
  const camposRequeridos = [
    { nombre: 'nombre_propiedad', mensaje: 'Falta completar el nombre de la propiedad.' },
    { nombre: 'descripcion', mensaje: 'Falta completar la descripción.' },
    { nombre: 'tipo_propiedad', mensaje: 'Falta completar el tipo de propiedad.' },
    { nombre: 'ubicacion_propiedad', mensaje: 'Falta completar la ubicación de la propiedad.' },
    { nombre: 'precio_propiedad', mensaje: 'Falta completar el precio de la propiedad.' },
    { nombre: 'estado_propiedad', mensaje: 'Falta completar el estado de la propiedad.' },
  ];
  */

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

    console.log("id propietario de form:", form.propietario_id);
     
    try {
      if (propiedadId) {
        // Si propiedadId existe, realizar la lógica de edición
        const editedProperty = await actualizarInmueble(propiedadId, { ...form });
        console.log('Propiedad editada:', editedProperty);
        setErrorMessage({ mensaje: 'Propiedad actualizada con éxito. Espera por favor, en instantes seras redireccionado', tipo: 'exito' });
        scrollToError();
      } else {
        // Si propiedadId no existe, realizar la lógica de registro
        const newProperty = await registrarInmueble({ ...form });
        console.log('Propiedad registrada:', newProperty);
        // Avanza al siguiente paso después de guardar los datos(Recontra redundante)
        setNewProperty(newProperty);
        console.log("falla por aca", newProperty);
        setPropiedadId(newProperty.id_propiedad); //Redundante quiza
        try {
          setErrorMessage({ mensaje: 'Propiedad registrada con éxito. Espera por favor, en instantes seras redireccionado', tipo: 'exito' });
          scrollToError();
          setTimeout(() => {
            navigate(`/formUploadImages/${newProperty.id_propiedad}`);
            
          }, 5000);
        } catch (error) {
          console.error('Error al navegar:', error);
        }
      }
    } catch (error) {
      console.error('Error registrando/ editando la propiedad', error);
      if (error.response && error.response.data) {
        console.error('Detalles del error:', error.response.data);
      }
      setErrorMessage({ mensaje: 'Hubo un error. Por favor, inténtalo de nuevo.', tipo: 'error' });
      scrollToError();
    }
  };

  

  return (
    <div className="ml-5">
      {newProperty && <NavBarLine propiedadId={newProperty.id_propiedad} />}
      {errorMessage.mensaje && (
      <div ref={errorRef}>
        <ErrorPage mensaje={errorMessage.mensaje} tipo={errorMessage.tipo} />
      </div>
    )}      <div className='mt-10 w-3/5'>
        <h1 className="text-2xl font-bold mb-5">{propiedadId ? 'Editar Propiedad' : 'Registrar Propiedad'}</h1>
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
          <button 
          type="submit" 
          className="w-full navLinks">{propiedadId ? 'Editar' : 'Registrar'}</button>
        </form>
      </div>
    </div>
  );
}

export default RegistrarPropiedades;


/* esto o algo asi va a ir en el FormUploadImage
  const handleFileChange = (event) => {
    const file = event.target.files[0];
  
    // Genera un nombre único para el archivo
    const nombreUnico = generarNombreUnico();
  
    // Crea un nuevo objeto File con el nombre único
    const fileConNombreUnico = new File([file], nombreUnico, { type: file.type });
  
    setSelectedFile(fileConNombreUnico);
  };
  */
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
