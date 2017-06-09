const mysql = require('mysql');
const connection = mysql.createConnection({
    port     : 3306, // 8889
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'plant'
});

module.exports = connection;
