const handleLogout = () => {
  localStorage.removeItem('token');
  setToken(null);
}

export default handleLogout;