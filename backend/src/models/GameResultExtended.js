const pool = require('../config/database');
const Wallet = require('./Wallet');

class GameResultExtended {
  // ===== EXTENDED SLOT GAMES (7-16) =====

  // Phoenix Rising Slot
  static playPhoenixRising(betAmount) {
    const symbols = ['🔥', '🐦', '✨', '💛', '⭐'];
    const reels = Array.from({ length: 5 }, () => symbols[Math.floor(Math.random() * symbols.length)]);
    const phoenixCount = reels.filter((s) => s === '🐦').length;

    let multiplier = 0;
    if (phoenixCount >= 4) {
      multiplier = 35; // PHOENIX RESURRECTION
    } else if (phoenixCount === 3) {
      multiplier = 14;
    } else if (phoenixCount === 2) {
      multiplier = 5;
    }

    const winAmount = betAmount * multiplier;
    return {
      game: 'Phoenix Rising',
      reels,
      phoenixCount,
      multiplier,
      betAmount,
      winAmount,
      result: multiplier > 0 ? 'WIN' : 'LOSS',
    };
  }

  // Aztec Treasures Slot
  static playAztecTreasures(betAmount) {
    const symbols = ['🏛️', '💎', '🦅', '🗿', '⚱️'];
    const reels = Array.from({ length: 5 }, () => symbols[Math.floor(Math.random() * symbols.length)]);
    const treasureCount = reels.filter((s) => s === '💎').length;

    let multiplier = 0;
    if (treasureCount >= 4) {
      multiplier = 32; // AZTEC JACKPOT
    } else if (treasureCount === 3) {
      multiplier = 13;
    } else if (treasureCount === 2) {
      multiplier = 4;
    }

    const winAmount = betAmount * multiplier;
    return {
      game: 'Aztec Treasures',
      reels,
      treasureCount,
      multiplier,
      betAmount,
      winAmount,
      result: multiplier > 0 ? 'WIN' : 'LOSS',
    };
  }

  // Enchanted Forest Slot
  static playEnchantedForest(betAmount) {
    const symbols = ['🌲', '🧙', '🦌', '✨', '🍄'];
    const reels = Array.from({ length: 5 }, () => symbols[Math.floor(Math.random() * symbols.length)]);
    const magicCount = reels.filter((s) => s === '✨').length;

    let multiplier = 0;
    if (magicCount >= 4) {
      multiplier = 24; // FOREST MAGIC
    } else if (magicCount === 3) {
      multiplier = 9;
    } else if (magicCount === 2) {
      multiplier = 3;
    }

    const winAmount = betAmount * multiplier;
    return {
      game: 'Enchanted Forest',
      reels,
      magicCount,
      multiplier,
      betAmount,
      winAmount,
      result: multiplier > 0 ? 'WIN' : 'LOSS',
    };
  }

  // Lucky Koi Slot
  static playLuckyKoi(betAmount) {
    const symbols = ['🐟', '💧', '🪷', '⛩️', '🌊'];
    const reels = Array.from({ length: 5 }, () => symbols[Math.floor(Math.random() * symbols.length)]);
    const koiCount = reels.filter((s) => s === '🐟').length;

    let multiplier = 0;
    if (koiCount >= 4) {
      multiplier = 26; // KOI FORTUNE
    } else if (koiCount === 3) {
      multiplier = 10;
    } else if (koiCount === 2) {
      multiplier = 3.5;
    }

    const winAmount = betAmount * multiplier;
    return {
      game: 'Lucky Koi',
      reels,
      koiCount,
      multiplier,
      betAmount,
      winAmount,
      result: multiplier > 0 ? 'WIN' : 'LOSS',
    };
  }

  // Midnight Mystery Slot
  static playMidnightMystery(betAmount) {
    const symbols = ['🌙', '🔮', '👻', '⭐', '🕷️'];
    const reels = Array.from({ length: 5 }, () => symbols[Math.floor(Math.random() * symbols.length)]);
    const mysteryCount = reels.filter((s) => s === '🔮').length;

    let multiplier = 0;
    if (mysteryCount >= 4) {
      multiplier = 29; // MYSTERY UNLOCKED
    } else if (mysteryCount === 3) {
      multiplier = 11;
    } else if (mysteryCount === 2) {
      multiplier = 3.5;
    }

    const winAmount = betAmount * multiplier;
    return {
      game: 'Midnight Mystery',
      reels,
      mysteryCount,
      multiplier,
      betAmount,
      winAmount,
      result: multiplier > 0 ? 'WIN' : 'LOSS',
    };
  }

  // Arctic Adventure Slot
  static playArcticAdventure(betAmount) {
    const symbols = ['❄️', '🐧', '🐻‍❄️', '⛸️', '🧊'];
    const reels = Array.from({ length: 5 }, () => symbols[Math.floor(Math.random() * symbols.length)]);
    const bearCount = reels.filter((s) => s === '🐻‍❄️').length;

    let multiplier = 0;
    if (bearCount >= 4) {
      multiplier = 27; // POLAR JACKPOT
    } else if (bearCount === 3) {
      multiplier = 10;
    } else if (bearCount === 2) {
      multiplier = 3;
    }

    const winAmount = betAmount * multiplier;
    return {
      game: 'Arctic Adventure',
      reels,
      bearCount,
      multiplier,
      betAmount,
      winAmount,
      result: multiplier > 0 ? 'WIN' : 'LOSS',
    };
  }

