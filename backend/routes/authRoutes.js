const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { auth, superadmin } = require('../middleware/auth');

// @route   POST api/auth/login
// @desc    Authentifier un utilisateur
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(401).json({ message: 'Identifiants invalides' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(401).json({ message: 'Identifiants invalides' });

        // On simplifie pour la démo, en prod on utiliserait un JWT secret dans le .env
        const token = jwt.sign(
            { id: user._id, role: user.role, username: user.username },
            process.env.ADMIN_PASSWORD || 'secretmamichic',
            { expiresIn: '1d' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                role: user.role
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

// @route   GET api/auth/users
// @desc    Lister tous les administrateurs (Admin only)
router.get('/users', auth, superadmin, async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

// @route   POST api/auth/users
// @desc    Créer un nouvel administrateur
router.post('/users', auth, superadmin, async (req, res) => {
    const { username, password, role } = req.body;

    try {
        const userExists = await User.findOne({ username });
        if (userExists) return res.status(400).json({ message: 'L\'utilisateur existe déjà' });

        const user = new User({ username, password, role });
        await user.save();
        res.status(201).json({ message: 'Administrateur créé avec succès' });
    } catch (err) {
        res.status(400).json({ message: 'Données invalides' });
    }
});

// @route   DELETE api/auth/users/:id
// @desc    Supprimer un administrateur
router.delete('/users/:id', auth, superadmin, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'Utilisateur supprimé' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la suppression' });
    }
});

module.exports = router;
