import axios from 'axios';
import { setRoles } from '../reducers/clientReducer';
import { setCategories, setProductList, setTotal, setFetchState } from '../reducers/productReducer';

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

// Thunk action to fetch roles
export const fetchRoles = () => async (dispatch, getState) => {
  const { client } = getState();
  
  // Only fetch if we don't already have roles
  if (client.roles.length === 0) {
    try {
      const response = await api.get('/roles');
      dispatch(setRoles(response.data));
      return response.data;
    } catch (error) {
      console.error('Error fetching roles:', error);
      throw error;
    }
  }
  
  return client.roles;
};

// Thunk action to fetch categories
export const fetchCategories = () => async (dispatch, getState) => {
  try {
    const response = await api.get('/categories');
    dispatch(setCategories(response.data));
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Thunk action to fetch products with query parameters
export const fetchProducts = (params = {}) => async (dispatch) => {
  dispatch(setFetchState('FETCHING'));
  
  try {
    const response = await api.get('/products', { params });
    dispatch(setProductList(response.data.products));
    dispatch(setTotal(response.data.total));
    dispatch(setFetchState('FETCHED'));
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    dispatch(setFetchState('FAILED'));
    throw error;
  }
};

// Thunk action to login user
export const loginUser = (credentials) => async (dispatch) => {
  try {
    const response = await api.post('/login', credentials);
    
    // Store token in localStorage if remember me is checked
    if (credentials.rememberMe && response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    // Set token in axios headers for future requests
    api.defaults.headers.common['Authorization'] = response.data.token;
    
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Thunk action to verify token
export const verifyToken = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return null;
  }
  
  try {
    // Set token in axios headers
    api.defaults.headers.common['Authorization'] = token;
    
    // Verify token
    const response = await api.get('/verify');
    
    // Renew token in localStorage
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      api.defaults.headers.common['Authorization'] = response.data.token;
    }
    
    return response.data;
  } catch (error) {
    console.error('Token verification error:', error);
    
    // Remove invalid token
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    
    throw error;
  }
}; 