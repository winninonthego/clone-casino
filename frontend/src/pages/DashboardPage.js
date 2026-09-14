import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function DashboardPage({ user, onLogout }) {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWallet();
  }, []);

  const fetchWallet = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/wallet`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWallet(response.data);
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
          <a href="/admin">Admin</a>
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div className="container mt-20">
        <div className="card">
          <h2>Welcome, {user?.username || 'User'}! 👋</h2>
          <p>Welcome to Clone Casino - Your ultimate gaming destination</p>
        </div>

        {loading ? (
          <div className="card">Loading...</div>
        ) : (
          <div className="grid">
            <div className="card" style={{ textAlign: 'center' }}>
              <h3>💰 Your Balance</h3>
              <p style={{ fontSize: '32px', color: '#667eea', fontWeight: 'bold' }}>${wallet?.balance || '0.00'}</p>
              <button className="btn btn-success" onClick={() => navigate('/wallet')}>
                Manage Wallet
              </button>
            </div>
            <div className="card" style={{ textAlign: 'center' }}>
              <h3>🎮 Play Games</h3>
              <p>Try your luck at our exciting casino games</p>
              <button className="btn btn-primary" onClick={() => navigate('/games')}>
                View Games
              </button>
            </div>
            <div className="card" style={{ textAlign: 'center' }}>
              <h3>📊 Admin Panel</h3>
              <p>Manage casino operations and users</p>
              <button className="btn btn-primary" onClick={() => navigate('/admin')}>
                Go to Admin
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
