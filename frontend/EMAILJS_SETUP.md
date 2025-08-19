# Configuration EmailJS - Guide étape par étape

## 📧 Configuration EmailJS pour NegoceCoop

Votre formulaire de contact est prêt ! Il faut maintenant configurer EmailJS pour qu'il envoie les emails vers `direction@negocecooperation.com`.

## Étape 1: Créer un compte EmailJS

1. **Allez sur** : [https://www.emailjs.com/](https://www.emailjs.com/)
2. **Cliquez sur** "Sign Up" 
3. **Créez votre compte** (gratuit jusqu'à 200 emails/mois)
4. **Vérifiez votre email**

## Étape 2: Ajouter un service email

1. **Dans le dashboard EmailJS**, cliquez sur "Add New Service"
2. **Choisissez votre fournisseur email** :
   - Gmail (si vous utilisez Gmail)
   - Outlook (si vous utilisez Outlook)
   - Yahoo Mail
   - Ou autre selon votre email `direction@negocecooperation.com`

3. **Connectez votre compte email** et autorisez EmailJS

## Étape 3: Créer un template d'email

1. **Cliquez sur "Email Templates"** → "Create New Template"
2. **Configurez le template** comme ceci :

```
Sujet : Nouveau message de contact - {{subject}}

Contenu :
Vous avez reçu un nouveau message de contact depuis le site NegoceCoop :

👤 Nom : {{from_name}}
📧 Email : {{from_email}}
📞 Téléphone : {{phone}}
🏢 Type de client : {{client_type}}
📋 Objet : {{subject}}

💬 Message :
{{message}}

---
Message envoyé depuis negocecooperation.com
```

3. **Dans les paramètres** :
   - **To Email** : `direction@negocecooperation.com`
   - **From Name** : `{{from_name}}`
   - **Reply To** : `{{from_email}}`

4. **Sauvegardez le template**

## Étape 4: Récupérer les clés de configuration

1. **Notez ces 3 informations importantes** :
   - **Service ID** : Dans "Email Services" (ex: `service_lg8gl6b`)
   - **Template ID** : Dans "Email Templates" (ex: `template_le99hn3`)
   - **Public Key** : Dans "Account" → "General" (ex: `oU7b3eiNYDM94S1A2`)

## Étape 5: Configurer le code

**Ouvrez le fichier** : `frontend/src/components/ContactForm.jsx`

**Remplacez ces lignes (vers la ligne 25)** :

```javascript
// AVANT (à remplacer)
const serviceId = 'YOUR_SERVICE_ID';  // À remplacer
const templateId = 'YOUR_TEMPLATE_ID'; // À remplacer
const publicKey = 'YOUR_PUBLIC_KEY';   // À remplacer

// APRÈS (avec vos vraies clés)
const serviceId = 'service_1a2b3c4';  // Votre Service ID
const templateId = 'template_5d6e7f8'; // Votre Template ID
const publicKey = 'user_9g0h1i2j3k4';   // Votre Public Key
```

## Étape 6: Tester le formulaire

1. **Sauvegardez le fichier** `ContactForm.jsx`
2. **Le site se recharge automatiquement**
3. **Allez sur la page Contact** (`http://localhost:3000/contact`)
4. **Remplissez le formulaire** et cliquez "Envoyer"
5. **Vérifiez votre boîte** `direction@negocecooperation.com`

## ✅ Ce qui fonctionne maintenant

- ✅ **Formulaire avec validation** (champs obligatoires)
- ✅ **Messages de succès/erreur**
- ✅ **Envoi direct** vers `direction@negocecooperation.com`
- ✅ **Réponse automatique** possible
- ✅ **Design professionnel** intégré

## 🔧 Paramètres avancés (optionnel)

### Auto-réponse au client
Dans EmailJS, vous pouvez configurer une auto-réponse :

```
Template d'auto-réponse :
Sujet : Merci pour votre message - NegoceCoop
Contenu : 
Bonjour {{from_name}},

Nous avons bien reçu votre message concernant "{{subject}}".
Notre équipe vous répondra dans les plus brefs délais.

Cordialement,
L'équipe NegoceCoop
```

### Notifications par email
EmailJS peut vous envoyer une notification à chaque message reçu.

## 🆘 En cas de problème

### Erreur "Service ID not found"
- Vérifiez que le Service ID est correct
- Assurez-vous que le service est actif dans EmailJS

### Emails non reçus
- Vérifiez les spams
- Testez avec un autre email d'abord
- Vérifiez les logs dans la console du navigateur (F12)

### Quota dépassé
- EmailJS gratuit : 200 emails/mois
- Plan payant : à partir de 5$/mois pour plus d'emails

## 💡 Conseils

1. **Testez d'abord** avec votre email personnel
2. **Gardez vos clés secrètes** (ne les partagez pas)
3. **Sauvegardez** vos paramètres EmailJS
4. **Surveillez** le quota d'emails

---

**Une fois configuré, votre formulaire enverra automatiquement tous les messages vers `direction@negocecooperation.com` !** 🎉
