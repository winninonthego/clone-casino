const pool = require('../config/database');

class Payment {
  static async createPayment(userId, amount, method, status = 'pending') {
    const result = await pool.query(
      'INSERT INTO payments (user_id, amount, method, status, reference_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [userId, amount, method, status, `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`]
    );
    return result.rows[0];
  }

  static async getPaymentById(paymentId) {
    const result = await pool.query('SELECT * FROM payments WHERE id = $1', [paymentId]);
    return result.rows[0];
  }

  static async updatePaymentStatus(paymentId, status) {
    const result = await pool.query(
      'UPDATE payments SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
      [status, paymentId]
    );
    return result.rows[0];
  }

  static async getUserPayments(userId) {
    const result = await pool.query(
      'SELECT * FROM payments WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    return result.rows;
  }

  static async getTotalRevenue() {
    const result = await pool.query(
      'SELECT COALESCE(SUM(amount), 0) as total FROM payments WHERE status = \'completed\''
    );
    return result.rows[0].total;
  }
}

module.exports = Payment;
