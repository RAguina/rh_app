import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../config/AuthContext';

const Nav = ({ isOpaque}) => {

  const isAdmin = true;
  const { isLoggedIn, handleLogout} = useContext(AuthContext);

  return (
      
      <nav className={`flex flex-wrap justify-center mt-10 gap-2 ${isOpaque ? 'ocultar' : ''}`}>
          <Link 
              to="/" 
              className={`navLinks ${location.pathname === '/' ? 'active' : ''}`}
          >Inicio</Link>

          <Link 
              to="/registrarPropiedad" 
              className={`navLinks ${location.pathname === '/registrarPropiedad' ? 'active' : ''}`}
          >Registrar Propiedad</Link>

          <Link 
              to="/listadoPropiedades" 
              className={`navLinks ${location.pathname === '/listadoPropiedades' ? 'active' : ''}`}
          >Listado Propiedades</Link>

          <Link 
              to="/queHacer" 
              className={`navLinks ${location.pathname === '/queHacer' ? 'active' : ''}`}
          >Que hacer en Necochea?</Link>

          <Link 
          to="/registrarUsuario" 
          className={`navLinks ${location.pathname === '/registrarUsuario' ? 'active' : ''}`}
          >Registrarse</Link>

          <Link 
          to="/contact" 
          className={`navLinks ${location.pathname === '/contact' ? 'active' : ''}`}
          >Contactanos</Link>
          
          {isLoggedIn ? (
              <>
                  <Link 
                      to="/" 
                      onClick={handleLogout}
                      className={`navLinks2`}
                  >Cerrar Sesión</Link>
              </>
          ) : (
              <Link 
                  to="/login" 
                  className={`navLinks2 ${location.pathname === '/login' ? 'active' : ''}`}
              >Iniciar Sesión</Link>
          )}

          {isAdmin && (
              <Link
              to="/adminPanel"
              className={`navLinks2 ${
                  location.pathname === '/adminPanel' ? 'active' : ''
              }`}
              >
              Admin Panel
              </Link>
          )}
      </nav>
   )
}

export default Nav;