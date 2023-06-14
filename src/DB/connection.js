const mysql = require('mysql2/promise');

require('dotenv').config();

const host = process.env.HOST;
const ip = process.env.IP;
const user = process.env.USUARIO;
const password = process.env.PASSWORD;
const port = process.env.PORT;
const database = process.env.DATABASE;

const connection = mysql.createPool({
  host: host | ip,
  user: user,
  password: password,
  port: port,
  database: database
});

module.exports = connection;