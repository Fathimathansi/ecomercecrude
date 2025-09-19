const mongoose= require("mongoose")
const order  =  mongoose.Schema({
      UserId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
      ProductId:{type:mongoose.Schema.Types.ObjectId,ref:'Product'}
})

 module.exports=mongoose.model('order',order)