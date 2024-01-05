import React, { useState, useContext } from 'react';
import { useNavigate, Redirect } from 'react-router-dom';
import axios from 'axios';
import ErrorPage from '../components/ErrorPage';
import { AuthContext, AuthProvider } from '../config/AuthContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState({ texto: null, tipo: null });
  //const navigate = useNavigate()
  const [redirectToHome, setRedirectToHome] = useState(false);
  const { handleLoginSuccess, handleLogout } = useContext(AuthContext);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://rhapi-dev-kkbb.3.us-1.fl0.io/usuarios/login', { email: username, password });
      setMensaje({ texto: 'Inicio de sesión exitoso', tipo: 'exito' });
      console.log(response.data);
      handleLoginSuccess(response.data.token);
      
      // Establece un temporizador para eliminar el token después de una hora
      setTimeout(() => {
        handleLogout();
      }, 3600000);

      setTimeout(() => {
        setRedirectToHome(true)
      }, 3000);
    } catch (error) {
      setMensaje({ texto: 'Error al iniciar sesión', tipo: 'error' });
      console.error(error);
    }
  };

  return (
    <>
    {redirectToHome ? <Redirect to="/home" /> : null}
    <ErrorPage mensaje={mensaje.texto} tipo={mensaje.tipo} />
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
          Nombre de usuario
        </label>
        <input onChange={handleUsernameChange} 
        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
        id="username" 
        autoComplete='email'
        type="text" 
        placeholder="Nombre de usuario" />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Contraseña
        </label>
        <input onChange={handlePasswordChange} 
        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
        id="password" 
        type="password" 
        placeholder="******************" 
        autoComplete='current-password'
        />
      </div>
      <div className="flex items-center justify-between">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Iniciar sesión
        </button>
      </div>
    </form>
    </>
  );
}

export default Login;
