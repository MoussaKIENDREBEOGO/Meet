const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Accès refusé. Aucun jeton fourni.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.ADMIN_PASSWORD || 'secretmamichic');
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Jeton invalide.' });
    }
};

const admin = (req, res, next) => {
    if (req.user.role !== 'admin' && req.user.role !== 'superadmin') {
        return res.status(403).json({ message: 'Accès refusé. Droits administrateur requis.' });
    }
    next();
};

const superadmin = (req, res, next) => {
    if (req.user.role !== 'superadmin') {
        return res.status(403).json({ message: 'Accès refusé. Droits super-administrateur requis.' });
    }
    next();
};

module.exports = { auth, admin, superadmin };
