import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../config/AuthContext';

const Nav = () => {

    const isAdmin = true;
    const { isLoggedIn, handleLogout} = useContext(AuthContext);

    return (
        
        <nav className="flex flex-wrap justify-center mt-10 gap-2">
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
                        className={`mx-4 font-black bg-blue-500 hover:bg-blue-800 text-white py-2 px-4 rounded`}
                    >Cerrar Sesión</Link>
                    <Link 
                        to="/formUploadImages" 
                        className={`mx-4 font-black bg-blue-500 hover:bg-blue-800 text-white py-2 px-4 rounded ${location.pathname === '/formUploadImages' ? 'active' : ''}`}
                    >Subir Imagenes</Link>
                </>
            ) : (
                <Link 
                    to="/login" 
                    className={`mx-4 font-black bg-blue-500 hover:bg-blue-800 text-white py-2 px-4 rounded ${location.pathname === '/login' ? 'active' : ''}`}
                >Iniciar Sesión</Link>
            )}

            {isAdmin && (
                <Link
                to="/adminPanel"
                className={`mx-4 text-base font-black bg-blue-500 hover:bg-blue-800 text-white py-2 px-4 rounded ${
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