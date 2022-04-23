import { api, authApi } from './index';

export const verifyToken = async () => {
  const response = await api.get('/verifyToken');
  return response.data.username;
};

export const login = async (username: string, password: string) => {
  const response = await authApi.post('/login', {
    username,
    password,
  });
  return response.data;
};
