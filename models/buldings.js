var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var buildingSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    image:{
        type:String,
        required:true,
        unique:true
    },  
    category:{
        type:String
    },
    type:{
        type:String,
        default:'Point'
    },
    location:{
        type:[Number],
        index:"2dsphere"
    },
    adminID:{
        type:Schema.Types.ObjectId,
        ref:'admin',
        required:true
    },
    status:{
        type:String,
        enum:['ACTIVE','BLOCKED'],
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

module.exports = mongoose.model('building',buildingSchema);