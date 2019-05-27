const express=require('express');
const loginContr=require('../controll/loginContr.js');
const router=express.Router();
router.get('/login',loginContr.getLogin)
.post('/loginSucc',loginContr.loginSucc)
.get('/logout',loginContr.logout)
module.exports=router;