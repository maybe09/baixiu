const catedb=require('../data/catedb.js');
module.exports={
    getCate:(req,res)=>{
        let nickname = req.session.user.nickname
        let avatar = req.session.user.avatar
       res.render('categories',{nickname,avatar})
    },
    getData:(req,res)=>{
        // 获取数据
        catedb.selectAll((err,result)=>{
            if(err){
                return res.send({
                    status:400,
                    msg:'出错了'
                })
            }
            res.send({
                status:200,
                data:result,
                msg:'获取成功'
            })
        })
        
    },
    postParams:(req,res)=>{
        // 获取提交的参数,提交到数据库
        let params=req.body;
        // console.log(params);//{ name: 'asdf', slug: 'ay' }
        catedb.addData(params,(err,result)=>{
            if(err){
                return res.send({
                    status:400,
                    msg:'出错了'
                })
            };
            res.send({
                status:200,
                msg:'添加成功'
            })
        })
       
    },
    //可能出错
    getEdit:(req,res)=>{
        let id=req.query.id;
        // console.log(id);
        // 根据id去数据库查找数据
        catedb.editSele(id,(err,result)=>{
            if(err){
                return res.send({
                    status:400,
                    msg:'出错了'
                })
            }
            res.send({
                status:200,
                data:result[0],
                msg:'获取成功'
            })
        })
    },
    catePost:(req,res)=>{
        let params=req.body;
        catedb.postData(params,(err,result)=>{
            if(err){
                return res.send({
                    status:400,
                    msg:'出错了'
                })
            }
            res.send({
                status:200,
                msg:'编辑成功'
            })
        })
        // console.log(params);//{ id: '5', name: '小花', slug: 'ay' }
       
       
    },
    //可能出错
    delcateData:(req,res)=>{
        let id=req.query.id;
        // console.log(id);
        catedb.delSingle(id,(err,result)=>{
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
    cateDelete:(req,res)=>{
        let ids=req.body.id;
        // console.log(ids);
        catedb.delAll(ids,(err,result)=>{
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
        
       
        
    }
    
}