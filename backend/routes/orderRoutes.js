const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const { auth, admin } = require('../middleware/auth');

// @route   POST api/orders
// @desc    Créer une nouvelle commande
router.post('/', async (req, res) => {
    try {
        const { customer, items, totalPrice } = req.body;
        const newOrder = new Order({
            customer,
            items,
            totalPrice
        });
        const savedOrder = await newOrder.save();

        // Décrémenter le stock pour chaque article
        for (const item of items) {
            await Product.findByIdAndUpdate(item.product, {
                $inc: { countInStock: -item.quantity }
            });
        }

        res.status(201).json(savedOrder);
    } catch (err) {
        res.status(400).json({ message: 'Erreur lors de la création de la commande: ' + err.message });
    }
});

// @route   GET api/orders
// @desc    Lister toutes les commandes (Admin)
router.get('/', auth, admin, async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

// @route   PUT api/orders/:id
// @desc    Mettre à jour le statut d'une commande
router.put('/:id', auth, admin, async (req, res) => {
    try {
        const { status } = req.body;
        const oldOrder = await Order.findById(req.params.id);

        if (!oldOrder) return res.status(404).json({ message: 'Commande non trouvée' });

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        // Si la commande est annulée maintenant mais ne l'était pas avant
        if (status === 'Annulée' && oldOrder.status !== 'Annulée') {
            for (const item of order.items) {
                await Product.findByIdAndUpdate(item.product, {
                    $inc: { countInStock: item.quantity }
                });
            }
        }
        // Si la commande était annulée et qu'on revient à un autre état
        else if (oldOrder.status === 'Annulée' && status !== 'Annulée') {
            for (const item of order.items) {
                await Product.findByIdAndUpdate(item.product, {
                    $inc: { countInStock: -item.quantity }
                });
            }
        }

        res.json(order);
    } catch (err) {
        res.status(400).json({ message: 'Erreur de mise à jour' });
    }
});

// @route   DELETE api/orders/:id
// @desc    Supprimer une commande
router.delete('/:id', auth, admin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.json({ message: 'Commande supprimée' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur de suppression' });
    }
});

module.exports = router;
