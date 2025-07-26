import { createContext, useContext, useState } from 'react';
import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const checkTokenValidity = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.exp * 1000 > Date.now(); // exp in seconds → ms
    } catch (e) {
      return false;
    }
  };

  const getInitialAuth = () => {
    const stored = JSON.parse(localStorage.getItem('auth'));
    if (stored?.token && checkTokenValidity(stored.token)) {
      return stored;
    }
    localStorage.removeItem('auth');
    return { user: null, role: null, token: null };
  };

  const [auth, setAuth] = useState(getInitialAuth);

  const login = (userData) => {
    if (checkTokenValidity(userData.token)) {
      localStorage.setItem('auth', JSON.stringify(userData));
      setAuth(userData);
    } else {
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem('auth');
    setAuth({ user: null, role: null, token: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
