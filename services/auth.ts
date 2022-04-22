import { api, authApi } from './index';

export const verifyToken = async () => {
  try { 
    const response = await api.get('/verifyToken');
    return response.data.username;
  } catch (error) {
    throw error;
  }
};

export const login = async (username: string, password: string) => {
  try {
    const response = await authApi.post("/login", {
      username, password
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
