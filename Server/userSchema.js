const mongoose = require ('mongoose')


const User = mongoose.Schema({
    firstName:{type:String },
    lastName:{type:String },
    tel :{type:Number },
    email : {type:String},
    address : {type : String},
    image:{type : Object},
    password : {type : String}
 
    
})
module.exports=mongoose.model('User', User)