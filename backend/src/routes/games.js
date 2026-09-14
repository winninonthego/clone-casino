const express = require('express');
const router = express.Router();
const GameResult = require('../models/GameResult');
const Wallet = require('../models/Wallet');
const Game = require('../models/Game');
const authMiddleware = require('../middleware/auth');

// Get all games
router.get('/', async (req, res) => {
  try {
    const games = [
      {
        id: 1,
        name: 'Slots',
        description: 'Classic slot machine with exciting payouts',
        image: '🎰',
        minBet: 1,
        maxBet: 1000,
        rtp: 0.96,
      },
      {
        id: 2,
        name: 'Blackjack',
        description: 'Beat the dealer and win big',
        image: '🃏',
        minBet: 5,
        maxBet: 500,
        rtp: 0.99,
      },
      {
        id: 3,
        name: 'Roulette',
        description: 'Spin the wheel and test your luck',
        image: '🎡',
        minBet: 1,
        maxBet: 1000,
        rtp: 0.973,
      },
      {
        id: 4,
        name: 'Lucky 7',
        description: 'Match the sevens for massive jackpots',
        image: '7️⃣',
        minBet: 1,
        maxBet: 500,
        rtp: 0.95,
      },
      {
        id: 5,
        name: 'Diamond Rush',
        description: 'Rush to collect diamonds and win rewards',
        image: '💎',
        minBet: 2,
        maxBet: 800,
        rtp: 0.94,
      },
    ];
    res.json(games);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Play game
router.post('/:gameId/play', authMiddleware, async (req, res) => {
  try {
    const { gameId } = req.params;
    const { amount, betType } = req.body;
    const userId = req.user.id;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid bet amount' });
    }

    // Check wallet balance
    const wallet = await Wallet.getByUserId(userId);
    if (!wallet || wallet.balance < amount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    let gameResult;
    switch (parseInt(gameId)) {
      case 1:
        gameResult = GameResult.playSlots(amount);
        break;
      case 2:
        gameResult = GameResult.playBlackjack(amount);
        break;
      case 3:
        gameResult = GameResult.playRoulette(amount, betType || 'red');
        break;
      case 4:
        gameResult = GameResult.playLucky7(amount);
        break;
      case 5:
        gameResult = GameResult.playDiamondRush(amount);
        break;
      default:
        return res.status(404).json({ error: 'Game not found' });
    }

    // Record result and update wallet
    const gameTypeMap = { 1: 'slots', 2: 'blackjack', 3: 'roulette', 4: 'lucky7', 5: 'diamond_rush' };
    await GameResult.recordResult(userId, gameId, gameTypeMap[gameId], amount, gameResult.winAmount, gameResult.result);

    // Get updated wallet
    const updatedWallet = await Wallet.getByUserId(userId);

    res.json({
      message: gameResult.result === 'LOSS' ? 'Sorry, you lost!' : `Congratulations! You won $${gameResult.winAmount}!`,
      gameResult,
      newBalance: updatedWallet.balance,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get game history
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const history = await GameResult.getUserGameHistory(req.user.id);
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
