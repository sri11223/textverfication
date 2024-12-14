const express=require('express');
const router=express.Router();
const Controllers=require('../controllers/AuthController');


router.route('/login').post(Controllers.login);
router.route('/signup').post(Controllers.signup);


module.exports=router;