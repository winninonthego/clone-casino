import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function WalletPage({ user, onLogout }) {
  const [wallet, setWallet] = useState(null);
  const [amount, setAmount] = useState('');
  const [action, setAction] = useState('deposit');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
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
      setMessage('Error fetching wallet');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      const endpoint = action === 'deposit' ? 'deposit' : 'withdraw';
      const response = await axios.post(
        `${API_URL}/api/wallet/${endpoint}`,
        { amount: parseFloat(amount) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(`✅ ${action.charAt(0).toUpperCase() + action.slice(1)} successful!`);
      setWallet(response.data.wallet);
      setAmount('');
    } catch (err) {
      setMessage(`❌ ${err.response?.data?.error || 'Transaction failed'}`);
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
          <h2>💰 Wallet Management</h2>
          <p style={{ fontSize: '24px', color: '#667eea', fontWeight: 'bold' }}>Balance: ${wallet?.balance || '0.00'}</p>
        </div>

        <div className="card" style={{ maxWidth: '400px' }}>
          <h3>{action === 'deposit' ? '💵 Deposit Money' : '💸 Withdraw Money'}</h3>
          {message && (
            <div className={`alert ${message.includes('✅') ? 'alert-success' : 'alert-error'}`}>
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Action</label>
              <select
                value={action}
                onChange={(e) => setAction(e.target.value)}
                style={{
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ddd',
                  width: '100%',
                }}
              >
                <option value="deposit">Deposit</option>
                <option value="withdraw">Withdraw</option>
              </select>
            </div>
            <div className="form-group">
              <label>Amount ($)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                min="0.01"
                step="0.01"
                required
              />
            </div>
            <button
              type="submit"
              className={`btn ${action === 'deposit' ? 'btn-success' : 'btn-primary'}`}
              style={{ width: '100%' }}
              disabled={loading}
            >
              {loading ? 'Processing...' : action === 'deposit' ? 'Deposit' : 'Withdraw'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default WalletPage;
