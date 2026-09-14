import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function DashboardPage({ user, onLogout }) {
  const [wallet, setWallet] = useState(null);
  const [gameStats, setGameStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const walletResponse = await axios.get(`${API_URL}/api/wallet`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWallet(walletResponse.data);
    } catch (err) {
      console.error('Error fetching wallet:', err);
    } finally {
      setLoading(false);
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
          <a href="/payments">Payments</a>
          <a href="/admin">Admin</a>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <div className="container mt-20">
        <div className="card">
          <h2>Welcome to Clone Casino, {user?.username || 'User'}! 👋</h2>
          <p>Your ultimate gaming destination with 14 exciting games</p>
        </div>

        {loading ? (
          <div className="card">Loading...</div>
        ) : (
          <div className="grid">
            <div className="card" style={{ textAlign: 'center' }}>
              <h3>💰 Your Balance</h3>
              <p style={{ fontSize: '40px', color: '#667eea', fontWeight: 'bold' }}>${wallet?.balance || '0.00'}</p>
              <button className="btn btn-success" onClick={() => navigate('/payments')} style={{ width: '100%' }}>
                Add Funds
              </button>
            </div>

            <div className="card" style={{ textAlign: 'center' }}>
              <h3>🎰 Slot Games</h3>
              <p style={{ fontSize: '18px', color: '#667eea', fontWeight: 'bold' }}>6 Games</p>
              <p>Buffalo Gold, Dragons Gold, Panda Gold, Wild West, Golden Coins, Rainbow Riches</p>
              <button className="btn btn-primary" onClick={() => navigate('/games')} style={{ width: '100%' }}>
                Play Slots
              </button>
            </div>

            <div className="card" style={{ textAlign: 'center' }}>
              <h3>🎣 Fish Table Games</h3>
              <p style={{ fontSize: '18px', color: '#667eea', fontWeight: 'bold' }}>5 Games</p>
              <p>Sea Striker, Ocean King, Tidal Treasures, Mermaid Riches, Pirate Plunder</p>
              <button className="btn btn-primary" onClick={() => navigate('/games')} style={{ width: '100%' }}>
                Play Fish Tables
              </button>
            </div>

            <div className="card" style={{ textAlign: 'center' }}>
              <h3>🃏 Classic Games</h3>
              <p style={{ fontSize: '18px', color: '#667eea', fontWeight: 'bold' }}>3 Games</p>
              <p>Blackjack, Roulette, Classic Slots</p>
              <button className="btn btn-primary" onClick={() => navigate('/games')} style={{ width: '100%' }}>
                Play Classic
              </button>
            </div>

            <div className="card" style={{ textAlign: 'center' }}>
              <h3>💵 Wallet</h3>
              <p>Manage your deposits and withdrawals</p>
              <button className="btn btn-primary" onClick={() => navigate('/wallet')} style={{ width: '100%' }}>
                Go to Wallet
              </button>
            </div>

            <div className="card" style={{ textAlign: 'center' }}>
              <h3>🏛️ Admin Panel</h3>
              <p>View casino statistics and settings</p>
              <button className="btn btn-primary" onClick={() => navigate('/admin')} style={{ width: '100%' }}>
                Admin Dashboard
              </button>
            </div>
          </div>
        )}

        <div className="card" style={{ marginTop: '20px' }}>
          <h3>📊 Game Categories</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '15px' }}>
            <div style={{ padding: '15px', background: '#f0f4ff', borderRadius: '5px' }}>
              <h4>🎰 Slot Games</h4>
              <p>Traditional slots with modern themes and big multipliers</p>
            </div>
            <div style={{ padding: '15px', background: '#f0f4ff', borderRadius: '5px' }}>
              <h4>🎣 Fish Table Games</h4>
              <p>Action-packed fishing games with dynamic rewards</p>
            </div>
            <div style={{ padding: '15px', background: '#f0f4ff', borderRadius: '5px' }}>
              <h4>🃏 Classic Games</h4>
              <p>Timeless casino favorites like Blackjack and Roulette</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
