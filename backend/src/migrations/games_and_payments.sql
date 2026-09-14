-- Games table (already exists, but ensuring it's set up)
CREATE TABLE IF NOT EXISTS games (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    min_bet DECIMAL(10, 2),
    max_bet DECIMAL(10, 2),
    rtp DECIMAL(5, 3) DEFAULT 0.96,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Game results table
CREATE TABLE IF NOT EXISTS game_results (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    game_id INTEGER NOT NULL,
    game_type VARCHAR(50),
    amount_bet DECIMAL(18, 2),
    amount_won DECIMAL(18, 2),
    result VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (game_id) REFERENCES games(id)
);

-- Payments table (for deposit tracking)
CREATE TABLE IF NOT EXISTS payments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    amount DECIMAL(18, 2) NOT NULL,
    method VARCHAR(50), -- 'credit_card', 'debit_card', 'bank_transfer', 'crypto', etc.
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'completed', 'failed', 'refunded'
    reference_id VARCHAR(255) UNIQUE,
    transaction_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Withdrawals table
CREATE TABLE IF NOT EXISTS withdrawals (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    amount DECIMAL(18, 2) NOT NULL,
    method VARCHAR(50), -- 'bank_transfer', 'crypto_wallet', 'e-wallet', etc.
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
    destination VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create indexes for performance
CREATE INDEX idx_game_results_user_id ON game_results(user_id);
CREATE INDEX idx_game_results_created_at ON game_results(created_at);
CREATE INDEX idx_payments_user_id ON payments(user_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_withdrawals_user_id ON withdrawals(user_id);
CREATE INDEX idx_withdrawals_status ON withdrawals(status);

-- Insert sample games
INSERT INTO games (name, description, min_bet, max_bet, rtp) VALUES
('Slots', 'Classic slot machine with exciting payouts', 1, 1000, 0.96),
('Blackjack', 'Beat the dealer and win big', 5, 500, 0.99),
('Roulette', 'Spin the wheel and test your luck', 1, 1000, 0.973),
('Lucky 7', 'Match the sevens for massive jackpots', 1, 500, 0.95),
('Diamond Rush', 'Rush to collect diamonds and win rewards', 2, 800, 0.94);
