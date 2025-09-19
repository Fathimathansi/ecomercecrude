const mongoose = require ('mongoose')


const Seller = mongoose.Schema({
    firstName:{type:String },
    lastName:{type:String },
    tel :{type:Number },
    email : {type:String},
    address : {type : String},
    password : {type : String},
  image:{type : Object},
  
status: {
      type: String,
      enum: ["pending", "approved", "rejected"], // ✅ matches controller logic
      default: "pending",
    },
  },
  { timestamps: true}
)
module.exports=mongoose.model('Seller', Seller)