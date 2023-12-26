// ProtectedRoute.jsx
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import ErrorPage from '../components/ErrorPage';

const ProtectedRoute = ({ element, roles }) => {
  // Simulación del estado de autenticación y roles (ajusta según tu implementación real)
  const isAuthenticated = true; // Asegúrate de reemplazar con tu lógica real de autenticación
  const userRoles = ['admin']; // Asegúrate de reemplazar con tus roles reales

  const [showError, setShowError] = useState(!isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      const timer = setTimeout(() => {
        setShowError(false);
      }, 5000); // Oculta ErrorPage después de 5 segundos
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  if (isAuthenticated && roles.every((role) => userRoles.includes(role))) {
    return <Route element={element} />;
  } else if(showError){
    return <ErrorPage mensaje="No estás autenticado. Serás redirigido a la página de inicio de sesión en unos segundos." tipo="error" />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;

//    <ErrorPage mensaje={mensaje.texto} tipo={mensaje.tipo} />
