const pool = require('../config/database');
const Wallet = require('./Wallet');

class GameResult {
  // ===== SLOT GAMES =====

  // Buffalo Gold Slot
  static playBuffaloGold(betAmount) {
    const symbols = ['🦬', '🪶', '💛', '⭐', '🔔'];
    const reels = Array.from({ length: 5 }, () => symbols[Math.floor(Math.random() * symbols.length)]);
    const wildcardSymbol = '🦬';
    const wildcardCount = reels.filter((s) => s === wildcardSymbol).length;

    let multiplier = 0;
    if (wildcardCount >= 4) {
      multiplier = 25; // GRAND JACKPOT
    } else if (wildcardCount === 3) {
      multiplier = 10;
    } else if (wildcardCount === 2) {
      multiplier = 3;
    } else if (wildcardCount === 1) {
      multiplier = 1.5;
    }

    const winAmount = betAmount * multiplier;
    return {
      game: 'Buffalo Gold',
      reels,
      wildcardCount,
      multiplier,
      betAmount,
      winAmount,
      result: multiplier > 0 ? 'WIN' : 'LOSS',
    };
  }

  // Dragons Gold Slot
  static playDragonsGold(betAmount) {
    const symbols = ['🐉', '💎', '👑', '🎆', '✨'];
    const reels = Array.from({ length: 5 }, () => symbols[Math.floor(Math.random() * symbols.length)]);
    const dragonCount = reels.filter((s) => s === '🐉').length;

    let multiplier = 0;
    if (dragonCount >= 4) {
      multiplier = 30; // DRAGON FURY
    } else if (dragonCount === 3) {
      multiplier = 12;
    } else if (dragonCount === 2) {
      multiplier = 4;
    }

    const winAmount = betAmount * multiplier;
    return {
      game: 'Dragons Gold',
      reels,
      dragonCount,
      multiplier,
      betAmount,
      winAmount,
      result: multiplier > 0 ? 'WIN' : 'LOSS',
    };
  }

  // Panda Gold Slot
  static playPandaGold(betAmount) {
    const symbols = ['🐼', '🎋', '🏮', '🥟', '☯️'];
    const reels = Array.from({ length: 5 }, () => symbols[Math.floor(Math.random() * symbols.length)]);
    const pandaCount = reels.filter((s) => s === '🐼').length;

    let multiplier = 0;
    if (pandaCount >= 4) {
      multiplier = 20; // PANDA PARADISE
    } else if (pandaCount === 3) {
      multiplier = 8;
    } else if (pandaCount === 2) {
      multiplier = 3;
    }

    const winAmount = betAmount * multiplier;
    return {
      game: 'Panda Gold',
      reels,
      pandaCount,
      multiplier,
      betAmount,
      winAmount,
      result: multiplier > 0 ? 'WIN' : 'LOSS',
    };
  }

  // Wild West Slot
  static playWildWest(betAmount) {
    const symbols = ['🤠', '🌵', '💰', '🔫', '⭐'];
    const reels = Array.from({ length: 5 }, () => symbols[Math.floor(Math.random() * symbols.length)]);
    const sheriffCount = reels.filter((s) => s === '🤠').length;

    let multiplier = 0;
    if (sheriffCount >= 4) {
      multiplier = 22;
    } else if (sheriffCount === 3) {
      multiplier = 9;
    } else if (sheriffCount === 2) {
      multiplier = 3.5;
    }

    const winAmount = betAmount * multiplier;
    return {
      game: 'Wild West',
      reels,
      sheriffCount,
      multiplier,
      betAmount,
      winAmount,
      result: multiplier > 0 ? 'WIN' : 'LOSS',
    };
  }

  // Golden Coins Slot
  static playGoldenCoins(betAmount) {
    const symbols = ['🪙', '👑', '💍', '🏺', '⚜️'];
    const reels = Array.from({ length: 5 }, () => symbols[Math.floor(Math.random() * symbols.length)]);
    const coinCount = reels.filter((s) => s === '🪙').length;

    let multiplier = 0;
    if (coinCount >= 4) {
      multiplier = 18;
    } else if (coinCount === 3) {
      multiplier = 7;
    } else if (coinCount === 2) {
      multiplier = 2.5;
    }

    const winAmount = betAmount * multiplier;
    return {
      game: 'Golden Coins',
      reels,
      coinCount,
      multiplier,
      betAmount,
      winAmount,
      result: multiplier > 0 ? 'WIN' : 'LOSS',
    };
  }

  // Rainbow Riches Slot
  static playRainbowRiches(betAmount) {
    const symbols = ['🌈', '☘️', '🍀', '💚', '⭐'];
    const reels = Array.from({ length: 5 }, () => symbols[Math.floor(Math.random() * symbols.length)]);
    const rainbowCount = reels.filter((s) => s === '🌈').length;

    let multiplier = 0;
    if (rainbowCount >= 4) {
      multiplier = 28;
    } else if (rainbowCount === 3) {
      multiplier = 11;
    } else if (rainbowCount === 2) {
      multiplier = 3.5;
    }

    const winAmount = betAmount * multiplier;
    return {
      game: 'Rainbow Riches',
      reels,
      rainbowCount,
      multiplier,
      betAmount,
      winAmount,
      result: multiplier > 0 ? 'WIN' : 'LOSS',
    };
  }

