require('dotenv').config();
const { Telegraf } = require('telegraf');
const axios = require('axios');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const BACKEND_API = process.env.BACKEND_API_URL || 'http://localhost:5000';

// User sessions storage (in production, use database)
const userSessions = {};

// Start command
bot.start((ctx) => {
  ctx.reply(
    '🎰 Welcome to Clone Casino!\n\n' +
    'Available commands:\n' +
    '/register - Create new account\n' +
    '/login - Login to your account\n' +
    '/balance - Check wallet balance\n' +
    '/deposit - Deposit money\n' +
    '/withdraw - Withdraw money\n' +
    '/games - View available games\n' +
    '/logout - Logout'
  );
});

// Register
bot.command('register', (ctx) => {
  ctx.reply('📝 Enter username (3-20 characters):');
  userSessions[ctx.from.id] = { step: 'register_username' };
});

// Login
bot.command('login', (ctx) => {
  ctx.reply('📧 Enter your email:');
  userSessions[ctx.from.id] = { step: 'login_email' };
});

// Check balance
bot.command('balance', async (ctx) => {
  try {
    const session = userSessions[ctx.from.id];
    if (!session || !session.token) {
      return ctx.reply('❌ Please login first using /login');
    }

    const response = await axios.get(`${BACKEND_API}/api/wallet`, {
      headers: { Authorization: `Bearer ${session.token}` },
    });

    ctx.reply(`💰 Your Balance: $${response.data.balance}`);
  } catch (err) {
    ctx.reply('❌ Error fetching balance: ' + err.message);
  }
});

// Deposit
bot.command('deposit', (ctx) => {
  const session = userSessions[ctx.from.id];
  if (!session || !session.token) {
    return ctx.reply('❌ Please login first using /login');
  }
  ctx.reply('💵 Enter deposit amount:');
  userSessions[ctx.from.id].step = 'deposit_amount';
});

// Withdraw
bot.command('withdraw', (ctx) => {
  const session = userSessions[ctx.from.id];
  if (!session || !session.token) {
    return ctx.reply('❌ Please login first using /login');
  }
  ctx.reply('💸 Enter withdrawal amount:');
  userSessions[ctx.from.id].step = 'withdraw_amount';
});

// View games
bot.command('games', async (ctx) => {
  try {
    const response = await axios.get(`${BACKEND_API}/api/games`);
    let message = '🎮 Available Games:\n\n';
    response.data.forEach((game) => {
      message += `• ${game.name}\n  Min: $${game.minBet} | Max: $${game.maxBet}\n`;
    });
    ctx.reply(message);
  } catch (err) {
    ctx.reply('❌ Error fetching games: ' + err.message);
  }
});

// Logout
bot.command('logout', (ctx) => {
  delete userSessions[ctx.from.id];
  ctx.reply('👋 Logged out successfully!');
});

// Handle text messages (for registration/login flow)
bot.on('text', async (ctx) => {
  const userId = ctx.from.id;
  const session = userSessions[userId];

  if (!session) {
    return ctx.reply('❓ Unknown command. Type /start for help.');
  }

  try {
    if (session.step === 'register_username') {
      if (ctx.message.text.length < 3 || ctx.message.text.length > 20) {
        return ctx.reply('⚠️ Username must be 3-20 characters');
      }
      session.username = ctx.message.text;
      session.step = 'register_email';
      ctx.reply('📧 Enter email:');
    } else if (session.step === 'register_email') {
      session.email = ctx.message.text;
      session.step = 'register_password';
      ctx.reply('🔐 Enter password (at least 6 characters):');
    } else if (session.step === 'register_password') {
      if (ctx.message.text.length < 6) {
        return ctx.reply('⚠️ Password must be at least 6 characters');
      }
      // Register user via backend
      const response = await axios.post(`${BACKEND_API}/api/auth/register`, {
        username: session.username,
        email: session.email,
        password: ctx.message.text,
      });

      userSessions[userId] = {
        username: response.data.user.username,
        email: response.data.user.email,
        token: response.data.token,
      };

      ctx.reply(`✅ Account created successfully!\n💰 Ready to play! Use /games to see available games.`);
    } else if (session.step === 'login_email') {
      session.email = ctx.message.text;
      session.step = 'login_password';
      ctx.reply('🔐 Enter password:');
    } else if (session.step === 'login_password') {
      // Login user via backend
      const response = await axios.post(`${BACKEND_API}/api/auth/login`, {
        email: session.email,
        password: ctx.message.text,
      });

      userSessions[userId] = {
        username: response.data.user.username,
        email: response.data.user.email,
        token: response.data.token,
      };

      ctx.reply(`✅ Welcome back, ${response.data.user.username}!\n💰 Ready to play!`);
    } else if (session.step === 'deposit_amount') {
      const amount = parseFloat(ctx.message.text);
      if (isNaN(amount) || amount <= 0) {
        return ctx.reply('⚠️ Please enter a valid amount');
      }

      const response = await axios.post(
        `${BACKEND_API}/api/wallet/deposit`,
        { amount },
        { headers: { Authorization: `Bearer ${session.token}` } }
      );

      ctx.reply(`✅ Deposit successful!\n💰 New balance: $${response.data.wallet.balance}`);
      session.step = null;
    } else if (session.step === 'withdraw_amount') {
      const amount = parseFloat(ctx.message.text);
      if (isNaN(amount) || amount <= 0) {
        return ctx.reply('⚠️ Please enter a valid amount');
      }

      const response = await axios.post(
        `${BACKEND_API}/api/wallet/withdraw`,
        { amount },
        { headers: { Authorization: `Bearer ${session.token}` } }
      );

      ctx.reply(`✅ Withdrawal successful!\n💰 New balance: $${response.data.wallet.balance}`);
      session.step = null;
    }
  } catch (err) {
    ctx.reply('❌ Error: ' + (err.response?.data?.error || err.message));
    session.step = null;
  }
});

// Admin commands
bot.command('admin', (ctx) => {
  ctx.reply(
    '👨‍💼 Admin Panel\n\n' +
    '/admin_users - View all users\n' +
    '/admin_stats - View casino stats\n' +
    '/admin_broadcast - Send message to all users'
  );
});

bot.command('admin_stats', async (ctx) => {
  try {
    ctx.reply(
      '📊 Casino Statistics\n\n' +
      '👥 Total Users: -\n' +
      '💰 Total Deposits: -\n' +
      '🎮 Total Games Played: -\n\n' +
      '(Database integration needed)'
    );
  } catch (err) {
    ctx.reply('❌ Error: ' + err.message);
  }
});

// Error handling
bot.catch((err) => {
  console.error('Telegraf error:', err);
});

// Start bot
bot.launch();
console.log('🤖 Telegram bot is running...');

// Graceful shutdown
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
