const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const Wallet = require('../models/Wallet');
const authMiddleware = require('../middleware/auth');

// Initiate payment (for credit card, bank transfer, etc.)
router.post('/initiate', authMiddleware, async (req, res) => {
  try {
    const { amount, method } = req.body; // method: 'credit_card', 'debit_card', 'bank_transfer', 'crypto'
    const userId = req.user.id;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    // Create payment record
    const payment = await Payment.createPayment(userId, amount, method, 'pending');

    // Return payment object with reference ID for external processing
    res.json({
      message: 'Payment initiated',
      payment: {
        id: payment.id,
        reference_id: payment.reference_id,
        amount: payment.amount,
        method: payment.method,
        status: payment.status,
      },
      // In production, this would include Stripe/PayPal/etc checkout URL
      checkoutUrl: `${process.env.PAYMENT_GATEWAY_URL || 'http://localhost:5000'}/payment/checkout/${payment.id}`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Verify payment & credit wallet (webhook from payment gateway)
router.post('/verify', authMiddleware, async (req, res) => {
  try {
    const { paymentId, transactionId } = req.body;
    const userId = req.user.id;

    // Get payment
    const payment = await Payment.getPaymentById(paymentId);
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    if (payment.user_id !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Update payment status
    const updatedPayment = await Payment.updatePaymentStatus(paymentId, 'completed');

    // Credit wallet
    const updatedWallet = await Wallet.deposit(userId, payment.amount);

    res.json({
      message: 'Payment successful',
      wallet: {
        balance: updatedWallet.balance,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user payments
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const payments = await Payment.getUserPayments(req.user.id);
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get total revenue (admin)
router.get('/admin/revenue', authMiddleware, async (req, res) => {
  try {
    const total = await Payment.getTotalRevenue();
    res.json({ total_revenue: total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
