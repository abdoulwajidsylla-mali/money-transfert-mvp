const User = require('../models/User');
const Wallet = require('../models/Wallet');
const Transaction = require('../models/Transaction');
const mongoose = require('mongoose');

exports.getWallet = async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ user_id: req.user.id });
    res.json(wallet);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

exports.sendMoney = async (req, res) => {
  const { receiver_telephone, montant, reference } = req.body;
  const frais = 0.05 * montant;
  const totalDebit = parseFloat(montant) + frais;

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const receiver = await User.findOne({ telephone: receiver_telephone }).session(session);
    if (!receiver) {
      await session.abortTransaction();
      return res.status(404).json({ message: 'Destinataire introuvable.' });
    }

    const senderWallet = await Wallet.findOne({ user_id: req.user.id }).session(session);
    if (senderWallet.solde < totalDebit) {
      await session.abortTransaction();
      return res.status(400).json({ message: 'Solde insuffisant.' });
    }

    const existingTransaction = await Transaction.findOne({
      reference,
      date_creation: { $gte: new Date(Date.now() - 5 * 60 * 1000) },
    }).session(session);
    if (existingTransaction) {
      await session.abortTransaction();
      return res.status(400).json({ message: 'Transaction potentiellement dupliquée.' });
    }

    await Wallet.updateOne({ user_id: req.user.id }, { $inc: { solde: -totalDebit } }, { session });
    await Wallet.updateOne({ user_id: receiver._id }, { $inc: { solde: parseFloat(montant) } }, { session });
    const transaction = new Transaction({
      sender_id: req.user.id,
      receiver_id: receiver._id,
      montant,
      frais,
      statut: 'réussi',
      reference,
    });
    await transaction.save({ session });
    await session.commitTransaction();
    console.log(`Transaction réussie: ${transaction._id}`);
    res.json({ message: 'Envoi réussi.', transaction });
  } catch (error) {
    await session.abortTransaction();
    console.error('Erreur lors de l\'envoi:', error);
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  } finally {
    session.endSession();
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      $or: [{ sender_id: req.user.id }, { receiver_id: req.user.id }],
    }).populate('sender_id receiver_id');
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};