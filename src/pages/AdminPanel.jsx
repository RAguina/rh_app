import { useState } from 'react';
import { obtenerUsuarios } from '../api/user';
import { obtenerInmuebles, eliminarInmueble } from '../api/inmuebles';

const AdminPanel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState('Usuario');
  const [data, setData] = useState([]); // Aquí es donde defines el estado 'data'


  const handleAllClick = async () => {
    if (selectedOption === 'Usuario') {
      try {
        const users = await obtenerUsuarios();
        setData(users); // Aquí es donde actualizas el estado 'data'
      } catch (error) {
        console.error(error);
      } 
    } else if (selectedOption === 'Inmueble') {
      try {
        const inmuebles = await obtenerInmuebles();
        setData(inmuebles); // Aquí es donde actualizas el estado 'data'
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Panel de Administrador</h1>
      <div className="flex items-center space-x-2 mb-4">
        <select 
          className="border border-gray-300 rounded-md p-2"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option>Usuario</option>
          <option>Inmueble</option>
        </select>
        <input 
          className="border border-gray-300 rounded-md p-2 flex-grow" 
          type="text" 
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="bg-blue-500 text-white rounded-md px-4 py-2">Buscar</button>
        <button 
          className="bg-blue-500 text-white rounded-md px-4 py-2"
          onClick={handleAllClick}
        >
          TODOS
        </button>
      </div>
      <table className="table-auto w-full truncate-4-lines">
        <thead>
          {data.length > 0 && (
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key} className="px-4 py-2">{key}</th>
              ))}
            </tr>
          )}
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id || index} className="border-t border-gray-200">
              {Object.entries(item).map(([key, value], i) => {
                let displayValue = value;
                if (key === 'es_propietario') {
                  displayValue = value ? 'Sí' : 'No';
                } else if (key === 'createdat' || key === 'updatedat') {
                  const date = new Date(value);
                  displayValue = date.toLocaleDateString('es-AR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  });
                }
                return <td key={i} className="px-4 py-2 text-center">{displayValue}</td>;
              })}
              <td>
                <button className="bg-blue-500 text-white rounded-md px-2 py-1 m-1">Modificar</button>
                <button 
                  className="bg-red-500 text-white rounded-md px-2 py-1 m-1"
                  onClick={() => eliminarInmueble(item.id)}
                  >Eliminar
                </button>
              </td>              
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default AdminPanel;
