// 封装一个操作数据库的方法
const mysql = require('mysql');
module.exports.query = function (sql, callback) {
    
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'node',
        database: 'baixiu',
        multipleStatements:true,
    });
    //  开启连接
    connection.connect();
    // 执行sql语句
    connection.query(sql, (err, result) => {
        if (err) {
           return callback(err,null);
        }
        callback(null,result);
    })
    // 关闭连接
    connection.end();
}