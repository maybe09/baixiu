module.exports={
    getComment:(req,res)=>{
        let nickname=req.session.user.nickname
        let avatar=req.session.user.avatar
        res.render('comments',{nickname,avatar})
    }
}