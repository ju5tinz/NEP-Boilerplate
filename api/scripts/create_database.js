require('dotenv').config({ path: '../.env'})

const db = require('../db')

db.query(`
  CREATE TABLE IF NOT EXISTS accounts (
    uid serial PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL
  );
`, [],
(err, res) => {
  if(err) {
    console.log(err)
  } else {
    console.log(res)
  }
})