-- Создаем пользователя и БД через администратора
-- CREATE USER app_user WITH PASSWORD 'securepassword';
-- ALTER USER app_user CREATEDB;

-- CREATE DATABASE app_db 
--   WITH OWNER = app_user
--        ENCODING = 'UTF8';

-- \connect postgres

-- Таблица пользователей
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(50) NOT NULL
);