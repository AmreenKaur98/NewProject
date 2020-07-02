var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adminSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        index:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:4
    },
    address:{
        type:String,
        required:true
    },
    author:{
        type:String,
        default:'ADMIN',
        enum:['USER','ADMIN']
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date
    }
});

module.exports = mongoose.model('admin',adminSchema);