import { createContext, useState, useEffect, ReactNode } from 'react';
import { login, verifyToken } from '../services/auth';
import md5 from 'md5';
import Cookies from 'js-cookie';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  username: string;
  isAuthenticated: boolean;
  isLoadingUser: boolean;
  signUp: (username: string, password: string) => {};
  signOut: () => {};
}

export const AuthContext = createContext({} as AuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [username, setUsername] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  const verifyUserToken = async () => {
    try {
      setIsLoadingUser(true);
      await verifyToken();
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setIsLoadingUser(false);
    }
  };

  const signUp = async (username: string, password: string) => {
    try {
      const passwordMd5 = md5(password);
      const { token } = await login(username, passwordMd5);
      Cookies.set('token', token);
      setUsername(username);
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      throw error;
    }
  };

  const signOut = async () => {
    Cookies.remove('token');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    verifyUserToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        username,
        isLoadingUser,
        isAuthenticated,
        signOut,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
