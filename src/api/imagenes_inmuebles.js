import axios from "axios";
const API_URL = "https://rhapi-dev-kkbb.3.us-1.fl0.io"
export const subirImagen = async (file,idPropietario) => {
  try {
    // Crea un objeto FormData
    const formData = new FormData();
    formData.append('image', file);
    formData.append('propietario_id', idPropietario); 
    
    // Realiza la solicitud POST al servidor
    const response = await axios.post("https://rhapi-dev-kkbb.3.us-1.fl0.io/imagen_inmuebles/upload", formData, {
        headers: {
        'Content-Type': 'multipart/form-data'
        , 'Authorization': `Bearer ${localStorage.getItem('token')}`, // Token JWT
      },
    });
    console.log("El estado dela respuesta es:", response.status)
    console.log('Respuesta del servidor:', response.data.propiedad_id); 
    console.log("response.data.public_id",response.data.nombre_imagen);
    return response.data;
  } catch (error) {
    console.log("Error subiendo imagen 25");
    //console.error('Error subiendo la imagen', error.response ? error.response.data : error.message);
    throw error;
  }
};





//subirImagen sin console.logs
/*
export const uploadImage = async (req, res) => {
  console.log("hola1");  // Asegúrate de que la imagen se está enviando en la solicitud
  console.log("cuerpo del req:",req.body);
  if (!req.files || !req.files.image) {
    return res.status(400).json({ error: 'No se subió ninguna imagen.' });
  }

  // La imagen subida estará disponible en req.files.image
  const image = req.files.image;

  try {
    // Sube la imagen a Cloudinary
    const result = await cloudinary.uploader.upload(image.path);
    console.log('secure_url:', result.secure_url);
  console.log('public_id:', result.public_id);
  console.log("Hola soy un breackpoint 1")
    // Crea un nuevo registro en la base de datos para la imagen
    const nuevaImagen = await ImagenInmueble.create({
      propiedad_id: req.body.propiedad_id, // Ajusta según tu modelo
      url: result.secure_url,
      public_id: result.public_id,
    });
    console.log("nueva imagen:", nuevaImagen);

    // Usa la constante file en tu lógica, por ejemplo:
    console.log("Información de la imagen procesada:", image);

    // Devuelve el resultado de la subida
    res.json(result);
  } catch (error) {
    console.error("Error durante el proceso:", error);

    // Maneja cualquier error que ocurra durante el proceso
    if (error instanceof multer.MulterError) {
      // Error de multer al procesar la imagen
      res.status(400).json({ error: 'Error al procesar la imagen.' });
    } else if (error.message === 'Formato de imagen no válido.') {
      // Puedes personalizar este mensaje según tus necesidades
      res.status(400).json({ error: 'Formato de imagen no válido.' });
    } else {
      // Otros errores
      res.status(500).json({ error: 'Hubo un error durante el proceso.' });
    }
  }
};
*/
