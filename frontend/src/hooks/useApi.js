import { useState, useEffect, useCallback } from 'react';
import { productService, orderService, authService, categoryService, brandService } from '../services/api';
import { ERROR_MESSAGES } from '../config';

// Hook pour gérer les états de chargement, erreurs et données
export const useApiState = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (apiCall) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiCall();
      setData(result.data);
      return result.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || ERROR_MESSAGES.NETWORK_ERROR;
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, execute };
};

// Hook pour les produits
export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await productService.getAllProducts();
      setProducts(response.data);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || ERROR_MESSAGES.NETWORK_ERROR;
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const searchProducts = useCallback(async (query) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await productService.searchProducts(query);
      setProducts(response.data);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || ERROR_MESSAGES.NETWORK_ERROR;
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getProductsByCategory = useCallback(async (category) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await productService.getProductsByCategory(category);
      setProducts(response.data);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || ERROR_MESSAGES.NETWORK_ERROR;
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createProduct = useCallback(async (productData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await productService.createProduct(productData);
      setProducts(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || ERROR_MESSAGES.NETWORK_ERROR;
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProduct = useCallback(async (id, productData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await productService.updateProduct(id, productData);
      setProducts(prev => prev.map(product => 
        product.id === id ? response.data : product
      ));
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || ERROR_MESSAGES.NETWORK_ERROR;
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteProduct = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      await productService.deleteProduct(id);
      setProducts(prev => prev.filter(product => product.id !== id));
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || ERROR_MESSAGES.NETWORK_ERROR;
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    products,
    loading,
    error,
    fetchProducts,
    searchProducts,
    getProductsByCategory,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};

// Hook pour les commandes
export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await orderService.getAllOrders();
      setOrders(response.data);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || ERROR_MESSAGES.NETWORK_ERROR;
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createOrder = useCallback(async (orderData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await orderService.createOrder(orderData);
      setOrders(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || ERROR_MESSAGES.NETWORK_ERROR;
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateOrderStatus = useCallback(async (id, status) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await orderService.updateOrderStatus(id, status);
      setOrders(prev => prev.map(order => 
        order.id === id ? { ...order, status: status } : order
      ));
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || ERROR_MESSAGES.NETWORK_ERROR;
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteOrder = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      await orderService.deleteOrder(id);
      setOrders(prev => prev.filter(order => order.id !== id));
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || ERROR_MESSAGES.NETWORK_ERROR;
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    orders,
    loading,
    error,
    fetchOrders,
    createOrder,
    updateOrderStatus,
    deleteOrder,
  };
};

// Hook pour l'authentification
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté au chargement
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const login = useCallback(async (credentials) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authService.login(credentials);
      const { token, user: userData } = response.data;
      
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      return userData;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Erreur de connexion';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authService.register(userData);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Erreur d\'inscription';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    setError(null);
  }, []);

  const isAuthenticated = useCallback(() => {
    return authService.isAuthenticated();
  }, []);

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated,
  };
};
