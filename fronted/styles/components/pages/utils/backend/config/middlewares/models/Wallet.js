const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  solde: { type: Number, default: 0 },
  date_creation: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Wallet', walletSchema);