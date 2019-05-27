const setdb=require('../data/setdb.js')
module.exports={
    navmenus:(req,res)=>{
        let nickname=req.session.user.nickname;
        let avatar=req.session.user.avatar;
        res.render('nav-menus',{nickname,avatar})
    },
    getNavdata:(req,res)=>{
        setdb.getnav((err,result)=>{
           if(err){
               return res.send({
                   status:400,
                   msg:'出错了'
               })
           }
           res.send({
            status:200,
            msg:'数据获取成功',
            data:result
        })
        })
    },
    addmenus:(req,res)=>{
        let params=req.body;
        // console.log(params);
        setdb.addNav(params,(err,result)=>{
            if(err){
              return res.send({
                  status:400,
                  msg:'出错了'
              })
              
            }
            res.send({
                status:200,
                msg:'新增成功'
            })
        })
        
    }
}