CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    telegram_id INTEGER UNIQUE,
    disk_space INTEGER
);

CREATE TABLE Files (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES Users(id),
    file_path VARCHAR,
    file_name VARCHAR,
    file_size INTEGER,
    uploaded_at TIMESTAMP
);