  // ===== FISH TABLE GAMES =====

  // Sea Striker (Fish Table)
  static playSeaStriker(betAmount) {
    const fishTypes = [
      { symbol: '🐠', points: 10, rarity: 'common' },
      { symbol: '🦑', points: 25, rarity: 'rare' },
      { symbol: '🐙', points: 50, rarity: 'very_rare' },
      { symbol: '🦈', points: 100, rarity: 'legendary' },
      { symbol: '🐋', points: 250, rarity: 'mythical' },
    ];

    const catch1 = fishTypes[Math.floor(Math.random() * fishTypes.length)];
    const catch2 = fishTypes[Math.floor(Math.random() * fishTypes.length)];
    const catch3 = fishTypes[Math.floor(Math.random() * fishTypes.length)];

    const totalPoints = catch1.points + catch2.points + catch3.points;
    const multiplier = totalPoints / 100;
    const winAmount = betAmount * multiplier;

    return {
      game: 'Sea Striker',
      catches: [catch1, catch2, catch3],
      totalPoints,
      multiplier,
      betAmount,
      winAmount,
      result: totalPoints > 50 ? 'BIG CATCH' : 'CATCH',
    };
  }

  // Ocean King (Fish Table)
  static playOceanKing(betAmount) {
    const creatures = [
      { symbol: '🐟', points: 15 },
      { symbol: '🦐', points: 30 },
      { symbol: '🦞', points: 60 },
      { symbol: '🐚', points: 80 },
      { symbol: '👑', points: 300 }, // King
    ];

    const netSize = Math.floor(Math.random() * 6) + 3; // 3-8 catches
    let totalPoints = 0;
    const catches = [];

    for (let i = 0; i < netSize; i++) {
      const creature = creatures[Math.floor(Math.random() * creatures.length)];
      catches.push(creature);
      totalPoints += creature.points;
    }

    const multiplier = totalPoints / 100;
    const winAmount = betAmount * multiplier;

    return {
      game: 'Ocean King',
      catches,
      netSize,
      totalPoints,
      multiplier,
      betAmount,
      winAmount,
      result: totalPoints > 200 ? 'JACKPOT' : 'WIN',
    };
  }

  // Tidal Treasures (Fish Table)
  static playTidalTreasures(betAmount) {
    const treasures = [
      { symbol: '💎', value: 50 },
      { symbol: '🏺', value: 75 },
      { symbol: '⚔️', value: 100 },
      { symbol: '👑', value: 200 },
      { symbol: '🗝️', value: 500 }, // Treasure chest key
    ];

    const diveDepth = Math.floor(Math.random() * 5) + 1;
    let totalValue = 0;
    const treasureFound = [];

    for (let i = 0; i < diveDepth; i++) {
      const treasure = treasures[Math.floor(Math.random() * treasures.length)];
      treasureFound.push(treasure);
      totalValue += treasure.value;
    }

    const multiplier = totalValue / 100;
    const winAmount = betAmount * multiplier;

    return {
      game: 'Tidal Treasures',
      treasureFound,
      diveDepth,
      totalValue,
      multiplier,
      betAmount,
      winAmount,
      result: totalValue > 300 ? 'TREASURE FOUND' : 'DIVING SUCCESS',
    };
  }

  // Mermaid Riches (Fish Table)
  static playMermaidRiches(betAmount) {
    const rewards = [
      { symbol: '🧜‍♀️', value: 80, rarity: 'common' },
      { symbol: '🐠', value: 40, rarity: 'common' },
      { symbol: '🦑', value: 120, rarity: 'rare' },
      { symbol: '💍', value: 250, rarity: 'very_rare' },
      { symbol: '👑', value: 500, rarity: 'legendary' },
    ];

    const catches = Array.from({ length: Math.floor(Math.random() * 6) + 2 }, () => rewards[Math.floor(Math.random() * rewards.length)]);

    const totalValue = catches.reduce((sum, catch_) => sum + catch_.value, 0);
    const multiplier = totalValue / 100;
    const winAmount = betAmount * multiplier;

    return {
      game: 'Mermaid Riches',
      catches,
      totalValue,
      multiplier,
      betAmount,
      winAmount,
      result: totalValue > 400 ? 'GOLDEN' : 'WIN',
    };
  }

