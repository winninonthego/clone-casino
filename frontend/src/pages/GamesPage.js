import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function GamesPage({ user, onLogout }) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState(null);
  const [betAmount, setBetAmount] = useState('');
  const [gameResult, setGameResult] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [betType, setBetType] = useState('red'); // For Roulette
  const [playing, setPlaying] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGames();
    fetchWallet();
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

  const fetchWallet = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/wallet`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWallet(response.data);
    } catch (err) {
      console.error('Error fetching wallet:', err);
    }
  };

  const handlePlayGame = async (gameId) => {
    if (!betAmount || betAmount <= 0) {
      alert('Please enter a valid bet amount');
      return;
    }

    if (wallet && wallet.balance < parseFloat(betAmount)) {
      alert('Insufficient balance!');
      return;
    }

    setPlaying(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_URL}/api/games/${gameId}/play`,
        {
          amount: parseFloat(betAmount),
          betType: gameId === 3 ? betType : undefined,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setGameResult(response.data);
      setWallet({ ...wallet, balance: response.data.newBalance });
    } catch (err) {
      alert(err.response?.data?.error || 'Error playing game');
    } finally {
      setPlaying(false);
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
          <div style={{ color: 'white', marginRight: '20px' }}>💰 ${wallet?.balance || '0.00'}</div>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <div className="container mt-20">
        <div className="card">
          <h2>🎮 Casino Games</h2>
          <p>Choose a game and try your luck! Current Balance: ${wallet?.balance || '0.00'}</p>
        </div>

        {loading ? (
          <div className="card">Loading games...</div>
        ) : (
          <div className="grid">
            {games.map((game) => (
              <div key={game.id} className="card" style={{ position: 'relative' }}>
                <div style={{ fontSize: '48px', textAlign: 'center', marginBottom: '10px' }}>{game.image}</div>
                <h3>{game.name}</h3>
                <p>{game.description}</p>
                <p style={{ color: '#666', fontSize: '14px' }}>Min: ${game.minBet} | Max: ${game.maxBet} | RTP: {(game.rtp * 100).toFixed(1)}%</p>

                {selectedGame?.id === game.id && (
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

                    {game.id === 3 && (
                      <div className="form-group" style={{ marginTop: '10px' }}>
                        <label>Bet Type</label>
                        <select
                          value={betType}
                          onChange={(e) => setBetType(e.target.value)}
                          style={{
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ddd',
                            width: '100%',
                          }}
                        >
                          <option value="red">Red</option>
                          <option value="black">Black</option>
                          <option value="even">Even</option>
                          <option value="odd">Odd</option>
                        </select>
                      </div>
                    )}

                    <button
                      className="btn btn-primary"
                      style={{ width: '100%', marginTop: '10px' }}
                      onClick={() => handlePlayGame(game.id)}
                      disabled={playing}
                    >
                      {playing ? 'Playing...' : `Play ${game.name}`}
                    </button>
                    <button
                      className="btn"
                      style={{ width: '100%', marginTop: '5px', background: '#ccc', color: '#333' }}
                      onClick={() => {
                        setSelectedGame(null);
                        setGameResult(null);
                        setBetAmount('');
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                )}

                {gameResult && selectedGame?.id === game.id && (
                  <div
                    style={{
                      marginTop: '15px',
                      padding: '10px',
                      borderRadius: '5px',
                      background: gameResult.gameResult.result !== 'LOSS' ? '#d4edda' : '#f8d7da',
                      border: `2px solid ${gameResult.gameResult.result !== 'LOSS' ? '#28a745' : '#f5c6cb'}`,
                    }}
                  >
                    <h4 style={{ marginTop: 0 }}>{gameResult.gameResult.result}</h4>
                    <p style={{ marginBottom: '5px' }}>Win: ${gameResult.gameResult.winAmount.toFixed(2)}</p>
                    <p style={{ marginBottom: '0' }}>New Balance: ${gameResult.newBalance.toFixed(2)}</p>
                  </div>
                )}

                {!selectedGame || selectedGame.id !== game.id ? (
                  <button
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                    onClick={() => setSelectedGame(game)}
                  >
                    Select Game
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default GamesPage;
