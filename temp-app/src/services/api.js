import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mobil cihazlar için backend URL'ini güncelle
// Not: Gerçek IP adresinize göre değiştirilmelidir
const API_URL = 'http://10.0.2.2:3000/api'; // Android emulator için localhost
// const API_URL = 'http://localhost:3000/api'; // Web için
// const API_URL = 'http://192.168.1.X:3000/api'; // Gerçek cihaz için (kendi IP adresinizle değiştirin)

// Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for API calls
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting token from AsyncStorage', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle error responses here
    return Promise.reject(error);
  }
);

// Auth API services
export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getProfile: () => api.get('/users/profile'),
  updateProfile: (userData) => api.put('/users/profile', userData),
  changePassword: (passwordData) => api.post('/auth/change-password', passwordData),
  logout: () => api.post('/auth/logout'),
};

// Meals API services
export const mealService = {
  getDailyMeals: (date) => api.get(`/meals/day?date=${date}`),
  getMealById: (id) => api.get(`/meals/${id}`),
  getFavoriteMeals: (timeFilter = 'weekly') => api.get(`/meals/week?filter=${timeFilter}`),
  rateMeal: (mealId, rating) => api.post(`/rate/${mealId}`, { rating }),
  commentMeal: (mealId, comment) => api.post(`/comment/${mealId}`, { comment }),
  getComments: (mealId) => api.get(`/comment/meal/${mealId}`),
};

export default api; 