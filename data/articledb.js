const pdb=require('./pdb.js');
module.exports={
    query:pdb.query,
    postData:(obj,callback)=>{
      let posSql=`INSERT INTO posts (slug, title, feature, created, content, status, user_id, category_id) VALUES ('${obj.slug}', '${obj.title}', '${obj.feature}', '${obj.created}', '${obj.content}', '${obj.status}', ${obj.user_id}, ${obj.category_id})`
      pdb.query(posSql,(err,result)=>{
        callback(err,result)
      })
    },
    articleData:(obj,callback)=>{
      let allSql = `SELECT posts.*,users.nickname,categories.name FROM posts `
      allSql += `LEFT JOIN users ON posts.user_id=users.id `
      allSql += `LEFT JOIN categories ON posts.category_id=categories.id WHERE true `
      // 判断条件
      let condition = ``
      if (obj.sel && obj.sel != 0) {
        condition += `and posts.category_id=${obj.sel} `
      };
      if (obj.sta && obj.sta != 0) {
        condition += `and posts.status='${obj.sta}' `
      };
      allSql += condition
      allSql += `ORDER BY posts.id DESC `
      allSql += `LIMIT ${(obj.page - 1) * obj.pagesize},${obj.pagesize}; `
      allSql += `SELECT COUNT(*) FROM posts WHERE true `
      allSql += condition;
      pdb.query(allSql,(err,result)=>{
        callback(err,result);
      })
    },
    delSome:(id,callback)=>{
      let delSql=`DELETE FROM posts WHERE id=${id}`;
      pdb.query(delSql,(err,result)=>{
        callback(err,result);
      })
    },
    delAll:(ids,callback)=>{
      let delAllSql=`DELETE FROM posts WHERE id in (${ids})`;
      // console.log(delAllSql);
      pdb.query(delAllSql,(err,result)=>{
        callback(err,result);
      })
      
    },
    editData:(id,callback)=>{
      let sql=`SElECT * FROM posts WHERE id=${id}; SElECT * FROM categories`;
      pdb.query(sql,(err,result)=>{
        callback(err,result)
      })
    },
    postChange:(obj,callback)=>{
      let sql = `UPDATE posts SET title='${obj.title}', content='${obj.content}', slug='${obj.slug}', category_id=${obj.category},created='${obj.created}', status='${obj.status}', feature='${obj.feature}' WHERE id = ${obj.id}`
        // 执行 sql
        pdb.query(sql,(err,result)=>{
          callback(err,result);
        })
    }
}