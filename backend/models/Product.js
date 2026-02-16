const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Le nom du produit est obligatoire'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Le prix est obligatoire']
    },
    description: {
        type: String,
        required: [true, 'La description est obligatoire']
    },
    image: {
        type: String, // URL ou chemin local
        required: [true, 'L\'image est obligatoire']
    },
    category: {
        type: String,
        required: [true, 'La catégorie est obligatoire'],
        enum: ['Pagnes', 'Chaussures', 'Robes', 'Sacs', 'Bijoux', 'Autres']
    },
    countInStock: {
        type: Number,
        required: true,
        default: 10
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);
