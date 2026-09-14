const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  return password.length >= 6;
};

const validateUsername = (username) => {
  return username.length >= 3 && username.length <= 20;
};

module.exports = {
  validateEmail,
  validatePassword,
  validateUsername,
};
