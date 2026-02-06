const express = require('express');
const { getWallet, sendMoney, getTransactions } = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { validateSendMoney } = require('../middlewares/validationMiddleware');

const router = express.Router();

router.get('/wallet', authMiddleware, getWallet);
router.post('/send-money', authMiddleware, validateSendMoney, sendMoney);
router.get('/transactions', authMiddleware, getTransactions);

module.exports = router;