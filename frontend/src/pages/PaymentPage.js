import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function PaymentPage({ user, onLogout }) {
  const [wallet, setWallet] = useState(null);
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('credit_card');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [payments, setPayments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWallet();
    fetchPayments();
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

  const fetchPayments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/payments/history`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPayments(response.data);
    } catch (err) {
      console.error('Error fetching payments:', err);
    }
  };

  const handleInitiatePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_URL}/api/payments/initiate`,
        { amount: parseFloat(amount), method },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(`✅ Payment initiated! Reference: ${response.data.payment.reference_id}`);
      setAmount('');
      fetchWallet();
      fetchPayments();
    } catch (err) {
      setMessage(`❌ ${err.response?.data?.error || 'Payment failed'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const paymentMethods = [
    { value: 'credit_card', label: '💳 Credit Card' },
    { value: 'debit_card', label: '🏧 Debit Card' },
    { value: 'bank_transfer', label: '🏦 Bank Transfer' },
    { value: 'crypto', label: '🪙 Cryptocurrency' },
  ];

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
          <h2>💳 Deposit & Payments</h2>
          <p style={{ fontSize: '24px', color: '#667eea', fontWeight: 'bold' }}>Current Balance: ${wallet?.balance || '0.00'}</p>
        </div>

        <div className="grid">
          <div className="card">
            <h3>💰 Add Funds</h3>
            {message && (
              <div className={`alert ${message.includes('✅') ? 'alert-success' : 'alert-error'}`}>
                {message}
              </div>
            )}
            <form onSubmit={handleInitiatePayment}>
              <div className="form-group">
                <label>Payment Method</label>
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  style={{
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ddd',
                    width: '100%',
                  }}
                >
                  {paymentMethods.map((pm) => (
                    <option key={pm.value} value={pm.value}>
                      {pm.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Amount ($)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  min="1"
                  step="0.01"
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-success"
                style={{ width: '100%' }}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Continue to Payment'}
              </button>
            </form>
          </div>

          <div className="card">
            <h3>🎁 Quick Amounts</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {[10, 25, 50, 100].map((amt) => (
                <button
                  key={amt}
                  className="btn btn-primary"
                  onClick={() => setAmount(amt.toString())}
                  style={{ marginBottom: 0 }}
                >
                  ${amt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {payments.length > 0 && (
          <div className="card">
            <h3>📋 Payment History</h3>
            <div style={{ overflowX: 'auto' }}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  marginTop: '10px',
                }}
              >
                <thead>
                  <tr style={{ borderBottom: '2px solid #ddd' }}>
                    <th style={{ textAlign: 'left', padding: '10px' }}>Date</th>
                    <th style={{ textAlign: 'left', padding: '10px' }}>Amount</th>
                    <th style={{ textAlign: 'left', padding: '10px' }}>Method</th>
                    <th style={{ textAlign: 'left', padding: '10px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '10px' }}>{new Date(payment.created_at).toLocaleDateString()}</td>
                      <td style={{ padding: '10px', fontWeight: 'bold' }}>${payment.amount}</td>
                      <td style={{ padding: '10px' }}>{payment.method}</td>
                      <td
                        style={{
                          padding: '10px',
                          color: payment.status === 'completed' ? '#28a745' : payment.status === 'pending' ? '#ffc107' : '#dc3545',
                          fontWeight: 'bold',
                        }}
                      >
                        {payment.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PaymentPage;
