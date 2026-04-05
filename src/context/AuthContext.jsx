import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem('admin_session');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email, password) => {
    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      
      if (data.success) {
        setUser(data.user);
        sessionStorage.setItem('admin_session', JSON.stringify(data.user));
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (e) {
      // Fallback if backend is not running
      if (email === 'admin@gmail.com' && password === '1234') {
        const userData = { email, role: 'admin', name: 'Admin User', fallback: true };
        setUser(userData);
        sessionStorage.setItem('admin_session', JSON.stringify(userData));
        return { success: true };
      }
      return { success: false, message: 'Server unreachable. Using fallback.' };
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('admin_session');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
