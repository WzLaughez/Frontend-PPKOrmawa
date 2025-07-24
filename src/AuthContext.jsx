import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const stored = JSON.parse(localStorage.getItem('auth'));
    return stored || { user: null, role: null, token: null };
  });

  const login = (userData) => {
    localStorage.setItem('auth', JSON.stringify(userData));
    setAuth(userData);
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
