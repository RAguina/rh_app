import React, { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode'; // Importa jwt-decode

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [idPropietario, setIdPropietario] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      const decodedToken = jwtDecode(token); // Usa jwt-decode para decodificar el token
      if (decodedToken) {
        setIdPropietario(decodedToken.idPropietario);
      }
    }
  }, []);

  const handleLoginSuccess = (newToken, expiry) => {
    localStorage.setItem('token', JSON.stringify({ token: newToken, expiry }));
    const decodedToken = jwtDecode(newToken); // Usa jwt-decode para decodificar el token
    if (decodedToken) {
      setIdPropietario(decodedToken.idPropietario);
    }
    setIsLoggedIn(true);
    return newToken;
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setIdPropietario(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, idPropietario, handleLoginSuccess, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
