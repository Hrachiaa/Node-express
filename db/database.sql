create TABLE users (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW()::timestamp(0) NOT NULL
);

create TABLE questions (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    text TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT false,
    user_id BIGINT NOT NULL REFERENCES users(id)
);
