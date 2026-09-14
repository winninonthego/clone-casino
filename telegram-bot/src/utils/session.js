class UserSession {
  constructor() {
    this.sessions = {};
  }

  createSession(userId, userData) {
    this.sessions[userId] = {
      userId,
      ...userData,
      createdAt: new Date(),
    };
  }

  getSession(userId) {
    return this.sessions[userId];
  }

  updateSession(userId, data) {
    if (this.sessions[userId]) {
      this.sessions[userId] = { ...this.sessions[userId], ...data };
    }
  }

  deleteSession(userId) {
    delete this.sessions[userId];
  }

  isLoggedIn(userId) {
    return this.sessions[userId] && this.sessions[userId].token ? true : false;
  }
}

module.exports = new UserSession();
