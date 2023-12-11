// ProtectedRoute.jsx
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, roles }) => {
  // Simulación del estado de autenticación y roles (ajusta según tu implementación real)
  const isAuthenticated = true; // Asegúrate de reemplazar con tu lógica real de autenticación
  const userRoles = ['admin']; // Asegúrate de reemplazar con tus roles reales

  if (isAuthenticated && roles.every((role) => userRoles.includes(role))) {
    return <Route element={element} />;
  } else {
    // Puedes redirigir a una página de inicio de sesión o mostrar un mensaje de acceso denegado
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;