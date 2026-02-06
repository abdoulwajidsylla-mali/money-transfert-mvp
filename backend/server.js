require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const mongoose = require('./config/database'); // ton database.js
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');

const app = express();
app.use(cors());
app.use(express.json());

// Limiteur de requêtes
const limiter = rateLimit({
windowMs: 15 * 60 * 1000, // 15 minutes
max: 5,
message: "Trop de tentatives, réessayez plus tard."
});

app.use('/api/login', limiter);
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', adminRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connection.once('open', () => {
app.listen(PORT, () => {
console.log(`Serveur backend démarré sur le port ${PORT}`);
});
});