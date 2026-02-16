const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer: {
        name: { type: String, required: true },
        city: { type: String, required: true }
    },
    items: [
        {
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            image: { type: String },
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['En attente', 'Confirmée', 'Expédiée', 'Livrée', 'Annulée'],
        default: 'En attente'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', orderSchema);
