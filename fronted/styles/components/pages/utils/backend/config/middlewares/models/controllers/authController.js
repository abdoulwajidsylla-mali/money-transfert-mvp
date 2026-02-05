const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Wallet = require('../models/Wallet');

exports.register = async (req, res) => {
  const { nom, email, telephone, mot_de_passe } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
    const user = new User({ nom, email, telephone, mot_de_passe: hashedPassword });
    await user.save();
    const wallet = new Wallet({ user_id: user._id });
    await wallet.save();
    res.status(201).json({ message: 'Utilisateur créé avec succès.' });
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création.', error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, mot_de_passe } = req.body;
  try {
    const user = await User.findOne({ $or: [{ email }, { telephone: email }] });
    if (!user || user.blocked || !(await bcrypt.compare(mot_de_passe, user.mot_de_passe))) {
      return res.status(401).json({ message: 'Identifiants invalides.' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};