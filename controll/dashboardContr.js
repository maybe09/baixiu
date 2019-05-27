const boardb=require('../data/dashboardb.js');
module.exports={
    getIndex:(req,res)=>{
        let nickname=req.session.user.nickname
        let avatar=req.session.user.avatar
        res.render('index',{nickname,avatar})
    },
    getArtnum:(req,res)=>{
        boardb.getAmount((err,result)=>{
            if(err){
                 res.send({
                     status:400,
                     msg:'出错了'
                 })
            };
            res.send({
                status:200,
                data:result
                })
        })
    }
}