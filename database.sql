create TABLE users (
    id SERIAL PRIMARY KEY,
    created_at VARCHAR(255)
);

create TABLE questions (
    id SERIAL PRIMARY KEY,
    text VARCHAR(255),
    isCorrect VARCHAR(255),
    userId INTEGER,
    FOREIGN KEY (userId) REFERENCES users (id)
);
