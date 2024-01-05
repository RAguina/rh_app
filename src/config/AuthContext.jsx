import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLoginSuccess = (newToken) => {
    setIsLoggedIn(true);
    localStorage.setItem('token', newToken);
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
