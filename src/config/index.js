//const API_URL_LOCAL = process.env.REACT_APP_API_URL_LOCAL;

//export { API_URL_LOCAL };

export const generarNombreUnico = () => {
  const timestamp = Date.now();
  const randomValue = Math.floor(Math.random() * 1000); // Puedes ajustar el rango según sea necesario
  return `imagen_${timestamp}_${randomValue}`;
};