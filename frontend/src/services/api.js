import axios from 'axios';

// Configuration de l'API - changez l'URL selon votre Spring Boot
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Instance axios configurée
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token d'authentification si nécessaire
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs de réponse
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expiré ou invalide
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Services pour les produits
export const productService = {
  // Récupérer tous les produits
  getAllProducts: () => api.get('/products'),
  
  // Récupérer un produit par ID
  getProductById: (id) => api.get(`/products/${id}`),
  
  // Créer un nouveau produit
  createProduct: (product) => api.post('/products', product),
  
  // Mettre à jour un produit
  updateProduct: (id, product) => api.put(`/products/${id}`, product),
  
  // Supprimer un produit
  deleteProduct: (id) => api.delete(`/products/${id}`),
  
  // Rechercher des produits
  searchProducts: (query) => api.get(`/products/search?q=${query}`),
  
  // Filtrer par catégorie
  getProductsByCategory: (category) => api.get(`/products/category/${category}`),
};

// Services pour les commandes
export const orderService = {
  // Récupérer toutes les commandes
  getAllOrders: () => api.get('/orders'),
  
  // Récupérer une commande par ID
  getOrderById: (id) => api.get(`/orders/${id}`),
  
  // Créer une nouvelle commande
  createOrder: (order) => api.post('/orders', order),
  
  // Mettre à jour le statut d'une commande
  updateOrderStatus: (id, status) => api.patch(`/orders/${id}/status`, { status }),
  
  // Supprimer une commande
  deleteOrder: (id) => api.delete(`/orders/${id}`),
};

// Services pour l'authentification
export const authService = {
  // Connexion
  login: (credentials) => api.post('/auth/login', credentials),
  
  // Inscription
  register: (userData) => api.post('/auth/register', userData),
  
  // Déconnexion
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },
  
  // Vérifier si l'utilisateur est connecté
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },
  
  // Récupérer les informations de l'utilisateur
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

// Services pour les catégories
export const categoryService = {
  // Récupérer toutes les catégories
  getAllCategories: () => api.get('/categories'),
  
  // Créer une nouvelle catégorie
  createCategory: (category) => api.post('/categories', category),
  
  // Mettre à jour une catégorie
  updateCategory: (id, category) => api.put(`/categories/${id}`, category),
  
  // Supprimer une catégorie
  deleteCategory: (id) => api.delete(`/categories/${id}`),
};

// Services pour les marques
export const brandService = {
  // Récupérer toutes les marques
  getAllBrands: () => api.get('/brands'),
  
  // Créer une nouvelle marque
  createBrand: (brand) => api.post('/brands', brand),
  
  // Mettre à jour une marque
  updateBrand: (id, brand) => api.put(`/brands/${id}`, brand),
  
  // Supprimer une marque
  deleteBrand: (id) => api.delete(`/brands/${id}`),
};

export default api;
