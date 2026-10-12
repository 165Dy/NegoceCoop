# Guide de Déploiement Production - NegoceCoop

## Déploiement Hostinger via GitHub Actions

Le workflow `.github/workflows/deploy-hostinger.yml` construit le frontend à
chaque modification de `frontend/` fusionnée dans `main`, puis publie uniquement
les fichiers de `frontend/build/` sur la branche `deploy/hostinger`. Le fichier
`frontend/public/.htaccess` est inclus dans ce build pour que les routes React
comme `/catalog` continuent de fonctionner après rechargement.

### Configuration à faire dans Hostinger

1. Attendez qu'une exécution réussie du workflow crée la branche
   `deploy/hostinger` dans GitHub.
2. Dans le déploiement Git de Hostinger, sélectionnez le dépôt `165Dy/NegoceCoop`
   et remplacez la branche suivie `main` par `deploy/hostinger`.
3. Gardez `public_html` comme répertoire de publication. La racine de
   `deploy/hostinger` contient directement `index.html`, `static/`, `images/`
   et `.htaccess` : ne choisissez pas `frontend/` comme sous-répertoire.
4. Déclenchez un déploiement Hostinger, puis vérifiez le domaine et les routes
   `/catalog`, `/about` et `/contact`.

Le workflow utilise le `GITHUB_TOKEN` intégré à GitHub Actions ; aucun mot de
passe Hostinger, identifiant FTP ou secret supplémentaire n'est nécessaire.
Hostinger reste chargé de récupérer la branche Git, tandis que GitHub Actions
effectue le build. Ne supprimez pas l'historique de `deploy/hostinger` : chaque
publication est ajoutée à cette branche afin que les mises à jour Git restent
compatibles avec le déploiement Hostinger existant.

Ce déploiement ne publie que le frontend. Le backend FastAPI n'est pas déployé
par ce workflow. Le site utilise encore des produits de démonstration et
enregistre les commandes dans le navigateur ; ce déploiement ne fournit donc
pas de stockage de commandes partagé pour une activité réelle. Vérifiez aussi
les paramètres et modèles EmailJS avant d'activer les formulaires en production.

## 📦 Préparation du build de production

### 1. Vérifications avant build

**Vérifiez que tout fonctionne en local :**
```bash
cd frontend
npm start
```
- ✅ Site s'affiche correctement
- ✅ Formulaire de contact fonctionne
- ✅ Commandes se passent bien
- ✅ Dashboard admin accessible via l'URL secrète
- ✅ EmailJS configuré et fonctionnel

### 2. Configuration pour la production

**Variables d'environnement :**
Créez un fichier `.env.production` dans le dossier `frontend/` :
```env
# URL de production (à modifier selon votre domaine)
REACT_APP_API_URL=https://votredomaine.com/api

# Optimisations
GENERATE_SOURCEMAP=false
```

### 3. Build de production

```bash
cd frontend
npm run build
```

**Résultat :** Un dossier `build/` est créé avec votre site optimisé.

---

## 🌐 Options de déploiement

### Option 1 : Hébergement web classique
**Exemples :** OVH, Hostinger, Siteground, etc.

1. **Uploadez le contenu du dossier `build/`** (pas le dossier `build/` lui-même) dans le dossier web de votre hébergeur
2. **Configurez le domaine** pour pointer vers ce dossier
3. **Configurez les redirections** pour React Router

### Option 2 : Netlify (Gratuit et simple)
1. **Connectez votre repository** GitHub
2. **Build settings :**
   - Build command: `npm run build`
   - Publish directory: `build`
   - Base directory: `frontend`
3. **Deploy automatique** à chaque commit

### Option 3 : Vercel (Gratuit pour projets personnels)
1. **Connectez votre repository** GitHub
2. **Framework preset :** Create React App
3. **Root directory :** `frontend`
4. **Deploy automatique**

### Option 4 : GitHub Pages (Gratuit)
1. **Activez GitHub Pages** dans les settings du repo
2. **Branch :** gh-pages
3. **Utilisez le script de déploiement :**
```bash
npm run build
npm run deploy
```

---

## ⚙️ Configuration serveur (pour hébergement web)

### Fichier .htaccess (pour Apache)
Créez `.htaccess` dans le dossier de production :
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Cache des assets statiques
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>
```

### Configuration Nginx
```nginx
location / {
    try_files $uri $uri/ /index.html;
}

# Cache des assets
location /static/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

---

## 🔒 Sécurité en production

### 1. URL secrète du dashboard
Votre dashboard admin est accessible via :
```
https://votredomaine.com/admin/Marcel-Kouame/dashboard
```
**⚠️ Gardez cette URL secrète !**

### 2. Configuration EmailJS
- ✅ Clés EmailJS déjà configurées
- ✅ Domaine autorisé dans EmailJS
- ✅ Templates configurés

### 3. HTTPS
**Obligatoire** pour EmailJS et la sécurité générale.
La plupart des hébergeurs proposent SSL gratuit.

---

## 📁 Structure de déploiement

### Ce qui sera en ligne :
```
votredomaine.com/
├── index.html                 ← Page d'accueil
├── /catalog                   ← Catalogue produits
├── /cart                      ← Panier
├── /about                     ← À propos
├── /contact                   ← Contact
└── /admin/Marcel-Kouame/dashboard ← Dashboard secret
```

### Fichiers uploadés :
```
build/
├── index.html
├── static/
│   ├── css/main.[hash].css
│   ├── js/main.[hash].js
│   └── media/
├── images/
│   └── logos/
└── manifest.json
```

---

## ✅ Checklist de déploiement

### Avant déploiement :
- [ ] Build de production créé (`npm run build`)
- [ ] Site testé en local
- [ ] EmailJS configuré et testé
- [ ] Variables d'environnement définies
- [ ] Images optimisées

### Après déploiement :
- [ ] Site accessible via le domaine
- [ ] Toutes les pages fonctionnent
- [ ] Formulaire de contact envoie des emails
- [ ] Commandes fonctionnent
- [ ] Dashboard admin accessible avec URL secrète
- [ ] Site responsive sur mobile
- [ ] HTTPS activé

### Test de production :
1. **Passer une commande test** complete
2. **Vérifier réception email** sur `negoce.cooperation@gmail.com`
3. **Tester formulaire de contact**
4. **Accéder au dashboard** via l'URL secrète
5. **Vérifier sur mobile et desktop**

---

## 🆘 Dépannage

### Site ne s'affiche pas
- Vérifiez que le dossier `build/` est uploadé dans le bon répertoire
- Vérifiez la configuration DNS du domaine

### Routes ne fonctionnent pas
- Ajoutez le fichier `.htaccess` pour Apache
- Configurez les redirections serveur

### EmailJS ne fonctionne pas
- Vérifiez le domaine autorisé dans EmailJS
- Vérifiez que HTTPS est activé

### Dashboard inaccessible
- Vérifiez l'URL exacte : `/admin/Marcel-Kouame/dashboard`
- Vérifiez la configuration des routes

---

## 💡 Conseils

1. **Testez d'abord** sur un sous-domaine
2. **Sauvegardez** régulièrement
3. **Surveillez** les quotas EmailJS
4. **Optimisez** les images pour la vitesse
5. **Activez** les analytics si nécessaire

---

**Votre site est maintenant prêt pour la production !** 🚀
