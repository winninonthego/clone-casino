const express = require('express');
const router = express.Router();
const Wallet = require('../models/Wallet');
const authMiddleware = require('../middleware/auth');

// Get wallet
router.get('/', authMiddleware, async (req, res) => {
  try {
    const wallet = await Wallet.getByUserId(req.user.id);
    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found' });
    }
    res.json(wallet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Deposit
router.post('/deposit', authMiddleware, async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid deposit amount' });
    }
    const wallet = await Wallet.deposit(req.user.id, amount);
    res.json({ message: 'Deposit successful', wallet });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Withdraw
router.post('/withdraw', authMiddleware, async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid withdrawal amount' });
    }
    const wallet = await Wallet.withdraw(req.user.id, amount);
    res.json({ message: 'Withdrawal successful', wallet });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
