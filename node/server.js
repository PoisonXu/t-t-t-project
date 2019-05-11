const mysql = require("mysql");

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'xuwei123',
    database: 'xwshop',
    port: 3306
    });
conn.connect();

conn.query('SELECT * FROM `shop`',function (err, result) {
    if(err){
      console.log('[SELECT ERROR] - ',err.message);
      return;
    }
    return result;
     
});

conn.query('SELECT 1 + 1 AS solution');
conn.end();