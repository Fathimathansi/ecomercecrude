const express = require('express')
const app = express.Router()
const useControl =require ('./userController')
const addProductContoller =require('./addProductController')
const sellerController = require('./sellerController')
const OrderController = require('./OrderController')
const ContactController = require('./ContactController')
const BuyerController = require('./BuyNowController'); 





app.post('/usereg',useControl.userImage, useControl.userRegistration)
app.get('/getall',useControl.getAllUsers)
app.get('/userbyid/:id', useControl.getUserById)
app.post('/findone', useControl.findOneUser)
app.put('/update/:id',useControl.userImage,useControl.updateUser)
app.delete('/delete/:id',useControl.deleteUser)



app.post('/products',addProductContoller.productImage,addProductContoller.addProduct)
app.get('/getproduct',addProductContoller.ViewProduct)
app.get('/productid/:id',addProductContoller.viewproductId)
app.put('/updateproduct/:id',addProductContoller.productImage,addProductContoller.Productupdate)
app.delete('/deleteproduct/:id',addProductContoller.deleteProduct)
app.put('/BuyStock/:id',addProductContoller.StockProduct)

app.post('/sellereg',sellerController.sellerImage, sellerController.sellerRegistration)

app.get('/sellergetall',sellerController.getAllSellers)
app.get('/sellerbyid/:id', sellerController.getSellerById)
app.post('/sellerfindone', sellerController.findOneSeller)
app.put('/sellerupdate/:id',sellerController.sellerImage,sellerController.updateSeller)
app.delete('/sellerdelete/:id',sellerController.deleteSeller)
app.get('/seller/pending', sellerController.getPendingSellers);
app.put('/seller/approve/:id', sellerController.approveSeller);
app.delete('/seller/reject/:id', sellerController.rejectSeller);
app.get('/sellers', sellerController.getAcceptedSellers);

app.post('/orderid/:uiid',OrderController.OrderSchema)
app.get('/vieworder/:OrderId',OrderController.viewOrderId )
app.get('/viewallorder',OrderController.ViewOrder)
app.get('/userorders/:UserId',OrderController.UserOrders)
app.delete('/deleteorder/:id',OrderController.OrderDelete)
app.post("/buycart/:UserId", OrderController.BuyCart);


app.post('/processcheckout/:id', BuyerController.processCheckout);
app.post('/processCheckoutUser', BuyerController.processCheckout);

app.get('/viewallpurchases', BuyerController.viewAllPurchases);
app.get('/viewpurchase/:id', BuyerController.viewPurchaseById);
app.put('/updatepurchase/:id', BuyerController.updatePurchase);
app.delete('/deletepurchase/:id', BuyerController.deletePurchase);
app.get('/Viewbuyer', BuyerController.viewBuyer )
app.get('/viewallpurchases/:id', BuyerController.viewAllPurchasesaUser);


app.post('/addcontact',ContactController.addContact)
app.get('/viewcontact',ContactController.ViewContact)
app.get('/viewacontact/:id',ContactController.viewContactId)
app.put('/contactupdate/:id',ContactController.Contactupdate)
app.delete('/deletecontact/:id',ContactController.deleteContact)



module.exports = app