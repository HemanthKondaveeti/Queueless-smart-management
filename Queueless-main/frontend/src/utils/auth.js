// Save token and user (with role)
export const saveAuth = (token, role) => {
  localStorage.setItem('token', token);
  localStorage.setItem('role', role);
  window.dispatchEvent(new Event('storage')); // 👈 this tells React that something changed
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  window.dispatchEvent(new Event('storage')); // 👈 same here
};

// Get stored JWT token
export const getToken = () => {
  return localStorage.getItem('token');
};

// Get stored user role
export const getUserRole = () => {
  return localStorage.getItem('role') || null;
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

// Clear token and user info on logout

