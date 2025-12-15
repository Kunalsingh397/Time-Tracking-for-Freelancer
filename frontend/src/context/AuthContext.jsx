import React, { createContext, useState, useEffect } from 'react'
import API from '../services/api'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  const login = (data) => {
    localStorage.setItem('token', data.token);
    setUser(data.user);
  };
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateUser = (nextUser, nextToken) => {
    if (nextToken) {
      localStorage.setItem('token', nextToken);
    }
    setUser(nextUser);
  };

  return <AuthContext.Provider value={{ user, login, logout, updateUser, API }}>{children}</AuthContext.Provider>
}
