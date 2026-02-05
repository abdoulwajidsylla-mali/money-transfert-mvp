const mongoose = require('../config/database');
const User = require('../models/User');
const Wallet = require('../models/Wallet');
const Transaction = require('../models/Transaction');
const bcrypt = require('bcryptjs');

async function seed() {
  await mongoose.connection.dropDatabase();

  const hashedPassword = await bcrypt.hash('password123', 10);

  const users = [
    { nom: 'Admin', email: 'admin@example.com', telephone: '1234567890', mot_de_passe: hashedPassword, role: 'admin' },
    { nom: 'User1', email: 'user1@example.com', telephone: '0987654321', mot_de_passe: hashedPassword },
    { nom: 'User2', email: 'user2@example.com', telephone: '1122334455', mot_de_passe: hashedPassword },
  ];

  const createdUsers = await User.insertMany(users);

  const wallets = createdUsers.map(user => ({ user_id: user._id, solde: 1000 }));
  await Wallet.insertMany(wallets);

  const transactions = [
    {
      sender_id: createdUsers[1]._id,
      receiver_id: createdUsers[2]._id,
      montant: 100,
      frais: 5,
      statut: 'réussi',
      reference: 'ref1',
    },
  ];
  await Transaction.insertMany(transactions);

  console.log('Seed data insérée.');
  process.exit();
}

seed().catch(console.error);