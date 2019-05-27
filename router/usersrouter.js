const express=require('express');
const usersContr=require('../controll/userscontr.js')
const router=express.Router();
// 统一验证是否登录
// router.use((req,res,next)=>{
//       if(req.session.user){
//             next();
//       }else if('X-Requested-With'=='XMLHttpRequest'){
//             res.send({
//                   status:304,
//                   msg:'您还没有登录'
//             })
//       }
//       else{
//             res.send('<script>alert("您还没有登录");window.location="/login"</script>')
            
//       }
// })
router.get('/users',usersContr.getUser)
      .post('/postData',usersContr.getAdd)
      .get('/getData',usersContr.getData)   
      .get('/delete',usersContr.delete)
      .get('/getChange',usersContr.getChange)
      .post('/postChange',usersContr.postChange)
      .post('/delData',usersContr.delData)
      //处理响应个人中心页面的路由
      .get('/profile',usersContr.profile)
      .post('/changeNew',usersContr.changeNew)
      .get('/password-reset',usersContr.passwordReset)
      .post('/reserPwd',usersContr.reserPwd)//修改密码的路由
      
module.exports=router;