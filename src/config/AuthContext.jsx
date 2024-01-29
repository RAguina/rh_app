import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'; // Importa jwt-decode
import { getCookie, setCookie, eraseCookie } from './cookieUtils';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getCookie('token'));
  const [idPropietario, setIdPropietario] = useState(null);
  const [newProperty, setNewProperty] = useState(null)

  useEffect(() => {
    const token = getCookie('token');
    if (token) {
      setIsLoggedIn(true);
      const decodedToken = jwtDecode(token); // Usa jwt-decode para decodificar el token
      if (decodedToken) {
        setIdPropietario(decodedToken.idPropietario);
      }
    }
  }, []);
  
  const handleLoginSuccess = (newToken, expiry) => {
    try {
      setCookie('token', JSON.stringify({ token: newToken, expiry }), 1);
      const decodedToken = jwtDecode(newToken); // Usa jwt-decode para decodificar el token
      console.log("decodedToken es:",decodedToken);
      if (decodedToken && decodedToken.idPropietario) {
        console.log("idPropietario en context es:", decodedToken.idPropietario);
        setIdPropietario(decodedToken.idPropietario);
      }
      setIsLoggedIn(true);
      return newToken;
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      // Manejar el error según tus necesidades
      return null; // Otra opción es lanzar el error para que sea manejado en otro lugar
    }
  };

  const handleLogout = () => {
    eraseCookie('token');
    setIsLoggedIn(false);
    setIdPropietario(null);
    setNewProperty(null);
  };

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, setIsLoggedIn, 
      idPropietario, newProperty, setNewProperty,
      handleLoginSuccess, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
