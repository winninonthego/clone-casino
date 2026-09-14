const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

// Get available games
router.get('/', async (req, res) => {
  try {
    const games = [
      { id: 1, name: 'Slots', description: 'Classic slot machine', minBet: 1, maxBet: 1000 },
      { id: 2, name: 'Blackjack', description: 'Card game', minBet: 5, maxBet: 500 },
      { id: 3, name: 'Roulette', description: 'Spin the wheel', minBet: 1, maxBet: 1000 },
    ];
    res.json(games);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Play game (placeholder)
router.post('/:gameId/play', authMiddleware, async (req, res) => {
  try {
    const { gameId } = req.params;
    const { amount } = req.body;
    // Game logic to be implemented
    res.json({ message: 'Game logic coming soon', gameId, amount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
