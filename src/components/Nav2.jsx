import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../config/AuthContext';

const Nav2 = ({ isOpaque }) => {
  const isAdmin = true;
  const { isLoggedIn, handleLogout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="dropdown relative">
  <button onClick={toggleDropdown} className="dropbtn mr-10">Menú</button>
  {dropdownOpen && (
    <div className="dropdown-content absolute right-0">
      <Link to="/" className={`navLinks bg-transparent ${location.pathname === '/' ? 'active' : ''}`}>Inicio</Link>
      <Link to="/registrarPropiedad" className={`navLinks bg-transparent ${location.pathname === '/registrarPropiedad' ? 'active' : ''}`}>Registrar Propiedad</Link>
      <Link to="/listadoPropiedades" className={`navLinks bg-transparent ${location.pathname === '/listadoPropiedades' ? 'active' : ''}`}>Listado Propiedades</Link>
      <Link to="/queHacer" className={`navLinks bg-transparent ${location.pathname === '/queHacer' ? 'active' : ''}`}>Que hacer en Necochea?</Link>
      <Link to="/registrarUsuario" className={`navLinks bg-transparent ${location.pathname === '/registrarUsuario' ? 'active' : ''}`}>Registrarse</Link>
      <Link to="/contact" className={`navLinks bg-transparent ${location.pathname === '/contact' ? 'active' : ''}`}>Contactanos</Link>
      {isLoggedIn ? (
        <>
          <Link to="/" onClick={handleLogout} className={`navLinks2 bg-transparent`}>Cerrar Sesión</Link>
          <Link to="/formUploadImages" className={`navLinks2 bg-transparent ${location.pathname === '/formUploadImages' ? 'active' : ''}`}>Subir Imagenes</Link>
        </>
      ) : (
        <Link to="/login" className={`navLinks2 bg-transparent ${location.pathname === '/login' ? 'active' : ''}`}>Iniciar Sesión</Link>
      )}
      {isAdmin && (
        <Link to="/adminPanel" className={`navLinks2 bg-transparent ${location.pathname === '/adminPanel' ? 'active' : ''}`}>Admin Panel</Link>
      )}
    </div>
  )}
</div>

  );
};

export default Nav2;
