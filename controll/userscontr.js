const path=require('path')
const db = require('../data/db.js')
const formidable=require('formidable');

module.exports.getUser = function (req, res) {
    if (!browserLogin(req, res)) {
        return
    }
    //获取到数据库中的数据,渲染到页面上
    let sql = 'SELECT * FROM users';
    // console.log("111");
    

    db.query(sql, (err, result) => {
        if (err) {
            return res.send('<script>alert("' + err.message + '")</script>')
        }
        //   console.log(result);
        let nickname = req.session.user.nickname;
        // console.log(nickname);
        let avatar = req.session.user.avatar
        // console.log(avatar);
        
        res.render('users', { result: result, nickname, avatar})

    })
}
module.exports.getAdd = function (req, res) {
    if (xhrLogin(req, res)) {
        return
    }
    //    接收提交的参数
    let parmas = req.body;
    //  console.log(parmas);
    //  将数据提交到数据库
    let addSql = `INSERT INTO users (slug,email,password,nickname,status) VALUES('${parmas.slug}','${parmas.email}','${parmas.password}','${parmas.nickname}','activated')`

    //  执行sql语句
    db.query(addSql, (err, result) => {
        if (err) {
            return res.send({
                msg: '新增失败',
                status: 400
            })
        }
        res.send({
            msg: '新增成功',
            status: 200
        })
    })
};
module.exports.getData = function (req, res) {
    if (xhrLogin(req, res)) {
        return
    }
    //   获取数据库中的内容
    let getSql = `SELECT * FROM users`;
    db.query(getSql, (err, result) => {
        if (err) {
            return res.send({
                status: 400,
                msg: '获取失败'
            })
        }
        res.send({
            data: result,
            status: 200,
            msg: '获取成功'
        })
    })
};
module.exports.delete = function (req, res) {
    if (xhrLogin(req, res)) {
        return
    }
    let id = req.query.id;
    let delSql = `DELETE FROM users WHERE id = ${id}`;
    db.query(delSql, (err, result) => {
        if (err) {
            return res.send({
                msg: '删除失败',
                status: 400
            })
        }
        res.send({
            msg: '删除成功',
            status: 200
        })
    })
};
module.exports.getChange = function (req, res) {
    if (xhrLogin(req, res)) {
        return
    }
    // 获取
    // 获取id
    let id = req.query.id;
    let proSql = `SELECT * FROM users WHERE id = ${id}`;
    db.query(proSql, (err, result) => {
        // console.log(result);
        if (err) {
            return res.send({
                status: 400,
                msg: '获取失败'
            })
        }
        res.send({
            data: result[0],
            status: 200,
            msg: '获取成功'
        })
    })
};
module.exports.postChange = function (req, res) {
    if (xhrLogin(req, res)) {
        return
    }
    // 接收提交的参数
    let params = req.body;
    // console.log(parmas);
    // 将数据提交
    let chaSql = `UPDATE users SET email='${params.email}', nickname='${params.nickname}', password='${params.password}' WHERE id=${params.id}`;
    db.query(chaSql, (err, result) => {
        if (err) {
            return res.send({
                status: 400,
                msg: '修改失败'
            })
        }
        res.send({
            status: 200,
            msg: '修改成功'
        })
    })
};
module.exports.delData = function (req, res) {
    if (xhrLogin(req, res)) {
        return
    }
    // 接收提交的参数
    let params = req.body.id;
    // console.log(params); // [ '7', '8' ] 
    // 执行sql语句
    let delSql = `DELETE FROM users WHERE id in (${params})`
    console.log(delSql);//DELETE FROM users WHERE id in (5,7);
    db.query(delSql, (err, result) => {
        if (err) {
            return res.send({
                msg: '删除失败',
                status: 400
            })
        }
        res.send({
            msg: '删除成功',
            status: 200
        })
    })
}
module.exports.profile=function(req,res){
//  将profile页面响应给浏览器
// 获取到当前登录的用户名和图片
let id=req.session.user.id;
console.log(id);

db.getUsermsg(id,(err,reslut)=>{
    if(err){
        return res.send(`<script>alert('出错啦');window.location='/users'</script>`)
    }
    // 根据id获取用户的其他信息
res.render('profile',reslut[0]);
console.log(reslut[0]);//没有数据

})

}
module.exports.changeNew=function(req,res){
    // 接收参数,因为有文件,最好用formidable第三方包
   let form=new formidable.IncomingForm();
   let imgPath=path.join(__dirname,'../uploads');
    //    修改图片上传后保存的路径
   form.uploadDir=imgPath;
    //    保留图片的后缀
    form.keepExtensions=true;
   form.parse(req,(err,fields,files)=>{
       if(err){
        return res.send({
            status: 400,
            msg: '出错啦'
        })
       }
    //    console.log(fields);
    //    console.log(files);
    // files得到的是一个对象,img(我们传的参数名) {img:file{}} file中有一个路径path,可以用第三方包修改默认保存的路径
    
    //    当修改了个人信息(图片,别名,昵称,简介)之后,需要将session中的数据也更新
    // 先判断图片是否有更改
    // 如果图片没有更改,files是一个空对象,因为传过来的是原来图片的路径,不是原文件,我们这里的files需要的是图片的源文件
    // 通过path方法拿到源文件图片的路径,然后赋值给fields的img,
    // 如果图片不存在,就把fields的开始的图片的路径传过去
    if(files.img){
       let url=path.basename(files.img.path);
       fields.img='/static/uploads/'+url;
    }
    
    
           req.session.user.nickname = fields.nickname
            req.session.user.avatar = fields.img
    //    将参数更新到数据库中
    db.postNew(fields,(err1,result)=>{
         if(err1){
            return res.send({
                status: 400,
                msg: '出错啦'
            })
         }
         res.send({
            status: 200,
            msg: '更新数据成功'
        })
    })
   })
}

module.exports.passwordReset=function(req,res){
    let nickname=req.session.user.nickname;
    let avatar=req.session.user.avatar;
  res.render('password-reset',{nickname,avatar});
}
module.exports.reserPwd=function(req,res){
    //   接收参数
    let params=req.body;
    // console.log(params);//{ old: '123456', password: '123123' }
    
    let id=req.session.user.id;
    
    db.getPassword(id,(err,result)=>{
       if(params.old===result[0].password){
        db.resendpwd(params.password,id,(err1,result)=>{
            if(err1){
                return res.send({
                    status:400,
                    msg:'密码更新失败'
                })
            }else{
                req.session.user=null;
                return res.send({
                    status:200,
                    msg:'密码修改成功'
                })
            }
            //    将修改的密码存到数据库中
        })
       }else{
        res.send({
            status:401,
            msg:'密码验证失败'
        })
       }
    })
}


function xhrLogin(req, res) {
    if (!req.session.user) {
        res.send({
            status: 304,
            msg: "还没有登录"
        })
        return true;
    };
    return false;
};
function browserLogin(req, res) {
    if (!req.session.user) {
          res.send('<script>alert("您还没有登录");window.location="/login"</script>')
        return false
    }
    return true
}