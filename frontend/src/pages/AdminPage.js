import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminPage({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

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
          <h2>👨‍💼 Admin Panel</h2>
          <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
            <button
              className={`btn ${activeTab === 'overview' ? 'btn-primary' : ''}`}
              onClick={() => setActiveTab('overview')}
              style={{ background: activeTab === 'overview' ? '#667eea' : '#ccc' }}
            >
              Overview
            </button>
            <button
              className={`btn ${activeTab === 'users' ? 'btn-primary' : ''}`}
              onClick={() => setActiveTab('users')}
              style={{ background: activeTab === 'users' ? '#667eea' : '#ccc' }}
            >
              Users
            </button>
            <button
              className={`btn ${activeTab === 'settings' ? 'btn-primary' : ''}`}
              onClick={() => setActiveTab('settings')}
              style={{ background: activeTab === 'settings' ? '#667eea' : '#ccc' }}
            >
              Settings
            </button>
          </div>
        </div>

        {activeTab === 'overview' && (
          <div className="grid">
            <div className="card text-center">
              <h3>👥 Total Users</h3>
              <p style={{ fontSize: '32px', color: '#667eea' }}>-</p>
              <small>(Database integration needed)</small>
            </div>
            <div className="card text-center">
              <h3>💰 Total Revenue</h3>
              <p style={{ fontSize: '32px', color: '#667eea' }}>$0.00</p>
              <small>(Database integration needed)</small>
            </div>
            <div className="card text-center">
              <h3>🎮 Games Played</h3>
              <p style={{ fontSize: '32px', color: '#667eea' }}>0</p>
              <small>(Database integration needed)</small>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="card">
            <h3>Manage Users</h3>
            <p>User management interface coming soon...</p>
            <p style={{ color: '#666', fontSize: '14px' }}>(Requires database queries)</p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="card">
            <h3>Casino Settings</h3>
            <div className="form-group">
              <label>Min Bet Amount</label>
              <input type="number" placeholder="Enter minimum bet" />
            </div>
            <div className="form-group">
              <label>Max Bet Amount</label>
              <input type="number" placeholder="Enter maximum bet" />
            </div>
            <div className="form-group">
              <label>House Edge (%)</label>
              <input type="number" placeholder="Enter house edge percentage" />
            </div>
            <button className="btn btn-success" style={{ width: '100%' }}>
              Save Settings
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPage;
