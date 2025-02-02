import React, { createContext, useContext, useState } from 'react';
import { fetchApiData } from '../lib/api';

interface AuthContextType {
  user: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<boolean>(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const signIn = async (username: string, password: string) => {
    try {
      if (username === 'trial' && password === 'assignment123') {
        // Verify credentials using the login endpoint with required body parameters
        await fetchApiData('login', {
          username,
          email: 'trial@example.com',
          password,
          phone_number: '1234567890',
          input_code: 0
        });
        setUser(true);
        localStorage.setItem('isAuthenticated', 'true');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      throw new Error('Invalid credentials');
    }
  };

  const signOut = () => {
    setUser(false);
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}