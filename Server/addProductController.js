const ProductSchema = require('./addProductSchema')
const multer = require('multer')



const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "./Image");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    },
})
const productImage = multer({ storage: storage}).single("image");
const addProduct =(req,res)=>{    
const Product = new ProductSchema({

        productName: req.body.productName,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        stockQuantity: req.body.stockQuantity,
        SellerId: req.body.SellerId,
        UserId: req.body.UserId,
        image: req.file 

    })
    console.log(Product);
    
      Product.save()
        .then((result) => {
            res.json({
                data: result,
                msg: "sucessfull"
            })
        })
        .catch((error) => {
            console.log(error);

        })

}



const ViewProduct = (req, res) => {
    ProductSchema.find()
    .populate("SellerId")
        .then((result) => {
            res.json({
                data: result,
                msg: "successfull"
            })
        })  
        .catch((error) => {
            console.log(error)
        })
}

const viewproductId = (req, res) => {
    const productId = req.params.id;
    ProductSchema.findById(productId)
        .then((result) => {
            res.json({
                data: result,
                msg: "successfull"
            })
        })
        .catch((error) => {
            console.log(error);

        })
}
const Productupdate = (req, res) => {
    const productId = req.params.id;
    const updateData = {
       productName: req.body.productName,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        stockQuantity: req.body.stockQuantity,
        SellerId: req.body.SellerId,
        UserId: req.body.UserId,
        image: req.file }

    ProductSchema.findByIdAndUpdate(productId, updateData, { new: true })
        .then((result) => {
            res.json({
                data: result,
                msg: "sucessfull"
            })
        })
        .catch((error) => {
            console.log(error)
        })
}
const deleteProduct = (req, res) => {
    const productId = req.params.id;

    ProductSchema.findByIdAndDelete(productId)
        .then((result) => {

            res.json({
                data: result,
                msg: "sucessfull"
            })
        })
        .catch((error) => {
            console.log(error)
        })
};
const BuyProduct = (req,res) =>{
     const productId = req.params.id;
    const order = {
        BuyerId: req.body.BuyerId,
    }
    ProductSchema.findByIdAndUpdate(productId, order, { new: true })
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






const StockProduct = (req, res) => {
    const { id: productId } = req.params;
    const { UserId } = req.body;
    const {count} = req.body;
    if (!UserId) {
         return res.status(400).json({ msg: "Buyer ID is required." });

    }
    ProductSchema.findById(productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({ msg: "Product not found." });
            }
            console.log(product);
            
            if (product && product.stock > 0) {
                product.stock -= count;
                product.UserId.push(UserId);
                return product.save();

            }
           

        })
                .then(updatedProduct => {
          
            res.json({
                data: updatedProduct,
                msg: "Purchase successful. Stock updated."
            });
        })
 .catch(error => {
            console.log(error);
            res.status(400).json({ msg: error.message || "Purchase failed." });
        });





}


module.exports = {addProduct,StockProduct, ViewProduct, BuyProduct, viewproductId, Productupdate,deleteProduct,productImage }