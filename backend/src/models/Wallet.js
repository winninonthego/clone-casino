const pool = require('../config/database');

class Wallet {
  static async create(userId, initialBalance = 0) {
    const result = await pool.query(
      'INSERT INTO wallets (user_id, balance) VALUES ($1, $2) RETURNING id, user_id, balance, created_at',
      [userId, initialBalance]
    );
    return result.rows[0];
  }

  static async getByUserId(userId) {
    const result = await pool.query('SELECT * FROM wallets WHERE user_id = $1', [userId]);
    return result.rows[0];
  }

  static async updateBalance(userId, amount) {
    const result = await pool.query(
      'UPDATE wallets SET balance = balance + $1, updated_at = NOW() WHERE user_id = $2 RETURNING *',
      [amount, userId]
    );
    return result.rows[0];
  }

  static async deposit(userId, amount) {
    if (amount <= 0) throw new Error('Deposit amount must be positive');
    return this.updateBalance(userId, amount);
  }

  static async withdraw(userId, amount) {
    if (amount <= 0) throw new Error('Withdrawal amount must be positive');
    const wallet = await this.getByUserId(userId);
    if (wallet.balance < amount) throw new Error('Insufficient balance');
    return this.updateBalance(userId, -amount);
  }
}

module.exports = Wallet;
