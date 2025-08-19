# Configuration EmailJS pour les Commandes - NegoceCoop

## 📧 Template d'email à créer dans EmailJS

Vous devez créer **1 template** dans votre compte EmailJS pour recevoir les notifications de commandes :

### 1. Template de notification (pour vous recevoir les commandes)

**Template ID suggéré :** `template_commande` 

**Sujet :** `Nouvelle commande #{{order_id}} - {{from_name}}`

**Contenu :**
```
🛒 NOUVELLE COMMANDE REÇUE

Détails de la commande :
📋 Numéro : #{{order_id}}
📅 Date : {{order_date}}
💰 Total : {{order_total}}€

👤 INFORMATIONS CLIENT :
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Nom : {{from_name}}
• Entreprise : {{company}}
• Email : {{from_email}}
• Téléphone : {{phone}}
• Adresse : {{address}}

📝 Notes : {{notes}}

🛍️ PRODUITS COMMANDÉS :
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{{order_items}}

💰 TOTAL COMMANDE : {{order_total}}€

---
Commande passée via negocecooperation.com
Répondre directement au client : {{reply_to}}
```

**Paramètres du template :**
- **To Email :** `negoce.cooperation@gmail.com`
- **From Name :** `{{from_name}}`
- **Reply To :** `{{reply_to}}`

---

## 🎨 Confirmation client

Comme vous utilisez le plan gratuit d'EmailJS, **nous n'envoyons pas d'email de confirmation au client**.
À la place, une **belle modale de confirmation** s'affiche avec :

- ✅ **Message de remerciement** personnalisé
- ✅ **Confirmation** que la commande est transmise à l'équipe
- ✅ **Informations de contact** pour le suivi
- ✅ **Bouton** pour continuer les achats

---

## 🔧 Configuration terminée

Le code est déjà configuré avec votre template ID : `template_22dghl7`

**Plus rien à modifier dans le code !** ✅

---

## ✅ Test de fonctionnement

Une fois les templates créés :

1. **Ajoutez des produits au panier**
2. **Cliquez sur "Passer la commande"**
3. **Remplissez le formulaire**
4. **Cliquez sur "Confirmer la commande"**

**Résultat attendu :**
- ✅ Email de notification reçu sur `negoce.cooperation@gmail.com`
- ✅ Belle modale de confirmation affichée au client
- ✅ Panier vidé automatiquement
- ✅ Commande sauvegardée dans le dashboard admin

---

## 🎨 Personnalisation

Vous pouvez personnaliser :
- **Les couleurs** des emails
- **Le logo** de votre entreprise
- **Les messages** selon vos besoins
- **Les informations de contact**

---

## 🆘 Dépannage

### Emails non reçus
1. Vérifiez les **templates ID** dans le code
2. Vérifiez les **spams**
3. Testez avec un email personnel d'abord

### Erreurs dans la console
1. Ouvrez la console (F12)
2. Vérifiez les erreurs EmailJS
3. Vérifiez que les **clés** sont correctes

---

**Avec cette configuration, votre site gère maintenant les commandes de A à Z !** 🚀
