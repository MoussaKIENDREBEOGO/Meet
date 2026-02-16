const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Le nom d\'utilisateur est obligatoire'],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Le mot de passe est obligatoire']
    },
    role: {
        type: String,
        enum: ['superadmin', 'admin'],
        default: 'admin'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Hasher le mot de passe avant de sauvegarder
userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});

// Méthode pour vérifier le mot de passe
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
