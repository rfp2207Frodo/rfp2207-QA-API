const{Client}= require("pg");
const config = require ("../../config.js");

const postgres = new Client({
  user: config.user,
  host: config.host,
  database: config.database,
  password: config.password,
  port: config.port,
});

postgres.connect()
  .catch ((err) => (console.log("Failed to connect to database")))

module.exports = postgres;
