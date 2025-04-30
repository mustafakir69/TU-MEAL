import { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '../services/api';

// Create the Auth Context
export const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: () => {},
  register: () => {},
  logout: () => {},
  updateUser: () => {},
});

// Auth Context Provider
export const AuthProvider = ({ children }) => {
  // TEST AMAÇLI: Varsayılan bir test kullanıcısı tanımlıyoruz
  const testUser = {
    id: 1,
    name: 'Test Kullanıcı',
    email: 'test@example.com',
  };
  
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in on app launch
  useEffect(() => {
    const loadUserFromStorage = async () => {
      try {
        const token = await AsyncStorage.getItem('auth_token');
        const userData = await AsyncStorage.getItem('user_data');
        
        if (token && userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Failed to load user data from storage', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserFromStorage();
  }, []);

  // Login function
  const login = async (credentials) => {
    try {
      setIsLoading(true);

      // Hızlı giriş kontrolü
      if (credentials.email === 'test@example.com' && credentials.password === 'test123') {
        // Test kullanıcısı ile hızlı giriş
        const testUser = {
          id: 1,
          name: 'Test Kullanıcı',
          email: 'test@example.com',
        };
        
        // Testi simüle et, normalde API isteği yapılır
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Test token oluştur
        const token = 'test_token_' + Date.now();
        
        // Store token and user data
        await AsyncStorage.setItem('auth_token', token);
        await AsyncStorage.setItem('user_data', JSON.stringify(testUser));
        
        // Update state
        setUser(testUser);
        return { success: true };
      }
      
      // Normal login işlemi
      const response = await authService.login(credentials);
      const { token, user } = response.data;
      
      // Store token and user data
      await AsyncStorage.setItem('auth_token', token);
      await AsyncStorage.setItem('user_data', JSON.stringify(user));
      
      // Update state
      setUser(user);
      return { success: true };
    } catch (error) {
      console.error('Login failed', error.response?.data || error.message);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed. Please try again.' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      setIsLoading(true);
      const response = await authService.register(userData);
      const { token, user } = response.data;
      
      // Store token and user data
      await AsyncStorage.setItem('auth_token', token);
      await AsyncStorage.setItem('user_data', JSON.stringify(user));
      
      // Update state
      setUser(user);
      return { success: true };
    } catch (error) {
      console.error('Registration failed', error.response?.data || error.message);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Registration failed. Please try again.' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Clear storage
      await AsyncStorage.removeItem('auth_token');
      await AsyncStorage.removeItem('user_data');
      
      // Update state
      // TEST AMAÇLI: Çıkış yaptıktan sonra test kullanıcısına dön
      // setUser(testUser); 
      setUser(null); // Gerçek uygulamada bunu kullan
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  // Update user data
  const updateUser = async (updatedData) => {
    try {
      setIsLoading(true);
      
      // TEST AMAÇLI: API'ye istek yapmadan test kullanıcısını güncelliyoruz
      setUser({...testUser, ...updatedData});
      return { success: true };
      
      /* Gerçek uygulama için
      const response = await authService.updateProfile(updatedData);
      const updatedUser = response.data.user;
      
      // Update storage
      await AsyncStorage.setItem('user_data', JSON.stringify(updatedUser));
      
      // Update state
      setUser(updatedUser);
      return { success: true };
      */
    } catch (error) {
      console.error('Update user failed', error.response?.data || error.message);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Update failed. Please try again.' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Context value
  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 