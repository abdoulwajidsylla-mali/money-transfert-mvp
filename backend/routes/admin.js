const express = require('express');
const { getUsers, getTransactions, blockUser } = require('../controllers/adminController');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/admin/users', authMiddleware, adminMiddleware, getUsers);
router.get('/admin/transactions', authMiddleware, adminMiddleware, getTransactions);
router.post('/admin/block-user', authMiddleware, adminMiddleware, blockUser);

module.exports = router;