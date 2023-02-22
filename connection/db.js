const { createPool } = require("mysql");

const pool = createPool({
  host: "localhost",
  user: "root",
  password: "",
  port: "3306",
  database: "test",
});

pool.getConnection((err) => {
  if (err) {
    console.log(err);
  }
  console.log("Connect to database.....!");
});

const executeQuery = (query, arrParms) => {
  return new Promise((resolve, reject) => {
    try {
      pool.query(query, arrParms, (err, data) => {
        if (err) {
          console.log("err is executing the query");
          reject(err);
        }
        resolve(data);
      });
    } catch (error) {
      reject(error);
    }
  });
};

// module.exports = pool;
module.exports = { executeQuery };
