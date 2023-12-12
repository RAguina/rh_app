

import { useNavigate } from 'react-router-dom';
import ErrorPage from '../components/ErrorPage';

export function withAuth(Component) {
  return function ProtectedRoute(props) {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    if (!token) {
      <ErrorPage mensaje={"Acceso no autorizado. Redirigiendo a /login" }/>
      console.error('Acceso no autorizado. Redirigiendo a /login');
      
      setTimeout(() => {
        navigate('/login');  
      }, 5000);
      return null; 
    }

    return <Component {...props} />;
  };
}
