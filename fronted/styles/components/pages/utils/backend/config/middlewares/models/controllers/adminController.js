const User = require('../models/User');
const Transaction = require('../models/Transaction');
const AdminAction = require('../models/AdminAction');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate('sender_id receiver_id');
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

exports.blockUser = async (req, res) => {
  const { user_id } = req.body;
  try {
    await User.updateOne({ _id: user_id }, { $set: { blocked: true } });
    const action = new AdminAction({ admin_id: req.user.id, action: 'block_user', cible_id: user_id });
    await action.save();
    res.json({ message: 'Utilisateur bloqué.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};