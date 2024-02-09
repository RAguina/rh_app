import axios from 'axios';

const API_URL = "https://rhapi-dev-kkbb.3.us-1.fl0.io/usuarios"

export const registerUser = async (user) => {
  try {
    const response = await axios.post(API_URL, user);
    return response.data;
  } catch (error) {
    console.error('Error registrando al usuario', error);
    throw error;
  }
};

export const actualizarUsuario = async (id, usuarioModificado) => {
  try {
    const response = await axios.put(`https://rhapi-dev-kkbb.3.us-1.fl0.io/usuarios/${id}`, usuarioModificado);
    return response.data;
  } catch (error) {
    console.error(`Error actualizando el usuario con id ${id}`, error);
    throw error;
  }
};


export const obtenerUsuarios = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo los usuarios', error);
    throw error;
  }
};

export const obtenerUsuarioPorId = async (id) => {
  try {
    const response = await axios.get(`https://rhapi-dev-kkbb.3.us-1.fl0.io/usuarios/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error obteniendo el usuario con id ${id}`, error);
    throw error;
  }
};

export const eliminarUsuario = async (id) => {
  try {
    const response = await axios.delete(`https://rhapi-dev-kkbb.3.us-1.fl0.io/usuarios/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error eliminando el usuario con id ${id}`, error);
    throw error;
  }
};


export const resetFormUsuario = (setForm) => {
  setForm({
    nombre: '',
    apellido: '',
    ciudad: '',
    email: '',
    password: '',
  });
};