CREATE DATABASE facilita;
\c facilita;
GRANT ALL PRIVILEGES ON DATABASE facilita TO postgres;
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    coordinate_x FLOAT,
    coordinate_y FLOAT
);
