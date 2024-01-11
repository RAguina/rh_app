  import React, { createContext, useState, useEffect } from 'react';
  import jwt from 'jsonwebtoken';

  export const AuthContext = createContext();

  export const AuthProvider = ({ children }) => {
    console.log("console log 1");
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const [idPropietario, setIdPropietario] = useState(null);
    console.log("console log 2");
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
        const decodedToken = jwt.decode(token);
        if (decodedToken) {
          setIdPropietario(decodedToken.idPropietario);
        }
      }
    }, []);

    const handleLoginSuccess = (newToken, expiry) => {
      console.log('handleLoginSuccess llamado');
      localStorage.setItem('token', JSON.stringify({ token: newToken, expiry }));
      const decodedToken = jwt.decode(newToken);
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
