const express=require('express');
const boardContr=require('../controll/dashboardContr.js')
const router=express.Router();
router.get('/index',boardContr.getIndex)
.get('/getArtnum',boardContr.getArtnum)
module.exports=router;