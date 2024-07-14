
// This file is used to create a connection to the database.
// This connection is then used in the controllers to interact with the database.

const e = require('express');

// Import the environment variables
const Pool = require('pg').Pool

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432,
})

module.exports = { pool }