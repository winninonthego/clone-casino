# Clone Casino Frontend

A modern React-based frontend for the Clone Casino full-stack application.

## Features

- **User Authentication**: Register and login
- **Dashboard**: View account overview and balance
- **Wallet Management**: Deposit and withdraw funds
- **Game Interface**: Browse and play available games
- **Admin Panel**: Manage casino operations
- **Responsive Design**: Works on all devices

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

3. Update `.env` with your backend API URL:
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## Pages

- **Login** (`/login`) - User authentication
- **Register** (`/register`) - New account creation
- **Dashboard** (`/dashboard`) - Overview and navigation
- **Wallet** (`/wallet`) - Deposit and withdraw funds
- **Games** (`/games`) - Browse and play games
- **Admin** (`/admin`) - Casino management

## Components Structure

```
src/
├── App.js              # Main app component with routing
├── App.css             # Global styles
├── index.js            # React entry point
├── pages/
│   ├── LoginPage.js
│   ├── RegisterPage.js
│   ├── DashboardPage.js
│   ├── WalletPage.js
│   ├── GamesPage.js
│   └── AdminPage.js
└── public/
    └── index.html
```

## API Integration

The frontend communicates with the backend API at `REACT_APP_API_URL`:

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/wallet` - Get wallet balance
- `POST /api/wallet/deposit` - Deposit funds
- `POST /api/wallet/withdraw` - Withdraw funds
- `GET /api/games` - List available games
- `POST /api/games/:gameId/play` - Play a game

## Styling

- Built with vanilla CSS
- Gradient background (purple)
- Responsive grid layout
- Card-based UI components

## Future Enhancements

- [ ] Game result animations
- [ ] Real-time notifications
- [ ] User profile page
- [ ] Game history
- [ ] Leaderboard
- [ ] Dark mode
- [ ] Mobile app
