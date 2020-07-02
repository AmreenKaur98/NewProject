var express = require('express');
var router = express.Router();
var joi = require('../auth/jioSchema');
var controller = require('../controllers/userController')

var bodyParser = require('body-parser');
router.use(bodyParser.json());

// SIGNUP FOR USER 
router.post('/userSignup',joi.validation,(req,res)=>{
    controller.Signup(req.body,res);
})

// LOGIN FOR USER
router.post('/userlogin',(req,res)=>{
    controller.Login(req.body,res);
})

module.exports = router