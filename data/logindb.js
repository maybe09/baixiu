const pdb=require('./pdb.js');
module.exports={
    query:pdb.query,
    seleWord:function(email,callback){
     let selSql=`SELECT password,id,nickname,avatar FROM users WHERE email='${email}'`;
    
     pdb.query(selSql,(err,result)=>{
         callback(err,result);
     })
    }
}