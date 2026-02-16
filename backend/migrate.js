const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();

const products = [
    // Pagnes (1-22)
    ...Array.from({ length: 22 }, (_, i) => ({
        name: `Pagne traditionnel N°${i + 1}`,
        price: 7000,
        image: `images/Pagnes/Pagne traditionnel N°${i + 1}.png`,
        description: "Pagne traditionnel de haute qualité.",
        category: "Pagnes",
        countInStock: 10
    })),
    // Chaussures
    {
        name: "Chaussure N°1",
        price: 8000,
        image: "images/chaussures/chaussure1.png",
        description: "Chaussures élégantes pour toutes vos sorties.",
        category: "Chaussures",
        countInStock: 5
    },
    {
        name: "Chaussure N°2",
        price: 7000,
        image: "images/chaussures/chaussure2.png",
        description: "Talons confortables et stylés.",
        category: "Chaussures",
        countInStock: 5
    },
    // Robes
    {
        name: "Robe N°1",
        price: 15000,
        image: "images/robes/robe1.png",
        description: "Robe chic pour une allure distinguée.",
        category: "Robes",
        countInStock: 5
    },
    {
        name: "Robe N°2",
        price: 15000,
        image: "images/robes/robe2.png",
        description: "Une robe d'exception célébrant votre féminité.",
        category: "Robes",
        countInStock: 5
    },
    {
        name: "Robe N°3",
        price: 15000,
        image: "images/robes/robe3.png",
        description: "Look moderne et raffiné.",
        category: "Robes",
        countInStock: 5
    },
    {
        name: "Robe Traditionnelle",
        price: 20000,
        image: "images/robes/traditional.png",
        description: "Tenue traditionnelle complète.",
        category: "Robes",
        countInStock: 3
    },
    // Sacs
    {
        name: "Sac N°1",
        price: 5000,
        image: "images/sacs/sac1.png",
        description: "Sac élégant.",
        category: "Sacs",
        countInStock: 5
    },
    {
        name: "Sac N°2",
        price: 5000,
        image: "images/sacs/sac2.png",
        description: "Sac pratique et stylé.",
        category: "Sacs",
        countInStock: 5
    },
    // Autres (Accessoires/Bijoux)
    {
        name: "Accessoire N°1",
        price: 7000,
        image: "images/autres/autre1.png",
        description: "Bijou artisanal authentique.",
        category: "Autres",
        countInStock: 5
    },
    {
        name: "Accessoire N°2",
        price: 1000,
        image: "images/autres/autre2.png",
        description: "Accessoire discret et élégant.",
        category: "Autres",
        countInStock: 5
    },
    {
        name: "Accessoire N°4",
        price: 12000,
        image: "images/autres/autre4.png",
        description: "Ensemble complet.",
        category: "Autres",
        countInStock: 3
    }
];

const importData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('🔗 Connecté à MongoDB pour restauration des images (images/)...');

        await Product.deleteMany();
        await Product.insertMany(products);
        console.log(`✅ ${products.length} produits restaurés avec les images du dossier 'images/'`);

        const admin = await User.findOne({ username: 'admin' });
        if (!admin) {
            const newAdmin = new User({
                username: 'admin',
                password: process.env.ADMIN_PASSWORD || 'mamichic2026',
                role: 'superadmin'
            });
            await newAdmin.save();
            console.log('👑 Compte admin créé.');
        } else {
            admin.password = process.env.ADMIN_PASSWORD || 'mamichic2026';
            admin.role = 'superadmin';
            await admin.save();
            console.log('👑 Compte admin mis à jour.');
        }

        console.log('🚀 Base de données synchronisée avec vos images !');
        process.exit();
    } catch (error) {
        console.error(`❌ Erreur: ${error.message}`);
        process.exit(1);
    }
};

importData();
