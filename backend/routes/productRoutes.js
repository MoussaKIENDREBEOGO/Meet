const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { auth, admin } = require('../middleware/auth');

// @route   GET api/products
// @desc    Obtenir tous les produits
router.get('/', async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur lors de la récupération des produits' });
    }
});

// @route   GET api/products/:id
// @desc    Obtenir un produit par son ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Produit non trouvé' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la récupération du produit' });
    }
});

// @route   POST api/products
// @desc    Ajouter un nouveau produit
router.post('/', auth, admin, async (req, res) => {
    const { name, price, description, image, category, countInStock } = req.body;

    try {
        const newProduct = new Product({
            name,
            price,
            description,
            image,
            category,
            countInStock
        });

        const product = await newProduct.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ message: 'Données invalides : ' + err.message });
    }
});

// @route   PUT api/products/:id
// @desc    Mettre à jour un produit
router.put('/:id', auth, admin, async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ message: 'Produit non trouvé' });
        res.json(product);
    } catch (err) {
        res.status(400).json({ message: 'Erreur lors de la mise à jour' });
    }
});

// @route   DELETE api/products/:id
// @desc    Supprimer un produit
router.delete('/:id', auth, admin, async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Produit non trouvé' });
        res.json({ message: 'Produit supprimé' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la suppression' });
    }
});

module.exports = router;
