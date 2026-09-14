import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/AdminPage';
import GamesPage from './pages/GamesPage';
import WalletPage from './pages/WalletPage';
import PaymentPage from './pages/PaymentPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(!!localStorage.getItem('token'));
  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('user') || 'null'));

  const handleLogin = (token, userData) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsLoggedIn(true);
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <LoginPage onLogin={handleLogin} />} />
          <Route path="/register" element={isLoggedIn ? <Navigate to="/dashboard" /> : <RegisterPage onRegister={handleLogin} />} />
          <Route path="/dashboard" element={isLoggedIn ? <DashboardPage user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path="/admin" element={isLoggedIn ? <AdminPage user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path="/games" element={isLoggedIn ? <GamesPage user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path="/wallet" element={isLoggedIn ? <WalletPage user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path="/payments" element={isLoggedIn ? <PaymentPage user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
