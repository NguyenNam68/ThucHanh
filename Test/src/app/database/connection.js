const mysql = require('mysql2');
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'vietnam',
    password: 'namnguyen2411',
    database: 'mydb',
});

conn.connect(err => {
    if(!err){
        console.log(`Database connection successfully`);
    }else{
        console.log(`Database connection failed : ${err}`);
    }
});

module.exports = conn;