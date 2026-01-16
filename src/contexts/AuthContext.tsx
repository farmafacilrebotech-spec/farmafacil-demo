import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'client' | 'pharmacy';
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithQR: (phone: string, code: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular verificación de sesión al iniciar
    const storedUser = localStorage.getItem('farmafacil_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulación de autenticación
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: '1',
        email,
        name: 'Farmacia Centro',
        role: 'pharmacy',
      };
      
      setUser(mockUser);
      localStorage.setItem('farmafacil_user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Credenciales incorrectas');
    } finally {
      setLoading(false);
    }
  };

  const loginWithQR = async (phone: string, code: string) => {
    setLoading(true);
    try {
      // Simulación de verificación SMS
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (code !== '123456') {
        throw new Error('Código incorrecto');
      }
      
      const mockUser: User = {
        id: '2',
        email: 'maria@email.com',
        name: 'María García López',
        role: 'client',
        phone,
      };
      
      setUser(mockUser);
      localStorage.setItem('farmafacil_user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Código de verificación incorrecto');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('farmafacil_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        loginWithQR,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

