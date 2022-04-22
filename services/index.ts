import axios from 'axios';
import Cookies from 'js-cookie';

export const api = axios.create({
  baseURL: 'http://localhost:3333/api/',
  headers: {
    Authorization: `Bearer ${Cookies.get('user-token')}`,
  },
});

export const authApi = axios.create({
  baseURL: 'http://localhost:3333/auth',
});

export default api;
