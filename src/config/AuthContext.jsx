  import React, { createContext, useState, useEffect } from 'react';

  export const AuthContext = createContext();

  export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const [idPropietario, setIdPropietario] = useState(null);

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
        const decodedToken = jwt.decode(token);
        setIdPropietario(decodedToken.idPropietario);
      }
    }, []);

    const handleLoginSuccess = (newToken, expiry) => {
      console.log('handleLoginSuccess llamado');
      localStorage.setItem('token', JSON.stringify({ token: newToken, expiry }));
      const decodedToken = jwt.decode(newToken);
      setIdPropietario(decodedToken.idPropietario)
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
