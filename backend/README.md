# ⚙️ Mamichic Backend - API Restful

Le backend de Mamichic est le moteur qui gère les données, les stocks et la sécurité de la plateforme.

## 🛠️ Stack Technique
- **Runtime** : Node.js
- **Framework** : Express.js
- **Base de données** : MongoDB Atlas (Cloud)
- **ODM** : Mongoose
- **Sécurité** : Protection par mot de passe pour les accès sensibles.

## 📡 API Endpoints
### Produits
- `GET /api/products` : Liste tous les produits (triés par date).
- `POST /api/products` : Ajoute un nouveau produit.
- `PUT /api/products/:id` : Met à jour un produit ou ses stocks.
- `DELETE /api/products/:id` : Supprime un produit.

### Authentification & Équipe
- `POST /api/auth/login` : Connexion sécurisée (JWT).
- `GET /api/auth/users` : Liste des administrateurs.
- `POST /api/auth/users` : Créer un nouvel admin.
- `DELETE /api/auth/users/:id` : Supprimer un admin.

## 📊 Gestion des Stocks
Le backend intègre une logique de gestion numérique des stocks (`countInStock`). 
- Stock > 5 : "En stock"
- Stock < 5 : "Alerte stock faible"
- Stock = 0 : "Rupture de stock"

## 🚀 Installation & Lancement
```bash
npm install
# Configurez votre .env avec MONGO_URI et ADMIN_PASSWORD
npm run dev
```
Port par défaut : `5000`

## 🧪 Script de Migration
Utilisez `node migrate.js` pour réinitialiser la base de données avec les produits de démonstration premium.
