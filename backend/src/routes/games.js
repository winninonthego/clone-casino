const express = require('express');
const router = express.Router();
const GameResult = require('../models/GameResult');
const Wallet = require('../models/Wallet');
const authMiddleware = require('../middleware/auth');

// Get all games
router.get('/', async (req, res) => {
  try {
    const games = [
      // SLOT GAMES
      {
        id: 1,
        category: 'slots',
        name: 'Buffalo Gold',
        description: 'Wild buffalo roaming the plains',
        image: '🦬',
        minBet: 1,
        maxBet: 1000,
        rtp: 0.96,
      },
      {
        id: 2,
        category: 'slots',
        name: 'Dragons Gold',
        description: 'Ancient dragons guarding treasures',
        image: '🐉',
        minBet: 1,
        maxBet: 1000,
        rtp: 0.97,
      },
      {
        id: 3,
        category: 'slots',
        name: 'Panda Gold',
        description: 'Gentle pandas in bamboo forests',
        image: '🐼',
        minBet: 2,
        maxBet: 800,
        rtp: 0.95,
      },
      {
        id: 4,
        category: 'slots',
        name: 'Wild West',
        description: 'Dusty saloons and outlaws',
        image: '🤠',
        minBet: 1,
        maxBet: 1000,
        rtp: 0.96,
      },
      {
        id: 5,
        category: 'slots',
        name: 'Golden Coins',
        description: 'Ancient riches and treasures',
        image: '🪙',
        minBet: 2,
        maxBet: 500,
        rtp: 0.95,
      },
      {
        id: 6,
        category: 'slots',
        name: 'Rainbow Riches',
        description: 'Leprechaun gold at the end of rainbow',
        image: '🌈',
        minBet: 1,
        maxBet: 1000,
        rtp: 0.96,
      },
      // FISH TABLE GAMES
      {
        id: 7,
        category: 'fish',
        name: 'Sea Striker',
        description: 'Hunt exotic fish and sea creatures',
        image: '🎣',
        minBet: 1,
        maxBet: 500,
        rtp: 0.94,
      },
      {
        id: 8,
        category: 'fish',
        name: 'Ocean King',
        description: 'Catch the legendary ocean king',
        image: '👑',
        minBet: 2,
        maxBet: 1000,
        rtp: 0.95,
      },
      {
        id: 9,
        category: 'fish',
        name: 'Tidal Treasures',
        description: 'Dive deep for underwater treasures',
        image: '💎',
        minBet: 1,
        maxBet: 500,
        rtp: 0.93,
      },
      {
        id: 10,
        category: 'fish',
        name: 'Mermaid Riches',
        description: 'Enchanted mermaids guard riches',
        image: '🧜‍♀️',
        minBet: 2,
        maxBet: 800,
        rtp: 0.94,
      },
      {
        id: 11,
        category: 'fish',
        name: 'Pirate Plunder',
        description: 'Sail with pirates seeking treasure',
        image: '🏴‍☠️',
        minBet: 1,
        maxBet: 1000,
        rtp: 0.95,
      },
      // CLASSIC GAMES
      {
        id: 12,
        category: 'classic',
        name: 'Classic Slots',
        description: 'Traditional 3-reel slot machine',
        image: '🎰',
        minBet: 1,
        maxBet: 500,
        rtp: 0.95,
      },
      {
        id: 13,
        category: 'classic',
        name: 'Blackjack',
        description: 'Beat the dealer',
        image: '🃏',
        minBet: 5,
        maxBet: 500,
        rtp: 0.99,
      },
      {
        id: 14,
        category: 'classic',
        name: 'Roulette',
        description: 'Spin the wheel of fortune',
        image: '🎡',
        minBet: 1,
        maxBet: 1000,
        rtp: 0.973,
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

    const wallet = await Wallet.getByUserId(userId);
    if (!wallet || wallet.balance < amount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    let gameResult;
    const gameId_int = parseInt(gameId);

    // SLOT GAMES
    if (gameId_int === 1) gameResult = GameResult.playBuffaloGold(amount);
    else if (gameId_int === 2) gameResult = GameResult.playDragonsGold(amount);
    else if (gameId_int === 3) gameResult = GameResult.playPandaGold(amount);
    else if (gameId_int === 4) gameResult = GameResult.playWildWest(amount);
    else if (gameId_int === 5) gameResult = GameResult.playGoldenCoins(amount);
    else if (gameId_int === 6) gameResult = GameResult.playRainbowRiches(amount);
    // FISH GAMES
    else if (gameId_int === 7) gameResult = GameResult.playSeaStriker(amount);
    else if (gameId_int === 8) gameResult = GameResult.playOceanKing(amount);
    else if (gameId_int === 9) gameResult = GameResult.playTidalTreasures(amount);
    else if (gameId_int === 10) gameResult = GameResult.playMermaidRiches(amount);
    else if (gameId_int === 11) gameResult = GameResult.playPiratePlunder(amount);
    // CLASSIC GAMES
    else if (gameId_int === 12) gameResult = GameResult.playSlots(amount);
    else if (gameId_int === 13) gameResult = GameResult.playBlackjack(amount);
    else if (gameId_int === 14) gameResult = GameResult.playRoulette(amount, betType || 'red');
    else return res.status(404).json({ error: 'Game not found' });

    const gameTypeMap = {
      1: 'buffalo_gold',
      2: 'dragons_gold',
      3: 'panda_gold',
      4: 'wild_west',
      5: 'golden_coins',
      6: 'rainbow_riches',
      7: 'sea_striker',
      8: 'ocean_king',
      9: 'tidal_treasures',
      10: 'mermaid_riches',
      11: 'pirate_plunder',
      12: 'classic_slots',
      13: 'blackjack',
      14: 'roulette',
    };

    await GameResult.recordResult(userId, gameId, gameTypeMap[gameId_int], amount, gameResult.winAmount, gameResult.result);

    const updatedWallet = await Wallet.getByUserId(userId);

    res.json({
      message: gameResult.result === 'LOSS' ? 'Sorry, you lost!' : `Congratulations! You won $${gameResult.winAmount.toFixed(2)}!`,
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
