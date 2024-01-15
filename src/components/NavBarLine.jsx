// NavBarLine.jsx
import React from 'react';
import RoundButton from '../components/Buttons/RoundButton'; 
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

function NavBarLine({ propiedadId }) {
  const navigate = useNavigate(); // Añade useNavigate

  const handleClick = (value) => {
    switch (value) {
      case 1:
        navigate('/registrarPropiedad');
        break;
      case 2:
        navigate(`/formUploadImages/${propiedadId}`);
        break;
      case 3:
        navigate('/adminPanel');
        break;
      case 4:
        navigate('/queHacer');
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex items-center justify-between">
      <RoundButton onClick={() => handleClick(1)} className="w-full sm:w-1/4">1</RoundButton>
      <hr className="flex-grow border-t-2 border-gray-300"/>
      <RoundButton onClick={() => handleClick(2)} disabled={!propiedadId} className="w-full sm:w-1/4">2</RoundButton>
      <hr className="flex-grow border-t-2 border-gray-300"/>
      <RoundButton onClick={() => handleClick(3)} disabled={!propiedadId} className="w-full sm:w-1/4">3</RoundButton>
      <hr className="flex-grow border-t-2 border-gray-300"/>
      <RoundButton onClick={() => handleClick(4)} disabled={!propiedadId} className="w-full sm:w-1/4">4</RoundButton>
    </div>
  );
}

export default NavBarLine;
