const pdb=require('./pdb.js');
module.exports={
    query:pdb.query,
    getnav:(callback)=>{
        let sql=`SELECT * FROM options WHERE options.key='nav_menus'`;
        pdb.query(sql,(err,result)=>{
            callback(err,result)
        })
    },
    addNav: function(params,callback){
        this.getnav((err,result)=>{
            if(err){
                return callback(err,null)
            }
            let data=JSON.parse(result[0].value);
            let obj={
                icon:'fa fa-phone',
                text:params.text,
                title:params.title,
                link:params.href
            };
            data.push(obj);
            // 转为json字符串
            let str=JSON.stringify(data);
            let addsql=`UPDATE options SET options.value='${str}' WHERE options.key='nav_menus'`
            pdb.query(addsql,(err,result)=>{
                callback(err,result)
            })
        })
    }
}