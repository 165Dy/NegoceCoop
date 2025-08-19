# Guide de Configuration et Lancement du Frontend

## Prérequis

1. **Node.js** (version 16 ou supérieure)
   - Téléchargez depuis [nodejs.org](https://nodejs.org/)
   - Choisissez la version LTS (Long Term Support)

2. **npm** ou **yarn** (inclus avec Node.js)

## Installation et Lancement

### 1. Installation des dépendances

```bash
# Aller dans le dossier frontend
cd frontend

# Installer les dépendances avec npm
npm install

# Ou avec yarn (si installé)
yarn install
```

### 2. Configuration de l'API Spring Boot

Avant de lancer le frontend, vous devez configurer l'URL de votre API Spring Boot :

#### Option A : Créer un fichier .env
Créez un fichier `.env` dans le dossier `frontend` avec le contenu suivant :

```env
# URL de votre API Spring Boot
REACT_APP_API_URL=http://localhost:8080/api

# Configuration CORS (optionnel)
REACT_APP_CORS_ORIGIN=http://localhost:3000
```

#### Option B : Modifier directement le fichier config.js
Modifiez le fichier `src/config.js` et changez la ligne :
```javascript
BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
```
Par l'URL de votre Spring Boot, par exemple :
```javascript
BASE_URL: 'http://localhost:8080/api',
```

### 3. Lancement du serveur de développement

```bash
# Lancer avec npm
npm start

# Ou avec yarn
yarn start
```

Le frontend sera accessible à l'adresse : **http://localhost:3000**

## Configuration de votre Spring Boot

Pour que le frontend puisse communiquer avec votre Spring Boot, assurez-vous que :

### 1. CORS est configuré dans Spring Boot

Ajoutez cette configuration dans votre application Spring Boot :

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

### 2. Les endpoints API sont disponibles

Votre Spring Boot doit exposer les endpoints suivants :

#### Produits
- `GET /api/products` - Liste des produits
- `GET /api/products/{id}` - Détails d'un produit
- `POST /api/products` - Créer un produit
- `PUT /api/products/{id}` - Modifier un produit
- `DELETE /api/products/{id}` - Supprimer un produit
- `GET /api/products/search?q={query}` - Rechercher des produits
- `GET /api/products/category/{category}` - Produits par catégorie

#### Commandes
- `GET /api/orders` - Liste des commandes
- `GET /api/orders/{id}` - Détails d'une commande
- `POST /api/orders` - Créer une commande
- `PATCH /api/orders/{id}/status` - Modifier le statut d'une commande
- `DELETE /api/orders/{id}` - Supprimer une commande

#### Authentification
- `POST /api/auth/login` - Connexion
- `POST /api/auth/register` - Inscription

#### Catégories
- `GET /api/categories` - Liste des catégories
- `POST /api/categories` - Créer une catégorie
- `PUT /api/categories/{id}` - Modifier une catégorie
- `DELETE /api/categories/{id}` - Supprimer une catégorie

#### Marques
- `GET /api/brands` - Liste des marques
- `POST /api/brands` - Créer une marque
- `PUT /api/brands/{id}` - Modifier une marque
- `DELETE /api/brands/{id}` - Supprimer une marque

## Structure des données attendues

### Produit
```json
{
  "id": 1,
  "name": "Nom du produit",
  "brand": "Marque",
  "category": "Catégorie",
  "price": 100.00,
  "image": "URL de l'image",
  "stock": 10,
  "description": "Description du produit"
}
```

### Commande
```json
{
  "id": 1,
  "items": [
    {
      "id": 1,
      "name": "Nom du produit",
      "price": 100.00,
      "quantity": 2
    }
  ],
  "customer": {
    "company": "Nom de l'entreprise",
    "name": "Nom du client",
    "email": "email@example.com",
    "phone": "0123456789",
    "address": "Adresse complète"
  },
  "total": 200.00,
  "status": "en_preparation",
  "date": "2024-01-15T10:30:00Z"
}
```

## Dépannage

### Erreur "Module not found"
```bash
# Supprimer node_modules et réinstaller
rm -rf node_modules
npm install
```

### Erreur de connexion à l'API
1. Vérifiez que votre Spring Boot est lancé
2. Vérifiez l'URL dans la configuration
3. Vérifiez la configuration CORS
4. Vérifiez les logs de votre Spring Boot

### Erreur de port déjà utilisé
```bash
# Tuer le processus sur le port 3000
npx kill-port 3000

# Ou lancer sur un autre port
PORT=3001 npm start
```

## Commandes utiles

```bash
# Lancer en mode développement
npm start

# Construire pour la production
npm run build

# Lancer les tests
npm test

# Vérifier les erreurs de linting
npm run lint
```

## Support

Si vous rencontrez des problèmes :
1. Vérifiez que Node.js est bien installé : `node --version`
2. Vérifiez que npm est installé : `npm --version`
3. Vérifiez que votre Spring Boot est accessible
4. Consultez les logs dans la console du navigateur (F12)
