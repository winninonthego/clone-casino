# clone-casino

Full-stack casino engine with admin panel, user wallet, and game integration. Designed for rapid deployment on low-cost VPS. Includes Telegram bot for manual and automated cashier operations.

## 🎰 Features

- **Full-Stack Architecture**: Frontend, Backend, and Bot integrated
- **Admin Panel**: Manage users, wallets, and games
- **User Wallet System**: Secure balance management
- **Game Integration**: Multiple casino games
- **Telegram Bot**: Automated cashier and manual operations
- **Docker Ready**: Easy deployment on any VPS
- **Rapid Deployment**: Minimal configuration needed

## 📋 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT

### Frontend
- **Framework**: React 18
- **Routing**: React Router
- **HTTP Client**: Axios

### Telegram Bot
- **Library**: Telegraf
- **API Communication**: Axios

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- Docker & Docker Compose
- PostgreSQL 12+
- Telegram Bot Token

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/winninonthego/clone-casino.git
   cd clone-casino
   ```

2. **Set up environment variables**
   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   cp telegram-bot/.env.example telegram-bot/.env
   ```

3. **Using Docker Compose (Recommended)**
   ```bash
   docker-compose up -d
   ```

4. **Manual Setup**
   
   Backend:
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   
   Frontend:
   ```bash
   cd frontend
   npm install
   npm start
   ```
   
   Telegram Bot:
   ```bash
   cd telegram-bot
   npm install
   npm run dev
   ```

## 📁 Project Structure

```
clone-casino/
├── backend/              # Backend API (Express.js)
│   ├── src/             # Source code
│   ├── package.json
│   └── .env.example
├── frontend/            # Frontend UI (React)
│   ├── src/             # Source code
│   ├── package.json
│   └── .env.example
├── telegram-bot/        # Telegram Bot
│   ├── src/             # Source code
│   ├── package.json
│   └── .env.example
├── docker-compose.yml   # Docker configuration
├── .gitignore
└── README.md
```

## 🔧 Configuration

### Backend Configuration
Edit `backend/.env`:
```env
NODE_ENV=development
PORT=5000
DB_HOST=localhost
DB_NAME=casino_db
JWT_SECRET=your_secret_key
TELEGRAM_BOT_TOKEN=your_token
```

### Frontend Configuration
Edit `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ENVIRONMENT=development
```

### Telegram Bot Configuration
Edit `telegram-bot/.env`:
```env
TELEGRAM_BOT_TOKEN=your_token
BACKEND_API_URL=http://localhost:5000
```

## 📚 API Documentation

(Coming Soon)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For issues and questions, please open an issue on GitHub.

## 🏗️ Roadmap

- [ ] User authentication system
- [ ] Game integration
- [ ] Admin dashboard
- [ ] Wallet system
- [ ] Telegram bot integration
- [ ] Payment gateway
- [ ] Deployment guides

---

**Happy Coding! 🚀**