  // Pirate Plunder (Fish Table)
  static playPiratePlunder(betAmount) {
    const loot = [
      { symbol: '🪙', value: 20 },
      { symbol: '💰', value: 60 },
      { symbol: '🏴‍☠️', value: 150 },
      { symbol: '🗺️', value: 100 },
      { symbol: '💎', value: 300 },
    ];

    const shipSailCount = Math.floor(Math.random() * 8) + 2;
    let totalLoot = 0;
    const plunder = [];

    for (let i = 0; i < shipSailCount; i++) {
      const item = loot[Math.floor(Math.random() * loot.length)];
      plunder.push(item);
      totalLoot += item.value;
    }

    const multiplier = totalLoot / 100;
    const winAmount = betAmount * multiplier;

    return {
      game: 'Pirate Plunder',
      plunder,
      shipSailCount,
      totalLoot,
      multiplier,
      betAmount,
      winAmount,
      result: totalLoot > 400 ? 'TREASURE SHIP' : 'PLUNDER',
    };
  }

  // ===== CLASSIC GAMES =====

  // Slots game logic (Original)
  static playSlots(betAmount) {
    const symbols = ['🎰', '🍎', '🍊', '🍌', '💎', '7️⃣'];
    const reel1 = symbols[Math.floor(Math.random() * symbols.length)];
    const reel2 = symbols[Math.floor(Math.random() * symbols.length)];
    const reel3 = symbols[Math.floor(Math.random() * symbols.length)];

    let multiplier = 0;
    if (reel1 === reel2 && reel2 === reel3) {
      multiplier = reel1 === '💎' ? 10 : reel1 === '7️⃣' ? 8 : 3;
    } else if (reel1 === reel2 || reel2 === reel3) {
      multiplier = 2;
    }

    const winAmount = betAmount * multiplier;
    return {
      game: 'Classic Slots',
      reels: [reel1, reel2, reel3],
      multiplier,
      betAmount,
      winAmount,
      result: multiplier > 0 ? 'WIN' : 'LOSS',
    };
  }

  // Blackjack game logic (Original)
  static playBlackjack(betAmount) {
    const getCardValue = () => Math.floor(Math.random() * 13) + 1;
    const getCards = (num) => Array.from({ length: num }, getCardValue);

    const dealerCards = getCards(2);
    const playerCards = getCards(2);

    const calculateScore = (cards) => {
      let score = 0;
      let aces = 0;
      cards.forEach((card) => {
        if (card === 1) aces++;
        score += card <= 10 ? card : 10;
      });
      while (score > 21 && aces > 0) {
        score -= 10;
        aces--;
      }
      return score;
    };

    const playerScore = calculateScore(playerCards);
    const dealerScore = calculateScore(dealerCards);

    let result = 'LOSS';
    let multiplier = 0;

    if (playerScore === 21 && playerCards.length === 2) {
      result = 'BLACKJACK';
      multiplier = 2.5;
    } else if (playerScore > 21) {
      result = 'BUST';
      multiplier = 0;
    } else if (dealerScore > 21 || playerScore > dealerScore) {
      result = 'WIN';
      multiplier = 2;
    } else if (playerScore === dealerScore) {
      result = 'PUSH';
      multiplier = 1;
    }

    const winAmount = betAmount * multiplier;
    return {
      game: 'Blackjack',
      playerCards,
      dealerCards,
      playerScore,
      dealerScore,
      result,
      multiplier,
      betAmount,
      winAmount,
    };
  }

  // Roulette game logic (Original)
  static playRoulette(betAmount, betType) {
    const spinNumber = Math.floor(Math.random() * 37);
    const isRed = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(spinNumber);
    const isEven = spinNumber !== 0 && spinNumber % 2 === 0;

    let result = 'LOSS';
    let multiplier = 0;

    if (betType === 'red' && isRed) {
      result = 'WIN';
      multiplier = 2;
    } else if (betType === 'black' && !isRed && spinNumber !== 0) {
      result = 'WIN';
      multiplier = 2;
    } else if (betType === 'even' && isEven) {
      result = 'WIN';
      multiplier = 2;
    } else if (betType === 'odd' && !isEven && spinNumber !== 0) {
      result = 'WIN';
      multiplier = 2;
    } else if (betType === spinNumber.toString()) {
      result = 'WIN';
      multiplier = 36;
    }

    const winAmount = betAmount * multiplier;
    return {
      game: 'Roulette',
      spinNumber,
      betType,
      result,
      multiplier,
      betAmount,
      winAmount,
      color: isRed ? 'red' : 'black',
    };
  }

  static async recordResult(userId, gameId, gameType, betAmount, winAmount, result) {
    const queryResult = await pool.query(
      'INSERT INTO game_results (user_id, game_id, amount_bet, amount_won, result, game_type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [userId, gameId, betAmount, winAmount, result, gameType]
    );

    const netChange = winAmount - betAmount;
    await Wallet.updateBalance(userId, netChange);

    return queryResult.rows[0];
  }

  static async getUserGameHistory(userId, limit = 20) {
    const result = await pool.query(
      'SELECT * FROM game_results WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2',
      [userId, limit]
    );
    return result.rows;
  }
}

module.exports = GameResult;
