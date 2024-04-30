const mysql = require('mysql2');

const connectionDb = mysql.createConnection({
    host:process.env.MYSQL_HOST,
    user:process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DB,
})

connectionDb.connect((err) => {
    if(err) throw err;
    console.log('connected to mysql server.');
})

module.exports = connectionDb;