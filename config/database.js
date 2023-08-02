
const mysql = require('mysql2')

let conn = mysql.createConnection({
    host : 'localhost', // 데이터베이스 e주소임
    user: 'root',
    password: '1234', // 설정한 비번
    port: 3306, // port번호
    database : 'nodejs' 
})