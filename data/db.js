const pdb=require('./pdb.js');
module.exports={
    query:pdb.query,
    // 根据id得到用户信息
    getUsermsg:(id,callback)=>{
    let selSql=`SELECT * FROM users WHERE id=${id}`;
    pdb.query(selSql,(err,result)=>{
        // console.log(result);
        
        callback(err,result);
    })
    },
    postNew:(obj,callback)=>{
        let chaSql=`UPDATE users SET slug = '${obj.slug}', nickname = '${obj.nickname}', avatar = '${obj.img}', bio = '${obj.bio}' WHERE id = ${obj.id}`
        pdb.query(chaSql,(err,result)=>{
            callback(err,result)
        })
    },
    getPassword:(id,callback)=>{
        let pwdSql=`SELECT password FROM users WHERE id=${id}`
        pdb.query(pwdSql,(err,result)=>{
            callback(err,result)
        })
    },
    resendpwd:(pwd,id,callback)=>{
        let sql=`UPDATE users SET password = '${pwd}' WHERE id = ${id}`;
        pdb.query(sql,(err,result)=>{
            callback(err,result)
        })
    }
}


// -----------------------之前的代码
// // 封装一个操作数据库的方法
// const mysql = require('mysql');
// module.exports.query = function (sql, callback) {
    
//     const connection = mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         password: 'node',
//         database: 'baixiu'
//     });
//     //  开启连接
//     connection.connect();
//     // 执行sql语句
//     connection.query(sql, (err, result) => {
//         if (err) 
//             console.log(err.message)
        
//         callback(result);
//     })
//     // 关闭连接
//     connection.end();
// }
