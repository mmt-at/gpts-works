-- CREATE TABLE users (
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(255),
--     nickname VARCHAR(255),
--     email VARCHAR(255) UNIQUE NOT NULL,
--     avatar_url VARCHAR(1023)
--     created_at timestamptz
-- );

CREATE TABLE MDSS (
    id SERIAL PRIMARY KEY,
    web_url text,
    created_at timestamptz,
    title text,
    abstract text,
    context text
);