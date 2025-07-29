-- Paste this into your Postgres database (see Quickstart below)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  rating NUMERIC(2,1) DEFAULT 5.0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rides (
  id SERIAL PRIMARY KEY,
  driver_id INTEGER REFERENCES users(id),
  "from" VARCHAR(255) NOT NULL,
  "to" VARCHAR(255) NOT NULL,
  ride_date DATE NOT NULL,
  seats INTEGER NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  demand_score NUMERIC(3,1) DEFAULT 1.0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  ride_id INTEGER REFERENCES rides(id),
  passenger_id INTEGER REFERENCES users(id),
  status VARCHAR(32) DEFAULT 'pending',
  booked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  payment_status VARCHAR(32) DEFAULT 'unpaid'
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  ride_id INTEGER REFERENCES rides(id),
  reviewer_id INTEGER REFERENCES users(id),
  reviewee_id INTEGER REFERENCES users(id),
  rating INTEGER,
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  message TEXT,
  type VARCHAR(32),
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE referrals (
  id SERIAL PRIMARY KEY,
  referrer_id INTEGER REFERENCES users(id),
  referee_id INTEGER REFERENCES users(id),
  code VARCHAR(16),
  status VARCHAR(32) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE badges (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  badge VARCHAR(64),
  awarded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE carbon_donations (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  ride_id INTEGER REFERENCES rides(id),
  amount NUMERIC(10,2),
  donated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE loyalty (
  user_id INTEGER PRIMARY KEY REFERENCES users(id),
  points INTEGER DEFAULT 0
);

CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  booking_id INTEGER REFERENCES bookings(id),
  amount NUMERIC(10,2),
  stripe_payment_id VARCHAR(255),
  status VARCHAR(32),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);