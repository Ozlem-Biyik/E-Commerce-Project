import axios from 'axios';

// Create an axios instance
const api = axios.create({
  baseURL: 'https://workintech-fe-ecommerce.onrender.com'
});

// Add a request interceptor to add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// API functions for authentication
export const authAPI = {
  login: (credentials) => api.post('/login', credentials),
  signup: (userData) => api.post('/signup', userData),
  verify: () => api.get('/verify'),
  getRoles: () => api.get('/roles'),
};

// API functions for products
export const productAPI = {
  getProducts: (params) => api.get('/products', { params }),
  getProductById: (id) => api.get(`/products/${id}`),
  getCategories: () => api.get('/categories'),
  getReviews: (productId) => api.get(`/products/${productId}/reviews`),
  addReview: (productId, reviewData) => api.post(`/products/${productId}/reviews`, reviewData),
};

// API functions for user data
export const userAPI = {
  getAddresses: () => api.get('/user/address'),
  addAddress: (address) => api.post('/user/address', address),
  updateAddress: (address) => api.put('/user/address', address),
  deleteAddress: (id) => api.delete(`/user/address/${id}`),
  
  getCards: () => api.get('/user/card'),
  addCard: (card) => api.post('/user/card', card),
  updateCard: (card) => api.put('/user/card', card),
  deleteCard: (id) => api.delete(`/user/card/${id}`),
};

// API functions for orders
export const orderAPI = {
  createOrder: (orderData) => api.post('/order', orderData),
  getOrders: () => api.get('/order'),
};

export default api; 