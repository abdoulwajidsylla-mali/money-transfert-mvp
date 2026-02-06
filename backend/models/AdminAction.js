const mongoose = require('mongoose');

const adminActionSchema = new mongoose.Schema({
  admin_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true },
  cible_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  date_action: { type: Date, default: Date.now },
});

module.exports = mongoose.model('AdminAction', adminActionSchema);