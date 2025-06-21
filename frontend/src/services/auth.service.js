import api from './api';

const register = (username, email, password, role) => {
  return api.post('/auth/signup', {
    username,
    email,
    password,
    role
  });
};

const login = (email, password) => {
  return api.post('/auth/signin', {
    email,
    password
  }).then(response => {
    if (response.data.accessToken) {
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  });
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const updateProfile = (userId, data) => {
  return api.put(`/auth/update`, data);
};

const changePassword = (currentPassword, newPassword) => {
  return api.post('/auth/change-password', {
    currentPassword,
    newPassword
  });
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
  updateProfile,
  changePassword
};