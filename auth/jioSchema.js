var Joi = require('joi');

function validation(req,res,next){

const Schema = Joi.object().keys({
    name : Joi.string().required(),
    username: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(4).required(),
    address: Joi.string(),
    engieEmployee: Joi.boolean(),
    author:Joi.string(),
    status: Joi.string(),
    createdAt: Joi.date(),
    updatedAt:Joi.date()
});

Joi.validate(req.body,Schema,(err,data)=>{
    if(err)
        throw err;
    console.log("joi user ==",data);
    next();
})

}
module.exports ={
    validation
}