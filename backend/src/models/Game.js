const pool = require('../config/database');

class Game {
  static async create(name, description, minBet, maxBet, rtp = 0.96) {
    const result = await pool.query(
      'INSERT INTO games (name, description, min_bet, max_bet, rtp) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, description, minBet, maxBet, rtp]
    );
    return result.rows[0];
  }

  static async getAll() {
    const result = await pool.query('SELECT * FROM games ORDER BY id ASC');
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query('SELECT * FROM games WHERE id = $1', [id]);
    return result.rows[0];
  }
}

module.exports = Game;
