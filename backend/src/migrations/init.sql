-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Wallets table
CREATE TABLE IF NOT EXISTS wallets (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL,
    balance DECIMAL(18, 2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    amount DECIMAL(18, 2) NOT NULL,
    type VARCHAR(50) NOT NULL,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Games table
CREATE TABLE IF NOT EXISTS games (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    min_bet DECIMAL(10, 2),
    max_bet DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Game results table
CREATE TABLE IF NOT EXISTS game_results (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    game_id INTEGER NOT NULL,
    amount_bet DECIMAL(18, 2),
    amount_won DECIMAL(18, 2),
    result VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (game_id) REFERENCES games(id)
);

-- Create indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_wallets_user_id ON wallets(user_id);
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_game_results_user_id ON game_results(user_id);
