import axios from 'axios';

export const registerUser = async (user) => {
  try {
    const response = await axios.post("http://localhost:3000/usuarios", user);
    return response.data;
  } catch (error) {
    console.error('Error registrando al usuario', error);
    throw error;
  }
};

export const actualizarUsuario = async (id, usuarioModificado) => {
  try {
    const response = await axios.put(`http://localhost:3000/usuarios/${id}`, usuarioModificado);
    return response.data;
  } catch (error) {
    console.error(`Error actualizando el usuario con id ${id}`, error);
    throw error;
  }
};


export const obtenerUsuarios = async () => {
  try {
    const response = await axios.get('http://localhost:3000/usuarios');
    return response.data;
  } catch (error) {
    console.error('Error obteniendo los usuarios', error);
    throw error;
  }
};

export const obtenerUsuarioPorId = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3000/usuarios/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error obteniendo el usuario con id ${id}`, error);
    throw error;
  }
};

export const eliminarUsuario = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3000/usuarios/${id}`);
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
    es_propietario: false,
  });
};