  // Tropical Paradise Slot
  static playTropicalParadise(betAmount) {
    const symbols = ['🏝️', '🥥', '🦜', '🌺', '🍹'];
    const reels = Array.from({ length: 5 }, () => symbols[Math.floor(Math.random() * symbols.length)]);
    const parrotCount = reels.filter((s) => s === '🦜').length;

    let multiplier = 0;
    if (parrotCount >= 4) {
      multiplier = 23; // PARADISE FOUND
    } else if (parrotCount === 3) {
      multiplier = 9;
    } else if (parrotCount === 2) {
      multiplier = 3;
    }

    const winAmount = betAmount * multiplier;
    return {
      game: 'Tropical Paradise',
      reels,
      parrotCount,
      multiplier,
      betAmount,
      winAmount,
      result: multiplier > 0 ? 'WIN' : 'LOSS',
    };
  }

  // Ancient Egypt Slot
  static playAncientEgypt(betAmount) {
    const symbols = ['🔱', '⚱️', '👑', '🐆', '🏺'];
    const reels = Array.from({ length: 5 }, () => symbols[Math.floor(Math.random() * symbols.length)]);
    const scarabCount = reels.filter((s) => s === '⚱️').length;

    let multiplier = 0;
    if (scarabCount >= 4) {
      multiplier = 33; // PHARAOH'S FORTUNE
    } else if (scarabCount === 3) {
      multiplier = 12;
    } else if (scarabCount === 2) {
      multiplier = 4;
    }

    const winAmount = betAmount * multiplier;
    return {
      game: 'Ancient Egypt',
      reels,
      scarabCount,
      multiplier,
      betAmount,
      winAmount,
      result: multiplier > 0 ? 'WIN' : 'LOSS',
    };
  }

  // Space Explorer Slot
  static playSpaceExplorer(betAmount) {
    const symbols = ['🚀', '🛸', '🌌', '⭐', '👽'];
    const reels = Array.from({ length: 5 }, () => symbols[Math.floor(Math.random() * symbols.length)]);
    const rocketCount = reels.filter((s) => s === '🚀').length;

    let multiplier = 0;
    if (rocketCount >= 4) {
      multiplier = 31; // COSMIC JACKPOT
    } else if (rocketCount === 3) {
      multiplier = 12;
    } else if (rocketCount === 2) {
      multiplier = 4;
    }

    const winAmount = betAmount * multiplier;
    return {
      game: 'Space Explorer',
      reels,
      rocketCount,
      multiplier,
      betAmount,
      winAmount,
      result: multiplier > 0 ? 'WIN' : 'LOSS',
    };
  }

  // Greek Gods Slot
  static playGreekGods(betAmount) {
    const symbols = ['⚡', '🛡️', '🏛️', '🌟', '🦅'];
    const reels = Array.from({ length: 5 }, () => symbols[Math.floor(Math.random() * symbols.length)]);
    const godCount = reels.filter((s) => s === '⚡').length;

    let multiplier = 0;
    if (godCount >= 4) {
      multiplier = 34; // OLYMPUS GLORY
    } else if (godCount === 3) {
      multiplier = 13;
    } else if (godCount === 2) {
      multiplier = 4.5;
    }

    const winAmount = betAmount * multiplier;
    return {
      game: 'Greek Gods',
      reels,
      godCount,
      multiplier,
      betAmount,
      winAmount,
      result: multiplier > 0 ? 'WIN' : 'LOSS',
    };
  }

  // Pirates Gold Slot
  static playPiratesGold(betAmount) {
    const symbols = ['🏴‍☠️', '⚔️', '💎', '🗺️', '🏆'];
    const reels = Array.from({ length: 5 }, () => symbols[Math.floor(Math.random() * symbols.length)]);
    const treasureCount = reels.filter((s) => s === '💎').length;

    let multiplier = 0;
    if (treasureCount >= 4) {
      multiplier = 30; // PIRATE TREASURE
    } else if (treasureCount === 3) {
      multiplier = 11;
    } else if (treasureCount === 2) {
      multiplier = 3.5;
    }

    const winAmount = betAmount * multiplier;
    return {
      game: 'Pirates Gold',
      reels,
      treasureCount,
      multiplier,
      betAmount,
      winAmount,
      result: multiplier > 0 ? 'WIN' : 'LOSS',
    };
  }

  // Record game result to database
  static async recordResult(userId, gameId, gameType, betAmount, winAmount, result) {
    const queryResult = await pool.query(
      'INSERT INTO game_results (user_id, game_id, amount_bet, amount_won, result, game_type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [userId, gameId, betAmount, winAmount, result, gameType]
    );

    const netChange = winAmount - betAmount;
    await Wallet.updateBalance(userId, netChange);

    return queryResult.rows[0];
  }

  static async getUserGameHistory(userId, limit = 50) {
    const result = await pool.query(
      'SELECT * FROM game_results WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2',
      [userId, limit]
    );
    return result.rows;
  }
}

module.exports = GameResultExtended;
