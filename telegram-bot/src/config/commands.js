const commands = {
  start: 'Start the bot and see available commands',
  register: 'Create a new casino account',
  login: 'Login to your casino account',
  balance: 'Check your wallet balance',
  deposit: 'Deposit money to your wallet',
  withdraw: 'Withdraw money from your wallet',
  games: 'View available casino games',
  logout: 'Logout from your account',
  admin: 'Admin panel (commands list)',
  admin_stats: 'View casino statistics',
  admin_broadcast: 'Send message to all users',
};

const formatCommandList = () => {
  let list = '📋 Available Commands:\n\n';
  Object.entries(commands).forEach(([cmd, desc]) => {
    list += `/${cmd} - ${desc}\n`;
  });
  return list;
};

module.exports = { commands, formatCommandList };
