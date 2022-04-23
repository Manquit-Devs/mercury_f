import axios from 'axios';
import Cookies from 'js-cookie';

export const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    Authorization: `Bearer ${Cookies.get('token')}`,
  },
});

export const authApi = axios.create({
  baseURL: `${API_URL}/auth`,
});

export default api;
