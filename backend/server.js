const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Initialisation des middlewares pour le serveur
// cors : permet d'accepter des requêtes venant d'autres domaines (indispensable pour le frontend)
// express.json : permet de lire les données envoyées au format JSON
app.use(cors());
app.use(express.json());

// Fonction pour se connecter à la base de données MongoDB
// On utilise les variables d'environnement pour plus de sécurité
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB connecté avec succès');
    } catch (err) {
        console.error('❌ Erreur de connexion MongoDB:', err.message);
        process.exit(1);
    }
};

connectDB();

// Routes de base
app.get('/', (req, res) => {
    res.send('API Mamichic V2 en cours d\'exécution...');
});

// Import des routes
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});
