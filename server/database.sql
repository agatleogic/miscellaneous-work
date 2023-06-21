CREATE DATABASE newdb;

CREATE TABLE todoList(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
)