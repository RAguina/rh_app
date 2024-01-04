import { useState } from 'react';
import { Link } from 'react-router-dom';
import handleLogout from '../config/handleLogout'

const Nav = () => {

    const isAdmin = true;
    const [token, setToken] = useState(localStorage.getItem('token'));
    return (
        
        <nav className="flex flex-wrap justify-center mt-10 gap-2">
            <Link 
                to="/" 
                className={`mx-4 md:text-xl font-black bg-green-500 hover:bg-green-800 text-white py-2 px-4 rounded ${location.pathname === '/' ? 'active' : ''}`}
            >Inicio</Link>

            <Link 
                to="/registrarPropiedad" 
                className={`mx-4 text-base font-black bg-green-500 hover:bg-green-800 text-white py-2 px-4 rounded ${location.pathname === '/registrarPropiedad' ? 'active' : ''}`}
            >Registrar Propiedad</Link>

            <Link 
                to="/listadoPropiedades" 
                className={`mx-4 font-black bg-green-500 hover:bg-green-800 text-white py-2 px-4 rounded ${location.pathname === '/listadoPropiedades' ? 'active' : ''}`}
            >Listado Propiedades</Link>

            <Link 
                to="/queHacer" 
                className={`mx-4 font-black bg-green-500 hover:bg-green-800 text-white py-2 px-4 rounded ${location.pathname === '/queHacer' ? 'active' : ''}`}
            >Que hacer en Necochea?</Link>

            <Link 
            to="/registrarUsuario" 
            className={`mx-4 font-black bg-green-500 hover:bg-green-800 text-white py-2 px-4 rounded ${location.pathname === '/registrarUsuario' ? 'active' : ''}`}
            >Registrarse</Link>

            <Link 
            to="/contact" 
            className={`mx-4 font-black bg-green-500 hover:bg-green-800 text-white py-2 px-4 rounded ${location.pathname === '/contact' ? 'active' : ''}`}
            >Contactanos</Link>
            
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

            {token ? (
                <Link 
                    to="/" 
                    onClick={handleLogout}
                    className={`mx-4 font-black bg-blue-500 hover:bg-blue-800 text-white py-2 px-4 rounded`}
                >Cerrar Sesión</Link>
            ) : (
                <Link 
                    to="/login" 
                    className={`mx-4 font-black bg-blue-500 hover:bg-blue-800 text-white py-2 px-4 rounded ${location.pathname === '/login' ? 'active' : ''}`}
                >Iniciar Sesión</Link>
            )}

            {token &&
                <Link 
                    to="/formUploadImages" 
                    className={`mx-4 font-black bg-blue-500 hover:bg-blue-800 text-white py-2 px-4 rounded ${location.pathname === '/formUploadImages' ? 'active' : ''}`}
                    >Subir Imagenes
                </Link>
            }
        </nav>

    )
}

export default Nav;