BEGIN;

--Add the TimescaleDB extension
CREATE EXTENSION IF NOT EXISTS timescaledb;

--Schema for block table
DROP TABLE IF EXISTS "block";
CREATE TABLE "block"(
    block_number INT NOT NULL,
    hash VARCHAR (66),
    timestamp TIMESTAMP,
    PRIMARY KEY (block_number)
);

--Schema for transaction table
DROP TABLE IF EXISTS "transaction";
CREATE TABLE "transaction"(
    timestamp       TIMESTAMP NOT NULL,
    block_number   INT NOT NULL,
    contract_address   VARCHAR (42),
    tx_type    CHAR (20),
    tx_hash   VARCHAR (66),
    tx_from      VARCHAR (42),
    tx_to VARCHAR (42),
    token_id   NUMERIC,
    CONSTRAINT fk_block_number FOREIGN KEY (block_number) REFERENCES block (block_number)
);

--Timescale specific statements to create hypertable
SELECT create_hypertable('transaction', 'timestamp');

COMMIT;