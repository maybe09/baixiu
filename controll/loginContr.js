const logindb=require('../data/logindb.js');
module.exports={
    getLogin:(req,res)=>{
        // 将login页面返回
        res.render('login',{})
    },
    loginSucc:(req,res)=>{
        // 接收提交的参数,根据email去数据库中寻找对应的密码
        // 结果有两个:1.找不到对应的email,返回的是null,说明没有这个email
        // 2.找到了对应的email之后再去匹配对应的密码,也会产生两种结果,密码匹配不成功,密码匹配成功
        let params=req.body;
        // console.log(params);
        
        logindb.seleWord(params.email,(err,result)=>{
           if(err){
               return res.send({
                   status:400,
                   msg:'出错了'
               })
           };
           if(result.length==0){
               return res.send({
                   status:401,
                   msg:'邮箱或者密码不正确'
               })
           };
           if(params.password!=result[0].password){
            return res.send({
                status:402,
                msg:'密码不正确'
            })
           }
        //    否则登录成功,将用户信息通过session保存
        req.session.user={
            email:params.email,
            password:params.password,
            nickname:result[0].nickname,
            id:result[0].id,
            avatar: result[0].avatar,
        }
        // console.log(req.session.user);
        //id: 4,
        //slug: 'acb',
        //email: 'baiying@bc.com',
        //password: '123456',
        //nickname: 'vbb',
        //avatar: '/static/uploads/avatar.jpg',
        //bio: '1122',
        //status: 'activated' }
        //
        
         res.send({
             status:200,
             msg:'登录成功'
         })
        })
    },
    logout:(req,res)=>{
        // 删除session
        req.session.user=null;
        res.send({
            status:200,
            msg:'退出成功'
        })
    }
}
