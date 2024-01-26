  import React, { useState } from 'react';
  import { registerUser, resetFormUsuario } from '../api/user';
  import ErrorPage from '../components/ErrorPage';


  function RegistroUsuario() {
    const [form, setForm] = useState({
      nombre: '',
      apellido: '',
      ciudad: '',
      email: '',
      password: '',
      es_propietario: false,
    });
    const [mensajeError, setMensajeError] = useState(null);

    const handleChange = (e) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await registerUser(form);
        console.log('Usuario registrado con exito');
        setForm({
          nombre: '',
          apellido: '',
          ciudad: '',
          email: '',
          password: '',
          es_propietario: false,
        });
        setMensajeError({ texto: 'Usuario registrado con exito', tipo: 'exito' });
      } catch (error) {
        console.error('Error registrando al usuario: ', error.response.data.message);
        setMensajeError({ texto: error.response.data.message, tipo: 'error' });
      }
    };

    return (
      <div className="ml-5 mw-2/5 md:w-1/4">
        {mensajeError && <ErrorPage mensaje={mensajeError.texto} tipo={mensajeError.tipo} />}        
        <h1 className="text-2xl font-bold mb-5 text-center">Registro de usuario</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            autoComplete="given-name" 
            type="text" name="nombre" id="nombre"
            placeholder="Nombre" 
            value={form.nombre}
            onChange={handleChange} 
            className="w-full p-2 border border-gray-300 rounded" />
          <input 
            autoComplete="family-name" 
            type="text" name="apellido" id="apellido"
            placeholder="Apellido" 
            value={form.apellido}
            onChange={handleChange} 
            className="w-full p-2 border border-gray-300 rounded" />
          <input 
            autoComplete="address-level2" 
            type="text" name="ciudad" id="ciudad"
            placeholder="Ciudad" 
            value={form.ciudad}
            onChange={handleChange} 
            className="w-full p-2 border border-gray-300 rounded" />
          <input 
            autoComplete="email" 
            type="email" name="email" id="email"
            placeholder="Email" 
            value={form.email}
            onChange={handleChange} 
            className="w-full p-2 border border-gray-300 rounded" />
          <input 
            type="password" name="password" id="password"
            placeholder="Contraseña" 
            autoComplete='password'
            value={form.password}
            onChange={handleChange} 
            className="w-full p-2 border border-gray-300 rounded" />
          <label className="flex items-center space-x-2">
            <input 
              type="checkbox" name="es_propietario" 
              value={form.es_propietario}
              onChange={(e) => handleChange({ target: { name: e.target.name, value: e.target.checked } })} />
            <span>Propietario</span>
          </label>
          <button type="submit" className="w-full navlinks">Registrar</button>
        </form>
      </div>
    );
  }

  export default RegistroUsuario;
