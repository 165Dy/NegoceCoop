// Configuration pour les images locales d'équipements industriels
export const localProductImages = {
  'Schneider Electric': {
    'Protection électrique': [
      '/images/products/schneider/disjoncteur-1.jpg',
      '/images/products/schneider/protection-2.jpg',
      '/images/products/schneider/tableau-3.jpg',
      '/images/products/schneider/contacteur-4.jpg',
      '/images/products/schneider/relais-5.jpg'
    ]
  },

  'ABB': {
    'Transformation': [
      '/images/products/abb/transformateur-1.jpg',
      '/images/products/abb/poste-2.jpg',
      '/images/products/abb/mt-3.jpg',
      '/images/products/abb/distribution-4.jpg',
      '/images/products/abb/reseau-5.jpg'
    ]
  },

  'Siemens': {
    'Motorisation': [
      '/images/products/siemens/moteur-1.jpg',
      '/images/products/siemens/entrainement-2.jpg',
      '/images/products/siemens/reducteur-3.jpg',
      '/images/products/siemens/servo-4.jpg',
      '/images/products/siemens/asynchrone-5.jpg'
    ]
  },

  'Festo': {
    'Automatisation': [
      '/images/products/festo/capteur-1.jpg',
      '/images/products/festo/pneumatique-2.jpg',
      '/images/products/festo/vanne-3.jpg',
      '/images/products/festo/distributeur-4.jpg',
      '/images/products/festo/regulation-5.jpg'
    ]
  },

  'VEGA': {
    'Hydraulique': [
      '/images/products/vega/verin-1.jpg',
      '/images/products/vega/centrale-2.jpg',
      '/images/products/vega/distributeur-3.jpg',
      '/images/products/vega/pompe-4.jpg',
      '/images/products/vega/reservoir-5.jpg'
    ]
  },

  'Eaton': {
    'Contrôle moteur': [
      '/images/products/eaton/variateur-1.jpg',
      '/images/products/eaton/demarreur-2.jpg',
      '/images/products/eaton/convertisseur-3.jpg',
      '/images/products/eaton/regulation-4.jpg',
      '/images/products/eaton/commande-5.jpg'
    ]
  },

  'WEG': {
    'Pompage': [
      '/images/products/weg/pompe-1.jpg',
      '/images/products/weg/centrifuge-2.jpg',
      '/images/products/weg/immergee-3.jpg',
      '/images/products/weg/surpresseur-4.jpg',
      '/images/products/weg/groupe-5.jpg'
    ]
  },

  'SKF': {
    'Mécanique': [
      '/images/products/skf/roulement-1.jpg',
      '/images/products/skf/butee-2.jpg',
      '/images/products/skf/palier-3.jpg',
      '/images/products/skf/joint-4.jpg',
      '/images/products/skf/graissage-5.jpg'
    ]
  }
};

// Fonction pour vérifier si une image locale existe et sinon utiliser une fallback
export const getLocalProductImage = (brand, category, fallbackUrl) => {
  const brandImages = localProductImages[brand];
  if (!brandImages) return fallbackUrl;
  
  const categoryImages = brandImages[category];
  if (!categoryImages || categoryImages.length === 0) {
    // Si pas d'images pour cette catégorie, prendre une image au hasard de la marque
    const allBrandImages = Object.values(brandImages).flat();
    return allBrandImages[Math.floor(Math.random() * allBrandImages.length)] || fallbackUrl;
  }
  
  // Retourner une image aléatoire de la catégorie
  return categoryImages[Math.floor(Math.random() * categoryImages.length)];
};

// Instructions pour ajouter vos propres images
export const imageInstructions = `
Pour ajouter vos propres images de produits :

1. Créez la structure de dossiers dans public/images/products/ :
   - schneider/
   - abb/
   - siemens/
   - festo/
   - vega/
   - eaton/
   - weg/
   - skf/

2. Ajoutez vos images dans les dossiers correspondants
   - Format recommandé : JPG ou PNG
   - Taille recommandée : 400x400px ou 600x600px
   - Noms de fichiers : descriptifs (ex: disjoncteur-1.jpg)

3. Modifiez les chemins dans localProductImages si nécessaire

4. Activez l'utilisation des images locales dans le code principal
`;
