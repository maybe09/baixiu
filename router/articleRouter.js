const express=require('express');
const articleContr=require('../controll/articleContr.js');
const router=express.Router();

router.get('/post-add',articleContr.postAdd)
.post('/postArticle',articleContr.postArticle)
.get('/posts',articleContr.posts)
.get('/articleData',articleContr.articleData)
.get('/delOne',articleContr.delOne)
.post('/delAlldata',articleContr.delAlldata)
.get('/post-edit',articleContr.postedit)
.get('/getEditdata',articleContr.getEditdata)
.post('/changeArticle',articleContr.changeArticle)
module.exports=router;