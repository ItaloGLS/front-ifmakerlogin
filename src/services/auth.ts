import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;


export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    localStorage.setItem('access_token', response.data.access_token);
    return response.data;
  } catch (error) {
    throw new Error('Login failed');
  }
};

export const logout = () => {
  localStorage.removeItem('access_token');
};

export const isLoggedIn = () => {
  return !!localStorage.getItem('access_token');
};

export const getToken = () => {
  return localStorage.getItem('access_token');
};
