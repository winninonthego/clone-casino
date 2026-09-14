const pool = require('../config/database');
const Wallet = require('./Wallet');

class GameResult {
  // Slots game logic
  static playSlots(betAmount) {
    const symbols = ['🍎', '🍊', '🍇', '🍓', '💎', '7️⃣'];
    const reel1 = symbols[Math.floor(Math.random() * symbols.length)];
    const reel2 = symbols[Math.floor(Math.random() * symbols.length)];
    const reel3 = symbols[Math.floor(Math.random() * symbols.length)];

    let multiplier = 0;
    if (reel1 === reel2 && reel2 === reel3) {
      // Three of a kind - Triple win
      multiplier = reel1 === '💎' ? 10 : reel1 === '7️⃣' ? 8 : 3;
    } else if (reel1 === reel2 || reel2 === reel3) {
      // Two of a kind - Double win
      multiplier = 2;
    }

    const winAmount = betAmount * multiplier;
    return {
      reels: [reel1, reel2, reel3],
      multiplier,
      betAmount,
      winAmount,
      result: multiplier > 0 ? 'WIN' : 'LOSS',
    };
  }

  // Blackjack game logic (simplified)
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

  // Roulette game logic
  static playRoulette(betAmount, betType) {
    const spinNumber = Math.floor(Math.random() * 37); // 0-36
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
      spinNumber,
      betType,
      result,
      multiplier,
      betAmount,
      winAmount,
      color: isRed ? 'red' : 'black',
    };
  }

  // Lucky 7 game logic
  static playLucky7(betAmount) {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const num3 = Math.floor(Math.random() * 10);

    let multiplier = 0;
    let result = 'LOSS';

    const count7 = [num1, num2, num3].filter((n) => n === 7).length;

    if (count7 === 3) {
      multiplier = 50; // LUCKY 7 JACKPOT!
      result = 'JACKPOT';
    } else if (count7 === 2) {
      multiplier = 10;
      result = 'WIN';
    } else if (count7 === 1) {
      multiplier = 2;
      result = 'WIN';
    }

    const winAmount = betAmount * multiplier;
    return {
      numbers: [num1, num2, num3],
      count7,
      result,
      multiplier,
      betAmount,
      winAmount,
    };
  }

  // Diamond Rush game logic
  static playDiamondRush(betAmount) {
    const grid = Array.from({ length: 9 }, () => Math.floor(Math.random() * 100));
    const diamondCount = grid.filter((n) => n > 80).length;

    let multiplier = 0;
    let result = 'LOSS';

    if (diamondCount >= 7) {
      multiplier = 20;
      result = 'EXCELLENT';
    } else if (diamondCount >= 5) {
      multiplier = 5;
      result = 'GREAT';
    } else if (diamondCount >= 3) {
      multiplier = 2;
      result = 'WIN';
    }

    const winAmount = betAmount * multiplier;
    return {
      grid,
      diamondCount,
      result,
      multiplier,
      betAmount,
      winAmount,
    };
  }

  static async recordResult(userId, gameId, gameType, betAmount, winAmount, result) {
    const queryResult = await pool.query(
      'INSERT INTO game_results (user_id, game_id, amount_bet, amount_won, result, game_type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [userId, gameId, betAmount, winAmount, result, gameType]
    );

    // Update wallet
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
