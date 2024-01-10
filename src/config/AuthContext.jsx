  import React, { createContext, useState, useEffect } from 'react';

  export const AuthContext = createContext();

  export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
      }
    }, []);

    useEffect(() => {
      console.log("isLoggedIn ha cambiado a:", isLoggedIn);
    }, [isLoggedIn]);

    const handleLoginSuccess = (newToken, expiry) => {
      console.log('handleLoginSuccess llamado');
      localStorage.setItem('token', JSON.stringify({ token: newToken, expiry }));
      setIsLoggedIn(true);
      return newToken;
    };
    

    const handleLogout = () => {
      localStorage.removeItem('token');
      setIsLoggedIn(false);
    };

    return (
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, handleLoginSuccess, handleLogout }}>
        {children}
      </AuthContext.Provider>
    );
  };
