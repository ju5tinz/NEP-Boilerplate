require('dotenv').config({ path: '../.env'})

const db = require('../db')

db.query(`
  DROP TABLE IF EXISTS accounts;
  CREATE TABLE IF NOT EXISTS accounts (
    uid serial PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
  );
`)

// create table for express sessions
db.query(`
  DROP TABLE IF EXISTS sessions;
  DROP INDEX IF EXISTS "IDX_session_expire";
  CREATE TABLE IF NOT EXISTS session (
    sid varchar NOT NULL COLLATE "default",
    sess json NOT NULL,
    expire timestamp(6) NOT NULL,
    CONSTRAINT "session_pkey" PRIMARY KEY ("sid")
  );
  CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON session ("expire");
`)

db.pool.end()