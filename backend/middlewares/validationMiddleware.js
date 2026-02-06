const validateRegister = (req, res, next) => {
  const { nom, email, telephone, mot_de_passe } = req.body;
  if (!nom || !email || !telephone || !mot_de_passe) {
    return res.status(400).json({ message: 'Tous les champs sont requis.' });
  }
  // Ajouter plus de validations si nécessaire (e.g., regex pour email/téléphone)
  next();
};

const validateSendMoney = (req, res, next) => {
  const { receiver_telephone, montant } = req.body;
  if (!receiver_telephone || !montant || montant <= 0) {
    return res.status(400).json({ message: 'Champs invalides.' });
  }
  next();
};

module.exports = { validateRegister, validateSendMoney };