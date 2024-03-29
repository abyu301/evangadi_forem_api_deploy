const mysql2 = require("mysql2");

const dbConnection = mysql2.createPool({
  user: process.env.USER,
  database: process.env.DATABASE,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  port: 3306,
  connectionLimit: 10,
});

dbConnection.execute("SELECT 'test 123'", (err, result) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log(result);
    }
});

module.exports = dbConnection.promise();
