import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert } from 'react-native';

const URL_API = 'http://localhost/api/public/user';

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
  register: (user: Omit<User, 'id'>) => Promise<void>
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
        const response = await axios.get(`${URL_API}/getByEmail/${email}`);
        const userData = response.data;

        if (userData.password === password) {
            await AsyncStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
            setIsLoggedIn(true);
        } else {
            Alert.alert('Wrong Password!')
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

  const register = async (user: Omit<User, 'id'>) => {
    try {
      const params = new URLSearchParams({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password
      })
      
      await axios.post(`${URL_API}/add?${params.toString()}`);
    } catch (error) {
      console.error('Failed to register user', error);
    }
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, register }}>
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