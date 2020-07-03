var express = require('express');
var router = express.Router();
var jwt = require('../auth/adminToken');
var jwtUser = require('../auth/userToken');
var multer = require('multer');
var buildingControl = require('../controllers/building_control')

var bodyParser = require('body-parser');
router.use(bodyParser.json());

var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+file.originalname)
    }
})
var upload = multer({storage:storage});
// ADMIN TO ADD THE BUILDING....
router.post('/addBuilding',jwt.verifyToken,jwt.verify,upload.single('image'),(req,res)=>{
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        res.json({Message:'NO FILE SELECTED'})
    }
    else{
        //console.log('body admin-----',req.body);
        var obj={image:file,
            adminID:req.query.adminID,
            name:req.body.name,
            category:req.body.category,
            type:req.body.type,
            location:req.body.location 
           }
        //console.log('req---',obj)
        buildingControl.addBuilding(obj,res)
    } 
})

// GET THE PAGE OF BUILDING...
router.get('/viewBuilding',jwtUser.verifyToken,jwtUser.verify,(req,res)=>{
    console.log('IN VIEW..')
    buildingControl.viewBuilding(req.body,res);
})

module.exports = router