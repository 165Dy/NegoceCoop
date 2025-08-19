// Configuration de l'API Spring Boot
// Modifiez cette URL selon l'URL de votre application Spring Boot
export const API_CONFIG = {
  // URL de base de votre API Spring Boot
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
  
  // Timeout pour les requêtes (en millisecondes)
  TIMEOUT: 10000,
  
  // Configuration CORS
  CORS_ORIGIN: process.env.REACT_APP_CORS_ORIGIN || 'http://localhost:3000',
};

// Endpoints de l'API
export const API_ENDPOINTS = {
  // Produits
  PRODUCTS: '/products',
  PRODUCT_BY_ID: (id) => `/products/${id}`,
  PRODUCTS_BY_CATEGORY: (category) => `/products/category/${category}`,
  PRODUCTS_SEARCH: (query) => `/products/search?q=${query}`,
  
  // Commandes
  ORDERS: '/orders',
  ORDER_BY_ID: (id) => `/orders/${id}`,
  ORDER_STATUS: (id) => `/orders/${id}/status`,
  
  // Authentification
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  
  // Catégories
  CATEGORIES: '/categories',
  CATEGORY_BY_ID: (id) => `/categories/${id}`,
  
  // Marques
  BRANDS: '/brands',
  BRAND_BY_ID: (id) => `/brands/${id}`,
};

// Messages d'erreur
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Erreur de connexion au serveur',
  UNAUTHORIZED: 'Vous n\'êtes pas autorisé à accéder à cette ressource',
  NOT_FOUND: 'Ressource non trouvée',
  SERVER_ERROR: 'Erreur interne du serveur',
  VALIDATION_ERROR: 'Données invalides',
};

// Statuts des commandes
export const ORDER_STATUS = {
  PENDING: 'en_attente',
  PREPARING: 'en_preparation',
  SHIPPED: 'expediee',
  DELIVERED: 'livree',
  CANCELLED: 'annulee',
};

// Statuts des commandes en français
export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.PENDING]: 'En attente',
  [ORDER_STATUS.PREPARING]: 'En préparation',
  [ORDER_STATUS.SHIPPED]: 'Expédiée',
  [ORDER_STATUS.DELIVERED]: 'Livrée',
  [ORDER_STATUS.CANCELLED]: 'Annulée',
};
