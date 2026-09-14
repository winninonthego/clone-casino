import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function GamesPage({ user, onLogout }) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState(null);
  const [betAmount, setBetAmount] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/games`);
      setGames(response.data);
    } catch (err) {
      console.error('Error fetching games:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayGame = async (gameId) => {
    if (!betAmount || betAmount <= 0) {
      alert('Please enter a valid bet amount');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${API_URL}/api/games/${gameId}/play`,
        { amount: parseFloat(betAmount) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Game started! (Game logic coming soon)');
    } catch (err) {
      alert(err.response?.data?.error || 'Error playing game');
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div>
      <div className="navbar">
        <div className="navbar-brand">🎰 Clone Casino</div>
        <div className="navbar-menu">
          <a href="/dashboard">Dashboard</a>
          <a href="/games">Games</a>
          <a href="/wallet">Wallet</a>
          <a href="/admin">Admin</a>
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div className="container mt-20">
        <div className="card">
          <h2>🎮 Casino Games</h2>
          <p>Choose a game and try your luck!</p>
        </div>

        {loading ? (
          <div className="card">Loading games...</div>
        ) : (
          <div className="grid">
            {games.map((game) => (
              <div key={game.id} className="card">
                <h3>{game.name}</h3>
                <p>{game.description}</p>
                <p style={{ color: '#666', fontSize: '14px' }}>
                  Min: ${game.minBet} | Max: ${game.maxBet}
                </p>
                <div className="form-group">
                  <label>Bet Amount ($)</label>
                  <input
                    type="number"
                    value={betAmount}
                    onChange={(e) => setBetAmount(e.target.value)}
                    placeholder="Enter bet"
                    min={game.minBet}
                    max={game.maxBet}
                    step="0.01"
                  />
                </div>
                <button
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                  onClick={() => handlePlayGame(game.id)}
                >
                  Play {game.name}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default GamesPage;
