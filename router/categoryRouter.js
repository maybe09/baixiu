const express=require('express');
const cateContr=require('../controll/categoryContr.js')
const router=express.Router();
router.get('/categories',cateContr.getCate)//获取页面的路由
.get('/getDataAll',cateContr.getData)
.post('/postParams',cateContr.postParams)
.get('/getEdit',cateContr.getEdit)
.post('/catePost',cateContr.catePost)
.get('/delcateData',cateContr.delcateData)
.post('/cateDelete',cateContr.cateDelete)
module.exports=router;