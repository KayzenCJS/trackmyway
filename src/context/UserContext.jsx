import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isGuest, setIsGuest] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedIsGuest = localStorage.getItem('isGuest');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsGuest(storedIsGuest === 'true');
    } else {
      const guestUser = {
        id: 'guest_' + Date.now(),
        nombre: 'Visitante',
        email: `guest_${Date.now()}@trackmyway.com`,
        isGuest: true
      };
      setUser(guestUser);
      setIsGuest(true);
      localStorage.setItem('user', JSON.stringify(guestUser));
      localStorage.setItem('isGuest', 'true');
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsGuest(false);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isGuest', 'false');
  };

  const logout = () => {
    const guestUser = {
      id: 'guest_' + Date.now(),
      nombre: 'Visitante',
      email: `guest_${Date.now()}@trackmyway.com`,
      isGuest: true
    };
    setUser(guestUser);
    setIsGuest(true);
    localStorage.setItem('user', JSON.stringify(guestUser));
    localStorage.setItem('isGuest', 'true');
  };

  const isLoggedIn = () => {
    return user && !isGuest;
  };

  return (
    <UserContext.Provider value={{ user, isGuest, loading, login, logout, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};