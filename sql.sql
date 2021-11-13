CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL
);
CREATE TABLE purchases (
    id SERIAL PRIMARY KEY,
    payment_id TEXT NOT NULL,
    product_name TEXT NOT NULL,
    user_id INTEGER REFERENCES users(id),
);