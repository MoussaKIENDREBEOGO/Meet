# 💎 Mamichic Luxury E-commerce

Mamichic est une plateforme e-commerce haut de gamme dédiée à la mode africaine d'exception. Ce projet allie l'authenticité des traditions textiles à une expérience numérique moderne et luxueuse, offrant une interface raffinée et un parcours client optimisé jusqu'à la commande via WhatsApp.

## 🚀 Fonctionnalités Clés

- **Gestion de Catalogue Premium** : Présentation soignée des articles (Pagnes, Robes, Accessoires) avec gestion dynamique des stocks.
- **Console d'Administration Avancée** : Interface métier complète pour la gestion de l'inventaire, des prix et de l'équipe.
- **Suivi des Commandes** : Système de suivi en temps réel des commandes clients avec gestion des statuts de livraison.
- **Reporting & Statistiques** : Tableau de bord intégré analysant le chiffre d'affaires et la rotation des stocks.
- **Expérience Utilisateur Mobile-First** : Navigation fluide et responsive, conçue pour une utilisation optimale sur smartphone.

## 🛠️ Stack Technique

### Frontend
- **Framework** : Next.js 15 (App Router) pour une performance accrue et un SEO optimisé.
- **Styling** : Architecture CSS moderne utilisant des variables personnalisées pour un thème dynamique (Dark/Light).
- **Animations** : Framer Motion pour des transitions fluides et une sensation de fluidité haut de gamme.

### Backend
- **Runtime** : Node.js & Express.js pour une API REST robuste et scalable.
- **Base de données** : MongoDB Atlas (NoSQL) pour une flexibilité maximale des données produits.
- **Sécurité** : Authentification par jetons (JWT) et protection des routes administratives.
- **Persistence** : Intégration de Mongoose pour la modélisation des schémas de données.

## 🧪 Installation et Test

### 1. Pré-requis
- Node.js (v18+)
- Compte MongoDB Atlas

### 2. Backend
```bash
cd backend
npm install
# Configurez votre .env (PORT, MONGO_URI, JWT_SECRET)
node migrate.js # Peuplement initial de la base de données
npm run dev
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```

## 👨‍💻 Expertise Technique

- **Architecture Modulaire** : Séparation stricte des composants et utilisation de Context API pour la gestion d'état globale (Panier, Thème).
- **Optimisation de la Performance** : Stratégies de rendu Next.js pour un chargement instantané des pages produits.
- **Clean Code** : Refactorisation régulière pour garantir une maintenabilité à long terme de la base de code.

## 📈 Roadmap

- **Intégration de Paiements** : Solutions locales (Orange Money, Moov Money) et internationales.
- **Optimisation Media** : Mise en place d'un CDN pour la diffusion des visuels haute résolution.
- **Analyse Prédictive** : Module avancé de prévision des stocks basé sur l'historique des ventes.

---
*Développé avec passion par Moussa KIENDREBEOGO - 2026*
