import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Package, Users, BarChart3, Search, Phone, Mail, MapPin, Menu, X, Plus, Minus, Check, Clock, Truck } from 'lucide-react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Textarea } from './components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table';
import './App.css';

// Mock data for industrial equipment
const industrialEquipment = [
  { id: 1, name: 'Disjoncteur Schneider Electric', brand: 'Schneider Electric', category: 'Protection électrique', price: 245, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300', stock: 15 },
  { id: 2, name: 'Transformateur ABB', brand: 'ABB', category: 'Transformation', price: 1850, image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300', stock: 8 },
  { id: 3, name: 'Moteur Siemens', brand: 'Siemens', category: 'Motorisation', price: 975, image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=300', stock: 12 },
  { id: 4, name: 'Capteur FESTO', brand: 'Festo', category: 'Automatisation', price: 315, image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=300', stock: 25 },
  { id: 5, name: 'Vérin hydraulique VEGA', brand: 'VEGA', category: 'Hydraulique', price: 680, image: 'https://images.unsplash.com/photo-1581093458791-9d42e98e3d35?w=300', stock: 6 },
  { id: 6, name: 'Variateur Eaton', brand: 'Eaton', category: 'Contrôle moteur', price: 525, image: 'https://images.unsplash.com/photo-1581093804475-577d72e38aa0?w=300', stock: 18 },
  { id: 7, name: 'Pompe WEG', brand: 'WEG', category: 'Pompage', price: 1200, image: 'https://images.unsplash.com/photo-1581094289009-9b5bba6e7d68?w=300', stock: 10 },
  { id: 8, name: 'Roulement SKF', brand: 'SKF', category: 'Mécanique', price: 85, image: 'https://images.unsplash.com/photo-1581094372616-52d93aca466a?w=300', stock: 50 }
];

const brands = ['Schneider Electric', 'ABB', 'Siemens', 'Festo', 'VEGA', 'Eaton', 'WEG', 'SKF'];
const categories = ['Protection électrique', 'Transformation', 'Motorisation', 'Automatisation', 'Hydraulique', 'Contrôle moteur', 'Pompage', 'Mécanique'];

function Header({ cartCount, isAdmin, setIsAdmin }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg border-b nc-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-2 rounded-lg shadow-lg">
              <div className="text-white font-bold text-lg">NC</div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900">NEGOCE COOPERATION</span>
              <span className="text-xs text-gray-600 tracking-wider">ÉQUIPEMENTS INDUSTRIELS</span>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Accueil</Link>
            <Link to="/catalog" className="text-gray-700 hover:text-blue-600 transition-colors">Catalogue</Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">À propos</Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</Link>
            {isAdmin ? (
              <Link to="/admin" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Dashboard Admin
              </Link>
            ) : (
              <Link to="/cart" className="relative bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs">
                    {cartCount}
                  </Badge>
                )}
              </Link>
            )}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsAdmin(!isAdmin)}
              className="text-sm"
            >
              {isAdmin ? 'Mode Client' : 'Mode Admin'}
            </Button>
          </nav>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link to="/" className="block py-2 text-gray-700 hover:text-blue-600">Accueil</Link>
            <Link to="/catalog" className="block py-2 text-gray-700 hover:text-blue-600">Catalogue</Link>
            <Link to="/about" className="block py-2 text-gray-700 hover:text-blue-600">À propos</Link>
            <Link to="/contact" className="block py-2 text-gray-700 hover:text-blue-600">Contact</Link>
            {isAdmin ? (
              <Link to="/admin" className="block py-2 text-blue-600 font-medium">Dashboard Admin</Link>
            ) : (
              <Link to="/cart" className="block py-2 text-blue-600 font-medium">
                Panier ({cartCount})
              </Link>
            )}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsAdmin(!isAdmin)}
              className="mt-2"
            >
              {isAdmin ? 'Mode Client' : 'Mode Admin'}
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-r from-blue-800 to-blue-900 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1717386255773-1e3037c81788?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwyfHxpbmR1c3RyaWFsJTIwZXF1aXBtZW50fGVufDB8fHx8MTc1NDgyMzg5Nnww&ixlib=rb-4.1.0&q=85"
            alt="Industrial Equipment"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <div className="flex items-center mb-4">
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg mr-4">
                <div className="text-white font-bold text-2xl">NC</div>
              </div>
              <div>
                <h1 className="text-3xl font-bold">NEGOCE COOPERATION</h1>
                <p className="text-blue-200 text-sm tracking-wider">ÉQUIPEMENTS INDUSTRIELS</p>
              </div>
            </div>
            <h2 className="text-4xl font-bold mb-6 leading-tight">
              Votre Partenaire de Confiance en Équipements Industriels
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Spécialiste de la fourniture d'équipements industriels de qualité professionnelle. 
              Schneider Electric, ABB, Siemens, Festo et bien plus encore.
            </p>
            <div className="flex space-x-4">
              <Link to="/catalog">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                  Découvrir nos Produits
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg font-semibold">
                  Nous Contacter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Pourquoi Choisir NEGOCE COOPERATION ?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nous sommes votre partenaire de confiance pour tous vos projets industriels
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Package className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Large Sélection</h3>
                <p className="text-gray-600">Plus de 10 000 références des plus grandes marques industrielles</p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Truck className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Livraison Rapide</h3>
                <p className="text-gray-600">Expédition sous 24h et suivi en temps réel de vos commandes</p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Support Expert</h3>
                <p className="text-gray-600">Équipe technique spécialisée pour vous conseiller</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Marques Partenaires</h2>
            <p className="text-lg text-gray-600">Les leaders mondiaux de l'industrie</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {brands.map((brand, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
                <div className="text-lg font-semibold text-gray-800">{brand}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function Catalog({ addToCart }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredProducts = industrialEquipment.filter(product => {
    return product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
           (selectedBrand === '' || product.brand === selectedBrand) &&
           (selectedCategory === '' || product.category === selectedCategory);
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Catalogue Produits</h1>
          <p className="text-lg text-gray-600">Découvrez notre sélection d'équipements industriels</p>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedBrand || "all"} onValueChange={(value) => setSelectedBrand(value === "all" ? "" : value)}>
              <SelectTrigger>
                <SelectValue placeholder="Toutes les marques" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les marques</SelectItem>
                {brands.map(brand => (
                  <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedCategory || "all"} onValueChange={(value) => setSelectedCategory(value === "all" ? "" : value)}>
              <SelectTrigger>
                <SelectValue placeholder="Toutes les catégories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <Badge variant="secondary" className="mb-2">{product.brand}</Badge>
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{product.category}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-blue-600">{product.price}€</span>
                  <span className={`text-sm ${product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-yellow-600' : 'text-red-600'}`}>
                    Stock: {product.stock}
                  </span>
                </div>
                <Button 
                  onClick={() => addToCart(product)}
                  disabled={product.stock === 0}
                  className="w-full"
                >
                  {product.stock === 0 ? 'Rupture de stock' : 'Ajouter au panier'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function Cart({ cart, updateQuantity, removeFromCart }) {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderForm, setOrderForm] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: ''
  });
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleOrder = () => {
    const order = {
      id: Date.now(),
      items: cart,
      customer: orderForm,
      total: total,
      status: 'en_preparation',
      date: new Date().toISOString(),
    };

    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    localStorage.setItem('orders', JSON.stringify([...existingOrders, order]));
    localStorage.removeItem('cart');
    
    setIsOrderModalOpen(false);
    alert('Commande envoyée avec succès ! Nous vous contacterons sous peu.');
    navigate('/');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Votre Panier</h1>
          <p className="text-lg text-gray-600 mb-8">Votre panier est vide</p>
          <Link to="/catalog">
            <Button>Continuer vos achats</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Votre Panier</h1>
        
        <div className="bg-white rounded-lg shadow-sm">
          {cart.map(item => (
            <div key={item.id} className="flex items-center p-6 border-b last:border-b-0">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg mr-4" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-gray-600">{item.brand} - {item.category}</p>
                <p className="text-blue-600 font-bold">{item.price}€</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive" 
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4"
                >
                  Supprimer
                </Button>
              </div>
            </div>
          ))}
          
          <div className="p-6 bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-bold">Total: {total.toFixed(2)}€</span>
            </div>
            
            <Dialog open={isOrderModalOpen} onOpenChange={setIsOrderModalOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="w-full">
                  Passer la commande
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Informations de commande</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="Nom de l'entreprise"
                    value={orderForm.company}
                    onChange={(e) => setOrderForm({...orderForm, company: e.target.value})}
                  />
                  <Input
                    placeholder="Nom complet"
                    value={orderForm.name}
                    onChange={(e) => setOrderForm({...orderForm, name: e.target.value})}
                  />
                  <Input
                    placeholder="Email"
                    type="email"
                    value={orderForm.email}
                    onChange={(e) => setOrderForm({...orderForm, email: e.target.value})}
                  />
                  <Input
                    placeholder="Téléphone"
                    value={orderForm.phone}
                    onChange={(e) => setOrderForm({...orderForm, phone: e.target.value})}
                  />
                  <Textarea
                    placeholder="Adresse de livraison"
                    value={orderForm.address}
                    onChange={(e) => setOrderForm({...orderForm, address: e.target.value})}
                  />
                  <Textarea
                    placeholder="Notes supplémentaires (optionnel)"
                    value={orderForm.notes}
                    onChange={(e) => setOrderForm({...orderForm, notes: e.target.value})}
                  />
                  <Button onClick={handleOrder} className="w-full">
                    Confirmer la commande
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(savedOrders);
  }, []);

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'en_preparation': return 'bg-yellow-100 text-yellow-800';
      case 'expediee': return 'bg-blue-100 text-blue-800';
      case 'livree': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'en_preparation': return <Clock className="h-4 w-4" />;
      case 'expediee': return <Truck className="h-4 w-4" />;
      case 'livree': return <Check className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'en_preparation': return 'En préparation';
      case 'expediee': return 'Expédiée';
      case 'livree': return 'Livrée';
      default: return 'En préparation';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Dashboard Admin</h1>
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Package className="h-8 w-8 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Commandes</p>
                    <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Clock className="h-8 w-8 text-yellow-600 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">En préparation</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {orders.filter(o => o.status === 'en_preparation').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Truck className="h-8 w-8 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Expédiées</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {orders.filter(o => o.status === 'expediee').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Check className="h-8 w-8 text-green-600 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Livrées</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {orders.filter(o => o.status === 'livree').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Gestion des Commandes</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map(order => (
                  <TableRow key={order.id}>
                    <TableCell>#{order.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.customer.name}</p>
                        <p className="text-sm text-gray-600">{order.customer.company}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(order.date).toLocaleDateString('fr-FR')}
                    </TableCell>
                    <TableCell className="font-medium">
                      {order.total.toFixed(2)}€
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.status)}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(order.status)}
                          <span>{getStatusLabel(order.status)}</span>
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Select 
                          value={order.status || "en_preparation"} 
                          onValueChange={(value) => updateOrderStatus(order.id, value)}
                        >
                          <SelectTrigger className="w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en_preparation">En préparation</SelectItem>
                            <SelectItem value="expediee">Expédiée</SelectItem>
                            <SelectItem value="livree">Livrée</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedOrder(order)}
                            >
                              Détails
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-lg">
                            <DialogHeader>
                              <DialogTitle>Détails de la commande #{order.id}</DialogTitle>
                            </DialogHeader>
                            {selectedOrder && (
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-semibold mb-2">Informations client</h4>
                                  <p><strong>Nom:</strong> {selectedOrder.customer.name}</p>
                                  <p><strong>Entreprise:</strong> {selectedOrder.customer.company}</p>
                                  <p><strong>Email:</strong> {selectedOrder.customer.email}</p>
                                  <p><strong>Téléphone:</strong> {selectedOrder.customer.phone}</p>
                                  <p><strong>Adresse:</strong> {selectedOrder.customer.address}</p>
                                  {selectedOrder.customer.notes && (
                                    <p><strong>Notes:</strong> {selectedOrder.customer.notes}</p>
                                  )}
                                </div>
                                
                                <div>
                                  <h4 className="font-semibold mb-2">Produits commandés</h4>
                                  {selectedOrder.items.map(item => (
                                    <div key={item.id} className="flex justify-between py-2 border-b">
                                      <span>{item.name} x{item.quantity}</span>
                                      <span>{(item.price * item.quantity).toFixed(2)}€</span>
                                    </div>
                                  ))}
                                  <div className="flex justify-between font-bold pt-2">
                                    <span>Total:</span>
                                    <span>{selectedOrder.total.toFixed(2)}€</span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {orders.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-600">Aucune commande pour le moment</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">À Propos de NEGOCE COOPERATION</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Notre Mission</h2>
          <p className="text-gray-600 mb-6">
            NEGOCE COOPERATION est votre partenaire de confiance dans le domaine des équipements industriels. 
            Nous nous engageons à fournir des solutions de qualité professionnelle pour tous vos besoins industriels.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4">Nos Valeurs</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold mb-2">Qualité</h3>
              <p className="text-gray-600">Nous sélectionnons uniquement les meilleures marques du marché</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Service</h3>
              <p className="text-gray-600">Support technique expert et service client réactif</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Innovation</h3>
              <p className="text-gray-600">Solutions technologiques avancées pour l'industrie 4.0</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Fiabilité</h3>
              <p className="text-gray-600">Livraisons rapides et stock disponible</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Contactez-Nous</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold mb-6">Nos Coordonnées</h2>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-blue-600 mr-3" />
                <div>
                  <p className="font-medium">Téléphone</p>
                  <p className="text-gray-600">+33 1 23 45 67 89</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-blue-600 mr-3" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-600">contact@industriepro.fr</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-blue-600 mr-3" />
                <div>
                  <p className="font-medium">Adresse</p>
                  <p className="text-gray-600">
                    123 Rue de l'Industrie<br/>
                    69000 Lyon, France
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="font-semibold mb-4">Horaires d'ouverture</h3>
              <div className="space-y-2 text-gray-600">
                <p>Lundi - Vendredi: 8h00 - 18h00</p>
                <p>Samedi: 9h00 - 12h00</p>
                <p>Dimanche: Fermé</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold mb-6">Envoyez-nous un message</h2>
            
            <form className="space-y-4">
              <Input placeholder="Nom complet" />
              <Input placeholder="Email" type="email" />
              <Input placeholder="Téléphone" />
              <Input placeholder="Entreprise" />
              <Textarea placeholder="Votre message" rows={4} />
              <Button className="w-full">Envoyer le message</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [cart, setCart] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);
  }, []);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    let newCart;
    
    if (existingItem) {
      newCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCart = [...cart, { ...product, quantity: 1 }];
    }
    
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) return;
    
    const newCart = cart.map(item =>
      item.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    );
    
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const removeFromCart = (productId) => {
    const newCart = cart.filter(item => item.id !== productId);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Router>
      <div className="App">
        <Header cartCount={cartCount} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;