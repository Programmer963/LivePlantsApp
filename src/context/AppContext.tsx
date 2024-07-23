import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const savedUser = await AsyncStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
        setIsLoggedIn(true);
      }
    };

    checkLoginStatus();
  }, []);

  const login = async (email: string, password: string) => {
    try {
        const response = await axios.get(`http://localhost/api/public/user/getByEmail/${email}`);
        const userData = response.data;

        if (userData.password === password) {
            await AsyncStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
            setIsLoggedIn(true);
        }
        else {
            alert('Wrong Password!')
        }
    } catch (error) {
        console.error('Login failed', error);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('user');
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
