import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLoginSuccess = (newToken) => {
    localStorage.setItem('token', newToken);
    setIsLoggedIn(true, () => {
      // Accede al estado aquí, después de que se haya actualizado
      console.log(isLoggedIn); // Debería ser 'true'
    });
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
