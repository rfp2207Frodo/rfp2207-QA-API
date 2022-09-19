const{Client}= require("pg");
const config = require ("../../config.js");

const postgres = new Client({
  host: "localhost",
  port: 5432,
  database: config.database,
  user: config.user,
  password: config.password,
});

postgres.connect()
  .then (() => console.log("success"))
  // .then (() => postgres.query("select * from questions limit 5"))
  // .then (results => console.table(results.rows))
  .catch ((err) => (console.log("failed")))
  // .finally (() => postgres.end());


module.exports = postgres;
