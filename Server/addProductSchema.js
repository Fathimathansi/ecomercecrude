const mongoose = require ('mongoose')


const Product = mongoose.Schema({
    productName:{type:String },
    description:{type:String },
    price :{type:Number },
    category : {type:String},
    stockQuantity : {type : Number},
    image:{type : Object},
    count:{type:Number},
    SellerId:{type:mongoose.Schema.Types.ObjectId,ref:'Seller'},
    UserId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
 
    
})
module.exports=mongoose.model('Product', Product)