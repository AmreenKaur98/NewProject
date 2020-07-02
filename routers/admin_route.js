var express = require('express');
var router = express.Router();
//var joi = require('../auth/admin_joi');
var controller = require('../controllers/adminController')

var bodyParser = require('body-parser');
router.use(bodyParser.json());

// SIGNUP FOR ADMIN 
router.post('/adminSignup',(req,res)=>{
    console.log('ADMIN SIGNUP...')
    controller.Signup(res);
})

// LOGIN FOR ADMIN
router.post('/adminLogin',(req,res)=>{
    controller.Login(req.body,res);
})

module.exports = router