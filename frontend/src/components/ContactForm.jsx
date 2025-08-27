import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    typeClient: '',
    objet: '',
    message: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('');

    try {
      // Configuration EmailJS (à remplacer par vos vraies clés)
      const serviceId = 'service_lg8gl6b';  // À remplacer
      const templateId = 'template_le99hn3'; // À remplacer
      const publicKey = 'oU7b3eiNYDM94S1A2';   // À remplacer

      // Préparation des données pour l'email
      const templateParams = {
        to_email: 'direction@negocecooperation.com',
        from_name: formData.nom,
        from_email: formData.email,
        phone: formData.telephone,
        client_type: formData.typeClient,
        subject: formData.objet,
        message: formData.message,
        reply_to: formData.email,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      setStatus('success');
      setFormData({
        nom: '',
        email: '',
        telephone: '',
        typeClient: '',
        objet: '',
        message: ''
      });
      
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <h2 className="text-2xl font-semibold mb-6">Envoyez-nous un message</h2>
      
      {status === 'success' && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          ✅ Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
        </div>
      )}
      
      {status === 'error' && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          ❌ Une erreur s'est produite. Veuillez réessayer ou nous contacter directement.
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input 
          placeholder="Nom complet *" 
          value={formData.nom}
          onChange={(e) => handleChange('nom', e.target.value)}
          required
        />
        
        <Input 
          placeholder="Email *" 
          type="email" 
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          required
        />
        
        <Input 
          placeholder="Téléphone" 
          value={formData.telephone}
          onChange={(e) => handleChange('telephone', e.target.value)}
        />
        
        <Select value={formData.typeClient} onValueChange={(value) => handleChange('typeClient', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Type de client *" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="particulier">Particulier</SelectItem>
            <SelectItem value="entreprise">Entreprise</SelectItem>
          </SelectContent>
        </Select>
        
        <Input 
          placeholder="Objet de votre demande *" 
          value={formData.objet}
          onChange={(e) => handleChange('objet', e.target.value)}
          required
        />
        
        <Textarea 
          placeholder="Votre message *" 
          rows={4} 
          value={formData.message}
          onChange={(e) => handleChange('message', e.target.value)}
          required
        />
        
        <Button 
          type="submit" 
          className="w-full bg-green-600 hover:bg-green-700 text-white" 
          disabled={isLoading}
        >
          {isLoading ? 'Envoi en cours...' : 'Envoyer le message'}
        </Button>
      </form>
      
      <div className="mt-4 text-sm text-gray-500">
        * Champs obligatoires
      </div>
    </div>
  );
};

export default ContactForm;
