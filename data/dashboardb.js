const pdb=require('./pdb.js');
module.exports={
    query:pdb.query,
    getAmount:(callback)=>{
        let sql=`SELECT COUNT(*) FROM posts WHERE status="published";
        SELECT COUNT(*) FROM posts WHERE status="drafted";
        SELECT COUNT(*) FROM categories;
        SELECT COUNT(*) FROM comments;
        SELECT COUNT(*) FROM comments WHERE status="held"`
       
        pdb.query(sql,(err,result)=>{
            // console.log(result);
            
            callback(err,result)
        })
    }
}