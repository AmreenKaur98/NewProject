var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    password:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true
    },
    engieEmployee:{
        type:Boolean,
        default:false
    },
    author:{
        type:String,
        default:'USER',
        enum:['USER','ADMIN']
    },
    status:{
        type:String,
        enum:['ACTIVE','BLOCKED','DELETED'],
        default:'ACTIVE'
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date
    }
});

module.exports = mongoose.model('user',userSchema);