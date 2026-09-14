const axios = require('axios');

const BACKEND_API = process.env.BACKEND_API_URL || 'http://localhost:5000';

class CasinoAPI {
  static async register(username, email, password) {
    try {
      const response = await axios.post(`${BACKEND_API}/api/auth/register`, {
        username,
        email,
        password,
      });
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.error || err.message);
    }
  }

  static async login(email, password) {
    try {
      const response = await axios.post(`${BACKEND_API}/api/auth/login`, {
        email,
        password,
      });
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.error || err.message);
    }
  }

  static async getBalance(token) {
    try {
      const response = await axios.get(`${BACKEND_API}/api/wallet`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.error || err.message);
    }
  }

  static async deposit(token, amount) {
    try {
      const response = await axios.post(
        `${BACKEND_API}/api/wallet/deposit`,
        { amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.error || err.message);
    }
  }

  static async withdraw(token, amount) {
    try {
      const response = await axios.post(
        `${BACKEND_API}/api/wallet/withdraw`,
        { amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.error || err.message);
    }
  }

  static async getGames() {
    try {
      const response = await axios.get(`${BACKEND_API}/api/games`);
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.error || err.message);
    }
  }

  static async playGame(token, gameId, amount) {
    try {
      const response = await axios.post(
        `${BACKEND_API}/api/games/${gameId}/play`,
        { amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.error || err.message);
    }
  }
}

module.exports = CasinoAPI;
