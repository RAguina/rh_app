export const handleLoginSuccess = (newToken) => {
  localStorage.setItem('token', newToken);

  return newToken;
};

export const handleLogout = () => {
  localStorage.removeItem('token');
  setToken(null);
}

export const handleLogoutClick = () => {
  handleLogout();
  setIsLoggedIn(false);
};
