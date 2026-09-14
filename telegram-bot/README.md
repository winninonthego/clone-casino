# Telegram Bot for Clone Casino

A feature-rich Telegram bot that connects to the Clone Casino backend for user account management, wallet operations, and game interactions.

## Features

- **User Management**: Register and login via Telegram
- **Wallet Operations**: Check balance, deposit, and withdraw
- **Game Integration**: View and play available games
- **Admin Panel**: Manage users and view statistics
- **Session Management**: Persistent user sessions
- **Error Handling**: Comprehensive error messages

## Setup

1. Create a bot token on [BotFather](https://t.me/botfather)
2. Set environment variables:
   ```bash
   cp .env.example .env
   ```
3. Update `.env` with your bot token and backend API URL
4. Install dependencies:
   ```bash
   npm install
   ```
5. Run the bot:
   ```bash
   npm start
   ```

## Commands

### User Commands
- `/start` - Start the bot
- `/register` - Create new account
- `/login` - Login to your account
- `/balance` - Check wallet balance
- `/deposit` - Add money to wallet
- `/withdraw` - Withdraw money from wallet
- `/games` - View available games
- `/logout` - Logout from your account

### Admin Commands
- `/admin` - View admin panel
- `/admin_stats` - View casino statistics
- `/admin_broadcast` - Send message to all users

## File Structure

```
telegram-bot/
├── src/
│   ├── index.js                 # Main bot entry point
│   ├── config/
│   │   └── commands.js          # Command definitions
│   ├── services/
│   │   └── CasinoAPI.js        # Backend API client
│   └── utils/
│       └── session.js           # User session management
├── package.json
└── .env.example
```

## Architecture

### Command Flow
1. User sends command
2. Bot processes command
3. Bot may prompt for additional input
4. Bot calls CasinoAPI to interact with backend
5. Bot sends response to user

### Session Management
- User sessions stored in memory (upgrade to database for production)
- Sessions include: userId, username, email, token
- Token used for authenticated API requests

## API Integration

The bot communicates with the backend through the CasinoAPI service:
- Authentication: Register & Login
- Wallet: Check balance, Deposit, Withdraw
- Games: List games, Play game

## Future Enhancements

- [ ] Database-backed sessions
- [ ] Game result notifications
- [ ] Leaderboard commands
- [ ] Withdrawal approval workflow
- [ ] User verification
- [ ] Analytics and reporting

## Security Notes

- Tokens are stored in memory (not secure for production)
- Implement database for persistent, encrypted token storage
- Add rate limiting to prevent abuse
- Validate all user inputs
- Use HTTPS for API calls
