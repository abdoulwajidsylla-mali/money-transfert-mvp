const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  sender_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  montant: { type: Number, required: true },
  frais: { type: Number, default: 0 },
  statut: { type: String, enum: ['en_attente', 'réussi', 'échoué'], default: 'en_attente' },
  reference: { type: String, unique: true },
  date_creation: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Transaction', transactionSchema);