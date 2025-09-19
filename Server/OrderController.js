const ProductOrderSchema = require('./OrderSchema')
const OrderSchema = (req,res)=>{
 const order = new ProductOrderSchema({
    UserId : req.params.uiid,
    ProductId: req.body.ProductId

 })
 
 order.save()
 .then((result)=>{
    res.json({
        data:result,
        msg:"successful"
    })
 })
 .catch((error)=>{
    console.log(error);
    
 })
}

const viewOrderId = (req,res)=>{
     const OrderId = req.params.OrderId;
          ProductOrderSchema.findById(OrderId)
            .populate("UserId")
            .populate("ProductId")
            .then((result) => {
                res.json({
                    data: result,
                    msg: "successful"
                })
            })
            .catch((error) => {
                console.log(error);
    
            })
}

const ViewOrder = (req, res) => {
  ProductOrderSchema.find()
.populate("ProductId")
        .then((result) => {
            res.json({
                data: result,
                msg: "successful"
            })
        })  
        .catch((error) => {
            console.log(error)
        })
}

const UserOrders = (req, res)=>{
    const UId = req.params.UserId;
    ProductOrderSchema.find({
       UserId : UId
    })
    .populate("UserId")
            .populate("ProductId")
    .then((result) => {
         if (!result || result.length === 0) {
        return res.json({
          success: true,
          data: [],
          msg: "Your cart is empty"
        });
      }
            res.json({
                data: result,
                msg: "successful"
            })
        })  
        .catch((error) => {
            console.log(error)
        })
}
const OrderDelete =(req,res)=>{

    const OrderId = req.params.id;

  ProductOrderSchema.findByIdAndDelete(OrderId)
        .then((result) => {

            res.json({
                data: result,
                msg: "sucessful"
            })
        })
        .catch((error) => {
            console.log(error)
        })

}


const BuyCart = async (req, res) => {
  try {
    const UId = req.params.UserId;

    const orders = await ProductOrderSchema.find({ UserId: UId }).populate("ProductId");

    if (!orders || orders.length === 0) {
      return res.json({
        success: false,
        msg: "Your cart is empty"
      });
    }

 await ProductOrderSchema.deleteMany({ UserId: UId });

    res.json({
      success: true,
      msg: "Purchase successful, your cart is now empty",
      purchasedItems: orders
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "Something went wrong" });
  }
};



module.exports={OrderSchema, viewOrderId,ViewOrder,UserOrders,OrderDelete,BuyCart}