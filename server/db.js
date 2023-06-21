const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  password: "postgresql",
  host: "localhost",
  port: 5432,
  database: "newdb",
});

client
  .connect()
  .then(() => {
    console.log(`database connected successfully`);
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = client;
