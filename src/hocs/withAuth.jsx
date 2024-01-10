import { useNavigate } from "react-router-dom";

export function withAuth(Component) {
  return function ProtectedRoute(props) {
    const navigate = useNavigate();
    const item = JSON.parse(localStorage.getItem('token'));

    if (!item) {
      console.error('Acceso no autorizado. Redirigiendo a /login');
      
      setTimeout(() => {
        navigate('/login');  
      }, 5000);
      
      return <ErrorPage mensaje={"Acceso no autorizado. Redirigiendo a /login" }/>
    }

    const now = new Date();
    if (now.getTime() > item.expiry) {
      // El token ha expirado, eliminarlo y redirigir al usuario a la página de inicio de sesión
      localStorage.removeItem('token');
      console.error('El token ha expirado. Redirigiendo a /login');
      
      setTimeout(() => {
        navigate('/login');  
      }, 5000);
      
      return <ErrorPage mensaje={"El token ha expirado. Redirigiendo a /login" }/>
    }

    return <Component {...props} />;
  };
}
