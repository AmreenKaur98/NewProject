const bcrypt = require('bcryptjs')
var use = require('../models/user')
var jwt = require('../auth/userToken');

function Signup(body,res){
    //console.log(body,'in controller...');
    const saltRounds = 10
    bcrypt.genSalt(saltRounds,(err,salt)=>{
        if(err)
            throw err
        else{
            bcrypt.hash(body.password,salt,(err,hash)=>{
                if(err)
                    throw err
                else{
                    //console.log('IN ELSE HASH-')
                    body.password=hash;
                    var obj=new use(body);
                    //console.log(obj);
                    obj.save(function (err, result) {
                        if (err) 
                            res.json(err);
                        else
                            {res.json({Message:'DONE WITH THE SIGNUP....'});
                            console.log('DONE')
                        }
                    });
                }
            })
        }
    })
}
function Login(body,res){
    console.log('IN LOGIN...')
    var e = body.username;
    use.findOne({username:e},(err, result)=>{
        if(err)
            throw err;
        else
            {
                if(result==null){
                       res.json({Message:'EMAIL NOT FOUND'});
                  }
                else{
                    result = result.toObject();
                    bcrypt.compare(body.password , result.password, function(err, data) {
                        if (err) {
                          throw err
                        } else if (!data) {
                          res.send("Password doesn't match!")
                        } else {
                            jwt.CreateToken(result,res);
                            console.log("Password matches! YOU ARE LOGED IN ..")
                        } 
                      })
                }
            }
    })
}
module.exports={
    Signup,
    Login
}