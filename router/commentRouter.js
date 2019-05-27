const express=require('express');
const commentContr=require('../controll/commentContr.js')
const router=express.Router();
router.get('/comments',commentContr.getComment)
module.exports=router;