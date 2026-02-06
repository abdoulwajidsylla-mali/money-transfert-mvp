const mongoose = require('mongoose');
require('dotenv').config({path: __dirname + '/../.env'});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connecté !'))
.catch(err => console.log('Erreur MongoDB :',err));

module.exports = mongoose;