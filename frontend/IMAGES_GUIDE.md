# Guide des Images d'Équipements Industriels - NegoceCoop

## 🎯 Objectif

Remplacer les images génériques par de vraies photos d'équipements industriels correspondant aux marques et catégories vendues.

## 📁 Structure mise en place

J'ai créé **deux systèmes** pour gérer les images :

### 1. Système actuel (Images Unsplash) ✅ ACTIF
- **Fichier :** `src/data/industrialImages.js`
- **Type :** Images d'équipements industriels depuis Unsplash
- **Avantage :** Fonctionne immédiatement, images professionnelles
- **Inconvénient :** Pas spécifiques aux marques exactes

### 2. Système local (Vos propres images) 🔄 PRÊT
- **Fichier :** `src/data/localImages.js`
- **Type :** Vos propres images de produits
- **Avantage :** Images authentiques de vos produits exacts
- **Inconvénient :** Nécessite d'ajouter les images manuellement

## 🚀 Comment ajouter vos vraies images

### Étape 1 : Préparer les images
1. **Récupérez** les images des sites constructeurs ou de vos catalogues
2. **Redimensionnez** à 400x400px ou 600x600px
3. **Renommez** avec des noms descriptifs :
   ```
   disjoncteur-schneider-1.jpg
   transformateur-abb-1.jpg
   moteur-siemens-1.jpg
   capteur-festo-1.jpg
   verin-vega-1.jpg
   variateur-eaton-1.jpg
   pompe-weg-1.jpg
   roulement-skf-1.jpg
   ```

### Étape 2 : Organiser dans les dossiers
Créez cette structure dans `frontend/public/images/products/` :
```
products/
├── schneider/
│   ├── disjoncteur-1.jpg
│   ├── protection-2.jpg
│   └── tableau-3.jpg
├── abb/
│   ├── transformateur-1.jpg
│   ├── poste-2.jpg
│   └── mt-3.jpg
├── siemens/
│   ├── moteur-1.jpg
│   ├── entrainement-2.jpg
│   └── reducteur-3.jpg
├── festo/
│   ├── capteur-1.jpg
│   ├── pneumatique-2.jpg
│   └── vanne-3.jpg
├── vega/
│   ├── verin-1.jpg
│   ├── centrale-2.jpg
│   └── distributeur-3.jpg
├── eaton/
│   ├── variateur-1.jpg
│   ├── demarreur-2.jpg
│   └── convertisseur-3.jpg
├── weg/
│   ├── pompe-1.jpg
│   ├── centrifuge-2.jpg
│   └── immergee-3.jpg
└── skf/
    ├── roulement-1.jpg
    ├── butee-2.jpg
    └── palier-3.jpg
```

### Étape 3 : Activer les images locales
Dans `src/App.js`, remplacez :
```javascript
import { getProductImage } from './data/industrialImages';
```
Par :
```javascript
import { getLocalProductImage } from './data/localImages';
import { getProductImage } from './data/industrialImages';
```

Et modifiez :
```javascript
].map(product => ({
  ...product,
  image: getProductImage(product.brand, product.category)
}));
```
Par :
```javascript
].map(product => ({
  ...product,
  image: getLocalProductImage(
    product.brand, 
    product.category, 
    getProductImage(product.brand, product.category) // Fallback
  )
}));
```

## 🎨 Sources d'images recommandées

### Sites constructeurs officiels
- **Schneider Electric :** `se.com/fr/fr/`
- **ABB :** `new.abb.com/fr/`
- **Siemens :** `siemens.com/fr/fr/`
- **Festo :** `festo.com/fr/fr/`
- **VEGA :** `vega.com/fr/`
- **Eaton :** `eaton.com/fr/fr-fr/`
- **WEG :** `weg.net/fr/`
- **SKF :** `skf.com/fr/`

### Banques d'images industrielles
- **Unsplash :** Mots-clés : "industrial equipment", "motor", "pump"
- **Pexels :** Recherche "industrial machinery"
- **Freepik :** Images industrielles (attention aux licences)

## 🔧 Optimisation des images

### Format recommandé
- **Type :** JPG pour photos, PNG pour logos
- **Taille :** 400x400px (carré) ou 600x400px (rectangle)
- **Poids :** < 200KB par image
- **Qualité :** 80-85% pour un bon compromis

### Outils de redimensionnement
- **En ligne :** `tinypng.com`, `squoosh.app`
- **Logiciels :** Photoshop, GIMP, Canva
- **Batch :** ImageMagick, XnConvert

## ✅ État actuel

**Système actif :** Images Unsplash industrielles
- ✅ 8 produits avec images dynamiques
- ✅ Images changent selon marque/catégorie
- ✅ Fallback automatique si problème

**Prochaine étape :** Ajouter vos vraies images produits

## 🆘 Aide

Si vous avez besoin d'aide pour :
- Récupérer les images des sites constructeurs
- Redimensionner les images
- Organiser les fichiers
- Modifier le code

N'hésitez pas à demander !

---

**Le système est prêt à recevoir vos vraies images de produits !** 🚀
