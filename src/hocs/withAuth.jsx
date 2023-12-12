

import { useNavigate } from 'react-router-dom';

export function withAuth(Component) {
  return function ProtectedRoute(props) {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Acceso no autorizado. Redirigiendo a /login');
      navigate('/login');
      return null; 
    }

    return <Component {...props} />;
  };
}
