import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'; // Importa jwt-decode
import { getCookie } from './cookieUtils';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getCookie('token'));
  const [idPropietario, setIdPropietario] = useState(null);

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
    setCookie('token', JSON.stringify({ token: newToken, expiry }), 1);
    const decodedToken = jwtDecode(newToken); // Usa jwt-decode para decodificar el token
    if (decodedToken) {
      setIdPropietario(decodedToken.idPropietario);
    }
    setIsLoggedIn(true);
    return newToken;
  };

  const handleLogout = () => {
    eraseCookie('token');
    setIsLoggedIn(false);
    setIdPropietario(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, idPropietario, handleLoginSuccess, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
