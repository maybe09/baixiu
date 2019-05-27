const pdb=require('./pdb.js');
module.exports={
    query:pdb.query,
    selectAll:function(callback){
        let dataSql=`SELECT * FROM categories`;
        pdb.query(dataSql,(err,result)=>{
            callback(err,result)
        })
    },
    addData:function(obj,callback){
        let addSql=`INSERT INTO categories (name,slug) VALUES('${obj.name}','${obj.slug}')`
        pdb.query(addSql,(err,result)=>{
            callback(err,result)
        })
    },
    editSele:function(id,callback){
        let selSql=`SELECT * FROM categories WHERE id = ${id}`;
        pdb.query(selSql,(err,result)=>{
            callback(err,result)
        })
    },
    postData:function(obj,callback){
        let chanSql=`UPDATE categories SET name='${obj.name}',slug='${obj.slug}' WHERE id=${obj.id} `
        pdb.query(chanSql,(err,result)=>{
            callback(err,result)
        })
    },
    delSingle:function(id,callback){
        let delSql=`DELETE FROM categories WHERE id=${id}`;
        pdb.query(delSql,(err,result)=>{
            callback(err,result)
        })
    },
    delAll:function(ids,callback){
        let dallSql=`DELETE FROM categories WHERE id in(${ids})`;
        pdb.query(dallSql,(err,result)=>{
            callback(err,result)
        })
    }
}


// 封装一个操作数据库的方法
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
//         if (err) {
//            return callback(err,null);
//         }
//         callback(null,result);
//     })
//     // 关闭连接
//     connection.end();
// }
