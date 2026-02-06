require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const mongoose = require('./config/database'); // Assure-toi que database.js exporte mongoose correctement

// Import des routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Limiteur de taux pour protection contre brute force
const limiter = rateLimit({
windowMs: 15 * 60 * 1000, // 15 minutes
max: 5, // Limite chaque IP à 5 requêtes par fenêtre
message: "Trop de tentatives, réessayez plus tard."
});

// Appliquer le limiter uniquement sur le login
app.use('/api/login', limiter);

// Routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', adminRoutes);

// Port
const PORT = process.env.PORT || 5000;

// Connexion à la base de données et démarrage du serveur
mongoose.connection.once('open', () => {
app.listen(PORT, () => {
console.log(`Serveur backend démarré sur le port ${PORT}`);
});
});