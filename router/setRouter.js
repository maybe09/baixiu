const express=require('express');
const setContr=require('../controll/setContr.js')
const router=express.Router();
router.get('/nav-menus',setContr.navmenus)
.get('/getNavdata',setContr.getNavdata)
.post('/addmenus',setContr.addmenus)
module.exports=router;