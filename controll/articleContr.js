const articledb=require('../data/articledb.js');
const formidable=require('formidable');
const path=require('path');
module.exports={
    postAdd:(req,res)=>{
        // 获取用户名和图片
        let nickname=req.session.user.nickname
        let avatar=req.session.user.avatar
        res.render('post-add',{nickname,avatar})
    },
    postArticle:(req,res)=>{
        // 接收提交的参数
        let form=new formidable.IncomingForm();
        form.uploadDir=path.join(__dirname,'../uploads');
        form.keepExtensions=true;
        form.parse(req,(err,fields,files)=>{
            if(err){
                return res.send({
                    status:400,
                    msg:'出错了'
                })
                // console.log(err);
                
            }
            // 将参数存入对象
            let obj={};
            obj.slug=fields.slug;
            obj.title=fields.title;
            obj.content=fields.content;
            obj.category_id=fields.category;
            obj.created=fields.created;
            obj.status=fields.status;
            // console.log(fields);
            // console.log(lastPath);//upload_fb585978e734a9be79f55657742bec74
            obj.user_id=req.session.user.id;
             if(files.feature){
                let imgpath=files.feature.path;
                let lastPath=path.basename(imgpath);
                obj.feature=lastPath;
             }else{
                obj.feature=''
             };
            //  console.log(obj);
             
             articledb.postData(obj,(err1,result)=>{
                if(err1){
                    return res.send({
                        status:400,
                        msg:'出错了'
                    })
                    // console.log(err1);
                    
                }
                res.send({
                    status:200,
                    msg:'发表成功'
                })
             })  

            


        })
    },
    posts:(req,res)=>{
        let nickname=req.session.user.nickname;
        let avatar=req.session.user.avatar;
        res.render('posts',{nickname,avatar})
    },
    articleData:(req,res)=>{
        let page=req.query.page;
        let pagesize=req.query.pagesize;
        let sel=req.query.sel;
        let sta=req.query.sta;
        let obj={
            page,
            pagesize,
            sel,
            sta,
        }
        articledb.articleData(obj,(err,result)=>{
            // console.log(result);
            
            if(err){
                return res.send({
                    status:400,
                    msg:'出错了'
                })
            }
            res.send({
                status:200,
                data:result
            })
        })
    },
    delOne:(req,res)=>{
        let id=req.query.id;
        articledb.delSome(id,(err,result)=>{
            if(err){
                return res.send({
                    status:400,
                    msg:'出错了'
                })
            }
            return res.send({
                status:200,
                msg:'删除成功'
            })
        })
    },
    delAlldata:(req,res)=>{
        let ids=req.body.id;
        // console.log(ids);
        articledb.delAll(ids,(err,result)=>{
            if(err){
                return res.send({
                    status:400,
                    msg:'出错了'
                })
            }
            res.send({
                status:200,
                msg:'删除成功'
            })
        })
        
    },
    postedit:(req,res)=>{
        let nickname=req.session.user.nickname;
        let avatar=req.session.user.avatar;
        res.render('post-edit',{nickname,avatar})
    },
    getEditdata:(req,res)=>{
     let id=req.query.id;
    //  console.log(id);//993
    articledb.editData(id,(err,result)=>{
        if(err){
            return res.send({
                status:400,
                msg:'出错了'
            });
            
        };
        // console.log(result);
        res.send({
            status:200,
            data:result
        })
    })
    },
    changeArticle:(req,res)=>{
        var form=new formidable.IncomingForm();
        // 修改文章存储的路径
        form.uploadDir=path.join(__dirname,'../uploads');
        form.keepExtensions=true;
        form.parse(req,(err,fields,files)=>{
            if(err){
               return res.send({
                   status:400,
                   msg:'出错了'
               })
            };
            if(files.feature){
                fields.feature='/static/uploads/'+path.basename(files.feature.path)
            };
            // console.log(fields);
            // console.log(files);
            articledb.postChange(fields,(err1,result)=>{
                if(err1){
                    return res.send({
                        status:400,
                        msg:'出错了'
                    })
                };
                res.send({
                    status:200,
                    msg:'修改成功'
                })
            })
            
        })
        
    }
}