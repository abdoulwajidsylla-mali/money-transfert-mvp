require('dotenv').config({path: __dirname + '/../.env'});
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connecté !'))
.catch(err => console.error('Erreur MongoDB :',err));

module.exports = mongoose;