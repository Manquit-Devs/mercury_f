import { createContext, useState, useEffect, ReactNode } from 'react';
import { login, verifyToken } from '../services/auth';
import md5 from 'md5';
import Cookies from 'js-cookie';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  isAuthenticated: boolean;
  isLoadingUser: boolean;
  signUp: (username: string, password: string) => {};
}

export const AuthContext = createContext({} as AuthContextData);

const AuthProvider= ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  const verifyUserToken = async( ) =>  {
    try {
      setIsLoadingUser(true);
      await verifyToken();
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setIsLoadingUser(false);
    }
  }

  async function signUp(username: string, password: string) {
    try {
      const passwordMd5 = md5(password);
      const token = await login(username, passwordMd5);
      Cookies.set('token', token);
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      throw error;
    } 
  }

  useEffect(() => {
    verifyUserToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signUp,
        isLoadingUser,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;