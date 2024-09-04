CREATE DATABASE tchat;

\c tchat;

CREATE TABLE utilisateurs (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE message (
    id SERIAL PRIMARY KEY,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    body TEXT,
    id_user_from INT,
    id_user_to INT,
    CONSTRAINT user_message_from FOREIGN KEY (id_user_from) REFERENCES utilisateurs(id),
    CONSTRAINT user_message_to FOREIGN KEY (id_user_to) REFERENCES utilisateurs(id),
);
