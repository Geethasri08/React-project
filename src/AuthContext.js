import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [registeredUser, setRegisteredUser] = useState(null);

  const login = (userData) => {
    console.log('Login:', userData);
  };

  const register = (userData) => {
    setRegisteredUser(userData);
  };

  const logout = () => {
    setRegisteredUser(null);
  };

  return (
    <AuthContext.Provider value={{ registeredUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;